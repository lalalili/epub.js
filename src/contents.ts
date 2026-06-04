import EventEmitter from "event-emitter";
import { prefixed } from "./compat/css";
import { defaults } from "./core/collections";
import { isNumber } from "./core/types";
import { borders } from "./platform/layout";
import EpubCFI from "./epubcfi";
import Mapping, { type EpubCFIPair, type MappingLayout } from "./mapping";
import { RangeObject } from "./compat/range";
import {replaceLinks} from "./utils/replacements";
import { EPUBJS_VERSION, EVENTS, DOM_EVENTS } from "./utils/constants";

const hasNavigator = typeof (navigator) !== "undefined";

const isChrome = hasNavigator && /Chrome/.test(navigator.userAgent);
const isWebkit = hasNavigator && !isChrome && /AppleWebKit/.test(navigator.userAgent);

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const VERTICAL_RL_WIDTH_GUARD = 2;
const VERTICAL_RL_MIN_EDGE_GUARD = 2;
const SINGLE_MEDIA_SELECTOR = "img, svg, image, video, canvas";
const VISIBLE_TEXT_BLOCK_SELECTOR = "p, h1, h2, h3, h4, h5, h6, li, table, pre, code, blockquote";

type LineBox = {
	left: number;
	right: number;
	width?: number;
};
export interface VerticalRlPageMetrics {
	rawWidth: number;
	rawPaintWidth: number;
	rawHeight: number;
	pageWidth: number;
	viewportPageWidth: number | null;
	effectivePageAdvance: number | null;
	linePitch: number | null;
	lineWidth: number | null;
	edgeGuardPx: number;
	edgeGuard: number;
	pageBoundaryShift: number;
	sampleCount: number;
	gapMad: number | null;
	stable: boolean;
	verticalFragmentPages: number;
	totalPages: number;
	snappedContentWidth: number;
}
export interface VerticalRlDebugMetrics {
	userAgent: string;
	htmlWritingMode: string | null;
	bodyWritingMode: string | null;
	htmlDirection: string | null;
	bodyDirection: string | null;
	htmlOverflow: string | null;
	bodyOverflow: string | null;
	bodyRectLeft: number | null;
	bodyRectRight: number | null;
	bodyRectWidth: number | null;
	rangeRectLeft: number | null;
	rangeRectRight: number | null;
	rangeRectWidth: number | null;
	rawContentWidth: number;
	rawContentHeight: number;
	snappedContentWidth: number;
	pageWidth: number;
	effectivePageAdvance: number | null;
	linePitch: number | null;
	lineWidth: number | null;
	edgeGuardPx: number;
	sampleCount: number;
	gapMad: number | null;
	stable: boolean;
	totalPages: number;
}
type VerticalRlLineMetrics = {
	linePitch: number | null;
	lineWidth: number | null;
	lineLefts: number[];
	lineBoxes: LineBox[];
	sampleCount: number;
	gapMad: number | null;
	stable: boolean;
};
export interface ViewportSettings {
	width?: string | number;
	height?: string | number;
	scale?: string | number;
	scalable?: string;
	minimum?: string | number;
	maximum?: string | number;
}
type ViewportSettingsRecord = ViewportSettings & Record<string, unknown>;

export interface ContentsSize {
	width: number;
	height: number;
}

export interface VerticalRlMetricsCache {
	key: string;
	width: number;
}

export interface VerticalRlPageMetricsCache {
	key: string;
	metrics: VerticalRlPageMetrics;
}

type StylesheetRuleProperty = [string, string, boolean?];
type StylesheetArrayRule = [string, ...StylesheetRuleProperty[]] | [string, StylesheetRuleProperty[]];
type StylesheetObjectRule = Record<string, Record<string, string> | Array<Record<string, string>> | string>;
type StylesheetRules = StylesheetArrayRule[] | StylesheetObjectRule;
type LoadableElement = (HTMLLinkElement | HTMLScriptElement) & {
	onreadystatechange: ((this: LoadableElement, event: Event) => void) | null;
	readyState?: string;
};
interface EpubReadingSystem {
	name: string;
	version: string;
	layoutStyle: string;
	hasFeature(feature: string): boolean;
}
type EpubNavigator = Navigator & { epubReadingSystem?: EpubReadingSystem };
type CssRuleWithSelector = CSSRule & {
	selectorText?: string;
	style?: CSSStyleDeclaration;
};
type ContentsFitSection = {
	properties?: string[];
};

const median = (values: number[]): number | null => {
	if (!values.length) return null;
	const sorted = values.slice().sort((a, b) => a - b);
	return sorted[Math.floor(sorted.length / 2)];
};

const hasPageSpreadLeft = (section: unknown): boolean => {
	return Boolean(
		section &&
		typeof section === "object" &&
		Array.isArray((section as ContentsFitSection).properties) &&
		(section as ContentsFitSection).properties!.includes("page-spread-left")
	);
};

const cssPixelValue = (value: string): number => {
	const parsed = parseFloat(value);
	return Number.isFinite(parsed) ? parsed : 0;
};

const countVerticalRlBoundaryCrossings = (contentWidth: number, pageLength: number, totalPages: number, lineBoxes: LineBox[]): number => {
	let count = 0;
	for (let page = 1; page < totalPages; page += 1) {
		const boundary = contentWidth - (page * pageLength);
		for (const box of lineBoxes) {
			if (box.left < boundary && box.right > boundary) {
				count += 1;
			}
		}
	}

	return count;
};

const snapVerticalRlContentWidthToTextBoundaries = ({
	snappedContentWidth,
	pageLength,
	totalPages,
	rawWidth,
	lineBoxes
}: {
	snappedContentWidth: number;
	pageLength: number;
	totalPages: number;
	rawWidth: number;
	lineBoxes: LineBox[];
}): number => {
	if (
		!Number.isFinite(snappedContentWidth) ||
		!Number.isFinite(pageLength) ||
		!Number.isFinite(totalPages) ||
		totalPages <= 1 ||
		!Array.isArray(lineBoxes) ||
		!lineBoxes.length
	) {
		return snappedContentWidth;
	}

	const candidates = [0];
	const initialCrossings = countVerticalRlBoundaryCrossings(
		snappedContentWidth,
		pageLength,
		totalPages,
		lineBoxes
	);
	const maxLineRight = Math.max(
		0,
		...lineBoxes
			.map((box) => Number(box && box.right))
			.filter((value) => Number.isFinite(value) && value > 0)
	);
	const rawWidthValue = Number.isFinite(rawWidth) && rawWidth > 0 ? rawWidth : 0;
	const rawWidthLooksLikeFrameOverhang = Boolean(
		initialCrossings > 0 &&
		rawWidthValue > 0 &&
		maxLineRight > 0 &&
		rawWidthValue > maxLineRight + VERTICAL_RL_WIDTH_GUARD &&
		rawWidthValue - maxLineRight <= Math.max(32, pageLength * 0.1)
	);
	const minContentWidth = Math.max(
		rawWidthLooksLikeFrameOverhang
			? maxLineRight + VERTICAL_RL_WIDTH_GUARD
			: rawWidthValue,
		((totalPages - 1) * pageLength) + 1
	);

	for (let page = 1; page < totalPages; page += 1) {
		const boundary = snappedContentWidth - (page * pageLength);
		for (const box of lineBoxes) {
			if (box.left < boundary && box.right > boundary) {
				candidates.push(Math.floor(box.left - boundary - 1));
			}
		}
	}

	let best = {
		width: snappedContentWidth,
		delta: 0,
		crossings: initialCrossings
	};

	for (const delta of Array.from(new Set(candidates))) {
		if (!Number.isFinite(delta) || delta >= 0) {
			continue;
		}

		const width = snappedContentWidth + delta;
		if (width < minContentWidth) {
			continue;
		}

		const crossings = countVerticalRlBoundaryCrossings(width, pageLength, totalPages, lineBoxes);
		if (
			crossings < best.crossings ||
			(crossings === best.crossings && Math.abs(delta) < Math.abs(best.delta))
		) {
			best = { width, delta, crossings };
		}
	}

	return best.crossings < initialCrossings ? Math.ceil(best.width) : snappedContentWidth;
};

const stabilizeVerticalRlSnappedContentWidth = ({
	previous,
	snappedContentWidth,
	pageLength,
	totalPages,
	lineWidth
}: {
	previous?: { width?: number; totalPages?: number; pageLength?: number } | null;
	snappedContentWidth: number;
	pageLength: number;
	totalPages: number;
	lineWidth?: number | null;
}): number => {
	const width = Number(snappedContentWidth);
	const previousWidth = Number(previous && previous.width);
	if (
		!Number.isFinite(width) ||
		width <= 0 ||
		!previous ||
		!Number.isFinite(previousWidth) ||
		previousWidth <= 0 ||
		previous.totalPages !== totalPages ||
		Math.abs(Number(previous.pageLength || 0) - Number(pageLength || 0)) > 1
	) {
		return snappedContentWidth;
	}

	const maxReframeDrift = Math.max(
		24,
		Math.min(48, Math.ceil(Number(lineWidth || 0) + VERTICAL_RL_WIDTH_GUARD))
	);
	if (Math.abs(width - previousWidth) > maxReframeDrift) {
		return snappedContentWidth;
	}

	return Math.min(width, previousWidth);
};

const resolveVerticalRlEffectivePageAdvance = ({
	viewportPageWidth,
	linePitch,
	lineBoxes
}: {
	viewportPageWidth: number | null;
	linePitch: number | null;
	lineBoxes: LineBox[];
}): number | null => {
	const safeViewportPageWidth = Number(viewportPageWidth);
	const safeLinePitch = Number(linePitch);
	if (
		!Number.isFinite(safeViewportPageWidth) ||
		safeViewportPageWidth <= 0 ||
		!Number.isFinite(safeLinePitch) ||
		safeLinePitch <= 1 ||
		!Array.isArray(lineBoxes) ||
		!lineBoxes.length
	) {
		return safeViewportPageWidth;
	}

	const nearestColumnAdvance = Math.round(safeViewportPageWidth / safeLinePitch) * safeLinePitch;
	if (Math.abs(nearestColumnAdvance - safeViewportPageWidth) <= VERTICAL_RL_WIDTH_GUARD) {
		return safeViewportPageWidth;
	}

	const flooredColumnAdvance = Math.floor(safeViewportPageWidth / safeLinePitch) * safeLinePitch;
	if (
		Number.isFinite(flooredColumnAdvance) &&
		flooredColumnAdvance > 0 &&
		safeViewportPageWidth - flooredColumnAdvance > VERTICAL_RL_MIN_EDGE_GUARD
	) {
		return flooredColumnAdvance;
	}

	return safeViewportPageWidth;
};

const resolveHorizontalTextWidth = (range: Range, rangeRect: DOMRect, content: HTMLElement): number => {
	const width = Number(rangeRect && rangeRect.width);
	const scrollWidth = Number(content && content.scrollWidth);
	const clientWidth = Number(content && content.clientWidth);
	const ownerDocument = content && content.ownerDocument;
	const documentElementClientWidth = Number(ownerDocument && ownerDocument.documentElement && ownerDocument.documentElement.clientWidth);
	const bodyScrollWidth = Number(ownerDocument && ownerDocument.body && ownerDocument.body.scrollWidth);
	const viewportScrollWidth = Math.max(
		Number.isFinite(scrollWidth) ? scrollWidth : 0,
		Number.isFinite(bodyScrollWidth) ? bodyScrollWidth : 0
	);
	const visibleScrollWidth = Math.max(
		Number.isFinite(clientWidth) ? clientWidth : 0,
		Number.isFinite(bodyScrollWidth) ? bodyScrollWidth : 0
	);
	const visibleBodyWidth = Math.max(
		Number.isFinite(bodyScrollWidth) ? bodyScrollWidth : 0,
		Number.isFinite(scrollWidth) ? scrollWidth : 0
	);
	const frameViewportWidth = Number.isFinite(documentElementClientWidth) && documentElementClientWidth > 0
		? documentElementClientWidth
		: visibleScrollWidth;
	const viewportWidth = Number.isFinite(clientWidth) && clientWidth > 0
		? clientWidth
		: (visibleScrollWidth || viewportScrollWidth);
	const pollutedByOffscreenContent = (
		Number.isFinite(width) &&
		width > 0 &&
		rangeRect.left < -Math.max(1, viewportWidth) &&
		width > Math.max(1, visibleScrollWidth || viewportWidth) * 2
	);

	if (
		Number.isFinite(width) &&
		width > 0 &&
		visibleBodyWidth > 0 &&
		frameViewportWidth > 0 &&
		visibleBodyWidth <= frameViewportWidth + 1 &&
		width > visibleBodyWidth + 1
	) {
		return visibleBodyWidth;
	}

	if (
		Number.isFinite(width) &&
		width > 0 &&
		visibleScrollWidth > 0 &&
		viewportWidth > 0 &&
		visibleScrollWidth <= viewportWidth + 1 &&
		width > viewportWidth + 1
	) {
		return visibleScrollWidth;
	}

	if (!pollutedByOffscreenContent || !range || typeof range.getClientRects !== "function") {
		return width;
	}

	const rects = Array.from(range.getClientRects()).filter((rect: DOMRect) => {
		return (
			Number.isFinite(rect.left) &&
			Number.isFinite(rect.right) &&
			Number.isFinite(rect.bottom) &&
			rect.width > 0 &&
			rect.height > 0 &&
			rect.right > 0 &&
			rect.bottom > 0
		);
	});

	if (!rects.length) {
		return visibleScrollWidth || scrollWidth;
	}

	const minLeft = Math.min(...rects.map((rect) => rect.left));
	const maxRight = Math.max(...rects.map((rect) => rect.right));
	const filteredWidth = Math.max(0, maxRight - minLeft);

	return Math.max(filteredWidth, visibleScrollWidth);
};

const clampOnePageHorizontalTextWidth = (width: number, content: HTMLElement): number => {
	const safeWidth = Number(width);
	const scrollWidth = Number(content && content.scrollWidth);
	const ownerDocument = content && content.ownerDocument;
	const documentElementClientWidth = Number(ownerDocument && ownerDocument.documentElement && ownerDocument.documentElement.clientWidth);
	const bodyScrollWidth = Number(ownerDocument && ownerDocument.body && ownerDocument.body.scrollWidth);
	const visibleBodyWidth = Math.max(
		Number.isFinite(bodyScrollWidth) ? bodyScrollWidth : 0,
		Number.isFinite(scrollWidth) ? scrollWidth : 0
	);
	const frameViewportWidth = Number.isFinite(documentElementClientWidth) && documentElementClientWidth > 0
		? documentElementClientWidth
		: visibleBodyWidth;

	if (
		Number.isFinite(safeWidth) &&
		safeWidth > 0 &&
		visibleBodyWidth > 0 &&
		frameViewportWidth > 0 &&
		visibleBodyWidth <= frameViewportWidth + 1 &&
		safeWidth > visibleBodyWidth + 1
	) {
		return visibleBodyWidth;
	}

	return safeWidth;
};

/**
	* Handles DOM manipulation, queries and events for View contents
	* @class
	* @param {document} doc Document
	* @param {element} content Parent Element (typically Body)
	* @param {string} cfiBase Section component of CFIs
	* @param {number} sectionIndex Index in Spine of Conntent's Section
	* @param {string} sectionHref Section href
	*/
class Contents {
	[key: string]: any;
	declare epubcfi: EpubCFI;
	declare document: Document;
	declare documentElement: HTMLElement;
	declare content: HTMLElement;
	declare window: Window & typeof globalThis;
	declare _size: ContentsSize;
	declare sectionIndex: number;
	declare cfiBase: string;
	declare sectionHref: string;
	declare _verticalRlMetricsCache: VerticalRlMetricsCache | null;
	declare _verticalRlPageMetricsCache: VerticalRlPageMetricsCache | null;
	declare _verticalRlStableSnappedContentWidth?: { pageLength: number; totalPages: number; width: number } | null;
	declare _forcedWritingMode: string;
	declare _layoutStyle?: string;
	declare called: number;
	declare active: boolean;
	declare observer?: ResizeObserver | MutationObserver;
	declare expanding?: ReturnType<typeof setTimeout>;
	declare _resizeCheck?: EventListener;
	declare _triggerEvent?: EventListener;
	declare _onSelectionChange?: EventListener;
	declare selectionEndTimeout?: ReturnType<typeof setTimeout>;
	declare onResize?: (size: { width: number; height: number }) => void;

	constructor(doc: Document, content?: HTMLElement, cfiBase?: string, sectionIndex?: number, sectionHref?: string) {
		// Blank Cfi for Parsing
		this.epubcfi = new EpubCFI();

		this.document = doc;
		this.documentElement =  this.document.documentElement;
		this.content = content || this.document.body;
		this.window = this.document.defaultView!;

		this._size = {
			width: 0,
			height: 0
		};

		this.sectionIndex = sectionIndex || 0;
		this.cfiBase = cfiBase || "";
		this.sectionHref = sectionHref || "";
		this._verticalRlMetricsCache = null;
		this._verticalRlPageMetricsCache = null;
		this._forcedWritingMode = "";

		this.epubReadingSystem("epub.js", EPUBJS_VERSION);
		this.called = 0;
		this.active = true;
		this.listeners();
	}

	/**
		* Get DOM events that are listened for and passed along
		*/
	static get listenedEvents() {
		return DOM_EVENTS;
	}

	/**
		* Get or Set width
		* @param {number} [w]
		* @returns {number} width
		*/
	width(w?: number | string): number {
		// var frame = this.documentElement;
		var frame = this.content;

		if (w && isNumber(w)) {
			w = w + "px";
		}

		if (w) {
			frame.style.width = String(w);
			// this.content.style.width = w;
		}

		return parseInt(this.window.getComputedStyle(frame)["width"]);


	}

	/**
		* Get or Set height
		* @param {number} [h]
		* @returns {number} height
		*/
	height(h?: number | string): number {
		// var frame = this.documentElement;
		var frame = this.content;

		if (h && isNumber(h)) {
			h = h + "px";
		}

		if (h) {
			frame.style.height = String(h);
			// this.content.style.height = h;
		}

		return parseInt(this.window.getComputedStyle(frame)["height"]);

	}

	/**
		* Get or Set width of the contents
		* @param {number} [w]
		* @returns {number} width
		*/
	contentWidth(w?: number | string): number {

		var content = this.content || this.document.body;

		if (w && isNumber(w)) {
			w = w + "px";
		}

		if (w) {
			content.style.width = String(w);
		}

		return parseInt(this.window.getComputedStyle(content)["width"]);


	}

	/**
		* Get or Set height of the contents
		* @param {number} [h]
		* @returns {number} height
		*/
	contentHeight(h?: number | string): number {

		var content = this.content || this.document.body;

		if (h && isNumber(h)) {
			h = h + "px";
		}

		if (h) {
			content.style.height = String(h);
		}

		return parseInt(this.window.getComputedStyle(content)["height"]);

	}

	/**
		* Get the width of the text using Range
		* @returns {number} width
		*/
	textWidth() {
		let rect;
		let width;
		let range = this.document.createRange();
		let content = this.content || this.document.body;
		let border = borders(content);

		const wm = this.window && this.window.getComputedStyle(content).writingMode;
		if (wm === "vertical-rl") {
			const cacheKey = this.verticalRlMetricsCacheKey();
			if (this._verticalRlMetricsCache && this._verticalRlMetricsCache.key === cacheKey) {
				return this._verticalRlMetricsCache.width;
			}

			const rect = this.measureVerticalRlRect();
			width = rect.rawWidth;
			if (!Number.isFinite(width) || width <= 0) {
				width = Math.max(
					content.scrollWidth || 0,
					this.documentElement ? this.documentElement.scrollWidth || 0 : 0
				);
			}
			if (border && border.width) width += border.width;
			width = Math.ceil(width + VERTICAL_RL_WIDTH_GUARD);
			this._verticalRlMetricsCache = {
				key: cacheKey,
				width
			};
			return width;
		}

		// Select the contents of frame
		range.selectNodeContents(content);

		// get the width of the text content
		rect = range.getBoundingClientRect();
		width = resolveHorizontalTextWidth(range, rect, content);

		if (border && border.width) {
			width += border.width;
		}
		width = clampOnePageHorizontalTextWidth(width, content);

		return Math.round(width);
	}

	isViewportFillingSingleMediaPage(viewportWidth: number): boolean {
		const safeViewportWidth = Number(viewportWidth);
		const content = this.content || this.document.body;

		if (
			!content ||
			!this.document ||
			!this.window ||
			typeof content.querySelectorAll !== "function" ||
			!Number.isFinite(safeViewportWidth) ||
			safeViewportWidth <= 0
		) {
			return false;
		}

		const textBlocks = Array.from(content.querySelectorAll(VISIBLE_TEXT_BLOCK_SELECTOR))
			.filter((node: Element) => {
				const text = (node.textContent || "").replace(/\s+/g, "").trim();
				if (!text || typeof node.getBoundingClientRect !== "function") {
					return false;
				}
				const style = this.window.getComputedStyle(node);
				const rect = node.getBoundingClientRect();
				return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
			});

		if (textBlocks.length > 0) {
			return false;
		}

		const visibleText: string[] = [];
		const collectVisibleText = (node: Node | null): void => {
			if (!node) {
				return;
			}
			if (node.nodeType === TEXT_NODE) {
				visibleText.push(node.nodeValue || "");
				return;
			}
			if (node.nodeType !== ELEMENT_NODE) {
				return;
			}
			const style = this.window.getComputedStyle(node as Element);
			if (
				(node as HTMLElement).hidden ||
				style.display === "none" ||
				style.visibility === "hidden" ||
				style.visibility === "collapse"
			) {
				return;
			}
			Array.from(node.childNodes || []).forEach(collectVisibleText);
		};
		collectVisibleText(content);

		const normalizedText = visibleText.join(" ").replace(/\s+/g, " ").trim();
		if (normalizedText.length > 40) {
			return false;
		}

		const mediaNodes = Array.from(content.querySelectorAll(SINGLE_MEDIA_SELECTOR))
			.filter((node: Element) => {
				const tagName = node.tagName ? node.tagName.toLowerCase() : "";
				if (tagName !== "svg" && node.closest("svg")) {
					return false;
				}
				if (typeof node.getBoundingClientRect !== "function") {
					return false;
				}
				const style = this.window.getComputedStyle(node);
				const rect = node.getBoundingClientRect();
				return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
			});

		if (mediaNodes.length !== 1) {
			return false;
		}

		const media = mediaNodes[0] as Element;
		const tagName = media.tagName ? media.tagName.toLowerCase() : "";
		const mediaStyle = this.window.getComputedStyle(media);
		const mediaRect = media.getBoundingClientRect();
		const markedSingleImagePage = content.getAttribute && content.getAttribute("data-epub-single-image-centered") === "1";
		const viewportFillingStyle = (
			mediaStyle.objectFit === "contain" ||
			mediaStyle.position === "absolute" ||
			mediaStyle.position === "fixed"
		);
		const fillsViewportWidth = mediaRect.width >= safeViewportWidth * 0.75;
		const svgMediaPage = tagName === "svg" && (
			(media.getAttribute && media.getAttribute("viewBox")) ||
			(media.querySelector && media.querySelector("image"))
		);
		const oversizedMedia = (
			mediaRect.width > safeViewportWidth * 1.5 ||
			(content.scrollWidth || 0) > safeViewportWidth * 1.5 ||
			(this.documentElement && (this.documentElement.scrollWidth || 0) > safeViewportWidth * 1.5)
		);

		return Boolean(markedSingleImagePage || (viewportFillingStyle && (oversizedMedia || fillsViewportWidth || svgMediaPage)));
	}

	/**
		* Get the height of the text using Range
		* @returns {number} height
		*/
	textHeight() {
		let rect;
		let height;
		let range = this.document.createRange();
		let content = this.content || this.document.body;
		const wm = this.window && this.window.getComputedStyle(content).writingMode;

		if (wm === "vertical-rl") {
			const rect = this.measureVerticalRlRect();
			if (Number.isFinite(rect.rawHeight) && rect.rawHeight > 0) {
				return Math.ceil(rect.rawHeight);
			}
			// Fallback: scrollHeight chain
			const de = this.documentElement;
			const h = Math.max(
				(content.scrollHeight || 0),
				(de ? de.scrollHeight : 0)
			);
			if (h > 0) return h;
		}

		range.selectNodeContents(content);
		rect = range.getBoundingClientRect();
		height = rect.bottom;

		return Math.round(height);
	}

	/**
		* Get documentElement scrollWidth
		* @returns {number} width
		*/
	scrollWidth() {
		var width = this.documentElement.scrollWidth;

		return width;
	}

	/**
		* Get documentElement scrollHeight
		* @returns {number} height
		*/
	scrollHeight() {
		var height = this.documentElement.scrollHeight;

		return height;
	}

	verticalRlMetricsCacheKey(visiblePageWidth?: number, visiblePageHeight?: number): string {
		const content = this.content || this.document.body;
		const docEl = this.documentElement;
		const bodyStyle = content && this.window ? this.window.getComputedStyle(content) : null;
		const docFonts = this.document && this.document.fonts ? this.document.fonts : null;
		return [
			Number.isFinite(Number(visiblePageWidth)) ? Number(visiblePageWidth) : "",
			Number.isFinite(Number(visiblePageHeight)) ? Number(visiblePageHeight) : "",
			docEl ? docEl.clientWidth : 0,
			docEl ? docEl.clientHeight : 0,
			content ? content.clientWidth : 0,
			content ? content.clientHeight : 0,
			content ? content.childElementCount : 0,
			bodyStyle ? bodyStyle.fontSize : "",
			bodyStyle ? bodyStyle.lineHeight : "",
			bodyStyle ? bodyStyle.letterSpacing : "",
			bodyStyle ? bodyStyle.fontFamily : "",
			docFonts ? docFonts.status : ""
		].join(":");
	}

	invalidateVerticalRlMetricsCache() {
		this._verticalRlMetricsCache = null;
		this._verticalRlPageMetricsCache = null;
		this._verticalRlStableSnappedContentWidth = null;
	}

	/**
		* Set overflow css style of the contents
		* @param {string} [overflow]
		*/
	overflow(overflow?: string): string {

		if (overflow) {
			this.documentElement.style.overflow = overflow;
		}

		return this.window.getComputedStyle(this.documentElement)["overflow"];
	}

	/**
		* Set overflowX css style of the documentElement
		* @param {string} [overflow]
		*/
	overflowX(overflow?: string): string {

		if (overflow) {
			this.documentElement.style.overflowX = overflow;
		}

		return this.window.getComputedStyle(this.documentElement)["overflowX"];
	}

	/**
		* Set overflowY css style of the documentElement
		* @param {string} [overflow]
		*/
	overflowY(overflow?: string): string {

		if (overflow) {
			this.documentElement.style.overflowY = overflow;
		}

		return this.window.getComputedStyle(this.documentElement)["overflowY"];
	}

	/**
		* Set Css styles on the contents element (typically Body)
		* @param {string} property
		* @param {string} value
		* @param {boolean} [priority] set as "important"
		*/
	css(property: string, value?: string, priority?: boolean): string {
		var content = this.content || this.document.body;

		this.invalidateVerticalRlMetricsCache();

		if (value) {
			content.style.setProperty(property, value, priority ? "important" : "");
		} else {
			content.style.removeProperty(property);
		}

		return this.window.getComputedStyle(content).getPropertyValue(property);
	}

	/**
		* Get or Set the viewport element
		* @param {object} [options]
		* @param {string} [options.width]
		* @param {string} [options.height]
		* @param {string} [options.scale]
		* @param {string} [options.minimum]
		* @param {string} [options.maximum]
		* @param {string} [options.scalable]
		*/
	viewport(options?: ViewportSettings): ViewportSettings {
		// var width, height, scale, minimum, maximum, scalable;
		var $viewport = this.document.querySelector("meta[name='viewport']") as HTMLMetaElement | null;
		var parsed: ViewportSettings = {
			"width": undefined,
			"height": undefined,
			"scale": undefined,
			"minimum": undefined,
			"maximum": undefined,
			"scalable": undefined
		};
		var newContent: string[] = [];
		var settings: ViewportSettings = {};

		/*
		* check for the viewport size
		* <meta name="viewport" content="width=1024,height=697" />
		*/
		if($viewport && $viewport.hasAttribute("content")) {
			let content = $viewport.getAttribute("content") || "";
			let _width = content.match(/width\s*=\s*([^,]*)/);
			let _height = content.match(/height\s*=\s*([^,]*)/);
			let _scale = content.match(/initial-scale\s*=\s*([^,]*)/);
			let _minimum = content.match(/minimum-scale\s*=\s*([^,]*)/);
			let _maximum = content.match(/maximum-scale\s*=\s*([^,]*)/);
			let _scalable = content.match(/user-scalable\s*=\s*([^,]*)/);

			if(_width && _width.length && typeof _width[1] !== "undefined"){
				parsed.width = _width[1];
			}
			if(_height && _height.length && typeof _height[1] !== "undefined"){
				parsed.height = _height[1];
			}
			if(_scale && _scale.length && typeof _scale[1] !== "undefined"){
				parsed.scale = _scale[1];
			}
			if(_minimum && _minimum.length && typeof _minimum[1] !== "undefined"){
				parsed.minimum = _minimum[1];
			}
			if(_maximum && _maximum.length && typeof _maximum[1] !== "undefined"){
				parsed.maximum = _maximum[1];
			}
			if(_scalable && _scalable.length && typeof _scalable[1] !== "undefined"){
				parsed.scalable = _scalable[1];
			}
		}

		settings = defaults<ViewportSettingsRecord>((options || {}) as ViewportSettingsRecord, parsed as ViewportSettingsRecord);

		if (options) {
			if (settings.width) {
				newContent.push("width=" + settings.width);
			}

			if (settings.height) {
				newContent.push("height=" + settings.height);
			}

			if (settings.scale) {
				newContent.push("initial-scale=" + settings.scale);
			}

			if (settings.scalable === "no") {
				newContent.push("minimum-scale=" + settings.scale);
				newContent.push("maximum-scale=" + settings.scale);
				newContent.push("user-scalable=" + settings.scalable);
			} else {

				if (settings.scalable) {
					newContent.push("user-scalable=" + settings.scalable);
				}

				if (settings.minimum) {
					newContent.push("minimum-scale=" + settings.minimum);
				}

				if (settings.maximum) {
					newContent.push("minimum-scale=" + settings.maximum);
				}
			}

			if (!$viewport) {
				$viewport = this.document.createElement("meta");
				$viewport.setAttribute("name", "viewport");
				this.document.querySelector("head")!.appendChild($viewport);
			}

			$viewport.setAttribute("content", newContent.join(", "));

			this.window.scrollTo(0, 0);
		}


		return settings;
	}

	/**
	 * Event emitter for when the contents has expanded
	 * @private
	 */
	expand() {
		this.emit(EVENTS.CONTENTS.EXPAND);
	}

	/**
	 * Add DOM listeners
	 * @private
	 */
	listeners() {
		this.imageLoadListeners();

		this.mediaQueryListeners();

		// this.fontLoadListeners();

		this.addEventListeners();

		this.addSelectionListeners();

		// this.transitionListeners();

		if (typeof ResizeObserver === "undefined") {
			this.resizeListeners();
			this.visibilityListeners();
		} else {
			this.resizeObservers();
		}

		// this.mutationObservers();

		this.linksHandler();
	}

	/**
	 * Remove DOM listeners
	 * @private
	 */
	removeListeners() {

		this.removeEventListeners();

		this.removeSelectionListeners();

		if (this.observer) {
			this.observer.disconnect();
		}

		clearTimeout(this.expanding);
	}

	/**
	 * Check if size of contents has changed and
	 * emit 'resize' event if it has.
	 * @private
	 */
	resizeCheck() {
		// P-AITEHUB-0008: Guard against null document (contents destroyed before rAF fires)
		if (!this.document) return;
		this.invalidateVerticalRlMetricsCache();
		let width = this.textWidth();
		let height = this.textHeight();

		if (width != this._size.width || height != this._size.height) {

			this._size = {
				width: width,
				height: height
			};

			this.onResize && this.onResize(this._size);
			this.emit(EVENTS.CONTENTS.RESIZE, this._size);
		}
	}

	/**
	 * Poll for resize detection
	 * @private
	 */
	resizeListeners() {
		// Test size again
		clearTimeout(this.expanding);
		requestAnimationFrame(this.resizeCheck.bind(this));
		this.expanding = setTimeout(this.resizeListeners.bind(this), 350);
	}

	/**
	 * Listen for visibility of tab to change
	 * @private
	 */
	visibilityListeners() {
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible" && this.active === false) {
				this.active = true;
				this.resizeListeners();
			} else {
				this.active = false;
				clearTimeout(this.expanding);
			}
		});
	}

	/**
	 * Use css transitions to detect resize
	 * @private
	 */
	transitionListeners() {
		let body = this.content;

		body.style['transitionProperty'] = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height";
		body.style['transitionDuration'] = "0.001ms";
		body.style['transitionTimingFunction'] = "linear";
		body.style['transitionDelay'] = "0";

		this._resizeCheck = this.resizeCheck.bind(this);
		this.document.addEventListener('transitionend', this._resizeCheck);
	}

	/**
	 * Listen for media query changes and emit 'expand' event
	 * Adapted from: https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
	 * @private
	 */
	mediaQueryListeners() {
		var sheets = this.document.styleSheets;
		var mediaChangeHandler = function(m: MediaQueryListEvent | MediaQueryList){
			if(m.matches && !this._expanding) {
				setTimeout(this.expand.bind(this), 1);
			}
		}.bind(this);

		for (var i = 0; i < sheets.length; i += 1) {
			var rules;
			// Firefox errors if we access cssRules cross-domain
			try {
				rules = sheets[i].cssRules;
			} catch (e) {
				return;
			}
			if(!rules) return; // Stylesheets changed
			for (var j = 0; j < rules.length; j += 1) {
				//if (rules[j].constructor === CSSMediaRule) {
			if((rules[j] as CSSMediaRule).media){
				var mql = this.window.matchMedia((rules[j] as CSSMediaRule).media.mediaText);
					mql.addListener(mediaChangeHandler);
					//mql.onchange = mediaChangeHandler;
				}
			}
		}
	}

	/**
	 * Use ResizeObserver to listen for changes in the DOM and check for resize
	 * @private
	 */
	resizeObservers() {
		// create an observer instance
		this.observer = new ResizeObserver((e) => {
			requestAnimationFrame(this.resizeCheck.bind(this));
		});

		// pass in the target node
		this.observer.observe(this.document.documentElement);
	}

	/**
	 * Use MutationObserver to listen for changes in the DOM and check for resize
	 * @private
	 */
	mutationObservers() {
		// create an observer instance
		this.observer = new MutationObserver((mutations) => {
			this.resizeCheck();
		});

		// configuration of the observer:
		let config = { attributes: true, childList: true, characterData: true, subtree: true };

		// pass in the target node, as well as the observer options
		this.observer.observe(this.document, config);
	}

	/**
	 * Test if images are loaded or add listener for when they load
	 * @private
	 */
	imageLoadListeners() {
		var images = this.document.querySelectorAll("img");
		var img;
		for (var i = 0; i < images.length; i++) {
			img = images[i];

			if (typeof img.naturalWidth !== "undefined" &&
					img.naturalWidth === 0) {
				img.onload = this.expand.bind(this);
			}
		}
	}

	/**
	 * Listen for font load and check for resize when loaded
	 * @private
	 */
	fontLoadListeners() {
		if (!this.document || !this.document.fonts) {
			return;
		}

		this.document.fonts.ready.then(function () {
			this.resizeCheck();
		}.bind(this));

	}

	/**
	 * Get the documentElement
	 * @returns {element} documentElement
	 */
	root(): HTMLElement | null {
		if(!this.document) return null;
		return this.document.documentElement;
	}

	/**
	 * Get the location offset of a EpubCFI or an #id
	 * @param {string | EpubCFI} target
	 * @param {string} [ignoreClass] for the cfi
	 * @returns { {left: Number, top: Number }
	 */
	locationOf(target: string | EpubCFI, ignoreClass?: string): { left: number; top: number } {
		var position;
		var targetPos = {"left": 0, "top": 0};

		if(!this.document) return targetPos;

		if(this.epubcfi.isCfiString(target)) {
			let range = new EpubCFI(target).toRange(this.document, ignoreClass);

			if(range) {
				try {
					if (!range.endContainer ||
						(range.startContainer == range.endContainer
						&& range.startOffset == range.endOffset)) {
						// If the end for the range is not set, it results in collapsed becoming
						// true. This in turn leads to inconsistent behaviour when calling
						// getBoundingRect. Wrong bounds lead to the wrong page being displayed.
						// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15684911/
						let pos = range.startContainer.textContent.indexOf(" ", range.startOffset);
						if (pos == -1) {
							pos = range.startContainer.textContent.length;
						}
						range.setEnd(range.startContainer, pos);
					}
				} catch (e) {
					console.error("setting end offset to start container length failed", e);
				}

				if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
					position = (range.startContainer as Element).getBoundingClientRect();
					targetPos.left = position.left;
					targetPos.top = position.top;
				} else {
					// Webkit does not handle collapsed range bounds correctly
					// https://bugs.webkit.org/show_bug.cgi?id=138949

					// Construct a new non-collapsed range
					if (isWebkit) {
						let container = range.startContainer as Node & { length?: number };
						let newRange = new Range();
						try {
							if (container.nodeType === ELEMENT_NODE) {
								position = (container as Element).getBoundingClientRect();
							} else if (range.startOffset + 2 < (container.length || 0)) {
								newRange.setStart(container, range.startOffset);
								newRange.setEnd(container, range.startOffset + 2);
								position = newRange.getBoundingClientRect();
							} else if (range.startOffset - 2 > 0) {
								newRange.setStart(container, range.startOffset - 2);
								newRange.setEnd(container, range.startOffset);
								position = newRange.getBoundingClientRect();
							} else { // empty, return the parent element
								position = (container.parentNode as Element).getBoundingClientRect();
							}
						} catch (e) {
							console.error(e, e.stack);
						}
					} else {
						position = (range as Range).getBoundingClientRect();
					}
				}
			}

		} else if(typeof target === "string" &&
			target.indexOf("#") > -1) {

			let id = target.substring(target.indexOf("#")+1);
			let el = this.document.getElementById(id);
			if(el) {
				if (isWebkit) {
					// Webkit reports incorrect bounding rects in Columns
					let newRange = new Range();
					newRange.selectNode(el);
					position = newRange.getBoundingClientRect();
				} else {
					position = el.getBoundingClientRect();
				}

				if (!position || (!position.width && !position.height)) {
					position = this.locationOfElement(el);
				}
			}
		}

		if (position) {
			targetPos.left = position.left;
			targetPos.top = position.top;
		}

		return targetPos;
	}

	locationOfElement(el: Element): DOMRect | undefined {
		let candidate: Element | null = el;
		let position: DOMRect | undefined;

		while (candidate && candidate !== this.document.body) {
			if (candidate.getBoundingClientRect) {
				position = candidate.getBoundingClientRect();
				if (position && (position.width || position.height)) {
					return position;
				}
			}

			candidate = candidate.firstElementChild || candidate.nextElementSibling || candidate.parentElement;
		}

		return position;
	}

	/**
	 * Append a stylesheet link to the document head
	 * @param {string} src url
	 */
	addStylesheet(src: string): Promise<boolean> {
		return new Promise(function(this: Contents, resolve: (value: boolean) => void, reject: (reason?: unknown) => void){
			var $stylesheet: HTMLLinkElement | null;
			var ready = false;

			if(!this.document) {
				resolve(false);
				return;
			}

			// Check if link already exists
			$stylesheet = this.document.querySelector("link[href='"+src+"']");
			if ($stylesheet) {
				resolve(true);
				return; // already present
			}

			$stylesheet = this.document.createElement("link");
			$stylesheet.type = "text/css";
			$stylesheet.rel = "stylesheet";
			$stylesheet.href = src;
			($stylesheet as LoadableElement).onload = ($stylesheet as LoadableElement).onreadystatechange = function(this: LoadableElement) {
				if ( !ready && (!this.readyState || this.readyState == "complete") ) {
					ready = true;
					// Let apply
					setTimeout(() => {
						resolve(true);
					}, 1);
				}
			};

			this.document.head.appendChild($stylesheet);

		}.bind(this));
	}

	_getStylesheetNode(key?: string): HTMLStyleElement | false {
		var styleEl: HTMLElement | null;
		key = "epubjs-inserted-css-" + (key || '');

		if(!this.document) return false;

		// Check if link already exists
		styleEl = this.document.getElementById(key);
		if (!styleEl) {
			styleEl = this.document.createElement("style");
			styleEl.id = key;
			// Append style element to head
			this.document.head.appendChild(styleEl);
		}
		return styleEl as HTMLStyleElement;
	}

	/**
	 * Append stylesheet css
	 * @param {string} serializedCss
	 * @param {string} key If the key is the same, the CSS will be replaced instead of inserted
	 */
	addStylesheetCss(serializedCss: string, key?: string): boolean {
		if(!this.document || !serializedCss) return false;

		this.invalidateVerticalRlMetricsCache();

		var styleEl: HTMLStyleElement | false;
		styleEl = this._getStylesheetNode(key);
		if (!styleEl) return false;
		styleEl.innerHTML = serializedCss;

		return true;
	}

	/**
	 * Append stylesheet rules to a generate stylesheet
	 * Array: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
	 * Object: https://github.com/desirable-objects/json-to-css
	 * @param {array | object} rules
	 * @param {string} key If the key is the same, the CSS will be replaced instead of inserted
	 */
	addStylesheetRules(rules: StylesheetRules, key?: string): void {
		var styleSheet: CSSStyleSheet;

		if(!this.document || !rules || rules.length === 0) return;

		this.invalidateVerticalRlMetricsCache();

		// Grab style sheet
		const styleEl = this._getStylesheetNode(key);
		if (!styleEl || !styleEl.sheet) return;
		styleSheet = styleEl.sheet;

		if (Object.prototype.toString.call(rules) === "[object Array]") {
			const arrayRules = rules as StylesheetArrayRule[];
			for (var i = 0, rl = arrayRules.length; i < rl; i++) {
				var j = 1, rule: StylesheetRuleProperty[] | StylesheetArrayRule = arrayRules[i], selector = arrayRules[i][0], propStr = "";
				// If the second argument of a rule is an array of arrays, correct our variables.
				if (Object.prototype.toString.call(rule[1][0]) === "[object Array]") {
					rule = rule[1] as StylesheetRuleProperty[];
					j = 0;
				}

				for (var pl = rule.length; j < pl; j++) {
					var prop = rule[j] as StylesheetRuleProperty;
					propStr += prop[0] + ":" + prop[1] + (prop[2] ? " !important" : "") + ";\n";
				}

				// Insert CSS Rule
				styleSheet.insertRule(selector + "{" + propStr + "}", styleSheet.cssRules.length);
			}
		} else {
			const objectRules = rules as StylesheetObjectRule;
			const selectors = Object.keys(objectRules);
			selectors.forEach((selector) => {
				const definition = objectRules[selector];
				if (Array.isArray(definition)) {
					definition.forEach((item) => {
						const _rules = Object.keys(item);
						const result = _rules.map((rule) => {
							return `${rule}:${item[rule]}`;
						}).join(';');
						styleSheet.insertRule(`${selector}{${result}}`, styleSheet.cssRules.length);
					});
				} else {
					const definitionRules = definition as Record<string, string>;
					const _rules = Object.keys(definitionRules);
					const result = _rules.map((rule) => {
						return `${rule}:${definitionRules[rule]}`;
					}).join(';');
					styleSheet.insertRule(`${selector}{${result}}`, styleSheet.cssRules.length);
				}
			});
		}
	}

	/**
	 * Append a script tag to the document head
	 * @param {string} src url
	 * @returns {Promise} loaded
	 */
	addScript(src: string): Promise<boolean> {

		return new Promise(function(this: Contents, resolve: (value: boolean) => void, reject: (reason?: unknown) => void){
			var $script: HTMLScriptElement;
			var ready = false;

			if(!this.document) {
				resolve(false);
				return;
			}

			$script = this.document.createElement("script");
			$script.type = "text/javascript";
			$script.async = true;
			$script.src = src;
			($script as LoadableElement).onload = ($script as LoadableElement).onreadystatechange = function(this: LoadableElement) {
				if ( !ready && (!this.readyState || this.readyState == "complete") ) {
					ready = true;
					setTimeout(function(){
						resolve(true);
					}, 1);
				}
			};

			this.document.head.appendChild($script);

		}.bind(this));
	}

	/**
	 * Add a class to the contents container
	 * @param {string} className
	 */
	addClass(className: string): void {
		var content;

		if(!this.document) return;

		content = this.content || this.document.body;

		if (content) {
			content.classList.add(className);
		}

	}

	/**
	 * Remove a class from the contents container
	 * @param {string} removeClass
	 */
	removeClass(className: string): void {
		var content;

		if(!this.document) return;

		content = this.content || this.document.body;

		if (content) {
			content.classList.remove(className);
		}

	}

	/**
	 * Add DOM event listeners
	 * @private
	 */
	addEventListeners(){
		if(!this.document) {
			return;
		}

		this._triggerEvent = this.triggerEvent.bind(this);

		DOM_EVENTS.forEach(function(eventName){
			this.document.addEventListener(eventName, this._triggerEvent, { passive: true });
		}, this);

	}

	/**
	 * Remove DOM event listeners
	 * @private
	 */
	removeEventListeners(){
		if(!this.document) {
			return;
		}
		DOM_EVENTS.forEach(function(eventName){
			this.document.removeEventListener(eventName, this._triggerEvent, { passive: true });
		}, this);
		this._triggerEvent = undefined;
	}

	/**
	 * Emit passed browser events
	 * @private
	 */
	triggerEvent(e: Event): void {
		this.emit(e.type, e);
	}

	/**
	 * Add listener for text selection
	 * @private
	 */
	addSelectionListeners(){
		if(!this.document) {
			return;
		}
		this._onSelectionChange = this.onSelectionChange.bind(this);
		this.document.addEventListener("selectionchange", this._onSelectionChange, { passive: true } as AddEventListenerOptions);
	}

	/**
	 * Remove listener for text selection
	 * @private
	 */
	removeSelectionListeners(){
		if(!this.document) {
			return;
		}
		this.document.removeEventListener("selectionchange", this._onSelectionChange, { passive: true } as AddEventListenerOptions);
		this._onSelectionChange = undefined;
	}

	/**
	 * Handle getting text on selection
	 * @private
	 */
	onSelectionChange(e?: Event): void {
		if (this.selectionEndTimeout) {
			clearTimeout(this.selectionEndTimeout);
		}
		this.selectionEndTimeout = setTimeout(function() {
			var selection = this.window.getSelection();
			this.triggerSelectedEvent(selection);
		}.bind(this), 250);
	}

	/**
	 * Emit event on text selection
	 * @private
	 */
	triggerSelectedEvent(selection: Selection | null): void {
		var range, cfirange;

		if (selection && selection.rangeCount > 0) {
			range = selection.getRangeAt(0);
			if(!range.collapsed) {
				// cfirange = this.section.cfiFromRange(range);
				cfirange = new EpubCFI(range, this.cfiBase).toString();
				this.emit(EVENTS.CONTENTS.SELECTED, cfirange);
				this.emit(EVENTS.CONTENTS.SELECTED_RANGE, range);
			}
		}
	}

	/**
	 * Get a Dom Range from EpubCFI
	 * @param {EpubCFI} _cfi
	 * @param {string} [ignoreClass]
	 * @returns {Range} range
	 */
	range(_cfi: string | EpubCFI, ignoreClass?: string): Range | RangeObject | null {
		var cfi = new EpubCFI(_cfi);
		return cfi.toRange(this.document, ignoreClass);
	}

	/**
	 * Get an EpubCFI from a Dom Range
	 * @param {Range} range
	 * @param {string} [ignoreClass]
	 * @returns {EpubCFI} cfi
	 */
	cfiFromRange(range: Range | RangeObject, ignoreClass?: string): string {
		return new EpubCFI(range, this.cfiBase, ignoreClass).toString();
	}

	/**
	 * Get an EpubCFI from a Dom node
	 * @param {node} node
	 * @param {string} [ignoreClass]
	 * @returns {EpubCFI} cfi
	 */
	cfiFromNode(node: Node, ignoreClass?: string): string {
		return new EpubCFI(node, this.cfiBase, ignoreClass).toString();
	}

	// TODO: find where this is used - remove?
	map(layout: MappingLayout): EpubCFIPair[] {
		var map = new Mapping(layout);
		return map.section(undefined as any);
	}

	/**
	 * Size the contents to a given width and height
	 * @param {number} [width]
	 * @param {number} [height]
	 */
	size(width?: number, height?: number): void {
		var viewport: ViewportSettings = { scale: 1.0, scalable: "no" };

		this.layoutStyle("scrolling");

		if (width >= 0) {
			this.width(width);
			viewport.width = width;
			this.css("padding", "0 "+(width/12)+"px");
		}

		if (height >= 0) {
			this.height(height);
			viewport.height = height;
		}

		this.css("margin", "0");
		this.css("box-sizing", "border-box");


		this.viewport(viewport);
	}

	/**
	 * Apply columns to the contents for pagination
	 * @param {number} width
	 * @param {number} height
	 * @param {number} columnWidth
	 * @param {number} gap
	 */
	columns(width: number, height: number, columnWidth: number, gap: number, dir?: string): void {
		this.invalidateVerticalRlMetricsCache();

		let COLUMN_AXIS = prefixed("column-axis");
		let COLUMN_GAP = prefixed("column-gap");
		let COLUMN_WIDTH = prefixed("column-width");
		let COLUMN_FILL = prefixed("column-fill");

		let writingMode = this.writingMode();
		let axis = (writingMode.indexOf("vertical") === 0) ? "vertical" : "horizontal";

		this.layoutStyle("paginated");

		if (dir === "rtl" && axis === "horizontal") {
			this.direction(dir);
		}

		if (writingMode !== "vertical-rl") {
			this.width(width);
		}
		this.height(height);

		// Deal with Mobile trying to scale to viewport
		this.viewport({ width: width, height: height, scale: 1.0, scalable: "no" });

		if (writingMode === "vertical-rl") {
			// vertical-rl paginated content uses horizontal RTL paging.
			//
			// Books with writing-mode:vertical-rl lay out columns of vertical text
			// extending in the block direction (physical x, right-to-left). The full
			// content is wider than one page; epub.js RTL-scrolls the iframe one
			// pageWidth at a time.
			//
			// Architecture:
			//   html = clip layer   (overflow:hidden — clips to the page viewport)
			//   body = canvas       (overflow:visible, height = pageHeight, width
			//                        unconstrained so the book CSS x-layout is preserved)
			//
			// textWidth() uses Range.getBoundingClientRect() on body contents to measure
			// the true physical x-span (right-to-left, so rect.right is the rightmost
			// column, rect.left may be negative for columns beyond the iframe left edge).
			// expand() snaps to pageWidth multiples and reframes the iframe width.
			// layout.delta = pageWidth so next/prev advances one page.

			// outer clip layer
			if (this.documentElement) {
				this.documentElement.style.setProperty("overflow", "hidden", "important");
				this.documentElement.style.setProperty("margin", "0", "");
				this.documentElement.style.setProperty("padding", "0", "");
			}

			// canvas layer — fixed height (= one page), unconstrained width
			const body = this.content || this.document.body;
			body.style.margin    = "0";
			body.style.padding   = "0";
			body.style.width     = "";          // let book CSS determine x-extent
			body.style.height    = height + "px";
			body.style.overflow  = "visible";
			body.style.maxWidth  = "none";
			body.style.minWidth  = "";
			body.style.boxSizing = "border-box";
			// clear any residual multicol properties
			body.style.removeProperty(COLUMN_WIDTH);
			body.style.removeProperty(COLUMN_GAP);
			body.style.removeProperty(COLUMN_FILL);
			body.style.removeProperty(COLUMN_AXIS);
		} else {
			this.css("overflow-y", "hidden");
			this.css("margin", "0", true);

			if (axis === "vertical") {
				this.css("padding-top", (gap / 2) + "px", true);
				this.css("padding-bottom", (gap / 2) + "px", true);
				this.css("padding-left", "20px");
				this.css("padding-right", "20px");
				this.css(COLUMN_AXIS, "vertical");
			} else {
				this.css("padding-top", "20px");
				this.css("padding-bottom", "20px");
				this.css("padding-left", (gap / 2) + "px", true);
				this.css("padding-right", (gap / 2) + "px", true);
				this.css(COLUMN_AXIS, "horizontal");
			}

			this.css("box-sizing", "border-box");
			this.css("max-width", "inherit");
			this.css(COLUMN_FILL, "auto");
			this.css(COLUMN_GAP, gap + "px");
			this.css(COLUMN_WIDTH, columnWidth + "px");
		}

		// Fix glyph clipping in WebKit
		// https://github.com/futurepress/epub.js/issues/983
		this.css("-webkit-line-box-contain", "block glyphs replaced");

	}

	measureVerticalRlRect(): { left: number; right: number; top: number; bottom: number; rawWidth: number; rawHeight: number } {
		const content = this.content || this.document.body;
		if (!content || !this.document) {
			return {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				rawWidth: 0,
				rawHeight: 0
			};
		}

		try {
			const range = this.document.createRange();
			range.selectNodeContents(content);
			const rect = range.getBoundingClientRect();
			const rawWidth = Math.max(rect.width || 0, rect.right || 0);
			return {
				left: rect.left,
				right: rect.right,
				top: rect.top,
				bottom: rect.bottom,
				rawWidth,
				rawHeight: Math.max(rect.height || 0, rect.bottom - Math.min(rect.top, 0))
			};
		} catch(e) {
			return {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				rawWidth: 0,
				rawHeight: 0
			};
		}
	}

	detectFixedColumnPitch(visiblePageWidth?: number): VerticalRlLineMetrics | null {
		const content = this.content || this.document.body;
		if (!content || !this.document || !this.window) {
			return null;
		}

		let rects: DOMRect[] = [];
		try {
			const range = this.document.createRange();
			range.selectNodeContents(content);
			rects = Array.from(range.getClientRects ? range.getClientRects() : []);
		} catch(e) {
			rects = [];
		}

		const safePageWidth = Number(visiblePageWidth);
		const maxGap = Number.isFinite(safePageWidth) && safePageWidth > 0
			? safePageWidth * 0.75
			: 140;
		const xs: number[] = [];
		const widths: number[] = [];
		const lineBoxes: LineBox[] = [];

		for (const rect of rects) {
			if (rect.width > 0 && rect.height > 0) {
				xs.push(Math.round(rect.left * 2) / 2);
				widths.push(rect.width);
				lineBoxes.push({
					left: rect.left,
					right: rect.right,
					width: rect.width
				});
			}
		}

		const uniqueXs = Array.from(new Set(xs))
			.sort((a, b) => a - b);
		const gaps = [];
		for (let i = 1; i < uniqueXs.length; i += 1) {
			const gap = Math.abs(uniqueXs[i] - uniqueXs[i - 1]);
			if (gap > 2 && gap < maxGap) {
				gaps.push(gap);
			}
		}

		const linePitch = median(gaps);
		const lineWidth = median(widths.filter((width) => width >= 4 && width <= 80));
		const gapMad = Number.isFinite(linePitch)
			? median(gaps.map((gap) => Math.abs(gap - linePitch)))
			: null;
		const stable = Boolean(
			gaps.length >= 4 &&
			Number.isFinite(linePitch) &&
			Number.isFinite(gapMad) &&
			gapMad <= Math.max(3, linePitch * 0.08)
		);

		if (!Number.isFinite(linePitch) || !stable) {
			return null;
		}

		return {
			linePitch,
			lineWidth,
			lineLefts: uniqueXs,
			lineBoxes,
			sampleCount: gaps.length,
			gapMad,
			stable
		};
	}

	estimateVerticalRlLineMetrics(visiblePageWidth?: number): VerticalRlLineMetrics {
		return this.detectFixedColumnPitch(visiblePageWidth) || {
			linePitch: null,
			lineWidth: null,
			lineLefts: [],
			lineBoxes: [],
			sampleCount: 0,
			gapMad: null,
			stable: false
		};
	}

	verticalRlPageMetrics(pageWidth?: number, pageHeight?: number): VerticalRlPageMetrics {
		const safePageWidth = Number(pageWidth);
		const safePageHeight = Number(pageHeight);
		const cacheKey = this.verticalRlMetricsCacheKey(safePageWidth, safePageHeight);
		if (this._verticalRlPageMetricsCache && this._verticalRlPageMetricsCache.key === cacheKey) {
			return this._verticalRlPageMetricsCache.metrics;
		}

		const rect = this.measureVerticalRlRect();
		let rawWidth = rect.rawWidth;
		let rawHeight = rect.rawHeight;
		const content = this.content || this.document.body;
		if (this.isViewportFillingSingleMediaPage(safePageWidth)) {
			const pageLength = Number.isFinite(safePageWidth) && safePageWidth > 0
				? safePageWidth
				: 1;
			rawHeight = Math.ceil(Math.max(
				Number.isFinite(rawHeight) && rawHeight > 0 ? rawHeight : 0,
				Number.isFinite(safePageHeight) && safePageHeight > 0 ? safePageHeight : 0,
				content ? content.scrollHeight || 0 : 0,
				this.documentElement ? this.documentElement.scrollHeight || 0 : 0
			));
			const result: VerticalRlPageMetrics = {
				rawWidth: pageLength,
				rawPaintWidth: pageLength,
				rawHeight,
				pageWidth: pageLength,
				viewportPageWidth: pageLength,
				effectivePageAdvance: pageLength,
				linePitch: null,
				lineWidth: null,
				edgeGuardPx: 0,
				edgeGuard: 0,
				pageBoundaryShift: 0,
				sampleCount: 0,
				gapMad: null,
				stable: false,
				verticalFragmentPages: 1,
				totalPages: 1,
				snappedContentWidth: pageLength
			};
			this._verticalRlPageMetricsCache = {
				key: cacheKey,
				metrics: result
			};
			this._verticalRlStableSnappedContentWidth = {
				pageLength,
				totalPages: 1,
				width: pageLength
			};
			return result;
		}
		const contentScrollWidth = content ? content.scrollWidth || 0 : 0;
		const contentClientWidth = content ? content.clientWidth || content.offsetWidth || 0 : 0;
		const documentScrollWidth = this.documentElement ? this.documentElement.scrollWidth || 0 : 0;
		const contentCoversDocumentCanvas = Boolean(
			documentScrollWidth > 0 &&
			contentClientWidth > 0 &&
			contentClientWidth >= documentScrollWidth - VERTICAL_RL_WIDTH_GUARD
		);
		const positiveInlineOffset = Boolean(
			Number.isFinite(rect.left) &&
			Number.isFinite(rect.right) &&
			Number.isFinite(rect.rawWidth) &&
			contentCoversDocumentCanvas &&
			rect.left > VERTICAL_RL_WIDTH_GUARD &&
			rect.right >= rect.rawWidth - VERTICAL_RL_WIDTH_GUARD &&
			rect.rawWidth > contentScrollWidth + VERTICAL_RL_WIDTH_GUARD &&
			documentScrollWidth >= rect.rawWidth - VERTICAL_RL_WIDTH_GUARD
		);
		const scrollWidthLimit = positiveInlineOffset
			? Math.max(contentScrollWidth, documentScrollWidth)
			: contentScrollWidth;
		if (!Number.isFinite(rawWidth) || rawWidth <= 0) {
			rawWidth = Math.max(
				contentScrollWidth,
				documentScrollWidth
			);
		} else if (
			Number.isFinite(scrollWidthLimit) &&
			scrollWidthLimit > safePageWidth &&
			rawWidth > scrollWidthLimit + VERTICAL_RL_WIDTH_GUARD
		) {
			rawWidth = scrollWidthLimit;
		}
		if (!Number.isFinite(rawHeight) || rawHeight <= 0) {
			rawHeight = Math.max(
				content ? content.scrollHeight || 0 : 0,
				this.documentElement ? this.documentElement.scrollHeight || 0 : 0
			);
		}
		rawWidth = Math.ceil(rawWidth + VERTICAL_RL_WIDTH_GUARD);
		rawHeight = Math.ceil(rawHeight);

		const metrics = this.estimateVerticalRlLineMetrics(safePageWidth);
		let viewportPageWidth = Number.isFinite(safePageWidth) && safePageWidth > 0 ? safePageWidth : null;
		let effectivePageAdvance = metrics.stable
			? resolveVerticalRlEffectivePageAdvance({
				viewportPageWidth,
				linePitch: metrics.linePitch,
				lineBoxes: metrics.lineBoxes
			})
			: viewportPageWidth;
		const structuralBleed = viewportPageWidth && effectivePageAdvance
			? Math.max(0, viewportPageWidth - effectivePageAdvance)
			: 0;
		const edgeGuardPx = (
			metrics.stable &&
			Number.isFinite(metrics.lineWidth) &&
			metrics.lineWidth > 0 &&
			structuralBleed > VERTICAL_RL_MIN_EDGE_GUARD
		)
			? Math.min(
				Math.floor(structuralBleed / 2),
				Math.max(VERTICAL_RL_MIN_EDGE_GUARD, Math.ceil(metrics.lineWidth / 2) + 1)
			)
			: 0;

		const pageLength = effectivePageAdvance || viewportPageWidth || 1;
		let totalPages = Math.max(
			1,
			viewportPageWidth && effectivePageAdvance && viewportPageWidth > effectivePageAdvance
				? Math.ceil(Math.max(0, rawWidth - viewportPageWidth) / effectivePageAdvance) + 1
				: Math.ceil(rawWidth / pageLength)
		);
		let verticalFragmentPages = 1;
		if (
			totalPages <= 1 &&
			Number.isFinite(safePageHeight) &&
			safePageHeight > 0 &&
			Number.isFinite(rawHeight) &&
			rawHeight > safePageHeight + VERTICAL_RL_MIN_EDGE_GUARD
		) {
			const contentStyle = content && this.window ? this.window.getComputedStyle(content) : null;
			const columnGap = contentStyle ? cssPixelValue(contentStyle.columnGap) : 0;
			const blockAdvance = Math.max(1, safePageHeight + Math.max(0, columnGap));
			verticalFragmentPages = Math.max(1, Math.ceil(Math.max(0, rawHeight - safePageHeight) / blockAdvance) + 1);
			totalPages = Math.max(totalPages, verticalFragmentPages);
		}
		const baseSnappedContentWidth = viewportPageWidth && effectivePageAdvance && viewportPageWidth > effectivePageAdvance
			? ((totalPages - 1) * effectivePageAdvance) + viewportPageWidth
			: totalPages * pageLength;
		let snappedContentWidth = snapVerticalRlContentWidthToTextBoundaries({
			snappedContentWidth: baseSnappedContentWidth,
			pageLength,
			totalPages,
			rawWidth,
			lineBoxes: metrics.lineBoxes
		});
		snappedContentWidth = stabilizeVerticalRlSnappedContentWidth({
			previous: this._verticalRlStableSnappedContentWidth,
			snappedContentWidth,
			pageLength,
			totalPages,
			lineWidth: metrics.lineWidth
		});
		this._verticalRlStableSnappedContentWidth = {
			pageLength,
			totalPages,
			width: snappedContentWidth
		};
		const pageBoundaryShift = edgeGuardPx;
		const result = {
			rawWidth,
			rawPaintWidth: rawWidth,
			rawHeight,
			pageWidth: viewportPageWidth || pageLength,
			viewportPageWidth,
			effectivePageAdvance,
			linePitch: metrics.linePitch,
			lineWidth: metrics.lineWidth,
			edgeGuardPx,
			edgeGuard: edgeGuardPx,
			pageBoundaryShift,
			sampleCount: metrics.sampleCount,
			gapMad: metrics.gapMad,
			stable: metrics.stable,
			verticalFragmentPages,
			totalPages,
			snappedContentWidth
		};
		this._verticalRlPageMetricsCache = {
			key: cacheKey,
			metrics: result
		};
		return result;
	}

	debugVerticalRlMetrics(pageWidth?: number): VerticalRlDebugMetrics {
		const content = this.content || this.document.body;
		const htmlStyle = this.documentElement ? this.window.getComputedStyle(this.documentElement) : null;
		const bodyStyle = content ? this.window.getComputedStyle(content) : null;
		let rangeRect = null;

		try {
			const range = this.document.createRange();
			range.selectNodeContents(content);
			rangeRect = range.getBoundingClientRect();
		} catch(e) {
			rangeRect = null;
		}

		const bodyRect = content && content.getBoundingClientRect ? content.getBoundingClientRect() : null;
		const pageMetrics = this.verticalRlPageMetrics(pageWidth);
		const rawContentWidth = pageMetrics.rawWidth;
		const snappedContentWidth = pageMetrics.snappedContentWidth;
		const totalPages = pageMetrics.totalPages;

		const result: VerticalRlDebugMetrics = {
			userAgent: this.window.navigator.userAgent,
			htmlWritingMode: htmlStyle ? htmlStyle.writingMode : null,
			bodyWritingMode: bodyStyle ? bodyStyle.writingMode : null,
			htmlDirection: htmlStyle ? htmlStyle.direction : null,
			bodyDirection: bodyStyle ? bodyStyle.direction : null,
			htmlOverflow: htmlStyle ? htmlStyle.overflow : null,
			bodyOverflow: bodyStyle ? bodyStyle.overflow : null,
			bodyRectLeft: bodyRect ? bodyRect.left : null,
			bodyRectRight: bodyRect ? bodyRect.right : null,
			bodyRectWidth: bodyRect ? bodyRect.width : null,
			rangeRectLeft: rangeRect ? rangeRect.left : null,
			rangeRectRight: rangeRect ? rangeRect.right : null,
			rangeRectWidth: rangeRect ? rangeRect.width : null,
			rawContentWidth,
			rawContentHeight: pageMetrics.rawHeight,
			snappedContentWidth,
			pageWidth: pageMetrics.pageWidth,
			effectivePageAdvance: pageMetrics.effectivePageAdvance,
			linePitch: pageMetrics.linePitch,
			lineWidth: pageMetrics.lineWidth,
			edgeGuardPx: pageMetrics.edgeGuardPx,
			sampleCount: pageMetrics.sampleCount,
			gapMad: pageMetrics.gapMad,
			stable: pageMetrics.stable,
			totalPages
		};

		if ((this.window as any).console && (this.window as any).console.debug) {
			(this.window as any).console.debug("[epubjs:vertical-rl]", result);
		}

		return result;
	}

	/**
	 * Scale contents from center
	 * @param {number} scale
	 * @param {number} offsetX
	 * @param {number} offsetY
	 */
	scaler(scale: number, offsetX?: number, offsetY?: number): void {
		var scaleStr = "scale(" + scale + ")";
		var translateStr = "";
		// this.css("position", "absolute"));
		this.css("transform-origin", "top left");

		if (offsetX >= 0 || offsetY >= 0) {
			translateStr = " translate(" + (offsetX || 0 )+ "px, " + (offsetY || 0 )+ "px )";
		}

		this.css("transform", scaleStr + translateStr);
	}

	/**
	 * Fit contents into a fixed width and height
	 * @param {number} width
	 * @param {number} height
	 */
	fit(width: number, height: number, section?: unknown): void {
		var viewport = this.viewport();
		var viewportWidth = parseInt(String(viewport.width));
		var viewportHeight = parseInt(String(viewport.height));
		var widthScale = width / viewportWidth;
		var heightScale = height / viewportHeight;
		var scale = widthScale < heightScale ? widthScale : heightScale;

		// the translate does not work as intended, elements can end up unaligned
		// var offsetY = (height - (viewportHeight * scale)) / 2;
		// var offsetX = 0;
		// if (this.sectionIndex % 2 === 1) {
		// 	offsetX = width - (viewportWidth * scale);
		// }

		this.layoutStyle("paginated");

		// scale needs width and height to be set
		this.width(viewportWidth);
		this.height(viewportHeight);
		this.overflow("hidden");

		// Scale to the correct size
		this.scaler(scale, 0, 0);
		// this.scaler(scale, offsetX > 0 ? offsetX : 0, offsetY);

		// background images are not scaled by transform
		this.css("background-size", viewportWidth * scale + "px " + viewportHeight * scale + "px");

		this.css("background-color", "transparent");
		if (hasPageSpreadLeft(section)) {
			// set margin since scale is weird
			var marginLeft = width - (viewportWidth * scale);
			this.css("margin-left", marginLeft + "px");
		}
	}

	/**
	 * Set the direction of the text
	 * @param {string} [dir="ltr"] "rtl" | "ltr"
	 */
	direction(dir?: string): void {
		if (this.documentElement) {
			this.documentElement.style["direction"] = dir || "";
		}
	}

	mapPage(cfiBase: string, layout: MappingLayout, start: number, end: number, dev?: boolean): EpubCFIPair | undefined {
		var mapping = new Mapping(layout, undefined, undefined, dev);

		return mapping.page(this as any, cfiBase, start, end);
	}

	/**
	 * Emit event when link in content is clicked
	 * @private
	 */
	linksHandler() {
		replaceLinks(this.content, (href) => {
			this.emit(EVENTS.CONTENTS.LINK_CLICKED, href);
		}, this.sectionHref);
	}

	/**
	 * Set the writingMode of the text
	 * @param {string} [mode="horizontal-tb"] "horizontal-tb" | "vertical-rl" | "vertical-lr"
	 */
	writingMode(mode?: string): string {
		let WRITING_MODE = prefixed("writing-mode");

		if (mode && this.documentElement) {
			this.documentElement.style.setProperty(WRITING_MODE, mode);
		}

		// Read writing-mode from the body element's own stylesheet rules rather than
		// computed style, because a shim may set html { writing-mode: horizontal-tb !important }
		// for geometry correctness — which cascades down and masks a vertical-rl body.
		// We scan the document's stylesheets for any rule that targets body (or *) and
		// sets writing-mode, falling back to documentElement computed style.
		const bodyEl = this.document && this.document.body;
		if (bodyEl) {
			// Check body inline style first
			const inlineWM = bodyEl.style && bodyEl.style.getPropertyValue(WRITING_MODE);
			if (inlineWM && inlineWM !== "horizontal-tb") {
				return inlineWM;
			}
			// Scan stylesheets for body/html/universal writing-mode rules
			try {
				const sheets = Array.from(this.document.styleSheets || []);
				for (const sheet of sheets) {
					let rules;
					try { rules = Array.from(sheet.cssRules || []); } catch(e) { continue; }
					for (const rule of rules) {
						const styleRule = rule as CssRuleWithSelector;
						if (styleRule.style && styleRule.selectorText) {
							const sel = styleRule.selectorText.toLowerCase();
							if (sel === "body" || sel === "html, body" || sel === "body, html") {
								const wm = styleRule.style.getPropertyValue(WRITING_MODE);
								if (wm && wm !== "horizontal-tb") return wm;
							}
						}
					}
				}
			} catch(e) { /* ignore */ }
		}

		// Fallback: prefer body computed style over documentElement, because a shim
		// may set html { writing-mode: horizontal-tb !important } which would mask
		// a vertical-rl body when reading documentElement computed style.
		if (bodyEl) {
			const bodyComputedWM = this.window.getComputedStyle(bodyEl).getPropertyValue(WRITING_MODE);
			if (bodyComputedWM && bodyComputedWM !== "horizontal-tb") {
				return bodyComputedWM;
			}
		}
		const documentComputedWM = this.window.getComputedStyle(this.documentElement).getPropertyValue(WRITING_MODE) || '';
		if (documentComputedWM && documentComputedWM !== "horizontal-tb") {
			return documentComputedWM;
		}

		return this._forcedWritingMode || documentComputedWM;
	}

	forceWritingMode(mode?: string): string {
		if (mode === "vertical-rl" || mode === "vertical-lr" || mode === "horizontal-tb") {
			this._forcedWritingMode = mode;
		}

		return this._forcedWritingMode;
	}

	/**
	 * Set the layoutStyle of the content
	 * @param {string} [style="paginated"] "scrolling" | "paginated"
	 * @private
	 */
	layoutStyle(style?: string): string {

		if (style) {
			this._layoutStyle = style;
			(navigator as EpubNavigator).epubReadingSystem.layoutStyle = this._layoutStyle;
		}

		return this._layoutStyle || "paginated";
	}

	/**
	 * Add the epubReadingSystem object to the navigator
	 * @param {string} name
	 * @param {string} version
	 * @private
	 */
	epubReadingSystem(name: string, version: string): EpubReadingSystem {
		(navigator as EpubNavigator).epubReadingSystem = {
			name: name,
			version: version,
			layoutStyle: this.layoutStyle(),
			hasFeature: function (feature: string) {
				switch (feature) {
				case "dom-manipulation":
					return true;
				case "layout-changes":
					return true;
				case "touch-events":
					return true;
				case "mouse-events":
					return true;
				case "keyboard-events":
					return true;
				case "spine-scripting":
					return false;
				default:
					return false;
				}
			}
		};
		return (navigator as EpubNavigator).epubReadingSystem;
	}

	destroy() {
		// this.document.removeEventListener('transitionend', this._resizeCheck);

		this.removeListeners();

	}
}

interface Contents {
	emit(type: string, ...args: unknown[]): void;
	on(type: string, listener: (...args: unknown[]) => void): unknown;
	off(type: string, listener: (...args: unknown[]) => void): unknown;
	once(type: string, listener: (...args: unknown[]) => void): unknown;
}

EventEmitter(Contents.prototype);

export default Contents;

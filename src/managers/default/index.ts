import EventEmitter from "event-emitter";
import { defer, type Deferred as CoreDeferred } from "../../core/async";
import { extend } from "../../core/collections";
import { isNumber } from "../../core/types";
import { windowBounds } from "../../platform/layout";
import { collectVisibleTextClientRects } from "../../platform/traversal";
import scrollType from "../../utils/scrolltype";
import Mapping from "../../mapping";
import Queue from "../../utils/queue";
import EpubCFI from "../../epubcfi";
import type Contents from "../../contents";
import type Layout from "../../layout";
import type { ManagerLocationItem } from "../../rendition";
import {
	cacheVerticalRlLogicalPageOffset as cacheVerticalRlLogicalPageOffsetHelper,
	countPagesWithFractionalTolerance as countPagesWithFractionalToleranceHelper,
	getCachedVerticalRlLogicalPageOffset as getCachedVerticalRlLogicalPageOffsetHelper,
	getCurrentPageIndexForOffset as getCurrentPageIndexForOffsetHelper,
	getLogicalOffsetForPageIndex as getLogicalOffsetForPageIndexHelper,
	getRenderedVerticalRlEdgeMaskWidths as getRenderedVerticalRlEdgeMaskWidthsHelper,
	getPageBoundaryShift as getPageBoundaryShiftHelper,
	getPageSnapTolerance as getPageSnapToleranceHelper,
	getVerticalRlCleanPageEdgeMaskInput as getVerticalRlCleanPageEdgeMaskInputHelper,
	getVerticalRlBoundarySnapMeasurementInputs as getVerticalRlBoundarySnapMeasurementInputsHelper,
	getVerticalRlCurrentEffectiveLeftBoundary as getVerticalRlCurrentEffectiveLeftBoundaryHelper,
	getVerticalRlEdgeMaskLimit as getVerticalRlEdgeMaskLimitHelper,
	getVerticalRlEdgeMaskSnapInput as getVerticalRlEdgeMaskSnapInputHelper,
	getVerticalRlEdgeMaskSnapViewportInput as getVerticalRlEdgeMaskSnapViewportInputHelper,
	getVerticalRlEdgeMaskWidth as getVerticalRlEdgeMaskWidthHelper,
	getVerticalRlLogicalPageStepToNextPage as getVerticalRlLogicalPageStepToNextPageHelper,
	getVerticalRlRawLeftSnapDecisionForRects as getVerticalRlRawLeftSnapDecisionForRectsHelper,
	getVerticalRlRawRightSnapDecisionForRects as getVerticalRlRawRightSnapDecisionForRectsHelper,
	getVerticalRlSequentialRightBoundaryConstraint as getVerticalRlSequentialRightBoundaryConstraintHelper,
	getVerticalRlStructuralGutterEdgeMaskSnapInput as getVerticalRlStructuralGutterEdgeMaskSnapInputHelper,
	getPreviousVerticalRlLeftMaskInput as getPreviousVerticalRlLeftMaskInputHelper,
	hasVerticalRlEdgeMaskStructuralGutter as hasVerticalRlEdgeMaskStructuralGutterHelper,
	getVerticalRlPreviousPageRightMask as getVerticalRlPreviousPageRightMaskHelper,
	getVerticalRlBoundarySnapPipelineResult as getVerticalRlBoundarySnapPipelineResultHelper,
	getVerticalRlStructuralEdgeMaskInput as getVerticalRlStructuralEdgeMaskInputHelper,
	getVerticalRlRectDistanceToLogicalViewport as getVerticalRlRectDistanceToLogicalViewportHelper,
	getVerticalRlLogicalPageOffsetCacheKey as getVerticalRlLogicalPageOffsetCacheKeyHelper,
	getVerticalRlViewportRect as getVerticalRlViewportRectHelper,
	getVerticalRlViewportRects as getVerticalRlViewportRectsHelper,
	hasVerticalRlStructuralPageGutter as hasVerticalRlStructuralPageGutterHelper,
	getVerticalRlBoundarySnapPreflight as getVerticalRlBoundarySnapPreflightHelper,
	runVerticalRlEdgeMaskSnapLoop as runVerticalRlEdgeMaskSnapLoopHelper,
	collectVerticalRlSemanticRects,
	getVerticalRlSemanticCoverage,
	getVerticalRlRawViewportForOffset,
	planVerticalRlTerminalContinuations,
	characterizeVerticalRlTerminalCoveragePolicies,
	type VerticalRlBoundarySnapCacheEntry,
	type VerticalRlLogicalPageOffsetCache
} from "../../rendering/pagination";
import Stage from "../helpers/stage";
import Views from "../helpers/views";
import { EVENTS } from "../../utils/constants";

type ManagerDeferred<T = unknown> = CoreDeferred<T> & {
	resolve(value?: T | PromiseLike<T>): void;
	reject(reason?: unknown): void;
};

const Deferred = defer as unknown as {
	new<T = unknown>(): ManagerDeferred<T>;
};

type EdgeMaskWidths = { left: number; right: number };
type VerticalRlDebugWindow = Window & {
	__EPUB_VRL_DEBUG__?: boolean;
	__EPUB_VRL_SCROLL_TRACE__?: Array<Record<string, unknown>>;
	__EPUB_VRL_TERMINAL_COVERAGE_TRACE__?: Array<Record<string, unknown>>;
	__EPUB_VRL_TERMINAL_CONTINUATION_ENABLED__?: boolean;
};

/**
 * 記錄 vertical-rl 捲動診斷事件，僅在 window.__EPUB_VRL_DEBUG__ 為真時作用。
 *
 * 消費端：cptw 的 e2e harness 以 installVerticalRlScrollTrace() 開啟旗標，
 * 再由 readVerticalRlScrollTrace() 讀取 window.__EPUB_VRL_SCROLL_TRACE__，
 * 併入 turnEvidence 供失敗分析使用。
 *
 * 注意：保留上限為 4000 筆，高頻 stage 仍可能擠掉較早的事件；
 * 診斷時應限縮量測範圍或減少同時啟用的 stage。
 *
 * @param stage 診斷階段名稱
 * @param detail 該階段要記錄的欄位
 * @return {void}
 */
const appendVerticalRlScrollTrace = (stage: string, detail: Record<string, unknown>): void => {
	if (typeof window === "undefined" || !(window as VerticalRlDebugWindow).__EPUB_VRL_DEBUG__) {
		return;
	}

	let debugWindow = window as VerticalRlDebugWindow;
	if (!Array.isArray(debugWindow.__EPUB_VRL_SCROLL_TRACE__)) {
		debugWindow.__EPUB_VRL_SCROLL_TRACE__ = [];
	}
	debugWindow.__EPUB_VRL_SCROLL_TRACE__.push({
		stage,
		capturedAt: Date.now(),
		...detail
	});
	if (debugWindow.__EPUB_VRL_SCROLL_TRACE__.length > 4000) {
		debugWindow.__EPUB_VRL_SCROLL_TRACE__.splice(0, debugWindow.__EPUB_VRL_SCROLL_TRACE__.length - 4000);
	}
};

const appendVerticalRlTerminalCoverageTrace = (
	event: string,
	detail: Record<string, unknown>
): void => {
	if (typeof window === "undefined" || !(window as VerticalRlDebugWindow).__EPUB_VRL_DEBUG__) {
		return;
	}

	let debugWindow = window as VerticalRlDebugWindow;
	if (!Array.isArray(debugWindow.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__)) {
		debugWindow.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__ = [];
	}

	debugWindow.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__.push({
		event,
		capturedAt: Date.now(),
		...detail
	});

	if (debugWindow.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__.length > 200) {
		debugWindow.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__.splice(
			0,
			debugWindow.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__.length - 200
		);
	}
};

const isVerticalRlDebugEnabled = (): boolean => (
	typeof window !== "undefined" &&
		Boolean((window as VerticalRlDebugWindow).__EPUB_VRL_DEBUG__)
);

const isVerticalRlTerminalContinuationEnabled = (): boolean => {
	if (!isVerticalRlDebugEnabled()) {
		return true;
	}

	let debugWindow = window as VerticalRlDebugWindow;
	return debugWindow.__EPUB_VRL_TERMINAL_CONTINUATION_ENABLED__ !== false;
};
type SnapLimits = {
	rawLeft?: number;
	rawRight?: number;
	leftMaxMask?: number;
	rightMaxMask?: number;
	nextPageStep?: number;
	previousPageStep?: number;
	forceRawLeftMask?: boolean;
	allowRawLeftMask?: boolean;
	allowRawRightMask?: boolean;
	maxRightBoundary?: number;
	preferredRightBoundary?: number;
	ignoreCachedLogicalOffset?: boolean;
	sequentialRightBoundary?: number;
	useCurrentOffset?: boolean;
	pageIndex?: number;
};
type VerticalRlSequentialBoundaryConstraint = {
	pageIndex: number;
	maxRightBoundary: number;
	preferredRightBoundary: number;
};
type TextRect = {
	left: number;
	right: number;
	top?: number;
	bottom?: number;
	width?: number;
	height?: number;
};
type ManagerRenderSize = {
	width: number | string | null | false;
	height: number | string | null | false;
};
type ManagerSnapOptions = {
	duration?: number;
	minVelocity?: number;
	minDistance?: number;
	easing?: (position: number) => number;
	[key: string]: unknown;
};
type ManagerScrollState = {
	scrolled: boolean;
};
export type ManagerSettings = {
	[key: string]: unknown;
	infinite?: boolean;
	hidden?: boolean;
	width?: number | string | null | false;
	height?: number | string | null | false;
	axis?: string;
	writingMode?: string;
	flow?: string;
	ignoreClass?: string;
	fullsize?: boolean;
	overflow?: string;
	allowScriptedContent?: boolean;
	allowPopups?: boolean;
	method?: unknown;
	size?: ManagerRenderSize;
	rtlScrollType?: string;
	direction?: string;
	resizeOnOrientationChange?: boolean;
	gap?: number;
	offset?: number;
	offsetDelta?: number;
	snap?: boolean | ManagerSnapOptions;
	afterScrolledTimeout?: number;
	verticalRlFontReadyTimeout?: number;
	verticalRlBoundarySnapRetryDelays?: number[];
	resizeSettleTrace?: boolean;
};
export type ResizeSettleTraceEntry = {
	sequence: number;
	generation: number;
	event: string;
	detail: Record<string, unknown>;
	detailJson?: string;
	elapsedMs?: number | null;
};
export type ManagerViewSettings = {
	[key: string]: unknown;
	ignoreClass?: string;
	axis?: string;
	flow?: string;
	layout?: Layout;
	method?: unknown;
	width: number;
	height: number;
	forceEvenPages: boolean;
	allowScriptedContent?: boolean;
	allowPopups?: boolean;
	direction?: string;
};
type ManagerOffset = {
	left: number;
	top: number;
};
type ViewResizeBounds = {
	widthDelta: number;
	heightDelta: number;
};
type ManagerBounds = {
	left: number;
	right: number;
	top: number;
	bottom: number;
	width: number;
	height: number;
};
type ManagerStageSize = {
	width: number;
	height: number;
};
type ManagerSection = {
	cfiBase: string;
	href?: string;
	index?: number;
	properties?: {
		includes(value: string): boolean;
	};
	next(): ManagerSection | undefined;
	prev(): ManagerSection | undefined;
};
type ManagerView = {
	section: ManagerSection;
	contents: Contents;
	onDisplayed?: () => void;
	onResize?: () => void;
	expanded?: boolean;
	iframe?: HTMLIFrameElement;
	// IframeView 實際上有這兩個欄位（見 managers/views/iframe.ts），型別卻漏了宣告，
	// 於是 resize 同步那段程式碼一直帶著 9 個型別錯誤。這些錯誤先前沒被 CI 擋下，
	// 是因為 push 只在 main 觸發，而相關程式碼只存在於 release 分支上。
	element?: HTMLElement;
	_width?: number | null;
	_contentWidth?: number;
	_viewportFillingSingleMediaPage?: boolean;
	_forceEvenPageAdded?: boolean;
	offset(): ManagerOffset;
	width(): number;
	height(): number;
	locationOf(target: string | number): ManagerOffset;
	display(request: unknown): Promise<ManagerView>;
	show(): void;
	hide(): void;
	bounds(): ViewResizeBounds;
	setLayout(layout: Layout): void;
	on(type: string, listener: (...args: unknown[]) => void): unknown;
};
export type ManagerViewConstructor = new (section: unknown, settings: ManagerViewSettings) => ManagerView;
type DefaultManagerOptions = {
	settings: ManagerSettings;
	view: ManagerViewConstructor;
	request: unknown;
	queue: unknown;
};
type VisibleManagerView = ManagerView & {
	position(): ManagerBounds;
};
type PositionedView = {
	section?: unknown;
	position?: () => ManagerBounds;
};
type ManagerViewsBridge = {
	length: number;
	all(): ManagerView[];
	find(section: ManagerSection): ManagerView | undefined;
	first(): ManagerView;
	last(): ManagerView;
	indexOf(view: ManagerView): number;
	slice(start?: number, end?: number): ManagerView[];
	append(view: ManagerView): ManagerView;
	prepend(view: ManagerView): ManagerView;
	remove(view: unknown): void;
	displayed(): VisibleManagerView[];
	forEach(callback: (view: ManagerView) => void): void;
	show(): void;
	hide(): void;
	clear(): void;
};

class DefaultViewManager {
	declare orientationTimeout?: ReturnType<typeof setTimeout>;
	declare resizeTimeout?: ReturnType<typeof setTimeout>;
	declare afterScrolled?: ReturnType<typeof setTimeout>;
	declare _verticalRlBoundarySnapAfterScroll?: ReturnType<typeof setTimeout>;
	declare _verticalRlEdgeMaskComputing?: boolean;
	declare _onUnload?: EventListener;
	declare _onScroll?: EventListener;
	declare _stageSize?: ManagerStageSize;
	declare _bounds?: ManagerBounds;
	declare winBounds?: ManagerBounds;
	declare rendered: boolean;
	declare _layoutDirty: boolean;
	declare _lastLayoutStageSize: ManagerStageSize | null;
	declare ignore: boolean;
	declare scrollTop: number;
	declare scrollLeft: number;
	declare target?: string | number;
	declare writingMode?: string;
	declare isPaginated: boolean;
	declare layout: Layout;
	declare mapping: Mapping;
	declare _verticalRlLogicalPageOffsetCache?: VerticalRlLogicalPageOffsetCache | null;
	declare _verticalRlAppliedLeftMaskLedger?: Record<string, number> | null;
	declare _verticalRlAppliedLeftMaskLedgerKey?: string | null;
	declare _verticalRlPageIndexLookupKey?: string | null;
	declare _verticalRlPageIndexLookupOffset?: number | null;
	declare _verticalRlPageIndexLookupResult?: number | null;
	declare _verticalRlBoundarySnapCache?: VerticalRlBoundarySnapCacheEntry | null;
	declare _verticalRlSequentialBoundaryConstraint?: VerticalRlSequentialBoundaryConstraint | null;
	declare _verticalRlBoundarySnapRetryToken?: number;
	declare _verticalRlBoundarySnapApplying?: boolean;
	declare _verticalRlViewportClipOverlay?: HTMLDivElement;
	declare _verticalRlTerminalContinuationOffsets?: number[];
	declare _verticalRlNominalTerminalOffset?: number | null;
	declare _verticalRlTerminalCoverageProjectionInProgress?: boolean;
	declare _verticalRlTerminalCoverageProjectionKey?: string | null;
	declare _verticalRlTerminalCoverageProjectionResult?: boolean | null;
	declare _verticalRlLogicalPageScrollInProgress?: boolean;
	declare _resizeSettleTrace?: ResizeSettleTraceEntry[];
	declare _resizeSettleTraceSequence?: number;
	declare _resizeSettleTraceGeneration?: number;
	declare _verticalRlPreviousParentPosition?: string;
	declare location: Array<ManagerLocationItem | null | undefined>;
	declare name: string;
	declare optsSettings: ManagerSettings;
	declare settings: ManagerSettings;
	declare View: ManagerViewConstructor;
	declare request: unknown;
	declare renditionQueue: unknown;
	declare q: Queue;
	declare stage: Stage;
	declare container: HTMLDivElement;
	declare views: ManagerViewsBridge;
	declare overflow?: string;
	declare viewSettings: ManagerViewSettings;
	declare emit: (type: string, ...args: unknown[]) => void;
	declare on: (type: string, listener: (...args: unknown[]) => void) => unknown;
	declare off: (type: string, listener: (...args: unknown[]) => void) => unknown;
	declare once: (type: string, listener: (...args: unknown[]) => void) => unknown;

	constructor(options: DefaultManagerOptions) {

		this.name = "default";
		this.optsSettings = options.settings;
		this.View = options.view;
		this.request = options.request;
		this.renditionQueue = options.queue;
		this.q = new Queue(this);

		this.settings = extend(this.settings || {}, {
			infinite: true,
			hidden: false,
			width: undefined,
			height: undefined,
			axis: undefined,
			writingMode: undefined,
			flow: "scrolled",
			ignoreClass: "",
			fullsize: undefined,
			allowScriptedContent: false,
			allowPopups: false
		});

		extend(this.settings, options.settings || {});

		this.viewSettings = {
			ignoreClass: this.settings.ignoreClass,
			axis: this.settings.axis,
			flow: this.settings.flow,
			layout: this.layout,
			method: this.settings.method, // srcdoc, blobUrl, write
			width: 0,
			height: 0,
			forceEvenPages: true,
			allowScriptedContent: this.settings.allowScriptedContent,
			allowPopups: this.settings.allowPopups
		};

		this.rendered = false;
		this._layoutDirty = true;
		this._lastLayoutStageSize = null;
		this._resizeSettleTrace = [];
		this._resizeSettleTraceSequence = 0;
		this._resizeSettleTraceGeneration = 0;

	}

	recordResizeSettleTrace(event: string, detail: Record<string, unknown> = {}): void {
		if (!this.settings?.resizeSettleTrace) {
			return;
		}

		let trace = this._resizeSettleTrace || [];
		let entry = {
			sequence: (this._resizeSettleTraceSequence || 0) + 1,
			generation: this._resizeSettleTraceGeneration || 0,
			event,
			detail,
			detailJson: JSON.stringify(detail),
			elapsedMs: typeof performance !== "undefined" && performance.now
				? Math.round(performance.now() * 100) / 100
				: null
		};
		this._resizeSettleTraceSequence = entry.sequence;
		trace.push(entry);
		if (trace.length > 200) {
			trace.splice(0, trace.length - 200);
		}
		this._resizeSettleTrace = trace;
	}

	getResizeSettleTrace(): ResizeSettleTraceEntry[] {
		return (this._resizeSettleTrace || []).map(function(entry){
			return {
				sequence: entry.sequence,
				generation: entry.generation,
				event: entry.event,
				detail: Object.assign({}, entry.detail),
				detailJson: entry.detailJson,
				elapsedMs: entry.elapsedMs
			};
		});
	}

	clearResizeSettleTrace(): void {
		this._resizeSettleTrace = [];
		this._resizeSettleTraceSequence = 0;
	}

	traceTargetOwnership(view: ManagerView, target: string | number, offset: ManagerOffset): void {
		let rangeDetail: Record<string, unknown> = {};
		if (typeof target === "string" && this.epubcfiTarget(target)) {
			try {
				let range = new EpubCFI(target).toRange(view.contents.document, this.settings.ignoreClass);
				let rect = range && "getBoundingClientRect" in range
					? range.getBoundingClientRect()
					: null;
				rangeDetail = {
					startOffset: range ? range.startOffset : null,
					endOffset: range ? range.endOffset : null,
					collapsed: range ? range.collapsed : null,
					left: rect ? rect.left : null,
					right: rect ? rect.right : null,
					top: rect ? rect.top : null,
					bottom: rect ? rect.bottom : null
				};
			} catch (error) {
				rangeDetail = {
					error: error instanceof Error ? error.message : String(error)
				};
			}
		}
		this.recordResizeSettleTrace("display:target-mapped", {
			target,
			href: view.section.href || null,
			offset: {
				left: offset.left,
				top: offset.top
			},
			range: rangeDetail,
			pageAdvance: this.getPageAdvance(),
			viewWidth: view.width(),
			container: this.resizeSettleContainerSnapshot()
		});
	}

	epubcfiTarget(target: string): boolean {
		return target.indexOf("epubcfi(") === 0;
	}

	resizeSettleContainerSnapshot(): Record<string, number | null> {
		return {
			clientWidth: this.container ? this.container.clientWidth : null,
			clientHeight: this.container ? this.container.clientHeight : null,
			scrollLeft: this.container ? this.container.scrollLeft : null,
			scrollTop: this.container ? this.container.scrollTop : null,
			scrollWidth: this.container ? this.container.scrollWidth : null,
			scrollHeight: this.container ? this.container.scrollHeight : null
		};
	}

	render(element: HTMLElement, size: ManagerRenderSize): void {
		let tag = element.tagName;

		if (typeof this.settings.fullsize === "undefined" &&
				tag && (tag.toLowerCase() == "body" ||
				tag.toLowerCase() == "html")) {
			this.settings.fullsize = true;
		}

		if (this.settings.fullsize) {
			this.settings.overflow = "visible";
			this.overflow = this.settings.overflow;
		}

		this.settings.size = size;

		this.settings.rtlScrollType = scrollType();

		// Save the stage
		this.stage = new Stage({
			width: size.width,
			height: size.height,
			overflow: this.overflow,
			hidden: this.settings.hidden,
			axis: this.settings.axis,
			fullsize: this.settings.fullsize,
			direction: this.settings.direction
		});

		this.stage.attachTo(element);

		// Get this stage container div
		this.container = this.stage.getContainer();

		// Views array methods
		this.views = new Views(this.container) as unknown as ManagerViewsBridge;

		// Calculate Stage Size
		this._bounds = this.bounds();
		this._stageSize = this.stage.size();

		// Set the dimensions for views
		this.viewSettings.width = this._stageSize.width;
		this.viewSettings.height = this._stageSize.height;

		// Function to handle a resize event.
		// Will only attach if width and height are both fixed.
		this.stage.onResize(this.onResized.bind(this));

		this.stage.onOrientationChange(this.onOrientationChange.bind(this));

		// Add Event Listeners
		this.addEventListeners();

		// Add Layout method
		// this.applyLayoutMethod();
		if (this.layout) {
			this.updateLayout();
		}

		this.rendered = true;

	}

	addEventListeners(){
		var scroller;

		this._onUnload = function(e: Event){
			this.destroy();
		}.bind(this);

		window.addEventListener("unload", this._onUnload);

		if(!this.settings.fullsize) {
			scroller = this.container;
		} else {
			scroller = window;
		}

		this._onScroll = this.onScroll.bind(this);
		scroller.addEventListener("scroll", this._onScroll);
	}

	removeEventListeners(){
		var scroller;

		if(!this.settings.fullsize) {
			scroller = this.container;
		} else {
			scroller = window;
		}

		scroller.removeEventListener("scroll", this._onScroll);
		this._onScroll = undefined;

		window.removeEventListener("unload", this._onUnload);
		this._onUnload = undefined;
	}

	destroy(){
		clearTimeout(this.orientationTimeout);
		clearTimeout(this.resizeTimeout);
		clearTimeout(this.afterScrolled);
		// 直排的邊界 snap 重試也要一起取消，否則銷毀後它仍會醒來並操作已拆掉的 stage。
		clearTimeout(this._verticalRlBoundarySnapAfterScroll);

		this.clear();

		this.removeEventListeners();

		this.removeVerticalRlViewportClip();

		this.stage.destroy();

		this.rendered = false;

		/*

			clearTimeout(this.trimTimeout);
			if(this.settings.hidden) {
				this.element.removeChild(this.wrapper);
			} else {
				this.element.removeChild(this.container);
			}
		*/
	}

	onOrientationChange(e?: Event): void {
		let {orientation} = window;

		if(this.optsSettings.resizeOnOrientationChange) {
			this.resize();
		}

		// Per ampproject:
		// In IOS 10.3, the measured size of an element is incorrect if the
		// element size depends on window size directly and the measurement
		// happens in window.resize event. Adding a timeout for correct
		// measurement. See https://github.com/ampproject/amphtml/issues/8479
		clearTimeout(this.orientationTimeout);
		this.orientationTimeout = setTimeout(function(){
			this.orientationTimeout = undefined;

			if(this.optsSettings.resizeOnOrientationChange) {
				this.resize();
			}

			this.emit(EVENTS.MANAGERS.ORIENTATION_CHANGE, orientation);
		}.bind(this), 500);

	}

	onResized(e?: Event): void {
		this.resize();
	}

	resize(width?: number, height?: number, epubcfi?: string): void {
		// render 之前沒有 stage 可調整，此時 resize 沒有任何意義；不擋掉的話
		// 下一行就會對 undefined 取值。
		if (!this.stage) {
			return;
		}

		let stageSize = this.stage.size(width, height);

		// For Safari, wait for orientation to catch up
		// if the window is a square
		this.winBounds = windowBounds();
		if (this.orientationTimeout &&
				this.winBounds.width === this.winBounds.height) {
			// reset the stage size for next resize
			this._stageSize = undefined;
			return;
		}

		if (this._stageSize &&
				this._stageSize.width === stageSize.width &&
				this._stageSize.height === stageSize.height ) {
			if (epubcfi) {
				this.recordResizeSettleTrace("resize:location-handoff", {
					epubcfi,
					stageSize: Object.assign({}, stageSize),
					container: this.resizeSettleContainerSnapshot()
				});
				this.emit(EVENTS.MANAGERS.RESIZED, {
					width: stageSize.width,
					height: stageSize.height
				}, epubcfi);
			}
			// Size is the same, no need to resize
			return;
		}

		this._resizeSettleTraceGeneration = (this._resizeSettleTraceGeneration || 0) + 1;
		this.recordResizeSettleTrace("resize:capture", {
			input: {
				width: width ?? null,
				height: height ?? null,
				epubcfi: epubcfi || null,
				managerTarget: this.target || null
			},
			previousStageSize: this._stageSize ? Object.assign({}, this._stageSize) : null,
			nextStageSize: Object.assign({}, stageSize),
			container: this.resizeSettleContainerSnapshot()
		});

		this._stageSize = stageSize;

		this._bounds = this.bounds();

		// Clear current views
		this.clear();

		// Update for new views
		this.viewSettings.width = this._stageSize.width;
		this.viewSettings.height = this._stageSize.height;

		this.updateLayout();
		this.recordResizeSettleTrace("resize:layout-updated", {
			stageSize: Object.assign({}, this._stageSize),
			layout: {
				width: this.layout?.width ?? null,
				height: this.layout?.height ?? null,
				delta: this.layout?.delta ?? null,
				pageWidth: this.layout?.pageWidth ?? null
			},
			container: this.resizeSettleContainerSnapshot()
		});

		this.emit(EVENTS.MANAGERS.RESIZED, {
			width: this._stageSize.width,
			height: this._stageSize.height
		}, epubcfi || this.target);
	}

	createView(section: unknown, forceRight?: boolean): ManagerView {
		return new this.View(section, extend(this.viewSettings, { forceRight }) );
	}

	handleNextPrePaginated(
		forceRight: boolean,
		section: ManagerSection,
		action: (section: unknown) => ManagerView | Promise<ManagerView>
	): ManagerView | Promise<ManagerView> | void {
		let next;

		if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
			if (forceRight || section.index === 0) {
				// First page (cover) should stand alone for pre-paginated books
				return;
			}
			next = section.next();
			if (next && !next.properties!.includes("page-spread-left")) {
				return action.call(this, next);
			}
		}
	}

	display(section: ManagerSection, target?: string | number): Promise<void> {

		var displaying = new Deferred<void>();
		var displayed = displaying.promise;

		// Check if moving to target is needed
		if (target === section.href || isNumber(target)) {
			target = undefined;
		}

		// If the window is resized before rendered, call resize with original target
		this.target = target;
		this.recordResizeSettleTrace("display:start", {
			href: section.href || null,
			target: target || null,
			caller: new Error().stack
				?.split("\n")
				.slice(1, 6)
				.join("\n") || null,
			container: this.resizeSettleContainerSnapshot()
		});

		// Check to make sure the section we want isn't already shown
		var visible: ManagerView | undefined = this.views.find(section);

		// View is already shown, just move to correct location in view
		if(visible && section && this.layout.name !== "pre-paginated") {
			let offset = visible.offset();

			if (this.settings.direction === "ltr") {
				this.scrollTo(offset.left, offset.top, true);
			} else {
				let width = visible.width();
				this.scrollTo(offset.left + width, offset.top, true);
			}

			if(target) {
				let offset = visible.locationOf(target);
				let width = visible.width();
				this.traceTargetOwnership(visible, target, offset);
				this.moveTo(offset, width);
			}

			displaying.resolve();
			return displayed;
		}

		// Hide all current views
		this.clear();

		let forceRight = false;
		if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && section.properties!.includes("page-spread-right")) {
			forceRight = true;
		}

		this.add(section, forceRight)
			.then(function(view: ManagerView){

				// Move to correct place within the section, if needed
				if(target) {
					let offset = view.locationOf(target);
					let width = view.width();
					this.traceTargetOwnership(view, target, offset);
					this.moveTo(offset, width);
				}

			}.bind(this), (err: unknown) => {
				displaying.reject(err);
			})
			.then(function(){
				return this.handleNextPrePaginated(forceRight, section, this.add);
			}.bind(this))
			.then(function(){

				this.views.show();
				if (this.isRtlVerticalPaginated() && !target) {
					this.scrollToLogicalPage(0);
				}

				displaying.resolve();

			}.bind(this));
		// .then(function(){
		// 	return this.hooks.display.trigger(view);
		// }.bind(this))
		// .then(function(){
		// 	this.views.show();
		// }.bind(this));
		return displayed;
	}

	afterDisplayed(view: ManagerView): void {
		if (this.isRtlVerticalPaginated()) {
			this.queueVerticalRlBoundarySnapRetryForCurrentOffset();
		}
		this.emit(EVENTS.MANAGERS.ADDED, view);
	}

	afterResized(view: ManagerView): void {
		this.syncVerticalRlViewportClip();
		this.emit(EVENTS.MANAGERS.RESIZE, view.section);
	}

	getVerticalRlPageIndexForOffset(offset: ManagerOffset, width?: number): number {
		let advance = this.getPageAdvance() || 0;
		let view = this.views && (this.views.first() || this.views.last());
		let contentWidth = Math.max(
			width || 0,
			(view && view.width ? view.width() : 0) || 0,
			this.container.scrollWidth || 0
		);
		let visiblePageWidth = this.layout.pageWidth || this.layout.width || advance;
		let totalPages = this.getTotalPagesForCurrentView();
		let maxPhysicalStart = Math.max(0, contentWidth - visiblePageWidth);
		let maxLogicalScroll = this.getMaxLogicalScrollLeft();
		let targetLeft = Math.max(0, Math.min(contentWidth, Number(offset.left) || 0));
		let tolerance = this.getPageSnapTolerance();
		let toleranceMatch = null;
		let nearestIndex = 0;
		let nearestDistance = Infinity;

		// offset → pageIndex 的對應同樣要以實際位置為準，否則理論網格與實際步進的
		// 差異會讓索引逐頁漂移。此處直接讀 ledger 快取而不走 getVerticalRlPageOffset，
		// 因為後者會經遮罩邏輯間接呼叫 getCurrentPageIndex，形成遞迴。
		let offsetLedgerKey = this.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxLogicalScroll);

		for (let i = 0; i < totalPages; i++) {
			let ledgerOffset = this.getCachedVerticalRlLogicalPageOffset(i, offsetLedgerKey);
			let logicalOffset = Number.isFinite(ledgerOffset)
				? (ledgerOffset as number)
				: this.getLogicalOffsetForPageIndex(i, totalPages, maxLogicalScroll);
			let physicalStart = Math.max(0, Math.min(maxPhysicalStart, maxPhysicalStart - logicalOffset));
			let physicalEnd = Math.min(contentWidth, physicalStart + visiblePageWidth);

			if (targetLeft >= physicalStart && targetLeft <= physicalEnd) {
				return i;
			}

			if (toleranceMatch === null && targetLeft >= physicalStart - tolerance && targetLeft <= physicalEnd + tolerance) {
				toleranceMatch = i;
			}

			let distance = targetLeft < physicalStart
				? physicalStart - targetLeft
				: targetLeft - physicalEnd;

			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestIndex = i;
			}
		}

		if (toleranceMatch !== null) {
			return toleranceMatch;
		}

		return nearestIndex;
	}

	moveTo(offset: ManagerOffset, width?: number): void {
		var distX = 0,
				distY = 0;

		if(!this.isPaginated) {
			distY = offset.top;
		} else {
			let pageAdvance = this.getPageAdvance() || this.layout.delta || this.layout.width || 1;
			if (this.isRtlVerticalPaginated()) {
				this.scrollToLogicalPage(this.getVerticalRlPageIndexForOffset(offset, width));
				return;
			}
			distX = Math.floor(offset.left / pageAdvance) * pageAdvance;

			if (distX + pageAdvance > this.container.scrollWidth) {
				distX = Math.max(0, this.container.scrollWidth - pageAdvance);
			}

			if (this.settings.axis === "vertical") {
				distY = Math.floor(offset.top / this.layout.height) * this.layout.height;

				if (distY + this.layout.height > this.container.scrollHeight) {
					distY = Math.max(0, this.container.scrollHeight - this.layout.height);
				}
			} else {
				distY = Math.floor(offset.top / pageAdvance) * pageAdvance;

				if (distY + pageAdvance > this.container.scrollHeight) {
					distY = Math.max(0, this.container.scrollHeight - pageAdvance);
				}
			}
		}
		if(this.settings.direction === "rtl"){
			/***
				the `floor` function above (L343) is on positive values, so we should add one `layout.delta`
				to distX or use `Math.ceil` function, or multiply offset.left by -1
				before `Math.floor`
			*/
			distX = distX + this.getPageAdvance();
			distX = distX - width;
		}
		this.recordResizeSettleTrace("display:scroll-target", {
			offset: {
				left: offset.left,
				top: offset.top
			},
			viewWidth: width ?? null,
			pageAdvance: this.getPageAdvance(),
			direction: this.settings.direction || null,
			axis: this.settings.axis || null,
			target: {
				left: distX,
				top: distY
			},
			container: this.resizeSettleContainerSnapshot()
		});
		this.scrollTo(distX, distY, true);
	}

	add(section: ManagerSection, forceRight?: boolean): Promise<ManagerView> {
		var view = this.createView(section, forceRight);

		this.views.append(view);

		// view.on(EVENTS.VIEWS.SHOWN, this.afterDisplayed.bind(this));
		view.onDisplayed = this.afterDisplayed.bind(this);
		view.onResize = this.afterResized.bind(this);

		view.on(EVENTS.VIEWS.AXIS, (axis: string) => {
			this.updateAxis(axis);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode: string) => {
			this.updateWritingMode(mode);
		});

		return view.display(this.request);
	}

	append(section: unknown, forceRight?: boolean): ManagerView | Promise<ManagerView> {
		var view = this.createView(section, forceRight);
		this.views.append(view);

		view.onDisplayed = this.afterDisplayed.bind(this);
		view.onResize = this.afterResized.bind(this);

		view.on(EVENTS.VIEWS.AXIS, (axis: string) => {
			this.updateAxis(axis);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode: string) => {
			this.updateWritingMode(mode);
		});

		return view.display(this.request);
	}

	prepend(section: unknown, forceRight?: boolean): ManagerView | Promise<ManagerView> {
		var view = this.createView(section, forceRight);

		view.on(EVENTS.VIEWS.RESIZED, (bounds: ViewResizeBounds) => {
			this.counter(bounds);
		});

		this.views.prepend(view);

		view.onDisplayed = this.afterDisplayed.bind(this);
		view.onResize = this.afterResized.bind(this);

		view.on(EVENTS.VIEWS.AXIS, (axis: string) => {
			this.updateAxis(axis);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode: string) => {
			this.updateWritingMode(mode);
		});

		return view.display(this.request);
	}

	counter(bounds: ViewResizeBounds): void {
		if(this.settings.axis === "vertical") {
			this.scrollBy(0, bounds.heightDelta, true);
		} else {
			this.scrollBy(bounds.widthDelta, 0, true);
		}

	}

	// resizeView(view) {
	//
	// 	if(this.settings.globalLayoutProperties.layout === "pre-paginated") {
	// 		view.lock("both", this.bounds.width, this.bounds.height);
	// 	} else {
	// 		view.lock("width", this.bounds.width, this.bounds.height);
	// 	}
	//
	// };

	isRtlVerticalPaginated(){
		if (!(this.isPaginated && this.settings.axis === "horizontal" && this.settings.direction === "rtl")) {
			return false;
		}

		let view = this.views && (this.views.first() || this.views.last());
		let contentWritingMode = view && view.contents && view.contents.writingMode ? view.contents.writingMode() : "";
		let writingMode = this.settings.writingMode || contentWritingMode;

		return writingMode === "vertical-rl";
	}

	getPageAdvance(){
		return this.layout && (this.layout.effectivePageAdvance || this.layout.delta || this.layout.pageWidth || this.layout.width);
	}

	getVerticalRlEdgeMaskColor(){
		let view = this.views && (this.views.first() || this.views.last());
		let doc = view && view.contents && view.contents.document;
		let win = view && view.contents && view.contents.window;
		let candidates = [];

		if (doc && win) {
			candidates.push(doc.body, doc.documentElement);
		}
		if (this.container && typeof window !== "undefined") {
			candidates.push(this.container);
		}

		for (const element of candidates) {
			if (!element) {
				continue;
			}

			let style = (element.ownerDocument && element.ownerDocument.defaultView)
				? element.ownerDocument.defaultView.getComputedStyle(element)
				: window.getComputedStyle(element);
			let color = style && style.backgroundColor;

			if (color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)") {
				return color;
			}
		}

		return "rgb(255, 255, 255)";
	}

	getVerticalRlEdgeMaskWidths(): EdgeMaskWidths {
		// 重入防護：本函式需要 page offset，而 getVerticalRlPageOffset 在「無快取且非末頁」
		// 的估算分支又會回頭索取遮罩寬度，形成
		// getVerticalRlEdgeMaskWidths → snapVerticalRlEdgeMaskWidths →
		// getLogicalPageStepToNextPage → getVerticalRlPageOffset →
		// getVerticalRlRenderedEdgeMaskWidths → getVerticalRlEdgeMaskWidths 的環路。
		// 窄視窗（實測 320x568）快取常為冷態，會直接撞出
		// RangeError: Maximum call stack size exceeded，讓 display() 的 promise 永不 settle。
		// 重入時回傳「目前已套用在 DOM 上的遮罩」，這正是估算方要的語意。
		if (this._verticalRlEdgeMaskComputing) {
			return this.getVerticalRlAppliedEdgeMaskWidths();
		}

		this._verticalRlEdgeMaskComputing = true;

		try {
			return this.computeVerticalRlEdgeMaskWidths();
		} finally {
			this._verticalRlEdgeMaskComputing = false;
		}
	}

	getVerticalRlAppliedEdgeMaskWidths(): EdgeMaskWidths {
		let dataset = this.container && this.container.dataset ? this.container.dataset : {};
		let left = Number(dataset.epubVrlEdgeMaskLeft);
		let right = Number(dataset.epubVrlEdgeMaskRight);
		let combined = Number(dataset.epubVrlEdgeMask);

		return {
			left: Math.max(0, Number.isFinite(left) ? left : (Number.isFinite(combined) ? combined : 0)),
			right: Math.max(0, Number.isFinite(right) ? right : 0)
		};
	}

	computeVerticalRlEdgeMaskWidths(): EdgeMaskWidths {
		let advance = this.getPageAdvance() || 0;
		let visibleWidth = this.container ? this.container.clientWidth || 0 : 0;
		let bleed = visibleWidth - advance;

		if (!this.isRtlVerticalPaginated() || !advance || !visibleWidth) {
			return { left: 0, right: 0 };
		}

		if (bleed <= 1) {
			return this.getVerticalRlCleanPageEdgeMaskWidths(advance);
		}

		let left = Math.ceil(bleed);
		let right = 0;
		let maxMask = getVerticalRlEdgeMaskLimitHelper(advance);

		let totalPages = this.getTotalPagesForCurrentView();
		let currentPageIndex = this.getCurrentPageIndex();
		let previousPageStep = 0;
		if (currentPageIndex > 0) {
			let maxScroll = this.getMaxLogicalScrollLeft();
			let currentOffset = this.getVerticalRlPageOffset(currentPageIndex, totalPages, maxScroll);
			let previousOffset = this.getVerticalRlPageOffset(currentPageIndex - 1, totalPages, maxScroll);
			previousPageStep = Math.abs(currentOffset - previousOffset);
		}

		let hasStructuralGutter = hasVerticalRlEdgeMaskStructuralGutterHelper(
			visibleWidth,
			advance,
			left,
			this.getPageBoundaryShift(),
			currentPageIndex,
			previousPageStep
		);

		if (hasStructuralGutter) {
			let structuralMask = getVerticalRlStructuralGutterEdgeMaskSnapInputHelper(left, right, maxMask, advance);
			if (!structuralMask) {
				return { left: 0, right: 0 };
			}

			return this.snapVerticalRlEdgeMaskWidths(structuralMask.widths, structuralMask.maxMask, {
				nextPageStep: structuralMask.nextPageStep,
				rightMaxMask: structuralMask.rightMaxMask
			});
		}

		if (currentPageIndex > 0) {
			let previousPageLeftMask = this.getPreviousVerticalRlLeftMask(previousPageStep, left, maxMask);
			right = getVerticalRlPreviousPageRightMaskHelper(
				visibleWidth,
				previousPageStep,
				previousPageLeftMask,
				maxMask
			);
		}

		let edgeMask = getVerticalRlEdgeMaskSnapInputHelper(left, right, maxMask, previousPageStep);
		if (!edgeMask) {
			return { left: 0, right: 0 };
		}

		return this.snapVerticalRlEdgeMaskWidths(edgeMask.widths, edgeMask.maxMask, {
			previousPageStep: edgeMask.previousPageStep,
			rightMaxMask: edgeMask.rightMaxMask
		});
	}

	getVerticalRlRenderedEdgeMaskWidths(){
		let computed = this.getVerticalRlEdgeMaskWidths();
		let dataset = this.container && this.container.dataset ? this.container.dataset : {};

		return getRenderedVerticalRlEdgeMaskWidthsHelper(
			computed,
			Number(dataset.epubVrlEdgeMaskLeft),
			Number(dataset.epubVrlEdgeMaskRight),
			Number(dataset.epubVrlEdgeMask)
		);
	}

	getVerticalRlCurrentEffectiveLeftBoundary(){
		if (!this.isRtlVerticalPaginated() || !this.container || !this.views || !this.layout) {
			return null;
		}

		let view = this.views.first() || this.views.last();
		let contentWidth = view ? this.getVerticalRlVisualContentWidth(view) : 0;
		let advance = this.getPageAdvance() || 0;
		let visibleWidth = this.layout.pageWidth || this.layout.width || advance || this.container.clientWidth || 0;
		let currentOffset = this.getNormalizedLogicalScrollLeft();
		let currentMaskWidths = this.getVerticalRlRenderedEdgeMaskWidths();
		let currentLeftMask = Number(currentMaskWidths && currentMaskWidths.left) || 0;

		return getVerticalRlCurrentEffectiveLeftBoundaryHelper(
			contentWidth,
			currentOffset,
			visibleWidth,
			currentLeftMask
		);
	}

	getVerticalRlLogicalPageOffsetCacheKey(totalPages: number, maxScroll: number): string | null {
		if (!this.isRtlVerticalPaginated() || !this.container || !this.views || !this.layout) {
			return null;
		}

		let view = this.views.first() || this.views.last();
		let contentWidth = view ? this.getVerticalRlVisualContentWidth(view) : 0;
		let visibleWidth = this.layout.pageWidth || this.layout.width || this.getPageAdvance() || this.container.clientWidth || 0;
		let advance = this.getPageAdvance() || 0;
		let edgeGuard = this.layout.edgeGuardPx || 0;

		return getVerticalRlLogicalPageOffsetCacheKeyHelper(
			totalPages,
			maxScroll,
			contentWidth,
			visibleWidth,
			advance,
			edgeGuard
		);
	}

	getCachedVerticalRlLogicalPageOffset(pageIndex: number, cacheKey: string | null): number | null {
		return getCachedVerticalRlLogicalPageOffsetHelper(this._verticalRlLogicalPageOffsetCache, pageIndex, cacheKey);
	}

	cacheVerticalRlLogicalPageOffset(pageIndex: number, logicalOffset: number, cacheKey: string | null): void {
		this._verticalRlLogicalPageOffsetCache = cacheVerticalRlLogicalPageOffsetHelper(
			this._verticalRlLogicalPageOffsetCache,
			pageIndex,
			logicalOffset,
			cacheKey
		);
	}

	getVerticalRlCleanPageEdgeMaskWidths(advance: number): EdgeMaskWidths {
		if (!this.container || !this.views || !advance) {
			return { left: 0, right: 0 };
		}

		let totalPages = this.getTotalPagesForCurrentView();
		let currentPageIndex = this.getCurrentPageIndex();
		if (totalPages <= 1 || currentPageIndex <= 0) {
			return { left: 0, right: 0 };
		}

		let maxMask = getVerticalRlEdgeMaskLimitHelper(advance);
		if (!maxMask) {
			return { left: 0, right: 0 };
		}

		let maxScroll = this.getMaxLogicalScrollLeft();
		let currentOffset = this.getVerticalRlPageOffset(currentPageIndex, totalPages, maxScroll);
		let previousOffset = this.getVerticalRlPageOffset(currentPageIndex - 1, totalPages, maxScroll);
		let actualCurrentOffset = this.getNormalizedLogicalScrollLeft();
		let currentGridOffset = this.getLogicalOffsetForPageIndex(currentPageIndex, totalPages, maxScroll);
		let sequentialBoundaryPageIndex = this._verticalRlSequentialBoundaryConstraint
			? this._verticalRlSequentialBoundaryConstraint.pageIndex
			: null;

		let cleanPageMask = getVerticalRlCleanPageEdgeMaskInputHelper(
			advance,
			totalPages,
			currentPageIndex,
			currentOffset,
			previousOffset,
			actualCurrentOffset,
			currentGridOffset,
			sequentialBoundaryPageIndex
		);
		if (!cleanPageMask) {
			return { left: 0, right: 0 };
		}

		return this.snapVerticalRlEdgeMaskWidths(cleanPageMask.widths, cleanPageMask.maxMask, {
			nextPageStep: cleanPageMask.nextPageStep,
			previousPageStep: cleanPageMask.previousPageStep,
			rightMaxMask: cleanPageMask.rightMaxMask,
			allowRawRightMask: cleanPageMask.allowRawRightMask,
			allowRawLeftMask: cleanPageMask.allowRawLeftMask,
			forceRawLeftMask: cleanPageMask.forceRawLeftMask
		});
	}

	getPreviousVerticalRlLeftMask(previousPageStep: number, left: number, maxMask: number): number {
		if (!previousPageStep || !this.container || !this.views) {
			return Math.min(left, maxMask);
		}

		let view = this.views.first() || this.views.last();
		let iframe = view && view.iframe;
		if (!iframe) {
			return Math.min(left, maxMask);
		}

		let containerRect = this.container.getBoundingClientRect();
		let iframeRect = iframe.getBoundingClientRect();
		let previousMask = getPreviousVerticalRlLeftMaskInputHelper(
			previousPageStep,
			left,
			maxMask,
			containerRect.left,
			containerRect.right,
			iframeRect.left
		);
		if (!previousMask) {
			return Math.min(left, maxMask);
		}

		let snapped = this.snapVerticalRlEdgeMaskWidths(previousMask.widths, previousMask.maxMask, {
			rawLeft: previousMask.rawLeft,
			rawRight: previousMask.rawRight,
			nextPageStep: previousMask.nextPageStep,
			rightMaxMask: previousMask.rightMaxMask
		});

		return Math.min(Number(snapped && snapped.left) || 0, maxMask);
	}

	getVerticalRlEdgeMaskWidth(){
		let widths = this.getVerticalRlEdgeMaskWidths();

		return getVerticalRlEdgeMaskWidthHelper(widths);
	}

	expandVerticalRlLeftMaskToVisibleLine(maskWidths: EdgeMaskWidths): EdgeMaskWidths {
		if (!maskWidths || !this.container || !this.views) {
			return maskWidths;
		}

		let view = this.views.first() || this.views.last();
		let iframe = view && view.iframe;
		let doc = view && view.contents && view.contents.document;
		let win = view && view.contents && view.contents.window;
		let body = doc && doc.body;

		if (!iframe || !doc || !win || !body) {
			return maskWidths;
		}

		let advance = this.getPageAdvance() || 0;
		let maxMask = getVerticalRlEdgeMaskLimitHelper(advance);
		if (!maxMask) {
			return maskWidths;
		}

		let containerRect = this.container.getBoundingClientRect();
		let iframeRect = iframe.getBoundingClientRect();
		let rawLeft = containerRect.left - iframeRect.left;
		let rawRight = containerRect.right - iframeRect.left;
		let left = Math.max(0, Number(maskWidths.left) || 0);
		let right = Math.max(0, Number(maskWidths.right) || 0);
		let textRects = collectVisibleTextClientRects(doc, win, body, {
			limit: 1000,
			countInvalidRects: true
		});
		if (!textRects) {
			return maskWidths;
		}

		for (const rect of textRects) {
			let logicalRect = getVerticalRlViewportRectHelper(rect, rawLeft, rawRight, iframeRect.left);
			let rectLeft = logicalRect.left;
			let rectRight = logicalRect.right;
			let viewportRectLeft = iframeRect.left + rect.left;
			let viewportRectRight = iframeRect.left + rect.right;

			if (
				(rectLeft < rawLeft && rectRight > rawLeft) ||
				(viewportRectLeft < containerRect.left && viewportRectRight > containerRect.left)
			) {
				left = Math.max(
					left,
					Math.ceil(Math.max(rectRight - rawLeft, viewportRectRight - containerRect.left) + 1)
				);
			}

			if (
				(rectLeft < rawRight && rectRight > rawRight) ||
				(viewportRectLeft < containerRect.right && viewportRectRight > containerRect.right)
			) {
				right = Math.max(
					right,
					Math.ceil(Math.max(rawRight - rectLeft, containerRect.right - viewportRectLeft) + 1)
				);
			}
		}

		// 右遮罩的用途是蓋掉「前一頁已完整顯示過」的重疊區。允許量由 overlap 推得
		// （getVerticalRlPreviousPageRightMask），但本方法原本只以 maxMask 夾，
		// 於是跨界字可把右遮罩撐到 advance/4，蓋住前一頁根本沒顯示過的內容——
		// 實測 9789570538069 16px/2.0 的 Section0002 因此有 92 字兩頁皆不顯示。
		// 故此處一併以重疊允許量夾住；取不到可靠值時退回 maxMask，維持原行為。
		let rightAllowance = maxMask;

		try {
			let totalPages = this.getTotalPagesForCurrentView();
			let currentPageIndex = this.getCurrentPageIndex();

			if (currentPageIndex <= 0) {
				// 首頁沒有前一頁，任何右遮罩都會永久藏住內容。
				rightAllowance = 0;
			} else {
				let maxScroll = this.getMaxLogicalScrollLeft();
				let currentOffset = this.getVerticalRlPageOffset(currentPageIndex, totalPages, maxScroll);
				let previousOffset = this.getVerticalRlPageOffset(currentPageIndex - 1, totalPages, maxScroll);
				let previousPageStep = Math.abs(currentOffset - previousOffset);
				let visibleWidth = (this.layout && (this.layout.pageWidth || this.layout.width)) || advance;
				// 前一頁實際套用過的左遮罩優先；以當前頁左遮罩近似會高估重疊量。
				let recordedPreviousLeftMask = this.getRecordedVerticalRlAppliedLeftMask(currentPageIndex - 1);
				let previousLeftMask = Number.isFinite(recordedPreviousLeftMask)
					? (recordedPreviousLeftMask as number)
					: this.getPreviousVerticalRlLeftMask(previousPageStep, left, maxMask);

				// 頁位置必須隨 index 遞增；不成立代表位置帳本自相矛盾，此時無法證明
				// 「前一頁已完整顯示過重疊區」，套右遮罩會永久藏住內容（實測
				// 9789570535556 24px/2.0：index 10 記為 4035、index 11 記為 4027，
				// 重疊被誤算成 342，右遮罩放行到 96，整整一行 31 字兩頁皆不顯示）。
				rightAllowance =
					currentOffset > previousOffset
						? getVerticalRlPreviousPageRightMaskHelper(
								visibleWidth,
								previousPageStep,
								previousLeftMask,
								maxMask
							)
						: 0;
			}
		} catch (error) {
			rightAllowance = maxMask;
		}

		return {
			left: Math.min(left, maxMask),
			right: Math.min(right, maxMask, Math.max(0, rightAllowance))
		};
	}

	getLogicalPageStepToNextPage(){
		let advance = this.getPageAdvance() || 0;

		if (!advance || !this.container || !this.isRtlVerticalPaginated()) {
			return advance;
		}

		let totalPages = this.getTotalPagesForCurrentView();
		let currentPageIndex = this.getCurrentPageIndex();
		let nextPageIndex = Math.min(totalPages - 1, currentPageIndex + 1);

		if (nextPageIndex <= currentPageIndex) {
			return 0;
		}

		let maxScroll = this.getMaxLogicalScrollLeft();
		let currentOffset = this.getVerticalRlPageOffset(currentPageIndex, totalPages, maxScroll);
		let nextOffset = this.getVerticalRlPageOffset(nextPageIndex, totalPages, maxScroll);

		return getVerticalRlLogicalPageStepToNextPageHelper(
			advance,
			totalPages,
			currentPageIndex,
			nextPageIndex,
			currentOffset,
			nextOffset,
			this.hasVerticalRlStructuralPageGutter()
		);
	}

	snapVerticalRlEdgeMaskWidths(widths: EdgeMaskWidths, maxMask: number, limits: SnapLimits = {}): EdgeMaskWidths {
		if (!this.container || !widths || maxMask <= 0) {
			return widths;
		}

		let view = this.views && (this.views.first() || this.views.last());
		let iframe = view && view.iframe;
		let doc = view && view.contents && view.contents.document;
		let win = view && view.contents && view.contents.window;
		let body = doc && doc.body;

		if (!iframe || !doc || !win || !body) {
			return widths;
		}

		let containerRect = this.container.getBoundingClientRect();
		let iframeRect = iframe.getBoundingClientRect();
		let defaultNextPageStep = limits.nextPageStep !== undefined ? 0 : this.getLogicalPageStepToNextPage();
		let viewportInput = getVerticalRlEdgeMaskSnapViewportInputHelper(
			widths,
			maxMask,
			containerRect.left,
			containerRect.right,
			iframeRect.left,
			limits,
			defaultNextPageStep,
			this.layout && this.layout.edgeGuardPx
		);
		let rawLeft = viewportInput.rawLeft;
		let rawRight = viewportInput.rawRight;
		let leftMaxMask = viewportInput.leftMaxMask;
		let rightMaxMask = viewportInput.rightMaxMask;
		let left = viewportInput.left;
		let right = viewportInput.right;
		let nextPageStep = viewportInput.nextPageStep;
		let previousPageStep = viewportInput.previousPageStep;
		let forceRawLeftMask = viewportInput.forceRawLeftMask;
		let allowRawLeftMask = viewportInput.allowRawLeftMask;
		let edgeTolerance = viewportInput.edgeTolerance;
		let hasStructuralEdgeGuard = viewportInput.hasStructuralEdgeGuard;
		let canExpandClippedRawRight = viewportInput.canExpandClippedRawRight;
		let rightPaintGuardMax = viewportInput.rightPaintGuardMax;
		let textRects = collectVisibleTextClientRects(doc, win, body, {
			limit: 1000
		});
		if (!textRects) {
			return widths;
		}
		let rects = getVerticalRlViewportRectsHelper(textRects, rawLeft, rawRight, iframeRect.left);

		const snapLeft = () => {
			let decision = getVerticalRlRawLeftSnapDecisionForRectsHelper(
				rects,
				rawLeft,
				rawRight,
				left,
				leftMaxMask,
				nextPageStep,
				forceRawLeftMask,
				allowRawLeftMask,
				hasStructuralEdgeGuard,
				edgeTolerance
			);
			let shift = decision.shift;
			if (shift !== 0) {
				left = decision.left;
			}
			return shift;
		};
		const snapRight = () => {
			let decision = getVerticalRlRawRightSnapDecisionForRectsHelper(
				rects,
				rawLeft,
				rawRight,
				right,
				previousPageStep,
				edgeTolerance,
				maxMask,
				rightMaxMask,
				rightPaintGuardMax,
				nextPageStep,
				canExpandClippedRawRight
			);
			let shift = decision.shift;
			if (shift !== 0) {
				right = decision.right;
			}
			return shift;
		};

		runVerticalRlEdgeMaskSnapLoopHelper(snapLeft, snapRight, 4);

		return { left, right };
	}

	/**
	 * 記錄目前頁面實際套用的左遮罩寬度，供下一頁計算右遮罩允許量使用。
	 *
	 * @param leftMask 本頁實際套用的左遮罩寬度
	 * @return {void}
	 */
	recordVerticalRlAppliedLeftMask(leftMask: number): void {
		if (!this.isRtlVerticalPaginated()) {
			return;
		}

		try {
			let totalPages = this.getTotalPagesForCurrentView();
			let maxScroll = this.getMaxLogicalScrollLeft();
			let cacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll);
			let pageIndex = this.getCurrentPageIndex();

			if (!cacheKey || !Number.isFinite(pageIndex)) {
				return;
			}

			if (!this._verticalRlAppliedLeftMaskLedger || this._verticalRlAppliedLeftMaskLedgerKey !== cacheKey) {
				this._verticalRlAppliedLeftMaskLedger = {};
				this._verticalRlAppliedLeftMaskLedgerKey = cacheKey;
			}

			this._verticalRlAppliedLeftMaskLedger[String(pageIndex)] = leftMask;
		} catch (error) {
			// 記錄失敗只會讓右遮罩退回推算值，不影響顯示正確性。
		}
	}

	/**
	 * 取得「可證實」的右遮罩允許量：前一頁確實完整顯示過的重疊區寬度。
	 *
	 * 右遮罩的唯一正當理由是「這段內容前一頁已完整顯示過」。消費端（reader 套件）
	 * 會由多個量測來源取 max 得出右遮罩，若超過此值就會把前一頁根本沒顯示過的內容
	 * 永久遮住——實測 9789570538069 32px/2.0 Section0003 第 2 頁套了 27px 右遮罩，
	 * 與前一頁 27px 左遮罩重疊遮住同一行，19 字兩頁皆不顯示。
	 *
	 * 只有在能以本 view 的實際記錄證實時才回傳數值；證實不了時回傳 null，
	 * 由呼叫端沿用自己的判斷（例如 locator 跳轉後沒有前一頁記錄，
	 * 仍需完整的 clean-core right shift）。
	 *
	 * @return {number|null}
	 */
	getVerticalRlProvenRightMaskAllowance(): number | null {
		if (!this.isRtlVerticalPaginated()) {
			return null;
		}

		try {
			let advance = this.getPageAdvance() || 0;
			let maxMask = getVerticalRlEdgeMaskLimitHelper(advance);

			if (!maxMask) {
				return null;
			}

			let currentPageIndex = this.getCurrentPageIndex();

			if (!Number.isFinite(currentPageIndex)) {
				return null;
			}

			// 首頁沒有前一頁，任何右遮罩都會永久藏住內容。
			if (currentPageIndex <= 0) {
				return 0;
			}

			let recordedPreviousLeftMask = this.getRecordedVerticalRlAppliedLeftMask(currentPageIndex - 1);

			if (!Number.isFinite(recordedPreviousLeftMask)) {
				return null;
			}

			let totalPages = this.getTotalPagesForCurrentView();
			let maxScroll = this.getMaxLogicalScrollLeft();
			let currentOffset = this.getVerticalRlPageOffset(currentPageIndex, totalPages, maxScroll);
			let previousOffset = this.getVerticalRlPageOffset(currentPageIndex - 1, totalPages, maxScroll);

			// 頁位置必須隨 index 遞增；不成立代表位置記錄自相矛盾，無法證實重疊區。
			if (!(currentOffset > previousOffset)) {
				return 0;
			}

			let visibleWidth = (this.layout && (this.layout.pageWidth || this.layout.width)) || advance;

			return getVerticalRlPreviousPageRightMaskHelper(
				visibleWidth,
				Math.abs(currentOffset - previousOffset),
				recordedPreviousLeftMask as number,
				maxMask
			);
		} catch (error) {
			return null;
		}
	}

	/**
	 * 取得「可證實」的左遮罩允許量。
	 *
	 * 左遮罩的正當理由是「這段內容會在下一頁完整顯示」。本 view 的最後一頁沒有下一頁，
	 * 任何左遮罩都會讓該章結尾永久消失——實測 9789570535556 32px/2.0 Section0006
	 * 第 73 頁（最後一頁）套了 32px 左遮罩，該章最後 23 字從未顯示。
	 *
	 * 只有在能證實時才回傳數值（最後一頁為 0）；其餘情形回傳 null 由呼叫端自行判斷。
	 *
	 * @return {number|null}
	 */
	getVerticalRlProvenLeftMaskAllowance(): number | null {
		if (!this.isRtlVerticalPaginated()) {
			return null;
		}

		try {
			let totalPages = this.getTotalPagesForCurrentView();
			let currentPageIndex = this.getCurrentPageIndex();

			if (!(totalPages > 0) || !Number.isFinite(currentPageIndex)) {
				return null;
			}

			return currentPageIndex >= totalPages - 1 ? 0 : null;
		} catch (error) {
			return null;
		}
	}

	/**
	 * 取得指定頁實際套用過的左遮罩寬度；沒有記錄時回傳 null。
	 *
	 * @param pageIndex 頁索引
	 * @return {number|null}
	 */
	getRecordedVerticalRlAppliedLeftMask(pageIndex: number): number | null {
		let ledger = this._verticalRlAppliedLeftMaskLedger;

		if (!ledger) {
			return null;
		}

		let recorded = ledger[String(pageIndex)];

		return Number.isFinite(recorded) ? recorded : null;
	}

	syncVerticalRlViewportClip(): void {
		if (!this.container || !this.container.style) {
			return;
		}

		let maskWidths = this.expandVerticalRlLeftMaskToVisibleLine(this.getVerticalRlEdgeMaskWidths());
		this.recordVerticalRlAppliedLeftMask(Math.max(0, Number(maskWidths.left) || 0));
		if (!maskWidths.left && !maskWidths.right) {
			this.removeVerticalRlViewportClip();
			if (this.container.dataset && this.container.dataset.epubVrlEdgeMask) {
				delete this.container.dataset.epubVrlEdgeMask;
				delete this.container.dataset.epubVrlEdgeMaskLeft;
				delete this.container.dataset.epubVrlEdgeMaskRight;
			}
			return;
		}

		let overlay = this.getVerticalRlViewportClipOverlay();
		if (!overlay) {
			return;
		}

		let parentRect = overlay.parentElement.getBoundingClientRect();
		let containerRect = this.container.getBoundingClientRect();
		let color = this.getVerticalRlEdgeMaskColor();
		let overlayWidth = Math.ceil(containerRect.width || this.container.clientWidth || 0) + 1;
		let overlayHeight = Math.ceil(containerRect.height || this.container.clientHeight || 0) + 1;
		overlay.style.left = `${containerRect.left - parentRect.left}px`;
		overlay.style.top = `${containerRect.top - parentRect.top}px`;
		overlay.style.width = `${overlayWidth}px`;
		overlay.style.height = `${overlayHeight}px`;
		overlay.style.boxShadow = `inset ${maskWidths.left}px 0 0 ${color}, inset -${maskWidths.right}px 0 0 ${color}`;
		this.container.dataset.epubVrlEdgeMask = String(getVerticalRlEdgeMaskWidthHelper(maskWidths));
		this.container.dataset.epubVrlEdgeMaskLeft = String(maskWidths.left);
		this.container.dataset.epubVrlEdgeMaskRight = String(maskWidths.right);
	}

	getVerticalRlViewportClipOverlay(): HTMLDivElement | null {
		let parent = this.container && this.container.parentElement;
		if (!parent || !parent.style) {
			return null;
		}

		if (this._verticalRlViewportClipOverlay && this._verticalRlViewportClipOverlay.parentElement === parent) {
			return this._verticalRlViewportClipOverlay;
		}

		if (this._verticalRlViewportClipOverlay) {
			this._verticalRlViewportClipOverlay.remove();
		}

		let parentStyle = window.getComputedStyle(parent);
		if (parentStyle.position === "static") {
			this._verticalRlPreviousParentPosition = parent.style.position || "";
			parent.style.position = "relative";
		}

		let overlay = document.createElement("div");
		overlay.className = "epub-vrl-edge-mask";
		overlay.setAttribute("aria-hidden", "true");
		overlay.style.position = "absolute";
		overlay.style.pointerEvents = "none";
		overlay.style.zIndex = "2147483647";
		overlay.style.background = "transparent";
		overlay.style.contain = "strict";
		parent.appendChild(overlay);
		this._verticalRlViewportClipOverlay = overlay;

		return overlay;
	}

	removeVerticalRlViewportClip(): void {
		if (this._verticalRlViewportClipOverlay) {
			this._verticalRlViewportClipOverlay.remove();
			this._verticalRlViewportClipOverlay = undefined;
		}

		let parent = this.container && this.container.parentElement;
		if (parent && this._verticalRlPreviousParentPosition !== undefined) {
			parent.style.position = this._verticalRlPreviousParentPosition;
			this._verticalRlPreviousParentPosition = undefined;
		}
	}

	getPageBoundaryShift(){
		if (!this.layout) {
			return 0;
		}

		let shift = this.layout.pageBoundaryShift || 0;
		let advance = this.getPageAdvance() || 0;

		return getPageBoundaryShiftHelper(shift, advance, this.isRtlVerticalPaginated());
	}

	hasVerticalRlStructuralPageGutter(){
		if (!this.isRtlVerticalPaginated() || !this.container || !this.layout) {
			return false;
		}

		let advance = this.getPageAdvance() || 0;
		let visibleWidth = this.container.clientWidth || 0;
		let boundaryShift = this.getPageBoundaryShift();

		return hasVerticalRlStructuralPageGutterHelper(
			advance,
			visibleWidth,
			boundaryShift,
			this.isRtlVerticalPaginated()
		);
	}

	getVerticalRlStructuralEdgeMaskWidthsForLogicalOffset(logicalOffset: number, contentWidth: number, visibleWidth: number): EdgeMaskWidths | null {
		if (!this.hasVerticalRlStructuralPageGutter()) {
			return null;
		}

		let advance = this.getPageAdvance() || 0;
		let structuralEdgeMask = getVerticalRlStructuralEdgeMaskInputHelper(
			logicalOffset,
			contentWidth,
			visibleWidth,
			advance
		);

		if (!structuralEdgeMask) {
			return null;
		}

		return this.snapVerticalRlEdgeMaskWidths(structuralEdgeMask.widths, structuralEdgeMask.maxMask, {
			rawLeft: structuralEdgeMask.rawLeft,
			rawRight: structuralEdgeMask.rawRight,
			nextPageStep: structuralEdgeMask.nextPageStep,
			rightMaxMask: structuralEdgeMask.rightMaxMask
		});
	}

	/**
	 * 取得某頁「實際生效」的 logical offset。
	 *
	 * text-boundary snap 會刻意讓套用的 offset 偏離理論網格，好讓邊界字元完整顯示
	 * （實測 offset 384 → 776，實際步進 392 而非網格的 384）。邊緣遮罩用兩頁步進
	 * 推算重疊區，若改用網格值就會多蓋一段兩頁都沒顯示的內容，使整行文字被剖開。
	 * 因此凡是要推算頁間步進的地方，都應優先採用實際套用過的 offset。
	 *
	 * @param pageIndex 頁索引
	 * @param totalPages 目前 view 的總頁數
	 * @param maxScroll 最大 logical scroll
	 * @return {number}
	 */
	/**
	 * vertical-rl 分頁位置的**單一真相來源**。
	 *
	 * 過去頁位置散落在四個彼此不同步的來源：理論網格、已套用 offset、快取、
	 * 以及 DOM 當下捲動位置。各處自行挑選來源，累積誤差造成兩類實測缺陷：
	 * 雙重遮蔽剖開整行字（27 字），以及整頁被跳過（210-246 字）。
	 *
	 * 本方法統一優先序：
	 * 1. 已套用並快取的實際 offset —— 權威值，由 scrollToLogicalPage 寫入，
	 *    且與 (totalPages, maxScroll) 綁定 key，版面變動時自動失效。
	 * 2. 由前一頁實際 offset 推算：前頁 offset ＋ 實際可見步進。
	 *    步進為 advance 減去前頁左遮罩（實測 384 − 24 = 360），因為被遮蔽的
	 *    一段要留到下一頁顯示；若改用 advance 當步距會逐頁累積誤差。
	 * 3. 理論網格 pageIndex × advance —— 僅在毫無實際資料時使用。
	 *
	 * @param pageIndex 頁索引
	 * @param totalPages 目前 view 的總頁數
	 * @param maxScroll 最大 logical scroll
	 * @return {number}
	 */
	getVerticalRlPageOffset(pageIndex: number, totalPages: number, maxScroll: number): number {
		let gridOffset = this.getLogicalOffsetForPageIndex(pageIndex, totalPages, maxScroll);

		if (!this.isRtlVerticalPaginated() || pageIndex <= 0) {
			return gridOffset;
		}

		let nominalTotalPages = totalPages;
		try {
			nominalTotalPages = this.getNominalTotalPagesForCurrentView();
		} catch (error) {
			nominalTotalPages = totalPages;
		}
		let continuationIndex = pageIndex - nominalTotalPages;
		let continuationOffsets = this._verticalRlTerminalContinuationOffsets;
		if (
			continuationIndex >= 0 &&
			Array.isArray(continuationOffsets) &&
			Number.isFinite(continuationOffsets[continuationIndex])
		) {
			return Math.max(0, Math.min(maxScroll, continuationOffsets[continuationIndex]));
		}
		if (
			pageIndex === nominalTotalPages - 1 &&
			Number.isFinite(this._verticalRlNominalTerminalOffset)
		) {
			return Math.max(0, Math.min(maxScroll, this._verticalRlNominalTerminalOffset as number));
		}

		// 已實際套用過的位置永遠優先，包含末頁：sequential boundary 路徑會刻意讓末頁
		// 停在早於網格的位置，若此處無條件回傳網格，另一條帶 ignoreCachedLogicalOffset
		// 的呼叫就會把同一頁再往前推一整步，造成整頁內容被跳過
		// （實測 9789570538069 32px/2.0：同一 targetIndex 15 被推進兩次，
		// offset 5208 → 5560 → 5944，缺 137 字 ≈ 一整頁）。
		let cacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll);
		let cached = this.getCachedVerticalRlLogicalPageOffset(pageIndex, cacheKey);

		if (Number.isFinite(cached)) {
			return cached as number;
		}

		// 沒有實際記錄時，末頁釘在內容尾端（maxScroll）——它顯示的是剩餘內容，
		// 與前一頁的間距本來就小於一個完整步進，不能用步進往後推算。
		if (pageIndex >= totalPages - 1) {
			return gridOffset;
		}

		let previous = this.getCachedVerticalRlLogicalPageOffset(pageIndex - 1, cacheKey);

		if (!Number.isFinite(previous)) {
			return gridOffset;
		}

		let advance = this.getPageAdvance() || 0;

		if (!advance) {
			return gridOffset;
		}

		let maskWidths = this.getVerticalRlRenderedEdgeMaskWidths();
		let leftMask = Math.max(0, Number(maskWidths && maskWidths.left) || 0);
		let step = Math.max(1, advance - leftMask);

		return Math.max(0, Math.min(maxScroll, (previous as number) + step));
	}

	getLogicalOffsetForPageIndex(pageIndex: number, totalPages: number, maxScroll: number): number {
		let advance = this.getPageAdvance() || 0;
		let boundaryShift = this.getPageBoundaryShift();

		return getLogicalOffsetForPageIndexHelper(
			pageIndex,
			totalPages,
			maxScroll,
			advance,
			boundaryShift,
			this.isRtlVerticalPaginated()
		);
	}

	snapVerticalRlLogicalOffsetToTextBoundary(logicalOffset: number, maxScroll: number, options: SnapLimits = {}): number {
		if (!this.container || !this.views || !this.layout) {
			return logicalOffset;
		}

		let view = this.views.first() || this.views.last();
		let iframe = view && view.iframe;
		let doc = view && view.contents && view.contents.document;
		let win = view && view.contents && view.contents.window;
		let body = doc && doc.body;
		let contentWidth = this.isRtlVerticalPaginated()
			? this.getVerticalRlVisualContentWidth(view)
			: this.getNavigableWidthForView(view);
		let visibleWidth = this.layout.pageWidth || this.layout.width || this.getPageAdvance() || 0;
		let preflight = getVerticalRlBoundarySnapPreflightHelper(
			this._verticalRlBoundarySnapCache,
			logicalOffset,
			maxScroll,
			contentWidth,
			visibleWidth,
			this.layout.edgeGuardPx || 0,
			options,
			{
				iframe,
				document: doc,
				window: win,
				body
			}
		);
		logicalOffset = preflight.logicalOffset;

		if (!preflight.shouldMeasureText || !preflight.cacheLookup) {
			return logicalOffset;
		}
		if (preflight.cacheLookup.cachedSnap !== null) {
			return preflight.cacheLookup.cachedSnap;
		}

		let iframeRect = iframe.getBoundingClientRect();
		let structuralGutterMask = this.getVerticalRlStructuralEdgeMaskWidthsForLogicalOffset(logicalOffset, contentWidth, visibleWidth);
		let textRects = collectVisibleTextClientRects(doc, win, body, {
			limit: 1000
		});
		if (!textRects) {
			return null;
		}
		let measurementInputs = getVerticalRlBoundarySnapMeasurementInputsHelper(
			textRects,
			iframeRect.left,
			logicalOffset,
			contentWidth,
			visibleWidth,
			this.layout && this.layout.edgeGuardPx,
			structuralGutterMask,
			this.getPageAdvance(),
			this.getPageBoundaryShift()
		);
		let snapResult = getVerticalRlBoundarySnapPipelineResultHelper(
			preflight.cacheLookup.cacheKey,
			measurementInputs,
			logicalOffset,
			contentWidth,
			visibleWidth,
			maxScroll,
			preflight.maxRightBoundaryOptions,
			preflight.rightBoundaryOptions
		);
		if (snapResult.cacheEntry) {
			this._verticalRlBoundarySnapCache = snapResult.cacheEntry;
		}

		return snapResult.snapped;
	}

	getVerticalRlRectDistanceToLogicalViewport(left: number, right: number, rawLeft: number, rawRight: number): number {
		return getVerticalRlRectDistanceToLogicalViewportHelper(left, right, rawLeft, rawRight);
	}

	snapVerticalRlLogicalOffsetFromEdgeMask(logicalOffset: number, maxScroll: number): number {
		if (!this.isRtlVerticalPaginated() || !this.container || !this.layout) {
			return logicalOffset;
		}

		let maskWidths = this.getVerticalRlEdgeMaskWidths();
		let rightMask = Number(maskWidths && maskWidths.right) || 0;
		let edgeGuard = Math.max(1, Math.min(8, Math.round((this.layout && this.layout.edgeGuardPx) || 2)));
		let provisionalDelta = Math.ceil(rightMask - Math.max(1, edgeGuard / 2));

		if (!Number.isFinite(provisionalDelta) || provisionalDelta <= 1) {
			return logicalOffset;
		}

		return Math.max(0, Math.min(maxScroll, logicalOffset + provisionalDelta));
	}

	getNormalizedLogicalScrollLeft(){
		if (!this.container) {
			return 0;
		}

		let scrollLeft = this.container.scrollLeft || 0;
		if (this.settings.direction === "rtl") {
			if (this.settings.rtlScrollType === "negative" || scrollLeft < 0) {
				return Math.abs(scrollLeft);
			}

			if (this.settings.rtlScrollType === "default") {
				let maxScroll = Math.max(0, this.container.scrollWidth - this.container.clientWidth);
				return Math.max(0, maxScroll - scrollLeft);
			}
		}

		return Math.max(0, scrollLeft);
	}

	getMaxLogicalScrollLeft(){
		if (!this.container) {
			return 0;
		}

		return Math.max(0, this.container.scrollWidth - this.container.clientWidth);
	}

	getVerticalRlVisualContentWidth(view: ManagerView | undefined): number {
		let visibleWidth = this.container && this.container.clientWidth ? this.container.clientWidth : 0;
		let maxLogicalScroll = this.getMaxLogicalScrollLeft();
		let candidates = [
			this.container && this.container.scrollWidth,
			view && view.width ? view.width() : 0,
			view && view._contentWidth,
			maxLogicalScroll + visibleWidth
		];

		return Math.max(
			0,
			...candidates
				.map(function(value){
					return Number(value) || 0;
				})
				.filter(function(value){
					return Number.isFinite(value) && value > 0;
				})
		);
	}

	getNavigableWidthForView(view: ManagerView | undefined): number {
		let width = view && view.width ? view.width() : 0;

		if (view && this.isRtlVerticalPaginated()) {
			return Math.max(width || 0, this.getVerticalRlVisualContentWidth(view));
		}

		if (
			view &&
			this.isPaginated &&
			this.settings.axis === "horizontal" &&
			this.settings.direction === "rtl" &&
			this.layout &&
			this.layout.name === "reflowable"
		) {
			let pageWidth = this.getPageAdvance() || this.layout.pageWidth || this.layout.width || 0;
			let liveTextWidth = Number(view.contents && view.contents.textWidth ? view.contents.textWidth() : 0);
			let bodyScrollWidth = Number(view.contents && view.contents.document && view.contents.document.body
				? view.contents.document.body.scrollWidth
				: 0);
			let tolerance = 1;

			if (
				pageWidth > 0 &&
				width > pageWidth + tolerance &&
				liveTextWidth > 0 &&
				liveTextWidth <= pageWidth + tolerance &&
				bodyScrollWidth > 0 &&
				bodyScrollWidth <= pageWidth + tolerance
			) {
				return pageWidth;
			}
		}

		if (
			view &&
			!this.isRtlVerticalPaginated() &&
			this.isPaginated &&
			this.settings.axis === "horizontal" &&
			this.layout &&
			this.layout.name === "reflowable" &&
			Number.isFinite(view._contentWidth) &&
			view._contentWidth > 0
		) {
			return view._contentWidth;
		}

		if (
			view &&
			!this.isRtlVerticalPaginated() &&
			this.isPaginated &&
			this.settings.axis === "horizontal" &&
			this.layout &&
			this.layout.name === "reflowable" &&
			view._forceEvenPageAdded
		) {
			let pageAdvance = this.getPageAdvance() || this.layout.pageWidth || this.layout.width || 0;
			return Math.max(pageAdvance, width - pageAdvance);
		}

		return width;
	}

	getPageSnapTolerance(){
		let advance = this.getPageAdvance() || 0;
		let edgeGuard = this.layout && this.layout.edgeGuardPx ? this.layout.edgeGuardPx : 0;
		return getPageSnapToleranceHelper(advance, edgeGuard);
	}

	countPagesWithFractionalTolerance(totalLength: number, pageLength: number): number {
		return countPagesWithFractionalToleranceHelper(totalLength, pageLength);
	}

	getNominalTotalPagesForCurrentView(): number {
		let view = this.views && (this.views.first() || this.views.last());
		if (!view) {
			return 1;
		}

		if (view._viewportFillingSingleMediaPage) {
			return 1;
		}

		let width = this.getNavigableWidthForView(view);
		let advance = this.getPageAdvance();
		let pageWidth = this.layout.pageWidth || this.layout.width || advance;

		if (this.layout.effectivePageAdvance && this.layout.effectivePageAdvance !== this.layout.pageWidth) {
			let remainingLength = Math.max(0, width - pageWidth);
			return remainingLength > 0
				? Math.max(1, this.countPagesWithFractionalTolerance(remainingLength, advance) + 1)
				: 1;
		}

		return this.countPagesWithFractionalTolerance(width, advance);
	}

	getTotalPagesForCurrentView(): number {
		let nominalTotalPages = this.getNominalTotalPagesForCurrentView();

		if (!this.isRtlVerticalPaginated()) {
			return nominalTotalPages;
		}

		let continuationCount = Array.isArray(this._verticalRlTerminalContinuationOffsets)
			? this._verticalRlTerminalContinuationOffsets.length
			: 0;

		if (
			continuationCount === 0 &&
			!this._verticalRlTerminalCoverageProjectionInProgress &&
			!this._verticalRlLogicalPageScrollInProgress &&
			this.shouldProjectVerticalRlTerminalContinuation()
		) {
			this._verticalRlTerminalCoverageProjectionInProgress = true;
			try {
				let snapshot = this.getVerticalRlTerminalSemanticCoverageSnapshot();
				if (snapshot) {
					appendVerticalRlTerminalCoverageTrace("next:terminal-candidate", this.getVerticalRlTerminalCoverageTraceDetail(
						nominalTotalPages - 1,
						snapshot,
						{ targetGridOffset: this.getMaxLogicalScrollLeft() }
					));
				}
				let continuationOffsets = this.getVerticalRlTerminalContinuationPlan(snapshot);

				continuationOffsets.forEach((continuationOffset, index) => {
					this.addVerticalRlTerminalContinuationOffset(
						continuationOffset,
						nominalTotalPages + index,
						this.getMaxLogicalScrollLeft()
					);
					if (snapshot) {
						appendVerticalRlTerminalCoverageTrace("next:terminal-continuation", this.getVerticalRlTerminalCoverageTraceDetail(
							nominalTotalPages + index,
							snapshot,
							{ targetGridOffset: continuationOffset, snappedOffset: continuationOffset }
						));
					}
				});
				continuationCount = this._verticalRlTerminalContinuationOffsets?.length || 0;
			} finally {
				this._verticalRlTerminalCoverageProjectionInProgress = false;
			}
		}

		return nominalTotalPages + continuationCount;
	}

	shouldProjectVerticalRlTerminalContinuation(): boolean {
		if (!this.isRtlVerticalPaginated() || !this.views || !this.layout) {
			return false;
		}

		let view = this.views.first() || this.views.last();
		let nominalTotalPages = this.getNominalTotalPagesForCurrentView();
		let maxLogicalScroll = this.getMaxLogicalScrollLeft();
		let currentLogicalOffset = this.getNormalizedLogicalScrollLeft();
		let pageAdvance = this.getPageAdvance();

		this._verticalRlTerminalCoverageProjectionInProgress = true;
		try {
			let currentPageIndex = this.getCurrentPageIndex();
			let projectionKey = JSON.stringify([
				view && view.section ? view.section.href : null,
				nominalTotalPages,
				currentPageIndex,
				currentLogicalOffset,
				maxLogicalScroll,
				pageAdvance,
				this.layout.pageWidth,
				this.layout.effectivePageAdvance,
				view ? this.getVerticalRlVisualContentWidth(view) : 0
			]);

			if (
				this._verticalRlTerminalCoverageProjectionKey === projectionKey &&
				typeof this._verticalRlTerminalCoverageProjectionResult === "boolean"
			) {
				return this._verticalRlTerminalCoverageProjectionResult;
			}

			if (currentPageIndex < nominalTotalPages - 1) {
				this._verticalRlTerminalCoverageProjectionKey = projectionKey;
				this._verticalRlTerminalCoverageProjectionResult = false;
				return false;
			}

			let snapshot = this.getVerticalRlTerminalSemanticCoverageSnapshot();
			let result = Boolean(
				snapshot &&
				snapshot.currentPageIndex >= snapshot.nominalTotalPages - 1 &&
				snapshot.coverage.uncoveredSemanticRects.length > 0 &&
				snapshot.coverage.maxScrollHasRoom
			);
			this._verticalRlTerminalCoverageProjectionKey = projectionKey;
			this._verticalRlTerminalCoverageProjectionResult = result;

			return result;
		} finally {
			this._verticalRlTerminalCoverageProjectionInProgress = false;
		}
	}

	getVerticalRlTerminalSemanticCoverageSnapshot() {
		if (!this.isRtlVerticalPaginated() || !this.container || !this.views || !this.layout) {
			return null;
		}

		let view = this.views.first() || this.views.last();
		let doc = view && view.contents && view.contents.document;
		let win = view && view.contents && view.contents.window;
		let body = doc && doc.body;
		if (!doc || !win || !body) {
			return null;
		}

		let semanticRects = collectVerticalRlSemanticRects(doc, win, body, { limit: 4000 });
		if (!semanticRects) {
			return null;
		}

		let nominalTotalPages = this.getNominalTotalPagesForCurrentView();
		let totalPages = this.getTotalPagesForCurrentView();
		let currentPageIndex = this.getCurrentPageIndex();
		let maxLogicalScroll = this.getMaxLogicalScrollLeft();
		let currentLogicalOffset = this.getNormalizedLogicalScrollLeft();
		let visibleWidth = this.layout.pageWidth || this.layout.width || this.getPageAdvance() || this.container.clientWidth || 0;
		let contentWidth = this.getVerticalRlVisualContentWidth(view);
		let pageAdvance = this.getPageAdvance() || 0;
		let cacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxLogicalScroll);
		let continuationOffsets = Array.isArray(this._verticalRlTerminalContinuationOffsets)
			? this._verticalRlTerminalContinuationOffsets
			: [];
		let previousOffsets: number[] = [];

		for (let index = 0; index < currentPageIndex; index += 1) {
			let continuationIndex = index - nominalTotalPages;
			let continuationOffset = continuationIndex >= 0 ? continuationOffsets[continuationIndex] : undefined;
			let cachedOffset = cacheKey ? this.getCachedVerticalRlLogicalPageOffset(index, cacheKey) : null;
			let offset = Number.isFinite(cachedOffset)
				? cachedOffset as number
				: Number.isFinite(continuationOffset)
					? continuationOffset as number
					: this.getLogicalOffsetForPageIndex(index, totalPages, maxLogicalScroll);
			previousOffsets.push(offset);
		}

		let currentRawViewport = getVerticalRlRawViewportForOffset(
			currentLogicalOffset,
			contentWidth,
			visibleWidth
		);
		let previousRawViewports = previousOffsets.map((offset) => getVerticalRlRawViewportForOffset(
			offset,
			contentWidth,
			visibleWidth
		));
		let sequentialPageStep = previousOffsets.length
			? Math.max(1, Math.min(pageAdvance, currentLogicalOffset - previousOffsets[previousOffsets.length - 1]))
			: pageAdvance;
		let coverage = getVerticalRlSemanticCoverage(
			semanticRects,
			currentRawViewport,
			previousRawViewports,
			{ maxScrollHasRoom: maxLogicalScroll > currentLogicalOffset + 0.5 }
		);
		let policies = characterizeVerticalRlTerminalCoveragePolicies({
			semanticRects,
			contentWidth,
			visibleWidth,
			pageAdvance,
			currentOffset: currentLogicalOffset,
			maxScroll: maxLogicalScroll,
			previousOffsets,
			preferredOffset: currentLogicalOffset,
			maxRightBoundary: contentWidth - currentLogicalOffset,
			sequentialPageStep
		});
		let currentMasks = this.getVerticalRlRenderedEdgeMaskWidths();
		let effectiveRawViewport = {
			left: currentRawViewport.left + Math.max(0, Number(currentMasks.left) || 0),
			right: currentRawViewport.right - Math.max(0, Number(currentMasks.right) || 0)
		};

		return {
			nominalTotalPages,
			totalPages,
			currentPageIndex,
			currentLogicalOffset,
			maxLogicalScroll,
			contentWidth,
			visibleWidth,
			pageAdvance,
			sequentialPageStep,
			currentRawViewport,
			effectiveRawViewport,
			currentMasks,
			currentEffectiveLeftBoundary: this.getVerticalRlCurrentEffectiveLeftBoundary(),
			previousOffsets,
			previousRawViewports,
			semanticRects,
			coverage,
			policies
		};
	}

	getVerticalRlTerminalContinuationPlan(
		snapshot: ReturnType<DefaultViewManager["getVerticalRlTerminalSemanticCoverageSnapshot"]>
	): number[] {
		if (!snapshot || !snapshot.coverage.uncoveredSemanticRects.length || !snapshot.coverage.maxScrollHasRoom) {
			return [];
		}

		let plan = planVerticalRlTerminalContinuations({
			semanticRects: snapshot.semanticRects,
			contentWidth: snapshot.contentWidth,
			visibleWidth: snapshot.visibleWidth,
			pageAdvance: snapshot.pageAdvance,
			currentOffset: snapshot.currentLogicalOffset,
			maxScroll: snapshot.maxLogicalScroll,
			previousOffsets: snapshot.previousOffsets,
			preferredOffset: snapshot.currentLogicalOffset,
			maxRightBoundary: snapshot.contentWidth - snapshot.currentLogicalOffset,
			sequentialPageStep: snapshot.sequentialPageStep,
			maxContinuationPages: 20
		});

		return plan.offsets;
	}

	getVerticalRlTerminalContinuationOffset(snapshot: ReturnType<DefaultViewManager["getVerticalRlTerminalSemanticCoverageSnapshot"]>): number | null {
		return this.getVerticalRlTerminalContinuationPlan(snapshot)[0] ?? null;
	}

	getVerticalRlTerminalCoverageTraceDetail(
		targetPageIndex: number,
		snapshot: ReturnType<DefaultViewManager["getVerticalRlTerminalSemanticCoverageSnapshot"]>,
		values: {
			targetGridOffset?: number;
			constrainedOffset?: number | null;
			snappedOffset?: number | null;
			sequentialRightBoundary?: number | null;
			maxRightBoundary?: number | null;
			preferredRightBoundary?: number | null;
		} = {}
	): Record<string, unknown> {
		let currentPageIndex = snapshot ? snapshot.currentPageIndex : this.getCurrentPageIndex();
		let totalPages = snapshot ? snapshot.totalPages : this.getTotalPagesForCurrentView();
		let maxLogicalScroll = snapshot ? snapshot.maxLogicalScroll : this.getMaxLogicalScrollLeft();
		let currentLogicalOffset = snapshot
			? snapshot.currentLogicalOffset
			: this.getNormalizedLogicalScrollLeft();
		let targetGridOffset = Number.isFinite(Number(values.targetGridOffset))
			? Number(values.targetGridOffset)
			: this.getLogicalOffsetForPageIndex(targetPageIndex, totalPages, maxLogicalScroll);
		let cacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxLogicalScroll);
		let cachedTargetOffset = cacheKey
			? this.getCachedVerticalRlLogicalPageOffset(targetPageIndex, cacheKey)
			: null;
		let targetOffset = this.getVerticalRlPageOffset(targetPageIndex, totalPages, maxLogicalScroll);
		let contentWidth = snapshot ? snapshot.contentWidth : this.getVerticalRlVisualContentWidth(this.views.first());
		let visibleWidth = snapshot
			? snapshot.visibleWidth
			: this.layout.pageWidth || this.layout.width || this.getPageAdvance() || 0;
		let targetRawViewport = getVerticalRlRawViewportForOffset(
			Number.isFinite(Number(values.snappedOffset))
				? Number(values.snappedOffset)
				: targetOffset,
			contentWidth,
			visibleWidth
		);
		let targetMasks = this.getVerticalRlRenderedEdgeMaskWidths();
		let targetEffectiveViewport = {
			left: targetRawViewport.left + Math.max(0, Number(targetMasks.left) || 0),
			right: targetRawViewport.right - Math.max(0, Number(targetMasks.right) || 0)
		};

		return {
			currentPageIndex,
			totalPages,
			targetPageIndex,
			targetIsNominalFinalPage: targetPageIndex === this.getNominalTotalPagesForCurrentView() - 1,
			currentLogicalOffset,
			targetGridOffset,
			cachedTargetOffset,
			sequentialRightBoundary: values.sequentialRightBoundary ?? null,
			maxRightBoundary: values.maxRightBoundary ?? null,
			preferredRightBoundary: values.preferredRightBoundary ?? null,
			constrainedOffset: values.constrainedOffset ?? null,
			snappedOffset: values.snappedOffset ?? null,
			maxLogicalScroll,
			contentWidth,
			visibleWidth,
			pageAdvance: snapshot ? snapshot.pageAdvance : this.getPageAdvance(),
			currentRawViewport: snapshot ? snapshot.currentRawViewport : null,
			currentEffectiveViewport: snapshot ? snapshot.effectiveRawViewport : null,
			targetRawViewport,
			targetEffectiveViewport,
			currentMasks: snapshot ? snapshot.currentMasks : this.getVerticalRlRenderedEdgeMaskWidths(),
			targetMasks,
			currentEffectiveLeftBoundary: snapshot
				? snapshot.currentEffectiveLeftBoundary
				: this.getVerticalRlCurrentEffectiveLeftBoundary(),
			semanticCoverage: snapshot
				? {
					semanticRectCount: snapshot.coverage.semanticRectCount,
					fullyInsideCurrentRawViewportCount: snapshot.coverage.fullyInsideCurrentRawViewportCount,
					partiallyClippedCurrentRawViewportCount: snapshot.coverage.partiallyClippedCurrentRawViewportCount,
					fullyBeforeCurrentRawLeftBoundaryCount: snapshot.coverage.fullyBeforeCurrentRawLeftBoundaryCount,
					coveredByPreviousRawViewportsCount: snapshot.coverage.coveredByPreviousRawViewportsCount,
					uncoveredSemanticRectCount: snapshot.coverage.uncoveredSemanticRectCount,
					uncoveredSemanticSpan: snapshot.coverage.uncoveredSemanticSpan,
					maxScrollHasRoom: snapshot.coverage.maxScrollHasRoom,
				}
				: null,
			policies: snapshot ? snapshot.policies : null
		};
	}

	addVerticalRlTerminalContinuationOffset(offset: number, previousTotalPages: number, maxScroll: number): void {
		if (!Number.isFinite(offset)) {
			return;
		}

		let oldKey = this.getVerticalRlLogicalPageOffsetCacheKey(previousTotalPages, maxScroll);
		let continuationOffsets = Array.isArray(this._verticalRlTerminalContinuationOffsets)
			? this._verticalRlTerminalContinuationOffsets
			: [];
		if (continuationOffsets.length === 0) {
			this._verticalRlNominalTerminalOffset = this.getNormalizedLogicalScrollLeft();
		}
		continuationOffsets.push(Math.max(0, Math.min(maxScroll, offset)));
		this._verticalRlTerminalContinuationOffsets = continuationOffsets;

		let nextTotalPages = previousTotalPages + 1;
		let nextKey = this.getVerticalRlLogicalPageOffsetCacheKey(nextTotalPages, maxScroll);
		if (this._verticalRlLogicalPageOffsetCache && this._verticalRlLogicalPageOffsetCache.key === oldKey && nextKey) {
			this._verticalRlLogicalPageOffsetCache.key = nextKey;
		}
		if (nextKey) {
			this.cacheVerticalRlLogicalPageOffset(
				previousTotalPages,
				continuationOffsets[continuationOffsets.length - 1],
				nextKey
			);
		}
		if (this._verticalRlAppliedLeftMaskLedgerKey === oldKey) {
			this._verticalRlAppliedLeftMaskLedgerKey = nextKey;
		}
		this._verticalRlPageIndexLookupKey = null;
		this._verticalRlPageIndexLookupOffset = null;
		this._verticalRlPageIndexLookupResult = null;
		this._verticalRlTerminalCoverageProjectionKey = null;
		this._verticalRlTerminalCoverageProjectionResult = null;
	}

	/**
	 * 依已記錄的實際頁位置判斷目前頁索引。
	 *
	 * 直排每頁的實際步進會被左遮罩縮短，累積後實際位置會明顯落後理論網格
	 * （實測 9789570538069 24px/2.0：第 68 頁實際 offset 25906、理論網格 26112，
	 * 落後 206px 超過半頁），純以 offset/advance 推算會讓索引停止前進，
	 * 使閱讀定位與頁碼卡住。
	 *
	 * @param normalizedOffset 目前的 logical scroll 位置
	 * @param totalPages 目前 view 的總頁數
	 * @param advance 每頁步進
	 * @return {number|null} 找不到足夠接近的記錄時回傳 null
	 */
	getVerticalRlPageIndexFromOffsetLedger(
		normalizedOffset: number,
		totalPages: number,
		advance: number
	): number | null {
		if (!this.isRtlVerticalPaginated() || !(totalPages > 0) || !(totalPages <= 2000) || !(advance > 0)) {
			return null;
		}

		let maxScroll = this.getMaxLogicalScrollLeft();
		let cacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll);

		if (!cacheKey) {
			return null;
		}

		// getCurrentPageIndex() 是熱路徑，逐頁掃描帳本會拖慢翻頁；
		// 以 (cacheKey, offset) 記憶上次結果，避免同一位置重複掃描。
		if (
			this._verticalRlPageIndexLookupKey === cacheKey &&
			this._verticalRlPageIndexLookupOffset === normalizedOffset
		) {
			return this._verticalRlPageIndexLookupResult ?? null;
		}

		let tolerance = advance / 2;
		let bestIndex = null;
		let bestDistance = Number.POSITIVE_INFINITY;

		for (let index = 0; index < totalPages; index += 1) {
			let recorded = this.getCachedVerticalRlLogicalPageOffset(index, cacheKey);

			if (!Number.isFinite(recorded)) {
				continue;
			}

			let distance = Math.abs((recorded as number) - normalizedOffset);

			if (distance < bestDistance) {
				bestDistance = distance;
				bestIndex = index;
			}
		}

		let resolved = bestIndex !== null && bestDistance <= tolerance ? bestIndex : null;

		this._verticalRlPageIndexLookupKey = cacheKey;
		this._verticalRlPageIndexLookupOffset = normalizedOffset;
		this._verticalRlPageIndexLookupResult = resolved;

		return resolved;
	}

	getCurrentPageIndex(){
		let advance = this.getPageAdvance();
		if (!advance || advance <= 0 || !this.container) {
			return 0;
		}

		let totalPages = this.getTotalPagesForCurrentView();
		let normalized = this.getNormalizedLogicalScrollLeft();
		let ledgerIndex = this.getVerticalRlPageIndexFromOffsetLedger(normalized, totalPages, advance);

		if (ledgerIndex !== null) {
			return ledgerIndex;
		}

		let maxLogicalScroll = this.getMaxLogicalScrollLeft();
		let snapTolerance = this.getPageSnapTolerance();
		let boundaryShift = this.getPageBoundaryShift();

		return getCurrentPageIndexForOffsetHelper(
			normalized,
			totalPages,
			advance,
			maxLogicalScroll,
			snapTolerance,
			boundaryShift,
			this.isRtlVerticalPaginated()
		);
	}

	scrollToLogicalPage(pageIndex: number, options: SnapLimits = {}): void {
		this._verticalRlLogicalPageScrollInProgress = true;
		let preSyncView = this.views && (this.views.first() || this.views.last());
		let preSyncIframeWidth = preSyncView && preSyncView.iframe
			? Math.max(
				Number(preSyncView.iframe.getBoundingClientRect && preSyncView.iframe.getBoundingClientRect().width) || 0,
				parseFloat(preSyncView.iframe.style && preSyncView.iframe.style.width) || 0
			)
			: 0;
		let preSyncElementWidth = preSyncView && preSyncView.element
			? Math.max(
				Number(preSyncView.element.getBoundingClientRect && preSyncView.element.getBoundingClientRect().width) || 0,
				parseFloat(preSyncView.element.style && preSyncView.element.style.width) || 0
			)
			: 0;
		let preSyncVisualContentWidth = preSyncView
			? Math.max(
				this.getVerticalRlVisualContentWidth(preSyncView),
				preSyncIframeWidth,
				preSyncElementWidth
			)
			: 0;
		let preSyncTotalPages = this.getTotalPagesForCurrentView();
		let readPreSyncIframeWidth = () => preSyncView && preSyncView.iframe
			? Math.max(
				Number(preSyncView.iframe.getBoundingClientRect && preSyncView.iframe.getBoundingClientRect().width) || 0,
				parseFloat(preSyncView.iframe.style && preSyncView.iframe.style.width) || 0
			)
			: 0;
		appendVerticalRlScrollTrace("before-sync", {
			pageIndex,
			preSyncTotalPages,
			preSyncVisualContentWidth,
			preSyncIframeWidth,
			preSyncElementWidth,
			containerScrollWidth: this.container && this.container.scrollWidth,
			containerClientWidth: this.container && this.container.clientWidth
		});
		this.syncVerticalRlViewportClip();
		let advance = this.getPageAdvance();
		// 防禦性下限：layout 未穩定時 getTotalPagesForCurrentView() 可能低估頁數。
		// 2026-08-15 於 9789570538069 的量測顯示 layout 穩定過程中頁數只增不減
		// （5→8、4→9），故此 Math.max 在該情境未實際生效；保留以防其他情境低估。
		let totalPages = Math.max(preSyncTotalPages, this.getTotalPagesForCurrentView());
		// 塌陷防護：syncVerticalRlViewportClip() 後 view 寬度若被壓縮至單頁寬，
		// 多頁內容會塌陷、捲動落點與遮罩計算全部失準。
		// 2026-08-15 量測：9789570538069 四組字級/行高的 restoredBeforeScroll 與
		// restoredAfterScroll 皆為 0，此防護未曾觸發；保留以防其他情境塌陷。
		let restorePreSyncVisualContentWidth = () => {
			if (!(
				this.isRtlVerticalPaginated() &&
				totalPages > 1 &&
				this.container &&
				this.container.scrollWidth <= this.container.clientWidth + 1 &&
				preSyncVisualContentWidth > this.container.clientWidth + 1 &&
				preSyncView
			)) {
				return false;
			}
			let restoredWidth = `${preSyncVisualContentWidth}px`;
			if (preSyncView.iframe && preSyncView.iframe.style) {
				preSyncView.iframe.style.width = restoredWidth;
			}
			if (preSyncView.element && preSyncView.element.style) {
				preSyncView.element.style.width = restoredWidth;
			}
			preSyncView._contentWidth = preSyncVisualContentWidth;
			preSyncView._width = preSyncVisualContentWidth;
			return true;
		};
		let restoredBeforeScroll = restorePreSyncVisualContentWidth();
		let targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
		let maxScroll = this.getMaxLogicalScrollLeft();
		let nominalTotalPages = this.getNominalTotalPagesForCurrentView();
		if (
			this.isRtlVerticalPaginated() &&
			targetIndex >= nominalTotalPages &&
			(!Array.isArray(this._verticalRlTerminalContinuationOffsets) ||
				this._verticalRlTerminalContinuationOffsets.length === 0)
		) {
			this._verticalRlTerminalCoverageProjectionInProgress = true;
			try {
				let projectedSnapshot = this.getVerticalRlTerminalSemanticCoverageSnapshot();
				let continuationOffsets = this.getVerticalRlTerminalContinuationPlan(projectedSnapshot);

				continuationOffsets.forEach((continuationOffset, index) => {
					this.addVerticalRlTerminalContinuationOffset(
						continuationOffset,
						nominalTotalPages + index,
						maxScroll
					);
				});
				totalPages = Math.max(totalPages, this.getTotalPagesForCurrentView());
			} finally {
				this._verticalRlTerminalCoverageProjectionInProgress = false;
			}
		}
		targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
		let terminalSnapshot = isVerticalRlDebugEnabled() && this.isRtlVerticalPaginated()
			? this.getVerticalRlTerminalSemanticCoverageSnapshot()
			: null;
		if (terminalSnapshot) {
			appendVerticalRlTerminalCoverageTrace("scroll:terminal-preflight", this.getVerticalRlTerminalCoverageTraceDetail(
				targetIndex,
				terminalSnapshot,
				{ targetGridOffset: this.getLogicalOffsetForPageIndex(targetIndex, totalPages, maxScroll) }
			));
		}
		appendVerticalRlScrollTrace("after-first-sync", {
			totalPages,
			restoredBeforeScroll,
			maxScroll,
			containerScrollWidth: this.container && this.container.scrollWidth,
			iframeWidth: readPreSyncIframeWidth()
		});
		let sequentialBoundaryConstraint = null;
		let logicalOffsetCacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll);
		let ignoreCachedLogicalOffset = Boolean(options && options.ignoreCachedLogicalOffset);
		let cachedLogicalOffset = ignoreCachedLogicalOffset
			? null
			: this.getCachedVerticalRlLogicalPageOffset(targetIndex, logicalOffsetCacheKey);
		if (this.isRtlVerticalPaginated() && targetIndex > 0) {
			let forcedRightBoundary = Number(options && options.sequentialRightBoundary);
			if (Number.isFinite(forcedRightBoundary) && forcedRightBoundary > 0) {
				sequentialBoundaryConstraint = getVerticalRlSequentialRightBoundaryConstraintHelper(
					targetIndex,
					forcedRightBoundary,
					0,
					0,
					0,
					0,
					0,
					0
				);
			} else if (targetIndex < totalPages - 1) {
				let currentIndex = this.getCurrentPageIndex();
				if (currentIndex === targetIndex - 1) {
					let view = this.views && (this.views.first() || this.views.last());
					let contentWidth = view ? this.getVerticalRlVisualContentWidth(view) : 0;
					let visibleWidth = this.layout.pageWidth || this.layout.width || advance || 0;
					let currentOffset = this.getNormalizedLogicalScrollLeft();
					let currentGridOffset = this.getLogicalOffsetForPageIndex(currentIndex, totalPages, maxScroll);
					let currentMaskWidths = this.getVerticalRlRenderedEdgeMaskWidths();
					let currentLeftMask = Number(currentMaskWidths && currentMaskWidths.left) || 0;
					sequentialBoundaryConstraint = getVerticalRlSequentialRightBoundaryConstraintHelper(
						targetIndex,
						forcedRightBoundary,
						contentWidth,
						currentOffset,
						currentGridOffset,
						visibleWidth,
						advance,
						currentLeftMask
					);
				}
			}
		}
		let logicalOffset = cachedLogicalOffset !== null && !sequentialBoundaryConstraint
			? cachedLogicalOffset
			: sequentialBoundaryConstraint
				// 強制右邊界（例如收尾頁）有自己的定位契約，維持理論網格推算。
				? this.getLogicalOffsetForPageIndex(targetIndex, totalPages, maxScroll)
				: this.getVerticalRlPageOffset(targetIndex, totalPages, maxScroll);
		let isNominalTerminalWithContinuations = (
			this.isRtlVerticalPaginated() &&
			targetIndex === nominalTotalPages - 1 &&
			Array.isArray(this._verticalRlTerminalContinuationOffsets) &&
			this._verticalRlTerminalContinuationOffsets.length > 0 &&
			Number.isFinite(this._verticalRlNominalTerminalOffset)
		);
		if ((cachedLogicalOffset === null || sequentialBoundaryConstraint) && !isNominalTerminalWithContinuations) {
			if (
				this.isRtlVerticalPaginated() &&
				targetIndex > 0 &&
				(targetIndex < totalPages - 1 || sequentialBoundaryConstraint)
			) {
				let snappedLogicalOffset = this.snapVerticalRlLogicalOffsetToTextBoundary(
					logicalOffset,
					maxScroll,
					sequentialBoundaryConstraint || {}
				);
				if (Number.isFinite(snappedLogicalOffset)) {
					logicalOffset = snappedLogicalOffset;
				}
			}
		}
		if (terminalSnapshot) {
			appendVerticalRlTerminalCoverageTrace("scroll:terminal-boundary-constrained", this.getVerticalRlTerminalCoverageTraceDetail(
				targetIndex,
				terminalSnapshot,
				{
					targetGridOffset: this.getLogicalOffsetForPageIndex(targetIndex, totalPages, maxScroll),
					constrainedOffset: logicalOffset,
					sequentialRightBoundary: options.sequentialRightBoundary ?? null,
					maxRightBoundary: sequentialBoundaryConstraint && sequentialBoundaryConstraint.maxRightBoundary,
					preferredRightBoundary: sequentialBoundaryConstraint && sequentialBoundaryConstraint.preferredRightBoundary
				}
			));
		}
		this._verticalRlSequentialBoundaryConstraint = sequentialBoundaryConstraint;
		if (this.isRtlVerticalPaginated()) {
			this.cacheVerticalRlLogicalPageOffset(targetIndex, logicalOffset, logicalOffsetCacheKey);
		}
		let left = logicalOffset;

		if (this.settings.direction === "rtl") {
			if (this.settings.rtlScrollType === "negative" || this.container.scrollLeft < 0) {
				left = -logicalOffset;
			} else if (this.settings.rtlScrollType === "default") {
				left = Math.max(0, maxScroll - logicalOffset);
			}
		} else {
			left = logicalOffset;
		}

		this._verticalRlBoundarySnapApplying = true;
		try {
			this.scrollTo(left, 0, true);
		} finally {
			this._verticalRlBoundarySnapApplying = false;
		}
		this.syncVerticalRlViewportClip();
		let restoredAfterScroll = restorePreSyncVisualContentWidth();
		appendVerticalRlScrollTrace("after-second-sync", {
			logicalOffset,
			left,
			restoredAfterScroll,
			containerScrollLeft: this.container && this.container.scrollLeft,
			containerScrollWidth: this.container && this.container.scrollWidth,
			iframeWidth: readPreSyncIframeWidth()
		});
		if (restoredAfterScroll) {
			this._verticalRlBoundarySnapApplying = true;
			try {
				this.scrollTo(left, 0, true);
			} finally {
				this._verticalRlBoundarySnapApplying = false;
			}
		}
		if (terminalSnapshot) {
			appendVerticalRlTerminalCoverageTrace("scroll:terminal-snapped", this.getVerticalRlTerminalCoverageTraceDetail(
				targetIndex,
				terminalSnapshot,
				{
					targetGridOffset: this.getLogicalOffsetForPageIndex(targetIndex, totalPages, maxScroll),
					snappedOffset: logicalOffset,
					sequentialRightBoundary: options.sequentialRightBoundary ?? null,
					maxRightBoundary: sequentialBoundaryConstraint && sequentialBoundaryConstraint.maxRightBoundary,
					preferredRightBoundary: sequentialBoundaryConstraint && sequentialBoundaryConstraint.preferredRightBoundary
				}
			));
		}
		appendVerticalRlScrollTrace("complete", {
			targetIndex,
			containerScrollLeft: this.container && this.container.scrollLeft,
			containerScrollWidth: this.container && this.container.scrollWidth,
			iframeWidth: readPreSyncIframeWidth()
		});
		if (terminalSnapshot) {
			let settledSnapshot = this.getVerticalRlTerminalSemanticCoverageSnapshot();
			appendVerticalRlTerminalCoverageTrace("scroll:terminal-coverage", this.getVerticalRlTerminalCoverageTraceDetail(
				targetIndex,
				settledSnapshot,
				{
					targetGridOffset: this.getLogicalOffsetForPageIndex(targetIndex, totalPages, maxScroll),
					snappedOffset: logicalOffset,
					sequentialRightBoundary: options.sequentialRightBoundary ?? null,
					maxRightBoundary: sequentialBoundaryConstraint && sequentialBoundaryConstraint.maxRightBoundary,
					preferredRightBoundary: sequentialBoundaryConstraint && sequentialBoundaryConstraint.preferredRightBoundary
				}
			));
		}
		this._verticalRlLogicalPageScrollInProgress = false;
		this.queueVerticalRlBoundarySnapRetry(targetIndex);
		// layout 穩定後重算遮罩。首次 syncVerticalRlViewportClip() 發生在 layout
		// 尚未定案時（頁數仍在變動），算出的遮罩偏寬，會遮蔽超出必要範圍的頁緣內容。
		//
		// 2026-08-15 ablation（9789570538069, mobile-390x844, 27 格）：停用本區塊後
		// 22px/1.8 的左遮罩由 0 回升至 26；全格遮罩觸發量由 237 回升至 352。
		// 這是本次 WIP 諸多防護中唯一經實測有效者。
		//
		// 註：邊緣遮罩本身為正確行為——被遮蔽的字元會在下一頁完整顯示，
		// 經相鄰頁銜接驗證確認不會遺失內容。故本區塊屬顯示品質最佳化，
		// 而非內容遺失的修正。
		this.waitForVerticalRlLayoutReady().then(function(){
			if (this.container && this.getCurrentPageIndex() === targetIndex) {
				this.syncVerticalRlViewportClip();
				if (this.getCurrentPageIndex() !== targetIndex) {
					this._verticalRlBoundarySnapApplying = true;
					try {
						this.scrollTo(left, 0, true);
					} finally {
						this._verticalRlBoundarySnapApplying = false;
					}
				}
			}
		}.bind(this));
	}

	waitForVerticalRlLayoutReady(){
		let view = this.views && (this.views.first() || this.views.last());
		let doc = view && view.contents && view.contents.document;
		let fontsReady = doc && doc.fonts && doc.fonts.ready
			? doc.fonts.ready.catch(function(){})
			: Promise.resolve();
		let fontReadyTimeout = Number(this.settings && this.settings.verticalRlFontReadyTimeout);
		let safeFontReadyTimeout = Number.isFinite(fontReadyTimeout) && fontReadyTimeout >= 0
			? fontReadyTimeout
			: 160;
		let fontReadyOrTimeout = Promise.race([
			fontsReady,
			new Promise(function(resolve){
				setTimeout(resolve, safeFontReadyTimeout);
			})
		]);
		let nextFrame = () => new Promise((resolve) => {
			if (typeof requestAnimationFrame === "function") {
				requestAnimationFrame(function(){
					requestAnimationFrame(resolve);
				});
			} else {
				setTimeout(resolve, 0);
			}
		});

		return nextFrame().then(function(){
			return fontReadyOrTimeout;
		}).then(nextFrame);
	}

	queueVerticalRlBoundarySnapRetry(pageIndex: number, options: SnapLimits = {}): void {
		if (!this.isRtlVerticalPaginated() || !this.container) {
			return;
		}

		let totalPages = this.getTotalPagesForCurrentView();
		let targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
		let token = (this._verticalRlBoundarySnapRetryToken || 0) + 1;
		this._verticalRlBoundarySnapRetryToken = token;

		let nominalTotalPages = totalPages;
		let continuationOffsets = this._verticalRlTerminalContinuationOffsets;
		if (Array.isArray(continuationOffsets) && continuationOffsets.length > 0) {
			try {
				nominalTotalPages = this.getNominalTotalPagesForCurrentView();
			} catch (error) {
				nominalTotalPages = totalPages;
			}
		}
		let isNominalTerminalWithContinuations = (
			targetIndex === nominalTotalPages - 1 &&
			Array.isArray(continuationOffsets) &&
			continuationOffsets.length > 0 &&
			Number.isFinite(this._verticalRlNominalTerminalOffset)
		);
		if (targetIndex <= 0 || targetIndex >= totalPages - 1 || isNominalTerminalWithContinuations) {
			return;
		}

		let retryDelays = Array.isArray(this.settings && this.settings.verticalRlBoundarySnapRetryDelays)
			? this.settings.verticalRlBoundarySnapRetryDelays
			: [250, 750, 1500, 3000, 6000, 9000];
			let retryAttempt = function(attempt: number){
			this.waitForVerticalRlLayoutReady().then(function(){
				if (this._verticalRlBoundarySnapRetryToken !== token || !this.container) {
					return;
				}

				let currentTotalPages = this.getTotalPagesForCurrentView();
				let maxScroll = this.getMaxLogicalScrollLeft();
				let currentOffset = this.getNormalizedLogicalScrollLeft();
				let logicalOffsetCacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(currentTotalPages, maxScroll);
				let cachedLogicalOffset = this.getCachedVerticalRlLogicalPageOffset(targetIndex, logicalOffsetCacheKey);
				let shouldUseCachedLogicalOffset = cachedLogicalOffset !== null && (
					!options.useCurrentOffset ||
					Math.abs(currentOffset - cachedLogicalOffset) <= this.getPageSnapTolerance()
				);
				let logicalOffset = shouldUseCachedLogicalOffset
					? cachedLogicalOffset
					: options.useCurrentOffset
						? Math.max(0, Math.min(maxScroll, currentOffset))
						: this.getVerticalRlPageOffset(targetIndex, currentTotalPages, maxScroll);
				let shouldSnapCurrentOffsetToPageGrid = (
					options.useCurrentOffset &&
					this.getPageBoundaryShift() === 0 &&
					this.container
				);
				if (shouldSnapCurrentOffsetToPageGrid) {
					let currentIndex = this.getCurrentPageIndex();
					let pageOffset = this.getVerticalRlPageOffset(currentIndex, currentTotalPages, maxScroll);
					if (Math.abs(currentOffset - pageOffset) <= this.getPageSnapTolerance()) {
						logicalOffset = pageOffset;
					}
				}
				let sequentialBoundaryConstraint = (
					this._verticalRlSequentialBoundaryConstraint &&
					this._verticalRlSequentialBoundaryConstraint.pageIndex === targetIndex
				)
					? this._verticalRlSequentialBoundaryConstraint
					: {};
				let view = this.views && (this.views.first() || this.views.last());
				let canMeasureCachedLogicalOffset = Boolean(
					view &&
					view.iframe &&
					view.contents &&
					view.contents.document &&
					view.contents.document.body &&
					view.contents.window
				);
				let shouldMeasureBoundary = !shouldUseCachedLogicalOffset || canMeasureCachedLogicalOffset;
				let snappedOffset = shouldMeasureBoundary
					? this.snapVerticalRlLogicalOffsetToTextBoundary(
						logicalOffset,
						maxScroll,
						sequentialBoundaryConstraint
					)
					: logicalOffset;
				if (!Number.isFinite(Number(snappedOffset))) {
					snappedOffset = logicalOffset;
				}

				if (!shouldUseCachedLogicalOffset && Math.abs(snappedOffset - logicalOffset) <= 1) {
					snappedOffset = this.snapVerticalRlLogicalOffsetFromEdgeMask(logicalOffset, maxScroll);
				}

				if (Math.abs(snappedOffset - logicalOffset) <= 1) {
					snappedOffset = logicalOffset;
				}

				if (Math.abs(snappedOffset - currentOffset) <= 1) {
					this.syncVerticalRlViewportClip();
					let delay = Number(retryDelays[attempt]);
					if (Number.isFinite(delay) && delay >= 0) {
						setTimeout(function(){
							retryAttempt(attempt + 1);
						}, delay);
					}
					return;
				}

				this.cacheVerticalRlLogicalPageOffset(targetIndex, snappedOffset, logicalOffsetCacheKey);

				let left = snappedOffset;
				if (this.settings.direction === "rtl") {
					if (this.settings.rtlScrollType === "negative" || this.container.scrollLeft < 0) {
						left = -snappedOffset;
					} else if (this.settings.rtlScrollType === "default") {
						left = Math.max(0, maxScroll - snappedOffset);
					}
				}

				this._verticalRlBoundarySnapApplying = true;
				try {
					this.scrollTo(left, 0, true);
				} finally {
					this._verticalRlBoundarySnapApplying = false;
				}
				this.syncVerticalRlViewportClip();
			}.bind(this));
		}.bind(this);

		retryAttempt(0);
	}

	queueVerticalRlBoundarySnapRetryForCurrentOffset(){
		if (!this.isRtlVerticalPaginated() || !this.container) {
			return;
		}

		clearTimeout(this._verticalRlBoundarySnapAfterScroll);
		this._verticalRlBoundarySnapAfterScroll = setTimeout(function(){
			if (!this.isRtlVerticalPaginated() || !this.container) {
				return;
			}

			this.syncVerticalRlViewportClip();
			this.queueVerticalRlBoundarySnapRetry(this.getCurrentPageIndex(), { useCurrentOffset: true });
		}.bind(this), 0);
	}

	displaySpineItemAtEnd(section: ManagerSection, forceRight?: boolean): Promise<void> {
		return (this.prepend(section, forceRight) as Promise<ManagerView>)
			.then(function(){
			var left: ManagerSection | undefined;
				if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
					left = section.prev();
					if (left) {
						return this.prepend(left);
					}
				}
			}.bind(this))
			.then(function(){
				if (this.isRtlVerticalPaginated()) {
					return this.waitForVerticalRlLayoutReady();
				}
			}.bind(this))
			.then(function(){
				if(this.isPaginated && this.settings.axis === "horizontal") {
					let pageAdvance = this.getPageAdvance();
					if (this.settings.direction === "rtl") {
						this.scrollToLogicalPage(this.getTotalPagesForCurrentView() - 1);
					} else {
						this.scrollTo(this.container.scrollWidth - pageAdvance, 0, true);
					}
				}
				this.views.show();
			}.bind(this));
	}

	next(): Promise<unknown> | void {
		var next: ManagerSection | undefined;
		var left: number;

		let dir = this.settings.direction;

		if(!this.views.length) return;

		if (this.isRtlVerticalPaginated()) {
			let pageIndex = this.getCurrentPageIndex();
			let totalPages = this.getTotalPagesForCurrentView();
			let nominalTotalPages = totalPages;
			try {
				nominalTotalPages = this.getNominalTotalPagesForCurrentView();
			} catch (error) {
				nominalTotalPages = totalPages;
			}
			if (pageIndex < totalPages - 1) {
				let options = pageIndex < nominalTotalPages - 1
					? { sequentialRightBoundary: this.getVerticalRlCurrentEffectiveLeftBoundary() }
					: {};
				this.scrollToLogicalPage(pageIndex + 1, options);
				return;
			}

			if (pageIndex >= nominalTotalPages - 1 && isVerticalRlTerminalContinuationEnabled()) {
				let terminalSnapshot = this.getVerticalRlTerminalSemanticCoverageSnapshot();
				if (terminalSnapshot) {
					appendVerticalRlTerminalCoverageTrace("next:terminal-candidate", this.getVerticalRlTerminalCoverageTraceDetail(
						pageIndex,
						terminalSnapshot,
						{ targetGridOffset: this.getLogicalOffsetForPageIndex(pageIndex, totalPages, this.getMaxLogicalScrollLeft()) }
					));
				}
				let continuationOffsets = this.getVerticalRlTerminalContinuationPlan(terminalSnapshot);

				if (continuationOffsets.length) {
					let previousTotalPages = totalPages;
					continuationOffsets.forEach((continuationOffset, index) => {
						this.addVerticalRlTerminalContinuationOffset(
							continuationOffset,
							previousTotalPages + index,
							this.getMaxLogicalScrollLeft()
						);
						appendVerticalRlTerminalCoverageTrace("next:terminal-continuation", this.getVerticalRlTerminalCoverageTraceDetail(
							pageIndex + index + 1,
							terminalSnapshot,
							{ targetGridOffset: continuationOffset, snappedOffset: continuationOffset }
						));
					});
					this.scrollToLogicalPage(pageIndex + 1);
					// Keep the rendition queue open until the continuation viewport has
					// settled. Consumers inspect the current slice immediately after
					// manager.next() resolves and must not mistake the in-flight
					// continuation for a blank terminal page.
					return this.waitForVerticalRlLayoutReady();
				}

				if (terminalSnapshot && terminalSnapshot.coverage.uncoveredSemanticRects.length) {
					return;
				}
			}

			next = this.views.last().section.next();
		}

		if(!next && this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {
			let pageIndex = this.getCurrentPageIndex();
			let totalPages = this.getTotalPagesForCurrentView();

			this.scrollLeft = this.container.scrollLeft;

			if(pageIndex < totalPages - 1) {
				this.scrollToLogicalPage(pageIndex + 1);
			} else {
				next = this.views.last().section.next();
			}
		} else if (!next && this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {
			let pageIndex = this.getCurrentPageIndex();
			let totalPages = this.getTotalPagesForCurrentView();

			if (pageIndex < totalPages - 1) {
				this.scrollToLogicalPage(pageIndex + 1);
			} else {
				next = this.views.last().section.next();
			}

		} else if (!next && this.isPaginated && this.settings.axis === "vertical") {

			this.scrollTop = this.container.scrollTop;

			let reachedToBottom = Math.abs(
				this.container.scrollHeight - this.container.clientHeight - this.container.scrollTop
			) < 1;

			if(!reachedToBottom) {
				this.scrollBy(0, this.layout.height, true);
			} else {
				next = this.views.last().section.next();
			}

		} else if (!next) {
			next = this.views.last().section.next();
		}

		if(next) {
			this.clear();
			// The new section may have a different writing-mode from the old section. Thus, we need to update layout.
			this.updateLayout();

			let forceRight = false;
			if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && next.properties!.includes("page-spread-right")) {
				forceRight = true;
			}

				return (this.append(next, forceRight) as Promise<ManagerView>)
					.then(function(){
						return this.handleNextPrePaginated(forceRight, next, this.append);
					}.bind(this), (err: unknown) => {
						return err;
					})
				.then(function(){

					// Reset position to start for scrolled-doc vertical-rl in default mode
					if (!this.isPaginated &&
						this.settings.axis === "horizontal" &&
						this.settings.direction === "rtl" &&
						this.settings.rtlScrollType === "default") {
						
						this.scrollTo(this.container.scrollWidth, 0, true);
					}
					this.views.show();
				}.bind(this));
		}


	}

	prev(): Promise<unknown> | void {
		var prev: ManagerSection | undefined;
		var left: number;
		let dir = this.settings.direction;

		if(!this.views.length) return;

		if (this.isRtlVerticalPaginated()) {
			let pageIndex = this.getCurrentPageIndex();

			if (pageIndex > 0) {
				this.scrollToLogicalPage(pageIndex - 1, {
					ignoreCachedLogicalOffset: true
				});
				return;
			} else {
				prev = this.views.first().section.prev();
			}
		}

		if(!prev && this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {
			let pageIndex = this.getCurrentPageIndex();

			this.scrollLeft = this.container.scrollLeft;

			if(pageIndex > 0) {
				this.scrollToLogicalPage(pageIndex - 1, {
					ignoreCachedLogicalOffset: true
				});
			} else {
				prev = this.views.first().section.prev();
			}

		} else if (!prev && this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {
			let pageAdvance = this.getPageAdvance();

			this.scrollLeft = this.container.scrollLeft;

			if (this.settings.rtlScrollType === "default"){
				left = this.container.scrollLeft + this.container.offsetWidth;

				if (left < this.container.scrollWidth) {
					this.scrollBy(-pageAdvance, 0, true);
				} else {
					prev = this.views.first().section.prev();
				}
			}
			else{
				left = this.container.scrollLeft;

				if (left < 0) {
					this.scrollBy(-pageAdvance, 0, true);
				} else {
					prev = this.views.first().section.prev();
				}
			}

		} else if (!prev && this.isPaginated && this.settings.axis === "vertical") {

			this.scrollTop = this.container.scrollTop;

			let top = this.container.scrollTop;

			if(top > 0) {
				this.scrollBy(0, -(this.layout.height), true);
			} else {
				prev = this.views.first().section.prev();
			}

		} else if (!prev) {

			prev = this.views.first().section.prev();

		}

		if(prev) {
			this.clear();
			// The new section may have a different writing-mode from the old section. Thus, we need to update layout.
			this.updateLayout();

			let forceRight = false;
			if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && typeof prev.prev() !== "object") {
				forceRight = true;
			}

			return this.displaySpineItemAtEnd(prev, forceRight)
					.catch((err: unknown) => {
						return err;
					});
		}
	}

	current(): VisibleManagerView | null {
		var visible = this.visible();
		if(visible.length){
			// Current is the last visible view
			return visible[visible.length-1];
		}
		return null;
	}

	clear () {

		// this.q.clear();

		if (this.views) {
			this.views.hide();
			this.scrollTo(0,0, true);
			this.views.clear();
		}

		this._verticalRlTerminalContinuationOffsets = [];
		this._verticalRlNominalTerminalOffset = null;
		this._verticalRlLogicalPageOffsetCache = null;
		this._verticalRlAppliedLeftMaskLedger = null;
		this._verticalRlAppliedLeftMaskLedgerKey = null;
		this._verticalRlPageIndexLookupKey = null;
		this._verticalRlPageIndexLookupOffset = null;
		this._verticalRlPageIndexLookupResult = null;
		this._verticalRlTerminalCoverageProjectionKey = null;
		this._verticalRlTerminalCoverageProjectionResult = null;
		this._verticalRlLogicalPageScrollInProgress = false;
	}

	currentLocation(): Array<ManagerLocationItem | null | undefined> {
		if (this.shouldUpdateLayoutForLocation()) {
			this.updateLayout();
		}
		if (this.isPaginated && this.settings.axis === "horizontal") {
			this.location = this.paginatedLocation();
		} else {
			this.location = this.scrolledLocation();
		}
		this.recordResizeSettleTrace("location:mapped", {
			location: this.location.map(function(item){
				return item ? {
					href: item.href,
					pages: item.pages,
					totalPages: item.totalPages,
					start: item.mapping && item.mapping.start,
					end: item.mapping && item.mapping.end
				} : null;
			}),
			container: this.resizeSettleContainerSnapshot()
		});
		return this.location;
	}

	scrolledLocation(): ManagerLocationItem[] {
		let visible = this.visible();
		let container = this.container.getBoundingClientRect();
		let pageHeight = (container.height < window.innerHeight) ? container.height : window.innerHeight;
		let pageWidth = (container.width < window.innerWidth) ? container.width : window.innerWidth;
		let vertical = (this.settings.axis === "vertical");

		let offset = 0;
		let used = 0;

		if(this.settings.fullsize) {
			offset = vertical ? window.scrollY : window.scrollX;
		}

		let sections = visible.map((view: VisibleManagerView) => {
			let {index, href} = view.section;
			let position = view.position();
			let width = view.width();
			let height = view.height();

			let startPos;
			let endPos;
			let stopPos;
			let totalPages;

			if (vertical) {
				startPos = offset + container.top - position.top + used;
				endPos = startPos + pageHeight - used;
				totalPages = this.layout.count(height, pageHeight).pages;
				stopPos = pageHeight;
			} else {
				startPos = offset + container.left - position.left + used;
				endPos = startPos + pageWidth - used;
				totalPages = this.layout.count(width, pageWidth).pages;
				stopPos = pageWidth;
			}

			let currPage = Math.ceil(startPos / stopPos);
			let pages: number[] = [];
			let endPage = Math.ceil(endPos / stopPos);

			// Reverse page counts for horizontal rtl
			if (this.settings.direction === "rtl" && !vertical) {
				let tempStartPage = currPage;
				currPage = totalPages - endPage;
				endPage = totalPages - tempStartPage;
			}

			pages = [];
			for (var i = currPage; i <= endPage; i++) {
				let pg = i + 1;
				pages.push(pg);
			}

			let mapping = this.mapping.page(view.contents, view.section.cfiBase, startPos, endPos);

			return {
				index: index!,
				href: href!,
				pages,
				totalPages,
				mapping
			};
		});

		return sections;
	}

	paginatedLocation(): ManagerLocationItem[] {
		let visible = this.visible();
		let container = this.container.getBoundingClientRect();
		let isRtlVerticalPaginated = this.isRtlVerticalPaginated();

		let left = 0;
		let used = 0;

		if(this.settings.fullsize) {
			left = window.scrollX;
		}

		let sections = visible.map((view: VisibleManagerView) => {
			let {index, href} = view.section;
			let offset;
			let position = view.position();
			let width = view.width();

			// Find mapping
			let start;
			let end;
			let pageWidth;

			if (this.settings.direction === "rtl") {
				offset = container.right - left;
				pageWidth = Math.min(Math.abs(offset - position.left), this.layout.width) - used;
				end = position.width - (position.right - offset) - used;
				start = end - pageWidth;
			} else {
				offset = container.left + left;
				pageWidth = Math.min(position.right - offset, this.layout.width) - used;
				start = offset - position.left + used;
				end = start + pageWidth;
			}

			used += pageWidth;

			let mapping = this.mapping.page(view.contents, view.section.cfiBase, start, end);

			let pageAdvance = this.getPageAdvance();
			let totalPages = this.layout.count(width, pageAdvance).pages;
			let startPage = Math.floor(start / pageAdvance);
			let pages: number[] = [];
			let endPage = Math.floor(end / pageAdvance);

			if (isRtlVerticalPaginated) {
				let currentPageIndex = this.getCurrentPageIndex();
				let currentLogicalOffset = this.getNormalizedLogicalScrollLeft();
				let visiblePageWidth = this.layout.pageWidth || this.layout.width || pageAdvance;
				let contentWidth = width;
				let maxPhysicalStart = Math.max(0, contentWidth - visiblePageWidth);
				let physicalStart = Math.max(
					0,
					Math.min(maxPhysicalStart, maxPhysicalStart - currentLogicalOffset)
				);
				let physicalEnd = Math.min(contentWidth, physicalStart + visiblePageWidth);
				totalPages = this.getTotalPagesForCurrentView();
				pages = [currentPageIndex + 1];
				start = physicalStart;
				end = physicalEnd;
				mapping = this.mapping.page(view.contents, view.section.cfiBase, physicalStart, physicalEnd);

				return {
					index: index!,
					href: href!,
					pages,
					totalPages,
					mapping
				};
			}
			
			// start page should not be negative
			if (startPage < 0) {
				startPage = 0;
				endPage = endPage + 1;
			}

			// Reverse page counts for rtl
			if (this.settings.direction === "rtl") {
				let tempStartPage = startPage;
				startPage = totalPages - endPage;
				endPage = totalPages - tempStartPage;
			}


			for (var i = startPage + 1; i <= endPage; i++) {
				let pg = i;
				pages.push(pg);
			}

			return {
				index: index!,
				href: href!,
				pages,
				totalPages,
				mapping
			};
		});

		return sections;
	}

	isVisible(view: PositionedView, offsetPrev: number, offsetNext: number, _container?: ManagerBounds): boolean {
		var position = view.position!();
		var container: ManagerBounds = _container || this.bounds();

		if(this.settings.axis === "horizontal" &&
			position.right > container.left - offsetPrev &&
			position.left < container.right + offsetNext) {

			return true;

		} else if(this.settings.axis === "vertical" &&
			position.bottom > container.top - offsetPrev &&
			position.top < container.bottom + offsetNext) {

			return true;
		}

		return false;

	}

	visible(): VisibleManagerView[] {
		var container: ManagerBounds = this.bounds();
		var views: VisibleManagerView[] = this.views.displayed();
		var viewsLength = views.length;
			var visible: VisibleManagerView[] = [];
		var isVisible;
		var view: VisibleManagerView;

		for (var i = 0; i < viewsLength; i++) {
			view = views[i];
			isVisible = this.isVisible(view, 0, 0, container);

			if(isVisible === true) {
				visible.push(view);
			}

		}
		return visible;
	}

	scrollBy(x: number, y: number, silent?: boolean): void {
		let dir = this.settings.direction === "rtl" ? -1 : 1;

		if(silent) {
			this.ignore = true;
		}

		if(!this.settings.fullsize) {
			if(x) this.container.scrollLeft += x * dir;
			if(y) this.container.scrollTop += y;
		} else {
			window.scrollBy(x * dir, y * dir);
		}
		(this as unknown as ManagerScrollState).scrolled = true;
	}

	scrollTo(x: number, y: number, silent?: boolean): void {
		let before = this.resizeSettleContainerSnapshot();
		if(silent) {
			this.ignore = true;
		}

		if(!this.settings.fullsize) {
			this.container.scrollLeft = x;
			this.container.scrollTop = y;
		} else {
			window.scrollTo(x,y);
		}
		(this as unknown as ManagerScrollState).scrolled = true;
		this.recordResizeSettleTrace("scroll:applied", {
			requested: {
				left: x,
				top: y,
				silent: Boolean(silent)
			},
			before,
			after: this.resizeSettleContainerSnapshot()
		});

		if (!this._verticalRlBoundarySnapApplying && this.isRtlVerticalPaginated()) {
			this.queueVerticalRlBoundarySnapRetryForCurrentOffset();
		}
	}

	onScroll(){
		let scrollTop;
		let scrollLeft;
		let ignored = this.ignore;

		if(!this.settings.fullsize) {
			scrollTop = this.container.scrollTop;
			scrollLeft = this.container.scrollLeft;
		} else {
			scrollTop = window.scrollY;
			scrollLeft = window.scrollX;
		}

		this.scrollTop = scrollTop;
		this.scrollLeft = scrollLeft;
		this.target = undefined;

		if(!this.ignore) {
			this.emit(EVENTS.MANAGERS.SCROLL, {
				top: scrollTop,
				left: scrollLeft
			});

			clearTimeout(this.afterScrolled);
			this.afterScrolled = setTimeout(function () {
				this.emit(EVENTS.MANAGERS.SCROLLED, {
					top: this.scrollTop,
					left: this.scrollLeft
				});
			}.bind(this), 20);



		} else {
			this.ignore = false;
		}

		if (!ignored && !this._verticalRlBoundarySnapApplying && this.isRtlVerticalPaginated()) {
			this.queueVerticalRlBoundarySnapRetryForCurrentOffset();
		}

	}

	bounds(): ManagerBounds {
		// stage 只在 render() 內建立，但消費端（含 Capacitor app 的初始 resize）
		// 可能在 render 完成前就問尺寸。實測 Android 會在此丟出
		// `Cannot read properties of undefined (reading 'bounds')`，
		// 那是一個沒人接的 TypeError，會中斷當下的整條回呼。
		// 此處回傳上一次已知的尺寸（沒有就回零），讓呼叫端拿到可用值而非炸掉。
		if (!this.stage) {
			return (this._bounds || { width: 0, height: 0, top: 0, left: 0 }) as ManagerBounds;
		}

		var bounds;

		bounds = this.stage.bounds() as ManagerBounds;

		return bounds;
	}

	applyLayout(layout: Layout): void {

		this.layout = layout;
		this._layoutDirty = true;
		this.updateLayout();
		if (this.views && this.views.length > 0 && this.layout.name === "pre-paginated") {
			this.display(this.views.first().section);
		}
		 // this.manager.layout(this.layout.format);
	}

	shouldUpdateLayoutForLocation() {
		if (!this.stage || !this.layout) {
			return false;
		}

		if (this._layoutDirty || !this._lastLayoutStageSize) {
			return true;
		}

		let stageSize = this.stage.size();
		return (
			stageSize.width !== this._lastLayoutStageSize.width ||
			stageSize.height !== this._lastLayoutStageSize.height
		);
	}

	updateLayout() {

		if (!this.stage) {
			return;
		}

		this._verticalRlTerminalContinuationOffsets = [];
		this._verticalRlNominalTerminalOffset = null;
		this._verticalRlLogicalPageOffsetCache = null;
		this._verticalRlAppliedLeftMaskLedger = null;
		this._verticalRlAppliedLeftMaskLedgerKey = null;
		this._verticalRlPageIndexLookupKey = null;
		this._verticalRlPageIndexLookupOffset = null;
		this._verticalRlPageIndexLookupResult = null;
		this._verticalRlTerminalCoverageProjectionKey = null;
		this._verticalRlTerminalCoverageProjectionResult = null;
		this._verticalRlLogicalPageScrollInProgress = false;

		this._stageSize = this.stage.size();
		this._lastLayoutStageSize = {
			width: this._stageSize.width,
			height: this._stageSize.height
		};
		this._layoutDirty = false;

		if(!this.isPaginated) {
			this.layout.calculate(this._stageSize.width, this._stageSize.height);
		} else {
			this.layout.calculate(
				this._stageSize.width,
				this._stageSize.height,
				this.settings.gap
			);

			// Set the look ahead offset for what is visible
			this.settings.offset = this.getPageAdvance() / this.layout.divisor;

			// this.stage.addStyleRules("iframe", [{"margin-right" : this.layout.gap + "px"}]);

		}

		// Set the dimensions for views
		this.viewSettings.width = this.layout.width;
		this.viewSettings.height = this.layout.height;

		this.setLayout(this.layout);
		this.syncVerticalRlViewportClip();
	}

	setLayout(layout: Layout): void {

		this.viewSettings.layout = layout;

		this.mapping = new Mapping(layout.props, this.settings.direction, this.settings.axis);

		if(this.views) {

			this.views.forEach(function(view: ManagerView){
				if (view) {
					view.setLayout(layout);
				}
			});

		}

	}

	updateWritingMode(mode: string): void {
		this.writingMode = mode;
	}

	updateAxis(axis: string, forceUpdate?: boolean): void {

		if (!forceUpdate && axis === this.settings.axis) {
			return;
		}

		this.settings.axis = axis;
		this._layoutDirty = true;

		this.stage && this.stage.axis(axis);

		this.viewSettings.axis = axis;

		if (this.mapping) {
			this.mapping = new Mapping(this.layout.props, this.settings.direction, this.settings.axis);
		}

		if (this.layout) {
			if (axis === "vertical") {
				this.layout.spread("none");
			} else {
				this.layout.spread(this.layout.settings.spread);
			}
		}
	}

	updateFlow(flow: string, defaultScrolledOverflow = "auto"): void {
		let isPaginated = (flow === "paginated" || flow === "auto");

		this.isPaginated = isPaginated;
		this._layoutDirty = true;

		if (flow === "scrolled-doc" ||
				flow === "scrolled-continuous" ||
				flow === "scrolled") {
			this.updateAxis("vertical");
		} else {
			this.updateAxis("horizontal");
		}

		this.viewSettings.flow = flow;

		if (!this.settings.overflow) {
			this.overflow = isPaginated ? "hidden" : defaultScrolledOverflow;
		} else {
			this.overflow = this.settings.overflow;
		}

		this.stage && this.stage.overflow(this.overflow);

		this.updateLayout();

	}

	getContents(): Contents[] {
		var contents: Contents[] = [];
		if (!this.views) {
			return contents;
		}
		this.views.forEach(function(view: ManagerView | undefined){
			const viewContents = view && view.contents;
			if (viewContents) {
				contents.push(viewContents);
			}
		});
		return contents;
	}

	direction(dir="ltr") {
		this.settings.direction = dir;

		this.stage && this.stage.direction(dir);

		this.viewSettings.direction = dir;

		this.updateLayout();
	}

	isRendered() {
		return this.rendered;
	}
}

//-- Enable binding events to Manager
EventEmitter(DefaultViewManager.prototype);

export default DefaultViewManager;

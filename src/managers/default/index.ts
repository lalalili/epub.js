import EventEmitter from "event-emitter";
import { defer, type Deferred as CoreDeferred } from "../../core/async";
import { extend } from "../../core/collections";
import { isNumber } from "../../core/types";
import { windowBounds } from "../../platform/layout";
import { collectVisibleTextClientRects } from "../../platform/traversal";
import scrollType from "../../utils/scrolltype";
import Mapping from "../../mapping";
import Queue from "../../utils/queue";
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
	runVerticalRlEdgeMaskSnapLoop as runVerticalRlEdgeMaskSnapLoopHelper
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
	_contentWidth?: number;
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

class DefaultViewManager {
	[key: string]: any;
	declare orientationTimeout?: ReturnType<typeof setTimeout>;
	declare resizeTimeout?: ReturnType<typeof setTimeout>;
	declare afterScrolled?: ReturnType<typeof setTimeout>;
	declare _verticalRlBoundarySnapAfterScroll?: ReturnType<typeof setTimeout>;
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
	declare name: string;
	declare optsSettings: ManagerSettings;
	declare settings: ManagerSettings;
	declare View: ManagerViewConstructor;
	declare request: unknown;
	declare renditionQueue: unknown;
	declare q: Queue;
	declare stage: Stage;
	declare container: HTMLDivElement;
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
		this.views = new Views(this.container);

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
			// Size is the same, no need to resize
			return;
		}

		this._stageSize = stageSize;

		this._bounds = this.bounds();

		// Clear current views
		this.clear();

		// Update for new views
		this.viewSettings.width = this._stageSize.width;
		this.viewSettings.height = this._stageSize.height;

		this.updateLayout();

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

		for (let i = 0; i < totalPages; i++) {
			let logicalOffset = this.getLogicalOffsetForPageIndex(i, totalPages, maxLogicalScroll);
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

	getVerticalRlEdgeMaskWidths(){
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
			let currentOffset = this.getLogicalOffsetForPageIndex(currentPageIndex, totalPages, maxScroll);
			let previousOffset = this.getLogicalOffsetForPageIndex(currentPageIndex - 1, totalPages, maxScroll);
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
		let currentOffset = this.getLogicalOffsetForPageIndex(currentPageIndex, totalPages, maxScroll);
		let previousOffset = this.getLogicalOffsetForPageIndex(currentPageIndex - 1, totalPages, maxScroll);
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
		if (!maskWidths || !maskWidths.left || !this.container || !this.views) {
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

			if (rectLeft < rawLeft && rectRight > rawLeft) {
				left = Math.max(left, Math.ceil(rectRight - rawLeft + 1));
			}
		}

		return {
			left: Math.min(left, maxMask),
			right: maskWidths.right
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
		let currentOffset = this.getLogicalOffsetForPageIndex(currentPageIndex, totalPages, maxScroll);
		let nextOffset = this.getLogicalOffsetForPageIndex(nextPageIndex, totalPages, maxScroll);

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

	syncVerticalRlViewportClip(){
		if (!this.container || !this.container.style) {
			return;
		}

		let maskWidths = this.expandVerticalRlLeftMaskToVisibleLine(
			this.getVerticalRlEdgeMaskWidths()
		);
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

	getVerticalRlViewportClipOverlay(){
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

	removeVerticalRlViewportClip(){
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

	getTotalPagesForCurrentView(){
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

	getCurrentPageIndex(){
		let advance = this.getPageAdvance();
		if (!advance || advance <= 0 || !this.container) {
			return 0;
		}

		let totalPages = this.getTotalPagesForCurrentView();
		let normalized = this.getNormalizedLogicalScrollLeft();
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
		this.syncVerticalRlViewportClip();
		let advance = this.getPageAdvance();
		let totalPages = this.getTotalPagesForCurrentView();
		let targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
		let maxScroll = this.getMaxLogicalScrollLeft();
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
			: this.getLogicalOffsetForPageIndex(targetIndex, totalPages, maxScroll);
		if (cachedLogicalOffset === null || sequentialBoundaryConstraint) {
			if (
				this.isRtlVerticalPaginated() &&
				targetIndex > 0 &&
				(targetIndex < totalPages - 1 || sequentialBoundaryConstraint)
			) {
				logicalOffset = this.snapVerticalRlLogicalOffsetToTextBoundary(logicalOffset, maxScroll, sequentialBoundaryConstraint || {});
			}
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
		this.queueVerticalRlBoundarySnapRetry(targetIndex);
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

		if (targetIndex <= 0 || targetIndex >= totalPages - 1) {
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
						: this.getLogicalOffsetForPageIndex(targetIndex, currentTotalPages, maxScroll);
				let shouldSnapCurrentOffsetToPageGrid = (
					options.useCurrentOffset &&
					this.getPageBoundaryShift() === 0 &&
					this.container
				);
				if (shouldSnapCurrentOffsetToPageGrid) {
					let currentIndex = this.getCurrentPageIndex();
					let pageOffset = this.getLogicalOffsetForPageIndex(currentIndex, currentTotalPages, maxScroll);
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
				let snappedOffset = shouldUseCachedLogicalOffset
					? logicalOffset
					: this.snapVerticalRlLogicalOffsetToTextBoundary(logicalOffset, maxScroll, sequentialBoundaryConstraint);

				if (!shouldUseCachedLogicalOffset && Math.abs(snappedOffset - logicalOffset) <= 1) {
					snappedOffset = this.snapVerticalRlLogicalOffsetFromEdgeMask(logicalOffset, maxScroll);
				}

				if (Math.abs(snappedOffset - logicalOffset) <= 1) {
					snappedOffset = logicalOffset;
				}

				if (Math.abs(snappedOffset - currentOffset) <= 1) {
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
					if (this.isRtlVerticalPaginated()) {
						this.scrollToLogicalPage(this.getTotalPagesForCurrentView() - 1);
					} else if (this.settings.direction === "rtl") {
						if (this.settings.rtlScrollType === "default"){
							this.scrollTo(0, 0, true);
						}
						else{
							this.scrollTo((this.container.scrollWidth * -1) + pageAdvance, 0, true);
						}
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

			if (pageIndex < totalPages - 1) {
				this.scrollToLogicalPage(pageIndex + 1, {
					sequentialRightBoundary: this.getVerticalRlCurrentEffectiveLeftBoundary()
				});
				return;
			} else {
				next = this.views.last().section.next();
			}
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
			let pageAdvance = this.getPageAdvance();

			this.scrollLeft = this.container.scrollLeft;

			if (this.settings.rtlScrollType === "default"){
				left = this.container.scrollLeft;

				if (left > 0) {
					this.scrollBy(pageAdvance, 0, true);
				} else {
					next = this.views.last().section.next();
				}
			} else {
				left = this.container.scrollLeft + ( pageAdvance * -1 );

				if (left > this.container.scrollWidth * -1){
					this.scrollBy(pageAdvance, 0, true);
				} else {
					next = this.views.last().section.next();
				}
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
				let visiblePageWidth = this.layout.pageWidth || this.layout.width || pageAdvance;
				let contentWidth = width;
				let maxPhysicalStart = Math.max(0, contentWidth - visiblePageWidth);
				let physicalStart = Math.max(
					0,
					Math.min(maxPhysicalStart, maxPhysicalStart - (currentPageIndex * pageAdvance))
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
		this.scrolled = true;
	}

	scrollTo(x: number, y: number, silent?: boolean): void {
		if(silent) {
			this.ignore = true;
		}

		if(!this.settings.fullsize) {
			this.container.scrollLeft = x;
			this.container.scrollTop = y;
		} else {
			window.scrollTo(x,y);
		}
		this.scrolled = true;

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

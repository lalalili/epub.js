import { defer, type Deferred as CoreDeferred } from "../../core/async";
import { extend } from "../../core/collections";
import { requestAnimationFrame } from "../../platform/browser";
import DefaultViewManager, { type ManagerSettings, type ManagerViewConstructor } from "../default";
import Snap, { type ManagerLike as SnapManagerLike } from "../helpers/snap";
import { EVENTS } from "../../utils/constants";
import debounce from "lodash/debounce";

type ContinuousManagerOptions = {
	settings: ManagerSettings;
	view: ManagerViewConstructor;
	request: unknown;
	queue: unknown;
};

type ScrollPosition = {
	top: number;
	left: number;
};

type ViewBounds = {
	width?: number;
	height?: number;
	widthDelta?: number;
	heightDelta?: number;
};

type ContinuousSection = {
	prev(): unknown;
	next(): unknown;
};

type VisibilityElement = {
	style: {
		visibility?: string;
	};
};

type ContinuousView = {
	[key: string]: unknown;
	section: ContinuousSection;
	displayed?: boolean;
	expanded?: boolean;
	element?: VisibilityElement;
	iframe?: VisibilityElement;
	onDisplayed?: Function;
	onResize?: Function;
	on(type: string, callback: Function): void;
	display(request: unknown): Promise<unknown>;
	show(): void;
	hide(): void;
	bounds(): ViewBounds;
};

const Defer = defer as unknown as {
	new<T = unknown>(): CoreDeferred<T>;
};

class ContinuousViewManager extends DefaultViewManager {
	declare trimTimeout?: ReturnType<typeof setTimeout>;
	declare scrollTimeout?: ReturnType<typeof setTimeout>;
	declare snapper?: Snap;
	declare tick: typeof requestAnimationFrame;
	declare _scrolled: () => void;
	declare scrollDeltaVert: number;
	declare scrollDeltaHorz: number;
	declare prevScrollTop: number;
	declare prevScrollLeft: number;
	declare didScroll: boolean;
	declare scrolledRequestId?: number;

	constructor(options: ContinuousManagerOptions) {
		super(options);

		this.name = "continuous";

		this.settings = extend(this.settings || {}, {
			infinite: true,
			overflow: undefined,
			axis: undefined,
			writingMode: undefined,
			flow: "scrolled",
			offset: 500,
			offsetDelta: 250,
			width: undefined,
			height: undefined,
			snap: false,
			afterScrolledTimeout: 10,
			allowScriptedContent: false,
			allowPopups: false
		});

		extend(this.settings, options.settings || {});

		// Gap can be 0, but defaults doesn't handle that
		if (typeof options.settings.gap !== "undefined" && options.settings.gap === 0) {
			this.settings.gap = options.settings.gap;
		}

		this.viewSettings = {
			ignoreClass: this.settings.ignoreClass,
			axis: this.settings.axis,
			flow: this.settings.flow,
			layout: this.layout,
			width: 0,
			height: 0,
			forceEvenPages: false,
			allowScriptedContent: this.settings.allowScriptedContent,
			allowPopups: this.settings.allowPopups
		};

		this.scrollTop = 0;
		this.scrollLeft = 0;
	}

	getScrollPosition() {
		let dir = this.settings.direction === "rtl" && this.settings.rtlScrollType === "default" ? -1 : 1;

		if(!this.settings.fullsize) {
			return {
				top: this.container.scrollTop,
				left: this.container.scrollLeft
			};
		}

		return {
			top: window.scrollY * dir,
			left: window.scrollX * dir
		};
	}

	syncScrollPosition() {
		let {top, left} = this.getScrollPosition();
		this.scrollTop = top;
		this.scrollLeft = left;
		return {top, left};
	}

	display(section: unknown, target?: string | number){
		return DefaultViewManager.prototype.display.call(this, section, target)
			.then(function () {
				return this.fill();
			}.bind(this));
	}

	fill(_full?: CoreDeferred<void>){
		var full = _full || new Defer<void>();

		this.q.enqueue(() => {
			return this.check();
		}).then((result: boolean) => {
			if (result) {
				this.fill(full);
			} else {
				full.resolve();
			}
		});

		return full.promise;
	}

	moveTo(offset: ScrollPosition){
		// var bounds = this.stage.bounds();
		// var dist = Math.floor(offset.top / bounds.height) * bounds.height;
		var distX = 0,
				distY = 0;

		if(!this.isPaginated) {
			distY = offset.top;
		} else {
			distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;
		}

		if (distX > 0 || distY > 0) {
			this.scrollBy(distX, distY, true);
		}
	}

	afterResized(view: ContinuousView){
		this.emit(EVENTS.MANAGERS.RESIZE, view.section);
	}

	// Remove Previous Listeners if present
	removeShownListeners(view: ContinuousView){

		// view.off("shown", this.afterDisplayed);
		// view.off("shown", this.afterDisplayedAbove);
		view.onDisplayed = function(){};

	}

	add(section: unknown){
		var view = this.createView(section, undefined);

		this.views.append(view);

		view.on(EVENTS.VIEWS.RESIZED, (bounds: ViewBounds) => {
			view.expanded = true;
		});

		view.on(EVENTS.VIEWS.AXIS, (axis: string) => {
			this.updateAxis(axis, undefined);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode: string) => {
			this.updateWritingMode(mode);
		});

		// view.on(EVENTS.VIEWS.SHOWN, this.afterDisplayed.bind(this));
		view.onDisplayed = this.afterDisplayed.bind(this);
		view.onResize = this.afterResized.bind(this);

		return view.display(this.request);
	}

	append(section: unknown){
		var view = this.createView(section, undefined);

		view.on(EVENTS.VIEWS.RESIZED, (bounds: ViewBounds) => {
			view.expanded = true;
		});

		view.on(EVENTS.VIEWS.AXIS, (axis: string) => {
			this.updateAxis(axis, undefined);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode: string) => {
			this.updateWritingMode(mode);
		});

		this.views.append(view);

		view.onDisplayed = this.afterDisplayed.bind(this);

		return view;
	}

	prepend(section: unknown){
		var view = this.createView(section, undefined);

		view.on(EVENTS.VIEWS.RESIZED, (bounds: ViewBounds) => {
			this.counter(bounds);
			view.expanded = true;
		});

		view.on(EVENTS.VIEWS.AXIS, (axis: string) => {
			this.updateAxis(axis, undefined);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode: string) => {
			this.updateWritingMode(mode);
		});

		this.views.prepend(view);

		view.onDisplayed = this.afterDisplayed.bind(this);

		return view;
	}

	counter(bounds: ViewBounds){
		if(this.settings.axis === "vertical") {
			this.scrollBy(0, bounds.heightDelta || 0, true);
		} else {
			this.scrollBy(bounds.widthDelta || 0, 0, true);
		}
	}

	update(_offset?: number){
		var container = this.bounds();
		var views = this.views.all();
		var viewsLength = views.length;
		var visible: ContinuousView[] = [];
		var offset = typeof _offset != "undefined" ? _offset : (this.settings.offset || 0);
		var isVisible;
		var view: ContinuousView;

		var updating = new Defer<void>();
		var promises: Promise<unknown>[] = [];
		for (var i = 0; i < viewsLength; i++) {
			view = views[i];

			isVisible = this.isVisible(view, offset, offset, container);

			if(isVisible === true) {
				// console.log("visible " + view.index, view.displayed);

				if (!view.displayed) {
					let displayed = view.display(this.request)
						.then(function (view: ContinuousView) {
							view.show();
						}, (err: unknown) => {
							view.hide();
						});
					promises.push(displayed);
				} else {
					// Avoid forcing iframe redraw on every scroll tick.
					// IframeView.show() toggles translateZ for Safari repaint; repeated calls can flicker.
					if (
						(view.element && view.element.style.visibility !== "visible") ||
						(view.iframe && view.iframe.style.visibility !== "visible")
					) {
						view.show();
					}
				}
				visible.push(view);
			} else {
				// Keep offscreen views hidden during active scroll to avoid
				// frequent iframe teardown / rebuild flicker around section edges.
				if (
					view.displayed &&
					(view.element && view.element.style.visibility !== "hidden")
				) {
					view.hide();
				}

				this.scheduleTrim(350);
			}

		}

		if(promises.length){
			return Promise.all(promises)
				.catch((err) => {
					updating.reject(err);
				});
		} else {
			updating.resolve();
			return updating.promise;
		}

	}

	scheduleTrim(delay = 250) {
		clearTimeout(this.trimTimeout);
		this.trimTimeout = setTimeout(function(){
			// Avoid trimming while momentum scroll is still active.
			if ((this.scrollDeltaVert || 0) > 2 || (this.scrollDeltaHorz || 0) > 2) {
				this.scheduleTrim(120);
				return;
			}
			this.q.enqueue(this.trim.bind(this));
		}.bind(this), delay);
	}

	check(_offsetLeft?: number, _offsetTop?: number): Promise<unknown> {
		var checking = new Defer<boolean>();
		var newViews: ContinuousView[] = [];

		var horizontal = (this.settings.axis === "horizontal");
		var delta = this.settings.offset || 0;

		if (_offsetLeft && horizontal) {
			delta = _offsetLeft;
		}

		if (_offsetTop && !horizontal) {
			delta = _offsetTop;
		}

		var bounds = this._bounds; // bounds saved this until resize

		let {top, left} = this.syncScrollPosition();
		let offset = horizontal ? left : top;
		let visibleLength = horizontal ? Math.floor(bounds.width) : bounds.height;
		let contentLength = horizontal ? this.container.scrollWidth : this.container.scrollHeight;
		let writingMode = (this.writingMode && this.writingMode.indexOf("vertical") === 0) ? "vertical" : "horizontal";
		let rtlScrollType = this.settings.rtlScrollType;
		let rtl = this.settings.direction === "rtl";

		if (!this.settings.fullsize) {
			// Scroll offset starts at width of element
			if (rtl && rtlScrollType === "default" && writingMode === "horizontal") {
				offset = contentLength - visibleLength - offset;
			}
			// Scroll offset starts at 0 and goes negative
			if (rtl && rtlScrollType === "negative" && writingMode === "horizontal") {
				offset = offset * -1;
			}
		} else {
			// Scroll offset starts at 0 and goes negative
			if ((horizontal && rtl && rtlScrollType === "negative") ||
				(!horizontal && rtl && rtlScrollType === "default")) {
				offset = offset * -1;
			}
		}

		let prepend = () => {
			let first = this.views.first();
			let prev = first && first.section.prev();

			if(prev) {
				newViews.push(this.prepend(prev));
			}
		};

		let append = () => {
			let last = this.views.last();
			let next = last && last.section.next();

			if(next) {
				newViews.push(this.append(next));
			}

		};

		let end = offset + visibleLength + delta;
		let start = offset - delta;

		if (end >= contentLength) {
			append();
		}
		
		if (start < 0) {
			prepend();
		}
		

		let promises = newViews.map((view) => {
			return view.display(this.request);
		});

		if(newViews.length){
			return Promise.all(promises)
				.then((): Promise<unknown> => {
					return this.check();
				})
				.then(() => {
					// Check to see if anything new is on screen after rendering
					return this.update(delta);
				}, (err: unknown) => {
					return err;
				});
		} else {
			this.q.enqueue(function(){
				this.update();
			}.bind(this));
			checking.resolve(false);
			return checking.promise;
		}


	}

	trim(){
		var task = new Defer<void>();
		var displayed = this.views.displayed();
		var first = displayed[0];
		var last = displayed[displayed.length-1];
		var firstIndex = this.views.indexOf(first);
		var lastIndex = this.views.indexOf(last);
		var above = this.views.slice(0, firstIndex);
		var below = this.views.slice(lastIndex+1);

		// Erase all but last above
		for (var i = 0; i < above.length-1; i++) {
			this.erase(above[i], above);
		}

		// Erase all except first below
		for (var j = 1; j < below.length; j++) {
			this.erase(below[j]);
		}

		task.resolve();
		return task.promise;
	}

	erase(view: ContinuousView, above?: ContinuousView[]){ //Trim

		var prevTop;
		var prevLeft;

		if(!this.settings.fullsize) {
			prevTop = this.container.scrollTop;
			prevLeft = this.container.scrollLeft;
		} else {
			prevTop = window.scrollY;
			prevLeft = window.scrollX;
		}

		var bounds = view.bounds();

		this.views.remove(view);
		
		if(above) {
			if (this.settings.axis === "vertical") {
				this.scrollTo(0, prevTop - bounds.height, true);
			} else {
				if(this.settings.direction === "rtl") {
					if (!this.settings.fullsize) {
						this.scrollTo(prevLeft, 0, true);
					} else {
						this.scrollTo(prevLeft + Math.floor(bounds.width), 0, true);
					}
				} else {
					this.scrollTo(prevLeft - Math.floor(bounds.width), 0, true);
				}
			}
		}

	}

	addEventListeners(stage?: unknown){

		this._onUnload = function(e: Event){
			this.ignore = true;
			// this.scrollTo(0,0);
			this.destroy();
		}.bind(this);

		window.addEventListener("unload", this._onUnload);

		this.addScrollListeners();

		if (this.isPaginated && this.settings.snap) {
				this.snapper = new Snap(this as unknown as SnapManagerLike, this.settings.snap && (typeof this.settings.snap === "object") && this.settings.snap);
		}
	}

	addScrollListeners() {
		var scroller;

		this.tick = requestAnimationFrame;

		this.scrollDeltaVert = 0;
		this.scrollDeltaHorz = 0;

		if(!this.settings.fullsize) {
			scroller = this.container;
		} else {
			scroller = window;
		}

		let {top, left} = this.syncScrollPosition();
		this.prevScrollTop = top;
		this.prevScrollLeft = left;

		this._onScroll = this.onScroll.bind(this);
		scroller.addEventListener("scroll", this._onScroll);
		this._scrolled = debounce(this.scrolled.bind(this), 30);
		// this.tick.call(window, this.onScroll.bind(this));

		this.didScroll = false;

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

	onScroll(){
		let {top: scrollTop, left: scrollLeft} = this.syncScrollPosition();

		if(!this.ignore) {

			this._scrolled();

		} else {
			this.ignore = false;
		}

		this.scrollDeltaVert += Math.abs(scrollTop-this.prevScrollTop);
		this.scrollDeltaHorz += Math.abs(scrollLeft-this.prevScrollLeft);

		this.prevScrollTop = scrollTop;
		this.prevScrollLeft = scrollLeft;

		clearTimeout(this.scrollTimeout);
		this.scrollTimeout = setTimeout(function(){
			this.scrollDeltaVert = 0;
			this.scrollDeltaHorz = 0;
		}.bind(this), 150);

		clearTimeout(this.afterScrolled);

		this.didScroll = false;

	}

	scrolled() {
		let scrolledTask = this.q.enqueue(function() {
			return this.check();
		}.bind(this));

		this.scrolledRequestId = (this.scrolledRequestId || 0) + 1;
		let requestId = this.scrolledRequestId;

		this.emit(EVENTS.MANAGERS.SCROLL, {
			top: this.scrollTop,
			left: this.scrollLeft
		});

		clearTimeout(this.afterScrolled);
		this.afterScrolled = setTimeout(function () {
			Promise.resolve(scrolledTask)
				.catch(function () {})
				.then(function() {
					// Skip stale timers when newer scroll events are already queued.
					if (requestId !== this.scrolledRequestId) {
						return;
					}

					// Don't report scroll if we are about the snap
					if (this.snapper && this.snapper.supportsTouch && this.snapper.needsSnap()) {
						return;
					}

					this.emit(EVENTS.MANAGERS.SCROLLED, {
						top: this.scrollTop,
						left: this.scrollLeft
					});
				}.bind(this));

		}.bind(this), this.settings.afterScrolledTimeout);
	}

	next(){

		let delta = this.layout.props.name === "pre-paginated" &&
								this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;

		if(!this.views.length) return;

		if(this.isPaginated && this.settings.axis === "horizontal") {

			this.scrollBy(delta, 0, true);

		} else {

			this.scrollBy(0, this.layout.height, true);

		}

		this.q.enqueue(function() {
			return this.check();
		}.bind(this));
	}

	prev(){

		let delta = this.layout.props.name === "pre-paginated" &&
								this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;

		if(!this.views.length) return;

		if(this.isPaginated && this.settings.axis === "horizontal") {

			this.scrollBy(-delta, 0, true);

		} else {

			this.scrollBy(0, -this.layout.height, true);

		}

		this.q.enqueue(function() {
			return this.check();
		}.bind(this));
	}

	updateFlow(flow: string){
		if (this.rendered && this.snapper) {
			this.snapper.destroy();
			this.snapper = undefined;
		}

		super.updateFlow(flow, "scroll");

		if (this.rendered && this.isPaginated && this.settings.snap) {
			this.snapper = new Snap(this as unknown as SnapManagerLike, this.settings.snap && (typeof this.settings.snap === "object") && this.settings.snap);
		}
	}

	destroy(){
		clearTimeout(this.trimTimeout);
		clearTimeout(this.scrollTimeout);
		super.destroy();

		if (this.snapper) {
			this.snapper.destroy();
		}
	}

}

export default ContinuousViewManager;

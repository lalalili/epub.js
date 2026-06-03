import { defer } from "../../core/async";
import { extend } from "../../core/collections";
import { EVENTS } from "../../utils/constants";
import EventEmitter from "event-emitter";

type EasingFunction = (position: number) => number;

type SnapSettings = {
	duration: number;
	minVelocity: number;
	minDistance: number;
	easing: EasingFunction;
};

type SnapOptions = Partial<SnapSettings>;

type DeferredLike<T = any> = {
	promise: Promise<T>;
	resolve(value?: T | PromiseLike<T>): void;
};

const Defer = defer as unknown as { new<T = any>(): DeferredLike<T>; };

type LayoutLike = {
	width: number;
	pageWidth: number;
	divisor: number;
};

type TouchPointLike = {
	screenX: number;
	screenY: number;
};

type TouchEventLike = {
	touches: TouchPointLike[];
	type?: string;
};

type ContentsLike = {
	on(type: string, callback: (event: Event) => void): void;
};

type ViewLike = {
	contents: ContentsLike;
};

type ManagerLike = {
	isPaginated: boolean;
	layout: LayoutLike;
	settings: {
		afterScrolledTimeout?: number;
		axis?: string;
		fullsize?: boolean;
		offset?: number;
	};
	stage: {
		container: HTMLElement;
		element: HTMLElement;
	};
		off(type: string, listener?: (view: ViewLike) => void): void;
		on(type: string, listener?: (view: ViewLike) => void): void;
	};

type SnapScroller = (Window & {
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): void;
}) | HTMLElement;

type EventedSnap = Snap & {
	emit(type: string, ...args: any[]): void;
	off(type: string, listener: (...args: any[]) => void): void;
	on(type: string, listener: (...args: any[]) => void): void;
};

// easing equations from https://github.com/danro/easing-js/blob/master/easing.js
const PI_D2 = (Math.PI / 2);
const EASING_EQUATIONS: Record<string, EasingFunction> = {
	easeOutSine: function (pos) {
		return Math.sin(pos * PI_D2);
	},
	easeInOutSine: function (pos) {
		return (-0.5 * (Math.cos(Math.PI * pos) - 1));
	},
	easeInOutQuint: function (pos) {
		if ((pos /= 0.5) < 1) {
			return 0.5 * Math.pow(pos, 5);
		}
		return 0.5 * (Math.pow((pos - 2), 5) + 2);
	},
	easeInCubic: function(pos) {
		return Math.pow(pos, 3);
	}
};

class Snap {
	settings: SnapSettings;
	supportsTouch: boolean;
	manager: ManagerLike | undefined;
	layout: LayoutLike | undefined;
	fullsize: boolean | undefined;
	element: HTMLElement | undefined;
	scroller: SnapScroller | undefined;
	isVertical: boolean | undefined;
	touchCanceler: boolean | undefined;
	resizeCanceler: boolean | undefined;
	snapping: boolean | undefined;
	scrollLeft: number | undefined;
	scrollTop: number | undefined;
	startTouchX: number | undefined;
	startTouchY: number | undefined;
	startTime: number | undefined;
	endTouchX: number | undefined;
	endTouchY: number | undefined;
	endTime: number | undefined;
	_onResize: ((event: Event) => void) | undefined;
	_onScroll: ((event: Event) => void) | undefined;
	_onTouchStart: ((event: TouchEventLike) => void) | undefined;
	_onTouchMove: ((event: TouchEventLike) => void) | undefined;
	_onTouchEnd: ((event: Event) => void) | undefined;
	_afterDisplayed: ((view: ViewLike) => void) | undefined;

	constructor(manager: ManagerLike, options?: SnapOptions) {

		this.settings = (extend as any)({
			duration: 80,
			minVelocity: 0.2,
			minDistance: 10,
			easing: EASING_EQUATIONS["easeInCubic"]
		}, options || {}) as SnapSettings;

		this.supportsTouch = this.detectSupportsTouch();

		if (this.supportsTouch) {
			this.setup(manager);
		}
	}

	setup(manager: ManagerLike): void {
		this.manager = manager;

		this.layout = this.manager.layout;

		this.fullsize = this.manager.settings.fullsize;
		if (this.fullsize) {
			this.element = this.manager.stage.element;
			this.scroller = window;
			this.disableScroll();
		} else {
			this.element = this.manager.stage.container;
			this.scroller = this.element;
			(this.element.style as any)["WebkitOverflowScrolling"] = "touch";
		}

		// this.overflow = this.manager.overflow;

		// set lookahead offset to page width
		this.manager.settings.offset = this.layout.width;
		this.manager.settings.afterScrolledTimeout = this.settings.duration * 2;

		this.isVertical = this.manager.settings.axis === "vertical";

		// disable snapping if not paginated or axis in not horizontal
		if (!this.manager.isPaginated || this.isVertical) {
			return;
		}

		this.touchCanceler = false;
		this.resizeCanceler = false;
		this.snapping = false;


		this.scrollLeft;
		this.scrollTop;

		this.startTouchX = undefined;
		this.startTouchY = undefined;
		this.startTime = undefined;
		this.endTouchX = undefined;
		this.endTouchY = undefined;
		this.endTime = undefined;

		this.addListeners();
	}

	detectSupportsTouch(): boolean {
		if (("ontouchstart" in window) || (window as any).DocumentTouch && document instanceof (window as any).DocumentTouch) {
			return true;
		}

		return false;
	}

	disableScroll(): void {
		this.element.style.overflow = "hidden";
	}

	enableScroll(): void {
		this.element.style.overflow = "";
	}

	addListeners(): void {
		this._onResize = this.onResize.bind(this);
		window.addEventListener("resize", this._onResize);

		this._onScroll = this.onScroll.bind(this);
		this.scroller.addEventListener("scroll", this._onScroll);

		this._onTouchStart = this.onTouchStart.bind(this);
		this.scroller.addEventListener("touchstart", this._onTouchStart as unknown as EventListener, { passive: true });
		(this as unknown as EventedSnap).on("touchstart", this._onTouchStart);

		this._onTouchMove = this.onTouchMove.bind(this);
		this.scroller.addEventListener("touchmove", this._onTouchMove as unknown as EventListener, { passive: true });
		(this as unknown as EventedSnap).on("touchmove", this._onTouchMove);

		this._onTouchEnd = this.onTouchEnd.bind(this);
		this.scroller.addEventListener("touchend", this._onTouchEnd, { passive: true });
		(this as unknown as EventedSnap).on("touchend", this._onTouchEnd);

		this._afterDisplayed = this.afterDisplayed.bind(this);
		this.manager.on(EVENTS.MANAGERS.ADDED, this._afterDisplayed);
	}

	removeListeners(): void {
		window.removeEventListener("resize", this._onResize);
		this._onResize = undefined;

		this.scroller.removeEventListener("scroll", this._onScroll);
		this._onScroll = undefined;

		this.scroller.removeEventListener("touchstart", this._onTouchStart as unknown as EventListener, { passive: true });
		(this as unknown as EventedSnap).off("touchstart", this._onTouchStart);
		this._onTouchStart = undefined;

		this.scroller.removeEventListener("touchmove", this._onTouchMove as unknown as EventListener, { passive: true });
		(this as unknown as EventedSnap).off("touchmove", this._onTouchMove);
		this._onTouchMove = undefined;

		this.scroller.removeEventListener("touchend", this._onTouchEnd, { passive: true });
		(this as unknown as EventedSnap).off("touchend", this._onTouchEnd);
		this._onTouchEnd = undefined;

		this.manager.off(EVENTS.MANAGERS.ADDED, this._afterDisplayed);
		this._afterDisplayed = undefined;
	}

	afterDisplayed(view: ViewLike): void {
		let contents = view.contents;
		["touchstart", "touchmove", "touchend"].forEach((e) => {
			contents.on(e, (ev) => this.triggerViewEvent(ev, contents));
		});
	}

	triggerViewEvent(e: Event, contents: ContentsLike): void {
		(this as unknown as EventedSnap).emit(e.type, e, contents);
	}

	onScroll(e: Event): void {
		this.scrollLeft = this.fullsize ? window.scrollX : (this.scroller as HTMLElement).scrollLeft;
		this.scrollTop = this.fullsize ? window.scrollY : (this.scroller as HTMLElement).scrollTop;
	}

	onResize(e: Event): void {
		this.resizeCanceler = true;
	}

	onTouchStart(e: TouchEventLike): void {
		let { screenX, screenY } = e.touches[0];

		if (this.fullsize) {
			this.enableScroll();
		}

		this.touchCanceler = true;

		if (!this.startTouchX) {
			this.startTouchX = screenX;
			this.startTouchY = screenY;
			this.startTime = this.now();
		}

		this.endTouchX = screenX;
		this.endTouchY = screenY;
		this.endTime = this.now();
	}

	onTouchMove(e: TouchEventLike): void {
		let { screenX, screenY } = e.touches[0];
		let deltaY = Math.abs(screenY - this.endTouchY);

		this.touchCanceler = true;


		if (!this.fullsize && deltaY < 10) {
			this.element.scrollLeft -= screenX - this.endTouchX;
		}

		this.endTouchX = screenX;
		this.endTouchY = screenY;
		this.endTime = this.now();
	}

	onTouchEnd(e: Event): void {
		if (this.fullsize) {
			this.disableScroll();
		}

		this.touchCanceler = false;

		let swipped = this.wasSwiped();

		if (swipped !== 0) {
			this.snap(swipped);
		} else {
			this.snap();
		}

		this.startTouchX = undefined;
		this.startTouchY = undefined;
		this.startTime = undefined;
		this.endTouchX = undefined;
		this.endTouchY = undefined;
		this.endTime = undefined;
	}

	wasSwiped(): number | undefined {
		let snapWidth = this.layout.pageWidth * this.layout.divisor;
		let distance = (this.endTouchX - this.startTouchX);
		let absolute = Math.abs(distance);
		let time = this.endTime - this.startTime;
		let velocity = (distance / time);
		let minVelocity = this.settings.minVelocity;

		if (absolute <= this.settings.minDistance || absolute >= snapWidth) {
			return 0;
		}

		if (velocity > minVelocity) {
			// previous
			return -1;
		} else if (velocity < -minVelocity) {
			// next
			return 1;
		}
	}

	needsSnap(): boolean {
		let left = this.scrollLeft;
		let snapWidth = this.layout.pageWidth * this.layout.divisor;
		return (left % snapWidth) !== 0;
	}

	snap(howMany=0): Promise<any> {
		let left = this.scrollLeft;
		let snapWidth = this.layout.pageWidth * this.layout.divisor;
		let snapTo = Math.round(left / snapWidth) * snapWidth;

		if (howMany) {
			snapTo += (howMany * snapWidth);
		}

		return this.smoothScrollTo(snapTo);
	}

	smoothScrollTo(destination: number): Promise<any> {
		const deferred = new Defer();
		const start = this.scrollLeft;
		const startTime = this.now();

		const duration = this.settings.duration;

		this.snapping = true;

		// add animation loop
		function tick(this: Snap) {
			const now = this.now();
			const time = Math.min(1, ((now - startTime) / duration));


			if (this.touchCanceler || this.resizeCanceler) {
				this.resizeCanceler = false;
				this.snapping = false;
				deferred.resolve();
				return;
			}

			if (time < 1) {
				window.requestAnimationFrame(tick.bind(this));
				this.scrollTo(start + ((destination - start) * time), 0);
			} else {
				this.scrollTo(destination, 0);
				this.snapping = false;
				deferred.resolve();
			}
		}

		tick.call(this);

		return deferred.promise;
	}

	scrollTo(left=0, top=0): void {
		if (this.fullsize) {
			window.scroll(left, top);
		} else {
			(this.scroller as HTMLElement).scrollLeft = left;
			(this.scroller as HTMLElement).scrollTop = top;
		}
	}

	now(): number {
		return ("now" in window.performance) ? performance.now() : new Date().getTime();
	}

	destroy(): void {
		if (!this.scroller) {
			return;
		}

		if (this.fullsize) {
			this.enableScroll();
		}

		this.removeListeners();

		this.scroller = undefined;
	}
}

EventEmitter(Snap.prototype);

export default Snap;

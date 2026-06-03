import { describe, expect, it, vi } from "vitest";
import Snap from "../../src/managers/helpers/snap";

const createSnap = (overrides = {}) => Object.assign(Object.create(Snap.prototype), {
	layout: {
		pageWidth: 100,
		divisor: 2
	},
	settings: {
		duration: 80,
		minVelocity: 0.2,
		minDistance: 10,
		easing: (position) => position
	},
	scrollLeft: 0,
	startTouchX: 0,
	endTouchX: 0,
	startTime: 0,
	endTime: 100,
	smoothScrollTo: vi.fn((destination) => Promise.resolve(destination))
}, overrides);

describe("Snap", () => {
	function createManager(overrides = {}) {
		const listeners = {
			off: [],
			on: []
		};
		const element = document.createElement("div");
		const container = document.createElement("div");
		const manager = {
			isPaginated: true,
			layout: {
				width: 320,
				pageWidth: 100,
				divisor: 2
			},
			settings: {
				axis: "horizontal",
				fullsize: false
			},
			stage: {
				container,
				element
			},
			off(type, callback) {
				listeners.off.push([type, callback]);
			},
			on(type, callback) {
				listeners.on.push([type, callback]);
			}
		};

		return Object.assign(manager, overrides, { listeners });
	}

	it("detects swipe direction when distance and velocity exceed thresholds", () => {
		const next = createSnap({
			startTouchX: 200,
			endTouchX: 120,
			startTime: 0,
			endTime: 200
		});

		const previous = createSnap({
			startTouchX: 120,
			endTouchX: 200,
			startTime: 0,
			endTime: 200
		});

		expect(next.wasSwiped()).toBe(1);
		expect(previous.wasSwiped()).toBe(-1);
	});

	it("ignores short and oversized swipes", () => {
		const shortSwipe = createSnap({
			startTouchX: 100,
			endTouchX: 95
		});

		const oversizedSwipe = createSnap({
			startTouchX: 500,
			endTouchX: 100
		});

		expect(shortSwipe.wasSwiped()).toBe(0);
		expect(oversizedSwipe.wasSwiped()).toBe(0);
	});

	it("detects when the current scroll position is between snap points", () => {
		expect(createSnap({ scrollLeft: 200 }).needsSnap()).toBe(false);
		expect(createSnap({ scrollLeft: 250 }).needsSnap()).toBe(true);
	});

	it("rounds to the nearest snap point and applies page offsets", () => {
		const snap = createSnap({
			scrollLeft: 250
		});

		snap.snap(1);

		expect(snap.smoothScrollTo).toHaveBeenCalledWith(400);
	});

	it("scrolls element containers directly when not fullsize", () => {
		const scroller = {
			scrollLeft: 0,
			scrollTop: 0
		};
		const snap = createSnap({
			fullsize: false,
			scroller
		});

		snap.scrollTo(320, 12);

		expect(scroller.scrollLeft).toBe(320);
		expect(scroller.scrollTop).toBe(12);
	});

	it("sets up touch snapping for paginated horizontal managers", () => {
		const manager = createManager();
		const originalDetectSupportsTouch = Snap.prototype.detectSupportsTouch;

		Snap.prototype.detectSupportsTouch = () => true;
		const snap = new Snap(manager);
		Snap.prototype.detectSupportsTouch = originalDetectSupportsTouch;

		expect(snap.manager).toBe(manager);
		expect(snap.element).toBe(manager.stage.container);
		expect(snap.scroller).toBe(manager.stage.container);
		expect(snap.isVertical).toBe(false);
		expect(manager.settings.offset).toBe(320);
		expect(manager.settings.afterScrolledTimeout).toBe(160);
		expect(manager.stage.container.style.WebkitOverflowScrolling).toBe("touch");
		expect(manager.listeners.on[0][0]).toBe("added");
	});

	it("does not add snap listeners for vertical managers", () => {
		const manager = createManager({
			settings: {
				axis: "vertical",
				fullsize: false
			}
		});
		const originalDetectSupportsTouch = Snap.prototype.detectSupportsTouch;

		Snap.prototype.detectSupportsTouch = () => true;
		const snap = new Snap(manager);
		Snap.prototype.detectSupportsTouch = originalDetectSupportsTouch;

		expect(snap.isVertical).toBe(true);
		expect(manager.listeners.on).toEqual([]);
	});

	it("removes listeners and restores fullsize scrolling on destroy", () => {
		const manager = createManager({
			settings: {
				axis: "horizontal",
				fullsize: true
			}
		});
		const originalDetectSupportsTouch = Snap.prototype.detectSupportsTouch;

		Snap.prototype.detectSupportsTouch = () => true;
		const snap = new Snap(manager);
		Snap.prototype.detectSupportsTouch = originalDetectSupportsTouch;

		expect(manager.stage.element.style.overflow).toBe("hidden");

		snap.destroy();

		expect(manager.stage.element.style.overflow).toBe("");
		expect(snap.scroller).toBeUndefined();
		expect(manager.listeners.off[0][0]).toBe("added");
	});
});

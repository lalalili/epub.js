import { describe, expect, it } from "vitest";
import ContinuousViewManager from "../../src/managers/continuous/index";

function delay(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

describe("ContinuousViewManager", () => {
	it("does not re-show already visible displayed views during update", async () => {
		var showCount = 0;
		var view = {
			displayed: true,
			element: {
				style: {
					visibility: "visible"
				}
			},
			iframe: {
				style: {
					visibility: "visible"
				}
			},
			show: () => {
				showCount += 1;
			},
			hide: () => {}
		};
		var manager = Object.create(ContinuousViewManager.prototype);

		manager.settings = {
			offset: 0
		};
		manager.bounds = () => {
			return {
				width: 320,
				height: 480
			};
		};
		manager.views = {
			all: () => {
				return [view];
			}
		};
		manager.isVisible = () => true;

		await manager.update();

		expect(showCount).toBe(0);
	});

	it("emits scrolled only after the queued check has completed", async () => {
		var emitted = [];
		var resolveCheck;
		var checkPromise = new Promise((resolve) => {
			resolveCheck = resolve;
		});
		var manager = Object.create(ContinuousViewManager.prototype);

		manager.settings = {
			afterScrolledTimeout: 0
		};
		manager.scrollTop = 120;
		manager.scrollLeft = 0;
		manager.q = {
			enqueue: (task) => task()
		};
		manager.check = () => checkPromise;
		manager.emit = (eventName) => {
			emitted.push(eventName);
		};

		manager.scrolled();
		await delay(10);

		expect(emitted).toEqual(["scroll"]);

		resolveCheck();
		await delay(10);

		expect(emitted).toEqual(["scroll", "scrolled"]);
	});

	it("skips stale scrolled callbacks when a newer scroll request is queued", async () => {
		var emitted = [];
		var checkResolvers = [];
		var manager = Object.create(ContinuousViewManager.prototype);

		manager.settings = {
			afterScrolledTimeout: 0
		};
		manager.scrollTop = 100;
		manager.scrollLeft = 0;
		manager.q = {
			enqueue: (task) => task()
		};
		manager.check = () => {
			return new Promise((resolve) => {
				checkResolvers.push(resolve);
			});
		};
		manager.emit = (eventName, payload) => {
			emitted.push({
				eventName: eventName,
				top: payload && payload.top
			});
		};

		manager.scrolled();
		await delay(10);

		manager.scrollTop = 200;
		manager.scrolled();
		await delay(10);

		checkResolvers[0]();
		await delay(10);

		expect(emitted).toEqual([
			{ eventName: "scroll", top: 100 },
			{ eventName: "scroll", top: 200 }
		]);

		checkResolvers[1]();
		await delay(10);

		expect(emitted).toEqual([
			{ eventName: "scroll", top: 100 },
			{ eventName: "scroll", top: 200 },
			{ eventName: "scrolled", top: 200 }
		]);
	});

	it("delays trimming while scroll delta is still active", async () => {
		var trimCount = 0;
		var manager = Object.create(ContinuousViewManager.prototype);

		manager.scrollDeltaVert = 3;
		manager.scrollDeltaHorz = 0;
		manager.q = {
			enqueue: (task) => task()
		};
		manager.trim = () => {
			trimCount += 1;
		};

		manager.scheduleTrim(0);
		await delay(10);

		expect(trimCount).toBe(0);

		manager.scrollDeltaVert = 0;
		await delay(140);

		expect(trimCount).toBe(1);
	});
});

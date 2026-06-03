import { describe, expect, it } from "vitest";
import ContinuousViewManager from "../../src/managers/continuous/index";

function delay(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

describe("ContinuousViewManager", () => {
	it("keeps constructor defaults, gap zero, and initial scroll state stable", function() {
		var manager = new ContinuousViewManager({
			settings: {
				gap: 0,
				ignoreClass: "ignore",
				axis: "horizontal",
				allowScriptedContent: true,
				allowPopups: true
			},
			view: function() {},
			request: function() {},
			queue: {}
		});

		expect(manager.name).toBe("continuous");
		expect(manager.settings.infinite).toBe(true);
		expect(manager.settings.flow).toBe("scrolled");
		expect(manager.settings.offset).toBe(500);
		expect(manager.settings.offsetDelta).toBe(250);
		expect(manager.settings.afterScrolledTimeout).toBe(10);
		expect(manager.settings.gap).toBe(0);
		expect(manager.scrollTop).toBe(0);
		expect(manager.scrollLeft).toBe(0);
		expect(manager.viewSettings.ignoreClass).toBe("ignore");
		expect(manager.viewSettings.axis).toBe("horizontal");
		expect(manager.viewSettings.forceEvenPages).toBe(false);
		expect(manager.viewSettings.allowScriptedContent).toBe(true);
		expect(manager.viewSettings.allowPopups).toBe(true);
	});

	it("continues filling until check reports no more views are needed", function() {
		var checks = 0;
		var manager = Object.create(ContinuousViewManager.prototype);

		manager.q = {
			enqueue: (task) => task()
		};
		manager.check = () => {
			checks += 1;
			return Promise.resolve(checks < 3);
		};

		return manager.fill().then(function() {
			expect(checks).toBe(3);
		});
	});

	it("does not re-show already visible displayed views during update", function() {
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

		return manager.update().then(function() {
			expect(showCount).toBe(0);
		});
	});

	it("emits scrolled only after the queued check has completed", function() {
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
		return delay(10)
			.then(function() {
				expect(emitted).toEqual(["scroll"]);
				resolveCheck();
				return delay(10);
			})
			.then(function() {
				expect(emitted).toEqual(["scroll", "scrolled"]);
			});
	});

	it("skips stale scrolled callbacks when a newer scroll request is queued", function() {
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
		return delay(10)
			.then(function() {
				manager.scrollTop = 200;
				manager.scrolled();
				return delay(10);
			})
			.then(function() {
				checkResolvers[0]();
				return delay(10);
			})
			.then(function() {
				expect(emitted).toEqual([
					{ eventName: "scroll", top: 100 },
					{ eventName: "scroll", top: 200 }
				]);

				checkResolvers[1]();
				return delay(10);
			})
			.then(function() {
				expect(emitted).toEqual([
					{ eventName: "scroll", top: 100 },
					{ eventName: "scroll", top: 200 },
					{ eventName: "scrolled", top: 200 }
				]);
			});
	});

	it("delays trimming while scroll delta is still active", function() {
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
		return delay(10)
			.then(function() {
				expect(trimCount).toBe(0);
				manager.scrollDeltaVert = 0;
				return delay(140);
			})
			.then(function() {
				expect(trimCount).toBe(1);
			});
	});
});

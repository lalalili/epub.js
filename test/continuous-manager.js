import assert from "assert";
import ContinuousViewManager from "../src/managers/continuous/index";

describe("ContinuousViewManager", function() {
	function delay(ms) {
		return new Promise(function(resolve) {
			setTimeout(resolve, ms);
		});
	}

	it("does not re-show already visible displayed views during update", async function() {
		let showCount = 0;
		let view = {
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
			show: function() {
				showCount += 1;
			},
			hide: function() {}
		};
		let manager = Object.create(ContinuousViewManager.prototype);

		manager.settings = {
			offset: 0
		};
		manager.bounds = function() {
			return {
				width: 320,
				height: 480
			};
		};
		manager.views = {
			all: function() {
				return [view];
			}
		};
		manager.isVisible = function() {
			return true;
		};

		await manager.update();

		assert.equal(showCount, 0);
	});

	it("emits scrolled only after the queued check has completed", async function() {
		let emitted = [];
		let resolveCheck;
		let checkPromise = new Promise(function(resolve) {
			resolveCheck = resolve;
		});
		let manager = Object.create(ContinuousViewManager.prototype);

		manager.settings = {
			afterScrolledTimeout: 0
		};
		manager.scrollTop = 120;
		manager.scrollLeft = 0;
		manager.q = {
			enqueue: function(task) {
				return task();
			}
		};
		manager.check = function() {
			return checkPromise;
		};
		manager.emit = function(eventName) {
			emitted.push(eventName);
		};

		manager.scrolled();
		await delay(10);

		assert.deepEqual(emitted, ["scroll"]);

		resolveCheck();
		await delay(10);

		assert.deepEqual(emitted, ["scroll", "scrolled"]);
	});

	it("skips stale scrolled callbacks when a newer scroll request is queued", async function() {
		let emitted = [];
		let checkResolvers = [];
		let manager = Object.create(ContinuousViewManager.prototype);

		manager.settings = {
			afterScrolledTimeout: 0
		};
		manager.scrollTop = 100;
		manager.scrollLeft = 0;
		manager.q = {
			enqueue: function(task) {
				return task();
			}
		};
		manager.check = function() {
			return new Promise(function(resolve) {
				checkResolvers.push(resolve);
			});
		};
		manager.emit = function(eventName, payload) {
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

		assert.deepEqual(emitted, [
			{eventName: "scroll", top: 100},
			{eventName: "scroll", top: 200}
		]);

		checkResolvers[1]();
		await delay(10);

		assert.deepEqual(emitted, [
			{eventName: "scroll", top: 100},
			{eventName: "scroll", top: 200},
			{eventName: "scrolled", top: 200}
		]);
	});

	it("delays trimming while scroll delta is still active", async function() {
		let trimCount = 0;
		let manager = Object.create(ContinuousViewManager.prototype);

		manager.scrollDeltaVert = 3;
		manager.scrollDeltaHorz = 0;
		manager.q = {
			enqueue: function(task) {
				return task();
			}
		};
		manager.trim = function() {
			trimCount += 1;
		};

		manager.scheduleTrim(0);
		await delay(10);

		assert.equal(trimCount, 0);

		manager.scrollDeltaVert = 0;
		await delay(140);

		assert.equal(trimCount, 1);
	});
});

import assert from "assert";
import ContinuousViewManager from "../src/managers/continuous/index";
import DefaultViewManager from "../src/managers/default/index";
import Stage from "../src/managers/helpers/stage";

describe("Manager listener cleanup", function() {
	let originalAddEventListener;
	let originalRemoveEventListener;

	beforeEach(function() {
		originalAddEventListener = window.addEventListener;
		originalRemoveEventListener = window.removeEventListener;
	});

	afterEach(function() {
		window.addEventListener = originalAddEventListener;
		window.removeEventListener = originalRemoveEventListener;
	});

	it("removes the same DefaultViewManager unload listener it added", function() {
		let addedUnloadListener;
		let removedUnloadListener;
		let manager = Object.create(DefaultViewManager.prototype);

		window.addEventListener = function(type, listener) {
			if (type === "unload") {
				addedUnloadListener = listener;
			}
		};
		window.removeEventListener = function(type, listener) {
			if (type === "unload") {
				removedUnloadListener = listener;
			}
		};

		manager.settings = {
			fullsize: true
		};
		manager.container = document.createElement("div");
		manager.onScroll = function() {};

		manager.addEventListeners();
		manager.removeEventListeners();

		assert.equal(typeof addedUnloadListener, "function");
		assert.equal(removedUnloadListener, addedUnloadListener);
	});

	it("removes the same ContinuousViewManager unload listener it added", function() {
		let addedUnloadListener;
		let removedUnloadListener;
		let manager = Object.create(ContinuousViewManager.prototype);

		window.addEventListener = function(type, listener) {
			if (type === "unload") {
				addedUnloadListener = listener;
			}
		};
		window.removeEventListener = function(type, listener) {
			if (type === "unload") {
				removedUnloadListener = listener;
			}
		};

		manager.settings = {
			fullsize: true
		};
		manager.container = document.createElement("div");
		manager.isPaginated = false;
		manager.onScroll = function() {};
		manager.scrolled = function() {};
		manager.getScrollPosition = function() {
			return {
				top: 0,
				left: 0
			};
		};

		manager.addEventListeners();
		manager.removeEventListeners();

		assert.equal(typeof addedUnloadListener, "function");
		assert.equal(removedUnloadListener, addedUnloadListener);
	});

	it("removes Stage orientationchange listener with the same event name it added", function() {
		let removedOrientationListener;
		let stage = Object.create(Stage.prototype);

		window.removeEventListener = function(type, listener) {
			if (type === "orientationchange") {
				removedOrientationListener = listener;
			}
		};

		stage.element = document.createElement("div");
		stage.container = document.createElement("div");
		stage.element.appendChild(stage.container);
		stage.settings = {
			hidden: false
		};
		stage.resizeFunc = function() {};
		stage.orientationChangeFunc = function() {};

		stage.destroy();

		assert.equal(removedOrientationListener, stage.orientationChangeFunc);
	});

	it("preserves fractional CSS widths when measuring a stage with fluid width", function() {
		let stage = Object.create(Stage.prototype);
		let element = document.createElement("div");
		let container = document.createElement("div");

		Object.defineProperty(container, "clientWidth", {
			configurable: true,
			value: 1306
		});
		Object.defineProperty(container, "clientHeight", {
			configurable: true,
			value: 760
		});
		container.getBoundingClientRect = function() {
			return {
				width: 1305.6,
				height: 760
			};
		};

		element.appendChild(container);
		stage.element = element;
		stage.container = container;
		stage.settings = {
			width: "100%",
			height: "100%"
		};

		let size = stage.size();

		assert.equal(size.width, 1305.6);
		assert.equal(size.height, 760);
	});
});

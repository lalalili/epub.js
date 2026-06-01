import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ContinuousViewManager from "../../src/managers/continuous/index";
import DefaultViewManager from "../../src/managers/default/index";
import Stage from "../../src/managers/helpers/stage";

describe("Manager listener cleanup", () => {
	let originalAddEventListener;
	let originalRemoveEventListener;

	beforeEach(() => {
		originalAddEventListener = window.addEventListener;
		originalRemoveEventListener = window.removeEventListener;
	});

	afterEach(() => {
		window.addEventListener = originalAddEventListener;
		window.removeEventListener = originalRemoveEventListener;
	});

	it("removes the same DefaultViewManager unload listener it added", () => {
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

		expect(typeof addedUnloadListener).toBe("function");
		expect(removedUnloadListener).toBe(addedUnloadListener);
	});

	it("removes the same ContinuousViewManager unload listener it added", () => {
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

		expect(typeof addedUnloadListener).toBe("function");
		expect(removedUnloadListener).toBe(addedUnloadListener);
	});

	it("removes Stage orientationchange listener with the same event name it added", () => {
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

		expect(removedOrientationListener).toBe(stage.orientationChangeFunc);
	});

	it("preserves fractional CSS widths when measuring a stage with fluid width", () => {
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

		expect(size.width).toBe(1305.6);
		expect(size.height).toBe(760);
	});
});

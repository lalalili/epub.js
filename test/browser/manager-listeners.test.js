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

	it("keeps DefaultViewManager constructor defaults and view settings stable", () => {
		function View(section, settings) {
			this.section = section;
			this.settings = settings;
		}

		let request = function() {};
		let renditionQueue = {};
		let settings = {
			ignoreClass: "ignore-me",
			axis: "horizontal",
			flow: "paginated",
			method: "blobUrl",
			allowScriptedContent: true,
			allowPopups: true
		};
		let manager = new DefaultViewManager({
			settings,
			view: View,
			request,
			queue: renditionQueue
		});

		expect(manager.name).toBe("default");
		expect(manager.optsSettings).toBe(settings);
		expect(manager.View).toBe(View);
		expect(manager.request).toBe(request);
		expect(manager.renditionQueue).toBe(renditionQueue);
		expect(manager.q.context).toBe(manager);
		expect(manager.settings.infinite).toBe(true);
		expect(manager.settings.hidden).toBe(false);
		expect(manager.settings.flow).toBe("paginated");
		expect(manager.settings.ignoreClass).toBe("ignore-me");
		expect(manager.settings.allowScriptedContent).toBe(true);
		expect(manager.settings.allowPopups).toBe(true);
		expect(manager.viewSettings).toMatchObject({
			ignoreClass: "ignore-me",
			axis: "horizontal",
			flow: "paginated",
			method: "blobUrl",
			width: 0,
			height: 0,
			forceEvenPages: true,
			allowScriptedContent: true,
			allowPopups: true
		});
		expect(manager.rendered).toBe(false);
		expect(manager._layoutDirty).toBe(true);
		expect(manager._lastLayoutStageSize).toBeNull();

		let section = { href: "chapter.xhtml" };
		let view = manager.createView(section, true);
		expect(view.section).toBe(section);
		expect(view.settings.forceRight).toBe(true);
	});

	it("keeps DefaultViewManager flow and direction helpers stable", () => {
		let axisChanges = [];
		let overflowChanges = [];
		let directionChanges = [];
		let layoutCalculations = [];
		let spreadChanges = [];
		let manager = Object.create(DefaultViewManager.prototype);

		manager.settings = {
			axis: "horizontal",
			direction: "ltr",
			gap: 24
		};
		manager.viewSettings = {};
		manager.stage = {
			size() {
				return {
					width: 640,
					height: 480
				};
			},
			axis(axis) {
				axisChanges.push(axis);
			},
			overflow(overflow) {
				overflowChanges.push(overflow);
			},
			direction(direction) {
				directionChanges.push(direction);
			}
		};
		manager.layout = {
			name: "reflowable",
			width: 320,
			height: 480,
			delta: 344,
			divisor: 1,
			props: {
				name: "reflowable"
			},
			settings: {
				spread: "auto"
			},
			calculate(width, height, gap) {
				layoutCalculations.push({ width, height, gap });
				this.width = width;
				this.height = height;
				this.delta = width + (gap || 0);
			},
			spread(spread) {
				spreadChanges.push(spread);
			}
		};
		manager.views = {
			length: 0,
			forEach() {}
		};
		manager.syncVerticalRlViewportClip = function() {};

		manager.updateFlow("paginated");

		expect(manager.isPaginated).toBe(true);
		expect(manager.settings.axis).toBe("horizontal");
		expect(axisChanges).toEqual([]);
		expect(overflowChanges).toEqual(["hidden"]);
		expect(manager.overflow).toBe("hidden");
		expect(manager.viewSettings.flow).toBe("paginated");
		expect(manager.viewSettings.width).toBe(640);
		expect(manager.viewSettings.height).toBe(480);
		expect(manager.settings.offset).toBe(664);
		expect(layoutCalculations).toEqual([{ width: 640, height: 480, gap: 24 }]);
		expect(manager._layoutDirty).toBe(false);
		expect(manager._lastLayoutStageSize).toEqual({ width: 640, height: 480 });

		manager.updateFlow("scrolled", "visible");
		expect(manager.isPaginated).toBe(false);
		expect(manager.settings.axis).toBe("vertical");
		expect(axisChanges).toEqual(["vertical"]);
		expect(spreadChanges).toEqual(["none"]);
		expect(overflowChanges).toEqual(["hidden", "visible"]);
		expect(manager.overflow).toBe("visible");
		expect(manager.viewSettings.flow).toBe("scrolled");

		manager.direction("rtl");
		expect(manager.settings.direction).toBe("rtl");
		expect(manager.viewSettings.direction).toBe("rtl");
		expect(directionChanges).toEqual(["rtl"]);
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

	it("normalizes numeric DefaultViewManager display targets through direct helpers", () => {
		let shown = false;
		let section = {
			href: "chapter.xhtml",
			properties: []
		};
		let manager = Object.create(DefaultViewManager.prototype);

		manager.layout = {
			name: "reflowable"
		};
		manager.settings = {
			direction: "ltr"
		};
		manager.views = {
			find: function() {
				return null;
			},
			show: function() {
				shown = true;
			}
		};
		manager.clear = function() {};
		manager.add = function() {
			return Promise.resolve({});
		};
		manager.handleNextPrePaginated = function() {
			return Promise.resolve();
		};
		manager.isRtlVerticalPaginated = function() {
			return false;
		};

		return manager.display(section, 5)
			.then(function() {
				expect(manager.target).toBeUndefined();
				expect(shown).toBe(true);
			});
	});

	it("defers DefaultViewManager resize while square orientation bounds are settling", () => {
		let originalInnerWidth = window.innerWidth;
		let originalInnerHeight = window.innerHeight;
		let manager = Object.create(DefaultViewManager.prototype);

		Object.defineProperty(window, "innerWidth", {
			configurable: true,
			value: 500
		});
		Object.defineProperty(window, "innerHeight", {
			configurable: true,
			value: 500
		});

		try {
			manager.stage = {
				size: function() {
					return {
						width: 500,
						height: 500
					};
				}
			};
			manager.orientationTimeout = 1;
			manager._stageSize = {
				width: 320,
				height: 240
			};
			manager.bounds = function() {
				throw new Error("bounds should not run while orientation bounds are settling");
			};

			manager.resize();

			expect(manager._stageSize).toBeUndefined();
			expect(manager.winBounds.width).toBe(500);
			expect(manager.winBounds.height).toBe(500);
		} finally {
			Object.defineProperty(window, "innerWidth", {
				configurable: true,
				value: originalInnerWidth
			});
			Object.defineProperty(window, "innerHeight", {
				configurable: true,
				value: originalInnerHeight
			});
		}
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

	it("creates a horizontal stage with direct helper boundaries", () => {
		let stage = new Stage({
			width: 320,
			height: 240,
			axis: "horizontal",
			overflow: "scroll",
			direction: "rtl"
		});

		expect(stage.id).toMatch(/^epubjs-container-/);
		expect(stage.container.style.width).toBe("320px");
		expect(stage.container.style.height).toBe("240px");
		expect(stage.container.style.display).toBe("flex");
		expect(stage.container.style.overflowX).toBe("scroll");
		expect(stage.container.style.overflowY).toBe("hidden");
		expect(stage.container.dir).toBe("rtl");
	});

	it("attaches hidden stages through a wrapper", () => {
		let host = document.createElement("div");
		let stage = new Stage({
			hidden: true
		});

		stage.attachTo(host);

		expect(stage.wrapper.contains(stage.container)).toBe(true);
		expect(host.firstChild).toBe(stage.wrapper);
		expect(stage.wrapper.style.visibility).toBe("hidden");
	});

	it("updates stage axis direction and overflow styles", () => {
		let stage = new Stage({
			axis: "vertical"
		});

		stage.axis("horizontal");
		stage.direction("rtl");
		stage.overflow("scroll");

		expect(stage.container.style.display).toBe("flex");
		expect(stage.container.dir).toBe("rtl");
		expect(stage.settings.dir).toBe("rtl");
		expect(stage.container.style.overflowX).toBe("scroll");
		expect(stage.container.style.overflowY).toBe("hidden");
	});

	it("adds scoped style rules for the stage container", () => {
		let stage = new Stage();

		stage.addStyleRules("iframe", [{ border: "0" }, { margin: "1px" }]);

		expect(stage.sheet.cssRules[0].cssText).toContain("#" + stage.id + " iframe");
		expect(stage.sheet.cssRules[0].cssText).toContain("border");
		expect(stage.sheet.cssRules[0].cssText).toContain("margin");
	});
});

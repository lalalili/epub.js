import { describe, expect, it } from "vitest";
import DefaultViewManager from "../../src/managers/default";

describe("Vertical RL terminal marker characterization", function() {
	it("records a real marker outside the visible terminal window without changing page state", function() {
		let container = document.createElement("div");
		let frame = document.createElement("iframe");
		document.body.appendChild(frame);
		let frameDocument = frame.contentDocument;

		expect(frameDocument).not.toBeNull();
		let marker = frameDocument.createElement("span");
		let visibleWindow = { left: 193, right: 577 };

		marker.textContent = "[";
		frameDocument.body.appendChild(marker);
		container.appendChild(frame);

		Object.defineProperty(container, "clientWidth", { configurable: true, value: 384 });
		Object.defineProperty(container, "scrollWidth", { configurable: true, value: 8064 });
		let scrollLeft = -7487;
		Object.defineProperty(container, "scrollLeft", {
			configurable: true,
			get: function() {
				return scrollLeft;
			},
			set: function(value) {
				scrollLeft = value;
			}
		});
		marker.getBoundingClientRect = function() {
			return {
				left: 186.78,
				right: 190.11,
				top: 40,
				bottom: 64,
				width: 3.33,
				height: 24
			};
		};

		let manager = Object.create(DefaultViewManager.prototype);
		let view = {
			_contentWidth: 8064,
			width: function() {
				return 8064;
			},
			contents: {
				writingMode: function() {
					return "vertical-rl";
				},
				document: frameDocument
			}
		};

		manager.container = container;
		manager.isPaginated = true;
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.layout = {
			name: "reflowable",
			pageWidth: 384,
			width: 384,
			effectivePageAdvance: 384,
			delta: 384,
			edgeGuardPx: 0,
			pageBoundaryShift: 0
		};
		manager.views = {
			first: function() {
				return view;
			},
			last: function() {
				return view;
			}
		};
		manager.scrollTo = function(left) {
			container.scrollLeft = left;
		};

		let totalPages = manager.getTotalPagesForCurrentView();
		let currentPageIndex = manager.getCurrentPageIndex();
		let markerRect = marker.getBoundingClientRect();
		let maxLogicalScroll = manager.getMaxLogicalScrollLeft();
		let runtime = {
			markerText: marker.textContent,
			markerRect,
			visibleWindow,
			markerOutsideLeftBoundary: markerRect.right < visibleWindow.left,
			container: {
				clientWidth: container.clientWidth,
				scrollWidth: container.scrollWidth,
				scrollLeft: container.scrollLeft,
				maxLogicalScroll
			},
			document: {
				clientWidth: frameDocument.documentElement.clientWidth,
				scrollWidth: frameDocument.documentElement.scrollWidth
			},
			totalPages,
			currentPageIndex,
			terminalPageIndex: totalPages - 1,
			terminalUndershoot: maxLogicalScroll - Math.abs(container.scrollLeft)
		};

		console.log("vertical-rl-terminal-marker-characterization", JSON.stringify(runtime));

		expect(runtime.markerText).toBe("[");
		expect(runtime.markerOutsideLeftBoundary).toBe(true);
		expect(runtime.container.scrollLeft).toBe(-7487);
		expect(runtime.container.maxLogicalScroll).toBe(7680);
		expect(runtime.container.maxLogicalScroll - Math.abs(runtime.container.scrollLeft)).toBe(193);
		expect(runtime.document.clientWidth).toBe(0);
		expect(runtime.document.scrollWidth).toBe(0);
		expect(runtime.currentPageIndex).toBe(19);
		expect(runtime.terminalPageIndex).toBe(20);
		expect(runtime.currentPageIndex).not.toBe(runtime.terminalPageIndex);

		frame.remove();
	});
});

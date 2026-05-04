import assert from "assert";
import Contents from "../src/contents";
import DefaultViewManager from "../src/managers/default";

describe("Vertical RL manager pagination", function() {
	function createManagerAtLogicalOffset(logicalOffset) {
		let manager = Object.create(DefaultViewManager.prototype);
		let container = {
			clientWidth: 300,
			scrollWidth: 745,
			scrollLeft: -logicalOffset
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
			effectivePageAdvance: 240,
			delta: 240,
			pageWidth: 300,
			width: 300,
			edgeGuardPx: 4,
			pageBoundaryShift: 20
		};
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 780;
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.scrollTo = function(left) {
			container.scrollLeft = left;
		};

		return manager;
	}

	it("treats a max-scroll-clamped offset as the last visual page", function() {
		let manager = createManagerAtLogicalOffset(445);

		assert.equal(manager.getTotalPagesForCurrentView(), 3);
		assert.equal(manager.getCurrentPageIndex(), 2);
	});

	it("clamps scrollToLogicalPage to max scroll without losing the last page index", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(2);

		assert.equal(manager.container.scrollLeft, -445);
		assert.equal(manager.getCurrentPageIndex(), 2);
	});

	it("nudges the first vertical-rl page away from a detected line boundary", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(0);

		assert.equal(manager.container.scrollLeft, -20);
		assert.equal(manager.getCurrentPageIndex(), 0);
	});

	it("nudges interior vertical-rl pages away from a detected line boundary", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(1);

		assert.equal(manager.container.scrollLeft, -260);
		assert.equal(manager.getCurrentPageIndex(), 1);
	});

	it("moves a vertical-rl page boundary past the clipped line box", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		contents.content = {
			clientWidth: 300,
			clientHeight: 700,
			childElementCount: 1,
			scrollWidth: 700,
			scrollHeight: 700
		};
		contents.documentElement = {
			clientWidth: 300,
			clientHeight: 700,
			scrollWidth: 700,
			scrollHeight: 700
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				rawWidth: 700,
				rawHeight: 700
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			return {
				linePitch: 36,
				lineWidth: 20,
				lineLefts: [280, 316],
				sampleCount: 8,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(300);

		assert.equal(metrics.effectivePageAdvance, 324);
		assert.equal(metrics.pageBoundaryShift, 16);
		assert.ok(metrics.effectivePageAdvance >= metrics.pageWidth);
	});
});

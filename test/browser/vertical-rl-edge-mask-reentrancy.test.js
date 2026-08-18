import { describe, expect, it } from "vitest";
import DefaultViewManager from "../../src/managers/default";

/**
 * Regression test for the vertical-rl edge-mask recursion.
 *
 * Runtime evidence (2026-08-18, narrow-320x568, book 9789570535525 page 7):
 * the page threw `RangeError: Maximum call stack size exceeded` with the cycle
 *
 *   getVerticalRlEdgeMaskWidths → snapVerticalRlEdgeMaskWidths →
 *   getLogicalPageStepToNextPage → getVerticalRlPageOffset →
 *   getVerticalRlRenderedEdgeMaskWidths → getVerticalRlEdgeMaskWidths → …
 *
 * Because the throw happened inside `IframeView.display()`'s fulfillment
 * handler (after `onDisplayed`, before `displayed.resolve`), the display Defer
 * never settled, `pageTurnInFlight` never cleared and the reader locator froze.
 */
describe("Vertical RL edge mask re-entrancy", function () {
	function createManager({ appliedLeft = 12, appliedRight = 3 } = {}) {
		let manager = Object.create(DefaultViewManager.prototype);

		manager.container = {
			clientWidth: 320,
			dataset: {
				epubVrlEdgeMaskLeft: String(appliedLeft),
				epubVrlEdgeMaskRight: String(appliedRight)
			},
			getBoundingClientRect() {
				return { left: 0, right: 320 };
			}
		};

		manager.isRtlVerticalPaginated = () => true;
		manager.getPageAdvance = () => 300;
		manager.getTotalPagesForCurrentView = () => 4;
		manager.getCurrentPageIndex = () => 1;
		manager.getMaxLogicalScrollLeft = () => 1200;
		manager.getPageBoundaryShift = () => 0;

		// The narrow-viewport trigger: no cached offset for the current page,
		// a cached offset for the previous one, and the page is not the last —
		// exactly the branch in getVerticalRlPageOffset that asks the mask back.
		manager.getVerticalRlLogicalPageOffsetCacheKey = () => "k";
		manager.getCachedVerticalRlLogicalPageOffset = (pageIndex) =>
			pageIndex === 0 ? 0 : NaN;
		manager.getLogicalOffsetForPageIndex = (pageIndex) => pageIndex * 300;

		return manager;
	}

	it("returns the applied mask instead of recursing when re-entered", function () {
		const manager = createManager();

		expect(manager.getVerticalRlAppliedEdgeMaskWidths()).toEqual({
			left: 12,
			right: 3
		});

		manager._verticalRlEdgeMaskComputing = true;

		expect(manager.getVerticalRlEdgeMaskWidths()).toEqual({
			left: 12,
			right: 3
		});
	});

	it("computes the page offset without exceeding the call stack", function () {
		const manager = createManager();

		expect(() => manager.getVerticalRlPageOffset(1, 4, 1200)).not.toThrow();
	});

	it("clears the re-entrancy flag after computing", function () {
		const manager = createManager();

		manager.getVerticalRlEdgeMaskWidths();

		expect(manager._verticalRlEdgeMaskComputing).toBe(false);
	});

	it("falls back to zero when no mask has been applied yet", function () {
		const manager = createManager();
		manager.container.dataset = {};
		manager._verticalRlEdgeMaskComputing = true;

		expect(manager.getVerticalRlEdgeMaskWidths()).toEqual({
			left: 0,
			right: 0
		});
	});
});

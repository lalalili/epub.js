import { describe, expect, it } from "vitest";
import DefaultViewManager from "../../src/managers/default";

// 5556 mobile/min-tight: the Reader paints with a 68px mask and a 22px
// leftward iframe displacement. Both exclude content from the next-page slice.
describe("vertical-rl Reader displacement boundaries", () => {
	function manager({ shift = "22", transform = "translateX(-22px)", vertical = true } = {}) {
		const value = Object.create(DefaultViewManager.prototype);
		const view = { iframe: { style: { transform } } };
		value.container = { clientWidth: 384, dataset: { epubVrlEdgeShiftRight: shift } };
		value.views = { first: () => view, last: () => view };
		value.layout = { pageWidth: 384 };
		value.isRtlVerticalPaginated = () => vertical;
		value.getPageAdvance = () => 384;
		value.getVerticalRlRenderedEdgeMaskWidths = () => ({ left: 68, right: 9 });
		value.getVerticalRlVisualContentWidth = () => 6144;
		value.getNormalizedLogicalScrollLeft = () => 288;
		value.getLogicalOffsetForPageIndex = index => index * 384;
		value.getVerticalRlLogicalPageOffsetCacheKey = () => "layout";
		value.getCachedVerticalRlLogicalPageOffset = index => index === 1 ? 288 : null;
		return value;
	}

	it("keeps the excluded source column in the next page's content interval", () => {
		const value = manager();
		expect(value.getVerticalRlPageOffset(2, 5, 1536)).toBe(582);
		expect(value.getVerticalRlCurrentEffectiveLeftBoundary()).toBe(5562);
		expect(value.getVerticalRlCurrentEffectiveRightBoundary()).toBe(5869);
	});

	it.each([
		{ recorded: 0, dataset: {}, expected: 4616 },
		{ recorded: null, dataset: {}, expected: 4609 },
		{ recorded: 12, dataset: {}, expected: 4609 },
		{ recorded: 0, dataset: { epubVrlEdgeMaskRight: "3" }, expected: 4613 },
	])("uses recorded zero-mask evidence without overriding an applied right mask: %j", ({ recorded, dataset, expected }) => {
		const value = manager({ shift: "0", transform: "" });
		value.container.dataset = dataset;
		value.getNormalizedLogicalScrollLeft = () => 1912;
		value.getVerticalRlVisualContentWidth = () => 6528;
		value.getCurrentPageIndex = () => 6;
		value.getRecordedVerticalRlAppliedLeftMask = () => recorded;
		value.getVerticalRlRenderedEdgeMaskWidths = () => ({ left: 0, right: 7 });
		expect(value.getVerticalRlCurrentEffectiveRightBoundary()).toBe(expected);
	});

	it.each([
		{ shift: "22", transform: "" },
		{ shift: "22", transform: "translateX(-18px)" },
		{ shift: "NaN", transform: "translateX(-NaNpx)" },
		{ shift: "-22", transform: "translateX(22px)" },
		{ shift: "22", transform: "translateX(-22px)", vertical: false },
	])("ignores stale, invalid or unrelated displacement: %j", options => {
		expect(manager(options).getVerticalRlAppliedContentShift()).toBe(0);
	});

	it("records displacement in the previous-page ownership fence", () => {
		const value = manager();
		value.getTotalPagesForCurrentView = () => 5;
		value.getMaxLogicalScrollLeft = () => 1536;
		value.getCurrentPageIndex = () => 1;
		value.recordVerticalRlAppliedLeftMask(68);
		expect(value.getRecordedVerticalRlAppliedLeftMask(1)).toBe(90);
	});

	it("does not claim the displaced excluded column was painted on the previous page", () => {
		const value = manager();
		value.getTotalPagesForCurrentView = () => 5;
		value.getMaxLogicalScrollLeft = () => 1536;
		value.getCurrentPageIndex = () => 1;
		value.recordVerticalRlAppliedLeftMask(68);
		value.getCurrentPageIndex = () => 2;
		value.getVerticalRlPageOffset = index => index === 1 ? 288 : 582;
		value.getVerticalRlRestoredSemanticMaskWidths = () => null;
		value.getVerticalRlSequentialTerminalRightMaskWidth = () => null;
		expect(value.getVerticalRlProvenRightMaskAllowance()).toBe(0);
	});

	it("preserves a previously observed page offset", () => {
		const value = manager();
		value.getCachedVerticalRlLogicalPageOffset = () => 604;
		expect(value.getVerticalRlPageOffset(2, 5, 1536)).toBe(604);
	});

	it.each([
		{ boundary: 3831, sourceLeftBoundary: 3826, layoutKey: "layout", expectedAlignment: false },
		{ boundary: 3823, sourceLeftBoundary: 3826, layoutKey: "layout", expectedAlignment: true },
		{ boundary: 3831, sourceLeftBoundary: 3822, layoutKey: "layout", expectedAlignment: true },
		{ boundary: 3831, sourceLeftBoundary: 3826, layoutKey: "stale", expectedAlignment: true },
	])("preserves an observed reverse source fence only when the next page reaches it: %j", ({ boundary, sourceLeftBoundary, layoutKey, expectedAlignment }) => {
		const value = Object.create(DefaultViewManager.prototype);
		const node = { nodeValue: "測試文字", parentElement: {} };
		const doc = { body: {}, createTreeWalker: () => { let seen = false; return { nextNode: () => seen ? null : (seen = true, node) }; },
			createRange: () => ({ selectNodeContents: () => {}, detach: () => {}, getClientRects: () => [
				{ left: 3805.015625, right: 3829.015625, top: 0, bottom: 752, width: 24, height: 752 },
				{ left: 3829.015625, right: 3853.015625, top: 0, bottom: 752, width: 24, height: 752 },
			] }) };
		const view = { contents: { document: doc, window: { devicePixelRatio: 1, getComputedStyle: () => ({ display: "block", visibility: "visible" }) } } };
		let offset = 2414;
		value.views = { first: () => view, last: () => view };
		value.container = { scrollLeft: -offset };
		value.settings = { rtlScrollType: "negative" };
		value.isRtlVerticalPaginated = () => true;
		value.getVerticalRlCurrentEffectiveLeftBoundary = () => 6240 - offset;
		value.getNormalizedLogicalScrollLeft = () => offset;
		value.getTotalPagesForCurrentView = () => 17;
		value.getMaxLogicalScrollLeft = () => 6144;
		value.getVerticalRlLogicalPageOffsetCacheKey = () => "layout";
		value._verticalRlPreservedPageBoundary = { pageIndex: 8, layoutKey, sourceLeftBoundary };
		value.cacheVerticalRlLogicalPageOffset = () => {};
		value.scrollTo = left => { offset = -left; value.container.scrollLeft = left; };
		value.syncVerticalRlViewportClip = () => {};
		expect(value.alignVerticalRlPreviousPageBoundary(8, boundary)).toBe(expectedAlignment);
		if (!expectedAlignment) expect(offset).toBe(2414);
	});

	it("preserves the uncached terminal page contract", () => {
		expect(manager().getVerticalRlPageOffset(4, 5, 1536)).toBe(1536);
	});
});


describe("learned continuation preserves committed left ownership", () => {
 function value(overrides = {}) {
  const m = Object.create(DefaultViewManager.prototype);
  m._verticalRlActiveTerminalLayout = {layoutKey:"layout",continuationCount:2};
  m._verticalRlAppliedLeftMaskLedgerKey = "layout";
  m.isRtlVerticalPaginated = () => true;
  m.getCurrentPageIndex = () => 11;
  m.getTotalPagesForCurrentView = () => 14;
  m.getCachedVerticalRlLogicalPageOffset = () => 3838;
  m.getNormalizedLogicalScrollLeft = () => 3838;
  m.getRecordedVerticalRlAppliedLeftMask = () => 48;
  m.getVerticalRlAppliedContentShift = () => 0;
  return Object.assign(m,overrides);
 }
 it("retains the same-offset exclusion when another terminal page is promoted", () => {
  expect(value().getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBe(48);
 });
 it.each([
  {_verticalRlAppliedLeftMaskLedgerKey:"different-layout"},
  {_verticalRlActiveTerminalLayout:{layoutKey:"layout",continuationCount:0}},
  {getCachedVerticalRlLogicalPageOffset:()=>null},
  {getNormalizedLogicalScrollLeft:()=>3839},
  {getRecordedVerticalRlAppliedLeftMask:()=>97},
  {getCurrentPageIndex:()=>13},
  {isRtlVerticalPaginated:()=>false},
 ])("does not transfer stale or unproved ownership: %j", overrides => {
  expect(value(overrides).getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBeNull();
 });
 it("converts the recorded content fence back to its current physical mask", () => {
  expect(value({getVerticalRlAppliedContentShift:()=>22}).getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBe(26);
 });
});

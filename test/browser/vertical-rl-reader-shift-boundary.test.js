import { describe, expect, it } from "vite-plus/test";
import DefaultViewManager from "../../src/managers/default";
import { promoteVerticalRlTerminalContinuation } from "../../src/rendering/terminal-continuation";

describe("5556 mobile min-tight promoted terminal ownership", () => {
	it("remeasures only the former terminal fence after reserving a continuation", () => {
		const masks = { "4": 96, "5": 8 };
		const offsets = { key: "mobile-source5", offsets: { "4": 1352, "5": 1640 } };
		const state = { layoutKey: "mobile-source5", continuationCount: 0, appliedLeftMasks: masks, offsetCache: offsets };
		const manager = Object.create(DefaultViewManager.prototype);
		manager._verticalRlActiveTerminalLayout = state;
		manager._verticalRlAppliedLeftMaskLedgerKey = state.layoutKey;
		manager._verticalRlAppliedLeftMaskLedger = masks;
		manager.isRtlVerticalPaginated = () => true;
		manager.getCurrentPageIndex = () => 5;
		manager.getTotalPagesForCurrentView = () => 6 + state.continuationCount;
		manager.getCachedVerticalRlLogicalPageOffset = () => 1640;
		manager.getNormalizedLogicalScrollLeft = () => 1640;
		manager.getVerticalRlAppliedContentShift = () => 8;

		expect(manager.getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBeNull();
		expect(promoteVerticalRlTerminalContinuation(state, 6, 5, 1640, 1920, 1, "unreached")).toBe(true);
		expect(manager.getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBeNull();
		expect(masks["4"]).toBe(96);
		expect(masks["5"]).toBeUndefined();
		expect(state.appliedLeftMasks).toBe(masks);
		expect(state.offsetCache).toBe(offsets);
		expect(offsets.offsets).toEqual({ "4": 1352, "5": 1640 });
	});

	it("retains terminal ownership when the source tail is already reached", () => {
		const masks = { "4": 96, "5": 8 };
		const state = { layoutKey: "mobile-source5", continuationCount: 0, appliedLeftMasks: masks };
		expect(promoteVerticalRlTerminalContinuation(state, 6, 5, 1640, 1920, 1, "reached")).toBe(false);
		expect(masks).toEqual({ "4": 96, "5": 8 });
	});
});

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

	it.each([
		{ cachedOffset: 8305, offset: 8416, initial: 17, mask: 31, shift: 23, expected: 17 },
		{ cachedOffset: 8305, offset: 8416, initial: 17, mask: 8, shift: 0, expected: 17 },
		{ cachedOffset: 8305, offset: 8305, initial: 17, mask: 31, shift: 23, expected: 54 },
		{ cachedOffset: null, offset: 8416, initial: undefined, mask: 31, shift: 23, expected: 54 },
		// Android WebView 124, DPR 2.75: planned double versus scrollLeft float32.
		{ cachedOffset: 4938.909090909091, offset: 4938.9091796875, initial: undefined, mask: 8, shift: 33, expected: 41 },
		{ cachedOffset: 4938.909090909091, offset: 4938.9091796875, initial: 17, mask: 8, shift: 33, expected: 41 },
		// A distinct representable scroll position still cannot replace its fence.
		{ cachedOffset: 4938.909090909091, offset: 4938.90966796875, initial: 17, mask: 8, shift: 33, expected: 17 },
		{ cachedOffset: 4938.909090909091, offset: 4910.9091796875, initial: 17, mask: 8, shift: 33, expected: 17 },
	])("records ownership only at the learned page offset: %j", ({ cachedOffset, offset, initial, mask, shift, expected }) => {
		const value = manager({ shift: String(shift), transform: shift ? `translateX(-${shift}px)` : "" });
		value.getTotalPagesForCurrentView = () => 32;
		value.getMaxLogicalScrollLeft = () => 8626;
		value.getCurrentPageIndex = () => 30;
		value.getCachedVerticalRlLogicalPageOffset = () => cachedOffset;
		value.getNormalizedLogicalScrollLeft = () => offset;
		value._verticalRlAppliedLeftMaskLedgerKey = "layout";
		value._verticalRlAppliedLeftMaskLedger = initial === undefined ? {} : { "30": initial };
		value.recordVerticalRlAppliedLeftMask(mask);
		expect(value.getRecordedVerticalRlAppliedLeftMask(30)).toBe(expected);
	});

	it.each([
		{ shift: 0, preserved: true, sameLayout: true, expected: 83 },
		{ shift: 27, preserved: true, sameLayout: true, expected: 83 },
		{ shift: 0, preserved: false, sameLayout: true, expected: 78 },
		{ shift: 0, preserved: true, sameLayout: false, expected: 78 },
	])("keeps the learned source fence while its displacement is restored: %j", ({ shift, preserved, sameLayout, expected }) => {
		const value = manager({ shift: String(shift), transform: shift ? `translateX(-${shift}px)` : "" });
		value.getPageAdvance = () => 312;
		value.getTotalPagesForCurrentView = () => 29;
		value.getMaxLogicalScrollLeft = () => 8626;
		value.getCurrentPageIndex = () => 7;
		value.getCachedVerticalRlLogicalPageOffset = () => 1887;
		value.getNormalizedLogicalScrollLeft = () => 1887;
		value._verticalRlAppliedLeftMaskLedgerKey = "layout";
		value._verticalRlAppliedLeftMaskLedger = { "7": 83 };
		value._verticalRlPreservedPageBoundary = preserved
			? { pageIndex: 7, layoutKey: sameLayout ? "layout" : "other", sourceLeftBoundary: 6822 }
			: null;
		value.recordVerticalRlAppliedLeftMask(shift ? 56 : 78);
		expect(value.getRecordedVerticalRlAppliedLeftMask(7)).toBe(expected);
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
  {_verticalRlActiveTerminalLayout:null},
  {_verticalRlActiveTerminalLayout:{layoutKey:"layout",continuationCount:0},getRecordedVerticalRlAppliedLeftMask:()=>0},
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
 it.each([
  { offset: 4938.9091796875, expected: 48 },
  { offset: 4938.90966796875, expected: null },
  { offset: 4910.9091796875, expected: null },
 ])("keeps committed ownership only at the same representable scroll position: %j", ({ offset, expected }) => {
  expect(value({
   getCachedVerticalRlLogicalPageOffset:()=>4938.909090909091,
   getNormalizedLogicalScrollLeft:()=>offset,
  }).getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBe(expected);
 });
});

describe("8069 Native default cached source fence", () => {
	it.each([27, 28])("recalculates a cached window behind a %s px left exclusion", left => {
		const manager = Object.create(DefaultViewManager.prototype);
		const sourceFence = 4233 - 1152 - 393.0909118652344 + left;
		let target;
		manager.settings = { direction: "rtl" };
		manager.views = { length: 1 };
		manager.container = {
			clientWidth: 393,
			dataset: { epubVrlEdgeMaskLeft: String(left), epubVrlEdgeMaskRight: "0" }
		};
		manager.layout = { pageWidth: 393.0909118652344 };
		manager.isRtlVerticalPaginated = () => true;
		manager.getCurrentPageIndex = () => 3;
		manager.getTotalPagesForCurrentView = () => 11;
		manager.getMaxLogicalScrollLeft = () => 3840;
		manager.getVerticalRlLogicalPageOffsetCacheKey = () => "11:3840:4233:393.09:384:4";
		manager.getCachedVerticalRlLogicalPageOffset = () => 1532;
		manager.getNormalizedLogicalScrollLeft = () => 1152;
		manager.getVerticalRlAppliedEdgeMaskWidths = () => ({ left, right: 0 });
		manager.getVerticalRlCurrentEffectiveLeftBoundary = () => sourceFence;
		manager.scrollToLogicalPage = (index, options) => { target = { index, options }; };

		manager.next();

		expect(target).toEqual({
			index: 4,
			options: { ignoreCachedLogicalOffset: true, sequentialRightBoundary: sourceFence }
		});
	});
});


describe("unchanged learned page viewport synchronization", () => {
 function manager({ committed = true, restored = null, terminal = null, continuation = 3 } = {}) {
  const m = Object.create(DefaultViewManager.prototype);
  const key = "16:4678:4998:320:312:4";
  m.container = document.createElement("div");
  m.container.style.width = "320px";
  m.container.style.height = "476px";
  const parent = document.createElement("div");
  parent.appendChild(m.container);
  const overlay = document.createElement("div");
  parent.appendChild(overlay);
  m.isRtlVerticalPaginated = () => true;
  m._verticalRlActiveTerminalLayout = { layoutKey: key, continuationCount: continuation };
  m._verticalRlAppliedLeftMaskLedgerKey = key;
  m.getCurrentPageIndex = () => 16;
  m.getTotalPagesForCurrentView = () => 19;
  m.getCachedVerticalRlLogicalPageOffset = () => committed ? 4231 : null;
  m.getNormalizedLogicalScrollLeft = () => 4231;
  m.getRecordedVerticalRlAppliedLeftMask = () => 39;
  m.getVerticalRlAppliedContentShift = () => 0;
  m.getPageAdvance = () => 312;
  m.getVerticalRlEdgeMaskWidths = () => ({ left: 40, right: 2 });
  m.expandVerticalRlLeftMaskToVisibleLine = () => ({ left: 63, right: 2 });
  m.getVerticalRlSequentialTerminalRightMaskWidth = () => terminal;
  m.getVerticalRlRestoredSemanticMaskWidths = () => restored;
  m.recordVerticalRlAppliedLeftMask = left => { m.recordedLeft = left; };
  m.getVerticalRlViewportClipOverlay = () => overlay;
  m.getVerticalRlEdgeMaskColor = () => "white";
  return m;
 }
 it("preserves the committed source fence when a learned neighbor expands the derived mask", () => {
  const m = manager();
  expect(m.getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBe(39);
  m.syncVerticalRlViewportClip();
  expect(m.container.dataset.epubVrlEdgeMaskLeft).toBe("39");
  expect(m.recordedLeft).toBe(39);
 });
 it("preserves a normal chapter's recorded source fence through content shift", () => {
  const m = manager();
  m._verticalRlActiveTerminalLayout.continuationCount = 0;
  m._verticalRlPreservedPageBoundary = {pageIndex:8,layoutKey:m._verticalRlActiveTerminalLayout.layoutKey,sourceLeftBoundary:3546};
  m.getCurrentPageIndex = () => 8;
  m.getCachedVerticalRlLogicalPageOffset = () => 2132;
  m.getNormalizedLogicalScrollLeft = () => 2132;
  m.getRecordedVerticalRlAppliedLeftMask = () => 62;
  m.getVerticalRlAppliedContentShift = () => 43;
  m.expandVerticalRlLeftMaskToVisibleLine = () => ({ left: 61, right: 4 });
  m.syncVerticalRlViewportClip();
  expect(m.container.dataset.epubVrlEdgeMaskLeft).toBe("19");
  expect(m.recordedLeft + m.getVerticalRlAppliedContentShift()).toBe(62);
 });
 it.each([
  [{ committed: false }, 63, 2],
  [{ continuation: 0 }, 63, 2],
  [{ restored: { left: 51, right: 5 } }, 51, 5],
  [{ terminal: 7 }, 0, 7],
 ])("preserves other ownership authorities: %j", (options, left, right) => {
  const m = manager(options);
  m.syncVerticalRlViewportClip();
  expect(m.container.dataset.epubVrlEdgeMaskLeft).toBe(String(left));
  expect(m.container.dataset.epubVrlEdgeMaskRight).toBe(String(right));
 });
});

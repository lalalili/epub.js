import { expect, it } from "vite-plus/test";
import DefaultViewManager from "../../src/managers/default";
import { resolveVerticalRlTerminalContinuationWithObservation } from "../../src/rendering/terminal-continuation";

function firstPage({ pageIndex = 0, offset = 0 } = {}) {
    const manager = Object.create(DefaultViewManager.prototype);
    const view = { iframe: { style: {} }, contents: { window: { devicePixelRatio: 2.75 } } };
    manager.views = { first: () => view, last: () => view };
    manager.container = { clientWidth: 393, dataset: {} };
    manager.layout = { pageWidth: 393.0909118652344 };
    manager.isRtlVerticalPaginated = () => true;
    manager.getPageAdvance = () => 384;
    manager.getTotalPagesForCurrentView = () => 23;
    manager.getMaxLogicalScrollLeft = () => 8448;
    manager.getCurrentPageIndex = () => pageIndex;
    manager.getVerticalRlLogicalPageOffsetCacheKey = () => "same-source-layout";
    manager.getNormalizedLogicalScrollLeft = () => offset;
    return manager;
}

it("does not populate the origin cache while the first painted source fence is still settling", () => {
    const manager = firstPage();
    manager.recordVerticalRlAppliedLeftMask(24);
    expect(manager.getRecordedVerticalRlAppliedLeftMask(0)).toBe(24);
    expect(manager.getCachedVerticalRlLogicalPageOffset(0, "same-source-layout")).toBeNull();
    expect(manager.getCachedVerticalRlLogicalPageOffset(0, "changed-source-layout")).toBeNull();
});

it.each([
    { pageIndex: 0, offset: 0.3636363744735718 },
    { pageIndex: 1, offset: 0 },
])("does not infer a first-page origin from ambiguous position %j", (position) => {
    const manager = firstPage(position);
    manager.recordVerticalRlAppliedLeftMask(24);
    expect(
        manager.getCachedVerticalRlLogicalPageOffset(position.pageIndex, "same-source-layout"),
    ).toBeNull();
});

function returningPage({ sameLayout = true, recorded = 24, preserve = true } = {}) {
    const manager = firstPage({ pageIndex: 1, offset: 369.0909118652344 });
    manager.settings = {
        axis: "horizontal",
        direction: "rtl",
        rtlScrollType: "negative",
        writingMode: "vertical-rl",
    };
    manager.container.scrollLeft = -369.0909118652344;
    manager.container.scrollWidth = 8841;
    manager.layout.effectivePageAdvance = 384;
    manager.views.first().width = () => 8841.090911865234;
    manager.getVerticalRlVisualContentWidth = () => 8841.090911865234;
    manager.syncVerticalRlViewportClip = () => {};
    manager.getVerticalRlTerminalLayout = () => null;
    manager.getBaseGeometryPageCount = () => 23;
    manager.getPageSnapTolerance = () => 1;
    manager.getPageBoundaryShift = () => 0;
    manager.getVerticalRlPageOffset = () => 0;
    manager._verticalRlAppliedLeftMaskLedger = { 0: recorded };
    manager._verticalRlAppliedLeftMaskLedgerKey = sameLayout
        ? "same-source-layout"
        : "obsolete-layout";
    manager.scrollTo = (left) => {
        manager.container.scrollLeft = left;
    };
    manager.scrollToLogicalPage(0, { preserveCachedBoundary: preserve });
    return manager;
}

it("preserves the committed 24px source cut when reverse entry has no cached first-page offset", () => {
    const manager = returningPage();
    expect(manager._verticalRlPreservedPageBoundary?.sourceLeftBoundary).toBe(8472);
    expect(manager.getCachedVerticalRlLogicalPageOffset(0, "same-source-layout")).toBe(0);
});

it("preserves a proved zero source cut when reverse entry has no cached first-page offset", () => {
    const manager = returningPage({ recorded: 0 });
    expect(manager._verticalRlPreservedPageBoundary?.sourceLeftBoundary).toBe(8448);
    expect(manager.getCachedVerticalRlLogicalPageOffset(0, "same-source-layout")).toBe(0);
});

it.each([
    { sameLayout: false },
    { recorded: NaN },
    { recorded: null },
    { recorded: -1 },
    { preserve: false },
])("does not restore an unproved first-page source cut %j", (options) => {
    const manager = returningPage(options);
    expect(manager._verticalRlPreservedPageBoundary?.sourceLeftBoundary).toBeUndefined();
});

function recreatedFirstPage({ offset = 0, cached = 0, sameLayout = true, fence = 24 } = {}) {
    const manager = firstPage({ offset });
    manager._verticalRlActiveTerminalLayout = {
        layoutKey: "same-source-layout",
        continuationCount: 0,
    };
    manager._verticalRlAppliedLeftMaskLedgerKey = sameLayout
        ? "same-source-layout"
        : "obsolete-layout";
    manager._verticalRlAppliedLeftMaskLedger = { 0: fence };
    manager._verticalRlLogicalPageOffsetCache =
        cached === null ? null : { key: "same-source-layout", offsets: { 0: cached } };
    manager._verticalRlPreservedPageBoundary = null;
    return manager;
}

it("retains the committed first-page source fence after recreating its same-layout view at the exact learned origin", () => {
    expect(recreatedFirstPage().getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBe(24);
});

it.each([
    { cached: null },
    { sameLayout: false },
    { offset: 1, cached: 1 },
    { fence: 0 },
    { fence: 97 },
])("does not infer recreated first-page ownership without exact valid evidence %j", (options) => {
    expect(
        recreatedFirstPage(options).getVerticalRlCommittedLeftMaskForCurrentOffset(96),
    ).toBeNull();
});

function recreatedInteriorPage({
    recreated = true,
    sameLayout = true,
    offset = 2579,
    cached = 2579,
    fence = 20,
} = {}) {
    const manager = firstPage({ pageIndex: 3, offset });
    manager.getTotalPagesForCurrentView = () => 5;
    const view = manager.views.first();
    const state = resolveVerticalRlTerminalContinuationWithObservation(
        undefined,
        "same-source-layout",
        { view: recreated ? {} : view },
    );
    state.appliedLeftMasks = { 3: fence };
    if (recreated) {
        resolveVerticalRlTerminalContinuationWithObservation(state, state.layoutKey, { view });
    }
    manager._verticalRlActiveTerminalLayout = state;
    manager._verticalRlAppliedLeftMaskLedgerKey = sameLayout
        ? "same-source-layout"
        : "other-layout";
    manager._verticalRlAppliedLeftMaskLedger = { 3: fence };
    manager._verticalRlLogicalPageOffsetCache =
        cached === null
            ? null
            : {
                  key: "same-source-layout",
                  offsets: { 3: cached },
              };
    manager.getVerticalRlAppliedContentShift = () => 0;
    return manager;
}

it("retains the learned 20px interior source fence when its same-layout view is recreated at offset 2579", () => {
    expect(recreatedInteriorPage().getVerticalRlCommittedLeftMaskForCurrentOffset(217)).toBe(20);
});

it.each([
    { recreated: false },
    { sameLayout: false },
    { offset: 2580 },
    { cached: null },
    { fence: 0 },
    { fence: 218 },
])(
    "does not freeze an interior source fence without valid recreated-view evidence %j",
    (options) => {
        expect(
            recreatedInteriorPage(options).getVerticalRlCommittedLeftMaskForCurrentOffset(217),
        ).toBeNull();
    },
);

it("marks recreation only for a different View of the same layout", () => {
    const first = {};
    const second = {};
    const state = resolveVerticalRlTerminalContinuationWithObservation(undefined, "layout", {
        view: first,
    });
    expect(state.hasRecreatedView).not.toBe(true);
    expect(
        resolveVerticalRlTerminalContinuationWithObservation(state, "layout", { view: first }),
    ).toBe(state);
    expect(state.hasRecreatedView).not.toBe(true);
    expect(
        resolveVerticalRlTerminalContinuationWithObservation(state, "layout", { view: second }),
    ).toBe(state);
    expect(state.hasRecreatedView).toBe(true);
    const changed = resolveVerticalRlTerminalContinuationWithObservation(state, "new-layout", {
        view: second,
    });
    expect(changed).not.toBe(state);
    expect(changed.hasRecreatedView).not.toBe(true);
});

it("lets a recreated View settle an interior page not learned before recreation", () => {
    const manager = firstPage({ pageIndex: 14, offset: 5224 });
    manager.getTotalPagesForCurrentView = () => 36;
    manager.getVerticalRlAppliedContentShift = () => 0;
    const state = resolveVerticalRlTerminalContinuationWithObservation(
        undefined,
        "same-source-layout",
        { view: {} },
    );
    state.appliedLeftMasks = { 3: 40 };
    resolveVerticalRlTerminalContinuationWithObservation(state, "same-source-layout", {
        view: manager.views.first(),
    });
    manager._verticalRlActiveTerminalLayout = state;
    manager._verticalRlAppliedLeftMaskLedgerKey = state.layoutKey;
    manager._verticalRlAppliedLeftMaskLedger = state.appliedLeftMasks;
    manager._verticalRlLogicalPageOffsetCache = {
        key: state.layoutKey,
        offsets: { 14: 5224 },
    };

    manager.recordVerticalRlAppliedLeftMask(23);
    expect(state.hasRecreatedView).toBe(true);
    expect(manager.getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBeNull();
    manager.recordVerticalRlAppliedLeftMask(40);
    expect(manager.getRecordedVerticalRlAppliedLeftMask(14)).toBe(40);
    const nextView = {};
    resolveVerticalRlTerminalContinuationWithObservation(state, state.layoutKey, {
        view: nextView,
    });
    manager.views = { first: () => nextView, last: () => nextView };
    expect(manager.getVerticalRlCommittedLeftMaskForCurrentOffset(96)).toBe(40);
});

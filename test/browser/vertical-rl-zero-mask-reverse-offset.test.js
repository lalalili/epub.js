import { expect, it } from "vite-plus/test";
import DefaultViewManager from "../../src/managers/default";

function learnedPage({
    recorded = 0,
    sameLayout = true,
    applied = false,
    offsetKnown = true,
} = {}) {
    const manager = Object.create(DefaultViewManager.prototype);
    const doc = document.implementation.createHTMLDocument("reverse offset");
    const view = { contents: { document: doc, window: { devicePixelRatio: 1 } } };
    manager.views = { first: () => view, last: () => view };
    manager.container = {
        clientWidth: 1296,
        scrollLeft: -10298,
        dataset: applied ? { epubVrlEdgeMaskLeft: "24" } : {},
    };
    manager.layout = { pageWidth: 1296 };
    manager.isRtlVerticalPaginated = () => true;
    manager.getCurrentPageIndex = () => 8;
    manager.getPageAdvance = () => 1296;
    manager.getTotalPagesForCurrentView = () => 10;
    manager.getMaxLogicalScrollLeft = () => 11664;
    manager.getNormalizedLogicalScrollLeft = () => -manager.container.scrollLeft;
    manager.getVerticalRlVisualContentWidth = () => 12960;
    manager.getVerticalRlLogicalPageOffsetCacheKey = () => "same-source-layout";
    manager.getCachedVerticalRlLogicalPageOffset = () => (offsetKnown ? 10298 : null);
    manager.getVerticalRlAppliedContentShift = () => 0;
    manager.getVerticalRlAppliedEdgeMaskWidths = () => ({ left: applied ? 24 : 0, right: 0 });
    manager.getVerticalRlRenderedEdgeMaskWidths = () => ({ left: 48, right: 0 });
    manager._verticalRlAppliedLeftMaskLedgerKey = sameLayout
        ? "same-source-layout"
        : "changed-layout";
    manager._verticalRlAppliedLeftMaskLedger = recorded === null ? {} : { 8: recorded };
    manager._verticalRlPreservedPageBoundary = {
        pageIndex: 8,
        layoutKey: "same-source-layout",
        sourceLeftBoundary: 1366,
    };
    manager._verticalRlActiveTerminalLayout = {
        layoutKey: "same-source-layout",
        continuationCount: 0,
    };
    return manager;
}

it("restores the learned zero source cut during mask sync before reverse boundary alignment", () => {
    const manager = learnedPage();
    expect(manager.getVerticalRlCommittedLeftMaskForCurrentOffset(324)).toBe(0);
    manager.container.style = {};
    manager.getVerticalRlEdgeMaskWidths = () => ({ left: 48, right: 0 });
    manager.expandVerticalRlLeftMaskToVisibleLine = (masks) => masks;
    manager.getVerticalRlSequentialTerminalRightMaskWidth = () => null;
    manager.getVerticalRlRestoredSemanticMaskWidths = () => null;
    manager.removeVerticalRlViewportClip = () => {};
    manager.syncVerticalRlViewportClip();
    expect(manager.getRecordedVerticalRlAppliedLeftMask(8)).toBe(0);
    expect(manager.getVerticalRlCurrentEffectiveLeftBoundary()).toBe(1366);
    expect(manager.alignVerticalRlPreviousPageBoundary(8, 1366)).toBe(false);
    expect(manager.container.scrollLeft).toBe(-10298);
});

it.each([{ recorded: null }, { offsetKnown: false }, { sameLayout: false }])(
    "does not restore a zero source cut without a proved layout and position %j",
    (options) => {
        expect(learnedPage(options).getVerticalRlCommittedLeftMaskForCurrentOffset(324)).toBeNull();
    },
);

it("retains the learned zero-mask source boundary on reverse entry instead of shifting one column", () => {
    const manager = learnedPage();
    expect(manager.getVerticalRlCurrentEffectiveLeftBoundary()).toBe(1366);
    expect(manager.alignVerticalRlPreviousPageBoundary(8, 1366)).toBe(false);
    expect(manager.container.scrollLeft).toBe(-10298);
});

it.each([{ recorded: null }, { recorded: 24 }, { sameLayout: false }, { offsetKnown: false }])(
    "retains computed boundaries without current-layout proof of a zero painted mask %j",
    (options) => {
        expect(learnedPage(options).getVerticalRlCurrentEffectiveLeftBoundary()).toBe(1414);
    },
);

it("retains an explicitly applied nonzero mask", () => {
    expect(learnedPage({ applied: true }).getVerticalRlCurrentEffectiveLeftBoundary()).toBe(1390);
});

import { describe, expect, it } from "vite-plus/test";
import DefaultViewManager from "../../src/managers/default";

describe("vertical-rl applied zero-mask source boundary", () => {
    function manager({ recorded = 0, applied = 0, dataset = {}, shift = 0 } = {}) {
        const value = Object.create(DefaultViewManager.prototype);
        const view = {};
        value.container = { clientWidth: 1296, dataset };
        value.layout = { pageWidth: 1296 };
        value.views = { first: () => view, last: () => view };
        value.isRtlVerticalPaginated = () => true;
        value.getVerticalRlVisualContentWidth = () => 12960;
        value.getNormalizedLogicalScrollLeft = () => 10298;
        value.getPageAdvance = () => 1296;
        value.getCurrentPageIndex = () => 8;
        value.getRecordedVerticalRlAppliedLeftMask = () => recorded;
        value.getVerticalRlAppliedEdgeMaskWidths = () => ({ left: applied, right: 0 });
        value.getVerticalRlRenderedEdgeMaskWidths = () => ({ left: 48, right: 0 });
        value.getVerticalRlAppliedContentShift = () => shift;
        return value;
    }

    it("uses the observed zero mask after its dataset and overlay are removed", () => {
        expect(manager().getVerticalRlCurrentEffectiveLeftBoundary()).toBe(1366);
    });

    it.each([null, 48])(
        "retains computed fallback without a zero-mask observation: %s",
        (recorded) => {
            expect(manager({ recorded }).getVerticalRlCurrentEffectiveLeftBoundary()).toBe(1414);
        },
    );

    it("honors an explicitly applied mask even when the recorded extent is zero", () => {
        expect(
            manager({
                applied: 48,
                dataset: { epubVrlEdgeMaskLeft: "48" },
            }).getVerticalRlCurrentEffectiveLeftBoundary(),
        ).toBe(1414);
    });

    it("retains the independently applied iframe shift with a zero mask", () => {
        expect(manager({ shift: 22 }).getVerticalRlCurrentEffectiveLeftBoundary()).toBe(1388);
    });
});

describe("vertical-rl replay of a committed zero exclusion", () => {
    function committedZero({
        preserved = true,
        pageIndex = 8,
        recordedOffset = 10298,
        currentOffset = 10298,
        shift = 0,
    } = {}) {
        const value = Object.create(DefaultViewManager.prototype);
        value._verticalRlActiveTerminalLayout = { layoutKey: "same-layout", continuationCount: 0 };
        value._verticalRlAppliedLeftMaskLedgerKey = "same-layout";
        value._verticalRlPreservedPageBoundary = preserved
            ? { pageIndex, layoutKey: "same-layout", sourceLeftBoundary: 1366 }
            : null;
        value.isRtlVerticalPaginated = () => true;
        value.getCurrentPageIndex = () => pageIndex;
        value.getTotalPagesForCurrentView = () => 10;
        value.getCachedVerticalRlLogicalPageOffset = () => recordedOffset;
        value.getNormalizedLogicalScrollLeft = () => currentOffset;
        value.getRecordedVerticalRlAppliedLeftMask = () => 0;
        value.getVerticalRlAppliedContentShift = () => shift;
        return value;
    }

    it("replays a source-proven zero instead of re-expanding its excluded column", () => {
        expect(committedZero().getVerticalRlCommittedLeftMaskForCurrentOffset(324)).toBe(0);
    });

    it.each([
        ["initial measurement", { preserved: false }],
        [
            "initial first page",
            { preserved: false, pageIndex: 0, recordedOffset: 0, currentOffset: 0 },
        ],
        ["changed offset", { currentOffset: 10346 }],
        ["negative physical mask", { shift: 16 }],
    ])("does not freeze a zero exclusion during %s", (_name, options) => {
        expect(
            committedZero(options).getVerticalRlCommittedLeftMaskForCurrentOffset(324),
        ).toBeNull();
    });

    it.each([
        ["different layout", { layoutKey: "other-layout" }],
        ["different page", { pageIndex: 7 }],
        ["unproven source boundary", { sourceLeftBoundary: undefined }],
    ])("requires the same source fence after %s", (_name, patch) => {
        const value = committedZero();
        Object.assign(value._verticalRlPreservedPageBoundary, patch);
        expect(value.getVerticalRlCommittedLeftMaskForCurrentOffset(324)).toBeNull();
    });
});

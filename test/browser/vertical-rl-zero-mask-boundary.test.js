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

import { it, expect } from "vite-plus/test";
import DefaultViewManager from "../../src/managers/default";

it.each([
    {
        name: "WebView device-pixel readback",
        planned: 357,
        actual: 357.0909118652344,
        dpr: 2.75,
        expected: 9,
    },
    { name: "exact learned offset", planned: 357, actual: 357, dpr: 2.75, expected: 9 },
    {
        name: "existing float32 readback",
        planned: 4938.909090909091,
        actual: 4938.9091796875,
        dpr: 2.75,
        expected: 9,
    },
    {
        name: "neighboring device pixel",
        planned: 357,
        actual: 357.4545593261719,
        dpr: 2.75,
        expected: null,
    },
    {
        name: "neighboring float32 value",
        planned: 357,
        actual: 357.0909423828125,
        dpr: 2.75,
        expected: null,
    },
    {
        name: "missing pixel ratio",
        planned: 357,
        actual: 357.0909118652344,
        dpr: undefined,
        expected: null,
    },
])(
    "retains the source fence only at the proved page position: $name",
    ({ planned, actual, dpr, expected }) => {
        const manager = Object.create(DefaultViewManager.prototype);
        const key = "device-pixel-layout";
        const view = { iframe: { style: {} }, contents: { window: { devicePixelRatio: dpr } } };
        manager.views = { first: () => view, last: () => view };
        manager.container = { clientWidth: 393, dataset: {} };
        manager.layout = { pageWidth: 393 };
        manager.isRtlVerticalPaginated = () => true;
        manager.getPageAdvance = () => 384;
        manager.getTotalPagesForCurrentView = () => 4;
        manager.getMaxLogicalScrollLeft = () => 768;
        manager.getCurrentPageIndex = () => 1;
        manager.getVerticalRlLogicalPageOffsetCacheKey = () => key;
        manager._verticalRlLogicalPageOffsetCache = { key, offsets: { 1: planned } };
        manager.getNormalizedLogicalScrollLeft = () => actual;
        manager.recordVerticalRlAppliedLeftMask(9);
        expect(manager.getRecordedVerticalRlAppliedLeftMask(1)).toBe(expected);
    },
);

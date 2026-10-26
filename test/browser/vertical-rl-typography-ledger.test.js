import { afterEach, expect, it } from "vite-plus/test";
import DefaultViewManager from "../../src/managers/default";

const frames = [];
afterEach(() => {
    for (const frame of frames.splice(0)) frame.remove();
});

function fixture() {
    const frame = document.createElement("iframe");
    frame.style.cssText = "width:786px;height:654px;border:0";
    document.body.appendChild(frame);
    frames.push(frame);
    const doc = frame.contentDocument;
    doc.body.style.cssText = "margin:0;writing-mode:vertical-rl;direction:ltr;font:16px/32px serif";
    doc.body.textContent = "Generic typography ledger fixture";
    const view = { contents: { document: doc }, section: {} };
    const manager = Object.create(DefaultViewManager.prototype);
    manager.container = { clientWidth: 393, clientHeight: 654 };
    manager.views = { first: () => view, last: () => view };
    manager.layout = { pageWidth: 393, width: 393, edgeGuardPx: 0 };
    manager.isRtlVerticalPaginated = () => true;
    manager.getBaseGeometryPageCount = () => 2;
    manager.getVerticalRlVisualContentWidth = () => 786;
    manager.getPageAdvance = () => 393;
    return { manager, doc };
}

it("does not reuse a source cut after typography changes on an equal-sized rail", () => {
    const { manager, doc } = fixture();
    const oldKey = manager.getVerticalRlLogicalPageOffsetCacheKey(2, 393);
    manager.cacheVerticalRlLogicalPageOffset(1, 231, oldKey);
    doc.body.style.fontSize = "18px";
    doc.body.style.lineHeight = "28.8px";
    const currentKey = manager.getVerticalRlLogicalPageOffsetCacheKey(2, 393);
    expect(manager.getCachedVerticalRlLogicalPageOffset(1, currentKey)).toBeNull();
    expect(currentKey).not.toBe(oldKey);
});

it("reuses a source cut when an equal-layout document is recreated", () => {
    const first = fixture();
    const recreated = fixture();
    const key = first.manager.getVerticalRlLogicalPageOffsetCacheKey(2, 393);
    first.manager.cacheVerticalRlLogicalPageOffset(1, 231, key);
    recreated.manager._verticalRlLogicalPageOffsetCache =
        first.manager._verticalRlLogicalPageOffsetCache;
    const recreatedKey = recreated.manager.getVerticalRlLogicalPageOffsetCacheKey(2, 393);
    expect(recreatedKey).toBe(key);
    expect(recreated.manager.getCachedVerticalRlLogicalPageOffset(1, recreatedKey)).toBe(231);
});

it("does not reuse a source cut after the available line height changes", () => {
    const { manager } = fixture();
    const key = manager.getVerticalRlLogicalPageOffsetCacheKey(2, 393);
    manager.cacheVerticalRlLogicalPageOffset(1, 231, key);
    manager.container.clientHeight = 600;
    const resizedKey = manager.getVerticalRlLogicalPageOffsetCacheKey(2, 393);
    expect(manager.getCachedVerticalRlLogicalPageOffset(1, resizedKey)).toBeNull();
});

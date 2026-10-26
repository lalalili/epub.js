import { afterEach, expect, it } from "vite-plus/test";
import DefaultViewManager from "../../src/managers/default";
import { captureSemanticCut } from "../../src/rendering/semantic-cut";

const frames = [];
afterEach(() => {
    for (const frame of frames.splice(0)) frame.remove();
});

function fixture(physicalStart) {
    const host = document.createElement("div");
    host.style.cssText = "position:fixed;left:0;top:0;width:393px;height:654px;overflow:hidden";
    const frame = document.createElement("iframe");
    frame.style.cssText = "width:786px;height:654px;border:0";
    host.appendChild(frame);
    document.body.appendChild(host);
    frames.push(host);
    const doc = frame.contentDocument;
    doc.body.style.cssText = "margin:0;position:relative";
    doc.body.innerHTML =
        '<img width="392" height="100" style="display:block"/><span style="position:absolute;left:500px;top:0">generic source</span>';
    const range = doc.createRange();
    range.setStart(doc.querySelector("span").firstChild, 0);
    range.setEnd(doc.querySelector("span").firstChild, 1);
    const section = { href: "generic.xhtml", cfiBase: "/6/2" };
    const view = {
        section,
        iframe: frame,
        contents: { document: doc, range: () => range.cloneRange() },
    };
    const manager = Object.create(DefaultViewManager.prototype);
    manager.views = { first: () => view, last: () => view };
    manager.layout = { pageWidth: 393 };
    manager.isRtlVerticalPaginated = () => true;
    manager.getPageAdvance = () => 393;
    manager.getTotalPagesForCurrentView = () => 2;
    manager.getMaxLogicalScrollLeft = () => 393;
    manager.getVerticalRlVisualContentWidth = () => 786;
    manager.getLogicalOffsetForPageIndex = () => 393 - physicalStart;
    manager.snapVerticalRlLogicalOffsetToTextBoundary = (value) => value;
    manager.getVerticalRlSemanticCandidateObservation = () => ({
        status: "complete",
        fingerprint: "text-only",
        visibleCharacterCount: 1,
    });
    manager.mapping = {
        page: (_contents, _base, start) =>
            Math.abs(start - physicalStart) < 0.01
                ? { start: "start", end: "end" }
                : { start: "other", end: "other" },
    };
    manager.scrollToLogicalPageInLayout = () => {};
    const identity = {
        publicationIdentifier: "generic-media-restore",
        publicationModified: "2026-01-01",
    };
    const descriptor = {
        type: "epubjs-semantic-window",
        version: 1,
        source: { ...identity, ...section },
        layout: {
            flow: "paginated",
            axis: "horizontal",
            direction: "rtl",
            writingMode: "vertical-rl",
        },
        logicalPageIndex: 1,
        anchors: {
            readingStart: { cfi: "start", role: "reading-start" },
            readingEndExclusive: { cfi: "end", role: "reading-end-exclusive" },
        },
    };
    return { manager, descriptor, identity, frame, doc };
}

it("rejects a text-only legacy restore boundary that cuts through a page-sized block image", () => {
    const { manager, descriptor, identity } = fixture(162);
    expect(manager.restoreSemanticWindowDescriptor(descriptor, identity).status).toBe(
        "unavailable",
    );
});

it("keeps a uniquely resolved legacy boundary that contains the whole block image", () => {
    const { manager, descriptor, identity } = fixture(0);
    expect(manager.restoreSemanticWindowDescriptor(descriptor, identity).status).toBe("applied");
});

it("keeps a uniquely resolved text boundary before the block image enters the viewport", () => {
    const { manager, descriptor, identity } = fixture(393);
    expect(manager.restoreSemanticWindowDescriptor(descriptor, identity).status).toBe("applied");
});

it("rejects a text-run semantic cut whose restored viewport bisects a block image", () => {
    const { manager, descriptor, identity, frame, doc } = fixture(162);
    frame.style.position = "relative";
    frame.style.left = "-162px";
    descriptor.semanticCut = captureSemanticCut(doc, frame, "/6/2");
    expect(descriptor.semanticCut).not.toBeNull();
    expect(manager.restoreSemanticWindowDescriptor(descriptor, identity).status).toBe(
        "unavailable",
    );
});

import { expect, it } from "vite-plus/test";
import Contents from "../../src/contents";
import fixture from "../fixtures/vertical-rl-initial-frame-geometry.json";

function createReplay() {
    const contents = Object.create(Contents.prototype);
    let current;
    contents.content = { textContent: "Identical source in every captured frame." };
    contents.documentElement = { getBoundingClientRect: () => current.root };
    contents.document = {
        body: contents.content,
        documentElement: contents.documentElement,
        fonts: { status: "loaded" },
        createRange: () => ({ selectNodeContents() {}, getClientRects: () => current.lineBoxes }),
    };
    contents.window = { getComputedStyle: () => current.style };
    contents.measureVerticalRlRect = () => current.rect;
    contents.isViewportFillingSingleMediaPage = () => false;
    return {
        contents,
        measure(frame) {
            current = frame;
            Object.assign(contents.content, frame.content);
            Object.assign(contents.documentElement, frame.documentElement);
            contents.document.fonts.status = frame.fontsStatus;
            contents.window.innerWidth = frame.innerWidth;
            contents.window.devicePixelRatio = frame.dpr;
            return contents.verticalRlPageMetrics(fixture.pageWidth, fixture.pageHeight);
        },
    };
}

it("remeasures the preset independently of the initial author-size frame", () => {
    const replay = createReplay();
    const metrics = [replay.measure(fixture.frames[0])];
    replay.contents.invalidateVerticalRlMetricsCache();
    for (const frame of fixture.frames.slice(1)) metrics.push(replay.measure(frame));
    // Keep the captured old1119 result in the fixture; the viewport witness is
    // the same1147.0909 extent required by the existing fractional-frame test.
    expect(metrics.map((metric) => metric.snappedContentWidth)).toEqual([
        fixture.frames[0].observed.snappedContentWidth,
        1147.0909118652344,
        1147.0909118652344,
        1147.0909118652344,
    ]);
    expect(metrics.map((metric) => metric.linePitch)).toEqual(
        fixture.frames.map((frame) => frame.observed.linePitch),
    );
});

it("measures the same proper-preset source independently of its initial frame width", () => {
    const rawFrames = structuredClone(fixture.frames);
    const metrics = fixture.frames.slice(1).map((frame) => createReplay().measure(frame));
    expect(metrics.map((metric) => metric.linePitch)).toEqual([29, 29, 29]);
    const viewportWidth = metrics[1].snappedContentWidth;
    expect(metrics.map((metric) => metric.snappedContentWidth)).toEqual([
        viewportWidth,
        viewportWidth,
        viewportWidth,
    ]);
    expect(fixture.frames).toEqual(rawFrames);
});

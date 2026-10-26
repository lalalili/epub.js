import { afterEach, expect, it } from "vite-plus/test";
import { refreshCombinedTextPaint } from "../../src/rendering/combined-text-paint";

const frames = [];

afterEach(() => {
    for (const frame of frames.splice(0)) frame.remove();
});

async function fixture(style = "") {
    const frame = document.createElement("iframe");
    frames.push(frame);
    const ready = new Promise((resolve) => frame.addEventListener("load", resolve, { once: true }));
    frame.srcdoc = `<html><body style="writing-mode:vertical-rl"><span id="run" style="text-combine-upright:all;${style}">123</span></body></html>`;
    document.body.append(frame);
    await ready;
    const doc = frame.contentDocument;
    const element = doc.getElementById("run");
    const rect = element.getBoundingClientRect();
    return {
        doc,
        element,
        clip: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
    };
}

it("invalidates only a complete combined run and preserves geometry and source identity", async () => {
    const { doc, element, clip } = await fixture();
    const node = element.firstChild;
    const before = element.getBoundingClientRect().toJSON();
    expect(refreshCombinedTextPaint(doc, { ...clip, left: clip.left + 1 })).toBe(0);
    expect(refreshCombinedTextPaint(doc, clip)).toBe(1);
    expect(element.firstChild).toBe(node);
    expect(element.getBoundingClientRect().toJSON()).toEqual(before);
    expect(refreshCombinedTextPaint(doc, clip)).toBe(0);
});

it("restores authored hints when the run leaves and invalidates it again on reentry", async () => {
    const { doc, element, clip } = await fixture("will-change:transform!important;color:red");
    refreshCombinedTextPaint(doc, clip);
    expect(element.style.willChange).toBe("transform, contents");
    refreshCombinedTextPaint(doc, { ...clip, left: clip.right + 1 });
    expect(element.style.willChange).toBe("transform");
    expect(element.style.getPropertyPriority("will-change")).toBe("important");
    expect(element.style.color).toBe("red");
    expect(refreshCombinedTextPaint(doc, clip)).toBe(1);
});

it("preserves external hint updates instead of restoring stale state", async () => {
    const { doc, element, clip } = await fixture();
    refreshCombinedTextPaint(doc, clip);
    element.style.willChange = "opacity";
    refreshCombinedTextPaint(doc, { ...clip, left: clip.right + 1 });
    expect(element.style.willChange).toBe("opacity");
});

it("does not change horizontal content or an authored contents hint", async () => {
    const { doc, element, clip } = await fixture("will-change:contents!important");
    const original = element.getAttribute("style");
    expect(refreshCombinedTextPaint(doc, clip)).toBe(0);
    expect(element.getAttribute("style")).toBe(original);
    element.style.removeProperty("will-change");
    doc.body.style.writingMode = "horizontal-tb";
    expect(refreshCombinedTextPaint(doc, clip)).toBe(0);
    expect(element.style.willChange).toBe("");
});

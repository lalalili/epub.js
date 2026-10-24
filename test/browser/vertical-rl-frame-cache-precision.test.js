import { expect, it } from "vitest";
import Contents from "../../src/contents";
import fixture from "../fixtures/vertical-rl-native-frame-geometry.json";

function replay({ changedSource = false, changedFont = false, changedGeometry = false, dpr = fixture.dpr } = {}) {
	const contents = Object.create(Contents.prototype);
	let current;
	const style = { writingMode: "vertical-rl", direction: "ltr", fontSize: "18px", lineHeight: "28.8px", fontFamily: "fixture font", letterSpacing: "normal" };
	contents.content = { clientWidth: 845, clientHeight: 654, childElementCount: 3, scrollWidth: 845, scrollHeight: 654, textContent: "One unchanged source." };
	contents.documentElement = { clientWidth: 393, clientHeight: 654, scrollWidth: 845, scrollHeight: 654, getBoundingClientRect: () => ({ right: current.rootRight }) };
	contents.document = { body: contents.content, documentElement: contents.documentElement, fonts: { status: "loaded" }, createRange: () => ({ selectNodeContents() {}, getClientRects: () => current.lineBoxes.map(box => ({ ...box, height: 100 })) }) };
	contents.window = { innerWidth: 393, devicePixelRatio: dpr, getComputedStyle: () => style };
	contents.measureVerticalRlRect = () => ({ ...current.rect });
	contents.isViewportFillingSingleMediaPage = () => false;
	return fixture.frames.map((frame, index) => {
		current = structuredClone(frame);
		contents.window.innerWidth = frame.innerWidth;
		contents.documentElement.clientWidth = frame.innerWidth;
		contents.documentElement.scrollWidth = Math.max(845, frame.innerWidth);
		if (index === 1) {
			if (changedSource) contents.content.textContent = "A different source.";
			if (changedFont) style.fontFamily = "a different font";
			if (changedGeometry) {
				current.rect.right += 0.25;
				current.rect.paintWidth += 0.25;
				current.lineBoxes[0].right += 0.25;
				current.lineBoxes[0].width += 0.25;
			}
		}
		const metrics = contents.verticalRlPageMetrics(fixture.pageWidth, fixture.pageHeight);
		return { metrics, frame: structuredClone(contents._verticalRlStableSnappedContentWidth.frameReflow) };
	});
}

it("preserves the measured canvas across Native fractional-root frame translations", () => {
	const result = replay();
	expect(result.map(row => row.metrics.linePitch)).toEqual([29, 29, 29]);
	expect(result.map(row => row.metrics.snappedContentWidth)).toEqual([1147.0909118652344, 1147.0909118652344, 1147.0909118652344]);
	expect(result[1].frame.followsFrame).toBe(true);
});

it.each(["changedSource", "changedFont", "changedGeometry"])("does not classify %s as a frame-only change", key => {
	expect(replay({ [key]: true })[1].frame.followsFrame).toBe(false);
});

it.each([undefined, 0, -1, Number.NaN, 1e7])("rejects uncertain geometry without a usable subpixel precision bound at DPR %s", dpr => {
	// Explicit undefined must reach the fake window instead of the helper default.
	expect(replay({ dpr: dpr === undefined ? null : dpr })[1].frame.followsFrame).toBe(false);
});

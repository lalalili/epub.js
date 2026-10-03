import { afterEach, expect, it } from "vitest";
import Contents from "../../src/contents";

const fixtures = [];
const nextFrame = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

afterEach(() => {
	for (const { contents, iframe } of fixtures.splice(0)) {
		contents.destroy();
		iframe.remove();
	}
});

async function createContents() {
	const iframe = document.createElement("iframe");
	iframe.style.cssText = "width:11606px;height:752px;border:0";
	const loaded = new Promise(resolve => iframe.addEventListener("load", resolve, { once: true }));
	iframe.srcdoc = `<style>html{height:752px}body{margin:0;writing-mode:vertical-rl;direction:ltr;font:18px/1.6 monospace;height:752px}p{margin:0}</style><p>${"Frame origin preserves the same source layout. ".repeat(320)}</p>`;
	document.body.append(iframe);
	await loaded;
	await iframe.contentDocument.fonts.ready;
	const contents = new Contents(iframe.contentDocument);
	fixtures.push({ contents, iframe });
	return { contents, iframe };
}

it("keeps real vertical text measurement idempotent after frame-only translation", async () => {
	const { contents, iframe } = await createContents();
	const initial = contents.verticalRlPageMetrics(374.390625, 752);
	const range = contents.document.createRange();
	range.selectNodeContents(contents.content);
	const before = range.getBoundingClientRect();
	iframe.style.width = `${Math.round(initial.snappedContentWidth)}px`;
	await nextFrame();
	const after = range.getBoundingClientRect();
	expect(after.width).toBe(before.width);
	expect(after.left).not.toBe(before.left);
	for (let i = 0; i < 5; i += 1) {
		contents.invalidateVerticalRlMetricsCache();
		const measured = contents.verticalRlPageMetrics(374.390625, i % 2 ? 752 : undefined);
		expect(measured.snappedContentWidth).toBe(initial.snappedContentWidth);
		iframe.style.width = `${Math.round(measured.snappedContentWidth)}px`;
		await nextFrame();
	}
});

it("remeasures actual source reflow and a changed typography profile", async () => {
	const { contents, iframe } = await createContents();
	const before = contents.verticalRlPageMetrics(374.390625, 752);
	iframe.style.width = `${Math.round(before.snappedContentWidth)}px`;
	await nextFrame();
	contents.content.querySelector("p").textContent = "Short source.";
	contents.invalidateVerticalRlMetricsCache();
	const shortened = contents.verticalRlPageMetrics(374.390625, 752);
	expect(shortened.rawPaintWidth).toBeLessThan(before.rawPaintWidth);
	expect(shortened.snappedContentWidth).toBeLessThan(before.snappedContentWidth);
	contents.content.querySelector("p").textContent = "Frame origin preserves the same source layout. ".repeat(320);
	contents.content.style.fontSize = "28px";
	await nextFrame();
	contents.invalidateVerticalRlMetricsCache();
	const changed = contents.verticalRlPageMetrics(393, 654);
	expect(changed.rawPaintWidth).toBeGreaterThan(before.rawPaintWidth);
	expect(changed.snappedContentWidth).not.toBe(before.snappedContentWidth);
});

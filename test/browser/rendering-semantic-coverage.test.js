import { afterEach, describe, expect, it } from "vitest";
import {
	collectVerticalRlSemanticRects,
	getVerticalRlSemanticCoverage,
} from "../../src/rendering/boundary-mask";

describe("vertical-rl semantic coverage measurement", () => {
	const fixtures = [];

	afterEach(() => {
		fixtures.splice(0).forEach((fixture) => fixture.remove());
	});

	it("collects visible text, tcy and footnote-like inline rects without retaining正文", () => {
		const root = document.createElement("div");
		root.style.cssText = "writing-mode:vertical-rl;width:320px;height:120px;font:16px/20px monospace";
		root.innerHTML = [
			'<span class="body-text">alpha</span>',
			'<span class="tcy" epub:type="noteref">[</span>',
			'<span class="footnote-marker">1</span>',
			'<span aria-hidden="true">hidden</span>',
			'<span style="display:none">displayed-none</span>',
			'<script>script-text</script>',
		].join("");
		document.body.appendChild(root);
		fixtures.push(root);

		const rects = collectVerticalRlSemanticRects(document, window, root);

		expect(rects).toBeTruthy();
		expect(rects.length).toBeGreaterThan(0);
		expect(rects.some((rect) => rect.category === "tcy")).toBe(true);
		expect(rects.some((rect) => rect.category === "footnote-marker")).toBe(true);
		expect(rects.every((rect) => !Object.prototype.hasOwnProperty.call(rect, "text"))).toBe(true);
		expect(rects.every((rect) => !Object.prototype.hasOwnProperty.call(rect, "textContent"))).toBe(true);
	});

	it("reports fully owned, clipped and uncovered semantic rects separately", () => {
		const rects = [
			{ left: 10, right: 20, category: "text", structureHash: "owned" },
			{ left: 95, right: 105, category: "tcy", structureHash: "clipped" },
			{ left: 140, right: 150, category: "footnote-marker", structureHash: "uncovered" },
		];

		const coverage = getVerticalRlSemanticCoverage(
			rects,
			{ left: 0, right: 100 },
			[{ left: 20, right: 80 }],
			{ maxScrollHasRoom: true },
		);

		expect(coverage.semanticRectCount).toBe(3);
		expect(coverage.partiallyClippedCurrentRawViewportCount).toBe(1);
		expect(coverage.uncoveredSemanticRectCount).toBe(2);
		expect(coverage.semanticContentRemainingBeforeCurrentPage).toBe(true);
		expect(coverage.maxScrollHasRoom).toBe(true);
	});
});

import { afterEach, describe, expect, it } from "vitest";
import Contents from "../../src/contents";
import EpubCFI from "../../src/epubcfi";

const PAGE_ADVANCE = 802;
const COLUMN_GAP = 40;
const COLUMN_WIDTH = PAGE_ADVANCE - COLUMN_GAP;
const FRAME_WIDTH = PAGE_ADVANCE * 12;
const FRAME_HEIGHT = 345;
const CFI_BASE = "/6/2[chapter]";

describe("Contents collapsed CFI character ownership", () => {
	const fixtures = [];

	afterEach(() => {
		fixtures.splice(0).forEach(({ contents, iframe }) => {
			contents.destroy();
			iframe.remove();
		});
	});

	function round(value) {
		return Math.round(Number(value) * 100) / 100;
	}

	function createFixture({ direction = "rtl", text }) {
		const iframe = document.createElement("iframe");
		iframe.style.width = FRAME_WIDTH + "px";
		iframe.style.height = FRAME_HEIGHT + "px";
		document.body.appendChild(iframe);

		const frameDocument = iframe.contentDocument;
		const body = frameDocument.body;
		body.innerHTML = `<p>${text}</p>`;
		const textNode = body.querySelector("p").firstChild;
		const contents = new Contents(frameDocument, body);
		contents.columns(
			PAGE_ADVANCE,
			FRAME_HEIGHT,
			COLUMN_WIDTH,
			COLUMN_GAP,
			direction
		);
		fixtures.push({ contents, iframe });

		return { contents, frameDocument, textNode };
	}

	function expectedCharacterRange(frameDocument, textNode, offset) {
		const range = frameDocument.createRange();
		const text = textNode.textContent;

		if (offset < text.length) {
			const codePoint = text.codePointAt(offset);
			range.setStart(textNode, offset);
			range.setEnd(textNode, offset + (codePoint > 0xFFFF ? 2 : 1));
		} else {
			const codePoints = Array.from(text);
			const lastCodePointLength = codePoints[codePoints.length - 1].length;
			range.setStart(textNode, offset - lastCodePointLength);
			range.setEnd(textNode, offset);
		}

		return range;
	}

	function measure({ direction, text, offsetRatio = 0.62, atEnd = false }) {
		const { contents, frameDocument, textNode } = createFixture({ direction, text });
		const offset = atEnd
			? textNode.textContent.length
			: Math.floor(textNode.textContent.length * offsetRatio);
		const collapsedRange = frameDocument.createRange();
		collapsedRange.setStart(textNode, offset);
		collapsedRange.collapse(true);
		const cfi = new EpubCFI(collapsedRange, CFI_BASE).toString();
		const roundTripRange = new EpubCFI(cfi).toRange(frameDocument);
		const characterRange = expectedCharacterRange(frameDocument, textNode, offset);
		const characterRect = characterRange.getBoundingClientRect();
		const engineLocation = contents.locationOf(cfi);
		const evidence = {
			cfi,
			offset,
			character: {
				left: round(characterRect.left),
				right: round(characterRect.right),
				pageIndex: Math.floor(characterRect.left / PAGE_ADVANCE)
			},
			locationOf: {
				left: round(engineLocation.left),
				top: round(engineLocation.top),
				pageIndex: Math.floor(engineLocation.left / PAGE_ADVANCE)
			},
			pageDelta:
				Math.floor(characterRect.left / PAGE_ADVANCE)
				- Math.floor(engineLocation.left / PAGE_ADVANCE)
		};

		expect(roundTripRange.startContainer).toBe(textNode);
		expect(roundTripRange.startOffset).toBe(offset);
		return evidence;
	}

	it.each([
		{
			label: "unspaced CJK horizontal RTL",
			direction: "rtl",
			text: "無空白中文定位片段".repeat(900)
		},
		{
			label: "unspaced CJK horizontal LTR",
			direction: "ltr",
			text: "無空白中文定位片段".repeat(900)
		},
		{
			label: "spaced English horizontal RTL",
			direction: "rtl",
			text: "spaced English locator ownership text ".repeat(900)
		},
		{
			label: "spaced English horizontal LTR",
			direction: "ltr",
			text: "spaced English locator ownership text ".repeat(900)
		}
	])("uses the target character page for $label", (scenario) => {
		const evidence = measure(scenario);
		console.info("contents-cfi-character-ownership", JSON.stringify({
			label: scenario.label,
			...evidence
		}));

		expect(evidence.locationOf.pageIndex).toBe(evidence.character.pageIndex);
	});

	it("uses the preceding complete code point at a text-node end", () => {
		const evidence = measure({
			direction: "rtl",
			text: "無空白中文定位片段".repeat(600) + "😀",
			atEnd: true
		});
		console.info("contents-cfi-node-end-ownership", JSON.stringify(evidence));

		expect(evidence.locationOf.pageIndex).toBe(evidence.character.pageIndex);
		expect(evidence.locationOf.left).toBe(evidence.character.left);
	});
});

import { afterEach, describe, expect, it } from "vitest";
import Contents from "../../src/contents";
import EpubCFI from "../../src/epubcfi";

const FRAME_HEIGHT = 345;
const CFI_BASE = "/6/2[chapter]";
const PAGE_ADVANCES = [640, 700, 760, 802, 850, 900, 1000];
const TEXT_FRAGMENT = "無空白中文定位片段";
const TEXT_REPEAT_COUNTS = [450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, 725];

describe("Contents collapsed CFI page-boundary characterization", () => {
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

	function expectedCharacterRange(frameDocument, textNode, offset) {
		const range = frameDocument.createRange();
		const codePoints = Array.from(textNode.textContent);
		const lastCodePointLength = codePoints[codePoints.length - 1].length;

		range.setStart(textNode, offset - lastCodePointLength);
		range.setEnd(textNode, offset);

		return range;
	}

	function measure(pageAdvance, repeatCount = 600) {
		const iframe = document.createElement("iframe");
		const columnGap = 40;
		const columnWidth = pageAdvance - columnGap;

		iframe.style.width = pageAdvance * 12 + "px";
		iframe.style.height = FRAME_HEIGHT + "px";
		document.body.appendChild(iframe);

		const frameDocument = iframe.contentDocument;
		const body = frameDocument.body;
		body.innerHTML = `<p>${TEXT_FRAGMENT.repeat(repeatCount)}😀</p>`;
		const textNode = body.querySelector("p").firstChild;
		const contents = new Contents(frameDocument, body);
		contents.columns(
			pageAdvance,
			FRAME_HEIGHT,
			columnWidth,
			columnGap,
			"rtl"
		);
		fixtures.push({ contents, iframe });

		const offset = textNode.textContent.length;
		const collapsedRange = frameDocument.createRange();
		collapsedRange.setStart(textNode, offset);
		collapsedRange.collapse(true);
		const cfi = new EpubCFI(collapsedRange, CFI_BASE).toString();
		const roundTripRange = new EpubCFI(cfi).toRange(frameDocument);
		const characterRect = expectedCharacterRange(
			frameDocument,
			textNode,
			offset
		).getBoundingClientRect();
		const location = contents.locationOf(cfi);
		const characterPageIndex = Math.floor(characterRect.left / pageAdvance);
		const locationPageIndex = Math.floor(location.left / pageAdvance);
		const visibleSlice = {
			left: characterPageIndex * pageAdvance,
			right: (characterPageIndex + 1) * pageAdvance
		};

		return {
			pageAdvance,
			repeatCount,
			cfi,
			textNodeLength: textNode.textContent.length,
			offset,
			character: {
				left: round(characterRect.left),
				right: round(characterRect.right),
				pageIndex: characterPageIndex
			},
			locationOf: {
				left: round(location.left),
				pageIndex: locationPageIndex
			},
			physicalLeftDelta: round(location.left - characterRect.left),
			pageDelta: characterPageIndex - locationPageIndex,
			locationInsideCharacterSlice:
				location.left >= visibleSlice.left &&
				location.left < visibleSlice.right,
			visibleSlice,
			roundTrip: {
				startContainerIsTextNode: roundTripRange.startContainer === textNode,
				startOffset: roundTripRange.startOffset
			}
		};
	}

	it("records collapsed CFI ownership across page-boundary geometries", () => {
		const evidence = PAGE_ADVANCES.map((pageAdvance) => measure(pageAdvance));

		console.info(
			"contents-cfi-page-boundary-characterization",
			JSON.stringify(evidence)
		);

		evidence.forEach((sample) => {
			expect(sample.roundTrip.startContainerIsTextNode).toBe(true);
			expect(sample.roundTrip.startOffset).toBe(sample.offset);
			expect(sample.pageDelta).toBe(0);
			expect(sample.locationInsideCharacterSlice).toBe(true);
		});
	});

	it("sweeps text-node ends across fixed page boundaries", () => {
		const evidence = TEXT_REPEAT_COUNTS.map((repeatCount) =>
			measure(802, repeatCount)
		);

		console.info(
			"contents-cfi-text-end-boundary-sweep",
			JSON.stringify(evidence)
		);

		evidence.forEach((sample) => {
			expect(sample.roundTrip.startContainerIsTextNode).toBe(true);
			expect(sample.roundTrip.startOffset).toBe(sample.offset);
			expect(sample.pageDelta).toBe(0);
			expect(sample.locationInsideCharacterSlice).toBe(true);
		});
	});
});

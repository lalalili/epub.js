import { afterEach, describe, expect, it } from "vitest";
import Contents from "../../src/contents";

const FRAME_WIDTH = 11664;
const PAGE_ADVANCE = 1296;
const COLUMN_GAP = 108;
const COLUMN_WIDTH = PAGE_ADVANCE - COLUMN_GAP;
const VISIBLE_LEFT = 8100;

describe("horizontal RTL fragment boundary characterization", () => {
	const fixtures = [];

	afterEach(() => {
		fixtures.splice(0).forEach((fixture) => {
			fixture.remove();
		});
	});

	function createFixture() {
		const iframe = document.createElement("iframe");
		iframe.style.width = FRAME_WIDTH + "px";
		iframe.style.height = "893px";
		document.body.appendChild(iframe);
		fixtures.push(iframe);

		const frameDocument = iframe.contentDocument;
		const body = frameDocument.body;
		body.innerHTML = Array.from({ length: 80 }, (_, index) => (
			`<p data-index="${index}">`
			+ "水平由右至左分頁邊界測試文字。".repeat(12)
			+ "</p>"
		)).join("");

		const contents = new Contents(frameDocument, body);
		contents.columns(PAGE_ADVANCE, 893, COLUMN_WIDTH, COLUMN_GAP, "rtl");

		return { body, contents, frameDocument };
	}

	function round(value) {
		return Math.round(value * 100) / 100;
	}

	function modulo(value) {
		return round(((value % PAGE_ADVANCE) + PAGE_ADVANCE) % PAGE_ADVANCE);
	}

	function collectCharacterRects(frameDocument) {
		const rects = [];
		const walker = frameDocument.createTreeWalker(
			frameDocument.body,
			NodeFilter.SHOW_TEXT
		);

		while (walker.nextNode()) {
			const node = walker.currentNode;
			for (let offset = 0; offset < node.nodeValue.length; offset += 1) {
				const range = frameDocument.createRange();
				range.setStart(node, offset);
				range.setEnd(node, offset + 1);
				for (const rect of range.getClientRects()) {
					if (rect.width > 0 && rect.height > 0) {
						rects.push({
							left: round(rect.left),
							right: round(rect.right)
						});
					}
				}
			}
		}

		return rects;
	}

	function crossingCount(rects, sliceLeft) {
		const sliceRight = sliceLeft + PAGE_ADVANCE;
		const visibleRects = rects.filter((rect) => (
			rect.right > sliceLeft && rect.left < sliceRight
		));

		return {
			visibleRectCount: visibleRects.length,
			crossingCount: visibleRects.filter((rect) => (
				rect.left < sliceLeft || rect.right > sliceRight
			)).length
		};
	}

	function measure(body, frameDocument) {
		const style = frameDocument.defaultView.getComputedStyle(body);
		const rects = collectCharacterRects(frameDocument);
		const paragraphLefts = Array.from(body.children)
			.map((element) => round(element.getBoundingClientRect().left))
			.filter((left, index, values) => index === 0 || left !== values[index - 1]);
		const runtimeSlice = crossingCount(rects, VISIBLE_LEFT);
		const alignedSlice = crossingCount(
			rects,
			Math.floor(VISIBLE_LEFT / PAGE_ADVANCE) * PAGE_ADVANCE
		);

		return {
			body: {
				left: round(body.getBoundingClientRect().left),
				right: round(body.getBoundingClientRect().right),
				width: round(body.getBoundingClientRect().width)
			},
			columnWidth: style.columnWidth,
			columnGap: style.columnGap,
			paddingLeft: style.paddingLeft,
			paddingRight: style.paddingRight,
			visibleSliceRemainder: modulo(VISIBLE_LEFT),
			paragraphLeftRemainders: Array.from(new Set(paragraphLefts.map(modulo))).sort((a, b) => a - b),
			runtimeSlice,
			alignedSlice
		};
	}

	it("keeps the native Contents.columns fragment lattice aligned with the page rail", () => {
		const { body, contents, frameDocument } = createFixture();

		try {
			const geometry = measure(body, frameDocument);

			expect(geometry).toMatchObject({
				body: {
					left: FRAME_WIDTH - PAGE_ADVANCE,
					right: FRAME_WIDTH,
					width: PAGE_ADVANCE
				},
				columnWidth: COLUMN_WIDTH + "px",
				columnGap: COLUMN_GAP + "px",
				paddingLeft: (COLUMN_GAP / 2) + "px",
				paddingRight: (COLUMN_GAP / 2) + "px",
				visibleSliceRemainder: 324
			});
			expect(geometry.paragraphLeftRemainders).toEqual([54]);
			expect(geometry.runtimeSlice.visibleRectCount).toBeGreaterThan(0);
			expect(geometry.runtimeSlice.crossingCount).toBe(44);
			expect(geometry.alignedSlice.visibleRectCount).toBeGreaterThan(0);
			expect(geometry.alignedSlice.crossingCount).toBe(0);
		} finally {
			contents.destroy();
		}
	});

	it("characterizes the runtime column-width override independently of host navigation", () => {
		const { body, contents, frameDocument } = createFixture();

		try {
			frameDocument.documentElement.style.setProperty("box-sizing", "content-box", "important");
			body.style.setProperty("column-width", PAGE_ADVANCE + "px", "important");

			const geometry = measure(body, frameDocument);

			expect(geometry).toMatchObject({
				columnWidth: PAGE_ADVANCE + "px",
				columnGap: COLUMN_GAP + "px",
				visibleSliceRemainder: 324
			});
			expect(geometry.runtimeSlice.visibleRectCount).toBeGreaterThan(0);
			expect(geometry.runtimeSlice.crossingCount).toBeGreaterThan(0);
			expect(geometry.alignedSlice.crossingCount).toBe(0);
		} finally {
			contents.destroy();
		}
	});
});

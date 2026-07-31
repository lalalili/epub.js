import { afterAll, beforeAll, describe, expect, it } from "vitest";
import EpubCFI from "../../src/epubcfi";

const PAGE_ADVANCE = 802;
const FRAME_HEIGHT = 345;
const CFI_BASE = "/6/2[chapter]";

describe("Contents collapsed CFI WebKit fallback", () => {
	let Contents;
	let originalUserAgentDescriptor;

	beforeAll(async () => {
		originalUserAgentDescriptor = Object.getOwnPropertyDescriptor(
			Navigator.prototype,
			"userAgent"
		);
		Object.defineProperty(Navigator.prototype, "userAgent", {
			configurable: true,
			get: () => "Mozilla/5.0 AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15"
		});
		Contents = (await import("../../src/contents?webkit-fallback-test")).default;
	});

	afterAll(() => {
		Object.defineProperty(
			Navigator.prototype,
			"userAgent",
			originalUserAgentDescriptor
		);
	});

	it("keeps an unspaced CJK collapsed CFI on its character page", () => {
		const iframe = document.createElement("iframe");
		iframe.style.width = (PAGE_ADVANCE * 12) + "px";
		iframe.style.height = FRAME_HEIGHT + "px";
		document.body.appendChild(iframe);
		const frameDocument = iframe.contentDocument;
		const body = frameDocument.body;
		body.innerHTML = `<p>${"無空白中文定位片段".repeat(900)}</p>`;
		const textNode = body.querySelector("p").firstChild;
		const contents = new Contents(frameDocument, body);

		try {
			contents.columns(
				PAGE_ADVANCE,
				FRAME_HEIGHT,
				PAGE_ADVANCE - 40,
				40,
				"rtl"
			);
			const offset = Math.floor(textNode.textContent.length * 0.62);
			const collapsedRange = frameDocument.createRange();
			collapsedRange.setStart(textNode, offset);
			collapsedRange.collapse(true);
			const cfi = new EpubCFI(collapsedRange, CFI_BASE).toString();
			const characterRange = frameDocument.createRange();
			characterRange.setStart(textNode, offset);
			characterRange.setEnd(textNode, offset + 1);
			const characterPage = Math.floor(
				characterRange.getBoundingClientRect().left / PAGE_ADVANCE
			);
			const location = contents.locationOf(cfi);
			const locationPage = Math.floor(location.left / PAGE_ADVANCE);

			console.info("contents-cfi-webkit-fallback", JSON.stringify({
				cfi,
				offset,
				characterPage,
				locationPage,
				location
			}));
			expect(locationPage).toBe(characterPage);
		} finally {
			contents.destroy();
			iframe.remove();
		}
	});
});

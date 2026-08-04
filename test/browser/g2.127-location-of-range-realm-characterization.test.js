import { afterEach, describe, expect, it, vi } from "vitest";
import Contents from "../../src/contents";
import EpubCFI from "../../src/epubcfi";

describe("G2.127 Contents.locationOf fallback Range realm", () => {
	let contents;
	let iframe;

	afterEach(() => {
		contents?.destroy();
		contents = undefined;
		iframe?.remove();
		iframe = undefined;
		vi.restoreAllMocks();
	});

	it("records the constructor used by the WebKit non-collapsed fallback", () => {
		iframe = document.createElement("iframe");
		iframe.style.width = "390px";
		iframe.style.height = "200px";
		document.body.appendChild(iframe);

		const frameDocument = iframe.contentDocument;
		const target = frameDocument.createElement("span");
		target.textContent = "文";
		target.style.display = "block";
		target.style.font = "18px/18px sans-serif";
		frameDocument.body.appendChild(target);

		const frameRange = frameDocument.createRange();
		frameRange.setStart(target.firstChild, 0);
		const fallbackConstructors = [];
		const frameCreatedRanges = [];
		const originalRange = globalThis.Range;

		class ObservedRange extends originalRange {
			constructor(...args) {
				super(...args);
				fallbackConstructors.push(this);
			}
		}

		vi.stubGlobal("Range", ObservedRange);
		vi.spyOn(frameDocument, "createRange").mockImplementation(() => {
			const range = Object.getPrototypeOf(frameDocument).createRange.call(frameDocument);
			frameCreatedRanges.push(range);
			return range;
		});
		vi.spyOn(EpubCFI.prototype, "toRange").mockReturnValue(frameRange);
		contents = new Contents(frameDocument, frameDocument.body);

		const location = contents.locationOf("epubcfi(/6/2!/4/2)");
		const browser = /AppleWebKit/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
			? "webkit"
			: "chromium";
		const fallbackRange = fallbackConstructors[0] || null;
		const frameFallbackRange = frameCreatedRanges[0] || null;

		console.info("g2.127-location-of-range-realm", JSON.stringify({
			browser,
			location,
			frameRangeConstructorMatchesFrame: frameRange.constructor === frameDocument.defaultView.Range,
			fallbackInvocations: fallbackConstructors.length,
			fallbackRangeConstructorMatchesFrame: fallbackRange
				? fallbackRange.constructor === frameDocument.defaultView.Range
				: null,
			frameCreateRangeInvocations: frameCreatedRanges.length,
			frameFallbackRangeConstructorMatchesFrame: frameFallbackRange
				? frameFallbackRange.constructor === frameDocument.defaultView.Range
				: null,
			frameFallbackRangeStartOwnerMatchesFrame: frameFallbackRange
				? (() => {
					try {
						return frameFallbackRange.startContainer.ownerDocument === frameDocument;
					} catch {
						return false;
					}
				})()
				: null,
		}));

		expect(frameRange.constructor === frameDocument.defaultView.Range).toBe(true);
		if (browser === "webkit") {
			expect(fallbackConstructors).toHaveLength(0);
			expect(frameCreatedRanges).toHaveLength(1);
			expect(frameFallbackRange?.constructor === frameDocument.defaultView.Range).toBe(true);
		expect(frameFallbackRange?.startContainer.ownerDocument).toBe(frameDocument);
			expect(location.left).toEqual(expect.any(Number));
		} else {
			expect(fallbackConstructors).toHaveLength(0);
			expect(frameCreatedRanges).toHaveLength(0);
		}
	});
});

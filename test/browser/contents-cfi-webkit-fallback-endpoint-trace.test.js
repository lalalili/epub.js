import { afterEach, describe, expect, it, vi } from "vitest";
import Contents from "../../src/contents";
import EpubCFI from "../../src/epubcfi";

const PAGE_ADVANCE = 802;
const COLUMN_GAP = 40;
const FRAME_HEIGHT = 345;
const CFI_BASE = "/6/2[chapter]";
const TEXT = "無空白中文定位片段".repeat(600) + "😀";

describe("Contents collapsed CFI fallback endpoint trace", () => {
	const fixtures = [];

	afterEach(() => {
		vi.restoreAllMocks();
		fixtures.splice(0).forEach(({ contents, iframe }) => {
			contents.destroy();
			iframe.remove();
		});
	});

	function round(value) {
		return Math.round(Number(value) * 100) / 100;
	}

	function createFixture() {
		const iframe = document.createElement("iframe");
		iframe.style.width = PAGE_ADVANCE * 12 + "px";
		iframe.style.height = FRAME_HEIGHT + "px";
		document.body.appendChild(iframe);

		const frameDocument = iframe.contentDocument;
		const body = frameDocument.body;
		body.innerHTML = `<p>${TEXT}</p>`;
		const textNode = body.querySelector("p").firstChild;
		const contents = new Contents(frameDocument, body);
		contents.columns(
			PAGE_ADVANCE,
			FRAME_HEIGHT,
			PAGE_ADVANCE - COLUMN_GAP,
			COLUMN_GAP,
			"rtl"
		);
		fixtures.push({ contents, iframe });

		return { contents, frameDocument, textNode };
	}

	function traceRangePrototype(rangeConstructor, realm, calls, constructors) {
		if (constructors.has(rangeConstructor)) {
			return;
		}

		constructors.add(rangeConstructor);
		const prototype = rangeConstructor.prototype;

		["setStart", "setEnd", "getBoundingClientRect"].forEach((method) => {
			const original = prototype[method];

			vi.spyOn(prototype, method).mockImplementation(function (...args) {
				const call = {
					realm,
					method,
					startOffset: this.startOffset,
					endOffset: this.endOffset,
					argumentOffset: args[1] ?? null
				};

				const result = original.apply(this, args);

				if (method === "getBoundingClientRect") {
					call.rect = {
						left: round(result.left),
						right: round(result.right),
						top: round(result.top)
					};
				}

				calls.push(call);
				return result;
			});
		});
	}

	it("records source fallback endpoints and raw rect ownership", () => {
		const { contents, frameDocument, textNode } = createFixture();
		const offset = textNode.textContent.length;
		const collapsedRange = frameDocument.createRange();
		collapsedRange.setStart(textNode, offset);
		collapsedRange.collapse(true);
		const cfi = new EpubCFI(collapsedRange, CFI_BASE).toString();
		const calls = [];
		const constructors = new Set();

		traceRangePrototype(globalThis.Range, "top", calls, constructors);
		traceRangePrototype(frameDocument.defaultView.Range, "frame", calls, constructors);

		const location = contents.locationOf(cfi);
		const roundTripRange = new EpubCFI(cfi).toRange(frameDocument);
		const evidence = {
			cfi,
			textNodeLength: textNode.textContent.length,
			offset,
			locationOf: {
				left: round(location.left),
				top: round(location.top),
				pageIndex: Math.floor(location.left / PAGE_ADVANCE)
			},
			roundTrip: {
				startContainerIsTextNode: roundTripRange.startContainer === textNode,
				startOffset: roundTripRange.startOffset,
				endOffset: roundTripRange.endOffset
			},
			calls
		};

		console.info("contents-cfi-webkit-fallback-endpoint-trace", JSON.stringify(evidence));

		expect(evidence.roundTrip.startContainerIsTextNode).toBe(true);
		expect(evidence.roundTrip.startOffset).toBe(offset);

		if (/AppleWebKit/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
			const fallbackRectCall = calls.find(
				(call) => call.method === "getBoundingClientRect" && call.realm === "top"
			);

			expect(fallbackRectCall?.startOffset).toBe(offset - 2);
			expect(fallbackRectCall?.endOffset).toBe(offset);
		}
	});
});

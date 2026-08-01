import { afterEach, describe, expect, it, vi } from "vitest";
import Contents from "../../src/contents";
import EpubCFI from "../../src/epubcfi";

const PAGE_ADVANCE = 802;
const COLUMN_GAP = 40;
const COLUMN_WIDTH = PAGE_ADVANCE - COLUMN_GAP;
const FRAME_WIDTH = PAGE_ADVANCE * 12;
const FRAME_HEIGHT = 345;
const CFI_BASE = "/6/2[chapter]";
const nativeToRange = EpubCFI.prototype.toRange;

describe("Contents locationOf IndexSizeError characterization", () => {
	const fixtures = [];

	afterEach(() => {
		fixtures.splice(0).forEach(({ contents, iframe }) => {
			contents.destroy();
			iframe.remove();
		});
		vi.restoreAllMocks();
	});

	function round(value) {
		return Math.round(Number(value) * 100) / 100;
	}

	function createFixture() {
		const iframe = document.createElement("iframe");
		iframe.style.width = FRAME_WIDTH + "px";
		iframe.style.height = FRAME_HEIGHT + "px";
		document.body.appendChild(iframe);

		const frameDocument = iframe.contentDocument;
		const body = frameDocument.body;
		body.innerHTML = `<p id="target">${"collapsed CFI ownership text ".repeat(900)}</p>`;
		const textNode = body.querySelector("#target").firstChild;
		const contents = new Contents(frameDocument, body);
		contents.columns(
			PAGE_ADVANCE,
			FRAME_HEIGHT,
			COLUMN_WIDTH,
			COLUMN_GAP,
			"rtl"
		);
		fixtures.push({ contents, iframe });

		return { contents, frameDocument, textNode };
	}

	function createCollapsedCfi(frameDocument, textNode) {
		const range = frameDocument.createRange();
		range.setStart(textNode, textNode.length);
		range.collapse(true);

		return new EpubCFI(range, CFI_BASE).toString();
	}

	function measure({ reportedTextExtraLength }) {
		vi.restoreAllMocks();
		const { contents, frameDocument, textNode } = createFixture();
		const cfi = createCollapsedCfi(frameDocument, textNode);
		const nativeLength = textNode.length;
		const originalTextContent = Object.getOwnPropertyDescriptor(textNode, "textContent");
		const setEndCalls = [];
		const consoleErrors = [];

		if (reportedTextExtraLength > 0) {
			Object.defineProperty(textNode, "textContent", {
				configurable: true,
				get: () => "x".repeat(nativeLength + reportedTextExtraLength)
			});
		}

		const RangeConstructor = frameDocument.defaultView.Range;
		const originalSetEnd = RangeConstructor.prototype.setEnd;
		vi.spyOn(RangeConstructor.prototype, "setEnd").mockImplementation(function (node, offset) {
			try {
				return originalSetEnd.call(this, node, offset);
			} catch (error) {
				setEndCalls.push({
					errorName: error.name,
					errorMessage: error.message,
					attemptedOffset: offset,
					nodeLength: node.length
				});
				throw error;
			}
		});
		vi.spyOn(console, "error").mockImplementation((...args) => {
			consoleErrors.push(args.map((argument) => String(argument)).join(" "));
		});

		let locationRange;
		let toRangeCalls = 0;
		vi.spyOn(EpubCFI.prototype, "toRange").mockImplementation(function (...args) {
			const range = nativeToRange.apply(this, args);
			toRangeCalls += 1;
			if (toRangeCalls === 2) {
				locationRange = range;
			}
			return range;
		});

		const rangeBefore = new EpubCFI(cfi).toRange(frameDocument);
		const location = contents.locationOf(cfi);
		const rangeAfter = locationRange;
		const expectedRange = frameDocument.createRange();
		expectedRange.setStart(textNode, nativeLength - 1);
		expectedRange.setEnd(textNode, nativeLength);
		const expectedRect = expectedRange.getBoundingClientRect();
		const owner = rangeAfter.startContainer.parentElement?.id || null;

		if (originalTextContent) {
			Object.defineProperty(textNode, "textContent", originalTextContent);
		} else {
			delete textNode.textContent;
		}

		return {
			cfi,
			nativeNodeLength: nativeLength,
			reportedTextLength: nativeLength + reportedTextExtraLength,
			rangeBefore: {
				startOffset: rangeBefore.startOffset,
				endOffset: rangeBefore.endOffset
			},
			rangeAfter: {
				startOffset: rangeAfter.startOffset,
				endOffset: rangeAfter.endOffset
			},
			setEndCalls,
			consoleErrors,
			location: {
				left: round(location.left),
				top: round(location.top),
				pageIndex: Math.floor(location.left / PAGE_ADVANCE)
			},
			expectedCharacter: {
				left: round(expectedRect.left),
				pageIndex: Math.floor(expectedRect.left / PAGE_ADVANCE)
			},
			visibleOwner: owner,
			startContainerConnected: rangeAfter.startContainer.isConnected,
			startContainerDocumentMatches: rangeAfter.startContainer.ownerDocument === frameDocument
		};
	}

	it("records the first stable Range.setEnd failure and fallback ownership", () => {
		const baseline = measure({ reportedTextExtraLength: 0 });
		const fault = measure({ reportedTextExtraLength: 1 });

		console.info("contents-location-of-index-size-error", JSON.stringify({ baseline, fault }));

		expect(baseline.setEndCalls).toEqual([]);
		expect(fault.setEndCalls).toHaveLength(1);
		expect(fault.setEndCalls[0]).toMatchObject({
			errorName: "IndexSizeError",
			attemptedOffset: fault.nativeNodeLength + 1,
			nodeLength: fault.nativeNodeLength
		});
		expect(fault.consoleErrors[0]).toContain("setting end offset to start container length failed");
		expect(fault.rangeBefore).toEqual({
			startOffset: fault.nativeNodeLength,
			endOffset: fault.nativeNodeLength
		});
		expect(fault.rangeAfter).toEqual(fault.rangeBefore);
		expect(fault.cfi).toBe(baseline.cfi);
		expect(fault.visibleOwner).toBe(baseline.visibleOwner);
		expect(fault.startContainerConnected).toBe(true);
		expect(fault.startContainerDocumentMatches).toBe(true);
		expect(fault.location.pageIndex).toBe(baseline.location.pageIndex);
		expect(fault.location.pageIndex).toBe(fault.expectedCharacter.pageIndex);
	});

	it("characterizes an out-of-range CFI fallback without a Range.setEnd exception", () => {
		const { contents, frameDocument, textNode } = createFixture();
		const exactCfi = createCollapsedCfi(frameDocument, textNode);
		const outOfRangeCfi = exactCfi.replace(
			/:(\d+)\)$/,
			":" + (textNode.length + 1) + ")"
		);
		const normalizedRange = new EpubCFI(outOfRangeCfi).toRange(frameDocument);
		const setEndCalls = [];
		const consoleErrors = [];
		const RangeConstructor = frameDocument.defaultView.Range;
		const originalSetEnd = RangeConstructor.prototype.setEnd;

		vi.spyOn(RangeConstructor.prototype, "setEnd").mockImplementation(function (node, offset) {
			try {
				return originalSetEnd.call(this, node, offset);
			} catch (error) {
				setEndCalls.push({
					errorName: error.name,
					attemptedOffset: offset,
					nodeLength: node.length
				});
				throw error;
			}
		});
		vi.spyOn(console, "error").mockImplementation((...args) => {
			consoleErrors.push(args.map((argument) => String(argument)).join(" "));
		});

		const location = contents.locationOf(outOfRangeCfi);
		const diagnostics = {
			inputCfi: outOfRangeCfi,
			nativeNodeLength: textNode.length,
			normalizedNodeType: normalizedRange.startContainer.nodeType,
			normalizedNodeName: normalizedRange.startContainer.nodeName,
			normalizedStartOffset: normalizedRange.startOffset,
			normalizedEndOffset: normalizedRange.endOffset,
			setEndCalls,
			consoleErrors,
			locationPageIndex: Math.floor(location.left / PAGE_ADVANCE),
			visibleOwner: normalizedRange.startContainer.parentElement?.id || null
		};

		console.info("contents-location-of-cfi-normalization", JSON.stringify(diagnostics));

		expect(normalizedRange.startContainer).not.toBe(textNode);
		expect(normalizedRange.startOffset).not.toBe(textNode.length);
		expect(normalizedRange.endOffset).not.toBe(textNode.length);
		expect(setEndCalls).toEqual([]);
		expect(consoleErrors).toEqual([]);
		expect(diagnostics.visibleOwner).toBeNull();
	});
});

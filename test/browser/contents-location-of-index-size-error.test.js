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

	function serializeRect(rect) {
		return {
			left: round(rect.left),
			right: round(rect.right),
			top: round(rect.top),
			bottom: round(rect.bottom),
			width: round(rect.width),
			height: round(rect.height)
		};
	}

	function serializeRects(range) {
		return Array.from(range.getClientRects()).map(serializeRect);
	}

	function getEndpointVariantDiagnostics({ frameDocument, textNode, nativeLength }) {
		const realms = [
			{
				name: "outer-window",
				createRange: () => new window.Range()
			},
			{
				name: "frame-document",
				createRange: () => frameDocument.createRange()
			}
		];

		return realms.flatMap(({ name, createRange }) => [1, 2, 3].map((width) => {
			const range = createRange();
			range.setStart(textNode, nativeLength - width);
			range.setEnd(textNode, nativeLength);
			const rects = serializeRects(range);
			const rect = serializeRect(range.getBoundingClientRect());
			const pageIndex = Math.floor(rect.left / PAGE_ADVANCE);
			const visibleSlice = {
				left: pageIndex * PAGE_ADVANCE,
				right: (pageIndex + 1) * PAGE_ADVANCE
			};

			return {
				realm: name,
				constructorName: range.constructor?.name || null,
				constructorMatchesFrameWindow: range.constructor === frameDocument.defaultView.Range,
				constructorMatchesOuterWindow: range.constructor === window.Range,
				width,
				startOffset: range.startOffset,
				endOffset: range.endOffset,
				cfi: new EpubCFI(range, CFI_BASE).toString(),
				rect,
				fragments: rects,
				fragmentCount: rects.length,
				pageIndex,
				visibleSlice,
				crossesVisibleSlice: rects.some(
					(fragment) => fragment.left < visibleSlice.left && fragment.right > visibleSlice.left
				),
				owner: range.startContainer.parentElement?.id || null,
				isConnected: range.startContainer.isConnected,
				ownerDocumentMatchesFrame: range.startContainer.ownerDocument === frameDocument
			};
		}));
	}

	function getOrigin(view) {
		try {
			return view.location.origin;
		} catch (_error) {
			return null;
		}
	}

	function getGeometryDiagnostics({ iframe, frameDocument, body, range, expectedRange, location }) {
		const frameWindow = frameDocument.defaultView;
		const frameRoot = frameDocument.documentElement;
		const frameBodyStyle = frameWindow.getComputedStyle(body);
		const iframeStyle = window.getComputedStyle(iframe);
		const rangeConstructor = range.constructor;
		const pageIndex = Math.floor(location.left / PAGE_ADVANCE);
		const visibleSlice = {
			left: pageIndex * PAGE_ADVANCE,
			right: (pageIndex + 1) * PAGE_ADVANCE
		};
		const rangeRects = serializeRects(range);
		const expectedCharacterRects = serializeRects(expectedRange);
		const rangeRect = serializeRect(range.getBoundingClientRect());
		const expectedCharacterRect = serializeRect(expectedRange.getBoundingClientRect());

		return {
			rangeRealm: {
				constructorName: rangeConstructor?.name || null,
				constructorMatchesFrameWindow: rangeConstructor === frameWindow.Range,
				constructorMatchesOuterWindow:
					typeof window.Range === "function" && rangeConstructor === window.Range
			},
			origins: {
				outer: getOrigin(window),
				iframe: getOrigin(frameWindow),
				ownerDocument: getOrigin(frameDocument.defaultView)
			},
			iframe: {
				rect: serializeRect(iframe.getBoundingClientRect()),
				computedTransform: iframeStyle.transform,
				computedTransformOrigin: iframeStyle.transformOrigin,
				offsetWidth: iframe.offsetWidth,
				offsetHeight: iframe.offsetHeight,
				clientWidth: iframe.clientWidth,
				clientHeight: iframe.clientHeight
			},
			frame: {
				devicePixelRatio: frameWindow.devicePixelRatio,
				innerWidth: frameWindow.innerWidth,
				innerHeight: frameWindow.innerHeight,
				scrollX: round(frameWindow.scrollX),
				scrollY: round(frameWindow.scrollY),
				documentElement: {
					clientWidth: frameRoot.clientWidth,
					clientHeight: frameRoot.clientHeight,
					scrollWidth: frameRoot.scrollWidth,
					scrollHeight: frameRoot.scrollHeight,
					scrollLeft: round(frameRoot.scrollLeft),
					scrollTop: round(frameRoot.scrollTop)
				},
				body: {
					clientWidth: body.clientWidth,
					clientHeight: body.clientHeight,
					scrollWidth: body.scrollWidth,
					scrollHeight: body.scrollHeight,
					scrollLeft: round(body.scrollLeft),
					scrollTop: round(body.scrollTop),
					rect: serializeRect(body.getBoundingClientRect()),
					writingMode: frameBodyStyle.writingMode,
					direction: frameBodyStyle.direction,
					transform: frameBodyStyle.transform,
					transformOrigin: frameBodyStyle.transformOrigin,
					zoom: frameBodyStyle.zoom
				}
			},
			page: {
				pageAdvance: PAGE_ADVANCE,
				pageIndex,
				visibleSlice,
				rangeRect,
				expectedCharacterRect,
				rangeFragmentCount: rangeRects.length,
				expectedCharacterFragmentCount: expectedCharacterRects.length,
				rangeFragments: rangeRects,
				expectedCharacterFragments: expectedCharacterRects,
				rangeCrossesVisibleSlice: rangeRects.some(
					(rect) => rect.left < visibleSlice.left && rect.right > visibleSlice.left
				),
				expectedCharacterCrossesVisibleSlice: expectedCharacterRects.some(
					(rect) => rect.left < visibleSlice.left && rect.right > visibleSlice.left
				),
				physicalLeftDelta: round(location.left - expectedCharacterRect.left)
			}
		};
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

		return { contents, frameDocument, iframe, textNode };
	}

	function createCollapsedCfi(frameDocument, textNode) {
		const range = frameDocument.createRange();
		range.setStart(textNode, textNode.length);
		range.collapse(true);

		return new EpubCFI(range, CFI_BASE).toString();
	}

	function measure({ reportedTextExtraLength }) {
		vi.restoreAllMocks();
		const { contents, frameDocument, iframe, textNode } = createFixture();
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

		const fallbackRangeInstances = [];
		const outerRangeConstructor = window.Range;
		function ObservedRange(...args) {
			const range = Reflect.construct(outerRangeConstructor, args);
			fallbackRangeInstances.push(range);
			return range;
		}
		ObservedRange.prototype = outerRangeConstructor.prototype;
		vi.stubGlobal("Range", ObservedRange);

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
		let location;
		try {
			location = contents.locationOf(cfi);
		} finally {
			vi.unstubAllGlobals();
		}
		const rangeAfter = locationRange;
		const expectedRange = frameDocument.createRange();
		expectedRange.setStart(textNode, nativeLength - 1);
		expectedRange.setEnd(textNode, nativeLength);
		const expectedRect = expectedRange.getBoundingClientRect();
		const owner = rangeAfter.startContainer.parentElement?.id || null;
		const fallbackCfi = (() => {
			try {
				return new EpubCFI(rangeAfter, CFI_BASE).toString();
			} catch (_error) {
				return null;
			}
		})();
		const fallbackRanges = fallbackRangeInstances.map((range) => ({
			constructorName: range.constructor?.name || null,
			constructorMatchesOuterWindow: range.constructor === outerRangeConstructor,
			constructorMatchesFrameWindow: range.constructor === frameDocument.defaultView.Range,
			startOffset: range.startOffset,
			endOffset: range.endOffset,
			startContainer: {
				nodeType: range.startContainer?.nodeType || null,
				nodeName: range.startContainer?.nodeName || null,
				nodeLength: typeof range.startContainer?.length === "number"
					? range.startContainer.length
					: null,
				connected: range.startContainer?.isConnected ?? null,
				documentMatchesFrame: range.startContainer?.ownerDocument === frameDocument,
				owner: range.startContainer?.parentElement?.id || null
			},
			endContainer: {
				nodeType: range.endContainer?.nodeType || null,
				nodeName: range.endContainer?.nodeName || null,
				nodeLength: typeof range.endContainer?.length === "number"
					? range.endContainer.length
					: null,
				connected: range.endContainer?.isConnected ?? null,
				documentMatchesFrame: range.endContainer?.ownerDocument === frameDocument,
				owner: range.endContainer?.parentElement?.id || null
			},
			fragments: serializeRects(range)
		}));
		const endpointVariants = getEndpointVariantDiagnostics({
			frameDocument,
			textNode,
			nativeLength
		});

		if (originalTextContent) {
			Object.defineProperty(textNode, "textContent", originalTextContent);
		} else {
			delete textNode.textContent;
		}

		return {
			cfi,
			fallbackCfi,
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
			fallbackRanges,
			endpointVariants,
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
			startContainerDocumentMatches: rangeAfter.startContainer.ownerDocument === frameDocument,
			geometry: getGeometryDiagnostics({
				iframe,
				frameDocument,
				body: frameDocument.body,
				range: rangeAfter,
				expectedRange,
				location
			})
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

	it("records adjacent endpoint geometry across Range realms", () => {
		const baseline = measure({ reportedTextExtraLength: 0 });
		const fault = measure({ reportedTextExtraLength: 1 });
		const evidence = {
			baseline: {
				cfi: baseline.cfi,
				endpointVariants: baseline.endpointVariants
			},
			fault: {
				cfi: fault.cfi,
				endpointVariants: fault.endpointVariants,
				fallbackRanges: fault.fallbackRanges,
				location: fault.location,
				expectedCharacter: fault.expectedCharacter,
				visibleOwner: fault.visibleOwner
			}
		};

		console.info("contents-location-of-endpoint-realm-matrix", JSON.stringify(evidence));

		expect(baseline.endpointVariants).toHaveLength(6);
		expect(fault.endpointVariants).toHaveLength(6);
		expect(new Set(fault.endpointVariants.map((variant) => variant.width))).toEqual(
			new Set([1, 2, 3])
		);
		expect(new Set(fault.endpointVariants.map((variant) => variant.realm))).toEqual(
			new Set(["outer-window", "frame-document"])
		);
		expect(fault.cfi).toBe(baseline.cfi);
		expect(fault.visibleOwner).toBe("target");
		expect(fault.endpointVariants.every((variant) => variant.isConnected)).toBe(true);
		expect(fault.endpointVariants.every((variant) => variant.ownerDocumentMatchesFrame)).toBe(true);
	});

	it("enforces strict physical-left ownership after fallback", () => {
		const baseline = measure({ reportedTextExtraLength: 0 });
		const fault = measure({ reportedTextExtraLength: 1 });
		const evidence = {
			baseline: {
				cfi: baseline.cfi,
				fallbackCfi: baseline.fallbackCfi,
				fallbackRanges: baseline.fallbackRanges,
				location: baseline.location,
				expectedCharacter: baseline.expectedCharacter,
				geometry: baseline.geometry
			},
			fault: {
				cfi: fault.cfi,
				fallbackCfi: fault.fallbackCfi,
				fallbackRanges: fault.fallbackRanges,
				location: fault.location,
				expectedCharacter: fault.expectedCharacter,
				geometry: fault.geometry
			}
		};

		console.info("contents-location-of-physical-left-ownership", JSON.stringify(evidence));

		expect(baseline.location.left).toBe(baseline.expectedCharacter.left);
		expect(fault.location.left).toBe(fault.expectedCharacter.left);
		expect(fault.cfi).toBe(baseline.cfi);
		expect(fault.location.pageIndex).toBe(baseline.location.pageIndex);
		expect(fault.visibleOwner).toBe(baseline.visibleOwner);
		expect(fault.startContainerConnected).toBe(true);
		expect(fault.startContainerDocumentMatches).toBe(true);
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

import { afterEach, describe, expect, it } from "vitest";
import DefaultViewManager from "../../src/managers/default";
import { collectVisibleTextClientRects } from "../../src/platform/traversal";
import {
	getVerticalRlBoundarySnapDelta,
	getVerticalRlBoundarySnapMeasurementInputs,
	getVerticalRlBoundarySnapViewportBounds,
} from "../../src/rendering/boundary-mask";

const CONTENT_WIDTH = 6480;
const FRAME_HEIGHT = 893;
const PAGE_ADVANCE = 1296;
const CURRENT_OFFSET = 2592;
const FRAGMENT = {
	left: 2576,
	right: 2596,
};

describe("vertical-rl manager boundary ownership candidate", () => {
	const fixtures = [];

	afterEach(() => {
		fixtures.splice(0).forEach((iframe) => iframe.remove());
	});

	function createFixture() {
		const container = document.createElement("div");
		const iframe = document.createElement("iframe");
		container.style.width = `${PAGE_ADVANCE}px`;
		container.style.height = `${FRAME_HEIGHT}px`;
		container.style.overflow = "scroll";
		iframe.style.width = `${CONTENT_WIDTH}px`;
		iframe.style.height = `${FRAME_HEIGHT}px`;
		iframe.style.border = "0";
		container.appendChild(iframe);
		document.body.appendChild(container);
		fixtures.push(container);

		const frameDocument = iframe.contentDocument;
		const body = frameDocument.body;
		body.style.margin = "0";
		body.style.width = `${CONTENT_WIDTH}px`;
		body.style.height = `${FRAME_HEIGHT}px`;
		body.style.writingMode = "vertical-rl";
		body.style.direction = "ltr";

		const span = frameDocument.createElement("span");
		span.textContent = "文文";
		span.style.position = "absolute";
		span.style.left = `${FRAGMENT.left}px`;
		span.style.top = "36px";
		span.style.display = "inline";
		span.style.width = `${FRAGMENT.right - FRAGMENT.left}px`;
		span.style.height = "18px";
		span.style.font = "18px/18px sans-serif";
		body.appendChild(span);

		container.scrollLeft = -CURRENT_OFFSET;

		return {
			body,
			container,
			frameDocument,
			iframe,
			nativeCreateRange: frameDocument.createRange.bind(frameDocument),
			textNode: span.firstChild,
		};
	}

	async function settle(frameDocument) {
		if (frameDocument.fonts && frameDocument.fonts.ready) {
			await frameDocument.fonts.ready;
		}

		await new Promise((resolve) => {
			frameDocument.defaultView.requestAnimationFrame(() => {
				frameDocument.defaultView.requestAnimationFrame(resolve);
			});
		});
	}

	function createManager(container, iframe, frameDocument, nativeCreateRange, textNode) {
		const documentProxy = {
			body: frameDocument.body,
			createTreeWalker: () => {
				let yielded = false;

				return {
					nextNode: () => {
						if (yielded) {
							return null;
						}

						yielded = true;
						return textNode;
					},
				};
			},
			createRange: () => {
				const nativeRange = nativeCreateRange();

				return {
					selectNodeContents: (node) => nativeRange.selectNodeContents(node),
					getClientRects: () => {
						return Array.from(nativeRange.getClientRects()).map((rect) => ({
							left: rect.left,
							right: rect.right,
							top: rect.top,
							bottom: Math.max(rect.bottom, rect.top + 18),
							width: rect.width,
							height: Math.max(rect.height, 18),
						}));
					},
					detach: () => nativeRange.detach(),
				};
			},
		};

		const view = {
			width: () => CONTENT_WIDTH,
			iframe,
			contents: {
				writingMode: () => "vertical-rl",
				window: frameDocument.defaultView,
				document: documentProxy,
				body: documentProxy.body,
			},
		};
		const manager = Object.create(DefaultViewManager.prototype);
		manager.container = container;
		manager.isPaginated = true;
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl",
		};
		manager.layout = {
			name: "reflowable",
			pageWidth: PAGE_ADVANCE,
			width: PAGE_ADVANCE,
			delta: PAGE_ADVANCE,
			effectivePageAdvance: PAGE_ADVANCE,
			pageBoundaryShift: 0,
			edgeGuardPx: 2,
		};
		manager.views = {
			first: () => view,
			last: () => null,
		};
		manager._verticalRlBoundarySnapCache = null;

		return manager;
	}

	function measure(frameDocument, textNode, offset) {
		const range = frameDocument.createRange();
		range.selectNodeContents(textNode);
		const rect = range.getBoundingClientRect();
		const clientRects = Array.from(range.getClientRects());
		const viewport = getVerticalRlBoundarySnapViewportBounds(
			offset,
			CONTENT_WIDTH,
			PAGE_ADVANCE,
		)[0];
		const hitPoint = {
			x: viewport.left + 1,
			y: 45,
		};
		const hitNode = frameDocument.elementFromPoint(hitPoint.x, hitPoint.y);
		const caret = frameDocument.caretPositionFromPoint(hitPoint.x, hitPoint.y);

		return {
			offset,
			viewport,
			range: {
				left: rect.left,
				right: rect.right,
				width: rect.width,
				clientRectCount: clientRects.length,
				clientRects,
			},
			crossesViewport: rect.left < viewport.left && rect.right > viewport.left,
			hitText: hitNode === textNode.parentElement,
			caretText: caret ? caret.offsetNode === textNode : false,
		};
	}

	it("records manager raw-boundary snap output and ownership correction", async () => {
		const { container, frameDocument, iframe, nativeCreateRange, textNode } = createFixture();
		await settle(frameDocument);
		const manager = createManager(container, iframe, frameDocument, nativeCreateRange, textNode);
		const snappedOffset = manager.snapVerticalRlLogicalOffsetToTextBoundary(
			CURRENT_OFFSET,
			CONTENT_WIDTH - PAGE_ADVANCE,
		);
		const instrumentedCollectedRects = collectVisibleTextClientRects(
			manager.views.first().contents.document,
			frameDocument.defaultView,
			frameDocument.body,
		);
		const measurementInputs = getVerticalRlBoundarySnapMeasurementInputs(
			instrumentedCollectedRects,
			iframe.getBoundingClientRect().left,
			CURRENT_OFFSET,
			CONTENT_WIDTH,
			PAGE_ADVANCE,
			2,
			null,
			PAGE_ADVANCE,
			0,
		);
		const directDelta = getVerticalRlBoundarySnapDelta(
			measurementInputs.rects,
			CURRENT_OFFSET,
			CONTENT_WIDTH,
			PAGE_ADVANCE,
			CONTENT_WIDTH - PAGE_ADVANCE,
			measurementInputs.deltaInputs.edgeGuard,
			measurementInputs.deltaInputs.structuralMasks.left,
			measurementInputs.deltaInputs.structuralMasks.right,
			measurementInputs.deltaInputs.boundaryShift,
			measurementInputs.deltaInputs.edgeGuardPx,
			measurementInputs.deltaInputs.structuralBleed,
		);
		const baseline = measure(frameDocument, textNode, CURRENT_OFFSET);
		const candidate = measure(frameDocument, textNode, snappedOffset);

		console.info(
			"vertical-rl-manager-boundary-ownership-candidate",
			JSON.stringify({
				baseline: {
					offset: baseline.offset,
					viewport: baseline.viewport,
					range: baseline.range,
					crossesViewport: baseline.crossesViewport,
					hitText: baseline.hitText,
					caretText: baseline.caretText,
				},
				candidate: {
					offset: candidate.offset,
					viewport: candidate.viewport,
					range: candidate.range,
					crossesViewport: candidate.crossesViewport,
					hitText: candidate.hitText,
					caretText: candidate.caretText,
				},
				snap: {
					directDelta,
					snappedOffset,
					collectedRectCount: instrumentedCollectedRects.length,
					firstRect: instrumentedCollectedRects[0] || null,
				},
				container: {
					clientWidth: container.clientWidth,
					scrollWidth: container.scrollWidth,
					scrollLeft: container.scrollLeft,
				},
				dom: {
					connected: textNode.isConnected,
					ownerDocumentMatches: textNode.ownerDocument === frameDocument,
				},
			}),
		);
		expect(baseline.crossesViewport).toBe(true);
		expect(snappedOffset).not.toBe(CURRENT_OFFSET);
		expect(snappedOffset).toBe(CURRENT_OFFSET + directDelta);
		expect(candidate.crossesViewport).toBe(false);
		expect(candidate.range).toEqual(baseline.range);
		expect(candidate.viewport.left).toBeGreaterThan(candidate.range.right);
		expect(candidate.hitText).toBe(false);
		expect(candidate.caretText).toBe(false);
	});

	it("revalidates a cached page offset when DOM inputs are ready", async () => {
		const manager = Object.create(DefaultViewManager.prototype);
		const cacheWrites = [];
		let snapCalls = 0;
		let scrolledLeft = null;

		manager.container = {
			clientWidth: PAGE_ADVANCE,
			scrollWidth: CONTENT_WIDTH,
			scrollLeft: -CURRENT_OFFSET,
		};
		manager.isPaginated = true;
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl",
			verticalRlBoundarySnapRetryDelays: [],
		};
		manager.layout = {
			pageWidth: PAGE_ADVANCE,
			width: PAGE_ADVANCE,
			delta: PAGE_ADVANCE,
			effectivePageAdvance: PAGE_ADVANCE,
			pageBoundaryShift: 0,
			edgeGuardPx: 2,
		};
		manager.views = {
			first: () => ({
				iframe: {},
				contents: {
					writingMode: () => "vertical-rl",
					document: { body: {} },
					window: {},
				},
			}),
			last: () => null,
		};
		manager.waitForVerticalRlLayoutReady = () => Promise.resolve();
		manager.syncVerticalRlViewportClip = () => {};
		manager.getTotalPagesForCurrentView = () => 5;
		manager.getMaxLogicalScrollLeft = () => CONTENT_WIDTH - PAGE_ADVANCE;
		manager.getNormalizedLogicalScrollLeft = () => CURRENT_OFFSET;
		manager.getVerticalRlLogicalPageOffsetCacheKey = () => "cached-boundary";
		manager.getCachedVerticalRlLogicalPageOffset = () => CURRENT_OFFSET;
		manager.getLogicalOffsetForPageIndex = () => CURRENT_OFFSET;
		manager.getPageBoundaryShift = () => 0;
		manager.getPageSnapTolerance = () => 2;
		manager.snapVerticalRlLogicalOffsetToTextBoundary = (logicalOffset) => {
			snapCalls += 1;

			return logicalOffset - 7;
		};
		manager.cacheVerticalRlLogicalPageOffset = (pageIndex, logicalOffset) => {
			cacheWrites.push({ pageIndex, logicalOffset });
		};
		manager.scrollTo = (left) => {
			scrolledLeft = left;
		};

		manager.queueVerticalRlBoundarySnapRetry(2, { useCurrentOffset: true });
		await Promise.resolve();
		await Promise.resolve();

		console.info(
			"vertical-rl-manager-cached-boundary-bypass",
			JSON.stringify({ snapCalls, cacheWrites, scrolledLeft }),
		);

		expect(snapCalls).toBe(1);
		expect(cacheWrites).toEqual([{ pageIndex: 2, logicalOffset: CURRENT_OFFSET - 7 }]);
		expect(scrolledLeft).toBe(-(CURRENT_OFFSET - 7));
	});
});

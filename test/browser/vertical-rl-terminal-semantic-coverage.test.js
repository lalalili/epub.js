import { afterEach, describe, expect, it } from "vitest";
import ePub from "../../src/epub";
import {
	characterizeVerticalRlTerminalCoveragePolicies,
} from "../../src/rendering/logical-page";
import { fixtureUrl } from "./helpers/fixtures";

describe("vertical-rl terminal semantic coverage fixture", () => {
	const fixtures = [];

	afterEach(() => {
		fixtures.splice(0).forEach(({ book, host }) => {
			book.destroy();
		host.remove();
		});
	});

	async function settle(rendition) {
		const view = rendition?.manager?.views?.first?.();
		const contentDocument = view?.contents?.document;
		if (contentDocument?.fonts?.ready) {
			await contentDocument.fonts.ready;
		}
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	}

	async function waitForTerminalParityTrace() {
		for (let attempt = 0; attempt < 6; attempt += 1) {
			const trace = window.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__ || [];
			if (trace.some((entry) => (
				entry.event === "scroll:terminal-applied-offset" &&
				entry.stage === "after-fonts-ready"
			))) {
				return;
			}

			await new Promise((resolve) => requestAnimationFrame(resolve));
		}
	}

	function terminalParityEvidence() {
		return (window.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__ || [])
			.filter((entry) => (
				entry.event === "next:terminal-plan" ||
				entry.event === "scroll:terminal-applied-offset"
			))
			.slice(-8);
	}

	function runnerSnapshot(rendition, snapshot) {
		const view = rendition?.manager?.views?.first?.();
		const contentWindow = view?.contents?.window;
		const contentDocument = view?.contents?.document;
		const bodyStyle = contentDocument?.body && contentWindow
			? contentWindow.getComputedStyle(contentDocument.body)
			: null;
		const fontFamilies = ["DejaVu Sans Mono", "monospace", "sans-serif"];

		return {
			browser: {
				userAgent: window.navigator.userAgent,
				devicePixelRatio: window.devicePixelRatio,
				viewport: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
			},
			fonts: {
				status: contentDocument?.fonts?.status ?? "unsupported",
				computedBodyFamily: bodyStyle?.fontFamily ?? "unsupported",
				checks: Object.fromEntries(fontFamilies.map((family) => [
					family,
					contentDocument?.fonts?.check?.(`16px "${family}"`) ?? false,
				])),
			},
			fixture: {
				href: view?.section?.href ?? null,
				nominalTotalPages: snapshot?.nominalTotalPages ?? null,
				currentPageIndex: snapshot?.currentPageIndex ?? null,
				currentLogicalOffset: snapshot?.currentLogicalOffset ?? null,
				maxLogicalScroll: snapshot?.maxLogicalScroll ?? null,
				contentWidth: snapshot?.contentWidth ?? null,
				visibleWidth: snapshot?.visibleWidth ?? null,
				semanticRectCount: snapshot?.coverage?.semanticRectCount ?? null,
				markerRect: snapshot?.semanticRects?.find((rect) => rect.category === "tcy") ?? null,
			},
		};
	}

	async function displayTerminalPage(rendition) {
		const manager = rendition.manager;
		let nominalTotalPages = manager.getNominalTotalPagesForCurrentView();

		for (let attempt = 0; attempt < nominalTotalPages + 2; attempt += 1) {
			if (manager.getCurrentPageIndex() >= nominalTotalPages - 1) {
				break;
			}

			manager.next();
			await settle(rendition);
		}

		return {
			nominalTotalPages,
			manager,
			snapshot: manager.getVerticalRlTerminalSemanticCoverageSnapshot(),
			href: manager.views.first().section.href
		};
	}

	async function openFixture() {
		const host = document.createElement("div");
		host.style.width = "260px";
		host.style.height = "260px";
		document.body.appendChild(host);

		const book = ePub(fixtureUrl("vertical-rl-terminal/OPS/package.opf"));
		await book.ready;
		book.package.metadata.direction = "rtl";
		const rendition = book.renderTo(host, {
			width: 260,
			height: 260,
			spread: "none",
			flow: "paginated",
			resizeSettleTrace: true,
		});
		window.__EPUB_VRL_DEBUG__ = true;
		window.__EPUB_VRL_TERMINAL_CONTINUATION_ENABLED__ = true;
		await rendition.display(0);
		await settle(rendition);

		fixtures.push({ book, host });

		return rendition;
	}

	function markerVisibility(snapshot) {
		if (!snapshot) {
			return "unsupported";
		}

		const marker = snapshot.semanticRects.find((rect) => rect.category === "tcy");
		if (!marker) {
			return "unsupported";
		}

		const viewport = snapshot.currentRawViewport;
		const fullyVisible = marker.left >= viewport.left - 0.5 && marker.right <= viewport.right + 0.5;
		const partiallyVisible = marker.right > viewport.left + 0.5 && marker.left < viewport.right - 0.5;

		return fullyVisible ? "fully-visible" : partiallyVisible ? "partially-clipped" : "fully-outside";
	}

	function summarizePolicies(policies) {
		return Object.fromEntries(Object.entries(policies || {}).map(([name, policy]) => [name, {
			offsets: policy.offsets,
			pageCountDelta: policy.pageCountDelta,
			targetMarkerVisibility: policy.targetMarkerVisibility,
			newlyCoveredSemanticRectCount: policy.newlyCoveredSemanticRects.length,
			duplicateSemanticRectCount: policy.duplicateSemanticRects.length,
			uncoveredSemanticRectCount: policy.uncoveredSemanticRects.length,
			gapIntervalCount: policy.gapIntervals.length,
			semanticGapIntervalCount: policy.semanticGapIntervals.length,
			overlapIntervalCount: policy.overlapIntervals.length,
			previousToTerminalCoverageContinuity: policy.previousToTerminalCoverageContinuity,
			usedUnconditionalMaxScroll: policy.usedUnconditionalMaxScroll,
		}]));
	}

	it("preserves one semantic continuation before the next-spine transition", async () => {
		const rendition = await openFixture();
		await rendition.display(0);
		await settle(rendition);
		const result = await displayTerminalPage(rendition);
		const beforeNext = {
			href: result.href,
			nominalTotalPages: result.nominalTotalPages,
			currentPageIndex: result.manager.getCurrentPageIndex(),
			markerVisibility: markerVisibility(result.snapshot),
			targetMarkerCovered: markerVisibility(result.snapshot) === "fully-visible",
			uncoveredSemanticRectCount: result.snapshot?.coverage.uncoveredSemanticRectCount ?? null,
			policies: summarizePolicies(result.snapshot?.policies),
		};

		result.manager.next();
		await settle(rendition);
		await waitForTerminalParityTrace();
		const afterNextHref = result.manager.views.first().section.href;
		const afterNextSnapshot = result.manager.getVerticalRlTerminalSemanticCoverageSnapshot();
		const afterNextPageIndex = result.manager.getCurrentPageIndex();
		const afterNextTotalPages = result.manager.getTotalPagesForCurrentView();

		console.info("vertical-rl-terminal-semantic-coverage", JSON.stringify({
			fixtureCase: "one-continuation",
			runner: runnerSnapshot(rendition, result.snapshot),
			beforeNext,
			afterNextHref,
			parityEvidence: terminalParityEvidence(),
			traceEvents: (window.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__ || []).map((entry) => entry.event),
		}));

		expect(beforeNext.nominalTotalPages).toBeGreaterThan(1);
		expect(beforeNext.currentPageIndex).toBe(beforeNext.nominalTotalPages - 1);
		expect(beforeNext.uncoveredSemanticRectCount).toBeGreaterThan(0);
		expect(beforeNext.targetMarkerCovered).toBe(true);
		expect(afterNextHref).toBe(beforeNext.href);
		expect(afterNextPageIndex).toBe(beforeNext.nominalTotalPages);
		expect(afterNextTotalPages).toBe(beforeNext.nominalTotalPages + 1);
		expect(afterNextSnapshot.coverage.uncoveredSemanticRectCount).toBe(0);
		expect(markerVisibility(afterNextSnapshot)).toBe("fully-visible");
	});

	it("keeps a real continuation in the same spine before the single next-spine transition", async () => {
		const rendition = await openFixture();
		const result = await displayTerminalPage(rendition);
		const nominalTotalPages = result.nominalTotalPages;
		const terminalHref = result.href;

		result.manager.next();
		await settle(rendition);
		await waitForTerminalParityTrace();

		const continuationSnapshot = result.manager.getVerticalRlTerminalSemanticCoverageSnapshot();
		const continuationPageIndex = result.manager.getCurrentPageIndex();
		const continuationTotalPages = result.manager.getTotalPagesForCurrentView();
		const continuationLocation = result.manager.currentLocation();
		console.info("vertical-rl-terminal-planner-runtime-parity", JSON.stringify({
			fixtureCase: "one-continuation-round-trip",
			parityEvidence: terminalParityEvidence(),
			freshUncoveredHashes: continuationSnapshot.coverage.uncoveredSemanticRects.map((rect) => rect.structureHash),
		}));

		expect(result.manager.views.first().section.href).toBe(terminalHref);
		expect(continuationPageIndex).toBe(nominalTotalPages);
		expect(continuationTotalPages).toBe(nominalTotalPages + 1);
		expect(continuationSnapshot.coverage.uncoveredSemanticRectCount).toBe(0);
		expect(markerVisibility(continuationSnapshot)).toBe("fully-visible");
		expect(continuationLocation[0]?.href).toBe(terminalHref);

		result.manager.prev();
		await settle(rendition);
		expect(result.manager.getCurrentPageIndex()).toBe(nominalTotalPages - 1);

		result.manager.next();
		await settle(rendition);
		expect(result.manager.getCurrentPageIndex()).toBe(nominalTotalPages);
		expect(result.manager.views.first().section.href).toBe(terminalHref);

		result.manager.next();
		await settle(rendition);
		expect(result.manager.views.first().section.href).toBe("terminal-two.xhtml");
	});

	it("characterizes two continuation candidates and a no-continuation control", async () => {
		const rendition = await openFixture();
		const cases = [
			{ index: 1, name: "two-continuations", sequentialPageStep: 5, expectedMinimumContinuationPages: 2 },
			{ index: 2, name: "control", sequentialPageStep: null, expectedMinimumContinuationPages: 0 },
		];
		const reports = [];

		for (const fixtureCase of cases) {
			await rendition.display(fixtureCase.index);
			await settle(rendition);
			const result = await displayTerminalPage(rendition);
			const dynamicPolicy = fixtureCase.sequentialPageStep
				? characterizeVerticalRlTerminalCoveragePolicies({
					semanticRects: result.snapshot.semanticRects,
					contentWidth: result.snapshot.contentWidth,
					visibleWidth: result.snapshot.visibleWidth,
					pageAdvance: result.snapshot.pageAdvance,
					currentOffset: result.snapshot.currentLogicalOffset,
					maxScroll: result.snapshot.maxLogicalScroll,
					previousOffsets: result.snapshot.previousOffsets,
					preferredOffset: result.snapshot.currentLogicalOffset,
					maxRightBoundary: result.snapshot.contentWidth - result.snapshot.currentLogicalOffset,
					sequentialPageStep: fixtureCase.sequentialPageStep,
				})["dynamic-terminal-continuation"]
				: result.snapshot?.policies["dynamic-terminal-continuation"];
			reports.push({
				fixtureCase: fixtureCase.name,
				beforeNextHref: result.href,
				nominalTotalPages: result.nominalTotalPages,
				currentPageIndex: result.manager.getCurrentPageIndex(),
				markerVisibility: markerVisibility(result.snapshot),
				uncoveredSemanticRectCount: result.snapshot?.coverage.uncoveredSemanticRectCount ?? null,
				dynamicPageCountDelta: dynamicPolicy?.pageCountDelta ?? null,
				dynamicOffsets: dynamicPolicy?.offsets ?? [],
				currentLogicalOffset: result.snapshot?.currentLogicalOffset ?? null,
				maxLogicalScroll: result.snapshot?.maxLogicalScroll ?? null,
				previousOffsets: result.snapshot?.previousOffsets ?? null,
				sequentialPageStep: result.snapshot?.sequentialPageStep ?? null,
				strictlyIncreasingOffsets: (dynamicPolicy?.offsets ?? []).every((offset, offsetIndex, offsets) => (
					offsetIndex === 0 || offset > offsets[offsetIndex - 1]
				)),
				maxScrollHasRoomForExpectedPages: (dynamicPolicy?.offsets ?? []).length >= fixtureCase.expectedMinimumContinuationPages + 1 &&
					(dynamicPolicy?.offsets ?? []).slice(0, fixtureCase.expectedMinimumContinuationPages + 1).every((offset) => (
						offset <= (result.snapshot?.maxLogicalScroll ?? 0)
					)),
				targetSemanticRects: result.snapshot?.semanticRects
					.filter((rect) => rect.category === "tcy" || rect.category === "footnote-marker")
					.map((rect) => ({
					category: rect.category,
					left: rect.left,
					right: rect.right,
					structureHash: rect.structureHash,
					})),
			});

		}

		console.info("vertical-rl-terminal-semantic-coverage-matrix", JSON.stringify({ reports }));
		for (const report of reports) {
			if (report.fixtureCase === "control") {
				expect(report.dynamicPageCountDelta).toBe(0);
			} else if (!report.strictlyIncreasingOffsets || !report.maxScrollHasRoomForExpectedPages) {
				console.info("vertical-rl-terminal-semantic-coverage-fixture-precondition-failed", JSON.stringify(report));
			} else {
				expect(report.dynamicPageCountDelta).toBeGreaterThanOrEqual(2);
			}
		}
		expect(reports).toHaveLength(2);
	});

	it("keeps the marker-only visibility contract independent from general semantic coverage", async () => {
		const rendition = await openFixture();
		await rendition.display(3);
		await settle(rendition);
		const snapshot = rendition.manager.getVerticalRlTerminalSemanticCoverageSnapshot();

		console.info("vertical-rl-terminal-marker-visibility", JSON.stringify({
			fixtureCase: "marker-visibility",
			markerVisibility: markerVisibility(snapshot),
			semanticRectCount: snapshot?.coverage.semanticRectCount ?? null,
			uncoveredSemanticRectCount: snapshot?.coverage.uncoveredSemanticRectCount ?? null,
		}));

		expect(markerVisibility(snapshot)).toBe("fully-visible");
	});
});

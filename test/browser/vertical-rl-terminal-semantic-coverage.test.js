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

	async function settle() {
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	}

	async function displayTerminalPage(rendition) {
		const manager = rendition.manager;
		let nominalTotalPages = manager.getNominalTotalPagesForCurrentView();

		for (let attempt = 0; attempt < nominalTotalPages + 2; attempt += 1) {
			if (manager.getCurrentPageIndex() >= nominalTotalPages - 1) {
				break;
			}

			manager.next();
			await settle();
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
		await settle();

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
		await settle();
		const result = await displayTerminalPage(rendition);
		const beforeNext = {
			href: result.href,
			nominalTotalPages: result.nominalTotalPages,
			currentPageIndex: result.manager.getCurrentPageIndex(),
			markerVisibility: markerVisibility(result.snapshot),
			uncoveredSemanticRectCount: result.snapshot?.coverage.uncoveredSemanticRectCount ?? null,
			policies: summarizePolicies(result.snapshot?.policies),
		};

		result.manager.next();
		await settle();
		const afterNextHref = result.manager.views.first().section.href;
		const afterNextSnapshot = result.manager.getVerticalRlTerminalSemanticCoverageSnapshot();
		const afterNextPageIndex = result.manager.getCurrentPageIndex();
		const afterNextTotalPages = result.manager.getTotalPagesForCurrentView();

		console.info("vertical-rl-terminal-semantic-coverage", JSON.stringify({
			fixtureCase: "one-continuation",
			beforeNext,
			afterNextHref,
			traceEvents: (window.__EPUB_VRL_TERMINAL_COVERAGE_TRACE__ || []).map((entry) => entry.event),
		}));

		expect(beforeNext.nominalTotalPages).toBeGreaterThan(1);
		expect(beforeNext.currentPageIndex).toBe(beforeNext.nominalTotalPages - 1);
		expect(beforeNext.uncoveredSemanticRectCount).toBeGreaterThan(0);
		expect(beforeNext.markerVisibility).not.toBe("fully-visible");
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
		await settle();

		const continuationSnapshot = result.manager.getVerticalRlTerminalSemanticCoverageSnapshot();
		const continuationPageIndex = result.manager.getCurrentPageIndex();
		const continuationTotalPages = result.manager.getTotalPagesForCurrentView();
		const continuationLocation = result.manager.currentLocation();

		expect(result.manager.views.first().section.href).toBe(terminalHref);
		expect(continuationPageIndex).toBe(nominalTotalPages);
		expect(continuationTotalPages).toBe(nominalTotalPages + 1);
		expect(continuationSnapshot.coverage.uncoveredSemanticRectCount).toBe(0);
		expect(markerVisibility(continuationSnapshot)).toBe("fully-visible");
		expect(continuationLocation[0]?.href).toBe(terminalHref);

		result.manager.prev();
		await settle();
		expect(result.manager.getCurrentPageIndex()).toBe(nominalTotalPages - 1);

		result.manager.next();
		await settle();
		expect(result.manager.getCurrentPageIndex()).toBe(nominalTotalPages);
		expect(result.manager.views.first().section.href).toBe(terminalHref);

		result.manager.next();
		await settle();
		expect(result.manager.views.first().section.href).toBe("terminal-two.xhtml");
	});

	it("characterizes two continuation candidates and a no-continuation control", async () => {
		const rendition = await openFixture();
		const cases = [
			{ index: 1, name: "two-continuations", sequentialPageStep: 20, expectedMinimumContinuationPages: 2 },
			{ index: 2, name: "control", sequentialPageStep: null, expectedMinimumContinuationPages: 0 },
		];
		const reports = [];

		for (const fixtureCase of cases) {
			await rendition.display(fixtureCase.index);
			await settle();
			const result = await displayTerminalPage(rendition);
			const dynamicPolicy = fixtureCase.sequentialPageStep
				? characterizeVerticalRlTerminalCoveragePolicies({
					semanticRects: result.snapshot.semanticRects.filter((rect) => rect.category === "tcy"),
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
				dynamicOffsets: dynamicPolicy?.offsets ?? null,
				currentLogicalOffset: result.snapshot?.currentLogicalOffset ?? null,
				maxLogicalScroll: result.snapshot?.maxLogicalScroll ?? null,
				previousOffsets: result.snapshot?.previousOffsets ?? null,
				sequentialPageStep: result.snapshot?.sequentialPageStep ?? null,
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
			} else {
				expect(report.dynamicPageCountDelta).toBeGreaterThanOrEqual(2);
			}
		}
		expect(reports).toHaveLength(2);
	});
});

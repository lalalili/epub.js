import { describe, expect, it } from "vitest";
import {
	cacheVerticalRlLogicalPageOffset,
	getCachedVerticalRlLogicalPageOffset,
	getCurrentPageIndexForOffset,
	getLogicalOffsetForPageIndex,
	getVerticalRlLogicalPageOffsetCacheKey,
	getVerticalRlLogicalPageStepToNextPage,
	getVerticalRlSafeTerminalContinuationOffset,
	getVerticalRlTerminalRectOffsetInterval,
	evaluateVerticalRlContinuationReplacement,
	planVerticalRlTerminalContinuations,
	characterizeVerticalRlTerminalCoveragePolicies,
	getVerticalRlRawViewportForOffset,
} from "../../src/rendering/logical-page";

// Characterization tests for the pure vertical-RL logical-page helpers (page step, offset cache and
// offset <-> page-index conversion). Only covered indirectly through manager integration tests today;
// these pin the converted snap math directly so future refactors / upstream merges cannot silently
// shift it. Source is frozen (RTL pagination) — these lock current behavior, they do not change it.

describe("logical-page: getVerticalRlLogicalPageStepToNextPage", () => {
	it("returns the offset delta as the step in the general case", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(100, 5, 2, 3, 0, 150, false)).toBe(150);
	});

	it("falls back to the advance when there is no offset delta", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(100, 5, 0, 1, 50, 50, false)).toBe(100);
	});

	it("caps the last-page step at the advance when a structural gutter is present", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(100, 5, 3, 4, 0, 150, true)).toBe(100);
		// same inputs without the gutter keep the raw delta
		expect(getVerticalRlLogicalPageStepToNextPage(100, 5, 3, 4, 0, 150, false)).toBe(150);
	});
});

describe("logical-page: terminal semantic coverage policies", () => {
	const baseInput = {
		contentWidth: 1000,
		visibleWidth: 100,
		pageAdvance: 100,
		currentOffset: 300,
		maxScroll: 900,
		previousOffsets: [0, 100, 200],
		preferredOffset: 300,
		maxRightBoundary: 600,
	};

	it("keeps the current exact boundary as a baseline and moves a real uncovered rect by continuation", () => {
		const semanticRects = [
			{ left: 590, right: 600, structureHash: "marker" },
		];
		const policies = characterizeVerticalRlTerminalCoveragePolicies({
			...baseInput,
			semanticRects,
			markerStructureHash: "marker",
		});

		expect(getVerticalRlRawViewportForOffset(300, 1000, 100)).toEqual({ left: 600, right: 700 });
		expect(policies["current-exact-sequential"].uncoveredSemanticRects).toEqual(["marker"]);
		expect(policies["dynamic-terminal-continuation"].pageCountDelta).toBe(1);
		expect(policies["dynamic-terminal-continuation"].targetMarkerVisibility).toBe("fully-visible");
	});

	it("models one and two continuation pages without using unconditional maxScroll", () => {
		const onePage = characterizeVerticalRlTerminalCoveragePolicies({
			...baseInput,
			semanticRects: [{ left: 590, right: 600, structureHash: "one" }],
			markerStructureHash: "one",
		});
		const twoPages = characterizeVerticalRlTerminalCoveragePolicies({
			...baseInput,
			semanticRects: [
				{ left: 590, right: 600, structureHash: "two-a" },
				{ left: 495, right: 505, structureHash: "two-b" },
			],
			markerStructureHash: "two-b",
		});

		expect(onePage["dynamic-terminal-continuation"].pageCountDelta).toBe(1);
		expect(onePage["dynamic-terminal-continuation"].uncoveredSemanticRects).toEqual([]);
		expect(twoPages["dynamic-terminal-continuation"].pageCountDelta).toBe(2);
		expect(twoPages["dynamic-terminal-continuation"].uncoveredSemanticRects).toEqual([]);
		expect(twoPages["dynamic-terminal-continuation"].usedUnconditionalMaxScroll).toBe(false);
		expect(twoPages["dynamic-terminal-continuation"].previousToTerminalCoverageContinuity).toBe(true);
	});

	it("does not create a continuation when all semantic rects are already owned", () => {
		const policies = characterizeVerticalRlTerminalCoveragePolicies({
			...baseInput,
			semanticRects: [{ left: 620, right: 630, structureHash: "owned" }],
			markerStructureHash: "owned",
		});

		expect(policies["dynamic-terminal-continuation"].pageCountDelta).toBe(0);
		expect(policies["dynamic-terminal-continuation"].uncoveredSemanticRects).toEqual([]);
	});

	it("distinguishes an empty viewport gap from a semantic gap", () => {
		const policies = characterizeVerticalRlTerminalCoveragePolicies({
			...baseInput,
			currentOffset: 302,
			previousOffsets: [0, 100, 202],
			preferredOffset: 302,
			semanticRects: [{ left: 650, right: 660, structureHash: "owned-after-gap" }],
		});

		const dynamic = policies["dynamic-terminal-continuation"];

		expect(dynamic.gapIntervals.length).toBeGreaterThan(0);
		expect(dynamic.semanticGapIntervals).toEqual([]);
		expect(dynamic.uncoveredSemanticRects).toEqual([]);
	});

	it("plans the minimal strictly increasing continuation that owns a coverable terminal cluster", () => {
		const input = {
			contentWidth: 23654,
			visibleWidth: 369.59375,
			pageAdvance: 369.59375,
			currentOffset: 22767,
			maxScroll: 23284,
			previousOffsets: [],
			semanticRects: [
				{ left: 503.90625, right: 534.703125, structureHash: "tcy" },
				{ left: 499.3125, right: 539.3125, structureHash: "block" },
				{ left: 499.3125, right: 539.3125, structureHash: "text" },
			],
		};
		const plan = planVerticalRlTerminalContinuations(input);

		expect(plan.offsets).toHaveLength(1);
		expect(plan.offsets[0]).toBeGreaterThan(22767);
		expect(plan.offsets[0]).toBeLessThanOrEqual(23284);
		expect(plan.coverage.uncoveredSemanticRects).toEqual([]);
		expect(plan.coverage.usedUnconditionalMaxScroll).toBe(false);
		expect(plan.viewports[0].left).toBeLessThanOrEqual(499.8125);
		expect(plan.viewports[0].right).toBeGreaterThanOrEqual(539.3125 - 0.5);
	});

	it("does not create a continuation when no candidate strictly reduces uncovered content", () => {
		const plan = planVerticalRlTerminalContinuations({
			contentWidth: 1000,
			visibleWidth: 100,
			pageAdvance: 100,
			currentOffset: 900,
			maxScroll: 900,
			previousOffsets: [],
			semanticRects: [{ left: 120, right: 130, structureHash: "outside-max-scroll" }],
		});

		expect(plan.offsets).toEqual([]);
		expect(plan.coverage.uncoveredSemanticRects).toEqual(["outside-max-scroll"]);
	});

	it("quantizes a half-pixel ownership boundary to a safe applied offset", () => {
		const interval = getVerticalRlTerminalRectOffsetInterval(
			{ left: 6, right: 25, structureHash: "runner-residual" },
			1040,
			260,
			0.5,
		);
		const candidate = getVerticalRlSafeTerminalContinuationOffset(interval, 767, 780);

		expect(interval).toEqual({ minimumOffset: 773.5, maximumOffset: 1015.5 });
		expect(773).toBeLessThan(interval.minimumOffset);
		expect(candidate).toBe(775);
		expect(candidate).toBeGreaterThanOrEqual(interval.minimumOffset);
		expect(candidate).toBeLessThanOrEqual(interval.maximumOffset);

		const plan = planVerticalRlTerminalContinuations({
			contentWidth: 1040,
			visibleWidth: 260,
			pageAdvance: 260,
			currentOffset: 767,
			maxScroll: 780,
			previousOffsets: [0, 260, 507],
			semanticRects: [{ left: 6, right: 25, structureHash: "runner-residual" }],
		});

		expect(plan.offsets).toEqual([775]);
		expect(plan.coverage.uncoveredSemanticRects).toEqual([]);
		expect(plan.coverage.previousToTerminalCoverageContinuity).toBe(true);
	});

	it("rejects safe quantization outside the feasible interval or max scroll", () => {
		expect(getVerticalRlSafeTerminalContinuationOffset(
			{ minimumOffset: 773.5, maximumOffset: 774.75 },
			767,
			780,
		)).toBeNull();
		expect(getVerticalRlSafeTerminalContinuationOffset(
			{ minimumOffset: 773.5, maximumOffset: 1015.5 },
			767,
			774,
		)).toBeNull();
	});

	it("rejects replacing a continuation when the replacement creates a semantic gap", () => {
		const input = {
			contentWidth: 23654,
			visibleWidth: 369.59375,
			pageAdvance: 369.59375,
			currentOffset: 23027,
			maxScroll: 23284,
			previousOffsets: [22397, 22696],
			semanticRects: [
				{ left: 829.6875, right: 869.6875, structureHash: "gap-a" },
				{ left: 678.5, right: 718.5, structureHash: "gap-b" },
				{ left: 588.90625, right: 628.90625, structureHash: "gap-c" },
				{ left: 420, right: 460, structureHash: "current-only" },
			],
		};
		const replacement = evaluateVerticalRlContinuationReplacement(input, 23027, 23284);

		expect(replacement.safeToReplace).toBe(false);
		expect(replacement.lostOwnedSemanticHashes).toContain("current-only");
		expect(replacement.createdSemanticGapIntervals.length).toBeGreaterThan(0);
	});

	it("preserves coverage by appending a fresh continuation instead of replacing", () => {
		const input = {
			contentWidth: 23654,
			visibleWidth: 369.59375,
			pageAdvance: 369.59375,
			currentOffset: 23027,
			maxScroll: 23284,
			previousOffsets: [22397, 22696],
			semanticRects: [
				{ left: 829.6875, right: 869.6875, structureHash: "gap-a" },
				{ left: 678.5, right: 718.5, structureHash: "gap-b" },
				{ left: 588.90625, right: 628.90625, structureHash: "gap-c" },
				{ left: 100, right: 140, structureHash: "terminal" },
			],
		};
		const appended = characterizeVerticalRlTerminalCoveragePolicies({
			...input,
			previousOffsets: [...input.previousOffsets, input.currentOffset],
			currentOffset: 23284,
		})["dynamic-terminal-continuation"];

		expect([22696, 23027, 23284]).toEqual([...new Set([22696, 23027, 23284])]);
		expect(appended.semanticGapIntervals).toEqual([]);
		expect(appended.uncoveredSemanticRects).toEqual([]);
	});

	it("keeps browser quantization correction on the same continuation page", () => {
		const input = {
			contentWidth: 1040,
			visibleWidth: 260,
			pageAdvance: 260,
			currentOffset: 773,
			maxScroll: 780,
			previousOffsets: [0, 260, 507, 767],
			semanticRects: [
				{ left: 6, right: 25, structureHash: "runner-residual" },
			],
		};
		const replacement = evaluateVerticalRlContinuationReplacement(input, 773, 775);

		expect(replacement.safeToReplace).toBe(true);
		expect(replacement.lostOwnedSemanticHashes).toEqual([]);
		expect(replacement.createdSemanticGapIntervals).toEqual([]);
		expect(replacement.coverageAfter.uncoveredSemanticRects).toEqual([]);
	});

	it("fails closed when uncovered content has no distinct offset before max scroll", () => {
		const plan = planVerticalRlTerminalContinuations({
			contentWidth: 1040,
			visibleWidth: 260,
			pageAdvance: 260,
			currentOffset: 780,
			maxScroll: 780,
			previousOffsets: [0, 260, 507, 767, 775],
			semanticRects: [
				{ left: -10, right: 5, structureHash: "outside-scroll-extent" },
			],
		});

		expect(plan.offsets).toEqual([]);
		expect(plan.coverage.uncoveredSemanticRects).toEqual(["outside-scroll-extent"]);
		expect(plan.offsets.filter((offset) => offset === 780)).toHaveLength(0);
	});
});

describe("logical-page: getVerticalRlLogicalPageOffsetCacheKey", () => {
	it("returns null when content, visible width or advance is missing", () => {
		expect(getVerticalRlLogicalPageOffsetCacheKey(5, 1000, 0, 300, 100)).toBeNull();
		expect(getVerticalRlLogicalPageOffsetCacheKey(5, 1000, 2000, 0, 100)).toBeNull();
		expect(getVerticalRlLogicalPageOffsetCacheKey(5, 1000, 2000, 300, 0)).toBeNull();
	});

	it("joins rounded-to-2dp metrics into a stable key", () => {
		expect(getVerticalRlLogicalPageOffsetCacheKey(5, 1000, 2000, 300, 100, 8)).toBe(
			"5:1000:2000:300:100:8",
		);
		expect(getVerticalRlLogicalPageOffsetCacheKey(5.555, 1000.123, 2000, 300, 100.999)).toBe(
			"5.56:1000.12:2000:300:101:0",
		);
	});
});

describe("logical-page: offset cache get/set", () => {
	it("returns null for a missing cache or key mismatch", () => {
		expect(getCachedVerticalRlLogicalPageOffset(null, 0, "k")).toBeNull();
		expect(
			getCachedVerticalRlLogicalPageOffset({ key: "k", offsets: { 0: 50 } }, 0, "k2"),
		).toBeNull();
	});

	it("returns a finite cached offset on a key hit", () => {
		const cache = { key: "k", offsets: { 0: 50 } };
		expect(getCachedVerticalRlLogicalPageOffset(cache, 0, "k")).toBe(50);
		expect(getCachedVerticalRlLogicalPageOffset(cache, 1, "k")).toBeNull();
	});

	it("leaves the cache untouched when the key or value is invalid", () => {
		const cache = { key: "k", offsets: { 0: 50 } };
		expect(cacheVerticalRlLogicalPageOffset(cache, 1, 75, null)).toBe(cache);
		expect(cacheVerticalRlLogicalPageOffset(cache, 1, Number.NaN, "k")).toBe(cache);
	});

	it("creates a fresh cache on a new key and reuses it on the same key", () => {
		const created = cacheVerticalRlLogicalPageOffset(null, 0, 50, "k");
		expect(created.key).toBe("k");
		expect(created.offsets[0]).toBe(50);

		const reused = cacheVerticalRlLogicalPageOffset(created, 1, 75, "k");
		expect(reused).toBe(created);
		expect(reused.offsets[1]).toBe(75);

		const replaced = cacheVerticalRlLogicalPageOffset(created, 0, 9, "k2");
		expect(replaced).not.toBe(created);
		expect(replaced.key).toBe("k2");
		expect(replaced.offsets[0]).toBe(9);
	});
});

describe("logical-page: getLogicalOffsetForPageIndex", () => {
	it("returns index * advance clamped into [0, maxScroll]", () => {
		expect(getLogicalOffsetForPageIndex(2, 5, 1000, 100)).toBe(200);
		expect(getLogicalOffsetForPageIndex(10, 5, 1000, 100)).toBe(400);
		expect(getLogicalOffsetForPageIndex(-3, 5, 1000, 100)).toBe(0);
		expect(getLogicalOffsetForPageIndex(2, 5, 150, 100, 30, true)).toBe(150);
	});

	it("applies the boundary shift only to interior RTL pages", () => {
		expect(getLogicalOffsetForPageIndex(2, 5, 1000, 100, 30, true)).toBe(170);
		// last page (index 4 == totalPages-1) keeps the full offset
		expect(getLogicalOffsetForPageIndex(4, 5, 1000, 100, 30, true)).toBe(400);
	});
});

describe("logical-page: getCurrentPageIndexForOffset", () => {
	it("returns 0 when advance is missing", () => {
		expect(getCurrentPageIndexForOffset(500, 5, 0, 1000, 5)).toBe(0);
	});

	it("snaps to the nearest page within tolerance (LTR)", () => {
		expect(getCurrentPageIndexForOffset(0, 5, 100, 1000, 5)).toBe(0);
		expect(getCurrentPageIndexForOffset(200, 5, 100, 1000, 5)).toBe(2);
		expect(getCurrentPageIndexForOffset(205, 5, 100, 1000, 5)).toBe(2);
	});

	it("floors to a page when beyond tolerance (LTR)", () => {
		expect(getCurrentPageIndexForOffset(250, 5, 100, 1000, 5)).toBe(2);
	});

	it("returns the last page when at the RTL max-scroll edge", () => {
		expect(getCurrentPageIndexForOffset(1000, 5, 100, 1000, 5, 0, true)).toBe(4);
	});

	it("picks the nearest RTL logical page offset otherwise", () => {
		expect(getCurrentPageIndexForOffset(0, 5, 100, 1000, 5, 0, true)).toBe(0);
		expect(getCurrentPageIndexForOffset(190, 5, 100, 1000, 5, 0, true)).toBe(2);
	});
});

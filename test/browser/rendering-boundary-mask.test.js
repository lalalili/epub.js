import { describe, expect, it } from "vitest";
import {
	countVerticalRlBoundaryCrossings,
	getCachedVerticalRlBoundarySnap,
	getVerticalRlBoundaryConstrainedOffset,
	getVerticalRlBoundaryMaxRightBoundaryLimitOptions,
	getVerticalRlBoundaryRightBoundaryLimitOptions,
	getVerticalRlBoundaryRightBoundaryLimits,
	getVerticalRlBoundaryShiftAdjustedDelta,
	getVerticalRlBoundarySnapCacheEntry,
	getVerticalRlBoundarySnapCacheKey,
	getVerticalRlBoundarySnapCacheLookup,
	getVerticalRlBoundarySnapDeltaInputs,
	getVerticalRlBoundarySnapEdgeGuard,
	getVerticalRlBoundarySnapEdgeGuards,
	getVerticalRlBoundarySnapRawEdgeGuard,
	getVerticalRlBoundarySnapStructuralBleed,
	getVerticalRlBoundarySnapStructuralMasks,
	getVerticalRlCurrentEffectiveLeftBoundary,
	getVerticalRlSequentialRightBoundaryConstraint,
	isVerticalRlBoundarySnapTextReady,
} from "../../src/rendering/boundary-mask";

// Characterization tests for the pure standalone helpers of the vertical-RL boundary-mask core
// (effective boundary, right-boundary limits, constrained offset, snap cache key/lookup, edge
// guards, structural bleed/masks, boundary crossings and the shift-adjusted delta). The DOM-geometry
// readers, model evaluation and snap pipeline remain covered by the manager integration tests.
// Source is frozen — these lock current behavior, they do not change it.

describe("boundary-mask: getVerticalRlCurrentEffectiveLeftBoundary", () => {
	it("returns the positive effective boundary or null", () => {
		expect(getVerticalRlCurrentEffectiveLeftBoundary(2000, 500, 300, 0)).toBe(1200);
		expect(getVerticalRlCurrentEffectiveLeftBoundary(1000, 800, 300, 150)).toBe(50);
		expect(getVerticalRlCurrentEffectiveLeftBoundary(1000, 800, 300, 0)).toBeNull();
	});
});

describe("boundary-mask: getVerticalRlSequentialRightBoundaryConstraint", () => {
	it("uses a forced right boundary when one is provided", () => {
		expect(getVerticalRlSequentialRightBoundaryConstraint(2, 500, 2000, 100, 100, 300, 100, 0)).toEqual({
			pageIndex: 2,
			maxRightBoundary: 500,
			preferredRightBoundary: 500,
		});
	});

	it("derives the boundary from the effective left boundary when the offset drifts", () => {
		expect(getVerticalRlSequentialRightBoundaryConstraint(2, 0, 2000, 500, 490, 300, 100, 0)).toEqual({
			pageIndex: 2,
			maxRightBoundary: 1200,
			preferredRightBoundary: 1200,
		});
	});

	it("returns null when the offset is grid-aligned with no clean-page mask", () => {
		expect(getVerticalRlSequentialRightBoundaryConstraint(2, 0, 2000, 500, 500, 300, 100, 0)).toBeNull();
	});
});

describe("boundary-mask: isVerticalRlBoundarySnapTextReady", () => {
	it("requires every dependency plus createTreeWalker", () => {
		const ready = {
			iframe: {},
			document: { createTreeWalker() {} },
			window: {},
			body: {},
			contentWidth: 2000,
			visibleWidth: 300,
		};
		expect(isVerticalRlBoundarySnapTextReady(ready)).toBe(true);
		expect(isVerticalRlBoundarySnapTextReady({ ...ready, document: {} })).toBe(false);
		expect(isVerticalRlBoundarySnapTextReady({})).toBe(false);
	});
});

describe("boundary-mask: right-boundary limit helpers", () => {
	it("flags finite max/preferred boundaries", () => {
		expect(getVerticalRlBoundaryRightBoundaryLimits({ maxRightBoundary: 500, preferredRightBoundary: 400 })).toEqual({
			maxRightBoundary: 500,
			hasMaxRightBoundary: true,
			preferredRightBoundary: 400,
			hasPreferredRightBoundary: true,
		});

		const empty = getVerticalRlBoundaryRightBoundaryLimits({});
		expect(empty.hasMaxRightBoundary).toBe(false);
		expect(empty.hasPreferredRightBoundary).toBe(false);
		expect(empty.maxRightBoundary).toBeNaN();
	});

	it("projects max and full limit options", () => {
		const limits = {
			maxRightBoundary: 500,
			hasMaxRightBoundary: true,
			preferredRightBoundary: 400,
			hasPreferredRightBoundary: true,
		};
		expect(getVerticalRlBoundaryMaxRightBoundaryLimitOptions(limits)).toEqual({
			hasMaxRightBoundary: true,
			maxRightBoundary: 500,
		});
		expect(getVerticalRlBoundaryRightBoundaryLimitOptions(limits)).toEqual({
			hasMaxRightBoundary: true,
			maxRightBoundary: 500,
			hasPreferredRightBoundary: true,
			preferredRightBoundary: 400,
		});
	});
});

describe("boundary-mask: getVerticalRlBoundaryConstrainedOffset", () => {
	it("returns the offset untouched without boundary options", () => {
		const result = getVerticalRlBoundaryConstrainedOffset(500, 1000, 2000, {});
		expect(result.logicalOffset).toBe(500);
		expect(result.preferredRightBoundary).toBeNaN();
	});

	it("constrains the offset to the preferred right boundary", () => {
		expect(
			getVerticalRlBoundaryConstrainedOffset(500, 2000, 2000, {
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 300,
			}),
		).toEqual({ logicalOffset: 1700, preferredRightBoundary: 300 });
	});

	it("clamps the preferred boundary to the max boundary", () => {
		expect(
			getVerticalRlBoundaryConstrainedOffset(500, 2000, 2000, {
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 300,
				hasMaxRightBoundary: true,
				maxRightBoundary: 200,
			}),
		).toEqual({ logicalOffset: 1800, preferredRightBoundary: 200 });
	});
});

describe("boundary-mask: snap cache key/lookup/entry", () => {
	it("builds a stable cache key with boundary options", () => {
		expect(getVerticalRlBoundarySnapCacheKey(500, 1000, 2000, 300, 8, {})).toBe(
			"500:1000:2000:300:8:none:none",
		);
		expect(
			getVerticalRlBoundarySnapCacheKey(500, 1000, 2000, 300, 8, {
				hasMaxRightBoundary: true,
				maxRightBoundary: 200,
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 150,
			}),
		).toBe("500:1000:2000:300:8:200:150");
	});

	it("reads a cached snap only on a key match", () => {
		expect(getCachedVerticalRlBoundarySnap({ key: "k", value: 42 }, "k")).toBe(42);
		expect(getCachedVerticalRlBoundarySnap({ key: "k", value: 42 }, "other")).toBeNull();
		expect(getCachedVerticalRlBoundarySnap(null, "k")).toBeNull();
	});

	it("creates a cache entry only with a truthy nearest delta", () => {
		expect(getVerticalRlBoundarySnapCacheEntry("k", 42, 5)).toEqual({ key: "k", value: 42 });
		expect(getVerticalRlBoundarySnapCacheEntry("k", 42, 0)).toBeNull();
		expect(getVerticalRlBoundarySnapCacheEntry("k", 42, null)).toBeNull();
	});

	it("looks up a cached snap by composed key", () => {
		const key = "500:1000:2000:300:8:none:none";
		expect(getVerticalRlBoundarySnapCacheLookup({ key, value: 42 }, 500, 1000, 2000, 300, 8, {})).toEqual({
			cacheKey: key,
			cachedSnap: 42,
		});
		expect(getVerticalRlBoundarySnapCacheLookup(null, 500, 1000, 2000, 300, 8, {})).toEqual({
			cacheKey: key,
			cachedSnap: null,
		});
	});
});

describe("boundary-mask: edge guards and structural inputs", () => {
	it("clamps the edge guard into [1, 8] with a default of 2", () => {
		expect(getVerticalRlBoundarySnapEdgeGuard(0)).toBe(2);
		expect(getVerticalRlBoundarySnapEdgeGuard(5)).toBe(5);
		expect(getVerticalRlBoundarySnapEdgeGuard(20)).toBe(8);
		expect(getVerticalRlBoundarySnapEdgeGuard(-3)).toBe(1);
	});

	it("returns the raw edge guard and the guard pair", () => {
		expect(getVerticalRlBoundarySnapRawEdgeGuard(5)).toBe(5);
		expect(getVerticalRlBoundarySnapRawEdgeGuard(0)).toBe(0);
		expect(getVerticalRlBoundarySnapEdgeGuards(5)).toEqual({ edgeGuard: 5, rawEdgeGuard: 5 });
		expect(getVerticalRlBoundarySnapEdgeGuards(0)).toEqual({ edgeGuard: 2, rawEdgeGuard: 0 });
	});

	it("computes structural bleed and masks", () => {
		expect(getVerticalRlBoundarySnapStructuralBleed(300, 280)).toBe(20);
		expect(getVerticalRlBoundarySnapStructuralBleed(300, 0)).toBe(0);
		expect(getVerticalRlBoundarySnapStructuralMasks({ left: 10, right: 20 })).toEqual({ left: 10, right: 20 });
		expect(getVerticalRlBoundarySnapStructuralMasks(null)).toEqual({ left: 0, right: 0 });
	});

	it("assembles the delta inputs", () => {
		expect(getVerticalRlBoundarySnapDeltaInputs(5, { left: 10, right: 20 }, 300, 280, 15)).toEqual({
			edgeGuard: 5,
			edgeGuardPx: 5,
			structuralMasks: { left: 10, right: 20 },
			boundaryShift: 15,
			structuralBleed: 20,
		});
	});
});

describe("boundary-mask: countVerticalRlBoundaryCrossings", () => {
	it("counts rects crossing the left or right boundary", () => {
		expect(
			countVerticalRlBoundaryCrossings(
				[
					{ left: 90, right: 110 },
					{ left: 50, right: 60 },
					{ left: 390, right: 410 },
				],
				100,
				400,
			),
		).toBe(2);
		expect(countVerticalRlBoundaryCrossings([], 100, 400)).toBe(0);
	});
});

describe("boundary-mask: getVerticalRlBoundaryShiftAdjustedDelta", () => {
	it("caps the delta when shift, guard and bleed align", () => {
		expect(getVerticalRlBoundaryShiftAdjustedDelta(20, 8, 8, 5)).toBe(4);
	});

	it("returns the delta unchanged otherwise", () => {
		expect(getVerticalRlBoundaryShiftAdjustedDelta(20, 8, 8, 0)).toBe(20);
		expect(getVerticalRlBoundaryShiftAdjustedDelta(20, 0, 8, 5)).toBe(20);
		expect(getVerticalRlBoundaryShiftAdjustedDelta(-5, 8, 8, 5)).toBe(-5);
	});
});

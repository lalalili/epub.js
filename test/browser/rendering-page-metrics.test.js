import { describe, expect, it } from "vitest";
import {
	countPagesWithFractionalTolerance,
	getPageBoundaryShift,
	getPageSnapTolerance,
	hasVerticalRlStructuralPageGutter,
} from "../../src/rendering/page-metrics";

// Characterization tests for the pure numeric page-metrics helpers. These functions feed the
// vertical-RL pagination snap algorithm and are currently only covered indirectly through manager
// integration tests (snap.test.js, vertical-rl-manager.test.js, rendering-pagination.test.js).
// Pinning their input -> output behavior directly guards the frozen snap math against silent
// regressions from future upstream merges or the eventual 0.4.x strict migration.

describe("page-metrics: countPagesWithFractionalTolerance", () => {
	it("returns 1 for non-finite or non-positive inputs", () => {
		expect(countPagesWithFractionalTolerance(0, 100)).toBe(1);
		expect(countPagesWithFractionalTolerance(100, 0)).toBe(1);
		expect(countPagesWithFractionalTolerance(-10, 100)).toBe(1);
		expect(countPagesWithFractionalTolerance(Number.NaN, 100)).toBe(1);
		expect(countPagesWithFractionalTolerance(1000, Number.POSITIVE_INFINITY)).toBe(1);
	});

	it("returns the rounded page count when total length is within tolerance", () => {
		expect(countPagesWithFractionalTolerance(1000, 100)).toBe(10);
		// tolerance = max(1, min(4, pageLength*0.005)); for pageLength 800 -> 4
		expect(countPagesWithFractionalTolerance(8003, 800)).toBe(10);
		// within tolerance 1 for pageLength 100
		expect(countPagesWithFractionalTolerance(1001, 100)).toBe(10);
	});

	it("ceils the ratio when total length exceeds tolerance", () => {
		expect(countPagesWithFractionalTolerance(1040, 100)).toBe(11);
		expect(countPagesWithFractionalTolerance(8005, 800)).toBe(11);
	});
});

describe("page-metrics: getPageSnapTolerance", () => {
	it("returns the floor of 2 for non-positive advance", () => {
		expect(getPageSnapTolerance(0)).toBe(2);
		expect(getPageSnapTolerance(-5)).toBe(2);
	});

	it("clamps the snap tolerance between 2 and the advance-derived ceiling", () => {
		expect(getPageSnapTolerance(100)).toBe(8);
		expect(getPageSnapTolerance(40)).toBe(3);
		expect(getPageSnapTolerance(10)).toBe(2);
	});

	it("lets the edge guard raise the tolerance ceiling", () => {
		expect(getPageSnapTolerance(100, 20)).toBe(20);
	});
});

describe("page-metrics: getPageBoundaryShift", () => {
	it("returns 0 unless RTL vertical paginated", () => {
		expect(getPageBoundaryShift(50, 100, false)).toBe(0);
		expect(getPageBoundaryShift(50, 100)).toBe(0);
	});

	it("clamps the shift to floor(advance/3) under RTL", () => {
		expect(getPageBoundaryShift(50, 100, true)).toBe(33);
		expect(getPageBoundaryShift(10, 100, true)).toBe(10);
	});

	it("returns 0 for a non-positive shift or zero advance", () => {
		expect(getPageBoundaryShift(0, 100, true)).toBe(0);
		expect(getPageBoundaryShift(50, 0, true)).toBe(0);
	});
});

describe("page-metrics: hasVerticalRlStructuralPageGutter", () => {
	it("is true only under RTL with a real advance, width gap and no boundary shift", () => {
		expect(hasVerticalRlStructuralPageGutter(100, 200, 0, true)).toBe(true);
	});

	it("is false when not RTL, gap too small, advance missing or a shift is present", () => {
		expect(hasVerticalRlStructuralPageGutter(100, 200, 0, false)).toBe(false);
		expect(hasVerticalRlStructuralPageGutter(100, 101, 0, true)).toBe(false);
		expect(hasVerticalRlStructuralPageGutter(0, 200, 0, true)).toBe(false);
		expect(hasVerticalRlStructuralPageGutter(100, 200, 5, true)).toBe(false);
	});
});

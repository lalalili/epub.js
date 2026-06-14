import { describe, expect, it } from "vitest";
import {
	getVerticalRlBoundaryCrossingExpandTarget,
	getVerticalRlDeepRawRightStraddlerExpandTarget,
	getVerticalRlJustOutsideRawRightMaskTarget,
	getVerticalRlPreviousLeftClippedRightMaskTarget,
	getVerticalRlRawRightSnapDecisionForRects,
	getVerticalRlRawRightSnapRectInput,
	getVerticalRlRawRightSnapRectShift,
	getVerticalRlRawRightSnapShiftAggregate,
	getVerticalRlRequiredRawRightMask,
	getVerticalRlShallowRawRightStraddlerMaskTarget,
	hasVerticalRlRightEdgeMaskConsumingVisibleEdge,
	isVerticalRlRectJustOutsideRawRight,
	shouldClearVerticalRlCoveredRawRightStraddlerMask,
	shouldClearVerticalRlRawRightStraddlerMask,
} from "../../src/rendering/raw-right-snap";

// Characterization tests for the pure vertical-RL raw right-edge snap helpers. Only covered
// indirectly through manager integration tests today. Source is frozen — these lock the converged
// right-edge snap math, they do not change it.

describe("raw-right-snap: getVerticalRlRawRightSnapRectInput", () => {
	it("measures overhang and visible inside for a right straddler", () => {
		expect(getVerticalRlRawRightSnapRectInput(450, 550, 100, 500, 200, 0)).toEqual({
			clippedAtPreviousLeft: false,
			rawRightStraddler: true,
			rawRightOverhang: 50,
			visibleInsideRawRight: 50,
		});
	});

	it("returns zeros for a non-straddling rect", () => {
		expect(getVerticalRlRawRightSnapRectInput(100, 300, 50, 500, 200, 0)).toEqual({
			clippedAtPreviousLeft: false,
			rawRightStraddler: false,
			rawRightOverhang: 0,
			visibleInsideRawRight: 0,
		});
	});

	it("flags a rect clipped at the previous page left", () => {
		expect(getVerticalRlRawRightSnapRectInput(150, 250, 50, 500, 200, 100)).toEqual({
			clippedAtPreviousLeft: true,
			rawRightStraddler: false,
			rawRightOverhang: 0,
			visibleInsideRawRight: 0,
		});
	});
});

describe("raw-right-snap: edge predicates and targets", () => {
	it("isVerticalRlRectJustOutsideRawRight within tolerance", () => {
		expect(isVerticalRlRectJustOutsideRawRight(510, 500, 20)).toBe(true);
		expect(isVerticalRlRectJustOutsideRawRight(525, 500, 20)).toBe(false);
		expect(isVerticalRlRectJustOutsideRawRight(490, 500, 20)).toBe(false);
	});

	it("getVerticalRlJustOutsideRawRightMaskTarget returns the tolerance when in range", () => {
		expect(getVerticalRlJustOutsideRawRightMaskTarget(510, 500, 20)).toBe(20);
		expect(getVerticalRlJustOutsideRawRightMaskTarget(510, 500, 5)).toBe(0);
		expect(getVerticalRlJustOutsideRawRightMaskTarget(490, 500, 20)).toBe(0);
	});

	it("shallow vs deep straddler mask targets split on the tolerance", () => {
		expect(getVerticalRlShallowRawRightStraddlerMaskTarget(true, 5, 10)).toBe(6);
		expect(getVerticalRlShallowRawRightStraddlerMaskTarget(true, 15, 10)).toBe(0);
		expect(getVerticalRlDeepRawRightStraddlerExpandTarget(true, 15, 10)).toBe(16);
		expect(getVerticalRlDeepRawRightStraddlerExpandTarget(true, 5, 10)).toBe(0);
		expect(getVerticalRlDeepRawRightStraddlerExpandTarget(false, 15, 10)).toBe(0);
	});

	it("getVerticalRlBoundaryCrossingExpandTarget for crossing rects", () => {
		expect(getVerticalRlBoundaryCrossingExpandTarget(90, 110, 100)).toBe(11);
		expect(getVerticalRlBoundaryCrossingExpandTarget(200, 300, 100)).toBe(0);
		expect(getVerticalRlBoundaryCrossingExpandTarget(50, 80, 100)).toBe(0);
	});

	it("getVerticalRlPreviousLeftClippedRightMaskTarget keeps the larger of required and clipped width", () => {
		expect(getVerticalRlPreviousLeftClippedRightMaskTarget(10, 450, 500)).toBe(50);
		expect(getVerticalRlPreviousLeftClippedRightMaskTarget(100, 450, 500)).toBe(100);
		expect(getVerticalRlPreviousLeftClippedRightMaskTarget(10, 600, 500)).toBe(10);
	});
});

describe("raw-right-snap: mask-clearing predicates", () => {
	it("hasVerticalRlRightEdgeMaskConsumingVisibleEdge", () => {
		expect(hasVerticalRlRightEdgeMaskConsumingVisibleEdge(true, 10, 50, 100, 5)).toBe(true);
		expect(hasVerticalRlRightEdgeMaskConsumingVisibleEdge(true, 60, 50, 100, 5)).toBe(false);
		expect(hasVerticalRlRightEdgeMaskConsumingVisibleEdge(true, 10, 50, 30, 5)).toBe(false);
	});

	it("shouldClearVerticalRlRawRightStraddlerMask", () => {
		expect(shouldClearVerticalRlRawRightStraddlerMask(true, 3, 5, false, 10, 100)).toBe(true);
		expect(shouldClearVerticalRlRawRightStraddlerMask(true, 20, 5, true, 0, 100)).toBe(true);
		expect(shouldClearVerticalRlRawRightStraddlerMask(true, 20, 5, false, 10, 100)).toBe(false);
		expect(shouldClearVerticalRlRawRightStraddlerMask(false, 3, 5, false, 10, 100)).toBe(false);
	});

	it("shouldClearVerticalRlCoveredRawRightStraddlerMask", () => {
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 50, 5, 60, 100, 0, 100)).toBe(true);
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 50, 5, 60, 100, 10, 100)).toBe(false);
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 50, 5, 40, 100, 0, 100)).toBe(false);
	});
});

describe("raw-right-snap: getVerticalRlRequiredRawRightMask", () => {
	it("raises the required mask for a deep right straddler", () => {
		expect(getVerticalRlRequiredRawRightMask(0, 450, 550, 100, 500, 200, 0, 10)).toBe(51);
	});

	it("keeps the current required mask for a non-straddler", () => {
		expect(getVerticalRlRequiredRawRightMask(7, 100, 300, 50, 500, 200, 0, 10)).toBe(7);
	});
});

describe("raw-right-snap: getVerticalRlRawRightSnapShiftAggregate", () => {
	it("tracks expand, shrink and the expand-beyond flag separately", () => {
		expect(
			getVerticalRlRawRightSnapShiftAggregate(5, -3, false, { shift: 10, expandBeyondPaintGuard: true }),
		).toEqual({ expand: 10, shrink: -3, expandBeyondPaintGuard: true });
		expect(
			getVerticalRlRawRightSnapShiftAggregate(5, -3, false, { shift: -8, expandBeyondPaintGuard: false }),
		).toEqual({ expand: 5, shrink: -8, expandBeyondPaintGuard: false });
		expect(
			getVerticalRlRawRightSnapShiftAggregate(5, -3, true, { shift: 0, expandBeyondPaintGuard: false }),
		).toEqual({ expand: 5, shrink: -3, expandBeyondPaintGuard: true });
	});
});

describe("raw-right-snap: rect shift and decision", () => {
	it("falls back to the boundary-crossing expand for a plain crossing rect", () => {
		expect(
			getVerticalRlRawRightSnapRectShift(90, 110, 500, 100, 0, false, false, 0, 0, 10, 80, 0, 200, false),
		).toEqual({ shift: 11, expandBeyondPaintGuard: false });
	});

	it("returns a snap decision with the masked right edge clamped to the paint guard", () => {
		expect(
			getVerticalRlRawRightSnapDecisionForRects([{ left: 380, right: 420 }], 50, 500, 100, 0, 10, 100, 80, 60, 200, false),
		).toEqual({
			shift: 21,
			right: 60,
			requiredRawRightMask: 0,
			expandBeyondPaintGuard: false,
		});
	});
});

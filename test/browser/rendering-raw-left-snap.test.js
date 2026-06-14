import { describe, expect, it } from "vitest";
import {
	getVerticalRlRawLeftBoundaryCrossingShift,
	getVerticalRlRawLeftCoveredShrinkShift,
	getVerticalRlRawLeftSnapDecisionForRects,
	getVerticalRlRawLeftSnapRectInput,
	getVerticalRlRawLeftSnapRectShift,
	getVerticalRlRawLeftSnapShiftAggregate,
	getVerticalRlRawLeftSnapShiftForRects,
	getVerticalRlRawLeftVisibleExpandShift,
} from "../../src/rendering/raw-left-snap";

// Characterization tests for the pure vertical-RL raw left-edge snap helpers. Only covered
// indirectly through manager integration tests today; these pin the converged snap math directly.
// Source is frozen (RTL pagination) — locks current behavior, does not change it.

describe("raw-left-snap: getVerticalRlRawLeftSnapRectInput", () => {
	it("flags a straddling rect that stays visible at the next right edge", () => {
		expect(getVerticalRlRawLeftSnapRectInput(50, 150, 100, 500, 200, 10)).toEqual({
			rawLeftStraddler: true,
			hasNextPage: true,
			clippedAtNextRight: false,
			visibleAtNextRight: true,
			nearlyVisibleAtNextRight: true,
		});
	});

	it("marks clipped when there is no next page", () => {
		expect(getVerticalRlRawLeftSnapRectInput(50, 150, 100, 500, 0, 10)).toEqual({
			rawLeftStraddler: true,
			hasNextPage: false,
			clippedAtNextRight: true,
			visibleAtNextRight: false,
			nearlyVisibleAtNextRight: false,
		});
	});

	it("marks clipped when the shifted right exceeds the viewport", () => {
		expect(getVerticalRlRawLeftSnapRectInput(200, 400, 100, 500, 200, 10)).toEqual({
			rawLeftStraddler: false,
			hasNextPage: true,
			clippedAtNextRight: true,
			visibleAtNextRight: false,
			nearlyVisibleAtNextRight: false,
		});
	});
});

describe("raw-left-snap: getVerticalRlRawLeftBoundaryCrossingShift", () => {
	it("returns 0 when the rect does not cross the boundary", () => {
		expect(getVerticalRlRawLeftBoundaryCrossingShift(200, 300, 100, 50, false, false, false, false)).toBe(0);
	});

	it("expands when a next page keeps the rect visible", () => {
		expect(getVerticalRlRawLeftBoundaryCrossingShift(90, 110, 100, 50, true, true, false, false)).toBe(11);
	});

	it("shrinks when the rect crosses and there is room to the left", () => {
		expect(getVerticalRlRawLeftBoundaryCrossingShift(90, 110, 100, 50, false, false, false, false)).toBe(-11);
	});

	it("falls back to expand when there is no room to shrink", () => {
		expect(getVerticalRlRawLeftBoundaryCrossingShift(90, 110, 100, 5, false, false, false, false)).toBe(11);
	});
});

describe("raw-left-snap: getVerticalRlRawLeftCoveredShrinkShift", () => {
	it("returns a negative shrink toward the visible left edge", () => {
		expect(
			getVerticalRlRawLeftCoveredShrinkShift(150, 180, 100, 200, 60, false, false, false, false, false, false, true),
		).toBe(-11);
	});

	it("returns 0 when the left mask is already collapsed", () => {
		expect(
			getVerticalRlRawLeftCoveredShrinkShift(150, 180, 100, 200, 0, false, false, false, false, false, false, true),
		).toBe(0);
	});
});

describe("raw-left-snap: getVerticalRlRawLeftVisibleExpandShift", () => {
	it("expands toward the rect end when visible within tolerance", () => {
		expect(getVerticalRlRawLeftVisibleExpandShift(105, 200, 50, 100, 30, true, 10)).toBe(121);
	});

	it("returns 0 when not visible, before the edge, or beyond tolerance", () => {
		expect(getVerticalRlRawLeftVisibleExpandShift(105, 200, 50, 100, 30, false, 10)).toBe(0);
		expect(getVerticalRlRawLeftVisibleExpandShift(90, 200, 50, 100, 30, true, 10)).toBe(0);
		expect(getVerticalRlRawLeftVisibleExpandShift(105, 200, 50, 100, 30, true, 2)).toBe(0);
		expect(getVerticalRlRawLeftVisibleExpandShift(105, 200, 50, 100, 0, true, 10)).toBe(0);
	});
});

describe("raw-left-snap: getVerticalRlRawLeftSnapShiftAggregate", () => {
	it("keeps the larger positive and smaller negative shift", () => {
		expect(getVerticalRlRawLeftSnapShiftAggregate(5, 10)).toBe(10);
		expect(getVerticalRlRawLeftSnapShiftAggregate(5, -10)).toBe(-10);
		expect(getVerticalRlRawLeftSnapShiftAggregate(5, 0)).toBe(5);
		expect(getVerticalRlRawLeftSnapShiftAggregate(-3, -10)).toBe(-10);
	});
});

describe("raw-left-snap: getVerticalRlRawLeftSnapRectShift", () => {
	it("returns the boundary crossing expand for a visible next-page rect", () => {
		expect(
			getVerticalRlRawLeftSnapRectShift(90, 110, 50, 100, 60, false, true, false, true, true, false, false, false, 10),
		).toBe(11);
	});

	it("returns 0 for a collapsed, straddling, clipped rect with no mask forced", () => {
		expect(
			getVerticalRlRawLeftSnapRectShift(90, 110, 50, 100, 0, true, true, true, false, false, false, false, false, 10),
		).toBe(0);
	});
});

describe("raw-left-snap: aggregate over rects", () => {
	it("aggregates the snap shift across rects", () => {
		expect(
			getVerticalRlRawLeftSnapShiftForRects([{ left: 90, right: 110 }], 50, 500, 100, 60, 200, false, false, false, 10),
		).toBe(11);
	});

	it("returns a snap decision with the masked left edge", () => {
		expect(
			getVerticalRlRawLeftSnapDecisionForRects([{ left: 80, right: 100 }], 50, 500, 40, 1000, 200, false, false, false, 10),
		).toEqual({ shift: 11, left: 51 });
	});
});

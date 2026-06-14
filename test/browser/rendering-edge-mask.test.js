import { describe, expect, it } from "vitest";
import {
	getRenderedVerticalRlEdgeMaskWidths,
	getVerticalRlEdgeMaskLimit,
	getVerticalRlEdgeMaskSnapInput,
	getVerticalRlEdgeMaskSnapViewportInput,
	getVerticalRlEdgeMaskWidth,
	getVerticalRlPreviousPageRightMask,
	getVerticalRlSnappedLeftEdgeMask,
	getVerticalRlSnappedRightEdgeMask,
	getVerticalRlStructuralGutterEdgeMaskSnapInput,
	hasVerticalRlEdgeMaskStructuralGutter,
	runVerticalRlEdgeMaskSnapLoop,
} from "../../src/rendering/edge-mask";

// Characterization tests for the pure vertical-RL edge-mask helpers (mask limits, snap loop,
// structural-gutter detection, snap input builders and the left/right edge-mask clamps). Only
// covered indirectly through manager integration tests today. Source is frozen — these lock the
// current snap-mask math, they do not change it.

describe("edge-mask: getVerticalRlEdgeMaskLimit", () => {
	it("is floor(advance/4) clamped at 0", () => {
		expect(getVerticalRlEdgeMaskLimit(100)).toBe(25);
		expect(getVerticalRlEdgeMaskLimit(90)).toBe(22);
		expect(getVerticalRlEdgeMaskLimit(0)).toBe(0);
		expect(getVerticalRlEdgeMaskLimit(-40)).toBe(0);
	});
});

describe("edge-mask: runVerticalRlEdgeMaskSnapLoop", () => {
	it("runs up to the iteration limit when the shift never settles", () => {
		expect(runVerticalRlEdgeMaskSnapLoop(() => 5, () => 3, 4)).toEqual({
			iterations: 4,
			lastShift: 8,
			stopped: false,
		});
	});

	it("stops as soon as the combined shift is zero", () => {
		expect(runVerticalRlEdgeMaskSnapLoop(() => 0, () => 0, 4)).toEqual({
			iterations: 1,
			lastShift: 0,
			stopped: true,
		});

		let calls = 0;
		const result = runVerticalRlEdgeMaskSnapLoop(
			() => {
				calls += 1;
				return calls < 2 ? 5 : 0;
			},
			() => 0,
			4,
		);
		expect(result).toEqual({ iterations: 2, lastShift: 0, stopped: true });
	});

	it("does not iterate for a zero limit", () => {
		expect(runVerticalRlEdgeMaskSnapLoop(() => 5, () => 3, 0)).toEqual({
			iterations: 0,
			lastShift: 0,
			stopped: false,
		});
	});
});

describe("edge-mask: hasVerticalRlEdgeMaskStructuralGutter", () => {
	it("is true when the page nearly fills the viewport with no shift on the first page", () => {
		expect(hasVerticalRlEdgeMaskStructuralGutter(300, 290, 10, 0, 0, 0)).toBe(true);
	});

	it("requires a matching previous step on interior pages", () => {
		expect(hasVerticalRlEdgeMaskStructuralGutter(300, 290, 10, 0, 2, 290)).toBe(true);
		expect(hasVerticalRlEdgeMaskStructuralGutter(300, 290, 10, 0, 2, 100)).toBe(false);
	});

	it("is false with a boundary shift or a width mismatch", () => {
		expect(hasVerticalRlEdgeMaskStructuralGutter(300, 290, 10, 5, 0, 0)).toBe(false);
		expect(hasVerticalRlEdgeMaskStructuralGutter(300, 200, 10, 0, 0, 0)).toBe(false);
	});
});

describe("edge-mask: getVerticalRlPreviousPageRightMask", () => {
	it("returns the clamped overlap of the previous page", () => {
		expect(getVerticalRlPreviousPageRightMask(300, 250, 10, 100)).toBe(40);
		expect(getVerticalRlPreviousPageRightMask(300, 250, 10, 5)).toBe(5);
	});

	it("returns 0 when there is no overlap or a missing input", () => {
		expect(getVerticalRlPreviousPageRightMask(300, 280, 50, 100)).toBe(0);
		expect(getVerticalRlPreviousPageRightMask(300, 0, 10, 100)).toBe(0);
	});
});

describe("edge-mask: snap input builders", () => {
	it("builds the standard snap input and clamps widths to the mask limit", () => {
		expect(getVerticalRlEdgeMaskSnapInput(30, 50, 100, 5)).toEqual({
			widths: { left: 30, right: 50 },
			maxMask: 100,
			previousPageStep: 5,
			rightMaxMask: 50,
		});
		expect(getVerticalRlEdgeMaskSnapInput(200, 300, 100)).toEqual({
			widths: { left: 100, right: 100 },
			maxMask: 100,
			previousPageStep: 0,
			rightMaxMask: 100,
		});
	});

	it("returns null when there is no mask limit", () => {
		expect(getVerticalRlEdgeMaskSnapInput(30, 50, 0)).toBeNull();
		expect(getVerticalRlStructuralGutterEdgeMaskSnapInput(30, 50, 0, 200)).toBeNull();
	});

	it("builds the structural-gutter snap input with a zero right max mask", () => {
		expect(getVerticalRlStructuralGutterEdgeMaskSnapInput(30, 50, 100, 200)).toEqual({
			widths: { left: 30, right: 50 },
			maxMask: 100,
			nextPageStep: 200,
			rightMaxMask: 0,
		});
	});
});

describe("edge-mask: getRenderedVerticalRlEdgeMaskWidths", () => {
	it("takes the max of computed and rendered widths", () => {
		expect(getRenderedVerticalRlEdgeMaskWidths({ left: 10, right: 20 }, 30, 40, 5)).toEqual({
			left: 30,
			right: 40,
		});
		expect(getRenderedVerticalRlEdgeMaskWidths({ left: 50, right: 60 }, 30, 40, 5)).toEqual({
			left: 50,
			right: 60,
		});
	});

	it("falls back for non-finite rendered widths", () => {
		expect(getRenderedVerticalRlEdgeMaskWidths(null, Number.NaN, Number.NaN, 15)).toEqual({
			left: 15,
			right: 0,
		});
	});
});

describe("edge-mask: getVerticalRlEdgeMaskWidth", () => {
	it("returns the larger of left and right", () => {
		expect(getVerticalRlEdgeMaskWidth({ left: 30, right: 50 })).toBe(50);
		expect(getVerticalRlEdgeMaskWidth({ left: 80, right: 20 })).toBe(80);
		expect(getVerticalRlEdgeMaskWidth(null)).toBe(0);
	});
});

describe("edge-mask: getVerticalRlEdgeMaskSnapViewportInput", () => {
	it("derives raw viewport bounds and limits with no edge guard", () => {
		expect(
			getVerticalRlEdgeMaskSnapViewportInput({ left: 30, right: 50 }, 100, 200, 800, 50, {}, 200, 0),
		).toEqual({
			rawLeft: 150,
			rawRight: 750,
			leftMaxMask: 100,
			rightMaxMask: 100,
			left: 30,
			right: 50,
			nextPageStep: 200,
			previousPageStep: 0,
			forceRawLeftMask: false,
			allowRawLeftMask: false,
			edgeTolerance: 1,
			hasStructuralEdgeGuard: false,
			canExpandClippedRawRight: false,
			rightPaintGuardMax: 100,
		});
	});

	it("raises the edge tolerance and structural guard when an edge guard is present", () => {
		const result = getVerticalRlEdgeMaskSnapViewportInput(
			{ left: 30, right: 50 },
			100,
			200,
			800,
			50,
			{ allowRawRightMask: true },
			200,
			8,
		);
		expect(result.edgeTolerance).toBe(4);
		expect(result.hasStructuralEdgeGuard).toBe(true);
		expect(result.canExpandClippedRawRight).toBe(true);
	});
});

describe("edge-mask: getVerticalRlSnappedRightEdgeMask", () => {
	it("returns the current right when there is no shift", () => {
		expect(getVerticalRlSnappedRightEdgeMask(50, 0, 100, 80, 10, 60, false)).toBe(50);
	});

	it("clamps a positive shift to the paint guard unless expansion is allowed", () => {
		expect(getVerticalRlSnappedRightEdgeMask(50, 20, 100, 80, 10, 60, false)).toBe(60);
		expect(getVerticalRlSnappedRightEdgeMask(50, 20, 100, 80, 10, 60, true)).toBe(70);
	});

	it("clamps a negative shift against the required masks", () => {
		expect(getVerticalRlSnappedRightEdgeMask(50, -30, 100, 80, 10, 60, false)).toBe(20);
	});
});

describe("edge-mask: getVerticalRlSnappedLeftEdgeMask", () => {
	it("returns the current left when there is no shift", () => {
		expect(getVerticalRlSnappedLeftEdgeMask(40, 0, 1000)).toBe(40);
	});

	it("applies the shift clamped into [0, leftMaxMask]", () => {
		expect(getVerticalRlSnappedLeftEdgeMask(40, 11, 1000)).toBe(51);
		expect(getVerticalRlSnappedLeftEdgeMask(40, -50, 1000)).toBe(0);
		expect(getVerticalRlSnappedLeftEdgeMask(40, 20, 50)).toBe(50);
	});
});

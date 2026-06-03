import { describe, expect, it } from "vitest";
import {
	cacheVerticalRlLogicalPageOffset,
	countPagesWithFractionalTolerance,
	countVerticalRlBoundaryCrossings,
	evaluateVerticalRlBoundaryModel,
	getBestVerticalRlBoundarySnap,
	getCachedVerticalRlBoundarySnap,
	getCachedVerticalRlLogicalPageOffset,
	getCurrentPageIndexForOffset,
	getLogicalOffsetForPageIndex,
	getPageBoundaryShift,
	getPageSnapTolerance,
	getPreviousVerticalRlLeftMaskInput,
	getRenderedVerticalRlEdgeMaskWidths,
	getVerticalRlBoundaryCrossingExpandTarget,
	getVerticalRlBoundaryConstrainedOffset,
	getVerticalRlBoundaryMaxRightBoundaryLimitOptions,
	getVerticalRlBoundaryRightBoundaryLimits,
	getVerticalRlBoundaryRightBoundaryLimitOptions,
	getVerticalRlBoundarySnapCacheLookup,
	getVerticalRlBoundarySnapCandidateRects,
	getVerticalRlBoundarySnapCacheEntry,
	getVerticalRlBoundarySnapCacheKey,
	getVerticalRlBoundarySnapDelta,
	getVerticalRlBoundarySnapDeltaInputs,
	getVerticalRlBoundarySnapEdgeGuard,
	getVerticalRlBoundarySnapEdgeGuards,
	getVerticalRlBoundarySnapMeasurementInputs,
	getVerticalRlBoundarySnapModels,
	getVerticalRlBoundarySnapPipelineResult,
	getVerticalRlBoundarySnapPreflight,
	getVerticalRlBoundarySnapRawEdgeGuard,
	getVerticalRlBoundarySnapResult,
	getVerticalRlBoundarySnapStructuralMasks,
	getVerticalRlBoundarySnapStructuralBleed,
	getVerticalRlBoundarySnapViewportBounds,
	getVerticalRlBoundaryShiftAdjustedDelta,
	getVerticalRlBoundarySnappedOffset,
	getVerticalRlCleanPageEdgeMaskInput,
	getVerticalRlCurrentEffectiveLeftBoundary,
	getVerticalRlDeepRawRightStraddlerExpandTarget,
	getVerticalRlEdgeMaskLimit,
	getVerticalRlEdgeMaskSnapInput,
	getVerticalRlEdgeMaskSnapViewportInput,
	getVerticalRlEdgeMaskWidth,
	getVerticalRlJustOutsideRawRightMaskTarget,
	getVerticalRlLogicalPageStepToNextPage,
	getVerticalRlPreviousLeftClippedRightMaskTarget,
	getVerticalRlPreviousPageRightMask,
	getVerticalRlRawLeftBoundaryCrossingShift,
	getVerticalRlRawLeftCoveredShrinkShift,
	getVerticalRlRawLeftSnapDecisionForRects,
	getVerticalRlRawLeftSnapShiftAggregate,
	getVerticalRlRawLeftSnapShiftForRects,
	getVerticalRlRawLeftSnapRectShift,
	getVerticalRlRawLeftSnapRectInput,
	getVerticalRlRawLeftVisibleExpandShift,
	getVerticalRlRawRightSnapDecisionForRects,
	getVerticalRlRawRightSnapRectInput,
	getVerticalRlRawRightSnapShiftAggregate,
	getVerticalRlRawRightSnapShiftForRects,
	getVerticalRlRawRightSnapRectShift,
	getVerticalRlRawRightSnapRectShiftForRect,
	getVerticalRlRequiredRawRightMask,
	getVerticalRlRequiredRawRightMaskForRects,
	getVerticalRlClosestViewportRect,
	getVerticalRlClosestViewportRectCoordinates,
	getVerticalRlRectDistanceToLogicalViewport,
	getVerticalRlSequentialRightBoundaryConstraint,
	getVerticalRlShallowRawRightStraddlerMaskTarget,
	getVerticalRlSnappedLeftEdgeMask,
	getVerticalRlSnappedRightEdgeMask,
	getVerticalRlLogicalPageOffsetCacheKey,
	getVerticalRlStructuralGutterEdgeMaskSnapInput,
	getVerticalRlStructuralEdgeMaskInput,
	getVerticalRlViewportRect,
	getVerticalRlViewportRectCoordinates,
	getVerticalRlClosestViewportRects,
	getVerticalRlViewportRects,
	hasVerticalRlRightEdgeMaskConsumingVisibleEdge,
	hasVerticalRlEdgeMaskStructuralGutter,
	hasVerticalRlStructuralPageGutter,
	isVerticalRlRectJustOutsideRawRight,
	isVerticalRlBoundarySnapTextReady,
	runVerticalRlEdgeMaskSnapLoop,
	shouldClearVerticalRlCoveredRawRightStraddlerMask,
	shouldClearVerticalRlRawRightStraddlerMask
} from "../../src/rendering/pagination";

describe("rendering pagination helpers", () => {
	it("counts exact page multiples", () => {
		expect(countPagesWithFractionalTolerance(3000, 1000)).toBe(3);
	});

	it("treats small fractional drift as a full-page multiple", () => {
		expect(countPagesWithFractionalTolerance(3001, 1000)).toBe(3);
		expect(countPagesWithFractionalTolerance(2997, 1000)).toBe(3);
	});

	it("rounds up when drift exceeds tolerance", () => {
		expect(countPagesWithFractionalTolerance(3006, 1000)).toBe(4);
	});

	it("falls back to one page for invalid measurements", () => {
		expect(countPagesWithFractionalTolerance(0, 1000)).toBe(1);
		expect(countPagesWithFractionalTolerance(1000, 0)).toBe(1);
		expect(countPagesWithFractionalTolerance(Number.NaN, 1000)).toBe(1);
	});

	it("uses the 8 percent snap tolerance for ordinary pages", () => {
		expect(getPageSnapTolerance(1000)).toBe(80);
	});

	it("respects edge guard when it is larger than the proportional tolerance", () => {
		expect(getPageSnapTolerance(1000, 120)).toBe(120);
	});

	it("caps snap tolerance at a quarter page", () => {
		expect(getPageSnapTolerance(1000, 300)).toBe(250);
	});

	it("falls back to the minimum snap tolerance without a valid page advance", () => {
		expect(getPageSnapTolerance(0, 50)).toBe(2);
		expect(getPageSnapTolerance(Number.NaN, 50)).toBe(2);
	});

	it("disables page boundary shift outside vertical-rl pagination", () => {
		expect(getPageBoundaryShift(120, 1000, false)).toBe(0);
	});

	it("uses page boundary shift for vertical-rl pagination", () => {
		expect(getPageBoundaryShift(120, 1000, true)).toBe(120);
	});

	it("caps page boundary shift at one third of the page advance", () => {
		expect(getPageBoundaryShift(500, 900, true)).toBe(300);
	});

	it("ignores invalid page boundary shift measurements", () => {
		expect(getPageBoundaryShift(0, 1000, true)).toBe(0);
		expect(getPageBoundaryShift(-10, 1000, true)).toBe(0);
		expect(getPageBoundaryShift(Number.NaN, 1000, true)).toBe(0);
		expect(getPageBoundaryShift(120, 0, true)).toBe(0);
	});

	it("detects structural vertical-rl gutters when visible width exceeds page advance", () => {
		expect(hasVerticalRlStructuralPageGutter(900, 930, 0, true)).toBe(true);
	});

	it("disables structural gutters outside vertical-rl pagination", () => {
		expect(hasVerticalRlStructuralPageGutter(900, 930, 0, false)).toBe(false);
	});

	it("disables structural gutters without enough visible bleed", () => {
		expect(hasVerticalRlStructuralPageGutter(900, 901, 0, true)).toBe(false);
		expect(hasVerticalRlStructuralPageGutter(900, 900, 0, true)).toBe(false);
	});

	it("disables structural gutters when page boundary shift is active or measurements are invalid", () => {
		expect(hasVerticalRlStructuralPageGutter(900, 930, 1, true)).toBe(false);
		expect(hasVerticalRlStructuralPageGutter(0, 930, 0, true)).toBe(false);
		expect(hasVerticalRlStructuralPageGutter(900, 0, 0, true)).toBe(false);
	});

	it("uses a quarter page as the vertical-rl edge mask limit", () => {
		expect(getVerticalRlEdgeMaskLimit(900)).toBe(225);
		expect(getVerticalRlEdgeMaskLimit(901)).toBe(225);
	});

	it("clamps invalid vertical-rl edge mask limits to zero", () => {
		expect(getVerticalRlEdgeMaskLimit(0)).toBe(0);
		expect(getVerticalRlEdgeMaskLimit(-10)).toBe(0);
		expect(getVerticalRlEdgeMaskLimit(Number.NaN)).toBe(0);
	});

	it("stops vertical-rl edge-mask snap loops when combined shifts reach zero", () => {
		let calls = 0;
		let result = runVerticalRlEdgeMaskSnapLoop(
			() => {
				calls++;
				return calls === 1 ? 12 : 0;
			},
			() => calls === 1 ? -12 : 0,
			4
		);

		expect(result).toEqual({
			iterations: 1,
			lastShift: 0,
			stopped: true
		});
	});

	it("runs vertical-rl edge-mask snap loops until the iteration cap", () => {
		let leftCalls = 0;
		let rightCalls = 0;
		let result = runVerticalRlEdgeMaskSnapLoop(
			() => {
				leftCalls++;
				return 2;
			},
			() => {
				rightCalls++;
				return 1;
			},
			3
		);

		expect(result).toEqual({
			iterations: 3,
			lastShift: 3,
			stopped: false
		});
		expect(leftCalls).toBe(3);
		expect(rightCalls).toBe(3);
	});

	it("clamps invalid vertical-rl edge-mask snap loop iteration caps", () => {
		let calls = 0;
		let result = runVerticalRlEdgeMaskSnapLoop(
			() => {
				calls++;
				return 1;
			},
			() => 0,
			Number.NaN
		);

		expect(result).toEqual({
			iterations: 0,
			lastShift: 0,
			stopped: false
		});
		expect(calls).toBe(0);
	});

	it("detects structural gutters in vertical-rl edge-mask input", () => {
		expect(hasVerticalRlEdgeMaskStructuralGutter(930, 900, 30, 0, 0, 0)).toBe(true);
		expect(hasVerticalRlEdgeMaskStructuralGutter(930, 900, 30, 0, 2, 900)).toBe(true);
	});

	it("disables vertical-rl edge-mask structural gutters when shifted or off grid", () => {
		expect(hasVerticalRlEdgeMaskStructuralGutter(930, 900, 30, 1, 0, 0)).toBe(false);
		expect(hasVerticalRlEdgeMaskStructuralGutter(930, 900, 30, 0, 2, 870)).toBe(false);
	});

	it("disables vertical-rl edge-mask structural gutters without valid measurements", () => {
		expect(hasVerticalRlEdgeMaskStructuralGutter(0, 900, 30, 0, 0, 0)).toBe(false);
		expect(hasVerticalRlEdgeMaskStructuralGutter(930, 0, 30, 0, 0, 0)).toBe(false);
	});

	it("calculates right masks from previous-page vertical-rl overlap", () => {
		expect(getVerticalRlPreviousPageRightMask(930, 900, 20, 225)).toBe(10);
		expect(getVerticalRlPreviousPageRightMask(1300, 900, 20, 225)).toBe(225);
	});

	it("clamps previous-page vertical-rl right masks without overlap or mask room", () => {
		expect(getVerticalRlPreviousPageRightMask(930, 930, 20, 225)).toBe(0);
		expect(getVerticalRlPreviousPageRightMask(930, 900, 20, 0)).toBe(0);
		expect(getVerticalRlPreviousPageRightMask(0, 900, 20, 225)).toBe(0);
	});

	it("builds vertical-rl edge-mask snap input for fallback snapping", () => {
		expect(getVerticalRlEdgeMaskSnapInput(300, 40, 225, 870)).toEqual({
			widths: { left: 225, right: 40 },
			maxMask: 225,
			previousPageStep: 870,
			rightMaxMask: 40
		});
	});

	it("returns no vertical-rl edge-mask snap input without mask room", () => {
		expect(getVerticalRlEdgeMaskSnapInput(30, 10, 0, 900)).toBeNull();
	});

	it("clamps vertical-rl edge-mask snap input masks to the mask limit", () => {
		expect(getVerticalRlEdgeMaskSnapInput(30, 300, 225, 900)?.widths).toEqual({
			left: 30,
			right: 225
		});
		expect(getVerticalRlEdgeMaskSnapInput(30, 300, 225, 900)?.rightMaxMask).toBe(225);
	});

	it("builds structural-gutter vertical-rl edge-mask snap input", () => {
		expect(getVerticalRlStructuralGutterEdgeMaskSnapInput(300, 0, 225, 900)).toEqual({
			widths: { left: 225, right: 0 },
			maxMask: 225,
			nextPageStep: 900,
			rightMaxMask: 0
		});
	});

	it("returns no structural-gutter edge-mask snap input without mask room", () => {
		expect(getVerticalRlStructuralGutterEdgeMaskSnapInput(30, 0, 0, 900)).toBeNull();
	});

	it("merges computed and rendered vertical-rl edge-mask widths", () => {
		expect(getRenderedVerticalRlEdgeMaskWidths({ left: 20, right: 8 }, 30, 4, Number.NaN)).toEqual({
			left: 30,
			right: 8
		});
	});

	it("uses rendered vertical-rl fallback masks when side-specific values are missing", () => {
		expect(getRenderedVerticalRlEdgeMaskWidths({ left: 20, right: 8 }, Number.NaN, Number.NaN, 24)).toEqual({
			left: 24,
			right: 8
		});
	});

	it("falls back to zero for invalid rendered vertical-rl edge masks", () => {
		expect(getRenderedVerticalRlEdgeMaskWidths(null, Number.NaN, Number.NaN, Number.NaN)).toEqual({
			left: 0,
			right: 0
		});
	});

	it("returns the largest vertical-rl edge mask width", () => {
		expect(getVerticalRlEdgeMaskWidth({ left: 20, right: 8 })).toBe(20);
		expect(getVerticalRlEdgeMaskWidth({ left: 4, right: 18 })).toBe(18);
	});

	it("falls back to zero for invalid vertical-rl edge mask widths", () => {
		expect(getVerticalRlEdgeMaskWidth(null)).toBe(0);
		expect(getVerticalRlEdgeMaskWidth({ left: Number.NaN, right: Number.NaN })).toBe(0);
	});

	it("uses measured vertical-rl logical page step to the next page", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(900, 5, 1, 2, 900, 1800, false)).toBe(900);
		expect(getVerticalRlLogicalPageStepToNextPage(900, 5, 1, 2, 900, 1740, false)).toBe(840);
	});

	it("uses page advance for final structural-gutter vertical-rl steps", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(900, 5, 3, 4, 2700, 3650, true)).toBe(900);
	});

	it("keeps oversized final vertical-rl steps without a structural gutter", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(900, 5, 3, 4, 2700, 3650, false)).toBe(950);
	});

	it("falls back to page advance without a measured vertical-rl next-page step", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(900, 5, 1, 2, 900, 900, false)).toBe(900);
	});

	it("builds vertical-rl edge-mask snap viewport input from viewport rects", () => {
		expect(
			getVerticalRlEdgeMaskSnapViewportInput(
				{ left: 300, right: 40 },
				225,
				100,
				1000,
				40,
				{},
				900,
				2
			)
		).toEqual({
			rawLeft: 60,
			rawRight: 960,
			leftMaxMask: 225,
			rightMaxMask: 225,
			left: 225,
			right: 40,
			nextPageStep: 900,
			previousPageStep: 0,
			forceRawLeftMask: false,
			allowRawLeftMask: false,
			edgeTolerance: 2,
			hasStructuralEdgeGuard: true,
			canExpandClippedRawRight: true,
			rightPaintGuardMax: 225
		});
	});

	it("honors vertical-rl edge-mask snap viewport limit overrides", () => {
		expect(
			getVerticalRlEdgeMaskSnapViewportInput(
				{ left: 300, right: 40 },
				225,
				100,
				1000,
				40,
				{
					rawLeft: 500,
					rawRight: 900,
					leftMaxMask: 12,
					rightMaxMask: 8,
					nextPageStep: 860,
					previousPageStep: 840,
					forceRawLeftMask: true,
					allowRawLeftMask: true
				},
				900,
				0
			)
		).toEqual({
			rawLeft: 500,
			rawRight: 900,
			leftMaxMask: 12,
			rightMaxMask: 8,
			left: 12,
			right: 8,
			nextPageStep: 860,
			previousPageStep: 840,
			forceRawLeftMask: true,
			allowRawLeftMask: true,
			edgeTolerance: 1,
			hasStructuralEdgeGuard: false,
			canExpandClippedRawRight: false,
			rightPaintGuardMax: 8
		});
	});

	it("allows raw-right expansion for clipped or explicitly allowed vertical-rl viewports", () => {
		expect(
			getVerticalRlEdgeMaskSnapViewportInput(
				{ left: 0, right: 0 },
				100,
				100,
				1000,
				-40,
				{},
				900,
				0
			).canExpandClippedRawRight
		).toBe(true);
		expect(
			getVerticalRlEdgeMaskSnapViewportInput(
				{ left: 0, right: 0 },
				100,
				100,
				1000,
				40,
				{ allowRawRightMask: true },
				900,
				0
			).canExpandClippedRawRight
		).toBe(true);
	});

	it("applies vertical-rl right edge-mask expansion within the paint guard", () => {
		expect(getVerticalRlSnappedRightEdgeMask(2, 6, 100, 40, 0, 4, false)).toBe(4);
	});

	it("applies vertical-rl right edge-mask expansion beyond the paint guard when needed", () => {
		expect(getVerticalRlSnappedRightEdgeMask(2, 60, 100, 40, 0, 4, true)).toBe(62);
	});

	it("clamps vertical-rl right edge-mask expansion to the mask limit", () => {
		expect(getVerticalRlSnappedRightEdgeMask(80, 60, 100, 40, 0, 4, true)).toBe(100);
	});

	it("applies vertical-rl right edge-mask shrink to the shifted width", () => {
		expect(getVerticalRlSnappedRightEdgeMask(30, -20, 100, 12, 18, 4, false)).toBe(10);
		expect(getVerticalRlSnappedRightEdgeMask(30, -20, 100, 12, 0, 4, false)).toBe(10);
	});

	it("keeps vertical-rl right edge masks unchanged without shift", () => {
		expect(getVerticalRlSnappedRightEdgeMask(30, 0, 100, 12, 18, 4, false)).toBe(30);
	});

	it("applies vertical-rl left edge-mask expansion within the mask limit", () => {
		expect(getVerticalRlSnappedLeftEdgeMask(10, 12, 40)).toBe(22);
	});

	it("clamps vertical-rl left edge-mask expansion to the mask limit", () => {
		expect(getVerticalRlSnappedLeftEdgeMask(30, 20, 40)).toBe(40);
	});

	it("applies vertical-rl left edge-mask shrink without crossing zero", () => {
		expect(getVerticalRlSnappedLeftEdgeMask(30, -12, 40)).toBe(18);
		expect(getVerticalRlSnappedLeftEdgeMask(10, -20, 40)).toBe(0);
	});

	it("keeps vertical-rl left edge masks unchanged without shift", () => {
		expect(getVerticalRlSnappedLeftEdgeMask(30, 0, 40)).toBe(30);
	});

	it("calculates required vertical-rl raw-right masks for deep right straddlers", () => {
		expect(getVerticalRlRequiredRawRightMask(0, 940, 1020, 100, 1000, 900, 100, 4)).toBe(61);
		expect(getVerticalRlRequiredRawRightMask(20, 940, 1020, 100, 1000, 900, 100, 4)).toBe(61);
	});

	it("keeps larger existing required vertical-rl raw-right masks", () => {
		expect(getVerticalRlRequiredRawRightMask(80, 940, 1020, 100, 1000, 900, 100, 4)).toBe(80);
	});

	it("ignores vertical-rl raw-right candidates outside the raw-right boundary", () => {
		expect(getVerticalRlRequiredRawRightMask(0, 900, 990, 100, 1000, 800, 100, 4)).toBe(0);
		expect(getVerticalRlRequiredRawRightMask(0, 1000, 1020, 100, 1000, 800, 100, 4)).toBe(0);
	});

	it("ignores vertical-rl raw-right candidates clipped by the previous page", () => {
		expect(getVerticalRlRequiredRawRightMask(0, 940, 1020, 100, 1000, 960, 100, 4)).toBe(0);
	});

	it("ignores shallow vertical-rl raw-right overhangs and tolerance-only exposure", () => {
		expect(getVerticalRlRequiredRawRightMask(0, 940, 1003, 100, 1000, 800, 100, 4)).toBe(0);
		expect(getVerticalRlRequiredRawRightMask(0, 998, 1020, 100, 1000, 800, 100, 4)).toBe(0);
	});

	it("calculates required vertical-rl raw-right masks across rect collections", () => {
		expect(getVerticalRlRequiredRawRightMaskForRects([
			{ left: 900, right: 990 },
			{ left: 940, right: 1020 },
			{ left: 930, right: 1030 }
		], 100, 1000, 800, 100, 4)).toBe(71);
	});

	it("keeps initial required vertical-rl raw-right masks across rect collections", () => {
		expect(getVerticalRlRequiredRawRightMaskForRects([
			{ left: 940, right: 1020 }
		], 100, 1000, 800, 100, 4, 80)).toBe(80);
	});

	it("returns initial required vertical-rl raw-right masks for empty rect collections", () => {
		expect(getVerticalRlRequiredRawRightMaskForRects([], 100, 1000, 800, 100, 4, 12)).toBe(12);
	});

	it("builds vertical-rl raw-right snap rect input for right straddlers", () => {
		expect(getVerticalRlRawRightSnapRectInput(940, 1020, 100, 1000, 900, 100)).toEqual({
			clippedAtPreviousLeft: false,
			rawRightStraddler: true,
			rawRightOverhang: 20,
			visibleInsideRawRight: 60
		});
	});

	it("builds vertical-rl raw-right snap rect input for previous-left clipped rects", () => {
		expect(getVerticalRlRawRightSnapRectInput(860, 940, 100, 1000, 900, 100)).toEqual({
			clippedAtPreviousLeft: true,
			rawRightStraddler: false,
			rawRightOverhang: 0,
			visibleInsideRawRight: 0
		});
	});

	it("clamps vertical-rl raw-right snap visible text to raw-left", () => {
		expect(getVerticalRlRawRightSnapRectInput(80, 1020, 100, 1000, 900, 0)).toEqual({
			clippedAtPreviousLeft: false,
			rawRightStraddler: true,
			rawRightOverhang: 20,
			visibleInsideRawRight: 900
		});
	});

	it("builds empty vertical-rl raw-right snap input for non-straddlers", () => {
		expect(getVerticalRlRawRightSnapRectInput(900, 990, 100, 1000, 800, 100)).toEqual({
			clippedAtPreviousLeft: false,
			rawRightStraddler: false,
			rawRightOverhang: 0,
			visibleInsideRawRight: 0
		});
	});

	it("builds vertical-rl raw-left snap rect input for left straddlers clipped at next right", () => {
		expect(getVerticalRlRawLeftSnapRectInput(80, 140, 100, 1000, 900, 4)).toEqual({
			rawLeftStraddler: true,
			hasNextPage: true,
			clippedAtNextRight: true,
			visibleAtNextRight: false,
			nearlyVisibleAtNextRight: false
		});
	});

	it("builds vertical-rl raw-left snap rect input for next-page visible rects", () => {
		expect(getVerticalRlRawLeftSnapRectInput(120, 140, 100, 1000, 800, 4)).toEqual({
			rawLeftStraddler: false,
			hasNextPage: true,
			clippedAtNextRight: false,
			visibleAtNextRight: true,
			nearlyVisibleAtNextRight: true
		});
	});

	it("builds vertical-rl raw-left snap rect input for tolerance-near next-page rects", () => {
		expect(getVerticalRlRawLeftSnapRectInput(120, 1003, 100, 1000, 0, 4)).toEqual({
			rawLeftStraddler: false,
			hasNextPage: false,
			clippedAtNextRight: true,
			visibleAtNextRight: false,
			nearlyVisibleAtNextRight: false
		});
		expect(getVerticalRlRawLeftSnapRectInput(120, 203, 100, 1000, 800, 4)).toEqual({
			rawLeftStraddler: false,
			hasNextPage: true,
			clippedAtNextRight: true,
			visibleAtNextRight: false,
			nearlyVisibleAtNextRight: true
		});
	});

	it("calculates vertical-rl raw-left boundary crossing expand shifts for next-page visible rects", () => {
		expect(getVerticalRlRawLeftBoundaryCrossingShift(120, 180, 150, 20, true, true, true, false)).toBe(31);
		expect(getVerticalRlRawLeftBoundaryCrossingShift(120, 180, 150, 20, true, false, true, false)).toBe(31);
		expect(getVerticalRlRawLeftBoundaryCrossingShift(120, 180, 150, 20, true, false, false, true)).toBe(31);
	});

	it("calculates vertical-rl raw-left boundary crossing shrink shifts for clipped next-page rects", () => {
		expect(getVerticalRlRawLeftBoundaryCrossingShift(120, 180, 150, 40, true, false, false, false)).toBe(-31);
	});

	it("expands vertical-rl raw-left boundary crossings when shrink would cross zero", () => {
		expect(getVerticalRlRawLeftBoundaryCrossingShift(120, 180, 150, 20, false, false, false, false)).toBe(31);
	});

	it("ignores vertical-rl raw-left boundary crossing shifts without crossing", () => {
		expect(getVerticalRlRawLeftBoundaryCrossingShift(150, 180, 150, 20, true, true, true, false)).toBe(0);
		expect(getVerticalRlRawLeftBoundaryCrossingShift(120, 150, 150, 20, true, true, true, false)).toBe(0);
	});

	it("calculates vertical-rl raw-left covered shrink shifts", () => {
		expect(getVerticalRlRawLeftCoveredShrinkShift(120, 140, 100, 150, 40, false, false, false, false, false, false, false)).toBe(-21);
	});

	it("clamps vertical-rl raw-left covered shrink targets to raw-left", () => {
		expect(getVerticalRlRawLeftCoveredShrinkShift(80, 140, 100, 150, 40, false, false, false, false, false, false, false)).toBe(-40);
	});

	it("ignores vertical-rl raw-left covered shrink shifts when the target is not smaller", () => {
		expect(getVerticalRlRawLeftCoveredShrinkShift(160, 170, 100, 200, 40, false, false, false, false, false, false, false)).toBe(0);
	});

	it("protects forced vertical-rl raw-left straddler masks from covered shrink", () => {
		expect(getVerticalRlRawLeftCoveredShrinkShift(80, 120, 100, 150, 40, true, true, false, false, false, false, true)).toBe(0);
	});

	it("protects next-page visible vertical-rl raw-left straddlers from covered shrink", () => {
		expect(getVerticalRlRawLeftCoveredShrinkShift(80, 120, 100, 150, 40, true, false, true, false, false, false, true)).toBe(0);
		expect(getVerticalRlRawLeftCoveredShrinkShift(80, 120, 100, 150, 40, true, false, false, true, true, false, true)).toBe(0);
		expect(getVerticalRlRawLeftCoveredShrinkShift(80, 120, 100, 150, 40, true, false, false, false, false, true, true)).toBe(0);
	});

	it("ignores vertical-rl raw-left covered shrink for next-page owned non-straddlers", () => {
		expect(getVerticalRlRawLeftCoveredShrinkShift(120, 140, 100, 150, 40, false, false, false, false, true, false, false)).toBe(0);
	});

	it("ignores vertical-rl raw-left covered shrink when raw-left straddlers are not clipped at next right", () => {
		expect(getVerticalRlRawLeftCoveredShrinkShift(80, 120, 100, 150, 40, true, false, false, false, false, false, false)).toBe(0);
	});

	it("calculates vertical-rl raw-left visible expand shifts", () => {
		expect(getVerticalRlRawLeftVisibleExpandShift(152, 180, 100, 150, 40, true, 4)).toBe(41);
		expect(getVerticalRlRawLeftVisibleExpandShift(150, 180, 100, 150, 40, true, 4)).toBe(41);
	});

	it("ignores vertical-rl raw-left visible expand shifts beyond tolerance", () => {
		expect(getVerticalRlRawLeftVisibleExpandShift(155, 180, 100, 150, 40, true, 4)).toBe(0);
	});

	it("ignores vertical-rl raw-left visible expand shifts without next-page visibility", () => {
		expect(getVerticalRlRawLeftVisibleExpandShift(152, 180, 100, 150, 40, false, 4)).toBe(0);
	});

	it("ignores vertical-rl raw-left visible expand shifts when the target is not larger", () => {
		expect(getVerticalRlRawLeftVisibleExpandShift(152, 180, 100, 150, 100, true, 4)).toBe(0);
	});

	it("selects vertical-rl raw-left boundary crossing shifts before other targets", () => {
		expect(getVerticalRlRawLeftSnapRectShift(120, 180, 100, 150, 40, false, true, false, true, true, false, false, false, 4)).toBe(31);
		expect(getVerticalRlRawLeftSnapRectShift(120, 180, 100, 150, 40, false, true, false, false, false, false, false, false, 4)).toBe(-31);
	});

	it("selects vertical-rl raw-left covered shrink shifts after non-crossing rects", () => {
		expect(getVerticalRlRawLeftSnapRectShift(120, 140, 100, 150, 40, false, true, false, false, false, false, false, false, 4)).toBe(-21);
	});

	it("selects vertical-rl raw-left visible expand shifts after non-crossing non-shrink rects", () => {
		expect(getVerticalRlRawLeftSnapRectShift(152, 180, 100, 150, 40, false, true, false, true, true, false, false, false, 4)).toBe(41);
	});

	it("ignores vertical-rl raw-left snap rect shifts for unclamped raw-left straddlers at zero mask", () => {
		expect(getVerticalRlRawLeftSnapRectShift(80, 140, 100, 150, 0, true, true, true, false, false, false, false, false, 4)).toBe(0);
	});

	it("aggregates vertical-rl raw-left positive snap shifts", () => {
		expect(getVerticalRlRawLeftSnapShiftAggregate(10, 30)).toBe(30);
		expect(getVerticalRlRawLeftSnapShiftAggregate(30, 10)).toBe(30);
	});

	it("aggregates vertical-rl raw-left negative snap shifts", () => {
		expect(getVerticalRlRawLeftSnapShiftAggregate(-10, -30)).toBe(-30);
		expect(getVerticalRlRawLeftSnapShiftAggregate(-30, -10)).toBe(-30);
	});

	it("ignores zero vertical-rl raw-left snap shifts while preserving aggregation state", () => {
		expect(getVerticalRlRawLeftSnapShiftAggregate(30, 0)).toBe(30);
		expect(getVerticalRlRawLeftSnapShiftAggregate(-30, 0)).toBe(-30);
	});

	it("aggregates vertical-rl raw-left snap shifts across rect collections", () => {
		expect(getVerticalRlRawLeftSnapShiftForRects([
			{ left: 120, right: 180 },
			{ left: 152, right: 180 }
		], 100, 1000, 150, 40, 800, false, false, false, 4)).toBe(41);
		expect(getVerticalRlRawLeftSnapShiftForRects([
			{ left: 120, right: 140 },
			{ left: 110, right: 120 }
		], 100, 1000, 150, 40, 0, false, false, false, 4)).toBe(-31);
	});

	it("selects vertical-rl raw-left snap decisions across rect collections", () => {
		expect(getVerticalRlRawLeftSnapDecisionForRects([
			{ left: 120, right: 180 },
			{ left: 152, right: 180 }
		], 100, 1000, 40, 70, 800, false, false, false, 4)).toEqual({
			shift: 41,
			left: 70
		});
		expect(getVerticalRlRawLeftSnapDecisionForRects([
			{ left: 120, right: 140 }
		], 100, 1000, 40, 100, 0, false, false, false, 4)).toEqual({
			shift: -21,
			left: 19
		});
		expect(getVerticalRlRawLeftSnapDecisionForRects([], 100, 1000, 40, 100, 0, false, false, false, 4)).toEqual({
			shift: 0,
			left: 40
		});
	});

	it("detects vertical-rl right masks consuming visible raw-right text", () => {
		expect(hasVerticalRlRightEdgeMaskConsumingVisibleEdge(true, 20, 30, 25, 5)).toBe(true);
	});

	it("ignores vertical-rl right mask consumption without a raw-right straddler", () => {
		expect(hasVerticalRlRightEdgeMaskConsumingVisibleEdge(false, 20, 30, 25, 5)).toBe(false);
	});

	it("ignores vertical-rl right mask consumption when the mask already covers visible text", () => {
		expect(hasVerticalRlRightEdgeMaskConsumingVisibleEdge(true, 30, 30, 25, 5)).toBe(false);
		expect(hasVerticalRlRightEdgeMaskConsumingVisibleEdge(true, 32, 30, 25, 5)).toBe(false);
	});

	it("ignores vertical-rl right mask consumption beyond the allowed right mask tolerance", () => {
		expect(hasVerticalRlRightEdgeMaskConsumingVisibleEdge(true, 20, 36, 25, 5)).toBe(false);
	});

	it("detects vertical-rl rects just outside raw-right within tolerance", () => {
		expect(isVerticalRlRectJustOutsideRawRight(1000, 1000, 4)).toBe(true);
		expect(isVerticalRlRectJustOutsideRawRight(1003, 1000, 4)).toBe(true);
	});

	it("ignores vertical-rl rects outside raw-right beyond tolerance", () => {
		expect(isVerticalRlRectJustOutsideRawRight(1005, 1000, 4)).toBe(false);
	});

	it("ignores vertical-rl rects that begin before raw-right", () => {
		expect(isVerticalRlRectJustOutsideRawRight(999, 1000, 4)).toBe(false);
	});

	it("calculates vertical-rl just-outside raw-right mask targets", () => {
		expect(getVerticalRlJustOutsideRawRightMaskTarget(1000, 1000, 4)).toBe(4);
		expect(getVerticalRlJustOutsideRawRightMaskTarget(1003, 1000, 4)).toBe(4);
	});

	it("ignores vertical-rl just-outside raw-right mask targets beyond tolerance", () => {
		expect(getVerticalRlJustOutsideRawRightMaskTarget(1005, 1000, 4)).toBe(0);
	});

	it("ignores vertical-rl just-outside raw-right mask targets before raw-right", () => {
		expect(getVerticalRlJustOutsideRawRightMaskTarget(999, 1000, 4)).toBe(0);
	});

	it("selects vertical-rl raw-right clipped previous-left shrink shifts before other targets", () => {
		expect(getVerticalRlRawRightSnapRectShift(860, 990, 1000, 900, 40, true, false, 0, 0, 4, 25, 10, 100, true)).toEqual({
			shift: -30,
			expandBeyondPaintGuard: false
		});
	});

	it("selects vertical-rl raw-right just-outside expand shifts before straddler targets", () => {
		expect(getVerticalRlRawRightSnapRectShift(1003, 1020, 1000, 990, 1, false, false, 0, 0, 4, 25, 0, 100, true)).toEqual({
			shift: 3,
			expandBeyondPaintGuard: false
		});
	});

	it("selects vertical-rl shallow raw-right straddler expand shifts", () => {
		expect(getVerticalRlRawRightSnapRectShift(998, 1003, 1000, 990, 0, false, true, 3, 2, 4, 25, 0, 100, true)).toEqual({
			shift: 3,
			expandBeyondPaintGuard: false
		});
	});

	it("selects vertical-rl raw-right clearing shrink shifts", () => {
		expect(getVerticalRlRawRightSnapRectShift(940, 1004, 1000, 990, 20, false, true, 4, 60, 4, 25, 0, 100, true)).toEqual({
			shift: -20,
			expandBeyondPaintGuard: false
		});
	});

	it("selects vertical-rl deep raw-right straddler expand shifts beyond the paint guard", () => {
		expect(getVerticalRlRawRightSnapRectShift(940, 1020, 1000, 990, 20, false, true, 20, 60, 4, 25, 80, 100, true)).toEqual({
			shift: 41,
			expandBeyondPaintGuard: true
		});
	});

	it("selects vertical-rl raw-right boundary crossing expand shifts after raw-right targets", () => {
		expect(getVerticalRlRawRightSnapRectShift(980, 990, 1000, 985, 20, false, false, 0, 0, 4, 25, 0, 100, true)).toEqual({
			shift: 6,
			expandBeyondPaintGuard: false
		});
	});

	it("builds vertical-rl raw-right snap rect input before selecting shifts", () => {
		expect(getVerticalRlRawRightSnapRectShiftForRect(940, 1020, 100, 1000, 800, 100, 990, 20, 4, 25, 80, 100, true)).toEqual({
			shift: 41,
			expandBeyondPaintGuard: true
		});
	});

	it("builds clipped vertical-rl raw-right snap rect input before selecting shrink shifts", () => {
		expect(getVerticalRlRawRightSnapRectShiftForRect(860, 990, 100, 1000, 900, 100, 900, 40, 4, 25, 10, 100, true)).toEqual({
			shift: -30,
			expandBeyondPaintGuard: false
		});
	});

	it("aggregates vertical-rl raw-right snap expand shifts", () => {
		expect(getVerticalRlRawRightSnapShiftAggregate(10, 0, false, {
			shift: 20,
			expandBeyondPaintGuard: true
		})).toEqual({
			expand: 20,
			shrink: 0,
			expandBeyondPaintGuard: true
		});
	});

	it("aggregates vertical-rl raw-right snap shrink shifts without clearing paint guard state", () => {
		expect(getVerticalRlRawRightSnapShiftAggregate(20, -10, true, {
			shift: -30,
			expandBeyondPaintGuard: false
		})).toEqual({
			expand: 20,
			shrink: -30,
			expandBeyondPaintGuard: true
		});
	});

	it("ignores zero vertical-rl raw-right snap shifts while preserving aggregation state", () => {
		expect(getVerticalRlRawRightSnapShiftAggregate(20, -10, true, {
			shift: 0,
			expandBeyondPaintGuard: false
		})).toEqual({
			expand: 20,
			shrink: -10,
			expandBeyondPaintGuard: true
		});
	});

	it("aggregates vertical-rl raw-right snap shifts across rect collections", () => {
		expect(getVerticalRlRawRightSnapShiftForRects([
			{ left: 1003, right: 1020 },
			{ left: 860, right: 990 }
		], 100, 1000, 980, 20, 900, 100, 4, 25, 10, 100, true)).toEqual({
			expand: 0,
			shrink: -10,
			expandBeyondPaintGuard: false
		});
		expect(getVerticalRlRawRightSnapShiftForRects([
			{ left: 940, right: 1020 },
			{ left: 998, right: 1003 },
			{ left: 980, right: 990 }
		], 100, 1000, 990, 0, 800, 100, 4, 25, 80, 100, true)).toEqual({
			expand: 61,
			shrink: 0,
			expandBeyondPaintGuard: true
		});
	});

	it("selects vertical-rl raw-right snap decisions across rect collections", () => {
		expect(getVerticalRlRawRightSnapDecisionForRects([
			{ left: 940, right: 1020 },
			{ left: 860, right: 990 }
		], 100, 1000, 80, 800, 4, 100, 25, 25, 100, true)).toEqual({
			shift: -19,
			right: 61,
			requiredRawRightMask: 61,
			expandBeyondPaintGuard: false
		});
		expect(getVerticalRlRawRightSnapDecisionForRects([
			{ left: 940, right: 1020 },
			{ left: 998, right: 1003 }
		], 100, 1000, 0, 100, 4, 100, 25, 25, 100, true)).toEqual({
			shift: 61,
			right: 61,
			requiredRawRightMask: 61,
			expandBeyondPaintGuard: true
		});
	});

	it("calculates shallow vertical-rl raw-right straddler mask targets", () => {
		expect(getVerticalRlShallowRawRightStraddlerMaskTarget(true, 0, 4)).toBe(1);
		expect(getVerticalRlShallowRawRightStraddlerMaskTarget(true, 3.2, 4)).toBe(5);
	});

	it("ignores shallow vertical-rl raw-right mask targets without a straddler", () => {
		expect(getVerticalRlShallowRawRightStraddlerMaskTarget(false, 3, 4)).toBe(0);
	});

	it("ignores shallow vertical-rl raw-right mask targets beyond tolerance", () => {
		expect(getVerticalRlShallowRawRightStraddlerMaskTarget(true, 5, 4)).toBe(0);
	});

	it("clears vertical-rl raw-right straddler masks for shallow overhangs", () => {
		expect(shouldClearVerticalRlRawRightStraddlerMask(true, 4, 4, false, 10, 20)).toBe(true);
		expect(shouldClearVerticalRlRawRightStraddlerMask(true, 3, 1, false, 10, 20)).toBe(true);
	});

	it("clears vertical-rl raw-right straddler masks when the right mask consumes visible text", () => {
		expect(shouldClearVerticalRlRawRightStraddlerMask(true, 8, 4, true, 0, 20)).toBe(true);
		expect(shouldClearVerticalRlRawRightStraddlerMask(true, 8, 4, true, 10, 0)).toBe(true);
	});

	it("keeps vertical-rl raw-right straddler masks when required masks and next steps protect consumed text", () => {
		expect(shouldClearVerticalRlRawRightStraddlerMask(true, 8, 4, true, 10, 20)).toBe(false);
	});

	it("ignores vertical-rl raw-right mask clearing without a straddler", () => {
		expect(shouldClearVerticalRlRawRightStraddlerMask(false, 2, 4, true, 0, 0)).toBe(false);
	});

	it("clears covered vertical-rl raw-right straddler masks", () => {
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 30, 4, 30, 30, 0, 20)).toBe(true);
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 30, 4, 31, 30, 10, 0)).toBe(true);
	});

	it("ignores covered vertical-rl raw-right mask clearing without a straddler", () => {
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(false, 30, 4, 30, 30, 0, 0)).toBe(false);
	});

	it("ignores covered vertical-rl raw-right mask clearing within edge tolerance", () => {
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 4, 4, 4, 4, 0, 0)).toBe(false);
	});

	it("ignores covered vertical-rl raw-right mask clearing when masks do not cover visible text", () => {
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 30, 4, 29, 30, 0, 0)).toBe(false);
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 30, 4, 30, 29, 0, 0)).toBe(false);
	});

	it("keeps covered vertical-rl raw-right masks when required masks and next steps protect visible text", () => {
		expect(shouldClearVerticalRlCoveredRawRightStraddlerMask(true, 30, 4, 30, 30, 10, 20)).toBe(false);
	});

	it("calculates deep vertical-rl raw-right straddler expand targets", () => {
		expect(getVerticalRlDeepRawRightStraddlerExpandTarget(true, 30, 4)).toBe(31);
		expect(getVerticalRlDeepRawRightStraddlerExpandTarget(true, 30.2, 4)).toBe(32);
	});

	it("ignores deep vertical-rl raw-right expand targets without a straddler", () => {
		expect(getVerticalRlDeepRawRightStraddlerExpandTarget(false, 30, 4)).toBe(0);
	});

	it("ignores deep vertical-rl raw-right expand targets within edge tolerance", () => {
		expect(getVerticalRlDeepRawRightStraddlerExpandTarget(true, 4, 4)).toBe(0);
		expect(getVerticalRlDeepRawRightStraddlerExpandTarget(true, 3, 4)).toBe(0);
	});

	it("calculates vertical-rl boundary crossing expand targets", () => {
		expect(getVerticalRlBoundaryCrossingExpandTarget(960, 1020, 1000)).toBe(41);
		expect(getVerticalRlBoundaryCrossingExpandTarget(999.2, 1020, 1000)).toBe(2);
	});

	it("ignores vertical-rl boundary crossing targets without crossing", () => {
		expect(getVerticalRlBoundaryCrossingExpandTarget(1000, 1020, 1000)).toBe(0);
		expect(getVerticalRlBoundaryCrossingExpandTarget(960, 1000, 1000)).toBe(0);
	});

	it("calculates vertical-rl previous-left clipped right mask targets", () => {
		expect(getVerticalRlPreviousLeftClippedRightMaskTarget(0, 980, 1000)).toBe(20);
	});

	it("keeps the required raw-right mask for previous-left clipped right mask targets", () => {
		expect(getVerticalRlPreviousLeftClippedRightMaskTarget(30, 980, 1000)).toBe(30);
	});

	it("clamps vertical-rl previous-left clipped right mask targets when rects pass raw-right", () => {
		expect(getVerticalRlPreviousLeftClippedRightMaskTarget(0, 1020, 1000)).toBe(0);
		expect(getVerticalRlPreviousLeftClippedRightMaskTarget(12, 1020, 1000)).toBe(12);
	});

	it("calculates the current effective left boundary for vertical-rl pagination", () => {
		expect(getVerticalRlCurrentEffectiveLeftBoundary(9600, 900, 930, 30)).toBe(7800);
	});

	it("includes the current left edge mask in the effective left boundary", () => {
		expect(getVerticalRlCurrentEffectiveLeftBoundary(9600, 900, 930, 225)).toBe(7995);
	});

	it("returns no current effective left boundary for invalid or exhausted measurements", () => {
		expect(getVerticalRlCurrentEffectiveLeftBoundary(1800, 900, 930, 0)).toBeNull();
		expect(getVerticalRlCurrentEffectiveLeftBoundary(9600, Number.NaN, 930, 30)).toBeNull();
	});

	it("builds forced vertical-rl sequential right-boundary constraints", () => {
		expect(
			getVerticalRlSequentialRightBoundaryConstraint(4, 1331, 0, 0, 0, 0, 0, 0)
		).toEqual({
			pageIndex: 4,
			maxRightBoundary: 1331,
			preferredRightBoundary: 1331
		});
	});

	it("builds vertical-rl sequential right-boundary constraints for drifted offsets", () => {
		expect(
			getVerticalRlSequentialRightBoundaryConstraint(4, Number.NaN, 9600, 902, 900, 930, 900, 30)
		).toEqual({
			pageIndex: 4,
			maxRightBoundary: 7798,
			preferredRightBoundary: 7798
		});
	});

	it("builds vertical-rl sequential right-boundary constraints for clean-page left masks", () => {
		expect(
			getVerticalRlSequentialRightBoundaryConstraint(4, Number.NaN, 9600, 900, 900, 900, 900, 30)
		).toEqual({
			pageIndex: 4,
			maxRightBoundary: 7830,
			preferredRightBoundary: 7830
		});
	});

	it("returns no vertical-rl sequential right-boundary constraint without drift, mask, or boundary room", () => {
		expect(
			getVerticalRlSequentialRightBoundaryConstraint(4, Number.NaN, 9600, 900, 900, 930, 900, 0)
		).toBeNull();
		expect(
			getVerticalRlSequentialRightBoundaryConstraint(4, Number.NaN, 1800, 900, 902, 930, 900, 0)
		).toBeNull();
	});

	it("builds clean-page vertical-rl edge mask input for snapping", () => {
		expect(
			getVerticalRlCleanPageEdgeMaskInput(900, 5, 2, 1800, 900, 1800, 1800, null)
		).toEqual({
			widths: { left: 0, right: 0 },
			maxMask: 225,
			nextPageStep: 900,
			previousPageStep: 900,
			rightMaxMask: 225,
			allowRawRightMask: true,
			allowRawLeftMask: false,
			forceRawLeftMask: false
		});
	});

	it("returns no clean-page edge mask input without a previous page or mask room", () => {
		expect(getVerticalRlCleanPageEdgeMaskInput(900, 1, 0, 0, 0, 0, 0, null)).toBeNull();
		expect(getVerticalRlCleanPageEdgeMaskInput(0, 5, 2, 1800, 900, 1800, 1800, null)).toBeNull();
	});

	it("forces clean-page raw-left masks for sequential boundary pages or offset drift", () => {
		expect(
			getVerticalRlCleanPageEdgeMaskInput(900, 5, 2, 1800, 900, 1800, 1800, 2)?.forceRawLeftMask
		).toBe(true);
		expect(
			getVerticalRlCleanPageEdgeMaskInput(900, 5, 2, 1800, 900, 1802, 1800, null)?.forceRawLeftMask
		).toBe(true);
	});

	it("allows clean-page raw-left masks for the penultimate page", () => {
		expect(
			getVerticalRlCleanPageEdgeMaskInput(900, 5, 3, 2700, 1800, 2700, 2700, null)?.allowRawLeftMask
		).toBe(true);
	});

	it("builds previous-page vertical-rl left-mask input for snapping", () => {
		expect(getPreviousVerticalRlLeftMaskInput(900, 300, 225, 100, 1000, 40)).toEqual({
			widths: { left: 225, right: 0 },
			maxMask: 225,
			rawLeft: 960,
			rawRight: 1860,
			nextPageStep: 900,
			rightMaxMask: 0
		});
	});

	it("returns no previous-page left-mask input without a page step or mask room", () => {
		expect(getPreviousVerticalRlLeftMaskInput(0, 30, 225, 100, 1000, 40)).toBeNull();
		expect(getPreviousVerticalRlLeftMaskInput(900, 30, 0, 100, 1000, 40)).toBeNull();
	});

	it("clamps previous-page left-mask input to the mask limit", () => {
		expect(getPreviousVerticalRlLeftMaskInput(900, 30, 225, 100, 1000, 40)?.widths.left).toBe(30);
		expect(getPreviousVerticalRlLeftMaskInput(900, 300, 225, 100, 1000, 40)?.widths.left).toBe(225);
	});

	it("builds structural vertical-rl edge mask input for snapping", () => {
		expect(getVerticalRlStructuralEdgeMaskInput(200, 3000, 930, 900)).toEqual({
			widths: { left: 30, right: 0 },
			maxMask: 225,
			rawLeft: 1870,
			rawRight: 2800,
			nextPageStep: 900,
			rightMaxMask: 0
		});
	});

	it("caps structural edge mask input to a quarter page", () => {
		expect(getVerticalRlStructuralEdgeMaskInput(200, 3000, 1300, 900)?.widths.left).toBe(225);
	});

	it("returns no structural edge mask input for invalid measurements", () => {
		expect(getVerticalRlStructuralEdgeMaskInput(200, 3000, 901, 900)).toBeNull();
		expect(getVerticalRlStructuralEdgeMaskInput(200, 0, 930, 900)).toBeNull();
		expect(getVerticalRlStructuralEdgeMaskInput(200, 3000, 930, 0)).toBeNull();
	});

	it("measures vertical-rl rect distance before the logical viewport", () => {
		expect(getVerticalRlRectDistanceToLogicalViewport(100, 180, 220, 520)).toBe(40);
	});

	it("measures vertical-rl rect distance after the logical viewport", () => {
		expect(getVerticalRlRectDistanceToLogicalViewport(560, 620, 220, 520)).toBe(40);
	});

	it("returns zero vertical-rl rect distance for overlapping viewport rects", () => {
		expect(getVerticalRlRectDistanceToLogicalViewport(200, 260, 220, 520)).toBe(0);
		expect(getVerticalRlRectDistanceToLogicalViewport(500, 560, 220, 520)).toBe(0);
		expect(getVerticalRlRectDistanceToLogicalViewport(260, 300, 220, 520)).toBe(0);
	});

	it("keeps direct vertical-rl rect coordinates for non-negative iframe offsets", () => {
		expect(getVerticalRlViewportRectCoordinates(100, 180, 320, 400, 220, 520, 12)).toEqual({
			left: 100,
			right: 180
		});
	});

	it("uses shifted vertical-rl rect coordinates when they are closer to a negative-offset iframe viewport", () => {
		expect(getVerticalRlViewportRectCoordinates(20, 80, 260, 320, 220, 520, -240)).toEqual({
			left: 260,
			right: 320
		});
	});

	it("keeps direct vertical-rl rect coordinates when shifted coordinates are not meaningfully closer", () => {
		expect(getVerticalRlViewportRectCoordinates(230, 300, 232, 302, 220, 520, -2, 0.5)).toEqual({
			left: 230,
			right: 300
		});
	});

	it("normalizes vertical-rl viewport rects while preserving measurement fields", () => {
		expect(
			getVerticalRlViewportRect(
				{ left: 20, right: 80, top: 5, bottom: 25, width: 60, height: 20 },
				220,
				520,
				-240
			)
		).toEqual({
			left: 260,
			right: 320,
			top: 5,
			bottom: 25,
			width: 60,
			height: 20
		});
	});

	it("normalizes vertical-rl viewport rect collections while preserving measurement fields", () => {
		expect(
			getVerticalRlViewportRects([
				{ left: 20, right: 80, top: 5, bottom: 25, width: 60, height: 20 },
				{ left: 230, right: 300, top: 30, bottom: 55, width: 70, height: 25 }
			], 220, 520, -240)
		).toEqual([
			{
				left: 260,
				right: 320,
				top: 5,
				bottom: 25,
				width: 60,
				height: 20
			},
			{
				left: 230,
				right: 300,
				top: 30,
				bottom: 55,
				width: 70,
				height: 25
			}
		]);
	});

	it("uses shifted vertical-rl rect coordinates when they are closer to any logical viewport", () => {
		expect(
			getVerticalRlClosestViewportRectCoordinates(
				20,
				80,
				610,
				670,
				[
					{ left: 900, right: 1200 },
					{ left: 580, right: 880 }
				]
			)
		).toEqual({
			left: 610,
			right: 670
		});
	});

	it("keeps direct vertical-rl rect coordinates when direct is closest to a logical viewport", () => {
		expect(
			getVerticalRlClosestViewportRectCoordinates(
				240,
				300,
				610,
				670,
				[
					{ left: 220, right: 520 },
					{ left: 900, right: 1200 }
				]
			)
		).toEqual({
			left: 240,
			right: 300
		});
	});

	it("keeps direct vertical-rl rect coordinates without valid logical viewports", () => {
		expect(
			getVerticalRlClosestViewportRectCoordinates(
				240,
				300,
				610,
				670,
				[
					{ left: Number.NaN, right: 520 },
					{ left: 900, right: 880 }
				]
			)
		).toEqual({
			left: 240,
			right: 300
		});
	});

	it("normalizes vertical-rl closest viewport rects while preserving measurement fields", () => {
		expect(
			getVerticalRlClosestViewportRect(
				{ left: 20, right: 80, top: 6, bottom: 28, width: 60, height: 22 },
				-590,
				[
					{ left: 900, right: 1200 },
					{ left: 580, right: 880 }
				]
			)
		).toEqual({
			left: 610,
			right: 670,
			top: 6,
			bottom: 28,
			width: 60,
			height: 22
		});
	});

	it("normalizes vertical-rl closest viewport rect collections while preserving measurement fields", () => {
		expect(
			getVerticalRlClosestViewportRects([
				{ left: 20, right: 80, top: 6, bottom: 28, width: 60, height: 22 },
				{ left: 240, right: 300, top: 32, bottom: 54, width: 60, height: 22 }
			], -590, [
				{ left: 900, right: 1200 },
				{ left: 580, right: 880 },
				{ left: 220, right: 520 }
			])
		).toEqual([
			{
				left: 610,
				right: 670,
				top: 6,
				bottom: 28,
				width: 60,
				height: 22
			},
			{
				left: 240,
				right: 300,
				top: 32,
				bottom: 54,
				width: 60,
				height: 22
			}
		]);
	});

	it("gets vertical-rl boundary snap candidate rects from logical viewport bounds", () => {
		expect(
			getVerticalRlBoundarySnapCandidateRects([
				{ left: 20, right: 80, top: 6, bottom: 28, width: 60, height: 22 },
				{ left: 240, right: 300, top: 32, bottom: 54, width: 60, height: 22 }
			], -590, 120, 1000, 300)
		).toEqual([
			{
				left: 610,
				right: 670,
				top: 6,
				bottom: 28,
				width: 60,
				height: 22
			},
			{
				left: 240,
				right: 300,
				top: 32,
				bottom: 54,
				width: 60,
				height: 22
			}
		]);
	});

	it("gets vertical-rl boundary snap measurement inputs", () => {
		expect(
			getVerticalRlBoundarySnapMeasurementInputs(
				[
					{ left: 20, right: 80, top: 6, bottom: 28, width: 60, height: 22 },
					{ left: 240, right: 300, top: 32, bottom: 54, width: 60, height: 22 }
				],
				-590,
				120,
				1000,
				300,
				4.5,
				{ left: 12, right: 6 },
				280,
				-8
			)
		).toEqual({
			rects: [
				{
					left: 610,
					right: 670,
					top: 6,
					bottom: 28,
					width: 60,
					height: 22
				},
				{
					left: 240,
					right: 300,
					top: 32,
					bottom: 54,
					width: 60,
					height: 22
				}
			],
			deltaInputs: {
				edgeGuard: 5,
				edgeGuardPx: 4.5,
				structuralMasks: {
					left: 12,
					right: 6
				},
				boundaryShift: -8,
				structuralBleed: 20
			}
		});
	});

	it("counts vertical-rl boundary crossings", () => {
		expect(
			countVerticalRlBoundaryCrossings([
				{ left: 95, right: 105 },
				{ left: 180, right: 205 },
				{ left: 120, right: 150 }
			], 100, 200)
		).toBe(2);
	});

	it("evaluates vertical-rl boundary models by reducing crossings", () => {
		expect(
			evaluateVerticalRlBoundaryModel([
				{ left: 95, right: 105 },
				{ left: 170, right: 190 }
			], 100, 200, 1, 50, 200, 4)
		).toEqual({
			delta: -9,
			distance: 9,
			initialCrossings: 1,
			score: 0
		});
	});

	it("keeps right-origin vertical-rl boundary models within max right boundary constraints", () => {
		expect(
			evaluateVerticalRlBoundaryModel([
				{ left: 95, right: 105 }
			], 100, 200, -1, 50, 200, 4, {
				hasMaxRightBoundary: true,
				maxRightBoundary: 900,
				contentWidth: 1000
			})
		).toEqual({
			delta: 0,
			distance: 0,
			initialCrossings: 1,
			score: 1
		});
	});

	it("builds vertical-rl boundary snap models with origin labels", () => {
		let models = getVerticalRlBoundarySnapModels([
			{ left: 390, right: 410 },
			{ left: 95, right: 105 }
		], 100, 600, 100, 500, 4, 0, 0);

		expect(models.rightOriginSnap).toEqual({
			delta: 14,
			distance: 14,
			initialCrossings: 1,
			score: 0,
			model: "right-origin"
		});
		expect(models.leftOriginSnap).toEqual({
			delta: -9,
			distance: 9,
			initialCrossings: 1,
			score: 0,
			model: "left-origin"
		});
	});

	it("applies vertical-rl structural masks when building boundary snap models", () => {
		let models = getVerticalRlBoundarySnapModels([
			{ left: 104, right: 112 }
		], 100, 600, 100, 500, 4, 10, 0);

		expect(models.leftOriginSnap).toEqual({
			delta: 6,
			distance: 6,
			initialCrossings: 1,
			score: 0,
			model: "left-origin"
		});
	});

	it("passes max right boundary guards through vertical-rl boundary snap models", () => {
		let models = getVerticalRlBoundarySnapModels([
			{ left: 395, right: 405 }
		], 100, 600, 100, 500, 4, 0, 0, {
			hasMaxRightBoundary: true,
			maxRightBoundary: 480
		});

		expect(models.rightOriginSnap).toEqual({
			delta: 0,
			distance: 0,
			initialCrossings: 1,
			score: 1,
			model: "right-origin"
		});
	});

	it("constrains vertical-rl boundary offsets to preferred right boundaries", () => {
		expect(
			getVerticalRlBoundaryConstrainedOffset(100, 700, 1000, {
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 800
			})
		).toEqual({
			logicalOffset: 200,
			preferredRightBoundary: 800
		});
	});

	it("gets vertical-rl right boundary limit flags", () => {
		expect(getVerticalRlBoundaryRightBoundaryLimits({
			maxRightBoundary: 800,
			preferredRightBoundary: 700
		})).toEqual({
			maxRightBoundary: 800,
			hasMaxRightBoundary: true,
			preferredRightBoundary: 700,
			hasPreferredRightBoundary: true
		});
	});

	it("normalizes invalid vertical-rl right boundary limits", () => {
		expect(getVerticalRlBoundaryRightBoundaryLimits({
			maxRightBoundary: Number.NaN
		})).toEqual({
			maxRightBoundary: Number.NaN,
			hasMaxRightBoundary: false,
			preferredRightBoundary: Number.NaN,
			hasPreferredRightBoundary: false
		});
	});

	it("gets vertical-rl max right boundary limit options", () => {
		expect(getVerticalRlBoundaryMaxRightBoundaryLimitOptions({
			maxRightBoundary: 800,
			hasMaxRightBoundary: true,
			preferredRightBoundary: 700,
			hasPreferredRightBoundary: true
		})).toEqual({
			maxRightBoundary: 800,
			hasMaxRightBoundary: true
		});
	});

	it("gets vertical-rl right boundary limit options", () => {
		expect(getVerticalRlBoundaryRightBoundaryLimitOptions({
			maxRightBoundary: 800,
			hasMaxRightBoundary: true,
			preferredRightBoundary: 700,
			hasPreferredRightBoundary: true
		})).toEqual({
			maxRightBoundary: 800,
			hasMaxRightBoundary: true,
			preferredRightBoundary: 700,
			hasPreferredRightBoundary: true
		});
	});

	it("keeps vertical-rl preferred right boundaries within max right boundaries", () => {
		expect(
			getVerticalRlBoundaryConstrainedOffset(100, 700, 1000, {
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 900,
				hasMaxRightBoundary: true,
				maxRightBoundary: 800
			})
		).toEqual({
			logicalOffset: 200,
			preferredRightBoundary: 800
		});
	});

	it("constrains vertical-rl boundary offsets to max right boundaries", () => {
		expect(
			getVerticalRlBoundaryConstrainedOffset(100, 700, 1000, {
				hasMaxRightBoundary: true,
				maxRightBoundary: 800
			})
		).toEqual({
			logicalOffset: 200,
			preferredRightBoundary: Number.NaN
		});
	});

	it("clamps vertical-rl boundary constrained offsets to max scroll", () => {
		expect(
			getVerticalRlBoundaryConstrainedOffset(100, 150, 1000, {
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 800
			})
		).toEqual({
			logicalOffset: 150,
			preferredRightBoundary: 800
		});
	});

	it("gets vertical-rl boundary snap cache keys with rounded measurements", () => {
		expect(
			getVerticalRlBoundarySnapCacheKey(123.456, 700.125, 1000.999, 320.444, 4, {
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 800.236,
				hasMaxRightBoundary: true,
				maxRightBoundary: 900.445
			})
		).toBe("123.46:700.13:1001:320.44:4:900.45:800.24");
	});

	it("gets vertical-rl boundary snap cache keys without right-boundary constraints", () => {
		expect(
			getVerticalRlBoundarySnapCacheKey(123, 700, 1000, 320, 0)
		).toBe("123:700:1000:320:0:none:none");
	});

	it("gets cached vertical-rl boundary snaps for matching keys", () => {
		expect(getCachedVerticalRlBoundarySnap({
			key: "snap-key",
			value: 320
		}, "snap-key")).toBe(320);
	});

	it("ignores cached vertical-rl boundary snaps for missing keys", () => {
		expect(getCachedVerticalRlBoundarySnap({
			key: "snap-key",
			value: 320
		}, "other-key")).toBeNull();
		expect(getCachedVerticalRlBoundarySnap(null, "snap-key")).toBeNull();
	});

	it("gets vertical-rl boundary snap cache lookups for matching cache entries", () => {
		const cacheKey = "123.46:700.13:1001:320.44:4:900.45:800.24";

		expect(getVerticalRlBoundarySnapCacheLookup({
			key: cacheKey,
			value: 640
		}, 123.456, 700.125, 1000.999, 320.444, 4, {
			hasPreferredRightBoundary: true,
			preferredRightBoundary: 800.236,
			hasMaxRightBoundary: true,
			maxRightBoundary: 900.445
		})).toEqual({
			cacheKey,
			cachedSnap: 640
		});
	});

	it("gets vertical-rl boundary snap cache lookups for cache misses", () => {
		expect(getVerticalRlBoundarySnapCacheLookup({
			key: "other-key",
			value: 640
		}, 123, 700, 1000, 320, 0)).toEqual({
			cacheKey: "123:700:1000:320:0:none:none",
			cachedSnap: null
		});
	});

	it("gets vertical-rl boundary snap preflight cache hits after constraining offsets", () => {
		const cacheKey = "200:700:1000:320:4:800:800";

		expect(getVerticalRlBoundarySnapPreflight({
			key: cacheKey,
			value: 240
		}, 100, 700, 1000, 320, 4, {
			maxRightBoundary: 800,
			preferredRightBoundary: 900
		}, {
			iframe: {},
			document: {
				createTreeWalker() {}
			},
			window: {},
			body: {}
		})).toEqual({
			cacheLookup: {
				cacheKey,
				cachedSnap: 240
			},
			logicalOffset: 200,
			maxRightBoundaryOptions: {
				hasMaxRightBoundary: true,
				maxRightBoundary: 800
			},
			rightBoundaryLimits: {
				maxRightBoundary: 800,
				hasMaxRightBoundary: true,
				preferredRightBoundary: 800,
				hasPreferredRightBoundary: true
			},
			rightBoundaryOptions: {
				maxRightBoundary: 800,
				hasMaxRightBoundary: true,
				preferredRightBoundary: 800,
				hasPreferredRightBoundary: true
			},
			shouldMeasureText: true
		});
	});

	it("skips vertical-rl boundary snap preflight cache lookups when text is not ready", () => {
		expect(getVerticalRlBoundarySnapPreflight(null, 100, 700, 1000, 320, 4, {}, {
			iframe: {},
			document: {},
			window: {},
			body: {}
		})).toMatchObject({
			cacheLookup: null,
			logicalOffset: 100,
			shouldMeasureText: false
		});
	});

	it("gets vertical-rl boundary snap cache entries for nearest deltas", () => {
		expect(getVerticalRlBoundarySnapCacheEntry("snap-key", 320, 12)).toEqual({
			key: "snap-key",
			value: 320
		});
	});

	it("does not cache vertical-rl boundary snaps without nearest deltas", () => {
		expect(getVerticalRlBoundarySnapCacheEntry("snap-key", 320, null)).toBeNull();
	});

	it("detects ready vertical-rl boundary text snap inputs", () => {
		const iframe = document.createElement("iframe");
		const body = document.createElement("body");

		expect(isVerticalRlBoundarySnapTextReady({
			iframe,
			document,
			window,
			body,
			contentWidth: 1000,
			visibleWidth: 320
		})).toBe(true);
	});

	it("rejects vertical-rl boundary text snap inputs without required DOM nodes", () => {
		const iframe = document.createElement("iframe");
		const body = document.createElement("body");

		expect(isVerticalRlBoundarySnapTextReady({
			document,
			window,
			body,
			contentWidth: 1000,
			visibleWidth: 320
		})).toBe(false);
		expect(isVerticalRlBoundarySnapTextReady({
			iframe,
			document,
			window,
			contentWidth: 1000,
			visibleWidth: 320
		})).toBe(false);
	});

	it("rejects vertical-rl boundary text snap inputs without measurable widths", () => {
		const iframe = document.createElement("iframe");
		const body = document.createElement("body");

		expect(isVerticalRlBoundarySnapTextReady({
			iframe,
			document,
			window,
			body,
			contentWidth: 0,
			visibleWidth: 320
		})).toBe(false);
		expect(isVerticalRlBoundarySnapTextReady({
			iframe,
			document,
			window,
			body,
			contentWidth: 1000,
			visibleWidth: 0
		})).toBe(false);
	});

	it("rejects vertical-rl boundary text snap inputs without TreeWalker support", () => {
		const iframe = document.createElement("iframe");
		const body = document.createElement("body");

		expect(isVerticalRlBoundarySnapTextReady({
			iframe,
			document: { body },
			window,
			body,
			contentWidth: 1000,
			visibleWidth: 320
		})).toBe(false);
	});

	it("gets vertical-rl boundary snap viewport bounds for both origin models", () => {
		expect(getVerticalRlBoundarySnapViewportBounds(100, 600, 120)).toEqual([
			{
				left: 380,
				right: 500
			},
			{
				left: 100,
				right: 220
			}
		]);
	});

	it("normalizes invalid vertical-rl boundary snap viewport measurements", () => {
		expect(getVerticalRlBoundarySnapViewportBounds(Number.NaN, 600, 120)).toEqual([
			{
				left: 480,
				right: 600
			},
			{
				left: 0,
				right: 120
			}
		]);
	});

	it("gets vertical-rl boundary snap edge guards from layout measurements", () => {
		expect(getVerticalRlBoundarySnapEdgeGuard(0)).toBe(2);
		expect(getVerticalRlBoundarySnapEdgeGuard(Number.NaN)).toBe(2);
		expect(getVerticalRlBoundarySnapEdgeGuard(3.4)).toBe(3);
		expect(getVerticalRlBoundarySnapEdgeGuard(3.5)).toBe(4);
	});

	it("clamps vertical-rl boundary snap edge guards", () => {
		expect(getVerticalRlBoundarySnapEdgeGuard(-4)).toBe(1);
		expect(getVerticalRlBoundarySnapEdgeGuard(0.2)).toBe(1);
		expect(getVerticalRlBoundarySnapEdgeGuard(20)).toBe(8);
	});

	it("gets raw vertical-rl boundary snap edge guards for boundary-shift adjustment", () => {
		expect(getVerticalRlBoundarySnapRawEdgeGuard(4.5)).toBe(4.5);
		expect(getVerticalRlBoundarySnapRawEdgeGuard(0)).toBe(0);
		expect(getVerticalRlBoundarySnapRawEdgeGuard(Number.NaN)).toBe(0);
	});

	it("gets paired vertical-rl boundary snap edge guards from layout measurements", () => {
		expect(getVerticalRlBoundarySnapEdgeGuards(4.5)).toEqual({
			edgeGuard: 5,
			rawEdgeGuard: 4.5
		});
	});

	it("normalizes invalid paired vertical-rl boundary snap edge guards", () => {
		expect(getVerticalRlBoundarySnapEdgeGuards(Number.NaN)).toEqual({
			edgeGuard: 2,
			rawEdgeGuard: 0
		});
	});

	it("gets vertical-rl boundary snap structural bleed from page advance", () => {
		expect(getVerticalRlBoundarySnapStructuralBleed(120, 100)).toBe(20);
		expect(getVerticalRlBoundarySnapStructuralBleed(120, 140)).toBe(-20);
	});

	it("falls back to no vertical-rl boundary snap structural bleed without page advance", () => {
		expect(getVerticalRlBoundarySnapStructuralBleed(120, 0)).toBe(0);
		expect(getVerticalRlBoundarySnapStructuralBleed(120, Number.NaN)).toBe(0);
	});

	it("gets vertical-rl boundary snap structural masks", () => {
		expect(getVerticalRlBoundarySnapStructuralMasks({ left: 12, right: 6 })).toEqual({
			left: 12,
			right: 6
		});
	});

	it("normalizes missing vertical-rl boundary snap structural masks", () => {
		expect(getVerticalRlBoundarySnapStructuralMasks(null)).toEqual({
			left: 0,
			right: 0
		});
		expect(getVerticalRlBoundarySnapStructuralMasks({ left: Number.NaN })).toEqual({
			left: 0,
			right: 0
		});
	});

	it("gets vertical-rl boundary snap delta inputs from layout measurements", () => {
		expect(getVerticalRlBoundarySnapDeltaInputs(4.5, { left: 12, right: 6 }, 120, 100, -8)).toEqual({
			edgeGuard: 5,
			edgeGuardPx: 4.5,
			structuralMasks: {
				left: 12,
				right: 6
			},
			boundaryShift: -8,
			structuralBleed: 20
		});
	});

	it("normalizes missing vertical-rl boundary snap delta inputs", () => {
		expect(getVerticalRlBoundarySnapDeltaInputs(Number.NaN, null, 120, 0, 0)).toEqual({
			edgeGuard: 2,
			edgeGuardPx: 0,
			structuralMasks: {
				left: 0,
				right: 0
			},
			boundaryShift: 0,
			structuralBleed: 0
		});
	});

	it("gets vertical-rl boundary snap deltas from the best origin model", () => {
		expect(
			getVerticalRlBoundarySnapDelta([
				{ left: 390, right: 410 },
				{ left: 95, right: 105 }
			], 100, 600, 100, 500, 4, 0, 0, 0, 4, 30)
		).toBe(14);
	});

	it("applies vertical-rl boundary shift adjustment in the snap delta pipeline", () => {
		expect(
			getVerticalRlBoundarySnapDelta([
				{ left: 390, right: 410 },
				{ left: 95, right: 105 }
			], 100, 600, 100, 500, 4, 0, 0, 4, 4, 30)
		).toBe(2);
	});

	it("selects vertical-rl boundary snaps by score first", () => {
		expect(
			getBestVerticalRlBoundarySnap([
				{ delta: 12, distance: 12, score: 2, model: "right-origin" },
				{ delta: 18, distance: 18, score: 1, model: "left-origin" }
			])
		).toEqual({
			delta: 18,
			distance: 18,
			score: 1,
			model: "left-origin"
		});
	});

	it("prefers right-origin vertical-rl boundary snaps when scores tie", () => {
		expect(
			getBestVerticalRlBoundarySnap([
				{ delta: 6, distance: 6, score: 1, model: "left-origin" },
				{ delta: 10, distance: 10, score: 1, model: "right-origin" }
			])
		).toEqual({
			delta: 10,
			distance: 10,
			score: 1,
			model: "right-origin"
		});
	});

	it("uses distance to break vertical-rl boundary snap ties within the same model", () => {
		expect(
			getBestVerticalRlBoundarySnap([
				{ delta: 10, distance: 10, score: 1, model: "right-origin" },
				{ delta: 4, distance: 4, score: 1, model: "right-origin" },
				{ delta: 0, distance: 0, score: 0, model: "right-origin" }
			])
		).toEqual({
			delta: 4,
			distance: 4,
			score: 1,
			model: "right-origin"
		});
	});

	it("limits positive vertical-rl boundary snap deltas near the page boundary shift", () => {
		expect(getVerticalRlBoundaryShiftAdjustedDelta(12, 4, 4, 30)).toBe(2);
		expect(getVerticalRlBoundaryShiftAdjustedDelta(12, 5, 4, 30)).toBe(2);
	});

	it("keeps vertical-rl boundary snap deltas when boundary shift conditions do not apply", () => {
		expect(getVerticalRlBoundaryShiftAdjustedDelta(-12, 4, 4, 30)).toBe(-12);
		expect(getVerticalRlBoundaryShiftAdjustedDelta(12, 0, 4, 30)).toBe(12);
		expect(getVerticalRlBoundaryShiftAdjustedDelta(12, 8, 4, 30)).toBe(12);
		expect(getVerticalRlBoundaryShiftAdjustedDelta(12, 4, 4, 1)).toBe(12);
	});

	it("clamps vertical-rl boundary shift adjustments to at least one pixel", () => {
		expect(getVerticalRlBoundaryShiftAdjustedDelta(12, 1, 1, 30)).toBe(1);
		expect(getVerticalRlBoundaryShiftAdjustedDelta(Number.NaN, 1, 1, 30)).toBe(0);
	});

	it("applies vertical-rl boundary snap deltas within scroll limits", () => {
		expect(getVerticalRlBoundarySnappedOffset(25, 100, 300, 1000)).toBe(125);
		expect(getVerticalRlBoundarySnappedOffset(250, 100, 300, 1000)).toBe(300);
		expect(getVerticalRlBoundarySnappedOffset(-150, 100, 300, 1000)).toBe(0);
		expect(getVerticalRlBoundarySnappedOffset(0, 100, 300, 1000)).toBe(100);
	});

	it("keeps vertical-rl snapped offsets above preferred right boundaries", () => {
		expect(
			getVerticalRlBoundarySnappedOffset(300, 100, 700, 1000, {
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 800
			})
		).toBe(200);
	});

	it("keeps vertical-rl snapped offsets below max right boundaries", () => {
		expect(
			getVerticalRlBoundarySnappedOffset(0, 100, 700, 1000, {
				hasMaxRightBoundary: true,
				maxRightBoundary: 800
			})
		).toBe(200);
	});

	it("clamps vertical-rl preferred and max right boundary targets to scroll limits", () => {
		expect(
			getVerticalRlBoundarySnappedOffset(300, 100, 150, 1000, {
				hasPreferredRightBoundary: true,
				preferredRightBoundary: 800
			})
		).toBe(150);
		expect(
			getVerticalRlBoundarySnappedOffset(0, 100, 150, 1000, {
				hasMaxRightBoundary: true,
				maxRightBoundary: 800
			})
		).toBe(150);
	});

	it("gets vertical-rl boundary snap results with cache entries", () => {
		expect(getVerticalRlBoundarySnapResult("snap-key", 25, 100, 300, 1000)).toEqual({
			cacheEntry: {
				key: "snap-key",
				value: 125
			},
			snapped: 125
		});
	});

	it("gets vertical-rl boundary snap pipeline results", () => {
		expect(getVerticalRlBoundarySnapPipelineResult("pipe-key", {
			rects: [
				{ left: 145, right: 155 }
			],
			deltaInputs: {
				edgeGuard: 4,
				edgeGuardPx: 4,
				structuralMasks: {
					left: 0,
					right: 0
				},
				boundaryShift: 0,
				structuralBleed: 0
			}
		}, 50, 200, 100, 100)).toEqual({
			cacheEntry: {
				key: "pipe-key",
				value: 59
			},
			snapped: 59
		});
	});

	it("gets vertical-rl boundary snap results without cache entries", () => {
		expect(getVerticalRlBoundarySnapResult("snap-key", 0, 100, 300, 1000)).toEqual({
			cacheEntry: null,
			snapped: 100
		});
	});

	it("keeps vertical-rl boundary snap results within right boundary limits", () => {
		expect(getVerticalRlBoundarySnapResult("snap-key", 300, 100, 150, 1000, {
			hasPreferredRightBoundary: true,
			preferredRightBoundary: 800
		})).toEqual({
			cacheEntry: {
				key: "snap-key",
				value: 150
			},
			snapped: 150
		});
	});

	it("builds rounded vertical-rl logical page offset cache keys", () => {
		expect(
			getVerticalRlLogicalPageOffsetCacheKey(
				13.999,
				16824.126,
				18168.124,
				1295.995,
				1295.994,
				4.126
			)
		).toBe("14:16824.13:18168.12:1295.99:1295.99:4.13");
	});

	it("returns no vertical-rl logical page offset cache key without required measurements", () => {
		expect(getVerticalRlLogicalPageOffsetCacheKey(14, 16824, 0, 1296, 1296, 4)).toBeNull();
		expect(getVerticalRlLogicalPageOffsetCacheKey(14, 16824, 18168, 0, 1296, 4)).toBeNull();
		expect(getVerticalRlLogicalPageOffsetCacheKey(14, 16824, 18168, 1296, 0, 4)).toBeNull();
	});

	it("reads cached vertical-rl logical page offsets only for matching finite entries", () => {
		const cache = { key: "a", offsets: { 2: 1200, 3: Number.NaN } };

		expect(getCachedVerticalRlLogicalPageOffset(cache, 2, "a")).toBe(1200);
		expect(getCachedVerticalRlLogicalPageOffset(cache, 2, "b")).toBeNull();
		expect(getCachedVerticalRlLogicalPageOffset(cache, 3, "a")).toBeNull();
		expect(getCachedVerticalRlLogicalPageOffset(null, 2, "a")).toBeNull();
	});

	it("writes vertical-rl logical page offsets into matching cache entries", () => {
		const cache = { key: "a", offsets: { 1: 500 } };
		const nextCache = cacheVerticalRlLogicalPageOffset(cache, 2, 1200, "a");

		expect(nextCache).toBe(cache);
		expect(nextCache?.offsets[1]).toBe(500);
		expect(nextCache?.offsets[2]).toBe(1200);
	});

	it("replaces vertical-rl logical page offset caches when the key changes", () => {
		const cache = { key: "a", offsets: { 1: 500 } };
		const nextCache = cacheVerticalRlLogicalPageOffset(cache, 2, 1200, "b");

		expect(nextCache).not.toBe(cache);
		expect(nextCache?.key).toBe("b");
		expect(nextCache?.offsets[1]).toBeUndefined();
		expect(nextCache?.offsets[2]).toBe(1200);
	});

	it("ignores invalid vertical-rl logical page offset cache writes", () => {
		const cache = { key: "a", offsets: { 1: 500 } };

		expect(cacheVerticalRlLogicalPageOffset(cache, 2, Number.NaN, "a")).toBe(cache);
		expect(cacheVerticalRlLogicalPageOffset(cache, 2, 1200, null)).toBe(cache);
		expect(cache.offsets[2]).toBeUndefined();
	});

	it("calculates logical offsets for page-grid indices", () => {
		expect(getLogicalOffsetForPageIndex(0, 4, 3000, 1000)).toBe(0);
		expect(getLogicalOffsetForPageIndex(2, 4, 3000, 1000)).toBe(2000);
	});

	it("clamps logical offsets to page range and max scroll", () => {
		expect(getLogicalOffsetForPageIndex(-1, 4, 3000, 1000)).toBe(0);
		expect(getLogicalOffsetForPageIndex(99, 4, 2500, 1000)).toBe(2500);
	});

	it("applies boundary shift only to interior vertical-rl pages", () => {
		expect(getLogicalOffsetForPageIndex(0, 4, 3000, 1000, 120, true)).toBe(0);
		expect(getLogicalOffsetForPageIndex(1, 4, 3000, 1000, 120, true)).toBe(880);
		expect(getLogicalOffsetForPageIndex(2, 4, 3000, 1000, 120, true)).toBe(1880);
		expect(getLogicalOffsetForPageIndex(3, 4, 3000, 1000, 120, true)).toBe(3000);
	});

	it("does not shift horizontal page offsets", () => {
		expect(getLogicalOffsetForPageIndex(1, 4, 3000, 1000, 120, false)).toBe(1000);
	});

	it("rounds near-snapped horizontal offsets to the nearest page", () => {
		expect(getCurrentPageIndexForOffset(995, 4, 1000, 3000, 80)).toBe(1);
		expect(getCurrentPageIndexForOffset(2081, 4, 1000, 3000, 80)).toBe(2);
	});

	it("uses the legacy horizontal floor fallback away from snap tolerance", () => {
		expect(getCurrentPageIndexForOffset(1400, 4, 1000, 3000, 80)).toBe(1);
		expect(getCurrentPageIndexForOffset(1600, 4, 1000, 3000, 80)).toBe(1);
	});

	it("clamps horizontal page indices", () => {
		expect(getCurrentPageIndexForOffset(-25, 4, 1000, 3000, 80)).toBe(0);
		expect(getCurrentPageIndexForOffset(5000, 4, 1000, 3000, 80)).toBe(3);
	});

	it("falls back to the first page without a valid page advance", () => {
		expect(getCurrentPageIndexForOffset(1000, 4, 0, 3000, 80)).toBe(0);
		expect(getCurrentPageIndexForOffset(1000, 4, Number.NaN, 3000, 80)).toBe(0);
	});

	it("snaps vertical-rl offsets near max scroll to the last page", () => {
		expect(getCurrentPageIndexForOffset(2925, 4, 1000, 3000, 80, 120, true)).toBe(3);
	});

	it("uses shifted vertical-rl logical offsets to find the nearest page", () => {
		expect(getCurrentPageIndexForOffset(860, 4, 1000, 3000, 80, 120, true)).toBe(1);
		expect(getCurrentPageIndexForOffset(1885, 4, 1000, 3000, 80, 120, true)).toBe(2);
	});
});

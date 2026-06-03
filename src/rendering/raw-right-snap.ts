import {
	getVerticalRlSnappedRightEdgeMask
} from "./edge-mask";

export interface VerticalRlRawRightSnapRectShift {
	shift: number;
	expandBeyondPaintGuard: boolean;
}

export interface VerticalRlRawRightSnapShiftAggregate {
	expand: number;
	shrink: number;
	expandBeyondPaintGuard: boolean;
}

export interface VerticalRlRawRightSnapDecision {
	shift: number;
	right: number;
	requiredRawRightMask: number;
	expandBeyondPaintGuard: boolean;
}

export interface VerticalRlRawRightSnapRectInput {
	clippedAtPreviousLeft: boolean;
	rawRightStraddler: boolean;
	rawRightOverhang: number;
	visibleInsideRawRight: number;
}

export function getVerticalRlRequiredRawRightMask(
	currentRequiredRawRightMask: number,
	rectLeft: number,
	rectRight: number,
	rawLeft: number,
	rawRight: number,
	previousRawLeft: number,
	previousPageStep: number,
	edgeTolerance: number
): number {
	const currentRequired = Math.max(0, Number(currentRequiredRawRightMask) || 0);
	const left = Number(rectLeft) || 0;
	const right = Number(rectRight) || 0;
	const viewportLeft = Number(rawLeft) || 0;
	const viewportRight = Number(rawRight) || 0;
	const previousLeft = Number(previousRawLeft) || 0;
	const previousStep = Number(previousPageStep) || 0;
	const tolerance = Math.max(0, Number(edgeTolerance) || 0);
	const rawRightStraddler = left < viewportRight && right > viewportRight;

	if (!rawRightStraddler) {
		return currentRequired;
	}

	const clippedAtPreviousLeft = previousStep > 0 && left < previousLeft && right > previousLeft;
	if (clippedAtPreviousLeft) {
		return currentRequired;
	}

	const rawRightOverhang = right - viewportRight;
	const visibleInsideRawRight = viewportRight - Math.max(left, viewportLeft);
	if (visibleInsideRawRight > tolerance && rawRightOverhang > Math.max(tolerance, 4)) {
		return Math.max(currentRequired, Math.ceil(visibleInsideRawRight + 1));
	}

	return currentRequired;
}

export function getVerticalRlRequiredRawRightMaskForRects(
	rects: { left: number; right: number }[],
	rawLeft: number,
	rawRight: number,
	previousRawLeft: number,
	previousPageStep: number,
	edgeTolerance: number,
	initialRequiredRawRightMask = 0
): number {
	let requiredRawRightMask = Math.max(0, Number(initialRequiredRawRightMask) || 0);

	for (const rect of rects || []) {
		requiredRawRightMask = getVerticalRlRequiredRawRightMask(
			requiredRawRightMask,
			rect.left,
			rect.right,
			rawLeft,
			rawRight,
			previousRawLeft,
			previousPageStep,
			edgeTolerance
		);
	}

	return requiredRawRightMask;
}

export function getVerticalRlRawRightSnapRectInput(
	rectLeft: number,
	rectRight: number,
	rawLeft: number,
	rawRight: number,
	previousRawLeft: number,
	previousPageStep: number
): VerticalRlRawRightSnapRectInput {
	const left = Number(rectLeft) || 0;
	const right = Number(rectRight) || 0;
	const viewportLeft = Number(rawLeft) || 0;
	const viewportRight = Number(rawRight) || 0;
	const previousLeft = Number(previousRawLeft) || 0;
	const previousStep = Number(previousPageStep) || 0;
	const rawRightStraddler = left < viewportRight && right > viewportRight;

	return {
		clippedAtPreviousLeft: previousStep > 0 && left < previousLeft && right > previousLeft,
		rawRightStraddler,
		rawRightOverhang: rawRightStraddler ? right - viewportRight : 0,
		visibleInsideRawRight: rawRightStraddler ? viewportRight - Math.max(left, viewportLeft) : 0
	};
}

export function hasVerticalRlRightEdgeMaskConsumingVisibleEdge(
	isRawRightStraddler: boolean,
	right: number,
	visibleInsideRawRight: number,
	rightMaxMask: number,
	edgeTolerance: number
): boolean {
	const visibleInside = Number(visibleInsideRawRight) || 0;
	const currentRight = Number(right) || 0;
	const rightLimit = Number(rightMaxMask) || 0;
	const tolerance = Number(edgeTolerance) || 0;

	return !!(
		isRawRightStraddler &&
		currentRight < visibleInside &&
		visibleInside <= Math.max(currentRight, rightLimit) + tolerance
	);
}

export function isVerticalRlRectJustOutsideRawRight(
	rectLeft: number,
	rawRight: number,
	edgeTolerance: number
): boolean {
	const left = Number(rectLeft) || 0;
	const viewportRight = Number(rawRight) || 0;
	const tolerance = Number(edgeTolerance) || 0;

	return left >= viewportRight && left - viewportRight <= tolerance;
}

export function getVerticalRlJustOutsideRawRightMaskTarget(
	rectLeft: number,
	rawRight: number,
	edgeTolerance: number
): number {
	const left = Number(rectLeft) || 0;
	const viewportRight = Number(rawRight) || 0;
	const tolerance = Math.max(0, Number(edgeTolerance) || 0);

	if (left < viewportRight || left - viewportRight > tolerance) {
		return 0;
	}

	return Math.ceil(Math.min(tolerance, left - viewportRight + tolerance));
}

export function getVerticalRlShallowRawRightStraddlerMaskTarget(
	isRawRightStraddler: boolean,
	visibleInsideRawRight: number,
	edgeTolerance: number
): number {
	const visibleInside = Math.max(0, Number(visibleInsideRawRight) || 0);
	const tolerance = Math.max(0, Number(edgeTolerance) || 0);

	if (!isRawRightStraddler || visibleInside > tolerance) {
		return 0;
	}

	return Math.ceil(visibleInside + 1);
}

export function shouldClearVerticalRlRawRightStraddlerMask(
	isRawRightStraddler: boolean,
	rawRightOverhang: number,
	edgeTolerance: number,
	maskConsumesVisibleRightEdge: boolean,
	requiredRawRightMask: number,
	nextPageStep: number
): boolean {
	const overhang = Number(rawRightOverhang) || 0;
	const tolerance = Math.max(0, Number(edgeTolerance) || 0);
	const required = Math.max(0, Number(requiredRawRightMask) || 0);
	const nextStep = Number(nextPageStep) || 0;

	return !!(
		isRawRightStraddler &&
		(
			overhang <= Math.max(tolerance, 4) ||
			(
				maskConsumesVisibleRightEdge &&
				(required <= 0 || nextStep <= 0)
			)
		)
	);
}

export function shouldClearVerticalRlCoveredRawRightStraddlerMask(
	isRawRightStraddler: boolean,
	visibleInsideRawRight: number,
	edgeTolerance: number,
	right: number,
	rightMaxMask: number,
	requiredRawRightMask: number,
	nextPageStep: number
): boolean {
	const visibleInside = Math.max(0, Number(visibleInsideRawRight) || 0);
	const tolerance = Math.max(0, Number(edgeTolerance) || 0);
	const currentRight = Math.max(0, Number(right) || 0);
	const rightLimit = Math.max(0, Number(rightMaxMask) || 0);
	const required = Math.max(0, Number(requiredRawRightMask) || 0);
	const nextStep = Number(nextPageStep) || 0;

	return !!(
		isRawRightStraddler &&
		visibleInside > tolerance &&
		currentRight >= visibleInside &&
		rightLimit >= visibleInside &&
		(required <= 0 || nextStep <= 0)
	);
}

export function getVerticalRlDeepRawRightStraddlerExpandTarget(
	isRawRightStraddler: boolean,
	visibleInsideRawRight: number,
	edgeTolerance: number
): number {
	const visibleInside = Math.max(0, Number(visibleInsideRawRight) || 0);
	const tolerance = Math.max(0, Number(edgeTolerance) || 0);

	if (!isRawRightStraddler || visibleInside <= tolerance) {
		return 0;
	}

	return Math.ceil(visibleInside + 1);
}

export function getVerticalRlBoundaryCrossingExpandTarget(
	rectLeft: number,
	rectRight: number,
	boundary: number
): number {
	const left = Number(rectLeft) || 0;
	const right = Number(rectRight) || 0;
	const targetBoundary = Number(boundary) || 0;

	if (left >= targetBoundary || right <= targetBoundary) {
		return 0;
	}

	return Math.ceil(targetBoundary - left + 1);
}

export function getVerticalRlPreviousLeftClippedRightMaskTarget(
	requiredRawRightMask: number,
	rectRight: number,
	rawRight: number
): number {
	const required = Math.max(0, Number(requiredRawRightMask) || 0);
	const right = Number(rectRight) || 0;
	const viewportRight = Number(rawRight) || 0;
	const clippedWidth = Math.max(0, Math.floor(viewportRight - Math.min(right, viewportRight)));

	return Math.max(required, clippedWidth);
}

export function getVerticalRlRawRightSnapRectShift(
	rectLeft: number,
	rectRight: number,
	rawRight: number,
	boundary: number,
	right: number,
	clippedAtPreviousLeft: boolean,
	rawRightStraddler: boolean,
	rawRightOverhang: number,
	visibleInsideRawRight: number,
	edgeTolerance: number,
	rightMaxMask: number,
	requiredRawRightMask: number,
	nextPageStep: number,
	canExpandClippedRawRight: boolean
): VerticalRlRawRightSnapRectShift {
	const rectStart = Number(rectLeft) || 0;
	const rectEnd = Number(rectRight) || 0;
	const viewportRight = Number(rawRight) || 0;
	const edge = Number(boundary) || 0;
	const currentRight = Math.max(0, Number(right) || 0);

	if (
		clippedAtPreviousLeft &&
		rectEnd > edge &&
		rectStart < viewportRight
	) {
		const targetRight = getVerticalRlPreviousLeftClippedRightMaskTarget(
			requiredRawRightMask,
			rectEnd,
			viewportRight
		);

		return {
			shift: targetRight < currentRight ? targetRight - currentRight : 0,
			expandBeyondPaintGuard: false
		};
	}

	const justOutsideRawRightTarget = getVerticalRlJustOutsideRawRightMaskTarget(
		rectStart,
		viewportRight,
		edgeTolerance
	);
	if (justOutsideRawRightTarget > 0) {
		return {
			shift: justOutsideRawRightTarget > currentRight ? justOutsideRawRightTarget - currentRight : 0,
			expandBeyondPaintGuard: false
		};
	}

	const shallowRawRightStraddlerTarget = getVerticalRlShallowRawRightStraddlerMaskTarget(
		rawRightStraddler,
		visibleInsideRawRight,
		edgeTolerance
	);
	if (shallowRawRightStraddlerTarget > 0) {
		return {
			shift: shallowRawRightStraddlerTarget > currentRight ? shallowRawRightStraddlerTarget - currentRight : 0,
			expandBeyondPaintGuard: false
		};
	}

	const maskConsumesVisibleRightEdge = hasVerticalRlRightEdgeMaskConsumingVisibleEdge(
		rawRightStraddler,
		currentRight,
		visibleInsideRawRight,
		rightMaxMask,
		edgeTolerance
	);
	if (
		shouldClearVerticalRlRawRightStraddlerMask(
			rawRightStraddler,
			rawRightOverhang,
			edgeTolerance,
			maskConsumesVisibleRightEdge,
			requiredRawRightMask,
			nextPageStep
		) ||
		shouldClearVerticalRlCoveredRawRightStraddlerMask(
			rawRightStraddler,
			visibleInsideRawRight,
			edgeTolerance,
			currentRight,
			rightMaxMask,
			requiredRawRightMask,
			nextPageStep
		)
	) {
		return {
			shift: currentRight > 0 ? -currentRight : 0,
			expandBeyondPaintGuard: false
		};
	}

	const deepRawRightStraddlerExpandTarget = getVerticalRlDeepRawRightStraddlerExpandTarget(
		rawRightStraddler,
		visibleInsideRawRight,
		edgeTolerance
	);
	if (deepRawRightStraddlerExpandTarget > 0) {
		const shouldExpand = canExpandClippedRawRight && deepRawRightStraddlerExpandTarget > currentRight;

		return {
			shift: shouldExpand ? deepRawRightStraddlerExpandTarget - currentRight : 0,
			expandBeyondPaintGuard: shouldExpand
		};
	}

	return {
		shift: getVerticalRlBoundaryCrossingExpandTarget(rectStart, rectEnd, edge),
		expandBeyondPaintGuard: false
	};
}

export function getVerticalRlRawRightSnapRectShiftForRect(
	rectLeft: number,
	rectRight: number,
	rawLeft: number,
	rawRight: number,
	previousRawLeft: number,
	previousPageStep: number,
	boundary: number,
	right: number,
	edgeTolerance: number,
	rightMaxMask: number,
	requiredRawRightMask: number,
	nextPageStep: number,
	canExpandClippedRawRight: boolean
): VerticalRlRawRightSnapRectShift {
	const {
		clippedAtPreviousLeft,
		rawRightStraddler,
		rawRightOverhang,
		visibleInsideRawRight
	} = getVerticalRlRawRightSnapRectInput(
		rectLeft,
		rectRight,
		rawLeft,
		rawRight,
		previousRawLeft,
		previousPageStep
	);

	return getVerticalRlRawRightSnapRectShift(
		rectLeft,
		rectRight,
		rawRight,
		boundary,
		right,
		clippedAtPreviousLeft,
		rawRightStraddler,
		rawRightOverhang,
		visibleInsideRawRight,
		edgeTolerance,
		rightMaxMask,
		requiredRawRightMask,
		nextPageStep,
		canExpandClippedRawRight
	);
}

export function getVerticalRlRawRightSnapShiftAggregate(
	currentExpand: number,
	currentShrink: number,
	currentExpandBeyondPaintGuard: boolean,
	rectShift: VerticalRlRawRightSnapRectShift
): VerticalRlRawRightSnapShiftAggregate {
	const shift = Number(rectShift.shift) || 0;
	const expand = Number(currentExpand) || 0;
	const shrink = Number(currentShrink) || 0;

	if (shift < 0) {
		return {
			expand,
			shrink: Math.min(shrink, shift),
			expandBeyondPaintGuard: currentExpandBeyondPaintGuard
		};
	}

	if (shift > 0) {
		return {
			expand: Math.max(expand, shift),
			shrink,
			expandBeyondPaintGuard: currentExpandBeyondPaintGuard || rectShift.expandBeyondPaintGuard
		};
	}

	return {
		expand,
		shrink,
		expandBeyondPaintGuard: currentExpandBeyondPaintGuard
	};
}

export function getVerticalRlRawRightSnapShiftForRects(
	rects: Array<{ left: number; right: number }>,
	rawLeft: number,
	rawRight: number,
	boundary: number,
	right: number,
	previousRawLeft: number,
	previousPageStep: number,
	edgeTolerance: number,
	rightMaxMask: number,
	requiredRawRightMask: number,
	nextPageStep: number,
	canExpandClippedRawRight: boolean
): VerticalRlRawRightSnapShiftAggregate {
	let expand = 0;
	let shrink = 0;
	let expandBeyondPaintGuard = false;

	for (const rect of rects || []) {
		const rectShift = getVerticalRlRawRightSnapRectShiftForRect(
			rect.left,
			rect.right,
			rawLeft,
			rawRight,
			previousRawLeft,
			previousPageStep,
			boundary,
			right,
			edgeTolerance,
			rightMaxMask,
			requiredRawRightMask,
			nextPageStep,
			canExpandClippedRawRight
		);
		const aggregate = getVerticalRlRawRightSnapShiftAggregate(
			expand,
			shrink,
			expandBeyondPaintGuard,
			rectShift
		);
		expand = aggregate.expand;
		shrink = aggregate.shrink;
		expandBeyondPaintGuard = aggregate.expandBeyondPaintGuard;
	}

	return {
		expand,
		shrink,
		expandBeyondPaintGuard
	};
}

export function getVerticalRlRawRightSnapDecisionForRects(
	rects: Array<{ left: number; right: number }>,
	rawLeft: number,
	rawRight: number,
	right: number,
	previousPageStep: number,
	edgeTolerance: number,
	maxMask: number,
	rightMaxMask: number,
	rightPaintGuardMax: number,
	nextPageStep: number,
	canExpandClippedRawRight: boolean
): VerticalRlRawRightSnapDecision {
	const boundary = rawRight - right;
	const previousRawLeft = rawLeft + previousPageStep;
	const requiredRawRightMask = getVerticalRlRequiredRawRightMaskForRects(
		rects,
		rawLeft,
		rawRight,
		previousRawLeft,
		previousPageStep,
		edgeTolerance
	);
	const aggregate = getVerticalRlRawRightSnapShiftForRects(
		rects,
		rawLeft,
		rawRight,
		boundary,
		right,
		previousRawLeft,
		previousPageStep,
		edgeTolerance,
		rightMaxMask,
		requiredRawRightMask,
		nextPageStep,
		canExpandClippedRawRight
	);

	return {
		shift: aggregate.shrink < 0 ? aggregate.shrink : aggregate.expand,
		right: getVerticalRlSnappedRightEdgeMask(
			right,
			aggregate.shrink < 0 ? aggregate.shrink : aggregate.expand,
			maxMask,
			rightMaxMask,
			requiredRawRightMask,
			rightPaintGuardMax,
			aggregate.expandBeyondPaintGuard
		),
		requiredRawRightMask,
		expandBeyondPaintGuard: aggregate.expandBeyondPaintGuard
	};
}

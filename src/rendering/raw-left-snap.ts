import {
	getVerticalRlSnappedLeftEdgeMask
} from "./edge-mask";

export interface VerticalRlRawLeftSnapRectInput {
	rawLeftStraddler: boolean;
	hasNextPage: boolean;
	clippedAtNextRight: boolean;
	visibleAtNextRight: boolean;
	nearlyVisibleAtNextRight: boolean;
}

export interface VerticalRlRawLeftSnapDecision {
	shift: number;
	left: number;
}

export function getVerticalRlRawLeftSnapRectInput(
	rectLeft: number,
	rectRight: number,
	rawLeft: number,
	rawRight: number,
	nextPageStep: number,
	edgeTolerance: number
): VerticalRlRawLeftSnapRectInput {
	const left = Number(rectLeft) || 0;
	const right = Number(rectRight) || 0;
	const viewportLeft = Number(rawLeft) || 0;
	const viewportRight = Number(rawRight) || 0;
	const nextStep = Number(nextPageStep) || 0;
	const tolerance = Number(edgeTolerance) || 0;
	const shiftedRight = right + nextStep;
	const hasNextPage = nextStep > 0;

	return {
		rawLeftStraddler: left < viewportLeft && right > viewportLeft,
		hasNextPage,
		clippedAtNextRight: !hasNextPage || shiftedRight > viewportRight,
		visibleAtNextRight: hasNextPage && shiftedRight <= viewportRight,
		nearlyVisibleAtNextRight: hasNextPage && shiftedRight <= viewportRight + tolerance
	};
}

export function getVerticalRlRawLeftBoundaryCrossingShift(
	rectLeft: number,
	rectRight: number,
	boundary: number,
	left: number,
	hasNextPage: boolean,
	visibleAtNextRight: boolean,
	nearlyVisibleAtNextRight: boolean,
	allowRawLeftMask: boolean
): number {
	const rectStart = Number(rectLeft) || 0;
	const rectEnd = Number(rectRight) || 0;
	const edge = Number(boundary) || 0;
	const currentLeft = Math.max(0, Number(left) || 0);

	if (rectStart >= edge || rectEnd <= edge) {
		return 0;
	}

	const expand = Math.ceil(rectEnd - edge + 1);
	const shrink = Math.ceil(edge - rectStart + 1);

	if (hasNextPage && (visibleAtNextRight || nearlyVisibleAtNextRight || allowRawLeftMask)) {
		return expand;
	}

	if (shrink > 0 && currentLeft - shrink >= 0) {
		return -shrink;
	}

	return expand;
}

export function getVerticalRlRawLeftCoveredShrinkShift(
	rectLeft: number,
	rectRight: number,
	rawLeft: number,
	boundary: number,
	left: number,
	rawLeftStraddler: boolean,
	forceRawLeftMask: boolean,
	visibleAtNextRight: boolean,
	hasStructuralEdgeGuard: boolean,
	nearlyVisibleAtNextRight: boolean,
	allowRawLeftMask: boolean,
	clippedAtNextRight: boolean
): number {
	const rectStart = Number(rectLeft) || 0;
	const rectEnd = Number(rectRight) || 0;
	const viewportLeft = Number(rawLeft) || 0;
	const edge = Number(boundary) || 0;
	const currentLeft = Math.max(0, Number(left) || 0);

	if (
		currentLeft <= 0 ||
		rectEnd <= viewportLeft ||
		rectStart >= edge ||
		rectEnd > edge ||
		(rawLeftStraddler && forceRawLeftMask) ||
		(
			rawLeftStraddler
				? ((visibleAtNextRight || (hasStructuralEdgeGuard && nearlyVisibleAtNextRight)) || allowRawLeftMask)
				: nearlyVisibleAtNextRight
		) ||
		(rawLeftStraddler && !clippedAtNextRight)
	) {
		return 0;
	}

	const targetLeft = Math.max(0, Math.floor(Math.max(rectStart, viewportLeft) - viewportLeft - 1));

	return targetLeft < currentLeft ? targetLeft - currentLeft : 0;
}

export function getVerticalRlRawLeftVisibleExpandShift(
	rectLeft: number,
	rectRight: number,
	rawLeft: number,
	boundary: number,
	left: number,
	visibleAtNextRight: boolean,
	edgeTolerance: number
): number {
	const rectStart = Number(rectLeft) || 0;
	const rectEnd = Number(rectRight) || 0;
	const viewportLeft = Number(rawLeft) || 0;
	const edge = Number(boundary) || 0;
	const currentLeft = Math.max(0, Number(left) || 0);
	const tolerance = Math.max(0, Number(edgeTolerance) || 0);

	if (
		currentLeft <= 0 ||
		!visibleAtNextRight ||
		rectStart < edge ||
		rectStart - edge > tolerance
	) {
		return 0;
	}

	const targetLeft = Math.ceil(rectEnd - viewportLeft + 1);

	return targetLeft > currentLeft ? targetLeft - currentLeft : 0;
}

export function getVerticalRlRawLeftSnapRectShift(
	rectLeft: number,
	rectRight: number,
	rawLeft: number,
	boundary: number,
	left: number,
	rawLeftStraddler: boolean,
	hasNextPage: boolean,
	clippedAtNextRight: boolean,
	visibleAtNextRight: boolean,
	nearlyVisibleAtNextRight: boolean,
	forceRawLeftMask: boolean,
	allowRawLeftMask: boolean,
	hasStructuralEdgeGuard: boolean,
	edgeTolerance: number
): number {
	const currentLeft = Math.max(0, Number(left) || 0);

	if (
		currentLeft <= 0 &&
		rawLeftStraddler &&
		clippedAtNextRight &&
		!forceRawLeftMask &&
		!allowRawLeftMask
	) {
		return 0;
	}

	const boundaryCrossingShift = getVerticalRlRawLeftBoundaryCrossingShift(
		rectLeft,
		rectRight,
		boundary,
		currentLeft,
		hasNextPage,
		visibleAtNextRight,
		nearlyVisibleAtNextRight,
		allowRawLeftMask
	);

	if (boundaryCrossingShift) {
		return boundaryCrossingShift;
	}

	const coveredShrinkShift = getVerticalRlRawLeftCoveredShrinkShift(
		rectLeft,
		rectRight,
		rawLeft,
		boundary,
		currentLeft,
		rawLeftStraddler,
		forceRawLeftMask,
		visibleAtNextRight,
		hasStructuralEdgeGuard,
		nearlyVisibleAtNextRight,
		allowRawLeftMask,
		clippedAtNextRight
	);

	if (coveredShrinkShift < 0) {
		return coveredShrinkShift;
	}

	return getVerticalRlRawLeftVisibleExpandShift(
		rectLeft,
		rectRight,
		rawLeft,
		boundary,
		currentLeft,
		visibleAtNextRight,
		edgeTolerance
	);
}

export function getVerticalRlRawLeftSnapShiftAggregate(currentShift: number, rectShift: number): number {
	const shift = Number(currentShift) || 0;
	const nextShift = Number(rectShift) || 0;

	if (nextShift > 0) {
		return Math.max(shift, nextShift);
	}

	if (nextShift < 0) {
		return Math.min(shift, nextShift);
	}

	return shift;
}

export function getVerticalRlRawLeftSnapShiftForRects(
	rects: Array<{ left: number; right: number }>,
	rawLeft: number,
	rawRight: number,
	boundary: number,
	left: number,
	nextPageStep: number,
	forceRawLeftMask: boolean,
	allowRawLeftMask: boolean,
	hasStructuralEdgeGuard: boolean,
	edgeTolerance: number
): number {
	let shift = 0;

	for (const rect of rects || []) {
		let {
			rawLeftStraddler,
			hasNextPage,
			clippedAtNextRight,
			visibleAtNextRight,
			nearlyVisibleAtNextRight
		} = getVerticalRlRawLeftSnapRectInput(
			rect.left,
			rect.right,
			rawLeft,
			rawRight,
			nextPageStep,
			edgeTolerance
		);
		let rectShift = getVerticalRlRawLeftSnapRectShift(
			rect.left,
			rect.right,
			rawLeft,
			boundary,
			left,
			rawLeftStraddler,
			hasNextPage,
			clippedAtNextRight,
			visibleAtNextRight,
			nearlyVisibleAtNextRight,
			forceRawLeftMask,
			allowRawLeftMask,
			hasStructuralEdgeGuard,
			edgeTolerance
		);
		shift = getVerticalRlRawLeftSnapShiftAggregate(shift, rectShift);
	}

	return shift;
}

export function getVerticalRlRawLeftSnapDecisionForRects(
	rects: Array<{ left: number; right: number }>,
	rawLeft: number,
	rawRight: number,
	left: number,
	leftMaxMask: number,
	nextPageStep: number,
	forceRawLeftMask: boolean,
	allowRawLeftMask: boolean,
	hasStructuralEdgeGuard: boolean,
	edgeTolerance: number
): VerticalRlRawLeftSnapDecision {
	const boundary = rawLeft + left;
	const shift = getVerticalRlRawLeftSnapShiftForRects(
		rects,
		rawLeft,
		rawRight,
		boundary,
		left,
		nextPageStep,
		forceRawLeftMask,
		allowRawLeftMask,
		hasStructuralEdgeGuard,
		edgeTolerance
	);

	return {
		shift,
		left: getVerticalRlSnappedLeftEdgeMask(left, shift, leftMaxMask)
	};
}

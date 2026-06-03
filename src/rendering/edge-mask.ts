export function getVerticalRlEdgeMaskLimit(pageAdvance: number): number {
	const advance = Number(pageAdvance) || 0;

	return Math.max(0, Math.floor(advance / 4));
}

export interface VerticalRlEdgeMaskSnapLoopResult {
	iterations: number;
	lastShift: number;
	stopped: boolean;
}

export function runVerticalRlEdgeMaskSnapLoop(
	snapLeft: () => number,
	snapRight: () => number,
	maxIterations = 4
): VerticalRlEdgeMaskSnapLoopResult {
	const iterationsLimit = Math.max(0, Math.floor(Number(maxIterations) || 0));
	let iterations = 0;
	let lastShift = 0;

	for (let i = 0; i < iterationsLimit; i++) {
		iterations++;
		lastShift = (Number(snapLeft()) || 0) + (Number(snapRight()) || 0);
		if (!lastShift) {
			return {
				iterations,
				lastShift,
				stopped: true
			};
		}
	}

	return {
		iterations,
		lastShift,
		stopped: false
	};
}

export function hasVerticalRlEdgeMaskStructuralGutter(
	visibleWidth: number,
	pageAdvance: number,
	leftMask: number,
	boundaryShift: number,
	currentPageIndex: number,
	previousPageStep: number
): boolean {
	const visible = Number(visibleWidth) || 0;
	const advance = Number(pageAdvance) || 0;
	const left = Number(leftMask) || 0;
	const shift = Number(boundaryShift) || 0;
	const pageIndex = Number(currentPageIndex) || 0;
	const previousStep = Number(previousPageStep) || 0;

	return !!(
		visible &&
		advance &&
		Math.abs(visible - advance - left) <= 1 &&
		shift === 0 &&
		(pageIndex <= 0 || Math.abs(previousStep - advance) <= 1)
	);
}

export function getVerticalRlPreviousPageRightMask(
	visibleWidth: number,
	previousPageStep: number,
	previousPageLeftMask: number,
	maxMask: number
): number {
	const visible = Number(visibleWidth) || 0;
	const previousStep = Number(previousPageStep) || 0;
	const previousLeft = Number(previousPageLeftMask) || 0;
	const maskLimit = Math.max(0, Number(maxMask) || 0);

	if (!visible || !previousStep || !maskLimit) {
		return 0;
	}

	const overlap = Math.max(0, visible - previousStep - previousLeft);

	return Math.min(Math.ceil(overlap), maskLimit);
}

export function getVerticalRlEdgeMaskSnapInput(
	left: number,
	right: number,
	maxMask: number,
	previousPageStep = 0
): {
	widths: { left: number; right: number };
	maxMask: number;
	previousPageStep: number;
	rightMaxMask: number;
} | null {
	const maskLimit = Math.max(0, Number(maxMask) || 0);

	if (!maskLimit) {
		return null;
	}

	const rightMask = Math.min(Number(right) || 0, maskLimit);

	return {
		widths: {
			left: Math.min(Number(left) || 0, maskLimit),
			right: rightMask
		},
		maxMask: maskLimit,
		previousPageStep: Number(previousPageStep) || 0,
		rightMaxMask: rightMask
	};
}

export function getVerticalRlStructuralGutterEdgeMaskSnapInput(
	left: number,
	right: number,
	maxMask: number,
	nextPageStep: number
): {
	widths: { left: number; right: number };
	maxMask: number;
	nextPageStep: number;
	rightMaxMask: number;
} | null {
	const maskLimit = Math.max(0, Number(maxMask) || 0);

	if (!maskLimit) {
		return null;
	}

	return {
		widths: {
			left: Math.min(Number(left) || 0, maskLimit),
			right: Number(right) || 0
		},
		maxMask: maskLimit,
		nextPageStep: Number(nextPageStep) || 0,
		rightMaxMask: 0
	};
}

export function getRenderedVerticalRlEdgeMaskWidths(
	computed: { left: number; right: number } | null | undefined,
	renderedLeft: number,
	renderedRight: number,
	renderedFallback: number
): { left: number; right: number } {
	let left = Number(renderedLeft);
	let right = Number(renderedRight);

	if (!Number.isFinite(left)) {
		left = Number(renderedFallback);
	}

	if (!Number.isFinite(right)) {
		right = 0;
	}

	return {
		left: Math.max(Number(computed && computed.left) || 0, left || 0),
		right: Math.max(Number(computed && computed.right) || 0, right || 0)
	};
}

export function getVerticalRlEdgeMaskWidth(
	widths: { left: number; right: number } | null | undefined
): number {
	return Math.max(
		Number(widths && widths.left) || 0,
		Number(widths && widths.right) || 0
	);
}

export function getVerticalRlEdgeMaskSnapViewportInput(
	widths: { left: number; right: number },
	maxMask: number,
	containerLeft: number,
	containerRight: number,
	iframeLeft: number,
	limits: {
		rawLeft?: number;
		rawRight?: number;
		leftMaxMask?: number;
		rightMaxMask?: number;
		nextPageStep?: number;
		previousPageStep?: number;
		forceRawLeftMask?: boolean;
		allowRawLeftMask?: boolean;
		allowRawRightMask?: boolean;
	},
	defaultNextPageStep: number,
	edgeGuardPx = 0
): {
	rawLeft: number;
	rawRight: number;
	leftMaxMask: number;
	rightMaxMask: number;
	left: number;
	right: number;
	nextPageStep: number;
	previousPageStep: number;
	forceRawLeftMask: boolean;
	allowRawLeftMask: boolean;
	edgeTolerance: number;
	hasStructuralEdgeGuard: boolean;
	canExpandClippedRawRight: boolean;
	rightPaintGuardMax: number;
} {
	const maskLimit = Math.max(0, Number(maxMask) || 0);
	const leftLimit = Math.max(0, Number(limits.leftMaxMask !== undefined ? limits.leftMaxMask : maskLimit) || 0);
	const rightLimit = Math.max(0, Number(limits.rightMaxMask !== undefined ? limits.rightMaxMask : maskLimit) || 0);
	const rawLeft = Number.isFinite(Number(limits.rawLeft))
		? Number(limits.rawLeft)
		: (Number(containerLeft) || 0) - (Number(iframeLeft) || 0);
	const rawRight = Number.isFinite(Number(limits.rawRight))
		? Number(limits.rawRight)
		: (Number(containerRight) || 0) - (Number(iframeLeft) || 0);
	const guard = Number(edgeGuardPx) || 0;
	const edgeTolerance = Math.max(1, Math.min(4, Math.round(guard || 1)));
	const hasStructuralEdgeGuard = guard > 0;
	const canExpandClippedRawRight = (Number(iframeLeft) || 0) < 0 ||
		hasStructuralEdgeGuard ||
		!!limits.allowRawRightMask;

	return {
		rawLeft,
		rawRight,
		leftMaxMask: leftLimit,
		rightMaxMask: rightLimit,
		left: Math.max(0, Math.min(Number(widths && widths.left) || 0, leftLimit)),
		right: Math.max(0, Math.min(Number(widths && widths.right) || 0, rightLimit)),
		nextPageStep: Number(limits.nextPageStep !== undefined ? limits.nextPageStep : defaultNextPageStep) || 0,
		previousPageStep: Number(limits.previousPageStep) || 0,
		forceRawLeftMask: !!limits.forceRawLeftMask,
		allowRawLeftMask: !!limits.allowRawLeftMask,
		edgeTolerance,
		hasStructuralEdgeGuard,
		canExpandClippedRawRight,
		rightPaintGuardMax: Math.min(maskLimit, Math.max(rightLimit, edgeTolerance))
	};
}

export function getVerticalRlSnappedRightEdgeMask(
	right: number,
	shift: number,
	maxMask: number,
	rightMaxMask: number,
	requiredRawRightMask: number,
	rightPaintGuardMax: number,
	expandBeyondPaintGuard: boolean
): number {
	const currentRight = Math.max(0, Number(right) || 0);
	const maskLimit = Math.max(0, Number(maxMask) || 0);
	const delta = Number(shift) || 0;

	if (!delta) {
		return currentRight;
	}

	const maxAllowedRight = delta > 0
		? (expandBeyondPaintGuard ? maskLimit : Math.max(0, Number(rightPaintGuardMax) || 0))
		: Math.max(
			Math.max(0, Number(rightMaxMask) || 0),
			Math.max(0, Number(requiredRawRightMask) || 0),
			currentRight + delta
		);

	return Math.max(0, Math.min(maxAllowedRight, currentRight + delta));
}

export function getVerticalRlSnappedLeftEdgeMask(
	left: number,
	shift: number,
	leftMaxMask: number
): number {
	const currentLeft = Math.max(0, Number(left) || 0);
	const delta = Number(shift) || 0;

	if (!delta) {
		return currentLeft;
	}

	return Math.max(
		0,
		Math.min(Math.max(0, Number(leftMaxMask) || 0), currentLeft + delta)
	);
}

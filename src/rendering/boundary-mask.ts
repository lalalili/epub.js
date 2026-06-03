import {
	getVerticalRlEdgeMaskLimit
} from "./edge-mask";

export type VerticalRlClientRect = {
	left: number;
	right: number;
	top?: number;
	bottom?: number;
	width?: number;
	height?: number;
};

export type VerticalRlBoundarySnap = {
	delta: number;
	distance: number;
	initialCrossings?: number;
	score: number;
	model?: string;
};

export type VerticalRlBoundarySnapModels = {
	rightOriginSnap: VerticalRlBoundarySnap;
	leftOriginSnap: VerticalRlBoundarySnap;
};

export type VerticalRlBoundarySnapCacheEntry = {
	key: string;
	value: number;
};

export type VerticalRlBoundarySnapCacheLookup = {
	cacheKey: string;
	cachedSnap: number | null;
};

export type VerticalRlBoundarySnapResult = {
	cacheEntry: VerticalRlBoundarySnapCacheEntry | null;
	snapped: number;
};

export type VerticalRlBoundaryConstrainedOffset = {
	logicalOffset: number;
	preferredRightBoundary: number;
};

export type VerticalRlBoundaryRightBoundaryLimits = {
	maxRightBoundary: number;
	hasMaxRightBoundary: boolean;
	preferredRightBoundary: number;
	hasPreferredRightBoundary: boolean;
};

export type VerticalRlBoundaryMaxRightBoundaryLimitOptions = {
	hasMaxRightBoundary: boolean;
	maxRightBoundary: number;
};

export type VerticalRlBoundaryRightBoundaryLimitOptions = VerticalRlBoundaryMaxRightBoundaryLimitOptions & {
	hasPreferredRightBoundary: boolean;
	preferredRightBoundary: number;
};

export type VerticalRlBoundarySnapEdgeGuards = {
	edgeGuard: number;
	rawEdgeGuard: number;
};

export type VerticalRlBoundarySnapDeltaInputs = {
	edgeGuard: number;
	edgeGuardPx: number;
	structuralMasks: {
		left: number;
		right: number;
	};
	boundaryShift: number;
	structuralBleed: number;
};

export type VerticalRlBoundarySnapMeasurementInputs = {
	rects: VerticalRlClientRect[];
	deltaInputs: VerticalRlBoundarySnapDeltaInputs;
};

export type VerticalRlBoundarySnapReadiness = {
	iframe?: HTMLIFrameElement | null;
	document?: Document | null;
	window?: Window | null;
	body?: HTMLElement | null;
	contentWidth?: number;
	visibleWidth?: number;
};

export type VerticalRlBoundarySnapPreflight = {
	cacheLookup: VerticalRlBoundarySnapCacheLookup | null;
	logicalOffset: number;
	maxRightBoundaryOptions: VerticalRlBoundaryMaxRightBoundaryLimitOptions;
	rightBoundaryLimits: VerticalRlBoundaryRightBoundaryLimits;
	rightBoundaryOptions: VerticalRlBoundaryRightBoundaryLimitOptions;
	shouldMeasureText: boolean;
};

export function getVerticalRlCurrentEffectiveLeftBoundary(
	contentWidth: number,
	currentOffset: number,
	visibleWidth: number,
	currentLeftMask: number
): number | null {
	const effectiveLeftBoundary = (
		Number(contentWidth) -
		Number(currentOffset) -
		Number(visibleWidth) +
		(Number(currentLeftMask) || 0)
	);

	return Number.isFinite(effectiveLeftBoundary) && effectiveLeftBoundary > 0
		? effectiveLeftBoundary
		: null;
}

export function getVerticalRlSequentialRightBoundaryConstraint(
	pageIndex: number,
	forcedRightBoundary: number,
	contentWidth: number,
	currentOffset: number,
	currentGridOffset: number,
	visibleWidth: number,
	pageAdvance: number,
	currentLeftMask: number
): { pageIndex: number; maxRightBoundary: number; preferredRightBoundary: number } | null {
	const forcedBoundary = Number(forcedRightBoundary);
	const targetPageIndex = Number(pageIndex) || 0;

	if (Number.isFinite(forcedBoundary) && forcedBoundary > 0) {
		return {
			pageIndex: targetPageIndex,
			maxRightBoundary: forcedBoundary,
			preferredRightBoundary: forcedBoundary
		};
	}

	const visible = Number(visibleWidth) || 0;
	const advance = Number(pageAdvance) || 0;
	const leftMask = Number(currentLeftMask) || 0;
	const hasCleanPageLeftMask = leftMask > 0 && Math.max(0, visible - advance) <= 1;
	const maxRightBoundary = getVerticalRlCurrentEffectiveLeftBoundary(
		contentWidth,
		currentOffset,
		visible,
		leftMask
	);

	if (
		maxRightBoundary !== null &&
		(Math.abs((Number(currentOffset) || 0) - (Number(currentGridOffset) || 0)) > 1 || hasCleanPageLeftMask)
	) {
		return {
			pageIndex: targetPageIndex,
			maxRightBoundary,
			preferredRightBoundary: maxRightBoundary
		};
	}

	return null;
}

export function isVerticalRlBoundarySnapTextReady(
	options: VerticalRlBoundarySnapReadiness = {}
): boolean {
	return !!(
		options.iframe &&
		options.document &&
		options.window &&
		options.body &&
		options.contentWidth &&
		options.visibleWidth &&
		typeof options.document.createTreeWalker === "function"
	);
}

export function getVerticalRlBoundaryRightBoundaryLimits(
	options: {
		maxRightBoundary?: number;
		preferredRightBoundary?: number;
	} = {}
): VerticalRlBoundaryRightBoundaryLimits {
	const maxRightBoundary = Number(options && options.maxRightBoundary);
	const preferredRightBoundary = Number(options && options.preferredRightBoundary);

	return {
		maxRightBoundary,
		hasMaxRightBoundary: Number.isFinite(maxRightBoundary),
		preferredRightBoundary,
		hasPreferredRightBoundary: Number.isFinite(preferredRightBoundary)
	};
}

export function getVerticalRlBoundaryMaxRightBoundaryLimitOptions(
	limits: VerticalRlBoundaryRightBoundaryLimits
): VerticalRlBoundaryMaxRightBoundaryLimitOptions {
	return {
		hasMaxRightBoundary: limits.hasMaxRightBoundary,
		maxRightBoundary: limits.maxRightBoundary
	};
}

export function getVerticalRlBoundaryRightBoundaryLimitOptions(
	limits: VerticalRlBoundaryRightBoundaryLimits
): VerticalRlBoundaryRightBoundaryLimitOptions {
	return {
		...getVerticalRlBoundaryMaxRightBoundaryLimitOptions(limits),
		hasPreferredRightBoundary: limits.hasPreferredRightBoundary,
		preferredRightBoundary: limits.preferredRightBoundary
	};
}

export function getCachedVerticalRlBoundarySnap(
	cache: VerticalRlBoundarySnapCacheEntry | null | undefined,
	key: string
): number | null {
	return cache && cache.key === key
		? cache.value
		: null;
}

export function getVerticalRlBoundarySnapCacheEntry(
	key: string,
	value: number,
	nearestDelta: number | null | undefined
): VerticalRlBoundarySnapCacheEntry | null {
	return nearestDelta
		? { key, value }
		: null;
}

export function getVerticalRlBoundaryConstrainedOffset(
	logicalOffset: number,
	maxScroll: number,
	contentWidth: number,
	options: {
		hasPreferredRightBoundary?: boolean;
		preferredRightBoundary?: number;
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {}
): VerticalRlBoundaryConstrainedOffset {
	const scrollMax = Number(maxScroll) || 0;
	const content = Number(contentWidth) || 0;
	let offset = Number(logicalOffset) || 0;
	let preferredRightBoundary = Number(options.preferredRightBoundary);
	const maxRightBoundary = Number(options.maxRightBoundary);

	if (options.hasPreferredRightBoundary) {
		let targetRightBoundary = Math.max(0, preferredRightBoundary);
		if (options.hasMaxRightBoundary) {
			targetRightBoundary = Math.min(targetRightBoundary, maxRightBoundary);
		}
		preferredRightBoundary = targetRightBoundary;
		offset = Math.max(0, Math.min(scrollMax, content - targetRightBoundary));
	}
	if (options.hasMaxRightBoundary) {
		offset = Math.max(offset, Math.max(0, Math.min(scrollMax, content - maxRightBoundary)));
	}

	return {
		logicalOffset: offset,
		preferredRightBoundary
	};
}

export function getVerticalRlBoundarySnapCacheKey(
	logicalOffset: number,
	maxScroll: number,
	contentWidth: number,
	visibleWidth: number,
	edgeGuardPx: number,
	options: {
		hasPreferredRightBoundary?: boolean;
		preferredRightBoundary?: number;
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {}
): string {
	const round = (value: number): number => Math.round((Number(value) || 0) * 100) / 100;

	return [
		round(logicalOffset),
		round(maxScroll),
		round(contentWidth),
		round(visibleWidth),
		Number(edgeGuardPx) || 0,
		options.hasMaxRightBoundary
			? round(Number(options.maxRightBoundary))
			: "none",
		options.hasPreferredRightBoundary
			? round(Number(options.preferredRightBoundary))
			: "none"
	].join(":");
}

export function getVerticalRlBoundarySnapCacheLookup(
	cache: VerticalRlBoundarySnapCacheEntry | null | undefined,
	logicalOffset: number,
	maxScroll: number,
	contentWidth: number,
	visibleWidth: number,
	edgeGuardPx: number,
	options: {
		hasPreferredRightBoundary?: boolean;
		preferredRightBoundary?: number;
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {}
): VerticalRlBoundarySnapCacheLookup {
	const cacheKey = getVerticalRlBoundarySnapCacheKey(
		logicalOffset,
		maxScroll,
		contentWidth,
		visibleWidth,
		edgeGuardPx,
		options
	);

	return {
		cacheKey,
		cachedSnap: getCachedVerticalRlBoundarySnap(cache, cacheKey)
	};
}

export function getVerticalRlBoundarySnapPreflight(
	cache: VerticalRlBoundarySnapCacheEntry | null | undefined,
	logicalOffset: number,
	maxScroll: number,
	contentWidth: number,
	visibleWidth: number,
	edgeGuardPx: number,
	limitOptions: {
		maxRightBoundary?: number;
		preferredRightBoundary?: number;
	} = {},
	readiness: Omit<VerticalRlBoundarySnapReadiness, "contentWidth" | "visibleWidth"> = {}
): VerticalRlBoundarySnapPreflight {
	const rightBoundaryLimits = getVerticalRlBoundaryRightBoundaryLimits(limitOptions);
	const constrainedOffset = getVerticalRlBoundaryConstrainedOffset(
		logicalOffset,
		maxScroll,
		contentWidth,
		getVerticalRlBoundaryRightBoundaryLimitOptions(rightBoundaryLimits)
	);
	rightBoundaryLimits.preferredRightBoundary = constrainedOffset.preferredRightBoundary;

	const rightBoundaryOptions = getVerticalRlBoundaryRightBoundaryLimitOptions(rightBoundaryLimits);
	const maxRightBoundaryOptions = getVerticalRlBoundaryMaxRightBoundaryLimitOptions(rightBoundaryLimits);
	const shouldMeasureText = isVerticalRlBoundarySnapTextReady({
		...readiness,
		contentWidth,
		visibleWidth
	});
	const cacheLookup = shouldMeasureText
		? getVerticalRlBoundarySnapCacheLookup(
			cache,
			constrainedOffset.logicalOffset,
			maxScroll,
			contentWidth,
			visibleWidth,
			edgeGuardPx,
			rightBoundaryOptions
		)
		: null;

	return {
		cacheLookup,
		logicalOffset: constrainedOffset.logicalOffset,
		maxRightBoundaryOptions,
		rightBoundaryLimits,
		rightBoundaryOptions,
		shouldMeasureText
	};
}

export function getVerticalRlBoundarySnapViewportBounds(
	logicalOffset: number,
	contentWidth: number,
	visibleWidth: number
): VerticalRlClientRect[] {
	const offset = Number(logicalOffset) || 0;
	const content = Number(contentWidth) || 0;
	const visible = Number(visibleWidth) || 0;
	const rightOriginRight = content - offset;
	const rightOriginLeft = rightOriginRight - visible;
	const leftOriginLeft = offset;
	const leftOriginRight = offset + visible;

	return [
		{
			left: rightOriginLeft,
			right: rightOriginRight
		},
		{
			left: leftOriginLeft,
			right: leftOriginRight
		}
	];
}

export function getVerticalRlBoundarySnapEdgeGuard(edgeGuardPx: number): number {
	return Math.max(1, Math.min(8, Math.round((Number(edgeGuardPx) || 2))));
}

export function getVerticalRlBoundarySnapRawEdgeGuard(edgeGuardPx: number): number {
	return Number(edgeGuardPx) || 0;
}

export function getVerticalRlBoundarySnapEdgeGuards(edgeGuardPx: number): VerticalRlBoundarySnapEdgeGuards {
	return {
		edgeGuard: getVerticalRlBoundarySnapEdgeGuard(edgeGuardPx),
		rawEdgeGuard: getVerticalRlBoundarySnapRawEdgeGuard(edgeGuardPx)
	};
}

export function getVerticalRlBoundarySnapStructuralBleed(
	visibleWidth: number,
	pageAdvance: number
): number {
	const visible = Number(visibleWidth) || 0;
	const advance = Number(pageAdvance) || visible;

	return visible - advance;
}

export function getVerticalRlBoundarySnapStructuralMasks(
	widths: { left?: number; right?: number } | null | undefined
): { left: number; right: number } {
	return {
		left: Number(widths && widths.left) || 0,
		right: Number(widths && widths.right) || 0
	};
}

export function getVerticalRlBoundarySnapDeltaInputs(
	edgeGuardPx: number,
	structuralGutterMask: { left?: number; right?: number } | null | undefined,
	visibleWidth: number,
	pageAdvance: number,
	boundaryShift: number
): VerticalRlBoundarySnapDeltaInputs {
	const edgeGuards = getVerticalRlBoundarySnapEdgeGuards(edgeGuardPx);

	return {
		edgeGuard: edgeGuards.edgeGuard,
		edgeGuardPx: edgeGuards.rawEdgeGuard,
		structuralMasks: getVerticalRlBoundarySnapStructuralMasks(structuralGutterMask),
		boundaryShift,
		structuralBleed: getVerticalRlBoundarySnapStructuralBleed(visibleWidth, pageAdvance)
	};
}

export function getVerticalRlCleanPageEdgeMaskInput(
	pageAdvance: number,
	totalPages: number,
	currentPageIndex: number,
	currentOffset: number,
	previousOffset: number,
	actualCurrentOffset: number,
	currentGridOffset: number,
	sequentialBoundaryPageIndex?: number | null
): {
	widths: { left: number; right: number };
	maxMask: number;
	nextPageStep: number;
	previousPageStep: number;
	rightMaxMask: number;
	allowRawRightMask: boolean;
	allowRawLeftMask: boolean;
	forceRawLeftMask: boolean;
} | null {
	const advance = Number(pageAdvance) || 0;
	const total = Number(totalPages) || 0;
	const pageIndex = Number(currentPageIndex) || 0;
	const maxMask = getVerticalRlEdgeMaskLimit(advance);

	if (!advance || total <= 1 || pageIndex <= 0 || !maxMask) {
		return null;
	}

	const previousPageStep = Math.abs(
		(Number(currentOffset) || 0) - (Number(previousOffset) || 0)
	) || advance;
	const isSequentialBoundaryPage = (
		Number.isFinite(Number(sequentialBoundaryPageIndex)) &&
		Number(sequentialBoundaryPageIndex) === pageIndex
	);
	const forceRawLeftMask = isSequentialBoundaryPage || Math.abs(
		(Number(actualCurrentOffset) || 0) - (Number(currentGridOffset) || 0)
	) > 1;

	return {
		widths: {
			left: 0,
			right: 0
		},
		maxMask,
		nextPageStep: previousPageStep,
		previousPageStep,
		rightMaxMask: maxMask,
		allowRawRightMask: true,
		allowRawLeftMask: pageIndex === total - 2,
		forceRawLeftMask
	};
}

export function getPreviousVerticalRlLeftMaskInput(
	previousPageStep: number,
	left: number,
	maxMask: number,
	containerLeft: number,
	containerRight: number,
	iframeLeft: number
): {
	widths: { left: number; right: number };
	maxMask: number;
	rawLeft: number;
	rawRight: number;
	nextPageStep: number;
	rightMaxMask: number;
} | null {
	const previousStep = Number(previousPageStep) || 0;
	const maskLimit = Math.max(0, Number(maxMask) || 0);

	if (!previousStep || !maskLimit) {
		return null;
	}

	const rawLeft = (Number(containerLeft) || 0) - (Number(iframeLeft) || 0) + previousStep;
	const rawRight = (Number(containerRight) || 0) - (Number(iframeLeft) || 0) + previousStep;

	return {
		widths: {
			left: Math.min(Number(left) || 0, maskLimit),
			right: 0
		},
		maxMask: maskLimit,
		rawLeft,
		rawRight,
		nextPageStep: previousStep,
		rightMaxMask: 0
	};
}

export function getVerticalRlStructuralEdgeMaskInput(
	logicalOffset: number,
	contentWidth: number,
	visibleWidth: number,
	pageAdvance: number
): {
	widths: { left: number; right: number };
	maxMask: number;
	rawLeft: number;
	rawRight: number;
	nextPageStep: number;
	rightMaxMask: number;
} | null {
	const advance = Number(pageAdvance) || 0;
	const content = Number(contentWidth) || 0;
	const visible = Number(visibleWidth) || 0;
	const offset = Number(logicalOffset) || 0;
	const bleed = visible - advance;

	if (!advance || !content || !visible || bleed <= 1) {
		return null;
	}

	const rawRight = content - offset;
	const rawLeft = rawRight - visible;
	const maxMask = getVerticalRlEdgeMaskLimit(advance);

	return {
		widths: {
			left: Math.min(Math.ceil(bleed), maxMask),
			right: 0
		},
		maxMask,
		rawLeft,
		rawRight,
		nextPageStep: advance,
		rightMaxMask: 0
	};
}

export function getVerticalRlRectDistanceToLogicalViewport(
	left: number,
	right: number,
	rawLeft: number,
	rawRight: number
): number {
	if (right < rawLeft) {
		return rawLeft - right;
	}

	if (left > rawRight) {
		return left - rawRight;
	}

	return 0;
}

export function getVerticalRlViewportRectCoordinates(
	rectLeft: number,
	rectRight: number,
	shiftedLeft: number,
	shiftedRight: number,
	rawLeft: number,
	rawRight: number,
	iframeLeft: number,
	tolerance = 0.5
): { left: number; right: number } {
	const directLeft = Number(rectLeft) || 0;
	const directRight = Number(rectRight) || 0;
	const embeddedLeft = Number(shiftedLeft) || 0;
	const embeddedRight = Number(shiftedRight) || 0;

	if ((Number(iframeLeft) || 0) >= 0) {
		return {
			left: directLeft,
			right: directRight
		};
	}

	const directDistance = getVerticalRlRectDistanceToLogicalViewport(directLeft, directRight, rawLeft, rawRight);
	const shiftedDistance = getVerticalRlRectDistanceToLogicalViewport(embeddedLeft, embeddedRight, rawLeft, rawRight);

	if (shiftedDistance + (Number(tolerance) || 0) < directDistance) {
		return {
			left: embeddedLeft,
			right: embeddedRight
		};
	}

	return {
		left: directLeft,
		right: directRight
	};
}

export function getVerticalRlViewportRect(
	rect: VerticalRlClientRect,
	rawLeft: number,
	rawRight: number,
	iframeLeft: number,
	tolerance = 0.5
): VerticalRlClientRect {
	const rectLeft = Number(rect && rect.left) || 0;
	const rectRight = Number(rect && rect.right) || 0;
	const rectCoordinates = getVerticalRlViewportRectCoordinates(
		rectLeft,
		rectRight,
		rectLeft - (Number(iframeLeft) || 0),
		rectRight - (Number(iframeLeft) || 0),
		rawLeft,
		rawRight,
		iframeLeft,
		tolerance
	);

	return {
		...rect,
		left: rectCoordinates.left,
		right: rectCoordinates.right
	};
}

export function getVerticalRlViewportRects(
	rects: VerticalRlClientRect[],
	rawLeft: number,
	rawRight: number,
	iframeLeft: number,
	tolerance = 0.5
): VerticalRlClientRect[] {
	return (rects || []).map((rect) => getVerticalRlViewportRect(
		rect,
		rawLeft,
		rawRight,
		iframeLeft,
		tolerance
	));
}

export function getVerticalRlClosestViewportRectCoordinates(
	rectLeft: number,
	rectRight: number,
	shiftedLeft: number,
	shiftedRight: number,
	viewports: Array<{ left: number; right: number }>,
	tolerance = 0.5
): { left: number; right: number } {
	const directLeft = Number(rectLeft) || 0;
	const directRight = Number(rectRight) || 0;
	const embeddedLeft = Number(shiftedLeft) || 0;
	const embeddedRight = Number(shiftedRight) || 0;
	const viewportInputs = Array.isArray(viewports) ? viewports : [];
	const normalizedViewports = viewportInputs
		.map((viewport) => ({
			left: Number(viewport && viewport.left),
			right: Number(viewport && viewport.right)
		}))
		.filter((viewport) => (
			Number.isFinite(viewport.left) &&
			Number.isFinite(viewport.right) &&
			viewport.right >= viewport.left
		));

	if (!normalizedViewports.length) {
		return {
			left: directLeft,
			right: directRight
		};
	}

	const directDistance = Math.min(
		...normalizedViewports.map((viewport) => getVerticalRlRectDistanceToLogicalViewport(
			directLeft,
			directRight,
			viewport.left,
			viewport.right
		))
	);
	const shiftedDistance = Math.min(
		...normalizedViewports.map((viewport) => getVerticalRlRectDistanceToLogicalViewport(
			embeddedLeft,
			embeddedRight,
			viewport.left,
			viewport.right
		))
	);

	if (shiftedDistance + (Number(tolerance) || 0) < directDistance) {
		return {
			left: embeddedLeft,
			right: embeddedRight
		};
	}

	return {
		left: directLeft,
		right: directRight
	};
}

export function getVerticalRlClosestViewportRect(
	rect: VerticalRlClientRect,
	iframeLeft: number,
	viewports: Array<{ left: number; right: number }>,
	tolerance = 0.5
): VerticalRlClientRect {
	const rectLeft = Number(rect && rect.left) || 0;
	const rectRight = Number(rect && rect.right) || 0;
	const rectCoordinates = getVerticalRlClosestViewportRectCoordinates(
		rectLeft,
		rectRight,
		rectLeft - (Number(iframeLeft) || 0),
		rectRight - (Number(iframeLeft) || 0),
		viewports,
		tolerance
	);

	return {
		...rect,
		left: rectCoordinates.left,
		right: rectCoordinates.right
	};
}

export function getVerticalRlClosestViewportRects(
	rects: VerticalRlClientRect[],
	iframeLeft: number,
	viewports: Array<{ left: number; right: number }>,
	tolerance = 0.5
): VerticalRlClientRect[] {
	return (rects || []).map((rect) => getVerticalRlClosestViewportRect(
		rect,
		iframeLeft,
		viewports,
		tolerance
	));
}

export function getVerticalRlBoundarySnapCandidateRects(
	rects: VerticalRlClientRect[],
	iframeLeft: number,
	logicalOffset: number,
	contentWidth: number,
	visibleWidth: number,
	tolerance = 0.5
): VerticalRlClientRect[] {
	return getVerticalRlClosestViewportRects(
		rects,
		iframeLeft,
		getVerticalRlBoundarySnapViewportBounds(logicalOffset, contentWidth, visibleWidth),
		tolerance
	);
}

export function getVerticalRlBoundarySnapMeasurementInputs(
	rects: VerticalRlClientRect[],
	iframeLeft: number,
	logicalOffset: number,
	contentWidth: number,
	visibleWidth: number,
	edgeGuardPx: number,
	structuralGutterMask: { left?: number; right?: number } | null | undefined,
	pageAdvance: number,
	boundaryShift: number,
	tolerance = 0.5
): VerticalRlBoundarySnapMeasurementInputs {
	return {
		rects: getVerticalRlBoundarySnapCandidateRects(
			rects,
			iframeLeft,
			logicalOffset,
			contentWidth,
			visibleWidth,
			tolerance
		),
		deltaInputs: getVerticalRlBoundarySnapDeltaInputs(
			edgeGuardPx,
			structuralGutterMask,
			visibleWidth,
			pageAdvance,
			boundaryShift
		)
	};
}

export function countVerticalRlBoundaryCrossings(
	rects: Array<{ left: number; right: number }>,
	leftBoundary: number,
	rightBoundary: number
): number {
	let count = 0;

	for (const rect of rects || []) {
		if (
			(rect.left < leftBoundary && rect.right > leftBoundary) ||
			(rect.left < rightBoundary && rect.right > rightBoundary)
		) {
			count += 1;
		}
	}

	return count;
}

export function evaluateVerticalRlBoundaryModel(
	rects: Array<{ left: number; right: number }>,
	leftBoundary: number,
	rightBoundary: number,
	boundaryOffsetDirection: number,
	logicalOffset: number,
	maxScroll: number,
	edgeGuard: number,
	options: {
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
		contentWidth?: number;
	} = {}
): VerticalRlBoundarySnap {
	let candidates: number[] = [];
	let roundDelta = (delta: number): number => delta < 0 ? Math.floor(delta) : Math.ceil(delta);
	let addBoundaryCandidates = (boundary: number): void => {
		let straddlers = (rects || []).filter((rect) => rect.left < boundary && rect.right > boundary);
		if (!straddlers.length) {
			return;
		}

		let minLeft = Math.min(...straddlers.map((rect) => rect.left));
		let maxRight = Math.max(...straddlers.map((rect) => rect.right));

		candidates.push(roundDelta(((minLeft - edgeGuard) - boundary) / boundaryOffsetDirection));
		candidates.push(roundDelta(((maxRight + edgeGuard) - boundary) / boundaryOffsetDirection));
	};
	let initialCrossings = countVerticalRlBoundaryCrossings(rects, leftBoundary, rightBoundary);
	let best: VerticalRlBoundarySnap | null = null;

	if (initialCrossings > 0) {
		addBoundaryCandidates(leftBoundary);
		addBoundaryCandidates(rightBoundary);

		let uniqueCandidates = Array.from(new Set(candidates.filter((delta) => Number.isFinite(delta) && delta !== 0)));
		for (const delta of uniqueCandidates) {
			let snappedOffset = Math.max(0, Math.min(maxScroll, logicalOffset + delta));
			let clampedDelta = snappedOffset - logicalOffset;
			if (!clampedDelta) {
				continue;
			}
			if (
				options.hasMaxRightBoundary &&
				boundaryOffsetDirection < 0 &&
				(Number(options.contentWidth) || 0) - snappedOffset > (Number(options.maxRightBoundary) || 0) + 1
			) {
				continue;
			}

			let shiftedDelta = boundaryOffsetDirection * clampedDelta;
			let score = countVerticalRlBoundaryCrossings(
				rects,
				leftBoundary + shiftedDelta,
				rightBoundary + shiftedDelta
			);
			let distance = Math.abs(clampedDelta);
			if (
				!best ||
				score < best.score ||
				(score === best.score && distance < best.distance)
			) {
				best = { delta: clampedDelta, distance, score };
			}
		}
	}

	if (best && best.score < initialCrossings) {
		return {
			delta: best.delta,
			distance: best.distance,
			initialCrossings,
			score: best.score
		};
	}

	return {
		delta: 0,
		distance: 0,
		initialCrossings,
		score: initialCrossings
	};
}

export function getBestVerticalRlBoundarySnap(
	snaps: VerticalRlBoundarySnap[]
): VerticalRlBoundarySnap | null {
	let candidates = (snaps || []).filter((snap) => snap && snap.delta);

	return candidates.sort(function(a, b) {
		if (a.score !== b.score) {
			return a.score - b.score;
		}
		if (a.model !== b.model) {
			return a.model === "right-origin" ? -1 : 1;
		}

		return a.distance - b.distance;
	})[0] || null;
}

export function getVerticalRlBoundarySnapModels(
	rects: Array<{ left: number; right: number }>,
	logicalOffset: number,
	contentWidth: number,
	visibleWidth: number,
	maxScroll: number,
	edgeGuard: number,
	structuralLeftMask: number,
	structuralRightMask: number,
	options: {
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {}
): VerticalRlBoundarySnapModels {
	const offset = Number(logicalOffset) || 0;
	const content = Number(contentWidth) || 0;
	const visible = Number(visibleWidth) || 0;
	const leftMask = Number(structuralLeftMask) || 0;
	const rightMask = Number(structuralRightMask) || 0;
	const rightOriginRawRight = content - offset;
	const rightOriginRawLeft = rightOriginRawRight - visible;
	let rightOriginSnap = evaluateVerticalRlBoundaryModel(
		rects,
		rightOriginRawLeft + leftMask,
		rightOriginRawRight - rightMask,
		-1,
		offset,
		maxScroll,
		edgeGuard,
		{
			hasMaxRightBoundary: options.hasMaxRightBoundary,
			maxRightBoundary: options.maxRightBoundary,
			contentWidth: content
		}
	);
	rightOriginSnap.model = "right-origin";
	let leftOriginSnap = evaluateVerticalRlBoundaryModel(
		rects,
		offset + leftMask,
		offset + visible - rightMask,
		1,
		offset,
		maxScroll,
		edgeGuard,
		{
			hasMaxRightBoundary: options.hasMaxRightBoundary,
			maxRightBoundary: options.maxRightBoundary,
			contentWidth: content
		}
	);
	leftOriginSnap.model = "left-origin";

	return {
		rightOriginSnap,
		leftOriginSnap
	};
}

export function getVerticalRlBoundaryShiftAdjustedDelta(
	nearestDelta: number,
	boundaryShift: number,
	edgeGuardPx: number,
	structuralBleed: number
): number {
	const delta = Number(nearestDelta) || 0;
	const shift = Number(boundaryShift) || 0;
	const guard = Number(edgeGuardPx) || 0;
	const bleed = Number(structuralBleed) || 0;

	if (
		delta > 0 &&
		shift > 0 &&
		guard > 0 &&
		bleed > 1 &&
		Math.abs(shift - guard) <= 1
	) {
		return Math.min(delta, Math.max(1, Math.floor(guard / 2)));
	}

	return delta;
}

export function getVerticalRlBoundarySnapDelta(
	rects: Array<{ left: number; right: number }>,
	logicalOffset: number,
	contentWidth: number,
	visibleWidth: number,
	maxScroll: number,
	edgeGuard: number,
	structuralLeftMask: number,
	structuralRightMask: number,
	boundaryShift: number,
	boundaryShiftEdgeGuardPx: number,
	structuralBleed: number,
	options: {
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {}
): number {
	const models = getVerticalRlBoundarySnapModels(
		rects,
		logicalOffset,
		contentWidth,
		visibleWidth,
		maxScroll,
		edgeGuard,
		structuralLeftMask,
		structuralRightMask,
		options
	);
	const bestSnap = getBestVerticalRlBoundarySnap([
		models.rightOriginSnap,
		models.leftOriginSnap
	]);
	const nearestDelta = bestSnap ? bestSnap.delta : 0;

	return getVerticalRlBoundaryShiftAdjustedDelta(
		nearestDelta,
		boundaryShift,
		boundaryShiftEdgeGuardPx,
		structuralBleed
	);
}

export function getVerticalRlBoundarySnappedOffset(
	nearestDelta: number,
	logicalOffset: number,
	maxScroll: number,
	contentWidth: number,
	options: {
		hasPreferredRightBoundary?: boolean;
		preferredRightBoundary?: number;
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {}
): number {
	const offset = Number(logicalOffset) || 0;
	const scrollMax = Number(maxScroll) || 0;
	const content = Number(contentWidth) || 0;
	const delta = Number(nearestDelta) || 0;
	let snapped = delta
		? Math.max(0, Math.min(scrollMax, offset + delta))
		: offset;

	if (options.hasPreferredRightBoundary) {
		let preferredRightBoundary = Number(options.preferredRightBoundary) || 0;
		let snappedRawRight = content - snapped;
		if (snappedRawRight < preferredRightBoundary - 1) {
			snapped = Math.min(
				snapped,
				Math.max(0, Math.min(scrollMax, content - preferredRightBoundary))
			);
		}
	}
	if (options.hasMaxRightBoundary) {
		let maxRightBoundary = Number(options.maxRightBoundary) || 0;
		let snappedRawRight = content - snapped;
		if (snappedRawRight > maxRightBoundary + 1) {
			snapped = Math.max(
				snapped,
				Math.max(0, Math.min(scrollMax, content - maxRightBoundary))
			);
		}
	}

	return snapped;
}

export function getVerticalRlBoundarySnapResult(
	cacheKey: string,
	nearestDelta: number,
	logicalOffset: number,
	maxScroll: number,
	contentWidth: number,
	options: {
		hasPreferredRightBoundary?: boolean;
		preferredRightBoundary?: number;
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {}
): VerticalRlBoundarySnapResult {
	const snapped = getVerticalRlBoundarySnappedOffset(
		nearestDelta,
		logicalOffset,
		maxScroll,
		contentWidth,
		options
	);

	return {
		cacheEntry: getVerticalRlBoundarySnapCacheEntry(cacheKey, snapped, nearestDelta),
		snapped
	};
}

export function getVerticalRlBoundarySnapPipelineResult(
	cacheKey: string,
	measurementInputs: VerticalRlBoundarySnapMeasurementInputs,
	logicalOffset: number,
	contentWidth: number,
	visibleWidth: number,
	maxScroll: number,
	maxRightBoundaryOptions: {
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {},
	rightBoundaryOptions: {
		hasPreferredRightBoundary?: boolean;
		preferredRightBoundary?: number;
		hasMaxRightBoundary?: boolean;
		maxRightBoundary?: number;
	} = {}
): VerticalRlBoundarySnapResult {
	const nearestDelta = getVerticalRlBoundarySnapDelta(
		measurementInputs.rects,
		logicalOffset,
		contentWidth,
		visibleWidth,
		maxScroll,
		measurementInputs.deltaInputs.edgeGuard,
		measurementInputs.deltaInputs.structuralMasks.left,
		measurementInputs.deltaInputs.structuralMasks.right,
		measurementInputs.deltaInputs.boundaryShift,
		measurementInputs.deltaInputs.edgeGuardPx,
		measurementInputs.deltaInputs.structuralBleed,
		maxRightBoundaryOptions
	);

	return getVerticalRlBoundarySnapResult(
		cacheKey,
		nearestDelta,
		logicalOffset,
		maxScroll,
		contentWidth,
		rightBoundaryOptions
	);
}

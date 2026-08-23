export function getVerticalRlLogicalPageStepToNextPage(
	pageAdvance: number,
	totalPages: number,
	currentPageIndex: number,
	nextPageIndex: number,
	currentOffset: number,
	nextOffset: number,
	hasStructuralPageGutter: boolean
): number {
	const advance = Number(pageAdvance) || 0;
	const total = Number(totalPages) || 0;
	const nextIndex = Number(nextPageIndex) || 0;
	const step = Math.abs((Number(nextOffset) || 0) - (Number(currentOffset) || 0));

	if (
		nextIndex === total - 1 &&
		step > advance &&
		hasStructuralPageGutter
	) {
		return advance;
	}

	return step > 0 ? step : advance;
}

export type VerticalRlTerminalCoveragePolicy =
	| "current-exact-sequential"
	| "sequential-max-only"
	| "max-scroll"
	| "dynamic-terminal-continuation";

export type VerticalRlTerminalCoverageRect = {
	left: number;
	right: number;
	structureHash?: string;
};

export type VerticalRlTerminalCoveragePolicyResult = {
	policy: VerticalRlTerminalCoveragePolicy;
	offsets: number[];
	viewports: Array<{ left: number; right: number }>;
	newlyCoveredSemanticRects: string[];
	duplicateSemanticRects: string[];
	uncoveredSemanticRects: string[];
	gapIntervals: Array<{ left: number; right: number }>;
	semanticGapIntervals: Array<{ left: number; right: number }>;
	overlapIntervals: Array<{ left: number; right: number }>;
	pageCountDelta: number;
	targetMarkerVisibility: "fully-visible" | "partially-clipped" | "fully-outside" | "unsupported";
	previousToTerminalCoverageContinuity: boolean;
	usedUnconditionalMaxScroll: boolean;
};

export type VerticalRlTerminalCoveragePolicyInput = {
	semanticRects: VerticalRlTerminalCoverageRect[];
	contentWidth: number;
	visibleWidth: number;
	pageAdvance: number;
	currentOffset: number;
	maxScroll: number;
	previousOffsets?: number[];
	preferredOffset?: number;
	maxRightBoundary?: number;
	markerStructureHash?: string;
	sequentialPageStep?: number;
	maxContinuationPages?: number;
	tolerance?: number;
};

export function getVerticalRlRawViewportForOffset(
	logicalOffset: number,
	contentWidth: number,
	visibleWidth: number
): { left: number; right: number } {
	let content = Math.max(0, Number(contentWidth) || 0);
	let visible = Math.max(0, Number(visibleWidth) || 0);
	let offset = Math.max(0, Math.min(Math.max(0, content - visible), Number(logicalOffset) || 0));
	let right = content - offset;

	return {
		left: Math.max(0, right - visible),
		right
	};
}

const terminalRectIdentity = (rect: VerticalRlTerminalCoverageRect, index: number): string => (
	rect.structureHash || `${index}:${rect.left}:${rect.right}`
);

const terminalRectFullyInside = (
	rect: VerticalRlTerminalCoverageRect,
	viewport: { left: number; right: number },
	tolerance: number
): boolean => rect.left >= viewport.left - tolerance && rect.right <= viewport.right + tolerance;

const terminalRectIntersects = (
	rect: VerticalRlTerminalCoverageRect,
	viewport: { left: number; right: number },
	tolerance: number
): boolean => rect.right > viewport.left + tolerance && rect.left < viewport.right - tolerance;

const terminalIntervalRelationships = (
	viewports: Array<{ left: number; right: number }>,
	tolerance: number
): { gaps: Array<{ left: number; right: number }>; overlaps: Array<{ left: number; right: number }> } => {
	let sorted = [...viewports]
		.sort((a, b) => a.left - b.left)
		.filter((viewport) => viewport.right >= viewport.left);
	let gaps: Array<{ left: number; right: number }> = [];
	let overlaps: Array<{ left: number; right: number }> = [];

	for (let index = 1; index < sorted.length; index += 1) {
		let previous = sorted[index - 1];
		let current = sorted[index];

		if (current.left > previous.right + tolerance) {
			gaps.push({ left: previous.right, right: current.left });
		} else if (current.left < previous.right - tolerance) {
			overlaps.push({ left: current.left, right: Math.min(previous.right, current.right) });
		}
	}

	return { gaps, overlaps };
};

const evaluateTerminalCoveragePolicy = (
	policy: VerticalRlTerminalCoveragePolicy,
	offsets: number[],
	input: VerticalRlTerminalCoveragePolicyInput,
	previousOffsets: number[],
	tolerance: number
): VerticalRlTerminalCoveragePolicyResult => {
	let allOffsets = [...previousOffsets, ...offsets];
	let allViewports = allOffsets.map((offset) => getVerticalRlRawViewportForOffset(
		offset,
		input.contentWidth,
		input.visibleWidth
	));
	let viewports = offsets.map((offset) => getVerticalRlRawViewportForOffset(
		offset,
		input.contentWidth,
		input.visibleWidth
	));
	let newlyCoveredSemanticRects: string[] = [];
	let duplicateSemanticRects: string[] = [];
	let uncoveredSemanticRects: string[] = [];

	input.semanticRects.forEach((rect, index) => {
		let identity = terminalRectIdentity(rect, index);
		let owningViewports = allViewports.filter((viewport) => terminalRectFullyInside(rect, viewport, tolerance));

		if (!owningViewports.length) {
			uncoveredSemanticRects.push(identity);
			return;
		}

		if (owningViewports.length > 1) {
			duplicateSemanticRects.push(identity);
		} else {
			newlyCoveredSemanticRects.push(identity);
		}
	});

	let marker = input.markerStructureHash
		? input.semanticRects.find((rect, index) => terminalRectIdentity(rect, index) === input.markerStructureHash)
		: null;
	let markerVisibility: VerticalRlTerminalCoveragePolicyResult["targetMarkerVisibility"] = "unsupported";
	if (marker) {
		let hasFull = viewports.some((viewport) => terminalRectFullyInside(marker, viewport, tolerance));
		let hasPartial = viewports.some((viewport) => terminalRectIntersects(marker, viewport, tolerance));
		markerVisibility = hasFull ? "fully-visible" : hasPartial ? "partially-clipped" : "fully-outside";
	}

	let relationships = terminalIntervalRelationships(allViewports, tolerance);
	let semanticGapIntervals = relationships.gaps.filter((gap) => input.semanticRects.some((rect, index) => (
		rect.right > gap.left + tolerance &&
		rect.left < gap.right - tolerance &&
		!allViewports.some((viewport) => terminalRectFullyInside(rect, viewport, tolerance)) &&
		uncoveredSemanticRects.includes(terminalRectIdentity(rect, index))
	)));
	let previousOffset = offsets.length > 1
		? offsets[offsets.length - 2]
		: previousOffsets[previousOffsets.length - 1];
	let previousViewport = Number.isFinite(previousOffset)
		? getVerticalRlRawViewportForOffset(previousOffset, input.contentWidth, input.visibleWidth)
		: null;
	let terminalViewport = viewports[viewports.length - 1] || null;
	let previousToTerminalCoverageContinuity = !previousViewport || !terminalViewport
		? true
		: terminalViewport.right >= previousViewport.left - tolerance &&
			previousViewport.right >= terminalViewport.left - tolerance;

	return {
		policy,
		offsets,
		viewports,
		newlyCoveredSemanticRects,
		duplicateSemanticRects,
		uncoveredSemanticRects,
		gapIntervals: relationships.gaps,
		semanticGapIntervals,
		overlapIntervals: relationships.overlaps,
		pageCountDelta: Math.max(0, offsets.length - 1),
		targetMarkerVisibility: markerVisibility,
		previousToTerminalCoverageContinuity,
		usedUnconditionalMaxScroll: policy === "max-scroll"
	};
};

export type VerticalRlTerminalContinuationPlan = {
	offsets: number[];
	viewports: Array<{ left: number; right: number }>;
	coverage: VerticalRlTerminalCoveragePolicyResult;
};

const verticalRlTerminalRectIdentity = (
	rect: VerticalRlTerminalCoverageRect,
	index: number
): string => terminalRectIdentity(rect, index);

const getVerticalRlOwnedSemanticRectIdentities = (
	semanticRects: VerticalRlTerminalCoverageRect[],
	offsets: number[],
	contentWidth: number,
	visibleWidth: number,
	tolerance: number
): Set<string> => {
	let viewports = offsets.map((offset) => getVerticalRlRawViewportForOffset(
		offset,
		contentWidth,
		visibleWidth
	));
	let owned = new Set<string>();

	semanticRects.forEach((rect, index) => {
		if (viewports.some((viewport) => terminalRectFullyInside(rect, viewport, tolerance))) {
			owned.add(verticalRlTerminalRectIdentity(rect, index));
		}
	});

	return owned;
};

export function planVerticalRlTerminalContinuations(
	input: VerticalRlTerminalCoveragePolicyInput
): VerticalRlTerminalContinuationPlan {
	let tolerance = Math.max(0, Number(input.tolerance) || 0.5);
	let contentWidth = Math.max(0, Number(input.contentWidth) || 0);
	let visibleWidth = Math.max(0, Number(input.visibleWidth) || 0);
	let currentOffset = Math.max(0, Number(input.currentOffset) || 0);
	let maxScroll = Math.max(currentOffset, Number(input.maxScroll) || 0);
	let semanticRects = Array.isArray(input.semanticRects) ? input.semanticRects : [];
	let maxContinuationPages = Math.max(1, Math.min(20, Number(input.maxContinuationPages) || 8));
	let minProgress = Math.max(0.01, tolerance / 10);
	let continuationOffsets: number[] = [];
	let currentPlanOffsets = [currentOffset];
	let previousOffsets = Array.isArray(input.previousOffsets) ? input.previousOffsets : [];

	for (let attempt = 0; attempt < maxContinuationPages; attempt += 1) {
		let currentResult = evaluateTerminalCoveragePolicy(
			"dynamic-terminal-continuation",
			currentPlanOffsets,
			input,
			previousOffsets,
			tolerance
		);

		if (!currentResult.uncoveredSemanticRects.length) {
			break;
		}

		let uncovered = semanticRects.filter((rect, index) => (
			currentResult.uncoveredSemanticRects.includes(verticalRlTerminalRectIdentity(rect, index))
		));
		let currentOwned = getVerticalRlOwnedSemanticRectIdentities(
			semanticRects,
			[...previousOffsets, ...currentPlanOffsets],
			contentWidth,
			visibleWidth,
			tolerance
		);
		let candidateOffsets = [...new Set(uncovered.map((rect) => {
			let minimumOffset = contentWidth - visibleWidth - rect.left - tolerance;
			return Math.max(currentOffset + minProgress, minimumOffset);
		}))]
			.map((offset) => Math.min(maxScroll, offset))
			.filter((offset) => offset > currentOffset + minProgress / 2 && offset <= maxScroll);
		let bestCandidate: {
			offset: number;
			result: VerticalRlTerminalCoveragePolicyResult;
			newlyOwned: number;
		} | null = null;

		for (let candidateOffset of candidateOffsets) {
			let candidatePlanOffsets = [...currentPlanOffsets, candidateOffset];
			let candidateResult = evaluateTerminalCoveragePolicy(
				"dynamic-terminal-continuation",
				candidatePlanOffsets,
				input,
				previousOffsets,
				tolerance
			);
			let candidateOwned = getVerticalRlOwnedSemanticRectIdentities(
				semanticRects,
				[...previousOffsets, ...candidatePlanOffsets],
				contentWidth,
				visibleWidth,
				tolerance
			);
			let newlyOwned = [...candidateOwned].filter((identity) => !currentOwned.has(identity)).length;

			if (
				newlyOwned < 1 ||
				candidateResult.uncoveredSemanticRects.length >= currentResult.uncoveredSemanticRects.length ||
				!candidateResult.previousToTerminalCoverageContinuity
			) {
				continue;
			}

			if (
				!bestCandidate ||
				candidateResult.uncoveredSemanticRects.length < bestCandidate.result.uncoveredSemanticRects.length ||
				(
				candidateResult.uncoveredSemanticRects.length === bestCandidate.result.uncoveredSemanticRects.length &&
					(newlyOwned > bestCandidate.newlyOwned || candidateOffset < bestCandidate.offset)
				)
			) {
				bestCandidate = {
					offset: candidateOffset,
					result: candidateResult,
					newlyOwned
				};
			}
		}

		if (!bestCandidate) {
			break;
		}

		continuationOffsets.push(bestCandidate.offset);
		currentPlanOffsets.push(bestCandidate.offset);
		currentOffset = bestCandidate.offset;
	}

	let coverage = evaluateTerminalCoveragePolicy(
		"dynamic-terminal-continuation",
		currentPlanOffsets,
		input,
		previousOffsets,
		tolerance
	);

	return {
		offsets: continuationOffsets,
		viewports: continuationOffsets.map((offset) => getVerticalRlRawViewportForOffset(
			offset,
			contentWidth,
			visibleWidth
		)),
		coverage
	};
}

export function characterizeVerticalRlTerminalCoveragePolicies(
	input: VerticalRlTerminalCoveragePolicyInput
): Record<VerticalRlTerminalCoveragePolicy, VerticalRlTerminalCoveragePolicyResult> {
	let tolerance = Math.max(0, Number(input.tolerance) || 0.5);
	let currentOffset = Math.max(0, Number(input.currentOffset) || 0);
	let maxScroll = Math.max(currentOffset, Number(input.maxScroll) || 0);
	let previousOffsets = Array.isArray(input.previousOffsets) ? input.previousOffsets : [];
	let preferredOffset = Number.isFinite(Number(input.preferredOffset))
		? Math.max(0, Math.min(maxScroll, Number(input.preferredOffset)))
		: currentOffset;
	let maxOnlyOffset = Number.isFinite(Number(input.maxRightBoundary))
		? Math.max(0, Math.min(maxScroll, Number(input.contentWidth) - Number(input.maxRightBoundary)))
		: currentOffset;
	let dynamicPlan = planVerticalRlTerminalContinuations(input);
	let dynamicResult = dynamicPlan.coverage;

	return {
		"current-exact-sequential": evaluateTerminalCoveragePolicy(
			"current-exact-sequential",
			[preferredOffset],
			input,
			previousOffsets,
			tolerance
		),
		"sequential-max-only": evaluateTerminalCoveragePolicy(
			"sequential-max-only",
			[maxOnlyOffset],
			input,
			previousOffsets,
			tolerance
		),
		"max-scroll": evaluateTerminalCoveragePolicy(
			"max-scroll",
			[maxScroll],
			input,
			previousOffsets,
			tolerance
		),
		"dynamic-terminal-continuation": dynamicResult
	};
}

export function getVerticalRlLogicalPageOffsetCacheKey(
	totalPages: number,
	maxScroll: number,
	contentWidth: number,
	visibleWidth: number,
	pageAdvance: number,
	edgeGuard = 0
): string | null {
	const content = Number(contentWidth) || 0;
	const visible = Number(visibleWidth) || 0;
	const advance = Number(pageAdvance) || 0;

	if (!content || !visible || !advance) {
		return null;
	}

	return [
		Math.round((Number(totalPages) || 0) * 100) / 100,
		Math.round((Number(maxScroll) || 0) * 100) / 100,
		Math.round(content * 100) / 100,
		Math.round(visible * 100) / 100,
		Math.round(advance * 100) / 100,
		Math.round((Number(edgeGuard) || 0) * 100) / 100
	].join(":");
}

export type VerticalRlLogicalPageOffsetCache = {
	key: string;
	offsets: Record<number, number>;
};

export function getCachedVerticalRlLogicalPageOffset(
	cache: VerticalRlLogicalPageOffsetCache | null | undefined,
	pageIndex: number,
	cacheKey: string | null
): number | null {
	if (!cache || cache.key !== cacheKey || !cache.offsets) {
		return null;
	}

	const cachedOffset = Number(cache.offsets[pageIndex]);
	return Number.isFinite(cachedOffset) ? cachedOffset : null;
}

export function cacheVerticalRlLogicalPageOffset(
	cache: VerticalRlLogicalPageOffsetCache | null | undefined,
	pageIndex: number,
	logicalOffset: number,
	cacheKey: string | null
): VerticalRlLogicalPageOffsetCache | null | undefined {
	if (!cacheKey || !Number.isFinite(Number(logicalOffset))) {
		return cache;
	}

	const nextCache = !cache || cache.key !== cacheKey
		? {
			key: cacheKey,
			offsets: Object.create(null) as Record<number, number>
		}
		: cache;

	nextCache.offsets[pageIndex] = Number(logicalOffset);

	return nextCache;
}

export function getLogicalOffsetForPageIndex(
	pageIndex: number,
	totalPages: number,
	maxScroll: number,
	pageAdvance: number,
	boundaryShift = 0,
	isRtlVerticalPaginated = false
): number {
	const advance = Number(pageAdvance) || 0;
	const targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
	let logicalOffset = targetIndex * advance;

	if (isRtlVerticalPaginated && boundaryShift > 0 && targetIndex > 0 && targetIndex < totalPages - 1) {
		logicalOffset = Math.max(0, logicalOffset - boundaryShift);
	}

	return Math.min(maxScroll, logicalOffset);
}

export function getCurrentPageIndexForOffset(
	normalizedOffset: number,
	totalPages: number,
	pageAdvance: number,
	maxScroll: number,
	snapTolerance: number,
	boundaryShift = 0,
	isRtlVerticalPaginated = false
): number {
	const advance = Number(pageAdvance) || 0;
	if (!advance || advance <= 0) {
		return 0;
	}

	const pageCount = Math.max(1, Math.floor(Number(totalPages) || 1));
	const normalized = Number(normalizedOffset) || 0;
	const maxLogicalScroll = Number(maxScroll) || 0;
	const tolerance = Number(snapTolerance) || 0;

	if (isRtlVerticalPaginated && pageCount > 1 && maxLogicalScroll > 0 && normalized >= maxLogicalScroll - tolerance) {
		return pageCount - 1;
	}

	if (isRtlVerticalPaginated) {
		let nearestPageIndex = 0;
		let nearestDistance = Infinity;

		for (let i = 0; i < pageCount; i++) {
			const targetOffset = getLogicalOffsetForPageIndex(
				i,
				pageCount,
				maxLogicalScroll,
				advance,
				boundaryShift,
				isRtlVerticalPaginated
			);
			const distance = Math.abs(normalized - targetOffset);
			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestPageIndex = i;
			}
		}

		return nearestPageIndex;
	}

	const nearestPageIndex = Math.round(normalized / advance);
	if (Math.abs(normalized - (nearestPageIndex * advance)) <= tolerance) {
		return Math.max(0, Math.min(pageCount - 1, nearestPageIndex));
	}

	const pageIndex = Math.floor((normalized + 0.5) / advance);
	return Math.max(0, Math.min(pageCount - 1, pageIndex));
}

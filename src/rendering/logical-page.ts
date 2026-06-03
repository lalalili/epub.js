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

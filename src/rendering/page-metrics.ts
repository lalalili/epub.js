export function countPagesWithFractionalTolerance(totalLength: number, pageLength: number): number {
	if (
		!Number.isFinite(totalLength) ||
		totalLength <= 0 ||
		!Number.isFinite(pageLength) ||
		pageLength <= 0
	) {
		return 1;
	}

	const ratio = totalLength / pageLength;
	const rounded = Math.max(1, Math.round(ratio));
	const tolerance = Math.max(1, Math.min(4, pageLength * 0.005));

	if (Math.abs(totalLength - (rounded * pageLength)) <= tolerance) {
		return rounded;
	}

	return Math.max(1, Math.ceil(ratio));
}

export function getPageSnapTolerance(pageAdvance: number, edgeGuard = 0): number {
	const advance = Number(pageAdvance) || 0;
	const safeEdgeGuard = Number(edgeGuard) || 0;
	const tolerance = Math.max(2, safeEdgeGuard, Math.round(advance * 0.08));

	return advance > 0 ? Math.min(Math.max(2, Math.round(advance / 4)), tolerance) : 2;
}

export function getPageBoundaryShift(pageBoundaryShift: number, pageAdvance: number, isRtlVerticalPaginated = false): number {
	if (!isRtlVerticalPaginated) {
		return 0;
	}

	const shift = Number(pageBoundaryShift || 0);
	const advance = Number(pageAdvance) || 0;

	if (!Number.isFinite(shift) || shift <= 0 || !advance) {
		return 0;
	}

	return Math.min(shift, Math.max(0, Math.floor(advance / 3)));
}

export function hasVerticalRlStructuralPageGutter(
	pageAdvance: number,
	visibleWidth: number,
	boundaryShift: number,
	isRtlVerticalPaginated = false
): boolean {
	const advance = Number(pageAdvance) || 0;
	const width = Number(visibleWidth) || 0;
	const shift = Number(boundaryShift) || 0;

	return !!(
		isRtlVerticalPaginated &&
		advance &&
		width &&
		width - advance > 1 &&
		shift === 0
	);
}

import type { VerticalRlLogicalPageOffsetCache } from "./logical-page";

export type VerticalRlTerminalContinuationState = {
	layoutKey: string;
	continuationCount: number;
	offsetCache: VerticalRlLogicalPageOffsetCache | null;
};

/** Geometry identity is independent of the dynamically promoted logical count. */
export function resolveVerticalRlTerminalContinuation(
	previous: VerticalRlTerminalContinuationState | undefined,
	layoutKey: string | null
): VerticalRlTerminalContinuationState | null {
	if (!layoutKey) {
		return null;
	}
	return previous?.layoutKey === layoutKey ? previous : {
		layoutKey,
		continuationCount: 0,
		offsetCache: null
	};
}

/** Reserve another reachable index instead of replacing an early terminal window. */
export function promoteVerticalRlTerminalContinuation(
	state: VerticalRlTerminalContinuationState,
	basePageCount: number,
	targetIndex: number,
	logicalOffset: number,
	maxLogicalScroll: number,
	snapTolerance: number
): boolean {
	if (
		!Number.isInteger(basePageCount) || basePageCount <= 0 ||
		!Number.isInteger(targetIndex) ||
		!Number.isFinite(logicalOffset) || logicalOffset < 0 ||
		!Number.isFinite(maxLogicalScroll) ||
		!Number.isFinite(snapTolerance) || snapTolerance < 0 ||
		targetIndex !== basePageCount + state.continuationCount - 1 ||
		maxLogicalScroll - logicalOffset <= snapTolerance
	) {
		return false;
	}
	state.continuationCount += 1;
	return true;
}

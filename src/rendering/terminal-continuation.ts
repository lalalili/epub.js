import type { VerticalRlLogicalPageOffsetCache } from "./logical-page";

export type VerticalRlTerminalTailState = "reached" | "unreached" | "unknown";

export type VerticalRlTerminalTailTransaction = {
	before: VerticalRlTerminalTailState;
	after: VerticalRlTerminalTailState;
	sameTerminalOwner: boolean;
	sameOwnerDocument: boolean;
	ownerStillConnected: boolean;
};

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

/**
 * Check the existing geometry-only continuation candidate without mutating state.
 *
 * The geometry check deliberately remains independent from semantic tail
 * resolution. Callers only need to resolve the DOM tail after this returns true.
 */
export function isVerticalRlTerminalContinuationGeometryCandidate(
	state: VerticalRlTerminalContinuationState,
	basePageCount: number,
	targetIndex: number,
	logicalOffset: number,
	maxLogicalScroll: number,
	snapTolerance: number
): boolean {
	return Number.isInteger(basePageCount) && basePageCount > 0 &&
		Number.isInteger(targetIndex) &&
		Number.isFinite(logicalOffset) && logicalOffset >= 0 &&
		Number.isFinite(maxLogicalScroll) &&
		Number.isFinite(snapTolerance) && snapTolerance >= 0 &&
		targetIndex === basePageCount + state.continuationCount - 1 &&
		maxLogicalScroll - logicalOffset > snapTolerance;
}

/**
 * Combine before/after observations without treating past-side geometry as a
 * standalone reached signal.
 */
export function aggregateVerticalRlTerminalTailState({
	before,
	after,
	sameTerminalOwner,
	sameOwnerDocument,
	ownerStillConnected
}: VerticalRlTerminalTailTransaction): VerticalRlTerminalTailState {
	if (after === "reached") {
		return "reached";
	}

	if (before === "reached" && sameTerminalOwner && sameOwnerDocument && ownerStillConnected) {
		return "reached";
	}

	if (before === "unreached" && after === "unreached") {
		return "unreached";
	}

	return "unknown";
}

/** Reserve another reachable index instead of replacing an early terminal window. */
export function promoteVerticalRlTerminalContinuation(
	state: VerticalRlTerminalContinuationState,
	basePageCount: number,
	targetIndex: number,
	logicalOffset: number,
	maxLogicalScroll: number,
	snapTolerance: number,
	terminalTailState: VerticalRlTerminalTailState = "unknown"
): boolean {
	if (!isVerticalRlTerminalContinuationGeometryCandidate(
		state,
		basePageCount,
		targetIndex,
		logicalOffset,
		maxLogicalScroll,
		snapTolerance
	) || terminalTailState === "reached") {
		return false;
	}
	state.continuationCount += 1;
	return true;
}

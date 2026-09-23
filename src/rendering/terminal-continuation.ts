import type { VerticalRlLogicalPageOffsetCache } from "./logical-page";

export type VerticalRlTerminalContinuationState = {
	layoutKey: string;
	continuationCount: number;
	offsetCache: VerticalRlLogicalPageOffsetCache | null;
};

type TerminalContinuationObservationContext = {
	owner?: object | null;
	section?: object | null;
	view?: object | null;
	document?: Document | null;
};

const emitTerminalContinuationObservation = (
	event: string,
	owner: object | null | undefined,
	values: Record<string, unknown>
): void => {
	try {
		(globalThis as typeof globalThis & {
			__PERSIST_TOPOLOGY__?: { emit?: (event: string, owner: object | null, values: Record<string, unknown>) => unknown };
		}).__PERSIST_TOPOLOGY__?.emit?.(event, owner ?? null, values);
	} catch (_) {
		// Diagnostics must never alter pagination behavior.
	}
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

export function resolveVerticalRlTerminalContinuationWithObservation(
	previous: VerticalRlTerminalContinuationState | undefined,
	layoutKey: string | null,
	context: TerminalContinuationObservationContext = {}
): VerticalRlTerminalContinuationState | null {
	const state = resolveVerticalRlTerminalContinuation(previous, layoutKey);
	emitTerminalContinuationObservation("terminal-continuation-layout", context.owner, {
		...context,
		layoutKey,
		continuationCountBefore: previous?.continuationCount,
		continuationCountAfter: state?.continuationCount,
		accepted: state === previous,
		reason: !layoutKey ? "layout-unavailable" : state === previous ? "layout-reused" : "layout-reset"
	});
	return state;
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

export function promoteVerticalRlTerminalContinuationWithObservation(
	state: VerticalRlTerminalContinuationState,
	basePageCount: number,
	targetIndex: number,
	logicalOffset: number,
	maxLogicalScroll: number,
	snapTolerance: number,
	context: TerminalContinuationObservationContext = {}
): boolean {
	const continuationCountBefore = state.continuationCount;
	const promotionResult = promoteVerticalRlTerminalContinuation(
		state, basePageCount, targetIndex, logicalOffset, maxLogicalScroll, snapTolerance
	);
	const validInputs = Number.isInteger(basePageCount) && basePageCount > 0 &&
		Number.isInteger(targetIndex) && Number.isFinite(logicalOffset) && logicalOffset >= 0 &&
		Number.isFinite(maxLogicalScroll) && Number.isFinite(snapTolerance) && snapTolerance >= 0;
	const targetMatches = targetIndex === basePageCount + continuationCountBefore - 1;
	emitTerminalContinuationObservation("terminal-continuation-promotion", context.owner, {
		...context,
		layoutKey: state.layoutKey,
		basePageCount,
		targetIndex,
		continuationCountBefore,
		continuationCountAfter: state.continuationCount,
		maxScroll: maxLogicalScroll,
		promotionResult,
		reason: promotionResult ? "promoted" : !validInputs ? "invalid-input" : !targetMatches ? "target-mismatch" : "within-snap-tolerance"
	});
	return promotionResult;
}

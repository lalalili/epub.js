import { describe, expect, it } from "vitest";
import { cacheVerticalRlLogicalPageOffset, getCachedVerticalRlLogicalPageOffset, getVerticalRlLogicalPageOffsetCacheKey } from "../../src/rendering/logical-page";
import {
	aggregateVerticalRlTerminalTailState,
	resolveVerticalRlTerminalContinuation,
	promoteVerticalRlTerminalContinuation,
	isVerticalRlTerminalContinuationGeometryCandidate
} from "../../src/rendering/terminal-continuation";

describe("layout-scoped terminal continuation", () => {
	const base = 4;
	const max = 480;
	const tolerance = 12;
	const create = () => resolveVerticalRlTerminalContinuation(undefined, "layout");
	it("does not promote an actual tail, including the exact snap boundary", () => {
		const state = create();
		for (const offset of [max, max - tolerance]) {
			expect(promoteVerticalRlTerminalContinuation(state, base, base - 1, offset, max, tolerance)).toBe(false);
		}
		expect(state.continuationCount).toBe(0);
	});
	it("suppresses a geometry candidate only when the semantic tail is reached", () => {
		const reached = create();
		expect(isVerticalRlTerminalContinuationGeometryCandidate(reached, base, base - 1, max / 2, max, tolerance)).toBe(true);
		expect(promoteVerticalRlTerminalContinuation(reached, base, base - 1, max / 2, max, tolerance, "reached")).toBe(false);
		expect(reached.continuationCount).toBe(0);

		const unreached = create();
		expect(promoteVerticalRlTerminalContinuation(unreached, base, base - 1, max / 2, max, tolerance, "unreached")).toBe(true);
		expect(unreached.continuationCount).toBe(1);

		const unknown = create();
		expect(promoteVerticalRlTerminalContinuation(unknown, base, base - 1, max / 2, max, tolerance, "unknown")).toBe(true);
		expect(unknown.continuationCount).toBe(1);
	});
	it("aggregates transaction-level tail reachability conservatively", () => {
		expect(aggregateVerticalRlTerminalTailState({
			before: "reached",
			after: "unknown",
			sameTerminalOwner: true,
			sameOwnerDocument: true,
			ownerStillConnected: true
		})).toBe("reached");
		expect(aggregateVerticalRlTerminalTailState({
			before: "reached",
			after: "unknown",
			sameTerminalOwner: false,
			sameOwnerDocument: true,
			ownerStillConnected: true
		})).toBe("unknown");
		expect(aggregateVerticalRlTerminalTailState({
			before: "unreached",
			after: "reached",
			sameTerminalOwner: true,
			sameOwnerDocument: true,
			ownerStillConnected: true
		})).toBe("reached");
		expect(aggregateVerticalRlTerminalTailState({
			before: "unreached",
			after: "unreached",
			sameTerminalOwner: true,
			sameOwnerDocument: true,
			ownerStillConnected: true
		})).toBe("unreached");
		expect(aggregateVerticalRlTerminalTailState({
			before: "unknown",
			after: "unknown",
			sameTerminalOwner: true,
			sameOwnerDocument: true,
			ownerStillConnected: true
		})).toBe("unknown");
	});
	it("promotes an early terminal without changing its recorded offset", () => {
		const state = create();
		state.offsetCache = cacheVerticalRlLogicalPageOffset(null, base - 1, max / 2, state.layoutKey);
		expect(promoteVerticalRlTerminalContinuation(state, base, base - 1, max / 2, max, tolerance)).toBe(true);
		expect(state.continuationCount).toBe(1);
		expect(getCachedVerticalRlLogicalPageOffset(state.offsetCache, base - 1, state.layoutKey)).toBe(max / 2);
	});
	it("does not promote an ordinary nonterminal or promote the same index twice", () => {
		const state = create();
		expect(promoteVerticalRlTerminalContinuation(state, base, base - 2, 100, max, tolerance)).toBe(false);
		expect(promoteVerticalRlTerminalContinuation(state, base, base - 1, 200, max, tolerance)).toBe(true);
		expect(promoteVerticalRlTerminalContinuation(state, base, base - 1, 200, max, tolerance)).toBe(false);
	});
	it("supports successive continuations until the applied window reaches the tail", () => {
		const state = create();
		for (const offset of [200, 300, 400]) {
			expect(promoteVerticalRlTerminalContinuation(state, base, base + state.continuationCount - 1, offset, max, tolerance)).toBe(true);
		}
		expect(promoteVerticalRlTerminalContinuation(state, base, base + state.continuationCount - 1, max, max, tolerance)).toBe(false);
		expect(state.continuationCount).toBe(3);
	});
	it("invalidates continuation and offsets together on layout-key changes", () => {
		const previous = create();
		promoteVerticalRlTerminalContinuation(previous, base, base - 1, 200, max, tolerance);
		expect(resolveVerticalRlTerminalContinuation(previous, previous.layoutKey)).toBe(previous);
		const next = resolveVerticalRlTerminalContinuation(previous, "resized");
		expect(next.continuationCount).toBe(0);
		expect(next.offsetCache).toBeNull();
		expect(resolveVerticalRlTerminalContinuation(previous, null)).toBeNull();
	});
	it("keeps the base-geometry ledger key stable across multiple promotions", () => {
		const key = () => getVerticalRlLogicalPageOffsetCacheKey(base, max, 600, 120, 120, 6);
		const state = resolveVerticalRlTerminalContinuation(undefined, key());
		for (let index = 0; index < base; index += 1) {
			state.offsetCache = cacheVerticalRlLogicalPageOffset(state.offsetCache, index, index * 80, key());
		}
		promoteVerticalRlTerminalContinuation(state, base, base - 1, 240, max, tolerance);
		promoteVerticalRlTerminalContinuation(state, base, base, 360, max, tolerance);
		expect(state.layoutKey).toBe(key());
		for (let index = 0; index < base; index += 1) {
			expect(getCachedVerticalRlLogicalPageOffset(state.offsetCache, index, key())).toBe(index * 80);
		}
	});
});

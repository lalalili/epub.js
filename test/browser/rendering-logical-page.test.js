import { describe, expect, it } from "vitest";
import {
	cacheVerticalRlLogicalPageOffset,
	getCachedVerticalRlLogicalPageOffset,
	getCurrentPageIndexForOffset,
	getLogicalOffsetForPageIndex,
	getVerticalRlLogicalPageOffsetCacheKey,
	getVerticalRlLogicalPageStepToNextPage,
} from "../../src/rendering/logical-page";

// Characterization tests for the pure vertical-RL logical-page helpers (page step, offset cache and
// offset <-> page-index conversion). Only covered indirectly through manager integration tests today;
// these pin the converted snap math directly so future refactors / upstream merges cannot silently
// shift it. Source is frozen (RTL pagination) — these lock current behavior, they do not change it.

describe("logical-page: getVerticalRlLogicalPageStepToNextPage", () => {
	it("returns the offset delta as the step in the general case", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(100, 5, 2, 3, 0, 150, false)).toBe(150);
	});

	it("falls back to the advance when there is no offset delta", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(100, 5, 0, 1, 50, 50, false)).toBe(100);
	});

	it("caps the last-page step at the advance when a structural gutter is present", () => {
		expect(getVerticalRlLogicalPageStepToNextPage(100, 5, 3, 4, 0, 150, true)).toBe(100);
		// same inputs without the gutter keep the raw delta
		expect(getVerticalRlLogicalPageStepToNextPage(100, 5, 3, 4, 0, 150, false)).toBe(150);
	});
});

describe("logical-page: getVerticalRlLogicalPageOffsetCacheKey", () => {
	it("returns null when content, visible width or advance is missing", () => {
		expect(getVerticalRlLogicalPageOffsetCacheKey(5, 1000, 0, 300, 100)).toBeNull();
		expect(getVerticalRlLogicalPageOffsetCacheKey(5, 1000, 2000, 0, 100)).toBeNull();
		expect(getVerticalRlLogicalPageOffsetCacheKey(5, 1000, 2000, 300, 0)).toBeNull();
	});

	it("joins rounded-to-2dp metrics into a stable key", () => {
		expect(getVerticalRlLogicalPageOffsetCacheKey(5, 1000, 2000, 300, 100, 8)).toBe(
			"5:1000:2000:300:100:8",
		);
		expect(getVerticalRlLogicalPageOffsetCacheKey(5.555, 1000.123, 2000, 300, 100.999)).toBe(
			"5.56:1000.12:2000:300:101:0",
		);
	});
});

describe("logical-page: offset cache get/set", () => {
	it("returns null for a missing cache or key mismatch", () => {
		expect(getCachedVerticalRlLogicalPageOffset(null, 0, "k")).toBeNull();
		expect(
			getCachedVerticalRlLogicalPageOffset({ key: "k", offsets: { 0: 50 } }, 0, "k2"),
		).toBeNull();
	});

	it("returns a finite cached offset on a key hit", () => {
		const cache = { key: "k", offsets: { 0: 50 } };
		expect(getCachedVerticalRlLogicalPageOffset(cache, 0, "k")).toBe(50);
		expect(getCachedVerticalRlLogicalPageOffset(cache, 1, "k")).toBeNull();
	});

	it("leaves the cache untouched when the key or value is invalid", () => {
		const cache = { key: "k", offsets: { 0: 50 } };
		expect(cacheVerticalRlLogicalPageOffset(cache, 1, 75, null)).toBe(cache);
		expect(cacheVerticalRlLogicalPageOffset(cache, 1, Number.NaN, "k")).toBe(cache);
	});

	it("creates a fresh cache on a new key and reuses it on the same key", () => {
		const created = cacheVerticalRlLogicalPageOffset(null, 0, 50, "k");
		expect(created.key).toBe("k");
		expect(created.offsets[0]).toBe(50);

		const reused = cacheVerticalRlLogicalPageOffset(created, 1, 75, "k");
		expect(reused).toBe(created);
		expect(reused.offsets[1]).toBe(75);

		const replaced = cacheVerticalRlLogicalPageOffset(created, 0, 9, "k2");
		expect(replaced).not.toBe(created);
		expect(replaced.key).toBe("k2");
		expect(replaced.offsets[0]).toBe(9);
	});
});

describe("logical-page: getLogicalOffsetForPageIndex", () => {
	it("returns index * advance clamped into [0, maxScroll]", () => {
		expect(getLogicalOffsetForPageIndex(2, 5, 1000, 100)).toBe(200);
		expect(getLogicalOffsetForPageIndex(10, 5, 1000, 100)).toBe(400);
		expect(getLogicalOffsetForPageIndex(-3, 5, 1000, 100)).toBe(0);
		expect(getLogicalOffsetForPageIndex(2, 5, 150, 100, 30, true)).toBe(150);
	});

	it("applies the boundary shift only to interior RTL pages", () => {
		expect(getLogicalOffsetForPageIndex(2, 5, 1000, 100, 30, true)).toBe(170);
		// last page (index 4 == totalPages-1) keeps the full offset
		expect(getLogicalOffsetForPageIndex(4, 5, 1000, 100, 30, true)).toBe(400);
	});
});

describe("logical-page: getCurrentPageIndexForOffset", () => {
	it("returns 0 when advance is missing", () => {
		expect(getCurrentPageIndexForOffset(500, 5, 0, 1000, 5)).toBe(0);
	});

	it("snaps to the nearest page within tolerance (LTR)", () => {
		expect(getCurrentPageIndexForOffset(0, 5, 100, 1000, 5)).toBe(0);
		expect(getCurrentPageIndexForOffset(200, 5, 100, 1000, 5)).toBe(2);
		expect(getCurrentPageIndexForOffset(205, 5, 100, 1000, 5)).toBe(2);
	});

	it("floors to a page when beyond tolerance (LTR)", () => {
		expect(getCurrentPageIndexForOffset(250, 5, 100, 1000, 5)).toBe(2);
	});

	it("returns the last page when at the RTL max-scroll edge", () => {
		expect(getCurrentPageIndexForOffset(1000, 5, 100, 1000, 5, 0, true)).toBe(4);
	});

	it("picks the nearest RTL logical page offset otherwise", () => {
		expect(getCurrentPageIndexForOffset(0, 5, 100, 1000, 5, 0, true)).toBe(0);
		expect(getCurrentPageIndexForOffset(190, 5, 100, 1000, 5, 0, true)).toBe(2);
	});
});

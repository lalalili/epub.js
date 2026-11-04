import { describe, expect, it, vi } from "vite-plus/test";
import Snap from "../../src/managers/helpers/snap";

// 特性測試：斷言目前行為，不代表期望行為。
function createSnap(overrides = {}) {
    return Object.assign(
        Object.create(Snap.prototype),
        {
            layout: { pageWidth: 100, divisor: 2 },
            settings: { duration: 80, minVelocity: 0.2, minDistance: 10 },
            scrollLeft: 0,
            startTouchX: 0,
            endTouchX: 0,
            startTime: 0,
            endTime: 100,
            smoothScrollTo: vi.fn((destination) => destination),
        },
        overrides,
    );
}

describe("Snap characterization: needsSnap with fractional page widths", () => {
    it("is false when scrollLeft equals an exact multiple", () => {
        expect(
            createSnap({ layout: { pageWidth: 400.4, divisor: 2 }, scrollLeft: 800.8 }).needsSnap(),
        ).toBe(false);
        expect(createSnap({ scrollLeft: 0 }).needsSnap()).toBe(false);
    });

    it("has no tolerance: sub-pixel float error counts as needing a snap", () => {
        // CHARACTERIZATION: 疑似缺陷 — pageWidth 333.3333333 × 3 = 999.9999999，
        // scrollLeft 1000 被視為「需要 snap」；0.3 % 0.1 同理。
        expect(
            createSnap({
                layout: { pageWidth: 333.3333333, divisor: 3 },
                scrollLeft: 1000,
            }).needsSnap(),
        ).toBe(true);
        expect(
            createSnap({ layout: { pageWidth: 0.1, divisor: 1 }, scrollLeft: 0.3 }).needsSnap(),
        ).toBe(true);
    });

    it("reports true for a zero page width even at scrollLeft 0", () => {
        // CHARACTERIZATION: 疑似缺陷 — 0 % 0 = NaN，NaN !== 0 → true（未 layout 時誤判）。
        expect(
            createSnap({ layout: { pageWidth: 0, divisor: 1 }, scrollLeft: 0 }).needsSnap(),
        ).toBe(true);
    });
});

describe("Snap characterization: snap target rounding", () => {
    it("rounds to the nearest spread, with .5 rounding up", () => {
        expect(createSnap({ scrollLeft: 100 }).snap()).toBe(200);
        expect(createSnap({ scrollLeft: 299.9 }).snap()).toBe(200);
        expect(createSnap({ scrollLeft: 300 }).snap()).toBe(400);
    });

    it("applies page offsets after rounding", () => {
        expect(createSnap({ scrollLeft: 0 }).snap(1)).toBe(200);
        expect(createSnap({ scrollLeft: 0 }).snap(-1)).toBe(-200);
    });

    it("can snap to a negative scroll position", () => {
        // CHARACTERIZATION: 疑似缺陷 — 在第一頁往前 snap(-1) 目標為 -200（未夾限於 0），
        // RTL 以負 scrollLeft 運作時可能剛好符合預期，LTR 則是越界。
        expect(createSnap({ scrollLeft: -300 }).snap()).toBe(-200);
    });

    it("produces a NaN destination for a zero page width", () => {
        // CHARACTERIZATION: 疑似缺陷 — snapWidth 0 → NaN 目的地傳給 smoothScrollTo。
        const snap = createSnap({ layout: { pageWidth: 0, divisor: 1 }, scrollLeft: 5 });

        snap.snap(1);

        expect(Number.isNaN(snap.smoothScrollTo.mock.calls[0][0])).toBe(true);
    });
});

describe("Snap characterization: swipe detection edges", () => {
    it("returns previous (-1) for fast positive drags and next (1) for fast negative drags", () => {
        expect(createSnap({ endTouchX: 50, endTime: 100 }).wasSwiped()).toBe(-1);
        expect(createSnap({ endTouchX: -50, endTime: 100 }).wasSwiped()).toBe(1);
    });

    it("treats an instantaneous swipe as infinite velocity", () => {
        expect(createSnap({ endTouchX: 50, endTime: 0 }).wasSwiped()).toBe(-1);
    });

    it("returns undefined (neither 0 nor ±1) for slow in-range drags", () => {
        // CHARACTERIZATION: 疑似缺陷 — 慢速拖曳回傳 undefined，與 0 / ±1 的契約不一致。
        expect(createSnap({ endTouchX: 30, endTime: 150 }).wasSwiped()).toBeUndefined();
        expect(createSnap({ endTouchX: -30, endTime: 150 }).wasSwiped()).toBeUndefined();
        expect(createSnap({ endTouchX: 11, endTime: 100 }).wasSwiped()).toBeUndefined();
    });

    it("rejects drags at or below minDistance and at or beyond the snap width", () => {
        expect(createSnap({ endTouchX: 10, endTime: 1 }).wasSwiped()).toBe(0);
        expect(createSnap({ endTouchX: 200, endTime: 1 }).wasSwiped()).toBe(0);
        expect(createSnap({ endTouchX: 199.9, endTime: 1 }).wasSwiped()).toBe(-1);
        expect(createSnap({ endTouchX: 0, endTime: 100 }).wasSwiped()).toBe(0);
    });
});

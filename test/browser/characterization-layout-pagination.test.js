import { describe, expect, it } from "vite-plus/test";
import Layout from "../../src/layout";
import { EVENTS } from "../../src/utils/constants";

// 特性測試：斷言目前行為，不代表期望行為。
function calc(settings, width, height = 600, gap) {
    const layout = new Layout(settings);
    layout.calculate(width, height, gap);
    return layout;
}

describe("Layout characterization: spread selection", () => {
    it("never uses spreads when spread is none", () => {
        const layout = calc({ spread: "none" }, 1000);

        expect(layout.divisor).toBe(1);
        expect(layout.columnWidth).toBe(1000);
        expect(layout.pageWidth).toBe(1000);
        expect(layout.gap).toBe(82);
        expect(layout.spreadWidth).toBe(1082);
    });

    it("switches to two columns at exactly minSpreadWidth, not below", () => {
        const below = calc({ spread: "auto" }, 799.5);
        const at = calc({ spread: "auto" }, 800);

        expect(below.divisor).toBe(1);
        expect(at.divisor).toBe(2);
        expect(at.gap).toBe(66);
        expect(at.columnWidth).toBe(334);
        expect(at.pageWidth).toBe(400);
        // 雙頁時 spreadWidth (734) 小於 width (800)。
        expect(at.spreadWidth).toBe(734);
    });

    it("keeps fractional widths without rounding", () => {
        const layout = calc({ spread: "auto" }, 1000.5);

        expect(layout.divisor).toBe(2);
        expect(layout.gap).toBe(82);
        expect(layout.columnWidth).toBe(418.25);
        expect(layout.pageWidth).toBe(500.25);
        expect(layout.delta).toBe(1000.5);
    });

    it("treats spread always like auto: it still honors minSpreadWidth", () => {
        // CHARACTERIZATION: 疑似缺陷 — spread "always" 與 "auto" 無差別，窄螢幕仍是單頁。
        const layout = calc({ spread: "always" }, 500);

        expect(layout.divisor).toBe(1);
        expect(layout.gap).toBe(40);
    });

    it("honors an explicit zero gap and ignores a negative gap", () => {
        const zero = calc({ spread: "auto" }, 1000, 600, 0);
        const negative = calc({ spread: "auto" }, 1000, 600, -5);

        expect(zero.gap).toBe(0);
        expect(zero.columnWidth).toBe(500);
        expect(negative.gap).toBe(82);
        expect(negative.columnWidth).toBe(418);
    });

    it("uses zero gap for scrolled flow", () => {
        const layout = calc({ flow: "scrolled", spread: "auto" }, 1000);

        expect(layout.gap).toBe(0);
        expect(layout.divisor).toBe(2);
    });

    it("calculates an all-zero layout for a zero-size viewport", () => {
        const layout = calc({ spread: "auto" }, 0, 0);

        expect(layout.width).toBe(0);
        expect(layout.divisor).toBe(1);
        expect(layout.gap).toBe(0);
        expect(layout.spreadWidth).toBe(0);
    });

    it("cannot disable spreads with the boolean false", () => {
        // CHARACTERIZATION: 疑似缺陷 — spread(false) 因 falsy 檢查被忽略，
        // 文件宣稱可傳 boolean，實際只有 "none" 字串有效。
        const layout = new Layout({});

        expect(layout.spread(false)).toBe(true);
        expect(layout.spread("")).toBe(true);
        expect(layout.spread("none")).toBe(false);
        expect(layout.spread(true)).toBe(true);
    });

    it("ignores negative min spread widths and a zero minSpreadWidth setting", () => {
        const layout = new Layout({ minSpreadWidth: 0 });

        // CHARACTERIZATION: 疑似缺陷 — settings.minSpreadWidth = 0 被 || 覆蓋成 800。
        expect(layout._minSpreadWidth).toBe(800);
        layout.spread(undefined, -1);
        expect(layout._minSpreadWidth).toBe(800);
        layout.spread(undefined, 0);
        expect(layout._minSpreadWidth).toBe(0);
    });

    it("only emits layout updates for props that changed", () => {
        const layout = new Layout({});
        let events = 0;

        layout.on(EVENTS.LAYOUT.UPDATED, () => events++);
        layout.update({ width: 0 });
        layout.update({ width: 5 });
        layout.update({ width: 5 });

        expect(events).toBe(1);
    });
});

describe("Layout characterization: page counting", () => {
    const count = (settings, width, total, gap = 0, pageLength) =>
        calc(settings, width, 600, gap).count(total, pageLength);

    it("counts zero pages for zero length and one for an exact page", () => {
        expect(count({ spread: "none" }, 1000, 0)).toEqual({ spreads: 0, pages: 0 });
        expect(count({ spread: "none" }, 1000, 1000)).toEqual({ spreads: 1, pages: 1 });
    });

    it("counts a trailing 0.5px overflow as a whole extra page", () => {
        // CHARACTERIZATION: 疑似缺陷 — 無容差：scrollWidth 多 0.5px（常見於
        // devicePixelRatio 小數捨入）就多出一個空白頁。
        expect(count({ spread: "none" }, 1000, 1000.5)).toEqual({ spreads: 2, pages: 2 });
        expect(count({ spread: "none" }, 1000, 999.5)).toEqual({ spreads: 1, pages: 1 });
    });

    it("pads a single-spread spine to a full spread of pages", () => {
        expect(count({ spread: "auto" }, 1000, 500, 20)).toEqual({ spreads: 1, pages: 2 });
        expect(count({ spread: "auto" }, 1000, 2000, 20)).toEqual({ spreads: 2, pages: 4 });
    });

    it.each([
        // [devicePixelRatio, device px width]
        [1.25, 1001],
        [1.5, 1001],
        [2, 1001],
    ])("counts pages for CSS widths derived from dpr %s", (dpr, devicePx) => {
        const cssWidth = devicePx / dpr;
        const layout = calc({ spread: "none" }, cssWidth, 600, 0);

        expect(layout.count(cssWidth * 3)).toEqual({ spreads: 3, pages: 3 });
        expect(layout.count(cssWidth * 3 + 0.5)).toEqual({ spreads: 4, pages: 4 });
        expect(layout.count(cssWidth * 3 - 0.5)).toEqual({ spreads: 3, pages: 3 });
    });

    it("counts scrolled flow by height", () => {
        expect(count({ flow: "scrolled" }, 1000, 1800)).toEqual({ spreads: 3, pages: 3 });
        expect(count({ flow: "scrolled" }, 1000, 0)).toEqual({ spreads: 0, pages: 0 });
        expect(count({ flow: "scrolled" }, 1000, 1801)).toEqual({ spreads: 4, pages: 4 });
    });

    it("counts a pre-paginated section as one page regardless of length", () => {
        expect(count({ layout: "pre-paginated" }, 1200, 99999)).toEqual({ spreads: 1, pages: 1 });
    });

    it("returns NaN-like counts on an uncalculated layout without page length", () => {
        const layout = new Layout({});

        expect(layout.count(500, 100)).toEqual({ spreads: 5, pages: 5 });
        // CHARACTERIZATION: 疑似缺陷 — 未 calculate 且未提供 pageLength 時回傳 NaN。
        const unknown = layout.count(500);
        expect(Number.isNaN(unknown.spreads)).toBe(true);
        expect(Number.isNaN(unknown.pages)).toBe(true);
    });

    it("counts using a viewport wider than the page advance (rtl-style shift)", () => {
        const layout = calc({ spread: "none" }, 1320, 900, 0);
        layout.viewportPageWidth = 1320;
        layout.effectivePageAdvance = 1000;

        expect(layout.count(1320)).toEqual({ spreads: 1, pages: 1 });
        expect(layout.count(1321)).toEqual({ spreads: 2, pages: 2 });
        expect(layout.count(0)).toEqual({ spreads: 1, pages: 1 });
    });
});

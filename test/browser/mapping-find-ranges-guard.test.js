import { describe, expect, it } from "vite-plus/test";
import Mapping from "../../src/mapping";

// 防護測試：findStart 設有呼叫上限，若迴圈失控會丟錯而不是卡死瀏覽器。
const CALL_LIMIT = 10000;

function pagesFor(layout, scrollWidth, direction = "ltr", axis = "horizontal") {
    const mapping = new Mapping(layout, direction, axis);
    const calls = [];

    mapping.findStart = (_root, start, end) => {
        if (calls.length >= CALL_LIMIT) {
            throw new Error("findRanges 迴圈未終止");
        }
        calls.push([start, end]);
        return {};
    };
    mapping.findEnd = () => ({});

    const result = mapping.findRanges({
        document: { body: {} },
        contents: { scrollWidth: () => scrollWidth },
    });

    return { calls, result };
}

describe("Mapping.findRanges: 零寬度與非有限寬度防護", () => {
    const base = { spreadWidth: 200, columnWidth: 100, gap: 0, divisor: 2 };

    it("spreadWidth 為 0 且 scrollWidth > 0 時回傳空陣列而非無限迴圈", () => {
        const { calls, result } = pagesFor({ ...base, spreadWidth: 0 }, 500);

        expect(result).toEqual([]);
        expect(calls).toEqual([]);
    });

    it.each([
        ["spreadWidth NaN", { spreadWidth: NaN }, 500],
        ["spreadWidth Infinity", { spreadWidth: Infinity }, 500],
        ["spreadWidth 負值", { spreadWidth: -200 }, 500],
        ["divisor Infinity", { divisor: Infinity }, 500],
        ["divisor 0", { divisor: 0 }, 500],
        ["divisor NaN", { divisor: NaN }, 500],
        ["scrollWidth Infinity", {}, Infinity],
        ["scrollWidth NaN", {}, NaN],
        ["scrollWidth 負值", {}, -100],
    ])("%s 時回傳空陣列", (_name, override, scrollWidth) => {
        const { calls, result } = pagesFor({ ...base, ...override }, scrollWidth);

        expect(result).toEqual([]);
        expect(calls).toEqual([]);
    });

    it("正常寬度的分頁範圍不變（水平 ltr／rtl 與直排皆同）", () => {
        const expected = [
            [0, 100],
            [100, 200],
            [200, 300],
            [300, 400],
        ];

        expect(pagesFor(base, 400).calls).toEqual(expected);
        expect(pagesFor(base, 400, "rtl", "horizontal").calls).toEqual(expected);
        expect(pagesFor(base, 400, "rtl", "vertical").calls).toEqual(expected);
    });
});

import { describe, expect, it } from "vite-plus/test";
import Mapping from "../../src/mapping";
import { parseMarkup } from "../../src/platform/parser";

// 特性測試：斷言目前行為，不代表期望行為。
function pagesFor(layout, scrollWidth, direction = "ltr", axis = "horizontal") {
    const mapping = new Mapping(layout, direction, axis);
    const calls = [];

    mapping.findStart = (_root, start, end) => {
        calls.push([start, end]);
        return {};
    };
    mapping.findEnd = () => ({});
    mapping.findRanges({
        document: { body: {} },
        contents: { scrollWidth: () => scrollWidth },
    });

    return calls;
}

function fakeRanges(rects) {
    return rects.map((rect, i) => ({
        id: i,
        getBoundingClientRect: () => ({ top: 0, bottom: 0, left: 0, right: 0, ...rect }),
    }));
}

describe("Mapping characterization: constructor and axis", () => {
    it("defaults to ltr, vertical (horizontal=false) when axis is omitted", () => {
        const mapping = new Mapping({});

        expect(mapping.direction).toBe("ltr");
        expect(mapping.horizontal).toBe(false);
        expect(mapping._dev).toBe(false);
    });

    it("treats only the exact string 'horizontal' as horizontal", () => {
        expect(new Mapping({}, "rtl", "horizontal").horizontal).toBe(true);
        expect(new Mapping({}, "rtl", "Horizontal").horizontal).toBe(false);
        expect(new Mapping({}, "rtl", "vertical").horizontal).toBe(false);
    });

    it("ignores falsy axis values and maps unknown strings to vertical", () => {
        const mapping = new Mapping({}, "ltr", "horizontal");

        expect(mapping.axis("")).toBe(true);
        expect(mapping.axis(undefined)).toBe(true);
        expect(mapping.axis("x")).toBe(false);
    });
});

describe("Mapping characterization: findRanges page arithmetic", () => {
    it("produces no page ranges for a section with zero scroll width", () => {
        expect(pagesFor({ spreadWidth: 200, columnWidth: 100, gap: 0, divisor: 2 }, 0)).toEqual([]);
    });

    it("produces no page ranges for an uncalculated layout with zero width", () => {
        expect(pagesFor({ spreadWidth: 0, columnWidth: 0, gap: 0, divisor: 1 }, 0)).toEqual([]);
    });

    it("maps an exact spread to two pages", () => {
        expect(pagesFor({ spreadWidth: 200, columnWidth: 100, gap: 0, divisor: 2 }, 200)).toEqual([
            [0, 100],
            [100, 200],
        ]);
    });

    it("adds a whole extra spread for 0.5px of overflow", () => {
        // CHARACTERIZATION: 疑似缺陷 — scrollWidth 200.5 產生 4 頁（多一個 spread），
        // 末端出現沒有內容的範圍。
        expect(
            pagesFor({ spreadWidth: 200, columnWidth: 100, gap: 0, divisor: 2 }, 200.5),
        ).toHaveLength(4);
    });

    it("includes the gap in each page start", () => {
        expect(pagesFor({ spreadWidth: 980, columnWidth: 480, gap: 20, divisor: 2 }, 1000)).toEqual(
            [
                [0, 480],
                [500, 980],
                [1000, 1480],
                [1500, 1980],
            ],
        );
    });

    it("maps single-column layouts by columnWidth plus gap", () => {
        expect(
            pagesFor({ spreadWidth: 1082, columnWidth: 1000, gap: 82, divisor: 1 }, 3000),
        ).toEqual([
            [0, 1000],
            [1082, 2082],
            [2164, 3164],
        ]);
    });

    it("accumulates floating point error for dpr-derived fractional widths", () => {
        // CHARACTERIZATION: 疑似缺陷 — 1001/1.25 = 800.8，第 3 頁 end 為 2402.3999999999996，
        // 與下一頁 start 相同值但與理論 2402.4 不同。
        const pages = pagesFor(
            { spreadWidth: 800.8, columnWidth: 800.8, gap: 0, divisor: 1 },
            2402.4,
        );

        expect(pages).toHaveLength(4);
        expect(pages[2][1]).toBe(2402.3999999999996);
        expect(pages[3][0]).toBe(2402.3999999999996);
    });

    it("gives identical page ranges for rtl and vertical axes (direction is not used)", () => {
        const layout = { spreadWidth: 200, columnWidth: 100, gap: 0, divisor: 2 };
        const ltr = pagesFor(layout, 400, "ltr", "horizontal");

        expect(pagesFor(layout, 400, "rtl", "horizontal")).toEqual(ltr);
        expect(pagesFor(layout, 400, "rtl", "vertical")).toEqual(ltr);
    });
});

describe("Mapping characterization: text range selection per direction", () => {
    const node = {};

    function withRanges(mapping, rects) {
        const ranges = fakeRanges(rects);
        mapping.splitTextNodeIntoRanges = () => ranges;
        return ranges;
    }

    it("ltr start picks the first range whose left edge is at or after start", () => {
        const mapping = new Mapping({}, "ltr", "horizontal");
        const ranges = withRanges(mapping, [{ left: 90 }, { left: 100 }, { left: 150 }]);

        expect(mapping.findTextStartRange(node, 100, 200)).toBe(ranges[1]);
        expect(mapping.findTextStartRange(node, 99.5, 200)).toBe(ranges[1]);
        expect(mapping.findTextStartRange(node, 300, 400)).toBe(ranges[0]);
    });

    it("ltr end picks the range crossing the end edge or the previous one", () => {
        const mapping = new Mapping({}, "ltr", "horizontal");
        const ranges = withRanges(mapping, [
            { left: 0, right: 90 },
            { left: 90, right: 190 },
            { left: 201, right: 290 },
        ]);

        expect(mapping.findTextEndRange(node, 100, 200)).toBe(ranges[1]);
        expect(mapping.findTextEndRange(node, 0, 1000)).toBe(ranges[2]);
    });

    it("rtl start picks the first range whose right edge is at or before end", () => {
        const mapping = new Mapping({}, "rtl", "horizontal");
        const ranges = withRanges(mapping, [{ right: 300 }, { right: 200 }, { right: 100 }]);

        expect(mapping.findTextStartRange(node, 0, 200)).toBe(ranges[1]);
        expect(mapping.findTextStartRange(node, 0, 50)).toBe(ranges[0]);
    });

    it("rtl end picks the range that crosses start going leftwards", () => {
        const mapping = new Mapping({}, "rtl", "horizontal");
        const ranges = withRanges(mapping, [
            { left: 150, right: 200 },
            { left: 90, right: 150 },
            { left: 20, right: 90 },
        ]);

        expect(mapping.findTextEndRange(node, 100, 200)).toBe(ranges[1]);
    });

    it("vertical axis uses top/bottom and ignores direction (vertical-rl page order)", () => {
        const vertical = new Mapping({}, "rtl", "vertical");
        const ranges = withRanges(vertical, [
            { top: 0, bottom: 90 },
            { top: 100, bottom: 190 },
            { top: 210, bottom: 300 },
        ]);

        expect(vertical.findTextStartRange(node, 100, 200)).toBe(ranges[1]);
        expect(vertical.findTextEndRange(node, 100, 200)).toBe(ranges[1]);
    });

    it("falls back to the last range when the end edge is never reached", () => {
        const mapping = new Mapping({}, "ltr", "horizontal");
        const ranges = withRanges(mapping, [
            { left: 0, right: 10 },
            { left: 10, right: 20 },
        ]);

        expect(mapping.findTextEndRange(node, 0, 1000)).toBe(ranges[1]);
    });
});

describe("Mapping characterization: word splitting edges", () => {
    function textNode(text) {
        const body = parseMarkup(
            `<html xmlns="http://www.w3.org/1999/xhtml"><body><p>${text}</p></body></html>`,
            "application/xhtml+xml",
        ).body;
        return body.querySelector("p").firstChild;
    }

    const words = (text) =>
        new Mapping({}).splitTextNodeIntoRanges(textNode(text)).map((range) => range.toString());

    it("returns the whole node when there is no separator", () => {
        expect(words("single")).toEqual(["single"]);
    });

    it("drops words depending on position", () => {
        // CHARACTERIZATION: 疑似缺陷 — 單字切分會漏字：
        // "One two three" 只回傳 ["One", "three"]（漏 "two"），
        // "a b c d" 回傳 ["a", "c", "d"]（漏 "b"），
        // 分頁起迄範圍可能落在被跳過的詞上。
        expect(words("One two three")).toEqual(["One", "three"]);
        expect(words("a b c d")).toEqual(["a", "c", "d"]);
    });

    it("drops the last word when there are exactly two words", () => {
        // CHARACTERIZATION: 疑似缺陷 — "alpha beta" 只回傳 ["alpha"]，漏掉最後一個詞。
        expect(words("alpha beta")).toEqual(["alpha"]);
    });
});

import { describe, expect, it } from "vite-plus/test";
import Locations from "../../src/locations";

// 特性測試：斷言目前行為，不代表期望行為。
const CFIS = [
    "epubcfi(/6/2!/4/2/1:0)",
    "epubcfi(/6/2!/4/2/1:100)",
    "epubcfi(/6/4!/4/2/1:0)",
    "epubcfi(/6/6!/4/2/1:0)",
];

function loaded(cfis = CFIS) {
    const locations = new Locations();
    locations.load(cfis);
    return locations;
}

describe("Locations characterization: unloaded and degenerate sets", () => {
    it("reports -1 / null for an empty location set", () => {
        const locations = new Locations();

        expect(locations.length()).toBe(0);
        expect(locations.locationFromCfi(CFIS[0])).toBe(-1);
        expect(locations.percentageFromCfi(CFIS[0])).toBeNull();
    });

    it("sets total to -1 after loading an empty array", () => {
        const locations = loaded([]);

        expect(locations.total).toBe(-1);
        expect(locations.length()).toBe(0);
        expect(locations.percentageFromCfi(CFIS[0])).toBeNull();
    });

    it("builds a malformed CFI when asking for 100% of an empty set", () => {
        // CHARACTERIZATION: 疑似缺陷 — cfiFromPercentage(1) 在空集合讀取 _locations[-1]
        // (undefined) 並回傳無效字串 "epubcfi(/!/)"，而非 -1。
        expect(loaded([]).cfiFromPercentage(1)).toBe("epubcfi(/!/)");
    });

    it("single location: total is 0 so every percentage is 0 and 100% is the lone CFI", () => {
        // CHARACTERIZATION: 疑似缺陷 — 只有一個 location 的書（單頁 spine），
        // 讀到結尾時 percentageFromCfi 仍為 0，永遠不會是 1。
        const locations = loaded([CFIS[0]]);

        expect(locations.total).toBe(0);
        expect(locations.percentageFromLocation(0)).toBe(0);
        expect(locations.percentageFromCfi(CFIS[0])).toBe(0);
        expect(locations.percentageFromCfi(CFIS[3])).toBe(0);
        expect(locations.cfiFromPercentage(0)).toBe(CFIS[0]);
        expect(locations.cfiFromPercentage(0.5)).toBe(CFIS[0]);
        expect(locations.cfiFromPercentage(1)).toBe(CFIS[0]);
    });
});

describe("Locations characterization: location index conversion", () => {
    it("cfiFromLocation returns -1 outside bounds and for unparsable input", () => {
        const locations = loaded();

        expect(locations.cfiFromLocation(-1)).toBe(-1);
        expect(locations.cfiFromLocation(0)).toBe(CFIS[0]);
        expect(locations.cfiFromLocation(3)).toBe(CFIS[3]);
        expect(locations.cfiFromLocation(4)).toBe(-1);
        expect(locations.cfiFromLocation("2")).toBe(CFIS[2]);
        expect(locations.cfiFromLocation("abc")).toBe(-1);
        expect(locations.cfiFromLocation(NaN)).toBe(-1);
    });

    it("returns undefined for fractional indexes", () => {
        // CHARACTERIZATION: 疑似缺陷 — 1.5 通過邊界檢查但 _locations[1.5] 為 undefined，
        // 型別簽章承諾 string | number。
        expect(loaded().cfiFromLocation(1.5)).toBeUndefined();
    });

    it("locationFromCfi clamps before/after the generated range", () => {
        const locations = loaded();

        expect(locations.locationFromCfi("epubcfi(/6/2!/2)")).toBe(0);
        expect(locations.locationFromCfi("epubcfi(/6/2!/4/2/1:50)")).toBe(1);
        expect(locations.locationFromCfi("epubcfi(/6/4!/4/2/1:0)")).toBe(2);
        expect(locations.locationFromCfi("epubcfi(/6/8!/4)")).toBe(3);
    });

    it("percentageFromLocation is not clamped to 0..1", () => {
        const locations = loaded();

        expect(locations.percentageFromLocation(0)).toBe(0);
        expect(locations.percentageFromLocation(3)).toBe(1);
        // CHARACTERIZATION: 疑似缺陷 — 超出範圍的 location 會產生 >1 或 <0 的百分比。
        expect(locations.percentageFromLocation(4)).toBeCloseTo(4 / 3, 10);
        expect(locations.percentageFromLocation(-1)).toBeCloseTo(-1 / 3, 10);
        expect(locations.percentageFromLocation(NaN)).toBe(0);
    });
});

describe("Locations characterization: percentage to CFI rounding", () => {
    it("rounds fractional positions up (ceil) to the next location", () => {
        const locations = loaded();

        expect(locations.cfiFromPercentage(0)).toBe(CFIS[0]);
        expect(locations.cfiFromPercentage(0.1)).toBe(CFIS[1]);
        expect(locations.cfiFromPercentage(0.25)).toBe(CFIS[1]);
        expect(locations.cfiFromPercentage(0.34)).toBe(CFIS[2]);
        expect(locations.cfiFromPercentage(0.5)).toBe(CFIS[2]);
        expect(locations.cfiFromPercentage(0.99)).toBe(CFIS[3]);
    });

    it("jumps to the collapsed last CFI at or above 1", () => {
        const locations = loaded();

        expect(locations.cfiFromPercentage(1)).toBe(CFIS[3]);
        expect(locations.cfiFromPercentage(1.5)).toBe(CFIS[3]);
    });

    it("returns -1 for negative and NaN percentages", () => {
        const locations = loaded();

        expect(locations.cfiFromPercentage(-0.5)).toBe(-1);
        expect(locations.cfiFromPercentage(NaN)).toBe(-1);
    });

    it("percentage and location round-trip drifts by one location for 1/3 steps", () => {
        const locations = loaded();
        const pct = locations.percentageFromLocation(1);

        // 1/3 → ceil(3 * 0.3333333333333333) = 1，剛好回到同一個 location。
        expect(locations.cfiFromPercentage(pct)).toBe(CFIS[1]);
    });
});

describe("Locations characterization: current location tracking", () => {
    it("ignores non number/string values", () => {
        const locations = loaded();
        const events = [];

        locations.on("changed", (payload) => events.push(payload));
        locations.setCurrent();
        locations.setCurrent(null);

        expect(events).toEqual([]);
        expect(locations.getCurrent()).toBe(0);
    });

    it("emits percentages for numeric and CFI inputs", () => {
        const locations = loaded();
        const events = [];

        locations.on("changed", (payload) => events.push(payload.percentage));
        locations.setCurrent(2);
        locations.setCurrent(CFIS[3]);

        expect(events).toEqual([2 / 3, 1]);
        expect(locations.getCurrent()).toBe(3);
        expect(locations._currentCfi).toBe(CFIS[3]);
    });

    it("emits out-of-range percentages without clamping", () => {
        // CHARACTERIZATION: 疑似缺陷 — setCurrent(99) 發出 percentage 33，setCurrent(-1) 發出負值。
        const locations = loaded();
        const events = [];

        locations.on("changed", (payload) => events.push(payload.percentage));
        locations.setCurrent(99);
        locations.setCurrent(-1);

        expect(events).toEqual([33, -1 / 3]);
        expect(locations.getCurrent()).toBe(-1);
    });

    it("stores the value but emits nothing when no locations are loaded", () => {
        const locations = new Locations();
        const events = [];

        locations.on("changed", (payload) => events.push(payload));
        locations.setCurrent(3);
        locations.setCurrent(CFIS[0]);

        expect(events).toEqual([]);
        expect(locations.getCurrent()).toBe(3);
        expect(locations._currentCfi).toBe(CFIS[0]);
    });
});

describe("Locations characterization: load, save and word counting", () => {
    it("loads from a JSON string and saves back identically", () => {
        const locations = new Locations();

        locations.load(JSON.stringify(CFIS));

        expect(locations.total).toBe(3);
        expect(locations.save()).toBe(JSON.stringify(CFIS));
    });

    it("throws on invalid JSON", () => {
        expect(() => new Locations().load("notjson")).toThrow();
    });

    it("counts whitespace-separated words", () => {
        const locations = new Locations();

        expect(locations.countWords("")).toBe(1);
        expect(locations.countWords("  a  b ")).toBe(2);
        expect(locations.countWords("a\nb\tc")).toBe(1);
        // CHARACTERIZATION: 疑似缺陷 — 空字串算 1 個字；換行 / tab 分隔不被視為分隔，
        // "a\nb\tc" 計為 1 個字（而非 3）。CJK 無空白分詞，此處為 2 只因含空白。
        expect(locations.countWords("中文 字")).toBe(2);
    });
});

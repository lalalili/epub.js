import { describe, expect, it } from "vite-plus/test";
import EpubCFI from "../../src/epubcfi";

// 特性測試：斷言目前行為，不代表期望行為。
describe("EpubCFI characterization: parsing edges", () => {
    const cfi = new EpubCFI();

    it("returns spinePos -1 for non-string and empty input", () => {
        expect(cfi.parse(null)).toEqual({ spinePos: -1 });
        expect(cfi.parse(undefined)).toEqual({ spinePos: -1 });
        expect(cfi.parse("")).toEqual({ spinePos: -1 });
    });

    it("throws a TypeError from parse() for non-CFI strings", () => {
        // CHARACTERIZATION: 疑似缺陷 — parse() 對非 "!" 或無效字串丟出 TypeError，
        // 而空字串 / 非字串則回傳 { spinePos: -1 }，行為不一致。
        expect(() => cfi.parse("garbage")).toThrow(TypeError);
        expect(() => cfi.parse("epubcfi(/6)")).toThrow(TypeError);
    });

    it("rejects invalid constructor input and keeps CFI-less construction", () => {
        expect(() => new EpubCFI("junk")).toThrow("not a valid argument for EpubCFI");
        // 預設 spinePos 為 0（相容性），不是 -1。
        expect(new EpubCFI().spinePos).toBe(0);
    });

    it("recognizes CFI strings only with the full epubcfi(...) wrapper", () => {
        expect(cfi.isCfiString("epubcfi(/6/4!/4)")).toBe(true);
        expect(cfi.isCfiString("epubcfi(/6/4!/4")).toBe(false);
        expect(cfi.isCfiString("/6/4!/4")).toBe(false);
        expect(cfi.isCfiString(5)).toBe(false);
    });

    it("derives spine position from the second base step", () => {
        expect(new EpubCFI("epubcfi(/6/4!/4)").spinePos).toBe(1);
        expect(new EpubCFI("epubcfi(/6/2!/4)").spinePos).toBe(0);
        expect(new EpubCFI("epubcfi(/6/10[x]!/4)").spinePos).toBe(4);
    });

    it("parses steps: even=element, odd=text, ids, zero and negative numbers", () => {
        expect(cfi.parseStep("2")).toEqual({ type: "element", index: 0, id: null });
        expect(cfi.parseStep("1")).toEqual({ type: "text", index: 0, id: null });
        expect(cfi.parseStep("4[a]")).toEqual({ type: "element", index: 1, id: "a" });
        expect(cfi.parseStep("4[]")).toEqual({ type: "element", index: 1, id: null });
        expect(cfi.parseStep("abc")).toBeUndefined();
        // CHARACTERIZATION: 疑似缺陷 — "/0" 與負數步驟不被拒絕，產生負的 index。
        expect(cfi.parseStep("0")).toEqual({ type: "element", index: -1, id: null });
        expect(cfi.parseStep("-2")).toEqual({ type: "element", index: -2, id: null });
    });

    it("parses terminals: offsets, assertions, non-numeric and fractional values", () => {
        expect(cfi.parseTerminal("5").offset).toBe(5);
        expect(cfi.parseTerminal("5[xyz]")).toEqual({ offset: 5, assertion: "xyz" });
        expect(cfi.parseTerminal("abc").offset).toBeNull();
        // CHARACTERIZATION: 疑似缺陷 — 負偏移與小數偏移被接受 / 截斷，沒有驗證。
        expect(cfi.parseTerminal("-3").offset).toBe(-3);
        expect(cfi.parseTerminal("1.5").offset).toBe(1);
    });

    it("splits range components and rejects incomplete ranges", () => {
        expect(cfi.getRange("/6/4!/4,/1:0,/1:5")).toEqual(["/1:0", "/1:5"]);
        expect(cfi.getRange("/6/4!/4")).toBe(false);
        expect(cfi.getRange("/6/4!/4,/1:0")).toBe(false);
    });

    it("checkType returns false for non-CFI values", () => {
        expect(cfi.checkType(null)).toBe(false);
        expect(cfi.checkType(5)).toBe(false);
        expect(cfi.checkType({})).toBe(false);
        expect(cfi.checkType(new EpubCFI("epubcfi(/6/4!/4)"))).toBe("EpubCFI");
    });

    it("generates chapter components and flags non-numeric positions", () => {
        expect(cfi.generateChapterComponent(0, 0)).toBe("/2/2");
        expect(cfi.generateChapterComponent(2, 3, "a")).toBe("/6/8[a]");
        // CHARACTERIZATION: 疑似缺陷 — 非數字 pos 產生 "NaN" 字面量的 CFI 片段。
        expect(cfi.generateChapterComponent(0, "x", "id")).toBe("/2/NaN[id]");
    });

    it("compares steps for equality by type and index", () => {
        expect(cfi.equalStep(null, null)).toBe(false);
        expect(cfi.equalStep({ type: "element", index: 1 }, { type: "element", index: 1 })).toBe(
            true,
        );
        expect(cfi.equalStep({ type: "element", index: 1 }, { type: "text", index: 1 })).toBe(
            false,
        );
    });

    it("translates steps to xpath and query selectors", () => {
        const steps = [
            { type: "element", index: 1, id: null },
            { type: "text", index: 0, id: null },
            { type: "element", index: 2, id: "x" },
        ];

        expect(cfi.stepsToXpath(steps)).toBe("./*/*[2]/text()[1]/*[position()=3 and @id='x']");
        expect(cfi.stepsToQuerySelector(steps)).toBe("html>*:nth-child(2)>#x");
    });
});

describe("EpubCFI characterization: compare and range edges", () => {
    const cfi = new EpubCFI();

    it("is symmetric for plain character offsets", () => {
        expect(cfi.compare("epubcfi(/6/4!/4/1:3)", "epubcfi(/6/4!/4/1:3)")).toBe(0);
        expect(cfi.compare("epubcfi(/6/4!/4/1:3)", "epubcfi(/6/4!/4/1:10)")).toBe(-1);
        expect(cfi.compare("epubcfi(/6/4!/4/1:10)", "epubcfi(/6/4!/4/1:3)")).toBe(1);
    });

    it("orders by spine position before anything else", () => {
        expect(cfi.compare("epubcfi(/6/2!/99)", "epubcfi(/6/4!/2)")).toBe(-1);
        expect(cfi.compare("epubcfi(/6/4!/2)", "epubcfi(/6/2!/99)")).toBe(1);
    });

    it("treats a shorter (less specific) path as earlier than its descendant", () => {
        expect(cfi.compare("epubcfi(/6/4!/4)", "epubcfi(/6/4!/4/1:0)")).toBe(-1);
        expect(cfi.compare("epubcfi(/6/4!/4/1:0)", "epubcfi(/6/4!/4)")).toBe(1);
    });

    it("ignores assertion ids when comparing", () => {
        expect(cfi.compare("epubcfi(/6/4[a]!/4)", "epubcfi(/6/4[b]!/4)")).toBe(0);
    });

    it("compares a range by its start only and ignores its end", () => {
        expect(cfi.compare("epubcfi(/6/4!/4,/1:0,/1:5)", "epubcfi(/6/4!/4,/1:0,/1:9)")).toBe(0);
        expect(cfi.compare("epubcfi(/6/4!/4,/1:0,/1:5)", "epubcfi(/6/4!/4/1:0)")).toBe(0);
    });

    it("conflates the text step /3 with the element step /2 (same index)", () => {
        // CHARACTERIZATION: 疑似缺陷 — compare 只比較 index，不比較 type；
        // text 節點 /1 與 element /2 (index 皆為 0) 被視為相等。
        expect(cfi.compare("epubcfi(/6/4!/4/1)", "epubcfi(/6/4!/4/2)")).toBe(0);
        expect(cfi.compare("epubcfi(/6/4!/4/3)", "epubcfi(/6/4!/4/2)")).toBe(1);
        expect(cfi.compare("epubcfi(/6/4!/4/2)", "epubcfi(/6/4!/4/3)")).toBe(-1);
    });

    it("throws when comparing an invalid CFI string", () => {
        expect(() => cfi.compare("junk", "epubcfi(/6/4!/4)")).toThrow();
    });

    it("round-trips range strings and collapses to the requested end", () => {
        const range = new EpubCFI("epubcfi(/6/4[ch]!/4,/1:0,/1:5)");

        expect(range.range).toBe(true);
        expect(range.toString()).toBe("epubcfi(/6/4[ch]!/4,/1:0,/1:5)");

        const toEnd = new EpubCFI("epubcfi(/6/4!/4,/1:0,/1:5)");
        toEnd.collapse();
        expect(toEnd.toString()).toBe("epubcfi(/6/4!/4/1:5)");

        const toStart = new EpubCFI("epubcfi(/6/4!/4,/1:0,/1:5)");
        toStart.collapse(true);
        expect(toStart.toString()).toBe("epubcfi(/6/4!/4/1:0)");
    });

    it("leaves non-range CFIs unchanged when collapsing", () => {
        const point = new EpubCFI("epubcfi(/6/4!/4/1:2)");
        point.collapse();
        expect(point.toString()).toBe("epubcfi(/6/4!/4/1:2)");
    });
});

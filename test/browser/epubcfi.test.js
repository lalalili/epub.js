import { describe, expect, it } from "vitest";
import EpubCFI from "../../src/epubcfi.js";

describe("EpubCFI", () => {
	it("parses a cfi on init", () => {
		var cfi = new EpubCFI("epubcfi(/6/2[cover]!/6)");

		expect(cfi.spinePos).toBe(0);
	});

	it("ignores the base when parsing a cfi on init", () => {
		var cfi = new EpubCFI("epubcfi(/6/2[cover]!/6)", "/6/6[end]");

		expect(cfi.spinePos).toBe(0);
	});

	describe("#parse()", () => {
		var cfi = new EpubCFI();

		it("parses a cfi", () => {
			var parsed = cfi.parse("epubcfi(/6/2[cover]!/6)");

			expect(parsed.spinePos).toBe(0);
		});

		it("ignores the base if present", () => {
			var parsed = cfi.parse("epubcfi(/6/2[cover]!/6)", "/6/6[end]");

			expect(parsed.spinePos).toBe(0);
		});

		it("parses a character offset", () => {
			var parsed = cfi.parse("epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)");

			expect(parsed.path.terminal.offset).toBe(3);
		});

		it("parses a range", () => {
			var parsed = cfi.parse("epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)");

			expect(parsed.range).toBe(true);
			expect(parsed.start.steps.length).toBe(2);
			expect(parsed.end.steps.length).toBe(1);
			expect(parsed.start.terminal.offset).toBe(1);
			expect(parsed.end.terminal.offset).toBe(4);
		});
	});

	describe("#toString()", () => {
		it("round-trips parsed cfi strings", () => {
			expect(new EpubCFI("epubcfi(/6/2[cover]!/6)").toString()).toBe("epubcfi(/6/2[cover]!/6)");
			expect(new EpubCFI("epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)").toString()).toBe("epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)");
			expect(new EpubCFI("epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)").toString()).toBe("epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)");
		});
	});

	describe("#checkType()", () => {
		it("determines the type of a cfi string", () => {
			var cfi = new EpubCFI();

			expect(cfi.checkType("epubcfi(/6/2[cover]!/6)")).toBe("string");
			expect(cfi.checkType("/6/2[cover]!/6")).toBe(false);
		});

		it("determines the type of a cfi", () => {
			var ogcfi = new EpubCFI("epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)");
			var cfi = new EpubCFI();

			expect(cfi.checkType(ogcfi)).toBe("EpubCFI");
		});

		it("determines the type of a node", () => {
			var cfi = new EpubCFI();
			var el = document.createElement("div");

			expect(cfi.checkType(el)).toBe("node");
		});

		it("determines the type of a range", () => {
			var cfi = new EpubCFI();
			var range = document.createRange();

			expect(cfi.checkType(range)).toBe("range");
		});
	});

	describe("#compare()", () => {
		it("compares CFIs", () => {
			var epubcfi = new EpubCFI();

			expect(epubcfi.compare("epubcfi(/6/4[cover]!/4)", "epubcfi(/6/2[cover]!/4)")).toBe(1);
			expect(epubcfi.compare("epubcfi(/6/4[cover]!/4)", "epubcfi(/6/6[cover]!/4)")).toBe(-1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/8/2)", "epubcfi(/6/2[cover]!/6)")).toBe(1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/2)", "epubcfi(/6/2[cover]!/6)")).toBe(-1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/8/2)", "epubcfi(/6/2[cover]!/6/4/2/2)")).toBe(1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/4)", "epubcfi(/6/2[cover]!/6/4/2/2)")).toBe(-1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/6)", "epubcfi(/6/2[cover]!/4/6/8/1:0)")).toBe(-1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/6/8)", "epubcfi(/6/2[cover]!/6/2)")).toBe(1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/20)", "epubcfi(/6/2[cover]!/6/10)")).toBe(-1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/5)", "epubcfi(/6/2[cover]!/4/3)")).toBe(1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/7)", "epubcfi(/6/2[cover]!/4/13)")).toBe(-1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/5:1)", "epubcfi(/6/2[cover]!/4/5:0)")).toBe(1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/5:2)", "epubcfi(/6/2[cover]!/4/5:30)")).toBe(-1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/8/5:1)", "epubcfi(/6/2[cover]!/4/6/15:2)")).toBe(1);
			expect(epubcfi.compare("epubcfi(/6/2[cover]!/4/8/1:0)", "epubcfi(/6/2[cover]!/4/8/1:0)")).toBe(0);
			expect(epubcfi.compare(
				"epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/10/1:317)",
				"epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/10/2[page18]/1:0)"
			)).toBe(-1);
			expect(epubcfi.compare(
				"epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/12/1:0)",
				"epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/12/2/1:9)"
			)).toBe(-1);
			expect(epubcfi.compare(
				"epubcfi(/6/16!/4/12/1:0)",
				"epubcfi(/6/16!/4/12/2/1:9)"
			)).toBe(-1);
		});
	});
});

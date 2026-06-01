import { describe, expect, it } from "vitest";
import EpubCFI from "../../src/epubcfi.js";
import chapter from "../fixtures/chapter1.xhtml?raw";
import chapterHighlights from "../fixtures/chapter1-highlights.xhtml?raw";
import highlightContents from "../fixtures/highlight.xhtml?raw";

function parseXhtml(markup) {
	return new DOMParser().parseFromString(markup, "application/xhtml+xml");
}

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

	describe("#fromNode()", () => {
		var base = "/6/4[chap01ref]";
		var doc = parseXhtml(chapterHighlights);

		it("gets a cfi from a p node", () => {
			var span = doc.getElementById("c001p0004");
			var cfi = new EpubCFI(span, base);

			expect(span.nodeType).toBe(Node.ELEMENT_NODE);
			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004])");
		});

		it("gets a cfi from a text node", () => {
			var t = doc.getElementById("c001p0004").childNodes[0];
			var cfi = new EpubCFI(t, base);

			expect(t.nodeType).toBe(Node.TEXT_NODE);
			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1)");
		});

		it("gets a cfi from a text node inside a highlight", () => {
			var t = doc.getElementById("highlight-1").childNodes[0];
			var cfi = new EpubCFI(t, base, "annotator-hl");

			expect(t.nodeType).toBe(Node.TEXT_NODE);
			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1)");
		});

		it("gets a cfi from a highlight node", () => {
			var t = doc.getElementById("highlight-1");
			var cfi = new EpubCFI(t, base, "annotator-hl");

			expect(t.nodeType).toBe(Node.ELEMENT_NODE);
			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017])");
		});
	});

	describe("#fromRange()", () => {
		var base = "/6/4[chap01ref]";
		var doc = parseXhtml(chapter);
		var docHighlights = parseXhtml(chapterHighlights);
		var docHighlightsAlice = parseXhtml(highlightContents);

		it("gets a cfi from a collapsed range", () => {
			var t1 = doc.getElementById("c001p0004").childNodes[0];
			var range = doc.createRange();
			var cfi;

			range.setStart(t1, 6);

			cfi = new EpubCFI(range, base);

			expect(cfi.range).toBe(false);
			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)");
		});

		it("gets a cfi from a range", () => {
			var t1 = doc.getElementById("c001p0004").childNodes[0];
			var t2 = doc.getElementById("c001p0007").childNodes[0];
			var range = doc.createRange();
			var cfi;

			range.setStart(t1, 6);
			range.setEnd(t2, 27);

			cfi = new EpubCFI(range, base);

			expect(cfi.range).toBe(true);
			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)");
		});

		it("gets a cfi from a range with offset 0", () => {
			var t1 = doc.getElementById("c001p0004").childNodes[0];
			var range = doc.createRange();
			var cfi;

			range.setStart(t1, 0);
			range.setEnd(t1, 1);

			cfi = new EpubCFI(range, base);

			expect(cfi.range).toBe(true);
			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004],/1:0,/1:1)");
		});

		it("gets a cfi from a range inside a highlight", () => {
			var t1 = docHighlights.getElementById("highlight-1").childNodes[0];
			var range = docHighlights.createRange();
			var cfi;

			range.setStart(t1, 6);

			cfi = new EpubCFI(range, base, "annotator-hl");

			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1:43)");
		});

		it("gets a cfi from a range past a highlight", () => {
			var t1 = docHighlights.getElementById("c001s0001").childNodes[1];
			var range = docHighlights.createRange();
			var cfi;

			range.setStart(t1, 25);

			cfi = new EpubCFI(range, base, "annotator-hl");

			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/4/2[c001s0001]/1:41)");
		});

		it("gets a cfi from a range in between two highlights", () => {
			var t1 = docHighlightsAlice.getElementById("p2").childNodes[1];
			var range = docHighlightsAlice.createRange();
			var cfi;

			range.setStart(t1, 4);

			cfi = new EpubCFI(range, base, "annotator-hl");

			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/4[p2]/1:123)");
		});

		it("correctly counts text nodes independent of any elements present in between", () => {
			var t1 = docHighlightsAlice.getElementById("p3").childNodes[2];
			var range = docHighlightsAlice.createRange();
			var cfi;

			range.setStart(t1, 4);

			cfi = new EpubCFI(range, base);

			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/6[p3]/3:4)");
		});
	});

	describe("#toRange()", () => {
		var base = "/6/4[chap01ref]";
		var doc = parseXhtml(chapterHighlights);

		it("gets a range from a cfi", () => {
			var t1 = doc.getElementById("c001p0004").childNodes[0];
			var ogRange = doc.createRange();
			var cfi;
			var newRange;

			ogRange.setStart(t1, 6);

			cfi = new EpubCFI(ogRange, base);

			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)");

			newRange = cfi.toRange(doc);

			expect(newRange.startContainer).toBe(t1);
			expect(newRange.startOffset).toBe(6);
			expect(newRange.collapsed).toBe(true);
		});

		it("gets a range from a cfi with a range", () => {
			var t1 = doc.getElementById("c001p0004").childNodes[0];
			var t2 = doc.getElementById("c001p0007").childNodes[0];
			var ogRange = doc.createRange();
			var cfi;
			var newRange;

			ogRange.setStart(t1, 6);
			ogRange.setEnd(t2, 27);

			cfi = new EpubCFI(ogRange, base);

			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)");

			newRange = cfi.toRange(doc);

			expect(newRange.startContainer).toBe(t1);
			expect(newRange.startOffset).toBe(6);
			expect(newRange.endContainer).toBe(t2);
			expect(newRange.endOffset).toBe(27);
			expect(newRange.collapsed).toBe(false);
		});

		it("gets a range from a cfi inside a highlight", () => {
			var t1 = doc.getElementById("highlight-1").childNodes[0];
			var ogRange = doc.createRange();
			var cfi;
			var newRange;

			ogRange.setStart(t1, 6);

			cfi = new EpubCFI(ogRange, base, "annotator-hl");

			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1:43)");

			newRange = cfi.toRange(doc, "annotator-hl");

			expect(newRange.startContainer).toBeTruthy();
			expect(newRange.startContainer).toBe(t1);
			expect(newRange.startOffset).toBe(6);
		});

		it("gets a range from a cfi inside a highlight range", () => {
			var t1 = doc.getElementById("highlight-2").childNodes[0];
			var t2 = doc.getElementById("c001s0001").childNodes[1];
			var ogRange = doc.createRange();
			var cfi;
			var newRange;

			ogRange.setStart(t1, 5);
			ogRange.setEnd(t2, 25);

			cfi = new EpubCFI(ogRange, base, "annotator-hl");

			expect(cfi.toString()).toBe("epubcfi(/6/4[chap01ref]!/4/2/4/2[c001s0001],/1:5,/1:41)");

			newRange = cfi.toRange(doc, "annotator-hl");

			expect(newRange.startContainer.textContent).toBe(t1.textContent);
		});

		it("clamps out-of-range offsets from stored cfi to a safe range", () => {
			var cfi = new EpubCFI("epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:9999)");
			var newRange = cfi.toRange(doc);

			expect(newRange).toBeTruthy();
			expect(newRange.startContainer).toBeTruthy();
			expect(newRange.startOffset).toBeGreaterThanOrEqual(0);
			expect(newRange.startOffset).toBeLessThanOrEqual(newRange.startContainer.textContent.length);
		});
	});
});

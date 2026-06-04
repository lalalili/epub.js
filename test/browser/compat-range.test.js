import { describe, expect, it } from "vitest";
import { RangeObject } from "../../src/compat/range";
import { RangeObject as LegacyRangeObject } from "../../src/utils/core";
import EpubCFI from "../../src/epubcfi";
import chapterHighlights from "../fixtures/chapter1-highlights.xhtml?raw";

function parseXhtml(markup) {
	return new DOMParser().parseFromString(markup, "application/xhtml+xml");
}

describe("RangeObject compatibility boundary", function() {
	it("sets range boundaries and common ancestor containers", function() {
		var doc = parseXhtml("<root><p>One</p><p>Two</p></root>");
		var firstText = doc.getElementsByTagName("p")[0].childNodes[0];
		var secondText = doc.getElementsByTagName("p")[1].childNodes[0];
		var range = new RangeObject();

		range.setStart(firstText, 1);
		range.setEnd(secondText, 2);

		expect(range.startContainer).toBe(firstText);
		expect(range.startOffset).toBe(1);
		expect(range.endContainer).toBe(secondText);
		expect(range.endOffset).toBe(2);
		expect(range.collapsed).toBe(false);
		expect(range.commonAncestorContainer).toBe(doc.documentElement);
	});

	it("collapses to the end boundary when end is set first", function() {
		var doc = parseXhtml("<root><p>One</p></root>");
		var text = doc.getElementsByTagName("p")[0].childNodes[0];
		var range = new RangeObject();

		range.setEnd(text, 2);

		expect(range.collapsed).toBe(true);
		expect(range.startContainer).toBe(text);
		expect(range.startOffset).toBe(2);
		expect(range.endContainer).toBe(text);
		expect(range.endOffset).toBe(2);
		expect(range.commonAncestorContainer).toBe(text.parentNode);
	});

	it("selects nodes and node contents", function() {
		var doc = parseXhtml("<root><p>One</p><p>Two</p></root>");
		var paragraph = doc.getElementsByTagName("p")[0];
		var text = paragraph.childNodes[0];
		var range = new RangeObject();

		range.selectNode(paragraph);
		expect(range.startContainer).toBe(doc.documentElement);
		expect(range.startOffset).toBe(0);
		expect(range.endOffset).toBe(1);

		range.selectNodeContents(text);
		expect(range.startContainer).toBe(text);
		expect(range.startOffset).toBe(0);
		expect(range.endContainer).toBe(text);
		expect(range.endOffset).toBe(3);

		range.selectNodeContents(paragraph);
		expect(range.startContainer).toBe(paragraph);
		expect(range.endContainer).toBe(paragraph);
		expect(range.endOffset).toBe(1);
	});

	it("keeps legacy core export compatible", function() {
		var range = new LegacyRangeObject();

		expect(range).toBeInstanceOf(LegacyRangeObject);
		expect(range).toBeInstanceOf(RangeObject);
	});

	it("supports EpubCFI.toRange fallback when createRange is unavailable", function() {
		var base = "/6/4[chap01ref]";
		var doc = parseXhtml(chapterHighlights);
		var text = doc.getElementById("c001p0004").childNodes[0];
		var nativeRange = doc.createRange();
		var cfi;
		var fallbackRange;

		nativeRange.setStart(text, 6);
		cfi = new EpubCFI(nativeRange, base);
		doc.createRange = undefined;
		fallbackRange = cfi.toRange(doc);

		expect(fallbackRange).toBeInstanceOf(RangeObject);
		expect(fallbackRange.startContainer).toBe(text);
		expect(fallbackRange.startOffset).toBe(6);
		expect(fallbackRange.collapsed).toBe(true);
	});
});

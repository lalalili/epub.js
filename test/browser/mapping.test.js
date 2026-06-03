import { describe, expect, it } from "vitest";
import Mapping from "../../src/mapping";
import { parseMarkup } from "../../src/platform/parser";

describe("Mapping", () => {
	function createMapping(direction = "ltr", axis = "horizontal") {
		return new Mapping({
			spreadWidth: 200,
			columnWidth: 100,
			gap: 0,
			divisor: 1
		}, direction, axis);
	}

	function parseBody(markup) {
		return parseMarkup(
			`<html xmlns="http://www.w3.org/1999/xhtml"><body>${markup}</body></html>`,
			"application/xhtml+xml"
		).body;
	}

	it("switches axis using the legacy boolean contract", () => {
		var mapping = createMapping();

		expect(mapping.axis()).toBe(true);
		expect(mapping.axis("vertical")).toBe(false);
		expect(mapping.axis("horizontal")).toBe(true);
	});

	it("returns undefined when page mapping has no document body", () => {
		var mapping = createMapping();

		expect(mapping.page(null, "/6/4[chap01ref]", 0, 100)).toBeUndefined();
		expect(mapping.page({}, "/6/4[chap01ref]", 0, 100)).toBeUndefined();
	});

	it("splits text nodes into word ranges", () => {
		var mapping = createMapping();
		var body = parseBody("<p>One two three</p>");
		var textNode = body.querySelector("p").firstChild;
		var ranges = mapping.splitTextNodeIntoRanges(textNode);

		expect(ranges.map(function(range) {
			return range.toString();
		})).toEqual(["One", "three"]);
	});

	it("creates CFI pairs from range pairs", () => {
		var mapping = createMapping();
		var body = parseBody("<p>One two three</p>");
		var textNode = body.querySelector("p").firstChild;
		var start = body.ownerDocument.createRange();
		var end = body.ownerDocument.createRange();

		start.setStart(textNode, 0);
		start.setEnd(textNode, 3);
		end.setStart(textNode, 4);
		end.setEnd(textNode, 7);

		var pair = mapping.rangePairToCfiPair("/6/4[chap01ref]", { start, end });

		expect(pair.start).toMatch(/^epubcfi\(\/6\/4\[chap01ref\]!/);
		expect(pair.end).toMatch(/^epubcfi\(\/6\/4\[chap01ref\]!/);
		expect(pair.start).not.toBe(pair.end);
	});
});

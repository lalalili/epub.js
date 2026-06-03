import { describe, expect, it } from "vitest";
import {
	getParserConstructor,
	parseMarkup,
	stripByteOrderMark
} from "../../src/platform/parser";
import { parse as coreParse } from "../../src/utils/core";

describe("browser parser platform boundary", () => {
	it("uses the native DOMParser by default in browser environments", () => {
		expect(getParserConstructor(false)).toBe(DOMParser);
	});

	it("can force XMLDOMParser for legacy core compatibility", () => {
		var doc = parseMarkup(
			"<?xml version=\"1.0\"?><html xmlns=\"http://www.w3.org/1999/xhtml\"><body><p>Text</p></body></html>",
			"application/xhtml+xml",
			true
		);

		expect(doc.documentElement.nodeName).toBe("html");
		expect(doc.getElementsByTagName("p")[0].textContent).toBe("Text");
	});

	it("strips a leading byte order mark before parsing", () => {
		var markup = "\uFEFF<html><body><p>Text</p></body></html>";

		expect(stripByteOrderMark(markup).charCodeAt(0)).not.toBe(0xFEFF);
		expect(parseMarkup(markup, "text/html").querySelector("p").textContent).toBe("Text");
	});

	it("keeps the legacy core parse export aligned", () => {
		var markup = "<html><body><p>Core</p></body></html>";
		var platformDoc = parseMarkup(markup, "text/html");
		var coreDoc = coreParse(markup, "text/html");

		expect(coreDoc.querySelector("p").textContent).toBe(platformDoc.querySelector("p").textContent);
	});
});

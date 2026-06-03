import { describe, expect, it } from "vitest";
import {
	replaceBase,
	replaceCanonical,
	replaceLinks,
	replaceMeta,
	substitute
} from "../../src/utils/replacements";

function createHtmlDocument(markup) {
	return new DOMParser().parseFromString(markup, "text/html");
}

describe("replacements", function() {
	it("adds and updates the base href for a section", function() {
		var doc = createHtmlDocument("<html><head></head><body></body></html>");

		replaceBase(doc, { url: "/OPS/chapter.xhtml" });

		expect(doc.querySelector("base").getAttribute("href")).toBe(window.location.origin + "/OPS/chapter.xhtml");

		replaceBase(doc, { url: "https://example.com/book/chapter.xhtml" });

		expect(doc.querySelectorAll("base").length).toBe(1);
		expect(doc.querySelector("base").getAttribute("href")).toBe("https://example.com/book/chapter.xhtml");
	});

	it("adds or updates canonical and identifier metadata", function() {
		var doc = createHtmlDocument("<html><head></head><body></body></html>");

		replaceCanonical(doc, { canonical: "https://example.com/books/one" });
		replaceMeta(doc, { idref: "chapter-1" });

		expect(doc.querySelector("link[rel='canonical']").getAttribute("href")).toBe("https://example.com/books/one");
		expect(doc.querySelector("meta[name='dc.identifier']").getAttribute("content")).toBe("chapter-1");

		replaceCanonical(doc, { canonical: "https://example.com/books/two" });
		replaceMeta(doc, { idref: "chapter-2" });

		expect(doc.querySelectorAll("link[rel='canonical']").length).toBe(1);
		expect(doc.querySelector("link[rel='canonical']").getAttribute("href")).toBe("https://example.com/books/two");
		expect(doc.querySelector("meta[name='dc.identifier']").getAttribute("content")).toBe("chapter-2");
	});

	it("rewrites local links through the provided callback", function() {
		var doc = createHtmlDocument("<html><head><base href=\"https://example.com/OEBPS/Text/chapter.xhtml\"></head><body><a href=\"../notes.xhtml#n1\">note</a><a href=\"mailto:test@example.com\">mail</a></body></html>");
		var links = doc.querySelectorAll("a");
		var clickedHref;

		replaceLinks(doc.body, function(href) {
			clickedHref = href;
		});

		links[0].onclick();

		expect(clickedHref).toBe("/OEBPS/notes.xhtml#n1");
		expect(links[1].onclick).toBe(null);
	});

	it("keeps same-document hash links scoped to the current section href", function() {
		var doc = createHtmlDocument("<html><head></head><body><a href=\"#footnote-1\">note</a></body></html>");
		var clickedHref;

		replaceLinks(doc.body, function(href) {
			clickedHref = href;
		}, "OEBPS/Text/Section0005.xhtml");

		doc.querySelector("a").onclick();

		expect(clickedHref).toBe("OEBPS/Text/Section0005.xhtml#footnote-1");
	});

	it("marks absolute links as external targets", function() {
		var doc = createHtmlDocument("<html><head></head><body><a href=\"https://example.com/page\">external</a></body></html>");

		replaceLinks(doc.body, function() {});

		expect(doc.querySelector("a").getAttribute("target")).toBe("_blank");
	});

	it("substitutes escaped resource URLs", function() {
		expect(substitute(
			"url(images/cover(1).jpg) url(images/cover(1).jpg)",
			["images/cover(1).jpg"],
			["blob:cover"]
		)).toBe("url(blob:cover) url(blob:cover)");
	});
});

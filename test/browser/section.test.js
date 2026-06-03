import { describe, expect, it } from "vitest";
import ePub from "../../src/epub";
import Section from "../../src/section";
import { fixtureUrl } from "./helpers/fixtures";

function stripChapterAssertion(cfi) {
	return cfi.replace(/\[[^\]]+\](?=!)/g, "");
}

async function withSection(href, callback) {
	var book = ePub(fixtureUrl("alice/OPS/package.opf"), { width: 400, height: 400 });

	try {
		await book.ready;

		var section = book.section(href);
		await section.load();

		return callback(section);
	} finally {
		book.destroy();
	}
}

function expectSingleResult(results) {
	expect(results.length).toBe(1);
	expect(stripChapterAssertion(results[0].cfi)).toBe("epubcfi(/6/8!/4/2/16,/1:275,/1:323)");
	expect(results[0].excerpt).toBe("... see anything; then she looked at the sides of the well and\n\t\tnoticed that they were filled with cupboards and book-shelves; here and there she saw\n\t\t...");
}

function expectMultipleResults(results) {
	expect(results.length).toBe(2);
	expect(stripChapterAssertion(results[0].cfi)).toBe("epubcfi(/6/8!/4/2/8,/1:240,/1:252)");
	expect(results[0].excerpt).toBe("...e worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her....");
	expect(stripChapterAssertion(results[1].cfi)).toBe("epubcfi(/6/8!/4/2/20,/1:148,/1:160)");
	expect(results[1].excerpt).toBe("...ut it was\n\t\tall dark overhead; before her was another long passage and the White Rabbit was still\n\t\tin sight, hurrying down it. There was not a moment...");
}

function createMockSection(overrides) {
	return new Section(Object.assign({
		idref: "chapter",
		linear: "yes",
		properties: [],
		index: 0,
		href: "chapter.xhtml",
		url: "/OPS/chapter.xhtml",
		canonical: "canonical/chapter.xhtml",
		mediaType: "application/xhtml+xml",
		originalHref: "chapter.xhtml",
		originalMediaType: "application/xhtml+xml",
		fallback: undefined,
		fallbackChain: [],
		next: function() {},
		prev: function() {},
		cfiBase: "/6/2"
	}, overrides || {}));
}

function createSectionDocument() {
	return new DOMParser().parseFromString("<html><head></head><body><p id=\"p1\">Hello world</p></body></html>", "application/xhtml+xml");
}

describe("section", () => {
	it("finds a single result in a section", async () => {
		await withSection("chapter_001.xhtml", (section) => {
			var queryString = "they were filled with cupboards and book-shelves";
			var findResults = section.find(queryString);
			var searchResults = section.search(queryString);

			[findResults, searchResults].forEach(expectSingleResult);
		});
	});

	it("finds multiple results in a section", async () => {
		await withSection("chapter_001.xhtml", (section) => {
			var queryString = "white rabbit";
			var findResults = section.find(queryString);
			var searchResults = section.search(queryString);

			[findResults, searchResults].forEach(expectMultipleResults);
		});
	});

	it("finds a multi-node result with the tag at the ending", async () => {
		await withSection("chapter_010.xhtml", (section) => {
			var queryString = "I beg";
			var findResult = section.find(queryString);
			var searchResults = section.search(queryString);

			expect(findResult.length).toBe(0);
			expect(searchResults.length).toBe(1);
			expect(stripChapterAssertion(searchResults[0].cfi)).toBe("epubcfi(/6/26!/4/2/6,/1:5,/2/1:3)");
			expect(searchResults[0].excerpt).toBe("\"Oh, I beg");
		});
	});

	it("finds a multi-node result with the tag at the middle", async () => {
		await withSection("chapter_010.xhtml", (section) => {
			var queryString = "I beg your pardon";
			var findResult = section.find(queryString);
			var searchResults = section.search(queryString);

			expect(findResult.length).toBe(0);
			expect(searchResults.length).toBe(1);
			expect(stripChapterAssertion(searchResults[0].cfi)).toBe("epubcfi(/6/26!/4/2/6,/1:5,/3:12)");
			expect(searchResults[0].excerpt).toBe("\"Oh, I beg your pardon!\" she exclaimed in a tone of great dismay.");
		});
	});

	it("loads once, runs content hooks, and adds a base tag for the section URL", async () => {
		var section = createMockSection();
		var calls = 0;

		section.hooks.content.register(function(doc, loadedSection) {
			loadedSection.base();
			doc.documentElement.setAttribute("data-hooked", "yes");
		});

		var contents = await section.load(function() {
			calls += 1;
			return Promise.resolve(createSectionDocument());
		});
		var cachedContents = await section.load(function() {
			calls += 1;
			return Promise.reject(new Error("cached load should not request again"));
		});

		expect(calls).toBe(1);
		expect(contents).toBe(cachedContents);
		expect(section.document.querySelector("base").getAttribute("href")).toContain("/OPS/chapter.xhtml");
		expect(section.document.documentElement.getAttribute("data-hooked")).toBe("yes");
	});

	it("renders serialized contents after serialize hooks mutate output", async () => {
		var section = createMockSection();

		section.hooks.serialize.register(function(output, renderedSection) {
			renderedSection.output = output.replace("Hello world", "Hooked world");
		});

		var output = await section.render(function() {
			return Promise.resolve(createSectionDocument());
		});

		expect(output).toContain("Hooked world");
	});

	it("reconciles rendition layout properties and clears state on unload and destroy", async () => {
		var section = createMockSection({
			properties: ["rendition:layout-pre-paginated", "rendition:spread-none", "rendition:orientation-landscape"]
		});
		var layout = section.reconcileLayoutSettings({
			layout: "reflowable",
			spread: "auto",
			orientation: "auto"
		});

		expect(layout).toEqual({
			layout: "pre-paginated",
			spread: "none",
			orientation: "landscape"
		});

		await section.load(function() {
			return Promise.resolve(createSectionDocument());
		});

		section.unload();

		expect(section.document).toBeUndefined();
		expect(section.contents).toBeUndefined();
		expect(section.output).toBeUndefined();

		section.destroy();

		expect(section.hooks).toBeUndefined();
		expect(section.idref).toBeUndefined();
		expect(section.cfiBase).toBeUndefined();
	});
});

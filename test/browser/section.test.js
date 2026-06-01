import { describe, expect, it } from "vitest";
import ePub from "../../src/epub";
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
});

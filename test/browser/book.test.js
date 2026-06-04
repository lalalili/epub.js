import { describe, expect, it } from "vitest";
import Book from "../../src/book";
import { expectBlobUrl, expectFixtureUrl, fixtureUrl } from "./helpers/fixtures";

describe("Book", () => {
	it("keeps options-only construction and public defaults stable", () => {
		var canonicalCalls = [];
		var book = new Book({
			replacements: "blobUrl",
			canonical: function(path) {
				canonicalCalls.push(path);
				return "canonical:" + path;
			}
		});

		try {
			expect(book.isOpen).toBe(false);
			expect(book.isRendered).toBe(false);
			expect(book.archived).toBe(false);
			expect(book.settings.replacements).toBe("blobUrl");
			expect(book.spine).toBeTruthy();
			expect(book.locations).toBeTruthy();
			expect(book.navigation).toBeUndefined();
			expect(book.pageList).toBeUndefined();
			expect(book.determineType("OPS/package.opf")).toBe("opf");
			expect(book.determineType("manifest.json?cache=1")).toBe("json");
			expect(book.determineType("book.epub")).toBe("epub");
			expect(book.determineType("OPS/")).toBe("directory");
			expect(book.determineType(new ArrayBuffer(0))).toBe("binary");
			expect(book.canonical("OPS/chapter.xhtml")).toBe("canonical:OPS/chapter.xhtml");
			expect(canonicalCalls).toEqual(["OPS/chapter.xhtml"]);
		} finally {
			book.destroy();
		}
	});

	it("resolves relative and absolute paths against the open package path", () => {
		var book = new Book();

		try {
			book.url = {
				resolve(path) {
					return "https://example.test/books/" + path;
				}
			};
			book.path = {
				resolve(path) {
					return "OPS/" + path;
				}
			};

			expect(book.resolve("chapter.xhtml")).toBe("https://example.test/books/OPS/chapter.xhtml");
			expect(book.resolve("chapter.xhtml", false)).toBe("OPS/chapter.xhtml");
			expect(book.resolve("https://cdn.test/chapter.xhtml")).toBe("https://cdn.test/chapter.xhtml");
			expect(book.resolve()).toBeUndefined();
		} finally {
			book.destroy();
		}
	});

	it("opens an unpacked EPUB package document", async () => {
		var book = new Book(fixtureUrl("alice/OPS/package.opf"));

		try {
			await book.opened;
			await book.ready;

			expect(book.isOpen).toBe(true);
			expect(book.url.toString()).toBe(fixtureUrl("alice/OPS/package.opf"));
		} finally {
			book.destroy();
		}
	});

	it("resolves open with the book instance", async () => {
		var book = new Book();

		try {
			var opened = await book.open(fixtureUrl("alice/OPS/package.opf"));
			await book.ready;

			expect(opened).toBe(book);
			expect(book.isOpen).toBe(true);
		} finally {
			book.destroy();
		}
	});

	it("resolves the local cover URL for an unpacked EPUB", async () => {
		var book = new Book(fixtureUrl("alice/OPS/package.opf"));

		try {
			await book.opened;
			await book.ready;

			expectFixtureUrl(await book.coverUrl(), "alice/OPS/images/cover_th.jpg");
		} finally {
			book.destroy();
		}
	});

	it("opens an archived EPUB", async () => {
		var book = new Book(fixtureUrl("alice.epub"));

		try {
			await book.opened;
			await book.ready;

			expect(book.isOpen).toBe(true);
			expect(book.archive).toBeTruthy();
		} finally {
			book.destroy();
		}
	});

	it("resolves a blob cover URL for an archived EPUB", async () => {
		var book = new Book(fixtureUrl("alice.epub"));

		try {
			await book.opened;
			await book.ready;

			expectBlobUrl(await book.coverUrl());
		} finally {
			book.destroy();
		}
	});

	it("opens an archived EPUB from an ArrayBuffer without options", async () => {
		var response = await fetch(fixtureUrl("alice.epub"));
		var buffer = await response.arrayBuffer();
		var book = new Book(buffer);

		try {
			await book.opened;
			await book.ready;

			expect(book.isOpen).toBe(true);
			expect(book.archive).toBeTruthy();
		} finally {
			book.destroy();
		}
	});

	it("resolves a blob cover URL for an archived EPUB from an ArrayBuffer", async () => {
		var response = await fetch(fixtureUrl("alice.epub"));
		var buffer = await response.arrayBuffer();
		var book = new Book(buffer);

		try {
			await book.opened;
			await book.ready;

			expectBlobUrl(await book.coverUrl());
		} finally {
			book.destroy();
		}
	});

	it("resolves a DOM range for a section CFI", async () => {
		var book = new Book(fixtureUrl("alice/OPS/package.opf"));

		try {
			await book.opened;
			await book.ready;

			var section = book.section(3);
			await section.load(book.load.bind(book));
			var result = section.search("Alice")[0];
			expect(result).toBeTruthy();
			var range = await book.getRange(result.cfi);

			expect(range).toBeTruthy();
			expect(range.toString()).toContain("Alice");
		} finally {
			book.destroy();
		}
	});

	it("opens an archived EPUB without a cover", async () => {
		var book = new Book(fixtureUrl("alice_without_cover.epub"));

		try {
			await book.opened;
			await book.ready;

			expect(book.isOpen).toBe(true);
			expect(book.archive).toBeTruthy();
		} finally {
			book.destroy();
		}
	});

	it("resolves a null cover URL for an archived EPUB without a cover", async () => {
		var book = new Book(fixtureUrl("alice_without_cover.epub"));

		try {
			await book.opened;
			await book.ready;

			expect(await book.coverUrl()).toBeNull();
		} finally {
			book.destroy();
		}
	});
});

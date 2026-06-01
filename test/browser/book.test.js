import { describe, expect, it } from "vitest";
import Book from "../../src/book";
import { expectBlobUrl, expectFixtureUrl, fixtureUrl } from "./helpers/fixtures";

describe("Book", () => {
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

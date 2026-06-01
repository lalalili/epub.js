import { describe, expect, it } from "vitest";
import ePub from "../../src/epub";
import { fixtureUrl } from "./helpers/fixtures";

describe("ePub", () => {
	it("opens an unpacked EPUB package document", async () => {
		var packageUrl = fixtureUrl("alice/OPS/package.opf");
		var book = ePub(packageUrl);

		try {
			await book.opened;
			await book.ready;

			expect(book.isOpen).toBe(true);
			expect(book.url.toString()).toBe(packageUrl);
		} finally {
			book.destroy();
		}
	});

	it("opens an archived EPUB", async () => {
		var book = ePub(fixtureUrl("alice.epub"));

		try {
			await book.opened;
			await book.ready;

			expect(book.isOpen).toBe(true);
			expect(book.archive).toBeTruthy();
		} finally {
			book.destroy();
		}
	});
});

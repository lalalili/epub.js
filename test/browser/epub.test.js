import { describe, expect, it } from "vitest";
import ePub from "../../src/epub";

describe("ePub", () => {
	it("opens an unpacked EPUB package document", async () => {
		var packageUrl = new URL("../fixtures/alice/OPS/package.opf", import.meta.url);
		var book = ePub(packageUrl.toString());

		try {
			await book.opened;
			await book.ready;

			expect(book.isOpen).toBe(true);
			expect(book.url.toString()).toBe(packageUrl.toString());
		} finally {
			book.destroy();
		}
	});

	it("opens an archived EPUB", async () => {
		var epubUrl = new URL("../fixtures/alice.epub", import.meta.url);
		var book = ePub(epubUrl.toString());

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

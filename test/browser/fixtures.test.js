import { describe, expect, it } from "vitest";

describe("browser fixture serving", () => {
	it("serves unpacked EPUB fixture files through the Vite module URL", async () => {
		var packageUrl = new URL("../fixtures/alice/OPS/package.opf", import.meta.url);
		var response = await fetch(packageUrl);
		var text = await response.text();

		expect(response.ok).toBe(true);
		expect(text).toContain("<package");
		expect(text).toContain("Alice's Adventures in Wonderland");
	});

	it("serves archived EPUB fixture files through the Vite module URL", async () => {
		var epubUrl = new URL("../fixtures/alice.epub", import.meta.url);
		var response = await fetch(epubUrl);
		var buffer = await response.arrayBuffer();
		var bytes = new Uint8Array(buffer.slice(0, 4));

		expect(response.ok).toBe(true);
		expect(bytes).toEqual(new Uint8Array([0x50, 0x4b, 0x03, 0x04]));
	});
});

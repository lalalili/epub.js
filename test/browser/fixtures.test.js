import { describe, expect, it } from "vitest";
import { fixtureUrl } from "./helpers/fixtures";

describe("browser fixture serving", () => {
	it("serves unpacked EPUB fixture files through the Vite module URL", async () => {
		var response = await fetch(fixtureUrl("alice/OPS/package.opf"));
		var text = await response.text();

		expect(response.ok).toBe(true);
		expect(text).toContain("<package");
		expect(text).toContain("Alice's Adventures in Wonderland");
	});

	it("serves archived EPUB fixture files through the Vite module URL", async () => {
		var response = await fetch(fixtureUrl("alice.epub"));
		var buffer = await response.arrayBuffer();
		var bytes = new Uint8Array(buffer.slice(0, 4));

		expect(response.ok).toBe(true);
		expect(bytes).toEqual(new Uint8Array([0x50, 0x4b, 0x03, 0x04]));
	});
});

import { describe, expect, it } from "vitest";
import ePub, {
	Book,
	Contents,
	EpubCFI,
	Layout,
	Rendition,
	request
} from "../../src/index.js";

describe("browser public api", () => {
	it("exposes the package root exports in a real browser", () => {
		expect(typeof ePub).toBe("function");
		expect(ePub.Book).toBe(Book);
		expect(ePub.Rendition).toBe(Rendition);
		expect(ePub.Contents).toBe(Contents);
		expect(ePub.CFI).toBe(EpubCFI);
		expect(typeof ePub.VERSION).toBe("string");

		expect(typeof Book).toBe("function");
		expect(typeof Rendition).toBe("function");
		expect(typeof Contents).toBe("function");
		expect(typeof EpubCFI).toBe("function");
		expect(typeof Layout).toBe("function");
		expect(typeof request).toBe("function");
	});
});

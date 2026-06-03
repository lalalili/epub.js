import { describe, expect, it } from "vitest";
import mime, { isXml } from "../../src/utils/mime";
import { isXml as legacyIsXml } from "../../src/utils/core";

describe("mime helpers", function() {
	it("looks up mime types by filename extension", function() {
		expect(mime.lookup("chapter.xhtml")).toBe("application/xhtml+xml");
		expect(mime.lookup("cover.jpg")).toBe("image/jpeg");
		expect(mime.lookup("styles.css")).toBe("text/css");
		expect(mime.lookup("unknown.unknown")).toBe("text/plain");
	});

	it("detects XML-based EPUB resource extensions", function() {
		expect(isXml("xml")).toBe(true);
		expect(isXml("opf")).toBe(true);
		expect(isXml("ncx")).toBe(true);
		expect(isXml("xhtml")).toBe(false);
		expect(isXml("html")).toBe(false);
		expect(legacyIsXml("opf")).toBe(isXml("opf"));
		expect(legacyIsXml("xhtml")).toBe(isXml("xhtml"));
	});
});

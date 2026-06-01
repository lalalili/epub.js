import { describe, expect, it } from "vitest";
import Locations from "../../src/locations";
import * as core from "../../src/utils/core";
import chapter from "../fixtures/locations.xhtml?raw";

describe("Locations", () => {
	function parseLocations(markup, ignoreClass) {
		var doc = core.parse(markup, "application/xhtml+xml", ignoreClass);
		var contents = doc.documentElement;
		var locations = new Locations();

		return locations.parse(contents, "/6/4[chap01ref]", 100);
	}

	it("parses locations from a browser document", () => {
		var result = parseLocations(chapter, false);

		expect(result.length).toBe(15);
	});

	it("parses locations from xmldom", () => {
		var result = parseLocations(chapter, true);

		expect(result.length).toBe(15);
	});

	it("creates at least one location for no-readable-text sections", () => {
		var chapterWithoutReadableText = "<?xml version='1.0' encoding='utf-8'?><html xmlns='http://www.w3.org/1999/xhtml'><body>\n<img src='cover.jpg' alt='cover'/>\n</body></html>";
		var doc = core.parse(chapterWithoutReadableText, "application/xhtml+xml");
		var contents = doc.documentElement;
		var locations = new Locations();
		var result = locations.parse(contents, "/6/2[coverref]", 100);

		expect(result.length).toBeGreaterThanOrEqual(1);
	});

	it("creates a fallback location for image-only sections without text nodes", () => {
		var imageOnlyChapter = "<?xml version='1.0' encoding='utf-8'?><html xmlns='http://www.w3.org/1999/xhtml'><body><img src='cover.jpg' alt='cover'/></body></html>";
		var doc = core.parse(imageOnlyChapter, "application/xhtml+xml");
		var contents = doc.documentElement;
		var locations = new Locations();
		var result = locations.parse(contents, "/6/2[coverref]", 100);

		expect(result.length).toBe(1);
		expect(result[0].indexOf("epubcfi(/6/2[coverref]!")).toBe(0);
	});

	it("creates a fallback location for empty sections", () => {
		var emptyChapter = "<?xml version='1.0' encoding='utf-8'?><html xmlns='http://www.w3.org/1999/xhtml'><body></body></html>";
		var doc = core.parse(emptyChapter, "application/xhtml+xml");
		var contents = doc.documentElement;
		var locations = new Locations();
		var result = locations.parse(contents, "/6/2[emptyref]", 100);

		expect(result.length).toBe(1);
		expect(result[0].indexOf("epubcfi(/6/2[emptyref]!")).toBe(0);
	});
});

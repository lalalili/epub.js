import { describe, expect, it } from "vitest";
import Locations from "../../src/locations";
import EpubCFI from "../../src/epubcfi";
import { parseMarkup } from "../../src/platform/parser";
import chapter from "../fixtures/locations.xhtml?raw";

describe("Locations", () => {
	function parseLocations(markup, ignoreClass) {
		var doc = parseMarkup(markup, "application/xhtml+xml", ignoreClass);
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
		var doc = parseMarkup(chapterWithoutReadableText, "application/xhtml+xml");
		var contents = doc.documentElement;
		var locations = new Locations();
		var result = locations.parse(contents, "/6/2[coverref]", 100);

		expect(result.length).toBeGreaterThanOrEqual(1);
	});

	it("creates a fallback location for image-only sections without text nodes", () => {
		var imageOnlyChapter = "<?xml version='1.0' encoding='utf-8'?><html xmlns='http://www.w3.org/1999/xhtml'><body><img src='cover.jpg' alt='cover'/></body></html>";
		var doc = parseMarkup(imageOnlyChapter, "application/xhtml+xml");
		var contents = doc.documentElement;
		var locations = new Locations();
		var result = locations.parse(contents, "/6/2[coverref]", 100);

		expect(result.length).toBe(1);
		expect(result[0].indexOf("epubcfi(/6/2[coverref]!")).toBe(0);
	});

	it("creates a fallback location for empty sections", () => {
		var emptyChapter = "<?xml version='1.0' encoding='utf-8'?><html xmlns='http://www.w3.org/1999/xhtml'><body></body></html>";
		var doc = parseMarkup(emptyChapter, "application/xhtml+xml");
		var contents = doc.documentElement;
		var locations = new Locations();
		var result = locations.parse(contents, "/6/2[emptyref]", 100);

		expect(result.length).toBe(1);
		expect(result[0].indexOf("epubcfi(/6/2[emptyref]!")).toBe(0);
	});

	it("maps CFIs to generated location indexes", () => {
		var result = parseLocations(chapter, false);
		var locations = new Locations();

		locations.load(result);

		expect(locations.locationFromCfi(result[0])).toBe(0);
		expect(locations.locationFromCfi(result[result.length - 1])).toBe(result.length - 1);
		expect(locations.percentageFromCfi(result[result.length - 1])).toBe(1);
	});

	it("inserts generated section locations through CFI ordering", () => {
		var firstDoc = parseMarkup(chapter, "application/xhtml+xml");
		var secondDoc = parseMarkup(chapter, "application/xhtml+xml");
		var locations = new Locations();
		var firstSection = {
			cfiBase: "/6/2[first]",
			index: 0,
			linear: true,
			load: function() {
				return Promise.resolve(firstDoc.documentElement);
			},
			unload: function() {}
		};
		var secondSection = {
			cfiBase: "/6/4[second]",
			index: 1,
			linear: true,
			load: function() {
				return Promise.resolve(secondDoc.documentElement);
			},
			unload: function() {}
		};

		locations.load(locations.parse(secondDoc.documentElement, secondSection.cfiBase, 400));

		return locations.generateForSection(firstSection, 400).then(function(result) {
			expect(result[0].indexOf("epubcfi(/6/2[first]!")).toBe(0);
			expect(result[result.length - 1].indexOf("epubcfi(/6/4[second]!")).toBe(0);
		});
	});

	it("creates word-based locations from a start CFI", () => {
		var doc = parseMarkup(chapter, "application/xhtml+xml");
		var locations = new Locations();
		var startCfi = new EpubCFI(doc.querySelector("p"), "/6/4[chap01ref]").toString();
		var section = {
			cfiBase: "/6/4[chap01ref]",
			index: 0
		};
		var result = locations.parseWords(doc.documentElement, section, 10, new EpubCFI(startCfi));

		expect(result.length).toBeGreaterThan(0);
		expect(result[0].cfi.indexOf("epubcfi(/6/4[chap01ref]!")).toBe(0);
	});

	it("loads and saves generated location arrays", () => {
		var result = parseLocations(chapter, false);
		var locations = new Locations();
		var loaded = locations.load(JSON.stringify(result));

		expect(loaded).toEqual(result);
		expect(locations.length()).toBe(result.length);
		expect(JSON.parse(locations.save())).toEqual(result);
		expect(locations.cfiFromLocation(0)).toBe(result[0]);
		expect(locations.cfiFromLocation("0")).toBe(result[0]);
		expect(locations.cfiFromLocation(-1)).toBe(-1);
	});

	it("maps percentages to CFIs and keeps current location events", () => {
		var result = parseLocations(chapter, false);
		var locations = new Locations();
		var eventPayload;

		locations.load(result);
		locations.on("changed", function(payload) {
			eventPayload = payload;
		});

		expect(locations.percentageFromLocation(0)).toBe(0);
		expect(locations.cfiFromPercentage(0)).toBe(result[0]);
		expect(locations.cfiFromPercentage(1)).toMatch(/^epubcfi\(/);

		locations.currentLocation = result[result.length - 1];

		expect(locations.getCurrent()).toBe(result.length - 1);
		expect(eventPayload.percentage).toBe(1);
	});

	it("clears queued work and state on destroy", () => {
		var locations = new Locations();

		locations.destroy();

		expect(locations.q).toBeUndefined();
		expect(locations.epubcfi).toBeUndefined();
		expect(locations._locations).toBeUndefined();
	});
});

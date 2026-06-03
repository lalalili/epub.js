import { describe, expect, it } from "vitest";
import Packaging from "../../src/packaging";
import Spine from "../../src/spine";

describe("Spine", () => {
	function unpackPackage(markup) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(markup, "application/xml");
		var packaging = new Packaging(doc).parse(doc);
		var spine = new Spine();

		spine.unpack(
			packaging,
			function(href) {
				return "resolved:" + href;
			},
			function(href) {
				return "canonical:" + href;
			}
		);

		return spine;
	}

	function unpackNavigationPackage() {
		return unpackPackage(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">spine-nav-test</dc:identifier>
					<dc:title>Spine Navigation Test</dc:title>
					<dc:language>en</dc:language>
				</metadata>
				<manifest>
					<item id="cover" href="Text/cover.xhtml" media-type="application/xhtml+xml" />
					<item id="chapter-1" href="Text/chapter 1.xhtml" media-type="application/xhtml+xml" />
					<item id="notes" href="Text/notes.xhtml" media-type="application/xhtml+xml" />
					<item id="chapter-2" href="Text/chapter-2.xhtml" media-type="application/xhtml+xml" />
				</manifest>
				<spine>
					<itemref idref="cover" linear="no" />
					<itemref idref="chapter-1" />
					<itemref idref="notes" linear="no" />
					<itemref idref="chapter-2" />
				</spine>
			</package>`);
	}

	it("uses a renderable manifest fallback for foreign spine items", () => {
		var spine = unpackPackage(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">spine-fallback-test</dc:identifier>
					<dc:title>Spine Fallback Test</dc:title>
					<dc:language>en</dc:language>
				</metadata>
				<manifest>
					<item id="video" href="video.webm" media-type="video/webm" fallback="video-fallback" properties="remote-resources" />
					<item id="video-fallback" href="fallback.xhtml" media-type="application/xhtml+xml" properties="scripted" />
				</manifest>
				<spine>
					<itemref idref="video" />
				</spine>
			</package>`);
		var section = spine.get(0);

		expect(section.href).toBe("fallback.xhtml");
		expect(section.url).toBe("resolved:fallback.xhtml");
		expect(section.canonical).toBe("canonical:fallback.xhtml");
		expect(section.originalHref).toBe("video.webm");
		expect(section.mediaType).toBe("application/xhtml+xml");
		expect(section.originalMediaType).toBe("video/webm");
		expect(section.fallbackChain).toEqual(["video-fallback"]);
		expect(section.properties).toEqual(["remote-resources", "scripted"]);
		expect(spine.get("fallback.xhtml")).toBe(section);
		expect(spine.get("video.webm")).toBe(section);
		expect(spine.get("video.webm#t=10")).toBe(section);
	});

	it("indexes sections by href, encoded href, idref, numeric target, and CFI", () => {
		var spine = unpackNavigationPackage();
		var firstLinear = spine.get(1);

		expect(spine.get()).toBe(firstLinear);
		expect(spine.get("Text/chapter 1.xhtml")).toBe(firstLinear);
		expect(spine.get("Text/chapter%201.xhtml")).toBe(firstLinear);
		expect(spine.get("Text/chapter 1.xhtml#frag")).toBe(firstLinear);
		expect(spine.get("#chapter-1")).toBe(firstLinear);
		expect(spine.get("1")).toBe(firstLinear);
		expect(spine.get("epubcfi(/6/4!/4/2/2)")).toBe(firstLinear);
		expect(spine.get("missing.xhtml")).toBeNull();
	});

	it("walks only linear sections for next, prev, first, and last", () => {
		var spine = unpackNavigationPackage();
		var cover = spine.get(0);
		var chapterOne = spine.get(1);
		var notes = spine.get(2);
		var chapterTwo = spine.get(3);

		expect(cover.linear).toBe(false);
		expect(notes.linear).toBe(false);
		expect(spine.first()).toBe(chapterOne);
		expect(spine.last()).toBe(chapterTwo);
		expect(chapterOne.prev()).toBeUndefined();
		expect(chapterOne.next()).toBe(chapterTwo);
		expect(chapterTwo.prev()).toBe(chapterOne);
		expect(chapterTwo.next()).toBeUndefined();
		expect(notes.prev()).toBeUndefined();
		expect(notes.next()).toBeUndefined();
	});

	it("iterates, removes lookup aliases, and clears state on destroy", () => {
		var spine = unpackNavigationPackage();
		var hrefs = [];
		var chapterOne = spine.get(1);

		spine.each(function(section) {
			hrefs.push(section.href);
		});

		expect(hrefs).toEqual([
			"Text/cover.xhtml",
			"Text/chapter 1.xhtml",
			"Text/notes.xhtml",
			"Text/chapter-2.xhtml"
		]);

		expect(spine.remove(chapterOne)[0]).toBe(chapterOne);
		expect(spine.get("Text/chapter 1.xhtml")).toBeNull();
		expect(spine.get("Text/chapter%201.xhtml")).toBeNull();
		expect(spine.get("#chapter-1")).toBeNull();

		spine.destroy();

		expect(spine.spineItems).toBeUndefined();
		expect(spine.spineByHref).toBeUndefined();
		expect(spine.hooks).toBeUndefined();
		expect(spine.loaded).toBe(false);
	});
});

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
});

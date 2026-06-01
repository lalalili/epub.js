import { describe, expect, it } from "vitest";
import Packaging from "../../src/packaging";

describe("Packaging", () => {
	function parsePackage(markup) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(markup, "application/xml");

		return new Packaging(doc).parse(doc);
	}

	it("preserves manifest fallback and media overlay idrefs", () => {
		var parsed = parsePackage(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">fallback-test</dc:identifier>
					<dc:title>Fallback Test</dc:title>
					<dc:language>en</dc:language>
				</metadata>
				<manifest>
					<item id="video" href="video.webm" media-type="video/webm" fallback="video-fallback" properties="remote-resources scripted" />
					<item id="video-fallback" href="fallback.xhtml" media-type="application/xhtml+xml" fallback="text-fallback" media-overlay="mo1" />
					<item id="text-fallback" href="fallback.txt" media-type="text/plain" />
					<item id="mo1" href="overlay.smil" media-type="application/smil+xml" />
				</manifest>
				<spine>
					<itemref idref="video-fallback" />
				</spine>
			</package>`);

		expect(parsed.manifest.video.fallback).toBe("video-fallback");
		expect(parsed.manifest.video.fallbackChain).toEqual(["video-fallback", "text-fallback"]);
		expect(parsed.manifest["video-fallback"].fallbackChain).toEqual(["text-fallback"]);
		expect(parsed.manifest["text-fallback"].fallbackChain).toEqual([]);
		expect(parsed.manifest.video.properties).toEqual(["remote-resources", "scripted"]);
		expect(parsed.manifest["video-fallback"].overlay).toBe("mo1");
		expect(parsed.manifest["video-fallback"].mediaOverlay).toBe("mo1");
	});

	it("stops manifest fallback chains before cycles repeat", () => {
		var parsed = parsePackage(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">fallback-cycle-test</dc:identifier>
					<dc:title>Fallback Cycle Test</dc:title>
					<dc:language>en</dc:language>
				</metadata>
				<manifest>
					<item id="primary" href="primary.bin" media-type="application/octet-stream" fallback="secondary" />
					<item id="secondary" href="secondary.bin" media-type="application/octet-stream" fallback="primary" />
				</manifest>
				<spine>
					<itemref idref="primary" />
				</spine>
			</package>`);

		expect(parsed.manifest.primary.fallbackChain).toEqual(["secondary"]);
		expect(parsed.manifest.secondary.fallbackChain).toEqual(["primary"]);
	});
});

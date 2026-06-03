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

	it("parses navigation, NCX, cover, and spine node position", () => {
		var parsed = parsePackage(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">nav-cover-test</dc:identifier>
					<dc:title>Nav Cover Test</dc:title>
					<dc:language>en</dc:language>
				</metadata>
				<manifest>
					<item id="cover" href="images/cover.jpg" media-type="image/jpeg" properties="cover-image" />
					<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav" />
					<item id="toc" href="toc.ncx" media-type="application/x-dtbncx+xml" />
					<item id="chapter" href="chapter.xhtml" media-type="application/xhtml+xml" />
				</manifest>
				<spine toc="toc">
					<itemref idref="chapter" />
				</spine>
			</package>`);

		expect(parsed.navPath).toBe("nav.xhtml");
		expect(parsed.ncxPath).toBe("toc.ncx");
		expect(parsed.coverPath).toBe("images/cover.jpg");
		expect(parsed.spineNodeIndex).toBe(2);
		expect(parsed.spine[0].idref).toBe("chapter");
	});

	it("falls back to EPUB 2 cover metadata and spine toc NCX references", () => {
		var parsed = parsePackage(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">epub2-test</dc:identifier>
					<dc:title>EPUB 2 Test</dc:title>
					<meta name="cover" content="cover-image" />
				</metadata>
				<manifest>
					<item id="cover-image" href="cover.png" media-type="image/png" />
					<item id="toc-id" href="legacy-toc.ncx" media-type="application/xml" />
					<item id="chapter" href="chapter.xhtml" media-type="application/xhtml+xml" />
				</manifest>
				<spine toc="toc-id" page-progression-direction="rtl">
					<itemref id="chapter-ref" idref="chapter" linear="no" properties="page-spread-left" />
				</spine>
			</package>`);

		expect(parsed.coverPath).toBe("cover.png");
		expect(parsed.ncxPath).toBe("legacy-toc.ncx");
		expect(parsed.metadata.direction).toBe("rtl");
		expect(parsed.spine[0]).toEqual({
			id: "chapter-ref",
			idref: "chapter",
			linear: "no",
			properties: ["page-spread-left"],
			index: 0
		});
	});

	it("parses rendition metadata properties and the unique identifier", () => {
		var packaging = new Packaging();
		var parsed = packaging.parse(new DOMParser().parseFromString(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">metadata-test-id</dc:identifier>
					<dc:title>Metadata Test</dc:title>
					<dc:creator>Author</dc:creator>
					<dc:description>Description</dc:description>
					<dc:date>2026-06-03</dc:date>
					<dc:publisher>Publisher</dc:publisher>
					<dc:language>zh-TW</dc:language>
					<dc:rights>Rights</dc:rights>
					<meta property="dcterms:modified">2026-06-03T00:00:00Z</meta>
					<meta property="rendition:layout">pre-paginated</meta>
					<meta property="rendition:orientation">landscape</meta>
					<meta property="rendition:flow">scrolled-doc</meta>
					<meta property="rendition:viewport">width=1200,height=800</meta>
					<meta property="media:active-class">-epub-media-overlay-active</meta>
					<meta property="rendition:spread">none</meta>
				</metadata>
				<manifest>
					<item id="chapter" href="chapter.xhtml" media-type="application/xhtml+xml" />
				</manifest>
				<spine>
					<itemref idref="chapter" />
				</spine>
			</package>`, "application/xml"));

		expect(packaging.uniqueIdentifier).toBe("metadata-test-id");
		expect(parsed.metadata).toEqual(expect.objectContaining({
			title: "Metadata Test",
			creator: "Author",
			description: "Description",
			pubdate: "2026-06-03",
			publisher: "Publisher",
			identifier: "metadata-test-id",
			language: "zh-TW",
			rights: "Rights",
			modified_date: "2026-06-03T00:00:00Z",
			layout: "pre-paginated",
			orientation: "landscape",
			flow: "scrolled-doc",
			viewport: "width=1200,height=800",
			media_active_class: "-epub-media-overlay-active",
			spread: "none"
		}));
	});

	it("loads JSON manifests and clears state on destroy", () => {
		var packaging = new Packaging();
		var parsed = packaging.load({
			metadata: { title: "JSON Manifest" },
			readingOrder: [
				{ href: "chapter1.xhtml" },
				{ href: "chapter2.xhtml", linear: "no" }
			],
			resources: [
				{ href: "cover.jpg", rel: ["cover"] },
				{ href: "style.css" }
			],
			toc: [
				{ href: "chapter1.xhtml", title: "Chapter 1" }
			]
		});

		expect(parsed.metadata.title).toBe("JSON Manifest");
		expect(parsed.spine).toEqual([
			{ href: "chapter1.xhtml", index: 0, linear: "yes" },
			{ href: "chapter2.xhtml", index: 1, linear: "no" }
		]);
		expect(parsed.manifest[0].href).toBe("cover.jpg");
		expect(parsed.coverPath).toBe("cover.jpg");
		expect(parsed.toc[0].label).toBe("Chapter 1");

		packaging.destroy();

		expect(packaging.manifest).toBeUndefined();
		expect(packaging.metadata).toBeUndefined();
		expect(packaging.spine).toBeUndefined();
	});
});

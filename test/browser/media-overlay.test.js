import { describe, expect, it } from "vitest";
import {
	parseSmilClock,
	parseSmilDocument,
	resolveSmilHref
} from "../../src/media-overlay";

describe("Media Overlay SMIL parser", () => {
	it("normalizes nested seq and par text audio fragments", () => {
		var smil = `
			<smil xmlns="http://www.w3.org/ns/SMIL" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<seq id="chapter" epub:textref="../Text/chapter.xhtml">
						<seq id="section-1">
							<par id="p1">
								<text src="../Text/chapter.xhtml#frag-1" />
								<audio src="../Audio/chapter.mp3" clipBegin="00:00:01.000" clipEnd="00:00:04.500" />
							</par>
						</seq>
					</seq>
				</body>
			</smil>
		`;

		var overlay = parseSmilDocument(smil, { href: "OPS/Media/chapter.smil" });

		expect(overlay.href).toBe("OPS/Media/chapter.smil");
		expect(overlay.sequences).toHaveLength(1);
		expect(overlay.sequences[0]).toMatchObject({
			id: "chapter",
			textref: "../Text/chapter.xhtml",
			textrefHref: "OPS/Text/chapter.xhtml"
		});
		expect(overlay.fragments).toEqual([
			{
				id: "p1",
				sequencePath: ["chapter", "section-1"],
				text: {
					src: "../Text/chapter.xhtml#frag-1",
					href: "OPS/Text/chapter.xhtml#frag-1"
				},
				audio: {
					src: "../Audio/chapter.mp3",
					href: "OPS/Audio/chapter.mp3",
					clipBegin: "00:00:01.000",
					clipEnd: "00:00:04.500"
				}
			}
		]);
	});

	it("keeps text-only par fragments for product-level fallback", () => {
		var smil = `
			<smil>
				<body>
					<par id="text-only">
						<text src="chapter.xhtml#frag-2" />
					</par>
				</body>
			</smil>
		`;

		expect(parseSmilDocument(smil, { href: "OPS/Text/chapter.smil" }).fragments).toEqual([
			{
				id: "text-only",
				sequencePath: [],
				text: {
					src: "chapter.xhtml#frag-2",
					href: "OPS/Text/chapter.xhtml#frag-2"
				},
				audio: null
			}
		]);
	});

	it("parses prefixed SMIL tags when DOMParser rejects unbound prefixes", () => {
		var smil = `
			<smil:smil>
				<smil:body>
					<smil:seq id="s1">
						<smil:par id="p1">
							<smil:text src="../Text/c.xhtml#x" />
							<smil:audio src="../Audio/c.mp3" />
						</smil:par>
					</smil:seq>
				</smil:body>
			</smil:smil>
		`;

		expect(parseSmilDocument(smil, { href: "OPS/Media/c.smil" }).fragments[0]).toMatchObject({
			id: "p1",
			sequencePath: ["s1"],
			text: { href: "OPS/Text/c.xhtml#x" },
			audio: { href: "OPS/Audio/c.mp3" }
		});
	});

	it("returns a stable empty document for non-XML payloads", () => {
		expect(parseSmilDocument("not xml", { href: "OPS/Media/broken.smil" })).toEqual({
			href: "OPS/Media/broken.smil",
			sequences: [],
			fragments: []
		});
	});

	it("resolves relative EPUB hrefs and preserves external resources", () => {
		expect(resolveSmilHref("OPS/Media/chapter.smil", "../Text/chapter.xhtml#p1")).toBe(
			"OPS/Text/chapter.xhtml#p1"
		);
		expect(resolveSmilHref("OPS/Media/chapter.smil", "https://cdn.example.test/audio.mp3")).toBe(
			"https://cdn.example.test/audio.mp3"
		);
	});

	it("parses SMIL clock values to seconds", () => {
		expect(parseSmilClock("00:01:02.500")).toBe(62.5);
		expect(parseSmilClock("01:02.500")).toBe(62.5);
		expect(parseSmilClock("2min")).toBe(120);
		expect(parseSmilClock("1500ms")).toBe(1.5);
		expect(parseSmilClock("npt=3.25s")).toBe(3.25);
	});

	it("returns null for empty or invalid clock values", () => {
		expect(parseSmilClock("")).toBeNull();
		expect(parseSmilClock("abc")).toBeNull();
	});
});

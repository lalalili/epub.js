import { describe, expect, it } from "vitest";
import Navigation from "../../src/navigation";

describe("Navigation", () => {
	function parseNavigation(markup) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(markup, "application/xhtml+xml");

		return new Navigation(doc);
	}

	it("gets nav items by href, bare id, and hash id", () => {
		var navigation = parseNavigation(`<?xml version="1.0" encoding="UTF-8"?>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<nav epub:type="toc">
						<ol>
							<li id="chapter-one">
								<a href="Text/chapter1.xhtml">Chapter 1</a>
							</li>
							<li id="chapter-two">
								<a href="Text/chapter2.xhtml">Chapter 2</a>
								<ol>
									<li id="chapter-two-part-one">
										<a href="Text/chapter2.xhtml#part-1">Part 1</a>
									</li>
								</ol>
							</li>
						</ol>
					</nav>
				</body>
			</html>`);

		expect(navigation.get("Text/chapter1.xhtml").id).toBe("chapter-one");
		expect(navigation.get("chapter-one").href).toBe("Text/chapter1.xhtml");
		expect(navigation.get("#chapter-one").href).toBe("Text/chapter1.xhtml");
		expect(navigation.get("#chapter-two-part-one").href).toBe("Text/chapter2.xhtml#part-1");
		expect(navigation.get("missing")).toBeUndefined();
		expect(navigation.get()).toBe(navigation.toc);
		expect(navigation.length).toBe(3);
	});

	it("parses span-only EPUB 3 nav items and returns landmark lists", () => {
		var navigation = parseNavigation(`<?xml version="1.0" encoding="UTF-8"?>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<nav epub:type="toc">
						<ol>
							<li id="frontmatter"><span>Frontmatter</span></li>
						</ol>
					</nav>
					<nav epub:type="landmarks">
						<ol>
							<li><a epub:type="toc" href="Text/toc.xhtml">Table of Contents</a></li>
						</ol>
					</nav>
				</body>
			</html>`);

		expect(navigation.toc[0]).toEqual({
			id: "frontmatter",
			href: "",
			label: "Frontmatter",
			subitems: [],
			parent: undefined
		});
		expect(navigation.landmark()).toEqual([{
			href: "Text/toc.xhtml",
			label: "Table of Contents",
			type: "toc"
		}]);
	});

	it("parses landmarks from EPUB 3 nav documents", () => {
		var navigation = parseNavigation(`<?xml version="1.0" encoding="UTF-8"?>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<nav epub:type="toc">
						<ol>
							<li><a href="Text/chapter1.xhtml">Chapter 1</a></li>
						</ol>
					</nav>
					<nav epub:type="landmarks">
						<ol>
							<li><a epub:type="cover" href="Text/cover.xhtml">Cover</a></li>
							<li><a epub:type="bodymatter" href="Text/chapter1.xhtml">Start</a></li>
						</ol>
					</nav>
				</body>
			</html>`);

		expect(navigation.landmark("cover")).toEqual({
			href: "Text/cover.xhtml",
			label: "Cover",
			type: "cover"
		});
		expect(navigation.landmark("bodymatter").href).toBe("Text/chapter1.xhtml");
	});

	it("parses nested NCX nav points", () => {
		var navigation = parseNavigation(`<?xml version="1.0" encoding="UTF-8"?>
			<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/">
				<navMap>
					<navPoint id="chapter-one" playOrder="1">
						<navLabel><text>Chapter 1</text></navLabel>
						<content src="Text/chapter1.xhtml"/>
						<navPoint id="chapter-one-part-one" playOrder="2">
							<navLabel><text>Part 1</text></navLabel>
							<content src="Text/chapter1.xhtml#part-1"/>
						</navPoint>
					</navPoint>
				</navMap>
			</ncx>`);

		expect(navigation.length).toBe(2);
		expect(navigation.get("chapter-one").label.trim()).toBe("Chapter 1");
		expect(navigation.get("#chapter-one-part-one").parent).toBe("chapter-one");
		expect(navigation.get("#chapter-one-part-one").href).toBe("Text/chapter1.xhtml#part-1");
	});

	it("loads legacy JSON navigation trees and iterates top-level items", () => {
		var navigation = new Navigation([
			{
				id: "chapter-one",
				href: "Text/chapter1.xhtml",
				title: "Chapter 1",
				children: [
					{
						id: "chapter-one-part-one",
						href: "Text/chapter1.xhtml#part-1",
						title: "Part 1"
					}
				]
			}
		]);
		var labels = [];

		navigation.forEach((item) => labels.push(item.label));

		expect(navigation.length).toBe(2);
		expect(labels).toEqual(["Chapter 1"]);
		expect(navigation.get("chapter-one-part-one").label).toBe("Part 1");
		expect(navigation.get("Text/chapter1.xhtml#part-1").parent).toBeUndefined();
	});
});

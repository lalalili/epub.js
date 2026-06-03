import { describe, expect, it } from "vitest";
import PageList from "../../src/pagelist";

describe("PageList", () => {
	function parsePageList(markup) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(markup, "application/xhtml+xml");

		return new PageList(doc);
	}

	it("preserves string page labels from EPUB 3 page-list nav", () => {
		var pageList = parsePageList(`<?xml version="1.0" encoding="UTF-8"?>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<nav epub:type="page-list" hidden="">
						<ol>
							<li><a href="Text/intro.xhtml#page-ix">ix</a></li>
							<li><a href="Text/chapter1.xhtml#page-1">1</a></li>
							<li><a href="Text/chapter2.xhtml#page-2">2</a></li>
						</ol>
					</nav>
				</body>
			</html>`);

		expect(pageList.pages).toEqual(["ix", "1", "2"]);
		expect(pageList.hrefFromPage("ix")).toBe("Text/intro.xhtml#page-ix");
		expect(pageList.hrefFromPage("1")).toBe("Text/chapter1.xhtml#page-1");
		expect(pageList.pageFromHref("Text/chapter2.xhtml#page-2")).toBe("2");
		expect(pageList.totalPages).toBe(3);
	});

	it("parses CFI href targets from EPUB 3 page-list nav", () => {
		var pageList = parsePageList(`<?xml version="1.0" encoding="UTF-8"?>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<nav epub:type="page-list">
						<ol>
							<li><a href="package.opf#epubcfi(/6/2[chap]!/4/2/2)">1</a></li>
							<li><a href="package.opf#epubcfi(/6/2[chap]!/4/4/2)">2</a></li>
						</ol>
					</nav>
				</body>
			</html>`);

		expect(pageList.pageList[0]).toEqual({
			cfi: "epubcfi(/6/2[chap]!/4/2/2)",
			href: "package.opf#epubcfi(/6/2[chap]!/4/2/2)",
			packageUrl: "package.opf",
			page: "1"
		});
		expect(pageList.locations).toEqual([
			"epubcfi(/6/2[chap]!/4/2/2)",
			"epubcfi(/6/2[chap]!/4/4/2)"
		]);
		expect(pageList.pageFromCfi("epubcfi(/6/2[chap]!/4/4/2)")).toBe("2");
	});

	it("preserves string page labels from NCX pageList", () => {
		var parser = new DOMParser();
		var doc = parser.parseFromString(`<?xml version="1.0" encoding="UTF-8"?>
			<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/">
				<pageList>
					<pageTarget id="page-ix" type="front" value="ix">
						<navLabel><text>ix</text></navLabel>
						<content src="Text/intro.xhtml#page-ix"/>
					</pageTarget>
					<pageTarget id="page-1" type="normal" value="1">
						<navLabel><text>1</text></navLabel>
						<content src="Text/chapter1.xhtml#page-1"/>
					</pageTarget>
				</pageList>
			</ncx>`, "application/xml");
		var pageList = new PageList(doc);

		expect(pageList.pages).toEqual(["ix", "1"]);
		expect(pageList.hrefFromPage("ix")).toBe("Text/intro.xhtml#page-ix");
		expect(pageList.pageFromHref("Text/chapter1.xhtml#page-1")).toBe("1");
	});

	it("handles missing page-list documents without processing pages", () => {
		var pageList = parsePageList(`<?xml version="1.0" encoding="UTF-8"?>
			<html xmlns="http://www.w3.org/1999/xhtml">
				<body><nav epub:type="toc"><ol><li>TOC</li></ol></nav></body>
			</html>`);

		expect(pageList.pages).toEqual([]);
		expect(pageList.pageList).toEqual([]);
		expect(pageList.pageFromCfi("epubcfi(/6/2!/4/2/2)")).toBe(-1);
		expect(pageList.cfiFromPage(1)).toBe(-1);
	});

	it("resolves exact and inserted CFI positions against sorted page locations", () => {
		var pageList = new PageList();

		pageList.process([
			{
				page: 1,
				href: "chapter.xhtml#page-1",
				cfi: "epubcfi(/6/2[chap]!/4/2/2)"
			},
			{
				page: 2,
				href: "chapter.xhtml#page-2",
				cfi: "epubcfi(/6/2[chap]!/4/4/2)"
			},
			{
				page: 3,
				href: "chapter.xhtml#page-3",
				cfi: "epubcfi(/6/2[chap]!/4/6/2)"
			}
		]);

		expect(pageList.pageFromCfi("epubcfi(/6/2[chap]!/4/4/2)")).toBe(2);
		expect(pageList.pageFromCfi("epubcfi(/6/2[chap]!/4/4/4)")).toBe(2);
		expect(pageList.cfiFromPage(3)).toBe("epubcfi(/6/2[chap]!/4/6/2)");
		expect(pageList.percentageFromCfi("epubcfi(/6/2[chap]!/4/6/2)")).toBe(1);
		expect(pageList.pageFromPercentage(0.5)).toBe(1);
		expect(pageList.percentageFromPage(2)).toBe(0.5);
		expect(pageList.hrefFromPage(9)).toBeUndefined();
		expect(pageList.pageFromHref("missing.xhtml")).toBeUndefined();
	});

	it("clears processed state on destroy", () => {
		var pageList = new PageList();

		pageList.process([{ page: 1, href: "chapter.xhtml#page-1" }]);
		pageList.destroy();

		expect(pageList.pages).toBeUndefined();
		expect(pageList.locations).toBeUndefined();
		expect(pageList.hrefByPage).toBeUndefined();
		expect(pageList.pageList).toBeUndefined();
	});
});

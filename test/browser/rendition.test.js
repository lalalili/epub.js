import { describe, expect, it } from "vitest";
import Rendition from "../../src/rendition";

describe("Rendition", () => {
	function createRendition() {
		let rendition = Object.create(Rendition.prototype);

		rendition.book = {
			locations: {
				locationFromCfi: function() {
					return null;
				}
			},
			pageList: {
				pageFromCfi: function() {
					return -1;
				}
			},
			spine: {
				first: function() {
					return { index: 0 };
				},
				last: function() {
					return { index: 2 };
				}
			}
		};

		return rendition;
	}

	it("ignores empty manager location entries", () => {
		let rendition = createRendition();

		expect(rendition.located([undefined])).toEqual({});
	});

	it("uses the first and last valid manager location entries", () => {
		let rendition = createRendition();
		let located = rendition.located([
			undefined,
			{
				index: 1,
				href: "chapter-1.xhtml",
				mapping: {
					start: "epubcfi(/6/2[chapter-1]!/4/2/1:0)",
					end: "epubcfi(/6/2[chapter-1]!/4/2/1:10)"
				},
				pages: [2],
				totalPages: 3
			},
			null,
			{
				index: 2,
				href: "chapter-2.xhtml",
				mapping: {
					start: "epubcfi(/6/4[chapter-2]!/4/2/1:0)",
					end: "epubcfi(/6/4[chapter-2]!/4/2/1:10)"
				},
				pages: [1, 2],
				totalPages: 2
			}
		]);

		expect(located.start.index).toBe(1);
		expect(located.start.href).toBe("chapter-1.xhtml");
		expect(located.start.displayed.page).toBe(2);
		expect(located.end.index).toBe(2);
		expect(located.end.href).toBe("chapter-2.xhtml");
		expect(located.end.displayed.page).toBe(2);
		expect(located.atEnd).toBe(true);
	});
});

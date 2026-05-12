import assert from "assert";
import Rendition from "../src/rendition";

describe("Rendition", function() {
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

	it("ignores empty manager location entries", function() {
		let rendition = createRendition();

		assert.deepEqual(rendition.located([undefined]), {});
	});

	it("uses the first and last valid manager location entries", function() {
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

		assert.equal(located.start.index, 1);
		assert.equal(located.start.href, "chapter-1.xhtml");
		assert.equal(located.start.displayed.page, 2);
		assert.equal(located.end.index, 2);
		assert.equal(located.end.href, "chapter-2.xhtml");
		assert.equal(located.end.displayed.page, 2);
		assert.equal(located.atEnd, true);
	});
});

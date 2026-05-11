import assert from "assert";
import Contents from "../src/contents";

describe("Contents textWidth", function() {
	let fixtures = [];

	afterEach(function() {
		fixtures.forEach(function(fixture) {
			if (fixture.parentNode) {
				fixture.parentNode.removeChild(fixture);
			}
		});
		fixtures = [];
	});

	function appendFixture(content) {
		content.style.position = "relative";
		content.style.margin = "0";
		content.style.padding = "0";
		document.body.appendChild(content);
		fixtures.push(content);
		return content;
	}

	it("ignores off-screen absolute title text when measuring horizontal width", function() {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "1062px";
		content.style.height = "709px";
		content.style.overflow = "hidden";

		let title = document.createElement("h1");
		title.textContent = "Dr. Wortle’s School";
		title.style.position = "absolute";
		title.style.left = "-999em";

		let author = document.createElement("p");
		author.textContent = "By Anthony Trollope.";
		author.style.position = "absolute";
		author.style.left = "-999em";

		let visibleCover = document.createElement("div");
		visibleCover.style.display = "block";
		visibleCover.style.width = "1062px";
		visibleCover.style.height = "300px";

		content.appendChild(title);
		content.appendChild(author);
		content.appendChild(visibleCover);

		let range = document.createRange();
		range.selectNodeContents(content);
		assert.ok(range.getBoundingClientRect().width > 10000);

		let contents = new Contents(document, content);
		let width = contents.textWidth();

		assert.ok(width >= 1062);
		assert.ok(width < 2000);
	});

	it("preserves normal wide horizontal content width", function() {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "300px";
		content.style.height = "200px";

		let wide = document.createElement("div");
		wide.style.width = "900px";
		wide.style.height = "100px";
		wide.textContent = "Wide content";
		content.appendChild(wide);

		let contents = new Contents(document, content);

		assert.ok(contents.textWidth() >= 900);
	});

	it("ignores an empty force-even spread when body content fits one page", function() {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "1062px";
		content.style.height = "709px";

		let originalCreateRange = document.createRange.bind(document);
		document.createRange = function() {
			return {
				selectNodeContents: function() {},
				getBoundingClientRect: function() {
					return {
						left: 0,
						right: 2124,
						width: 2124,
						height: 709,
						bottom: 709
					};
				},
				getClientRects: function() {
					return [];
				}
			};
		};

		try {
			let contents = new Contents(document, content);

			assert.equal(contents.textWidth(), 1062);
		} finally {
			document.createRange = originalCreateRange;
		}
	});
});

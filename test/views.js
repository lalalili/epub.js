import assert from "assert";
import Views from "../src/managers/helpers/views";
import IframeView, { stripScriptTagsFromContents } from "../src/managers/views/iframe";

describe("Views", function() {
	it("destroys undisplayed views when clearing the collection", function() {
		let container = document.createElement("div");
		let element = document.createElement("div");
		let destroyed = false;
		let view = {
			displayed: false,
			element,
			destroy: function() {
				destroyed = true;
			}
		};
		let views = new Views(container);

		views.append(view);
		views.clear();

		assert.equal(destroyed, true);
		assert.equal(views.length, 0);
		assert.equal(container.children.length, 0);
	});

	it("strips scripted content before loading sandboxed iframes", function() {
		let contents = [
			"<html><head>",
			"<script>window.__epubScript = true;</script>",
			"<script src=\"tracking.js\"></script>",
			"</head><body><p>Readable</p><script type=\"application/javascript\">alert(1)</script></body></html>"
		].join("");

		let stripped = stripScriptTagsFromContents(contents);

		assert.equal(stripped.includes("<script"), false);
		assert.equal(stripped.includes("Readable"), true);
	});

	it("keeps viewport-filling single media pages to one horizontal page", function() {
		let view = new IframeView({ index: 0, href: "cover.xhtml" }, {
			axis: "horizontal",
			flow: "paginated",
			width: 1296,
			height: 761,
			layout: {
				name: "reflowable",
				pageWidth: 1296,
				viewportPageWidth: 3888,
				width: 3888,
				columnWidth: 1296,
				divisor: 2,
				update: function() {}
			},
			forceEvenPages: true
		});

		view.iframe = document.createElement("iframe");
		view.element.appendChild(view.iframe);
		view.lockedWidth = 1296;
		view.lockedHeight = 761;
		view._width = 0;
		view._height = 0;
		view.contents = {
			textWidth: function() {
				return 116639;
			},
			isViewportFillingSingleMediaPage: function(viewportWidth) {
				assert.equal(viewportWidth, 1296);
				return true;
			},
			writingMode: function() {
				return "horizontal-tb";
			}
		};

		view.expand();

		assert.equal(view.width(), 1296);
		assert.equal(view.element.style.width, "1296px");
		assert.equal(view.iframe.style.width, "1296px");
	});
});

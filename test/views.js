import assert from "assert";
import IframeView from "../src/managers/views/iframe";

describe("Views", function() {
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
		assert.equal(view._viewportFillingSingleMediaPage, true);
	});
});

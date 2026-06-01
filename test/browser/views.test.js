import { describe, expect, it } from "vitest";
import Views from "../../src/managers/helpers/views";
import IframeView, { stripScriptTagsFromContents } from "../../src/managers/views/iframe";

describe("Views", () => {
	it("destroys undisplayed views when clearing the collection", () => {
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

		expect(destroyed).toBe(true);
		expect(views.length).toBe(0);
		expect(container.children.length).toBe(0);
	});

	it("strips scripted content before loading sandboxed iframes", () => {
		let contents = [
			"<html><head>",
			"<script>window.__epubScript = true;</script>",
			"<script src=\"tracking.js\"></script>",
			"</head><body><p>Readable</p><script type=\"application/javascript\">alert(1)</script></body></html>"
		].join("");

		let stripped = stripScriptTagsFromContents(contents);

		expect(stripped.includes("<script")).toBe(false);
		expect(stripped.includes("Readable")).toBe(true);
	});

	it("keeps viewport-filling single media pages to one horizontal page", () => {
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
				update: () => {}
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
			textWidth: () => 116639,
			isViewportFillingSingleMediaPage: (viewportWidth) => {
				expect(viewportWidth).toBe(1296);
				return true;
			},
			writingMode: () => "horizontal-tb"
		};

		view.expand();

		expect(view.width()).toBe(1296);
		expect(view.element.style.width).toBe("1296px");
		expect(view.iframe.style.width).toBe("1296px");
		expect(view._viewportFillingSingleMediaPage).toBe(true);
	});
});

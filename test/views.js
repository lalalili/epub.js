import assert from "assert";
import Views from "../src/managers/helpers/views";
import { stripScriptTagsFromContents } from "../src/managers/views/iframe";

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
});

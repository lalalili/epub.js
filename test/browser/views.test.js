import { describe, expect, it } from "vitest";
import Views from "../../src/managers/helpers/views";
import { stripScriptTagsFromContents } from "../../src/managers/views/iframe";

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
});

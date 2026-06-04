import { describe, expect, it } from "vitest";
import Views from "../../src/managers/helpers/views";
import IframeView, { stripScriptTagsFromContents } from "../../src/managers/views/iframe";
import InlineView from "../../src/managers/views/inline";

describe("Views", () => {
	function createView(index = 0, displayed = true) {
		let calls = [];
		return {
			calls,
			displayed,
			element: document.createElement("div"),
			section: {
				index
			},
			destroy: function() {
				calls.push("destroy");
			},
			hide: function() {
				calls.push("hide");
			},
			show: function() {
				calls.push("show");
			}
		};
	}

	it("appends, prepends, and inserts view elements in order", () => {
		let container = document.createElement("div");
		let views = new Views(container);
		let first = createView(1);
		let second = createView(2);
		let middle = createView(3);

		views.append(second);
		views.prepend(first);
		views.insert(middle, 1);

		expect(views.length).toBe(3);
		expect(views.all()).toEqual([first, middle, second]);
		expect(views.first()).toBe(first);
		expect(views.last()).toBe(second);
		expect(views.indexOf(middle)).toBe(1);
		expect(views.get(1)).toBe(middle);
		expect(Array.from(container.children)).toEqual([first.element, middle.element, second.element]);
	});

	it("finds displayed views by section and filters displayed views", () => {
		let views = new Views();
		let hidden = createView(1, false);
		let visible = createView(1, true);
		let other = createView(2, true);

		views.append(hidden);
		views.append(visible);
		views.append(other);

		expect(views.find({ index: 1 })).toBe(visible);
		expect(views.displayed()).toEqual([visible, other]);
	});

	it("shows and hides displayed views only", () => {
		let views = new Views();
		let visible = createView(1, true);
		let hidden = createView(2, false);

		views.append(visible);
		views.append(hidden);

		views.hide();
		views.show();

		expect(views.hidden).toBe(false);
		expect(visible.calls).toEqual(["hide", "show"]);
		expect(hidden.calls).toEqual([]);
	});

	it("removes and destroys views from the collection", () => {
		let container = document.createElement("div");
		let views = new Views(container);
		let first = createView(1);
		let second = createView(2);

		views.append(first);
		views.append(second);
		views.remove(first);

		expect(views.length).toBe(1);
		expect(views.all()).toEqual([second]);
		expect(first.calls).toContain("destroy");
		expect(Array.from(container.children)).toEqual([second.element]);
	});

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

	it("locks iframe views through direct layout and type helpers", () => {
		let view = new IframeView({ index: 0, href: "chapter.xhtml" }, {
			axis: "vertical",
			width: 320,
			height: 480,
			layout: {
				name: "reflowable"
			}
		});

		view.create();
		view.lock("width", 320, 480);

		expect(view.lockedWidth).toBe(320);
		expect(view.elementBounds.width).toBe(0);
	});

	it("keeps iframe constructor defaults, sandbox flags, and reset behavior stable", () => {
		let view = new IframeView({ index: 4, href: "chapter.xhtml" }, {
			axis: "horizontal",
			allowScriptedContent: true,
			allowPopups: true,
			layout: {
				name: "reflowable"
			}
		});

		expect(view.index).toBe(4);
		expect(view.id.startsWith("epubjs-view-")).toBe(true);
		expect(view.element.classList.contains("epub-view")).toBe(true);
		expect(view.element.style.flex).toBe("0 0 auto");
		expect(view.added).toBe(false);
		expect(view.displayed).toBe(false);
		expect(view.rendered).toBe(false);
		expect(view.highlights).toEqual({});
		expect(view.underlines).toEqual({});
		expect(view.marks).toEqual({});

		let iframe = view.create();

		expect(iframe).toBe(view.iframe);
		expect(view.added).toBe(true);
		expect(iframe.sandbox.toString()).toContain("allow-same-origin");
		expect(iframe.sandbox.toString()).toContain("allow-scripts");
		expect(iframe.sandbox.toString()).toContain("allow-popups");
		expect(iframe.getAttribute("enable-annotation")).toBe("true");
		expect(view.settings.method).toBe(view.supportsSrcdoc ? "srcdoc" : "write");

		view.iframe.style.width = "120px";
		view.iframe.style.height = "240px";
		view._width = 120;
		view._height = 240;
		view.reset();

		expect(view.iframe.style.width).toBe("0px");
		expect(view.iframe.style.height).toBe("0px");
		expect(view._width).toBe(0);
		expect(view._height).toBe(0);
		expect(view._needsReframe).toBe(true);
	});

	it("uses the Windows MSApp write bridge without changing iframe load setup", () => {
		let originalMSApp = window.MSApp;
		let unsafeWriteCount = 0;
		let view = new IframeView({ index: 0, href: "chapter.xhtml" }, {
			method: "write",
			layout: {
				name: "reflowable"
			}
		});
		let contents = "<html><body><p>Readable</p></body></html>";

		window.MSApp = {
			execUnsafeLocalFunction(callback) {
				unsafeWriteCount += 1;
				callback();
			}
		};

		try {
			view.create();
			document.body.appendChild(view.element);
			view.load(contents);

			expect(unsafeWriteCount).toBe(1);
			expect(view.document.body.textContent).toContain("Readable");
		} finally {
			view.element.remove();
			window.MSApp = originalMSApp;
		}
	});

	it("rejects display promises when render fails", async () => {
		let view = new IframeView({ index: 0, href: "chapter.xhtml" }, {
			layout: {
				name: "reflowable"
			}
		});

		view.render = function() {
			return Promise.reject(new Error("render failed"));
		};

		await expect(view.display()).rejects.toThrow("render failed");
	});

	it("loads and revokes iframe blob URLs through the platform boundary", () => {
		let originalCreateObjectURL = window.URL.createObjectURL;
		let originalRevokeObjectURL = window.URL.revokeObjectURL;
		let createdBlob;
		let revokedUrl;
		let view = new IframeView({ index: 0, href: "chapter.xhtml" }, {
			method: "blobUrl",
			layout: {
				name: "reflowable"
			}
		});

		window.URL.createObjectURL = function(blob) {
			createdBlob = blob;
			return "blob:epubjs-test";
		};
		window.URL.revokeObjectURL = function(url) {
			revokedUrl = url;
		};

		try {
			view.create();
			view.load("<html><body><p>Readable</p></body></html>");
			view.destroy();

			expect(createdBlob).toBeInstanceOf(Blob);
			expect(createdBlob.type).toBe("application/xhtml+xml");
			expect(view.blobUrl).toBe("blob:epubjs-test");
			expect(revokedUrl).toBe("blob:epubjs-test");
		} finally {
			window.URL.createObjectURL = originalCreateObjectURL;
			window.URL.revokeObjectURL = originalRevokeObjectURL;
		}
	});

	it("locks inline views through direct layout and type helpers", () => {
		let view = new InlineView({ index: 0, href: "chapter.xhtml" }, {
			axis: "vertical",
			width: 320,
			height: 480,
			layout: {
				name: "reflowable"
			}
		});

		view.create();
		view.lock("width", 320, 480);

		expect(view.frame.style.width).toBe("320px");
		expect(view._width).toBe(320);
	});

	it("loads inline view contents through the parser boundary", () => {
		let view = new InlineView({ index: 0, href: "chapter.xhtml" }, {
			layout: {
				name: "reflowable"
			}
		});

		view.create();

		return view.load("<html><body><p id=\"p1\">Readable</p></body></html>")
			.then(function(contents) {
				expect(view.frame.querySelector("#p1").textContent).toBe("Readable");
				expect(contents).toBe(view.contents);
				expect(view.rendering).toBe(false);
			});
	});

	it("rejects inline display promises when render fails", async () => {
		let view = new InlineView({ index: 0, href: "chapter.xhtml" }, {
			layout: {
				name: "reflowable"
			}
		});

		view.render = function() {
			return Promise.reject(new Error("inline render failed"));
		};

		await expect(view.display()).rejects.toThrow("inline render failed");
	});

	it("keeps inline view constructor defaults and lifecycle cleanup stable", () => {
		let view = new InlineView({ index: 3, href: "chapter.xhtml" }, {
			axis: "horizontal",
			width: 320,
			height: 480,
			layout: {
				name: "reflowable"
			}
		});

		expect(view.index).toBe(3);
		expect(view.id.startsWith("epubjs-view:")).toBe(true);
		expect(view.element.classList.contains("epub-view")).toBe(true);
		expect(view.element.style.display).toBe("inline-block");
		expect(view.added).toBe(false);
		expect(view.displayed).toBe(false);
		expect(view.rendered).toBe(false);

		view.create();
		view.displayed = true;
		view.destroy();

		expect(view.displayed).toBe(false);
		expect(view.frame).toBeNull();
		expect(view._width).toBeNull();
		expect(view._height).toBeNull();
	});
});

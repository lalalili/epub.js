import { afterEach, describe, expect, it } from "vitest";
import Contents from "../../src/contents";
import { EVENTS } from "../../src/utils/constants";

describe("Contents textWidth", () => {
	let fixtures = [];

	afterEach(() => {
		fixtures.forEach((fixture) => {
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

	function restoreDescriptors(descriptors) {
		descriptors.forEach(([target, property, descriptor]) => {
			if (descriptor) {
				Object.defineProperty(target, property, descriptor);
			} else {
				delete target[property];
			}
		});
	}

	it("keeps constructor defaults, reading system, and style cache behavior stable", () => {
		let content = appendFixture(document.createElement("div"));
		content.innerHTML = "<p id=\"p1\">Readable</p>";
		let contents = new Contents(document, content, "/6/2[chap]", 7, "OPS/chapter.xhtml");

		try {
			expect(Contents.listenedEvents.length).toBeGreaterThan(0);
			expect(contents.document).toBe(document);
			expect(contents.documentElement).toBe(document.documentElement);
			expect(contents.content).toBe(content);
			expect(contents.window).toBe(window);
			expect(contents.sectionIndex).toBe(7);
			expect(contents.cfiBase).toBe("/6/2[chap]");
			expect(contents.sectionHref).toBe("OPS/chapter.xhtml");
			expect(contents._size).toEqual({ width: 0, height: 0 });
			expect(contents._verticalRlMetricsCache).toBeNull();
			expect(contents._verticalRlPageMetricsCache).toBeNull();
			expect(contents._forcedWritingMode).toBe("");
			expect(contents.called).toBe(0);
			expect(contents.active).toBe(true);
			expect(navigator.epubReadingSystem.name).toBe("epub.js");
			expect(navigator.epubReadingSystem.hasFeature("dom-manipulation")).toBe(true);
			expect(navigator.epubReadingSystem.hasFeature("spine-scripting")).toBe(false);

			contents._verticalRlMetricsCache = { key: "old", width: 10 };
			contents._verticalRlPageMetricsCache = { key: "old", metrics: {} };
			expect(contents.css("color", "red")).toMatch(/red|rgb\(255, 0, 0\)/);
			expect(contents._verticalRlMetricsCache).toBeNull();
			expect(contents._verticalRlPageMetricsCache).toBeNull();
		} finally {
			contents.destroy();
		}
	});

	it("keeps viewport, stylesheet, class, and link helpers stable", () => {
		let frame = appendFixture(document.createElement("iframe"));
		let doc = frame.contentDocument;
		let content = doc.body;
		content.innerHTML = "<a href=\"chapter-2.xhtml#frag\">Next</a>";
		let contents = new Contents(doc, content, "", 0, "OPS/chapter.xhtml");
		let clickedHref;

		contents.on(EVENTS.CONTENTS.LINK_CLICKED, (href) => {
			clickedHref = href;
		});

		try {
			expect(contents.viewport({ width: 320, height: 480, scale: 1, scalable: "no" })).toMatchObject({
				width: 320,
				height: 480,
				scale: 1,
				scalable: "no"
			});
			expect(doc.querySelector("meta[name='viewport']").getAttribute("content")).toContain("width=320");

			expect(contents.addStylesheetCss("body { color: red; }", "reader")).toBe(true);
			expect(doc.getElementById("epubjs-inserted-css-reader")).toBeTruthy();
			contents.addStylesheetRules({
				body: {
					background: "white"
				}
			}, "rules-object");
			expect(doc.getElementById("epubjs-inserted-css-rules-object").sheet.cssRules[0].cssText).toContain("background");
			contents.addStylesheetRules([
				["p", ["color", "black", true]]
			], "rules-array");
			expect(doc.getElementById("epubjs-inserted-css-rules-array").sheet.cssRules[0].cssText).toContain("color");

			contents.addClass("reader-content");
			expect(content.classList.contains("reader-content")).toBe(true);
			contents.removeClass("reader-content");
			expect(content.classList.contains("reader-content")).toBe(false);

			content.querySelector("a").dispatchEvent(new MouseEvent("click", {
				bubbles: true,
				cancelable: true
			}));
			expect(clickedHref).toBe("/chapter-2.xhtml#frag");
		} finally {
			contents.destroy();
		}
	});

	it("ignores off-screen absolute title text when measuring horizontal width", () => {
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
		expect(range.getBoundingClientRect().width).toBeGreaterThan(10000);

		let contents = new Contents(document, content);
		let width = contents.textWidth();

		expect(width).toBeGreaterThanOrEqual(1062);
		expect(width).toBeLessThan(2000);
	});

	it("preserves normal wide horizontal content width", () => {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "300px";
		content.style.height = "200px";

		let wide = document.createElement("div");
		wide.style.width = "900px";
		wide.style.height = "100px";
		wide.textContent = "Wide content";
		content.appendChild(wide);

		let contents = new Contents(document, content);

		expect(contents.textWidth()).toBeGreaterThanOrEqual(900);
	});

	it("ignores an empty force-even spread when body content fits one page", () => {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "1062px";
		content.style.height = "709px";

		let originalCreateRange = document.createRange.bind(document);
		document.createRange = () => {
			return {
				selectNodeContents: () => {},
				getBoundingClientRect: () => {
					return {
						left: 0,
						right: 2124,
						width: 2124,
						height: 709,
						bottom: 709
					};
				},
				getClientRects: () => []
			};
		};

		try {
			let contents = new Contents(document, content);

			expect(contents.textWidth()).toBe(1062);
		} finally {
			document.createRange = originalCreateRange;
		}
	});

	it("uses body scroll width when range width only exceeds a one-page viewport by body sizing", () => {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "1062px";
		content.style.height = "709px";

		let originalCreateRange = document.createRange.bind(document);
		let descriptors = [
			[content, "clientWidth", Object.getOwnPropertyDescriptor(content, "clientWidth")],
			[content, "scrollWidth", Object.getOwnPropertyDescriptor(content, "scrollWidth")],
			[document.body, "scrollWidth", Object.getOwnPropertyDescriptor(document.body, "scrollWidth")],
			[document.documentElement, "clientWidth", Object.getOwnPropertyDescriptor(document.documentElement, "clientWidth")]
		];

		Object.defineProperty(content, "clientWidth", { configurable: true, value: 1150 });
		Object.defineProperty(content, "scrollWidth", { configurable: true, value: 1062 });
		Object.defineProperty(document.body, "scrollWidth", { configurable: true, value: 1062 });
		Object.defineProperty(document.documentElement, "clientWidth", { configurable: true, value: 1062 });
		document.createRange = () => {
			return {
				selectNodeContents: () => {},
				getBoundingClientRect: () => {
					return {
						left: 0,
						right: 1150,
						width: 1150,
						height: 709,
						bottom: 709
					};
				},
				getClientRects: () => []
			};
		};

		try {
			let contents = new Contents(document, content);

			expect(contents.textWidth()).toBe(1062);
		} finally {
			document.createRange = originalCreateRange;
			restoreDescriptors(descriptors);
		}
	});

	it("does not add horizontal body padding as a second page when content fits one page", () => {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "1062px";
		content.style.height = "709px";
		content.style.paddingLeft = "44px";
		content.style.paddingRight = "44px";

		let originalCreateRange = document.createRange.bind(document);
		let descriptors = [
			[content, "scrollWidth", Object.getOwnPropertyDescriptor(content, "scrollWidth")],
			[document.body, "scrollWidth", Object.getOwnPropertyDescriptor(document.body, "scrollWidth")],
			[document.documentElement, "clientWidth", Object.getOwnPropertyDescriptor(document.documentElement, "clientWidth")]
		];

		Object.defineProperty(content, "scrollWidth", { configurable: true, value: 1062 });
		Object.defineProperty(document.body, "scrollWidth", { configurable: true, value: 1062 });
		Object.defineProperty(document.documentElement, "clientWidth", { configurable: true, value: 1062 });
		document.createRange = () => {
			return {
				selectNodeContents: () => {},
				getBoundingClientRect: () => {
					return {
						left: 0,
						right: 1062,
						width: 1062,
						height: 709,
						bottom: 709
					};
				},
				getClientRects: () => []
			};
		};

		try {
			let contents = new Contents(document, content);

			expect(contents.textWidth()).toBe(1062);
		} finally {
			document.createRange = originalCreateRange;
			restoreDescriptors(descriptors);
		}
	});

	it("detects viewport-filling single media pages", () => {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "116639px";
		content.style.height = "761px";
		content.setAttribute("data-epub-single-image-centered", "1");

		let image = document.createElement("img");
		image.style.display = "block";
		image.style.position = "absolute";
		image.style.objectFit = "contain";
		image.getBoundingClientRect = () => {
			return {
				left: 0,
				right: 116639,
				top: 0,
				bottom: 761,
				width: 116639,
				height: 761
			};
		};
		content.appendChild(image);

		let descriptors = [
			[content, "scrollWidth", Object.getOwnPropertyDescriptor(content, "scrollWidth")],
			[document.documentElement, "scrollWidth", Object.getOwnPropertyDescriptor(document.documentElement, "scrollWidth")]
		];

		Object.defineProperty(content, "scrollWidth", { configurable: true, value: 116639 });
		Object.defineProperty(document.documentElement, "scrollWidth", { configurable: true, value: 116639 });

		try {
			let contents = new Contents(document, content);

			expect(contents.isViewportFillingSingleMediaPage(1296)).toBe(true);
		} finally {
			restoreDescriptors(descriptors);
		}
	});

	it("detects viewport-filling svg image pages as one media item", () => {
		let content = appendFixture(document.createElement("div"));
		content.style.width = "116639px";
		content.style.height = "761px";
		content.setAttribute("data-epub-single-image-centered", "1");

		let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.style.display = "block";
		svg.style.position = "absolute";
		svg.style.objectFit = "contain";
		svg.getBoundingClientRect = () => {
			return {
				left: 0,
				right: 116639,
				top: 0,
				bottom: 761,
				width: 116639,
				height: 761
			};
		};

		let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		image.style.display = "block";
		image.getBoundingClientRect = () => {
			return {
				left: 58025,
				right: 58613,
				top: 0,
				bottom: 761,
				width: 588,
				height: 761
			};
		};

		svg.appendChild(image);
		content.appendChild(svg);

		let descriptors = [
			[content, "scrollWidth", Object.getOwnPropertyDescriptor(content, "scrollWidth")],
			[document.documentElement, "scrollWidth", Object.getOwnPropertyDescriptor(document.documentElement, "scrollWidth")]
		];

		Object.defineProperty(content, "scrollWidth", { configurable: true, value: 116639 });
		Object.defineProperty(document.documentElement, "scrollWidth", { configurable: true, value: 116639 });

		try {
			let contents = new Contents(document, content);

			expect(contents.isViewportFillingSingleMediaPage(1296)).toBe(true);
		} finally {
			restoreDescriptors(descriptors);
		}
	});

	it("applies vertical-rl columns while clearing multicolumn body styles", () => {
		let doc = document.implementation.createHTMLDocument("contents");
		let body = doc.body;
		let contents = Object.create(Contents.prototype);
		let viewportSettings;

		body.style.setProperty("column-width", "320px");
		body.style.setProperty("column-gap", "20px");
		body.style.setProperty("column-fill", "auto");
		body.style.setProperty("column-axis", "horizontal");

		contents.document = doc;
		contents.documentElement = doc.documentElement;
		contents.content = body;
		contents.invalidateVerticalRlMetricsCache = () => {};
		contents.writingMode = () => "vertical-rl";
		contents.layoutStyle = () => {};
		contents.css = (property, value, important) => {
			body.style.setProperty(property, value, important ? "important" : "");
			return body.style.getPropertyValue(property);
		};
		contents.height = (height) => {
			body.style.height = height + "px";
			return height;
		};
		contents.viewport = (settings) => {
			viewportSettings = settings;
			return settings;
		};

		contents.columns(640, 480, 320, 24, "ltr");

		expect(body.style.getPropertyValue("column-width")).toBe("");
		expect(body.style.getPropertyValue("column-gap")).toBe("");
		expect(body.style.getPropertyValue("column-fill")).toBe("");
		expect(body.style.getPropertyValue("column-axis")).toBe("");
		expect(body.style.height).toBe("480px");
		expect(body.style.overflow).toBe("visible");
		expect(viewportSettings).toEqual({
			width: 640,
			height: 480,
			scale: 1,
			scalable: "no"
		});
	});
});

import { describe, expect, it } from "vitest";
import Rendition from "../../src/rendition";
import IframeView from "../../src/managers/views/iframe";
import DefaultViewManager from "../../src/managers/default";
import ContinuousViewManager from "../../src/managers/continuous";

describe("Rendition", () => {
	function createBook(overrides = {}) {
		let contentHooks = [];
		return Object.assign({
			opened: new Promise(() => {}),
			package: {
				metadata: {
					layout: "reflowable",
					spread: "auto",
					orientation: "auto",
					flow: "auto",
					viewport: "",
					direction: "ltr",
					identifier: "book-id"
				}
			},
			displayOptions: {
				fixedLayout: "false"
			},
			spine: {
				hooks: {
					content: {
						register(fn) {
							contentHooks.push(fn);
						}
					}
				},
				first() {
					return { index: 0 };
				},
				last() {
					return { index: 2 };
				},
				get() {
					return undefined;
				}
			},
			locations: {
				length() {
					return 0;
				},
				locationFromCfi() {
					return null;
				}
			},
			pageList: {
				pageFromCfi() {
					return -1;
				}
			},
			load() {},
			path: {
				relative(href) {
					return "relative:" + href;
				}
			},
			contentHooks
		}, overrides);
	}

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

	it("keeps constructor defaults and hook registration stable", () => {
		let book = createBook();
		let rendition = new Rendition(book, {
			width: 320,
			height: 480,
			stylesheet: "reader.css",
			script: "reader.js",
			allowScriptedContent: true,
			allowPopups: true
		});

		expect(rendition.settings.manager).toBe("default");
		expect(rendition.settings.view).toBe("iframe");
		expect(rendition.settings.width).toBe(320);
		expect(rendition.settings.height).toBe(480);
		expect(rendition.settings.defaultDirection).toBe("ltr");
		expect(rendition.settings.allowScriptedContent).toBe(true);
		expect(rendition.settings.allowPopups).toBe(true);
		expect(rendition.book).toBe(book);
		expect(rendition.location).toBeUndefined();
		expect(rendition.started).toBeInstanceOf(Promise);
		expect(rendition.requireManager("default")).toBe(DefaultViewManager);
		expect(rendition.requireManager("continuous")).toBe(ContinuousViewManager);
		expect(rendition.requireView("iframe")).toBe(IframeView);
		expect(book.contentHooks.length).toBe(3);
	});

	it("returns manager views from array and collection bridge shapes", () => {
		let rendition = createRendition();
		let firstView = { index: 1 };
		let secondView = { index: 2 };

		rendition.manager = {
			views: [firstView]
		};
		expect(rendition.views()).toEqual([firstView]);

		rendition.manager = {
			views: {
				all() {
					return [secondView];
				}
			}
		};
		expect(rendition.views()).toEqual([secondView]);

		rendition.manager = {};
		expect(rendition.views()).toEqual([]);
	});

	it("keeps layout properties, flow normalization, and link resolution stable", () => {
		let rendition = createRendition();
		let appliedFlow;
		let updatedFlow;
		let appliedLayout;

		rendition.settings = {
			layout: null,
			spread: null,
			orientation: null,
			flow: null,
			minSpreadWidth: 800,
			direction: undefined
		};
		rendition.book.path = {
			relative(href) {
				return "relative:" + href;
			}
		};
		rendition._layout = {
			flow(flow) {
				appliedFlow = flow;
			}
		};
		rendition.manager = {
			applyLayout(layout) {
				appliedLayout = layout;
			},
			updateFlow(flow) {
				updatedFlow = flow;
			},
			isRendered() {
				return false;
			}
		};

		let props = rendition.determineLayoutProperties({
			layout: "reflowable",
			spread: "none",
			orientation: "auto",
			flow: "scrolled-continuous",
			viewport: "width=320,height=480",
			direction: "rtl"
		});

		expect(props).toEqual({
			layout: "reflowable",
			spread: "none",
			orientation: "auto",
			flow: "scrolled-continuous",
			viewport: "width=320,height=480",
			minSpreadWidth: 800,
			direction: "rtl"
		});

		rendition.flow("scrolled-continuous");
		expect(rendition.settings.flow).toBe("scrolled-continuous");
		expect(appliedFlow).toBe("scrolled");
		expect(updatedFlow).toBe("scrolled");
		expect(appliedLayout).toBe(rendition._layout);
		expect(rendition.resolveLinkHref("#footnote-1", { sectionHref: "chapter.xhtml" })).toBe("chapter.xhtml#footnote-1");
		expect(rendition.resolveLinkHref("https://example.test/chapter.xhtml")).toBe("relative:https://example.test/chapter.xhtml");
		expect(rendition.resolveLinkHref("chapter.xhtml#anchor")).toBe("chapter.xhtml#anchor");
	});

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

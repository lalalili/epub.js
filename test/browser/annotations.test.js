import { describe, expect, it } from "vitest";
import Annotations from "../../src/annotations";
import { EVENTS } from "../../src/utils/constants";

describe("Annotations", () => {
	const cfiRange = "epubcfi(/6/4[chapter-1]!/4/2,/1:0,/1:10)";

	function createView(index = 1) {
		var calls = [];
		return {
			calls,
			index,
			highlight(cfi, data, cb, className, styles) {
				calls.push(["highlight", cfi, data, cb, className, styles]);
				return { type: "highlight", cfi };
			},
			mark(cfi, data, cb) {
				calls.push(["mark", cfi, data, cb]);
				return { type: "mark", cfi };
			},
			underline(cfi, data, cb, className, styles) {
				calls.push(["underline", cfi, data, cb, className, styles]);
				return { type: "underline", cfi };
			},
			unhighlight(cfi) {
				calls.push(["unhighlight", cfi]);
				return { type: "unhighlight", cfi };
			},
			unmark(cfi) {
				calls.push(["unmark", cfi]);
				return { type: "unmark", cfi };
			},
			ununderline(cfi) {
				calls.push(["ununderline", cfi]);
				return { type: "ununderline", cfi };
			}
		};
	}

	function createAnnotations(views = []) {
		var renderHooks = [];
		var unloadedHooks = [];
		var rendition = {
			hooks: {
				render: {
					register(callback) {
						renderHooks.push(callback);
					}
				},
				unloaded: {
					register(callback) {
						unloadedHooks.push(callback);
					}
				}
			},
			views() {
				return views;
			}
		};

		return {
			annotations: new Annotations(rendition),
			renderHooks,
			rendition,
			unloadedHooks
		};
	}

	it("registers render and unloaded hooks when constructed", () => {
		var { renderHooks, unloadedHooks } = createAnnotations();

		expect(renderHooks).toHaveLength(1);
		expect(unloadedHooks).toHaveLength(1);
	});

	it("stores and attaches matching highlights to visible views", () => {
		var view = createView(1);
		var data = { note: "important" };
		var cb = () => {};
		var styles = { fill: "yellow" };
		var { annotations } = createAnnotations([view]);

		var annotation = annotations.highlight(cfiRange, data, cb, "epubjs-hl", styles);

		expect(annotation.type).toBe("highlight");
		expect(annotation.sectionIndex).toBe(1);
		expect(view.calls).toContainEqual(["highlight", cfiRange, data, cb, "epubjs-hl", styles]);
		expect(annotations._annotationsAt(1)).toContain(encodeURI(cfiRange + "highlight"));
	});

	it("injects and clears annotations through rendition hooks", () => {
		var view = createView(1);
		var { annotations, renderHooks, unloadedHooks } = createAnnotations([]);

		annotations.underline(cfiRange, { color: "blue" });

		renderHooks[0](view);
		unloadedHooks[0](view);

		expect(view.calls).toContainEqual(["underline", cfiRange, { color: "blue" }, undefined, undefined, undefined]);
		expect(view.calls).toContainEqual(["ununderline", cfiRange]);
	});

	it("removes annotations from matching views and section registry", () => {
		var view = createView(1);
		var { annotations } = createAnnotations([view]);

		annotations.mark(cfiRange, { id: "bookmark" });
		annotations.remove(cfiRange, "mark");

		expect(view.calls).toContainEqual(["mark", cfiRange, { id: "bookmark" }, undefined]);
		expect(view.calls).toContainEqual(["unmark", cfiRange]);
		expect(annotations._annotationsAt(1)).toEqual([]);
		expect(annotations._annotations[encodeURI(cfiRange + "mark")]).toBeUndefined();
	});

	it("emits attach and detach events from annotations", () => {
		var view = createView(1);
		var { annotations } = createAnnotations([]);
		var annotation = annotations.highlight(cfiRange, {});
		var events = [];

		annotation.on(EVENTS.ANNOTATION.ATTACH, (mark) => events.push(["attach", mark]));
		annotation.on(EVENTS.ANNOTATION.DETACH, (mark) => events.push(["detach", mark]));

		annotation.attach(view);
		annotation.detach(view);

		expect(events[0][0]).toBe("attach");
		expect(events[0][1]).toEqual({ type: "highlight", cfi: cfiRange });
		expect(events[1][0]).toBe("detach");
		expect(events[1][1]).toEqual({ type: "unhighlight", cfi: cfiRange });
	});

	it("updates annotation data", () => {
		var { annotations } = createAnnotations();
		var annotation = annotations.mark(cfiRange, { old: true });

		annotation.update({ newer: true });

		expect(annotation.data).toEqual({ newer: true });
	});
});

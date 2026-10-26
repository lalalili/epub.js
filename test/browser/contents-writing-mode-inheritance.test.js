import { afterEach, describe, expect, it } from "vite-plus/test";
import Contents from "../../src/contents";

describe("Contents writing-mode inheritance", () => {
	const fixtures = [];
	afterEach(() => {
		for (const { frame, contents } of fixtures) {
			contents.destroy();
			frame.remove();
		}
		fixtures.length = 0;
	});

	function createContents({ inline = "", rules = "body { writing-mode: inherit; }", root = "vertical-rl" } = {}) {
		const frame = document.createElement("iframe");
		frame.style.cssText = "width:600px;height:700px;border:0";
		document.body.append(frame);
		const doc = frame.contentDocument;
		doc.head.innerHTML = `<style>html { writing-mode:${root};font:24px serif; } ${rules} h2 { font-size:24px;font-weight:normal;margin:0; } p { margin:0;text-align:justify;text-indent:2em; }</style>`;
		doc.body.innerHTML = `<h2>直排標題</h2><p>${"中文直排閱讀測試。".repeat(80)}</p>`;
		doc.body.style.cssText = inline;
		const contents = new Contents(doc, doc.body, "/6/2[chapter]", 0, "chapter.xhtml");
		fixtures.push({ frame, contents });
		return contents;
	}

	function firstCharacterTop(doc) {
		const heading = doc.querySelector("h2");
		const range = doc.createRange();
		range.setStart(heading.firstChild, 0);
		range.setEnd(heading.firstChild, 1);
		return range.getBoundingClientRect().top - heading.getBoundingClientRect().top;
	}

	it.each(["inherit", "unset", "revert", "revert-layer"])("resolves %s on body before RTL pagination without changing inline direction", (keyword) => {
		const contents = createContents({ rules: `body { writing-mode:${keyword}; }` });
		const doc = contents.document;
		const before = firstCharacterTop(doc);
		const mode = contents.writingMode();
		contents.columns(600, 700, 600, 0, "rtl");
		console.info("writing-mode-inheritance", { keyword, mode, computed: doc.defaultView.getComputedStyle(doc.body).writingMode, direction: doc.documentElement.style.direction, before, after: firstCharacterTop(doc) });
		expect(mode).toBe("vertical-rl");
		expect(doc.documentElement.style.direction).toBe("");
		expect(doc.defaultView.getComputedStyle(doc.body).direction).toBe("ltr");
		expect(firstCharacterTop(doc)).toBeLessThan(30);
	});

	it("resolves an inherited inline writing mode", () => {
		const contents = createContents({ inline: "writing-mode:inherit", rules: "" });
		expect(contents.writingMode()).toBe("vertical-rl");
	});

	it("uses the later vertical body rule after an inherited declaration", () => {
		const contents = createContents({ root: "horizontal-tb", rules: "body { writing-mode:inherit; } html, body { writing-mode:vertical-rl; }" });
		expect(contents.writingMode()).toBe("vertical-rl");
	});

	it("retains the authored vertical mode when the reader shim makes html horizontal", () => {
		const contents = createContents({ root: "horizontal-tb !important", rules: "body { writing-mode:vertical-rl; }" });
		expect(contents.writingMode()).toBe("vertical-rl");
	});

	it("resolves inherited body mode through a later horizontal cover override", () => {
		const contents = createContents({ rules: "body { writing-mode:inherit; } html, body { writing-mode:vertical-rl; } html.cover, html.cover body { writing-mode:horizontal-tb; }" });
		contents.document.documentElement.className = "cover";
		expect(contents.window.getComputedStyle(contents.document.body).writingMode).toBe("horizontal-tb");
		expect(contents.writingMode()).toBe("horizontal-tb");
	});

	it("preserves horizontal RTL content behavior", () => {
		const contents = createContents({ root: "horizontal-tb" });
		expect(contents.writingMode()).toBe("horizontal-tb");
		contents.columns(600, 700, 600, 0, "rtl");
		expect(contents.document.documentElement.style.direction).toBe("rtl");
	});
});

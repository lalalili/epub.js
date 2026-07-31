import { afterEach, describe, expect, it, vi } from "vitest";
import Contents from "../../src/contents";
import EpubCFI from "../../src/epubcfi";

describe("Contents locationOf", () => {
	let contents;

	afterEach(() => {
		contents?.destroy();
		contents = undefined;
		vi.restoreAllMocks();
	});

	function locateCollapsedRange(startContainer, startOffset) {
		let range = document.createRange();
		range.setStart(startContainer, startOffset);
		let toRange = vi.spyOn(EpubCFI.prototype, "toRange").mockReturnValue(range);
		contents = new Contents(document, document.body);

		let position = contents.locationOf("epubcfi(/6/2!/4/2)");

		expect(toRange).toHaveBeenCalledOnce();
		expect(position).toEqual({
			left: expect.any(Number),
			top: expect.any(Number)
		});

		return range;
	}

	it("uses element bounds without applying a text-length range offset", () => {
		let container = document.createElement("div");
		container.innerHTML = "<span>Element range text is longer than its child list.</span>";
		document.body.appendChild(container);
		let consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

		try {
			let range = locateCollapsedRange(container, 0);

			expect(range.startContainer.nodeType).toBe(Node.ELEMENT_NODE);
			expect(range.startContainer.textContent.length).toBeGreaterThan(
				range.startContainer.childNodes.length
			);
			expect(range.startOffset).toBe(0);
			expect(range.collapsed).toBe(true);
			expect(consoleError).not.toHaveBeenCalled();
		} finally {
			container.remove();
		}
	});

	it("expands a collapsed text range by one code point without a range error", () => {
		let container = document.createElement("div");
		container.textContent = "Text range has a valid UTF-16 offset.";
		document.body.appendChild(container);
		let consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

		try {
			let text = container.firstChild;
			let range = locateCollapsedRange(text, 0);

			expect(range.startContainer.nodeType).toBe(Node.TEXT_NODE);
			expect(range.endOffset).toBe(1);
			expect(consoleError).not.toHaveBeenCalled();
		} finally {
			container.remove();
		}
	});
});

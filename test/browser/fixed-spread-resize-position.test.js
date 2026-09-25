import { describe, expect, it, vi } from "vitest";
import Rendition from "../../src/rendition";

const rightCfi = "epubcfi(/2/130[color_page_04]!/4/1:0)";
const leftCfi = "epubcfi(/2/128[color_page_03]!/4/1:0)";

function renditionAtRightPage() {
	const rendition = Object.create(Rendition.prototype);
	rendition.book = {
		spine: {
			get: vi.fn((href) => ({
				properties: href.endsWith("04.xhtml") ? ["page-spread-right"] : ["page-spread-left"]
			}))
		}
	};
	rendition.manager = {
		layout: { name: "pre-paginated", divisor: 2 },
		recordResizeSettleTrace: vi.fn(),
		next: vi.fn(),
		prev: vi.fn()
	};
	rendition.location = { start: { href: "EPUB/color_page_04.xhtml", cfi: rightCfi } };
	rendition.emit = vi.fn();
	rendition.display = vi.fn();
	return rendition;
}

describe("fixed spread resize position", () => {
	it("returns to the right page that was visible before entering a two-page spread", () => {
		const rendition = renditionAtRightPage();

		rendition.onResized({ width: 802, height: 345 });
		expect(rendition.display).toHaveBeenLastCalledWith(rightCfi);

		rendition.location = { start: { href: "EPUB/color_page_03.xhtml", cfi: leftCfi } };
		rendition.manager.layout.divisor = 1;
		rendition.onResized({ width: 393, height: 778 }, leftCfi);
		expect(rendition.display).toHaveBeenLastCalledWith(rightCfi);
	});

	it("drops the remembered right page after an explicit page turn", async () => {
		const rendition = renditionAtRightPage();
		rendition.onResized({ width: 802, height: 345 });
		rendition.q = { enqueue: vi.fn(() => Promise.resolve()) };
		rendition.reportLocation = vi.fn();
		await rendition.next();

		rendition.location = { start: { href: "EPUB/color_page_03.xhtml", cfi: leftCfi } };
		rendition.manager.layout.divisor = 1;
		rendition.onResized({ width: 393, height: 778 });
		expect(rendition.display).toHaveBeenLastCalledWith(leftCfi);
	});
});

import { describe, expect, it } from "vitest";
import DefaultViewManager from "../../src/managers/default";

function createTextRectView(rects, iframeLeft = 0) {
	let yielded = false;
	const textNode = {
		nodeValue: "直排版面邊界測試文字",
		parentElement: {}
	};

	return {
		iframe: {
			getBoundingClientRect: () => ({ left: iframeLeft })
		},
		contents: {
			window: {
				getComputedStyle: () => ({
					display: "block",
					visibility: "visible"
				})
			},
			document: {
				body: {},
				createTreeWalker: () => ({
					nextNode: () => {
						if (yielded) {
							return null;
						}

						yielded = true;
						return textNode;
					}
				}),
				createRange: () => ({
					selectNodeContents: () => {},
					getClientRects: () => rects,
					detach: () => {}
				})
			}
		}
	};
}

function createManager(view) {
	const manager = Object.create(DefaultViewManager.prototype);

	manager.container = {
		getBoundingClientRect: () => ({
			left: 213.1818,
			right: 1533.1818
		})
	};
	manager.layout = {
		edgeGuardPx: 4
	};
	manager.views = {
		first: () => view,
		last: () => view
	};
	manager.getLogicalPageStepToNextPage = () => 1296;
	manager.getPageAdvance = () => 1296;

	return manager;
}

describe("manager viewport snap pipeline", () => {
	it("translates iframe viewport coordinates before applying the right-edge snap", () => {
		const manager = createManager(createTextRectView([
			{
				left: 1522.6846,
				right: 1545.4119,
				width: 22.7273,
				height: 680
			}
		], -8876.6328));

		expect(manager.snapVerticalRlEdgeMaskWidths(
			{ left: 24, right: 0 },
			324,
			{ previousPageStep: 1296, rightMaxMask: 0 }
		)).toEqual({ left: 24, right: 12 });
	});

	it("expands a rendered left mask to cover a line crossing the raw viewport", () => {
		const manager = createManager(createTextRectView([
			{
				left: 213.17,
				right: 235.9,
				width: 22.73,
				height: 740
			}
		]));

		expect(manager.expandVerticalRlLeftMaskToVisibleLine({
			left: 11,
			right: 0
		})).toEqual({ left: 24, right: 0 });
	});

	it("keeps prior mask widths when the manager DOM geometry is unavailable", () => {
		const manager = Object.create(DefaultViewManager.prototype);
		const widths = { left: 9, right: 7 };

		manager.container = {};
		manager.views = {
			first: () => null,
			last: () => null
		};

		expect(manager.snapVerticalRlEdgeMaskWidths(widths, 120)).toBe(widths);
	});
});

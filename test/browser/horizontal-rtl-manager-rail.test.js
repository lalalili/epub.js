import { afterEach, describe, expect, it } from "vitest";
import DefaultViewManager from "../../src/managers/default";

const VIEWPORT_WIDTH = 1296;
const RAIL_WIDTH = 11664;
const PAGE_ADVANCE = 1296;

describe("horizontal RTL manager rail characterization", () => {
	const fixtures = [];

	afterEach(() => {
		fixtures.splice(0).forEach((fixture) => {
			fixture.remove();
		});
	});

	function createRail() {
		const container = document.createElement("div");
		const rail = document.createElement("div");

		container.dir = "rtl";
		container.style.width = VIEWPORT_WIDTH + "px";
		container.style.height = "100px";
		container.style.overflow = "scroll";
		rail.style.width = RAIL_WIDTH + "px";
		rail.style.height = "1px";
		container.appendChild(rail);
		document.body.appendChild(container);
		fixtures.push(container);

		expect(container.clientWidth).toBe(VIEWPORT_WIDTH);
		expect(container.scrollWidth).toBe(RAIL_WIDTH);

		return container;
	}

	function createManager(container, direction) {
		const manager = Object.create(DefaultViewManager.prototype);
		const view = {
			width: () => RAIL_WIDTH,
			contents: {
				writingMode: () => "horizontal-tb"
			}
		};

		manager.container = container;
		manager.isPaginated = true;
		manager.settings = {
			axis: "horizontal",
			direction,
			rtlScrollType: "negative"
		};
		manager.layout = {
			name: "reflowable",
			pageWidth: PAGE_ADVANCE,
			width: PAGE_ADVANCE,
			delta: PAGE_ADVANCE
		};
		manager.views = {
			first: () => view,
			last: () => null
		};
		manager.syncVerticalRlViewportClip = () => {};
		manager.queueVerticalRlBoundarySnapRetry = () => {};

		return manager;
	}

	it("keeps a declared RTL manager on the negative page lattice", () => {
		const container = createRail();
		const manager = createManager(container, "rtl");

		manager.scrollToLogicalPage(1);
		expect(container.scrollLeft).toBe(-PAGE_ADVANCE);
		expect(manager.getNormalizedLogicalScrollLeft()).toBe(PAGE_ADVANCE);

		manager.scrollToLogicalPage(2);
		expect(container.scrollLeft).toBe(-PAGE_ADVANCE * 2);
		expect(manager.getNormalizedLogicalScrollLeft()).toBe(PAGE_ADVANCE * 2);
	});

	it("does not turn a positive logical offset into a partial negative RTL offset", () => {
		const container = createRail();
		const manager = createManager(container, undefined);

		container.scrollLeft = -PAGE_ADVANCE;
		expect(container.scrollLeft).toBe(-PAGE_ADVANCE);

		manager.scrollToLogicalPage(2);

		expect(container.scrollLeft).toBe(0);
		expect(container.scrollLeft).not.toBe(-2268);
		expect(manager.getNormalizedLogicalScrollLeft()).toBe(0);
	});

	it("characterizes stale vertical settings snapping a horizontal spine off lattice", () => {
		const container = createRail();
		const manager = createManager(container, "rtl");
		const snapOffsets = [];

		manager.settings.writingMode = "vertical-rl";
		manager.getCurrentPageIndex = () => 0;
		manager.snapVerticalRlLogicalOffsetToTextBoundary = (logicalOffset) => {
			snapOffsets.push(logicalOffset);
			return 2268;
		};

		expect(manager.views.first().contents.writingMode()).toBe("horizontal-tb");
		expect(manager.isRtlVerticalPaginated()).toBe(true);

		manager.scrollToLogicalPage(2);

		expect(snapOffsets).toEqual([PAGE_ADVANCE * 2]);
		expect(container.scrollLeft).toBe(-2268);

		manager.settings.writingMode = "horizontal-tb";
		expect(manager.isRtlVerticalPaginated()).toBe(false);

		manager.scrollToLogicalPage(2);

		expect(snapOffsets).toEqual([PAGE_ADVANCE * 2]);
		expect(container.scrollLeft).toBe(-PAGE_ADVANCE * 2);
	});
});

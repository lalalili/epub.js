import { describe, expect, it } from "vitest";
import DefaultViewManager from "../../src/managers/default";

describe("horizontal display target while content width settles", () => {
	it("reaches a late CFI after a single-page view expands", async () => {
		const manager = Object.create(DefaultViewManager.prototype);
		const section = { href: "chapter.xhtml", properties: [] };
		let viewWidth = 1572;
		const view = {
			section,
			width: () => viewWidth,
			locationOf: () => ({ left: 2662.54, top: 0 }),
		};
		manager.container = {
			clientWidth: 393,
			clientHeight: 654,
			scrollWidth: 1572,
			scrollHeight: 654,
			scrollLeft: 0,
			scrollTop: 0,
		};
		manager.layout = {
			name: "reflowable",
			divisor: 1,
			width: 393.09,
			delta: 393.09,
		};
		manager.settings = { axis: "horizontal", direction: "ltr" };
		manager.isPaginated = true;
		manager.views = {
			find: () => undefined,
			show: () => {},
		};
		manager.syncSectionLayout = () => {};
		manager.clear = () => {};
		manager.add = async () => view;
		manager.handleNextPrePaginated = () => undefined;
		manager.traceTargetOwnership = () => {};
		manager.recordResizeSettleTrace = () => {};
		manager.syncVerticalRlViewportClip = () => {};
		manager.emit = () => {};
		manager.scrollTo = (left) => {
			manager.container.scrollLeft = Math.min(left,
				manager.container.scrollWidth - manager.container.clientWidth);
		};

		await manager.display(section, "epubcfi(/6/8!/4/12/11:12)");
		expect(manager.container.scrollLeft).toBeCloseTo(1178.91, 1);

		viewWidth = 3145;
		manager.container.scrollWidth = 3145;
		manager.afterResized(view);

		expect(manager.container.scrollLeft).toBeCloseTo(2358.54, 1);
	});
});

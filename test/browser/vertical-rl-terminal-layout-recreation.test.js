import { expect, it } from "vitest";
import DefaultViewManager from "../../src/managers/default";

function createManager() {
	const manager = Object.create(DefaultViewManager.prototype);
	let view = { section: {}, contents: { document } };
	let base = 73;
	let maxScroll = 27646;
	let key = "73:27646:28030:384:384:3";
	manager.container = {};
	manager.layout = {};
	manager.views = { first: () => view, last: () => view };
	manager.isRtlVerticalPaginated = () => true;
	manager.getBaseGeometryPageCount = () => base;
	manager.getMaxLogicalScrollLeft = () => maxScroll;
	manager.getVerticalRlLogicalPageOffsetCacheKey = () => key;
	return {
		manager,
		setGeometry(nextBase, nextMaxScroll, nextKey) {
			base = nextBase;
			maxScroll = nextMaxScroll;
			key = nextKey;
		},
		recreateView(section = view.section) {
			view = { section, contents: { document } };
		}
	};
}

it("restores learned continuation and offsets after a same-Section view crosses transient layout keys", () => {
	const fixture = createManager();
	const { manager } = fixture;
	const stableKey = "73:27646:28030:384:384:3";
	manager.getVerticalRlTerminalLayout().continuationCount = 2;
	manager.cacheVerticalRlLogicalPageOffset(74, 27646, stableKey);
	expect(manager.getTotalPagesForCurrentView()).toBe(75);
	fixture.recreateView();
	fixture.setGeometry(1, 0, "1:0:384:384:384:3");
	expect(manager.getTotalPagesForCurrentView()).toBe(1);
	fixture.setGeometry(31, 11340, "31:11340:11724:384:378:3");
	expect(manager.getTotalPagesForCurrentView()).toBe(31);
	fixture.setGeometry(73, 27646, stableKey);
	expect(manager.getTotalPagesForCurrentView()).toBe(75);
	expect(manager.getCachedVerticalRlLogicalPageOffset(74, stableKey)).toBe(27646);
});

it("keeps a distinct geometry key independent from learned continuation", () => {
	const fixture = createManager();
	fixture.manager.getVerticalRlTerminalLayout().continuationCount = 2;
	fixture.setGeometry(74, 28030, "74:28030:28414:384:384:3");
	expect(fixture.manager.getTotalPagesForCurrentView()).toBe(74);
	expect(fixture.manager.getVerticalRlTerminalLayout().continuationCount).toBe(0);
});

it("does not transfer continuation to another Section with identical geometry", () => {
	const fixture = createManager();
	fixture.manager.getVerticalRlTerminalLayout().continuationCount = 2;
	fixture.recreateView({});
	expect(fixture.manager.getTotalPagesForCurrentView()).toBe(73);
	expect(fixture.manager.getVerticalRlTerminalLayout().continuationCount).toBe(0);
});

// Native 8069, default 24px/2.0: view recreation changes only the fractional
// visual width. Losing the learned offset moves the last page by 90px.
it("retains the learned terminal source cut across subpixel view-width recreation", () => {
	const { manager, recreateView } = createManager();
	let visualWidth = 4233;
	manager.layout = { pageWidth: 393.0909118652344, width: 393.0909118652344, edgeGuardPx: 4 };
	manager.getBaseGeometryPageCount = () => 11;
	manager.getMaxLogicalScrollLeft = () => 3840;
	manager.getPageAdvance = () => 384;
	manager.getVerticalRlVisualContentWidth = () => visualWidth;
	delete manager.getVerticalRlLogicalPageOffsetCacheKey;
	const forwardKey = manager.getVerticalRlLogicalPageOffsetCacheKey(11, 3840);
	manager.getVerticalRlTerminalLayout();
	manager.cacheVerticalRlLogicalPageOffset(10, 3749.818181818182, forwardKey);
	recreateView();
	visualWidth = 4233.090911865234;
	manager.getVerticalRlTerminalLayout();
	const reverseKey = manager.getVerticalRlLogicalPageOffsetCacheKey(11, 3840);
	expect(manager.getCachedVerticalRlLogicalPageOffset(10, reverseKey)).toBe(3749.818181818182);
	// A real extent change must still invalidate the learned source cut.
	visualWidth = 4234.090911865234;
	manager.getVerticalRlTerminalLayout();
	expect(manager.getCachedVerticalRlLogicalPageOffset(10,
		manager.getVerticalRlLogicalPageOffsetCacheKey(11, 3840))).toBeNull();
});

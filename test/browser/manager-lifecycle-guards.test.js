import { describe, expect, it, vi } from "vitest";
import DefaultViewManager from "../../src/managers/default";

/**
 * Lifecycle guards around `stage`.
 *
 * `this.stage` is only created inside `render()`, but consumers can ask for
 * sizes before that — the Capacitor app's initial resize does. Runtime evidence
 * (2026-08-19, Android emulator, epub-reader v1.6.32):
 *
 *   Uncaught TypeError: Cannot read properties of undefined (reading 'bounds')
 *   at DefaultViewManager.bounds
 *
 * Nothing catches that, so it aborts whatever callback was running. These tests
 * pin the guards that keep a pre-render call harmless.
 */
describe("DefaultViewManager stage lifecycle guards", () => {
	function createUnrenderedManager() {
		const manager = Object.create(DefaultViewManager.prototype);

		manager.stage = undefined;

		return manager;
	}

	it("returns a usable bounds object before render instead of throwing", () => {
		const manager = createUnrenderedManager();

		expect(() => manager.bounds()).not.toThrow();
		expect(manager.bounds()).toEqual({ width: 0, height: 0, top: 0, left: 0 });
	});

	it("prefers the last known bounds when one was already measured", () => {
		const manager = createUnrenderedManager();

		manager._bounds = { width: 390, height: 844, top: 0, left: 0 };

		expect(manager.bounds()).toEqual({ width: 390, height: 844, top: 0, left: 0 });
	});

	it("ignores resize before render rather than dereferencing the missing stage", () => {
		const manager = createUnrenderedManager();

		expect(() => manager.resize(390, 844)).not.toThrow();
	});

	it("cancels the vertical-rl boundary snap retry on destroy", () => {
		const manager = Object.create(DefaultViewManager.prototype);
		const cleared = [];

		manager.stage = { destroy: () => {} };
		manager.clear = () => {};
		manager.removeEventListeners = () => {};
		manager.removeVerticalRlViewportClip = () => {};
		manager.orientationTimeout = 1;
		manager.resizeTimeout = 2;
		manager.afterScrolled = 3;
		manager._verticalRlBoundarySnapAfterScroll = 4;

		const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout").mockImplementation((id) => {
			cleared.push(id);
		});

		try {
			manager.destroy();
		} finally {
			clearTimeoutSpy.mockRestore();
		}

		// 沒清掉的話，銷毀後這個重試仍會醒來並操作已拆掉的 stage。
		expect(cleared).toContain(4);
	});
});

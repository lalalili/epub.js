import { describe, expect, it } from "vitest";
import Contents from "../../src/contents";
import Rendition from "../../src/rendition";

describe("Teardown requestAnimationFrame guards", () => {
	function createQueuedRendition(manager) {
		let rendition = Object.create(Rendition.prototype);
		let emitted = [];

		rendition.manager = manager;
		rendition.q = {
			enqueue: function(callback) {
				callback();
				return Promise.resolve();
			}
		};
		rendition.emit = function(eventName, payload) {
			emitted.push({
				eventName,
				payload
			});
		};

		return {
			emitted,
			rendition
		};
	}

	function waitForQueuedReport() {
		return new Promise(function(resolve) {
			setTimeout(resolve, 30);
		});
	}

	it("ignores a queued Contents resize check after the iframe document is cleared", () => {
		let contents = Object.create(Contents.prototype);
		let invalidated = false;

		contents.document = null;
		contents.invalidateVerticalRlMetricsCache = function() {
			invalidated = true;
		};

		expect(function() {
			contents.resizeCheck();
		}).not.toThrow();
		expect(invalidated).toBe(false);
	});

	it("ignores a queued Rendition location report after the manager is cleared", async () => {
		let {emitted, rendition} = createQueuedRendition(null);

		expect(function() {
			rendition.reportLocation();
		}).not.toThrow();

		await waitForQueuedReport();

		expect(emitted).toEqual([]);
	});

	it("ignores a queued Rendition location report when currentLocation throws during teardown", async () => {
		let {emitted, rendition} = createQueuedRendition({
			currentLocation: function() {
				throw new TypeError("Cannot read properties of null (reading 'currentLocation')");
			}
		});

		expect(function() {
			rendition.reportLocation();
		}).not.toThrow();

		await waitForQueuedReport();

		expect(emitted).toEqual([]);
	});
});

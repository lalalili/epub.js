import assert from "assert";
import Contents from "../src/contents";
import Rendition from "../src/rendition";

describe("Teardown requestAnimationFrame guards", function() {
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

	it("ignores a queued Contents resize check after the iframe document is cleared", function() {
		let contents = Object.create(Contents.prototype);
		let invalidated = false;

		contents.document = null;
		contents.invalidateVerticalRlMetricsCache = function() {
			invalidated = true;
		};

		assert.doesNotThrow(function() {
			contents.resizeCheck();
		});
		assert.equal(invalidated, false);
	});

	it("ignores a queued Rendition location report after the manager is cleared", function(done) {
		let {emitted, rendition} = createQueuedRendition(null);

		assert.doesNotThrow(function() {
			rendition.reportLocation();
		});

		setTimeout(function() {
			assert.deepEqual(emitted, []);
			done();
		}, 30);
	});

	it("ignores a queued Rendition location report when currentLocation throws during teardown", function(done) {
		let {emitted, rendition} = createQueuedRendition({
			currentLocation: function() {
				throw new TypeError("Cannot read properties of null (reading 'currentLocation')");
			}
		});

		assert.doesNotThrow(function() {
			rendition.reportLocation();
		});

		setTimeout(function() {
			assert.deepEqual(emitted, []);
			done();
		}, 30);
	});
});

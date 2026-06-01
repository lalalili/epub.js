import assert from "assert";
import {
	getDocument,
	getNavigator,
	getURLConstructor,
	getWindow,
	requestAnimationFrame
} from "../src/platform/browser";
import { requestAnimationFrame as coreRequestAnimationFrame } from "../src/utils/core";

describe("Browser platform boundary", function() {
	it("exposes browser globals through platform helpers", function() {
		assert.equal(getWindow(), window);
		assert.equal(getDocument(), document);
		assert.equal(getNavigator(), navigator);
		assert.equal(getURLConstructor(), URL);
	});

	it("keeps the legacy core requestAnimationFrame export stable", function() {
		assert.equal(coreRequestAnimationFrame, requestAnimationFrame);
		assert.equal(typeof requestAnimationFrame, "function");
	});
});

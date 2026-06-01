import assert from "assert";
import { prefixed as prefixedCssProperty } from "../src/compat/css";
import { prefixed as corePrefixed } from "../src/utils/core";

describe("CSS compatibility helpers", function() {
	it("keeps the legacy core prefixed export aligned", function() {
		assert.equal(corePrefixed("column-width"), prefixedCssProperty("column-width"));
		assert.equal(corePrefixed("writing-mode"), prefixedCssProperty("writing-mode"));
	});

	it("returns the unprefixed property when the browser supports it", function() {
		assert.equal(prefixedCssProperty("width"), "width");
	});
});

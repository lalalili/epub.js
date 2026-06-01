import { describe, expect, it } from "vitest";
import { prefixed as prefixedCssProperty } from "../../src/compat/css";
import { prefixed as corePrefixed } from "../../src/utils/core";

describe("css compatibility helpers", () => {
	it("keeps the legacy core prefixed export aligned", () => {
		expect(corePrefixed("column-width")).toBe(prefixedCssProperty("column-width"));
		expect(corePrefixed("writing-mode")).toBe(prefixedCssProperty("writing-mode"));
	});

	it("returns the unprefixed property when the browser supports it", () => {
		expect(prefixedCssProperty("width")).toBe("width");
	});
});

import { describe, expect, it } from "vitest";
import {
	getDocument,
	getNavigator,
	getURLConstructor,
	getWindow,
	requestAnimationFrame
} from "../../src/platform/browser";
import { requestAnimationFrame as coreRequestAnimationFrame } from "../../src/utils/core";

describe("browser platform boundary", () => {
	it("exposes browser globals through platform helpers", () => {
		expect(getWindow()).toBe(window);
		expect(getDocument()).toBe(document);
		expect(getNavigator()).toBe(navigator);
		expect(getURLConstructor()).toBe(URL);
	});

	it("keeps the legacy core requestAnimationFrame export stable", () => {
		expect(coreRequestAnimationFrame).toBe(requestAnimationFrame);
		expect(typeof requestAnimationFrame).toBe("function");
	});
});

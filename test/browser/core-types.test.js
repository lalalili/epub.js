import { describe, expect, it } from "vitest";
import {
	isElement,
	isFloat,
	isNumber,
	type
} from "../../src/core/types";
import {
	isElement as legacyIsElement,
	isFloat as legacyIsFloat,
	isNumber as legacyIsNumber,
	type as legacyType
} from "../../src/utils/core";

describe("core type helpers", function() {
	it("detects element nodes", function() {
		var element = document.createElement("div");
		var text = document.createTextNode("text");

		expect(isElement(element)).toBe(true);
		expect(isElement(text)).toBe(false);
		expect(isElement(null)).toBe(false);
		expect(legacyIsElement(element)).toBe(isElement(element));
		expect(legacyIsElement(text)).toBe(isElement(text));
	});

	it("detects numeric values", function() {
		expect(isNumber(12)).toBe(true);
		expect(isNumber("12")).toBe(true);
		expect(isNumber("12px")).toBe(false);
		expect(isNumber(Number.NaN)).toBe(false);
		expect(legacyIsNumber("12")).toBe(isNumber("12"));
		expect(legacyIsNumber("12px")).toBe(isNumber("12px"));
	});

	it("detects float values", function() {
		expect(isFloat(1.5)).toBe(true);
		expect(isFloat("1.5")).toBe(true);
		expect(isFloat(2)).toBe(false);
		expect(isFloat("2")).toBe(false);
		expect(isFloat("abc")).toBe(false);
		expect(legacyIsFloat("1.5")).toBe(isFloat("1.5"));
		expect(legacyIsFloat("2")).toBe(isFloat("2"));
	});

	it("returns object type names", function() {
		expect(type([])).toBe("Array");
		expect(type({})).toBe("Object");
		expect(type(null)).toBe("Null");
		expect(type(undefined)).toBe("Undefined");
		expect(legacyType([])).toBe(type([]));
		expect(legacyType(null)).toBe(type(null));
	});
});

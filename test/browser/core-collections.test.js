import { describe, expect, it } from "vitest";
import {
	defaults,
	extend,
	indexOfSorted,
	insert,
	locationOf
} from "../../src/core/collections";
import {
	defaults as legacyDefaults,
	extend as legacyExtend,
	indexOfSorted as legacyIndexOfSorted,
	insert as legacyInsert,
	locationOf as legacyLocationOf
} from "../../src/utils/core";

describe("core collection helpers", function() {
	it("applies defaults without replacing existing values", function() {
		var target = {
			a: 0,
			b: false,
			c: undefined
		};
		var result = defaults(target, { a: 1, b: true, c: 3, d: 4 });

		expect(result).toBe(target);
		expect(result).toEqual({
			a: 0,
			b: false,
			c: 3,
			d: 4
		});

		expect(legacyDefaults({ a: undefined }, { a: 1 })).toEqual(defaults({ a: undefined }, { a: 1 }));
	});

	it("extends property descriptors", function() {
		var target = {};
		var source = {};
		Object.defineProperty(source, "answer", {
			enumerable: false,
			get: function() {
				return 42;
			}
		});

		var result = extend(target, source);
		var descriptor = Object.getOwnPropertyDescriptor(result, "answer");

		expect(result).toBe(target);
		expect(descriptor.enumerable).toBe(false);
		expect(result.answer).toBe(42);

		var legacyResult = legacyExtend({}, source);
		expect(Object.getOwnPropertyDescriptor(legacyResult, "answer").enumerable).toBe(descriptor.enumerable);
		expect(legacyResult.answer).toBe(result.answer);
	});

	it("finds insertion locations in sorted arrays", function() {
		var values = [1, 3, 5, 7];

		expect(locationOf(0, values)).toBe(0);
		expect(locationOf(4, values)).toBe(2);
		expect(locationOf(8, values)).toBe(4);
		expect(legacyLocationOf(4, values)).toBe(locationOf(4, values));
	});

	it("inserts into sorted arrays", function() {
		var values = [1, 3, 5, 7];
		var legacyValues = [1, 3, 5, 7];

		expect(insert(4, values)).toBe(2);
		expect(values).toEqual([1, 3, 4, 5, 7]);
		expect(legacyInsert(4, legacyValues)).toBe(2);
		expect(legacyValues).toEqual(values);
	});

	it("returns existing sorted indexes or -1", function() {
		var values = [1, 3, 5, 7];

		expect(indexOfSorted(1, values)).toBe(0);
		expect(indexOfSorted(5, values)).toBe(2);
		expect(indexOfSorted(6, values)).toBe(-1);
		expect(legacyIndexOfSorted(5, values)).toBe(indexOfSorted(5, values));
	});
});

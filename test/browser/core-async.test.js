import { describe, expect, it } from "vitest";
import {
	defer,
	uuid
} from "../../src/core/async";
import {
	defer as legacyDefer,
	uuid as legacyUuid
} from "../../src/utils/core";

describe("core async helpers", function() {
	it("generates UUID-like identifiers", function() {
		var first = uuid();
		var second = uuid();
		var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/;

		expect(first).toMatch(pattern);
		expect(second).toMatch(pattern);
		expect(first).not.toBe(second);
		expect(legacyUuid()).toMatch(pattern);
	});

	it("resolves pending promises", function() {
		var deferred = new defer();

		expect(Object.isFrozen(deferred)).toBe(true);
		expect(typeof deferred.id).toBe("string");
		expect(typeof deferred.resolve).toBe("function");
		expect(typeof deferred.reject).toBe("function");
		deferred.resolve("ready");

		return expect(deferred.promise).resolves.toBe("ready");
	});

	it("rejects pending promises", function() {
		var deferred = new defer();
		var error = new Error("failed");

		deferred.reject(error);

		return expect(deferred.promise).rejects.toBe(error);
	});

	it("keeps legacy defer exports compatible", function() {
		var deferred = new legacyDefer();

		expect(deferred).toBeInstanceOf(legacyDefer);
		expect(Object.isFrozen(deferred)).toBe(true);
		deferred.resolve("legacy");

		return expect(deferred.promise).resolves.toBe("legacy");
	});
});

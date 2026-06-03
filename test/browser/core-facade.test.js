import { describe, expect, it } from "vitest";
import * as core from "../../src/utils/core";

describe("legacy core facade", () => {
	it("keeps the public helper surface available from utils/core", () => {
		var expectedExports = [
			"RangeObject",
			"blob2base64",
			"borders",
			"bounds",
			"createBase64Url",
			"createBlob",
			"createBlobUrl",
			"defer",
			"defaults",
			"documentHeight",
			"extend",
			"filterChildren",
			"findChildren",
			"getParentByTagName",
			"indexOfElementNode",
			"indexOfNode",
			"indexOfSorted",
			"indexOfTextNode",
			"insert",
			"isElement",
			"isFloat",
			"isNumber",
			"isXml",
			"locationOf",
			"nodeBounds",
			"parents",
			"parse",
			"prefixed",
			"qs",
			"qsa",
			"qsp",
			"querySelectorByType",
			"requestAnimationFrame",
			"revokeBlobUrl",
			"sprint",
			"treeWalker",
			"type",
			"uuid",
			"walk",
			"windowBounds"
		];

		expect(Object.keys(core).sort()).toEqual(expectedExports.sort());
	});

	it("keeps legacy defer constructable", () => {
		var deferred = new core.defer();

		expect(typeof deferred.id).toBe("string");
		deferred.resolve("ready");

		return expect(deferred.promise).resolves.toBe("ready");
	});
});

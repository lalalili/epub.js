import { describe, expect, it } from "vitest";
import {
	blobToBase64,
	createBase64Url,
	createBlob,
	createBlobUrl,
	revokeBlobUrl
} from "../../src/platform/blob";
import {
	blob2base64 as coreBlob2base64,
	createBase64Url as coreCreateBase64Url,
	createBlob as coreCreateBlob,
	createBlobUrl as coreCreateBlobUrl,
	revokeBlobUrl as coreRevokeBlobUrl
} from "../../src/utils/core";

describe("browser blob platform boundary", () => {
	it("creates Blob instances through the platform boundary", () => {
		var blob = createBlob("hello", "text/plain");

		expect(blob).toBeInstanceOf(Blob);
		expect(blob.type).toBe("text/plain");
		return blob.text().then(function(text) {
			expect(text).toBe("hello");
		});
	});

	it("keeps legacy core Blob helpers aligned", () => {
		var blob = coreCreateBlob("legacy", "text/plain");

		expect(blob).toBeInstanceOf(Blob);
		expect(blob.type).toBe("text/plain");
		expect(coreCreateBase64Url("legacy", "text/plain")).toBe(createBase64Url("legacy", "text/plain"));
		expect(coreCreateBase64Url(new Uint8Array([1]), "application/octet-stream")).toBeUndefined();

		return blob.text().then(function(text) {
			expect(text).toBe("legacy");
		});
	});

	it("creates and revokes object URLs through both platform and legacy helpers", () => {
		var platformUrl = createBlobUrl("platform", "text/plain");
		var coreUrl = coreCreateBlobUrl("core", "text/plain");

		expect(platformUrl).toMatch(/^blob:/);
		expect(coreUrl).toMatch(/^blob:/);

		expect(() => revokeBlobUrl(platformUrl)).not.toThrow();
		expect(() => coreRevokeBlobUrl(coreUrl)).not.toThrow();
	});

	it("converts Blobs to base64 data URLs through platform and legacy helpers", function() {
		var blob = createBlob("reader", "text/plain");
		var expected = "data:text/plain;base64,cmVhZGVy";

		return Promise.all([
			blobToBase64(blob).then(function(dataUrl) {
				expect(dataUrl).toBe(expected);
			}),
			coreBlob2base64(blob).then(function(dataUrl) {
				expect(dataUrl).toBe(expected);
			})
		]);
	});
});

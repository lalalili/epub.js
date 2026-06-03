import { describe, expect, it } from "vitest";
import Archive from "../../src/archive";
import { expectBlobUrl, fixtureUrl } from "./helpers/fixtures";

describe("Archive", () => {
	function openAliceArchive() {
		var archive = new Archive();

		return fetch(fixtureUrl("alice.epub"))
			.then(function(response) {
				return response.arrayBuffer();
			})
			.then(function(buffer) {
				return archive.open(buffer);
			})
			.then(function() {
				return archive;
			});
	}

	it("parses XML resources from archived EPUBs", function() {
		var archive;

		return openAliceArchive()
			.then(function(openedArchive) {
				archive = openedArchive;
				return archive.request("/OPS/package.opf", "opf");
			})
			.then(function(packageDocument) {
				expect(packageDocument.getElementsByTagName("package").length).toBe(1);
				expect(packageDocument.getElementsByTagName("manifest").length).toBe(1);
			})
			.finally(function() {
				archive.destroy();
			});
	});

	it("returns blobs and object URLs for archived resources", function() {
		var archive;
		var blob;

		return openAliceArchive()
			.then(function(openedArchive) {
				archive = openedArchive;
				return archive.request("/OPS/images/cover_th.jpg", "blob");
			})
			.then(function(archiveBlob) {
				blob = archiveBlob;
				return archive.createUrl("/OPS/images/cover_th.jpg");
			})
			.then(function(url) {
				expect(blob).toBeInstanceOf(Blob);
				expect(blob.type).toBe("image/jpeg");
				expectBlobUrl(url);
			})
			.finally(function() {
				archive.destroy();
			});
	});

	it("returns base64 data URLs for archived resources", function() {
		var archive;

		return openAliceArchive()
			.then(function(openedArchive) {
				archive = openedArchive;
				return archive.createUrl("/OPS/images/cover_th.jpg", { base64: true });
			})
			.then(function(url) {
				expect(url.startsWith("data:image/jpeg;base64,")).toBe(true);
			})
			.finally(function() {
				archive.destroy();
			});
	});

	it("returns archived text, JSON, and XHTML resources", function() {
		var archive;

		return openAliceArchive()
			.then(function(openedArchive) {
				archive = openedArchive;
				return Promise.all([
					archive.getText("/OPS/chapter_001.xhtml"),
					archive.request("/OPS/chapter_001.xhtml", "xhtml"),
					archive.handleResponse("{\"ok\":true}", "json")
				]);
			})
			.then(function(results) {
				expect(results[0]).toContain("<html");
				expect(results[1].getElementsByTagName("body").length).toBe(1);
				expect(results[2]).toEqual({ ok: true });
			})
			.finally(function() {
				archive.destroy();
			});
	});

	it("caches created URLs, revokes object URLs, rejects missing entries, and clears state", function() {
		var archive;
		var cachedUrl;

		return openAliceArchive()
			.then(function(openedArchive) {
				archive = openedArchive;
				return archive.createUrl("/OPS/images/cover_th.jpg");
			})
			.then(function(url) {
				cachedUrl = url;
				expectBlobUrl(url);
				return archive.createUrl("/OPS/images/cover_th.jpg");
			})
			.then(function(url) {
				expect(url).toBe(cachedUrl);
				archive.revokeUrl("/OPS/images/cover_th.jpg");
				return expect(archive.request("/OPS/missing.xhtml", "xhtml")).rejects.toMatchObject({
					message: "File not found in the epub: /OPS/missing.xhtml"
				});
			})
			.then(function() {
				return expect(archive.createUrl("/OPS/missing.jpg")).rejects.toMatchObject({
					message: "File not found in the epub: /OPS/missing.jpg"
				});
			})
			.finally(function() {
				archive.destroy();
				expect(archive.zip).toBeUndefined();
				expect(archive.urlCache).toEqual({});
			});
	});
});

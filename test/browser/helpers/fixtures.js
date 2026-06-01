import { expect } from "vitest";

const fixtureUrls = {
	"alice.epub": new URL("../../fixtures/alice.epub", import.meta.url).toString(),
	"alice/OPS/images/cover_th.jpg": new URL("../../fixtures/alice/OPS/images/cover_th.jpg", import.meta.url).toString(),
	"alice/OPS/package.opf": new URL("../../fixtures/alice/OPS/package.opf", import.meta.url).toString(),
	"alice_without_cover.epub": new URL("../../fixtures/alice_without_cover.epub", import.meta.url).toString()
};

export function fixtureUrl(path) {
	if (!fixtureUrls[path]) {
		throw new Error(`Unknown browser fixture: ${path}`);
	}

	return fixtureUrls[path];
}

export function expectFixtureUrl(actual, path) {
	var actualUrl = new URL(actual);
	var expectedUrl = new URL(fixtureUrl(path));

	expect(actualUrl.origin).toBe(expectedUrl.origin);
	expect(actualUrl.pathname).toBe(expectedUrl.pathname);
}

export function expectBlobUrl(actual) {
	var blobUrl = new URL(actual);

	expect(blobUrl.protocol).toBe("blob:");
	expect(blobUrl.pathname.length).toBeGreaterThan(1);
}

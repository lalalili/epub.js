import { describe, expect, it } from "vitest";
import Store from "../../src/store";
import { expectBlobUrl } from "./helpers/fixtures";

describe("Store", function() {
	function createStoreWithItems(items, options) {
		var store = Object.create(Store.prototype);
		var saved = [];

		store.urlCache = {};
		store.storage = {
			getItem: function(key) {
				return Promise.resolve(items[key]);
			},
			setItem: function(key, value) {
				items[key] = value;
				saved.push([key, value]);
				return Promise.resolve(value);
			}
		};
		store.name = "test-store";
		store.online = options && "online" in options ? options.online : true;
		store.resolver = options && options.resolver ? options.resolver : function(href) {
			return "/OPS/" + href;
		};
		store.requester = options && options.requester ? options.requester : function(url) {
			return Promise.resolve(new Uint8Array([url.length]));
		};
		store._saved = saved;

		return store;
	}

	it("creates a localForage storage instance and tears down listeners", function() {
		var store = new Store("epubjs-store-test");

		expect(store.name).toBe("epubjs-store-test");
		expect(store.storage).toBeTruthy();
		expect(typeof store.storage.getItem).toBe("function");
		expect(typeof store._status).toBe("function");

		store.destroy();

		expect(store.urlCache).toEqual({});
		expect(store._status).toBeUndefined();
	});

	it("parses XML resources retrieved from storage", function() {
		var key = window.encodeURIComponent("/OPS/package.opf");
		var store = createStoreWithItems({
			[key]: "<?xml version=\"1.0\"?><package><manifest /></package>"
		});

		return store.retrieve("/OPS/package.opf", "opf")
			.then(function(packageDocument) {
				expect(packageDocument.getElementsByTagName("package").length).toBe(1);
				expect(packageDocument.getElementsByTagName("manifest").length).toBe(1);
			});
	});

	it("returns blobs and object URLs for stored resources", function() {
		var key = window.encodeURIComponent("/OPS/images/cover.jpg");
		var store = createStoreWithItems({
			[key]: new Uint8Array([1, 2, 3])
		});
		var blob;

		return store.getBlob("/OPS/images/cover.jpg")
			.then(function(storedBlob) {
				blob = storedBlob;
				return store.createUrl("/OPS/images/cover.jpg");
			})
			.then(function(url) {
				expect(blob).toBeInstanceOf(Blob);
				expect(blob.type).toBe("image/jpeg");
				expectBlobUrl(url);
			});
	});

	it("returns base64 data URLs for stored resources", function() {
		var key = window.encodeURIComponent("/OPS/images/cover.jpg");
		var store = createStoreWithItems({
			[key]: new Uint8Array([1, 2, 3])
		});

		return store.createUrl("/OPS/images/cover.jpg", { base64: true })
			.then(function(url) {
				expect(url.startsWith("data:image/jpeg;base64,")).toBe(true);
			});
	});

	it("adds resources, skips cached items, and force refreshes stored data", function() {
		var existingKey = window.encodeURIComponent("/OPS/cached.css");
		var requests = [];
		var store = createStoreWithItems({
			[existingKey]: new Uint8Array([9])
		}, {
			requester: function(url) {
				requests.push(url);
				return Promise.resolve(new Uint8Array([url.length]));
			}
		});
		var resources = {
			resources: [
				{ href: "cached.css" },
				{ href: "missing.css" }
			]
		};

		return store.add(resources)
			.then(function(results) {
				expect(results[0]).toEqual(new Uint8Array([9]));
				expect(requests).toEqual(["/OPS/missing.css"]);
				expect(store._saved.length).toBe(1);
				return store.add(resources, true);
			})
			.then(function() {
				expect(requests).toEqual(["/OPS/missing.css", "/OPS/cached.css", "/OPS/missing.css"]);
			});
	});

	it("requests from network while online, stores a copy, and retrieves while offline", function() {
		var key = window.encodeURIComponent("/OPS/data.json");
		var store = createStoreWithItems({
			[key]: "{\"cached\":true}"
		}, {
			online: true,
			requester: function(url, type, withCredentials, headers) {
				expect(url).toBe("/OPS/data.json");
				expect(type).toBe("json");
				expect(withCredentials).toBe(true);
				expect(headers).toEqual({ Accept: "application/json" });
				return Promise.resolve({ live: true });
			}
		});

		return store.request("/OPS/data.json", "json", true, { Accept: "application/json" })
			.then(function(result) {
				expect(result).toEqual({ live: true });
				store.online = false;
				return store.request("/OPS/data.json", "json");
			})
			.then(function(result) {
				expect(result).toEqual({ cached: true });
			});
	});

	it("caches created URLs, revokes object URLs, updates online status, and rejects missing storage entries", function() {
		var key = window.encodeURIComponent("/OPS/images/cover.jpg");
		var store = createStoreWithItems({
			[key]: new Uint8Array([1, 2, 3])
		});
		var onlineEvents = 0;
		var offlineEvents = 0;

		store.emit = function(eventName) {
			if (eventName === "online") {
				onlineEvents += 1;
			}
			if (eventName === "offline") {
				offlineEvents += 1;
			}
		};

		return store.createUrl("/OPS/images/cover.jpg")
			.then(function(url) {
				expectBlobUrl(url);
				return store.createUrl("/OPS/images/cover.jpg").then(function(cachedUrl) {
					expect(cachedUrl).toBe(url);
					store.revokeUrl("/OPS/images/cover.jpg");
				});
			})
			.then(function() {
				var originalNavigator = Object.getOwnPropertyDescriptor(Navigator.prototype, "onLine");

				Object.defineProperty(Navigator.prototype, "onLine", {
					configurable: true,
					get: function() {
						return false;
					}
				});
				store.status();
				expect(store.online).toBe(false);
				expect(offlineEvents).toBe(1);

				Object.defineProperty(Navigator.prototype, "onLine", {
					configurable: true,
					get: function() {
						return true;
					}
				});
				store.status();
				expect(store.online).toBe(true);
				expect(onlineEvents).toBe(1);

				if (originalNavigator) {
					Object.defineProperty(Navigator.prototype, "onLine", originalNavigator);
				}

				return expect(store.retrieve("/OPS/missing.xhtml", "xhtml")).rejects.toMatchObject({
					message: "File not found in storage: /OPS/missing.xhtml"
				});
			});
	});
});

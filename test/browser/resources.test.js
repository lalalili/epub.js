import { describe, expect, it } from "vitest";
import Resources from "../../src/resources";

function createResources(options) {
	var manifest = {
		chapter: {
			href: "Text/chapter.xhtml",
			type: "application/xhtml+xml"
		},
		style: {
			href: "Styles/main.css",
			type: "text/css"
		},
		cover: {
			href: "Images/cover.jpg",
			type: "image/jpeg"
		}
	};

	return new Resources(manifest, Object.assign({
		resolver: function(href) {
			return "/OPS/" + href;
		},
		request: function(url, type) {
			if (type === "blob") {
				return Promise.resolve(new Blob(["asset:" + url], { type: "text/plain" }));
			}

			if (type === "text") {
				return Promise.resolve("body { background: url(../Images/cover.jpg); }");
			}
		}
	}, options || {}));
}

describe("Resources", function() {
	it("splits manifest resources into html, css, and asset groups", function() {
		var resources = createResources();

		expect(resources.html.map(function(item) {
			return item.href;
		})).toEqual(["Text/chapter.xhtml"]);
		expect(resources.css.map(function(item) {
			return item.href;
		})).toEqual(["Styles/main.css"]);
		expect(resources.urls).toEqual(["Styles/main.css", "Images/cover.jpg"]);
	});

	it("creates base64 data URLs for requested resource blobs", function() {
		var resources = createResources();

		return resources.createUrl("/OPS/Images/cover.jpg").then(function(url) {
			expect(url).toMatch(/^data:image\/jpeg;base64,/);
		});
	});

	it("creates object URLs when configured for blob replacements", function() {
		var resources = createResources({
			replacements: "blob"
		});

		return resources.createUrl("/OPS/Images/cover.jpg").then(function(url) {
			expect(url).toMatch(/^blob:/);
			URL.revokeObjectURL(url);
		});
	});

	it("delegates URL creation to the archive when provided", function() {
		var resources = createResources({
			archive: {
				createUrl: function(url, options) {
					return Promise.resolve("archive:" + url + ":" + options.base64);
				}
			}
		});

		return resources.createUrl("/OPS/Images/cover.jpg").then(function(url) {
			expect(url).toBe("archive:/OPS/Images/cover.jpg:true");
		});
	});

	it("returns original URLs when replacements are disabled", function() {
		var resources = createResources({
			replacements: "none"
		});

		return resources.replacements().then(function(urls) {
			expect(urls).toEqual(["Styles/main.css", "Images/cover.jpg"]);
		});
	});

	it("builds replacement URLs through the resolver and filters failed resources", function() {
		var resources = createResources({
			resolver: function(href) {
				return "/OPS/" + href;
			},
			request: function(url, type) {
				if (url.includes("cover")) {
					return Promise.reject(new Error("missing asset"));
				}

				return Promise.resolve(new Blob(["asset:" + url], { type: "text/css" }));
			}
		});

		return resources.replacements().then(function(urls) {
			expect(urls[0]).toMatch(/^data:text\/css;base64,/);
			expect(urls[1]).toBeNull();
			expect(resources.replacementUrls).toEqual([urls[0]]);
		});
	});

	it("creates replaced CSS files using replacement URLs", function() {
		var resources = createResources();

		resources.replacementUrls = ["data:text/css;base64,bWFpbg==", "data:image/jpeg;base64,Y292ZXI="];

		return resources.createCssFile("Styles/main.css").then(function(url) {
			var decoded = atob(url.split(",")[1]);

			expect(url).toMatch(/^data:text\/css;base64,/);
			expect(decoded).toContain("data:image/jpeg;base64,Y292ZXI=");
		});
	});

	it("updates CSS replacement slots after replacing stylesheet contents", function() {
		var resources = createResources();

		resources.replacementUrls = ["data:text/css;base64,bWFpbg==", "data:image/jpeg;base64,Y292ZXI="];

		return resources.replaceCss().then(function() {
			expect(resources.replacementUrls[0]).toMatch(/^data:text\/css;base64,/);
			expect(atob(resources.replacementUrls[0].split(",")[1])).toContain("data:image/jpeg;base64,Y292ZXI=");
			expect(resources.replacementUrls[1]).toBe("data:image/jpeg;base64,Y292ZXI=");
		});
	});

	it("resolves relative URLs, returns replacement URLs, and substitutes content", function() {
		var resources = createResources();

		resources.replacementUrls = ["data:text/css;base64,bWFpbg==", "data:image/jpeg;base64,Y292ZXI="];

		expect(resources.relativeTo("/OPS/Text/chapter.xhtml")).toEqual([
			"../Styles/main.css",
			"../Images/cover.jpg"
		]);

		return resources.get("Images/cover.jpg").then(function(url) {
			expect(url).toBe("data:image/jpeg;base64,Y292ZXI=");
			expect(resources.get("missing.jpg")).toBeUndefined();
			expect(resources.substitute("url(../Images/cover.jpg)", "/OPS/Text/chapter.xhtml")).toBe("url(data:image/jpeg;base64,Y292ZXI=)");
		});
	});

	it("skips absolute CSS hrefs and clears state on destroy", function() {
		var resources = createResources();

		return resources.createCssFile("/absolute/main.css").then(function(url) {
			expect(url).toBeUndefined();

			resources.destroy();

			expect(resources.settings).toBeUndefined();
			expect(resources.manifest).toBeUndefined();
			expect(resources.urls).toBeUndefined();
		});
	});
});

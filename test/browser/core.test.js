import { describe, expect, it } from "vitest";
import Url from "../../src/utils/url";
import Path from "../../src/utils/path";

describe("core url and path helpers", () => {
	describe("Url", () => {
		it("parses an absolute URL", () => {
			var url = new Url("http://example.com/fred/chasen/derf.html");

			expect(url.href).toBe("http://example.com/fred/chasen/derf.html");
			expect(url.directory).toBe("/fred/chasen/");
			expect(url.extension).toBe("html");
			expect(url.filename).toBe("derf.html");
			expect(url.origin).toBe("http://example.com");
			expect(url.protocol).toBe("http:");
			expect(url.search).toBe("");
		});

		describe("resolve", () => {
			it("joins subfolders", () => {
				var a = "http://example.com/fred/chasen/";
				var b = "ops/derf.html";

				expect(new Url(a).resolve(b)).toBe("http://example.com/fred/chasen/ops/derf.html");
			});

			it("resolves up a level", () => {
				var a = "http://example.com/fred/chasen/index.html";
				var b = "../derf.html";

				expect(new Url(a).resolve(b)).toBe("http://example.com/fred/derf.html");
			});

			it("resolves absolute paths", () => {
				var a = "http://example.com/fred/chasen/index.html";
				var b = "/derf.html";

				expect(new Url(a).resolve(b)).toBe("http://example.com/derf.html");
			});

			it("resolves with search strings", () => {
				var a = "http://example.com/fred/chasen/index.html?debug=true";
				var b = "/derf.html";

				expect(new Url(a).resolve(b)).toBe("http://example.com/derf.html");
			});

			it.skip("handles directory paths with a dot", () => {
				var url = new Url("http://example.com/fred/chasen/index.epub/");

				expect(url.directory).toBe("/fred/chasen/index.epub/");
				expect(url.extension).toBe("");
			});

			it("handles file URLs", () => {
				var href = "file:///var/mobile/Containers/Data/Application/F47E4434-9B98-4654-93F1-702336B08EE6/Documents/books/moby-dick/derf.html";
				var url = new Url(href);

				expect(url.href).toBe(href);
				expect(url.directory).toBe("/var/mobile/Containers/Data/Application/F47E4434-9B98-4654-93F1-702336B08EE6/Documents/books/moby-dick/");
				expect(url.extension).toBe("html");
				expect(url.filename).toBe("derf.html");
				expect(url.origin).toBe("file://");
				expect(url.protocol).toBe("file:");
				expect(url.search).toBe("");
			});

			it("resolves with file URLs", () => {
				var a = "file:///var/mobile/Containers/Data/Application/books/";
				var b = "derf.html";

				expect(new Url(a).resolve(b)).toBe("file:///var/mobile/Containers/Data/Application/books/derf.html");
			});
		});
	});

	describe("Path", () => {
		it("parses a path", () => {
			var path = new Path("/fred/chasen/derf.html");

			expect(path.path).toBe("/fred/chasen/derf.html");
			expect(path.directory).toBe("/fred/chasen/");
			expect(path.extension).toBe("html");
			expect(path.filename).toBe("derf.html");
		});

		it("strips out URL origins", () => {
			var path = new Path("http://example.com/fred/chasen/derf.html");

			expect(path.path).toBe("/fred/chasen/derf.html");
			expect(path.directory).toBe("/fred/chasen/");
			expect(path.extension).toBe("html");
			expect(path.filename).toBe("derf.html");
		});

		describe("parse", () => {
			it("parses an absolute path", () => {
				var path = Path.prototype.parse("/fred/chasen/derf.html");

				expect(path.dir).toBe("/fred/chasen");
				expect(path.base).toBe("derf.html");
				expect(path.ext).toBe(".html");
			});

			it("parses a relative path", () => {
				var path = Path.prototype.parse("fred/chasen/derf.html");

				expect(path.dir).toBe("fred/chasen");
				expect(path.base).toBe("derf.html");
				expect(path.ext).toBe(".html");
			});
		});

		describe("isDirectory", () => {
			it("recognizes a directory", () => {
				expect(Path.prototype.isDirectory("/fred/chasen/")).toBe(true);
				expect(Path.prototype.isDirectory("/fred/chasen/derf.html")).toBe(false);
			});
		});

		describe("resolve", () => {
			it("resolves a path", () => {
				expect(new Path("/fred/chasen/index.html").resolve("derf.html")).toBe("/fred/chasen/derf.html");
			});

			it("resolves a relative path", () => {
				expect(new Path("fred/chasen/index.html").resolve("derf.html")).toBe("/fred/chasen/derf.html");
			});

			it("resolves a level up", () => {
				expect(new Path("/fred/chasen/index.html").resolve("../derf.html")).toBe("/fred/derf.html");
			});
		});

		describe("relative", () => {
			it("finds a relative path at the same level", () => {
				var relative = new Path("/fred/chasen/index.html").relative("/fred/chasen/derf.html");

				expect(relative).toBe("derf.html");
			});

			it("finds a relative path down a level", () => {
				var relative = new Path("/fred/chasen/index.html").relative("/fred/chasen/ops/derf.html");

				expect(relative).toBe("ops/derf.html");
			});

			it("resolves a level up", () => {
				var relative = new Path("/fred/chasen/index.html").relative("/fred/derf.html");

				expect(relative).toBe("../derf.html");
			});
		});
	});
});

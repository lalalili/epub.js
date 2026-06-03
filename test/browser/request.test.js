import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "../../src/utils/request";

var originalXMLHttpRequest = window.XMLHttpRequest;

function FakeXMLHttpRequest() {
	this.headers = {};
	this.readyState = 0;
	this.response = null;
	this.responseText = "";
	this.responseType = "";
	this.responseXML = null;
	this.status = 200;
	this.withCredentials = false;
	FakeXMLHttpRequest.instances.push(this);
}

FakeXMLHttpRequest.DONE = 4;
FakeXMLHttpRequest.instances = [];
FakeXMLHttpRequest.responses = [];

FakeXMLHttpRequest.prototype.open = function(method, url, async) {
	this.method = method;
	this.url = url;
	this.async = async;
};

FakeXMLHttpRequest.prototype.setRequestHeader = function(header, value) {
	this.headers[header] = value;
};

FakeXMLHttpRequest.prototype.overrideMimeType = function(mime) {
	this.overriddenMimeType = mime;
};

FakeXMLHttpRequest.prototype.send = function() {
	var response = FakeXMLHttpRequest.responses.shift();

	if (!response) {
		response = {};
	}

	if (response.error) {
		this.onerror(response.error);
		return;
	}

	this.status = typeof response.status === "number" ? response.status : 200;
	this.responseType = response.responseType || this.responseType;
	this.response = Object.prototype.hasOwnProperty.call(response, "response") ? response.response : "";
	this.responseText = Object.prototype.hasOwnProperty.call(response, "responseText") ? response.responseText : this.response;
	this.responseXML = response.responseXML || null;
	this.readyState = FakeXMLHttpRequest.DONE;
	this.onreadystatechange();
};

describe("request", function() {
	beforeEach(function() {
		FakeXMLHttpRequest.instances = [];
		FakeXMLHttpRequest.responses = [];
		window.XMLHttpRequest = FakeXMLHttpRequest;
	});

	afterEach(function() {
		window.XMLHttpRequest = originalXMLHttpRequest;
	});

	it("parses XML EPUB resources through the request parser path", function() {
		FakeXMLHttpRequest.responses.push({
			response: "<?xml version=\"1.0\"?><package><metadata><title>Book</title></metadata></package>"
		});

		return request("/OPS/package.opf").then(function(doc) {
			var xhr = FakeXMLHttpRequest.instances[0];

			expect(xhr.method).toBe("GET");
			expect(xhr.overriddenMimeType).toBe("text/xml");
			expect(doc.getElementsByTagName("title")[0].textContent).toBe("Book");
		});
	});

	it("parses JSON responses and applies credentials and headers", function() {
		FakeXMLHttpRequest.responses.push({
			response: "{\"ok\":true}"
		});

		return request("/metadata.json", "json", true, { Authorization: "Bearer token" }).then(function(data) {
			var xhr = FakeXMLHttpRequest.instances[0];

			expect(xhr.withCredentials).toBe(true);
			expect(xhr.headers.Authorization).toBe("Bearer token");
			expect(xhr.headers.Accept).toBe("application/json");
			expect(data.ok).toBe(true);
		});
	});

	it("returns blob responses without parsing", function() {
		var blob = new Blob(["cover"], { type: "image/jpeg" });

		FakeXMLHttpRequest.responses.push({
			response: blob
		});

		return request("/OPS/images/cover.jpg", "blob").then(function(response) {
			var xhr = FakeXMLHttpRequest.instances[0];

			expect(xhr.responseType).toBe("blob");
			expect(response).toBe(blob);
		});
	});

	it("returns binary array buffers and parses XHTML and HTML responses", function() {
		var buffer = new ArrayBuffer(4);

		FakeXMLHttpRequest.responses.push(
			{ response: buffer },
			{ response: "<html xmlns=\"http://www.w3.org/1999/xhtml\"><body><p>XHTML</p></body></html>" },
			{ response: "<html><body><p>HTML</p></body></html>" }
		);

		return request("/book.epub", "binary")
			.then(function(response) {
				var xhr = FakeXMLHttpRequest.instances[0];

				expect(xhr.responseType).toBe("arraybuffer");
				expect(response).toBe(buffer);
				return request("/OPS/chapter.xhtml", "xhtml");
			})
			.then(function(doc) {
				expect(doc.getElementsByTagName("p")[0].textContent).toBe("XHTML");
				return request("/preview.html", "html");
			})
			.then(function(doc) {
				expect(doc.getElementsByTagName("p")[0].textContent).toBe("HTML");
			});
	});

	it("uses responseXML when provided and rejects empty or forbidden responses", function() {
		var xmlDoc = new DOMParser().parseFromString("<package><metadata /></package>", "text/xml");

		FakeXMLHttpRequest.responses.push(
			{ responseXML: xmlDoc },
			{ status: 200, response: "" },
			{ status: 403, response: "Forbidden body" }
		);

		return request("/OPS/package.opf", "opf")
			.then(function(doc) {
				expect(doc).toBe(xmlDoc);
				return expect(request("/empty.txt", "text")).rejects.toMatchObject({
					status: 200,
					message: "Empty Response"
				});
			})
			.then(function() {
				return expect(request("/forbidden.txt", "text")).rejects.toMatchObject({
					status: 403,
					message: "Forbidden body"
				});
			});
	});

	it("rejects network errors from xhr.onerror", function() {
		var networkError = new Error("network down");

		FakeXMLHttpRequest.responses.push({
			error: networkError
		});

		return expect(request("/offline.xhtml", "xhtml")).rejects.toBe(networkError);
	});

	it("rejects failed request statuses with status and message", function() {
		FakeXMLHttpRequest.responses.push({
			status: 404,
			response: "Not Found"
		});

		return request("/missing.xhtml", "xhtml").then(
			function() {
				throw new Error("Expected request to reject");
			},
			function(error) {
				expect(error.status).toBe(404);
				expect(error.message).toBe("Not Found");
			}
		);
	});
});

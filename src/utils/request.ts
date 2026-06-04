import { defer } from "../core/async";
import { parseMarkup as parse } from "../platform/parser";
import { isXml } from "./mime";
import Path from "./path";

export type JsonValue =
	| null
	| boolean
	| number
	| string
	| JsonValue[]
	| { [key: string]: JsonValue };

export type RequestType =
	| "binary"
	| "blob"
	| "json"
	| "xml"
	| "opf"
	| "ncx"
	| "xhtml"
	| "html"
	| "htm"
	| "text"
	| string;

export type RequestHeaders = Record<string, string>;
export type RequestResponse = ArrayBuffer | Blob | string | JsonValue | Document | XMLDocument;

export interface RequestMethod {
	(url: string, type: "binary", withCredentials?: boolean, headers?: RequestHeaders): Promise<ArrayBuffer>;
	(url: string, type: "blob", withCredentials?: boolean, headers?: RequestHeaders): Promise<Blob>;
	(url: string, type: "json", withCredentials?: boolean, headers?: RequestHeaders): Promise<JsonValue>;
	(url: string, type: "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm", withCredentials?: boolean, headers?: RequestHeaders): Promise<Document | XMLDocument>;
	(url: string, type: "text", withCredentials?: boolean, headers?: RequestHeaders): Promise<string>;
	(url: string, type?: RequestType | null, withCredentials?: boolean, headers?: RequestHeaders): Promise<RequestResponse>;
}

type DeferConstructor = new () => {
	promise: Promise<RequestResponse>;
	resolve(value?: RequestResponse): void;
	reject(error?: unknown): void;
};

function request(url: string, type: "binary", withCredentials?: boolean, headers?: RequestHeaders): Promise<ArrayBuffer>;
function request(url: string, type: "blob", withCredentials?: boolean, headers?: RequestHeaders): Promise<Blob>;
function request(url: string, type: "json", withCredentials?: boolean, headers?: RequestHeaders): Promise<JsonValue>;
function request(url: string, type: "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm", withCredentials?: boolean, headers?: RequestHeaders): Promise<Document | XMLDocument>;
function request(url: string, type: "text", withCredentials?: boolean, headers?: RequestHeaders): Promise<string>;
function request(url: string, type?: RequestType | null, withCredentials?: boolean, headers?: RequestHeaders): Promise<RequestResponse>;
function request(url: string, type?: RequestType | null, withCredentials?: boolean, headers?: RequestHeaders): Promise<RequestResponse> {
	var supportsURL = (typeof window != "undefined") ? window.URL : false; // TODO: fallback for url if window isn't defined
	var BLOB_RESPONSE: XMLHttpRequestResponseType = supportsURL ? "blob" : "arraybuffer";

	var deferred = new (defer as unknown as DeferConstructor)();

	var xhr = new XMLHttpRequest();

	//-- Check from PDF.js:
	//   https://github.com/mozilla/pdf.js/blob/master/web/compatibility.js
	var xhrPrototype = XMLHttpRequest.prototype;

	var header: string;

	if (!("overrideMimeType" in xhrPrototype)) {
		// IE10 might have response, but not overrideMimeType
		Object.defineProperty(xhrPrototype, "overrideMimeType", {
			value: function xmlHttpRequestOverrideMimeType() {}
		});
	}

	if(withCredentials) {
		xhr.withCredentials = true;
	}

	xhr.onreadystatechange = handler;
	xhr.onerror = err;

	xhr.open("GET", url, true);

	for(header in headers || {}) {
		xhr.setRequestHeader(header, headers![header]);
	}

	if(type == "json") {
		xhr.setRequestHeader("Accept", "application/json");
	}

	// If type isn"t set, determine it from the file extension
	if(!type) {
		type = new Path(url).extension;
	}

	if(type == "blob"){
		xhr.responseType = BLOB_RESPONSE;
	}


	if(isXml(type)) {
		// xhr.responseType = "document";
		xhr.overrideMimeType("text/xml"); // for OPF parsing
	}

	if(type == "xhtml") {
		// xhr.responseType = "document";
	}

	if(type == "html" || type == "htm") {
		// xhr.responseType = "document";
	}

	if(type == "binary") {
		xhr.responseType = "arraybuffer";
	}

	xhr.send();

	function err(e: ProgressEvent<XMLHttpRequestEventTarget>) {
		deferred.reject(e);
	}

	function handler(this: XMLHttpRequest) {
		if (this.readyState === XMLHttpRequest.DONE) {
			var responseXML: Document | false = false;

			if(this.responseType === "" || this.responseType === "document") {
				responseXML = this.responseXML;
			}

			if (this.status === 200 || this.status === 0 || responseXML) { //-- Firefox is reporting 0 for blob urls
				var r: RequestResponse;

				if (!this.response && !responseXML) {
					deferred.reject({
						status: this.status,
						message : "Empty Response",
						stack : new Error().stack
					});
					return deferred.promise;
				}

				if (this.status === 403) {
					deferred.reject({
						status: this.status,
						response: this.response,
						message : "Forbidden",
						stack : new Error().stack
					});
					return deferred.promise;
				}
				if(responseXML){
					r = responseXML;
				} else if(isXml(type)){
					// xhr.overrideMimeType("text/xml"); // for OPF parsing
					// If this.responseXML wasn't set, try to parse using a DOMParser from text
					r = parse(this.response, "text/xml");
				} else if(type == "xhtml"){
					r = parse(this.response, "application/xhtml+xml");
				} else if(type == "html" || type == "htm"){
					r = parse(this.response, "text/html");
				} else if(type == "json"){
					r = JSON.parse(this.response) as JsonValue;
				} else if(type == "blob"){

					if(supportsURL) {
						r = this.response as Blob;
					} else {
						//-- Safari doesn't support responseType blob, so create a blob from arraybuffer
						r = new Blob([this.response as BlobPart]);
					}

				} else {
					r = this.response as ArrayBuffer | string;
				}

				deferred.resolve(r);
			} else {

				deferred.reject({
					status: this.status,
					message : this.response,
					stack : new Error().stack
				});

			}
		}
	}

	return deferred.promise;
}

export default request;

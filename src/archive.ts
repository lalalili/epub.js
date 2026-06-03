import { defer } from "./core/async";
import { parseMarkup as parse } from "./platform/parser";
import request from "./utils/request";
import mime, { isXml } from "./utils/mime";
import Path from "./utils/path";
import JSZip from "jszip/dist/jszip";

type ArchiveInput = ArrayBuffer | Uint8Array | string;
type ArchiveRequestType = string | undefined;
type ArchiveUrlOptions = {
	base64?: boolean;
};
type ArchiveEntry = {
	name: string;
	async(type: "uint8array"): Promise<Uint8Array>;
	async(type: "string"): Promise<string>;
	async(type: "base64"): Promise<string>;
};
type ArchiveZip = {
	loadAsync(input: ArchiveInput, options?: { base64?: boolean }): Promise<any>;
	file(path: string): ArchiveEntry | null;
};
type UrlFactory = typeof URL & {
	webkitURL?: typeof URL;
	mozURL?: typeof URL;
};
type DeferConstructor = new () => {
	promise: Promise<any>;
	resolve(value?: any): void;
	reject(error?: any): void;
};

/**
 * Handles Unzipping a requesting files from an Epub Archive
 * @class
 */
class Archive {
	zip?: ArchiveZip;
	urlCache: Record<string, string>;

	constructor() {
		this.zip = undefined;
		this.urlCache = {};

		this.checkRequirements();

	}

	/**
	 * Checks to see if JSZip exists in global namspace,
	 * Requires JSZip if it isn't there
	 * @private
	 */
	checkRequirements(): void {
		try {
			this.zip = new JSZip() as ArchiveZip;
		} catch (e) {
			throw new Error("JSZip lib not loaded");
		}
	}

	/**
	 * Open an archive
	 * @param  {binary} input
	 * @param  {boolean} [isBase64] tells JSZip if the input data is base64 encoded
	 * @return {Promise} zipfile
	 */
	open(input: ArchiveInput, isBase64?: boolean): Promise<any> {
		return this.zip!.loadAsync(input, {"base64": isBase64});
	}

	/**
	 * Load and Open an archive
	 * @param  {string} zipUrl
	 * @param  {boolean} [isBase64] tells JSZip if the input data is base64 encoded
	 * @return {Promise} zipfile
	 */
	openUrl(zipUrl: string, isBase64?: boolean): Promise<any> {
		return request(zipUrl, "binary")
			.then((data: ArchiveInput) => {
				return this.zip!.loadAsync(data, {"base64": isBase64});
			});
	}

	/**
	 * Request a url from the archive
	 * @param  {string} url  a url to request from the archive
	 * @param  {string} [type] specify the type of the returned result
	 * @return {Promise<Blob | string | JSON | Document | XMLDocument>}
	 */
	request(url: string, type?: ArchiveRequestType): Promise<any> {
		var deferred = new (defer as unknown as DeferConstructor)();
		var response: Promise<any> | undefined;
		var path = new Path(url);

		// If type isn't set, determine it from the file extension
		if(!type) {
			type = path.extension;
		}

		if(type == "blob"){
			response = this.getBlob(url);
		} else {
			response = this.getText(url);
		}

		if (response) {
			response.then((r) => {
				let result = this.handleResponse(r, type);
				deferred.resolve(result);
			});
		} else {
			deferred.reject({
				message : "File not found in the epub: " + url,
				stack : new Error().stack
			});
		}
		return deferred.promise;
	}

	/**
	 * Handle the response from request
	 * @private
	 * @param  {any} response
	 * @param  {string} [type]
	 * @return {any} the parsed result
	 */
	handleResponse(response: any, type?: ArchiveRequestType): any {
		var r;

		if(type == "json") {
			r = JSON.parse(response);
		} else if(isXml(type)) {
			r = parse(response, "text/xml");
		} else if(type == "xhtml") {
			r = parse(response, "application/xhtml+xml");
		} else if(type == "html" || type == "htm") {
			r = parse(response, "text/html");
		} else {
			r = response;
		}

		return r;
	}

	/**
	 * Get a Blob from Archive by Url
	 * @param  {string} url
	 * @param  {string} [mimeType]
	 * @return {Blob}
	 */
	getBlob(url: string, mimeType?: string): Promise<Blob> | undefined {
		var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash
		var entry = this.zip!.file(decodededUrl);

		if(entry) {
			mimeType = mimeType || mime.lookup(entry.name);
			return entry.async("uint8array").then(function(uint8array) {
				return new Blob([uint8array as BlobPart], {type : mimeType});
			});
		}
	}

	/**
	 * Get Text from Archive by Url
	 * @param  {string} url
	 * @param  {string} [encoding]
	 * @return {string}
	 */
	getText(url: string, encoding?: string): Promise<string> | undefined {
		var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash
		var entry = this.zip!.file(decodededUrl);

		if(entry) {
			return entry.async("string").then(function(text) {
				return text;
			});
		}
	}

	/**
	 * Get a base64 encoded result from Archive by Url
	 * @param  {string} url
	 * @param  {string} [mimeType]
	 * @return {string} base64 encoded
	 */
	getBase64(url: string, mimeType?: string): Promise<string> | undefined {
		var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash
		var entry = this.zip!.file(decodededUrl);

		if(entry) {
			mimeType = mimeType || mime.lookup(entry.name);
			return entry.async("base64").then(function(data) {
				return "data:" + mimeType + ";base64," + data;
			});
		}
	}

	/**
	 * Create a Url from an unarchived item
	 * @param  {string} url
	 * @param  {object} [options.base64] use base64 encoding or blob url
	 * @return {Promise} url promise with Url string
	 */
	createUrl(url: string, options?: ArchiveUrlOptions): Promise<string> {
		var deferred = new (defer as unknown as DeferConstructor)();
		var _URL = (window.URL || (window as unknown as UrlFactory).webkitURL || (window as unknown as UrlFactory).mozURL) as typeof URL;
		var tempUrl;
		var response: Promise<any> | undefined;
		var useBase64 = options && options.base64;

		if(url in this.urlCache) {
			deferred.resolve(this.urlCache[url]);
			return deferred.promise;
		}

		if (useBase64) {
			response = this.getBase64(url);

			if (response) {
					response.then((tempUrl) => {

						this.urlCache[url] = tempUrl;
						deferred.resolve(tempUrl);

					});

			}

		} else {

			response = this.getBlob(url);

			if (response) {
					response.then((blob) => {

						tempUrl = _URL.createObjectURL(blob);
						this.urlCache[url] = tempUrl;
						deferred.resolve(tempUrl);

					});

			}
		}


		if (!response) {
			deferred.reject({
				message : "File not found in the epub: " + url,
				stack : new Error().stack
			});
		}

		return deferred.promise;
	}

	/**
	 * Revoke Temp Url for a archive item
	 * @param  {string} url url of the item in the archive
	 */
	revokeUrl(url: string): void {
		var _URL = (window.URL || (window as unknown as UrlFactory).webkitURL || (window as unknown as UrlFactory).mozURL) as typeof URL;
		var fromCache = this.urlCache[url];
		if(fromCache) _URL.revokeObjectURL(fromCache);
	}

	destroy(): void {
		var _URL = (window.URL || (window as unknown as UrlFactory).webkitURL || (window as unknown as UrlFactory).mozURL) as typeof URL;
		for (let fromCache in this.urlCache) {
			_URL.revokeObjectURL(fromCache);
		}
		this.zip = undefined;
		this.urlCache = {};
	}
}

export default Archive;

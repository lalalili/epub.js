import {substitute} from "./utils/replacements";
import { createBase64Url, createBlobUrl, blobToBase64 as blob2base64 } from "./platform/blob";
import Url from "./utils/url";
import mime from "./utils/mime";
import Path from "./utils/path";
import path from "path-webpack";
import type Archive from "./archive";
import type { PackagingManifest } from "./packaging";

export interface ResourceManifestItem {
	href: string;
	type?: string;
	[key: string]: unknown;
}

export interface ResourceManifest {
	[key: string]: ResourceManifestItem;
}

export interface ResourceArchive {
	createUrl(url: string, options?: { base64?: boolean }): Promise<string>;
	getText(url: string): Promise<string> | undefined;
}

export type ResourceArchiveInput = ResourceArchive | Archive;
export type ResourceResolver = (href: string) => string;
export interface ResourceRequest {
	(url: string, type: "blob"): Promise<Blob>;
	(url: string, type: "text"): Promise<string>;
}
export type ReplacementMode = "base64" | "blob" | "none" | string;

export interface ResourceOptions {
	replacements?: ReplacementMode;
	archive?: ResourceArchiveInput;
	resolver?: ResourceResolver;
	request?: ResourceRequest;
}

export interface ResourceSettings {
	replacements: ReplacementMode;
	archive?: ResourceArchiveInput;
	resolver?: ResourceResolver;
	request?: ResourceRequest;
}

/**
 * Handle Package Resources
 * @class
 * @param {Manifest} manifest
 * @param {object} [options]
 * @param {string} [options.replacements="base64"]
 * @param {Archive} [options.archive]
 * @param {method} [options.resolver]
 */
class Resources {
	settings?: ResourceSettings;
	manifest?: ResourceManifest;
	resources?: ResourceManifestItem[];
	replacementUrls?: string[];
	html?: ResourceManifestItem[];
	assets?: ResourceManifestItem[];
	css?: ResourceManifestItem[];
	urls?: string[];
	cssUrls?: string[];

	constructor(manifest: ResourceManifest | PackagingManifest, options?: ResourceOptions) {
		this.settings = {
			replacements: (options && options.replacements) || "base64",
			archive: (options && options.archive),
			resolver: (options && options.resolver),
			request: (options && options.request)
		};

		this.process(manifest);
	}

	/**
	 * Process resources
	 * @param {Manifest} manifest
	 */
	process(manifest: ResourceManifest | PackagingManifest): void {
		this.manifest = manifest;
		this.resources = Object.keys(manifest).
			map(function (key){
				return manifest[key];
			});

		this.replacementUrls = [];

		this.html = [];
		this.assets = [];
		this.css = [];

		this.urls = [];
		this.cssUrls = [];

		this.split();
		this.splitUrls();
	}

	/**
	 * Split resources by type
	 * @private
	 */
	split(): void {

		// HTML
		this.html = this.resources.
			filter(function (item){
				if (item.type === "application/xhtml+xml" ||
						item.type === "text/html") {
					return true;
				}
			});

		// Exclude HTML
		this.assets = this.resources.
			filter(function (item){
				if (item.type !== "application/xhtml+xml" &&
						item.type !== "text/html") {
					return true;
				}
			});

		// Only CSS
		this.css = this.resources.
			filter(function (item){
				if (item.type === "text/css") {
					return true;
				}
			});
	}

	/**
	 * Convert split resources into Urls
	 * @private
	 */
	splitUrls(): void {

		// All Assets Urls
		this.urls = this.assets.
			map((item) => {
				return item.href;
			});

		// Css Urls
		this.cssUrls = this.css.map((item) => {
			return item.href;
		});

	}

	/**
	 * Create a url to a resource
	 * @param {string} url
	 * @return {Promise<string>} Promise resolves with url string
	 */
	createUrl (url: string): Promise<string> {
		var parsedUrl = new Url(url);
		var mimeType = mime.lookup(parsedUrl.filename);

		if (this.settings!.archive) {
			return this.settings!.archive.createUrl(url, {"base64": (this.settings!.replacements === "base64")});
		} else {
			if (this.settings!.replacements === "base64") {
				return this.settings!.request!(url, "blob")
					.then((blob) => {
						return blob2base64(blob);
					})
					.then((blob) => {
						return createBase64Url(blob as string, mimeType);
					});
			} else {
				return this.settings!.request!(url, "blob").then((blob) => {
					return createBlobUrl(blob, mimeType);
				});
			}
		}
	}

	/**
	 * Create blob urls for all the assets
	 * @return {Promise}         returns replacement urls
	 */
	replacements(): Promise<Array<string | null>> {
		if (this.settings!.replacements === "none") {
			return Promise.resolve(this.urls!);
		}

		var replacements = this.urls!.map((url) => {
			var absolute = this.settings!.resolver!(url);

			return this.createUrl(absolute).
				catch((err: unknown): null => {
					console.error(err);
					return null;
				});
		});

		return Promise.all(replacements)
			.then( (replacementUrls) => {
				this.replacementUrls = replacementUrls.filter((url) => {
					return (typeof(url) === "string");
				}) as string[];
				return replacementUrls;
			});
	}

	/**
	 * Replace URLs in CSS resources
	 * @private
	 * @param  {Archive} [archive]
	 * @param  {method} [resolver]
	 * @return {Promise}
	 */
	replaceCss(archive?: ResourceArchiveInput, resolver?: ResourceResolver): Promise<void[]> {
		var replaced: Promise<void>[] = [];
		archive = archive || this.settings!.archive;
		resolver = resolver || this.settings!.resolver;
		this.cssUrls!.forEach((href) => {
			var replacement = this.createCssFile(href, archive, resolver)
				.then((replacementUrl) => {
					// switch the url in the replacementUrls
					var indexInUrls = this.urls!.indexOf(href);
					if (indexInUrls > -1) {
						(this.replacementUrls as Array<string | undefined>)[indexInUrls] = replacementUrl;
					}
				});


			replaced.push(replacement);
		});
		return Promise.all(replaced);
	}

	/**
	 * Create a new CSS file with the replaced URLs
	 * @private
	 * @param  {string} href the original css file
	 * @return {Promise}  returns a BlobUrl to the new CSS file or a data url
	 */
	createCssFile(href: string, archive?: ResourceArchiveInput, resolver?: ResourceResolver): Promise<string | undefined> {
		var newUrl;

		if (path.isAbsolute(href)) {
			return Promise.resolve(undefined);
		}

		resolver = resolver || this.settings!.resolver;
		archive = archive || this.settings!.archive;

		var absolute = resolver!(href);

		// Get the text of the css file from the archive
		var textResponse;

		if (archive) {
			textResponse = archive.getText(absolute);
		} else {
			textResponse = this.settings!.request!(absolute, "text");
		}

		// Get asset links relative to css file
		var relUrls = this.urls!.map( (assetHref) => {
			var resolved = resolver!(assetHref);
			var relative = new Path(absolute).relative(resolved);

			return relative;
		});

		if (!textResponse) {
			// file not found, don't replace
			return Promise.resolve(undefined);
		}

		return textResponse.then( (text) => {
			// Replacements in the css text
			text = substitute(text, relUrls, this.replacementUrls);

			// Get the new url
			if (this.settings!.replacements === "base64") {
				newUrl = createBase64Url(text, "text/css");
			} else {
				newUrl = createBlobUrl(text, "text/css");
			}

			return newUrl;
		}, (err) => {
			// handle response errors
			return Promise.resolve(undefined);
		});

	}

	/**
	 * Resolve all resources URLs relative to an absolute URL
	 * @param  {string} absolute to be resolved to
	 * @param  {resolver} [resolver]
	 * @return {string[]} array with relative Urls
	 */
	relativeTo(absolute: string, resolver?: ResourceResolver): string[] {
		resolver = resolver || this.settings!.resolver;

		// Get Urls relative to current sections
		return this.urls!.
			map((href) => {
				var resolved = resolver!(href);
				var relative = new Path(absolute).relative(resolved);
				return relative;
			});
	}

	/**
	 * Get a URL for a resource
	 * @param  {string} path
	 * @return {string} url
	 */
	get(path: string): Promise<string> | undefined {
		var indexInUrls = this.urls!.indexOf(path);
		if (indexInUrls === -1) {
			return;
		}
		if (this.replacementUrls!.length) {
			return Promise.resolve(this.replacementUrls![indexInUrls]);
		} else {
			return this.createUrl(path);
		}
	}

	/**
	 * Substitute urls in content, with replacements,
	 * relative to a url if provided
	 * @param  {string} content
	 * @param  {string} [url]   url to resolve to
	 * @return {string}         content with urls substituted
	 */
	substitute(content: string, url?: string): string {
		var relUrls;
		if (url) {
			relUrls = this.relativeTo(url);
		} else {
			relUrls = this.urls!;
		}
		return substitute(content, relUrls, this.replacementUrls!);
	}

	destroy(): void {
		this.settings = undefined;
		this.manifest = undefined;
		this.resources = undefined;
		this.replacementUrls = undefined;
		this.html = undefined;
		this.assets = undefined;
		this.css = undefined;

		this.urls = undefined;
		this.cssUrls = undefined;
	}
}

export default Resources;

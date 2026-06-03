import { getURLConstructor } from "./browser";

/**
 * Create a Blob using the browser platform implementation.
 * @param {any} content Blob content.
 * @param {string} mime Blob MIME type.
 * @returns {Blob} Browser Blob instance.
 */
export function createBlob(content: any, mime: string): Blob {
	return new Blob([content], { type: mime });
}

/**
 * Create an object URL for browser-rendered content.
 * @param {any} content Blob content.
 * @param {string} mime Blob MIME type.
 * @returns {string} Browser object URL.
 */
export function createBlobUrl(content: any, mime: string): string {
	var blob = createBlob(content, mime);
	var URLConstructor = getURLConstructor() as typeof URL;

	return URLConstructor.createObjectURL(blob);
}

/**
 * Revoke an object URL created by the browser platform.
 * @param {string} url Browser object URL.
 * @returns {void}
 */
export function revokeBlobUrl(url: string): void {
	var URLConstructor = getURLConstructor() as typeof URL;

	return URLConstructor.revokeObjectURL(url);
}

/**
 * Create a base64 data URL for string content.
 * @param {any} content Source content.
 * @param {string} mime Data URL MIME type.
 * @returns {string | undefined} Base64 data URL.
 */
export function createBase64Url(content: any, mime: string): string | undefined {
	var data;

	if (typeof(content) !== "string") {
		return;
	}

	data = btoa(content);

	return "data:" + mime + ";base64," + data;
}

/**
 * Convert a browser Blob to a base64 data URL.
 * @param {Blob} blob Source Blob.
 * @returns {Promise<string | ArrayBuffer | null>} Base64 data URL.
 */
export function blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
	return new Promise(function(resolve, reject) {
		var reader = new FileReader();

		reader.onloadend = function() {
			resolve(reader.result);
		};
		reader.onerror = function() {
			reject(reader.error);
		};
		reader.readAsDataURL(blob);
	});
}

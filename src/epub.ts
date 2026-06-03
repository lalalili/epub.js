import Book from "./book";
import type { BookInput, BookOptions } from "./book";
import Rendition from "./rendition";
import CFI from "./epubcfi";
import Contents from "./contents";
import * as utils from "./utils/core";
import { EPUBJS_VERSION } from "./utils/constants";

import IframeView from "./managers/views/iframe";
import DefaultViewManager from "./managers/default";
import ContinuousViewManager from "./managers/continuous";

interface EpubFactory {
	(url: BookInput, options?: BookOptions): Book;
	(options?: BookOptions): Book;
	VERSION: string;
	Book: typeof Book;
	Rendition: typeof Rendition;
	Contents: typeof Contents;
	CFI: typeof CFI;
	utils: typeof utils;
}

/**
 * Creates a new Book
 * @param {string|ArrayBuffer} url URL, Path or ArrayBuffer
 * @param {object} options to pass to the book
 * @returns {Book} a new Book object
 * @example ePub("/path/to/book.epub", {})
 */
const ePub = function(url?: BookInput | BookOptions, options?: BookOptions): Book {
	if (typeof options === "undefined" &&
		typeof url !== "string" &&
		url instanceof Blob === false &&
		url instanceof ArrayBuffer === false) {
		return new Book(url as BookOptions | undefined);
	}

	return new Book(url as BookInput | undefined, options);
} as EpubFactory;

ePub.VERSION = EPUBJS_VERSION;

(globalThis as typeof globalThis & { EPUBJS_VERSION: string }).EPUBJS_VERSION = EPUBJS_VERSION;

ePub.Book = Book;
ePub.Rendition = Rendition;
ePub.Contents = Contents;
ePub.CFI = CFI;
ePub.utils = utils;

export default ePub;

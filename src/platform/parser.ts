import { DOMParser as XMLDOMParser } from "@xmldom/xmldom";
import { getWindow } from "./browser";

interface ParserConstructor {
	new(): {
		parseFromString(markup: string, mime: string): Document;
	};
}

interface ParserWindow extends Window {
	DOMParser?: ParserConstructor;
}

/**
 * Resolve the parser constructor for browser/native or XMLDOM parsing.
 * @param {boolean} forceXMLDom Force XMLDOMParser even when native parser exists.
 * @returns {Function} Parser constructor.
 */
export function getParserConstructor(forceXMLDom?: boolean): ParserConstructor {
	var win;

	if (forceXMLDom) {
		return XMLDOMParser as unknown as ParserConstructor;
	}

	if (typeof DOMParser !== "undefined") {
		return DOMParser as ParserConstructor;
	}

	win = getWindow() as ParserWindow | undefined;

	return win && win.DOMParser ? win.DOMParser : XMLDOMParser as unknown as ParserConstructor;
}

/**
 * Remove a leading byte order mark before parser handoff.
 * @param {string} markup Source markup.
 * @returns {string} Markup without a leading BOM.
 */
export function stripByteOrderMark(markup: string): string {
	if (markup && markup.charCodeAt(0) === 0xFEFF) {
		return markup.slice(1);
	}

	return markup;
}

/**
 * Parse XML or HTML markup through the platform parser boundary.
 * @param {string} markup Source markup.
 * @param {string} mime Markup MIME type.
 * @param {boolean} forceXMLDom Force XMLDOMParser instead of native DOMParser.
 * @returns {Document} Parsed document.
 */
export function parseMarkup(markup: string, mime: string, forceXMLDom?: boolean): Document {
	var Parser = getParserConstructor(forceXMLDom);

	return new Parser().parseFromString(stripByteOrderMark(markup), mime);
}

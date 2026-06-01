import { getDocument } from "../platform/browser";

/**
 * Resolve the CSS property spelling supported by the current browser.
 *
 * This keeps legacy prefixed CSS lookup separate from generic core helpers
 * while `utils/core.prefixed()` remains the compatibility export.
 * @param {string} unprefixed CSS property name without a vendor prefix
 * @returns {string} supported CSS property name
 */
export function prefixed(unprefixed) {
	var doc = getDocument();
	var vendors = ["Webkit", "webkit", "Moz", "O", "ms"];
	var prefixes = ["-webkit-", "-webkit-", "-moz-", "-o-", "-ms-"];
	var lower = unprefixed.toLowerCase();
	var length = vendors.length;

	if (!doc || !doc.body || typeof(doc.body.style[lower]) != "undefined") {
		return unprefixed;
	}

	for (var i = 0; i < length; i++) {
		if (typeof(doc.body.style[prefixes[i] + lower]) != "undefined") {
			return prefixes[i] + lower;
		}
	}

	return unprefixed;
}

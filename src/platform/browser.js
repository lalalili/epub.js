/**
 * Browser platform boundary.
 *
 * Keep global object lookups here so core/rendering modules can migrate away
 * from direct window/document feature detection incrementally.
 */

export function getWindow() {
	return typeof window !== "undefined" ? window : undefined;
}

export function getDocument() {
	return typeof document !== "undefined" ? document : undefined;
}

export function getNavigator() {
	return typeof navigator !== "undefined" ? navigator : undefined;
}

export function getURLConstructor() {
	if (typeof URL !== "undefined") {
		return URL;
	}

	var win = getWindow();

	return win ? (win.URL || win.webkitURL || win.mozURL) : undefined;
}

export const requestAnimationFrame = (function() {
	var win = getWindow();

	return win
		? (
			win.requestAnimationFrame ||
			win.mozRequestAnimationFrame ||
			win.webkitRequestAnimationFrame ||
			win.msRequestAnimationFrame
		)
		: false;
})();

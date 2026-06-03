/**
 * Browser platform boundary.
 *
 * Keep global object lookups here so core/rendering modules can migrate away
 * from direct window/document feature detection incrementally.
 */

type AnimationFrameRequest = (callback: FrameRequestCallback) => number;

interface BrowserWindow extends Window {
	mozRequestAnimationFrame?: AnimationFrameRequest;
	webkitRequestAnimationFrame?: AnimationFrameRequest;
	msRequestAnimationFrame?: AnimationFrameRequest;
	URL?: typeof URL;
	webkitURL?: typeof URL;
	mozURL?: typeof URL;
}

export function getWindow(): BrowserWindow | undefined {
	return typeof window !== "undefined" ? window as BrowserWindow : undefined;
}

export function getDocument(): Document | undefined {
	return typeof document !== "undefined" ? document : undefined;
}

export function getNavigator(): Navigator | undefined {
	return typeof navigator !== "undefined" ? navigator : undefined;
}

export function getURLConstructor(): typeof URL | undefined {
	if (typeof URL !== "undefined") {
		return URL;
	}

	var win = getWindow();

	return win ? (win.URL || win.webkitURL || win.mozURL) : undefined;
}

export const requestAnimationFrame: AnimationFrameRequest | false = (function() {
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

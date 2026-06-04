import { getDocument, getWindow } from "./browser";

interface RectBounds {
	top: number;
	left: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

interface SizeBounds {
	width: number;
	height: number;
}

type StylePixelProperty =
	"width" |
	"height" |
	"paddingRight" |
	"paddingLeft" |
	"paddingTop" |
	"paddingBottom" |
	"marginRight" |
	"marginLeft" |
	"marginTop" |
	"marginBottom" |
	"borderRightWidth" |
	"borderLeftWidth" |
	"borderTopWidth" |
	"borderBottomWidth";

function sumStylePixels(style: CSSStyleDeclaration, props: StylePixelProperty[]): number {
	var total = 0;

	props.forEach(function(prop) {
		total += parseFloat(style[prop]) || 0;
	});

	return total;
}

/**
 * Gets the height of the current browser document.
 * @returns {number} Document height.
 */
export function documentHeight(): number {
	var doc = getDocument() as Document;

	return Math.max(
		doc.documentElement.clientHeight,
		doc.body.scrollHeight,
		doc.documentElement.scrollHeight,
		doc.body.offsetHeight,
		doc.documentElement.offsetHeight
	);
}

/**
 * Find the bounds of an element, taking padding and margin into account.
 * @param {Element} el Target element.
 * @returns {{ width: number, height: number }} Element bounds.
 */
export function bounds(el: Element): SizeBounds {
	var win = getWindow() as Window;
	var style = win.getComputedStyle(el);
	var widthProps: StylePixelProperty[] = ["width", "paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
	var heightProps: StylePixelProperty[] = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];

	return {
		height: sumStylePixels(style, heightProps),
		width: sumStylePixels(style, widthProps)
	};
}

/**
 * Find the bounds added around an element by padding, margin, and borders.
 * @param {Element} el Target element.
 * @returns {{ width: number, height: number }} Element border bounds.
 */
export function borders(el: Element): SizeBounds {
	var win = getWindow() as Window;
	var style = win.getComputedStyle(el);
	var widthProps: StylePixelProperty[] = ["paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
	var heightProps: StylePixelProperty[] = ["paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];

	return {
		height: sumStylePixels(style, heightProps),
		width: sumStylePixels(style, widthProps)
	};
}

/**
 * Find the bounds of any node, including text nodes.
 * @param {Node} node Target node.
 * @returns {BoundingClientRect} Node bounds.
 */
export function nodeBounds(node: Node): DOMRect {
	var doc = node.ownerDocument;
	var range;

	if (node.nodeType == 3) {
		range = doc.createRange();
		range.selectNodeContents(node);
		return range.getBoundingClientRect();
	}

	return (node as Element).getBoundingClientRect();
}

/**
 * Find the equivalent of getBoundingClientRect for the browser window.
 * @returns {{ width: number, height: number, top: number, left: number, right: number, bottom: number }} Window bounds.
 */
export function windowBounds(): RectBounds {
	var win = getWindow() as Window;
	var width = win.innerWidth;
	var height = win.innerHeight;

	return {
		top: 0,
		left: 0,
		right: width,
		bottom: height,
		width: width,
		height: height
	};
}

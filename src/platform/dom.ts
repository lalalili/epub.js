type QueryRoot = Element | Document | null | undefined;
type QueryProps = Record<string, string>;

/**
 * Select the first matching element with legacy fallback behavior.
 * @param {Element | Document} el Root element or document.
 * @param {string} sel Selector string.
 * @returns {Element | undefined} First matching element.
 */
export function qs(el: QueryRoot, sel: string): Element | null | undefined {
	var elements;

	if (!el) {
		throw new Error("No Element Provided");
	}

	if (typeof el.querySelector !== "undefined") {
		return el.querySelector(sel);
	}

	elements = el.getElementsByTagName(sel);
	if (elements.length) {
		return elements[0];
	}
}

/**
 * Select all matching elements with legacy fallback behavior.
 * @param {Element | Document} el Root element or document.
 * @param {string} sel Selector string.
 * @returns {NodeList | HTMLCollection} Matching elements.
 */
export function qsa(el: Element | Document, sel: string): NodeListOf<Element> | HTMLCollectionOf<Element> {
	if (typeof el.querySelector !== "undefined") {
		return el.querySelectorAll(sel);
	}

	return el.getElementsByTagName(sel);
}

/**
 * Select the first element matching a tag and property map.
 * @param {Element | Document} el Root element or document.
 * @param {string} sel Element name.
 * @param {object} props Attribute/value map.
 * @returns {Element | undefined} First matching element.
 */
export function qsp(el: Element | Document, sel: string, props: QueryProps): Element | undefined | null {
	var q;
	var filtered;

	if (typeof el.querySelector !== "undefined") {
		sel += "[";
		for (var prop in props) {
			sel += prop + "~='" + props[prop] + "'";
		}
		sel += "]";
		return el.querySelector(sel);
	}

	q = el.getElementsByTagName(sel);
	filtered = Array.prototype.slice.call(q, 0).filter(function(el: Element) {
		for (var prop in props) {
			if (el.getAttribute(prop) === props[prop]) {
				return true;
			}
		}
		return false;
	});

	if (filtered) {
		return filtered[0];
	}
}

/**
 * Select by EPUB type with namespace fallback behavior.
 * @param {Element | Document} html Root element or document.
 * @param {string} element Element name.
 * @param {string} type EPUB type.
 * @returns {Element | undefined} First matching element.
 */
export function querySelectorByType(html: Element | Document, element: string, type: string): Element | undefined {
	var query: any;

	if (typeof html.querySelector !== "undefined") {
		query = html.querySelector(`${element}[*|type="${type}"]`);
	}

	if (!query || query.length === 0) {
		query = qsa(html, element);
		for (var i = 0; i < query.length; i++) {
			if (
				query[i].getAttributeNS("http://www.idpf.org/2007/ops", "type") === type ||
				query[i].getAttribute("epub:type") === type
			) {
				return query[i];
			}
		}
	} else {
		return query;
	}
}

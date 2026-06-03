const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

type TraversalRoot = Element | Document;
type NodeCallback = (node: Node) => boolean | void;
type TextNodeCallback = (node: Text) => void;
type TreeWalkerFilter = number | NodeFilter;
export type VisibleTextClientRect = {
	left: number;
	right: number;
	top: number;
	bottom: number;
	width: number;
	height: number;
};

/**
 * Sprint through all text nodes in a document.
 * @param {Element | Document} root Root element or document.
 * @param {Function} func Function to run on each text node.
 * @returns {void}
 */
export function sprint(root: TraversalRoot, func: TextNodeCallback): void {
	var doc = (root.ownerDocument || root) as Document;

	if (typeof(doc.createTreeWalker) !== "undefined") {
		treeWalker(root, func as NodeCallback, NodeFilter.SHOW_TEXT);
	} else {
		walk(root, function(node) {
			if (node && node.nodeType === 3) {
				func(node as Text);
			}
		}, true);
	}
}

/**
 * Walk a DOM tree with the browser TreeWalker API.
 * @param {Element | Document} root Root element or document.
 * @param {Function} func Function to run on each matching node.
 * @param {Function | object} filter TreeWalker filter.
 * @returns {void}
 */
export function treeWalker(root: TraversalRoot, func: NodeCallback, filter: TreeWalkerFilter): void {
	var walker = document.createTreeWalker(root, filter as number, null);
	var node;

	while ((node = walker.nextNode())) {
		func(node);
	}
}

export function createVisibleTextWalker(doc: Document, win: Window, root: HTMLElement): TreeWalker | null {
	if (!doc || !win || !root || typeof doc.createTreeWalker !== "function") {
		return null;
	}

	return doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
		acceptNode(node: Text) {
			let text = String(node.nodeValue || "").replace(/\s+/g, "");
			if (text.length < 2) {
				return NodeFilter.FILTER_REJECT;
			}

			let parent = node.parentElement;
			if (!parent) {
				return NodeFilter.FILTER_REJECT;
			}

			let style = win.getComputedStyle(parent);
			if (style.display === "none" || style.visibility === "hidden") {
				return NodeFilter.FILTER_REJECT;
			}

			return NodeFilter.FILTER_ACCEPT;
		}
	});
}

export function collectVisibleTextClientRects(
	doc: Document,
	win: Window,
	root: HTMLElement,
	options: { limit?: number; countInvalidRects?: boolean } = {}
): VisibleTextClientRect[] | null {
	const walker = createVisibleTextWalker(doc, win, root);
	if (!walker) {
		return null;
	}

	const limit = Math.max(0, Number(options.limit) || 1000);
	const countInvalidRects = Boolean(options.countInvalidRects);
	const rects: VisibleTextClientRect[] = [];
	let inspected = 0;
	let node: Node | null;

	while ((node = walker.nextNode()) && inspected < limit) {
		let range = doc.createRange();
		range.selectNodeContents(node);

		for (const rect of Array.from(range.getClientRects()) as DOMRect[]) {
			const isValidRect = rect.width > 0 && rect.height > 0;

			if (countInvalidRects || isValidRect) {
				inspected += 1;
			}

			if (isValidRect) {
				rects.push({
					left: rect.left,
					right: rect.right,
					top: rect.top,
					bottom: rect.bottom,
					width: rect.width,
					height: rect.height
				});
			}

			if (inspected >= limit) {
				break;
			}
		}

		if (range.detach) {
			range.detach();
		}
	}

	return rects;
}

/**
 * Recursively walk a DOM node tree.
 * @param {Node} node Root node.
 * @param {Function} callback Return true to stop walking.
 * @returns {boolean | undefined} True when walking was stopped.
 */
export function walk(node: Node, callback: NodeCallback, _ignore?: boolean): boolean | undefined {
	var walked;

	if (callback(node)) {
		return true;
	}

	node = node.firstChild as Node;
	if (node) {
		do {
			walked = walk(node, callback);
			if (walked) {
				return true;
			}
			node = node.nextSibling as Node;
		} while(node);
	}
}

/**
 * Find direct descendants of an element.
 * @param {Element} el Parent element.
 * @returns {Element[]} Element children.
 */
export function findChildren(el: Element): Element[] {
	var result: Element[] = [];
	var childNodes = el.childNodes;

	for (var i = 0; i < childNodes.length; i++) {
		let node = childNodes[i];
		if (node.nodeType === 1) {
			result.push(node as Element);
		}
	}

	return result;
}

/**
 * Find all parents and ancestors of an element.
 * @param {Element} node Node to inspect.
 * @returns {Element[]} Parent chain.
 */
export function parents(node: Element): Element[] {
	var nodes = [node];

	for (; node; node = node.parentNode as Element) {
		nodes.unshift(node);
	}

	return nodes;
}

/**
 * Find all direct descendants of a specific type.
 * @param {Element} el Parent element.
 * @param {string} nodeName Element name.
 * @param {boolean} [single] Return first match only.
 * @returns {Element | Element[] | undefined} Matching child or children.
 */
export function filterChildren(el: Element, nodeName: string, single?: boolean): Element | Element[] | undefined {
	var result: Element[] = [];
	var childNodes = el.childNodes;

	for (var i = 0; i < childNodes.length; i++) {
		let node = childNodes[i];
		if (node.nodeType === 1 && node.nodeName.toLowerCase() === nodeName) {
			if (single) {
				return node as Element;
			} else {
				result.push(node as Element);
			}
		}
	}

	if (!single) {
		return result;
	}
}

/**
 * Find the first parent with a matching tag name.
 * @param {Element} node Node to inspect.
 * @param {string} tagname Tag name.
 * @returns {Element | undefined} Matching parent.
 */
export function getParentByTagName(node: Element | null, tagname: string): Element | undefined {
	var parent;

	if (node === null || tagname === "") {
		return;
	}

	parent = node.parentNode as Element;
	while (parent.nodeType === 1) {
		if (parent.tagName.toLowerCase() === tagname) {
			return parent;
		}
		parent = parent.parentNode as Element;
	}
}

/**
 * Gets the index of a node in its parent among matching node types.
 * @param {Node} node Node to inspect.
 * @param {number} typeId Node type to count.
 * @returns {number} Index in parent or -1.
 */
export function indexOfNode(node: Node, typeId: number): number {
	var parent = node.parentNode as ParentNode;
	var children = parent.childNodes;
	var sib;
	var index = -1;
	for (var i = 0; i < children.length; i++) {
		sib = children[i];
		if (sib.nodeType === typeId) {
			index++;
		}
		if (sib == node) {
			break;
		}
	}

	return index;
}

/**
 * Gets the index of a text node in its parent.
 * @param {Node} textNode Text node to inspect.
 * @returns {number} Index in parent.
 */
export function indexOfTextNode(textNode: Node): number {
	return indexOfNode(textNode, TEXT_NODE);
}

/**
 * Gets the index of an element node in its parent.
 * @param {Element} elementNode Element node to inspect.
 * @returns {number} Index in parent.
 */
export function indexOfElementNode(elementNode: Element): number {
	return indexOfNode(elementNode, ELEMENT_NODE);
}

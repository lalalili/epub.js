import { parents } from "../platform/traversal";

/**
 * Lightweight Polyfill for DOM Range.
 */
export class RangeObject {
	collapsed: boolean;
	commonAncestorContainer: Node | undefined;
	endContainer: Node | undefined;
	endOffset: number | undefined;
	startContainer: Node | undefined;
	startOffset: number | undefined;

	constructor() {
		this.collapsed = false;
		this.commonAncestorContainer = undefined;
		this.endContainer = undefined;
		this.endOffset = undefined;
		this.startContainer = undefined;
		this.startOffset = undefined;
	}

	setStart(startNode: Node, startOffset: number): void {
		this.startContainer = startNode;
		this.startOffset = startOffset;

		if (!this.endContainer) {
			this.collapse(true);
		} else {
			this.commonAncestorContainer = this._commonAncestorContainer();
		}

		this._checkCollapsed();
	}

	setEnd(endNode: Node, endOffset: number): void {
		this.endContainer = endNode;
		this.endOffset = endOffset;

		if (!this.startContainer) {
			this.collapse(false);
		} else {
			this.collapsed = false;
			this.commonAncestorContainer = this._commonAncestorContainer();
		}

		this._checkCollapsed();
	}

	collapse(toStart: boolean): void {
		this.collapsed = true;
		if (toStart) {
			this.endContainer = this.startContainer;
			this.endOffset = this.startOffset;
			this.commonAncestorContainer = this.startContainer.parentNode;
		} else {
			this.startContainer = this.endContainer;
			this.startOffset = this.endOffset;
			this.commonAncestorContainer = this.endContainer ? this.endContainer.parentNode : undefined;
		}
	}

	selectNode(referenceNode: Node): void {
		let parent = referenceNode.parentNode;
		let index = Array.prototype.indexOf.call(parent.childNodes, referenceNode);
		this.setStart(parent, index);
		this.setEnd(parent, index + 1);
	}

	selectNodeContents(referenceNode: Node): void {
		let endIndex = (referenceNode.nodeType === 3) ?
			referenceNode.textContent.length : referenceNode.childNodes.length;
		this.setStart(referenceNode, 0);
		this.setEnd(referenceNode, endIndex);
	}

	_commonAncestorContainer(startContainer?: Node, endContainer?: Node): Node | undefined {
		var startParents = parents((startContainer || this.startContainer) as Element);
		var endParents = parents((endContainer || this.endContainer) as Element);

		if (startParents[0] != endParents[0]) return undefined;

		for (var i = 0; i < startParents.length; i++) {
			if (startParents[i] != endParents[i]) {
				return startParents[i - 1];
			}
		}
	}

	_checkCollapsed(): void {
		if (this.startContainer === this.endContainer &&
				this.startOffset === this.endOffset) {
			this.collapsed = true;
		} else {
			this.collapsed = false;
		}
	}

	toString(): void {
		// TODO: implement walking between start and end to find text
	}
}

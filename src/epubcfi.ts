import { RangeObject } from "./compat/range";
import { extend } from "./core/collections";
import { isNumber, type } from "./core/types";
import { findChildren } from "./platform/traversal";

export interface EpubCFITerminal {
	offset: number | null;
	assertion: string | null | undefined;
}

export interface EpubCFIStep {
	id?: string | null;
	tagName?: string;
	type: "element" | "text";
	index: number;
}

export interface EpubCFISegment {
	steps: EpubCFIStep[];
	terminal: EpubCFITerminal;
}

export interface EpubCFIComponent {
	steps: EpubCFIStep[];
	terminal: EpubCFITerminal | null;
}

export interface ParsedEpubCFI {
	spinePos?: number;
	range: boolean;
	base: EpubCFIComponent | Record<string, never>;
	path: EpubCFIComponent | Record<string, never>;
	start: EpubCFIComponent | null;
	end: EpubCFIComponent | null;
}

type RangeLike = Range | RangeObject;
export type EpubCFIBase = string | EpubCFIComponent | Record<string, never>;
export type EpubCFIInput = string | RangeLike | Node | EpubCFI;
export type EpubCFIType = "string" | "range" | "node" | "EpubCFI" | false;
type NormalizedMap = Record<number, number>;
type MissedBoundary = {
	container: Node | null;
	offset: number;
};

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;

/**
	* Parsing and creation of EpubCFIs: http://www.idpf.org/epub/linking/cfi/epub-cfi.html

	* Implements:
	* - Character Offset: epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)
	* - Simple Ranges : epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)

	* Does Not Implement:
	* - Temporal Offset (~)
	* - Spatial Offset (@)
	* - Temporal-Spatial Offset (~ + @)
	* - Text Location Assertion ([)
	* @class
	@param {string | Range | Node } [cfiFrom]
	@param {string | object} [base]
	@param {string} [ignoreClass] class to ignore when parsing DOM
*/
class EpubCFI {
	str: string;
	base: EpubCFIComponent | Record<string, never>;
	spinePos: number;
	range: boolean;
	path: EpubCFIComponent | Record<string, never>;
	start: EpubCFIComponent | null;
	end: EpubCFIComponent | null;

	constructor(cfiFrom?: EpubCFIInput | any, base?: EpubCFIBase, ignoreClass?: string){
		var type;

		this.str = "";

		this.base = {};
		this.spinePos = 0; // For compatibility

		this.range = false; // true || false;

		this.path = {};
		this.start = null;
		this.end = null;

		// Allow instantiation without the "new" keyword
		if (!(this instanceof EpubCFI)) {
			return new EpubCFI(cfiFrom, base, ignoreClass);
		}

		if(typeof base === "string") {
			this.base = this.parseComponent(base);
		} else if(typeof base === "object" && (base as EpubCFIComponent).steps) {
			this.base = base;
		}

		type = this.checkType(cfiFrom);


		if(type === "string") {
			this.str = cfiFrom;
			return extend(this, this.parse(cfiFrom));
		} else if (type === "range") {
			return extend(this, this.fromRange(cfiFrom, this.base, ignoreClass));
		} else if (type === "node") {
			return extend(this, this.fromNode(cfiFrom, this.base, ignoreClass));
		} else if (type === "EpubCFI" && cfiFrom.path) {
			return cfiFrom;
		} else if (!cfiFrom) {
			return this;
		} else {
			throw new TypeError("not a valid argument for EpubCFI");
		}

	}

	/**
	 * Check the type of constructor input
	 * @private
	 */
	checkType(cfi: unknown): EpubCFIType {

		if (this.isCfiString(cfi)) {
			return "string";
		// Is a range object
		} else if (cfi && typeof cfi === "object" && (type(cfi) === "Range" || typeof((cfi as RangeLike).startContainer) != "undefined")){
			return "range";
		} else if (cfi && typeof cfi === "object" && typeof((cfi as Node).nodeType) != "undefined" ){ // || typeof cfi === "function"
			return "node";
		} else if (cfi && typeof cfi === "object" && cfi instanceof EpubCFI){
			return "EpubCFI";
		} else {
			return false;
		}
	}

	/**
	 * Parse a cfi string to a CFI object representation
	 * @param {string} cfiStr
	 * @returns {object} cfi
	 */
	parse(cfiStr: string): ParsedEpubCFI | { spinePos: number } {
		var cfi: ParsedEpubCFI = {
			spinePos: -1,
			range: false,
			base: {} as EpubCFIComponent,
			path: {} as EpubCFIComponent,
			start: null,
			end: null
		};
		var baseComponent: string | undefined, pathComponent: string | undefined, range: [string, string] | false;

		if(typeof cfiStr !== "string") {
			return {spinePos: -1};
		}

		if(cfiStr.indexOf("epubcfi(") === 0 && cfiStr[cfiStr.length-1] === ")") {
			// Remove initial epubcfi( and ending )
			cfiStr = cfiStr.slice(8, cfiStr.length-1);
		}

		baseComponent = this.getChapterComponent(cfiStr);

		// Make sure this is a valid cfi or return
		if(!baseComponent) {
			return {spinePos: -1};
		}

		cfi.base = this.parseComponent(baseComponent);

		pathComponent = this.getPathComponent(cfiStr);
		cfi.path = this.parseComponent(pathComponent);

		range = this.getRange(cfiStr);

		if(range) {
			cfi.range = true;
			cfi.start = this.parseComponent(range[0]);
			cfi.end = this.parseComponent(range[1]);
		}

		// Get spine node position
		// cfi.spineSegment = cfi.base.steps[1];

		// Chapter segment is always the second step
		cfi.spinePos = cfi.base.steps[1].index;

		return cfi;
	}

	parseComponent(componentStr: string): EpubCFIComponent {
		var component: EpubCFIComponent = {
			steps: [],
			terminal: {
				offset: null,
				assertion: null
			}
		};
		var parts = componentStr.split(":");
		var steps = parts[0].split("/");
		var terminal;

		if(parts.length > 1) {
			terminal = parts[1];
			component.terminal = this.parseTerminal(terminal);
		}

		if (steps[0] === "") {
			steps.shift(); // Ignore the first slash
		}

		component.steps = steps.map(function(step: string){
			return this.parseStep(step);
		}.bind(this)).filter(Boolean) as EpubCFIStep[];

		return component;
	}

	parseStep(stepStr: string): EpubCFIStep | undefined {
		var stepType: "element" | "text", num, index, has_brackets, id: string | undefined;

		has_brackets = stepStr.match(/\[(.*)\]/);
		if(has_brackets && has_brackets[1]){
			id = has_brackets[1];
		}

		//-- Check if step is a text node or element
		num = parseInt(stepStr);

		if(isNaN(num)) {
			return;
		}

		if(num % 2 === 0) { // Even = is an element
			stepType = "element";
			index = num / 2 - 1;
		} else {
			stepType = "text";
			index = (num - 1 ) / 2;
		}

		return {
			"type" : stepType,
			"index" : index,
			"id" : id || null
		};
	}

	parseTerminal(termialStr: string): EpubCFITerminal {
		var characterOffset: number | null, textLocationAssertion: string | undefined;
		var assertion = termialStr.match(/\[(.*)\]/);

		if(assertion && assertion[1]){
			characterOffset = parseInt(termialStr.split("[")[0]);
			textLocationAssertion = assertion[1];
		} else {
			characterOffset = parseInt(termialStr);
		}

		if (!isNumber(characterOffset)) {
			characterOffset = null;
		}

		return {
			"offset": characterOffset,
			"assertion": textLocationAssertion
		};

	}

	getChapterComponent(cfiStr: string): string {

		var indirection = cfiStr.split("!");

		return indirection[0];
	}

	getPathComponent(cfiStr: string): string | undefined {

		var indirection = cfiStr.split("!");

		if(indirection[1]) {
			let ranges = indirection[1].split(",");
			return ranges[0];
		}

	}

	getRange(cfiStr: string): [string, string] | false {

		var ranges = cfiStr.split(",");

		if(ranges.length === 3){
			return [
				ranges[1],
				ranges[2]
			];
		}

		return false;
	}

	getCharecterOffsetComponent(cfiStr: string): string {
		var splitStr = cfiStr.split(":");
		return splitStr[1] || "";
	}

	joinSteps(steps?: EpubCFIStep[]): string {
		if(!steps) {
			return "";
		}

		return steps.map(function(part: EpubCFIStep){
			var segment = "";

			if(part.type === "element") {
				segment += (part.index + 1) * 2;
			}

			if(part.type === "text") {
				segment += 1 + (2 * part.index); // TODO: double check that this is odd
			}

			if(part.id) {
				segment += "[" + part.id + "]";
			}

			return segment;

		}).join("/");

	}

	segmentString(segment: EpubCFIComponent | Record<string, never>): string {
		var segmentString = "/";

		if (!("steps" in segment)) {
			return segmentString;
		}

		segmentString += this.joinSteps(segment.steps);

		if(segment.terminal && segment.terminal.offset != null){
			segmentString += ":" + segment.terminal.offset;
		}

		if(segment.terminal && segment.terminal.assertion != null){
			segmentString += "[" + segment.terminal.assertion + "]";
		}

		return segmentString;
	}

	/**
	 * Convert CFI to a epubcfi(...) string
	 * @returns {string} epubcfi
	 */
	toString() {
		var cfiString = "epubcfi(";

		cfiString += this.segmentString(this.base);

		cfiString += "!";
		cfiString += this.segmentString(this.path);

		// Add Range, if present
		if(this.range && this.start) {
			cfiString += ",";
			cfiString += this.segmentString(this.start);
		}

		if(this.range && this.end) {
			cfiString += ",";
			cfiString += this.segmentString(this.end);
		}

		cfiString += ")";

		return cfiString;
	}


	/**
	 * Compare which of two CFIs is earlier in the text
	 * @returns {number} First is earlier = -1, Second is earlier = 1, They are equal = 0
	 */
	compare(cfiOne: string | EpubCFI, cfiTwo: string | EpubCFI): number {
		var stepsA, stepsB;
		var terminalA, terminalB;

		if(typeof cfiOne === "string") {
			cfiOne = new EpubCFI(cfiOne);
		}
		if(typeof cfiTwo === "string") {
			cfiTwo = new EpubCFI(cfiTwo);
		}
		// Compare Spine Positions
		if(cfiOne.spinePos > cfiTwo.spinePos) {
			return 1;
		}
		if(cfiOne.spinePos < cfiTwo.spinePos) {
			return -1;
		}

		if (cfiOne.range) {
			stepsA = cfiOne.path.steps.concat(cfiOne.start.steps);
			terminalA = cfiOne.start.terminal;
		} else {
			stepsA = cfiOne.path.steps;
			terminalA = cfiOne.path.terminal;
		}

		if (cfiTwo.range) {
			stepsB = cfiTwo.path.steps.concat(cfiTwo.start.steps);
			terminalB = cfiTwo.start.terminal;
		} else {
			stepsB = cfiTwo.path.steps;
			terminalB = cfiTwo.path.terminal;
		}

		// Compare Each Step in the First item
		for (var i = 0; i < stepsA.length; i++) {
			if(!stepsA[i]) {
				return -1;
			}
			if(!stepsB[i]) {
				return 1;
			}
			if(stepsA[i].index > stepsB[i].index) {
				return 1;
			}
			if(stepsA[i].index < stepsB[i].index) {
				return -1;
			}
			// Otherwise continue checking
		}

		// All steps in First equal to Second and First is Less Specific
		if(stepsA.length < stepsB.length) {
			return -1;
		}

		// Compare the character offset of the text node
		if(terminalA.offset > terminalB.offset) {
			return 1;
		}
		if(terminalA.offset < terminalB.offset) {
			return -1;
		}

		// CFI's are equal
		return 0;
	}

	step(node: Node): EpubCFIStep {
		var nodeType: "text" | "element" = (node.nodeType === TEXT_NODE) ? "text" : "element";
		var element = node as Element;

		return {
			"id" : element.id,
			"tagName" : element.tagName,
			"type" : nodeType,
			"index" : this.position(node)
		};
	}

	filteredStep(node: Node, ignoreClass?: string): EpubCFIStep | undefined {
		var filteredNode = this.filter(node, ignoreClass);
		var nodeType: "text" | "element";

		// Node filtered, so ignore
		if (!filteredNode) {
			return;
		}

		// Otherwise add the filter node in
		nodeType = (filteredNode.nodeType === TEXT_NODE) ? "text" : "element";

		return {
			"id" : (filteredNode as Element).id,
			"tagName" : (filteredNode as Element).tagName,
			"type" : nodeType,
			"index" : this.filteredPosition(filteredNode, ignoreClass)
		};
	}

	pathTo(node: Node, offset?: number | null, ignoreClass?: string): EpubCFIComponent {
		var segment: EpubCFIComponent = {
			steps: [],
			terminal: {
				offset: null,
				assertion: null
			}
		};
		var currentNode: Node | null = node;
		var step: EpubCFIStep | undefined;

		while(currentNode && currentNode.parentNode &&
					currentNode.parentNode.nodeType != DOCUMENT_NODE) {

			if (ignoreClass) {
				step = this.filteredStep(currentNode, ignoreClass);
			} else {
				step = this.step(currentNode);
			}

			if (step) {
				segment.steps.unshift(step);
			}

			currentNode = currentNode.parentNode;

		}

		if (offset != null && offset >= 0) {

			segment.terminal.offset = offset;

			// Make sure we are getting to a textNode if there is an offset
			if(segment.steps[segment.steps.length-1].type != "text") {
				segment.steps.push({
					"type" : "text",
					"index" : 0
				});
			}

		}


		return segment;
	}

	equalStep(stepA?: EpubCFIStep | null, stepB?: EpubCFIStep | null): boolean {
		if (!stepA || !stepB) {
			return false;
		}

		if(stepA.index === stepB.index &&
			 stepA.id === stepB.id &&
			 stepA.type === stepB.type) {
			return true;
		}

		return false;
	}

	/**
	 * Create a CFI object from a Range
	 * @param {Range} range
	 * @param {string | object} base
	 * @param {string} [ignoreClass]
	 * @returns {object} cfi
	 */
	fromRange(range: RangeLike, base: EpubCFIBase, ignoreClass?: string): ParsedEpubCFI {
		var cfi: ParsedEpubCFI = {
			range: false,
			base: {} as EpubCFIComponent,
			path: {} as EpubCFIComponent,
			start: null,
			end: null
		};

		var start = range.startContainer;
		var end = range.endContainer;

		var startOffset = range.startOffset;
		var endOffset = range.endOffset;

		var needsIgnoring = false;

		if (ignoreClass) {
			// Tell pathTo if / what to ignore
			needsIgnoring = (start.ownerDocument.querySelector("." + ignoreClass) != null);
		}


		if (typeof base === "string") {
			cfi.base = this.parseComponent(base);
			cfi.spinePos = cfi.base.steps[1].index;
		} else if (typeof base === "object") {
			cfi.base = base as EpubCFIComponent;
		}

		if (range.collapsed) {
			if (needsIgnoring) {
				startOffset = this.patchOffset(start, startOffset, ignoreClass);
			}
			cfi.path = this.pathTo(start, startOffset, ignoreClass);
		} else {
			cfi.range = true;

			if (needsIgnoring) {
				startOffset = this.patchOffset(start, startOffset, ignoreClass);
			}

			cfi.start = this.pathTo(start, startOffset, ignoreClass);
			if (needsIgnoring) {
				endOffset = this.patchOffset(end, endOffset, ignoreClass);
			}

			cfi.end = this.pathTo(end, endOffset, ignoreClass);

			// Create a new empty path
			cfi.path = {
				steps: [],
				terminal: null
			};

			// Push steps that are shared between start and end to the common path
			var len = cfi.start.steps.length;
			var i;

			for (i = 0; i < len; i++) {
				if (this.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
					if(i === len-1) {
						// Last step is equal, check terminals
						if(cfi.start.terminal === cfi.end.terminal) {
							// CFI's are equal
							cfi.path.steps.push(cfi.start.steps[i]);
							// Not a range
							cfi.range = false;
						}
					} else {
						cfi.path.steps.push(cfi.start.steps[i]);
					}

				} else {
					break;
				}
			}

			cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length);
			cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length);

			// TODO: Add Sanity check to make sure that the end if greater than the start
		}

		return cfi;
	}

	/**
	 * Create a CFI object from a Node
	 * @param {Node} anchor
	 * @param {string | object} base
	 * @param {string} [ignoreClass]
	 * @returns {object} cfi
	 */
	fromNode(anchor: Node, base: EpubCFIBase, ignoreClass?: string): ParsedEpubCFI {
		var cfi: ParsedEpubCFI = {
			range: false,
			base: {} as EpubCFIComponent,
			path: {} as EpubCFIComponent,
			start: null,
			end: null
		};

		if (typeof base === "string") {
			cfi.base = this.parseComponent(base);
			cfi.spinePos = cfi.base.steps[1].index;
		} else if (typeof base === "object") {
			cfi.base = base as EpubCFIComponent;
		}

		cfi.path = this.pathTo(anchor, null, ignoreClass);

		return cfi;
	}

	filter(anchor: Node, ignoreClass?: string): Node | false {
		var needsIgnoring;
		var sibling; // to join with
		var parent: Node | null, previousSibling, nextSibling;
		var isText = false;

		if (anchor.nodeType === TEXT_NODE) {
			isText = true;
			parent = anchor.parentNode;
			needsIgnoring = (anchor.parentNode as Element).classList.contains(ignoreClass || "");
		} else {
			isText = false;
			needsIgnoring = (anchor as Element).classList.contains(ignoreClass || "");
		}

		if (needsIgnoring && isText) {
			previousSibling = parent!.previousSibling;
			nextSibling = parent!.nextSibling;

			// If the sibling is a text node, join the nodes
			if (previousSibling && previousSibling.nodeType === TEXT_NODE) {
				sibling = previousSibling;
			} else if (nextSibling && nextSibling.nodeType === TEXT_NODE) {
				sibling = nextSibling;
			}

			if (sibling) {
				return sibling;
			} else {
				// Parent will be ignored on next step
				return anchor;
			}

		} else if (needsIgnoring && !isText) {
			// Otherwise just skip the element node
			return false;
		} else {
			// No need to filter
			return anchor;
		}

	}

	patchOffset(anchor: Node, offset: number, ignoreClass?: string): number {
		if (anchor.nodeType != TEXT_NODE) {
			throw new Error("Anchor must be a text node");
		}

		var curr: Node = anchor;
		var totalOffset = offset;

		// If the parent is a ignored node, get offset from it's start
		if ((anchor.parentNode as Element).classList.contains(ignoreClass || "")) {
			curr = anchor.parentNode!;
		}

		while (curr.previousSibling) {
			if(curr.previousSibling.nodeType === ELEMENT_NODE) {
				// Originally a text node, so join
				if((curr.previousSibling as Element).classList.contains(ignoreClass || "")){
					totalOffset += curr.previousSibling.textContent!.length;
				} else {
					break; // Normal node, dont join
				}
			} else {
				// If the previous sibling is a text node, join the nodes
				totalOffset += curr.previousSibling.textContent!.length;
			}

			curr = curr.previousSibling!;
		}

		return totalOffset;

	}

	normalizedMap(children: ArrayLike<Node>, nodeType: number, ignoreClass?: string): NormalizedMap {
		var output: NormalizedMap = {};
		var prevIndex = -1;
		var i, len = children.length;
		var currNodeType;
		var prevNodeType;

		for (i = 0; i < len; i++) {

			currNodeType = children[i].nodeType;

			// Check if needs ignoring
			if (currNodeType === ELEMENT_NODE &&
					(children[i] as Element).classList.contains(ignoreClass || "")) {
				currNodeType = TEXT_NODE;
			}

			if (i > 0 &&
					currNodeType === TEXT_NODE &&
					prevNodeType === TEXT_NODE) {
				// join text nodes
				output[i] = prevIndex;
			} else if (nodeType === currNodeType){
				prevIndex = prevIndex + 1;
				output[i] = prevIndex;
			}

			prevNodeType = currNodeType;

		}

		return output;
	}

	position(anchor: Node): number {
		var children, index;
		if (anchor.nodeType === ELEMENT_NODE) {
			children = (anchor.parentNode as ParentNode).children;
			if (!children) {
				children = findChildren(anchor.parentNode as Element);
			}
			index = Array.prototype.indexOf.call(children, anchor);
		} else {
			children = this.textNodes(anchor.parentNode!);
			index = children.indexOf(anchor);
		}

		return index;
	}

	filteredPosition(anchor: Node, ignoreClass?: string): number {
		var children, index, map;

		if (anchor.nodeType === ELEMENT_NODE) {
			children = (anchor.parentNode as ParentNode).children;
			map = this.normalizedMap(children, ELEMENT_NODE, ignoreClass);
		} else {
			children = anchor.parentNode!.childNodes;
			// Inside an ignored node
			if((anchor.parentNode as Element).classList.contains(ignoreClass || "")) {
				anchor = anchor.parentNode!;
				children = anchor.parentNode!.childNodes;
			}
			map = this.normalizedMap(children, TEXT_NODE, ignoreClass);
		}


		index = Array.prototype.indexOf.call(children, anchor);

		return map[index];
	}

	stepsToXpath(steps: EpubCFIStep[]): string {
		var xpath = [".", "*"];

		steps.forEach(function(step: EpubCFIStep){
			var position = step.index + 1;

			if(step.id){
				xpath.push("*[position()=" + position + " and @id='" + step.id + "']");
			} else if(step.type === "text") {
				xpath.push("text()[" + position + "]");
			} else {
				xpath.push("*[" + position + "]");
			}
		});

		return xpath.join("/");
	}


	/*

	To get the last step if needed:

	// Get the terminal step
	lastStep = steps[steps.length-1];
	// Get the query string
	query = this.stepsToQuery(steps);
	// Find the containing element
	startContainerParent = doc.querySelector(query);
	// Find the text node within that element
	if(startContainerParent && lastStep.type == "text") {
		container = startContainerParent.childNodes[lastStep.index];
	}
	*/
	stepsToQuerySelector(steps: EpubCFIStep[]): string {
		var query = ["html"];

		steps.forEach(function(step: EpubCFIStep){
			var position = step.index + 1;

			if(step.id){
				query.push("#" + step.id);
			} else if(step.type === "text") {
				// unsupported in querySelector
				// query.push("text()[" + position + "]");
			} else {
				query.push("*:nth-child(" + position + ")");
			}
		});

		return query.join(">");

	}

	textNodes(container: Node, ignoreClass?: string): Node[] {
		return Array.prototype.slice.call(container.childNodes).
			filter(function (node: Node) {
				if (node.nodeType === TEXT_NODE) {
					return true;
				} else if (ignoreClass && (node as Element).classList.contains(ignoreClass)) {
					return true;
				}
				return false;
			});
	}

	walkToNode(steps: EpubCFIStep[], _doc?: Document, ignoreClass?: string): Node | null {
		var doc = _doc || document;
		var container: Node | null = doc.documentElement;
		var children;
		var step;
		var len = steps.length;
		var i;

		for (i = 0; i < len; i++) {
			step = steps[i];

			if(step.type === "element") {
				//better to get a container using id as some times step.index may not be correct
				//For ex.https://github.com/futurepress/epub.js/issues/561
				if(step.id) {
					container = doc.getElementById(step.id);
				}
				else {
					children = (container as Element).children || findChildren(container as Element);
					container = children[step.index];
				}
			} else if(step.type === "text") {
				container = this.textNodes(container, ignoreClass)[step.index];
			}
			if(!container) {
				//Break the for loop as due to incorrect index we can get error if
				//container is undefined so that other functionailties works fine
				//like navigation
				break;
			}

		}

		return container;
	}

	findNode(steps: EpubCFIStep[], _doc?: Document, ignoreClass?: string | null): Node | null {
		var doc = _doc || document;
		var container: Node | null;
		var xpath;

		if(!ignoreClass && typeof doc.evaluate != "undefined") {
			xpath = this.stepsToXpath(steps);
			container = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		} else if(ignoreClass) {
			container = this.walkToNode(steps, doc, ignoreClass);
		} else {
			container = this.walkToNode(steps, doc);
		}

		return container;
	}

	normalizeOffset(container: Node | null, offset: number | null | undefined): number {
		var normalized = isNumber(offset) ? offset : 0;

		if (!container) {
			return 0;
		}

		if (normalized < 0) {
			normalized = 0;
		}

		if (container.nodeType === TEXT_NODE || container.nodeType === COMMENT_NODE) {
			return Math.min(normalized, container.textContent!.length);
		}

		if (container.childNodes) {
			return Math.min(normalized, container.childNodes.length);
		}

		return normalized;
	}

	fixMiss(steps: EpubCFIStep[], offset: number | null | undefined, _doc?: Document, ignoreClass?: string | null): MissedBoundary {
		var container = this.findNode(steps.slice(0,-1), _doc, ignoreClass);
		if (!container || !container.childNodes) {
			return {
				container: container || null,
				offset: this.normalizeOffset(container, offset)
			};
		}
		var children = container.childNodes;
		var map = this.normalizedMap(children, TEXT_NODE, ignoreClass || undefined);
		var child;
		var len;
		var lastStepIndex = steps[steps.length-1].index;

		for (let childIndex in map) {
			if (!Object.prototype.hasOwnProperty.call(map, childIndex)) {
				continue;
			}

			if(map[childIndex] === lastStepIndex) {
				child = children[Number(childIndex)];
				len = child.textContent!.length;
				if((offset || 0) > len) {
					offset = (offset || 0) - len;
				} else {
					if (child.nodeType === ELEMENT_NODE) {
						container = child.childNodes[0];
					} else {
						container = child;
					}
					break;
				}
			}
		}

		return {
			container: container,
			offset: this.normalizeOffset(container, offset)
		};

	}

	setRangeBoundary(range: Range | RangeObject, method: "setStart" | "setEnd", container: Node | null, offset: number | null | undefined, steps: EpubCFIStep[], doc: Document, ignoreClass?: string | null): boolean {
		var safeContainer = container;
		var safeOffset = isNumber(offset) ? offset : 0;
		var missed;

		if (!safeContainer) {
			return false;
		}

		try {
			range[method](safeContainer, safeOffset);
			return true;
		} catch (e) {
			missed = this.fixMiss(steps, offset, doc, ignoreClass);
			if (missed && missed.container) {
				safeContainer = missed.container;
				safeOffset = missed.offset;
			}

			if (!safeContainer) {
				return false;
			}

			safeOffset = this.normalizeOffset(safeContainer, safeOffset);

			try {
				range[method](safeContainer, safeOffset);
				return true;
			} catch (_e) {
				return false;
			}
		}
	}

	/**
	 * Creates a DOM range representing a CFI
	 * @param {document} _doc document referenced in the base
	 * @param {string} [ignoreClass]
	 * @return {Range}
	 */
	toRange(_doc?: Document, ignoreClass?: string): Range | RangeObject | null {
		var doc = _doc || document;
		var range: Range | RangeObject;
		var start: EpubCFIComponent, end: EpubCFIComponent | undefined, startContainer, endContainer: Node | null | undefined;
		var cfi = this;
		var startSteps, endSteps;
		var needsIgnoring = ignoreClass ? (doc.querySelector("." + ignoreClass) != null) : false;

		if (typeof(doc.createRange) !== "undefined") {
			range = doc.createRange();
		} else {
			range = new RangeObject();
		}

		if (cfi.range) {
			start = cfi.start!;
			startSteps = cfi.path.steps.concat(start.steps);
			startContainer = this.findNode(startSteps, doc, needsIgnoring ? ignoreClass : null);
			end = cfi.end!;
			endSteps = cfi.path.steps.concat(end.steps);
			endContainer = this.findNode(endSteps, doc, needsIgnoring ? ignoreClass : null);
		} else {
			start = cfi.path as EpubCFIComponent;
			startSteps = cfi.path.steps;
			startContainer = this.findNode(cfi.path.steps, doc, needsIgnoring ? ignoreClass : null);
		}

		if(startContainer) {
			if (!this.setRangeBoundary(
				range,
				"setStart",
				startContainer,
				start.terminal.offset != null ? start.terminal.offset : 0,
				startSteps,
				doc,
				needsIgnoring ? ignoreClass : null
			)) {
				console.log("No valid range start found for", this.toString());
				return null;
			}
		} else {
			console.log("No startContainer found for", this.toString());
			// No start found
			return null;
		}

		if (endContainer) {
			this.setRangeBoundary(
				range,
				"setEnd",
				endContainer,
				end.terminal.offset != null ? end.terminal.offset : 0,
				endSteps,
				doc,
				needsIgnoring ? ignoreClass : null
			);
		}


		// doc.defaultView.getSelection().addRange(range);
		return range;
	}

	/**
	 * Check if a string is wrapped with "epubcfi()"
	 * @param {string} str
	 * @returns {boolean}
	 */
	isCfiString(str: unknown): boolean {
		if(typeof str === "string" &&
			str.indexOf("epubcfi(") === 0 &&
			str[str.length-1] === ")") {
			return true;
		}

		return false;
	}

	generateChapterComponent(_spineNodeIndex: number, _pos: number | string, id?: string): string {
		var pos = parseInt(String(_pos)),
				spineNodeIndex = (_spineNodeIndex + 1) * 2,
				cfi = "/"+spineNodeIndex+"/";

		cfi += (pos + 1) * 2;

		if(id) {
			cfi += "[" + id + "]";
		}

		return cfi;
	}

	/**
	 * Collapse a CFI Range to a single CFI Position
	 * @param {boolean} [toStart=false]
	 */
	collapse(toStart?: boolean) {
		if (!this.range) {
			return;
		}

		this.range = false;

		if (toStart) {
			this.path.steps = this.path.steps.concat(this.start.steps);
			this.path.terminal = this.start.terminal;
		} else {
			this.path.steps = this.path.steps.concat(this.end.steps);
			this.path.terminal = this.end.terminal;
		}

	}
}

export default EpubCFI;

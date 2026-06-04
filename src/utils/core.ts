/**
 * Core Utilities and Helpers
 * @module Core
*/
import {
	requestAnimationFrame as platformRequestAnimationFrame
} from "../platform/browser";
import {
	isElement as coreIsElement,
	isFloat as coreIsFloat,
	isNumber as coreIsNumber,
	type as coreType
} from "../core/types";
import {
	defaults as coreDefaults,
	extend as coreExtend,
	indexOfSorted as coreIndexOfSorted,
	insert as coreInsert,
	locationOf as coreLocationOf
} from "../core/collections";
import {
	defer as coreDefer,
	uuid as coreUuid
} from "../core/async";
import {
	createBase64Url as platformCreateBase64Url,
	blobToBase64 as platformBlobToBase64,
	createBlob as platformCreateBlob,
	createBlobUrl as platformCreateBlobUrl,
	revokeBlobUrl as platformRevokeBlobUrl
} from "../platform/blob";
import type { BlobContent as PlatformBlobContent } from "../platform/blob";
import {
	borders as platformBorders,
	bounds as platformBounds,
	documentHeight as platformDocumentHeight,
	nodeBounds as platformNodeBounds,
	windowBounds as platformWindowBounds
} from "../platform/layout";
import {
	qs as platformQs,
	qsa as platformQsa,
	qsp as platformQsp,
	querySelectorByType as platformQuerySelectorByType
} from "../platform/dom";
import {
	filterChildren as platformFilterChildren,
	findChildren as platformFindChildren,
	getParentByTagName as platformGetParentByTagName,
	indexOfElementNode as platformIndexOfElementNode,
	indexOfNode as platformIndexOfNode,
	indexOfTextNode as platformIndexOfTextNode,
	parents as platformParents,
	sprint as platformSprint,
	treeWalker as platformTreeWalker,
	walk as platformWalk
} from "../platform/traversal";
import { parseMarkup as platformParseMarkup } from "../platform/parser";
import { prefixed as prefixedCssProperty } from "../compat/css";
import { RangeObject as CompatRangeObject } from "../compat/range";
import { isXml as mimeIsXml } from "./mime";

type MutableRecord = Record<string, unknown>;
type CompareResult = number | undefined;
type CompareFunction<T> = (a: T, b: T) => CompareResult;
type QueryProps = Record<string, string>;
type TraversalRoot = Element | Document;
type NodeCallback = (node: Node) => boolean | void;
type TextNodeCallback = (node: Text) => void;
type TreeWalkerFilter = number | NodeFilter;
export type AnimationFrameRequest = (callback: FrameRequestCallback) => number;
export type BlobContent = PlatformBlobContent;

export interface SizeBounds {
	width: number;
	height: number;
}

export interface RectBounds extends SizeBounds {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export interface Deferred<T = unknown> {
	resolve: ((value: T | PromiseLike<T>) => void) | null;
	reject: ((reason?: unknown) => void) | null;
	id: string;
	promise: Promise<T>;
}

/**
 * Vendor prefixed requestAnimationFrame
 * @returns {function} requestAnimationFrame
 * @memberof Core
 */
export const requestAnimationFrame: AnimationFrameRequest | false = platformRequestAnimationFrame;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;

/**
 * Generates a UUID
 * based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 * @returns {string} uuid
 * @memberof Core
 */
export function uuid() {
	return coreUuid();
}

/**
 * Gets the height of a document
 * @returns {number} height
 * @memberof Core
 */
export function documentHeight() {
	return platformDocumentHeight();
}

/**
 * Checks if a node is an element
 * @param {object} obj
 * @returns {boolean}
 * @memberof Core
 */
export function isElement(obj: unknown): obj is Element {
	return coreIsElement(obj);
}

/**
 * @param {any} n
 * @returns {boolean}
 * @memberof Core
 */
export function isNumber(n: unknown): boolean {
	return coreIsNumber(n);
}

/**
 * @param {any} n
 * @returns {boolean}
 * @memberof Core
 */
export function isFloat(n: unknown): boolean {
	return coreIsFloat(n);
}

/**
 * Get a prefixed css property
 * @param {string} unprefixed
 * @returns {string}
 * @memberof Core
 */
export function prefixed(unprefixed: string): string {
	return prefixedCssProperty(unprefixed);
}

/**
 * Apply defaults to an object
 * @param {object} obj
 * @returns {object}
 * @memberof Core
 */
export function defaults<T extends MutableRecord>(obj: T, ..._sources: MutableRecord[]): T {
	return coreDefaults.apply(null, arguments);
}

/**
 * Extend properties of an object
 * @param {object} target
 * @returns {object}
 * @memberof Core
 */
export function extend<T extends object>(target: T, ..._sources: Array<object | null | undefined>): T {
	return coreExtend.apply(null, arguments);
}

/**
 * Fast quicksort insert for sorted array -- based on:
 *  http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @returns {number} location (in array)
 * @memberof Core
 */
export function insert<T>(item: T, array: T[], compareFunction?: CompareFunction<T>): number {
	return coreInsert(item, array, compareFunction);
}

/**
 * Finds where something would fit into a sorted array
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @param {function} [_start]
 * @param {function} [_end]
 * @returns {number} location (in array)
 * @memberof Core
 */
export function locationOf<T>(
	item: T,
	array: T[],
	compareFunction?: CompareFunction<T>,
	_start?: number,
	_end?: number
): number {
	return coreLocationOf(item, array, compareFunction, _start, _end);
}

/**
 * Finds index of something in a sorted array
 * Returns -1 if not found
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @param {function} [_start]
 * @param {function} [_end]
 * @returns {number} index (in array) or -1
 * @memberof Core
 */
export function indexOfSorted<T>(
	item: T,
	array: T[],
	compareFunction?: CompareFunction<T>,
	_start?: number,
	_end?: number
): number {
	return coreIndexOfSorted(item, array, compareFunction, _start, _end);
}
/**
 * Find the bounds of an element
 * taking padding and margin into account
 * @param {element} el
 * @returns {{ width: Number, height: Number}}
 * @memberof Core
 */
export function bounds(el: Element): SizeBounds {
	return platformBounds(el);
}

/**
 * Find the bounds of an element
 * taking padding, margin and borders into account
 * @param {element} el
 * @returns {{ width: Number, height: Number}}
 * @memberof Core
 */
export function borders(el: Element): SizeBounds {
	return platformBorders(el);
}

/**
 * Find the bounds of any node
 * allows for getting bounds of text nodes by wrapping them in a range
 * @param {node} node
 * @returns {BoundingClientRect}
 * @memberof Core
 */
export function nodeBounds(node: Node): DOMRect {
	return platformNodeBounds(node);
}

/**
 * Find the equivalent of getBoundingClientRect of a browser window
 * @returns {{ width: Number, height: Number, top: Number, left: Number, right: Number, bottom: Number }}
 * @memberof Core
 */
export function windowBounds(): RectBounds {
	return platformWindowBounds();
}

/**
 * Gets the index of a node in its parent
 * @param {Node} node
 * @param {string} typeId
 * @return {number} index
 * @memberof Core
 */
export function indexOfNode(node: Node, typeId: number): number {
	return platformIndexOfNode(node, typeId);
}

/**
 * Gets the index of a text node in its parent
 * @param {node} textNode
 * @returns {number} index
 * @memberof Core
 */
export function indexOfTextNode(textNode: Node): number {
	return platformIndexOfTextNode(textNode);
}

/**
 * Gets the index of an element node in its parent
 * @param {element} elementNode
 * @returns {number} index
 * @memberof Core
 */
export function indexOfElementNode(elementNode: Element): number {
	return platformIndexOfElementNode(elementNode);
}

/**
 * Check if extension is xml
 * @param {string} ext
 * @returns {boolean}
 * @memberof Core
 */
export function isXml(ext: string): boolean {
	return mimeIsXml(ext);
}

/**
 * Create a new blob
 * @param {any} content
 * @param {string} mime
 * @returns {Blob}
 * @memberof Core
 */
export function createBlob(content: BlobContent, mime: string): Blob{
	return platformCreateBlob(content, mime);
}

/**
 * Create a new blob url
 * @param {any} content
 * @param {string} mime
 * @returns {string} url
 * @memberof Core
 */
export function createBlobUrl(content: BlobContent, mime: string): string{
	return platformCreateBlobUrl(content, mime);
}

/**
 * Remove a blob url
 * @param {string} url
 * @memberof Core
 */
export function revokeBlobUrl(url: string): void{
	return platformRevokeBlobUrl(url);
}

/**
 * Create a new base64 encoded url
 * @param {any} content
 * @param {string} mime
 * @returns {string} url
 * @memberof Core
 */
export function createBase64Url(content: string, mime: string): string{
	return platformCreateBase64Url(content, mime);
}

/**
 * Get type of an object
 * @param {object} obj
 * @returns {string} type
 * @memberof Core
 */
export function type(obj: unknown): string{
	return coreType(obj);
}

/**
 * Parse xml (or html) markup
 * @param {string} markup
 * @param {string} mime
 * @param {boolean} forceXMLDom force using xmlDom to parse instead of native parser
 * @returns {document} document
 * @memberof Core
 */
export function parse(markup: string, mime: string, forceXMLDom?: boolean): Document {
	return platformParseMarkup(markup, mime, forceXMLDom);
}

/**
 * querySelector polyfill
 * @param {element} el
 * @param {string} sel selector string
 * @returns {element} element
 * @memberof Core
 */
export function qs(el: Element | Document | null | undefined, sel: string): Element | null | undefined {
	return platformQs(el, sel);
}

/**
 * querySelectorAll polyfill
 * @param {element} el
 * @param {string} sel selector string
 * @returns {element[]} elements
 * @memberof Core
 */
export function qsa(el: Element | Document, sel: string): NodeListOf<Element> | HTMLCollectionOf<Element> {
	return platformQsa(el, sel);
}

/**
 * querySelector by property
 * @param {element} el
 * @param {string} sel selector string
 * @param {object[]} props
 * @returns {element[]} elements
 * @memberof Core
 */
export function qsp(el: Element | Document, sel: string, props: QueryProps): Element | null | undefined {
	return platformQsp(el, sel, props);
}

/**
 * Sprint through all text nodes in a document
 * @memberof Core
 * @param  {element} root element to start with
 * @param  {function} func function to run on each element
 */
export function sprint(root: TraversalRoot, func: TextNodeCallback): void {
	return platformSprint(root, func);
}

/**
 * Create a treeWalker
 * @memberof Core
 * @param  {element} root element to start with
 * @param  {function} func function to run on each element
 * @param  {function | object} filter function or object to filter with
 */
export function treeWalker(root: TraversalRoot, func: NodeCallback, filter: TreeWalkerFilter): void {
	return platformTreeWalker(root, func, filter);
}

/**
 * @memberof Core
 * @param {node} node
 * @param {callback} return false for continue,true for break inside callback
 */
export function walk(node: Node, callback: NodeCallback): boolean | undefined{
	return platformWalk(node, callback);
}

/**
 * Convert a blob to a base64 encoded string
 * @param {Blob} blob
 * @returns {Promise<string | ArrayBuffer | null>}
 * @memberof Core
 */
export function blob2base64(blob: Blob): Promise<string | ArrayBuffer | null> {
	return platformBlobToBase64(blob);
}


/**
 * Creates a new pending promise and provides methods to resolve or reject it.
 * From: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
 * @memberof Core
 */
export function defer<T = unknown>(this: Deferred<T>): void {
	coreDefer.call(this);
}

/**
 * querySelector with filter by epub type
 * @param {element} html
 * @param {string} element element type to find
 * @param {string} type epub type to find
 * @returns {element[]} elements
 * @memberof Core
 */
export function querySelectorByType(html: Element | Document, element: string, type: string): Element | undefined{
	return platformQuerySelectorByType(html, element, type);
}

/**
 * Find direct descendents of an element
 * @param {element} el
 * @returns {element[]} children
 * @memberof Core
 */
export function findChildren(el: Element): Element[] {
	return platformFindChildren(el);
}

/**
 * Find all parents (ancestors) of an element
 * @param {element} node
 * @returns {element[]} parents
 * @memberof Core
 */
export function parents(node: Element): Element[] {
	return platformParents(node);
}

/**
 * Find all direct descendents of a specific type
 * @param {element} el
 * @param {string} nodeName
 * @param {boolean} [single]
 * @returns {element[]} children
 * @memberof Core
 */
export function filterChildren(el: Element, nodeName: string, single?: boolean): Element | Element[] | undefined {
	return platformFilterChildren(el, nodeName, single);
}

/**
 * Filter all parents (ancestors) with tag name
 * @param {element} node
 * @param {string} tagname
 * @returns {element[]} parents
 * @memberof Core
 */
export function getParentByTagName(node: Element | null, tagname: string): Element | undefined {
	return platformGetParentByTagName(node, tagname);
}

/**
 * Lightweight Polyfill for DOM Range
 * @class
 * @memberof Core
 */
export class RangeObject extends CompatRangeObject {}

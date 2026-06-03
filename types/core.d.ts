import { RangeObject as CompatRangeObject } from "./compat/range";

export module Core {

  export type AnimationFrameRequest = (callback: FrameRequestCallback) => number;

  export type BlobContent = BlobPart[] | BlobPart | string | ArrayBuffer | ArrayBufferView;

  export interface SizeBounds {
    width: number,
    height: number
  }

  export interface RectBounds extends SizeBounds {
    top: number,
    left: number,
    right: number,
    bottom: number
  }

  export function uuid(): string;

  export const requestAnimationFrame: AnimationFrameRequest | false;

  export function documentHeight(): number;

  export interface Deferred<T = unknown> {
    resolve: ((value: T | PromiseLike<T>) => void) | null;
    reject: ((reason?: unknown) => void) | null;
    id: string;
    promise: Promise<T>;
  }

  export const defer: {
    new<T = unknown>(): Deferred<T>;
    prototype: Deferred<unknown>;
  };

  export function isElement(obj: unknown): obj is Element;

  export function isNumber(n: unknown): boolean;

  export function isFloat(n: unknown): boolean;

  export function prefixed(unprefixed: string): string;

  export function defaults<T extends Record<string, unknown>>(obj: T, ...sources: Array<Record<string, unknown>>): T;

  export function extend<T extends object>(target: T, ...sources: Array<object | null | undefined>): T;

  export function insert<T>(item: T, array: Array<T>, compareFunction?: (a: T, b: T) => number | undefined): number;

  export function locationOf<T>(item: T, array: Array<T>, compareFunction?: (a: T, b: T) => number | undefined, _start?: number, _end?: number): number;

  export function indexOfSorted<T>(item: T, array: Array<T>, compareFunction?: (a: T, b: T) => number | undefined, _start?: number, _end?: number): number;

  export function bounds(el: Element): SizeBounds;

  export function borders(el: Element): SizeBounds;

  export function nodeBounds(node: Node): DOMRect;

  export function windowBounds(): RectBounds;

  export function indexOfNode(node: Node, typeId: number): number;

  export function indexOfTextNode(textNode: Node): number;

  export function indexOfElementNode(elementNode: Element): number;

  export function isXml(ext: string): boolean;

  export function createBlob(content: BlobContent, mime: string): Blob;

  export function createBlobUrl(content: BlobContent, mime: string): string;

  export function revokeBlobUrl(url: string): void;

  export function createBase64Url(content: string, mime: string): string;

  export function type(obj: unknown): string;

  export function parse(markup: string, mime: string, forceXMLDom?: boolean): Document;

  export function qs(el: Element | Document | null | undefined, sel: string): Element | null | undefined;

  export function qsa(el: Element | Document, sel: string): NodeListOf<Element> | HTMLCollectionOf<Element>;

  export function qsp(el: Element | Document, sel: string, props: Record<string, string>): Element | null | undefined;

  export function sprint(root: Element | Document, func: (node: Text) => void): void;

  export function treeWalker(root: Element | Document, func: (node: Node) => boolean | void, filter: number | NodeFilter): void;

  export function walk(node: Node, callback: (node: Node) => boolean | void): boolean | undefined;

  export function blob2base64(blob: Blob): Promise<string | ArrayBuffer | null>;

  export function querySelectorByType(html: Element | Document, element: string, type: string): Element | undefined;

  export function findChildren(el: Element): Array<Element>;

  export function parents(node: Element): Array<Element>;

  export function filterChildren(el: Element, nodeName: string, single: true): Element | undefined;
  export function filterChildren(el: Element, nodeName: string, single?: false): Array<Element>;

  export function getParentByTagName(node: Element | null, tagname: string): Element | undefined;

  export class RangeObject extends CompatRangeObject {

  }

}

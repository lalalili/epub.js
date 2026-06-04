import { defer } from "./core/async";
import EpubCFI from "./epubcfi";
import Hook from "./utils/hook";
import { sprint } from "./platform/traversal";
import { replaceBase } from "./utils/replacements";
import Request from "./utils/request";
import { DOMParser as XMLDOMSerializer } from "@xmldom/xmldom";

export type SectionHookSet = {
	serialize: Hook;
	content: Hook;
};

export interface SpineItem {
	idref: string;
	linear?: string | boolean;
	properties?: string[];
	index: number;
	href?: string;
	url?: string;
	canonical?: string;
	mediaType?: string;
	originalHref?: string;
	originalMediaType?: string;
	fallback?: string;
	fallbackChain?: string[];
	next?: () => SpineItem | Section | undefined;
	prev?: () => SpineItem | Section | undefined;
	cfiBase: string;
}

export interface GlobalLayout {
	layout: string;
	spread: string;
	orientation: string;
}

export type LayoutSettings = GlobalLayout;

export interface SectionSearchResult {
	cfi: string;
	excerpt: string;
}

export type SectionRequest = (url: string) => Promise<Document>;
type SerializerConstructor = new () => {
	serializeToString(input: Node): string;
};
type DeferConstructor = new <T = unknown>() => {
	promise: Promise<T>;
	resolve(value?: T): void;
	reject(error?: unknown): void;
};
type ElementDeferConstructor = new () => {
	promise: Promise<Element | undefined>;
	resolve(value?: Element): void;
	reject(error?: unknown): void;
};
type StringDeferConstructor = new () => {
	promise: Promise<string | undefined>;
	resolve(value?: string): void;
	reject(error?: unknown): void;
};
type HookConstructor = new (context?: unknown) => Hook;

/**
 * Represents a Section of the Book
 *
 * In most books this is equivalent to a Chapter
 * @param {object} item  The spine item representing the section
 * @param {object} hooks hooks for serialize and content
 */
class Section {
	idref?: string;
	linear?: boolean;
	properties?: string[];
	index?: number;
	href?: string;
	url?: string;
	canonical?: string;
	mediaType?: string;
	originalHref?: string;
	originalMediaType?: string;
	fallback?: string;
	fallbackChain?: string[];
	next?: () => SpineItem | Section | undefined;
	prev?: () => SpineItem | Section | undefined;
	cfiBase?: string;
	hooks?: SectionHookSet;
	document?: Document;
	contents?: Element;
	output?: string;
	request?: SectionRequest;

	constructor(item: SpineItem, hooks?: SectionHookSet){
		this.idref = item.idref;
		this.linear = item.linear === "yes";
		this.properties = item.properties || [];
		this.index = item.index;
		this.href = item.href;
		this.url = item.url;
		this.canonical = item.canonical;
		this.mediaType = item.mediaType;
		this.originalHref = item.originalHref;
		this.originalMediaType = item.originalMediaType;
		this.fallback = item.fallback;
		this.fallbackChain = item.fallbackChain;
		this.next = item.next;
		this.prev = item.prev;

		this.cfiBase = item.cfiBase;

		if (hooks) {
			this.hooks = hooks;
		} else {
			this.hooks = {
				serialize: new (Hook as HookConstructor)(this),
				content: new (Hook as HookConstructor)(this)
			};
		}

		this.document = undefined;
		this.contents = undefined;
		this.output = undefined;
	}

	/**
	 * Load the section from its url
	 * @param  {method} [_request] a request method to use for loading
	 * @return {document} a promise with the xml document
	 */
	load(_request?: SectionRequest): Promise<Element> {
		var request = _request || this.request || Request;
		var loading = new (defer as unknown as ElementDeferConstructor)();
		var loaded = loading.promise;

		if(this.contents) {
			loading.resolve(this.contents);
		} else {
			request(this.url!)
				.then((xml: Document) => {
					// var directory = new Url(this.url).directory;

					this.document = xml;
					this.contents = xml.documentElement;

					return this.hooks!.content.trigger(this.document, this);
				})
				.then(() => {
					loading.resolve(this.contents);
				})
				.catch((error: Error) => {
					loading.reject(error);
				});
		}

		return loaded as Promise<Element>;
	}

	/**
	 * Adds a base tag for resolving urls in the section
	 * @private
	 */
	base(): void {
		return replaceBase(this.document, this);
	}

	/**
	 * Render the contents of a section
	 * @param  {method} [_request] a request method to use for loading
	 * @return {string} output a serialized XML Document
	 */
	render(_request?: SectionRequest): Promise<string> {
		var rendering = new (defer as unknown as StringDeferConstructor)();
		var rendered = rendering.promise;
		this.output; // TODO: better way to return this from hooks?

		this.load(_request).
			then((contents) => {
				var userAgent = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
				var isIE = userAgent.indexOf('Trident') >= 0;
				var Serializer: SerializerConstructor;
				if (typeof XMLSerializer === "undefined" || isIE) {
					Serializer = XMLDOMSerializer as unknown as SerializerConstructor;
				} else {
					Serializer = XMLSerializer;
				}
				var serializer = new Serializer();
				this.output = serializer.serializeToString(contents);
				return this.output;
			}).
			then(() => {
				return this.hooks!.serialize.trigger(this.output, this);
			}).
			then(() => {
				rendering.resolve(this.output);
			})
			.catch((error: Error) => {
				rendering.reject(error);
			});

		return rendered as Promise<string>;
	}

	/**
	 * Find a string in a section
	 * @param  {string} _query The query string to find
	 * @return {object[]} A list of matches, with form {cfi, excerpt}
	 */
	find(_query: string): SectionSearchResult[] {
		var section = this;
		var matches: SectionSearchResult[] = [];
		var query = _query.toLowerCase();
		var find = function(node: Text){
			var text = node.textContent!.toLowerCase();
			var range = section.document!.createRange();
			var cfi;
			var pos;
			var last = -1;
			var excerpt;
			var limit = 150;

			while (pos != -1) {
				// Search for the query
				pos = text.indexOf(query, last + 1);

				if (pos != -1) {
					// We found it! Generate a CFI
					range = section.document.createRange();
					range.setStart(node, pos);
					range.setEnd(node, pos + query.length);

					cfi = section.cfiFromRange(range);

					// Generate the excerpt
					if (node.textContent.length < limit) {
						excerpt = node.textContent;
					}
					else {
						excerpt = node.textContent.substring(pos - limit/2, pos + limit/2);
						excerpt = "..." + excerpt + "...";
					}

					// Add the CFI to the matches list
					matches.push({
						cfi: cfi,
						excerpt: excerpt
					});
				}

				last = pos;
			}
		};

		sprint(section.document!, function(node) {
			find(node as Text);
		});

		return matches;
	}


	/**
	 * Search a string in multiple sequential Element of the section. If the document.createTreeWalker api is missed(eg: IE8), use `find` as a fallback.
	 * @param  {string} _query The query string to search
	 * @param  {int} maxSeqEle The maximum number of Element that are combined for search, default value is 5.
	 * @return {object[]} A list of matches, with form {cfi, excerpt}
	 */
	search(_query: string, maxSeqEle = 5): SectionSearchResult[] {
		if (typeof(document.createTreeWalker) == "undefined") {
			return this.find(_query);
		}
		let matches: SectionSearchResult[] = [];
		const excerptLimit = 150;
		const section = this;
		const query = _query.toLowerCase();
		const search = function(nodeList: Text[]){
			const textWithCase =  nodeList.reduce((acc ,current)=>{
				return acc + current.textContent;
			},"");
			const text = textWithCase.toLowerCase();
			const pos = text.indexOf(query);
			if (pos != -1){
				const startNodeIndex = 0 , endPos = pos + query.length;
				let endNodeIndex = 0 , l = 0;
				if (pos < nodeList[startNodeIndex].length){
					let cfi;
					while( endNodeIndex < nodeList.length - 1 ){
						l += nodeList[endNodeIndex].length;
						if ( endPos <= l){
							break;
						}
						endNodeIndex += 1;
					}

					let startNode = nodeList[startNodeIndex] , endNode = nodeList[endNodeIndex];
					let range = section.document!.createRange();
					range.setStart(startNode,pos);
					let beforeEndLengthCount =  nodeList.slice(0, endNodeIndex).reduce((acc,current)=>{return acc+current.textContent.length;},0) ;
					range.setEnd(endNode, beforeEndLengthCount > endPos ? endPos : endPos - beforeEndLengthCount );
					cfi = section.cfiFromRange(range);

					let excerpt = nodeList.slice(0, endNodeIndex+1).reduce((acc,current)=>{return acc+current.textContent ;},"");
					if (excerpt.length > excerptLimit){
						excerpt = excerpt.substring(pos - excerptLimit/2, pos + excerptLimit/2);
						excerpt = "..." + excerpt + "...";
					}
					matches.push({
						cfi: cfi,
						excerpt: excerpt
					});
				}
			}
		};

		const treeWalker = document.createTreeWalker(section.document!, NodeFilter.SHOW_TEXT, null);
		let node: Node | null;
		let nodeList: Text[] = [];
		while ((node = treeWalker.nextNode())) {
			nodeList.push(node as Text);
			if (nodeList.length == maxSeqEle){
				search(nodeList.slice(0 , maxSeqEle));
				nodeList = nodeList.slice(1, maxSeqEle);
			}
		}
		if (nodeList.length > 0){
			search(nodeList);
		}
		return matches;
	}

	/**
	* Reconciles the current chapters layout properties with
	* the global layout properties.
	* @param {object} globalLayout  The global layout settings object, chapter properties string
	* @return {object} layoutProperties Object with layout properties
	*/
	reconcileLayoutSettings(globalLayout: GlobalLayout): LayoutSettings {
		//-- Get the global defaults
		var settings: LayoutSettings = {
			layout : globalLayout.layout,
			spread : globalLayout.spread,
			orientation : globalLayout.orientation
		};

		//-- Get the chapter's display type
		this.properties.forEach(function(prop){
			var rendition = prop.replace("rendition:", "");
			var split = rendition.indexOf("-");
			var property: keyof LayoutSettings, value;

			if(split != -1){
				property = rendition.slice(0, split) as keyof LayoutSettings;
				value = rendition.slice(split+1);

				settings[property] = value;
			}
		});
		return settings;
	}

	/**
	 * Get a CFI from a Range in the Section
	 * @param  {range} _range
	 * @return {string} cfi an EpubCFI string
	 */
	cfiFromRange(_range: Range): string {
		return new EpubCFI(_range, this.cfiBase).toString();
	}

	/**
	 * Get a CFI from an Element in the Section
	 * @param  {element} el
	 * @return {string} cfi an EpubCFI string
	 */
	cfiFromElement(el: Element): string {
		return new EpubCFI(el, this.cfiBase).toString();
	}

	/**
	 * Unload the section document
	 */
	unload(): void {
		this.document = undefined;
		this.contents = undefined;
		this.output = undefined;
	}

	destroy(): void {
		this.unload();
		this.hooks!.serialize.clear();
		this.hooks!.content.clear();

		this.hooks = undefined;
		this.idref = undefined;
		this.linear = undefined;
		this.properties = undefined;
		this.index = undefined;
		this.href = undefined;
		this.url = undefined;
		this.next = undefined;
		this.prev = undefined;

		this.cfiBase = undefined;
	}
}

export default Section;

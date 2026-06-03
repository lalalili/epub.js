import EpubCFI from "./epubcfi";
import Hook from "./utils/hook";
import Section, { SectionHookSet } from "./section";
import {replaceBase, replaceCanonical, replaceMeta} from "./utils/replacements";

type HookConstructor = new (context?: any) => Hook;
export type SpineLookup = Record<string, number>;

export type SpineManifestItem = {
	href: string;
	type?: string;
	properties: string[];
	fallback?: string;
	fallbackChain?: string[];
};

export type SpinePackageItem = {
	id: string;
	idref: string;
	linear: string;
	properties: string[];
	index: number;
	cfiBase: string;
	href?: string;
	url?: string;
	canonical?: string;
	mediaType?: string;
	originalHref?: string;
	originalMediaType?: string;
	fallback?: string;
	fallbackChain?: string[];
	next?: () => Section | undefined;
	prev?: () => Section | undefined;
};

export type SpinePackage = {
	spine: SpinePackageItem[];
	manifest: Record<string, SpineManifestItem>;
	spineNodeIndex: number;
	baseUrl?: string;
	basePath?: string;
};

export type SpineResolver = (href: string, absolute?: boolean) => string;

/**
 * A collection of Spine Items
 */
class Spine {
	spineItems?: Section[];
	spineByHref?: SpineLookup;
	spineById?: SpineLookup;
	hooks?: SectionHookSet;
	epubcfi?: EpubCFI;
	loaded: boolean;
	items?: SpinePackageItem[];
	manifest?: Record<string, SpineManifestItem>;
	spineNodeIndex?: number;
	baseUrl?: string;
	length?: number;

	constructor() {
		this.spineItems = [];
		this.spineByHref = {};
		this.spineById = {};

		this.hooks = {
			serialize: new (Hook as HookConstructor)(),
			content: new (Hook as HookConstructor)()
		};

		// Register replacements
		this.hooks.content.register(replaceBase);
		this.hooks.content.register(replaceCanonical);
		this.hooks.content.register(replaceMeta);

		this.epubcfi = new EpubCFI();

		this.loaded = false;

		this.items = undefined;
		this.manifest = undefined;
		this.spineNodeIndex = undefined;
		this.baseUrl = undefined;
		this.length = undefined;
	}

	/**
	 * Unpack items from a opf into spine items
	 * @param  {Packaging} _package
	 * @param  {method} resolver URL resolver
	 * @param  {method} canonical Resolve canonical url
	 */
	unpack(_package: SpinePackage, resolver: SpineResolver, canonical: SpineResolver): void {

		this.items = _package.spine;
		this.manifest = _package.manifest;
		this.spineNodeIndex = _package.spineNodeIndex;
		this.baseUrl = _package.baseUrl || _package.basePath || "";
		this.length = this.items.length;

		this.items.forEach( (item, index) => {
			var manifestItem = this.manifest![item.idref];
			var resolvedManifestItem: SpineManifestItem;
			var spineItem: Section;

			item.index = index;
			item.cfiBase = this.epubcfi!.generateChapterComponent(this.spineNodeIndex, item.index, item.id);

			if (item.href) {
				item.url = resolver(item.href, true);
				item.canonical = canonical(item.href);
			}

			if(manifestItem) {
				resolvedManifestItem = this.resolveFallbackItem(manifestItem);
				item.href = resolvedManifestItem.href;
				item.url = resolver(item.href, true);
				item.canonical = canonical(item.href);
				item.mediaType = resolvedManifestItem.type;
				item.originalHref = manifestItem.href;
				item.originalMediaType = manifestItem.type;
				item.fallback = manifestItem.fallback;
				item.fallbackChain = manifestItem.fallbackChain || [];

				if(manifestItem.properties.length){
					item.properties.push.apply(item.properties, manifestItem.properties);
				}

				if(resolvedManifestItem !== manifestItem && resolvedManifestItem.properties.length){
					item.properties.push.apply(item.properties, resolvedManifestItem.properties);
				}
			}

			if (item.linear === "yes") {
				item.prev = () => {
					let prevIndex = item.index;
					while (prevIndex > 0) {
						let prev = this.get(prevIndex-1);
						if (prev && prev.linear) {
							return prev;
						}
						prevIndex -= 1;
					}
					return;
				};
				item.next = () => {
					let nextIndex = item.index;
					while (nextIndex < this.spineItems!.length-1) {
						let next = this.get(nextIndex+1);
						if (next && next.linear) {
							return next;
						}
						nextIndex += 1;
					}
					return;
				};
			} else {
				item.prev = function(): undefined {
					return undefined;
				};
				item.next = function(): undefined {
					return undefined;
				};
			}


			spineItem = new Section(item, this.hooks);

			this.append(spineItem);


		});

		this.loaded = true;
	}

	/**
	 * Resolve a manifest item to a renderable fallback item when needed
	 * @private
	 * @param  {PackagingManifestItem} manifestItem
	 * @return {PackagingManifestItem} manifestItem
	 */
	resolveFallbackItem(manifestItem: SpineManifestItem): SpineManifestItem {
		if (this.isRenderableType(manifestItem.type)) {
			return manifestItem;
		}

		var fallbackChain = manifestItem.fallbackChain || [];
		var index = 0;
		var fallbackItem: SpineManifestItem | undefined;

		while(index < fallbackChain.length) {
			fallbackItem = this.manifest![fallbackChain[index]];
			if (fallbackItem && this.isRenderableType(fallbackItem.type)) {
				return fallbackItem;
			}
			index += 1;
		}

		return manifestItem;
	}

	/**
	 * Check whether a manifest media type can be rendered as a spine section
	 * @private
	 * @param  {string} type
	 * @return {boolean}
	 */
	isRenderableType(type?: string): boolean {
		if (!type) {
			return true;
		}

		return [
			"application/xhtml+xml",
			"text/html",
			"image/svg+xml"
		].indexOf(type) > -1;
	}

	/**
	 * Get an item from the spine
	 * @param  {string|number} [target]
	 * @return {Section} section
	 * @example spine.get();
	 * @example spine.get(1);
	 * @example spine.get("chap1.html");
	 * @example spine.get("#id1234");
	 */
	get(target?: string | number): Section | null {
		var index = 0;

		if (typeof target === "undefined") {
			while (index < this.spineItems!.length) {
				let next = this.spineItems![index];
				if (next && next.linear) {
					break;
				}
				index += 1;
			}
		} else if(typeof target === "string" && this.epubcfi!.isCfiString(target)) {
			let cfi = new EpubCFI(target);
			index = cfi.spinePos;
		} else if(typeof target === "number" || isNaN(Number(target)) === false){
			index = Number(target);
		} else if(typeof target === "string" && target.indexOf("#") === 0) {
			index = this.spineById![target.substring(1)];
		} else if(typeof target === "string") {
			// Remove fragments
			target = target.split("#")[0];
			index = this.spineByHref![target] || this.spineByHref![encodeURI(target)];
		}

		return this.spineItems![index] || null;
	}

	/**
	 * Index an href and encoded variants for spine lookups
	 * @private
	 * @param  {string} href
	 * @param  {number} index
	 */
	indexHref(href: string | undefined, index: number): void {
		if (!href) {
			return;
		}

		// Encode and Decode href lookups
		// see pr for details: https://github.com/futurepress/epub.js/pull/358
		this.spineByHref![decodeURI(href)] = index;
		this.spineByHref![encodeURI(href)] = index;
		this.spineByHref![href] = index;
	}

	/**
	 * Remove an href and encoded variants from spine lookups
	 * @private
	 * @param  {string} href
	 */
	removeHref(href: string | undefined): void {
		if (!href) {
			return;
		}

		delete this.spineByHref![decodeURI(href)];
		delete this.spineByHref![encodeURI(href)];
		delete this.spineByHref![href];
	}

	/**
	 * Append a Section to the Spine
	 * @private
	 * @param  {Section} section
	 */
	append(section: Section): number {
		var index = this.spineItems!.length;
		section.index = index;

		this.spineItems!.push(section);

		this.indexHref(section.href, index);
		if (section.originalHref !== section.href) {
			this.indexHref(section.originalHref, index);
		}

		this.spineById![section.idref!] = index;

		return index;
	}

	/**
	 * Prepend a Section to the Spine
	 * @private
	 * @param  {Section} section
	 */
	prepend(section: Section): number {
		// var index = this.spineItems.unshift(section);
		this.indexHref(section.href, 0);
		if (section.originalHref !== section.href) {
			this.indexHref(section.originalHref, 0);
		}
		this.spineById![section.idref!] = 0;

		// Re-index
		this.spineItems!.forEach(function(item, index){
			item.index = index;
		});

		return 0;
	}

	// insert(section, index) {
	//
	// };

	/**
	 * Remove a Section from the Spine
	 * @private
	 * @param  {Section} section
	 */
	remove(section: Section): Section[] | undefined {
		var index = this.spineItems!.indexOf(section);

		if(index > -1) {
			this.removeHref(section.href);
			if (section.originalHref !== section.href) {
				this.removeHref(section.originalHref);
			}
			delete this.spineById![section.idref!];

			return this.spineItems!.splice(index, 1);
		}
	}

	/**
	 * Loop over the Sections in the Spine
	 * @return {method} forEach
	 */
	each(callback: (section: Section, index: number, sections: Section[]) => void, thisArg?: any): void {
		return this.spineItems!.forEach(callback, thisArg);
	}

	/**
	 * Find the first Section in the Spine
	 * @return {Section} first section
	 */
	first(): Section | undefined {
		let index = 0;

		do {
			let next = this.get(index);

			if (next && next.linear) {
				return next;
			}
			index += 1;
		} while (index < this.spineItems!.length) ;
	}

	/**
	 * Find the last Section in the Spine
	 * @return {Section} last section
	 */
	last(): Section | undefined {
		let index = this.spineItems!.length-1;

		do {
			let prev = this.get(index);
			if (prev && prev.linear) {
				return prev;
			}
			index -= 1;
		} while (index >= 0);
	}

	destroy(): void {
		this.each((section) => section.destroy());

		this.spineItems = undefined;
		this.spineByHref = undefined;
		this.spineById = undefined;

		this.hooks!.serialize.clear();
		this.hooks!.content.clear();
		this.hooks = undefined;

		this.epubcfi = undefined;

		this.loaded = false;

		this.items = undefined;
		this.manifest = undefined;
		this.spineNodeIndex = undefined;
		this.baseUrl = undefined;
		this.length = undefined;
	}
}

export default Spine;

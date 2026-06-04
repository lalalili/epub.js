import EpubCFI from "./epubcfi";
import {
	qs,
	qsa,
	querySelectorByType
} from "./platform/dom";
import {
	indexOfSorted,
	locationOf
} from "./core/collections";

export interface PageListItem {
	href?: string;
	page: string | number;
	cfi?: string | false;
	packageUrl?: string;
}

export type PageValue = string | number;
export type PageLookup = Record<PageValue, string>;
export type PageReverseLookup = Record<PageValue, PageValue>;
export type PageListDocument = XMLDocument | Document;

/**
 * Page List Parser
 * @param {document} [xml]
 */
class PageList {
	pages?: PageValue[];
	locations?: string[];
	hrefs?: string[];
	hrefByPage?: PageLookup;
	pageByHref?: PageReverseLookup;
	epubcfi?: EpubCFI;
	firstPage: number;
	lastPage: number;
	totalPages: number;
	toc?: unknown;
	ncx?: unknown;
	pageList?: PageListItem[];

	constructor(xml?: PageListDocument) {
		this.pages = [];
		this.locations = [];
		this.hrefs = [];
		this.hrefByPage = {};
		this.pageByHref = {};
		this.epubcfi = new EpubCFI();

		this.firstPage = 0;
		this.lastPage = 0;
		this.totalPages = 0;

		this.toc = undefined;
		this.ncx = undefined;

		if (xml) {
			this.pageList = this.parse(xml);
		}

		if(this.pageList && this.pageList.length) {
			this.process(this.pageList);
		}
	}

	/**
	 * Parse PageList Xml
	 * @param  {document} xml
	 */
	parse(xml: PageListDocument): PageListItem[] | undefined {
		var html = qs(xml, "html");
		var ncx = qs(xml, "ncx");

		if(html) {
			return this.parseNav(xml);
		} else if(ncx){
			return this.parseNcx(xml);
		}

	}

	/**
	 * Parse a Nav PageList
	 * @private
	 * @param  {node} navHtml
	 * @return {PageList.item[]} list
	 */
	parseNav(navHtml: PageListDocument): PageListItem[] {
		var navElement = querySelectorByType(navHtml, "nav", "page-list");
		var navItems: NodeListOf<Element> | HTMLCollectionOf<Element> | [] = navElement ? qsa(navElement, "li") : [];
		var length = navItems.length;
		var i;
		var list: PageListItem[] = [];
		var item;

		if(!navItems || length === 0) return list;

		for (i = 0; i < length; ++i) {
			item = this.item(navItems[i]);
			list.push(item);
		}

		return list;
	}

	parseNcx(navXml: PageListDocument): PageListItem[] {
		var list: PageListItem[] = [];
		var i = 0;
		var item;
		var pageList;
		var pageTargets;
		var length = 0;

		pageList = qs(navXml, "pageList");
		if (!pageList) return list;

		pageTargets = qsa(pageList, "pageTarget");
		length = pageTargets.length;

		if (!pageTargets || pageTargets.length === 0) {
			return list;
		}

		for (i = 0; i < length; ++i) {
			item = this.ncxItem(pageTargets[i]);
			list.push(item);
		}

		return list;
	}

	ncxItem(item: Element): PageListItem {
		var navLabel = qs(item, "navLabel")!;
		var navLabelText = qs(navLabel, "text")!;
		var pageText = navLabelText.textContent || "";
		var content = qs(item, "content")!;

		var href = content.getAttribute("src") || "";
		var page = pageText;

		return {
			"href": href,
			"page": page,
		};
	}

	/**
	 * Page List Item
	 * @private
	 * @param  {node} item
	 * @return {object} pageListItem
	 */
	item(item: Element): PageListItem {
		var content = qs(item, "a")!,
				href = content.getAttribute("href") || "",
				text = content.textContent || "",
				page = text,
					isCfi = href.indexOf("epubcfi"),
					split: string[],
					packageUrl: string,
					cfi: string | false;

		if(isCfi != -1) {
			split = href.split("#");
			packageUrl = split[0];
			cfi = split.length > 1 ? split[1] : false;
			return {
				"cfi" : cfi,
				"href" : href,
				"packageUrl" : packageUrl,
				"page" : page
			};
		} else {
			return {
				"href" : href,
				"page" : page
			};
		}
	}

	/**
	 * Process pageList items
	 * @private
	 * @param  {array} pageList
	 */
	process(pageList: PageListItem[]): void {
		pageList.forEach(function(item){
			this.pages!.push(item.page);
			if (item.href) {
				this.hrefs!.push(item.href);
				this.hrefByPage![item.page] = item.href;
				this.pageByHref![item.href] = item.page;
			}
			if (item.cfi) {
				this.locations!.push(item.cfi);
			}
		}, this);
		this.firstPage = parseInt(String(this.pages![0]));
		this.lastPage = parseInt(String(this.pages![this.pages!.length-1]));
		this.totalPages = isNaN(this.firstPage) || isNaN(this.lastPage) ? this.pages!.length : this.lastPage - this.firstPage;
	}

	/**
	 * Get a PageList result from a EpubCFI
	 * @param  {string} cfi EpubCFI String
	 * @return {string | number} page
	 */
	pageFromCfi(cfi: string): PageValue | -1 {
		var pg: PageValue | -1 = -1;

		// Check if the pageList has not been set yet
		if(this.locations!.length === 0) {
			return -1;
		}

		// TODO: check if CFI is valid?

		// check if the cfi is in the location list
		// var index = this.locations.indexOf(cfi);
		var index = indexOfSorted(cfi, this.locations!, this.epubcfi!.compare);
		if(index != -1) {
			pg = this.pages![index] as PageValue;
		} else {
			// Otherwise add it to the list of locations
			// Insert it in the correct position in the locations page
			//index = EPUBJS.core.insert(cfi, this.locations, this.epubcfi.compare);
			index = locationOf(cfi, this.locations!, this.epubcfi!.compare);
			// Get the page at the location just before the new one, or return the first
			pg = index-1 >= 0 ? this.pages![index-1] as PageValue : this.pages![0] as PageValue;
			if(pg !== undefined) {
				// Add the new page in so that the locations and page array match up
				//this.pages.splice(index, 0, pg);
			} else {
				pg = -1;
			}

		}
		return pg;
	}

	/**
	 * Get an EpubCFI from a Page List Item
	 * @param  {string | number} pg
	 * @return {string} cfi
	 */
	cfiFromPage(pg: PageValue): string | -1 {
		var cfi: string | -1 = -1;

		// check if the cfi is in the page list
		// Pages could be unsorted.
		var index = this.pages!.indexOf(pg);
		if(index != -1) {
			cfi = this.locations![index];
		}
		// TODO: handle pages not in the list
		return cfi;
	}

	/**
	 * Get an href from a Page List Item
	 * @param  {string | number} pg
	 * @return {string | undefined} href
	 */
	hrefFromPage(pg: PageValue): string | undefined {
		return this.hrefByPage![pg];
	}

	/**
	 * Get a Page List Item from an href
	 * @param  {string} href
	 * @return {string | number | undefined} page
	 */
	pageFromHref(href: string): PageValue | undefined {
		return this.pageByHref![href];
	}

	/**
	 * Get a Page from Book percentage
	 * @param  {number} percent
	 * @return {number} page
	 */
	pageFromPercentage(percent: number): number {
		var pg = Math.round(this.totalPages * percent);
		return pg;
	}

	/**
	 * Returns a value between 0 - 1 corresponding to the location of a page
	 * @param  {number} pg the page
	 * @return {number} percentage
	 */
	percentageFromPage(pg: number): number {
		var percentage = (pg - this.firstPage) / this.totalPages;
		return Math.round(percentage * 1000) / 1000;
	}

	/**
	 * Returns a value between 0 - 1 corresponding to the location of a cfi
	 * @param  {string} cfi EpubCFI String
	 * @return {number} percentage
	 */
	percentageFromCfi(cfi: string): number {
		var pg = this.pageFromCfi(cfi);
		var percentage = this.percentageFromPage(Number(pg));
		return percentage;
	}

	/**
	 * Destroy
	 */
	destroy(): void {
		this.pages = undefined;
		this.locations = undefined;
		this.hrefs = undefined;
		this.hrefByPage = undefined;
		this.pageByHref = undefined;
		this.epubcfi = undefined;

		this.pageList = undefined;

		this.toc = undefined;
		this.ncx = undefined;
	}
}

export default PageList;

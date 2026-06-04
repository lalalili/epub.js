import EpubCFI from "./epubcfi";

export type PageValue = string | number;

export type PageLookup = Record<PageValue, string>;

export type PageReverseLookup = Record<PageValue, PageValue>;

export type PageListDocument = Document | XMLDocument;

export interface PageListItem {
  href?: string;
  page: PageValue;
  cfi?: string | false;
  packageUrl?: string;
}

export default class PageList {
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

  constructor(xml?: PageListDocument);

  parse(xml: PageListDocument): PageListItem[] | undefined;

  parseNav(navHtml: PageListDocument): PageListItem[];

  parseNcx(navXml: PageListDocument): PageListItem[];

  ncxItem(item: Element): PageListItem;

  item(item: Element): PageListItem;

  process(pageList: PageListItem[]): void;

  pageFromCfi(cfi: string): PageValue | -1;

  cfiFromPage(pg: PageValue): string | -1;

  hrefFromPage(pg: PageValue): string | undefined;

  pageFromHref(href: string): PageValue | undefined;

  pageFromPercentage(percent: number): number;

  percentageFromPage(pg: number): number;

  percentageFromCfi(cfi: string): number;

  destroy(): void;
}

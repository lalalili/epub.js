import Hook from "./utils/hook";

export interface GlobalLayout {
  layout: string,
  spread: string,
  orientation: string
}

export interface LayoutSettings {
  layout: string,
  spread: string,
  orientation: string
}

export interface SpineItem {
  idref: string,
  linear?: string | boolean,
  properties?: Array<string>,
  index: number,
  cfiBase: string,
  href?: string,
  url?: string,
  canonical?: string,
  mediaType?: string,
  originalHref?: string,
  originalMediaType?: string,
  fallback?: string,
  fallbackChain?: Array<string>,
  next?: () => SpineItem | Section | undefined,
  prev?: () => SpineItem | Section | undefined,
}

export interface SectionHookSet {
  serialize: Hook,
  content: Hook
}

export interface SectionSearchResult {
  cfi: string,
  excerpt: string
}

export type SectionRequest = (url: string) => Promise<Document>;

export default class Section {
  constructor(item: SpineItem, hooks?: SectionHookSet);

  idref?: string;
  linear?: boolean;
  properties?: Array<string>;
  index?: number;
  href?: string;
  url?: string;
  canonical?: string;
  mediaType?: string;
  originalHref?: string;
  originalMediaType?: string;
  fallback?: string;
  fallbackChain?: Array<string>;
  next?: () => SpineItem | Section | undefined;
  prev?: () => SpineItem | Section | undefined;
  cfiBase?: string;

  document?: Document;
  contents?: Element;
  output?: string;
  request?: SectionRequest;

  hooks?: SectionHookSet;

  load(_request?: SectionRequest): Promise<Element>;

  render(_request?: SectionRequest): Promise<string>;

  find(_query: string): Array<SectionSearchResult>;

  search(_query: string, maxSeqEle?: number): Array<SectionSearchResult>;

  reconcileLayoutSettings(globalLayout: GlobalLayout): LayoutSettings;

  cfiFromRange(_range: Range): string;

  cfiFromElement(el: Element): string;

  unload(): void;

  destroy(): void;

  private base(): void;
}

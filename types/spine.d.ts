import EpubCFI from "./epubcfi";
import Section, { SectionHookSet } from "./section";
import Hook from "./utils/hook";

export type SpineLookup = Record<string, number>;

export interface SpineManifestItem {
  href: string,
  type?: string,
  properties: Array<string>,
  fallback?: string,
  fallbackChain?: Array<string>
}

export interface SpinePackageItem {
  id: string,
  idref: string,
  linear: string,
  properties: Array<string>,
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
  next?: () => Section | undefined,
  prev?: () => Section | undefined
}

export interface SpinePackage {
  spine: Array<SpinePackageItem>,
  manifest: Record<string, SpineManifestItem>,
  spineNodeIndex: number,
  baseUrl?: string,
  basePath?: string
}

export type SpineResolver = (href: string, absolute?: boolean) => string;

export default class Spine {
  constructor();

  spineItems?: Array<Section>;
  spineByHref?: SpineLookup;
  spineById?: SpineLookup;
  hooks?: SectionHookSet;
  epubcfi?: EpubCFI;
  loaded: boolean;
  items?: Array<SpinePackageItem>;
  manifest?: Record<string, SpineManifestItem>;
  spineNodeIndex?: number;
  baseUrl?: string;
  length?: number;

  unpack(_package: SpinePackage, resolver: SpineResolver, canonical: SpineResolver): void;

  resolveFallbackItem(manifestItem: SpineManifestItem): SpineManifestItem;

  isRenderableType(type?: string): boolean;

  get(target?: string | number): Section | null;

  indexHref(href: string | undefined, index: number): void;

  removeHref(href: string | undefined): void;

  append(section: Section): number;

  prepend(section: Section): number;

  remove(section: Section): Array<Section> | undefined;

  each(callback: (section: Section, index: number, sections: Array<Section>) => void, thisArg?: unknown): void;

  first(): Section | undefined;

  last(): Section | undefined;

  destroy(): void;
}

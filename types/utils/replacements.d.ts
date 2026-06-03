export type LinkCallback = (href: string) => void;

export interface SectionLike {
  canonical?: string;
  idref?: string;
  url?: string;
}

export function replaceBase(doc?: Document, section?: SectionLike): void;

export function replaceCanonical(doc?: Document, section?: SectionLike): void;

export function replaceMeta(doc?: Document, section?: SectionLike): void;

export function replaceLinks(contents: Element, fn: LinkCallback, sectionHref?: string): void;

export function substitute(content: string, urls: string[], replacements: string[]): string;

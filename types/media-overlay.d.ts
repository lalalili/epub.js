export interface SmilTextNode {
  src: string;
  href: string;
}

export interface SmilAudioNode {
  src: string;
  href: string;
  clipBegin: string;
  clipEnd: string;
}

export interface SmilFragment {
  id: string;
  text: SmilTextNode | null;
  audio: SmilAudioNode | null;
  sequencePath: string[];
}

export interface SmilSequence {
  id: string;
  textref: string;
  textrefHref: string;
  children: Array<SmilSequence | SmilFragment>;
  fragments: SmilFragment[];
}

export interface SmilDocument {
  href: string;
  sequences: SmilSequence[];
  fragments: SmilFragment[];
}

export interface ParseSmilOptions {
  href?: string;
}

export function resolveSmilHref(baseHref?: string, href?: string): string;
export function parseSmilDocument(xml?: string, options?: ParseSmilOptions): SmilDocument;
export function parseSmilClock(value: unknown): number | null;

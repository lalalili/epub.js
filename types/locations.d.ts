import Spine from "./spine";
import Section from "./section";
import EpubCFI from "./epubcfi";
import Queue from "./utils/queue";

export interface LocationRange {
  startContainer?: Node;
  startOffset?: number;
  endContainer?: Node;
  endOffset?: number;
}

export interface WordLocation {
  cfi: string;
  wordCount: number;
}

export type LocationsRequest = (...args: any[]) => Promise<unknown>;

export type LocationInput = string | EpubCFI;

export default class Locations {
  constructor(spine?: Spine, request?: LocationsRequest, pause?: number);

  spine?: Spine;
  request?: LocationsRequest;
  pause?: number;
  q?: Queue;
  epubcfi?: EpubCFI;
  _locations?: string[];
  _locationsWords?: WordLocation[];
  total?: number;
  break?: number;
  _current?: number;
  _wordCounter?: number;
  _currentCfi?: string;
  processingTimeout?: ReturnType<typeof setTimeout>;

  emit(eventName: string, data?: unknown): void;

  on(eventName: string, listener: (...args: any[]) => void): unknown;

  off(eventName: string, listener: (...args: any[]) => void): unknown;

  once(eventName: string, listener: (...args: any[]) => void): unknown;

  generate(chars?: number): Promise<Array<string>>;

  createRange(): LocationRange;

  process(section: Section): Promise<Array<string>>;

  generateForSection(section?: Section, chars?: number): Promise<Array<string>>;

  generateFromWords(startCfi?: string, wordCount?: number, count?: number): Promise<Array<WordLocation>>;

  processWords(section: Section, wordCount: number, startCfi?: EpubCFI, count?: number): Promise<Array<WordLocation> | void>;

  countWords(s: string): number;

  parse(contents: Element, cfiBase: string, chars?: number): Array<string>;

  fallbackCfi(body: Element, cfiBase: string): string;

  parseWords(contents: Element, section: Section, wordCount: number, startCfi?: EpubCFI): Array<WordLocation>;

  locationFromCfi(cfi: LocationInput): number;

  percentageFromCfi(cfi: LocationInput): number | null;

  percentageFromLocation(loc: number): number;

  cfiFromLocation(loc: number | string): string | number;

  cfiFromPercentage(percentage: number): string | number;

  load(locations: string | Array<string>): Array<string>;

  save(): string;

  getCurrent(): number | undefined;

  setCurrent(curr: string | number | undefined): void;

  get currentLocation(): number | undefined;

  set currentLocation(curr: string | number | undefined);

  length(): number;

  destroy(): void;
}

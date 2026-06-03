import Contents from "./contents";

export interface EpubCFIPair {
  start: string;
  end: string;
}

export interface RangePair {
  start: Range;
  end: Range;
}

export interface MappingLayout {
  spreadWidth: number;
  columnWidth: number;
  gap: number;
  divisor: number;
}

export interface MappingView {
  section: {
    cfiBase: string;
  };
  contents: {
    scrollWidth(): number;
  };
  document: Document;
}

export interface MappingContents {
  document?: Document;
}

export type MappingTextNodeWalker = (node: Text) => Text | Node | Range | undefined | false | null;

export type MappingDirection = string;

export type MappingAxis = string;

export default class Mapping {
  constructor(layout: MappingLayout, direction?: MappingDirection, axis?: MappingAxis, dev?: boolean);

  layout: MappingLayout;
  horizontal: boolean;
  direction: string;
  _dev: boolean;

  section(view: MappingView): Array<EpubCFIPair>;

  page(contents: Contents | MappingContents | null | undefined, cfiBase: string, start: number, end: number): EpubCFIPair | undefined;

  walk(root: Node, func: MappingTextNodeWalker): Text | Node | Range | undefined | false | null;

  findRanges(view: MappingView): Array<RangePair>;

  findStart(root: Node, start: number, end: number): Range;

  findEnd(root: Node, start: number, end: number): Range;

  findTextStartRange(node: Node, start: number, end: number): Range;

  findTextEndRange(node: Node, start: number, end: number): Range;

  splitTextNodeIntoRanges(node: Node, _splitter?: string): Array<Range>;

  rangePairToCfiPair(cfiBase: string, rangePair: RangePair): EpubCFIPair;

  rangeListToCfiList(cfiBase: string, columns: Array<RangePair>): Array<EpubCFIPair>;

  axis(axis?: string): boolean;
}

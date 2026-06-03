import Contents from "./contents";

export interface EpubCFIPair {
  start: string,
  end: string
}

export interface RangePair {
  start: Range,
  end: Range
}

export interface MappingLayout {
  spreadWidth: number,
  columnWidth: number,
  gap: number,
  divisor: number
}

export default class Mapping {
  constructor(layout: MappingLayout, direction?: string, axis?: string, dev?: boolean);

  page(contents: Contents | null | undefined, cfiBase: string, start: number, end: number): EpubCFIPair | undefined;

  axis(axis?: string): boolean;

  private walk(root: Node, func: Function);

  private findStart(root: Node, start: number, end: number): Range;

  private findEnd(root: Node, start: number, end: number): Range;

  private findTextStartRange(node: Node, start: number, end: number): Range;

  private findTextEndRange(node: Node, start: number, end: number): Range;

  private splitTextNodeIntoRanges(node: Node, _splitter?: string): Array<Range>;

  private rangePairToCfiPair(cfiBase: string, rangePair: RangePair): EpubCFIPair;
}

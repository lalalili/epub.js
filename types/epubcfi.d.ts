import { RangeObject } from "./compat/range";

export interface EpubCFITerminal {
  offset: number | null,
  assertion: string | null | undefined
}

export interface EpubCFISegment {
  steps: Array<EpubCFIStep>,
  terminal: EpubCFITerminal
}

export interface EpubCFIStep {
	id?: string | null,
	tagName?: string,
	type: "element" | "text",
	index: number
}

export interface EpubCFIComponent {
  steps: Array<EpubCFIStep>,
  terminal: EpubCFITerminal | null
}

export interface ParsedEpubCFI {
  spinePos?: number,
  range: boolean,
  base: EpubCFIComponent | Record<string, any>,
  path: EpubCFIComponent | Record<string, any>,
  start: EpubCFIComponent | null,
  end: EpubCFIComponent | null
}

export type EpubCFIBase = string | EpubCFIComponent | Record<string, any>;
export type EpubCFIInput = string | Range | RangeObject | Node | EpubCFI;
export type EpubCFIType = "string" | "range" | "node" | "EpubCFI" | false;

export default class EpubCFI {
    constructor(cfiFrom?: EpubCFIInput, base?: EpubCFIBase, ignoreClass?: string);

    str: string;
    base: EpubCFIComponent | Record<string, any>;
		spinePos: number;
		range: boolean;
    path: EpubCFIComponent | Record<string, any>;
    start: EpubCFIComponent | null;
    end: EpubCFIComponent | null;

    isCfiString(str: unknown): boolean;

    fromNode(anchor: Node, base: EpubCFIBase, ignoreClass?: string): ParsedEpubCFI;

    fromRange(range: Range | RangeObject, base: EpubCFIBase, ignoreClass?: string): ParsedEpubCFI;

    parse(cfiStr: string): ParsedEpubCFI | { spinePos: number };

    collapse(toStart?: boolean): void;

    compare(cfiOne: string | EpubCFI, cfiTwo: string | EpubCFI): number;

    equalStep(stepA: object, stepB: object): boolean;

    filter(anchor: Node, ignoreClass?: string): Node | false;

    toRange(_doc?: Document, ignoreClass?: string): Range | RangeObject | null;

    toString(): string;

    private filteredStep(node: Node, ignoreClass?: string): any;

    private findNode(steps: Array<EpubCFIStep>, _doc?: Document, ignoreClass?: string): Node;

    private fixMiss(steps: Array<EpubCFIStep>, offset: number, _doc?: Document, ignoreClass?: string): any;

    checkType(cfi: unknown): EpubCFIType;

    generateChapterComponent(_spineNodeIndex: number, _pos: number | string, id?: string): string;

    getChapterComponent(cfiStr: string): string;

    getCharecterOffsetComponent(cfiStr: string): string;

    getPathComponent(cfiStr: string): string | undefined;

    getRange(cfiStr: string): [string, string] | false;

    joinSteps(steps?: Array<EpubCFIStep>): string;

    private normalizedMap(children: Array<Node>, nodeType: number, ignoreClass?: string): object;

    parseComponent(componentStr: string): EpubCFIComponent;

    parseStep(stepStr: string): EpubCFIStep | undefined;

    parseTerminal(termialStr: string): EpubCFITerminal;

    private patchOffset(anchor: Node, offset: number, ignoreClass?: string): number;

    private pathTo(node: Node, offset: number, ignoreClass?: string): EpubCFISegment;

    private position(anchor: Node): number;

    private segmentString(segment: EpubCFISegment): string;

    private step(node: Node): EpubCFIStep;

    private stepsToQuerySelector(steps: Array<EpubCFIStep>): string;

    private stepsToXpath(steps: Array<EpubCFIStep>): string;

    private textNodes(container: Node, ignoreClass?: string): Array<Node>;

    private walkToNode(steps: Array<EpubCFIStep>, _doc?: Document, ignoreClass?: string): Node;

}

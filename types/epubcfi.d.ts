import { RangeObject } from "./compat/range";

interface EpubCFISegment {
  steps: Array<EpubCFIStep>,
  terminal: {
    offset: number | null,
    assertion: string | null | undefined
  }
}

interface EpubCFIStep {
	id?: string | null,
	tagName?: string,
	type: "element" | "text",
	index: number
}

interface EpubCFIComponent {
  steps: Array<EpubCFIStep>,
  terminal: EpubCFISegment["terminal"] | null
}

export default class EpubCFI {
    constructor(cfiFrom?: string | Range | RangeObject | Node | EpubCFI, base?: string | object, ignoreClass?: string);

    base: EpubCFIComponent;
		spinePos: number;
		range: boolean;
    path: EpubCFIComponent;
    start: EpubCFIComponent | null;
    end: EpubCFIComponent | null;

    isCfiString(str: string): boolean;

    fromNode(anchor: Node, base: string | object, ignoreClass?: string): EpubCFI;

    fromRange(range: Range | RangeObject, base: string | object, ignoreClass?: string): EpubCFI;

    parse(cfiStr: string): EpubCFI | { spinePos: number };

    collapse(toStart?: boolean): void;

    compare(cfiOne: string | EpubCFI, cfiTwo: string | EpubCFI): number;

    equalStep(stepA: object, stepB: object): boolean;

    filter(anchor: Node, ignoreClass?: string): Node | false;

    toRange(_doc?: Document, ignoreClass?: string): Range | RangeObject | null;

    toString(): string;

    private filteredStep(node: Node, ignoreClass?: string): any;

    private findNode(steps: Array<EpubCFIStep>, _doc?: Document, ignoreClass?: string): Node;

    private fixMiss(steps: Array<EpubCFIStep>, offset: number, _doc?: Document, ignoreClass?: string): any;

    private checkType(cfi: string | Range | Node): string | false;

    private generateChapterComponent(_spineNodeIndex: number, _pos: number, id: string): string;

    private getChapterComponent(cfiStr: string): string;

    private getCharecterOffsetComponent(cfiStr: string): string;

    private getPathComponent(cfiStr: string): string;

    private getRange(cfiStr: string): [string, string] | false;

    private joinSteps(steps?: Array<EpubCFIStep>): string;

    private normalizedMap(children: Array<Node>, nodeType: number, ignoreClass?: string): object;

    private parseComponent(componentStr: string): EpubCFIComponent;

    private parseStep(stepStr: string): EpubCFIStep | undefined;

    private parseTerminal(termialStr: string): EpubCFISegment["terminal"];

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

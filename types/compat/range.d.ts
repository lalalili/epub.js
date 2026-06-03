export class RangeObject {
    collapsed: boolean;
    commonAncestorContainer: Node | undefined;
    endContainer: Node | undefined;
    endOffset: number | undefined;
    startContainer: Node | undefined;
    startOffset: number | undefined;

    setStart(startNode: Node, startOffset: number): void;
    setEnd(endNode: Node, endOffset: number): void;
    collapse(toStart: boolean): void;
    selectNode(referenceNode: Node): void;
    selectNodeContents(referenceNode: Node): void;
    toString(): void;
}

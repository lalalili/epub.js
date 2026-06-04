declare module "marks-pane" {
	type MarkData = Record<string, unknown>;
	type MarkAttributes = Record<string, string>;

	export class Pane {
		element: HTMLElement;
		constructor(target: HTMLElement, container: HTMLElement);
		addMark(mark: Highlight | Underline): {
			element: HTMLElement | SVGElement;
		};
		removeMark(mark: unknown): void;
		render(): void;
	}

	export class Highlight {
		element: HTMLElement | SVGElement;
		constructor(range: Range, className?: string, data?: MarkData, attributes?: MarkAttributes);
	}

	export class Underline extends Highlight {}
}

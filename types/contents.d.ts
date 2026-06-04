import EpubCFI from "./epubcfi";
import { RangeObject } from "./compat/range";

export interface ViewportSettings {
  width?: string | number,
  height?: string | number,
  scale?: string | number,
  scalable?: string,
  minimum?: string | number,
  maximum?: string | number
}

export interface ContentsSize {
  width: number,
  height: number
}

export interface VerticalRlMetricsCache {
  key: string,
  width: number
}

export interface VerticalRlPageMetricsCache {
  key: string,
  metrics: Record<string, any>
}

export default class Contents {
    constructor(doc: Document, content?: HTMLElement, cfiBase?: string, sectionIndex?: number, sectionHref?: string);

    epubcfi: EpubCFI;
    document: Document;
    documentElement: HTMLElement;
    content: HTMLElement;
    window: Window & typeof globalThis;
    _size: ContentsSize;
    sectionIndex: number;
    cfiBase: string;
    sectionHref: string;
    _verticalRlMetricsCache: VerticalRlMetricsCache | null;
    _verticalRlPageMetricsCache: VerticalRlPageMetricsCache | null;
    _verticalRlStableSnappedContentWidth?: { pageLength: number, totalPages: number, width: number } | null;
    _forcedWritingMode: string;
    _layoutStyle?: string;
    called: number;
    active: boolean;

    static listenedEvents: string[];

    addClass(className: string): void;

    addScript(src: string): Promise<boolean>;

    addStylesheet(src: string): Promise<boolean>;

    addStylesheetRules(rules: Array<object> | object, key?: string): void;

    addStylesheetCss(serializedCss: string, key?: string): boolean;

    cfiFromNode(node: Node, ignoreClass?: string): string;

    cfiFromRange(range: Range | RangeObject, ignoreClass?: string): string;

    columns(width: number, height: number, columnWidth: number, gap: number, dir?: string): void;

    contentHeight(h?: number | string): number;

    contentWidth(w?: number | string): number;

    css(property: string, value?: string, priority?: boolean): string;

    destroy(): void;

    direction(dir?: string): void;

    fit(width: number, height: number, section?: unknown): void;

    forceWritingMode(mode?: string): string;

    height(h?: number | string): number;

    invalidateVerticalRlMetricsCache(): void;

    isViewportFillingSingleMediaPage(viewportWidth: number): boolean;

    locationOf(target: string | number | EpubCFI, ignoreClass?: string): { top: number, left: number };

    map(layout: any): any;

    mapPage(cfiBase: string, layout: object, start: number, end: number, dev?: boolean): any;

    measureVerticalRlRect(): {
      left: number,
      right: number,
      top: number,
      bottom: number,
      rawWidth: number,
      rawHeight: number
    };

    overflow(overflow?: string): string;

    overflowX(overflow?: string): string;

    overflowY(overflow?: string): string;

    range(cfi: string | EpubCFI, ignoreClass?: string): Range | RangeObject | null;

    removeClass(className: any): void;

    root(): Element | null;

    scaler(scale: number, offsetX?: number, offsetY?: number): void;

    scrollHeight(): number;

    scrollWidth(): number;

    size(width?: number | null, height?: number | null): void;

    textHeight(): number;

    textWidth(): number;

    verticalRlPageMetrics(pageWidth?: number, pageHeight?: number): Record<string, any>;

    debugVerticalRlMetrics(pageWidth?: number): Record<string, any>;

    viewport(options?: ViewportSettings): ViewportSettings;

    width(w?: number | string): number;

    writingMode(mode?: string): string;

    // Event emitters
    emit(type: string, ...args: any[]): void;

    off(type: string, listener: (...args: any[]) => void): unknown;

    on(type: string, listener: (...args: any[]) => void): unknown;

    once(type: string, listener: (...args: any[]) => void): unknown;

    private addEventListeners(): void;

    private addSelectionListeners(): void;

    private epubReadingSystem(name: string, version: string): object;

    private expand(): void;

    private fontLoadListeners(): void;

    private imageLoadListeners(): void;

    private layoutStyle(style?: string): string;

    private linksHandler(): void;

    private listeners(): void;

    private mediaQueryListeners(): void;

    private onSelectionChange(e?: Event): void;

    private removeEventListeners(): void;

    private removeListeners(): void;

    private removeSelectionListeners(): void;

    private resizeCheck(): void;

    private resizeListeners(): void;

    private resizeObservers(): void;

    private transitionListeners(): void;

    private triggerEvent(e: Event): void;

    private triggerSelectedEvent(selection: Selection | null): void;
}

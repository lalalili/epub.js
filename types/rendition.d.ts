import Book from "./book";
import Contents from "./contents";
import Section from "./section";
import View from "./managers/view";
import Hook from "./utils/hook";
import Themes from "./themes";
import EpubCFI from "./epubcfi";
import Annotations from "./annotations";
import Queue from "./utils/queue";
import { Deferred } from "./utils/core";
import Layout from "./layout";
import { VerticalRlDebugMetrics } from "./contents";
import { PackagingMetadata } from "./packaging";

export interface RenditionOptions {
  width?: number | string | null,
  height?: number | string | null,
  ignoreClass?: string,
  manager?: string | Function | object,
  view?: string | Function | object,
  flow?: string | null,
  layout?: string | null,
  spread?: string | boolean | null,
  minSpreadWidth?: number,
  stylesheet?: string | null,
  resizeOnOrientationChange?: boolean,
  script?: string | null,
  infinite?: boolean,
  overflow?: string,
  snap?: boolean | object,
  defaultDirection?: string,
  allowScriptedContent?: boolean,
  allowPopups?: boolean,
  orientation?: string | null,
  direction?: string,
  globalLayoutProperties?: object
}

export interface LayoutProperties {
  layout: string,
  spread: string | boolean,
  orientation: string,
  flow: string,
  viewport: string,
  minSpreadWidth: number,
  direction: string
}

export interface RenditionLocationPart {
  index: number,
  href: string,
  cfi: string,
  location?: number,
  percentage?: number,
  page?: number,
  displayed: {
    page: number,
    total: number
  }
}

export type DisplayedLocation = RenditionLocationPart;

export interface Location {
  start?: RenditionLocationPart,
	end?: RenditionLocationPart,
  atStart?: boolean,
  atEnd?: boolean
}

export interface ManagerLocationItem {
  index: number,
  href: string,
  mapping: {
    start: string,
    end: string
  },
  pages: number[],
  totalPages: number
}

export interface RenditionVerticalRlPageDebug {
  containerClientWidth: number | null,
  containerScrollWidth: number | null,
  containerScrollLeft: number | null,
  iframeOffsetWidth: number | null,
  iframeClientWidth: number | null,
  normalizedLogicalScrollLeft: number | null,
  physicalStart: number | null,
  physicalEnd: number | null,
  pageWidth: number | null,
  effectivePageAdvance: number | null,
  totalPages: number | null,
  currentPageIndex: number | null
}

export type RenditionVerticalRlDebugState = Partial<VerticalRlDebugMetrics> & RenditionVerticalRlPageDebug;

export default class Rendition {
    constructor(book: Book, options?: RenditionOptions);

    settings: RenditionOptions;
    book: Book;
    hooks: {
      display: Hook,
      serialize: Hook,
      content: Hook,
      unloaded: Hook,
      layout: Hook,
      render: Hook,
      show: Hook
    }
    manager?: any;
    ViewManager?: any;
    View?: any;
    _layout?: Layout;
    themes?: Themes;
    annotations?: Annotations;
    epubcfi?: EpubCFI;
    q: Queue;
    location?: Location;
    starting?: Deferred<void>;
    started?: Promise<void>;
    displaying?: Deferred<any>;

    adjustImages(contents: Contents): Promise<void>;

    attachTo(element: Element | string): Promise<void>;

    clear(): void;

    currentLocation(): Location | Promise<Location> | undefined;

    destroy(): void;

    debugVerticalRlPage(): RenditionVerticalRlDebugState;

    determineLayoutProperties(metadata: PackagingMetadata): LayoutProperties;

    direction(dir: string): void;

    display(target?: string): Promise<void>;
    display(target?: number): Promise<void>;

    flow(flow?: string | null): void;

    getContents(): Contents[];

    getRange(cfi: string, ignoreClass?: string): Range | undefined;

    handleLinks(contents: Contents): void;

    injectIdentifier(doc: Document, section: Section): void;

    injectScript(doc: Document, section: Section): void;

    injectStylesheet(doc: Document, section: Section): void;

    layout(settings?: LayoutProperties | Record<string, unknown>): Layout | undefined;

    located(location: Array<ManagerLocationItem | null | undefined>): Location;

    moveTo(offset: object): void;

    next(): Promise<void>;

    onOrientationChange(orientation: string): void;

    passEvents(contents: Contents): void;

    prev(): Promise<void>;

    reportLocation(): Promise<void>;

    remeasure(options?: { preserveLocation?: boolean, waitForFonts?: boolean }): Promise<void>;

    requireManager(manager: string | Function | object): any;

    requireView(view: string | Function | object): any;

    resolveLinkHref(href: string, contents?: { sectionHref?: string }): string;

    resize(width?: number | string, height?: number | string, epubcfi?: string): void;

    setManager(manager: Function): void;

    spread(spread: string | boolean, min?: number): void;

    start(): void;

    views(): Array<View>;

    // Event emitters
    emit(type: string, ...args: unknown[]): void;

    off(type: string, listener: (...args: unknown[]) => void): unknown;

    on(type: string, listener: (...args: unknown[]) => void): unknown;

    once(type: string, listener: (...args: unknown[]) => void): unknown;

    private triggerMarkEvent(cfiRange: string, data: object, contents: Contents): void;

    private triggerSelectedEvent(cfirange: string, contents: Contents): void;

    private triggerViewEvent(e: Event, contents: Contents): void;

    private onResized(size: { width: number, height: number }): void;

    private afterDisplayed(view: any): void;

    private afterRemoved(view: any): void;

}

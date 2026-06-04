import Book from "./book";
import Contents from "./contents";
import Section from "./section";
import View from "./managers/view";
import Hook from "./utils/hook";
import Themes from "./themes";
import EpubCFI from "./epubcfi";
import Annotations, { AnnotationData } from "./annotations";
import Queue from "./utils/queue";
import { Deferred } from "./utils/core";
import Layout from "./layout";
import { VerticalRlDebugMetrics } from "./contents";
import { PageValue } from "./pagelist";
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
  page?: PageValue,
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

export type RenditionViewsBridge = Array<View> | {
  all?: () => Array<View>,
  first?: () => View | undefined,
  last?: () => View | undefined
}

export interface RenditionManager {
  container?: HTMLElement;
  layout?: Layout;
  views?: RenditionViewsBridge;
  _layoutDirty?: boolean;
  render(element: Element, size?: { width: number | string | null, height: number | string | null }): void;
  display(section: Section, target?: string | number): Promise<void>;
  resize(width?: number | string, height?: number | string, epubcfi?: string): void;
  resizeView?(view: View): void;
  moveTo(offset: object): void;
  clear(): void;
  next(): Promise<void>;
  prev(): Promise<void>;
  currentLocation(): Array<ManagerLocationItem | null | undefined> | Promise<Array<ManagerLocationItem | null | undefined>>;
  visible(): Array<View>;
  getContents(): Contents[];
  getPageAdvance?(): number;
  getTotalPagesForCurrentView?(): number;
  getCurrentPageIndex?(): number;
  getNormalizedLogicalScrollLeft?(): number;
  applyLayout(layout: Layout): void;
  updateFlow(flow: string): void;
  updateLayout(): void;
  direction(dir?: string): void;
  isRendered(): boolean;
  destroy(): void;
  on(type: string, listener: (...args: unknown[]) => void): unknown;
}

export interface RenditionManagerOptions {
  view: RenditionViewConstructor;
  queue: Queue;
  request: Book["load"];
  settings: RenditionOptions;
}

export interface RenditionHooks {
  display: Hook;
  serialize: Hook;
  content: Hook;
  unloaded: Hook;
  layout: Hook;
  render: Hook;
  show: Hook;
}

export type RenditionManagerConstructor = new (options: RenditionManagerOptions) => RenditionManager;
export type RenditionViewConstructor = new (section: unknown, options?: unknown) => View;

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
    hooks: RenditionHooks;
    manager?: RenditionManager;
    ViewManager?: RenditionManagerConstructor;
    View?: RenditionViewConstructor;
    _layout?: Layout;
    themes?: Themes;
    annotations?: Annotations;
    epubcfi?: EpubCFI;
    q: Queue;
    location?: Location;
    starting?: Deferred<void>;
    started?: Promise<void>;
    displaying?: Deferred<Section | undefined>;

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

    requireManager(manager: string | Function | object): string | Function | object;

    requireView(view: string | Function | object): string | Function | object;

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

    private triggerMarkEvent(cfiRange: string, data: AnnotationData | undefined, contents: Contents): void;

    private triggerSelectedEvent(cfirange: string, contents: Contents): void;

    private triggerViewEvent(e: Event, contents: Contents): void;

    private onResized(size: { width: number, height: number }): void;

    private afterDisplayed(view: View): void;

    private afterRemoved(view: View): void;

}

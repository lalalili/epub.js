import {
  PackagingManifestObject,
  PackagingMetadataObject
} from "./packaging";
import Rendition, { RenditionOptions } from "./rendition";
import Section from "./section";
import Archive, { ArchiveZip } from "./archive";
import Navigation from "./navigation";
import PageList from "./pagelist";
import Spine from "./spine";
import Locations from "./locations";
import Url from "./utils/url";
import Path from "./utils/path";
import Resources from "./resources";
import Container from "./container";
import Packaging from "./packaging";
import Store from "./store";
import DisplayOptions from "./displayoptions";
import { Deferred } from "./utils/core";
import { JsonValue, RequestHeaders, RequestMethod, RequestResponse, RequestType } from "./utils/request";

export type BookInput = string | ArrayBuffer | Blob;

export interface BookOptions {
  requestMethod?: RequestMethod;
  requestCredentials?: boolean;
  requestHeaders?: RequestHeaders;
  encoding?: string;
  replacements?: string;
  canonical?: (path: string) => string;
  openAs?: string;
  store?: string;
}

export interface BookLoading {
  metadata: Deferred<PackagingMetadataObject>;
  spine: Deferred<Spine>;
  manifest: Deferred<PackagingManifestObject>;
  cover: Deferred<string | undefined>;
  navigation: Deferred<Navigation>;
  pageList: Deferred<PageList | undefined>;
  resources: Deferred<Resources>;
  displayOptions: Deferred<DisplayOptions>;
}

export interface BookLoaded {
  metadata: Promise<PackagingMetadataObject>;
  spine: Promise<Spine>;
  manifest: Promise<PackagingManifestObject>;
  cover: Promise<string | undefined>;
  navigation: Promise<Navigation>;
  pageList: Promise<PageList | undefined>;
  resources: Promise<Resources>;
  displayOptions: Promise<DisplayOptions>;
}

export default class Book {
    constructor(url?: BookInput, options?: BookOptions);
    constructor(options?: BookOptions);

    settings: BookOptions;
    opening?: Deferred<Book>;
    opened?: Promise<Book>;
    isOpen: boolean;
    loading?: BookLoading;
    loaded?: BookLoaded;
    ready?: Promise<any[]>;
    isRendered: boolean;
    request: RequestMethod;
    spine?: Spine;
    locations?: Locations;
    navigation?: Navigation;
    pageList?: PageList;
    url?: Url;
    path?: Path;
    archived: boolean;
    archive?: Archive;
    resources?: Resources;
    rendition?: Rendition
    container?: Container;
    packaging?: Packaging;
    package?: Packaging;
    storage?: Store;
    displayOptions?: DisplayOptions;
    cover?: string;


    canonical(path: string): string;

    coverUrl(): Promise<string | null>;

    destroy(): void;

    determineType(input: BookInput): string | undefined;

    getRange(cfiRange: string): Promise<Range>;

    key(identifier?: string): string;

    load(path: string, type: "binary"): Promise<ArrayBuffer>;
    load(path: string, type: "blob"): Promise<Blob>;
    load(path: string, type: "json"): Promise<JsonValue>;
    load(path: string, type: "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm"): Promise<Document | XMLDocument>;
    load(path: string, type?: RequestType | null): Promise<RequestResponse>;

    loadNavigation(packaging: Packaging): Promise<Navigation>;

    open(input: string, what?: string): Promise<Book>;
    open(input: ArrayBuffer | Blob, what?: string): Promise<Book>;

    openContainer(url: string): Promise<string>;

    openEpub(data: BookInput, encoding?: string): Promise<Book>;

    openManifest(url: string): Promise<Book>;

    openPackaging(url: string): Promise<Book>;

    renderTo(element: Element, options?: RenditionOptions): Rendition;
    renderTo(element: string, options?: RenditionOptions): Rendition;

    private replacements(): Promise<void>;

    resolve(path?: string | false, absolute?: boolean): string | undefined;

    section(target: string): Section | undefined;
    section(target: number): Section | undefined;

    setRequestCredentials(credentials: boolean): void;

    setRequestHeaders(headers: RequestHeaders): void;

    unarchive(input: BookInput, encoding?: string): Promise<ArchiveZip>;

    store(name: string): Store;

    unpack(packaging: Packaging): void;

    // Event emitters
    emit(type: any, ...args: any[]): void;

    off(type: any, listener: any): any;

    on(type: any, listener: any): any;

    once(type: any, listener: any, ...args: any[]): any;

}

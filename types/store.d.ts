import { JsonValue, RequestResponse } from "./utils/request";

export type StoreData = ArrayBuffer | Uint8Array | string | Blob | object;

export type StoreRequestType = string | undefined;

export type StoreHeaders = Record<string, string>;

export type StoreRequest = (url: string, type?: StoreRequestType, withCredentials?: boolean, headers?: StoreHeaders) => Promise<RequestResponse | StoreData>;

export type StoreResolver = (href: string) => string;

export interface StoreStorage {
  getItem(key: string): Promise<StoreData | null | undefined>;
  setItem(key: string, value: StoreData): Promise<StoreData>;
}

export interface StoreResource {
  href: string
}

export interface StoreResources {
  resources: Array<StoreResource>
}

export interface StoreUrlOptions {
  base64?: boolean
}

export default class Store {
  constructor(name: string, requester?: StoreRequest, resolver?: StoreResolver);

  urlCache: Record<string, string>;
  storage?: StoreStorage;
  name: string;
  requester: StoreRequest;
  resolver?: StoreResolver;
  online: boolean;
  _status?: (event?: Event) => void;
  emit(eventName: string, ...args: any[]): void;

  add(resources: StoreResources, force?: boolean): Promise<Array<StoreData>>;

  put(url: string, withCredentials?: boolean, headers?: StoreHeaders): Promise<StoreData>;

  request(url: string, type: "blob", withCredentials?: boolean, headers?: StoreHeaders): Promise<Blob>;
  request(url: string, type: "json", withCredentials?: boolean, headers?: StoreHeaders): Promise<JsonValue>;
  request(url: string, type: "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm", withCredentials?: boolean, headers?: StoreHeaders): Promise<Document | XMLDocument>;
  request(url: string, type?: StoreRequestType, withCredentials?: boolean, headers?: StoreHeaders): Promise<RequestResponse>;

  retrieve(url: string, type: "blob"): Promise<Blob>;
  retrieve(url: string, type: "json"): Promise<JsonValue>;
  retrieve(url: string, type: "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm"): Promise<Document | XMLDocument>;
  retrieve(url: string, type?: StoreRequestType): Promise<RequestResponse>;

  handleResponse(response: string, type: "json"): JsonValue;
  handleResponse(response: string, type: "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm"): Document | XMLDocument;
  handleResponse(response: RequestResponse, type?: StoreRequestType): RequestResponse;

  getBlob(url: string, mimeType?: string): Promise<Blob | undefined>;

  getText(url: string, mimeType?: string): Promise<string | ArrayBuffer | null | undefined>;

  getBase64(url: string, mimeType?: string): Promise<string | ArrayBuffer | null | undefined>;

  createUrl(url: string, options?: StoreUrlOptions): Promise<string>;

  revokeUrl(url: string): void;

  destroy(): void;

  checkRequirements(): void;

  addListeners(): void;

  removeListeners(): void;

  status(event?: Event): void;
}

import { JsonValue, RequestResponse } from "./utils/request";

export type ArchiveInput = ArrayBuffer | Blob | Uint8Array | string;

export type ArchiveRequestType = string | undefined;

export type ArchiveMarkupRequestType = "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm";

export interface ArchiveZipOptions {
  base64?: boolean | string
}

export interface ArchiveUrlOptions {
  base64?: boolean
}

export interface ArchiveEntry {
  name: string;
  async(type: "uint8array"): Promise<Uint8Array>;
  async(type: "string"): Promise<string>;
  async(type: "base64"): Promise<string>;
}

export interface ArchiveZip {
  loadAsync(input: ArchiveInput, options?: ArchiveZipOptions): Promise<ArchiveZip>;
  file(path: string): ArchiveEntry | null;
}

export default class Archive {
  constructor();

  zip?: ArchiveZip;
  urlCache: Record<string, string>;

  open(input: ArchiveInput, isBase64?: boolean | string): Promise<ArchiveZip>;

  openUrl(zipUrl: string, isBase64?: boolean): Promise<ArchiveZip>;

  request(url: string, type: "blob"): Promise<Blob>;
  request(url: string, type: "json"): Promise<JsonValue>;
  request(url: string, type: ArchiveMarkupRequestType): Promise<Document | XMLDocument>;
  request(url: string, type?: ArchiveRequestType): Promise<RequestResponse>;

  getBlob(url: string, mimeType?: string): Promise<Blob> | undefined;

  getText(url: string, encoding?: string): Promise<string> | undefined;

  getBase64(url: string, mimeType?: string): Promise<string> | undefined;

  createUrl(url: string, options?: ArchiveUrlOptions): Promise<string>;

  revokeUrl(url: string): void;

  destroy(): void;

  checkRequirements(): void;

  handleResponse(response: string, type: "json"): JsonValue;
  handleResponse(response: string, type: ArchiveMarkupRequestType): Document | XMLDocument;
  handleResponse(response: RequestResponse, type?: ArchiveRequestType): RequestResponse;
}

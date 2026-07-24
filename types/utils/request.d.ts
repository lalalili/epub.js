export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

export type RequestType =
  | "binary"
  | "blob"
  | "json"
  | "xml"
  | "opf"
  | "ncx"
  | "xhtml"
  | "html"
  | "htm"
  | "text"
  | string;

export type RequestHeaders = Record<string, string>;

export type RequestResponse = ArrayBuffer | Blob | string | JsonValue | Document | XMLDocument;

export interface RequestMethod {
  (url: string, type: "binary", withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<ArrayBuffer>;
  (url: string, type: "blob", withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<Blob>;
  (url: string, type: "json", withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<JsonValue>;
  (url: string, type: "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm", withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<Document | XMLDocument>;
  (url: string, type: "text", withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<string>;
  (url: string, type?: RequestType | null, withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<RequestResponse>;
}

declare const request: RequestMethod;

export default request;

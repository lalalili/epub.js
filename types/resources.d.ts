import { PackagingManifestObject } from "./packaging";
import Archive from "./archive";

export interface ResourceManifestItem {
  href: string,
  type?: string,
  [key: string]: unknown
}

export interface ResourceManifest {
  [key: string]: ResourceManifestItem
}

export interface ResourceArchive {
  createUrl(url: string, options?: { base64?: boolean }): Promise<string>;
  getText(url: string): Promise<string> | undefined;
}

export type ResourceResolver = (href: string) => string;

export type ResourceRequest = (url: string, type: "blob" | "text") => Promise<Blob | string>;

export type ReplacementMode = "base64" | "blob" | "none" | string;

export interface ResourceOptions {
  replacements?: ReplacementMode,
  archive?: ResourceArchive,
  resolver?: ResourceResolver,
  request?: ResourceRequest
}

export interface ResourceSettings {
  replacements: ReplacementMode,
  archive?: ResourceArchive,
  resolver?: ResourceResolver,
  request?: ResourceRequest
}

export default class Resources {
  constructor(manifest: ResourceManifest | PackagingManifestObject, options?: ResourceOptions);

  settings?: ResourceSettings;
  manifest?: ResourceManifest;
  resources?: Array<ResourceManifestItem>;
  replacementUrls?: Array<string>;
  html?: Array<ResourceManifestItem>;
  assets?: Array<ResourceManifestItem>;
  css?: Array<ResourceManifestItem>;
  urls?: Array<string>;
  cssUrls?: Array<string>;

  process(manifest: ResourceManifest | PackagingManifestObject): void;

  split(): void;

  splitUrls(): void;

  createUrl(url: string): Promise<string>;

  replacements(): Promise<Array<string | null>>;

  replaceCss(archive?: ResourceArchive | Archive, resolver?: ResourceResolver): Promise<Array<void>>;

  createCssFile(href: string, archive?: ResourceArchive | Archive, resolver?: ResourceResolver): Promise<string | undefined>;

  relativeTo(absolute: string, resolver?: ResourceResolver): Array<string>;

  get(path: string): Promise<string> | undefined;

  substitute(content: string, url?: string): string;

  destroy(): void;
}

export interface PackagingMetadataObject {
  title?: string,
  creator?: string,
  description?: string,
  pubdate?: string,
  publisher?: string,
  identifier?: string,
  language?: string,
  rights?: string,
  modified_date?: string,
  layout?: string,
  orientation?: string,
  flow?: string,
  viewport?: string,
  media_active_class?: string,
  spread?: string,
  direction?: string | null,
  [key: string]: unknown
}

export type PackagingMetadata = PackagingMetadataObject;

export interface PackagingSpineItem {
  id?: string | null,
  idref?: string | null,
  linear?: string,
  properties?: Array<string>,
  index?: number,
  href?: string,
  [key: string]: unknown
}

export interface PackagingManifestItem {
  href: string,
  type?: string,
  overlay?: string,
  mediaOverlay?: string,
  fallback?: string,
  fallbackChain?: Array<string>,
  properties?: Array<string>,
  rel?: Array<string>,
  [key: string]: unknown
}

export interface PackagingManifestObject {
  [key: string]: PackagingManifestItem
}

export type PackagingManifest = PackagingManifestObject;

export interface PackagingTocItem {
  href?: string,
  title?: string,
  label?: string,
  [key: string]: unknown
}

export interface PackagingJsonManifestBase {
  metadata: PackagingMetadataObject,
  resources: Array<PackagingManifestItem>,
  toc: Array<PackagingTocItem>
}

export type PackagingJsonManifest = PackagingJsonManifestBase & (
  | {
    readingOrder: Array<PackagingSpineItem>,
    spine?: Array<PackagingSpineItem>
  }
  | {
    readingOrder?: Array<PackagingSpineItem>,
    spine: Array<PackagingSpineItem>
  }
);

export interface PackagingObject {
  metadata: PackagingMetadataObject,
  spine: Array<PackagingSpineItem>,
  manifest: PackagingManifestObject,
  navPath?: string | false,
  ncxPath?: string | false,
  coverPath?: string | false,
  spineNodeIndex?: number,
  toc?: Array<PackagingTocItem>
}

export default class Packaging {
  constructor(packageDocument?: XMLDocument | Document);

  manifest?: PackagingManifestObject;
  navPath?: string | false;
  ncxPath?: string | false;
  coverPath?: string | false;
  spineNodeIndex?: number;
  spine?: Array<PackagingSpineItem>;
  metadata?: PackagingMetadataObject;
  uniqueIdentifier?: string;
  toc?: Array<PackagingTocItem>;

  parse(packageDocument: XMLDocument | Document): PackagingObject;

  load(json: PackagingJsonManifest): PackagingObject;

  destroy(): void;

  parseMetadata(xml: Element): PackagingMetadataObject;

  parseManifest(xml: Element): PackagingManifestObject;

  parseSpine(xml: Element, manifest: PackagingManifestObject): Array<PackagingSpineItem>;

  findUniqueIdentifier(packageXml: XMLDocument | Document): string;

  findNavPath(manifestNode: Element): string | false;

  findNcxPath(manifestNode: Element, spineNode: Element): string | false;

  findCoverPath(packageXml: XMLDocument | Document): string | false;

  getElementText(xml: Element, tag: string): string;

  getPropertyText(xml: Element, property: string): string;
}

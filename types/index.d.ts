// Type definitions for epubjs 0.3
// Project: https://github.com/lalalili/epub.js#readme
// Definitions by: Fred Chasen <https://github.com/fchasen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
import Epub from "./epub";

declare global {
  const ePub: typeof Epub;
}

export default Epub;

export type { default as Archive, ArchiveEntry, ArchiveInput, ArchiveRequestType, ArchiveUrlOptions, ArchiveZip } from './archive';
export { default as Book } from './book';
export type { BookInput, BookLoaded, BookLoading, BookOptions } from './book';
export { default as EpubCFI } from './epubcfi';
export { default as Rendition } from './rendition';
export type { LayoutProperties as RenditionLayoutProperties, Location, ManagerLocationItem, RenditionOptions } from './rendition';
export { default as Contents } from './contents';
export type { default as Container, ContainerDocument } from './container';
export { default as Layout } from './layout';
export type { default as Navigation, LandmarkItem, NavItem, NavigationDocument, NavigationInput, NavigationInputItem } from './navigation';
export type { default as Packaging, PackagingJsonManifest, PackagingManifestItem, PackagingManifestObject, PackagingMetadataObject, PackagingObject, PackagingSpineItem, PackagingTocItem } from './packaging';
export type { default as PageList, PageListDocument, PageListItem, PageLookup, PageReverseLookup, PageValue } from './pagelist';
export type { default as Resources, ReplacementMode, ResourceArchive, ResourceManifest, ResourceManifestItem, ResourceOptions, ResourceRequest, ResourceResolver, ResourceSettings } from './resources';
export type { default as Store, StoreData, StoreHeaders, StoreRequest, StoreRequestType, StoreResolver, StoreResource, StoreResources, StoreStorage, StoreUrlOptions } from './store';
export { default as request } from './utils/request';

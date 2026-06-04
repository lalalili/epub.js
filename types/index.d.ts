// Type definitions for epubjs 0.3
// Project: https://github.com/lalalili/epub.js#readme
// Definitions by: Fred Chasen <https://github.com/fchasen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
import Epub from "./epub";

declare global {
  const ePub: typeof Epub;
}

export default Epub;

export type { default as Annotations, Annotation, AnnotationCallback, AnnotationData, AnnotationMap, AnnotationOptions, AnnotationStyles, AnnotationType, AnnotationView, AnnotationsRendition, SectionAnnotationMap } from './annotations';
export type { default as Archive, ArchiveEntry, ArchiveInput, ArchiveMarkupRequestType, ArchiveRequestType, ArchiveUrlOptions, ArchiveZip, ArchiveZipOptions } from './archive';
export { default as Book } from './book';
export type { BookInput, BookLoaded, BookLoading, BookOptions, BookReady } from './book';
export { default as EpubCFI } from './epubcfi';
export type { EpubCFIBase, EpubCFIComponent, EpubCFIInput, EpubCFISegment, EpubCFIStep, EpubCFITerminal, EpubCFIType, ParsedEpubCFI } from './epubcfi';
export { default as Rendition } from './rendition';
export type { DisplayedLocation, LayoutProperties as RenditionLayoutProperties, Location, ManagerLocationItem, RenditionHooks, RenditionLocationPart, RenditionManager, RenditionManagerConstructor, RenditionManagerOptions, RenditionOptions, RenditionViewConstructor, RenditionVerticalRlDebugState, RenditionVerticalRlPageDebug, RenditionViewsBridge } from './rendition';
export { default as Contents } from './contents';
export type { default as Container, ContainerDocument } from './container';
export type { default as DisplayOptions } from './displayoptions';
export { default as Layout } from './layout';
export type { LayoutContent, LayoutCount, LayoutProps, LayoutSettings } from './layout';
export type { ContentsSize, VerticalRlDebugMetrics, VerticalRlPageMetrics, VerticalRlMetricsCache, VerticalRlPageMetricsCache, ViewportSettings } from './contents';
export type { AnimationFrameRequest, BlobContent, Deferred, RectBounds, SizeBounds } from './utils/core';
export type { default as Navigation, LandmarkItem, NavItem, NavigationDocument, NavigationInput, NavigationInputItem } from './navigation';
export type { default as Packaging, PackagingJsonManifest, PackagingJsonManifestBase, PackagingManifest, PackagingManifestItem, PackagingManifestObject, PackagingMetadata, PackagingMetadataObject, PackagingObject, PackagingSpineItem, PackagingTocItem } from './packaging';
export type { default as PageList, PageListDocument, PageListItem, PageLookup, PageReverseLookup, PageValue } from './pagelist';
export type { default as Path, ParsedPath } from './utils/path';
export type { default as Queue, QueuedItem, QueueTask } from './utils/queue';
export type { default as Hook, HookRegistration, HooksObject, HookTask } from './utils/hook';
export type { default as Url, UrlBase } from './utils/url';
export { replaceBase, replaceCanonical, replaceLinks, replaceMeta, substitute } from './utils/replacements';
export type { LinkCallback, SectionLike } from './utils/replacements';
export type { default as Section, GlobalLayout, LayoutSettings as SectionLayoutSettings, SectionHookSet, SectionRequest, SectionSearchResult, SpineItem } from './section';
export type { default as Spine, SpineLookup, SpineManifestItem, SpinePackage, SpinePackageItem, SpineResolver } from './spine';
export type { default as Mapping, EpubCFIPair, MappingAxis, MappingContents, MappingDirection, MappingLayout, MappingSection, MappingTextNodeWalker, MappingView, RangePair } from './mapping';
export type { default as Locations, LocationInput, LocationRange, LocationsRequest, WordLocation } from './locations';
export type { default as Themes, InjectedThemes, Theme, ThemeInput, ThemeOverride, ThemeRules, ThemesContent, ThemesRendition } from './themes';
export type { default as Resources, ReplacementMode, ResourceArchive, ResourceArchiveInput, ResourceManifest, ResourceManifestItem, ResourceOptions, ResourceRequest, ResourceResolver, ResourceSettings } from './resources';
export type { default as Store, StoreData, StoreHeaders, StoreMarkupRequestType, StoreRequest, StoreRequestResponse, StoreRequestType, StoreResolver, StoreResource, StoreResources, StoreStorage, StoreUrlOptions } from './store';
export { default as request } from './utils/request';
export type { JsonValue, RequestHeaders, RequestMethod, RequestResponse, RequestType } from './utils/request';

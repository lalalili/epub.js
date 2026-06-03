import ePub, {
  Book,
  Contents,
  EpubCFI,
  Layout,
  Rendition,
  replaceBase as rootReplaceBase,
  replaceCanonical as rootReplaceCanonical,
  replaceLinks as rootReplaceLinks,
  replaceMeta as rootReplaceMeta,
  request,
  substitute as rootSubstitute,
} from '../';
import type {
  Annotation as RootAnnotation,
  AnnotationCallback as RootAnnotationCallback,
  AnnotationData as RootAnnotationData,
  AnnotationMap as RootAnnotationMap,
  AnnotationOptions as RootAnnotationOptions,
  Annotations as RootAnnotations,
  AnnotationsRendition as RootAnnotationsRendition,
  AnnotationStyles as RootAnnotationStyles,
  AnnotationType as RootAnnotationType,
  AnnotationView as RootAnnotationView,
  Archive as RootArchive,
  ArchiveEntry as RootArchiveEntry,
  ArchiveInput as RootArchiveInput,
  ArchiveRequestType as RootArchiveRequestType,
  ArchiveUrlOptions as RootArchiveUrlOptions,
  ArchiveZip as RootArchiveZip,
  BookInput as RootBookInput,
  BookLoaded as RootBookLoaded,
  BookLoading as RootBookLoading,
  BookOptions as RootBookOptions,
  AnimationFrameRequest as RootAnimationFrameRequest,
  BlobContent as RootBlobContent,
  Container as RootContainer,
  ContainerDocument as RootContainerDocument,
  ContentsSize as RootContentsSize,
  Deferred as RootDeferred,
  DisplayOptions as RootDisplayOptions,
  EpubCFIBase as RootEpubCFIBase,
  EpubCFIComponent as RootEpubCFIComponent,
  EpubCFIInput as RootEpubCFIInput,
  DisplayedLocation as RootDisplayedLocation,
  Location as RootLocation,
  LocationInput as RootLocationInput,
  LocationRange as RootLocationRange,
  Locations as RootLocations,
  LocationsRequest as RootLocationsRequest,
  LinkCallback as RootLinkCallback,
  ManagerLocationItem as RootManagerLocationItem,
  Mapping as RootMapping,
  EpubCFIPair as RootEpubCFIPair,
  MappingAxis as RootMappingAxis,
  MappingContents as RootMappingContents,
  MappingDirection as RootMappingDirection,
  MappingLayout as RootMappingLayout,
  MappingTextNodeWalker as RootMappingTextNodeWalker,
  MappingView as RootMappingView,
  EpubCFISegment as RootEpubCFISegment,
  EpubCFIStep as RootEpubCFIStep,
  EpubCFITerminal as RootEpubCFITerminal,
  EpubCFIType as RootEpubCFIType,
  Hook as RootHook,
  HookRegistration as RootHookRegistration,
  HooksObject as RootHooksObject,
  HookTask as RootHookTask,
  LayoutContent as RootLayoutContent,
  LayoutCount as RootLayoutCount,
  LayoutProps as RootLayoutProps,
  LayoutSettings as RootLayoutSettings,
  ParsedEpubCFI as RootParsedEpubCFI,
  RangePair as RootRangePair,
  JsonValue as RootJsonValue,
  RequestHeaders as RootRequestHeaders,
  RequestMethod as RootRequestMethod,
  RequestResponse as RootRequestResponse,
  RequestType as RootRequestType,
  RectBounds as RootRectBounds,
  SizeBounds as RootSizeBounds,
  VerticalRlMetricsCache as RootVerticalRlMetricsCache,
  VerticalRlPageMetricsCache as RootVerticalRlPageMetricsCache,
  ViewportSettings as RootViewportSettings,
  WordLocation as RootWordLocation,
  LandmarkItem as RootLandmarkItem,
  NavItem as RootNavItem,
  Navigation as RootNavigation,
  NavigationDocument as RootNavigationDocument,
  NavigationInput as RootNavigationInput,
  NavigationInputItem as RootNavigationInputItem,
  PageList as RootPageList,
  PageListDocument as RootPageListDocument,
  PageListItem as RootPageListItem,
  PageLookup as RootPageLookup,
  PageReverseLookup as RootPageReverseLookup,
  PageValue as RootPageValue,
  Packaging as RootPackaging,
  PackagingJsonManifest as RootPackagingJsonManifest,
  PackagingManifest as RootPackagingManifest,
  PackagingManifestItem as RootPackagingManifestItem,
  PackagingManifestObject as RootPackagingManifestObject,
  PackagingMetadata as RootPackagingMetadata,
  PackagingMetadataObject as RootPackagingMetadataObject,
  PackagingObject as RootPackagingObject,
  PackagingSpineItem as RootPackagingSpineItem,
  PackagingTocItem as RootPackagingTocItem,
  ParsedPath as RootParsedPath,
  Path as RootPath,
  Queue as RootQueue,
  QueuedItem as RootQueuedItem,
  QueueTask as RootQueueTask,
  ReplacementMode as RootReplacementMode,
  ResourceArchive as RootResourceArchive,
  ResourceManifest as RootResourceManifest,
  ResourceManifestItem as RootResourceManifestItem,
  ResourceOptions as RootResourceOptions,
  ResourceRequest as RootResourceRequest,
  ResourceResolver as RootResourceResolver,
  Resources as RootResources,
  ResourceSettings as RootResourceSettings,
  GlobalLayout as RootGlobalLayout,
  Section as RootSection,
  SectionAnnotationMap as RootSectionAnnotationMap,
  SectionHookSet as RootSectionHookSet,
  SectionLike as RootSectionLike,
  SectionLayoutSettings as RootSectionLayoutSettings,
  SectionRequest as RootSectionRequest,
  SectionSearchResult as RootSectionSearchResult,
  Spine as RootSpine,
  SpineItem as RootSpineItem,
  SpineLookup as RootSpineLookup,
  SpineManifestItem as RootSpineManifestItem,
  SpinePackage as RootSpinePackage,
  SpinePackageItem as RootSpinePackageItem,
  SpineResolver as RootSpineResolver,
  Store as RootStore,
  StoreData as RootStoreData,
  StoreHeaders as RootStoreHeaders,
  StoreRequest as RootStoreRequest,
  StoreRequestType as RootStoreRequestType,
  StoreResolver as RootStoreResolver,
  StoreResource as RootStoreResource,
  StoreResources as RootStoreResources,
  StoreStorage as RootStoreStorage,
  StoreUrlOptions as RootStoreUrlOptions,
  InjectedThemes as RootInjectedThemes,
  Theme as RootTheme,
  ThemeInput as RootThemeInput,
  ThemeOverride as RootThemeOverride,
  ThemeRules as RootThemeRules,
  Themes as RootThemes,
  ThemesContent as RootThemesContent,
  ThemesRendition as RootThemesRendition,
  Url as RootUrl,
  UrlBase as RootUrlBase,
  RenditionLocationPart as RootRenditionLocationPart,
  RenditionLayoutProperties as RootRenditionLayoutProperties,
  RenditionOptions as RootRenditionOptions,
} from '../';
import Annotations, {
  Annotation,
  AnnotationCallback,
  AnnotationData,
  AnnotationMap,
  AnnotationOptions,
  AnnotationsRendition,
  AnnotationStyles,
  AnnotationType,
  AnnotationView,
  SectionAnnotationMap,
} from './annotations';
import Archive, { ArchiveEntry, ArchiveInput, ArchiveRequestType, ArchiveUrlOptions, ArchiveZip } from './archive';
import type { BookInput, BookLoaded, BookLoading, BookOptions } from './book';
import Container, { ContainerDocument } from './container';
import type {
  ContentsSize,
  VerticalRlMetricsCache,
  VerticalRlPageMetricsCache,
  ViewportSettings,
} from './contents';
import type {
  EpubCFIBase,
  EpubCFIComponent,
  EpubCFIInput,
  EpubCFISegment,
  EpubCFIStep,
  EpubCFITerminal,
  EpubCFIType,
  ParsedEpubCFI,
} from './epubcfi';
import type EpubRoot from './epub';
import type { LayoutContent, LayoutCount, LayoutProps, LayoutSettings as EpubLayoutSettings } from './layout';
import Navigation, { LandmarkItem, NavItem, NavigationDocument, NavigationInput, NavigationInputItem } from './navigation';
import DisplayOptions from './displayoptions';
import Path, { ParsedPath } from './utils/path';
import Url, { UrlBase } from './utils/url';
import Packaging, {
  PackagingJsonManifest,
  PackagingManifest,
  PackagingManifestItem,
  PackagingManifestObject,
  PackagingMetadata,
  PackagingMetadataObject,
  PackagingObject,
  PackagingSpineItem,
  PackagingTocItem,
} from './packaging';
import PageList, { PageListDocument, PageListItem, PageLookup, PageReverseLookup, PageValue } from './pagelist';
import Locations, { LocationInput, LocationRange, LocationsRequest, WordLocation } from './locations';
import Mapping, { EpubCFIPair, MappingContents, MappingLayout, MappingTextNodeWalker, MappingView, RangePair } from './mapping';
import type { DisplayedLocation, LayoutProperties as RenditionLayoutProperties, Location, ManagerLocationItem, RenditionLocationPart, RenditionOptions } from './rendition';
import Resources, {
  ReplacementMode,
  ResourceArchive,
  ResourceManifest,
  ResourceManifestItem,
  ResourceOptions,
  ResourceRequest,
  ResourceResolver,
  ResourceSettings,
} from './resources';
import {
  LinkCallback,
  replaceBase,
  replaceCanonical,
  replaceLinks,
  replaceMeta,
  SectionLike,
  substitute,
} from './utils/replacements';
import Queue, { QueuedItem, QueueTask, Task } from './utils/queue';
import Hook, { HookRegistration, HooksObject, HookTask } from './utils/hook';
import Section, { GlobalLayout, LayoutSettings, SectionHookSet, SectionRequest, SectionSearchResult, SpineItem } from './section';
import Spine, { SpineLookup, SpineManifestItem, SpinePackage, SpinePackageItem, SpineResolver } from './spine';
import Store, { StoreData, StoreHeaders, StoreRequest, StoreRequestType, StoreResource, StoreResources, StoreResolver, StoreStorage, StoreUrlOptions } from './store';
import Themes, { InjectedThemes, Theme, ThemeInput, ThemeOverride, ThemeRules, ThemesContent, ThemesRendition } from './themes';
import { AnimationFrameRequest, BlobContent, Deferred, RangeObject as CoreRangeObject, RectBounds, SizeBounds } from './utils/core';
import { JsonValue, RequestHeaders, RequestMethod, RequestResponse, RequestType } from './utils/request';

type Assert<T extends true> = T;
type IsExact<T, U> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2)
    ? true
    : false;

type PublicRootAssertions = [
  Assert<IsExact<typeof ePub, typeof EpubRoot>>,
  Assert<IsExact<typeof ePub.Book, typeof Book>>,
  Assert<IsExact<typeof ePub.Rendition, typeof Rendition>>,
  Assert<IsExact<typeof ePub.Contents, typeof Contents>>,
  Assert<IsExact<typeof ePub.CFI, typeof EpubCFI>>,
  Assert<IsExact<RootBookInput, BookInput>>,
  Assert<IsExact<RootBookOptions, BookOptions>>,
  Assert<IsExact<RootBookLoading, BookLoading>>,
  Assert<IsExact<RootBookLoaded, BookLoaded>>,
  Assert<IsExact<RootAnimationFrameRequest, AnimationFrameRequest>>,
  Assert<IsExact<RootBlobContent, BlobContent>>,
  Assert<IsExact<RootContainer, Container>>,
  Assert<IsExact<RootContainerDocument, ContainerDocument>>,
  Assert<IsExact<RootContentsSize, ContentsSize>>,
  Assert<IsExact<RootDeferred<Book>, Deferred<Book>>>,
  Assert<IsExact<RootDisplayOptions, DisplayOptions>>,
  Assert<IsExact<RootEpubCFIBase, EpubCFIBase>>,
  Assert<IsExact<RootEpubCFIComponent, EpubCFIComponent>>,
  Assert<IsExact<RootEpubCFIInput, EpubCFIInput>>,
  Assert<IsExact<RootEpubCFISegment, EpubCFISegment>>,
  Assert<IsExact<RootEpubCFIStep, EpubCFIStep>>,
  Assert<IsExact<RootEpubCFITerminal, EpubCFITerminal>>,
  Assert<IsExact<RootEpubCFIType, EpubCFIType>>,
  Assert<IsExact<RootHook, Hook>>,
  Assert<IsExact<RootHookRegistration, HookRegistration>>,
  Assert<IsExact<RootHooksObject, HooksObject>>,
  Assert<IsExact<RootHookTask, HookTask>>,
  Assert<IsExact<RootLayoutContent, LayoutContent>>,
  Assert<IsExact<RootLayoutCount, LayoutCount>>,
  Assert<IsExact<RootLayoutProps, LayoutProps>>,
  Assert<IsExact<RootLayoutSettings, EpubLayoutSettings>>,
  Assert<IsExact<RootParsedEpubCFI, ParsedEpubCFI>>,
  Assert<IsExact<RootDisplayedLocation, DisplayedLocation>>,
  Assert<IsExact<RootRenditionOptions, RenditionOptions>>,
  Assert<IsExact<RootRenditionLocationPart, RenditionLocationPart>>,
  Assert<IsExact<RootRenditionLayoutProperties, RenditionLayoutProperties>>,
  Assert<IsExact<RootLocation, Location>>,
  Assert<IsExact<RootManagerLocationItem, ManagerLocationItem>>,
  Assert<IsExact<RootNavigation, Navigation>>,
  Assert<IsExact<RootNavItem, NavItem>>,
  Assert<IsExact<RootLandmarkItem, LandmarkItem>>,
  Assert<IsExact<RootNavigationDocument, NavigationDocument>>,
  Assert<IsExact<RootNavigationInput, NavigationInput>>,
  Assert<IsExact<RootNavigationInputItem, NavigationInputItem>>,
  Assert<IsExact<RootPageList, PageList>>,
  Assert<IsExact<RootPageListDocument, PageListDocument>>,
  Assert<IsExact<RootPageListItem, PageListItem>>,
  Assert<IsExact<RootPageLookup, PageLookup>>,
  Assert<IsExact<RootPageReverseLookup, PageReverseLookup>>,
  Assert<IsExact<RootPageValue, PageValue>>,
  Assert<IsExact<RootResources, Resources>>,
  Assert<IsExact<RootReplacementMode, ReplacementMode>>,
  Assert<IsExact<RootResourceArchive, ResourceArchive>>,
  Assert<IsExact<RootResourceManifest, ResourceManifest>>,
  Assert<IsExact<RootResourceManifestItem, ResourceManifestItem>>,
  Assert<IsExact<RootResourceOptions, ResourceOptions>>,
  Assert<IsExact<RootResourceRequest, ResourceRequest>>,
  Assert<IsExact<RootResourceResolver, ResourceResolver>>,
  Assert<IsExact<RootResourceSettings, ResourceSettings>>,
  Assert<IsExact<RootStore, Store>>,
  Assert<IsExact<RootStoreData, StoreData>>,
  Assert<IsExact<RootStoreHeaders, StoreHeaders>>,
  Assert<IsExact<RootStoreRequest, StoreRequest>>,
  Assert<IsExact<RootStoreRequestType, StoreRequestType>>,
  Assert<IsExact<RootStoreResolver, StoreResolver>>,
  Assert<IsExact<RootStoreResource, StoreResource>>,
  Assert<IsExact<RootStoreResources, StoreResources>>,
  Assert<IsExact<RootStoreStorage, StoreStorage>>,
  Assert<IsExact<RootStoreUrlOptions, StoreUrlOptions>>,
  Assert<IsExact<RootArchive, Archive>>,
  Assert<IsExact<RootArchiveEntry, ArchiveEntry>>,
  Assert<IsExact<RootArchiveInput, ArchiveInput>>,
  Assert<IsExact<RootArchiveRequestType, ArchiveRequestType>>,
  Assert<IsExact<RootArchiveUrlOptions, ArchiveUrlOptions>>,
  Assert<IsExact<RootArchiveZip, ArchiveZip>>,
  Assert<IsExact<RootPackaging, Packaging>>,
  Assert<IsExact<RootPackagingJsonManifest, PackagingJsonManifest>>,
  Assert<IsExact<RootPackagingManifest, PackagingManifest>>,
  Assert<IsExact<RootPackagingManifestItem, PackagingManifestItem>>,
  Assert<IsExact<RootPackagingManifestObject, PackagingManifestObject>>,
  Assert<IsExact<RootPackagingMetadata, PackagingMetadata>>,
  Assert<IsExact<RootPackagingMetadataObject, PackagingMetadataObject>>,
  Assert<IsExact<RootPackagingObject, PackagingObject>>,
  Assert<IsExact<RootPackagingSpineItem, PackagingSpineItem>>,
  Assert<IsExact<RootPackagingTocItem, PackagingTocItem>>,
  Assert<IsExact<RootPath, Path>>,
  Assert<IsExact<RootParsedPath, ParsedPath>>,
  Assert<IsExact<RootQueue, Queue>>,
  Assert<IsExact<RootQueuedItem, QueuedItem>>,
  Assert<IsExact<RootQueueTask, QueueTask>>,
  Assert<IsExact<RootUrl, Url>>,
  Assert<IsExact<RootUrlBase, UrlBase>>,
  Assert<IsExact<RootJsonValue, JsonValue>>,
  Assert<IsExact<RootRequestHeaders, RequestHeaders>>,
  Assert<IsExact<RootRequestMethod, RequestMethod>>,
  Assert<IsExact<RootRequestResponse, RequestResponse>>,
  Assert<IsExact<RootRequestType, RequestType>>,
  Assert<IsExact<RootRectBounds, RectBounds>>,
  Assert<IsExact<RootSizeBounds, SizeBounds>>,
  Assert<IsExact<RootVerticalRlMetricsCache, VerticalRlMetricsCache>>,
  Assert<IsExact<RootVerticalRlPageMetricsCache, VerticalRlPageMetricsCache>>,
  Assert<IsExact<RootViewportSettings, ViewportSettings>>,
  Assert<IsExact<RootLinkCallback, LinkCallback>>,
  Assert<IsExact<RootSectionLike, SectionLike>>,
  Assert<IsExact<RootSection, Section>>,
  Assert<IsExact<RootGlobalLayout, GlobalLayout>>,
  Assert<IsExact<RootSectionLayoutSettings, LayoutSettings>>,
  Assert<IsExact<RootSectionHookSet, SectionHookSet>>,
  Assert<IsExact<RootSectionRequest, SectionRequest>>,
  Assert<IsExact<RootSectionSearchResult, SectionSearchResult>>,
  Assert<IsExact<RootSpineItem, SpineItem>>,
  Assert<IsExact<RootSpine, Spine>>,
  Assert<IsExact<RootSpineLookup, SpineLookup>>,
  Assert<IsExact<RootSpineManifestItem, SpineManifestItem>>,
  Assert<IsExact<RootSpinePackage, SpinePackage>>,
  Assert<IsExact<RootSpinePackageItem, SpinePackageItem>>,
  Assert<IsExact<RootSpineResolver, SpineResolver>>,
  Assert<IsExact<RootMapping, Mapping>>,
  Assert<IsExact<RootEpubCFIPair, EpubCFIPair>>,
  Assert<IsExact<RootMappingAxis, string>>,
  Assert<IsExact<RootMappingContents, MappingContents>>,
  Assert<IsExact<RootMappingDirection, string>>,
  Assert<IsExact<RootMappingLayout, MappingLayout>>,
  Assert<IsExact<RootMappingTextNodeWalker, MappingTextNodeWalker>>,
  Assert<IsExact<RootMappingView, MappingView>>,
  Assert<IsExact<RootRangePair, RangePair>>,
  Assert<IsExact<RootLocations, Locations>>,
  Assert<IsExact<RootLocationInput, LocationInput>>,
  Assert<IsExact<RootLocationRange, LocationRange>>,
  Assert<IsExact<RootLocationsRequest, LocationsRequest>>,
  Assert<IsExact<RootWordLocation, WordLocation>>,
  Assert<IsExact<RootThemes, Themes>>,
  Assert<IsExact<RootInjectedThemes, InjectedThemes>>,
  Assert<IsExact<RootTheme, Theme>>,
  Assert<IsExact<RootThemeInput, ThemeInput>>,
  Assert<IsExact<RootThemeOverride, ThemeOverride>>,
  Assert<IsExact<RootThemeRules, ThemeRules>>,
  Assert<IsExact<RootThemesContent, ThemesContent>>,
  Assert<IsExact<RootThemesRendition, ThemesRendition>>,
  Assert<IsExact<RootAnnotations, Annotations>>,
  Assert<IsExact<RootAnnotation, Annotation>>,
  Assert<IsExact<RootAnnotationCallback, AnnotationCallback>>,
  Assert<IsExact<RootAnnotationData, AnnotationData>>,
  Assert<IsExact<RootAnnotationMap, AnnotationMap>>,
  Assert<IsExact<RootAnnotationOptions, AnnotationOptions>>,
  Assert<IsExact<RootAnnotationsRendition, AnnotationsRendition>>,
  Assert<IsExact<RootAnnotationStyles, AnnotationStyles>>,
  Assert<IsExact<RootAnnotationType, string>>,
  Assert<IsExact<RootAnnotationView, AnnotationView>>,
  Assert<IsExact<RootSectionAnnotationMap, SectionAnnotationMap>>,
  Assert<IsExact<typeof rootReplaceBase, typeof replaceBase>>,
  Assert<IsExact<typeof rootReplaceCanonical, typeof replaceCanonical>>,
  Assert<IsExact<typeof rootReplaceMeta, typeof replaceMeta>>,
  Assert<IsExact<typeof rootReplaceLinks, typeof replaceLinks>>,
  Assert<IsExact<typeof rootSubstitute, typeof substitute>>,
  Assert<IsExact<typeof request, RequestMethod>>,
  Assert<IsExact<ReturnType<typeof ePub.utils.uuid>, string>>,
  Assert<IsExact<InstanceType<typeof ePub.utils.defer<string>>["promise"], Promise<string>>>
];

type CoreUtilsAssertions = [
  Assert<IsExact<typeof ePub.utils.requestAnimationFrame, AnimationFrameRequest | false>>,
  Assert<IsExact<ReturnType<typeof ePub.utils.bounds>, SizeBounds>>,
  Assert<IsExact<ReturnType<typeof ePub.utils.borders>, SizeBounds>>,
  Assert<IsExact<ReturnType<typeof ePub.utils.windowBounds>, RectBounds>>,
  Assert<IsExact<Parameters<typeof ePub.utils.createBlob>[0], BlobContent>>,
  Assert<IsExact<Parameters<typeof ePub.utils.createBlobUrl>[0], BlobContent>>,
  Assert<IsExact<Parameters<typeof ePub.utils.createBase64Url>, [content: string, mime: string]>>,
  Assert<IsExact<InstanceType<typeof ePub.utils.RangeObject>, CoreRangeObject>>,
  Assert<IsExact<ReturnType<typeof ePub.utils.qsa>, NodeListOf<Element> | HTMLCollectionOf<Element>>>
];

type CoreClassAssertions = [
  Assert<IsExact<Book["settings"], BookOptions>>,
  Assert<IsExact<Book["opening"], Deferred<Book> | undefined>>,
  Assert<IsExact<Book["opened"], Promise<Book> | undefined>>,
  Assert<IsExact<Book["loading"], BookLoading | undefined>>,
  Assert<IsExact<Book["loaded"], BookLoaded | undefined>>,
  Assert<IsExact<BookLoading["metadata"], Deferred<PackagingMetadata>>>,
  Assert<IsExact<BookLoaded["metadata"], Promise<PackagingMetadata>>>,
  Assert<IsExact<BookLoading["manifest"], Deferred<PackagingManifest>>>,
  Assert<IsExact<BookLoaded["manifest"], Promise<PackagingManifest>>>,
  Assert<IsExact<Book["ready"], Promise<any[]> | undefined>>,
  Assert<IsExact<Book["isRendered"], boolean>>,
  Assert<IsExact<Book["request"], RequestMethod>>,
  Assert<IsExact<Book["spine"], Spine | undefined>>,
  Assert<IsExact<Book["locations"], Locations | undefined>>,
  Assert<IsExact<Book["package"], Packaging | undefined>>,
  Assert<IsExact<Book["displayOptions"], DisplayOptions | undefined>>,
  Assert<IsExact<Book["cover"], string | undefined>>,
  Assert<IsExact<ReturnType<Book["coverUrl"]>, Promise<string | null>>>,
  Assert<IsExact<ReturnType<Book["determineType"]>, string | undefined>>,
  Assert<IsExact<ReturnType<Book["load"]>, Promise<RequestResponse>>>,
  Assert<IsExact<ReturnType<Book["open"]>, Promise<Book>>>,
  Assert<IsExact<ReturnType<Book["openEpub"]>, Promise<Book>>>,
  Assert<IsExact<ReturnType<Book["renderTo"]>, Rendition>>,
  Assert<IsExact<ReturnType<Book["resolve"]>, string | undefined>>,
  Assert<IsExact<ReturnType<Book["section"]>, Section | undefined>>,
  Assert<IsExact<ReturnType<Book["unarchive"]>, Promise<ArchiveZip>>>,
  Assert<IsExact<ReturnType<Book["setRequestHeaders"]>, void>>,
  Assert<IsExact<Rendition["settings"], RenditionOptions>>,
  Assert<IsExact<Rendition["book"], Book>>,
  Assert<IsExact<Rendition["manager"], any>>,
  Assert<IsExact<Rendition["ViewManager"], any>>,
  Assert<IsExact<Rendition["View"], any>>,
  Assert<IsExact<Rendition["_layout"], Layout | undefined>>,
  Assert<IsExact<Rendition["starting"], Deferred<void> | undefined>>,
  Assert<IsExact<Rendition["started"], Promise<void> | undefined>>,
  Assert<IsExact<Rendition["displaying"], Deferred<any> | undefined>>,
  Assert<IsExact<DisplayedLocation, RenditionLocationPart>>,
  Assert<IsExact<Location["start"], RenditionLocationPart | undefined>>,
  Assert<IsExact<Location["end"], RenditionLocationPart | undefined>>,
  Assert<IsExact<ReturnType<Rendition["attachTo"]>, Promise<void>>>,
  Assert<IsExact<ReturnType<Rendition["currentLocation"]>, Location | Promise<Location> | undefined>>,
  Assert<IsExact<ReturnType<Rendition["display"]>, Promise<void>>>,
  Assert<IsExact<ReturnType<Rendition["determineLayoutProperties"]>, RenditionLayoutProperties>>,
  Assert<IsExact<ReturnType<Rendition["debugVerticalRlPage"]>, Record<string, any>>>,
  Assert<IsExact<ReturnType<Rendition["getContents"]>, Contents[]>>,
  Assert<IsExact<ReturnType<Rendition["getRange"]>, Range | undefined>>,
  Assert<IsExact<ReturnType<Rendition["located"]>, Location>>,
  Assert<IsExact<ReturnType<Rendition["remeasure"]>, Promise<any>>>,
  Assert<IsExact<ReturnType<Rendition["resolveLinkHref"]>, string>>,
  Assert<IsExact<ReturnType<Rendition["resize"]>, void>>,
  Assert<IsExact<Contents["document"], Document>>,
  Assert<IsExact<Contents["documentElement"], HTMLElement>>,
  Assert<IsExact<Contents["content"], HTMLElement>>,
  Assert<IsExact<Contents["window"], Window & typeof globalThis>>,
  Assert<IsExact<Contents["_size"], ContentsSize>>,
  Assert<IsExact<Contents["sectionHref"], string>>,
  Assert<IsExact<Contents["_verticalRlMetricsCache"], VerticalRlMetricsCache | null>>,
  Assert<IsExact<Contents["_verticalRlPageMetricsCache"], VerticalRlPageMetricsCache | null>>,
  Assert<IsExact<Contents["_forcedWritingMode"], string>>,
  Assert<IsExact<Contents["called"], number>>,
  Assert<IsExact<Contents["active"], boolean>>,
  Assert<IsExact<ReturnType<Contents["addScript"]>, Promise<boolean>>>,
  Assert<IsExact<ReturnType<Contents["addStylesheet"]>, Promise<boolean>>>,
  Assert<IsExact<ReturnType<Contents["addStylesheetCss"]>, boolean>>,
  Assert<IsExact<ReturnType<Contents["contentWidth"]>, number>>,
  Assert<IsExact<ReturnType<Contents["css"]>, string>>,
  Assert<IsExact<ReturnType<Contents["locationOf"]>, { top: number, left: number }>>,
  Assert<IsExact<ReturnType<Contents["measureVerticalRlRect"]>, {
    left: number,
    right: number,
    top: number,
    bottom: number,
    rawWidth: number,
    rawHeight: number
  }>>,
  Assert<IsExact<ReturnType<Contents["viewport"]>, ViewportSettings>>,
  Assert<IsExact<ReturnType<Contents["writingMode"]>, string>>
];

type EpubCFIAssertions = [
  Assert<IsExact<ConstructorParameters<typeof EpubCFI>, [cfiFrom?: EpubCFIInput | undefined, base?: EpubCFIBase | undefined, ignoreClass?: string | undefined]>>,
  Assert<IsExact<EpubCFI["str"], string>>,
  Assert<IsExact<EpubCFI["base"], EpubCFIComponent | Record<string, any>>>,
  Assert<IsExact<EpubCFI["spinePos"], number>>,
  Assert<IsExact<EpubCFI["range"], boolean>>,
  Assert<IsExact<EpubCFI["path"], EpubCFIComponent | Record<string, any>>>,
  Assert<IsExact<EpubCFI["start"], EpubCFIComponent | null>>,
  Assert<IsExact<EpubCFI["end"], EpubCFIComponent | null>>,
  Assert<IsExact<ReturnType<EpubCFI["isCfiString"]>, boolean>>,
  Assert<IsExact<ReturnType<EpubCFI["checkType"]>, EpubCFIType>>,
  Assert<IsExact<ReturnType<EpubCFI["parse"]>, ParsedEpubCFI | { spinePos: number }>>,
  Assert<IsExact<ReturnType<EpubCFI["parseComponent"]>, EpubCFIComponent>>,
  Assert<IsExact<ReturnType<EpubCFI["parseStep"]>, EpubCFIStep | undefined>>,
  Assert<IsExact<ReturnType<EpubCFI["parseTerminal"]>, EpubCFITerminal>>,
  Assert<IsExact<ReturnType<EpubCFI["getPathComponent"]>, string | undefined>>,
  Assert<IsExact<ReturnType<EpubCFI["getRange"]>, [string, string] | false>>,
  Assert<IsExact<ReturnType<EpubCFI["fromNode"]>, ParsedEpubCFI>>,
  Assert<IsExact<ReturnType<EpubCFI["fromRange"]>, ParsedEpubCFI>>,
  Assert<IsExact<ReturnType<EpubCFI["collapse"]>, void>>,
  Assert<IsExact<ReturnType<EpubCFI["compare"]>, number>>,
  Assert<IsExact<ReturnType<EpubCFI["toRange"]>, Range | import('./compat/range').RangeObject | null>>,
  Assert<IsExact<ReturnType<EpubCFI["toString"]>, string>>
];

type LayoutAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Layout>, [settings?: EpubLayoutSettings | undefined]>>,
  Assert<IsExact<Layout["settings"], EpubLayoutSettings>>,
  Assert<IsExact<Layout["name"], string>>,
  Assert<IsExact<Layout["_spread"], boolean>>,
  Assert<IsExact<Layout["_minSpreadWidth"], number>>,
  Assert<IsExact<Layout["_evenSpreads"], boolean>>,
  Assert<IsExact<Layout["_flow"], string>>,
  Assert<IsExact<Layout["width"], number>>,
  Assert<IsExact<Layout["height"], number>>,
  Assert<IsExact<Layout["spreadWidth"], number>>,
  Assert<IsExact<Layout["pageWidth"], number>>,
  Assert<IsExact<Layout["delta"], number>>,
  Assert<IsExact<Layout["effectivePageAdvance"], number>>,
  Assert<IsExact<Layout["viewportPageWidth"], number>>,
  Assert<IsExact<Layout["pageBoundaryShift"], number>>,
  Assert<IsExact<Layout["edgeGuardPx"], number>>,
  Assert<IsExact<Layout["columnWidth"], number>>,
  Assert<IsExact<Layout["gap"], number>>,
  Assert<IsExact<Layout["divisor"], number>>,
  Assert<IsExact<Layout["props"], LayoutProps>>,
  Assert<IsExact<ReturnType<Layout["flow"]>, string>>,
  Assert<IsExact<ReturnType<Layout["spread"]>, boolean>>,
  Assert<IsExact<ReturnType<Layout["calculate"]>, void>>,
  Assert<IsExact<ReturnType<Layout["format"]>, unknown>>,
  Assert<IsExact<ReturnType<Layout["count"]>, LayoutCount>>,
  Assert<IsExact<ReturnType<Layout["update"]>, void>>
];

type NavigationAssertions = [
  Assert<IsExact<Navigation["toc"], NavItem[]>>,
  Assert<IsExact<Navigation["tocByHref"], Record<string, number>>>,
  Assert<IsExact<Navigation["tocById"], Record<string, number>>>,
  Assert<IsExact<Navigation["landmarks"], LandmarkItem[]>>,
  Assert<IsExact<Navigation["landmarksByType"], Record<string, number>>>,
  Assert<IsExact<Navigation["length"], number>>,
  Assert<IsExact<ConstructorParameters<typeof Navigation>, [xml?: NavigationInput | undefined]>>,
  Assert<IsExact<Parameters<Navigation["parse"]>[0], NavigationInput>>,
  Assert<IsExact<Parameters<Navigation["load"]>[0], NavigationInputItem[]>>,
  Assert<IsExact<ReturnType<Navigation["load"]>, NavItem[]>>,
  Assert<IsExact<ReturnType<Navigation["forEach"]>, void>>
];

type SectionAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Section>, [item: SpineItem, hooks?: SectionHookSet | undefined]>>,
  Assert<IsExact<Section["idref"], string | undefined>>,
  Assert<IsExact<Section["linear"], boolean | undefined>>,
  Assert<IsExact<Section["properties"], string[] | undefined>>,
  Assert<IsExact<Section["document"], Document | undefined>>,
  Assert<IsExact<Section["contents"], Element | undefined>>,
  Assert<IsExact<Section["output"], string | undefined>>,
  Assert<IsExact<Section["hooks"], SectionHookSet | undefined>>,
  Assert<IsExact<ReturnType<Section["load"]>, Promise<Element>>>,
  Assert<IsExact<ReturnType<Section["render"]>, Promise<string>>>,
  Assert<IsExact<ReturnType<Section["find"]>, SectionSearchResult[]>>,
  Assert<IsExact<ReturnType<Section["search"]>, SectionSearchResult[]>>,
  Assert<IsExact<ReturnType<Section["reconcileLayoutSettings"]>, LayoutSettings>>,
  Assert<IsExact<ReturnType<Section["unload"]>, void>>,
  Assert<IsExact<ReturnType<Section["destroy"]>, void>>
];

type SpineAssertions = [
  Assert<IsExact<Spine["spineItems"], Section[] | undefined>>,
  Assert<IsExact<Spine["spineByHref"], SpineLookup | undefined>>,
  Assert<IsExact<Spine["spineById"], SpineLookup | undefined>>,
  Assert<IsExact<Spine["hooks"], SectionHookSet | undefined>>,
  Assert<IsExact<Spine["loaded"], boolean>>,
  Assert<IsExact<Spine["items"], SpinePackageItem[] | undefined>>,
  Assert<IsExact<Spine["manifest"], Record<string, SpineManifestItem> | undefined>>,
  Assert<IsExact<Spine["spineNodeIndex"], number | undefined>>,
  Assert<IsExact<Spine["baseUrl"], string | undefined>>,
  Assert<IsExact<Spine["length"], number | undefined>>,
  Assert<IsExact<Parameters<Spine["unpack"]>, [_package: SpinePackage, resolver: SpineResolver, canonical: SpineResolver]>>,
  Assert<IsExact<ReturnType<Spine["resolveFallbackItem"]>, SpineManifestItem>>,
  Assert<IsExact<ReturnType<Spine["isRenderableType"]>, boolean>>,
  Assert<IsExact<ReturnType<Spine["get"]>, Section | null>>,
  Assert<IsExact<ReturnType<Spine["append"]>, number>>,
  Assert<IsExact<ReturnType<Spine["prepend"]>, number>>,
  Assert<IsExact<ReturnType<Spine["remove"]>, Section[] | undefined>>,
  Assert<IsExact<ReturnType<Spine["each"]>, void>>,
  Assert<IsExact<ReturnType<Spine["first"]>, Section | undefined>>,
  Assert<IsExact<ReturnType<Spine["last"]>, Section | undefined>>,
  Assert<IsExact<ReturnType<Spine["destroy"]>, void>>
];

type ArchiveAssertions = [
  Assert<IsExact<Archive["zip"], ArchiveZip | undefined>>,
  Assert<IsExact<Archive["urlCache"], Record<string, string>>>,
  Assert<IsExact<Parameters<Archive["open"]>, [input: ArchiveInput, isBase64?: boolean | undefined]>>,
  Assert<IsExact<ReturnType<Archive["open"]>, Promise<ArchiveZip>>>,
  Assert<IsExact<Parameters<Archive["openUrl"]>, [zipUrl: string, isBase64?: boolean | undefined]>>,
  Assert<IsExact<ReturnType<Archive["request"]>, Promise<RequestResponse>>>,
  Assert<IsExact<ReturnType<Archive["handleResponse"]>, RequestResponse>>,
  Assert<IsExact<ReturnType<Archive["getBlob"]>, Promise<Blob> | undefined>>,
  Assert<IsExact<ReturnType<Archive["getText"]>, Promise<string> | undefined>>,
  Assert<IsExact<ReturnType<Archive["getBase64"]>, Promise<string> | undefined>>,
  Assert<IsExact<ReturnType<Archive["createUrl"]>, Promise<string>>>,
  Assert<IsExact<ReturnType<Archive["revokeUrl"]>, void>>,
  Assert<IsExact<ReturnType<Archive["destroy"]>, void>>
];

type PackagingAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Packaging>, [packageDocument?: Document | XMLDocument | undefined]>>,
  Assert<IsExact<Packaging["manifest"], PackagingManifest | undefined>>,
  Assert<IsExact<Packaging["navPath"], string | false | undefined>>,
  Assert<IsExact<Packaging["ncxPath"], string | false | undefined>>,
  Assert<IsExact<Packaging["coverPath"], string | false | undefined>>,
  Assert<IsExact<Packaging["spineNodeIndex"], number | undefined>>,
  Assert<IsExact<Packaging["spine"], PackagingSpineItem[] | undefined>>,
  Assert<IsExact<Packaging["metadata"], PackagingMetadata | undefined>>,
  Assert<IsExact<Packaging["uniqueIdentifier"], string | undefined>>,
  Assert<IsExact<Packaging["toc"], PackagingTocItem[] | undefined>>,
  Assert<IsExact<ReturnType<Packaging["parse"]>, PackagingObject>>,
  Assert<IsExact<Parameters<Packaging["load"]>[0], PackagingJsonManifest>>,
  Assert<IsExact<ReturnType<Packaging["load"]>, PackagingObject>>,
  Assert<IsExact<ReturnType<Packaging["parseMetadata"]>, PackagingMetadata>>,
  Assert<IsExact<ReturnType<Packaging["parseManifest"]>, PackagingManifest>>,
  Assert<IsExact<ReturnType<Packaging["parseSpine"]>, PackagingSpineItem[]>>,
  Assert<IsExact<ReturnType<Packaging["findUniqueIdentifier"]>, string>>,
  Assert<IsExact<ReturnType<Packaging["findNavPath"]>, string | false>>,
  Assert<IsExact<ReturnType<Packaging["findNcxPath"]>, string | false>>,
  Assert<IsExact<ReturnType<Packaging["findCoverPath"]>, string | false>>,
  Assert<IsExact<ReturnType<Packaging["getElementText"]>, string>>,
  Assert<IsExact<ReturnType<Packaging["getPropertyText"]>, string>>,
  Assert<IsExact<ReturnType<Packaging["destroy"]>, void>>
];

type DisplayOptionsAssertions = [
  Assert<IsExact<ConstructorParameters<typeof DisplayOptions>, [displayOptionsDocument?: Document | undefined]>>,
  Assert<IsExact<DisplayOptions["interactive"], string | undefined>>,
  Assert<IsExact<DisplayOptions["fixedLayout"], string | undefined>>,
  Assert<IsExact<DisplayOptions["openToSpread"], string | undefined>>,
  Assert<IsExact<DisplayOptions["orientationLock"], string | undefined>>,
  Assert<IsExact<ReturnType<DisplayOptions["parse"]>, DisplayOptions>>,
  Assert<IsExact<ReturnType<DisplayOptions["destroy"]>, void>>
];

type ContainerAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Container>, [containerDocument?: ContainerDocument | undefined]>>,
  Assert<IsExact<Container["packagePath"], string | null | undefined>>,
  Assert<IsExact<Container["directory"], string | undefined>>,
  Assert<IsExact<Container["encoding"], string | null | undefined>>,
  Assert<IsExact<ReturnType<Container["parse"]>, void>>,
  Assert<IsExact<ReturnType<Container["destroy"]>, void>>
];

type PathAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Path>, [pathString: string]>>,
  Assert<IsExact<Path["path"], string>>,
  Assert<IsExact<Path["directory"], string>>,
  Assert<IsExact<Path["filename"], string>>,
  Assert<IsExact<Path["extension"], string>>,
  Assert<IsExact<Path["splitPathRe"], RegExp>>,
  Assert<IsExact<ReturnType<Path["parse"]>, ParsedPath>>,
  Assert<IsExact<Parameters<Path["isAbsolute"]>, [what?: string | undefined]>>,
  Assert<IsExact<ReturnType<Path["isDirectory"]>, boolean>>,
  Assert<IsExact<ReturnType<Path["resolve"]>, string>>,
  Assert<IsExact<ReturnType<Path["relative"]>, string>>,
  Assert<IsExact<ReturnType<Path["splitPath"]>, string[]>>,
  Assert<IsExact<ReturnType<Path["toString"]>, string>>
];

type UrlAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Url>, [urlString: string, baseString?: UrlBase]>>,
  Assert<IsExact<Url["Path"], Path>>,
  Assert<IsExact<Url["Url"], URL | undefined>>,
  Assert<IsExact<Url["base"], UrlBase>>,
  Assert<IsExact<Url["directory"], string>>,
  Assert<IsExact<Url["extension"], string>>,
  Assert<IsExact<Url["filename"], string>>,
  Assert<IsExact<Url["hash"], string>>,
  Assert<IsExact<Url["href"], string>>,
  Assert<IsExact<Url["origin"], string>>,
  Assert<IsExact<Url["protocol"], string>>,
  Assert<IsExact<Url["search"], string>>,
  Assert<IsExact<ReturnType<Url["path"]>, Path>>,
  Assert<IsExact<ReturnType<Url["resolve"]>, string>>,
  Assert<IsExact<ReturnType<Url["relative"]>, string>>,
  Assert<IsExact<ReturnType<Url["toString"]>, string>>
];

type ReplacementsAssertions = [
  Assert<IsExact<Parameters<typeof replaceBase>, [doc?: Document | undefined, section?: SectionLike | undefined]>>,
  Assert<IsExact<ReturnType<typeof replaceBase>, void>>,
  Assert<IsExact<Parameters<typeof replaceCanonical>, [doc?: Document | undefined, section?: SectionLike | undefined]>>,
  Assert<IsExact<ReturnType<typeof replaceCanonical>, void>>,
  Assert<IsExact<Parameters<typeof replaceMeta>, [doc?: Document | undefined, section?: SectionLike | undefined]>>,
  Assert<IsExact<ReturnType<typeof replaceMeta>, void>>,
  Assert<IsExact<Parameters<typeof replaceLinks>, [contents: Element, fn: LinkCallback, sectionHref?: string | undefined]>>,
  Assert<IsExact<ReturnType<typeof replaceLinks>, void>>,
  Assert<IsExact<Parameters<typeof substitute>, [content: string, urls: string[], replacements: string[]]>>,
  Assert<IsExact<ReturnType<typeof substitute>, string>>
];

type QueueAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Queue>, [context?: any]>>,
  Assert<IsExact<Queue["_q"], QueuedItem[]>>,
  Assert<IsExact<Queue["context"], any>>,
  Assert<IsExact<Queue["paused"], boolean>>,
  Assert<IsExact<Queue["running"], boolean | Promise<any> | undefined>>,
  Assert<IsExact<Queue["tick"], any>>,
  Assert<IsExact<Parameters<Queue["enqueue"]>, any[]>>,
  Assert<IsExact<ReturnType<Queue["enqueue"]>, Promise<any>>>,
  Assert<IsExact<ReturnType<Queue["dequeue"]>, Promise<any>>>,
  Assert<IsExact<ReturnType<Queue["dump"]>, void>>,
  Assert<IsExact<ReturnType<Queue["run"]>, Promise<any>>>,
  Assert<IsExact<ReturnType<Queue["flush"]>, Promise<any> | boolean | undefined>>,
  Assert<IsExact<ReturnType<Queue["clear"]>, void>>,
  Assert<IsExact<ReturnType<Queue["length"]>, number>>,
  Assert<IsExact<ReturnType<Queue["pause"]>, void>>,
  Assert<IsExact<ReturnType<Queue["stop"]>, void>>,
  Assert<IsExact<QueueTask, (...args: any[]) => any>>,
  Assert<IsExact<ConstructorParameters<typeof Task>, [task: Function, args?: any[] | undefined, context?: any]>>
];

type HookAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Hook>, [context?: any]>>,
  Assert<IsExact<Hook["context"], any>>,
  Assert<IsExact<Hook["hooks"], HookTask[]>>,
  Assert<IsExact<Parameters<Hook["register"]>, HookRegistration[]>>,
  Assert<IsExact<ReturnType<Hook["register"]>, void>>,
  Assert<IsExact<Parameters<Hook["deregister"]>, [func: HookTask]>>,
  Assert<IsExact<ReturnType<Hook["trigger"]>, Promise<any[]>>>,
  Assert<IsExact<ReturnType<Hook["list"]>, HookTask[]>>,
  Assert<IsExact<ReturnType<Hook["clear"]>, HookTask[]>>,
  Assert<IsExact<HooksObject, Record<string, Hook>>>
];

type PageListAssertions = [
  Assert<IsExact<ConstructorParameters<typeof PageList>, [xml?: PageListDocument | undefined]>>,
  Assert<IsExact<PageList["pages"], PageValue[] | undefined>>,
  Assert<IsExact<PageList["locations"], string[] | undefined>>,
  Assert<IsExact<PageList["hrefs"], string[] | undefined>>,
  Assert<IsExact<PageList["hrefByPage"], PageLookup | undefined>>,
  Assert<IsExact<PageList["pageByHref"], PageReverseLookup | undefined>>,
  Assert<IsExact<PageList["firstPage"], number>>,
  Assert<IsExact<PageList["lastPage"], number>>,
  Assert<IsExact<PageList["totalPages"], number>>,
  Assert<IsExact<PageList["pageList"], PageListItem[] | undefined>>,
  Assert<IsExact<ReturnType<PageList["parse"]>, PageListItem[] | undefined>>,
  Assert<IsExact<ReturnType<PageList["parseNav"]>, PageListItem[]>>,
  Assert<IsExact<ReturnType<PageList["parseNcx"]>, PageListItem[]>>,
  Assert<IsExact<ReturnType<PageList["item"]>, PageListItem>>,
  Assert<IsExact<ReturnType<PageList["ncxItem"]>, PageListItem>>,
  Assert<IsExact<ReturnType<PageList["process"]>, void>>,
  Assert<IsExact<ReturnType<PageList["pageFromCfi"]>, PageValue | -1>>,
  Assert<IsExact<ReturnType<PageList["cfiFromPage"]>, string | -1>>,
  Assert<IsExact<ReturnType<PageList["hrefFromPage"]>, string | undefined>>,
  Assert<IsExact<ReturnType<PageList["pageFromHref"]>, PageValue | undefined>>,
  Assert<IsExact<ReturnType<PageList["pageFromPercentage"]>, number>>,
  Assert<IsExact<ReturnType<PageList["percentageFromPage"]>, number>>,
  Assert<IsExact<ReturnType<PageList["percentageFromCfi"]>, number>>,
  Assert<IsExact<ReturnType<PageList["destroy"]>, void>>
];

type LocationsAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Locations>, [spine?: Spine | undefined, request?: ((...args: any[]) => Promise<any>) | undefined, pause?: number | undefined]>>,
  Assert<IsExact<Locations["spine"], Spine | undefined>>,
  Assert<IsExact<Locations["request"], ((...args: any[]) => Promise<any>) | undefined>>,
  Assert<IsExact<Locations["pause"], number | undefined>>,
  Assert<IsExact<Locations["_locations"], string[] | undefined>>,
  Assert<IsExact<Locations["_locationsWords"], WordLocation[] | undefined>>,
  Assert<IsExact<Locations["total"], number | undefined>>,
  Assert<IsExact<Locations["break"], number | undefined>>,
  Assert<IsExact<Locations["_current"], number | undefined>>,
  Assert<IsExact<Locations["_wordCounter"], number | undefined>>,
  Assert<IsExact<Locations["_currentCfi"], string | undefined>>,
  Assert<IsExact<Locations["processingTimeout"], ReturnType<typeof setTimeout> | undefined>>,
  Assert<IsExact<ReturnType<Locations["generate"]>, Promise<string[]>>>,
  Assert<IsExact<ReturnType<Locations["createRange"]>, LocationRange>>,
  Assert<IsExact<ReturnType<Locations["process"]>, Promise<string[]>>>,
  Assert<IsExact<ReturnType<Locations["generateForSection"]>, Promise<string[]>>>,
  Assert<IsExact<ReturnType<Locations["generateFromWords"]>, Promise<WordLocation[]>>>,
  Assert<IsExact<ReturnType<Locations["processWords"]>, Promise<WordLocation[] | void>>>,
  Assert<IsExact<ReturnType<Locations["countWords"]>, number>>,
  Assert<IsExact<ReturnType<Locations["parse"]>, string[]>>,
  Assert<IsExact<ReturnType<Locations["fallbackCfi"]>, string>>,
  Assert<IsExact<ReturnType<Locations["parseWords"]>, WordLocation[]>>,
  Assert<IsExact<ReturnType<Locations["locationFromCfi"]>, number>>,
  Assert<IsExact<ReturnType<Locations["percentageFromCfi"]>, number | null>>,
  Assert<IsExact<ReturnType<Locations["percentageFromLocation"]>, number>>,
  Assert<IsExact<ReturnType<Locations["cfiFromLocation"]>, string | number>>,
  Assert<IsExact<ReturnType<Locations["cfiFromPercentage"]>, string | number>>,
  Assert<IsExact<ReturnType<Locations["load"]>, string[]>>,
  Assert<IsExact<ReturnType<Locations["save"]>, string>>,
  Assert<IsExact<ReturnType<Locations["getCurrent"]>, number | undefined>>,
  Assert<IsExact<Locations["currentLocation"], number | undefined>>,
  Assert<IsExact<ReturnType<Locations["setCurrent"]>, void>>,
  Assert<IsExact<ReturnType<Locations["length"]>, number>>,
  Assert<IsExact<ReturnType<Locations["destroy"]>, void>>
];

type MappingAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Mapping>, [layout: MappingLayout, direction?: string | undefined, axis?: string | undefined, dev?: boolean | undefined]>>,
  Assert<IsExact<Mapping["layout"], MappingLayout>>,
  Assert<IsExact<Mapping["horizontal"], boolean>>,
  Assert<IsExact<Mapping["direction"], string>>,
  Assert<IsExact<Mapping["_dev"], boolean>>,
  Assert<IsExact<ReturnType<Mapping["section"]>, EpubCFIPair[]>>,
  Assert<IsExact<ReturnType<Mapping["page"]>, EpubCFIPair | undefined>>,
  Assert<IsExact<ReturnType<Mapping["findRanges"]>, RangePair[]>>,
  Assert<IsExact<ReturnType<Mapping["findStart"]>, Range>>,
  Assert<IsExact<ReturnType<Mapping["findEnd"]>, Range>>,
  Assert<IsExact<ReturnType<Mapping["findTextStartRange"]>, Range>>,
  Assert<IsExact<ReturnType<Mapping["findTextEndRange"]>, Range>>,
  Assert<IsExact<ReturnType<Mapping["splitTextNodeIntoRanges"]>, Range[]>>,
  Assert<IsExact<ReturnType<Mapping["rangePairToCfiPair"]>, EpubCFIPair>>,
  Assert<IsExact<ReturnType<Mapping["rangeListToCfiList"]>, EpubCFIPair[]>>,
  Assert<IsExact<ReturnType<Mapping["axis"]>, boolean>>
];

type ThemesAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Themes>, [rendition: ThemesRendition]>>,
  Assert<IsExact<Themes["rendition"], ThemesRendition | undefined>>,
  Assert<IsExact<Themes["_themes"], Record<string, { rules?: ThemeRules; url?: string; serialized?: string; injected?: boolean }> | undefined>>,
  Assert<IsExact<Themes["_overrides"], Record<string, ThemeOverride> | undefined>>,
  Assert<IsExact<Themes["_current"], string | undefined>>,
  Assert<IsExact<ReturnType<Themes["register"]>, void>>,
  Assert<IsExact<ReturnType<Themes["default"]>, void>>,
  Assert<IsExact<ReturnType<Themes["registerThemes"]>, void>>,
  Assert<IsExact<ReturnType<Themes["registerCss"]>, void>>,
  Assert<IsExact<ReturnType<Themes["registerUrl"]>, void>>,
  Assert<IsExact<ReturnType<Themes["registerRules"]>, void>>,
  Assert<IsExact<ReturnType<Themes["select"]>, void>>,
  Assert<IsExact<ReturnType<Themes["update"]>, void>>,
  Assert<IsExact<ReturnType<Themes["inject"]>, void>>,
  Assert<IsExact<ReturnType<Themes["add"]>, void>>,
  Assert<IsExact<ReturnType<Themes["override"]>, void>>,
  Assert<IsExact<ReturnType<Themes["removeOverride"]>, void>>,
  Assert<IsExact<ReturnType<Themes["overrides"]>, void>>,
  Assert<IsExact<ReturnType<Themes["fontSize"]>, void>>,
  Assert<IsExact<ReturnType<Themes["font"]>, void>>,
  Assert<IsExact<ReturnType<Themes["destroy"]>, void>>
];

type AnnotationsAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Annotations>, [rendition: AnnotationsRendition]>>,
  Assert<IsExact<Annotations["rendition"], AnnotationsRendition>>,
  Assert<IsExact<Annotations["highlights"], Annotation[]>>,
  Assert<IsExact<Annotations["underlines"], Annotation[]>>,
  Assert<IsExact<Annotations["marks"], Annotation[]>>,
  Assert<IsExact<Annotations["_annotations"], Record<string, Annotation>>>,
  Assert<IsExact<Annotations["_annotationsBySectionIndex"], SectionAnnotationMap>>,
  Assert<IsExact<ReturnType<Annotations["add"]>, Annotation>>,
  Assert<IsExact<ReturnType<Annotations["remove"]>, void>>,
  Assert<IsExact<ReturnType<Annotations["_removeFromAnnotationBySectionIndex"]>, void>>,
  Assert<IsExact<ReturnType<Annotations["_annotationsAt"]>, string[]>>,
  Assert<IsExact<ReturnType<Annotations["highlight"]>, Annotation>>,
  Assert<IsExact<ReturnType<Annotations["underline"]>, Annotation>>,
  Assert<IsExact<ReturnType<Annotations["mark"]>, Annotation>>,
  Assert<IsExact<ReturnType<Annotations["each"]>, any>>,
  Assert<IsExact<ReturnType<Annotations["inject"]>, void>>,
  Assert<IsExact<ReturnType<Annotations["clear"]>, void>>,
  Assert<IsExact<ReturnType<Annotations["show"]>, void>>,
  Assert<IsExact<ReturnType<Annotations["hide"]>, void>>,
  Assert<IsExact<Annotation["type"], string>>,
  Assert<IsExact<Annotation["data"], AnnotationData | undefined>>,
  Assert<IsExact<ReturnType<Annotation["update"]>, void>>,
  Assert<IsExact<ReturnType<Annotation["attach"]>, any>>,
  Assert<IsExact<ReturnType<Annotation["detach"]>, any>>,
  Assert<IsExact<ReturnType<Annotation["text"]>, void>>
];

type ResourcesAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Resources>, [manifest: ResourceManifest | PackagingManifest, options?: ResourceOptions | undefined]>>,
  Assert<IsExact<Resources["settings"], ResourceSettings | undefined>>,
  Assert<IsExact<Resources["manifest"], ResourceManifest | undefined>>,
  Assert<IsExact<Resources["resources"], ResourceManifestItem[] | undefined>>,
  Assert<IsExact<Resources["replacementUrls"], string[] | undefined>>,
  Assert<IsExact<Resources["html"], ResourceManifestItem[] | undefined>>,
  Assert<IsExact<Resources["assets"], ResourceManifestItem[] | undefined>>,
  Assert<IsExact<Resources["css"], ResourceManifestItem[] | undefined>>,
  Assert<IsExact<Resources["urls"], string[] | undefined>>,
  Assert<IsExact<Resources["cssUrls"], string[] | undefined>>,
  Assert<IsExact<ReturnType<Resources["process"]>, void>>,
  Assert<IsExact<ReturnType<Resources["split"]>, void>>,
  Assert<IsExact<ReturnType<Resources["splitUrls"]>, void>>,
  Assert<IsExact<ReturnType<Resources["createUrl"]>, Promise<string>>>,
  Assert<IsExact<ReturnType<Resources["replacements"]>, Promise<Array<string | null>>>>,
  Assert<IsExact<ReturnType<Resources["replaceCss"]>, Promise<void[]>>>,
  Assert<IsExact<ReturnType<Resources["createCssFile"]>, Promise<string | undefined>>>,
  Assert<IsExact<ReturnType<Resources["relativeTo"]>, string[]>>,
  Assert<IsExact<ReturnType<Resources["get"]>, Promise<string> | undefined>>,
  Assert<IsExact<ReturnType<Resources["substitute"]>, string>>,
  Assert<IsExact<ReturnType<Resources["destroy"]>, void>>
];

type StoreAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Store>, [name: string, requester?: StoreRequest | undefined, resolver?: StoreResolver | undefined]>>,
  Assert<IsExact<Store["urlCache"], Record<string, string>>>,
  Assert<IsExact<Store["storage"], StoreStorage | undefined>>,
  Assert<IsExact<Store["name"], string>>,
  Assert<IsExact<Store["requester"], StoreRequest>>,
  Assert<IsExact<Store["resolver"], StoreResolver | undefined>>,
  Assert<IsExact<Store["online"], boolean>>,
  Assert<IsExact<Store["_status"], ((event?: Event) => void) | undefined>>,
  Assert<IsExact<Parameters<Store["add"]>, [resources: StoreResources, force?: boolean | undefined]>>,
  Assert<IsExact<ReturnType<Store["add"]>, Promise<StoreData[]>>>,
  Assert<IsExact<ReturnType<Store["put"]>, Promise<StoreData>>>,
  Assert<IsExact<ReturnType<Store["request"]>, Promise<RequestResponse>>>,
  Assert<IsExact<ReturnType<Store["retrieve"]>, Promise<RequestResponse>>>,
  Assert<IsExact<ReturnType<Store["handleResponse"]>, RequestResponse>>,
  Assert<IsExact<ReturnType<Store["getBlob"]>, Promise<Blob | undefined>>>,
  Assert<IsExact<ReturnType<Store["getText"]>, Promise<string | ArrayBuffer | null | undefined>>>,
  Assert<IsExact<ReturnType<Store["getBase64"]>, Promise<string | ArrayBuffer | null | undefined>>>,
  Assert<IsExact<ReturnType<Store["createUrl"]>, Promise<string>>>,
  Assert<IsExact<ReturnType<Store["revokeUrl"]>, void>>,
  Assert<IsExact<ReturnType<Store["checkRequirements"]>, void>>,
  Assert<IsExact<ReturnType<Store["addListeners"]>, void>>,
  Assert<IsExact<ReturnType<Store["removeListeners"]>, void>>,
  Assert<IsExact<ReturnType<Store["status"]>, void>>,
  Assert<IsExact<ReturnType<Store["destroy"]>, void>>
];

function testEpub() {
  const epub = ePub("https://s3.amazonaws.com/moby-dick/moby-dick.epub");
  const rootBlobInput: RootBookInput = new Blob();
  const rootBlobBook: Book = ePub(rootBlobInput, {});

  const headers: RequestHeaders = { Authorization: "Bearer token" };
  const book = new Book("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {
    requestCredentials: true,
    requestHeaders: headers,
    requestMethod: request,
  });
  const rootBook = ePub({
    requestMethod: request,
  });
  const rootOptions: RootBookOptions = {
    requestCredentials: true,
  };
  const rootOptionsOnlyBook: Book = ePub(rootOptions);
  const blobBook = new Book(new Blob(), {});
  const bookInput: BookInput = new Blob();
  const bookOpening: Deferred<Book> | undefined = book.opening;
  const bookLoaded: BookLoaded | undefined = book.loaded;
  const bookLoading: BookLoading | undefined = book.loading;
  const bookReady: Promise<any[]> | undefined = book.ready;
  const bookIsRendered: boolean = book.isRendered;
  const bookSpine: Spine | undefined = book.spine;
  const bookLocations: Locations | undefined = book.locations;
  const bookPackage: Packaging | undefined = book.package;
  const bookDisplayOptions: DisplayOptions | undefined = book.displayOptions;
  const bookCover: string | undefined = book.cover;
  const loadedBookSpine: Promise<Spine> | undefined = book.loaded?.spine;
  const loadedBookResources: Promise<Resources> | undefined = book.loaded?.resources;
  const loadedBookCover: Promise<string | undefined> | undefined = book.loaded?.cover;
  const resolvedBookPath: string | undefined = book.resolve();
  const bookSection: Section | undefined = book.section(0);
  const bookArchiveZip: Promise<ArchiveZip> = book.unarchive(bookInput);

  const rendition = new Rendition(book, {});
  const renditionLayoutProperties: RenditionLayoutProperties = rendition.determineLayoutProperties({
    layout: "reflowable",
    spread: "none",
    orientation: "auto",
    flow: "paginated",
    viewport: "",
    direction: "ltr",
  });
  const managerLocationItem: ManagerLocationItem = {
    index: 1,
    href: "Text/chapter.xhtml",
    mapping: {
      start: "epubcfi(/6/2[chapter]!/4/2/1:0)",
      end: "epubcfi(/6/2[chapter]!/4/2/1:10)",
    },
    pages: [1],
    totalPages: 1,
  };
  const renditionLocationPart: RenditionLocationPart = {
    index: 1,
    href: "Text/chapter.xhtml",
    cfi: "epubcfi(/6/2[chapter]!/4/2/1:0)",
    displayed: {
      page: 1,
      total: 2,
    },
    page: 1,
    percentage: 0.5,
  };
  const displayedLocation: DisplayedLocation = renditionLocationPart;
  const locatedRenditionLocation: Location = rendition.located([managerLocationItem]);
  const renditionDebugState: Record<string, any> = rendition.debugVerticalRlPage();
  const renditionRemeasure: Promise<any> = rendition.remeasure({ preserveLocation: true, waitForFonts: false });
  const resolvedRenditionHref: string = rendition.resolveLinkHref("#note", { sectionHref: "Text/chapter.xhtml" });

  const binaryRequest: Promise<ArrayBuffer> = request("https://s3.amazonaws.com/moby-dick/moby-dick.epub", "binary", true, headers);
  const blobRequest: Promise<Blob> = request("https://s3.amazonaws.com/moby-dick/moby-dick.epub", "blob");
  const jsonRequest: Promise<JsonValue> = request("https://example.com/package.json", "json");
  const xmlRequest: Promise<Document | XMLDocument> = request("https://example.com/package.opf", "opf");
  const fallbackRequest: Promise<RequestResponse> = request("https://example.com/content.txt", null);

  const version: string = ePub.VERSION;
  const StaticBook: typeof Book = ePub.Book;
  const StaticRendition: typeof Rendition = ePub.Rendition;
  const StaticContents: typeof Contents = ePub.Contents;
  const StaticCFI: typeof EpubCFI = ePub.CFI;
  const cfi = new ePub.CFI();
  const parsedCfi: ParsedEpubCFI | { spinePos: number } = cfi.parse("epubcfi(/6/2[cover]!/6)");
  const cfiComponent: EpubCFIComponent = cfi.parseComponent("/6/2[cover]");
  const cfiStep: EpubCFIStep | undefined = cfi.parseStep("2[cover]");
  const cfiTerminal: EpubCFITerminal = cfi.parseTerminal("3");
  const cfiType: EpubCFIType = cfi.checkType("epubcfi(/6/2[cover]!/6)");
  const cfiPathComponent: string | undefined = cfi.getPathComponent("/6/2[cover]!/6");
  const cfiRange: [string, string] | false = cfi.getRange("/6/2[cover]!/6,/2/1:1,/3:4");
  const cfiBase: EpubCFIBase = cfiComponent;
  const layout = new Layout({
    layout: "reflowable",
    spread: "auto",
    minSpreadWidth: 800,
    evenSpreads: false,
  });
  const defaultLayout = new Layout();
  const layoutSettings: EpubLayoutSettings = { flow: "scrolled-continuous", direction: "rtl" };
  const runtimeLayout = new Layout(layoutSettings);
  const layoutFlow: string = runtimeLayout.flow("paginated");
  const layoutSpread: boolean = runtimeLayout.spread("none", 0);
  const layoutCalculate: void = runtimeLayout.calculate(1000, 600, 20);
  const layoutContent: LayoutContent = {
    fit: () => undefined,
    columns: () => "columns-result",
    size: () => undefined,
  };
  const formattedLayout: unknown = runtimeLayout.format(layoutContent, undefined, "horizontal");
  const layoutCount: LayoutCount = runtimeLayout.count(4100);
  const layoutProps: LayoutProps = runtimeLayout.props;
  runtimeLayout.update({ flow: "scrolled" });
  const uuid: string = ePub.utils.uuid();
  const deferred = new ePub.utils.defer<string>();
  const parsedDocument: Document = ePub.utils.parse("<html><body><p>Text</p></body></html>", "text/html");
  const typedContents = new Contents(parsedDocument, parsedDocument.body, "/6/2[chap]", 1, "OPS/chapter.xhtml");
  const contentsSize: ContentsSize = typedContents._size;
  const contentsSectionHref: string = typedContents.sectionHref;
  const contentsVerticalRlMetricsCache: VerticalRlMetricsCache | null = typedContents._verticalRlMetricsCache;
  const contentsVerticalRlPageMetricsCache: VerticalRlPageMetricsCache | null = typedContents._verticalRlPageMetricsCache;
  const contentsForcedWritingMode: string = typedContents._forcedWritingMode;
  const contentsCalled: number = typedContents.called;
  const contentsActive: boolean = typedContents.active;
  const animationFrame: AnimationFrameRequest | false = ePub.utils.requestAnimationFrame;
  const coreBounds: SizeBounds = ePub.utils.bounds(parsedDocument.documentElement);
  const coreBorders: SizeBounds = ePub.utils.borders(parsedDocument.documentElement);
  const coreWindowBounds: RectBounds = ePub.utils.windowBounds();
  const coreBlobContent: BlobContent = "Text";
  const coreBlob: Blob = ePub.utils.createBlob(coreBlobContent, "text/plain");
  const coreBlobUrl: string = ePub.utils.createBlobUrl(coreBlobContent, "text/plain");
  const coreBase64Url: string = ePub.utils.createBase64Url("Text", "text/plain");
  const coreRangeObject: CoreRangeObject = new ePub.utils.RangeObject();
  const coreQueryAll: NodeListOf<Element> | HTMLCollectionOf<Element> = ePub.utils.qsa(parsedDocument, "p");
  const nodeCfiInput: EpubCFIInput = parsedDocument.documentElement;
  const nodeCfi: ParsedEpubCFI = cfi.fromNode(nodeCfiInput as Node, cfiBase);
  const rangeCfi: ParsedEpubCFI = cfi.fromRange(parsedDocument.createRange(), cfiBase);
  const paragraph = ePub.utils.qs(parsedDocument, "p");
  const paragraphText: string | null | undefined = paragraph?.textContent;
  const pathHelper = new Path("/OPS/Text/chapter.xhtml");
  const parsedPath: ParsedPath = pathHelper.parse("/OPS/Text/chapter.xhtml");
  const pathIsAbsolute: boolean = pathHelper.isAbsolute();
  const pathDirectory: string = pathHelper.directory;
  const pathSegments: string[] = pathHelper.splitPath("OPS/Text/chapter.xhtml");
  const urlBase: UrlBase = false;
  const urlHelper = new Url("https://example.com/OPS/Text/chapter.xhtml?debug=true");
  const relativeUrlHelper = new Url("OPS/Text/chapter.xhtml", urlBase);
  const urlPath: Path = urlHelper.path();
  const resolvedUrl: string = urlHelper.resolve("../Images/cover.jpg");
  const relativeUrl: string = urlHelper.relative("/OPS/Text/chapter.xhtml");
  const nativeUrl: URL | undefined = urlHelper.Url;
  const urlOrigin: string = urlHelper.origin;
  const replacementSection: SectionLike = {
    canonical: "https://example.com/books/one",
    idref: "chapter-one",
    url: "/OPS/Text/chapter.xhtml",
  };
  const linkCallback: LinkCallback = (href: string) => {
    void href;
  };
  const replacementBase: void = replaceBase(parsedDocument, replacementSection);
  const replacementCanonical: void = replaceCanonical(parsedDocument, replacementSection);
  const replacementMeta: void = replaceMeta(parsedDocument, replacementSection);
  const replacementLinks: void = replaceLinks(parsedDocument.documentElement, linkCallback, "OPS/Text/chapter.xhtml");
  const substitutedContent: string = substitute("url(cover.jpg)", ["cover.jpg"], ["blob:cover"]);
  const queueTask: QueueTask = (value: string) => value;
  const queue = new Queue({ prefix: "ctx" });
  const queuedItem: QueuedItem = {
    task: queueTask,
    args: ["ready"],
    promise: Promise.resolve("ready"),
  };
  const queuedPromise: Promise<any> = queue.enqueue(queueTask, "ready");
  const dequeuedPromise: Promise<any> = queue.dequeue();
  const queueRun: Promise<any> = queue.run();
  const queueFlush: Promise<any> | boolean | undefined = queue.flush();
  const queueLength: number = queue.length();
  const taskWrapper: (...args: any[]) => Promise<any> = new Task((): void => undefined);
  const hookTask: HookTask = (value: string) => Promise.resolve(value);
  const hookRegistration: HookRegistration = [hookTask];
  const hook = new Hook({ prefix: "ctx" });
  const hooksObject: HooksObject = { content: hook };
  const hookRegister: void = hook.register(hookTask, hookRegistration);
  const hookTrigger: Promise<any[]> = hook.trigger("ready");
  const hookList: HookTask[] = hook.list();
  const hookClear: HookTask[] = hook.clear();
  const legacyNavItems: NavigationInputItem[] = [{
    id: "chapter-one",
    href: "Text/chapter1.xhtml",
    title: "Chapter 1",
    children: [{
      id: "chapter-one-part-one",
      href: "Text/chapter1.xhtml#part-1",
      title: "Part 1",
    }],
  }];
  const emptyNavigation = new Navigation();
  const documentNavigation = new Navigation(parsedDocument);
  const legacyNavigation = new Navigation(legacyNavItems);
  const navigationToc: NavItem[] = legacyNavigation.get();
  const navigationItem: NavItem | undefined = legacyNavigation.get("chapter-one");
  const navigationLandmarks: LandmarkItem[] = legacyNavigation.landmark();
  const navigationLandmark: LandmarkItem | undefined = legacyNavigation.landmark("cover");
  const loadedNavigationItems: NavItem[] = legacyNavigation.load(legacyNavItems);
  const spineItem: SpineItem = {
    idref: "chapter-one",
    linear: "yes",
    properties: ["rendition:layout-pre-paginated"],
    index: 0,
    href: "Text/chapter1.xhtml",
    url: "https://example.com/Text/chapter1.xhtml",
    canonical: "Text/chapter1.xhtml",
    cfiBase: "/6/2",
  };
  const section = new Section(spineItem);
  const sectionLoad: Promise<Element> = section.load(() => Promise.resolve(parsedDocument));
  const sectionRender: Promise<string> = section.render(() => Promise.resolve(parsedDocument));
  const sectionFind: SectionSearchResult[] = section.find("Text");
  const sectionSearch: SectionSearchResult[] = section.search("Text");
  const sectionLayout: LayoutSettings = section.reconcileLayoutSettings({
    layout: "reflowable",
    spread: "auto",
    orientation: "auto",
  });
  const spinePackage: SpinePackage = {
    spine: [{
      id: "chapter-one",
      idref: "chapter-one",
      linear: "yes",
      properties: [],
      index: 0,
      cfiBase: "",
    }],
    manifest: {
      "chapter-one": {
        href: "Text/chapter1.xhtml",
        type: "application/xhtml+xml",
        properties: [],
      },
    },
    spineNodeIndex: 0,
    baseUrl: "https://example.com/",
  };
  const spineResolver: SpineResolver = (href: string) => href;
  const spine = new Spine();
  spine.unpack(spinePackage, spineResolver, spineResolver);
  const spineSection: Section | null = spine.get("Text/chapter1.xhtml");
  const firstSpineSection: Section | undefined = spine.first();
  const lastSpineSection: Section | undefined = spine.last();
  const removedSpineSections: Section[] | undefined = spineSection ? spine.remove(spineSection) : undefined;
  const archive = new Archive();
  const archiveInput: ArchiveInput = new ArrayBuffer(0);
  const archiveRequestType: ArchiveRequestType = "xhtml";
  const archiveUrlOptions: ArchiveUrlOptions = { base64: true };
  const openedArchive: Promise<ArchiveZip> = archive.open(archiveInput);
  const openedArchiveUrl: Promise<ArchiveZip> = archive.openUrl("https://example.com/book.epub");
  const archiveBlob: Promise<Blob> = archive.request("/OPS/images/cover.jpg", "blob");
  const archiveJson: Promise<JsonValue> = archive.request("/OPS/package.json", "json");
  const archiveDocument: Promise<Document | XMLDocument> = archive.request("/OPS/package.opf", "opf");
  const archiveFallback: Promise<RequestResponse> = archive.request("/OPS/chapter.xhtml", archiveRequestType);
  const archiveBlobEntry: Promise<Blob> | undefined = archive.getBlob("/OPS/images/cover.jpg");
  const archiveTextEntry: Promise<string> | undefined = archive.getText("/OPS/chapter.xhtml");
  const archiveBase64Entry: Promise<string> | undefined = archive.getBase64("/OPS/images/cover.jpg");
  const archiveObjectUrl: Promise<string> = archive.createUrl("/OPS/images/cover.jpg");
  const archiveBase64Url: Promise<string> = archive.createUrl("/OPS/images/cover.jpg", archiveUrlOptions);
  const archiveParsedJson: JsonValue = archive.handleResponse("{\"ok\":true}", "json");
  const archiveParsedDocument: Document | XMLDocument = archive.handleResponse("<html></html>", "xhtml");
  const packagingJson: PackagingJsonManifest = {
    metadata: { title: "JSON Manifest" },
    readingOrder: [{ href: "Text/chapter1.xhtml" }],
    resources: [{ href: "cover.jpg", rel: ["cover"] }],
    toc: [{ href: "Text/chapter1.xhtml", title: "Chapter 1" }],
  };
  const packaging = new Packaging();
  const parsedPackaging: PackagingObject = packaging.parse(parsedDocument);
  const loadedPackaging: PackagingObject = packaging.load(packagingJson);
  const packagingManifestItem: PackagingManifestItem | undefined = loadedPackaging.manifest[0];
  const packagingMetadataTitle: string | undefined = loadedPackaging.metadata.title;
  const packagingTocItem: PackagingTocItem | undefined = loadedPackaging.toc?.[0];
  const displayOptions = new DisplayOptions();
  const parsedDisplayOptions: DisplayOptions = displayOptions.parse(parsedDocument);
  const displayOptionsInteractive: string | undefined = displayOptions.interactive;
  const containerDocument = parsedDocument as ContainerDocument;
  const container = new Container();
  const parsedContainer: void = container.parse(containerDocument);
  const containerPackagePath: string | null | undefined = container.packagePath;
  const pageListItems: PageListItem[] = [{
    page: "1",
    href: "Text/chapter.xhtml#page-1",
    cfi: "epubcfi(/6/2[chap]!/4/2/2)",
    packageUrl: "package.opf",
  }];
  const pageList = new PageList();
  const parsedPageList: PageListItem[] | undefined = pageList.parse(parsedDocument);
  const loadedPageList: void = pageList.process(pageListItems);
  const pageFromCfi: PageValue | -1 = pageList.pageFromCfi("epubcfi(/6/2[chap]!/4/2/2)");
  const cfiFromPage: string | -1 = pageList.cfiFromPage("1");
  const hrefFromPage: string | undefined = pageList.hrefFromPage("1");
  const pageFromHref: PageValue | undefined = pageList.pageFromHref("Text/chapter.xhtml#page-1");
  const pageFromPercentage: number = pageList.pageFromPercentage(0.5);
  const percentageFromPage: number = pageList.percentageFromPage(1);
  const percentageFromCfi: number = pageList.percentageFromCfi("epubcfi(/6/2[chap]!/4/2/2)");
  const locations = new Locations(spine, () => Promise.resolve(parsedDocument), 10);
  const locationRange: LocationRange = locations.createRange();
  const loadedLocations: string[] = locations.load([
    "epubcfi(/6/2[chap]!/4/2/2)",
    "epubcfi(/6/2[chap]!/4/4/2)",
  ]);
  const savedLocations: string = locations.save();
  const locationIndex: number = locations.locationFromCfi(loadedLocations[0]);
  const locationPercentage: number | null = locations.percentageFromCfi(loadedLocations[0]);
  const locationFromPercentage: string | number = locations.cfiFromPercentage(0.5);
  const locationFromIndex: string | number = locations.cfiFromLocation("0");
  const currentLocation: number | undefined = locations.currentLocation;
  const locationLength: number = locations.length();
  const generatedSectionLocations: Promise<string[]> = spineSection ? locations.generateForSection(spineSection, 400) : Promise.resolve([]);
  const wordLocations: WordLocation[] = spineSection ? locations.parseWords(parsedDocument.documentElement, spineSection, 10, new EpubCFI(loadedLocations[0])) : [];
  const generatedWordLocations: Promise<WordLocation[]> = locations.generateFromWords(loadedLocations[0], 10, 3);
  locations.currentLocation = loadedLocations[0];
  locations.setCurrent(0);
  locations.on("changed", () => undefined);
  const mappingLayout: MappingLayout = {
    spreadWidth: 200,
    columnWidth: 100,
    gap: 0,
    divisor: 1,
  };
  const mapping = new Mapping(mappingLayout, "ltr", "horizontal");
  const mappingContents: MappingContents = { document: parsedDocument };
  const mappingPage: EpubCFIPair | undefined = mapping.page(mappingContents, "/6/2[chap]", 0, 100);
  const mappingTextNode = parsedDocument.querySelector("p")?.firstChild;
  const mappingRanges: Range[] = mappingTextNode ? mapping.splitTextNodeIntoRanges(mappingTextNode) : [];
  const mappingRangePair: RangePair | undefined = mappingRanges[0] && mappingRanges[1]
    ? { start: mappingRanges[0], end: mappingRanges[1] }
    : undefined;
  const mappingCfiPair: EpubCFIPair | undefined = mappingRangePair ? mapping.rangePairToCfiPair("/6/2[chap]", mappingRangePair) : undefined;
  const mappingCfiList: EpubCFIPair[] = mappingRangePair ? mapping.rangeListToCfiList("/6/2[chap]", [mappingRangePair]) : [];
  const mappingView: MappingView = {
    section: { cfiBase: "/6/2[chap]" },
    contents: { scrollWidth: () => 200 },
    document: parsedDocument,
  };
  const mappingSection: EpubCFIPair[] = mapping.section(mappingView);
  const mappingAxis: boolean = mapping.axis("vertical");
  const themeRules: ThemeRules = {
    body: {
      color: "purple",
    },
  };
  const themeInput: ThemeInput = themeRules;
  const themesContent: ThemesContent = {
    addClass: () => undefined,
    addStylesheet: () => undefined,
    addStylesheetCss: () => undefined,
    addStylesheetRules: () => undefined,
    css: () => undefined,
    removeClass: () => undefined,
  };
  const themesRendition: ThemesRendition = {
    getContents: () => [themesContent],
    hooks: {
      content: {
        register: () => undefined,
      },
    },
  };
  const themes = new Themes(themesRendition);
  themes.register();
  themes.register("default.css");
  themes.register("night", themeRules);
  themes.registerThemes({ night: themeInput });
  themes.default(themeRules);
  themes.registerCss("print", "body { color: black; }");
  themes.registerUrl("light", "light.css");
  themes.registerRules("rules", themeRules);
  themes.select("night");
  themes.update("night");
  themes.inject(themesContent);
  themes.add("night", themesContent);
  themes.override("font-size", "120%", true);
  themes.removeOverride("font-size");
  themes.overrides(themesContent);
  themes.fontSize("120%");
  themes.font("serif");
  const annotationView: AnnotationView = {
    index: 1,
    highlight: () => ({ type: "highlight" }),
    mark: () => ({ type: "mark" }),
    underline: () => ({ type: "underline" }),
    unhighlight: () => undefined,
    unmark: () => undefined,
    ununderline: () => undefined,
  };
  const annotationsRendition: AnnotationsRendition = {
    hooks: {
      render: {
        register: () => undefined,
      },
      unloaded: {
        register: () => undefined,
      },
    },
    views: () => [annotationView],
  };
  const annotations = new Annotations(annotationsRendition);
  const annotationData: AnnotationData = { note: "important" };
  const annotationStyles: AnnotationStyles = { fill: "yellow" };
  const highlightAnnotation: Annotation = annotations.highlight("epubcfi(/6/4[chapter-1]!/4/2,/1:0,/1:10)", annotationData, () => undefined, "epubjs-hl", annotationStyles);
  const underlineAnnotation: Annotation = annotations.underline("epubcfi(/6/4[chapter-1]!/4/2,/1:0,/1:10)");
  const markAnnotation: Annotation = annotations.mark("epubcfi(/6/4[chapter-1]!/4/2,/1:0,/1:10)", annotationData);
  const annotationHashes: string[] = annotations._annotationsAt(1);
  annotations.inject(annotationView);
  annotations.clear(annotationView);
  annotations.remove("epubcfi(/6/4[chapter-1]!/4/2,/1:0,/1:10)", "mark");
  markAnnotation.update({ newer: true });
  markAnnotation.on("attach", () => undefined);
  const attachedMark: any = highlightAnnotation.attach(annotationView);
  const detachedMark: any = underlineAnnotation.detach(annotationView);
  const resourceManifest: ResourceManifest = {
    chapter: {
      href: "Text/chapter.xhtml",
      type: "application/xhtml+xml",
    },
    style: {
      href: "Styles/main.css",
      type: "text/css",
    },
    cover: {
      href: "Images/cover.jpg",
      type: "image/jpeg",
    },
  };
  const resourceResolver: ResourceResolver = (href: string) => `/OPS/${href}`;
  const resourceRequest: ResourceRequest = (url: string, type: "blob" | "text") => (
    type === "blob"
      ? Promise.resolve(new Blob([url]))
      : Promise.resolve("body { background: url(../Images/cover.jpg); }")
  );
  const resourceArchive: ResourceArchive = {
    createUrl: (url: string) => Promise.resolve(url),
    getText: () => Promise.resolve("body {}"),
  };
  const replacementMode: ReplacementMode = "base64";
  const resourceOptions: ResourceOptions = {
    replacements: replacementMode,
    archive: resourceArchive,
    resolver: resourceResolver,
    request: resourceRequest,
  };
  const resources = new Resources(resourceManifest, resourceOptions);
  const resourceUrl: Promise<string> = resources.createUrl("/OPS/Images/cover.jpg");
  const resourceReplacements: Promise<Array<string | null>> = resources.replacements();
  const resourceCssReplacements: Promise<void[]> = resources.replaceCss();
  const resourceCssFile: Promise<string | undefined> = resources.createCssFile("Styles/main.css");
  const relativeResourceUrls: string[] = resources.relativeTo("/OPS/Text/chapter.xhtml");
  const resourceReplacement: Promise<string> | undefined = resources.get("Images/cover.jpg");
  const substitutedResourceContent: string = resources.substitute("url(../Images/cover.jpg)", "/OPS/Text/chapter.xhtml");
  const storeHeaders: StoreHeaders = { Accept: "application/json" };
  const storeRequestType: StoreRequestType = "json";
  const storeResolver: StoreResolver = (href: string) => `/OPS/${href}`;
  const storeRequest: StoreRequest = (url: string, type?: StoreRequestType) => (
    type === "json"
      ? Promise.resolve({ ok: true })
      : Promise.resolve(new ArrayBuffer(0))
  );
  const storeUrlOptions: StoreUrlOptions = { base64: true };
  const storeResources: StoreResources = {
    resources: [{ href: "Text/chapter.xhtml" }],
  };
  const store = new Store("epubjs-type-store", storeRequest, storeResolver);
  const storedResources: Promise<StoreData[]> = store.add(storeResources);
  const storedData: Promise<StoreData> = store.put("/OPS/data.json", true, storeHeaders);
  const storedRequest: Promise<JsonValue> = store.request("/OPS/data.json", "json", true, storeHeaders);
  const storedFallbackRequest: Promise<RequestResponse> = store.request("/OPS/data.json", storeRequestType, true, storeHeaders);
  const storedRetrieve: Promise<Document | XMLDocument> = store.retrieve("/OPS/package.opf", "opf");
  const storedBlob: Promise<Blob | undefined> = store.getBlob("/OPS/images/cover.jpg");
  const storedText: Promise<string | ArrayBuffer | null | undefined> = store.getText("/OPS/chapter.xhtml");
  const storedBase64: Promise<string | ArrayBuffer | null | undefined> = store.getBase64("/OPS/images/cover.jpg");
  const storedUrl: Promise<string> = store.createUrl("/OPS/images/cover.jpg");
  const storedBase64Url: Promise<string> = store.createUrl("/OPS/images/cover.jpg", storeUrlOptions);
  const storedParsedJson: JsonValue = store.handleResponse("{\"ok\":true}", "json");
  const storedParsedDocument: Document | XMLDocument = store.handleResponse("<html></html>", "xhtml");

  new StaticBook("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {});
  new StaticRendition(epub, {});
  new StaticCFI();

  const epubAsBook: Book = epub;
  const rootBookAsBook: Book = rootBook;
  const requestMethod: RequestMethod = request;

  book.open(new Blob(), "binary");
  book.openEpub(new ArrayBuffer(0));
  const bookXmlLoad: Promise<Document | XMLDocument> = book.load("OPS/package.opf", "opf");
  const bookJsonLoad: Promise<JsonValue> = book.load("manifest.json", "json");
  const bookFallbackLoad: Promise<RequestResponse> = book.load("OPS/package.opf");
  rendition.attachTo("area");
  rendition.resize("100%", "100%", "epubcfi(/6/2)");
  const location = rendition.currentLocation();

  void version;
  void rendition;
  void rootBlobBook;
  void rootOptionsOnlyBook;
  void renditionLayoutProperties;
  void managerLocationItem;
  void renditionLocationPart;
  void displayedLocation;
  void locatedRenditionLocation;
  void renditionDebugState;
  void renditionRemeasure;
  void resolvedRenditionHref;
  void epubAsBook;
  void rootBookAsBook;
  void blobBook;
  void bookInput;
  void bookOpening;
  void bookLoaded;
  void bookLoading;
  void bookReady;
  void bookIsRendered;
  void bookSpine;
  void bookLocations;
  void bookPackage;
  void bookDisplayOptions;
  void bookCover;
  void loadedBookSpine;
  void loadedBookResources;
  void loadedBookCover;
  void resolvedBookPath;
  void bookSection;
  void bookArchiveZip;
  void bookXmlLoad;
  void bookJsonLoad;
  void bookFallbackLoad;
  void requestMethod;
  void binaryRequest;
  void blobRequest;
  void jsonRequest;
  void xmlRequest;
  void fallbackRequest;
  void StaticContents;
  void cfi;
  void parsedCfi;
  void cfiComponent;
  void cfiStep;
  void cfiTerminal;
  void cfiType;
  void cfiPathComponent;
  void cfiRange;
  void cfiBase;
  void nodeCfiInput;
  void nodeCfi;
  void rangeCfi;
  void typedContents;
  void contentsSize;
  void contentsSectionHref;
  void contentsVerticalRlMetricsCache;
  void contentsVerticalRlPageMetricsCache;
  void contentsForcedWritingMode;
  void contentsCalled;
  void contentsActive;
  void animationFrame;
  void coreBounds;
  void coreBorders;
  void coreWindowBounds;
  void coreBlob;
  void coreBlobUrl;
  void coreBase64Url;
  void coreRangeObject;
  void coreQueryAll;
  void layout;
  void defaultLayout;
  void layoutFlow;
  void layoutSpread;
  void layoutCalculate;
  void formattedLayout;
  void layoutCount;
  void layoutProps;
  void uuid;
  void deferred;
  void paragraphText;
  void parsedPath;
  void pathIsAbsolute;
  void pathDirectory;
  void pathSegments;
  void relativeUrlHelper;
  void urlPath;
  void resolvedUrl;
  void relativeUrl;
  void nativeUrl;
  void urlOrigin;
  void replacementBase;
  void replacementCanonical;
  void replacementMeta;
  void replacementLinks;
  void substitutedContent;
  void queuedItem;
  void queuedPromise;
  void dequeuedPromise;
  void queueRun;
  void queueFlush;
  void queueLength;
  void taskWrapper;
  void hooksObject;
  void hookRegister;
  void hookTrigger;
  void hookList;
  void hookClear;
  void emptyNavigation;
  void documentNavigation;
  void navigationToc;
  void navigationItem;
  void navigationLandmarks;
  void navigationLandmark;
  void loadedNavigationItems;
  void sectionLoad;
  void sectionRender;
  void sectionFind;
  void sectionSearch;
  void sectionLayout;
  void spineSection;
  void firstSpineSection;
  void lastSpineSection;
  void removedSpineSections;
  void openedArchive;
  void openedArchiveUrl;
  void archiveBlob;
  void archiveJson;
  void archiveDocument;
  void archiveFallback;
  void archiveBlobEntry;
  void archiveTextEntry;
  void archiveBase64Entry;
  void archiveObjectUrl;
  void archiveBase64Url;
  void archiveParsedJson;
  void archiveParsedDocument;
  void parsedPackaging;
  void packagingManifestItem;
  void packagingMetadataTitle;
  void packagingTocItem;
  void parsedDisplayOptions;
  void displayOptionsInteractive;
  void parsedContainer;
  void containerPackagePath;
  void parsedPageList;
  void loadedPageList;
  void pageFromCfi;
  void cfiFromPage;
  void hrefFromPage;
  void pageFromHref;
  void pageFromPercentage;
  void percentageFromPage;
  void percentageFromCfi;
  void locationRange;
  void savedLocations;
  void locationIndex;
  void locationPercentage;
  void locationFromPercentage;
  void locationFromIndex;
  void currentLocation;
  void locationLength;
  void generatedSectionLocations;
  void wordLocations;
  void generatedWordLocations;
  void mappingPage;
  void mappingCfiPair;
  void mappingCfiList;
  void mappingSection;
  void mappingAxis;
  void themes;
  void annotations;
  void annotationHashes;
  void attachedMark;
  void detachedMark;
  void resourceUrl;
  void resourceReplacements;
  void resourceCssReplacements;
  void resourceCssFile;
  void relativeResourceUrls;
  void resourceReplacement;
  void substitutedResourceContent;
  void storedResources;
  void storedData;
  void storedRequest;
  void storedFallbackRequest;
  void storedRetrieve;
  void storedBlob;
  void storedText;
  void storedBase64;
  void storedUrl;
  void storedBase64Url;
  void storedParsedJson;
  void storedParsedDocument;
  void location;
}

type _PublicRootAssertions = PublicRootAssertions;
type _CoreUtilsAssertions = CoreUtilsAssertions;
type _CoreClassAssertions = CoreClassAssertions;
type _EpubCFIAssertions = EpubCFIAssertions;
type _LayoutAssertions = LayoutAssertions;
type _NavigationAssertions = NavigationAssertions;
type _SectionAssertions = SectionAssertions;
type _SpineAssertions = SpineAssertions;
type _ArchiveAssertions = ArchiveAssertions;
type _PackagingAssertions = PackagingAssertions;
type _DisplayOptionsAssertions = DisplayOptionsAssertions;
type _ContainerAssertions = ContainerAssertions;
type _PathAssertions = PathAssertions;
type _UrlAssertions = UrlAssertions;
type _ReplacementsAssertions = ReplacementsAssertions;
type _QueueAssertions = QueueAssertions;
type _HookAssertions = HookAssertions;
type _PageListAssertions = PageListAssertions;
type _LocationsAssertions = LocationsAssertions;
type _MappingAssertions = MappingAssertions;
type _ThemesAssertions = ThemesAssertions;
type _AnnotationsAssertions = AnnotationsAssertions;
type _ResourcesAssertions = ResourcesAssertions;
type _StoreAssertions = StoreAssertions;

testEpub();

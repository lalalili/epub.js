import Book from "./book";
import EpubCFI from "./epubcfi";
import Rendition from "./rendition";
import Contents from "./contents";
import Layout from "./layout";
import ePub from "./epub";
import request from "./utils/request";
import {
	replaceBase,
	replaceCanonical,
	replaceLinks,
	replaceMeta,
	substitute
} from "./utils/replacements";

export default ePub;
export {
	Book,
	EpubCFI,
	Rendition,
	Contents,
	Layout,
	request,
	replaceBase,
	replaceCanonical,
	replaceLinks,
	replaceMeta,
	substitute
};

export type {
	Annotation,
	AnnotationCallback,
	AnnotationData,
	AnnotationMap,
	AnnotationOptions,
	AnnotationStyles,
	AnnotationType,
	AnnotationView,
	AnnotationsRendition,
	SectionAnnotationMap,
	default as Annotations
} from "./annotations";

export type {
	ArchiveEntry,
	ArchiveInput,
	ArchiveMarkupRequestType,
	ArchiveRequestType,
	ArchiveUrlOptions,
	ArchiveZip,
	ArchiveZipOptions,
	default as Archive
} from "./archive";

export type {
	BookInput,
	BookLoaded,
	BookLoading,
	BookOptions,
	BookReady
} from "./book";

export type {
	EpubCFIBase,
	EpubCFIComponent,
	EpubCFIInput,
	EpubCFISegment,
	EpubCFIStep,
	EpubCFITerminal,
	EpubCFIType,
	ParsedEpubCFI
} from "./epubcfi";

export type {
	ContainerDocument,
	default as Container
} from "./container";

export type {
	ContentsSize,
	VerticalRlDebugMetrics,
	VerticalRlPageMetrics,
	VerticalRlMetricsCache,
	VerticalRlPageMetricsCache,
	ViewportSettings
} from "./contents";

export type {
	AnimationFrameRequest,
	BlobContent,
	Deferred,
	RectBounds,
	SizeBounds
} from "./utils/core";

export type {
	LayoutContent,
	LayoutCount,
	LayoutProps,
	LayoutSettings
} from "./layout";

export type {
	default as DisplayOptions
} from "./displayoptions";

export type {
	LandmarkItem,
	NavItem,
	NavigationDocument,
	NavigationInput,
	NavigationInputItem,
	default as Navigation
} from "./navigation";

export type {
	PageListDocument,
	PageListItem,
	PageLookup,
	PageReverseLookup,
	PageValue,
	default as PageList
} from "./pagelist";

export type {
	JsonValue,
	RequestHeaders,
	RequestMethod,
	RequestResponse,
	RequestType
} from "./utils/request";

export type {
	ParsedPath,
	default as Path
} from "./utils/path";

export type {
	QueuedItem,
	QueueTask,
	default as Queue
} from "./utils/queue";

export type {
	HookRegistration,
	HookTask,
	HooksObject,
	default as Hook
} from "./utils/hook";

export type {
	UrlBase,
	default as Url
} from "./utils/url";

export type {
	LinkCallback,
	SectionLike
} from "./utils/replacements";

export type {
	GlobalLayout,
	LayoutSettings as SectionLayoutSettings,
	SectionHookSet,
	SectionRequest,
	SectionSearchResult,
	SpineItem,
	default as Section
} from "./section";

export type {
	SpineLookup,
	SpineManifestItem,
	SpinePackage,
	SpinePackageItem,
	SpineResolver,
	default as Spine
} from "./spine";

export type {
	EpubCFIPair,
	MappingAxis,
	MappingContents,
	MappingDirection,
	MappingLayout,
	MappingSection,
	MappingTextNodeWalker,
	MappingView,
	RangePair,
	default as Mapping
} from "./mapping";

export type {
	LocationInput,
	LocationRange,
	LocationsRequest,
	WordLocation,
	default as Locations
} from "./locations";

export type {
	InjectedThemes,
	Theme,
	ThemeInput,
	ThemeOverride,
	ThemeRules,
	ThemesContent,
	ThemesRendition,
	default as Themes
} from "./themes";

export type {
	PackagingJsonManifestBase,
	PackagingJsonManifest,
	PackagingManifest,
	PackagingManifestItem,
	PackagingManifestObject,
	PackagingMetadata,
	PackagingMetadataObject,
	PackagingObject,
	PackagingSpineItem,
	PackagingTocItem,
	default as Packaging
} from "./packaging";

export type {
	ReplacementMode,
	ResourceArchive,
	ResourceArchiveInput,
	ResourceManifest,
	ResourceManifestItem,
	ResourceOptions,
	ResourceRequest,
	ResourceResolver,
	ResourceSettings,
	default as Resources
} from "./resources";

export type {
	StoreData,
	StoreHeaders,
	StoreMarkupRequestType,
	StoreRequest,
	StoreRequestResponse,
	StoreRequestType,
	StoreResolver,
	StoreResource,
	StoreResources,
	StoreStorage,
	StoreUrlOptions,
	default as Store
} from "./store";

export type {
	DisplayedLocation,
	LayoutProperties as RenditionLayoutProperties,
	Location,
	ManagerLocationItem,
	RenditionLocationPart,
	RenditionOptions,
	RenditionVerticalRlDebugState,
	RenditionVerticalRlPageDebug
} from "./rendition";

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const tsconfig = JSON.parse(readFileSync(path.join(root, "tsconfig.json"), "utf8"));
const typeIndex = readFileSync(path.join(root, "types/index.d.ts"), "utf8");
const typeTests = readFileSync(path.join(root, "types/epubjs-tests.ts"), "utf8");
const sourceRoot = readFileSync(path.join(root, "src/index.ts"), "utf8");
const bookSource = readFileSync(path.join(root, "src/book.ts"), "utf8");
const bookTypes = readFileSync(path.join(root, "types/book.d.ts"), "utf8");
const contentsSource = readFileSync(path.join(root, "src/contents.ts"), "utf8");
const contentsTypes = readFileSync(path.join(root, "types/contents.d.ts"), "utf8");
const renditionSource = readFileSync(path.join(root, "src/rendition.ts"), "utf8");
const renditionTypes = readFileSync(path.join(root, "types/rendition.d.ts"), "utf8");
const stageSource = readFileSync(path.join(root, "src/managers/helpers/stage.ts"), "utf8");
const snapSource = readFileSync(path.join(root, "src/managers/helpers/snap.ts"), "utf8");
const iframeViewSource = readFileSync(path.join(root, "src/managers/views/iframe.ts"), "utf8");
const inlineViewSource = readFileSync(path.join(root, "src/managers/views/inline.ts"), "utf8");
const managerSource = readFileSync(path.join(root, "src/managers/default/index.ts"), "utf8");
const continuousManagerSource = readFileSync(path.join(root, "src/managers/continuous/index.ts"), "utf8");
const managerTypes = readFileSync(path.join(root, "types/managers/manager.d.ts"), "utf8");
const viewTypes = readFileSync(path.join(root, "types/managers/view.d.ts"), "utf8");
const marksPaneTypes = readFileSync(path.join(root, "types/marks-pane.d.ts"), "utf8");
const archiveSource = readFileSync(path.join(root, "src/archive.ts"), "utf8");
const archiveTypes = readFileSync(path.join(root, "types/archive.d.ts"), "utf8");
const jszipTypes = readFileSync(path.join(root, "types/jszip-dist.d.ts"), "utf8");
const storeSource = readFileSync(path.join(root, "src/store.ts"), "utf8");
const sectionSource = readFileSync(path.join(root, "src/section.ts"), "utf8");
const spineSource = readFileSync(path.join(root, "src/spine.ts"), "utf8");
const spineTypes = readFileSync(path.join(root, "types/spine.d.ts"), "utf8");
const navigationTypes = readFileSync(path.join(root, "types/navigation.d.ts"), "utf8");
const pageListSource = readFileSync(path.join(root, "src/pagelist.ts"), "utf8");
const pageListTypes = readFileSync(path.join(root, "types/pagelist.d.ts"), "utf8");
const layoutSource = readFileSync(path.join(root, "src/layout.ts"), "utf8");
const layoutTypes = readFileSync(path.join(root, "types/layout.d.ts"), "utf8");
const resourcesSource = readFileSync(path.join(root, "src/resources.ts"), "utf8");
const resourcesTypes = readFileSync(path.join(root, "types/resources.d.ts"), "utf8");
const storeTypes = readFileSync(path.join(root, "types/store.d.ts"), "utf8");
const annotationsSource = readFileSync(path.join(root, "src/annotations.ts"), "utf8");
const annotationsTypes = readFileSync(path.join(root, "types/annotations.d.ts"), "utf8");
const locationsSource = readFileSync(path.join(root, "src/locations.ts"), "utf8");
const locationsTypes = readFileSync(path.join(root, "types/locations.d.ts"), "utf8");
const mappingSource = readFileSync(path.join(root, "src/mapping.ts"), "utf8");
const mappingTypes = readFileSync(path.join(root, "types/mapping.d.ts"), "utf8");
const epubcfiSource = readFileSync(path.join(root, "src/epubcfi.ts"), "utf8");
const epubcfiTypes = readFileSync(path.join(root, "types/epubcfi.d.ts"), "utf8");
const compatRangeSource = readFileSync(path.join(root, "src/compat/range.ts"), "utf8");
const coreCollectionsSource = readFileSync(path.join(root, "src/core/collections.ts"), "utf8");
const coreUtilsSource = readFileSync(path.join(root, "src/utils/core.ts"), "utf8");
const platformBlobSource = readFileSync(path.join(root, "src/platform/blob.ts"), "utf8");
const platformDomSource = readFileSync(path.join(root, "src/platform/dom.ts"), "utf8");
const platformLayoutSource = readFileSync(path.join(root, "src/platform/layout.ts"), "utf8");
const requestSource = readFileSync(path.join(root, "src/utils/request.ts"), "utf8");
const queueSource = readFileSync(path.join(root, "src/utils/queue.ts"), "utf8");
const queueTypes = readFileSync(path.join(root, "types/utils/queue.d.ts"), "utf8");
const hookSource = readFileSync(path.join(root, "src/utils/hook.ts"), "utf8");
const hookTypes = readFileSync(path.join(root, "types/utils/hook.d.ts"), "utf8");
const globalTypeTests = readFileSync(path.join(root, "types/global-namespace-tests.ts"), "utf8");
const bookTests = readFileSync(path.join(root, "test/browser/book.test.js"), "utf8");
const publicApiTests = readFileSync(path.join(root, "test/browser/public-api.test.js"), "utf8");
const umdGlobalTests = readFileSync(path.join(root, "test/browser/umd-global.test.js"), "utf8");
const viewsTests = readFileSync(path.join(root, "test/browser/views.test.js"), "utf8");
const contentsTextWidthTests = readFileSync(path.join(root, "test/browser/contents-text-width.test.js"), "utf8");
const renditionTests = readFileSync(path.join(root, "test/browser/rendition.test.js"), "utf8");
const debounceTypes = readFileSync(path.join(root, "types/lodash-debounce.d.ts"), "utf8");
const throttleTypes = readFileSync(path.join(root, "types/lodash-throttle.d.ts"), "utf8");

const requiredScripts = {
	"build:modules": "vite build --config vite.config.mjs",
	"build:umd": "vite build --config vite.umd.config.mjs",
	"test:browser": "vitest run --config vitest.browser.config.mjs",
	"typecheck": "tsc -p tsconfig.json --noEmit",
	"verify:gate1-readiness": "node scripts/verify-gate1-readiness.mjs",
	"verify:package-entry": "node scripts/verify-package-entry.mjs",
	"verify:packed-package-entry": "node scripts/verify-packed-package-entry.mjs"
};

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function assertScript(name, expectedCommand) {
	assert(packageJson.scripts[name] === expectedCommand, `${name} script must be ${expectedCommand}`);
}

function assertFile(relativePath) {
	assert(existsSync(path.join(root, relativePath)), `${relativePath} must exist`);
}

for (const [scriptName, expectedCommand] of Object.entries(requiredScripts)) {
	assertScript(scriptName, expectedCommand);
}

assert(
	packageJson.scripts["verify:contracts"].includes("npm run verify:gate1-readiness"),
	"verify:contracts must include verify:gate1-readiness"
);
assert(
	packageJson.scripts["verify:release"].includes("npm run typecheck") &&
	packageJson.scripts["verify:release"].includes("npm run build") &&
	packageJson.scripts["verify:release"].includes("npm run verify:contracts") &&
	packageJson.scripts["verify:release"].includes("npm run test:browser"),
	"verify:release must include typecheck, build, contracts, and browser tests"
);

assert(packageJson.main === "./dist/epub.cjs", "package main must point at dist/epub.cjs");
assert(packageJson.module === "./dist/epub.mjs", "package module must point at dist/epub.mjs");
assert(packageJson.browser === "./dist/epub.js", "package browser must point at dist/epub.js");
assert(packageJson.types === "./types/index.d.ts", "package types must point at types/index.d.ts");
assert(packageJson.exports["."].types === packageJson.types, "root export types must match package types");
assert(packageJson.exports["."].import === packageJson.module, "root export import must match package module");
assert(packageJson.exports["."].require === packageJson.main, "root export require must match package main");
assert(packageJson.exports["."].default === packageJson.module, "root export default must match package module");

assertFile("vite.config.mjs");
assertFile("vite.umd.config.mjs");
assertFile("vitest.browser.config.mjs");
assertFile("types/index.d.ts");
assertFile("types/epub.d.ts");
assertFile("types/epubjs-tests.ts");
assertFile("types/global-namespace-tests.ts");
assertFile("test/browser/public-api.test.js");
assertFile("test/browser/umd-global.test.js");

assert(tsconfig.include.includes("src/**/*.ts"), "tsconfig must include TypeScript source files");
assert(tsconfig.include.includes("types/**/*.d.ts"), "tsconfig must include declaration files");
assert(tsconfig.include.includes("types/**/*-tests.ts"), "tsconfig must include type tests");

assert(typeTests.includes("type PublicRootAssertions"), "type tests must assert the public root surface");
assert(typeTests.includes("RootBookInput"), "type tests must assert root BookInput type export");
assert(typeTests.includes("ePub(rootBlobInput"), "type tests must cover root Blob input overload");
assert(typeTests.includes("ePub(rootOptions)"), "type tests must cover root options-only overload");
assert(
	sourceRoot.includes("BookLoaded") && sourceRoot.includes("BookLoading") && sourceRoot.includes("BookReady"),
	"source root must export Book loaded/loading/ready types"
);
assert(typeTests.includes("RootBookReady"), "type tests must assert root BookReady type export");
assert(typeTests.includes("BookLoading[\"metadata\"]"), "type tests must assert Book loading metadata typing");
assert(typeTests.includes("BookLoaded[\"metadata\"]"), "type tests must assert Book loaded metadata typing");
assert(typeTests.includes("BookLoading[\"manifest\"]"), "type tests must assert Book loading manifest typing");
assert(typeTests.includes("BookLoaded[\"manifest\"]"), "type tests must assert Book loaded manifest typing");
assert(
	bookSource.includes("export type BookReady = [") &&
	typeTests.includes("Book[\"ready\"], Promise<BookReady> | undefined") &&
	typeTests.includes("const bookReady: Promise<BookReady> | undefined = book.ready"),
	"BookReady tuple and ready promise typing must stay covered"
);
assert(typeTests.includes("RootContainerDocument"), "type tests must assert root Container type exports");
assert(
	sourceRoot.includes("ContainerDocument") && sourceRoot.includes("default as Container"),
	"source root must export Container public types"
);
assert(typeTests.includes("RootDisplayOptions"), "type tests must assert root DisplayOptions type export");
assert(sourceRoot.includes("default as DisplayOptions"), "source root must export DisplayOptions public type");
assert(typeTests.includes("RootRenditionOptions"), "type tests must assert root Rendition type exports");
assert(typeTests.includes("RootRenditionLocationPart"), "type tests must assert root Rendition location part type export");
assert(typeTests.includes("RootRenditionVerticalRlDebugState"), "type tests must assert root Rendition vertical-rl debug state type export");
assert(typeTests.includes("displayedLocation"), "type tests must cover DisplayedLocation compatibility typing");
assert(
	sourceRoot.includes("DisplayedLocation") &&
	sourceRoot.includes("RenditionLocationPart") &&
	sourceRoot.includes("RenditionOptions") &&
	sourceRoot.includes("RenditionLayoutProperties") &&
	sourceRoot.includes("RenditionVerticalRlDebugState"),
	"source root must export Rendition public types"
);
assert(typeTests.includes("ReturnType<Rendition[\"debugVerticalRlPage\"]>, RenditionVerticalRlDebugState"), "type tests must assert Rendition vertical-rl debug return typing");
assert(typeTests.includes("const renditionDebugState: RenditionVerticalRlDebugState = rendition.debugVerticalRlPage()"), "type tests must cover Rendition vertical-rl debug state usage");
assert(
	typeTests.includes("RootNavigation") &&
	typeTests.includes("RootNavItem") &&
	typeTests.includes("RootLandmarkItem") &&
	typeTests.includes("RootNavigationDocument") &&
	typeTests.includes("RootNavigationInput") &&
	typeTests.includes("RootNavigationInputItem"),
	"type tests must assert root Navigation type exports"
);
assert(
	sourceRoot.includes("default as Navigation") &&
	sourceRoot.includes("LandmarkItem") &&
	sourceRoot.includes("NavigationInput") &&
	sourceRoot.includes("NavigationInputItem") &&
	sourceRoot.includes("NavItem") &&
	sourceRoot.includes("NavigationDocument"),
	"source root must export Navigation public types"
);
assert(
	typeTests.includes("RootPageList") &&
	typeTests.includes("RootPageListDocument") &&
	typeTests.includes("RootPageListItem") &&
	typeTests.includes("RootPageLookup") &&
	typeTests.includes("RootPageReverseLookup") &&
	typeTests.includes("RootPageValue"),
	"type tests must assert root PageList type exports"
);
assert(
	sourceRoot.includes("default as PageList") &&
	sourceRoot.includes("PageListDocument") &&
	sourceRoot.includes("PageListItem") &&
	sourceRoot.includes("PageLookup") &&
	sourceRoot.includes("PageReverseLookup") &&
	sourceRoot.includes("PageValue"),
	"source root must export PageList public types"
);
assert(
	typeTests.includes("RootPath") &&
	typeTests.includes("RootParsedPath"),
	"type tests must assert root Path type exports"
);
assert(
	sourceRoot.includes("ParsedPath") && sourceRoot.includes("default as Path"),
	"source root must export Path public types"
);
assert(
	typeTests.includes("RootUrl") &&
	typeTests.includes("RootUrlBase"),
	"type tests must assert root Url type exports"
);
assert(
	sourceRoot.includes("UrlBase") && sourceRoot.includes("default as Url"),
	"source root must export Url public types"
);
assert(
	typeTests.includes("RootLinkCallback") &&
	typeTests.includes("RootSectionLike"),
	"type tests must assert root replacements type exports"
);
assert(
	sourceRoot.includes("LinkCallback") &&
	sourceRoot.includes("SectionLike") &&
	sourceRoot.includes("replaceBase") &&
	sourceRoot.includes("replaceCanonical") &&
	sourceRoot.includes("replaceLinks") &&
	sourceRoot.includes("replaceMeta") &&
	sourceRoot.includes("substitute"),
	"source root must export replacements public helpers"
);
assert(
	typeTests.includes("RootSection") &&
	typeTests.includes("RootGlobalLayout") &&
	typeTests.includes("RootSectionLayoutSettings") &&
	typeTests.includes("RootSectionHookSet") &&
	typeTests.includes("RootSectionRequest") &&
	typeTests.includes("RootSectionSearchResult") &&
	typeTests.includes("RootSpineItem"),
	"type tests must assert root Section type exports"
);
assert(
	sourceRoot.includes("default as Section") &&
	sourceRoot.includes("GlobalLayout") &&
	sourceRoot.includes("SectionLayoutSettings") &&
	sourceRoot.includes("SectionHookSet") &&
	sourceRoot.includes("SectionRequest") &&
	sourceRoot.includes("SectionSearchResult") &&
	sourceRoot.includes("SpineItem"),
	"source root must export Section public types"
);
assert(
	stageSource.includes("dir?: string") &&
		stageSource.includes("[key: string]: unknown") &&
		stageSource.includes("extend(this.settings, options)") &&
		!stageSource.includes("[key: string]: any") &&
		!stageSource.includes("(extend as any)(this.settings, options)"),
	"Stage helper options must keep typed extension bridge"
);
assert(
	snapSource.includes("type DeferredLike<T = unknown>") &&
		snapSource.includes("const Defer = defer as unknown as { new<T = unknown>(): DeferredLike<T>; }") &&
		snapSource.includes("type TouchWindow = Window &") &&
		snapSource.includes("type WebKitOverflowStyle = CSSStyleDeclaration") &&
		snapSource.includes("export type ManagerLike =") &&
		snapSource.includes("emit(type: string, ...args: unknown[]): void") &&
		snapSource.includes("extend<SnapSettings>({") &&
		snapSource.includes("(this.element.style as WebKitOverflowStyle).WebkitOverflowScrolling = \"touch\"") &&
		snapSource.includes("const touchWindow = window as TouchWindow") &&
		snapSource.includes("snap(howMany=0): Promise<void>") &&
		snapSource.includes("smoothScrollTo(destination: number): Promise<void>") &&
		snapSource.includes("const deferred = new Defer<void>()") &&
		!snapSource.includes("emit(type: string, ...args: any[]): void") &&
		!snapSource.includes("(extend as any)") &&
		!snapSource.includes("(this.element.style as any)") &&
		!snapSource.includes("(window as any).DocumentTouch") &&
		!snapSource.includes("snap(howMany=0): Promise<any>") &&
		!snapSource.includes("smoothScrollTo(destination: number): Promise<any>"),
	"Snap helper must keep typed touch, event, settings, and promise bridges"
);
assert(
	debounceTypes.includes("T extends (...args: unknown[]) => unknown") &&
		debounceTypes.includes("flush(): ReturnType<T>") &&
		!debounceTypes.includes("any[]") &&
		!debounceTypes.includes("=> any") &&
		throttleTypes.includes("T extends (...args: unknown[]) => unknown") &&
		throttleTypes.includes("flush(): ReturnType<T>") &&
		!throttleTypes.includes("any[]") &&
		!throttleTypes.includes("=> any") &&
		typeTests.includes("type LodashBridgeAssertions") &&
		typeTests.includes("Parameters<typeof debounce<(...args: unknown[]) => unknown>>[0]") &&
		typeTests.includes("Parameters<typeof throttle<(...args: unknown[]) => unknown>>[0]") &&
		typeTests.includes("ReturnType<typeof debouncedCallback.flush>, string") &&
		typeTests.includes("ReturnType<typeof throttledCallback.flush>, number"),
	"lodash debounce/throttle declarations and type tests must keep unknown variadic and ReturnType parity"
);
assert(
	sectionSource.includes("type DeferConstructor = new <T = unknown>()") &&
	sectionSource.includes("reject(error?: unknown): void") &&
	sectionSource.includes("type HookConstructor = new (context?: unknown) => Hook") &&
	!sectionSource.includes("reject(error?: any): void") &&
	!sectionSource.includes("type HookConstructor = new (context?: any) => Hook"),
	"source Section must keep deferred rejection and Hook constructor context typed as unknown"
);
assert(
	typeTests.includes("RootSpine") &&
	typeTests.includes("RootSpineLookup") &&
	typeTests.includes("RootSpineManifestItem") &&
	typeTests.includes("RootSpinePackage") &&
	typeTests.includes("RootSpinePackageItem") &&
	typeTests.includes("RootSpineResolver"),
	"type tests must assert root Spine type exports"
);
assert(
	sourceRoot.includes("default as Spine") &&
	sourceRoot.includes("SpineLookup") &&
	sourceRoot.includes("SpineManifestItem") &&
	sourceRoot.includes("SpinePackage") &&
	sourceRoot.includes("SpinePackageItem") &&
	sourceRoot.includes("SpineResolver"),
	"source root must export Spine public types"
);
assert(
	spineSource.includes("type HookConstructor = new (context?: unknown) => Hook") &&
	!spineSource.includes("type HookConstructor = new (context?: any) => Hook"),
	"source Spine must keep Hook constructor context typed as unknown"
);
assert(
	typeTests.includes("RootMapping") &&
	typeTests.includes("RootEpubCFIPair") &&
	typeTests.includes("RootMappingAxis") &&
	typeTests.includes("RootMappingContents") &&
	typeTests.includes("RootMappingDirection") &&
	typeTests.includes("RootMappingLayout") &&
	typeTests.includes("RootMappingSection") &&
	typeTests.includes("RootMappingTextNodeWalker") &&
	typeTests.includes("RootMappingView") &&
	typeTests.includes("RootRangePair"),
	"type tests must assert root Mapping type exports"
);
assert(
	sourceRoot.includes("default as Mapping") &&
	sourceRoot.includes("EpubCFIPair") &&
	sourceRoot.includes("MappingAxis") &&
	sourceRoot.includes("MappingContents") &&
	sourceRoot.includes("MappingDirection") &&
	sourceRoot.includes("MappingLayout") &&
	sourceRoot.includes("MappingSection") &&
	sourceRoot.includes("MappingTextNodeWalker") &&
	sourceRoot.includes("MappingView") &&
	sourceRoot.includes("RangePair"),
	"source root must export Mapping public types"
);
assert(
	typeTests.includes("RootLocations") &&
	typeTests.includes("RootLocationInput") &&
	typeTests.includes("RootLocationRange") &&
	typeTests.includes("RootLocationsRequest") &&
	typeTests.includes("RootWordLocation"),
	"type tests must assert root Locations type exports"
);
assert(
	sourceRoot.includes("default as Locations") &&
	sourceRoot.includes("LocationInput") &&
	sourceRoot.includes("LocationRange") &&
	sourceRoot.includes("LocationsRequest") &&
	sourceRoot.includes("WordLocation"),
	"source root must export Locations public types"
);
assert(
	locationsSource.includes("LocationsRequest = (...args: unknown[]) => Promise<unknown>") &&
	locationsTypes.includes("LocationsRequest = (...args: unknown[]) => Promise<unknown>") &&
	typeTests.includes("LocationsRequest, (...args: unknown[]) => Promise<unknown>") &&
	typeTests.includes("Promise<unknown> = locationsRequest"),
	"LocationsRequest source, declarations, and type tests must keep unknown argument and result parity"
);
assert(
	locationsSource.includes('import type { EpubCFIStep } from "./epubcfi"') &&
		locationsSource.includes("findNode(steps: EpubCFIStep[], doc: Document): Node") &&
		locationsSource.includes("steps: EpubCFIStep[]") &&
		!locationsSource.includes("findNode(steps: any[], doc: Document): Node") &&
		!locationsSource.includes("steps: any[]"),
	"Locations source must keep EpubCFIStart CFI steps typed"
);
assert(
	locationsSource.includes("type DeferConstructor = new <T = unknown>()") &&
		locationsSource.includes("new (defer as unknown as DeferConstructor)<string[]>()") &&
		locationsSource.includes("new (defer as unknown as DeferConstructor)<WordLocation[]>()") &&
		!locationsSource.includes("new (defer as any)()"),
	"Locations source must keep deferred bridge typed"
);
assert(
	typeTests.includes("RootThemes") &&
	typeTests.includes("RootInjectedThemes") &&
	typeTests.includes("RootTheme") &&
	typeTests.includes("RootThemeInput") &&
	typeTests.includes("RootThemeOverride") &&
	typeTests.includes("RootThemeRules") &&
	typeTests.includes("RootThemesContent") &&
	typeTests.includes("RootThemesRendition"),
	"type tests must assert root Themes type exports"
);
assert(
	sourceRoot.includes("default as Themes") &&
	sourceRoot.includes("InjectedThemes") &&
	sourceRoot.includes("ThemeInput") &&
	sourceRoot.includes("ThemeOverride") &&
	sourceRoot.includes("ThemeRules") &&
	sourceRoot.includes("ThemesContent") &&
	sourceRoot.includes("ThemesRendition"),
	"source root must export Themes public types"
);
assert(
	typeTests.includes("RootResources") &&
	typeTests.includes("RootReplacementMode") &&
	typeTests.includes("RootResourceArchive") &&
	typeTests.includes("RootResourceArchiveInput") &&
	typeTests.includes("RootResourceManifest") &&
	typeTests.includes("RootResourceManifestItem") &&
	typeTests.includes("RootResourceOptions") &&
	typeTests.includes("RootResourceRequest") &&
	typeTests.includes("RootResourceResolver") &&
	typeTests.includes("RootResourceSettings"),
	"type tests must assert root Resources type exports"
);
assert(
	sourceRoot.includes("default as Resources") &&
	sourceRoot.includes("ReplacementMode") &&
	sourceRoot.includes("ResourceArchive") &&
	sourceRoot.includes("ResourceArchiveInput") &&
	sourceRoot.includes("ResourceManifest") &&
	sourceRoot.includes("ResourceManifestItem") &&
	sourceRoot.includes("ResourceOptions") &&
	sourceRoot.includes("ResourceRequest") &&
	sourceRoot.includes("ResourceResolver") &&
	sourceRoot.includes("ResourceSettings"),
	"source root must export Resources public types"
);
assert(
	typeTests.includes("RootStore") &&
	typeTests.includes("RootStoreData") &&
	typeTests.includes("RootStoreHeaders") &&
	typeTests.includes("RootStoreMarkupRequestType") &&
	typeTests.includes("RootStoreRequest") &&
	typeTests.includes("RootStoreRequestResponse") &&
	typeTests.includes("RootStoreRequestType") &&
	typeTests.includes("RootStoreResolver") &&
	typeTests.includes("RootStoreResource") &&
	typeTests.includes("RootStoreResources") &&
	typeTests.includes("RootStoreStorage") &&
	typeTests.includes("RootStoreUrlOptions"),
	"type tests must assert root Store type exports"
);
assert(
	sourceRoot.includes("default as Store") &&
	sourceRoot.includes("StoreData") &&
	sourceRoot.includes("StoreHeaders") &&
	sourceRoot.includes("StoreMarkupRequestType") &&
	sourceRoot.includes("StoreRequest") &&
	sourceRoot.includes("StoreRequestResponse") &&
	sourceRoot.includes("StoreRequestType") &&
	sourceRoot.includes("StoreResolver") &&
	sourceRoot.includes("StoreResource") &&
	sourceRoot.includes("StoreResources") &&
	sourceRoot.includes("StoreStorage") &&
	sourceRoot.includes("StoreUrlOptions"),
	"source root must export Store public types"
);
assert(
	typeTests.includes("RootArchive") &&
	typeTests.includes("RootArchiveEntry") &&
	typeTests.includes("RootArchiveInput") &&
	typeTests.includes("RootArchiveMarkupRequestType") &&
	typeTests.includes("RootArchiveRequestType") &&
	typeTests.includes("RootArchiveUrlOptions") &&
	typeTests.includes("RootArchiveZip") &&
	typeTests.includes("RootArchiveZipOptions"),
	"type tests must assert root Archive type exports"
);
assert(
	sourceRoot.includes("default as Archive") &&
	sourceRoot.includes("ArchiveEntry") &&
	sourceRoot.includes("ArchiveInput") &&
	sourceRoot.includes("ArchiveMarkupRequestType") &&
	sourceRoot.includes("ArchiveRequestType") &&
	sourceRoot.includes("ArchiveUrlOptions") &&
	sourceRoot.includes("ArchiveZip") &&
	sourceRoot.includes("ArchiveZipOptions"),
	"source root must export Archive public types"
);
assert(
	typeTests.includes("RootPackaging") &&
	typeTests.includes("RootPackagingJsonManifest") &&
	typeTests.includes("RootPackagingJsonManifestBase") &&
	typeTests.includes("RootPackagingManifest") &&
	typeTests.includes("RootPackagingManifestItem") &&
	typeTests.includes("RootPackagingManifestObject") &&
	typeTests.includes("RootPackagingMetadata") &&
	typeTests.includes("RootPackagingMetadataObject") &&
	typeTests.includes("RootPackagingObject") &&
	typeTests.includes("RootPackagingSpineItem") &&
	typeTests.includes("RootPackagingTocItem"),
	"type tests must assert root Packaging type exports"
);
assert(
	sourceRoot.includes("default as Packaging") &&
	sourceRoot.includes("PackagingJsonManifest") &&
	sourceRoot.includes("PackagingJsonManifestBase") &&
	sourceRoot.includes("PackagingManifest") &&
	sourceRoot.includes("PackagingManifestItem") &&
	sourceRoot.includes("PackagingManifestObject") &&
	sourceRoot.includes("PackagingMetadata") &&
	sourceRoot.includes("PackagingMetadataObject") &&
	sourceRoot.includes("PackagingObject") &&
	sourceRoot.includes("PackagingSpineItem") &&
	sourceRoot.includes("PackagingTocItem"),
	"source root must export Packaging public types"
);
assert(typeTests.includes("type CoreClassAssertions"), "type tests must assert the core class surface");
assert(typeTests.includes("type LayoutAssertions"), "type tests must assert the Layout public surface");
assert(
	typeTests.includes("RootLayoutContent") &&
	typeTests.includes("RootLayoutCount") &&
	typeTests.includes("RootLayoutProps") &&
	typeTests.includes("RootLayoutSettings"),
	"type tests must assert root Layout type exports"
);
assert(typeTests.includes("new Layout()"), "type tests must cover Layout construction without settings");
assert(typeTests.includes("ReturnType<LayoutContent[\"fit\"]>"), "type tests must cover Layout content bridge method return typing");
assert(typeTests.includes("runtimeLayout.format(layoutContent"), "type tests must cover Layout format content typing");
assert(typeTests.includes("runtimeLayout.count(4100)"), "type tests must cover Layout count typing");
assert(typeTests.includes("ReturnType<Layout[\"emit\"]>, void"), "type tests must assert Layout emit return typing");
assert(typeTests.includes("ReturnType<Layout[\"on\"]>, unknown"), "type tests must assert Layout on return typing");
assert(typeTests.includes("ReturnType<Layout[\"off\"]>, unknown"), "type tests must assert Layout off return typing");
assert(typeTests.includes("ReturnType<Layout[\"once\"]>, unknown"), "type tests must assert Layout once return typing");
assert(typeTests.includes("EpubLayoutSettings[\"spread\"], string | boolean | undefined"), "type tests must assert Layout settings boolean spread typing");
assert(typeTests.includes("Parameters<Layout[\"spread\"]>, [spread?: string | boolean | undefined, min?: number | undefined]"), "type tests must assert Layout spread boolean parameter typing");
assert(typeTests.includes("const layoutBooleanSpread: boolean = runtimeLayout.spread"), "type tests must cover Layout boolean spread usage");
assert(typeTests.includes("const layoutEmit: void = runtimeLayout.emit"), "type tests must cover Layout emit usage");
assert(typeTests.includes("const layoutOn: unknown = runtimeLayout.on"), "type tests must cover Layout on usage");
assert(typeTests.includes("const layoutOff: unknown = runtimeLayout.off"), "type tests must cover Layout off usage");
assert(typeTests.includes("const layoutOnce: unknown = runtimeLayout.once"), "type tests must cover Layout once usage");
assert(
	layoutSource.includes("spread?: string | boolean") &&
	layoutSource.includes("spread(spread?: string | boolean, min?: number): boolean") &&
	layoutTypes.includes("spread?: string | boolean") &&
	layoutTypes.includes("spread(spread?: string | boolean, min?: number): boolean"),
	"source and declaration Layout must keep boolean spread type parity"
);
assert(
	layoutSource.includes("emit(type: string, ...args: unknown[]): void") &&
	layoutSource.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
	layoutSource.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
	layoutSource.includes("once(type: string, listener: (...args: unknown[]) => void): unknown"),
	"source Layout must keep EventEmitter method type parity"
);
assert(
	sourceRoot.includes("\tLayout,") &&
	sourceRoot.includes("LayoutContent") &&
	sourceRoot.includes("LayoutCount") &&
	sourceRoot.includes("LayoutProps") &&
	sourceRoot.includes("LayoutSettings"),
	"source root must export Layout public types"
);
assert(typeTests.includes("type NavigationAssertions"), "type tests must assert the Navigation public surface");
assert(typeTests.includes("ConstructorParameters<typeof Navigation>"), "type tests must cover Navigation constructor input typing");
assert(typeTests.includes("new Navigation(legacyNavItems)"), "type tests must cover legacy JSON Navigation construction");
assert(typeTests.includes("legacyNavigation.get()"), "type tests must cover Navigation get() toc overload");
assert(typeTests.includes("legacyNavigation.landmark()"), "type tests must cover Navigation landmark() list overload");
assert(typeTests.includes("Parameters<Navigation[\"parseNavList\"]>"), "type tests must cover Navigation parseNavList typing");
assert(typeTests.includes("ReturnType<Navigation[\"navItem\"]>, NavItem | undefined"), "type tests must cover Navigation navItem fallback typing");
assert(typeTests.includes("ReturnType<Navigation[\"landmarkItem\"]>, LandmarkItem | undefined"), "type tests must cover Navigation landmarkItem fallback typing");
assert(typeTests.includes("Parameters<Navigation[\"getByIndex\"]>"), "type tests must cover Navigation getByIndex optional index typing");
assert(
	navigationTypes.includes("parseNav(navHtml: NavigationDocument)") &&
	navigationTypes.includes("parseNavList(navListHtml?: Element, parent?: string)") &&
	navigationTypes.includes("navItem(item: Element, parent?: string): NavItem | undefined") &&
	navigationTypes.includes("landmarkItem(item: Element): LandmarkItem | undefined") &&
	navigationTypes.includes("getByIndex(target: string, index: number | undefined, navItems: NavItem[]): NavItem | undefined"),
	"Navigation declarations must match source parser helper signatures"
);
assert(typeTests.includes("type SectionAssertions"), "type tests must assert the Section public surface");
assert(typeTests.includes("new Section(spineItem)"), "type tests must cover Section construction without explicit hooks");
assert(typeTests.includes("section.search(\"Text\")"), "type tests must cover Section search result typing");
assert(typeTests.includes("type SpineAssertions"), "type tests must assert the Spine public surface");
assert(typeTests.includes("spine.unpack(spinePackage"), "type tests must cover Spine unpack package typing");
assert(typeTests.includes("spine.remove(spineSection)"), "type tests must cover Spine remove result typing");
assert(typeTests.includes("Parameters<Spine[\"each\"]>, [callback: (section: Section, index: number, sections: Section[]) => void, thisArg?: unknown]"), "type tests must assert Spine each thisArg unknown typing");
assert(typeTests.includes("const spineEach: void = spine.each"), "type tests must cover Spine each usage");
assert(
	spineSource.includes("each(callback: (section: Section, index: number, sections: Section[]) => void, thisArg?: unknown): void") &&
		spineTypes.includes("each(callback: (section: Section, index: number, sections: Array<Section>) => void, thisArg?: unknown): void"),
	"Spine source and declarations must keep each callback and thisArg type parity"
);
assert(typeTests.includes("type ArchiveAssertions"), "type tests must assert the Archive public surface");
assert(typeTests.includes("RootArchiveZip"), "type tests must assert root Archive zip typing");
assert(typeTests.includes("ArchiveMarkupRequestType, \"xml\" | \"opf\" | \"ncx\" | \"xhtml\" | \"html\" | \"htm\""), "type tests must assert Archive markup request typing");
assert(typeTests.includes("ArchiveZipOptions, { base64?: boolean | string | undefined }"), "type tests must assert Archive zip option typing");
assert(typeTests.includes("ReturnType<Archive[\"request\"]>"), "type tests must assert Archive request fallback typing");
assert(typeTests.includes("ReturnType<Archive[\"handleResponse\"]>"), "type tests must assert Archive response handling fallback typing");
assert(typeTests.includes("archiveZip.loadAsync(archiveInput, archiveZipOptions)"), "type tests must cover ArchiveZip loadAsync option typing");
assert(typeTests.includes("archive.createUrl(\"/OPS/images/cover.jpg\")"), "type tests must cover Archive createUrl optional options typing");
assert(typeTests.includes("archive.handleResponse(\"{\\\"ok\\\":true}\", \"json\")"), "type tests must cover Archive handleResponse typing");
assert(
	archiveSource.includes("request(url: string, type: \"blob\"") &&
	archiveSource.includes("request(url: string, type: ArchiveMarkupRequestType") &&
	archiveSource.includes("@param  {RequestResponse} response") &&
	archiveSource.includes("@return {RequestResponse} the parsed result") &&
	archiveSource.includes("handleResponse(response: string, type: \"json\")") &&
	archiveSource.includes("handleResponse(response: string, type: ArchiveMarkupRequestType") &&
	!archiveSource.includes("@param  {any} response") &&
	!archiveSource.includes("@return {any} the parsed result"),
	"source Archive must expose request and handleResponse overloads without stale any JSDoc"
);
assert(
	archiveSource.includes("type DeferConstructor = new <T = unknown>()") &&
	archiveSource.includes("export type ArchiveInput = ArrayBuffer | Blob | Uint8Array | string") &&
	archiveTypes.includes("export type ArchiveInput = ArrayBuffer | Blob | Uint8Array | string") &&
	archiveSource.includes("base64?: boolean | string") &&
	archiveTypes.includes("base64?: boolean | string") &&
	typeTests.includes("const archiveBlobInput: ArchiveInput = new Blob()") &&
	typeTests.includes("ArchiveZipOptions, { base64?: boolean | string | undefined }") &&
	archiveSource.includes("var deferred = new (defer as unknown as DeferConstructor)<RequestResponse>()") &&
	archiveSource.includes("var deferred = new (defer as unknown as DeferConstructor)<string>()") &&
	archiveSource.includes("var response: Promise<Blob | string> | undefined") &&
	archiveSource.includes("var tempUrl: string") &&
	!archiveSource.includes("promise: Promise<any>") &&
	!archiveSource.includes("var response: Promise<any> | undefined"),
	"source Archive must keep typed deferred and response bridge handling"
);
assert(
	jszipTypes.includes("loadAsync(input: ArrayBuffer | Uint8Array | string, options?: { base64?: boolean }): Promise<JSZip>") &&
		!jszipTypes.includes("loadAsync(input: ArrayBuffer | Uint8Array | string, options?: { base64?: boolean }): Promise<any>"),
	"JSZip dist declaration must keep loadAsync result typed"
);
assert(typeTests.includes("type PackagingAssertions"), "type tests must assert the Packaging public surface");
assert(typeTests.includes("RootPackagingObject"), "type tests must assert root Packaging object typing");
assert(typeTests.includes("PackagingJsonManifestBase, { metadata: PackagingMetadataObject; resources: PackagingManifestItem[]; toc: PackagingTocItem[] }"), "type tests must assert Packaging JSON manifest base typing");
assert(typeTests.includes("new Packaging()"), "type tests must cover Packaging construction without a document");
assert(typeTests.includes("packaging.load(packagingJson)"), "type tests must cover Packaging JSON manifest loading");
assert(typeTests.includes("packaging.load(packagingSpineJson)"), "type tests must cover Packaging JSON manifest spine fallback loading");
assert(typeTests.includes("ReturnType<Packaging[\"destroy\"]>"), "type tests must cover Packaging destroy return typing");
assert(typeTests.includes("type DisplayOptionsAssertions"), "type tests must assert the DisplayOptions public surface");
assert(typeTests.includes("RootDisplayOptions"), "type tests must assert root DisplayOptions class typing");
assert(typeTests.includes("new DisplayOptions()"), "type tests must cover DisplayOptions construction without a document");
assert(typeTests.includes("displayOptions.parse(parsedDocument)"), "type tests must cover DisplayOptions parse return typing");
assert(typeTests.includes("type ContainerAssertions"), "type tests must assert the Container public surface");
assert(typeTests.includes("RootContainer"), "type tests must assert root Container class typing");
assert(typeTests.includes("new Container()"), "type tests must cover Container construction without a document");
assert(typeTests.includes("container.parse(containerDocument)"), "type tests must cover Container parse argument typing");
assert(typeTests.includes("type PathAssertions"), "type tests must assert the Path public surface");
assert(typeTests.includes("RootPath"), "type tests must assert root Path class typing");
assert(typeTests.includes("new Path(\"/OPS/Text/chapter.xhtml\")"), "type tests must cover Path construction typing");
assert(typeTests.includes("pathHelper.isAbsolute()"), "type tests must cover Path optional isAbsolute typing");
assert(typeTests.includes("pathHelper.splitPath(\"OPS/Text/chapter.xhtml\")"), "type tests must cover Path splitPath array typing");
assert(typeTests.includes("type UrlAssertions"), "type tests must assert the Url public surface");
assert(typeTests.includes("RootUrl"), "type tests must assert root Url class typing");
assert(typeTests.includes("new Url(\"https://example.com/OPS/Text/chapter.xhtml?debug=true\")"), "type tests must cover Url construction without a base");
assert(typeTests.includes("new Url(\"OPS/Text/chapter.xhtml\", urlBase)"), "type tests must cover Url false base typing");
assert(typeTests.includes("urlHelper.path()"), "type tests must cover Url path return typing");
assert(typeTests.includes("type ReplacementsAssertions"), "type tests must assert the replacements helper public surface");
assert(typeTests.includes("rootReplaceLinks"), "type tests must assert root replacement helper typing");
assert(typeTests.includes("replaceLinks(parsedDocument.documentElement, linkCallback"), "type tests must cover replaceLinks element/callback typing");
assert(typeTests.includes("substitute(\"url(cover.jpg)\", [\"cover.jpg\"], [\"blob:cover\"])"), "type tests must cover substitute string return typing");
assert(typeTests.includes("type QueueAssertions"), "type tests must assert the Queue public surface");
assert(
	typeTests.includes("RootQueue") &&
	typeTests.includes("RootQueuedItem") &&
	typeTests.includes("RootQueueTask"),
	"type tests must assert root Queue type exports"
);
assert(typeTests.includes("new Queue({ prefix: \"ctx\" })"), "type tests must cover Queue optional context construction");
assert(typeTests.includes("queue.enqueue(queueTask, \"ready\")"), "type tests must cover Queue enqueue variadic typing");
assert(typeTests.includes("new Task((): void => undefined)"), "type tests must cover exported Task construction typing");
assert(typeTests.includes("ConstructorParameters<typeof Queue>, [context?: unknown]"), "type tests must assert Queue context typing");
assert(typeTests.includes("ReturnType<Queue[\"enqueue\"]>, Promise<unknown>"), "type tests must assert Queue enqueue unknown result typing");
assert(typeTests.includes("ReturnType<Queue[\"flush\"]>, Promise<unknown> | boolean | undefined"), "type tests must assert Queue flush unknown result typing");
assert(typeTests.includes("QueueTask, (...args: unknown[]) => unknown"), "type tests must assert QueueTask unknown parameter and return typing");
assert(typeTests.includes("Parameters<Queue[\"enqueue\"]>, unknown[]"), "type tests must assert Queue enqueue unknown variadic typing");
assert(typeTests.includes("ConstructorParameters<typeof Task>, [task: QueueTask, args?: unknown[] | undefined, context?: unknown]"), "type tests must assert Queue Task constructor unknown typing");
assert(typeTests.includes("const taskWrapper: (...args: unknown[]) => Promise<unknown> = new Task"), "type tests must cover Queue Task wrapper unknown return typing");
assert(
	queueSource.includes("QueueTask = (...args: unknown[]) => unknown") &&
		queueSource.includes("enqueue(...items: unknown[]): Promise<unknown>") &&
		queueSource.includes("constructor(task: QueueTask, args?: unknown[], context?: unknown)") &&
		queueTypes.includes("QueueTask = (...args: unknown[]) => unknown") &&
		queueTypes.includes("enqueue(...items: unknown[]): Promise<unknown>") &&
		queueTypes.includes("new(task: QueueTask, args?: unknown[], context?: unknown): (...args: unknown[]) => Promise<unknown>"),
	"Queue source and declarations must keep unknown variadic and Task wrapper typing"
);
assert(
	sourceRoot.includes("QueuedItem") && sourceRoot.includes("QueueTask") && sourceRoot.includes("default as Queue"),
	"source root must export Queue public types"
);
assert(typeTests.includes("type HookAssertions"), "type tests must assert the Hook public surface");
assert(
	typeTests.includes("RootHook") &&
	typeTests.includes("RootHookRegistration") &&
	typeTests.includes("RootHooksObject") &&
	typeTests.includes("RootHookTask"),
	"type tests must assert root Hook type exports"
);
assert(typeTests.includes("new Hook({ prefix: \"ctx\" })"), "type tests must cover Hook optional context construction");
assert(typeTests.includes("hook.register(hookTask, hookRegistration)"), "type tests must cover Hook variadic registration typing");
assert(typeTests.includes("hook.trigger(\"ready\")"), "type tests must cover Hook trigger result typing");
assert(typeTests.includes("ConstructorParameters<typeof Hook>, [context?: unknown]"), "type tests must assert Hook context typing");
assert(typeTests.includes("ReturnType<Hook[\"trigger\"]>, Promise<unknown[]>"), "type tests must assert Hook trigger unknown result typing");
assert(typeTests.includes("HookTask, (...args: unknown[]) => unknown"), "type tests must assert HookTask unknown parameter and return typing");
assert(typeTests.includes("Parameters<Hook[\"trigger\"]>, unknown[]"), "type tests must assert Hook trigger unknown variadic typing");
assert(
	hookSource.includes("HookTask = (...args: unknown[]) => unknown") &&
		hookSource.includes("trigger(...items: unknown[]): Promise<unknown[]>") &&
		hookSource.includes("@param {unknown} context scope of this") &&
		!hookSource.includes("@param {any} context scope of this") &&
		hookTypes.includes("HookTask = (...args: unknown[]) => unknown") &&
		hookTypes.includes("trigger(...args: unknown[]): Promise<unknown[]>"),
	"Hook source and declarations must keep unknown context and variadic typing"
);
assert(
	sourceRoot.includes("HookRegistration") &&
	sourceRoot.includes("HookTask") &&
	sourceRoot.includes("HooksObject") &&
	sourceRoot.includes("default as Hook"),
	"source root must export Hook public types"
);
assert(typeTests.includes("type PageListAssertions"), "type tests must assert the PageList public surface");
assert(typeTests.includes("RootPageValue"), "type tests must assert root PageList value typing");
assert(typeTests.includes("new PageList()"), "type tests must cover PageList construction without a document");
assert(typeTests.includes("pageList.process(pageListItems)"), "type tests must cover PageList item processing");
assert(typeTests.includes("pageList.pageFromCfi"), "type tests must cover PageList CFI lookup typing");
assert(typeTests.includes("PageLookup, Record<PageValue, string>"), "type tests must assert PageLookup PageValue key typing");
assert(typeTests.includes("PageReverseLookup, Record<PageValue, PageValue>"), "type tests must assert PageReverseLookup PageValue key typing");
assert(typeTests.includes("pageList.cfiFromPage(1)"), "type tests must cover PageList numeric cfiFromPage lookup typing");
assert(typeTests.includes("pageList.hrefFromPage(1)"), "type tests must cover PageList numeric hrefFromPage lookup typing");
assert(typeTests.includes("ReturnType<PageList[\"destroy\"]>"), "type tests must cover PageList destroy return typing");
assert(
	pageListSource.includes("export type PageLookup = Record<PageValue, string>") &&
	pageListSource.includes("export type PageReverseLookup = Record<PageValue, PageValue>") &&
	pageListTypes.includes("export type PageLookup = Record<PageValue, string>") &&
	pageListTypes.includes("export type PageReverseLookup = Record<PageValue, PageValue>"),
	"PageList source and declarations must keep lookup aliases keyed by PageValue"
);
assert(typeTests.includes("type LocationsAssertions"), "type tests must assert the Locations public surface");
assert(typeTests.includes("new Locations(spine"), "type tests must cover Locations construction with spine/request typing");
assert(typeTests.includes("Parameters<Locations[\"emit\"]>, [eventName: string, data?: unknown]"), "type tests must assert Locations emit parameter typing");
assert(typeTests.includes("ReturnType<Locations[\"emit\"]>, void"), "type tests must assert Locations emit typing");
assert(typeTests.includes("Parameters<Locations[\"on\"]>, [eventName: string, listener: (...args: unknown[]) => void]"), "type tests must assert Locations on unknown listener typing");
assert(typeTests.includes("ReturnType<Locations[\"on\"]>, unknown"), "type tests must assert Locations on typing");
assert(typeTests.includes("Parameters<Locations[\"off\"]>, [eventName: string, listener: (...args: unknown[]) => void]"), "type tests must assert Locations off unknown listener typing");
assert(typeTests.includes("ReturnType<Locations[\"off\"]>, unknown"), "type tests must assert Locations off typing");
assert(typeTests.includes("Parameters<Locations[\"once\"]>, [eventName: string, listener: (...args: unknown[]) => void]"), "type tests must assert Locations once unknown listener typing");
assert(typeTests.includes("ReturnType<Locations[\"once\"]>, unknown"), "type tests must assert Locations once typing");
assert(typeTests.includes("locations.generateForSection"), "type tests must cover Locations section refinement typing");
assert(typeTests.includes("locations.parseWords"), "type tests must cover Locations word-location typing");
assert(
	locationsSource.includes("emit(eventName: string, data?: unknown): void") &&
	locationsSource.includes("on(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	locationsSource.includes("off(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	locationsSource.includes("once(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	locationsTypes.includes("emit(eventName: string, data?: unknown): void") &&
	locationsTypes.includes("on(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	locationsTypes.includes("off(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	locationsTypes.includes("once(eventName: string, listener: (...args: unknown[]) => void): unknown"),
	"Locations source and declarations must keep EventEmitter method type parity"
);
assert(typeTests.includes("type MappingAssertions"), "type tests must assert the Mapping public surface");
assert(typeTests.includes("new Mapping(mappingLayout"), "type tests must cover Mapping construction typing");
assert(typeTests.includes("Mapping[\"direction\"], MappingDirection"), "type tests must assert Mapping direction alias typing");
assert(typeTests.includes("const mappingDirectionInput: MappingDirection"), "type tests must cover MappingDirection usage");
assert(typeTests.includes("mapping.page(mappingContents"), "type tests must cover Mapping page typing");
assert(typeTests.includes("MappingView[\"section\"], MappingSection"), "type tests must assert MappingView section typing");
assert(typeTests.includes("Parameters<Mapping[\"axis\"]>, [axis?: MappingAxis | undefined]"), "type tests must assert Mapping axis alias typing");
assert(typeTests.includes("const mappingAxisInput: MappingAxis"), "type tests must cover MappingAxis usage");
assert(typeTests.includes("ReturnType<Mapping[\"walk\"]>"), "type tests must cover Mapping walk callback return typing");
assert(typeTests.includes("mapping.rangePairToCfiPair"), "type tests must cover Mapping range-to-CFI typing");
assert(typeTests.includes("const mappingSectionShape: MappingSection"), "type tests must cover MappingSection usage");
assert(
	mappingSource.includes("export interface MappingSection") &&
	mappingSource.includes("section: MappingSection") &&
	mappingTypes.includes("export interface MappingSection") &&
	mappingTypes.includes("section: MappingSection") &&
	mappingSource.includes("direction: MappingDirection") &&
	mappingTypes.includes("direction: MappingDirection") &&
	mappingSource.includes("axis(axis?: MappingAxis): boolean") &&
	mappingTypes.includes("axis(axis?: MappingAxis): boolean") &&
	mappingSource.includes("for (var i = 0; i < count; i++)") &&
	!mappingSource.includes("(count as any).pages"),
	"Mapping source and declarations must keep MappingSection parity"
);
assert(
	mappingSource.includes("type TreeWalkerAcceptNode = (node: Node) => number") &&
		mappingSource.includes("type LegacyTreeWalkerFilter = TreeWalkerAcceptNode") &&
		mappingSource.includes("type LegacyCreateTreeWalker = (") &&
		mappingSource.includes("var treeWalker = (document.createTreeWalker as unknown as LegacyCreateTreeWalker)") &&
		!mappingSource.includes("var safeFilter = filter.acceptNode as any") &&
		!mappingSource.includes("(document.createTreeWalker as any)"),
	"Mapping source must keep legacy TreeWalker bridge typed without any"
);
assert(typeTests.includes("type ThemesAssertions"), "type tests must assert the Themes public surface");
assert(typeTests.includes("new Themes(themesRendition)"), "type tests must cover Themes construction typing");
assert(typeTests.includes("ReturnType<ThemesContent[\"addStylesheet\"]>"), "type tests must cover Themes content bridge method return typing");
assert(typeTests.includes("ReturnType<Themes[\"default\"]>"), "type tests must cover Themes default return typing");
assert(typeTests.includes("themes.register(\"night\", themeRules)"), "type tests must cover Themes rule registration typing");
assert(typeTests.includes("themes.removeOverride(\"font-size\")"), "type tests must cover Themes override removal typing");
assert(typeTests.includes("type AnnotationsAssertions"), "type tests must assert the Annotations public surface");
assert(
	typeTests.includes("RootAnnotations") &&
	typeTests.includes("RootAnnotation") &&
	typeTests.includes("RootAnnotationCallback") &&
	typeTests.includes("RootAnnotationData") &&
	typeTests.includes("RootAnnotationMap") &&
	typeTests.includes("RootAnnotationOptions") &&
	typeTests.includes("RootAnnotationsRendition") &&
	typeTests.includes("RootAnnotationStyles") &&
	typeTests.includes("RootAnnotationType") &&
	typeTests.includes("RootAnnotationView") &&
	typeTests.includes("RootSectionAnnotationMap"),
	"type tests must assert root Annotations type exports"
);
assert(typeTests.includes("new Annotations(annotationsRendition)"), "type tests must cover Annotations construction typing");
assert(typeTests.includes("annotations.highlight(\"epubcfi"), "type tests must cover Annotations highlight typing");
assert(typeTests.includes("annotations.remove(\"epubcfi"), "type tests must cover Annotations removal typing");
assert(typeTests.includes("AnnotationCallback, (...args: unknown[]) => void"), "type tests must assert AnnotationCallback unknown argument typing");
assert(typeTests.includes("AnnotationData, Record<string, unknown>"), "type tests must assert AnnotationData unknown payload typing");
assert(typeTests.includes("ReturnType<AnnotationView[\"highlight\"]>, unknown"), "type tests must assert AnnotationView mark handle typing");
assert(typeTests.includes("ReturnType<AnnotationView[\"unhighlight\"]>, unknown"), "type tests must assert AnnotationView removal handle typing");
assert(typeTests.includes("ReturnType<Annotation[\"attach\"]>, unknown"), "type tests must assert Annotation attach return typing");
assert(typeTests.includes("ReturnType<Annotation[\"detach\"]>, unknown"), "type tests must assert Annotation detach return typing");
assert(typeTests.includes("const attachedMark: unknown = highlightAnnotation.attach"), "type tests must cover Annotation attach unknown usage");
assert(typeTests.includes("const detachedMark: unknown = underlineAnnotation.detach"), "type tests must cover Annotation detach unknown usage");
assert(typeTests.includes("ReturnType<Annotation[\"emit\"]>, void"), "type tests must assert Annotation emit return typing");
assert(typeTests.includes("ReturnType<Annotation[\"on\"]>, unknown"), "type tests must assert Annotation on return typing");
assert(typeTests.includes("ReturnType<Annotation[\"off\"]>, unknown"), "type tests must assert Annotation off return typing");
assert(typeTests.includes("ReturnType<Annotation[\"once\"]>, unknown"), "type tests must assert Annotation once return typing");
assert(typeTests.includes("Parameters<Annotations[\"each\"]>, unknown[]"), "type tests must assert Annotations each unknown argument typing");
assert(typeTests.includes("ReturnType<Annotations[\"each\"]>, void"), "type tests must assert Annotations each return typing");
assert(typeTests.includes("Parameters<Annotation[\"emit\"]>, [type: string, ...args: unknown[]]"), "type tests must assert Annotation emit unknown argument typing");
assert(typeTests.includes("Parameters<Annotation[\"on\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Annotation on unknown listener typing");
assert(typeTests.includes("Parameters<Annotation[\"off\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Annotation off unknown listener typing");
assert(typeTests.includes("Parameters<Annotation[\"once\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Annotation once unknown listener typing");
assert(typeTests.includes("const annotationEmit: void = markAnnotation.emit"), "type tests must cover Annotation emit usage");
assert(typeTests.includes("const annotationOn: unknown = markAnnotation.on"), "type tests must cover Annotation on usage");
assert(typeTests.includes("const annotationOff: unknown = markAnnotation.off"), "type tests must cover Annotation off usage");
assert(typeTests.includes("const annotationOnce: unknown = markAnnotation.once"), "type tests must cover Annotation once usage");
assert(
	annotationsSource.includes("export type AnnotationCallback = (...args: unknown[]) => void") &&
	annotationsSource.includes("export type AnnotationData = Record<string, unknown>") &&
	annotationsSource.includes("type AnnotationCollectionBridge = AnnotationMap") &&
	annotationsSource.includes("highlight(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): unknown") &&
	annotationsSource.includes("unhighlight(cfiRange: string): unknown") &&
	annotationsSource.includes("mark: unknown") &&
	annotationsSource.includes("attach (view: AnnotationView): unknown") &&
	annotationsSource.includes("detach (view?: AnnotationView): unknown") &&
	annotationsSource.includes("each (...args: unknown[]): void") &&
	annotationsSource.includes("(this._annotations as AnnotationCollectionBridge).forEach.apply(this._annotations, args)") &&
	annotationsSource.includes("emit(type: string, ...args: unknown[]): void") &&
	annotationsSource.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
	annotationsSource.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
	annotationsSource.includes("once(type: string, listener: (...args: unknown[]) => void): unknown") &&
	!annotationsSource.includes("(this._annotations as any).forEach.apply") &&
	annotationsTypes.includes("export type AnnotationCallback = (...args: unknown[]) => void") &&
	annotationsTypes.includes("export type AnnotationData = Record<string, unknown>") &&
	annotationsTypes.includes("highlight(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): unknown") &&
	annotationsTypes.includes("unhighlight(cfiRange: string): unknown") &&
	annotationsTypes.includes("mark: unknown") &&
	annotationsTypes.includes("attach(view: AnnotationView): unknown") &&
	annotationsTypes.includes("detach(view?: AnnotationView): unknown") &&
	annotationsTypes.includes("each(...args: unknown[]): void") &&
	annotationsTypes.includes("emit(type: string, ...args: unknown[]): void") &&
	annotationsTypes.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
	annotationsTypes.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
	annotationsTypes.includes("once(type: string, listener: (...args: unknown[]) => void): unknown"),
	"source Annotation must keep EventEmitter method type parity"
);
assert(
	iframeViewSource.includes('import type { AnnotationData, AnnotationStyles } from "../../annotations"') &&
		iframeViewSource.includes('highlight(cfiRange: string, data: AnnotationData = {}, cb?: MarkListener, className = "epubjs-hl", styles: AnnotationStyles = {})') &&
		iframeViewSource.includes('underline(cfiRange: string, data: AnnotationData = {}, cb?: MarkListener, className = "epubjs-ul", styles: AnnotationStyles = {})') &&
		iframeViewSource.includes("mark(cfiRange: string, data: AnnotationData = {}, cb?: MarkListener)") &&
		marksPaneTypes.includes("type MarkData = Record<string, unknown>") &&
		marksPaneTypes.includes("type MarkAttributes = Record<string, string>") &&
		!iframeViewSource.includes("data: Record<string, any> = {}") &&
		!iframeViewSource.includes("styles: Record<string, any> = {}") &&
		!marksPaneTypes.includes("Record<string, any>"),
	"iframe marks and marks-pane declarations must keep annotation payload typing"
);
assert(
	iframeViewSource.includes("type DebugWindow = Window &") &&
		iframeViewSource.includes("type SeamlessIframe = HTMLIFrameElement &") &&
		iframeViewSource.includes("settings: IframeViewSettings") &&
		iframeViewSource.includes("iframe?: SeamlessIframe") &&
		iframeViewSource.includes("highlights: Record<string, StoredPaneMark>") &&
		iframeViewSource.includes("interface IframeView") &&
		iframeViewSource.includes("emit(type: string, ...args: unknown[]): void") &&
		iframeViewSource.includes("locationOf(target: string | EpubCFI)") &&
		!iframeViewSource.includes("[key: string]: any") &&
		iframeViewSource.includes("__EPUB_VRL_DEBUG__?: boolean") &&
		iframeViewSource.includes("execUnsafeLocalFunction(callback: () => void): void") &&
		iframeViewSource.includes("type DisplayReject = (reason?: unknown, view?: IframeView) => void") &&
		iframeViewSource.includes("props?: Record<string, unknown>") &&
		iframeViewSource.includes("update?: (settings: Record<string, unknown>) => void") &&
		iframeViewSource.includes("(window as DebugWindow).__EPUB_VRL_DEBUG__ === true") &&
		iframeViewSource.includes('this.iframe.setAttribute("sandbox", "allow-same-origin")') &&
		iframeViewSource.includes('this.iframe.sandbox.add("allow-scripts")') &&
		iframeViewSource.includes('this.iframe.sandbox.add("allow-popups")') &&
		iframeViewSource.includes("const msApp = (window as DebugWindow).MSApp") &&
		iframeViewSource.includes("const reject = displayed.reject as DisplayReject | null") &&
		!iframeViewSource.includes("(window as any).__EPUB_VRL_DEBUG__") &&
		!iframeViewSource.includes("(window as any).MSApp") &&
		!iframeViewSource.includes('this.iframe.sandbox = "allow-same-origin" as any') &&
		!iframeViewSource.includes('this.iframe.sandbox += " allow-scripts" as any') &&
		!iframeViewSource.includes('this.iframe.sandbox += " allow-popups" as any') &&
		!iframeViewSource.includes("(displayed.reject as any)"),
	"IframeView source must keep debug, sandbox, MSApp, and display rejection bridges typed"
);
assert(
	viewsTests.includes("uses the Windows MSApp write bridge") &&
		viewsTests.includes("rejects display promises when render fails"),
	"views browser tests must cover iframe bridge behavior"
);
assert(
	inlineViewSource.includes("type InlineDisplayReject = (reason?: unknown, view?: InlineView) => void") &&
		inlineViewSource.includes("settings: InlineViewSettings") &&
		inlineViewSource.includes("frame: HTMLElement | null = null") &&
		inlineViewSource.includes("contents?: Contents") &&
		inlineViewSource.includes("interface InlineView") &&
		inlineViewSource.includes("emit(type: string, ...args: unknown[]): void") &&
		inlineViewSource.includes("locationOf(target: string | EpubCFI)") &&
		!inlineViewSource.includes("[key: string]: any") &&
		inlineViewSource.includes("const reject = displayed.reject as InlineDisplayReject | null") &&
		inlineViewSource.includes("function (err: unknown)") &&
		!inlineViewSource.includes("(displayed.reject as any)"),
	"InlineView source must keep state fields, event bridge, and display rejection typed"
);
assert(
	viewsTests.includes("rejects inline display promises when render fails"),
	"views browser tests must cover inline display rejection behavior"
);
assert(
	sourceRoot.includes("default as Annotations") &&
	sourceRoot.includes("Annotation") &&
	sourceRoot.includes("AnnotationCallback") &&
	sourceRoot.includes("AnnotationData") &&
	sourceRoot.includes("AnnotationMap") &&
	sourceRoot.includes("AnnotationOptions") &&
	sourceRoot.includes("AnnotationsRendition") &&
	sourceRoot.includes("AnnotationStyles") &&
	sourceRoot.includes("AnnotationType") &&
	sourceRoot.includes("AnnotationView") &&
	sourceRoot.includes("SectionAnnotationMap"),
	"source root must export Annotations public types"
);
assert(typeTests.includes("type ResourcesAssertions"), "type tests must assert the Resources public surface");
assert(typeTests.includes("RootResourceManifest"), "type tests must assert root Resources manifest typing");
assert(typeTests.includes("new Resources(resourceManifest, resourceOptions)"), "type tests must cover Resources options typing");
assert(typeTests.includes("resources.createCssFile(\"Styles/main.css\", resourceArchiveInput)"), "type tests must cover Resources archive input typing");
assert(typeTests.includes("resources.get(\"Images/cover.jpg\")"), "type tests must cover Resources get replacement typing");
assert(typeTests.includes("function resourceRequest(url: string, type: \"blob\"): Promise<Blob>"), "type tests must cover Resources blob request overload");
assert(typeTests.includes("function resourceRequest(url: string, type: \"text\"): Promise<string>"), "type tests must cover Resources text request overload");
assert(typeTests.includes("ResourceOptions[\"request\"], ResourceRequest | undefined"), "type tests must assert ResourceOptions request typing");
assert(typeTests.includes("ResourceSettings[\"request\"], ResourceRequest | undefined"), "type tests must assert ResourceSettings request typing");
assert(
	resourcesSource.includes("(url: string, type: \"blob\"): Promise<Blob>") &&
	resourcesSource.includes("(url: string, type: \"text\"): Promise<string>") &&
	resourcesSource.includes("return createBase64Url(blob as string, mimeType)") &&
	resourcesTypes.includes("(url: string, type: \"blob\"): Promise<Blob>") &&
	resourcesTypes.includes("(url: string, type: \"text\"): Promise<string>"),
	"Resources source and declarations must keep ResourceRequest overload parity"
);
assert(typeTests.includes("type StoreAssertions"), "type tests must assert the Store public surface");
assert(typeTests.includes("RootStoreUrlOptions"), "type tests must assert root Store URL option typing");
assert(typeTests.includes("StoreRequestResponse, RequestResponse | StoreData"), "type tests must assert Store request response typing");
assert(typeTests.includes("StoreMarkupRequestType, \"xml\" | \"opf\" | \"ncx\" | \"xhtml\" | \"html\" | \"htm\""), "type tests must assert Store markup request typing");
assert(typeTests.includes("function storeRequest(url: string, type: \"binary\""), "type tests must cover Store binary request overload");
assert(typeTests.includes("function storeRequest(url: string, type: \"blob\""), "type tests must cover Store blob request overload");
assert(typeTests.includes("function storeRequest(url: string, type: \"json\""), "type tests must cover Store json request overload");
assert(typeTests.includes("function storeRequest(url: string, type: StoreMarkupRequestType"), "type tests must cover Store markup request overload");
assert(typeTests.includes("ReturnType<Store[\"request\"]>"), "type tests must assert Store request fallback typing");
assert(typeTests.includes("ReturnType<Store[\"retrieve\"]>"), "type tests must assert Store retrieve fallback typing");
assert(typeTests.includes("ReturnType<Store[\"handleResponse\"]>"), "type tests must assert Store response handling fallback typing");
assert(typeTests.includes("Parameters<Store[\"emit\"]>, [eventName: string, ...args: unknown[]]"), "type tests must assert Store EventEmitter emit unknown argument typing");
assert(typeTests.includes("Parameters<Store[\"on\"]>, [eventName: string, listener: (...args: unknown[]) => void]"), "type tests must assert Store EventEmitter on unknown listener typing");
assert(typeTests.includes("Parameters<Store[\"off\"]>, [eventName: string, listener: (...args: unknown[]) => void]"), "type tests must assert Store EventEmitter off unknown listener typing");
assert(typeTests.includes("Parameters<Store[\"once\"]>, [eventName: string, listener: (...args: unknown[]) => void]"), "type tests must assert Store EventEmitter once unknown listener typing");
assert(typeTests.includes("ReturnType<Store[\"on\"]>, unknown"), "type tests must assert Store EventEmitter listener typing");
assert(typeTests.includes("const storeOn: unknown = store.on"), "type tests must cover Store on listener usage");
assert(typeTests.includes("const storeOff: unknown = store.off"), "type tests must cover Store off listener usage");
assert(typeTests.includes("const storeOnce: unknown = store.once"), "type tests must cover Store once listener usage");
assert(typeTests.includes("new Store(\"epubjs-type-store\", storeRequest, storeResolver)"), "type tests must cover Store constructor typing");
assert(typeTests.includes("store.createUrl(\"/OPS/images/cover.jpg\", storeUrlOptions)"), "type tests must cover Store createUrl optional options typing");
assert(
	storeSource.includes("request(url: string, type: \"blob\"") &&
	storeSource.includes("retrieve(url: string, type: \"blob\"") &&
	storeSource.includes("@param  {RequestResponse} response") &&
	storeSource.includes("@return {RequestResponse} the parsed result") &&
	storeSource.includes("handleResponse(response: string, type: \"json\")") &&
	!storeSource.includes("@param  {any} response") &&
	!storeSource.includes("@return {any} the parsed result"),
	"source Store must expose request, retrieve, and handleResponse overloads without stale any JSDoc"
);
assert(
	storeSource.includes("type DeferConstructor = new <T = unknown>()") &&
		storeSource.includes("var deferred = new (defer as unknown as DeferConstructor)<RequestResponse>()") &&
		storeSource.includes("var deferred = new (defer as unknown as DeferConstructor)<string>()") &&
		storeSource.includes("var response: Promise<Blob | string | ArrayBuffer | null | undefined>") &&
		storeSource.includes("var result: RequestResponse") &&
		storeSource.includes("var tempUrl: string") &&
		!storeSource.includes("promise: Promise<any>") &&
		!storeSource.includes("var response: Promise<any>"),
	"source Store must keep typed deferred and response bridge handling"
);
assert(
	storeSource.includes("emit(eventName: string, ...args: unknown[]): void") &&
	storeSource.includes("on(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	storeSource.includes("off(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	storeSource.includes("once(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	storeTypes.includes("emit(eventName: string, ...args: unknown[]): void") &&
	storeTypes.includes("on(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	storeTypes.includes("off(eventName: string, listener: (...args: unknown[]) => void): unknown") &&
	storeTypes.includes("once(eventName: string, listener: (...args: unknown[]) => void): unknown"),
	"Store source and declarations must keep EventEmitter method type parity"
);
assert(
	storeSource.includes("export interface StoreRequest") &&
	storeSource.includes("(url: string, type: \"binary\"") &&
	storeSource.includes("(url: string, type: StoreMarkupRequestType") &&
	storeTypes.includes("export interface StoreRequest") &&
	storeTypes.includes("(url: string, type: \"binary\"") &&
	storeTypes.includes("(url: string, type: StoreMarkupRequestType"),
	"Store source and declarations must keep StoreRequest overload parity"
);
assert(typeTests.includes("RequestMethod"), "type tests must assert request method typing");
assert(typeTests.includes("RootRequestMethod"), "type tests must assert root request method type export");
assert(typeTests.includes("RootRequestResponse"), "type tests must assert root request response type export");
assert(
	sourceRoot.includes("RequestMethod") && sourceRoot.includes("RequestResponse") && sourceRoot.includes("RequestType"),
	"source root must export request public types"
);
assert(
	requestSource.includes("promise: Promise<RequestResponse>") &&
		requestSource.includes("resolve(value?: RequestResponse): void") &&
		requestSource.includes("function request(url: string, type?: RequestType | null, withCredentials?: boolean, headers?: RequestHeaders): Promise<RequestResponse>") &&
		requestSource.includes("var r: RequestResponse") &&
		requestSource.includes("JSON.parse(this.response) as JsonValue") &&
		!requestSource.includes("function request(url: string, type?: RequestType | null, withCredentials?: boolean, headers?: RequestHeaders): Promise<any>"),
	"source request implementation must keep typed RequestResponse deferred and fallback result handling"
);
assert(
	bookSource.includes("type RequestMethod") &&
		bookSource.includes("type RequestHeaders") &&
		bookSource.includes("type RequestResponse") &&
		!bookSource.includes("export type RequestMethod ="),
	"Book source must reuse utils/request public request types"
);
assert(typeTests.includes("InstanceType<typeof ePub.utils.defer"), "type tests must assert generic defer typing");
assert(typeTests.includes("Book[\"loading\"]"), "type tests must assert Book runtime loading state typing");
assert(typeTests.includes("book.loaded?.spine"), "type tests must cover Book loaded spine typing");
assert(typeTests.includes("book.resolve()"), "type tests must cover Book optional resolve path typing");
assert(typeTests.includes("book.unarchive(bookInput)"), "type tests must cover Book unarchive zip typing");
assert(typeTests.includes("ReturnType<Book[\"unarchive\"]>, Promise<ArchiveZip>"), "type tests must assert Book unarchive ArchiveZip return typing");
assert(typeTests.includes("ReturnType<Book[\"load\"]>, Promise<RequestResponse>"), "type tests must cover Book load request response typing");
assert(typeTests.includes("ReturnType<Book[\"openContainer\"]>, Promise<string>"), "type tests must assert Book openContainer package path typing");
assert(typeTests.includes("ReturnType<Book[\"openManifest\"]>, Promise<Book>"), "type tests must assert Book openManifest return typing");
assert(typeTests.includes("ReturnType<Book[\"openPackaging\"]>, Promise<Book>"), "type tests must assert Book openPackaging return typing");
assert(typeTests.includes("const bookContainerPath: Promise<string> = book.openContainer"), "type tests must cover Book openContainer usage");
assert(typeTests.includes("Parameters<Book[\"renderTo\"]>[1], RenditionOptions | undefined"), "type tests must assert Book renderTo options typing");
assert(typeTests.includes("const bookRendition: Rendition = book.renderTo"), "type tests must cover Book renderTo RenditionOptions usage");
assert(typeTests.includes("book.load(\"OPS/package.opf\", \"opf\")"), "type tests must cover Book load XML overload typing");
assert(typeTests.includes("book.load(\"manifest.json\", \"json\")"), "type tests must cover Book load JSON overload typing");
assert(typeTests.includes("book.load(\"OPS/chapter.xhtml\", \"text\")"), "type tests must cover Book load text overload typing");
assert(typeTests.includes("Parameters<Book[\"emit\"]>, [type: string, ...args: unknown[]]"), "type tests must assert Book EventEmitter emit unknown argument typing");
assert(typeTests.includes("Parameters<Book[\"on\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Book EventEmitter on unknown listener typing");
assert(typeTests.includes("Parameters<Book[\"off\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Book EventEmitter off unknown listener typing");
assert(typeTests.includes("Parameters<Book[\"once\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Book EventEmitter once unknown listener typing");
assert(typeTests.includes("ReturnType<Book[\"on\"]>, unknown"), "type tests must assert Book EventEmitter listener typing");
assert(typeTests.includes("const bookOn: unknown = book.on"), "type tests must cover Book on listener usage");
assert(typeTests.includes("const bookOff: unknown = book.off"), "type tests must cover Book off listener usage");
assert(typeTests.includes("const bookOnce: unknown = book.once"), "type tests must cover Book once listener usage");
assert(
	bookSource.includes("emit(type: string, ...args: unknown[]): void") &&
		bookSource.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
		bookSource.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
		bookSource.includes("once(type: string, listener: (...args: unknown[]) => void): unknown") &&
		bookTypes.includes("emit(type: string, ...args: unknown[]): void") &&
		bookTypes.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
		bookTypes.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
		bookTypes.includes("once(type: string, listener: (...args: unknown[]) => void): unknown"),
	"Book source and declarations must keep EventEmitter method type parity"
);
assert(typeTests.includes("ReturnType<Book[\"section\"]>, Section | undefined"), "type tests must assert Book section return typing");
assert(typeTests.includes("const bookSection: Section | undefined = book.section"), "type tests must cover Book section usage");
assert(
	bookSource.includes("section(target: string | number): Section | undefined") &&
		bookTypes.includes("section(target: string): Section | undefined") &&
		bookTypes.includes("section(target: number): Section | undefined"),
	"Book source and declarations must keep section return type parity"
);
assert(
	bookSource.includes("renderTo(element: Element | string, options?: RenditionOptions): Rendition") &&
		bookTypes.includes("renderTo(element: Element, options?: RenditionOptions): Rendition") &&
		bookTypes.includes("renderTo(element: string, options?: RenditionOptions): Rendition"),
	"Book source and declarations must keep renderTo options type parity"
);
assert(
	bookSource.includes("unarchive(input: BookInput | string, encoding?: string): Promise<ArchiveZip>") &&
		bookTypes.includes("unarchive(input: BookInput, encoding?: string): Promise<ArchiveZip>"),
	"Book source and declarations must keep unarchive ArchiveZip return type parity"
);
assert(
	bookSource.includes("load(path: string, type: \"text\"): Promise<string>") &&
		bookTypes.includes("load(path: string, type: \"text\"): Promise<string>") &&
		requestSource.includes("(url: string, type: \"text\", withCredentials?: boolean, headers?: RequestHeaders): Promise<string>") &&
		typeTests.includes("const requestTextLoad: Promise<string> = request"),
	"Book source, declarations, and request helper must keep text load overload parity"
);
assert(
	bookSource.includes("var spineResolver: SpineResolver") &&
		bookSource.includes("var resourceResolver: ResourceResolver") &&
		bookSource.includes("function resourceRequest(url: string, type: \"blob\"): Promise<Blob>") &&
		bookSource.includes("function resourceRequest(url: string, type: \"text\"): Promise<string>") &&
		bookSource.includes("this.locations = new Locations(this.spine, this.load.bind(this))") &&
		bookSource.includes("this.spine!.unpack(this.packaging as unknown as SpinePackage, spineResolver, this.canonical.bind(this))") &&
		!bookSource.includes("new Locations(this.spine as any") &&
		!bookSource.includes("this.spine!.unpack(this.packaging as any") &&
		!bookSource.includes("this.resolve.bind(this) as any") &&
		!bookSource.includes("this.canonical.bind(this) as any") &&
		!bookSource.includes("request: this.request.bind(this) as any") &&
		!bookSource.includes("this.archive.open(input as any, encoding as any)"),
	"Book source must keep typed locations/spine/resource/archive bridges without any"
);
assert(
	bookSource.includes("openContainer(url: string): Promise<string>") &&
		bookTypes.includes("openContainer(url: string): Promise<string>"),
	"Book source and declarations must keep openContainer package path type parity"
);
assert(
	bookSource.includes("import type { RangeObject } from \"./compat/range\"") &&
		bookSource.includes("load(requester: RequestMethod): Promise<Element>") &&
		bookSource.includes("getRange(cfiRange: string | EpubCFI): Promise<Range | RangeObject | null>") &&
		bookSource.includes("return Promise.reject(\"CFI could not be found\")") &&
		bookSource.includes("function (_contents: Element)") &&
		bookTypes.includes("import EpubCFI from \"./epubcfi\"") &&
		bookTypes.includes("import { RangeObject } from \"./compat/range\"") &&
		bookTypes.includes("getRange(cfiRange: string | EpubCFI): Promise<Range | RangeObject | null>") &&
		typeTests.includes("Parameters<Book[\"getRange\"]>, [string | EpubCFI]") &&
		typeTests.includes("ReturnType<Book[\"getRange\"]>, Promise<Range | import('./compat/range').RangeObject | null>") &&
		bookTests.includes("resolves a DOM range for a section CFI") &&
		!bookSource.includes("getRange(cfiRange: string | EpubCFI): Promise<any>") &&
		!bookSource.includes("function (_contents: any)") &&
		!bookSource.includes("load(requester: RequestMethod): Promise<any>"),
	"Book source and declarations must keep getRange return and section bridge typed"
);
assert(
	bookSource.includes("type PackagingTocItem") &&
		bookSource.includes("type PageListDocument") &&
		bookSource.includes("export type BookNavigationPackaging = Packaging &") &&
		bookSource.includes("pageList?: PageListDocument") &&
		bookSource.includes("toc?: PackagingTocItem[]") &&
		bookSource.includes("loadNavigation(packaging: BookNavigationPackaging): Promise<Navigation>") &&
		bookTypes.includes("BookNavigationPackaging") &&
		bookTypes.includes("pageList?: PageListDocument") &&
		bookTypes.includes("toc?: Array<PackagingTocItem>") &&
		bookTypes.includes("loadNavigation(packaging: BookNavigationPackaging): Promise<Navigation>") &&
		sourceRoot.includes("BookNavigationPackaging") &&
		typeIndex.includes("BookNavigationPackaging") &&
		navigationTypes.includes("id?: string") &&
		navigationTypes.includes("href?: string") &&
		typeTests.includes("RootBookNavigationPackaging") &&
		typeTests.includes("Parameters<Book[\"loadNavigation\"]>[0], BookNavigationPackaging") &&
		typeTests.includes("const packagingTocNavigationItems: NavigationInputItem[]") &&
		!bookSource.includes("loadNavigation(packaging: Packaging & { pageList?: any; toc?: any; navPath?: any; ncxPath?: any })") &&
		!bookTypes.includes("loadNavigation(packaging: Packaging): Promise<Navigation>"),
	"Book loadNavigation source and declarations must keep manifest navigation bridge typed without any"
);
assert(
	bookSource.includes("open(input: BookInput, what?: string): Promise<Book>") &&
		bookSource.includes("var opening: Promise<Book>") &&
		bookSource.includes("openEpub(data: BookInput | string, encoding?: string): Promise<Book>") &&
		bookSource.includes("openPackaging(url: string): Promise<Book>") &&
		bookSource.includes("openManifest(url: string): Promise<Book>") &&
		bookSource.includes("replacements(): Promise<void>") &&
		bookSource.includes("this.unpack(this.packaging);") &&
		bookSource.includes("return this;") &&
		bookTypes.includes("open(input: string, what?: string): Promise<Book>") &&
		bookTypes.includes("openEpub(data: BookInput, encoding?: string): Promise<Book>") &&
		bookTypes.includes("openManifest(url: string): Promise<Book>") &&
		bookTypes.includes("openPackaging(url: string): Promise<Book>") &&
		bookTypes.includes("private replacements(): Promise<void>") &&
		bookTests.includes("resolves open with the book instance") &&
		!bookSource.includes("open(input: BookInput, what?: string): Promise<any>") &&
		!bookSource.includes("openEpub(data: BookInput | string, encoding?: string): Promise<any>") &&
		!bookSource.includes("openPackaging(url: string): Promise<any>") &&
		!bookSource.includes("openManifest(url: string): Promise<any>") &&
		!bookSource.includes("replacements(): Promise<any>"),
	"Book source and declarations must keep open and replacement return type parity"
);
assert(typeTests.includes("rendition.determineLayoutProperties"), "type tests must cover Rendition layout property typing");
assert(typeTests.includes("Parameters<Rendition[\"determineLayoutProperties\"]>, [metadata: PackagingMetadata]"), "type tests must assert Rendition metadata parameter typing");
assert(typeTests.includes("Parameters<Rendition[\"layout\"]>, [settings?: RenditionLayoutProperties | Record<string, unknown> | undefined]"), "type tests must assert Rendition layout parameter typing");
assert(typeTests.includes("ReturnType<Rendition[\"layout\"]>, Layout | undefined"), "type tests must assert Rendition layout return typing");
assert(typeTests.includes("const renditionLayout: Layout | undefined = rendition.layout"), "type tests must cover Rendition layout usage");
assert(
	renditionSource.includes("determineLayoutProperties(metadata: PackagingMetadata): LayoutProperties") &&
		renditionTypes.includes("determineLayoutProperties(metadata: PackagingMetadata): LayoutProperties") &&
	renditionSource.includes("layout(settings?: LayoutProperties | Record<string, unknown>): Layout | undefined") &&
		renditionTypes.includes("layout(settings?: LayoutProperties | Record<string, unknown>): Layout | undefined"),
	"Rendition source and declarations must keep metadata/layout settings and return type parity"
);
assert(typeTests.includes("ReturnType<Rendition[\"getContents\"]>, Contents[]"), "type tests must assert Rendition getContents return typing");
assert(
	renditionSource.includes("getContents (): Contents[]") &&
		renditionTypes.includes("getContents(): Contents[]"),
	"Rendition source and declarations must keep getContents return type parity"
);
assert(typeTests.includes("rendition.located([managerLocationItem])"), "type tests must cover Rendition manager location typing");
assert(typeTests.includes("Parameters<Rendition[\"located\"]>, [location: Array<ManagerLocationItem | null | undefined>]"), "type tests must assert Rendition located nullable manager location parameter typing");
assert(typeTests.includes("rendition.located([managerLocationItem, null, undefined])"), "type tests must cover Rendition located nullable manager location usage");
assert(typeTests.includes("Parameters<Rendition[\"moveTo\"]>, [offset: object]"), "type tests must assert Rendition moveTo offset typing");
assert(typeTests.includes("ReturnType<Rendition[\"next\"]>, Promise<void>"), "type tests must assert Rendition next void promise typing");
assert(typeTests.includes("ReturnType<Rendition[\"prev\"]>, Promise<void>"), "type tests must assert Rendition prev void promise typing");
assert(typeTests.includes("Parameters<Rendition[\"setManager\"]>, [manager: Function]"), "type tests must assert Rendition setManager function typing");
assert(
	renditionSource.includes("located(location: Array<ManagerLocationItem | null | undefined>): Location") &&
		renditionSource.includes("type ManagerLocationResult = Array<ManagerLocationItem | null | undefined>") &&
		renditionSource.includes("function isManagerLocationPromise(location: ManagerLocationResult | Promise<ManagerLocationResult>): location is Promise<ManagerLocationResult>") &&
		renditionSource.includes("location.then(function(result: ManagerLocationResult)") &&
		renditionTypes.includes("located(location: Array<ManagerLocationItem | null | undefined>): Location"),
	"Rendition source and declarations must keep located parameter type parity"
);
assert(
	renditionSource.includes("setManager(manager: Function): void") &&
		renditionSource.includes("moveTo(offset: object): void") &&
		renditionSource.includes("next(): Promise<void>") &&
		renditionSource.includes("prev(): Promise<void>") &&
		renditionTypes.includes("setManager(manager: Function): void") &&
		renditionTypes.includes("moveTo(offset: object): void") &&
		renditionTypes.includes("next(): Promise<void>") &&
		renditionTypes.includes("prev(): Promise<void>"),
	"Rendition source and declarations must keep navigation helper type parity"
);
assert(typeTests.includes("rendition.resolveLinkHref(\"#note\""), "type tests must cover Rendition link resolution typing");
assert(typeTests.includes("Parameters<Rendition[\"adjustImages\"]>, [contents: Contents]"), "type tests must assert Rendition adjustImages Contents parameter typing");
assert(typeTests.includes("Parameters<Rendition[\"handleLinks\"]>, [contents: Contents]"), "type tests must assert Rendition handleLinks Contents parameter typing");
assert(typeTests.includes("Parameters<Rendition[\"injectIdentifier\"]>, [doc: Document, section: Section]"), "type tests must assert Rendition injectIdentifier Section parameter typing");
assert(typeTests.includes("Parameters<Rendition[\"injectScript\"]>, [doc: Document, section: Section]"), "type tests must assert Rendition injectScript Section parameter typing");
assert(typeTests.includes("Parameters<Rendition[\"injectStylesheet\"]>, [doc: Document, section: Section]"), "type tests must assert Rendition injectStylesheet Section parameter typing");
assert(typeTests.includes("Parameters<Rendition[\"passEvents\"]>, [contents: Contents]"), "type tests must assert Rendition passEvents Contents parameter typing");
assert(typeTests.includes("Parameters<Rendition[\"resolveLinkHref\"]>, [href: string, contents?: { sectionHref?: string } | undefined]"), "type tests must assert Rendition resolveLinkHref section href parameter typing");
assert(typeTests.includes("ReturnType<Rendition[\"views\"]>, Array<View>"), "type tests must assert Rendition views return typing");
assert(typeTests.includes("const renditionViews: Array<View> = rendition.views"), "type tests must cover Rendition views usage");
assert(
		renditionSource.includes("getRange(cfi: string, ignoreClass?: string): Range | undefined") &&
		renditionSource.includes("adjustImages(contents: Contents): Promise<void>") &&
		renditionSource.includes("handleLinks(contents: Contents): void") &&
		renditionSource.includes("injectIdentifier(doc: Document, _section: Section): void") &&
		renditionSource.includes("injectScript(doc: Document, _section: Section): void") &&
		renditionSource.includes("injectStylesheet(doc: Document, _section: Section): void") &&
		renditionSource.includes("passEvents(contents: Contents): void") &&
		renditionSource.includes("triggerViewEvent(e: Event, contents: Contents): void") &&
		renditionSource.includes("triggerSelectedEvent(cfirange: string, contents: Contents): void") &&
		renditionSource.includes("triggerMarkEvent(cfiRange: string, data: AnnotationData | undefined, contents: Contents): void") &&
		renditionSource.includes("(cfiRange: string, data: AnnotationData | undefined) => this.triggerMarkEvent(cfiRange, data, view.contents)") &&
		renditionSource.includes("views (): IframeView[]") &&
		renditionSource.includes("resolveLinkHref(href: string, contents?: { sectionHref?: string }): string") &&
		renditionTypes.includes("getRange(cfi: string, ignoreClass?: string): Range | undefined") &&
		renditionTypes.includes("adjustImages(contents: Contents): Promise<void>") &&
		renditionTypes.includes("handleLinks(contents: Contents): void") &&
		renditionTypes.includes("injectIdentifier(doc: Document, section: Section): void") &&
		renditionTypes.includes("injectScript(doc: Document, section: Section): void") &&
		renditionTypes.includes("injectStylesheet(doc: Document, section: Section): void") &&
		renditionTypes.includes("passEvents(contents: Contents): void") &&
		renditionTypes.includes("private triggerViewEvent(e: Event, contents: Contents): void") &&
		renditionTypes.includes("private triggerSelectedEvent(cfirange: string, contents: Contents): void") &&
		renditionTypes.includes("private triggerMarkEvent(cfiRange: string, data: AnnotationData | undefined, contents: Contents): void") &&
		renditionTypes.includes("views(): Array<View>") &&
		renditionTypes.includes("resolveLinkHref(href: string, contents?: { sectionHref?: string }): string"),
	"Rendition source and declarations must keep content hook parameter type parity"
);
assert(typeTests.includes("ReturnType<Rendition[\"reportLocation\"]>, Promise<void>"), "type tests must assert Rendition reportLocation void promise typing");
assert(typeTests.includes("ReturnType<Rendition[\"remeasure\"]>, Promise<void>"), "type tests must assert Rendition remeasure void promise typing");
assert(typeTests.includes("ReturnType<Rendition[\"requireManager\"]>, string | Function | object"), "type tests must assert Rendition requireManager return typing");
assert(typeTests.includes("ReturnType<Rendition[\"requireView\"]>, string | Function | object"), "type tests must assert Rendition requireView return typing");
assert(typeTests.includes("Rendition[\"displaying\"], Deferred<Section | undefined> | undefined"), "type tests must assert Rendition displaying section promise typing");
assert(typeTests.includes("const renditionDisplaying: Deferred<Section | undefined> | undefined = rendition.displaying"), "type tests must cover Rendition displaying usage");
assert(typeTests.includes("RenditionLocationPart[\"page\"], PageValue | undefined"), "type tests must assert Rendition location page PageValue typing");
assert(typeTests.includes("RootRenditionManager"), "type tests must assert root Rendition manager type export");
assert(typeTests.includes("RootRenditionManagerConstructor"), "type tests must assert root Rendition manager constructor type export");
assert(typeTests.includes("RootRenditionViewConstructor"), "type tests must assert root Rendition view constructor type export");
assert(typeTests.includes("Rendition[\"manager\"], RenditionManager | undefined"), "type tests must assert Rendition manager property typing");
assert(typeTests.includes("Rendition[\"ViewManager\"], RenditionManagerConstructor | undefined"), "type tests must assert Rendition ViewManager property typing");
assert(typeTests.includes("Rendition[\"View\"], RenditionViewConstructor | undefined"), "type tests must assert Rendition View property typing");
assert(typeTests.includes("ReturnType<Rendition[\"attachTo\"]>, Promise<void>"), "type tests must assert Rendition attachTo void promise typing");
assert(typeTests.includes("ReturnType<Rendition[\"display\"]>, Promise<void>"), "type tests must assert Rendition display void promise typing");
assert(typeTests.includes("const renditionMove: void = rendition.moveTo"), "type tests must cover Rendition moveTo usage");
assert(typeTests.includes("const renditionNext: Promise<void> = rendition.next"), "type tests must cover Rendition next usage");
assert(typeTests.includes("const renditionPrev: Promise<void> = rendition.prev"), "type tests must cover Rendition prev usage");
assert(typeTests.includes("const renditionRemeasure: Promise<void> = rendition.remeasure"), "type tests must cover Rendition remeasure void promise usage");
assert(typeTests.includes("const requiredManager: string | Function | object = rendition.requireManager"), "type tests must cover Rendition requireManager usage");
assert(typeTests.includes("const requiredView: string | Function | object = rendition.requireView"), "type tests must cover Rendition requireView usage");
assert(typeTests.includes("const setRenditionManager: void = rendition.setManager"), "type tests must cover Rendition setManager usage");
assert(
	renditionSource.includes("book: Book") &&
		renditionSource.includes("_layout?: Layout") &&
		renditionSource.includes("export interface RenditionManager") &&
		renditionSource.includes("export type RenditionManagerConstructor = new (options: RenditionManagerOptions) => RenditionManager") &&
		renditionSource.includes("export type RenditionViewConstructor = typeof IframeView") &&
		renditionSource.includes("manager?: RenditionManager") &&
		renditionSource.includes("ViewManager?: RenditionManagerConstructor") &&
		renditionSource.includes("View?: RenditionViewConstructor") &&
		renditionSource.includes("page?: PageValue") &&
		renditionSource.includes("constructor(book: Book, options?: RenditionOptions)") &&
		renditionSource.includes("(props: LayoutProps, changed: Partial<LayoutProps>)") &&
		renditionTypes.includes("export interface RenditionManager") &&
		renditionTypes.includes("export type RenditionManagerConstructor = new (options: RenditionManagerOptions) => RenditionManager") &&
		renditionTypes.includes("export type RenditionViewConstructor = new (section: unknown, options?: unknown) => View") &&
		renditionTypes.includes("manager?: RenditionManager") &&
		renditionTypes.includes("ViewManager?: RenditionManagerConstructor") &&
		renditionTypes.includes("View?: RenditionViewConstructor") &&
		renditionTypes.includes("constructor(book: Book, options?: RenditionOptions)") &&
		renditionTypes.includes("_layout?: Layout") &&
		renditionTypes.includes("page?: PageValue") &&
		sourceRoot.includes("RenditionManager") &&
		sourceRoot.includes("RenditionViewConstructor") &&
		typeIndex.includes("RenditionManager") &&
		typeIndex.includes("RenditionViewConstructor") &&
		typeTests.includes("Rendition[\"_layout\"], Layout | undefined") &&
		typeTests.includes("Rendition[\"book\"], Book") &&
		!renditionSource.includes("manager?: any") &&
		!renditionSource.includes("ViewManager?: any") &&
		!renditionSource.includes("View?: any") &&
		!renditionTypes.includes("manager?: any") &&
		!renditionTypes.includes("ViewManager?: any") &&
		!renditionTypes.includes("View?: any"),
	"Rendition source and declarations must keep book/layout property type parity"
);
assert(
	renditionSource.includes("var found = this.manager.visible().filter(function (view: IframeView)") &&
		renditionSource.includes("if (Array.isArray(views))") &&
		renditionSource.includes('if (views && typeof views.all === "function")') &&
		renditionSource.includes("return views.all()") &&
		!renditionSource.includes("filter(function (view: any)") &&
		!renditionSource.includes("return (views || []) as IframeView[]") &&
		renditionTests.includes("returns manager views from array and collection bridge shapes"),
	"Rendition source and focused tests must keep visible/views bridge typed"
);
assert(
	renditionSource.includes("attachTo(element: Element | string): Promise<void>") &&
		renditionSource.includes("display(target?: string | number): Promise<void>") &&
		renditionSource.includes("_display(target?: string | number): Promise<Section | undefined> | undefined") &&
		renditionTypes.includes("attachTo(element: Element | string): Promise<void>") &&
		renditionTypes.includes("display(target?: string): Promise<void>") &&
		renditionTypes.includes("display(target?: number): Promise<void>"),
	"Rendition source and declarations must keep attach/display return type parity"
);
assert(
	renditionSource.includes('import Themes, { type ThemesRendition } from "./themes"') &&
		renditionSource.includes('import Annotations, { type AnnotationData, type AnnotationsRendition } from "./annotations"') &&
		renditionSource.includes("export interface RenditionHooks") &&
		renditionSource.includes("hooks: RenditionHooks") &&
		renditionTypes.includes("export interface RenditionHooks") &&
		renditionTypes.includes("hooks: RenditionHooks") &&
		typeTests.includes("Rendition[\"hooks\"], RenditionHooks") &&
		sourceRoot.includes("RenditionHooks") &&
		typeIndex.includes("RenditionHooks") &&
		typeTests.includes("RootRenditionHooks, RenditionHooks") &&
		renditionSource.includes("this.hooks = {") &&
		renditionSource.includes("display: new Hook(this)") &&
		!renditionSource.includes("\t\tthis.hooks = {};") &&
		renditionSource.includes("this.themes = new Themes(this as ThemesRendition)") &&
		renditionSource.includes("this.annotations = new Annotations(this as AnnotationsRendition)") &&
		renditionSource.includes("this.book = undefined as unknown as Book") &&
		!renditionSource.includes("[key: string]: any") &&
		!renditionSource.includes("new Themes(this as any)") &&
		!renditionSource.includes("new Annotations(this as any)"),
	"Rendition source must keep state fields explicit and theme/annotation bridges typed"
);
assert(
	renditionSource.includes("requireManager(manager: string | Function | object): string | Function | object") &&
		renditionSource.includes("requireView(view: string | Function | object): string | Function | object") &&
		renditionTypes.includes("requireManager(manager: string | Function | object): string | Function | object") &&
		renditionTypes.includes("requireView(view: string | Function | object): string | Function | object"),
	"Rendition source and declarations must keep manager/view resolver return type parity"
);
assert(
	renditionSource.includes("displaying?: CoreDeferred<Section | undefined>") &&
		renditionSource.includes("var displaying = new Defer<Section | undefined>()") &&
		renditionTypes.includes("displaying?: Deferred<Section | undefined>"),
	"Rendition source and declarations must keep displaying deferred value type parity"
);
assert(
	renditionSource.includes("afterDisplayed(view: IframeView): void") &&
		renditionSource.includes("afterRemoved(view: IframeView): void") &&
		renditionTypes.includes("private afterDisplayed(view: View): void") &&
		renditionTypes.includes("private afterRemoved(view: View): void"),
	"Rendition source and declarations must keep displayed/removed view hook parameter parity"
);
assert(
	renditionSource.includes("reportLocation(): Promise<void>") &&
		renditionSource.includes("remeasure({ preserveLocation = true, waitForFonts = true }") &&
		renditionSource.includes("): Promise<void>"),
	"source Rendition must keep reportLocation and remeasure typed as void promises"
);
assert(typeTests.includes("ReturnType<Rendition[\"on\"]>, unknown"), "type tests must assert Rendition EventEmitter listener typing");
assert(typeTests.includes("Parameters<Rendition[\"emit\"]>, [type: string, ...args: unknown[]]"), "type tests must assert Rendition EventEmitter emit unknown argument typing");
assert(typeTests.includes("Parameters<Rendition[\"on\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Rendition EventEmitter on unknown listener typing");
assert(typeTests.includes("Parameters<Rendition[\"off\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Rendition EventEmitter off unknown listener typing");
assert(typeTests.includes("Parameters<Rendition[\"once\"]>, [type: string, listener: (...args: unknown[]) => void]"), "type tests must assert Rendition EventEmitter once unknown listener typing");
assert(typeTests.includes("const renditionOn: unknown = rendition.on"), "type tests must cover Rendition on listener usage");
assert(typeTests.includes("const renditionOff: unknown = rendition.off"), "type tests must cover Rendition off listener usage");
assert(typeTests.includes("const renditionOnce: unknown = rendition.once"), "type tests must cover Rendition once listener usage");
assert(
	renditionSource.includes("emit(type: string, ...args: unknown[]): void") &&
		renditionSource.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
		renditionSource.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
		renditionSource.includes("once(type: string, listener: (...args: unknown[]) => void): unknown") &&
		renditionTypes.includes("emit(type: string, ...args: unknown[]): void") &&
		renditionTypes.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
		renditionTypes.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
		renditionTypes.includes("once(type: string, listener: (...args: unknown[]) => void): unknown"),
	"Rendition source and declarations must keep EventEmitter method type parity"
);
assert(
	typeTests.includes("Parameters<Manager[\"emit\"]>, [type: string, ...args: unknown[]]") &&
		typeTests.includes("Parameters<Manager[\"on\"]>, [type: string, listener: (...args: unknown[]) => void]") &&
		typeTests.includes("Parameters<Manager[\"off\"]>, [type: string, listener: (...args: unknown[]) => void]") &&
		typeTests.includes("Parameters<Manager[\"once\"]>, [type: string, listener: (...args: unknown[]) => void]") &&
		typeTests.includes("const managerOn: unknown = manager.on") &&
		typeTests.includes("const managerOff: unknown = manager.off") &&
		typeTests.includes("const managerOnce: unknown = manager.once"),
	"type tests must assert Manager EventEmitter parameter typing and usage"
);
assert(
	managerSource.includes("declare emit: (type: string, ...args: unknown[]) => void") &&
		managerSource.includes("declare on: (type: string, listener: (...args: unknown[]) => void) => unknown") &&
		managerSource.includes("declare off: (type: string, listener: (...args: unknown[]) => void) => unknown") &&
		managerSource.includes("declare once: (type: string, listener: (...args: unknown[]) => void) => unknown") &&
		managerTypes.includes("emit(type: string, ...args: unknown[]): void") &&
		managerTypes.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
		managerTypes.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
		managerTypes.includes("once(type: string, listener: (...args: unknown[]) => void): unknown"),
	"Manager source and declarations must keep EventEmitter method type parity"
);
assert(
	managerSource.includes("declare orientationTimeout?: ReturnType<typeof setTimeout>") &&
		managerSource.includes("declare resizeTimeout?: ReturnType<typeof setTimeout>") &&
		managerSource.includes("declare afterScrolled?: ReturnType<typeof setTimeout>") &&
		managerSource.includes("declare _verticalRlBoundarySnapAfterScroll?: ReturnType<typeof setTimeout>"),
	"Default manager timeout handles must keep class state typed without catch-all any"
);
assert(
	managerSource.includes("declare _onUnload?: EventListener") &&
		managerSource.includes("declare _onScroll?: EventListener"),
	"Default manager event listener handles must keep class state typed without catch-all any"
);
assert(
	managerSource.includes("type ManagerStageSize = {") &&
		managerSource.includes("declare _stageSize?: ManagerStageSize") &&
		managerSource.includes("declare _bounds?: ManagerBounds") &&
		managerSource.includes("declare winBounds?: ManagerBounds"),
	"Default manager size and bounds caches must keep class state typed without catch-all any"
);
assert(
	managerSource.includes("declare rendered: boolean") &&
		managerSource.includes("declare _layoutDirty: boolean") &&
		managerSource.includes("declare _lastLayoutStageSize: ManagerStageSize | null"),
	"Default manager layout lifecycle flags must keep class state typed without catch-all any"
);
assert(
	managerSource.includes("declare ignore: boolean") &&
		managerSource.includes("declare scrollTop: number") &&
		managerSource.includes("declare scrollLeft: number") &&
		managerSource.includes("declare target?: string | number") &&
		managerSource.includes("declare writingMode?: string") &&
		managerSource.includes("declare isPaginated: boolean"),
	"Default manager scroll and runtime flags must keep class state typed without catch-all any"
);
assert(
	managerSource.includes("declare layout: Layout") &&
		managerSource.includes("declare mapping: Mapping") &&
		managerSource.includes("applyLayout(layout: Layout): void") &&
		managerSource.includes("setLayout(layout: Layout): void"),
	"Default manager layout and mapping state must keep class state typed without catch-all any"
);
assert(
	managerSource.includes("type VerticalRlSequentialBoundaryConstraint = {") &&
		managerSource.includes("type VerticalRlBoundarySnapCacheEntry") &&
		managerSource.includes("type VerticalRlLogicalPageOffsetCache") &&
		managerSource.includes("declare _verticalRlLogicalPageOffsetCache?: VerticalRlLogicalPageOffsetCache | null") &&
		managerSource.includes("declare _verticalRlBoundarySnapCache?: VerticalRlBoundarySnapCacheEntry | null") &&
		managerSource.includes("declare _verticalRlSequentialBoundaryConstraint?: VerticalRlSequentialBoundaryConstraint | null") &&
		managerSource.includes("declare _verticalRlBoundarySnapRetryToken?: number") &&
		managerSource.includes("declare _verticalRlBoundarySnapApplying?: boolean"),
	"Default manager vertical-rl cache and retry token state must stay typed without catch-all any"
);
assert(
	managerTypes.includes("[key: string]: unknown") &&
		!managerTypes.includes("[key: string]: any") &&
		typeTests.includes("ManagerOptions[\"custom\"], unknown"),
	"ManagerOptions declarations must keep unknown extension typing"
);
assert(
	managerSource.includes("getContents(): Contents[]") &&
		managerTypes.includes("getContents(): Contents[]"),
	"Manager source and declarations must keep getContents return type parity"
);
assert(
	managerSource.includes("import { defer, type Deferred as CoreDeferred } from \"../../core/async\"") &&
		managerSource.includes("type ManagerDeferred<T = unknown> = CoreDeferred<T>") &&
		managerSource.includes("const Deferred = defer as unknown as {") &&
		managerSource.includes("new<T = unknown>(): ManagerDeferred<T>") &&
		!managerSource.includes("const Deferred = defer as any"),
	"Default manager must keep Deferred constructor bridge typed through unknown"
);
assert(
	managerSource.includes("type DefaultManagerOptions = {") &&
		managerSource.includes("settings: ManagerSettings") &&
		managerSource.includes("view: ManagerViewConstructor") &&
		managerSource.includes("export type ManagerViewConstructor = new (section: unknown, settings: ManagerViewSettings) => ManagerView") &&
		managerSource.includes("type ManagerRenderSize = {") &&
		managerSource.includes("constructor(options: DefaultManagerOptions)") &&
		managerSource.includes("render(element: HTMLElement, size: ManagerRenderSize): void") &&
		!managerSource.includes("constructor(options: any)") &&
		!managerSource.includes("render(element: HTMLElement, size: any): void"),
	"Default manager constructor and render size inputs must stay typed without any"
);
assert(
	managerSource.includes("declare name: string") &&
		managerSource.includes("declare optsSettings: ManagerSettings") &&
		managerSource.includes("declare settings: ManagerSettings") &&
		managerSource.includes("declare View: ManagerViewConstructor") &&
		managerSource.includes("declare request: unknown") &&
		managerSource.includes("declare renditionQueue: unknown") &&
		managerSource.includes("declare q: Queue"),
	"Default manager constructor-injected state must stay typed without catch-all any"
);
assert(
	managerSource.includes("declare stage: Stage") &&
		managerSource.includes("declare container: HTMLDivElement") &&
		managerSource.includes("declare overflow?: string") &&
		managerSource.includes("declare viewSettings: ManagerViewSettings") &&
		managerSource.includes("bounds(): ManagerBounds") &&
		managerSource.includes("this.stage.bounds() as ManagerBounds"),
	"Default manager render surface state must stay typed without catch-all any"
);
assert(
	managerSource.includes("export type ManagerSettings = {") &&
		managerSource.includes("[key: string]: unknown") &&
		managerSource.includes("size?: ManagerRenderSize") &&
		managerSource.includes("snap?: boolean | ManagerSnapOptions") &&
		managerSource.includes("verticalRlBoundarySnapRetryDelays?: number[]") &&
		managerSource.includes("export type ManagerViewSettings = {") &&
		managerSource.includes("layout?: Layout") &&
		managerSource.includes("forceEvenPages: boolean") &&
		!managerSource.includes("settings: Record<string, any>") &&
		!managerSource.includes("viewSettings: Record<string, any>"),
	"Default manager settings bridge must keep known fields typed and extension fields unknown"
);
assert(
	managerSource.includes("type ManagerOffset = {") &&
		managerSource.includes("type ViewResizeBounds = {") &&
		managerSource.includes("resize(width?: number, height?: number, epubcfi?: string): void") &&
		managerSource.includes("getVerticalRlPageIndexForOffset(offset: ManagerOffset, width?: number): number") &&
		managerSource.includes("moveTo(offset: ManagerOffset, width?: number): void") &&
		managerSource.includes("counter(bounds: ViewResizeBounds): void") &&
		!managerSource.includes("resize(width?: number, height?: number, epubcfi?: any): void") &&
		!managerSource.includes("getVerticalRlPageIndexForOffset(offset: any") &&
		!managerSource.includes("moveTo(offset: any") &&
		!managerSource.includes("view.on(EVENTS.VIEWS.AXIS, (axis: any)") &&
		!managerSource.includes("view.on(EVENTS.VIEWS.WRITING_MODE, (mode: any)") &&
		!managerSource.includes("view.on(EVENTS.VIEWS.RESIZED, (bounds: any)") &&
		!managerSource.includes("counter(bounds: any): void"),
	"Default manager resize, movement, and view event bridge inputs must stay typed without any"
);
assert(
	managerSource.includes("type ManagerSection = {") &&
		managerSource.includes("type ManagerView = {") &&
		managerSource.includes("iframe?: HTMLIFrameElement") &&
		managerSource.includes("_contentWidth?: number") &&
		managerSource.includes("_viewportFillingSingleMediaPage?: boolean") &&
		managerSource.includes("createView(section: unknown, forceRight?: boolean): ManagerView") &&
		managerSource.includes("display(section: ManagerSection, target?: string | number): Promise<void>") &&
		managerSource.includes("var displaying = new Deferred<void>()") &&
		managerSource.includes("var visible: ManagerView | undefined = this.views.find(section)") &&
		managerSource.includes(".then(function(view: ManagerView)") &&
		managerSource.includes("}.bind(this), (err: unknown) => {") &&
		managerSource.includes("afterDisplayed(view: ManagerView): void") &&
		managerSource.includes("afterResized(view: ManagerView): void") &&
		managerSource.includes("add(section: ManagerSection, forceRight?: boolean): Promise<ManagerView>") &&
		managerSource.includes("append(section: unknown, forceRight?: boolean): ManagerView | Promise<ManagerView>") &&
		managerSource.includes("prepend(section: unknown, forceRight?: boolean): ManagerView | Promise<ManagerView>") &&
		managerSource.includes("return (this.prepend(section, forceRight) as Promise<ManagerView>)") &&
		managerSource.includes("return (this.append(next, forceRight) as Promise<ManagerView>)") &&
		!managerSource.includes("createView(section: any") &&
		!managerSource.includes("display(section: any") &&
		!managerSource.includes("target?: any") &&
		!managerSource.includes("then(function(view: any)") &&
		!managerSource.includes("afterDisplayed(view: any)") &&
		!managerSource.includes("afterResized(view: any)") &&
		!managerSource.includes("add(section: any") &&
		!managerSource.includes("append(section: any") &&
		!managerSource.includes("prepend(section: any"),
	"Default manager view and section bridge inputs must stay typed without any"
);
assert(
	managerSource.includes("type ManagerViewsBridge = {") &&
		managerSource.includes("all(): ManagerView[]") &&
		managerSource.includes("find(section: ManagerSection): ManagerView | undefined") &&
		managerSource.includes("first(): ManagerView") &&
		managerSource.includes("last(): ManagerView") &&
		managerSource.includes("indexOf(view: ManagerView): number") &&
		managerSource.includes("slice(start?: number, end?: number): ManagerView[]") &&
		managerSource.includes("remove(view: unknown): void") &&
		managerSource.includes("declare views: ManagerViewsBridge") &&
		managerSource.includes("new Views(this.container) as unknown as ManagerViewsBridge") &&
		!managerSource.includes("declare views: any"),
	"Default manager views bridge must keep view collection state typed without catch-all any"
);
assert(
	managerSource.includes("getVerticalRlVisualContentWidth(view: ManagerView | undefined): number") &&
		managerSource.includes("getNavigableWidthForView(view: ManagerView | undefined): number") &&
		!managerSource.includes("getVerticalRlVisualContentWidth(view: any): number") &&
		!managerSource.includes("getNavigableWidthForView(view: any): number"),
	"Default manager vertical width helpers must keep view inputs typed without any"
);
assert(
	managerSource.includes("type ManagerBounds = {") &&
		managerSource.includes("type VisibleManagerView = ManagerView & {") &&
		managerSource.includes("type PositionedView = {") &&
		managerSource.includes("section?: unknown") &&
		managerSource.includes("position?: () => ManagerBounds") &&
		managerSource.includes("isVisible(view: PositionedView, offsetPrev: number, offsetNext: number, _container?: ManagerBounds): boolean") &&
		managerSource.includes("var position = view.position!()") &&
		managerSource.includes("var container: ManagerBounds = _container || this.bounds()") &&
		managerSource.includes("visible(): VisibleManagerView[]") &&
		managerSource.includes("var views: VisibleManagerView[] = this.views.displayed()") &&
		managerSource.includes("var visible: VisibleManagerView[] = []") &&
		managerSource.includes("var view: VisibleManagerView") &&
		!managerSource.includes("isVisible(view: any") &&
		!managerSource.includes("_container?: any") &&
		!managerSource.includes("visible(): any[]") &&
		!managerSource.includes("var visible: any[] = []"),
	"Default manager visible helpers must keep view and bounds inputs typed without any"
);
assert(
	managerSource.includes('import type Layout from "../../layout";') &&
		managerSource.includes("setLayout(layout: Layout): void") &&
		managerSource.includes("applyLayout(layout: Layout): void") &&
		managerSource.includes("this.views.forEach(function(view: ManagerView){") &&
		!managerSource.includes("applyLayout(layout: any): void") &&
		!managerSource.includes("setLayout(layout: any): void"),
	"Default manager layout helpers must keep layout and view callbacks typed without any"
);
assert(
	managerSource.includes("contents: Contents") &&
		managerSource.includes("getContents(): Contents[]") &&
		managerSource.includes("var contents: Contents[] = []") &&
		managerSource.includes("this.views.forEach(function(view: ManagerView | undefined){") &&
		!managerSource.includes("this.views.forEach(function(view: any){"),
	"Default manager contents bridge must keep view and contents values typed without any"
);
assert(
	managerSource.includes("current(): VisibleManagerView | null") &&
		managerSource.includes("var visible = this.visible()") &&
		!managerSource.includes("current(): any"),
	"Default manager current bridge must return the typed visible view or null without any"
);
assert(
	managerSource.includes("cfiBase: string") &&
		managerSource.includes("contents: Contents") &&
		managerSource.includes("height(): number") &&
		managerSource.includes("let sections = visible.map((view: VisibleManagerView) => {") &&
		!managerSource.includes("let sections = visible.map((view: any) => {"),
	"Default manager location map bridge must keep visible view callbacks typed without any"
);
assert(
	managerSource.includes("displaySpineItemAtEnd(section: ManagerSection, forceRight?: boolean): Promise<void>") &&
		managerSource.includes("var left: ManagerSection | undefined") &&
		managerSource.includes(".catch((err: unknown) => {") &&
		!managerSource.includes("displaySpineItemAtEnd(section: any") &&
		!managerSource.includes("var left: any") &&
		!managerSource.includes(".catch((err: any) => {"),
	"Default manager end-display helper must keep section and rejection bridge typed without any"
);
assert(
	managerSource.includes("next(): Promise<unknown> | void") &&
		managerSource.includes("var next: ManagerSection | undefined") &&
		managerSource.includes("var left: number") &&
		managerSource.includes('next.properties!.includes("page-spread-right")') &&
		!managerSource.includes("next(): Promise<any> | void") &&
		!managerSource.includes("var next: any"),
	"Default manager next bridge must keep section, scroll offset, and promise results typed without any"
);
assert(
	managerSource.includes("prev(): Promise<unknown> | void") &&
		managerSource.includes("var prev: ManagerSection | undefined") &&
		managerSource.includes("var left: number") &&
		!managerSource.includes("prev(): Promise<any> | void") &&
		!managerSource.includes("var prev: any"),
	"Default manager prev bridge must keep section, scroll offset, and promise results typed without any"
);
assert(
	managerSource.includes('import type { ManagerLocationItem } from "../../rendition";') &&
		managerSource.includes("currentLocation(): Array<ManagerLocationItem | null | undefined>") &&
		managerSource.includes("scrolledLocation(): ManagerLocationItem[]") &&
		managerSource.includes("paginatedLocation(): ManagerLocationItem[]") &&
		managerSource.includes("let pages: number[] = []") &&
		managerSource.includes("index: index!") &&
		managerSource.includes("href: href!") &&
		!managerSource.includes("currentLocation(): any"),
	"Default manager location helpers must expose typed manager location results without any"
);
assert(
	continuousManagerSource.includes("var promises: Promise<unknown>[] = []") &&
		continuousManagerSource.includes("check(_offsetLeft?: number, _offsetTop?: number): Promise<unknown>") &&
		continuousManagerSource.includes(".then((): Promise<unknown> =>") &&
		!continuousManagerSource.includes("var promises: Promise<any>[] = []") &&
		!continuousManagerSource.includes("check(_offsetLeft?: number, _offsetTop?: number): Promise<any>") &&
		!continuousManagerSource.includes(".then((): Promise<any> =>"),
	"Continuous manager must keep promise bridge results typed as unknown"
);
assert(
	continuousManagerSource.includes("settings: ManagerSettings") &&
		continuousManagerSource.includes("import DefaultViewManager, { type ManagerSettings, type ManagerViewConstructor } from \"../default\"") &&
		continuousManagerSource.includes("view: ManagerViewConstructor") &&
		continuousManagerSource.includes("request: unknown") &&
		continuousManagerSource.includes("queue: unknown") &&
		continuousManagerSource.includes("typeof options.settings.gap !== \"undefined\"") &&
		!continuousManagerSource.includes("settings: Record<string, any>") &&
		!continuousManagerSource.includes("view: any") &&
		!continuousManagerSource.includes("request: any") &&
		!continuousManagerSource.includes("queue: any"),
	"Continuous manager options bridge must keep inputs typed as unknown"
);
assert(
	continuousManagerSource.includes("import Snap, { type ManagerLike as SnapManagerLike } from \"../helpers/snap\"") &&
		continuousManagerSource.includes("new Snap(this as unknown as SnapManagerLike") &&
		!continuousManagerSource.includes("new Snap(this as any"),
	"Continuous manager must use the typed Snap manager bridge"
);
assert(
	continuousManagerSource.includes("display(section: unknown, target?: string | number)") &&
		continuousManagerSource.includes("add(section: unknown)") &&
		continuousManagerSource.includes("append(section: unknown)") &&
		continuousManagerSource.includes("prepend(section: unknown)") &&
		!continuousManagerSource.includes("display(section: any") &&
		!continuousManagerSource.includes("add(section: any") &&
		!continuousManagerSource.includes("append(section: any") &&
		!continuousManagerSource.includes("prepend(section: any"),
	"Continuous manager section input bridge must keep unknown typing"
);
assert(
	continuousManagerSource.includes("type ContinuousSection = {") &&
		continuousManagerSource.includes("type VisibilityElement = {") &&
		continuousManagerSource.includes("[key: string]: unknown") &&
		continuousManagerSource.includes("display(request: unknown): Promise<unknown>") &&
		continuousManagerSource.includes("bounds(): ViewBounds") &&
		!continuousManagerSource.includes("type ContinuousView = {\n\t[key: string]: any"),
	"Continuous manager view bridge must keep structural unknown typing"
);
assert(
	typeTests.includes("Parameters<View[\"emit\"]>, [type: string, ...args: unknown[]]") &&
		typeTests.includes("Parameters<View[\"on\"]>, [type: string, listener: (...args: unknown[]) => void]") &&
		typeTests.includes("Parameters<View[\"off\"]>, [type: string, listener: (...args: unknown[]) => void]") &&
		typeTests.includes("Parameters<View[\"once\"]>, [type: string, listener: (...args: unknown[]) => void]") &&
		typeTests.includes("const viewOn: unknown = view.on") &&
		typeTests.includes("const viewOff: unknown = view.off") &&
		typeTests.includes("const viewOnce: unknown = view.once"),
	"type tests must assert View EventEmitter parameter typing and usage"
);
assert(
	viewTypes.includes("emit(type: string, ...args: unknown[]): void") &&
		viewTypes.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
		viewTypes.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
		viewTypes.includes("once(type: string, listener: (...args: unknown[]) => void): unknown"),
	"View declarations must keep EventEmitter method type parity"
);
assert(
	viewTypes.includes("create(): HTMLIFrameElement") &&
		viewTypes.includes("load(content: string): Promise<Contents>") &&
		viewTypes.includes("display(request?: Function): Promise<View>") &&
		viewTypes.includes("private onLoad(event: Event, promise: { resolve(value: Contents): void }): void") &&
		!viewTypes.includes("create(): any") &&
		!viewTypes.includes("load(content: Contents): Promise<any>") &&
		!viewTypes.includes("display(request?: Function): Promise<any>") &&
		!viewTypes.includes("Promise<any>") &&
		typeTests.includes("ReturnType<View[\"create\"]>, HTMLIFrameElement") &&
		typeTests.includes("ReturnType<View[\"load\"]>, Promise<Contents>") &&
		typeTests.includes("ReturnType<View[\"display\"]>, Promise<View>"),
	"View declarations must keep iframe load/display promise typing"
);
assert(
	typeTests.includes("RootContentsSize") &&
	typeTests.includes("RootVerticalRlDebugMetrics") &&
	typeTests.includes("RootVerticalRlPageMetrics") &&
	typeTests.includes("RootVerticalRlMetricsCache") &&
	typeTests.includes("RootVerticalRlPageMetricsCache") &&
	typeTests.includes("RootViewportSettings"),
	"type tests must assert root Contents type exports"
);
assert(typeTests.includes("typedContents._size"), "type tests must cover Contents runtime size state typing");
assert(typeTests.includes("typedContents.sectionHref"), "type tests must cover Contents sectionHref state typing");
assert(typeTests.includes("typedContents._verticalRlMetricsCache"), "type tests must cover Contents vertical-rl metrics cache typing");
assert(typeTests.includes("VerticalRlPageMetricsCache[\"metrics\"], VerticalRlPageMetrics"), "type tests must assert Contents vertical-rl page metrics cache payload typing");
assert(typeTests.includes("ReturnType<Contents[\"verticalRlPageMetrics\"]>, VerticalRlPageMetrics"), "type tests must assert Contents vertical-rl page metrics return typing");
assert(typeTests.includes("ReturnType<Contents[\"debugVerticalRlMetrics\"]>, VerticalRlDebugMetrics"), "type tests must assert Contents vertical-rl debug metrics return typing");
assert(typeTests.includes("Parameters<Contents[\"fit\"]>, [width: number, height: number, section?: unknown]"), "type tests must assert Contents fit optional section typing");
assert(typeTests.includes("Parameters<Contents[\"map\"]>, [layout: MappingLayout]"), "type tests must assert Contents map MappingLayout parameter typing");
assert(typeTests.includes("ReturnType<Contents[\"map\"]>, EpubCFIPair[]"), "type tests must assert Contents map CFI pair list return typing");
assert(typeTests.includes("Parameters<Contents[\"mapPage\"]>, [cfiBase: string, layout: MappingLayout, start: number, end: number, dev?: boolean | undefined]"), "type tests must assert Contents mapPage MappingLayout parameter typing");
assert(typeTests.includes("ReturnType<Contents[\"mapPage\"]>, EpubCFIPair | undefined"), "type tests must assert Contents mapPage CFI pair return typing");
assert(typeTests.includes("Parameters<Contents[\"addClass\"]>, [className: string]"), "type tests must assert Contents addClass string parameter typing");
assert(typeTests.includes("Parameters<Contents[\"removeClass\"]>, [className: string]"), "type tests must assert Contents removeClass string parameter typing");
assert(typeTests.includes("typedContents.fit(320, 480"), "type tests must cover Contents fit optional section usage");
assert(typeTests.includes("const contentsMap: EpubCFIPair[] = typedContents.map"), "type tests must cover Contents map usage");
assert(typeTests.includes("const contentsMapPage: EpubCFIPair | undefined = typedContents.mapPage"), "type tests must cover Contents mapPage usage");
assert(typeTests.includes("ReturnType<Contents[\"on\"]>, unknown"), "type tests must assert Contents EventEmitter listener typing");
assert(typeTests.includes("const contentsOn: unknown = typedContents.on"), "type tests must cover Contents on listener usage");
assert(typeTests.includes("const contentsOff: unknown = typedContents.off"), "type tests must cover Contents off listener usage");
assert(typeTests.includes("const contentsOnce: unknown = typedContents.once"), "type tests must cover Contents once listener usage");
assert(
	typeTests.includes("Parameters<Contents[\"emit\"]>, [type: string, ...args: unknown[]]") &&
		typeTests.includes("Parameters<Contents[\"on\"]>, [type: string, listener: (...args: unknown[]) => void]") &&
		typeTests.includes("Parameters<Contents[\"off\"]>, [type: string, listener: (...args: unknown[]) => void]") &&
		typeTests.includes("Parameters<Contents[\"once\"]>, [type: string, listener: (...args: unknown[]) => void]"),
	"type tests must assert Contents EventEmitter parameter typing"
);
assert(
	contentsSource.includes("emit(type: string, ...args: unknown[]): void") &&
		contentsSource.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
		contentsSource.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
		contentsSource.includes("once(type: string, listener: (...args: unknown[]) => void): unknown") &&
		contentsTypes.includes("emit(type: string, ...args: unknown[]): void") &&
		contentsTypes.includes("on(type: string, listener: (...args: unknown[]) => void): unknown") &&
		contentsTypes.includes("off(type: string, listener: (...args: unknown[]) => void): unknown") &&
		contentsTypes.includes("once(type: string, listener: (...args: unknown[]) => void): unknown"),
	"Contents source and declarations must keep EventEmitter method type parity"
);
assert(
	contentsSource.includes("addClass(className: string): void") &&
		contentsSource.includes("removeClass(className: string): void") &&
		contentsTypes.includes("addClass(className: string): void") &&
		contentsTypes.includes("removeClass(className: string): void"),
	"Contents source and declarations must keep class mutation parameter type parity"
);
assert(
	contentsSource.includes("type StylesheetRuleProperty = [string, string, boolean?]") &&
		contentsSource.includes("type StylesheetArrayRule =") &&
		contentsSource.includes("type StylesheetObjectRule = Record<string, Record<string, string> | Array<Record<string, string>> | string>") &&
		contentsSource.includes("type StylesheetRules = StylesheetArrayRule[] | StylesheetObjectRule") &&
		contentsSource.includes("addStylesheetRules(rules: StylesheetRules, key?: string): void") &&
		contentsTypes.includes("addStylesheetRules(rules: Array<object> | object, key?: string): void") &&
		!contentsSource.includes("type StylesheetRules = any"),
	"Contents source and declarations must keep stylesheet rules typing parity"
);
assert(
	contentsSource.includes("type LoadableElement = (HTMLLinkElement | HTMLScriptElement)") &&
		contentsSource.includes("onreadystatechange: ((this: LoadableElement, event: Event) => void) | null") &&
		contentsSource.includes("addStylesheet(src: string): Promise<boolean>") &&
		contentsSource.includes("addScript(src: string): Promise<boolean>") &&
		contentsSource.includes("reject: (reason?: unknown) => void") &&
		contentsSource.includes("function(this: LoadableElement)") &&
		contentsSource.includes("($stylesheet as LoadableElement).onload = ($stylesheet as LoadableElement).onreadystatechange") &&
		contentsSource.includes("($script as LoadableElement).onload = ($script as LoadableElement).onreadystatechange") &&
		!contentsSource.includes("reject: (reason?: any) => void") &&
		!contentsSource.includes("($stylesheet as any).onload") &&
		!contentsSource.includes("($script as any).onload") &&
		!contentsSource.includes("onreadystatechange = function(this: any)"),
	"Contents source must keep stylesheet/script load handlers typed"
);
assert(
	contentsSource.includes('this.document.addEventListener("selectionchange", this._onSelectionChange, { passive: true } as AddEventListenerOptions)') &&
		contentsSource.includes('this.document.removeEventListener("selectionchange", this._onSelectionChange, { passive: true } as AddEventListenerOptions)') &&
		!contentsSource.includes('this.document.addEventListener("selectionchange", this._onSelectionChange, { passive: true } as any)') &&
		!contentsSource.includes('this.document.removeEventListener("selectionchange", this._onSelectionChange, { passive: true } as any)'),
	"Contents source must keep selection listener options typed without any"
);
assert(
	contentsSource.includes("map(layout: MappingLayout): EpubCFIPair[]") &&
		contentsTypes.includes("map(layout: MappingLayout): EpubCFIPair[]") &&
	contentsSource.includes("mapPage(cfiBase: string, layout: MappingLayout, start: number, end: number, dev?: boolean): EpubCFIPair | undefined") &&
		contentsTypes.includes("mapPage(cfiBase: string, layout: MappingLayout, start: number, end: number, dev?: boolean): EpubCFIPair | undefined"),
	"Contents source and declarations must keep map and mapPage MappingLayout return type parity"
);
assert(
	contentsSource.includes("type MappingContents") &&
		contentsSource.includes("type MappingView") &&
		contentsSource.includes("const view: MappingView =") &&
		contentsSource.includes("scrollWidth: () => this.scrollWidth()") &&
		contentsSource.includes("const contents: MappingContents =") &&
		contentsSource.includes("return mapping.page(contents, cfiBase, start, end)") &&
		contentsSource.includes('this.window.console.debug("[epubjs:vertical-rl]", result)') &&
		!contentsSource.includes("map.section(undefined as any)") &&
		!contentsSource.includes("mapping.page(this as any") &&
		!contentsSource.includes("(this.window as any).console"),
	"Contents source must keep debug console and mapping bridges typed"
);
assert(
	contentsTextWidthTests.includes("maps section and page CFI ranges through typed mapping bridges") &&
		contentsTextWidthTests.includes("writes vertical-rl debug metrics through the typed console bridge"),
	"contents focused browser tests must cover debug console and mapping bridges"
);
assert(
	coreCollectionsSource.includes("export function defaults<T extends MutableRecord>(obj: T, ..._sources: MutableRecord[]): T;") &&
		coreCollectionsSource.includes("export function defaults<T extends MutableRecord>(obj: T): T") &&
		coreCollectionsSource.includes("@param {T} item Item to insert.") &&
		coreCollectionsSource.includes("@param {T} item Item to locate.") &&
		!coreCollectionsSource.includes("@param {any} item Item to insert.") &&
		!coreCollectionsSource.includes("@param {any} item Item to locate.") &&
	contentsSource.includes("type ViewportSettingsRecord = ViewportSettings & Record<string, unknown>") &&
		contentsSource.includes("settings = defaults<ViewportSettingsRecord>((options || {}) as ViewportSettingsRecord, parsed as ViewportSettingsRecord)") &&
		!contentsSource.includes("settings = (defaults as any)(options || {}, parsed)"),
	"Contents viewport settings must keep typed defaults bridge"
);
assert(contentsSource.includes("fit(width: number, height: number, section?: unknown): void"), "source Contents must keep fit optional section typed as unknown");
assert(
	contentsSource.includes("interface EpubReadingSystem") &&
		contentsTypes.includes("interface EpubReadingSystem") &&
		contentsSource.includes("type EpubNavigator = Navigator & { epubReadingSystem?: EpubReadingSystem }") &&
		contentsSource.includes("epubReadingSystem(name: string, version: string): EpubReadingSystem") &&
		contentsTypes.includes("private epubReadingSystem(name: string, version: string): EpubReadingSystem") &&
		!contentsSource.includes("epubReadingSystem?: any") &&
		!contentsSource.includes("epubReadingSystem(name: string, version: string): any"),
	"Contents source and declarations must keep epubReadingSystem bridge typed"
);
assert(
	contentsSource.includes("declare _expanding?: boolean") &&
		contentsSource.includes("interface Contents") &&
		contentsSource.includes("emit(type: string, ...args: unknown[]): void") &&
		!contentsSource.includes("[key: string]: any"),
	"Contents source must keep class state fields explicit without a catch-all any index"
);
assert(
	sourceRoot.includes("\tContents,") &&
	sourceRoot.includes("ContentsSize") &&
	sourceRoot.includes("VerticalRlDebugMetrics") &&
	sourceRoot.includes("VerticalRlPageMetrics") &&
	sourceRoot.includes("VerticalRlMetricsCache") &&
	sourceRoot.includes("VerticalRlPageMetricsCache") &&
	sourceRoot.includes("ViewportSettings"),
	"source root must export Contents public types"
);
assert(
	contentsSource.includes("export interface VerticalRlPageMetrics") &&
	contentsSource.includes("metrics: VerticalRlPageMetrics;") &&
	contentsSource.includes("verticalRlPageMetrics(pageWidth?: number, pageHeight?: number): VerticalRlPageMetrics"),
	"source Contents must expose typed vertical-rl page metrics"
);
assert(
	contentsSource.includes("export interface VerticalRlDebugMetrics") &&
	contentsSource.includes("debugVerticalRlMetrics(pageWidth?: number): VerticalRlDebugMetrics"),
	"source Contents must expose typed vertical-rl debug metrics"
);
assert(typeTests.includes("type CoreUtilsAssertions"), "type tests must assert the utils/core public surface");
assert(
	typeTests.includes("RootAnimationFrameRequest") &&
	typeTests.includes("RootBlobContent") &&
	typeTests.includes("RootDeferred") &&
	typeTests.includes("RootRectBounds") &&
	typeTests.includes("RootSizeBounds"),
	"type tests must assert root utils/core type exports"
);
assert(
	sourceRoot.includes("AnimationFrameRequest") &&
	sourceRoot.includes("BlobContent") &&
	sourceRoot.includes("Deferred") &&
	sourceRoot.includes("RectBounds") &&
	sourceRoot.includes("SizeBounds"),
	"source root must export utils/core public types"
);
assert(typeTests.includes("ePub.utils.requestAnimationFrame"), "type tests must cover utils/core requestAnimationFrame typing");
assert(typeTests.includes("ePub.utils.createBlob(coreBlobContent, \"text/plain\")"), "type tests must cover utils/core blob content typing");
assert(
	coreUtilsSource.includes("@param {unknown} n") &&
		coreUtilsSource.includes("@param {T} item") &&
		!coreUtilsSource.includes("@param {any} n") &&
		!coreUtilsSource.includes("@param {any} item"),
	"source utils/core facade must keep unknown and generic helper JSDoc without stale any"
);
assert(
	platformBlobSource.includes("export type BlobContent = BlobPart[] | BlobPart | string | ArrayBuffer | ArrayBufferView") &&
		platformBlobSource.includes("createBlob(content: BlobContent, mime: string): Blob") &&
		platformBlobSource.includes("createBlobUrl(content: BlobContent, mime: string): string") &&
		platformBlobSource.includes("createBase64Url(content: string, mime: string): string") &&
		platformBlobSource.includes("@param {BlobContent} content Blob content.") &&
		platformBlobSource.includes("@param {string} content Source content.") &&
		coreUtilsSource.includes("@param {BlobContent} content") &&
		coreUtilsSource.includes("@param {string} content") &&
		platformBlobSource.includes("typeof(content as unknown) !== \"string\"") &&
		!platformBlobSource.includes("from \"../utils/core\"") &&
		!platformBlobSource.includes("createBlob(content: any") &&
		!platformBlobSource.includes("createBlobUrl(content: any") &&
		!platformBlobSource.includes("createBase64Url(content: any") &&
		!platformBlobSource.includes("@param {any} content Blob content.") &&
		!platformBlobSource.includes("@param {any} content Source content.") &&
		!coreUtilsSource.includes("@param {any} content"),
	"source platform and core blob helpers must keep BlobContent and string input type parity"
);
assert(
	platformDomSource.includes("querySelectorByType(html: Element | Document, element: string, type: string): Element | undefined") &&
		platformDomSource.includes("var query: Element | null | undefined") &&
		platformDomSource.includes("var elements: NodeListOf<Element> | HTMLCollectionOf<Element>") &&
		!platformDomSource.includes("var query: any"),
	"source platform DOM querySelectorByType must keep typed query fallback handling"
);
assert(
	platformLayoutSource.includes("type StylePixelProperty =") &&
		platformLayoutSource.includes("function sumStylePixels(style: CSSStyleDeclaration, props: StylePixelProperty[]): number") &&
		platformLayoutSource.includes("var widthProps: StylePixelProperty[]") &&
		platformLayoutSource.includes("var heightProps: StylePixelProperty[]") &&
		platformLayoutSource.includes("parseFloat(style[prop])") &&
		!platformLayoutSource.includes("style[prop as any]"),
	"source platform layout style pixel summing must keep typed CSS property access"
);
assert(typeTests.includes("new ePub.utils.RangeObject()"), "type tests must cover utils/core RangeObject typing");
assert(
	typeTests.includes("coreRangeStartContainer: Node | undefined") &&
		typeTests.includes("coreRangeStartOffset: number | undefined") &&
		typeTests.includes("coreRangeEndContainer: Node | undefined") &&
		typeTests.includes("coreRangeEndOffset: number | undefined") &&
		typeTests.includes("coreRangeCommonAncestorContainer: Node | undefined"),
	"type tests must cover utils/core RangeObject boundary property typing"
);
assert(
	compatRangeSource.includes("commonAncestorContainer: Node | undefined") &&
		compatRangeSource.includes("endContainer: Node | undefined") &&
		compatRangeSource.includes("endOffset: number | undefined") &&
		compatRangeSource.includes("startContainer: Node | undefined") &&
		compatRangeSource.includes("startOffset: number | undefined") &&
		compatRangeSource.includes("this.commonAncestorContainer = this.endContainer ? this.endContainer.parentNode : undefined") &&
		!compatRangeSource.includes("commonAncestorContainer: any") &&
		!compatRangeSource.includes("endContainer: any") &&
		!compatRangeSource.includes("endOffset: any") &&
		!compatRangeSource.includes("startContainer: any") &&
		!compatRangeSource.includes("startOffset: any"),
	"source RangeObject must keep typed boundary property parity"
);
assert(typeTests.includes("type EpubCFIAssertions"), "type tests must assert the EpubCFI public surface");
assert(typeTests.includes("RootParsedEpubCFI"), "type tests must assert root EpubCFI type exports");
assert(typeTests.includes("cfi.parse(\"epubcfi(/6/2[cover]!/6)\")"), "type tests must cover EpubCFI parse typing");
assert(typeTests.includes("cfi.checkType(\"epubcfi(/6/2[cover]!/6)\")"), "type tests must cover EpubCFI checkType typing");
assert(typeTests.includes("cfi.fromRange(parsedDocument.createRange(), cfiBase)"), "type tests must cover EpubCFI range construction typing");
assert(typeTests.includes("EpubCFIComponent | Record<string, never>"), "type tests must assert EpubCFI empty fallback object typing without any");
assert(typeTests.includes("const cfiFallbackBase: EpubCFIBase = {}"), "type tests must cover EpubCFI empty fallback base typing");
assert(
	sourceRoot.includes("ParsedEpubCFI") &&
		sourceRoot.includes("EpubCFISegment") &&
		sourceRoot.includes("EpubCFIInput") &&
		sourceRoot.includes("EpubCFIRangeInput"),
	"source root must export EpubCFI public types"
);
assert(
	epubcfiSource.includes("export interface EpubCFIRangeInput") &&
		epubcfiTypes.includes("export interface EpubCFIRangeInput") &&
		epubcfiSource.includes("constructor(cfiFrom?: EpubCFIInput, base?: EpubCFIBase, ignoreClass?: string)") &&
		epubcfiTypes.includes("constructor(cfiFrom?: EpubCFIInput, base?: EpubCFIBase, ignoreClass?: string)") &&
		typeIndex.includes("EpubCFIRangeInput") &&
		typeTests.includes("RootEpubCFIRangeInput, EpubCFIRangeInput") &&
		typeTests.includes("const locationRangeCfiInput: EpubCFIInput = locationRange") &&
		typeTests.includes("Parameters<EpubCFI[\"fromRange\"]>[0], Range | import('./compat/range').RangeObject | EpubCFIRangeInput") &&
		!epubcfiSource.includes("constructor(cfiFrom?: EpubCFIInput | any"),
	"EpubCFI source and declarations must keep constructor and lightweight range input typed without any"
);
assert(
	epubcfiSource.includes("segmentString(segment: EpubCFIComponent | Record<string, never>): string") &&
		epubcfiSource.includes('if (!("steps" in segment))') &&
		epubcfiTypes.includes("private segmentString(segment: EpubCFISegment): string") &&
		!epubcfiSource.includes("segmentString(segment: EpubCFIComponent | Record<string, any>): string"),
	"EpubCFI source must keep segmentString fallback typed without any"
);
assert(
	epubcfiTypes.includes("interface MissedBoundary") &&
		epubcfiTypes.includes("container: Node | null") &&
		epubcfiTypes.includes("private filteredStep(node: Node, ignoreClass?: string): EpubCFIStep | undefined") &&
		epubcfiTypes.includes("private findNode(steps: Array<EpubCFIStep>, _doc?: Document, ignoreClass?: string | null): Node | null") &&
		epubcfiTypes.includes("private fixMiss(steps: Array<EpubCFIStep>, offset: number | null | undefined, _doc?: Document, ignoreClass?: string | null): MissedBoundary") &&
		!epubcfiTypes.includes("private filteredStep(node: Node, ignoreClass?: string): any") &&
		!epubcfiTypes.includes("private fixMiss(steps: Array<EpubCFIStep>, offset: number, _doc?: Document, ignoreClass?: string): any"),
	"EpubCFI declarations must keep private boundary helpers typed"
);

assert(globalTypeTests.includes("const book = ePub("), "global namespace tests must cover callable ePub");
assert(globalTypeTests.includes("ePub.VERSION"), "global namespace tests must cover ePub.VERSION");
assert(globalTypeTests.includes("new ePub.CFI()"), "global namespace tests must cover static CFI constructor");

assert(publicApiTests.includes("ePub.Book"), "browser public API tests must cover root static Book");
assert(publicApiTests.includes("ePub.utils"), "browser public API tests must cover legacy utils facade");
assert(publicApiTests.includes("replaceBase"), "browser public API tests must cover root replacement helpers");
assert(umdGlobalTests.includes("window.ePub"), "UMD browser tests must cover window.ePub");

console.log("Gate 1 package entry and typed public API readiness verified.");

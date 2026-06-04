import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const tsconfig = JSON.parse(readFileSync(path.join(root, "tsconfig.json"), "utf8"));
const typeTests = readFileSync(path.join(root, "types/epubjs-tests.ts"), "utf8");
const sourceRoot = readFileSync(path.join(root, "src/index.ts"), "utf8");
const bookSource = readFileSync(path.join(root, "src/book.ts"), "utf8");
const contentsSource = readFileSync(path.join(root, "src/contents.ts"), "utf8");
const renditionSource = readFileSync(path.join(root, "src/rendition.ts"), "utf8");
const archiveSource = readFileSync(path.join(root, "src/archive.ts"), "utf8");
const storeSource = readFileSync(path.join(root, "src/store.ts"), "utf8");
const navigationTypes = readFileSync(path.join(root, "types/navigation.d.ts"), "utf8");
const pageListSource = readFileSync(path.join(root, "src/pagelist.ts"), "utf8");
const pageListTypes = readFileSync(path.join(root, "types/pagelist.d.ts"), "utf8");
const resourcesSource = readFileSync(path.join(root, "src/resources.ts"), "utf8");
const resourcesTypes = readFileSync(path.join(root, "types/resources.d.ts"), "utf8");
const storeTypes = readFileSync(path.join(root, "types/store.d.ts"), "utf8");
const locationsSource = readFileSync(path.join(root, "src/locations.ts"), "utf8");
const mappingSource = readFileSync(path.join(root, "src/mapping.ts"), "utf8");
const mappingTypes = readFileSync(path.join(root, "types/mapping.d.ts"), "utf8");
const globalTypeTests = readFileSync(path.join(root, "types/global-namespace-tests.ts"), "utf8");
const publicApiTests = readFileSync(path.join(root, "test/browser/public-api.test.js"), "utf8");
const umdGlobalTests = readFileSync(path.join(root, "test/browser/umd-global.test.js"), "utf8");

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
assert(sourceRoot.includes("BookLoaded") && sourceRoot.includes("BookLoading"), "source root must export Book loaded/loading types");
assert(typeTests.includes("BookLoading[\"metadata\"]"), "type tests must assert Book loading metadata typing");
assert(typeTests.includes("BookLoaded[\"metadata\"]"), "type tests must assert Book loaded metadata typing");
assert(typeTests.includes("BookLoading[\"manifest\"]"), "type tests must assert Book loading manifest typing");
assert(typeTests.includes("BookLoaded[\"manifest\"]"), "type tests must assert Book loaded manifest typing");
assert(typeTests.includes("RootContainerDocument"), "type tests must assert root Container type exports");
assert(
	sourceRoot.includes("ContainerDocument") && sourceRoot.includes("default as Container"),
	"source root must export Container public types"
);
assert(typeTests.includes("RootDisplayOptions"), "type tests must assert root DisplayOptions type export");
assert(sourceRoot.includes("default as DisplayOptions"), "source root must export DisplayOptions public type");
assert(typeTests.includes("RootRenditionOptions"), "type tests must assert root Rendition type exports");
assert(typeTests.includes("RootRenditionLocationPart"), "type tests must assert root Rendition location part type export");
assert(typeTests.includes("displayedLocation"), "type tests must cover DisplayedLocation compatibility typing");
assert(
	sourceRoot.includes("DisplayedLocation") && sourceRoot.includes("RenditionLocationPart") && sourceRoot.includes("RenditionOptions") && sourceRoot.includes("RenditionLayoutProperties"),
	"source root must export Rendition public types"
);
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
assert(typeTests.includes("type ArchiveAssertions"), "type tests must assert the Archive public surface");
assert(typeTests.includes("RootArchiveZip"), "type tests must assert root Archive zip typing");
assert(typeTests.includes("ArchiveMarkupRequestType, \"xml\" | \"opf\" | \"ncx\" | \"xhtml\" | \"html\" | \"htm\""), "type tests must assert Archive markup request typing");
assert(typeTests.includes("ArchiveZipOptions, { base64?: boolean | undefined }"), "type tests must assert Archive zip option typing");
assert(typeTests.includes("ReturnType<Archive[\"request\"]>"), "type tests must assert Archive request fallback typing");
assert(typeTests.includes("ReturnType<Archive[\"handleResponse\"]>"), "type tests must assert Archive response handling fallback typing");
assert(typeTests.includes("archiveZip.loadAsync(archiveInput, archiveZipOptions)"), "type tests must cover ArchiveZip loadAsync option typing");
assert(typeTests.includes("archive.createUrl(\"/OPS/images/cover.jpg\")"), "type tests must cover Archive createUrl optional options typing");
assert(typeTests.includes("archive.handleResponse(\"{\\\"ok\\\":true}\", \"json\")"), "type tests must cover Archive handleResponse typing");
assert(
	archiveSource.includes("request(url: string, type: \"blob\"") &&
	archiveSource.includes("request(url: string, type: ArchiveMarkupRequestType") &&
	archiveSource.includes("handleResponse(response: string, type: \"json\")") &&
	archiveSource.includes("handleResponse(response: string, type: ArchiveMarkupRequestType"),
	"source Archive must expose request and handleResponse overloads"
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
assert(typeTests.includes("ReturnType<Locations[\"emit\"]>, void"), "type tests must assert Locations emit typing");
assert(typeTests.includes("ReturnType<Locations[\"on\"]>, unknown"), "type tests must assert Locations on typing");
assert(typeTests.includes("ReturnType<Locations[\"off\"]>, unknown"), "type tests must assert Locations off typing");
assert(typeTests.includes("ReturnType<Locations[\"once\"]>, unknown"), "type tests must assert Locations once typing");
assert(typeTests.includes("locations.generateForSection"), "type tests must cover Locations section refinement typing");
assert(typeTests.includes("locations.parseWords"), "type tests must cover Locations word-location typing");
assert(
	locationsSource.includes("emit(eventName: string, data?: unknown): void") &&
	locationsSource.includes("on(eventName: string, listener: (...args: any[]) => void): unknown") &&
	locationsSource.includes("off(eventName: string, listener: (...args: any[]) => void): unknown") &&
	locationsSource.includes("once(eventName: string, listener: (...args: any[]) => void): unknown"),
	"source Locations must keep EventEmitter method type parity"
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
	mappingTypes.includes("axis(axis?: MappingAxis): boolean"),
	"Mapping source and declarations must keep MappingSection parity"
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
assert(typeTests.includes("ReturnType<Store[\"on\"]>, unknown"), "type tests must assert Store EventEmitter listener typing");
assert(typeTests.includes("const storeOn: unknown = store.on"), "type tests must cover Store on listener usage");
assert(typeTests.includes("const storeOff: unknown = store.off"), "type tests must cover Store off listener usage");
assert(typeTests.includes("const storeOnce: unknown = store.once"), "type tests must cover Store once listener usage");
assert(typeTests.includes("new Store(\"epubjs-type-store\", storeRequest, storeResolver)"), "type tests must cover Store constructor typing");
assert(typeTests.includes("store.createUrl(\"/OPS/images/cover.jpg\", storeUrlOptions)"), "type tests must cover Store createUrl optional options typing");
assert(
	storeSource.includes("request(url: string, type: \"blob\"") &&
	storeSource.includes("retrieve(url: string, type: \"blob\"") &&
	storeSource.includes("handleResponse(response: string, type: \"json\")"),
	"source Store must expose request, retrieve, and handleResponse overloads"
);
assert(
	storeSource.includes("emit(eventName: string, ...args: any[]): void") &&
	storeSource.includes("on(eventName: string, listener: (...args: any[]) => void): unknown") &&
	storeSource.includes("off(eventName: string, listener: (...args: any[]) => void): unknown") &&
	storeSource.includes("once(eventName: string, listener: (...args: any[]) => void): unknown"),
	"source Store must keep EventEmitter method type parity"
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
assert(typeTests.includes("ReturnType<Book[\"load\"]>, Promise<RequestResponse>"), "type tests must cover Book load request response typing");
assert(typeTests.includes("book.load(\"OPS/package.opf\", \"opf\")"), "type tests must cover Book load XML overload typing");
assert(typeTests.includes("book.load(\"manifest.json\", \"json\")"), "type tests must cover Book load JSON overload typing");
assert(typeTests.includes("ReturnType<Book[\"on\"]>, unknown"), "type tests must assert Book EventEmitter listener typing");
assert(typeTests.includes("const bookOn: unknown = book.on"), "type tests must cover Book on listener usage");
assert(typeTests.includes("const bookOff: unknown = book.off"), "type tests must cover Book off listener usage");
assert(typeTests.includes("const bookOnce: unknown = book.once"), "type tests must cover Book once listener usage");
assert(
	bookSource.includes("emit(type: string, ...args: any[]): void") &&
		bookSource.includes("on(type: string, listener: (...args: any[]) => void): unknown") &&
		bookSource.includes("off(type: string, listener: (...args: any[]) => void): unknown") &&
		bookSource.includes("once(type: string, listener: (...args: any[]) => void): unknown"),
	"source Book must keep EventEmitter method type parity"
);
assert(typeTests.includes("rendition.determineLayoutProperties"), "type tests must cover Rendition layout property typing");
assert(typeTests.includes("rendition.located([managerLocationItem])"), "type tests must cover Rendition manager location typing");
assert(typeTests.includes("rendition.resolveLinkHref(\"#note\""), "type tests must cover Rendition link resolution typing");
assert(typeTests.includes("ReturnType<Rendition[\"on\"]>, unknown"), "type tests must assert Rendition EventEmitter listener typing");
assert(typeTests.includes("const renditionOn: unknown = rendition.on"), "type tests must cover Rendition on listener usage");
assert(typeTests.includes("const renditionOff: unknown = rendition.off"), "type tests must cover Rendition off listener usage");
assert(typeTests.includes("const renditionOnce: unknown = rendition.once"), "type tests must cover Rendition once listener usage");
assert(
	renditionSource.includes("emit(type: string, ...args: any[]): void") &&
		renditionSource.includes("on(type: string, listener: (...args: any[]) => void): unknown") &&
		renditionSource.includes("off(type: string, listener: (...args: any[]) => void): unknown") &&
		renditionSource.includes("once(type: string, listener: (...args: any[]) => void): unknown"),
	"source Rendition must keep EventEmitter method type parity"
);
assert(
	typeTests.includes("RootContentsSize") &&
	typeTests.includes("RootVerticalRlMetricsCache") &&
	typeTests.includes("RootVerticalRlPageMetricsCache") &&
	typeTests.includes("RootViewportSettings"),
	"type tests must assert root Contents type exports"
);
assert(typeTests.includes("typedContents._size"), "type tests must cover Contents runtime size state typing");
assert(typeTests.includes("typedContents.sectionHref"), "type tests must cover Contents sectionHref state typing");
assert(typeTests.includes("typedContents._verticalRlMetricsCache"), "type tests must cover Contents vertical-rl metrics cache typing");
assert(typeTests.includes("Parameters<Contents[\"fit\"]>, [width: number, height: number, section?: unknown]"), "type tests must assert Contents fit optional section typing");
assert(typeTests.includes("typedContents.fit(320, 480"), "type tests must cover Contents fit optional section usage");
assert(typeTests.includes("ReturnType<Contents[\"on\"]>, unknown"), "type tests must assert Contents EventEmitter listener typing");
assert(typeTests.includes("const contentsOn: unknown = typedContents.on"), "type tests must cover Contents on listener usage");
assert(typeTests.includes("const contentsOff: unknown = typedContents.off"), "type tests must cover Contents off listener usage");
assert(typeTests.includes("const contentsOnce: unknown = typedContents.once"), "type tests must cover Contents once listener usage");
assert(
	contentsSource.includes("emit(type: string, ...args: any[]): void") &&
		contentsSource.includes("on(type: string, listener: (...args: any[]) => void): unknown") &&
		contentsSource.includes("off(type: string, listener: (...args: any[]) => void): unknown") &&
		contentsSource.includes("once(type: string, listener: (...args: any[]) => void): unknown"),
	"source Contents must keep EventEmitter method type parity"
);
assert(contentsSource.includes("fit(width: number, height: number, section?: unknown): void"), "source Contents must keep fit optional section typed as unknown");
assert(
	sourceRoot.includes("\tContents,") &&
	sourceRoot.includes("ContentsSize") &&
	sourceRoot.includes("VerticalRlMetricsCache") &&
	sourceRoot.includes("VerticalRlPageMetricsCache") &&
	sourceRoot.includes("ViewportSettings"),
	"source root must export Contents public types"
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
assert(typeTests.includes("new ePub.utils.RangeObject()"), "type tests must cover utils/core RangeObject typing");
assert(typeTests.includes("type EpubCFIAssertions"), "type tests must assert the EpubCFI public surface");
assert(typeTests.includes("RootParsedEpubCFI"), "type tests must assert root EpubCFI type exports");
assert(typeTests.includes("cfi.parse(\"epubcfi(/6/2[cover]!/6)\")"), "type tests must cover EpubCFI parse typing");
assert(typeTests.includes("cfi.checkType(\"epubcfi(/6/2[cover]!/6)\")"), "type tests must cover EpubCFI checkType typing");
assert(typeTests.includes("cfi.fromRange(parsedDocument.createRange(), cfiBase)"), "type tests must cover EpubCFI range construction typing");
assert(
	sourceRoot.includes("ParsedEpubCFI") && sourceRoot.includes("EpubCFISegment") && sourceRoot.includes("EpubCFIInput"),
	"source root must export EpubCFI public types"
);

assert(globalTypeTests.includes("const book = ePub("), "global namespace tests must cover callable ePub");
assert(globalTypeTests.includes("ePub.VERSION"), "global namespace tests must cover ePub.VERSION");
assert(globalTypeTests.includes("new ePub.CFI()"), "global namespace tests must cover static CFI constructor");

assert(publicApiTests.includes("ePub.Book"), "browser public API tests must cover root static Book");
assert(publicApiTests.includes("ePub.utils"), "browser public API tests must cover legacy utils facade");
assert(publicApiTests.includes("replaceBase"), "browser public API tests must cover root replacement helpers");
assert(umdGlobalTests.includes("window.ePub"), "UMD browser tests must cover window.ePub");

console.log("Gate 1 package entry and typed public API readiness verified.");

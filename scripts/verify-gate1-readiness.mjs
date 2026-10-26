import { sourceIncludes } from "./source-contract.mjs";
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
const continuousManagerSource = readFileSync(
    path.join(root, "src/managers/continuous/index.ts"),
    "utf8",
);
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
const pathPosixSource = readFileSync(path.join(root, "src/utils/path-posix.ts"), "utf8");
const timingSource = readFileSync(path.join(root, "src/utils/timing.ts"), "utf8");
const globalTypeTests = readFileSync(path.join(root, "types/global-namespace-tests.ts"), "utf8");
const bookTests = readFileSync(path.join(root, "test/browser/book.test.js"), "utf8");
const publicApiTests = readFileSync(path.join(root, "test/browser/public-api.test.js"), "utf8");
const umdGlobalTests = readFileSync(path.join(root, "test/browser/umd-global.test.js"), "utf8");
const viewsTests = readFileSync(path.join(root, "test/browser/views.test.js"), "utf8");
const requestTests = readFileSync(path.join(root, "test/browser/request.test.js"), "utf8");
const sectionTests = readFileSync(path.join(root, "test/browser/section.test.js"), "utf8");
const contentsTextWidthTests = readFileSync(
    path.join(root, "test/browser/contents-text-width.test.js"),
    "utf8",
);
const renditionTests = readFileSync(path.join(root, "test/browser/rendition.test.js"), "utf8");

const requiredScripts = {
    "build:modules": "vp build --config vite.config.mjs",
    "build:umd": "vp build --config vite.umd.config.mjs",
    "test:browser": "vp test run --config vitest.browser.config.mjs",
    typecheck: "tsc -p tsconfig.json --noEmit",
    "verify:gate1-readiness": "node scripts/verify-gate1-readiness.mjs",
    "verify:package-entry": "node scripts/verify-package-entry.mjs",
    "verify:packed-package-entry": "node scripts/verify-packed-package-entry.mjs",
};

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function assertScript(name, expectedCommand) {
    assert(
        packageJson.scripts[name] === expectedCommand,
        `${name} script must be ${expectedCommand}`,
    );
}

function assertFile(relativePath) {
    assert(existsSync(path.join(root, relativePath)), `${relativePath} must exist`);
}

for (const [scriptName, expectedCommand] of Object.entries(requiredScripts)) {
    assertScript(scriptName, expectedCommand);
}

assert(
    sourceIncludes(packageJson.scripts["verify:contracts"], "pnpm run verify:gate1-readiness"),
    "verify:contracts must include verify:gate1-readiness",
);
assert(
    sourceIncludes(packageJson.scripts["verify:release"], "pnpm run typecheck") &&
        sourceIncludes(packageJson.scripts["verify:release"], "pnpm run build") &&
        sourceIncludes(packageJson.scripts["verify:release"], "pnpm run verify:contracts") &&
        sourceIncludes(packageJson.scripts["verify:release"], "pnpm run test:browser"),
    "verify:release must include typecheck, build, contracts, and browser tests",
);

assert(packageJson.main === "./dist/epub.cjs", "package main must point at dist/epub.cjs");
assert(packageJson.module === "./dist/epub.mjs", "package module must point at dist/epub.mjs");
assert(packageJson.browser === "./dist/epub.js", "package browser must point at dist/epub.js");
assert(packageJson.types === "./types/index.d.ts", "package types must point at types/index.d.ts");
assert(
    packageJson.exports["."].types === packageJson.types,
    "root export types must match package types",
);
assert(
    packageJson.exports["."].import === packageJson.module,
    "root export import must match package module",
);
assert(
    packageJson.exports["."].require === packageJson.main,
    "root export require must match package main",
);
assert(
    packageJson.exports["."].default === packageJson.module,
    "root export default must match package module",
);

assertFile("vite.config.mjs");
assertFile("vite.umd.config.mjs");
assertFile("vitest.browser.config.mjs");
assertFile("types/index.d.ts");
assertFile("types/epub.d.ts");
assertFile("types/epubjs-tests.ts");
assertFile("types/global-namespace-tests.ts");
assertFile("test/browser/public-api.test.js");
assertFile("test/browser/umd-global.test.js");

assert(
    sourceIncludes(tsconfig.include, "src/**/*.ts"),
    "tsconfig must include TypeScript source files",
);
assert(
    sourceIncludes(tsconfig.include, "types/**/*.d.ts"),
    "tsconfig must include declaration files",
);
assert(sourceIncludes(tsconfig.include, "types/**/*-tests.ts"), "tsconfig must include type tests");

assert(
    sourceIncludes(typeTests, "type PublicRootAssertions"),
    "type tests must assert the public root surface",
);
assert(
    sourceIncludes(typeTests, "RootBookInput"),
    "type tests must assert root BookInput type export",
);
assert(
    sourceIncludes(typeTests, "ePub(rootBlobInput"),
    "type tests must cover root Blob input overload",
);
assert(
    sourceIncludes(typeTests, "ePub(rootOptions)"),
    "type tests must cover root options-only overload",
);
assert(
    sourceIncludes(sourceRoot, "BookLoaded") &&
        sourceIncludes(sourceRoot, "BookLoading") &&
        sourceIncludes(sourceRoot, "BookReady"),
    "source root must export Book loaded/loading/ready types",
);
assert(
    sourceIncludes(typeTests, "RootBookReady"),
    "type tests must assert root BookReady type export",
);
assert(
    sourceIncludes(typeTests, 'BookLoading["metadata"]'),
    "type tests must assert Book loading metadata typing",
);
assert(
    sourceIncludes(typeTests, 'BookLoaded["metadata"]'),
    "type tests must assert Book loaded metadata typing",
);
assert(
    sourceIncludes(typeTests, 'BookLoading["manifest"]'),
    "type tests must assert Book loading manifest typing",
);
assert(
    sourceIncludes(typeTests, 'BookLoaded["manifest"]'),
    "type tests must assert Book loaded manifest typing",
);
assert(
    sourceIncludes(bookSource, "export type BookReady = [") &&
        sourceIncludes(typeTests, 'Book["ready"], Promise<BookReady> | undefined') &&
        sourceIncludes(typeTests, "const bookReady: Promise<BookReady> | undefined = book.ready"),
    "BookReady tuple and ready promise typing must stay covered",
);
assert(
    sourceIncludes(typeTests, "RootContainerDocument"),
    "type tests must assert root Container type exports",
);
assert(
    sourceIncludes(sourceRoot, "ContainerDocument") &&
        sourceIncludes(sourceRoot, "default as Container"),
    "source root must export Container public types",
);
assert(
    sourceIncludes(typeTests, "RootDisplayOptions"),
    "type tests must assert root DisplayOptions type export",
);
assert(
    sourceIncludes(sourceRoot, "default as DisplayOptions"),
    "source root must export DisplayOptions public type",
);
assert(
    sourceIncludes(typeTests, "RootRenditionOptions"),
    "type tests must assert root Rendition type exports",
);
assert(
    sourceIncludes(typeTests, "RootRenditionLocationPart"),
    "type tests must assert root Rendition location part type export",
);
assert(
    sourceIncludes(typeTests, "RootRenditionVerticalRlDebugState"),
    "type tests must assert root Rendition vertical-rl debug state type export",
);
assert(
    sourceIncludes(typeTests, "displayedLocation"),
    "type tests must cover DisplayedLocation compatibility typing",
);
assert(
    sourceIncludes(sourceRoot, "DisplayedLocation") &&
        sourceIncludes(sourceRoot, "RenditionLocationPart") &&
        sourceIncludes(sourceRoot, "RenditionOptions") &&
        sourceIncludes(sourceRoot, "RenditionLayoutProperties") &&
        sourceIncludes(sourceRoot, "RenditionVerticalRlDebugState"),
    "source root must export Rendition public types",
);
assert(
    sourceIncludes(
        typeTests,
        'ReturnType<Rendition["debugVerticalRlPage"]>, RenditionVerticalRlDebugState',
    ),
    "type tests must assert Rendition vertical-rl debug return typing",
);
assert(
    sourceIncludes(
        typeTests,
        "const renditionDebugState: RenditionVerticalRlDebugState = rendition.debugVerticalRlPage()",
    ),
    "type tests must cover Rendition vertical-rl debug state usage",
);
assert(
    sourceIncludes(typeTests, "RootNavigation") &&
        sourceIncludes(typeTests, "RootNavItem") &&
        sourceIncludes(typeTests, "RootLandmarkItem") &&
        sourceIncludes(typeTests, "RootNavigationDocument") &&
        sourceIncludes(typeTests, "RootNavigationInput") &&
        sourceIncludes(typeTests, "RootNavigationInputItem"),
    "type tests must assert root Navigation type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Navigation") &&
        sourceIncludes(sourceRoot, "LandmarkItem") &&
        sourceIncludes(sourceRoot, "NavigationInput") &&
        sourceIncludes(sourceRoot, "NavigationInputItem") &&
        sourceIncludes(sourceRoot, "NavItem") &&
        sourceIncludes(sourceRoot, "NavigationDocument"),
    "source root must export Navigation public types",
);
assert(
    sourceIncludes(typeTests, "RootPageList") &&
        sourceIncludes(typeTests, "RootPageListDocument") &&
        sourceIncludes(typeTests, "RootPageListItem") &&
        sourceIncludes(typeTests, "RootPageLookup") &&
        sourceIncludes(typeTests, "RootPageReverseLookup") &&
        sourceIncludes(typeTests, "RootPageValue"),
    "type tests must assert root PageList type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as PageList") &&
        sourceIncludes(sourceRoot, "PageListDocument") &&
        sourceIncludes(sourceRoot, "PageListItem") &&
        sourceIncludes(sourceRoot, "PageLookup") &&
        sourceIncludes(sourceRoot, "PageReverseLookup") &&
        sourceIncludes(sourceRoot, "PageValue"),
    "source root must export PageList public types",
);
assert(
    sourceIncludes(typeTests, "RootPath") && sourceIncludes(typeTests, "RootParsedPath"),
    "type tests must assert root Path type exports",
);
assert(
    sourceIncludes(sourceRoot, "ParsedPath") && sourceIncludes(sourceRoot, "default as Path"),
    "source root must export Path public types",
);
assert(
    sourceIncludes(typeTests, "RootUrl") && sourceIncludes(typeTests, "RootUrlBase"),
    "type tests must assert root Url type exports",
);
assert(
    sourceIncludes(sourceRoot, "UrlBase") && sourceIncludes(sourceRoot, "default as Url"),
    "source root must export Url public types",
);
assert(
    sourceIncludes(typeTests, "RootLinkCallback") && sourceIncludes(typeTests, "RootSectionLike"),
    "type tests must assert root replacements type exports",
);
assert(
    sourceIncludes(sourceRoot, "LinkCallback") &&
        sourceIncludes(sourceRoot, "SectionLike") &&
        sourceIncludes(sourceRoot, "replaceBase") &&
        sourceIncludes(sourceRoot, "replaceCanonical") &&
        sourceIncludes(sourceRoot, "replaceLinks") &&
        sourceIncludes(sourceRoot, "replaceMeta") &&
        sourceIncludes(sourceRoot, "substitute"),
    "source root must export replacements public helpers",
);
assert(
    sourceIncludes(typeTests, "RootSection") &&
        sourceIncludes(typeTests, "RootGlobalLayout") &&
        sourceIncludes(typeTests, "RootSectionLayoutSettings") &&
        sourceIncludes(typeTests, "RootSectionHookSet") &&
        sourceIncludes(typeTests, "RootSectionRequest") &&
        sourceIncludes(typeTests, "RootSectionSearchResult") &&
        sourceIncludes(typeTests, "RootSpineItem"),
    "type tests must assert root Section type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Section") &&
        sourceIncludes(sourceRoot, "GlobalLayout") &&
        sourceIncludes(sourceRoot, "SectionLayoutSettings") &&
        sourceIncludes(sourceRoot, "SectionHookSet") &&
        sourceIncludes(sourceRoot, "SectionRequest") &&
        sourceIncludes(sourceRoot, "SectionSearchResult") &&
        sourceIncludes(sourceRoot, "SpineItem"),
    "source root must export Section public types",
);
assert(
    sourceIncludes(stageSource, "dir?: string") &&
        sourceIncludes(stageSource, "[key: string]: unknown") &&
        sourceIncludes(stageSource, "extend(this.settings, options)") &&
        !sourceIncludes(stageSource, "[key: string]: any") &&
        !sourceIncludes(stageSource, "(extend as any)(this.settings, options)"),
    "Stage helper options must keep typed extension bridge",
);
assert(
    sourceIncludes(snapSource, "type DeferredLike<T = unknown>") &&
        sourceIncludes(
            snapSource,
            "const Defer = defer as unknown as { new<T = unknown>(): DeferredLike<T>; }",
        ) &&
        sourceIncludes(snapSource, "type TouchWindow = Window &") &&
        sourceIncludes(snapSource, "type WebKitOverflowStyle = CSSStyleDeclaration") &&
        sourceIncludes(snapSource, "export type ManagerLike =") &&
        sourceIncludes(snapSource, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(snapSource, "extend<SnapSettings>({") &&
        sourceIncludes(
            snapSource,
            '(this.element.style as WebKitOverflowStyle).WebkitOverflowScrolling = "touch"',
        ) &&
        sourceIncludes(snapSource, "const touchWindow = window as TouchWindow") &&
        sourceIncludes(snapSource, "snap(howMany=0): Promise<void>") &&
        sourceIncludes(snapSource, "smoothScrollTo(destination: number): Promise<void>") &&
        sourceIncludes(snapSource, "const deferred = new Defer<void>()") &&
        !sourceIncludes(snapSource, "emit(type: string, ...args: any[]): void") &&
        !sourceIncludes(snapSource, "(extend as any)") &&
        !sourceIncludes(snapSource, "(this.element.style as any)") &&
        !sourceIncludes(snapSource, "(window as any).DocumentTouch") &&
        !sourceIncludes(snapSource, "snap(howMany=0): Promise<any>") &&
        !sourceIncludes(snapSource, "smoothScrollTo(destination: number): Promise<any>"),
    "Snap helper must keep typed touch, event, settings, and promise bridges",
);
assert(
    sourceIncludes(timingSource, "T extends (...args: unknown[]) => unknown") &&
        sourceIncludes(timingSource, "flush(): ReturnType<T>") &&
        sourceIncludes(timingSource, "maxWait: wait") &&
        !sourceIncludes(timingSource, "lodash/") &&
        sourceIncludes(continuousManagerSource, 'import { debounce } from "../../utils/timing"') &&
        sourceIncludes(stageSource, 'import { throttle } from "../../utils/timing"') &&
        !("lodash" in (packageJson.dependencies || {})),
    "internal debounce/throttle helpers must preserve typed controls without lodash",
);
assert(
    sourceIncludes(pathPosixSource, "export function resolvePath") &&
        sourceIncludes(pathPosixSource, "export function relativePath") &&
        sourceIncludes(pathPosixSource, "export function dirnamePath") &&
        !("path-webpack" in (packageJson.dependencies || {})),
    "internal POSIX path helpers must replace path-webpack",
);
assert(
    sourceIncludes(sectionSource, "type DeferConstructor = new <T = unknown>()") &&
        sourceIncludes(sectionSource, "reject(error?: unknown): void") &&
        sourceIncludes(sectionSource, "type HookConstructor = new (context?: unknown) => Hook") &&
        !sourceIncludes(sectionSource, "reject(error?: any): void") &&
        !sourceIncludes(sectionSource, "type HookConstructor = new (context?: any) => Hook"),
    "source Section must keep deferred rejection and Hook constructor context typed as unknown",
);
assert(
    sourceIncludes(typeTests, "RootSpine") &&
        sourceIncludes(typeTests, "RootSpineLookup") &&
        sourceIncludes(typeTests, "RootSpineManifestItem") &&
        sourceIncludes(typeTests, "RootSpinePackage") &&
        sourceIncludes(typeTests, "RootSpinePackageItem") &&
        sourceIncludes(typeTests, "RootSpineResolver"),
    "type tests must assert root Spine type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Spine") &&
        sourceIncludes(sourceRoot, "SpineLookup") &&
        sourceIncludes(sourceRoot, "SpineManifestItem") &&
        sourceIncludes(sourceRoot, "SpinePackage") &&
        sourceIncludes(sourceRoot, "SpinePackageItem") &&
        sourceIncludes(sourceRoot, "SpineResolver"),
    "source root must export Spine public types",
);
assert(
    sourceIncludes(spineSource, "type HookConstructor = new (context?: unknown) => Hook") &&
        !sourceIncludes(spineSource, "type HookConstructor = new (context?: any) => Hook"),
    "source Spine must keep Hook constructor context typed as unknown",
);
assert(
    sourceIncludes(typeTests, "RootMapping") &&
        sourceIncludes(typeTests, "RootEpubCFIPair") &&
        sourceIncludes(typeTests, "RootMappingAxis") &&
        sourceIncludes(typeTests, "RootMappingContents") &&
        sourceIncludes(typeTests, "RootMappingDirection") &&
        sourceIncludes(typeTests, "RootMappingLayout") &&
        sourceIncludes(typeTests, "RootMappingSection") &&
        sourceIncludes(typeTests, "RootMappingTextNodeWalker") &&
        sourceIncludes(typeTests, "RootMappingView") &&
        sourceIncludes(typeTests, "RootRangePair"),
    "type tests must assert root Mapping type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Mapping") &&
        sourceIncludes(sourceRoot, "EpubCFIPair") &&
        sourceIncludes(sourceRoot, "MappingAxis") &&
        sourceIncludes(sourceRoot, "MappingContents") &&
        sourceIncludes(sourceRoot, "MappingDirection") &&
        sourceIncludes(sourceRoot, "MappingLayout") &&
        sourceIncludes(sourceRoot, "MappingSection") &&
        sourceIncludes(sourceRoot, "MappingTextNodeWalker") &&
        sourceIncludes(sourceRoot, "MappingView") &&
        sourceIncludes(sourceRoot, "RangePair"),
    "source root must export Mapping public types",
);
assert(
    sourceIncludes(typeTests, "RootLocations") &&
        sourceIncludes(typeTests, "RootLocationInput") &&
        sourceIncludes(typeTests, "RootLocationRange") &&
        sourceIncludes(typeTests, "RootLocationsRequest") &&
        sourceIncludes(typeTests, "RootWordLocation"),
    "type tests must assert root Locations type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Locations") &&
        sourceIncludes(sourceRoot, "LocationInput") &&
        sourceIncludes(sourceRoot, "LocationRange") &&
        sourceIncludes(sourceRoot, "LocationsRequest") &&
        sourceIncludes(sourceRoot, "WordLocation"),
    "source root must export Locations public types",
);
assert(
    sourceIncludes(
        locationsSource,
        "LocationsRequest = (...args: unknown[]) => Promise<unknown>",
    ) &&
        sourceIncludes(
            locationsTypes,
            "LocationsRequest = (...args: unknown[]) => Promise<unknown>",
        ) &&
        sourceIncludes(typeTests, "LocationsRequest, (...args: unknown[]) => Promise<unknown>") &&
        sourceIncludes(typeTests, "Promise<unknown> = locationsRequest"),
    "LocationsRequest source, declarations, and type tests must keep unknown argument and result parity",
);
assert(
    sourceIncludes(locationsSource, 'import type { EpubCFIStep } from "./epubcfi"') &&
        sourceIncludes(locationsSource, "findNode(steps: EpubCFIStep[], doc: Document): Node") &&
        sourceIncludes(locationsSource, "steps: EpubCFIStep[]") &&
        !sourceIncludes(locationsSource, "findNode(steps: any[], doc: Document): Node") &&
        !sourceIncludes(locationsSource, "steps: any[]"),
    "Locations source must keep EpubCFIStart CFI steps typed",
);
assert(
    sourceIncludes(locationsSource, "type DeferConstructor = new <T = unknown>()") &&
        sourceIncludes(locationsSource, "new (defer as unknown as DeferConstructor)<string[]>()") &&
        sourceIncludes(
            locationsSource,
            "new (defer as unknown as DeferConstructor)<WordLocation[]>()",
        ) &&
        !sourceIncludes(locationsSource, "new (defer as any)()"),
    "Locations source must keep deferred bridge typed",
);
assert(
    sourceIncludes(typeTests, "RootThemes") &&
        sourceIncludes(typeTests, "RootInjectedThemes") &&
        sourceIncludes(typeTests, "RootTheme") &&
        sourceIncludes(typeTests, "RootThemeInput") &&
        sourceIncludes(typeTests, "RootThemeOverride") &&
        sourceIncludes(typeTests, "RootThemeRules") &&
        sourceIncludes(typeTests, "RootThemesContent") &&
        sourceIncludes(typeTests, "RootThemesRendition"),
    "type tests must assert root Themes type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Themes") &&
        sourceIncludes(sourceRoot, "InjectedThemes") &&
        sourceIncludes(sourceRoot, "ThemeInput") &&
        sourceIncludes(sourceRoot, "ThemeOverride") &&
        sourceIncludes(sourceRoot, "ThemeRules") &&
        sourceIncludes(sourceRoot, "ThemesContent") &&
        sourceIncludes(sourceRoot, "ThemesRendition"),
    "source root must export Themes public types",
);
assert(
    sourceIncludes(typeTests, "RootResources") &&
        sourceIncludes(typeTests, "RootReplacementMode") &&
        sourceIncludes(typeTests, "RootResourceArchive") &&
        sourceIncludes(typeTests, "RootResourceArchiveInput") &&
        sourceIncludes(typeTests, "RootResourceManifest") &&
        sourceIncludes(typeTests, "RootResourceManifestItem") &&
        sourceIncludes(typeTests, "RootResourceOptions") &&
        sourceIncludes(typeTests, "RootResourceRequest") &&
        sourceIncludes(typeTests, "RootResourceResolver") &&
        sourceIncludes(typeTests, "RootResourceSettings"),
    "type tests must assert root Resources type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Resources") &&
        sourceIncludes(sourceRoot, "ReplacementMode") &&
        sourceIncludes(sourceRoot, "ResourceArchive") &&
        sourceIncludes(sourceRoot, "ResourceArchiveInput") &&
        sourceIncludes(sourceRoot, "ResourceManifest") &&
        sourceIncludes(sourceRoot, "ResourceManifestItem") &&
        sourceIncludes(sourceRoot, "ResourceOptions") &&
        sourceIncludes(sourceRoot, "ResourceRequest") &&
        sourceIncludes(sourceRoot, "ResourceResolver") &&
        sourceIncludes(sourceRoot, "ResourceSettings"),
    "source root must export Resources public types",
);
assert(
    sourceIncludes(typeTests, "RootStore") &&
        sourceIncludes(typeTests, "RootStoreData") &&
        sourceIncludes(typeTests, "RootStoreHeaders") &&
        sourceIncludes(typeTests, "RootStoreMarkupRequestType") &&
        sourceIncludes(typeTests, "RootStoreRequest") &&
        sourceIncludes(typeTests, "RootStoreRequestResponse") &&
        sourceIncludes(typeTests, "RootStoreRequestType") &&
        sourceIncludes(typeTests, "RootStoreResolver") &&
        sourceIncludes(typeTests, "RootStoreResource") &&
        sourceIncludes(typeTests, "RootStoreResources") &&
        sourceIncludes(typeTests, "RootStoreStorage") &&
        sourceIncludes(typeTests, "RootStoreUrlOptions"),
    "type tests must assert root Store type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Store") &&
        sourceIncludes(sourceRoot, "StoreData") &&
        sourceIncludes(sourceRoot, "StoreHeaders") &&
        sourceIncludes(sourceRoot, "StoreMarkupRequestType") &&
        sourceIncludes(sourceRoot, "StoreRequest") &&
        sourceIncludes(sourceRoot, "StoreRequestResponse") &&
        sourceIncludes(sourceRoot, "StoreRequestType") &&
        sourceIncludes(sourceRoot, "StoreResolver") &&
        sourceIncludes(sourceRoot, "StoreResource") &&
        sourceIncludes(sourceRoot, "StoreResources") &&
        sourceIncludes(sourceRoot, "StoreStorage") &&
        sourceIncludes(sourceRoot, "StoreUrlOptions"),
    "source root must export Store public types",
);
assert(
    sourceIncludes(typeTests, "RootArchive") &&
        sourceIncludes(typeTests, "RootArchiveEntry") &&
        sourceIncludes(typeTests, "RootArchiveInput") &&
        sourceIncludes(typeTests, "RootArchiveMarkupRequestType") &&
        sourceIncludes(typeTests, "RootArchiveRequestType") &&
        sourceIncludes(typeTests, "RootArchiveUrlOptions") &&
        sourceIncludes(typeTests, "RootArchiveZip") &&
        sourceIncludes(typeTests, "RootArchiveZipOptions"),
    "type tests must assert root Archive type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Archive") &&
        sourceIncludes(sourceRoot, "ArchiveEntry") &&
        sourceIncludes(sourceRoot, "ArchiveInput") &&
        sourceIncludes(sourceRoot, "ArchiveMarkupRequestType") &&
        sourceIncludes(sourceRoot, "ArchiveRequestType") &&
        sourceIncludes(sourceRoot, "ArchiveUrlOptions") &&
        sourceIncludes(sourceRoot, "ArchiveZip") &&
        sourceIncludes(sourceRoot, "ArchiveZipOptions"),
    "source root must export Archive public types",
);
assert(
    sourceIncludes(typeTests, "RootPackaging") &&
        sourceIncludes(typeTests, "RootPackagingJsonManifest") &&
        sourceIncludes(typeTests, "RootPackagingJsonManifestBase") &&
        sourceIncludes(typeTests, "RootPackagingManifest") &&
        sourceIncludes(typeTests, "RootPackagingManifestItem") &&
        sourceIncludes(typeTests, "RootPackagingManifestObject") &&
        sourceIncludes(typeTests, "RootPackagingMetadata") &&
        sourceIncludes(typeTests, "RootPackagingMetadataObject") &&
        sourceIncludes(typeTests, "RootPackagingObject") &&
        sourceIncludes(typeTests, "RootPackagingSpineItem") &&
        sourceIncludes(typeTests, "RootPackagingTocItem"),
    "type tests must assert root Packaging type exports",
);
assert(
    sourceIncludes(sourceRoot, "default as Packaging") &&
        sourceIncludes(sourceRoot, "PackagingJsonManifest") &&
        sourceIncludes(sourceRoot, "PackagingJsonManifestBase") &&
        sourceIncludes(sourceRoot, "PackagingManifest") &&
        sourceIncludes(sourceRoot, "PackagingManifestItem") &&
        sourceIncludes(sourceRoot, "PackagingManifestObject") &&
        sourceIncludes(sourceRoot, "PackagingMetadata") &&
        sourceIncludes(sourceRoot, "PackagingMetadataObject") &&
        sourceIncludes(sourceRoot, "PackagingObject") &&
        sourceIncludes(sourceRoot, "PackagingSpineItem") &&
        sourceIncludes(sourceRoot, "PackagingTocItem"),
    "source root must export Packaging public types",
);
assert(
    sourceIncludes(typeTests, "type CoreClassAssertions"),
    "type tests must assert the core class surface",
);
assert(
    sourceIncludes(typeTests, "type LayoutAssertions"),
    "type tests must assert the Layout public surface",
);
assert(
    sourceIncludes(typeTests, "RootLayoutContent") &&
        sourceIncludes(typeTests, "RootLayoutCount") &&
        sourceIncludes(typeTests, "RootLayoutProps") &&
        sourceIncludes(typeTests, "RootLayoutSettings"),
    "type tests must assert root Layout type exports",
);
assert(
    sourceIncludes(typeTests, "new Layout()"),
    "type tests must cover Layout construction without settings",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<LayoutContent["fit"]>'),
    "type tests must cover Layout content bridge method return typing",
);
assert(
    sourceIncludes(typeTests, "runtimeLayout.format(layoutContent"),
    "type tests must cover Layout format content typing",
);
assert(
    sourceIncludes(typeTests, "runtimeLayout.count(4100)"),
    "type tests must cover Layout count typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Layout["emit"]>, void'),
    "type tests must assert Layout emit return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Layout["on"]>, unknown'),
    "type tests must assert Layout on return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Layout["off"]>, unknown'),
    "type tests must assert Layout off return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Layout["once"]>, unknown'),
    "type tests must assert Layout once return typing",
);
assert(
    sourceIncludes(typeTests, 'EpubLayoutSettings["spread"], string | boolean | undefined'),
    "type tests must assert Layout settings boolean spread typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Layout["spread"]>, [spread?: string | boolean | undefined, min?: number | undefined]',
    ),
    "type tests must assert Layout spread boolean parameter typing",
);
assert(
    sourceIncludes(typeTests, "const layoutBooleanSpread: boolean = runtimeLayout.spread"),
    "type tests must cover Layout boolean spread usage",
);
assert(
    sourceIncludes(typeTests, "const layoutEmit: void = runtimeLayout.emit"),
    "type tests must cover Layout emit usage",
);
assert(
    sourceIncludes(typeTests, "const layoutOn: unknown = runtimeLayout.on"),
    "type tests must cover Layout on usage",
);
assert(
    sourceIncludes(typeTests, "const layoutOff: unknown = runtimeLayout.off"),
    "type tests must cover Layout off usage",
);
assert(
    sourceIncludes(typeTests, "const layoutOnce: unknown = runtimeLayout.once"),
    "type tests must cover Layout once usage",
);
assert(
    sourceIncludes(layoutSource, "spread?: string | boolean") &&
        sourceIncludes(layoutSource, "spread(spread?: string | boolean, min?: number): boolean") &&
        sourceIncludes(layoutTypes, "spread?: string | boolean") &&
        sourceIncludes(layoutTypes, "spread(spread?: string | boolean, min?: number): boolean"),
    "source and declaration Layout must keep boolean spread type parity",
);
assert(
    sourceIncludes(layoutSource, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            layoutSource,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            layoutSource,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            layoutSource,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "source Layout must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(sourceRoot, "\tLayout,") &&
        sourceIncludes(sourceRoot, "LayoutContent") &&
        sourceIncludes(sourceRoot, "LayoutCount") &&
        sourceIncludes(sourceRoot, "LayoutProps") &&
        sourceIncludes(sourceRoot, "LayoutSettings"),
    "source root must export Layout public types",
);
assert(
    sourceIncludes(typeTests, "type NavigationAssertions"),
    "type tests must assert the Navigation public surface",
);
assert(
    sourceIncludes(typeTests, "ConstructorParameters<typeof Navigation>"),
    "type tests must cover Navigation constructor input typing",
);
assert(
    sourceIncludes(typeTests, "new Navigation(legacyNavItems)"),
    "type tests must cover legacy JSON Navigation construction",
);
assert(
    sourceIncludes(typeTests, "legacyNavigation.get()"),
    "type tests must cover Navigation get() toc overload",
);
assert(
    sourceIncludes(typeTests, "legacyNavigation.landmark()"),
    "type tests must cover Navigation landmark() list overload",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Navigation["parseNavList"]>'),
    "type tests must cover Navigation parseNavList typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Navigation["navItem"]>, NavItem | undefined'),
    "type tests must cover Navigation navItem fallback typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Navigation["landmarkItem"]>, LandmarkItem | undefined'),
    "type tests must cover Navigation landmarkItem fallback typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Navigation["getByIndex"]>'),
    "type tests must cover Navigation getByIndex optional index typing",
);
assert(
    sourceIncludes(navigationTypes, "parseNav(navHtml: NavigationDocument)") &&
        sourceIncludes(navigationTypes, "parseNavList(navListHtml?: Element, parent?: string)") &&
        sourceIncludes(
            navigationTypes,
            "navItem(item: Element, parent?: string): NavItem | undefined",
        ) &&
        sourceIncludes(navigationTypes, "landmarkItem(item: Element): LandmarkItem | undefined") &&
        sourceIncludes(
            navigationTypes,
            "getByIndex(target: string, index: number | undefined, navItems: NavItem[]): NavItem | undefined",
        ),
    "Navigation declarations must match source parser helper signatures",
);
assert(
    sourceIncludes(typeTests, "type SectionAssertions"),
    "type tests must assert the Section public surface",
);
assert(
    sourceIncludes(typeTests, "new Section(spineItem)"),
    "type tests must cover Section construction without explicit hooks",
);
assert(
    sourceIncludes(typeTests, 'section.search("Text")'),
    "type tests must cover Section search result typing",
);
assert(
    sourceIncludes(typeTests, "type SpineAssertions"),
    "type tests must assert the Spine public surface",
);
assert(
    sourceIncludes(typeTests, "spine.unpack(spinePackage"),
    "type tests must cover Spine unpack package typing",
);
assert(
    sourceIncludes(typeTests, "spine.remove(spineSection)"),
    "type tests must cover Spine remove result typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Spine["each"]>, [callback: (section: Section, index: number, sections: Section[]) => void, thisArg?: unknown]',
    ),
    "type tests must assert Spine each thisArg unknown typing",
);
assert(
    sourceIncludes(typeTests, "const spineEach: void = spine.each"),
    "type tests must cover Spine each usage",
);
assert(
    sourceIncludes(
        spineSource,
        "each(callback: (section: Section, index: number, sections: Section[]) => void, thisArg?: unknown): void",
    ) &&
        sourceIncludes(
            spineTypes,
            "each(callback: (section: Section, index: number, sections: Array<Section>) => void, thisArg?: unknown): void",
        ),
    "Spine source and declarations must keep each callback and thisArg type parity",
);
assert(
    sourceIncludes(typeTests, "type ArchiveAssertions"),
    "type tests must assert the Archive public surface",
);
assert(
    sourceIncludes(typeTests, "RootArchiveZip"),
    "type tests must assert root Archive zip typing",
);
assert(
    sourceIncludes(
        typeTests,
        'ArchiveMarkupRequestType, "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm"',
    ),
    "type tests must assert Archive markup request typing",
);
assert(
    sourceIncludes(typeTests, "ArchiveZipOptions, { base64?: boolean | string | undefined }"),
    "type tests must assert Archive zip option typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Archive["request"]>'),
    "type tests must assert Archive request fallback typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Archive["handleResponse"]>'),
    "type tests must assert Archive response handling fallback typing",
);
assert(
    sourceIncludes(typeTests, "archiveZip.loadAsync(archiveInput, archiveZipOptions)"),
    "type tests must cover ArchiveZip loadAsync option typing",
);
assert(
    sourceIncludes(typeTests, 'archive.createUrl("/OPS/images/cover.jpg")'),
    "type tests must cover Archive createUrl optional options typing",
);
assert(
    sourceIncludes(typeTests, 'archive.handleResponse("{\\"ok\\":true}", "json")'),
    "type tests must cover Archive handleResponse typing",
);
assert(
    sourceIncludes(archiveSource, 'request(url: string, type: "blob"') &&
        sourceIncludes(archiveSource, "request(url: string, type: ArchiveMarkupRequestType") &&
        sourceIncludes(archiveSource, "@param  {RequestResponse} response") &&
        sourceIncludes(archiveSource, "@return {RequestResponse} the parsed result") &&
        sourceIncludes(archiveSource, 'handleResponse(response: string, type: "json")') &&
        sourceIncludes(
            archiveSource,
            "handleResponse(response: string, type: ArchiveMarkupRequestType",
        ) &&
        !sourceIncludes(archiveSource, "@param  {any} response") &&
        !sourceIncludes(archiveSource, "@return {any} the parsed result"),
    "source Archive must expose request and handleResponse overloads without stale any JSDoc",
);
assert(
    sourceIncludes(archiveSource, "type DeferConstructor = new <T = unknown>()") &&
        sourceIncludes(
            archiveSource,
            "export type ArchiveInput = ArrayBuffer | Blob | Uint8Array | string",
        ) &&
        sourceIncludes(
            archiveTypes,
            "export type ArchiveInput = ArrayBuffer | Blob | Uint8Array | string",
        ) &&
        sourceIncludes(archiveSource, "base64?: boolean | string") &&
        sourceIncludes(archiveTypes, "base64?: boolean | string") &&
        sourceIncludes(typeTests, "const archiveBlobInput: ArchiveInput = new Blob()") &&
        sourceIncludes(typeTests, "ArchiveZipOptions, { base64?: boolean | string | undefined }") &&
        sourceIncludes(
            archiveSource,
            "var deferred = new (defer as unknown as DeferConstructor)<RequestResponse>()",
        ) &&
        sourceIncludes(
            archiveSource,
            "var deferred = new (defer as unknown as DeferConstructor)<string>()",
        ) &&
        sourceIncludes(archiveSource, "var response: Promise<Blob | string> | undefined") &&
        sourceIncludes(archiveSource, "var tempUrl: string") &&
        !sourceIncludes(archiveSource, "promise: Promise<any>") &&
        !sourceIncludes(archiveSource, "var response: Promise<any> | undefined"),
    "source Archive must keep typed deferred and response bridge handling",
);
assert(
    sourceIncludes(
        jszipTypes,
        "loadAsync(input: ArrayBuffer | Uint8Array | string, options?: { base64?: boolean }): Promise<JSZip>",
    ) &&
        !sourceIncludes(
            jszipTypes,
            "loadAsync(input: ArrayBuffer | Uint8Array | string, options?: { base64?: boolean }): Promise<any>",
        ),
    "JSZip dist declaration must keep loadAsync result typed",
);
assert(
    sourceIncludes(typeTests, "type PackagingAssertions"),
    "type tests must assert the Packaging public surface",
);
assert(
    sourceIncludes(typeTests, "RootPackagingObject"),
    "type tests must assert root Packaging object typing",
);
assert(
    sourceIncludes(
        typeTests,
        "PackagingJsonManifestBase, { metadata: PackagingMetadataObject; resources: PackagingManifestItem[]; toc: PackagingTocItem[] }",
    ),
    "type tests must assert Packaging JSON manifest base typing",
);
assert(
    sourceIncludes(typeTests, "new Packaging()"),
    "type tests must cover Packaging construction without a document",
);
assert(
    sourceIncludes(typeTests, "packaging.load(packagingJson)"),
    "type tests must cover Packaging JSON manifest loading",
);
assert(
    sourceIncludes(typeTests, "packaging.load(packagingSpineJson)"),
    "type tests must cover Packaging JSON manifest spine fallback loading",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Packaging["destroy"]>'),
    "type tests must cover Packaging destroy return typing",
);
assert(
    sourceIncludes(typeTests, "type DisplayOptionsAssertions"),
    "type tests must assert the DisplayOptions public surface",
);
assert(
    sourceIncludes(typeTests, "RootDisplayOptions"),
    "type tests must assert root DisplayOptions class typing",
);
assert(
    sourceIncludes(typeTests, "new DisplayOptions()"),
    "type tests must cover DisplayOptions construction without a document",
);
assert(
    sourceIncludes(typeTests, "displayOptions.parse(parsedDocument)"),
    "type tests must cover DisplayOptions parse return typing",
);
assert(
    sourceIncludes(typeTests, "type ContainerAssertions"),
    "type tests must assert the Container public surface",
);
assert(
    sourceIncludes(typeTests, "RootContainer"),
    "type tests must assert root Container class typing",
);
assert(
    sourceIncludes(typeTests, "new Container()"),
    "type tests must cover Container construction without a document",
);
assert(
    sourceIncludes(typeTests, "container.parse(containerDocument)"),
    "type tests must cover Container parse argument typing",
);
assert(
    sourceIncludes(typeTests, "type PathAssertions"),
    "type tests must assert the Path public surface",
);
assert(sourceIncludes(typeTests, "RootPath"), "type tests must assert root Path class typing");
assert(
    sourceIncludes(typeTests, 'new Path("/OPS/Text/chapter.xhtml")'),
    "type tests must cover Path construction typing",
);
assert(
    sourceIncludes(typeTests, "pathHelper.isAbsolute()"),
    "type tests must cover Path optional isAbsolute typing",
);
assert(
    sourceIncludes(typeTests, 'pathHelper.splitPath("OPS/Text/chapter.xhtml")'),
    "type tests must cover Path splitPath array typing",
);
assert(
    sourceIncludes(typeTests, "type UrlAssertions"),
    "type tests must assert the Url public surface",
);
assert(sourceIncludes(typeTests, "RootUrl"), "type tests must assert root Url class typing");
assert(
    sourceIncludes(typeTests, 'new Url("https://example.com/OPS/Text/chapter.xhtml?debug=true")'),
    "type tests must cover Url construction without a base",
);
assert(
    sourceIncludes(typeTests, 'new Url("OPS/Text/chapter.xhtml", urlBase)'),
    "type tests must cover Url false base typing",
);
assert(
    sourceIncludes(typeTests, "urlHelper.path()"),
    "type tests must cover Url path return typing",
);
assert(
    sourceIncludes(typeTests, "type ReplacementsAssertions"),
    "type tests must assert the replacements helper public surface",
);
assert(
    sourceIncludes(typeTests, "rootReplaceLinks"),
    "type tests must assert root replacement helper typing",
);
assert(
    sourceIncludes(typeTests, "replaceLinks(parsedDocument.documentElement, linkCallback"),
    "type tests must cover replaceLinks element/callback typing",
);
assert(
    sourceIncludes(typeTests, 'substitute("url(cover.jpg)", ["cover.jpg"], ["blob:cover"])'),
    "type tests must cover substitute string return typing",
);
assert(
    sourceIncludes(typeTests, "type QueueAssertions"),
    "type tests must assert the Queue public surface",
);
assert(
    sourceIncludes(typeTests, "RootQueue") &&
        sourceIncludes(typeTests, "RootQueuedItem") &&
        sourceIncludes(typeTests, "RootQueueTask"),
    "type tests must assert root Queue type exports",
);
assert(
    sourceIncludes(typeTests, 'new Queue({ prefix: "ctx" })'),
    "type tests must cover Queue optional context construction",
);
assert(
    sourceIncludes(typeTests, 'queue.enqueue(queueTask, "ready")'),
    "type tests must cover Queue enqueue variadic typing",
);
assert(
    sourceIncludes(typeTests, "new Task((): void => undefined)"),
    "type tests must cover exported Task construction typing",
);
assert(
    sourceIncludes(typeTests, "ConstructorParameters<typeof Queue>, [context?: unknown]"),
    "type tests must assert Queue context typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Queue["enqueue"]>, Promise<unknown>'),
    "type tests must assert Queue enqueue unknown result typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Queue["flush"]>, Promise<unknown> | boolean | undefined'),
    "type tests must assert Queue flush unknown result typing",
);
assert(
    sourceIncludes(typeTests, "QueueTask, (...args: unknown[]) => unknown"),
    "type tests must assert QueueTask unknown parameter and return typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Queue["enqueue"]>, unknown[]'),
    "type tests must assert Queue enqueue unknown variadic typing",
);
assert(
    sourceIncludes(
        typeTests,
        "ConstructorParameters<typeof Task>, [task: QueueTask, args?: unknown[] | undefined, context?: unknown]",
    ),
    "type tests must assert Queue Task constructor unknown typing",
);
assert(
    sourceIncludes(
        typeTests,
        "const taskWrapper: (...args: unknown[]) => Promise<unknown> = new Task",
    ),
    "type tests must cover Queue Task wrapper unknown return typing",
);
assert(
    sourceIncludes(queueSource, "QueueTask = (...args: unknown[]) => unknown") &&
        sourceIncludes(queueSource, "enqueue(...items: unknown[]): Promise<unknown>") &&
        sourceIncludes(
            queueSource,
            "constructor(task: QueueTask, args?: unknown[], context?: unknown)",
        ) &&
        sourceIncludes(queueTypes, "QueueTask = (...args: unknown[]) => unknown") &&
        sourceIncludes(queueTypes, "enqueue(...items: unknown[]): Promise<unknown>") &&
        sourceIncludes(
            queueTypes,
            "new(task: QueueTask, args?: unknown[], context?: unknown): (...args: unknown[]) => Promise<unknown>",
        ),
    "Queue source and declarations must keep unknown variadic and Task wrapper typing",
);
assert(
    sourceIncludes(sourceRoot, "QueuedItem") &&
        sourceIncludes(sourceRoot, "QueueTask") &&
        sourceIncludes(sourceRoot, "default as Queue"),
    "source root must export Queue public types",
);
assert(
    sourceIncludes(typeTests, "type HookAssertions"),
    "type tests must assert the Hook public surface",
);
assert(
    sourceIncludes(typeTests, "RootHook") &&
        sourceIncludes(typeTests, "RootHookRegistration") &&
        sourceIncludes(typeTests, "RootHooksObject") &&
        sourceIncludes(typeTests, "RootHookTask"),
    "type tests must assert root Hook type exports",
);
assert(
    sourceIncludes(typeTests, 'new Hook({ prefix: "ctx" })'),
    "type tests must cover Hook optional context construction",
);
assert(
    sourceIncludes(typeTests, "hook.register(hookTask, hookRegistration)"),
    "type tests must cover Hook variadic registration typing",
);
assert(
    sourceIncludes(typeTests, 'hook.trigger("ready")'),
    "type tests must cover Hook trigger result typing",
);
assert(
    sourceIncludes(typeTests, "ConstructorParameters<typeof Hook>, [context?: unknown]"),
    "type tests must assert Hook context typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Hook["trigger"]>, Promise<unknown[]>'),
    "type tests must assert Hook trigger unknown result typing",
);
assert(
    sourceIncludes(typeTests, "HookTask, (...args: unknown[]) => unknown"),
    "type tests must assert HookTask unknown parameter and return typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Hook["trigger"]>, unknown[]'),
    "type tests must assert Hook trigger unknown variadic typing",
);
assert(
    sourceIncludes(hookSource, "HookTask = (...args: unknown[]) => unknown") &&
        sourceIncludes(hookSource, "trigger(...items: unknown[]): Promise<unknown[]>") &&
        sourceIncludes(hookSource, "@param {unknown} context scope of this") &&
        !sourceIncludes(hookSource, "@param {any} context scope of this") &&
        sourceIncludes(hookTypes, "HookTask = (...args: unknown[]) => unknown") &&
        sourceIncludes(hookTypes, "trigger(...args: unknown[]): Promise<unknown[]>"),
    "Hook source and declarations must keep unknown context and variadic typing",
);
assert(
    sourceIncludes(sourceRoot, "HookRegistration") &&
        sourceIncludes(sourceRoot, "HookTask") &&
        sourceIncludes(sourceRoot, "HooksObject") &&
        sourceIncludes(sourceRoot, "default as Hook"),
    "source root must export Hook public types",
);
assert(
    sourceIncludes(typeTests, "type PageListAssertions"),
    "type tests must assert the PageList public surface",
);
assert(
    sourceIncludes(typeTests, "RootPageValue"),
    "type tests must assert root PageList value typing",
);
assert(
    sourceIncludes(typeTests, "new PageList()"),
    "type tests must cover PageList construction without a document",
);
assert(
    sourceIncludes(typeTests, "pageList.process(pageListItems)"),
    "type tests must cover PageList item processing",
);
assert(
    sourceIncludes(typeTests, "pageList.pageFromCfi"),
    "type tests must cover PageList CFI lookup typing",
);
assert(
    sourceIncludes(typeTests, "PageLookup, Record<PageValue, string>"),
    "type tests must assert PageLookup PageValue key typing",
);
assert(
    sourceIncludes(typeTests, "PageReverseLookup, Record<PageValue, PageValue>"),
    "type tests must assert PageReverseLookup PageValue key typing",
);
assert(
    sourceIncludes(typeTests, "pageList.cfiFromPage(1)"),
    "type tests must cover PageList numeric cfiFromPage lookup typing",
);
assert(
    sourceIncludes(typeTests, "pageList.hrefFromPage(1)"),
    "type tests must cover PageList numeric hrefFromPage lookup typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<PageList["destroy"]>'),
    "type tests must cover PageList destroy return typing",
);
assert(
    sourceIncludes(pageListSource, "export type PageLookup = Record<PageValue, string>") &&
        sourceIncludes(
            pageListSource,
            "export type PageReverseLookup = Record<PageValue, PageValue>",
        ) &&
        sourceIncludes(pageListTypes, "export type PageLookup = Record<PageValue, string>") &&
        sourceIncludes(
            pageListTypes,
            "export type PageReverseLookup = Record<PageValue, PageValue>",
        ),
    "PageList source and declarations must keep lookup aliases keyed by PageValue",
);
assert(
    sourceIncludes(typeTests, "type LocationsAssertions"),
    "type tests must assert the Locations public surface",
);
assert(
    sourceIncludes(typeTests, "new Locations(spine"),
    "type tests must cover Locations construction with spine/request typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Locations["emit"]>, [eventName: string, data?: unknown]'),
    "type tests must assert Locations emit parameter typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Locations["emit"]>, void'),
    "type tests must assert Locations emit typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Locations["on"]>, [eventName: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Locations on unknown listener typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Locations["on"]>, unknown'),
    "type tests must assert Locations on typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Locations["off"]>, [eventName: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Locations off unknown listener typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Locations["off"]>, unknown'),
    "type tests must assert Locations off typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Locations["once"]>, [eventName: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Locations once unknown listener typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Locations["once"]>, unknown'),
    "type tests must assert Locations once typing",
);
assert(
    sourceIncludes(typeTests, "locations.generateForSection"),
    "type tests must cover Locations section refinement typing",
);
assert(
    sourceIncludes(typeTests, "locations.parseWords"),
    "type tests must cover Locations word-location typing",
);
assert(
    sourceIncludes(locationsSource, "emit(eventName: string, data?: unknown): void") &&
        sourceIncludes(
            locationsSource,
            "on(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            locationsSource,
            "off(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            locationsSource,
            "once(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(locationsTypes, "emit(eventName: string, data?: unknown): void") &&
        sourceIncludes(
            locationsTypes,
            "on(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            locationsTypes,
            "off(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            locationsTypes,
            "once(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "Locations source and declarations must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(typeTests, "type MappingAssertions"),
    "type tests must assert the Mapping public surface",
);
assert(
    sourceIncludes(typeTests, "new Mapping(mappingLayout"),
    "type tests must cover Mapping construction typing",
);
assert(
    sourceIncludes(typeTests, 'Mapping["direction"], MappingDirection'),
    "type tests must assert Mapping direction alias typing",
);
assert(
    sourceIncludes(typeTests, "const mappingDirectionInput: MappingDirection"),
    "type tests must cover MappingDirection usage",
);
assert(
    sourceIncludes(typeTests, "mapping.page(mappingContents"),
    "type tests must cover Mapping page typing",
);
assert(
    sourceIncludes(typeTests, 'MappingView["section"], MappingSection'),
    "type tests must assert MappingView section typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Mapping["axis"]>, [axis?: MappingAxis | undefined]'),
    "type tests must assert Mapping axis alias typing",
);
assert(
    sourceIncludes(typeTests, "const mappingAxisInput: MappingAxis"),
    "type tests must cover MappingAxis usage",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Mapping["walk"]>'),
    "type tests must cover Mapping walk callback return typing",
);
assert(
    sourceIncludes(typeTests, "mapping.rangePairToCfiPair"),
    "type tests must cover Mapping range-to-CFI typing",
);
assert(
    sourceIncludes(typeTests, "const mappingSectionShape: MappingSection"),
    "type tests must cover MappingSection usage",
);
assert(
    sourceIncludes(mappingSource, "export interface MappingSection") &&
        sourceIncludes(mappingSource, "section: MappingSection") &&
        sourceIncludes(mappingTypes, "export interface MappingSection") &&
        sourceIncludes(mappingTypes, "section: MappingSection") &&
        sourceIncludes(mappingSource, "direction: MappingDirection") &&
        sourceIncludes(mappingTypes, "direction: MappingDirection") &&
        sourceIncludes(mappingSource, "axis(axis?: MappingAxis): boolean") &&
        sourceIncludes(mappingTypes, "axis(axis?: MappingAxis): boolean") &&
        sourceIncludes(mappingSource, "for (var i = 0; i < count; i++)") &&
        !sourceIncludes(mappingSource, "(count as any).pages"),
    "Mapping source and declarations must keep MappingSection parity",
);
assert(
    sourceIncludes(mappingSource, "type TreeWalkerAcceptNode = (node: Node) => number") &&
        sourceIncludes(mappingSource, "type LegacyTreeWalkerFilter = TreeWalkerAcceptNode") &&
        sourceIncludes(mappingSource, "type LegacyCreateTreeWalker = (") &&
        sourceIncludes(
            mappingSource,
            "var treeWalker = (document.createTreeWalker as unknown as LegacyCreateTreeWalker)",
        ) &&
        !sourceIncludes(mappingSource, "var safeFilter = filter.acceptNode as any") &&
        !sourceIncludes(mappingSource, "(document.createTreeWalker as any)"),
    "Mapping source must keep legacy TreeWalker bridge typed without any",
);
assert(
    sourceIncludes(typeTests, "type ThemesAssertions"),
    "type tests must assert the Themes public surface",
);
assert(
    sourceIncludes(typeTests, "new Themes(themesRendition)"),
    "type tests must cover Themes construction typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<ThemesContent["addStylesheet"]>'),
    "type tests must cover Themes content bridge method return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Themes["default"]>'),
    "type tests must cover Themes default return typing",
);
assert(
    sourceIncludes(typeTests, 'themes.register("night", themeRules)'),
    "type tests must cover Themes rule registration typing",
);
assert(
    sourceIncludes(typeTests, 'themes.removeOverride("font-size")'),
    "type tests must cover Themes override removal typing",
);
assert(
    sourceIncludes(typeTests, "type AnnotationsAssertions"),
    "type tests must assert the Annotations public surface",
);
assert(
    sourceIncludes(typeTests, "RootAnnotations") &&
        sourceIncludes(typeTests, "RootAnnotation") &&
        sourceIncludes(typeTests, "RootAnnotationCallback") &&
        sourceIncludes(typeTests, "RootAnnotationData") &&
        sourceIncludes(typeTests, "RootAnnotationMap") &&
        sourceIncludes(typeTests, "RootAnnotationOptions") &&
        sourceIncludes(typeTests, "RootAnnotationsRendition") &&
        sourceIncludes(typeTests, "RootAnnotationStyles") &&
        sourceIncludes(typeTests, "RootAnnotationType") &&
        sourceIncludes(typeTests, "RootAnnotationView") &&
        sourceIncludes(typeTests, "RootSectionAnnotationMap"),
    "type tests must assert root Annotations type exports",
);
assert(
    sourceIncludes(typeTests, "new Annotations(annotationsRendition)"),
    "type tests must cover Annotations construction typing",
);
assert(
    sourceIncludes(typeTests, 'annotations.highlight("epubcfi'),
    "type tests must cover Annotations highlight typing",
);
assert(
    sourceIncludes(typeTests, 'annotations.remove("epubcfi'),
    "type tests must cover Annotations removal typing",
);
assert(
    sourceIncludes(typeTests, "AnnotationCallback, (...args: unknown[]) => void"),
    "type tests must assert AnnotationCallback unknown argument typing",
);
assert(
    sourceIncludes(typeTests, "AnnotationData, Record<string, unknown>"),
    "type tests must assert AnnotationData unknown payload typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<AnnotationView["highlight"]>, unknown'),
    "type tests must assert AnnotationView mark handle typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<AnnotationView["unhighlight"]>, unknown'),
    "type tests must assert AnnotationView removal handle typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Annotation["attach"]>, unknown'),
    "type tests must assert Annotation attach return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Annotation["detach"]>, unknown'),
    "type tests must assert Annotation detach return typing",
);
assert(
    sourceIncludes(typeTests, "const attachedMark: unknown = highlightAnnotation.attach"),
    "type tests must cover Annotation attach unknown usage",
);
assert(
    sourceIncludes(typeTests, "const detachedMark: unknown = underlineAnnotation.detach"),
    "type tests must cover Annotation detach unknown usage",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Annotation["emit"]>, void'),
    "type tests must assert Annotation emit return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Annotation["on"]>, unknown'),
    "type tests must assert Annotation on return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Annotation["off"]>, unknown'),
    "type tests must assert Annotation off return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Annotation["once"]>, unknown'),
    "type tests must assert Annotation once return typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Annotations["each"]>, unknown[]'),
    "type tests must assert Annotations each unknown argument typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Annotations["each"]>, void'),
    "type tests must assert Annotations each return typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Annotation["emit"]>, [type: string, ...args: unknown[]]'),
    "type tests must assert Annotation emit unknown argument typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Annotation["on"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Annotation on unknown listener typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Annotation["off"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Annotation off unknown listener typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Annotation["once"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Annotation once unknown listener typing",
);
assert(
    sourceIncludes(typeTests, "const annotationEmit: void = markAnnotation.emit"),
    "type tests must cover Annotation emit usage",
);
assert(
    sourceIncludes(typeTests, "const annotationOn: unknown = markAnnotation.on"),
    "type tests must cover Annotation on usage",
);
assert(
    sourceIncludes(typeTests, "const annotationOff: unknown = markAnnotation.off"),
    "type tests must cover Annotation off usage",
);
assert(
    sourceIncludes(typeTests, "const annotationOnce: unknown = markAnnotation.once"),
    "type tests must cover Annotation once usage",
);
assert(
    sourceIncludes(
        annotationsSource,
        "export type AnnotationCallback = (...args: unknown[]) => void",
    ) &&
        sourceIncludes(annotationsSource, "export type AnnotationData = Record<string, unknown>") &&
        sourceIncludes(annotationsSource, "type AnnotationCollectionBridge = AnnotationMap") &&
        sourceIncludes(
            annotationsSource,
            "highlight(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): unknown",
        ) &&
        sourceIncludes(annotationsSource, "unhighlight(cfiRange: string): unknown") &&
        sourceIncludes(annotationsSource, "mark: unknown") &&
        sourceIncludes(annotationsSource, "attach (view: AnnotationView): unknown") &&
        sourceIncludes(annotationsSource, "detach (view?: AnnotationView): unknown") &&
        sourceIncludes(annotationsSource, "each (...args: unknown[]): void") &&
        sourceIncludes(
            annotationsSource,
            "(this._annotations as AnnotationCollectionBridge).forEach.apply(this._annotations, args)",
        ) &&
        sourceIncludes(annotationsSource, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            annotationsSource,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            annotationsSource,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            annotationsSource,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        !sourceIncludes(annotationsSource, "(this._annotations as any).forEach.apply") &&
        sourceIncludes(
            annotationsTypes,
            "export type AnnotationCallback = (...args: unknown[]) => void",
        ) &&
        sourceIncludes(annotationsTypes, "export type AnnotationData = Record<string, unknown>") &&
        sourceIncludes(
            annotationsTypes,
            "highlight(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): unknown",
        ) &&
        sourceIncludes(annotationsTypes, "unhighlight(cfiRange: string): unknown") &&
        sourceIncludes(annotationsTypes, "mark: unknown") &&
        sourceIncludes(annotationsTypes, "attach(view: AnnotationView): unknown") &&
        sourceIncludes(annotationsTypes, "detach(view?: AnnotationView): unknown") &&
        sourceIncludes(annotationsTypes, "each(...args: unknown[]): void") &&
        sourceIncludes(annotationsTypes, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            annotationsTypes,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            annotationsTypes,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            annotationsTypes,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "source Annotation must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(
        iframeViewSource,
        'import type { AnnotationData, AnnotationStyles } from "../../annotations"',
    ) &&
        sourceIncludes(
            iframeViewSource,
            'highlight(cfiRange: string, data: AnnotationData = {}, cb?: MarkListener, className = "epubjs-hl", styles: AnnotationStyles = {})',
        ) &&
        sourceIncludes(
            iframeViewSource,
            'underline(cfiRange: string, data: AnnotationData = {}, cb?: MarkListener, className = "epubjs-ul", styles: AnnotationStyles = {})',
        ) &&
        sourceIncludes(
            iframeViewSource,
            "mark(cfiRange: string, data: AnnotationData = {}, cb?: MarkListener)",
        ) &&
        sourceIncludes(marksPaneTypes, "type MarkData = Record<string, unknown>") &&
        sourceIncludes(marksPaneTypes, "type MarkAttributes = Record<string, string>") &&
        !sourceIncludes(iframeViewSource, "data: Record<string, any> = {}") &&
        !sourceIncludes(iframeViewSource, "styles: Record<string, any> = {}") &&
        !sourceIncludes(marksPaneTypes, "Record<string, any>"),
    "iframe marks and marks-pane declarations must keep annotation payload typing",
);
assert(
    sourceIncludes(iframeViewSource, "type DebugWindow = Window &") &&
        sourceIncludes(iframeViewSource, "type SeamlessIframe = HTMLIFrameElement &") &&
        sourceIncludes(iframeViewSource, "settings: IframeViewSettings") &&
        sourceIncludes(iframeViewSource, "iframe?: SeamlessIframe") &&
        sourceIncludes(iframeViewSource, "highlights: Record<string, StoredPaneMark>") &&
        sourceIncludes(iframeViewSource, "interface IframeView") &&
        sourceIncludes(iframeViewSource, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(iframeViewSource, "locationOf(target: string | EpubCFI)") &&
        !sourceIncludes(iframeViewSource, "[key: string]: any") &&
        sourceIncludes(iframeViewSource, "__EPUB_VRL_DEBUG__?: boolean") &&
        sourceIncludes(iframeViewSource, "execUnsafeLocalFunction(callback: () => void): void") &&
        sourceIncludes(
            iframeViewSource,
            "type DisplayReject = (reason?: unknown, view?: IframeView) => void",
        ) &&
        sourceIncludes(iframeViewSource, "props?: Record<string, unknown>") &&
        sourceIncludes(iframeViewSource, "update?: (settings: Record<string, unknown>) => void") &&
        sourceIncludes(iframeViewSource, "(window as DebugWindow).__EPUB_VRL_DEBUG__ === true") &&
        sourceIncludes(
            iframeViewSource,
            'this.iframe.setAttribute("sandbox", "allow-same-origin")',
        ) &&
        sourceIncludes(iframeViewSource, 'this.iframe.sandbox.add("allow-scripts")') &&
        sourceIncludes(iframeViewSource, 'this.iframe.sandbox.add("allow-popups")') &&
        sourceIncludes(iframeViewSource, "const msApp = (window as DebugWindow).MSApp") &&
        sourceIncludes(
            iframeViewSource,
            "const reject = displayed.reject as DisplayReject | null",
        ) &&
        !sourceIncludes(iframeViewSource, "(window as any).__EPUB_VRL_DEBUG__") &&
        !sourceIncludes(iframeViewSource, "(window as any).MSApp") &&
        !sourceIncludes(iframeViewSource, 'this.iframe.sandbox = "allow-same-origin" as any') &&
        !sourceIncludes(iframeViewSource, 'this.iframe.sandbox += " allow-scripts" as any') &&
        !sourceIncludes(iframeViewSource, 'this.iframe.sandbox += " allow-popups" as any') &&
        !sourceIncludes(iframeViewSource, "(displayed.reject as any)"),
    "IframeView source must keep debug, sandbox, MSApp, and display rejection bridges typed",
);
assert(
    sourceIncludes(viewsTests, "uses the Windows MSApp write bridge") &&
        sourceIncludes(viewsTests, "rejects display promises when render fails"),
    "views browser tests must cover iframe bridge behavior",
);
assert(
    sourceIncludes(
        inlineViewSource,
        "type InlineDisplayReject = (reason?: unknown, view?: InlineView) => void",
    ) &&
        sourceIncludes(inlineViewSource, "settings: InlineViewSettings") &&
        sourceIncludes(inlineViewSource, "frame: HTMLElement | null = null") &&
        sourceIncludes(inlineViewSource, "contents?: Contents") &&
        sourceIncludes(inlineViewSource, "interface InlineView") &&
        sourceIncludes(inlineViewSource, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(inlineViewSource, "locationOf(target: string | EpubCFI)") &&
        !sourceIncludes(inlineViewSource, "[key: string]: any") &&
        sourceIncludes(
            inlineViewSource,
            "const reject = displayed.reject as InlineDisplayReject | null",
        ) &&
        sourceIncludes(inlineViewSource, "function (err: unknown)") &&
        !sourceIncludes(inlineViewSource, "(displayed.reject as any)"),
    "InlineView source must keep state fields, event bridge, and display rejection typed",
);
assert(
    sourceIncludes(viewsTests, "rejects inline display promises when render fails"),
    "views browser tests must cover inline display rejection behavior",
);
assert(
    sourceIncludes(sourceRoot, "default as Annotations") &&
        sourceIncludes(sourceRoot, "Annotation") &&
        sourceIncludes(sourceRoot, "AnnotationCallback") &&
        sourceIncludes(sourceRoot, "AnnotationData") &&
        sourceIncludes(sourceRoot, "AnnotationMap") &&
        sourceIncludes(sourceRoot, "AnnotationOptions") &&
        sourceIncludes(sourceRoot, "AnnotationsRendition") &&
        sourceIncludes(sourceRoot, "AnnotationStyles") &&
        sourceIncludes(sourceRoot, "AnnotationType") &&
        sourceIncludes(sourceRoot, "AnnotationView") &&
        sourceIncludes(sourceRoot, "SectionAnnotationMap"),
    "source root must export Annotations public types",
);
assert(
    sourceIncludes(typeTests, "type ResourcesAssertions"),
    "type tests must assert the Resources public surface",
);
assert(
    sourceIncludes(typeTests, "RootResourceManifest"),
    "type tests must assert root Resources manifest typing",
);
assert(
    sourceIncludes(typeTests, "new Resources(resourceManifest, resourceOptions)"),
    "type tests must cover Resources options typing",
);
assert(
    sourceIncludes(typeTests, 'resources.createCssFile("Styles/main.css", resourceArchiveInput)'),
    "type tests must cover Resources archive input typing",
);
assert(
    sourceIncludes(typeTests, 'resources.get("Images/cover.jpg")'),
    "type tests must cover Resources get replacement typing",
);
assert(
    sourceIncludes(typeTests, 'function resourceRequest(url: string, type: "blob"): Promise<Blob>'),
    "type tests must cover Resources blob request overload",
);
assert(
    sourceIncludes(
        typeTests,
        'function resourceRequest(url: string, type: "text"): Promise<string>',
    ),
    "type tests must cover Resources text request overload",
);
assert(
    sourceIncludes(typeTests, 'ResourceOptions["request"], ResourceRequest | undefined'),
    "type tests must assert ResourceOptions request typing",
);
assert(
    sourceIncludes(typeTests, 'ResourceSettings["request"], ResourceRequest | undefined'),
    "type tests must assert ResourceSettings request typing",
);
assert(
    sourceIncludes(resourcesSource, '(url: string, type: "blob"): Promise<Blob>') &&
        sourceIncludes(resourcesSource, '(url: string, type: "text"): Promise<string>') &&
        sourceIncludes(resourcesSource, "return createBase64Url(blob as string, mimeType)") &&
        sourceIncludes(resourcesTypes, '(url: string, type: "blob"): Promise<Blob>') &&
        sourceIncludes(resourcesTypes, '(url: string, type: "text"): Promise<string>'),
    "Resources source and declarations must keep ResourceRequest overload parity",
);
assert(
    sourceIncludes(typeTests, "type StoreAssertions"),
    "type tests must assert the Store public surface",
);
assert(
    sourceIncludes(typeTests, "RootStoreUrlOptions"),
    "type tests must assert root Store URL option typing",
);
assert(
    sourceIncludes(typeTests, "StoreRequestResponse, RequestResponse | StoreData"),
    "type tests must assert Store request response typing",
);
assert(
    sourceIncludes(
        typeTests,
        'StoreMarkupRequestType, "xml" | "opf" | "ncx" | "xhtml" | "html" | "htm"',
    ),
    "type tests must assert Store markup request typing",
);
assert(
    sourceIncludes(typeTests, 'function storeRequest(url: string, type: "binary"'),
    "type tests must cover Store binary request overload",
);
assert(
    sourceIncludes(typeTests, 'function storeRequest(url: string, type: "blob"'),
    "type tests must cover Store blob request overload",
);
assert(
    sourceIncludes(typeTests, 'function storeRequest(url: string, type: "json"'),
    "type tests must cover Store json request overload",
);
assert(
    sourceIncludes(typeTests, "function storeRequest(url: string, type: StoreMarkupRequestType"),
    "type tests must cover Store markup request overload",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Store["request"]>'),
    "type tests must assert Store request fallback typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Store["retrieve"]>'),
    "type tests must assert Store retrieve fallback typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Store["handleResponse"]>'),
    "type tests must assert Store response handling fallback typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Store["emit"]>, [eventName: string, ...args: unknown[]]'),
    "type tests must assert Store EventEmitter emit unknown argument typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Store["on"]>, [eventName: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Store EventEmitter on unknown listener typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Store["off"]>, [eventName: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Store EventEmitter off unknown listener typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Store["once"]>, [eventName: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Store EventEmitter once unknown listener typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Store["on"]>, unknown'),
    "type tests must assert Store EventEmitter listener typing",
);
assert(
    sourceIncludes(typeTests, "const storeOn: unknown = store.on"),
    "type tests must cover Store on listener usage",
);
assert(
    sourceIncludes(typeTests, "const storeOff: unknown = store.off"),
    "type tests must cover Store off listener usage",
);
assert(
    sourceIncludes(typeTests, "const storeOnce: unknown = store.once"),
    "type tests must cover Store once listener usage",
);
assert(
    sourceIncludes(typeTests, 'new Store("epubjs-type-store", storeRequest, storeResolver)'),
    "type tests must cover Store constructor typing",
);
assert(
    sourceIncludes(typeTests, 'store.createUrl("/OPS/images/cover.jpg", storeUrlOptions)'),
    "type tests must cover Store createUrl optional options typing",
);
assert(
    sourceIncludes(storeSource, 'request(url: string, type: "blob"') &&
        sourceIncludes(storeSource, 'retrieve(url: string, type: "blob"') &&
        sourceIncludes(storeSource, "@param  {RequestResponse} response") &&
        sourceIncludes(storeSource, "@return {RequestResponse} the parsed result") &&
        sourceIncludes(storeSource, 'handleResponse(response: string, type: "json")') &&
        !sourceIncludes(storeSource, "@param  {any} response") &&
        !sourceIncludes(storeSource, "@return {any} the parsed result"),
    "source Store must expose request, retrieve, and handleResponse overloads without stale any JSDoc",
);
assert(
    sourceIncludes(storeSource, "type DeferConstructor = new <T = unknown>()") &&
        sourceIncludes(
            storeSource,
            "var deferred = new (defer as unknown as DeferConstructor)<RequestResponse>()",
        ) &&
        sourceIncludes(
            storeSource,
            "var deferred = new (defer as unknown as DeferConstructor)<string>()",
        ) &&
        sourceIncludes(
            storeSource,
            "var response: Promise<Blob | string | ArrayBuffer | null | undefined>",
        ) &&
        sourceIncludes(storeSource, "var result: RequestResponse") &&
        sourceIncludes(storeSource, "var tempUrl: string") &&
        !sourceIncludes(storeSource, "promise: Promise<any>") &&
        !sourceIncludes(storeSource, "var response: Promise<any>"),
    "source Store must keep typed deferred and response bridge handling",
);
assert(
    sourceIncludes(storeSource, "emit(eventName: string, ...args: unknown[]): void") &&
        sourceIncludes(
            storeSource,
            "on(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            storeSource,
            "off(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            storeSource,
            "once(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(storeTypes, "emit(eventName: string, ...args: unknown[]): void") &&
        sourceIncludes(
            storeTypes,
            "on(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            storeTypes,
            "off(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            storeTypes,
            "once(eventName: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "Store source and declarations must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(storeSource, "export interface StoreRequest") &&
        sourceIncludes(storeSource, '(url: string, type: "binary"') &&
        sourceIncludes(storeSource, "(url: string, type: StoreMarkupRequestType") &&
        sourceIncludes(storeTypes, "export interface StoreRequest") &&
        sourceIncludes(storeTypes, '(url: string, type: "binary"') &&
        sourceIncludes(storeTypes, "(url: string, type: StoreMarkupRequestType"),
    "Store source and declarations must keep StoreRequest overload parity",
);
assert(sourceIncludes(typeTests, "RequestMethod"), "type tests must assert request method typing");
assert(
    sourceIncludes(typeTests, "RootRequestMethod"),
    "type tests must assert root request method type export",
);
assert(
    sourceIncludes(typeTests, "RootRequestResponse"),
    "type tests must assert root request response type export",
);
assert(
    sourceIncludes(sourceRoot, "RequestMethod") &&
        sourceIncludes(sourceRoot, "RequestResponse") &&
        sourceIncludes(sourceRoot, "RequestType"),
    "source root must export request public types",
);
assert(
    sourceIncludes(requestSource, "promise: Promise<RequestResponse>") &&
        sourceIncludes(requestSource, "resolve(value?: RequestResponse): void") &&
        sourceIncludes(
            requestSource,
            "function request(url: string, type?: RequestType | null, withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<RequestResponse>",
        ) &&
        sourceIncludes(requestSource, "var r: RequestResponse") &&
        sourceIncludes(requestSource, "JSON.parse(this.response) as JsonValue") &&
        !sourceIncludes(
            requestSource,
            "function request(url: string, type?: RequestType | null, withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<any>",
        ),
    "source request implementation must keep typed RequestResponse deferred and fallback result handling",
);
assert(
    sourceIncludes(requestSource, "if (signal?.aborted)") &&
        sourceIncludes(requestSource, "xhr.onabort = aborted") &&
        sourceIncludes(
            requestSource,
            'signal.addEventListener("abort", onSignalAbort, { once: true })',
        ) &&
        sourceIncludes(sectionSource, "load(_request?: SectionRequest, signal?: AbortSignal)") &&
        sourceIncludes(sectionSource, "render(_request?: SectionRequest, signal?: AbortSignal)") &&
        sourceIncludes(
            sectionSource,
            "request(this.url!, undefined, undefined, undefined, signal)",
        ) &&
        sourceIncludes(iframeViewSource, "_abortController?: AbortController") &&
        sourceIncludes(iframeViewSource, "this.section.render(request, signal)") &&
        sourceIncludes(iframeViewSource, "this._abortController.abort()") &&
        sourceIncludes(
            requestTests,
            "propagates view destruction through Section to the in-flight xhr",
        ) &&
        sourceIncludes(sectionTests, "forwards the AbortSignal through section load and render") &&
        sourceIncludes(
            viewsTests,
            "aborts an in-flight section render without emitting loaderror or rendered",
        ) &&
        sourceIncludes(typeTests, "const abortableRequestTextLoad: Promise<string> = request"),
    "request, Section, IframeView, tests, and public types must keep AbortSignal lifecycle parity",
);
assert(
    sourceIncludes(bookSource, "type RequestMethod") &&
        sourceIncludes(bookSource, "type RequestHeaders") &&
        sourceIncludes(bookSource, "type RequestResponse") &&
        !sourceIncludes(bookSource, "export type RequestMethod ="),
    "Book source must reuse utils/request public request types",
);
assert(
    sourceIncludes(typeTests, "InstanceType<typeof ePub.utils.defer"),
    "type tests must assert generic defer typing",
);
assert(
    sourceIncludes(typeTests, 'Book["loading"]'),
    "type tests must assert Book runtime loading state typing",
);
assert(
    sourceIncludes(typeTests, "book.loaded?.spine"),
    "type tests must cover Book loaded spine typing",
);
assert(
    sourceIncludes(typeTests, "book.resolve()"),
    "type tests must cover Book optional resolve path typing",
);
assert(
    sourceIncludes(typeTests, "book.unarchive(bookInput)"),
    "type tests must cover Book unarchive zip typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Book["unarchive"]>, Promise<ArchiveZip>'),
    "type tests must assert Book unarchive ArchiveZip return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Book["load"]>, Promise<RequestResponse>'),
    "type tests must cover Book load request response typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Book["openContainer"]>, Promise<string>'),
    "type tests must assert Book openContainer package path typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Book["openManifest"]>, Promise<Book>'),
    "type tests must assert Book openManifest return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Book["openPackaging"]>, Promise<Book>'),
    "type tests must assert Book openPackaging return typing",
);
assert(
    sourceIncludes(typeTests, "const bookContainerPath: Promise<string> = book.openContainer"),
    "type tests must cover Book openContainer usage",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Book["renderTo"]>[1], RenditionOptions | undefined'),
    "type tests must assert Book renderTo options typing",
);
assert(
    sourceIncludes(typeTests, "const bookRendition: Rendition = book.renderTo"),
    "type tests must cover Book renderTo RenditionOptions usage",
);
assert(
    sourceIncludes(typeTests, 'book.load("OPS/package.opf", "opf")'),
    "type tests must cover Book load XML overload typing",
);
assert(
    sourceIncludes(typeTests, 'book.load("manifest.json", "json")'),
    "type tests must cover Book load JSON overload typing",
);
assert(
    sourceIncludes(typeTests, 'book.load("OPS/chapter.xhtml", "text")'),
    "type tests must cover Book load text overload typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Book["emit"]>, [type: string, ...args: unknown[]]'),
    "type tests must assert Book EventEmitter emit unknown argument typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Book["on"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Book EventEmitter on unknown listener typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Book["off"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Book EventEmitter off unknown listener typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Book["once"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Book EventEmitter once unknown listener typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Book["on"]>, unknown'),
    "type tests must assert Book EventEmitter listener typing",
);
assert(
    sourceIncludes(typeTests, "const bookOn: unknown = book.on"),
    "type tests must cover Book on listener usage",
);
assert(
    sourceIncludes(typeTests, "const bookOff: unknown = book.off"),
    "type tests must cover Book off listener usage",
);
assert(
    sourceIncludes(typeTests, "const bookOnce: unknown = book.once"),
    "type tests must cover Book once listener usage",
);
assert(
    sourceIncludes(bookSource, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            bookSource,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            bookSource,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            bookSource,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(bookTypes, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            bookTypes,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            bookTypes,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            bookTypes,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "Book source and declarations must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Book["section"]>, Section | undefined'),
    "type tests must assert Book section return typing",
);
assert(
    sourceIncludes(typeTests, "const bookSection: Section | undefined = book.section"),
    "type tests must cover Book section usage",
);
assert(
    sourceIncludes(bookSource, "section(target: string | number): Section | undefined") &&
        sourceIncludes(bookTypes, "section(target: string): Section | undefined") &&
        sourceIncludes(bookTypes, "section(target: number): Section | undefined"),
    "Book source and declarations must keep section return type parity",
);
assert(
    sourceIncludes(
        bookSource,
        "renderTo(element: Element | string, options?: RenditionOptions): Rendition",
    ) &&
        sourceIncludes(
            bookTypes,
            "renderTo(element: Element, options?: RenditionOptions): Rendition",
        ) &&
        sourceIncludes(
            bookTypes,
            "renderTo(element: string, options?: RenditionOptions): Rendition",
        ),
    "Book source and declarations must keep renderTo options type parity",
);
assert(
    sourceIncludes(
        bookSource,
        "unarchive(input: BookInput | string, encoding?: string): Promise<ArchiveZip>",
    ) &&
        sourceIncludes(
            bookTypes,
            "unarchive(input: BookInput, encoding?: string): Promise<ArchiveZip>",
        ),
    "Book source and declarations must keep unarchive ArchiveZip return type parity",
);
assert(
    sourceIncludes(bookSource, 'load(path: string, type: "text"): Promise<string>') &&
        sourceIncludes(bookTypes, 'load(path: string, type: "text"): Promise<string>') &&
        sourceIncludes(
            requestSource,
            '(url: string, type: "text", withCredentials?: boolean, headers?: RequestHeaders, signal?: AbortSignal): Promise<string>',
        ) &&
        sourceIncludes(typeTests, "const requestTextLoad: Promise<string> = request"),
    "Book source, declarations, and request helper must keep text load overload parity",
);
assert(
    sourceIncludes(bookSource, "var spineResolver: SpineResolver") &&
        sourceIncludes(bookSource, "var resourceResolver: ResourceResolver") &&
        sourceIncludes(
            bookSource,
            'function resourceRequest(url: string, type: "blob"): Promise<Blob>',
        ) &&
        sourceIncludes(
            bookSource,
            'function resourceRequest(url: string, type: "text"): Promise<string>',
        ) &&
        sourceIncludes(
            bookSource,
            "this.locations = new Locations(this.spine, this.load.bind(this))",
        ) &&
        sourceIncludes(
            bookSource,
            "this.spine!.unpack(this.packaging as unknown as SpinePackage, spineResolver, this.canonical.bind(this))",
        ) &&
        !sourceIncludes(bookSource, "new Locations(this.spine as any") &&
        !sourceIncludes(bookSource, "this.spine!.unpack(this.packaging as any") &&
        !sourceIncludes(bookSource, "this.resolve.bind(this) as any") &&
        !sourceIncludes(bookSource, "this.canonical.bind(this) as any") &&
        !sourceIncludes(bookSource, "request: this.request.bind(this) as any") &&
        !sourceIncludes(bookSource, "this.archive.open(input as any, encoding as any)"),
    "Book source must keep typed locations/spine/resource/archive bridges without any",
);
assert(
    sourceIncludes(bookSource, "openContainer(url: string): Promise<string>") &&
        sourceIncludes(bookTypes, "openContainer(url: string): Promise<string>"),
    "Book source and declarations must keep openContainer package path type parity",
);
assert(
    sourceIncludes(bookSource, 'import type { RangeObject } from "./compat/range"') &&
        sourceIncludes(bookSource, "load(requester: RequestMethod): Promise<Element>") &&
        sourceIncludes(
            bookSource,
            "getRange(cfiRange: string | EpubCFI): Promise<Range | RangeObject | null>",
        ) &&
        sourceIncludes(bookSource, 'return Promise.reject("CFI could not be found")') &&
        sourceIncludes(bookSource, "function (_contents: Element)") &&
        sourceIncludes(bookTypes, 'import EpubCFI from "./epubcfi"') &&
        sourceIncludes(bookTypes, 'import { RangeObject } from "./compat/range"') &&
        sourceIncludes(
            bookTypes,
            "getRange(cfiRange: string | EpubCFI): Promise<Range | RangeObject | null>",
        ) &&
        sourceIncludes(typeTests, 'Parameters<Book["getRange"]>, [string | EpubCFI]') &&
        sourceIncludes(
            typeTests,
            "ReturnType<Book[\"getRange\"]>, Promise<Range | import('./compat/range').RangeObject | null>",
        ) &&
        sourceIncludes(bookTests, "resolves a DOM range for a section CFI") &&
        !sourceIncludes(bookSource, "getRange(cfiRange: string | EpubCFI): Promise<any>") &&
        !sourceIncludes(bookSource, "function (_contents: any)") &&
        !sourceIncludes(bookSource, "load(requester: RequestMethod): Promise<any>"),
    "Book source and declarations must keep getRange return and section bridge typed",
);
assert(
    sourceIncludes(bookSource, "type PackagingTocItem") &&
        sourceIncludes(bookSource, "type PageListDocument") &&
        sourceIncludes(bookSource, "export type BookNavigationPackaging = Packaging &") &&
        sourceIncludes(bookSource, "pageList?: PageListDocument") &&
        sourceIncludes(bookSource, "toc?: PackagingTocItem[]") &&
        sourceIncludes(
            bookSource,
            "loadNavigation(packaging: BookNavigationPackaging): Promise<Navigation>",
        ) &&
        sourceIncludes(bookTypes, "BookNavigationPackaging") &&
        sourceIncludes(bookTypes, "pageList?: PageListDocument") &&
        sourceIncludes(bookTypes, "toc?: Array<PackagingTocItem>") &&
        sourceIncludes(
            bookTypes,
            "loadNavigation(packaging: BookNavigationPackaging): Promise<Navigation>",
        ) &&
        sourceIncludes(sourceRoot, "BookNavigationPackaging") &&
        sourceIncludes(typeIndex, "BookNavigationPackaging") &&
        sourceIncludes(navigationTypes, "id?: string") &&
        sourceIncludes(navigationTypes, "href?: string") &&
        sourceIncludes(typeTests, "RootBookNavigationPackaging") &&
        sourceIncludes(
            typeTests,
            'Parameters<Book["loadNavigation"]>[0], BookNavigationPackaging',
        ) &&
        sourceIncludes(typeTests, "const packagingTocNavigationItems: NavigationInputItem[]") &&
        !sourceIncludes(
            bookSource,
            "loadNavigation(packaging: Packaging & { pageList?: any; toc?: any; navPath?: any; ncxPath?: any })",
        ) &&
        !sourceIncludes(bookTypes, "loadNavigation(packaging: Packaging): Promise<Navigation>"),
    "Book loadNavigation source and declarations must keep manifest navigation bridge typed without any",
);
assert(
    sourceIncludes(bookSource, "open(input: BookInput, what?: string): Promise<Book>") &&
        sourceIncludes(bookSource, "var opening: Promise<Book>") &&
        sourceIncludes(
            bookSource,
            "openEpub(data: BookInput | string, encoding?: string): Promise<Book>",
        ) &&
        sourceIncludes(bookSource, "openPackaging(url: string): Promise<Book>") &&
        sourceIncludes(bookSource, "openManifest(url: string): Promise<Book>") &&
        sourceIncludes(bookSource, "replacements(): Promise<void>") &&
        sourceIncludes(bookSource, "this.unpack(this.packaging);") &&
        sourceIncludes(bookSource, "return this;") &&
        sourceIncludes(bookTypes, "open(input: string, what?: string): Promise<Book>") &&
        sourceIncludes(bookTypes, "openEpub(data: BookInput, encoding?: string): Promise<Book>") &&
        sourceIncludes(bookTypes, "openManifest(url: string): Promise<Book>") &&
        sourceIncludes(bookTypes, "openPackaging(url: string): Promise<Book>") &&
        sourceIncludes(bookTypes, "private replacements(): Promise<void>") &&
        sourceIncludes(bookTests, "resolves open with the book instance") &&
        !sourceIncludes(bookSource, "open(input: BookInput, what?: string): Promise<any>") &&
        !sourceIncludes(
            bookSource,
            "openEpub(data: BookInput | string, encoding?: string): Promise<any>",
        ) &&
        !sourceIncludes(bookSource, "openPackaging(url: string): Promise<any>") &&
        !sourceIncludes(bookSource, "openManifest(url: string): Promise<any>") &&
        !sourceIncludes(bookSource, "replacements(): Promise<any>"),
    "Book source and declarations must keep open and replacement return type parity",
);
assert(
    sourceIncludes(typeTests, "rendition.determineLayoutProperties"),
    "type tests must cover Rendition layout property typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["determineLayoutProperties"]>, [metadata: PackagingMetadata]',
    ),
    "type tests must assert Rendition metadata parameter typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["layout"]>, [settings?: RenditionLayoutProperties | Record<string, unknown> | undefined]',
    ),
    "type tests must assert Rendition layout parameter typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["layout"]>, Layout | undefined'),
    "type tests must assert Rendition layout return typing",
);
assert(
    sourceIncludes(typeTests, "const renditionLayout: Layout | undefined = rendition.layout"),
    "type tests must cover Rendition layout usage",
);
assert(
    sourceIncludes(
        renditionSource,
        "determineLayoutProperties(metadata: PackagingMetadata): LayoutProperties",
    ) &&
        sourceIncludes(
            renditionTypes,
            "determineLayoutProperties(metadata: PackagingMetadata): LayoutProperties",
        ) &&
        sourceIncludes(
            renditionSource,
            "layout(settings?: LayoutProperties | Record<string, unknown>): Layout | undefined",
        ) &&
        sourceIncludes(
            renditionTypes,
            "layout(settings?: LayoutProperties | Record<string, unknown>): Layout | undefined",
        ),
    "Rendition source and declarations must keep metadata/layout settings and return type parity",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["getContents"]>, Contents[]'),
    "type tests must assert Rendition getContents return typing",
);
assert(
    sourceIncludes(renditionSource, "getContents (): Contents[]") &&
        sourceIncludes(renditionTypes, "getContents(): Contents[]"),
    "Rendition source and declarations must keep getContents return type parity",
);
assert(
    sourceIncludes(typeTests, "rendition.located([managerLocationItem])"),
    "type tests must cover Rendition manager location typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["located"]>, [location: Array<ManagerLocationItem | null | undefined>]',
    ),
    "type tests must assert Rendition located nullable manager location parameter typing",
);
assert(
    sourceIncludes(typeTests, "rendition.located([managerLocationItem, null, undefined])"),
    "type tests must cover Rendition located nullable manager location usage",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Rendition["moveTo"]>, [offset: object]'),
    "type tests must assert Rendition moveTo offset typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["next"]>, Promise<void>'),
    "type tests must assert Rendition next void promise typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["prev"]>, Promise<void>'),
    "type tests must assert Rendition prev void promise typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Rendition["setManager"]>, [manager: Function]'),
    "type tests must assert Rendition setManager function typing",
);
assert(
    sourceIncludes(
        renditionSource,
        "located(location: Array<ManagerLocationItem | null | undefined>): Location",
    ) &&
        sourceIncludes(
            renditionSource,
            "type ManagerLocationResult = Array<ManagerLocationItem | null | undefined>",
        ) &&
        sourceIncludes(
            renditionSource,
            "function isManagerLocationPromise(location: ManagerLocationResult | Promise<ManagerLocationResult>): location is Promise<ManagerLocationResult>",
        ) &&
        sourceIncludes(renditionSource, "location.then(function(result: ManagerLocationResult)") &&
        sourceIncludes(
            renditionTypes,
            "located(location: Array<ManagerLocationItem | null | undefined>): Location",
        ),
    "Rendition source and declarations must keep located parameter type parity",
);
assert(
    sourceIncludes(renditionSource, "setManager(manager: Function): void") &&
        sourceIncludes(renditionSource, "moveTo(offset: object): void") &&
        sourceIncludes(renditionSource, "next(): Promise<void>") &&
        sourceIncludes(renditionSource, "prev(): Promise<void>") &&
        sourceIncludes(renditionTypes, "setManager(manager: Function): void") &&
        sourceIncludes(renditionTypes, "moveTo(offset: object): void") &&
        sourceIncludes(renditionTypes, "next(): Promise<void>") &&
        sourceIncludes(renditionTypes, "prev(): Promise<void>"),
    "Rendition source and declarations must keep navigation helper type parity",
);
assert(
    sourceIncludes(typeTests, 'rendition.resolveLinkHref("#note"'),
    "type tests must cover Rendition link resolution typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Rendition["adjustImages"]>, [contents: Contents]'),
    "type tests must assert Rendition adjustImages Contents parameter typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Rendition["handleLinks"]>, [contents: Contents]'),
    "type tests must assert Rendition handleLinks Contents parameter typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["injectIdentifier"]>, [doc: Document, section: Section]',
    ),
    "type tests must assert Rendition injectIdentifier Section parameter typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["injectScript"]>, [doc: Document, section: Section]',
    ),
    "type tests must assert Rendition injectScript Section parameter typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["injectStylesheet"]>, [doc: Document, section: Section]',
    ),
    "type tests must assert Rendition injectStylesheet Section parameter typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Rendition["passEvents"]>, [contents: Contents]'),
    "type tests must assert Rendition passEvents Contents parameter typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["resolveLinkHref"]>, [href: string, contents?: { sectionHref?: string } | undefined]',
    ),
    "type tests must assert Rendition resolveLinkHref section href parameter typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["views"]>, Array<View>'),
    "type tests must assert Rendition views return typing",
);
assert(
    sourceIncludes(typeTests, "const renditionViews: Array<View> = rendition.views"),
    "type tests must cover Rendition views usage",
);
assert(
    sourceIncludes(
        renditionSource,
        "getRange(cfi: string, ignoreClass?: string): Range | undefined",
    ) &&
        sourceIncludes(renditionSource, "adjustImages(contents: Contents): Promise<void>") &&
        sourceIncludes(renditionSource, "handleLinks(contents: Contents): void") &&
        sourceIncludes(
            renditionSource,
            "injectIdentifier(doc: Document, _section: Section): void",
        ) &&
        sourceIncludes(renditionSource, "injectScript(doc: Document, _section: Section): void") &&
        sourceIncludes(
            renditionSource,
            "injectStylesheet(doc: Document, _section: Section): void",
        ) &&
        sourceIncludes(renditionSource, "passEvents(contents: Contents): void") &&
        sourceIncludes(renditionSource, "triggerViewEvent(e: Event, contents: Contents): void") &&
        sourceIncludes(
            renditionSource,
            "triggerSelectedEvent(cfirange: string, contents: Contents): void",
        ) &&
        sourceIncludes(
            renditionSource,
            "triggerMarkEvent(cfiRange: string, data: AnnotationData | undefined, contents: Contents): void",
        ) &&
        sourceIncludes(
            renditionSource,
            "(cfiRange: string, data: AnnotationData | undefined) => this.triggerMarkEvent(cfiRange, data, view.contents)",
        ) &&
        sourceIncludes(renditionSource, "views (): IframeView[]") &&
        sourceIncludes(
            renditionSource,
            "resolveLinkHref(href: string, contents?: { sectionHref?: string }): string",
        ) &&
        sourceIncludes(
            renditionTypes,
            "getRange(cfi: string, ignoreClass?: string): Range | undefined",
        ) &&
        sourceIncludes(renditionTypes, "adjustImages(contents: Contents): Promise<void>") &&
        sourceIncludes(renditionTypes, "handleLinks(contents: Contents): void") &&
        sourceIncludes(renditionTypes, "injectIdentifier(doc: Document, section: Section): void") &&
        sourceIncludes(renditionTypes, "injectScript(doc: Document, section: Section): void") &&
        sourceIncludes(renditionTypes, "injectStylesheet(doc: Document, section: Section): void") &&
        sourceIncludes(renditionTypes, "passEvents(contents: Contents): void") &&
        sourceIncludes(
            renditionTypes,
            "private triggerViewEvent(e: Event, contents: Contents): void",
        ) &&
        sourceIncludes(
            renditionTypes,
            "private triggerSelectedEvent(cfirange: string, contents: Contents): void",
        ) &&
        sourceIncludes(
            renditionTypes,
            "private triggerMarkEvent(cfiRange: string, data: AnnotationData | undefined, contents: Contents): void",
        ) &&
        sourceIncludes(renditionTypes, "views(): Array<View>") &&
        sourceIncludes(
            renditionTypes,
            "resolveLinkHref(href: string, contents?: { sectionHref?: string }): string",
        ),
    "Rendition source and declarations must keep content hook parameter type parity",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["reportLocation"]>, Promise<void>'),
    "type tests must assert Rendition reportLocation void promise typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["remeasure"]>, Promise<void>'),
    "type tests must assert Rendition remeasure void promise typing",
);
assert(
    sourceIncludes(
        typeTests,
        'ReturnType<Rendition["requireManager"]>, string | Function | object',
    ),
    "type tests must assert Rendition requireManager return typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["requireView"]>, string | Function | object'),
    "type tests must assert Rendition requireView return typing",
);
assert(
    sourceIncludes(typeTests, 'Rendition["displaying"], Deferred<Section | undefined> | undefined'),
    "type tests must assert Rendition displaying section promise typing",
);
assert(
    sourceIncludes(
        typeTests,
        "const renditionDisplaying: Deferred<Section | undefined> | undefined = rendition.displaying",
    ),
    "type tests must cover Rendition displaying usage",
);
assert(
    sourceIncludes(typeTests, 'RenditionLocationPart["page"], PageValue | undefined'),
    "type tests must assert Rendition location page PageValue typing",
);
assert(
    sourceIncludes(typeTests, "RootRenditionManager"),
    "type tests must assert root Rendition manager type export",
);
assert(
    sourceIncludes(typeTests, "RootRenditionManagerConstructor"),
    "type tests must assert root Rendition manager constructor type export",
);
assert(
    sourceIncludes(typeTests, "RootRenditionViewConstructor"),
    "type tests must assert root Rendition view constructor type export",
);
assert(
    sourceIncludes(typeTests, 'Rendition["manager"], RenditionManager | undefined'),
    "type tests must assert Rendition manager property typing",
);
assert(
    sourceIncludes(typeTests, 'Rendition["ViewManager"], RenditionManagerConstructor | undefined'),
    "type tests must assert Rendition ViewManager property typing",
);
assert(
    sourceIncludes(typeTests, 'Rendition["View"], RenditionViewConstructor | undefined'),
    "type tests must assert Rendition View property typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["attachTo"]>, Promise<void>'),
    "type tests must assert Rendition attachTo void promise typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["display"]>, Promise<void>'),
    "type tests must assert Rendition display void promise typing",
);
assert(
    sourceIncludes(typeTests, "const renditionMove: void = rendition.moveTo"),
    "type tests must cover Rendition moveTo usage",
);
assert(
    sourceIncludes(typeTests, "const renditionNext: Promise<void> = rendition.next"),
    "type tests must cover Rendition next usage",
);
assert(
    sourceIncludes(typeTests, "const renditionPrev: Promise<void> = rendition.prev"),
    "type tests must cover Rendition prev usage",
);
assert(
    sourceIncludes(typeTests, "const renditionRemeasure: Promise<void> = rendition.remeasure"),
    "type tests must cover Rendition remeasure void promise usage",
);
assert(
    sourceIncludes(
        typeTests,
        "const requiredManager: string | Function | object = rendition.requireManager",
    ),
    "type tests must cover Rendition requireManager usage",
);
assert(
    sourceIncludes(
        typeTests,
        "const requiredView: string | Function | object = rendition.requireView",
    ),
    "type tests must cover Rendition requireView usage",
);
assert(
    sourceIncludes(typeTests, "const setRenditionManager: void = rendition.setManager"),
    "type tests must cover Rendition setManager usage",
);
assert(
    sourceIncludes(renditionSource, "book: Book") &&
        sourceIncludes(renditionSource, "_layout?: Layout") &&
        sourceIncludes(renditionSource, "export interface RenditionManager") &&
        sourceIncludes(
            renditionSource,
            "export type RenditionManagerConstructor = new (options: RenditionManagerOptions) => RenditionManager",
        ) &&
        sourceIncludes(
            renditionSource,
            "export type RenditionViewConstructor = typeof IframeView",
        ) &&
        sourceIncludes(renditionSource, "manager?: RenditionManager") &&
        sourceIncludes(renditionSource, "ViewManager?: RenditionManagerConstructor") &&
        sourceIncludes(renditionSource, "View?: RenditionViewConstructor") &&
        sourceIncludes(renditionSource, "page?: PageValue") &&
        sourceIncludes(renditionSource, "constructor(book: Book, options?: RenditionOptions)") &&
        sourceIncludes(renditionSource, "(props: LayoutProps, changed: Partial<LayoutProps>)") &&
        sourceIncludes(renditionTypes, "export interface RenditionManager") &&
        sourceIncludes(
            renditionTypes,
            "export type RenditionManagerConstructor = new (options: RenditionManagerOptions) => RenditionManager",
        ) &&
        sourceIncludes(
            renditionTypes,
            "export type RenditionViewConstructor = new (section: unknown, options?: unknown) => View",
        ) &&
        sourceIncludes(renditionTypes, "manager?: RenditionManager") &&
        sourceIncludes(renditionTypes, "ViewManager?: RenditionManagerConstructor") &&
        sourceIncludes(renditionTypes, "View?: RenditionViewConstructor") &&
        sourceIncludes(renditionTypes, "constructor(book: Book, options?: RenditionOptions)") &&
        sourceIncludes(renditionTypes, "_layout?: Layout") &&
        sourceIncludes(renditionTypes, "page?: PageValue") &&
        sourceIncludes(sourceRoot, "RenditionManager") &&
        sourceIncludes(sourceRoot, "RenditionViewConstructor") &&
        sourceIncludes(typeIndex, "RenditionManager") &&
        sourceIncludes(typeIndex, "RenditionViewConstructor") &&
        sourceIncludes(typeTests, 'Rendition["_layout"], Layout | undefined') &&
        sourceIncludes(typeTests, 'Rendition["book"], Book') &&
        !sourceIncludes(renditionSource, "manager?: any") &&
        !sourceIncludes(renditionSource, "ViewManager?: any") &&
        !sourceIncludes(renditionSource, "View?: any") &&
        !sourceIncludes(renditionTypes, "manager?: any") &&
        !sourceIncludes(renditionTypes, "ViewManager?: any") &&
        !sourceIncludes(renditionTypes, "View?: any"),
    "Rendition source and declarations must keep book/layout property type parity",
);
assert(
    sourceIncludes(
        renditionSource,
        "var found = this.manager.visible().filter(function (view: IframeView)",
    ) &&
        sourceIncludes(renditionSource, "if (Array.isArray(views))") &&
        sourceIncludes(renditionSource, 'if (views && typeof views.all === "function")') &&
        sourceIncludes(renditionSource, "return views.all()") &&
        !sourceIncludes(renditionSource, "filter(function (view: any)") &&
        !sourceIncludes(renditionSource, "return (views || []) as IframeView[]") &&
        sourceIncludes(
            renditionTests,
            "returns manager views from array and collection bridge shapes",
        ),
    "Rendition source and focused tests must keep visible/views bridge typed",
);
assert(
    sourceIncludes(renditionSource, "attachTo(element: Element | string): Promise<void>") &&
        sourceIncludes(
            renditionSource,
            "display(target?: string | number, options?: { persistResourceCorrelation?: unknown }): Promise<void>",
        ) &&
        sourceIncludes(
            renditionSource,
            "_display(target?: string | number, options?: { persistResourceCorrelation?: unknown }): Promise<Section | undefined> | undefined",
        ) &&
        sourceIncludes(renditionTypes, "attachTo(element: Element | string): Promise<void>") &&
        sourceIncludes(
            renditionTypes,
            "display(target?: string | number, options?: { persistResourceCorrelation?: unknown }): Promise<void>",
        ),
    "Rendition source and declarations must keep attach/display return type parity",
);
assert(
    sourceIncludes(renditionSource, 'import Themes, { type ThemesRendition } from "./themes"') &&
        sourceIncludes(
            renditionSource,
            'import Annotations, { type AnnotationData, type AnnotationsRendition } from "./annotations"',
        ) &&
        sourceIncludes(renditionSource, "export interface RenditionHooks") &&
        sourceIncludes(renditionSource, "hooks: RenditionHooks") &&
        sourceIncludes(renditionTypes, "export interface RenditionHooks") &&
        sourceIncludes(renditionTypes, "hooks: RenditionHooks") &&
        sourceIncludes(typeTests, 'Rendition["hooks"], RenditionHooks') &&
        sourceIncludes(sourceRoot, "RenditionHooks") &&
        sourceIncludes(typeIndex, "RenditionHooks") &&
        sourceIncludes(typeTests, "RootRenditionHooks, RenditionHooks") &&
        sourceIncludes(renditionSource, "this.hooks = {") &&
        sourceIncludes(renditionSource, "display: new Hook(this)") &&
        !sourceIncludes(renditionSource, "\t\tthis.hooks = {};") &&
        sourceIncludes(renditionSource, "this.themes = new Themes(this as ThemesRendition)") &&
        sourceIncludes(
            renditionSource,
            "this.annotations = new Annotations(this as AnnotationsRendition)",
        ) &&
        sourceIncludes(renditionSource, "this.book = undefined as unknown as Book") &&
        !sourceIncludes(renditionSource, "[key: string]: any") &&
        !sourceIncludes(renditionSource, "new Themes(this as any)") &&
        !sourceIncludes(renditionSource, "new Annotations(this as any)"),
    "Rendition source must keep state fields explicit and theme/annotation bridges typed",
);
assert(
    sourceIncludes(
        renditionSource,
        "requireManager(manager: string | Function | object): string | Function | object",
    ) &&
        sourceIncludes(
            renditionSource,
            "requireView(view: string | Function | object): string | Function | object",
        ) &&
        sourceIncludes(
            renditionTypes,
            "requireManager(manager: string | Function | object): string | Function | object",
        ) &&
        sourceIncludes(
            renditionTypes,
            "requireView(view: string | Function | object): string | Function | object",
        ),
    "Rendition source and declarations must keep manager/view resolver return type parity",
);
assert(
    sourceIncludes(renditionSource, "displaying?: CoreDeferred<Section | undefined>") &&
        sourceIncludes(renditionSource, "var displaying = new Defer<Section | undefined>()") &&
        sourceIncludes(renditionTypes, "displaying?: Deferred<Section | undefined>"),
    "Rendition source and declarations must keep displaying deferred value type parity",
);
assert(
    sourceIncludes(renditionSource, "afterDisplayed(view: IframeView): void") &&
        sourceIncludes(renditionSource, "afterRemoved(view: IframeView): void") &&
        sourceIncludes(renditionTypes, "private afterDisplayed(view: View): void") &&
        sourceIncludes(renditionTypes, "private afterRemoved(view: View): void"),
    "Rendition source and declarations must keep displayed/removed view hook parameter parity",
);
assert(
    sourceIncludes(renditionSource, "reportLocation(): Promise<void>") &&
        sourceIncludes(
            renditionSource,
            "remeasure({ preserveLocation = true, waitForFonts = true }",
        ) &&
        sourceIncludes(renditionSource, "): Promise<void>"),
    "source Rendition must keep reportLocation and remeasure typed as void promises",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Rendition["on"]>, unknown'),
    "type tests must assert Rendition EventEmitter listener typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Rendition["emit"]>, [type: string, ...args: unknown[]]'),
    "type tests must assert Rendition EventEmitter emit unknown argument typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["on"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Rendition EventEmitter on unknown listener typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["off"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Rendition EventEmitter off unknown listener typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Rendition["once"]>, [type: string, listener: (...args: unknown[]) => void]',
    ),
    "type tests must assert Rendition EventEmitter once unknown listener typing",
);
assert(
    sourceIncludes(typeTests, "const renditionOn: unknown = rendition.on"),
    "type tests must cover Rendition on listener usage",
);
assert(
    sourceIncludes(typeTests, "const renditionOff: unknown = rendition.off"),
    "type tests must cover Rendition off listener usage",
);
assert(
    sourceIncludes(typeTests, "const renditionOnce: unknown = rendition.once"),
    "type tests must cover Rendition once listener usage",
);
assert(
    sourceIncludes(renditionSource, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            renditionSource,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            renditionSource,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            renditionSource,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(renditionTypes, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            renditionTypes,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            renditionTypes,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            renditionTypes,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "Rendition source and declarations must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Manager["emit"]>, [type: string, ...args: unknown[]]') &&
        sourceIncludes(
            typeTests,
            'Parameters<Manager["on"]>, [type: string, listener: (...args: unknown[]) => void]',
        ) &&
        sourceIncludes(
            typeTests,
            'Parameters<Manager["off"]>, [type: string, listener: (...args: unknown[]) => void]',
        ) &&
        sourceIncludes(
            typeTests,
            'Parameters<Manager["once"]>, [type: string, listener: (...args: unknown[]) => void]',
        ) &&
        sourceIncludes(typeTests, "const managerOn: unknown = manager.on") &&
        sourceIncludes(typeTests, "const managerOff: unknown = manager.off") &&
        sourceIncludes(typeTests, "const managerOnce: unknown = manager.once"),
    "type tests must assert Manager EventEmitter parameter typing and usage",
);
assert(
    sourceIncludes(managerSource, "declare emit: (type: string, ...args: unknown[]) => void") &&
        sourceIncludes(
            managerSource,
            "declare on: (type: string, listener: (...args: unknown[]) => void) => unknown",
        ) &&
        sourceIncludes(
            managerSource,
            "declare off: (type: string, listener: (...args: unknown[]) => void) => unknown",
        ) &&
        sourceIncludes(
            managerSource,
            "declare once: (type: string, listener: (...args: unknown[]) => void) => unknown",
        ) &&
        sourceIncludes(managerTypes, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            managerTypes,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            managerTypes,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            managerTypes,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "Manager source and declarations must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(
        managerSource,
        "class DefaultViewManager {\n\tdeclare orientationTimeout?: ReturnType<typeof setTimeout>",
    ) &&
        !sourceIncludes(managerSource, "class DefaultViewManager {\n\t[key: string]: any") &&
        !sourceIncludes(managerSource, "class DefaultViewManager {\n\t[key: string]: unknown"),
    "Default manager class must not use a catch-all index signature",
);
assert(
    sourceIncludes(managerSource, "declare orientationTimeout?: ReturnType<typeof setTimeout>") &&
        sourceIncludes(managerSource, "declare resizeTimeout?: ReturnType<typeof setTimeout>") &&
        sourceIncludes(managerSource, "declare afterScrolled?: ReturnType<typeof setTimeout>") &&
        sourceIncludes(
            managerSource,
            "declare _verticalRlBoundarySnapAfterScroll?: ReturnType<typeof setTimeout>",
        ),
    "Default manager timeout handles must keep class state typed without catch-all any",
);
assert(
    sourceIncludes(managerSource, "declare _onUnload?: EventListener") &&
        sourceIncludes(managerSource, "declare _onScroll?: EventListener"),
    "Default manager event listener handles must keep class state typed without catch-all any",
);
assert(
    sourceIncludes(managerSource, "type ManagerStageSize = {") &&
        sourceIncludes(managerSource, "declare _stageSize?: ManagerStageSize") &&
        sourceIncludes(managerSource, "declare _bounds?: ManagerBounds") &&
        sourceIncludes(managerSource, "declare winBounds?: ManagerBounds"),
    "Default manager size and bounds caches must keep class state typed without catch-all any",
);
assert(
    sourceIncludes(managerSource, "declare rendered: boolean") &&
        sourceIncludes(managerSource, "declare _layoutDirty: boolean") &&
        sourceIncludes(managerSource, "declare _lastLayoutStageSize: ManagerStageSize | null"),
    "Default manager layout lifecycle flags must keep class state typed without catch-all any",
);
assert(
    sourceIncludes(managerSource, "declare ignore: boolean") &&
        sourceIncludes(managerSource, "declare scrollTop: number") &&
        sourceIncludes(managerSource, "declare scrollLeft: number") &&
        sourceIncludes(managerSource, "declare target?: string | number") &&
        sourceIncludes(managerSource, "declare writingMode?: string") &&
        sourceIncludes(managerSource, "declare isPaginated: boolean"),
    "Default manager scroll and runtime flags must keep class state typed without catch-all any",
);
assert(
    sourceIncludes(managerSource, "declare layout: Layout") &&
        sourceIncludes(managerSource, "declare mapping: Mapping") &&
        sourceIncludes(managerSource, "applyLayout(layout: Layout): void") &&
        sourceIncludes(managerSource, "setLayout(layout: Layout): void"),
    "Default manager layout and mapping state must keep class state typed without catch-all any",
);
assert(
    sourceIncludes(managerSource, "type VerticalRlSequentialBoundaryConstraint = {") &&
        sourceIncludes(managerSource, "type VerticalRlBoundarySnapCacheEntry") &&
        sourceIncludes(managerSource, "type VerticalRlLogicalPageOffsetCache") &&
        sourceIncludes(
            managerSource,
            "declare _verticalRlLogicalPageOffsetCache?: VerticalRlLogicalPageOffsetCache | null",
        ) &&
        sourceIncludes(
            managerSource,
            "declare _verticalRlBoundarySnapCache?: VerticalRlBoundarySnapCacheEntry | null",
        ) &&
        sourceIncludes(
            managerSource,
            "declare _verticalRlSequentialBoundaryConstraint?: VerticalRlSequentialBoundaryConstraint | null",
        ) &&
        sourceIncludes(managerSource, "declare _verticalRlBoundarySnapRetryToken?: number") &&
        sourceIncludes(managerSource, "declare _verticalRlBoundarySnapApplying?: boolean"),
    "Default manager vertical-rl cache and retry token state must stay typed without catch-all any",
);
assert(
    sourceIncludes(managerSource, "declare _verticalRlViewportClipOverlay?: HTMLDivElement") &&
        sourceIncludes(managerSource, "declare _verticalRlPreviousParentPosition?: string") &&
        sourceIncludes(managerSource, "syncVerticalRlViewportClip(): void") &&
        sourceIncludes(
            managerSource,
            "getVerticalRlViewportClipOverlay(): HTMLDivElement | null",
        ) &&
        sourceIncludes(managerSource, "removeVerticalRlViewportClip(): void"),
    "Default manager vertical-rl viewport clip DOM state must stay typed without catch-all any",
);
assert(
    sourceIncludes(managerTypes, "[key: string]: unknown") &&
        !sourceIncludes(managerTypes, "[key: string]: any") &&
        sourceIncludes(typeTests, 'ManagerOptions["custom"], unknown'),
    "ManagerOptions declarations must keep unknown extension typing",
);
assert(
    sourceIncludes(managerSource, "getContents(): Contents[]") &&
        sourceIncludes(managerTypes, "getContents(): Contents[]"),
    "Manager source and declarations must keep getContents return type parity",
);
assert(
    sourceIncludes(
        managerSource,
        'import { defer, type Deferred as CoreDeferred } from "../../core/async"',
    ) &&
        sourceIncludes(managerSource, "type ManagerDeferred<T = unknown> = CoreDeferred<T>") &&
        sourceIncludes(managerSource, "const Deferred = defer as unknown as {") &&
        sourceIncludes(managerSource, "new<T = unknown>(): ManagerDeferred<T>") &&
        !sourceIncludes(managerSource, "const Deferred = defer as any"),
    "Default manager must keep Deferred constructor bridge typed through unknown",
);
assert(
    sourceIncludes(managerSource, "type DefaultManagerOptions = {") &&
        sourceIncludes(managerSource, "settings: ManagerSettings") &&
        sourceIncludes(managerSource, "view: ManagerViewConstructor") &&
        sourceIncludes(
            managerSource,
            "export type ManagerViewConstructor = new (section: unknown, settings: ManagerViewSettings) => ManagerView",
        ) &&
        sourceIncludes(managerSource, "type ManagerRenderSize = {") &&
        sourceIncludes(managerSource, "constructor(options: DefaultManagerOptions)") &&
        sourceIncludes(
            managerSource,
            "render(element: HTMLElement, size: ManagerRenderSize): void",
        ) &&
        !sourceIncludes(managerSource, "constructor(options: any)") &&
        !sourceIncludes(managerSource, "render(element: HTMLElement, size: any): void"),
    "Default manager constructor and render size inputs must stay typed without any",
);
assert(
    sourceIncludes(managerSource, "declare name: string") &&
        sourceIncludes(managerSource, "declare optsSettings: ManagerSettings") &&
        sourceIncludes(managerSource, "declare settings: ManagerSettings") &&
        sourceIncludes(managerSource, "declare View: ManagerViewConstructor") &&
        sourceIncludes(managerSource, "declare request: unknown") &&
        sourceIncludes(managerSource, "declare renditionQueue: unknown") &&
        sourceIncludes(managerSource, "declare q: Queue"),
    "Default manager constructor-injected state must stay typed without catch-all any",
);
assert(
    sourceIncludes(
        managerSource,
        "class DefaultViewManager {\n\tdeclare orientationTimeout?: ReturnType<typeof setTimeout>",
    ) &&
        sourceIncludes(managerSource, "type ManagerScrollState = {\n\tscrolled: boolean;\n}") &&
        sourceIncludes(managerSource, "(this as unknown as ManagerScrollState).scrolled = true") &&
        !sourceIncludes(managerSource, "class DefaultViewManager {\n\t[key: string]: any") &&
        !sourceIncludes(managerSource, "class DefaultViewManager {\n\t[key: string]: unknown") &&
        !sourceIncludes(managerSource, "declare scrolled: any"),
    "Default manager class state must not rely on a catch-all index signature",
);
assert(
    sourceIncludes(managerSource, "declare stage: Stage") &&
        sourceIncludes(managerSource, "declare container: HTMLDivElement") &&
        sourceIncludes(managerSource, "declare overflow?: string") &&
        sourceIncludes(managerSource, "declare viewSettings: ManagerViewSettings") &&
        sourceIncludes(managerSource, "bounds(): ManagerBounds") &&
        sourceIncludes(managerSource, "this.stage.bounds() as ManagerBounds"),
    "Default manager render surface state must stay typed without catch-all any",
);
assert(
    sourceIncludes(managerSource, "export type ManagerSettings = {") &&
        sourceIncludes(managerSource, "[key: string]: unknown") &&
        sourceIncludes(managerSource, "size?: ManagerRenderSize") &&
        sourceIncludes(managerSource, "snap?: boolean | ManagerSnapOptions") &&
        sourceIncludes(managerSource, "verticalRlBoundarySnapRetryDelays?: number[]") &&
        sourceIncludes(managerSource, "export type ManagerViewSettings = {") &&
        sourceIncludes(managerSource, "layout?: Layout") &&
        sourceIncludes(managerSource, "forceEvenPages: boolean") &&
        !sourceIncludes(managerSource, "settings: Record<string, any>") &&
        !sourceIncludes(managerSource, "viewSettings: Record<string, any>"),
    "Default manager settings bridge must keep known fields typed and extension fields unknown",
);
assert(
    sourceIncludes(managerSource, "type ManagerOffset = {") &&
        sourceIncludes(managerSource, "type ViewResizeBounds = {") &&
        sourceIncludes(
            managerSource,
            "resize(width?: number, height?: number, epubcfi?: string): void",
        ) &&
        sourceIncludes(
            managerSource,
            "getVerticalRlPageIndexForOffset(offset: ManagerOffset, width?: number): number",
        ) &&
        sourceIncludes(managerSource, "moveTo(offset: ManagerOffset, width?: number): void") &&
        sourceIncludes(managerSource, "counter(bounds: ViewResizeBounds): void") &&
        !sourceIncludes(
            managerSource,
            "resize(width?: number, height?: number, epubcfi?: any): void",
        ) &&
        !sourceIncludes(managerSource, "getVerticalRlPageIndexForOffset(offset: any") &&
        !sourceIncludes(managerSource, "moveTo(offset: any") &&
        !sourceIncludes(managerSource, "view.on(EVENTS.VIEWS.AXIS, (axis: any)") &&
        !sourceIncludes(managerSource, "view.on(EVENTS.VIEWS.WRITING_MODE, (mode: any)") &&
        !sourceIncludes(managerSource, "view.on(EVENTS.VIEWS.RESIZED, (bounds: any)") &&
        !sourceIncludes(managerSource, "counter(bounds: any): void"),
    "Default manager resize, movement, and view event bridge inputs must stay typed without any",
);
assert(
    sourceIncludes(managerSource, "type ManagerSection = {") &&
        sourceIncludes(managerSource, "type ManagerView = {") &&
        sourceIncludes(managerSource, "iframe?: HTMLIFrameElement") &&
        sourceIncludes(managerSource, "_contentWidth?: number") &&
        sourceIncludes(managerSource, "_viewportFillingSingleMediaPage?: boolean") &&
        sourceIncludes(
            managerSource,
            "createView(section: unknown, forceRight?: boolean): ManagerView",
        ) &&
        sourceIncludes(
            managerSource,
            "display(section: ManagerSection, target?: string | number, options?: { persistResourceCorrelation?: unknown }): Promise<void>",
        ) &&
        sourceIncludes(managerSource, "var displaying = new Deferred<void>()") &&
        sourceIncludes(
            managerSource,
            "var visible: ManagerView | undefined = this.views.find(section)",
        ) &&
        sourceIncludes(managerSource, ".then(function(view: ManagerView)") &&
        sourceIncludes(managerSource, "}.bind(this), (err: unknown) => {") &&
        sourceIncludes(managerSource, "afterDisplayed(view: ManagerView): void") &&
        sourceIncludes(managerSource, "afterResized(view: ManagerView): void") &&
        sourceIncludes(
            managerSource,
            "add(section: ManagerSection, forceRight?: boolean, requestOverride?: unknown): Promise<ManagerView>",
        ) &&
        sourceIncludes(
            managerSource,
            "append(section: unknown, forceRight?: boolean, requestOverride?: unknown): ManagerView | Promise<ManagerView>",
        ) &&
        sourceIncludes(
            managerSource,
            "prepend(section: unknown, forceRight?: boolean): ManagerView | Promise<ManagerView>",
        ) &&
        sourceIncludes(
            managerSource,
            "return (this.prepend(section, forceRight) as Promise<ManagerView>)",
        ) &&
        sourceIncludes(
            managerSource,
            "return (this.append(next, forceRight, requestWithCorrelation) as Promise<ManagerView>)",
        ) &&
        !sourceIncludes(managerSource, "createView(section: any") &&
        !sourceIncludes(managerSource, "display(section: any") &&
        !sourceIncludes(managerSource, "target?: any") &&
        !sourceIncludes(managerSource, "then(function(view: any)") &&
        !sourceIncludes(managerSource, "afterDisplayed(view: any)") &&
        !sourceIncludes(managerSource, "afterResized(view: any)") &&
        !sourceIncludes(managerSource, "add(section: any") &&
        !sourceIncludes(managerSource, "append(section: any") &&
        !sourceIncludes(managerSource, "prepend(section: any"),
    "Default manager view and section bridge inputs must stay typed without any",
);
assert(
    sourceIncludes(managerSource, "type ManagerViewsBridge = {") &&
        sourceIncludes(managerSource, "all(): ManagerView[]") &&
        sourceIncludes(managerSource, "find(section: ManagerSection): ManagerView | undefined") &&
        sourceIncludes(managerSource, "first(): ManagerView") &&
        sourceIncludes(managerSource, "last(): ManagerView") &&
        sourceIncludes(managerSource, "indexOf(view: ManagerView): number") &&
        sourceIncludes(managerSource, "slice(start?: number, end?: number): ManagerView[]") &&
        sourceIncludes(managerSource, "remove(view: unknown): void") &&
        sourceIncludes(managerSource, "declare views: ManagerViewsBridge") &&
        sourceIncludes(
            managerSource,
            "new Views(this.container) as unknown as ManagerViewsBridge",
        ) &&
        !sourceIncludes(managerSource, "declare views: any"),
    "Default manager views bridge must keep view collection state typed without catch-all any",
);
assert(
    sourceIncludes(
        managerSource,
        "getVerticalRlVisualContentWidth(view: ManagerView | undefined): number",
    ) &&
        sourceIncludes(
            managerSource,
            "getNavigableWidthForView(view: ManagerView | undefined): number",
        ) &&
        !sourceIncludes(managerSource, "getVerticalRlVisualContentWidth(view: any): number") &&
        !sourceIncludes(managerSource, "getNavigableWidthForView(view: any): number"),
    "Default manager vertical width helpers must keep view inputs typed without any",
);
assert(
    sourceIncludes(managerSource, "type ManagerBounds = {") &&
        sourceIncludes(managerSource, "type VisibleManagerView = ManagerView & {") &&
        sourceIncludes(managerSource, "type PositionedView = {") &&
        sourceIncludes(managerSource, "section?: unknown") &&
        sourceIncludes(managerSource, "position?: () => ManagerBounds") &&
        sourceIncludes(
            managerSource,
            "isVisible(view: PositionedView, offsetPrev: number, offsetNext: number, _container?: ManagerBounds): boolean",
        ) &&
        sourceIncludes(managerSource, "var position = view.position!()") &&
        sourceIncludes(
            managerSource,
            "var container: ManagerBounds = _container || this.bounds()",
        ) &&
        sourceIncludes(managerSource, "visible(): VisibleManagerView[]") &&
        sourceIncludes(managerSource, "var views: VisibleManagerView[] = this.views.displayed()") &&
        sourceIncludes(managerSource, "var visible: VisibleManagerView[] = []") &&
        sourceIncludes(managerSource, "var view: VisibleManagerView") &&
        !sourceIncludes(managerSource, "isVisible(view: any") &&
        !sourceIncludes(managerSource, "_container?: any") &&
        !sourceIncludes(managerSource, "visible(): any[]") &&
        !sourceIncludes(managerSource, "var visible: any[] = []"),
    "Default manager visible helpers must keep view and bounds inputs typed without any",
);
assert(
    sourceIncludes(managerSource, 'import type Layout from "../../layout";') &&
        sourceIncludes(managerSource, "setLayout(layout: Layout): void") &&
        sourceIncludes(managerSource, "applyLayout(layout: Layout): void") &&
        sourceIncludes(managerSource, "this.views.forEach(function(view: ManagerView){") &&
        !sourceIncludes(managerSource, "applyLayout(layout: any): void") &&
        !sourceIncludes(managerSource, "setLayout(layout: any): void"),
    "Default manager layout helpers must keep layout and view callbacks typed without any",
);
assert(
    sourceIncludes(managerSource, "contents: Contents") &&
        sourceIncludes(managerSource, "getContents(): Contents[]") &&
        sourceIncludes(managerSource, "var contents: Contents[] = []") &&
        sourceIncludes(
            managerSource,
            "this.views.forEach(function(view: ManagerView | undefined){",
        ) &&
        !sourceIncludes(managerSource, "this.views.forEach(function(view: any){"),
    "Default manager contents bridge must keep view and contents values typed without any",
);
assert(
    sourceIncludes(managerSource, "current(): VisibleManagerView | null") &&
        sourceIncludes(managerSource, "var visible = this.visible()") &&
        !sourceIncludes(managerSource, "current(): any"),
    "Default manager current bridge must return the typed visible view or null without any",
);
assert(
    sourceIncludes(managerSource, "cfiBase: string") &&
        sourceIncludes(managerSource, "contents: Contents") &&
        sourceIncludes(managerSource, "height(): number") &&
        sourceIncludes(
            managerSource,
            "let sections = visible.map((view: VisibleManagerView) => {",
        ) &&
        !sourceIncludes(managerSource, "let sections = visible.map((view: any) => {"),
    "Default manager location map bridge must keep visible view callbacks typed without any",
);
assert(
    sourceIncludes(
        managerSource,
        "displaySpineItemAtEnd(section: ManagerSection, forceRight?: boolean): Promise<void>",
    ) &&
        sourceIncludes(managerSource, "var left: ManagerSection | undefined") &&
        sourceIncludes(managerSource, ".catch((err: unknown) => {") &&
        !sourceIncludes(managerSource, "displaySpineItemAtEnd(section: any") &&
        !sourceIncludes(managerSource, "var left: any") &&
        !sourceIncludes(managerSource, ".catch((err: any) => {"),
    "Default manager end-display helper must keep section and rejection bridge typed without any",
);
assert(
    sourceIncludes(
        managerSource,
        "next(options?: { persistResourceCorrelation?: unknown }): Promise<unknown> | void",
    ) &&
        sourceIncludes(managerSource, "var next: ManagerSection | undefined") &&
        sourceIncludes(managerSource, "var left: number") &&
        sourceIncludes(managerSource, 'next.properties!.includes("page-spread-right")') &&
        !sourceIncludes(managerSource, "next(): Promise<any> | void") &&
        !sourceIncludes(managerSource, "var next: any"),
    "Default manager next bridge must keep section, scroll offset, and promise results typed without any",
);
assert(
    sourceIncludes(managerSource, "prev(): Promise<unknown> | void") &&
        sourceIncludes(managerSource, "var prev: ManagerSection | undefined") &&
        sourceIncludes(managerSource, "var left: number") &&
        !sourceIncludes(managerSource, "prev(): Promise<any> | void") &&
        !sourceIncludes(managerSource, "var prev: any"),
    "Default manager prev bridge must keep section, scroll offset, and promise results typed without any",
);
assert(
    sourceIncludes(managerSource, 'import type { ManagerLocationItem } from "../../rendition";') &&
        sourceIncludes(
            managerSource,
            "declare location: Array<ManagerLocationItem | null | undefined>",
        ) &&
        sourceIncludes(
            managerSource,
            "currentLocation(): Array<ManagerLocationItem | null | undefined>",
        ) &&
        sourceIncludes(managerSource, "scrolledLocation(): ManagerLocationItem[]") &&
        sourceIncludes(managerSource, "paginatedLocation(): ManagerLocationItem[]") &&
        sourceIncludes(managerSource, "let pages: number[] = []") &&
        sourceIncludes(managerSource, "index: index!") &&
        sourceIncludes(managerSource, "href: href!") &&
        !sourceIncludes(managerSource, "currentLocation(): any"),
    "Default manager location helpers must expose typed manager location results without any",
);
assert(
    sourceIncludes(continuousManagerSource, "var promises: Promise<unknown>[] = []") &&
        sourceIncludes(
            continuousManagerSource,
            "check(_offsetLeft?: number, _offsetTop?: number): Promise<unknown>",
        ) &&
        sourceIncludes(continuousManagerSource, ".then((): Promise<unknown> =>") &&
        !sourceIncludes(continuousManagerSource, "var promises: Promise<any>[] = []") &&
        !sourceIncludes(
            continuousManagerSource,
            "check(_offsetLeft?: number, _offsetTop?: number): Promise<any>",
        ) &&
        !sourceIncludes(continuousManagerSource, ".then((): Promise<any> =>"),
    "Continuous manager must keep promise bridge results typed as unknown",
);
assert(
    sourceIncludes(continuousManagerSource, "settings: ManagerSettings") &&
        sourceIncludes(
            continuousManagerSource,
            'import DefaultViewManager, { type ManagerSettings, type ManagerViewConstructor } from "../default"',
        ) &&
        sourceIncludes(continuousManagerSource, "view: ManagerViewConstructor") &&
        sourceIncludes(continuousManagerSource, "request: unknown") &&
        sourceIncludes(continuousManagerSource, "queue: unknown") &&
        sourceIncludes(continuousManagerSource, 'typeof options.settings.gap !== "undefined"') &&
        !sourceIncludes(continuousManagerSource, "settings: Record<string, any>") &&
        !sourceIncludes(continuousManagerSource, "view: any") &&
        !sourceIncludes(continuousManagerSource, "request: any") &&
        !sourceIncludes(continuousManagerSource, "queue: any"),
    "Continuous manager options bridge must keep inputs typed as unknown",
);
assert(
    sourceIncludes(
        continuousManagerSource,
        'import Snap, { type ManagerLike as SnapManagerLike } from "../helpers/snap"',
    ) &&
        sourceIncludes(continuousManagerSource, "new Snap(this as unknown as SnapManagerLike") &&
        !sourceIncludes(continuousManagerSource, "new Snap(this as any"),
    "Continuous manager must use the typed Snap manager bridge",
);
assert(
    sourceIncludes(
        continuousManagerSource,
        "display(section: unknown, target?: string | number)",
    ) &&
        sourceIncludes(continuousManagerSource, "add(section: unknown)") &&
        sourceIncludes(continuousManagerSource, "append(section: unknown)") &&
        sourceIncludes(continuousManagerSource, "prepend(section: unknown)") &&
        !sourceIncludes(continuousManagerSource, "display(section: any") &&
        !sourceIncludes(continuousManagerSource, "add(section: any") &&
        !sourceIncludes(continuousManagerSource, "append(section: any") &&
        !sourceIncludes(continuousManagerSource, "prepend(section: any"),
    "Continuous manager section input bridge must keep unknown typing",
);
assert(
    sourceIncludes(continuousManagerSource, "type ContinuousSection = {") &&
        sourceIncludes(continuousManagerSource, "type VisibilityElement = {") &&
        sourceIncludes(continuousManagerSource, "[key: string]: unknown") &&
        sourceIncludes(continuousManagerSource, "display(request: unknown): Promise<unknown>") &&
        sourceIncludes(continuousManagerSource, "bounds(): ViewBounds") &&
        !sourceIncludes(continuousManagerSource, "type ContinuousView = {\n\t[key: string]: any"),
    "Continuous manager view bridge must keep structural unknown typing",
);
assert(
    sourceIncludes(
        continuousManagerSource,
        "class ContinuousViewManager extends DefaultViewManager {\n\tdeclare trimTimeout?: ReturnType<typeof setTimeout>",
    ) &&
        sourceIncludes(
            continuousManagerSource,
            "declare trimTimeout?: ReturnType<typeof setTimeout>",
        ) &&
        sourceIncludes(
            continuousManagerSource,
            "declare scrollTimeout?: ReturnType<typeof setTimeout>",
        ) &&
        sourceIncludes(continuousManagerSource, "declare snapper?: Snap") &&
        sourceIncludes(continuousManagerSource, "declare _scrolled: () => void") &&
        sourceIncludes(continuousManagerSource, "declare scrollDeltaVert: number") &&
        sourceIncludes(continuousManagerSource, "declare scrollDeltaHorz: number") &&
        sourceIncludes(continuousManagerSource, "declare prevScrollTop: number") &&
        sourceIncludes(continuousManagerSource, "declare prevScrollLeft: number") &&
        sourceIncludes(continuousManagerSource, "declare scrolledRequestId?: number") &&
        !sourceIncludes(
            continuousManagerSource,
            "class ContinuousViewManager extends DefaultViewManager {\n\t[key: string]: any",
        ) &&
        !sourceIncludes(
            continuousManagerSource,
            "class ContinuousViewManager extends DefaultViewManager {\n\t[key: string]: unknown",
        ),
    "Continuous manager runtime state must not rely on a class catch-all index signature",
);
assert(
    sourceIncludes(typeTests, 'Parameters<View["emit"]>, [type: string, ...args: unknown[]]') &&
        sourceIncludes(
            typeTests,
            'Parameters<View["on"]>, [type: string, listener: (...args: unknown[]) => void]',
        ) &&
        sourceIncludes(
            typeTests,
            'Parameters<View["off"]>, [type: string, listener: (...args: unknown[]) => void]',
        ) &&
        sourceIncludes(
            typeTests,
            'Parameters<View["once"]>, [type: string, listener: (...args: unknown[]) => void]',
        ) &&
        sourceIncludes(typeTests, "const viewOn: unknown = view.on") &&
        sourceIncludes(typeTests, "const viewOff: unknown = view.off") &&
        sourceIncludes(typeTests, "const viewOnce: unknown = view.once"),
    "type tests must assert View EventEmitter parameter typing and usage",
);
assert(
    sourceIncludes(viewTypes, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            viewTypes,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            viewTypes,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            viewTypes,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "View declarations must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(viewTypes, "create(): HTMLIFrameElement") &&
        sourceIncludes(viewTypes, "load(content: string): Promise<Contents>") &&
        sourceIncludes(viewTypes, "display(request?: Function): Promise<View>") &&
        sourceIncludes(
            viewTypes,
            "private onLoad(event: Event, promise: { resolve(value: Contents): void }): void",
        ) &&
        !sourceIncludes(viewTypes, "create(): any") &&
        !sourceIncludes(viewTypes, "load(content: Contents): Promise<any>") &&
        !sourceIncludes(viewTypes, "display(request?: Function): Promise<any>") &&
        !sourceIncludes(viewTypes, "Promise<any>") &&
        sourceIncludes(typeTests, 'ReturnType<View["create"]>, HTMLIFrameElement') &&
        sourceIncludes(typeTests, 'ReturnType<View["load"]>, Promise<Contents>') &&
        sourceIncludes(typeTests, 'ReturnType<View["display"]>, Promise<View>'),
    "View declarations must keep iframe load/display promise typing",
);
assert(
    sourceIncludes(typeTests, "RootContentsSize") &&
        sourceIncludes(typeTests, "RootVerticalRlDebugMetrics") &&
        sourceIncludes(typeTests, "RootVerticalRlPageMetrics") &&
        sourceIncludes(typeTests, "RootVerticalRlMetricsCache") &&
        sourceIncludes(typeTests, "RootVerticalRlPageMetricsCache") &&
        sourceIncludes(typeTests, "RootViewportSettings"),
    "type tests must assert root Contents type exports",
);
assert(
    sourceIncludes(typeTests, "typedContents._size"),
    "type tests must cover Contents runtime size state typing",
);
assert(
    sourceIncludes(typeTests, "typedContents.sectionHref"),
    "type tests must cover Contents sectionHref state typing",
);
assert(
    sourceIncludes(typeTests, "typedContents._verticalRlMetricsCache"),
    "type tests must cover Contents vertical-rl metrics cache typing",
);
assert(
    sourceIncludes(typeTests, 'VerticalRlPageMetricsCache["metrics"], VerticalRlPageMetrics'),
    "type tests must assert Contents vertical-rl page metrics cache payload typing",
);
assert(
    sourceIncludes(
        typeTests,
        'ReturnType<Contents["verticalRlPageMetrics"]>, VerticalRlPageMetrics',
    ),
    "type tests must assert Contents vertical-rl page metrics return typing",
);
assert(
    sourceIncludes(
        typeTests,
        'ReturnType<Contents["debugVerticalRlMetrics"]>, VerticalRlDebugMetrics',
    ),
    "type tests must assert Contents vertical-rl debug metrics return typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Contents["fit"]>, [width: number, height: number, section?: unknown]',
    ),
    "type tests must assert Contents fit optional section typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Contents["map"]>, [layout: MappingLayout]'),
    "type tests must assert Contents map MappingLayout parameter typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Contents["map"]>, EpubCFIPair[]'),
    "type tests must assert Contents map CFI pair list return typing",
);
assert(
    sourceIncludes(
        typeTests,
        'Parameters<Contents["mapPage"]>, [cfiBase: string, layout: MappingLayout, start: number, end: number, dev?: boolean | undefined]',
    ),
    "type tests must assert Contents mapPage MappingLayout parameter typing",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Contents["mapPage"]>, EpubCFIPair | undefined'),
    "type tests must assert Contents mapPage CFI pair return typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Contents["addClass"]>, [className: string]'),
    "type tests must assert Contents addClass string parameter typing",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Contents["removeClass"]>, [className: string]'),
    "type tests must assert Contents removeClass string parameter typing",
);
assert(
    sourceIncludes(typeTests, "typedContents.fit(320, 480"),
    "type tests must cover Contents fit optional section usage",
);
assert(
    sourceIncludes(typeTests, "const contentsMap: EpubCFIPair[] = typedContents.map"),
    "type tests must cover Contents map usage",
);
assert(
    sourceIncludes(
        typeTests,
        "const contentsMapPage: EpubCFIPair | undefined = typedContents.mapPage",
    ),
    "type tests must cover Contents mapPage usage",
);
assert(
    sourceIncludes(typeTests, 'ReturnType<Contents["on"]>, unknown'),
    "type tests must assert Contents EventEmitter listener typing",
);
assert(
    sourceIncludes(typeTests, "const contentsOn: unknown = typedContents.on"),
    "type tests must cover Contents on listener usage",
);
assert(
    sourceIncludes(typeTests, "const contentsOff: unknown = typedContents.off"),
    "type tests must cover Contents off listener usage",
);
assert(
    sourceIncludes(typeTests, "const contentsOnce: unknown = typedContents.once"),
    "type tests must cover Contents once listener usage",
);
assert(
    sourceIncludes(typeTests, 'Parameters<Contents["emit"]>, [type: string, ...args: unknown[]]') &&
        sourceIncludes(
            typeTests,
            'Parameters<Contents["on"]>, [type: string, listener: (...args: unknown[]) => void]',
        ) &&
        sourceIncludes(
            typeTests,
            'Parameters<Contents["off"]>, [type: string, listener: (...args: unknown[]) => void]',
        ) &&
        sourceIncludes(
            typeTests,
            'Parameters<Contents["once"]>, [type: string, listener: (...args: unknown[]) => void]',
        ),
    "type tests must assert Contents EventEmitter parameter typing",
);
assert(
    sourceIncludes(contentsSource, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            contentsSource,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            contentsSource,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            contentsSource,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(contentsTypes, "emit(type: string, ...args: unknown[]): void") &&
        sourceIncludes(
            contentsTypes,
            "on(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            contentsTypes,
            "off(type: string, listener: (...args: unknown[]) => void): unknown",
        ) &&
        sourceIncludes(
            contentsTypes,
            "once(type: string, listener: (...args: unknown[]) => void): unknown",
        ),
    "Contents source and declarations must keep EventEmitter method type parity",
);
assert(
    sourceIncludes(contentsSource, "addClass(className: string): void") &&
        sourceIncludes(contentsSource, "removeClass(className: string): void") &&
        sourceIncludes(contentsTypes, "addClass(className: string): void") &&
        sourceIncludes(contentsTypes, "removeClass(className: string): void"),
    "Contents source and declarations must keep class mutation parameter type parity",
);
assert(
    sourceIncludes(contentsSource, "type StylesheetRuleProperty = [string, string, boolean?]") &&
        sourceIncludes(contentsSource, "type StylesheetArrayRule =") &&
        sourceIncludes(
            contentsSource,
            "type StylesheetObjectRule = Record<string, Record<string, string> | Array<Record<string, string>> | string>",
        ) &&
        sourceIncludes(
            contentsSource,
            "type StylesheetRules = StylesheetArrayRule[] | StylesheetObjectRule",
        ) &&
        sourceIncludes(
            contentsSource,
            "addStylesheetRules(rules: StylesheetRules, key?: string): void",
        ) &&
        sourceIncludes(
            contentsTypes,
            "addStylesheetRules(rules: Array<object> | object, key?: string): void",
        ) &&
        !sourceIncludes(contentsSource, "type StylesheetRules = any"),
    "Contents source and declarations must keep stylesheet rules typing parity",
);
assert(
    sourceIncludes(
        contentsSource,
        "type LoadableElement = (HTMLLinkElement | HTMLScriptElement)",
    ) &&
        sourceIncludes(
            contentsSource,
            "onreadystatechange: ((this: LoadableElement, event: Event) => void) | null",
        ) &&
        sourceIncludes(contentsSource, "addStylesheet(src: string): Promise<boolean>") &&
        sourceIncludes(contentsSource, "addScript(src: string): Promise<boolean>") &&
        sourceIncludes(contentsSource, "reject: (reason?: unknown) => void") &&
        sourceIncludes(contentsSource, "function(this: LoadableElement)") &&
        sourceIncludes(
            contentsSource,
            "($stylesheet as LoadableElement).onload = ($stylesheet as LoadableElement).onreadystatechange",
        ) &&
        sourceIncludes(
            contentsSource,
            "($script as LoadableElement).onload = ($script as LoadableElement).onreadystatechange",
        ) &&
        !sourceIncludes(contentsSource, "reject: (reason?: any) => void") &&
        !sourceIncludes(contentsSource, "($stylesheet as any).onload") &&
        !sourceIncludes(contentsSource, "($script as any).onload") &&
        !sourceIncludes(contentsSource, "onreadystatechange = function(this: any)"),
    "Contents source must keep stylesheet/script load handlers typed",
);
assert(
    sourceIncludes(
        contentsSource,
        'this.document.addEventListener("selectionchange", this._onSelectionChange, { passive: true } as AddEventListenerOptions)',
    ) &&
        sourceIncludes(
            contentsSource,
            'this.document.removeEventListener("selectionchange", this._onSelectionChange, { passive: true } as AddEventListenerOptions)',
        ) &&
        !sourceIncludes(
            contentsSource,
            'this.document.addEventListener("selectionchange", this._onSelectionChange, { passive: true } as any)',
        ) &&
        !sourceIncludes(
            contentsSource,
            'this.document.removeEventListener("selectionchange", this._onSelectionChange, { passive: true } as any)',
        ),
    "Contents source must keep selection listener options typed without any",
);
assert(
    sourceIncludes(contentsSource, "map(layout: MappingLayout): EpubCFIPair[]") &&
        sourceIncludes(contentsTypes, "map(layout: MappingLayout): EpubCFIPair[]") &&
        sourceIncludes(
            contentsSource,
            "mapPage(cfiBase: string, layout: MappingLayout, start: number, end: number, dev?: boolean): EpubCFIPair | undefined",
        ) &&
        sourceIncludes(
            contentsTypes,
            "mapPage(cfiBase: string, layout: MappingLayout, start: number, end: number, dev?: boolean): EpubCFIPair | undefined",
        ),
    "Contents source and declarations must keep map and mapPage MappingLayout return type parity",
);
assert(
    sourceIncludes(contentsSource, "type MappingContents") &&
        sourceIncludes(contentsSource, "type MappingView") &&
        sourceIncludes(contentsSource, "const view: MappingView =") &&
        sourceIncludes(contentsSource, "scrollWidth: () => this.scrollWidth()") &&
        sourceIncludes(contentsSource, "const contents: MappingContents =") &&
        sourceIncludes(contentsSource, "return mapping.page(contents, cfiBase, start, end)") &&
        sourceIncludes(
            contentsSource,
            'this.window.console.debug("[epubjs:vertical-rl]", result)',
        ) &&
        !sourceIncludes(contentsSource, "map.section(undefined as any)") &&
        !sourceIncludes(contentsSource, "mapping.page(this as any") &&
        !sourceIncludes(contentsSource, "(this.window as any).console"),
    "Contents source must keep debug console and mapping bridges typed",
);
assert(
    sourceIncludes(
        contentsTextWidthTests,
        "maps section and page CFI ranges through typed mapping bridges",
    ) &&
        sourceIncludes(
            contentsTextWidthTests,
            "writes vertical-rl debug metrics through the typed console bridge",
        ),
    "contents focused browser tests must cover debug console and mapping bridges",
);
assert(
    sourceIncludes(
        coreCollectionsSource,
        "export function defaults<T extends MutableRecord>(obj: T, ..._sources: MutableRecord[]): T;",
    ) &&
        sourceIncludes(
            coreCollectionsSource,
            "export function defaults<T extends MutableRecord>(obj: T): T",
        ) &&
        sourceIncludes(coreCollectionsSource, "@param {T} item Item to insert.") &&
        sourceIncludes(coreCollectionsSource, "@param {T} item Item to locate.") &&
        !sourceIncludes(coreCollectionsSource, "@param {any} item Item to insert.") &&
        !sourceIncludes(coreCollectionsSource, "@param {any} item Item to locate.") &&
        sourceIncludes(
            contentsSource,
            "type ViewportSettingsRecord = ViewportSettings & Record<string, unknown>",
        ) &&
        sourceIncludes(
            contentsSource,
            "settings = defaults<ViewportSettingsRecord>((options || {}) as ViewportSettingsRecord, parsed as ViewportSettingsRecord)",
        ) &&
        !sourceIncludes(contentsSource, "settings = (defaults as any)(options || {}, parsed)"),
    "Contents viewport settings must keep typed defaults bridge",
);
assert(
    sourceIncludes(contentsSource, "fit(width: number, height: number, section?: unknown): void"),
    "source Contents must keep fit optional section typed as unknown",
);
assert(
    sourceIncludes(contentsSource, "interface EpubReadingSystem") &&
        sourceIncludes(contentsTypes, "interface EpubReadingSystem") &&
        sourceIncludes(
            contentsSource,
            "type EpubNavigator = Navigator & { epubReadingSystem?: EpubReadingSystem }",
        ) &&
        sourceIncludes(
            contentsSource,
            "epubReadingSystem(name: string, version: string): EpubReadingSystem",
        ) &&
        sourceIncludes(
            contentsTypes,
            "private epubReadingSystem(name: string, version: string): EpubReadingSystem",
        ) &&
        !sourceIncludes(contentsSource, "epubReadingSystem?: any") &&
        !sourceIncludes(contentsSource, "epubReadingSystem(name: string, version: string): any"),
    "Contents source and declarations must keep epubReadingSystem bridge typed",
);
assert(
    sourceIncludes(contentsSource, "declare _expanding?: boolean") &&
        sourceIncludes(contentsSource, "interface Contents") &&
        sourceIncludes(contentsSource, "emit(type: string, ...args: unknown[]): void") &&
        !sourceIncludes(contentsSource, "[key: string]: any"),
    "Contents source must keep class state fields explicit without a catch-all any index",
);
assert(
    sourceIncludes(sourceRoot, "\tContents,") &&
        sourceIncludes(sourceRoot, "ContentsSize") &&
        sourceIncludes(sourceRoot, "VerticalRlDebugMetrics") &&
        sourceIncludes(sourceRoot, "VerticalRlPageMetrics") &&
        sourceIncludes(sourceRoot, "VerticalRlMetricsCache") &&
        sourceIncludes(sourceRoot, "VerticalRlPageMetricsCache") &&
        sourceIncludes(sourceRoot, "ViewportSettings"),
    "source root must export Contents public types",
);
assert(
    sourceIncludes(contentsSource, "export interface VerticalRlPageMetrics") &&
        sourceIncludes(contentsSource, "metrics: VerticalRlPageMetrics;") &&
        sourceIncludes(
            contentsSource,
            "verticalRlPageMetrics(pageWidth?: number, pageHeight?: number): VerticalRlPageMetrics",
        ),
    "source Contents must expose typed vertical-rl page metrics",
);
assert(
    sourceIncludes(contentsSource, "export interface VerticalRlDebugMetrics") &&
        sourceIncludes(
            contentsSource,
            "debugVerticalRlMetrics(pageWidth?: number): VerticalRlDebugMetrics",
        ),
    "source Contents must expose typed vertical-rl debug metrics",
);
assert(
    sourceIncludes(typeTests, "type CoreUtilsAssertions"),
    "type tests must assert the utils/core public surface",
);
assert(
    sourceIncludes(typeTests, "RootAnimationFrameRequest") &&
        sourceIncludes(typeTests, "RootBlobContent") &&
        sourceIncludes(typeTests, "RootDeferred") &&
        sourceIncludes(typeTests, "RootRectBounds") &&
        sourceIncludes(typeTests, "RootSizeBounds"),
    "type tests must assert root utils/core type exports",
);
assert(
    sourceIncludes(sourceRoot, "AnimationFrameRequest") &&
        sourceIncludes(sourceRoot, "BlobContent") &&
        sourceIncludes(sourceRoot, "Deferred") &&
        sourceIncludes(sourceRoot, "RectBounds") &&
        sourceIncludes(sourceRoot, "SizeBounds"),
    "source root must export utils/core public types",
);
assert(
    sourceIncludes(typeTests, "ePub.utils.requestAnimationFrame"),
    "type tests must cover utils/core requestAnimationFrame typing",
);
assert(
    sourceIncludes(typeTests, 'ePub.utils.createBlob(coreBlobContent, "text/plain")'),
    "type tests must cover utils/core blob content typing",
);
assert(
    sourceIncludes(coreUtilsSource, "@param {unknown} n") &&
        sourceIncludes(coreUtilsSource, "@param {T} item") &&
        !sourceIncludes(coreUtilsSource, "@param {any} n") &&
        !sourceIncludes(coreUtilsSource, "@param {any} item"),
    "source utils/core facade must keep unknown and generic helper JSDoc without stale any",
);
assert(
    sourceIncludes(
        platformBlobSource,
        "export type BlobContent = BlobPart[] | BlobPart | string | ArrayBuffer | ArrayBufferView",
    ) &&
        sourceIncludes(
            platformBlobSource,
            "createBlob(content: BlobContent, mime: string): Blob",
        ) &&
        sourceIncludes(
            platformBlobSource,
            "createBlobUrl(content: BlobContent, mime: string): string",
        ) &&
        sourceIncludes(
            platformBlobSource,
            "createBase64Url(content: string, mime: string): string",
        ) &&
        sourceIncludes(platformBlobSource, "@param {BlobContent} content Blob content.") &&
        sourceIncludes(platformBlobSource, "@param {string} content Source content.") &&
        sourceIncludes(coreUtilsSource, "@param {BlobContent} content") &&
        sourceIncludes(coreUtilsSource, "@param {string} content") &&
        sourceIncludes(platformBlobSource, 'typeof(content as unknown) !== "string"') &&
        !sourceIncludes(platformBlobSource, 'from "../utils/core"') &&
        !sourceIncludes(platformBlobSource, "createBlob(content: any") &&
        !sourceIncludes(platformBlobSource, "createBlobUrl(content: any") &&
        !sourceIncludes(platformBlobSource, "createBase64Url(content: any") &&
        !sourceIncludes(platformBlobSource, "@param {any} content Blob content.") &&
        !sourceIncludes(platformBlobSource, "@param {any} content Source content.") &&
        !sourceIncludes(coreUtilsSource, "@param {any} content"),
    "source platform and core blob helpers must keep BlobContent and string input type parity",
);
assert(
    sourceIncludes(
        platformDomSource,
        "querySelectorByType(html: Element | Document, element: string, type: string): Element | undefined",
    ) &&
        sourceIncludes(platformDomSource, "var query: Element | null | undefined") &&
        sourceIncludes(
            platformDomSource,
            "var elements: NodeListOf<Element> | HTMLCollectionOf<Element>",
        ) &&
        !sourceIncludes(platformDomSource, "var query: any"),
    "source platform DOM querySelectorByType must keep typed query fallback handling",
);
assert(
    sourceIncludes(platformLayoutSource, "type StylePixelProperty =") &&
        sourceIncludes(
            platformLayoutSource,
            "function sumStylePixels(style: CSSStyleDeclaration, props: StylePixelProperty[]): number",
        ) &&
        sourceIncludes(platformLayoutSource, "var widthProps: StylePixelProperty[]") &&
        sourceIncludes(platformLayoutSource, "var heightProps: StylePixelProperty[]") &&
        sourceIncludes(platformLayoutSource, "parseFloat(style[prop])") &&
        !sourceIncludes(platformLayoutSource, "style[prop as any]"),
    "source platform layout style pixel summing must keep typed CSS property access",
);
assert(
    sourceIncludes(typeTests, "new ePub.utils.RangeObject()"),
    "type tests must cover utils/core RangeObject typing",
);
assert(
    sourceIncludes(typeTests, "coreRangeStartContainer: Node | undefined") &&
        sourceIncludes(typeTests, "coreRangeStartOffset: number | undefined") &&
        sourceIncludes(typeTests, "coreRangeEndContainer: Node | undefined") &&
        sourceIncludes(typeTests, "coreRangeEndOffset: number | undefined") &&
        sourceIncludes(typeTests, "coreRangeCommonAncestorContainer: Node | undefined"),
    "type tests must cover utils/core RangeObject boundary property typing",
);
assert(
    sourceIncludes(compatRangeSource, "commonAncestorContainer: Node | undefined") &&
        sourceIncludes(compatRangeSource, "endContainer: Node | undefined") &&
        sourceIncludes(compatRangeSource, "endOffset: number | undefined") &&
        sourceIncludes(compatRangeSource, "startContainer: Node | undefined") &&
        sourceIncludes(compatRangeSource, "startOffset: number | undefined") &&
        sourceIncludes(
            compatRangeSource,
            "this.commonAncestorContainer = this.endContainer ? this.endContainer.parentNode : undefined",
        ) &&
        !sourceIncludes(compatRangeSource, "commonAncestorContainer: any") &&
        !sourceIncludes(compatRangeSource, "endContainer: any") &&
        !sourceIncludes(compatRangeSource, "endOffset: any") &&
        !sourceIncludes(compatRangeSource, "startContainer: any") &&
        !sourceIncludes(compatRangeSource, "startOffset: any"),
    "source RangeObject must keep typed boundary property parity",
);
assert(
    sourceIncludes(typeTests, "type EpubCFIAssertions"),
    "type tests must assert the EpubCFI public surface",
);
assert(
    sourceIncludes(typeTests, "RootParsedEpubCFI"),
    "type tests must assert root EpubCFI type exports",
);
assert(
    sourceIncludes(typeTests, 'cfi.parse("epubcfi(/6/2[cover]!/6)")'),
    "type tests must cover EpubCFI parse typing",
);
assert(
    sourceIncludes(typeTests, 'cfi.checkType("epubcfi(/6/2[cover]!/6)")'),
    "type tests must cover EpubCFI checkType typing",
);
assert(
    sourceIncludes(typeTests, "cfi.fromRange(parsedDocument.createRange(), cfiBase)"),
    "type tests must cover EpubCFI range construction typing",
);
assert(
    sourceIncludes(typeTests, "EpubCFIComponent | Record<string, never>"),
    "type tests must assert EpubCFI empty fallback object typing without any",
);
assert(
    sourceIncludes(typeTests, "const cfiFallbackBase: EpubCFIBase = {}"),
    "type tests must cover EpubCFI empty fallback base typing",
);
assert(
    sourceIncludes(sourceRoot, "ParsedEpubCFI") &&
        sourceIncludes(sourceRoot, "EpubCFISegment") &&
        sourceIncludes(sourceRoot, "EpubCFIInput") &&
        sourceIncludes(sourceRoot, "EpubCFIRangeInput"),
    "source root must export EpubCFI public types",
);
assert(
    sourceIncludes(epubcfiSource, "export interface EpubCFIRangeInput") &&
        sourceIncludes(epubcfiTypes, "export interface EpubCFIRangeInput") &&
        sourceIncludes(
            epubcfiSource,
            "constructor(cfiFrom?: EpubCFIInput, base?: EpubCFIBase, ignoreClass?: string)",
        ) &&
        sourceIncludes(
            epubcfiTypes,
            "constructor(cfiFrom?: EpubCFIInput, base?: EpubCFIBase, ignoreClass?: string)",
        ) &&
        sourceIncludes(typeIndex, "EpubCFIRangeInput") &&
        sourceIncludes(typeTests, "RootEpubCFIRangeInput, EpubCFIRangeInput") &&
        sourceIncludes(typeTests, "const locationRangeCfiInput: EpubCFIInput = locationRange") &&
        sourceIncludes(
            typeTests,
            "Parameters<EpubCFI[\"fromRange\"]>[0], Range | import('./compat/range').RangeObject | EpubCFIRangeInput",
        ) &&
        !sourceIncludes(epubcfiSource, "constructor(cfiFrom?: EpubCFIInput | any"),
    "EpubCFI source and declarations must keep constructor and lightweight range input typed without any",
);
assert(
    sourceIncludes(
        epubcfiSource,
        "segmentString(segment: EpubCFIComponent | Record<string, never>): string",
    ) &&
        sourceIncludes(epubcfiSource, 'if (!("steps" in segment))') &&
        sourceIncludes(epubcfiTypes, "private segmentString(segment: EpubCFISegment): string") &&
        !sourceIncludes(
            epubcfiSource,
            "segmentString(segment: EpubCFIComponent | Record<string, any>): string",
        ),
    "EpubCFI source must keep segmentString fallback typed without any",
);
assert(
    sourceIncludes(epubcfiTypes, "interface MissedBoundary") &&
        sourceIncludes(epubcfiTypes, "container: Node | null") &&
        sourceIncludes(
            epubcfiTypes,
            "private filteredStep(node: Node, ignoreClass?: string): EpubCFIStep | undefined",
        ) &&
        sourceIncludes(
            epubcfiTypes,
            "private findNode(steps: Array<EpubCFIStep>, _doc?: Document, ignoreClass?: string | null): Node | null",
        ) &&
        sourceIncludes(
            epubcfiTypes,
            "private fixMiss(steps: Array<EpubCFIStep>, offset: number | null | undefined, _doc?: Document, ignoreClass?: string | null): MissedBoundary",
        ) &&
        !sourceIncludes(
            epubcfiTypes,
            "private filteredStep(node: Node, ignoreClass?: string): any",
        ) &&
        !sourceIncludes(
            epubcfiTypes,
            "private fixMiss(steps: Array<EpubCFIStep>, offset: number, _doc?: Document, ignoreClass?: string): any",
        ),
    "EpubCFI declarations must keep private boundary helpers typed",
);

assert(
    sourceIncludes(globalTypeTests, "const book = ePub("),
    "global namespace tests must cover callable ePub",
);
assert(
    sourceIncludes(globalTypeTests, "ePub.VERSION"),
    "global namespace tests must cover ePub.VERSION",
);
assert(
    sourceIncludes(globalTypeTests, "new ePub.CFI()"),
    "global namespace tests must cover static CFI constructor",
);

assert(
    sourceIncludes(publicApiTests, "ePub.Book"),
    "browser public API tests must cover root static Book",
);
assert(
    sourceIncludes(publicApiTests, "ePub.utils"),
    "browser public API tests must cover legacy utils facade",
);
assert(
    sourceIncludes(publicApiTests, "replaceBase"),
    "browser public API tests must cover root replacement helpers",
);
assert(sourceIncludes(umdGlobalTests, "window.ePub"), "UMD browser tests must cover window.ePub");

console.log("Gate 1 package entry and typed public API readiness verified.");

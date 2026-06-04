# Patchlog

This file tracks `lalalili/epub.js` fork patches for internal maintenance.

## Template

### Patch ID
- Why:
- Diff Scope:
- Test:
- Rollback:

## 2026-06-04

### P-0367
- Why:
  - `Layout` already exposes `emit`, `on`, `off`, and `once` in source and declarations, but Gate 1 only guarded the layout construction, formatting, counting, and update surface.
  - The Layout EventEmitter contract should be covered by the same source/type-smoke guard pattern as Book, Contents, Rendition, Locations, Store, and Annotation.
  - Adding this guard keeps Layout source/.d.ts/TypeDoc parity enforceable without changing layout calculation, formatting, pagination, spread, flow, or runtime event wiring.
- Diff Scope:
  - `types/epubjs-tests.ts`: assert Layout EventEmitter method return types and add `emit` / `on` / `off` / `once` usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Layout EventEmitter method parity and type-smoke assertions.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/layout.test.js`
  - `npm run docs:md`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Layout stops using EventEmitter prototype augmentation or intentionally narrows its listener methods in declarations.

### P-0366
- Why:
  - `Annotation` is wired with `EventEmitter(Annotation.prototype)`, but the source only exposed event emission through a local cast that declared `emit` alone.
  - The declaration file already exposes `emit`, `on`, `off`, and `once`, so source, package-root types, and generated docs should keep the same Annotation EventEmitter contract.
  - Tightening the source surface keeps Annotation source/.d.ts/TypeDoc parity enforceable without changing highlight, underline, mark, attach, detach, removal, or runtime event wiring.
- Diff Scope:
  - `src/annotations.ts`: declare `emit`, `on`, `off`, and `once` on the merged `Annotation` interface after the class and remove the narrow local event cast.
  - `types/epubjs-tests.ts`: assert Annotation EventEmitter method return types and add `emit` / `on` / `off` / `once` usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Annotation EventEmitter method parity and type-smoke assertions.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/annotations.test.js`
  - `npm run docs:md`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Annotation stops using EventEmitter prototype augmentation or intentionally narrows its listener methods in declarations.

### P-0365
- Why:
  - `LayoutContent.fit()` and `Layout.format()` already treat the optional section bridge argument as `unknown`, but `Contents.fit()` still exposed it as `any` in both source and declarations.
  - `Contents.fit()` only needs to detect a `properties` array containing `page-spread-left`, so a local type guard can keep the public bridge argument unknown while preserving the valid section behavior.
  - Tightening this surface keeps Contents source/.d.ts/TypeDoc parity enforceable without changing fixed-layout fitting, viewport sizing, scaling, overflow, transform behavior, or valid page-spread-left margin handling.
- Diff Scope:
  - `src/contents.ts`: type the optional `Contents.fit()` section argument as `unknown`.
  - `types/contents.d.ts`: mirror the `Contents.fit()` optional section argument as `unknown`.
  - `types/epubjs-tests.ts`: assert `Contents.fit()` parameters and add usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require `Contents.fit()` optional section parity and type-smoke assertions.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/contents-text-width.test.js`
  - `npm run docs:md`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if `Contents.fit()` starts reading section-specific properties that need a dedicated public section bridge type.

### P-0364
- Why:
  - `Rendition` is wired with `EventEmitter(Rendition.prototype)`, but the declaration file still exposed listener methods with `any` event names and listener signatures.
  - The source already treats Rendition event names as strings, and the source/.d.ts/TypeDoc public contract should expose the same listener method surface.
  - Tightening the type surface keeps Rendition EventEmitter parity enforceable without changing display, relocation, layout, annotation, link, resize, or runtime event wiring.
- Diff Scope:
  - `src/rendition.ts`: declare `emit`, `on`, `off`, and `once` on the merged `Rendition` interface after the class.
  - `types/rendition.d.ts`: expose string event names and listener function signatures for Rendition EventEmitter methods.
  - `types/epubjs-tests.ts`: assert Rendition EventEmitter method return types and add `emit` / `on` / `off` / `once` usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Rendition EventEmitter method parity and type-smoke assertions.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/rendition.test.js`
  - `npm run docs:md`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Rendition stops using EventEmitter prototype augmentation or intentionally keeps untyped listener methods in declarations.

### P-0363
- Why:
  - `Contents` is wired with `EventEmitter(Contents.prototype)`, but the declaration file still exposed listener methods with `any` event names and listener signatures.
  - The source already treats Contents event names as strings, and the source/.d.ts/TypeDoc public contract should expose the same listener method surface.
  - Tightening the type surface keeps Contents EventEmitter parity enforceable without changing iframe lifecycle, content measurement, selection, link, resize, or runtime event wiring.
- Diff Scope:
  - `src/contents.ts`: declare `emit`, `on`, `off`, and `once` on the merged `Contents` interface after the class.
  - `types/contents.d.ts`: expose string event names and listener function signatures for Contents EventEmitter methods.
  - `types/epubjs-tests.ts`: assert Contents EventEmitter method return types and add `emit` / `on` / `off` / `once` usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Contents EventEmitter method parity and type-smoke assertions.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/contents-text-width.test.js`
  - `npm run docs:md`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Contents stops using EventEmitter prototype augmentation or intentionally keeps untyped listener methods in declarations.

### P-0362
- Why:
  - `Book` is wired with `EventEmitter(Book.prototype)`, but the declaration file still exposed its listener methods with `any` event names and listener signatures.
  - The source already treats Book event names as strings, and consumers should get the same EventEmitter contract from source, package-root types, and generated docs.
  - Tightening the type surface keeps Book EventEmitter parity enforceable without changing book opening, loading, rendering, storage, navigation, or runtime event wiring.
- Diff Scope:
  - `src/book.ts`: declare `emit`, `on`, `off`, and `once` on the merged `Book` interface after the class.
  - `types/book.d.ts`: expose string event names and listener function signatures for Book EventEmitter methods.
  - `types/epubjs-tests.ts`: assert Book EventEmitter method return types and add `emit` / `on` / `off` / `once` usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Book EventEmitter method parity and type-smoke assertions.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js`
  - `npm run docs:md`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Book stops using EventEmitter prototype augmentation or intentionally keeps untyped listener methods in declarations.

### P-0361
- Why:
  - `Store` is wired with `EventEmitter(Store.prototype)` and already calls `emit()` for online/offline status transitions, but source and declarations only exposed `emit`.
  - The runtime listener methods `on`, `off`, and `once` were therefore missing from the source/.d.ts public contract even though they are available through the same EventEmitter augmentation.
  - Adding the listener method declarations keeps Store source/.d.ts/EventEmitter parity enforceable before future release tags, without changing storage writes, offline retrieval, URL creation, status events, or EventEmitter runtime wiring.
- Diff Scope:
  - `src/store.ts`: declare `emit`, `on`, `off`, and `once` on the merged `Store` interface after the class.
  - `types/store.d.ts`: expose Store EventEmitter listener methods.
  - `types/epubjs-tests.ts`: assert Store EventEmitter method return types and add `emit` / `on` / `off` / `once` usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Store EventEmitter method parity and type-smoke assertions.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/store.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Store stops using EventEmitter prototype augmentation or intentionally hides listener methods from the source public type surface.

### P-0360
- Why:
  - `MappingDirection` is already part of the public Mapping export surface and is used by the `Mapping` constructor, but the `Mapping.direction` instance property still surfaced as a raw `string` in both source and declarations.
  - That made the constructor direction input and stored direction state harder to assert as one named public contract.
  - Reusing `MappingDirection` keeps Mapping source/.d.ts/type-smoke/Gate 1 parity enforceable, without narrowing accepted direction values or changing the existing `direction || "ltr"` runtime fallback.
- Diff Scope:
  - `src/mapping.ts`, `types/mapping.d.ts`: type the `Mapping.direction` property with `MappingDirection`.
  - `types/epubjs-tests.ts`: add `MappingDirection` property and constructor usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require `Mapping.direction` source/declaration/type-smoke parity.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/mapping.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if `Mapping.direction` should intentionally remain typed as a raw string instead of the root-exported direction alias.

### P-0359
- Why:
  - `MappingAxis` is already part of the public Mapping export surface and is used by the `Mapping` constructor, but `Mapping.axis()` still accepted a raw `string` in both source and declarations.
  - That left the axis setter outside the named public alias parity guards even though it mutates the same horizontal/vertical state as the constructor axis input.
  - Reusing `MappingAxis` keeps source/.d.ts/type-smoke/Gate 1 parity enforceable, without narrowing legacy accepted values or changing the existing non-`"horizontal"`-means-vertical runtime behavior.
- Diff Scope:
  - `src/mapping.ts`, `types/mapping.d.ts`: type `Mapping.axis()` with `MappingAxis`.
  - `types/epubjs-tests.ts`: add `MappingAxis` method parameter and usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require `Mapping.axis()` source/declaration/type-smoke parity.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/mapping.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if `Mapping.axis()` should intentionally remain typed as a raw string instead of the root-exported axis alias.

### P-0358
- Why:
  - `MappingView.section` is part of the public mapping view input shape, but its `cfiBase` contract was represented by an internal source-only `MappingSection` interface and an inline declaration object.
  - That made root public API and Gate 1 readiness unable to assert the named section shape even though `Mapping.section()` and `rangeListToCfiList()` rely on it to build CFI pairs.
  - Exporting `MappingSection` keeps Mapping source/.d.ts/root parity enforceable before future release tags, without changing page mapping, range walking, CFI conversion, axis handling, or text range splitting behavior.
- Diff Scope:
  - `src/mapping.ts`, `types/mapping.d.ts`: export `MappingSection` and use it in `MappingView.section`.
  - `src/index.ts`, `types/index.d.ts`: export `MappingSection` from the package root.
  - `types/epubjs-tests.ts`: add root export assertions and MappingView section usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require MappingSection source/declaration/root/type-smoke parity guards.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/mapping.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if `MappingView.section` should intentionally remain an inline object shape rather than a named root-exported public type.

### P-0357
- Why:
  - `Locations` is wired with `EventEmitter(Locations.prototype)` and the public declaration file exposes `emit`, `on`, `off`, and `once`.
  - The TypeScript source merged interface only declared `emit`, leaving source consumers and Gate 1 readiness without an enforceable source-level contract for the listener methods already present at runtime and in `.d.ts`.
  - Adding the missing source interface method declarations keeps Locations source/.d.ts/EventEmitter parity enforceable before future release tags, without changing location generation, word location parsing, current-location events, queue processing, or EventEmitter runtime wiring.
- Diff Scope:
  - `src/locations.ts`: declare `on`, `off`, and `once` on the merged `Locations` interface alongside `emit`.
  - `types/epubjs-tests.ts`: assert Locations EventEmitter method return types and add `emit` / `on` / `off` / `once` usage smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Locations source EventEmitter method parity and type-smoke assertions.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/locations.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Locations stops using EventEmitter prototype augmentation or intentionally hides listener methods from the source public type surface.

### P-0356
- Why:
  - `Packaging.load()` accepts JSON manifests and builds spine items from `json.readingOrder || json.spine`, but `PackagingJsonManifest` allowed both fields to be omitted.
  - That declaration shape made an invalid JSON manifest look type-safe even though the source immediately calls `.map()` on the resolved spine list.
  - Splitting out `PackagingJsonManifestBase` and making `PackagingJsonManifest` require either `readingOrder` or `spine` keeps package JSON manifest typing aligned with the runtime contract, without changing OPF parsing, JSON manifest loading, metadata extraction, manifest indexing, cover detection, or TOC labeling behavior.
- Diff Scope:
  - `src/packaging.ts`, `types/packaging.d.ts`: define `PackagingJsonManifestBase` and tighten `PackagingJsonManifest` to require `readingOrder` or `spine`.
  - `src/index.ts`, `types/index.d.ts`: export `PackagingJsonManifestBase` from the package root.
  - `types/epubjs-tests.ts`: add root export assertions and JSON manifest reading-order/spine type smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Packaging JSON manifest base and spine fallback guards.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/packaging.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if `PackagingJsonManifest` must intentionally permit manifests without both `readingOrder` and `spine`.

### P-0355
- Why:
  - `Archive.request()` and `Archive.handleResponse()` already expose markup-specific overloads in source, but the markup request union remained an internal source-only alias while declarations repeated the literal union inline.
  - `ArchiveZip.loadAsync()` also accepted an inline `{ base64?: boolean }` options shape, making the public zip/load option contract harder to assert from the package root.
  - Exporting `ArchiveMarkupRequestType` and `ArchiveZipOptions` keeps Archive source/.d.ts/root parity enforceable before future release tags, without changing zip loading, archive resource requests, URL caching, object URL revocation, or response parsing behavior.
- Diff Scope:
  - `src/archive.ts`, `types/archive.d.ts`: export `ArchiveMarkupRequestType` and `ArchiveZipOptions`, and reuse them in request/response and zip load signatures.
  - `src/index.ts`, `types/index.d.ts`: export the new Archive public helper types from the package root.
  - `types/epubjs-tests.ts`: add root export assertions and Archive zip/markup request type smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Archive markup request and zip options parity guards.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/archive.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Archive markup request and zip load options should intentionally remain declaration-local helper shapes instead of root-exported public types.

### P-0354
- Why:
  - `Store.request()`, `Store.retrieve()`, and `Store.handleResponse()` already expose mode-specific overloads, but the public `StoreRequest` requester type still used one broad `Promise<RequestResponse | StoreData>` function signature.
  - The store requester is called with explicit modes such as `binary`, `blob`, `json`, and EPUB markup request types, so exposing those modes makes constructor/requester typing match the source call sites and root public API.
  - Adding `StoreRequestResponse` and `StoreMarkupRequestType` as root-exported public types keeps Store source/.d.ts/root parity enforceable before future release tags, without changing storage writes, offline retrieval, URL creation, event status handling, or response parsing behavior.
- Diff Scope:
  - `src/store.ts`, `types/store.d.ts`: define `StoreRequest` overloads and export `StoreRequestResponse` / `StoreMarkupRequestType`.
  - `src/index.ts`, `types/index.d.ts`: export the new Store public request helper types from the package root.
  - `types/epubjs-tests.ts`: add root export assertions and Store requester overload smoke.
  - `scripts/verify-gate1-readiness.mjs`: require Store request overload/source/declaration/root parity guards.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/store.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Store requester consumers must intentionally use only a single union-return signature instead of mode-specific overloads.

### P-0353
- Why:
  - `Resources.createUrl()` requests binary assets with `type: "blob"` and `Resources.createCssFile()` requests CSS text with `type: "text"`, but `ResourceRequest` exposed both modes through one `Promise<Blob | string>` signature.
  - That wider public type forced source casts even though the call sites know the requested response shape.
  - Adding overloads keeps Resources source/.d.ts parity tighter and makes options/settings request typing enforceable before future release tags, without changing replacement mode, archive handling, CSS rewriting, URL substitution, or resource grouping behavior.
- Diff Scope:
  - `src/resources.ts`, `types/resources.d.ts`: define `ResourceRequest` overloads for `blob` and `text` response modes.
  - `src/resources.ts`: remove now-unneeded `Blob` / `string` casts at request call sites.
  - `types/epubjs-tests.ts`: add ResourceRequest overload smoke and options/settings request assertions.
  - `scripts/verify-gate1-readiness.mjs`: require Resources request overload parity guards.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/resources.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if ResourceRequest consumers must intentionally use a single union-return signature instead of mode-specific overloads.

### P-0352
- Why:
  - `PageListItem.page` and `PageValue` already allow both string and numeric page labels, but `PageLookup` and `PageReverseLookup` were still typed as string-keyed records.
  - The source stores lookups with `item.page` and accepts `PageValue` for `cfiFromPage()` and `hrefFromPage()`, so the public lookup aliases should preserve numeric page key compatibility.
  - Tightening this contract keeps PageList value/lookup parity enforceable before future release tags without changing page-list parsing, CFI lookup, href lookup, percentage calculation, or destroy behavior.
- Diff Scope:
  - `src/pagelist.ts`, `types/pagelist.d.ts`: key `PageLookup` and `PageReverseLookup` by `PageValue`.
  - `types/epubjs-tests.ts`: add PageList lookup alias assertions and numeric page lookup smoke.
  - `scripts/verify-gate1-readiness.mjs`: require PageList lookup alias and numeric lookup guards.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/pagelist.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if PageList lookups should intentionally reject numeric `PageValue` keys despite accepting numeric page values in the public methods.

### P-0351
- Why:
  - `Navigation` root exports and type smoke already covered the main public class and value types, but `types/navigation.d.ts` still diverged from the TypeScript source for parser helper methods.
  - The declaration file omitted `parseNavList`, narrowed `NavigationDocument` parameters to `XMLDocument`, hid source-public helpers behind TypeScript `private`, and missed `undefined` fallback returns for `navItem`, `landmarkItem`, and `getByIndex`.
  - Aligning the declaration signatures keeps source/.d.ts parity enforceable before future release tags without changing navigation parsing, TOC lookup, landmark lookup, or legacy JSON loading behavior.
- Diff Scope:
  - `types/navigation.d.ts`: align parser helper method visibility, parameters, and fallback return types with `src/navigation.ts`.
  - `types/epubjs-tests.ts`: add Navigation helper method type smoke coverage.
  - `scripts/verify-gate1-readiness.mjs`: require Navigation declaration/type-smoke parity guards.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if the project intentionally reintroduces TypeScript `private` declarations for JSDoc-private Navigation helpers despite the runtime/source public method shape.

### P-0350
- Why:
  - The TypeScript modernization left `Book`, `Rendition`, and `Store` EventEmitter methods as emitted class fields.
  - The generated bundle created own `emit`, `on`, `off`, and `once` properties with `undefined`, hiding the methods installed by `EventEmitter(...prototype)`.
  - In the Aitehub reader this surfaced on the scripted interactive EPUB `01KT1F3JBHF8MW3XDPZQRH1EE1` as `t.value.on is not a function` and `this.emit is not a function` during scroll-mode `Rendition.start()`.
- Diff Scope:
  - `src/book.ts`, `src/rendition.ts`, `src/store.ts`: convert EventEmitter method type members to `declare` so TypeScript does not emit runtime class fields.
  - `dist/*`: rebuild package artifacts from the corrected source declarations.
- Test:
  - `npm run typecheck`
  - `npm run build`
  - Aitehub host verification: focused epubjs runtime guard Vitest, `pnpm run build`, `pnpm run verify:reader-assets`, browser reload of `/epub-reader/reader/01KT1F3JBHF8MW3XDPZQRH1EE1`, and `artisan test --compact --filter=Epub`.
- Rollback:
  - Revert this patch if the fork moves EventEmitter wiring to explicit instance methods instead of prototype augmentation.

### P-0349
- Why:
  - P-0348 tightened the `Url` root export readiness guard, leaving `replacements` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `LinkCallback`, `SectionLike`, `replaceBase`, `replaceCanonical`, `replaceLinks`, `replaceMeta`, and `substitute`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps replacements root/source/type-smoke parity enforceable before any release tag or host gate, without changing base, canonical, meta, link replacement, or URL substitution behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete replacements root type-smoke aliases and source root helper exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial replacements root export coverage.

### P-0348
- Why:
  - P-0347 tightened the `Path` root export readiness guard, leaving `Url` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Url` and `UrlBase`, but the readiness script only required a subset of that public root surface in the root export guard.
  - Tightening the guard keeps Url root/source/type-smoke parity enforceable before any release tag or host gate, without changing URL parsing, base handling, path resolution, relative URL calculation, or stringification behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Url root type-smoke aliases.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Url root export coverage.

### P-0347
- Why:
  - P-0346 tightened the `Hook` root export readiness guard, leaving `Path` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Path` and `ParsedPath`, but the readiness script only required a subset of that public root surface in the root export guard.
  - Tightening the guard keeps Path root/source/type-smoke parity enforceable before any release tag or host gate, without changing path parsing, absolute-path checks, resolution, relative path calculation, or stringification behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Path root type-smoke aliases.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Path root export coverage.

### P-0346
- Why:
  - P-0345 tightened the `Queue` root export readiness guard, leaving `Hook` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Hook`, `HookRegistration`, `HooksObject`, and `HookTask`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Hook root/source/type-smoke parity enforceable before any release tag or host gate, without changing hook registration, deregistration, trigger ordering, list/clear behavior, or context binding.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Hook root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Hook root export coverage.

### P-0345
- Why:
  - P-0344 tightened the `utils/core` root export readiness guard, leaving `Queue` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Queue`, `QueuedItem`, and `QueueTask`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Queue root/source/type-smoke parity enforceable before any release tag or host gate, without changing enqueue, dequeue, flush, task construction, or queue scheduling behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Queue root type-smoke aliases.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Queue root export coverage.

### P-0344
- Why:
  - P-0343 tightened the `Contents` root export readiness guard, leaving `utils/core` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `AnimationFrameRequest`, `BlobContent`, `Deferred`, `RectBounds`, and `SizeBounds`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps utils/core root/source/type-smoke parity enforceable before any release tag or host gate, without changing blob helpers, bounds calculations, deferred state, requestAnimationFrame wiring, or RangeObject behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete utils/core root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/book.test.js test/browser/contents-text-width.test.js test/browser/layout.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial utils/core root export coverage.

### P-0343
- Why:
  - P-0342 tightened the `Annotations` root export readiness guard, leaving `Contents` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Contents`, `ContentsSize`, `VerticalRlMetricsCache`, `VerticalRlPageMetricsCache`, and `ViewportSettings`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Contents root/source/type-smoke parity enforceable before any release tag or host gate, without changing iframe content sizing, viewport parsing, section href state, or vertical-rl metrics caches.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Contents root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/contents-text-width.test.js test/browser/layout.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Contents root export coverage.

### P-0342
- Why:
  - P-0341 tightened the `Themes` root export readiness guard, leaving `Annotations` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Annotations`, `Annotation`, `AnnotationCallback`, `AnnotationData`, `AnnotationMap`, `AnnotationOptions`, `AnnotationsRendition`, `AnnotationStyles`, `AnnotationType`, `AnnotationView`, and `SectionAnnotationMap`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Annotations root/source/type-smoke parity enforceable before any release tag or host gate, without changing annotation creation, highlight/underline/mark helpers, removal behavior, or section annotation maps.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Annotations root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/annotations.test.js test/browser/rendition.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Annotations root export coverage.

### P-0341
- Why:
  - P-0340 tightened the `Locations` root export readiness guard, leaving `Themes` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Themes`, `InjectedThemes`, `Theme`, `ThemeInput`, `ThemeOverride`, `ThemeRules`, `ThemesContent`, and `ThemesRendition`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Themes root/source/type-smoke parity enforceable before any release tag or host gate, without changing stylesheet registration, overrides, content bridge calls, or theme selection behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Themes root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/themes.test.js test/browser/rendition.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Themes root export coverage.

### P-0340
- Why:
  - P-0339 tightened the `Mapping` root export readiness guard, leaving `Locations` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Locations`, `LocationInput`, `LocationRange`, `LocationsRequest`, and `WordLocation`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Locations root/source/type-smoke parity enforceable before any release tag or host gate, without changing location generation, word parsing, CFI lookup, percentage conversion, or section refinement behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Locations root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/locations.test.js test/browser/mapping.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Locations root export coverage.

### P-0339
- Why:
  - P-0338 tightened the `Spine` root export readiness guard, leaving `Mapping` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Mapping`, `EpubCFIPair`, `MappingAxis`, `MappingContents`, `MappingDirection`, `MappingLayout`, `MappingTextNodeWalker`, `MappingView`, and `RangePair`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Mapping root/source/type-smoke parity enforceable before any release tag or host gate, without changing page/section mapping, range walking, CFI pair conversion, or pagination behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Mapping root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/mapping.test.js test/browser/locations.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Mapping root export coverage.

### P-0338
- Why:
  - P-0337 tightened the `Section` root export readiness guard, leaving `Spine` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Spine`, `SpineLookup`, `SpineManifestItem`, `SpinePackage`, `SpinePackageItem`, and `SpineResolver`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Spine root/source/type-smoke parity enforceable before any release tag or host gate, without changing spine unpacking, lookup maps, resolver behavior, fallback handling, or section ordering.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Spine root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/spine.test.js test/browser/section.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Spine root export coverage.

### P-0337
- Why:
  - P-0336 tightened the `Layout` root export readiness guard, leaving `Section` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Section`, `GlobalLayout`, `SectionLayoutSettings`, `SectionHookSet`, `SectionRequest`, `SectionSearchResult`, and `SpineItem`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Section root/source/type-smoke parity enforceable before any release tag or host gate, without changing section loading, layout reconciliation, search/find behavior, hook wiring, or spine item handling.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Section root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/section.test.js test/browser/spine.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Section root export coverage.

### P-0336
- Why:
  - P-0335 tightened the `PageList` root export readiness guard, leaving `Layout` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Layout`, `LayoutContent`, `LayoutCount`, `LayoutProps`, and `LayoutSettings`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Layout root/source/type-smoke parity enforceable before any release tag or host gate, without changing layout settings, spread calculation, content formatting, page counts, or runtime behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Layout root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/layout.test.js test/browser/contents-text-width.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Layout root export coverage.

### P-0335
- Why:
  - P-0334 tightened the `Packaging` root export readiness guard, leaving `PageList` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `PageList`, `PageListDocument`, `PageListItem`, `PageLookup`, `PageReverseLookup`, and `PageValue`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps PageList root/source/type-smoke parity enforceable before any release tag or host gate, without changing page-list parsing, CFI/page/href lookup, percentage helpers, or runtime behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete PageList root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/pagelist.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial PageList root export coverage.

### P-0334
- Why:
  - P-0333 tightened the `Archive` root export readiness guard, leaving `Packaging` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Packaging`, `PackagingJsonManifest`, `PackagingManifest`, `PackagingManifestItem`, `PackagingManifestObject`, `PackagingMetadata`, `PackagingMetadataObject`, `PackagingObject`, `PackagingSpineItem`, and `PackagingTocItem`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Packaging root/source/type-smoke parity enforceable before any release tag or host gate, without changing OPF parsing, JSON manifest loading, manifest/spine/metadata/toc shapes, or runtime behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Packaging root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/packaging.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Packaging root export coverage.

### P-0333
- Why:
  - P-0332 tightened the `Store` root export readiness guard, leaving `Archive` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Archive`, `ArchiveEntry`, `ArchiveInput`, `ArchiveRequestType`, `ArchiveUrlOptions`, and `ArchiveZip`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Archive root/source/type-smoke parity enforceable before any release tag or host gate, without changing zip loading, archive request overloads, response handling, blob/base64 URL creation, or runtime behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Archive root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/archive.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Archive root export coverage.

### P-0332
- Why:
  - P-0331 tightened the `Resources` root export readiness guard, leaving `Store` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Store`, `StoreData`, `StoreHeaders`, `StoreRequest`, `StoreRequestType`, `StoreResolver`, `StoreResource`, `StoreResources`, `StoreStorage`, and `StoreUrlOptions`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Store root/source/type-smoke parity enforceable before any release tag or host gate, without changing offline storage, request/retrieve overloads, blob/base64 URL creation, listener handling, or runtime behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Store root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/store.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Store root export coverage.

### P-0331
- Why:
  - P-0330 tightened the `Navigation` root export readiness guard, leaving `Resources` with the same guard-completeness gap.
  - Source root exports, declaration root exports, and type smoke already cover `Resources`, `ReplacementMode`, `ResourceArchive`, `ResourceArchiveInput`, `ResourceManifest`, `ResourceManifestItem`, `ResourceOptions`, `ResourceRequest`, `ResourceResolver`, and `ResourceSettings`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Resources root/source/type-smoke parity enforceable before any release tag or host gate, without changing resource splitting, URL creation, CSS replacement, substitution, archive access, or runtime behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Resources root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/resources.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Resources root export coverage.

### P-0330
- Why:
  - P-0329 aligned `Packaging.destroy()`, leaving `Navigation` with a Gate 1 readiness guard gap rather than a source or declaration export gap.
  - Source root exports, declaration root exports, and type smoke already cover `Navigation`, `NavItem`, `LandmarkItem`, `NavigationDocument`, `NavigationInput`, and `NavigationInputItem`, but the readiness script only required a subset of that public root surface.
  - Tightening the guard keeps Navigation root/source/type-smoke parity enforceable before any release tag or host gate, without changing navigation parsing, TOC lookup, landmark lookup, legacy JSON loading, or runtime behavior.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: require the complete Navigation root type-smoke aliases and source root exports.
  - `documentation/md/*`: rerun TypeDoc to confirm the guard-only update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/navigation.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should intentionally allow partial Navigation root export coverage.

### P-0329
- Why:
  - P-0328 aligned `PageList.destroy()`, leaving `Packaging.destroy()` as the next public source/declaration return parity gap.
  - Declarations and type smoke already expose `Packaging.destroy()` as `void`, while source still relied on inference for the cleanup method.
  - Adding the source annotation keeps Packaging source, declarations, and Gate 1 readiness pointed at the same public cleanup contract before any release tag or host gate, without changing OPF parsing, JSON manifest loading, manifest/spine/metadata handling, or cleanup behavior.
- Diff Scope:
  - `src/packaging.ts`: add the declaration-facing `void` return annotation for `destroy()`.
  - `scripts/verify-gate1-readiness.mjs`: require Packaging destroy return type smoke coverage.
  - `documentation/md/*`: rerun TypeDoc to confirm the source annotation update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/packaging.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Packaging.destroy()` to remain inference-only instead of matching the declaration contract.

### P-0328
- Why:
  - P-0327 aligned Themes registration returns, leaving `PageList.destroy()` as a public source/declaration return parity gap.
  - Declarations and type smoke already expose `PageList.destroy()` as `void`, while source still relied on inference for the cleanup method.
  - Adding the source annotation keeps PageList source, declarations, and Gate 1 readiness pointed at the same public cleanup contract before any release tag or host gate, without changing page-list parsing, lookup, percentage, or cleanup behavior.
- Diff Scope:
  - `src/pagelist.ts`: add the declaration-facing `void` return annotation for `destroy()`.
  - `scripts/verify-gate1-readiness.mjs`: require PageList destroy return type smoke coverage.
  - `documentation/md/*`: rerun TypeDoc to confirm the source annotation update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/pagelist.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `PageList.destroy()` to remain inference-only instead of matching the declaration contract.

### P-0327
- Why:
  - P-0326 aligned `Mapping` source return annotations, leaving `Themes.register()` and `Themes.default()` as public overload entry points whose source return contracts still relied on inference.
  - Declarations and type smoke already expose both methods as `void`, while source forwarded through helper methods without explicit annotations.
  - Adding source annotations keeps Themes source, declarations, and Gate 1 readiness pointed at the same public registration/default-theme contract before any release tag or host gate, without changing theme registration, default theme selection, stylesheet injection, or override behavior.
- Diff Scope:
  - `src/themes.ts`: add declaration-facing `void` return annotations for `register()` and `default()`.
  - `scripts/verify-gate1-readiness.mjs`: require Themes default return type smoke coverage.
  - `documentation/md/*`: rerun TypeDoc to confirm the source annotation update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/themes.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require Themes registration methods to remain inference-only instead of matching the declaration contract.

### P-0326
- Why:
  - P-0325 aligned the `LayoutContent` bridge returns, leaving `Mapping` with a smaller source/declaration parity gap on public method return annotations.
  - Declarations already expose `Mapping.section()` as returning CFI pairs and `Mapping.walk()` as returning the walker callback result shape, but source still relied on inference for both public methods.
  - Adding source annotations keeps Mapping source, declarations, and Gate 1 readiness pointed at the same public mapping contract before any release tag or host gate, without changing page mapping, text walking, range splitting, or CFI pair generation behavior.
- Diff Scope:
  - `src/mapping.ts`: add declaration-facing return annotations for `section()` and `walk()`.
  - `types/epubjs-tests.ts`: extend Mapping assertions for walker callback return typing.
  - `scripts/verify-gate1-readiness.mjs`: require Mapping walk return type smoke coverage.
  - `documentation/md/*`: rerun TypeDoc to confirm the source annotation update does not change the rendered public markdown surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/mapping.test.js test/browser/epubcfi.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require Mapping public method return contracts to remain inference-only instead of matching the declaration contract.

### P-0325
- Why:
  - P-0324 aligned the `ThemesContent` bridge returns, leaving `LayoutContent` with the same class of public bridge methods still typed as `unknown`.
  - The bridge mirrors the subset of `Contents` methods that `Layout.format()` calls, and the concrete `Contents` contract already exposes `void` returns for `fit()`, `columns()`, and `size()`.
  - Aligning `LayoutContent` with those returns lets layout bridge mocks, TypeDoc, and Gate 1 readiness type-check against the same public content sizing contract before any release tag or host gate, while preserving the broader `Layout.format()` return type and without changing pagination, sizing, spread calculation, or content formatting behavior.
- Diff Scope:
  - `src/layout.ts`, `types/layout.d.ts`: tighten `LayoutContent` bridge method return types to the existing `Contents` public contract.
  - `types/epubjs-tests.ts`: extend Layout assertions and bridge mocks for content sizing method returns.
  - `scripts/verify-gate1-readiness.mjs`: require Layout content bridge return type smoke coverage.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the updated `LayoutContent` surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/layout.test.js test/browser/contents-text-width.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream layout bridge mocks intentionally require `LayoutContent` helper methods to return arbitrary values instead of matching the concrete `Contents` return contract.

### P-0324
- Why:
  - P-0323 aligned `Resources` archive helper inputs, leaving `ThemesContent` as a public bridge interface whose method return values were still typed as `unknown`.
  - The bridge mirrors the subset of `Contents` methods that `Themes` calls, and the concrete `Contents` contract already exposes specific returns for stylesheet injection and CSS mutation helpers.
  - Aligning `ThemesContent` with those returns lets theme bridge consumers, mocks, TypeDoc, and Gate 1 readiness type-check against the same public contract before any release tag or host gate, without changing theme registration, stylesheet injection, override application, or content class behavior.
- Diff Scope:
  - `src/themes.ts`, `types/themes.d.ts`: tighten `ThemesContent` bridge method return types to the existing `Contents` public contract.
  - `types/epubjs-tests.ts`: extend Themes assertions and bridge mocks for stylesheet/CSS method returns.
  - `scripts/verify-gate1-readiness.mjs`: require Themes content bridge return type smoke coverage.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the updated `ThemesContent` surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/themes.test.js test/browser/contents.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream bridge mocks intentionally require `ThemesContent` helper methods to remain `unknown` instead of matching the concrete `Contents` return contract.

### P-0323
- Why:
  - P-0322 aligned Rendition location-part aliases, leaving `Resources` with a smaller archive input parity gap.
  - Declarations already allowed `replaceCss()` and `createCssFile()` to receive either the structural `ResourceArchive` helper or the concrete `Archive` class, while source exposed only `ResourceArchive` in those public helper signatures.
  - Aligning the shared `ResourceArchiveInput` alias keeps Resources options, settings, CSS replacement helpers, root exports, TypeDoc, and Gate 1 readiness on the same public archive contract before any release tag or host gate, without changing URL creation, CSS substitution, archive lookup, or replacement behavior.
- Diff Scope:
  - `src/resources.ts`, `types/resources.d.ts`: expose `ResourceArchiveInput` and reuse it for Resources archive options/settings plus CSS helper parameters.
  - `src/index.ts`, `types/index.d.ts`: export root `ResourceArchiveInput`.
  - `types/epubjs-tests.ts`: extend public root and Resources assertions for archive input typing.
  - `scripts/verify-gate1-readiness.mjs`: require root/source Resources archive input export and type smoke coverage.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public Resources archive input surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/resources.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require the Resources source surface to keep archive helper inputs narrower than the declaration contract.

### P-0322
- Why:
  - P-0321 aligned package manifest aliases, leaving `Rendition` location parts with a source/declaration naming gap.
  - Source exposes `RenditionLocationPart` for `Location.start` / `Location.end`, while declarations exposed the same shape as `DisplayedLocation` and the package root did not export either location-part helper.
  - Aligning both names preserves declaration compatibility while letting consumers type-check rendition location parts from the root public API contract before any release tag or host gate, without changing relocation, manager location mapping, currentLocation(), or display behavior.
- Diff Scope:
  - `src/rendition.ts`, `types/rendition.d.ts`: expose `RenditionLocationPart` and keep `DisplayedLocation` as a compatibility alias for the same shape.
  - `src/index.ts`, `types/index.d.ts`: export root rendition location-part helper types.
  - `types/epubjs-tests.ts`: extend public root, Rendition, Location, and compatibility alias assertions.
  - `scripts/verify-gate1-readiness.mjs`: require root/source rendition location-part export and type smoke coverage.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public rendition location-part surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendition.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require rendition location parts to remain named differently between source and declarations.

### P-0321
- Why:
  - P-0320 aligned `PackagingMetadata`, leaving `PackagingManifest` as the matching source alias still missing from declarations and package-root exports.
  - Source already exposes `PackagingManifest` as the alias used by `Packaging`, `Book`, and `Resources` runtime type state, but declarations and root exports only exposed `PackagingManifestObject`.
  - Aligning the alias lets consumers type-check manifest maps, `Book.loading` / `Book.loaded` manifest state, and `Resources` package-manifest inputs from the same root public API contract before any release tag or host gate, without changing OPF manifest parsing, resource splitting, book loading, or package processing behavior.
- Diff Scope:
  - `types/packaging.d.ts`, `types/book.d.ts`, `types/resources.d.ts`: expose `PackagingManifest` and use it for Book manifest state and Resources package-manifest inputs.
  - `src/index.ts`, `types/index.d.ts`: export root `PackagingManifest`.
  - `types/epubjs-tests.ts`: extend public root, Book, Packaging, and Resources manifest assertions.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `PackagingManifest` and Book manifest type smoke coverage.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public manifest alias surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/packaging.test.js test/browser/resources.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require manifest typing to remain available only through `PackagingManifestObject` instead of the source alias.

### P-0320
- Why:
  - P-0319 aligned `Archive` source overloads, leaving `PackagingMetadata` as a small source/declaration/root parity gap on the package metadata surface.
  - Source already exposes `PackagingMetadata` as the metadata alias used by `Packaging` and `Book` runtime state, but declarations and package-root exports only exposed `PackagingMetadataObject`.
  - Aligning the alias lets consumers type-check package metadata and `Book.loading` / `Book.loaded` metadata from the same root public API contract before any release tag or host gate, without changing OPF parsing, JSON manifest loading, metadata extraction, or book loading behavior.
- Diff Scope:
  - `types/packaging.d.ts`, `types/book.d.ts`: expose `PackagingMetadata` and use it for Book metadata loading/loaded declarations.
  - `src/index.ts`, `types/index.d.ts`: export root `PackagingMetadata`.
  - `types/epubjs-tests.ts`: extend public root and Book/Packaging metadata assertions.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `PackagingMetadata` and Book metadata type smoke coverage.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public metadata alias surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/packaging.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require metadata typing to remain available only through `PackagingMetadataObject` instead of the source alias.

### P-0319
- Why:
  - P-0318 aligned `Store` source overloads with the declaration contract, leaving `Archive` as the matching archive-backed request helper with the same source/declaration parity gap.
  - The declaration surface already exposes typed overloads for `Archive.request()` and `Archive.handleResponse()`, but source still used `Promise<any>` / `any` implementation signatures.
  - Aligning the source overloads keeps archive request consumers, TypeDoc output, and Gate 1 readiness pointed at the same public response contract before any release tag or host gate, without changing zip loading, archive lookup, response parsing, blob/base64 URL creation, or cache cleanup behavior.
- Diff Scope:
  - `src/archive.ts`: add declaration-facing overloads for `request()` and `handleResponse()` using the shared request response value contract.
  - `types/epubjs-tests.ts`: extend public `Archive` assertions for request and response handling fallback typing.
  - `scripts/verify-gate1-readiness.mjs`: require source `Archive` overload coverage and matching type smoke assertions in Gate 1 readiness.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/archive.test.js test/browser/request.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require the `Archive` source surface to remain loosely typed instead of matching the declaration overload contract.

### P-0318
- Why:
  - P-0317 aligned the adjacent `Queue` utility surface, leaving `Store` as the next offline/resource helper with a source/declaration parity gap.
  - The declaration surface already exposes typed overloads for `Store.request()`, `Store.retrieve()`, and `Store.handleResponse()`, but source still used `Promise<any>` / `any` implementation signatures.
  - Aligning the source overloads keeps root `Store` type consumers, TypeDoc output, and Gate 1 readiness pointed at the same public request/storage contract before any release tag or host gate, without changing storage lookup, network fallback, response parsing, URL creation, or event behavior.
- Diff Scope:
  - `src/store.ts`: add declaration-facing overloads for `request()`, `retrieve()`, and `handleResponse()`, and tighten `add()` / `put()` return annotations to the existing public data contract.
  - `types/epubjs-tests.ts`: extend public `Store` assertions for request, retrieve, and response handling fallback typing.
  - `scripts/verify-gate1-readiness.mjs`: require source `Store` overload coverage and matching type smoke assertions in Gate 1 readiness.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/store.test.js test/browser/resources.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require the `Store` source surface to remain loosely typed instead of matching the declaration overload contract.

### P-0317
- Why:
  - P-0316 aligned `Hook` root type exports, leaving `Queue` as the adjacent public utility surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `QueueTask`, `QueuedItem`, `Task`, and the `Queue` class shape, but source kept the helper shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check queued tasks, queued items, and `Queue` instances from the package root before any release tag or host gate, without changing enqueue, dequeue, run, flush, pause, stop, or Task wrapper behavior.
- Diff Scope:
  - `src/utils/queue.ts`: export declaration-facing Queue helper type shapes.
  - `src/index.ts`, `types/index.d.ts`: export root `Queue` public helper types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Queue` type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Queue` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public Queue type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/queue.test.js test/browser/core-facade.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Queue` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0316
- Why:
  - P-0315 aligned `Book` with the shared request type contract, leaving `Hook` as a public utility surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `HookTask`, `HookRegistration`, `HooksObject`, and the `Hook` class shape, but source kept the helper shapes implicit with `Function` and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check hook registrations, hook maps, task callbacks, and `Hook` instances from the package root before any release tag or host gate, without changing hook registration, deregistration, triggering, listing, or clearing behavior.
- Diff Scope:
  - `src/utils/hook.ts`: export declaration-facing Hook helper type shapes and align method/property annotations with them.
  - `src/index.ts`, `types/index.d.ts`: export root `Hook` public helper types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Hook` type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Hook` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public Hook type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-facade.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Hook` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0315
- Why:
  - P-0314 aligned `utils/core` root type exports, leaving `Book` as a public class surface that still duplicated request helper types in source.
  - The declaration surface already treats `utils/request` as the single source for `RequestHeaders`, `RequestMethod`, `RequestType`, `RequestResponse`, and JSON/XML response typing, but `src/book.ts` kept a looser local `RequestMethod` alias and `Book.load()` returned `Promise<any>`.
  - Aligning `Book` with the shared request contract prevents the class surface from drifting away from the root `request()` overloads, while preserving existing parsing semantics for container, packaging, manifest, navigation, and display options loads.
- Diff Scope:
  - `src/book.ts`: reuse `utils/request` public request types, add `Book.load()` overloads, thread the requested type through archive/network loads, and annotate manifest JSON loading without changing runtime parsing.
  - `types/book.d.ts`: mirror the `Book.load()` overloads with shared request helper types.
  - `types/epubjs-tests.ts`: extend type smoke coverage for `Book.load()` XML, JSON, and fallback response typing.
  - `scripts/verify-gate1-readiness.mjs`: require `Book` to reuse shared request types and cover `Book.load()` overloads in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the updated Book request/loading type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/book.test.js test/browser/request.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Book` to keep its own looser request aliases instead of reusing the root `request` typed public API contract.

### P-0314
- Why:
  - P-0313 aligned the root `request` helper type exports, leaving the adjacent `utils/core` facade as the next public utility surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `AnimationFrameRequest`, `BlobContent`, `SizeBounds`, `RectBounds`, and `Deferred`, but the source helper kept those shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check the legacy `ePub.utils` facade, blob helpers, geometry bounds, animation frame callbacks, deferred state, and compatibility range usage from the package root before any release tag or host gate, without changing core helper runtime behavior.
- Diff Scope:
  - `src/utils/core.ts`: export declaration-facing core helper type shapes and annotate the public core facade return values that use them.
  - `src/index.ts`, `types/index.d.ts`: export root `utils/core` public helper types.
  - `types/epubjs-tests.ts`: extend public root assertions for `utils/core` helper type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `utils/core` type export coverage in Gate 1 readiness.
  - `scripts/verify-internal-boundaries.mjs`: keep blocking runtime imports of the legacy `utils/core` facade while allowing the package root type-only facade.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public core utility type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-facade.test.js test/browser/platform-blob.test.js test/browser/platform-browser.test.js test/browser/compat-range.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `utils/core` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0313
- Why:
  - P-0312 aligned `Contents` root type exports, leaving the root `request` helper as the next public utility surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `JsonValue`, `RequestType`, `RequestHeaders`, `RequestResponse`, and `RequestMethod`, but the source helper only exported a loose request type/header shape and the package root did not expose the helper types consistently.
  - Aligning these exports lets consumers type-check root `request()` overloads, JSON response values, request headers, request type hints, and request response unions from the package root before any release tag or host gate, without changing XHR setup, response parsing, archive loading, storage writes, or error handling.
- Diff Scope:
  - `src/utils/request.ts`: export declaration-facing request helper types and add overload signatures for typed response promises while preserving the existing implementation flow.
  - `src/store.ts`, `types/store.d.ts`: align `StoreData` with JSON request responses so source and declaration request contracts remain assignable.
  - `src/index.ts`, `types/index.d.ts`: export root `request` public helper types.
  - `types/epubjs-tests.ts`: extend public root assertions for `request` helper type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `request` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public request type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/request.test.js test/browser/public-api.test.js test/browser/umd-global.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `request` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0312
- Why:
  - P-0311 aligned `Layout` root type exports, leaving `Contents` as the next public view-content surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `ViewportSettings`, `ContentsSize`, `VerticalRlMetricsCache`, and `VerticalRlPageMetricsCache`, but source kept those helper shapes private or inline and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check viewport options, runtime content size state, and vertical-rl metrics caches from the root package API before any release tag or host gate, without changing content measurement, viewport mutation, CFI mapping, vertical-rl page metrics, or event behavior.
- Diff Scope:
  - `src/contents.ts`: export existing `Contents` public helper type shapes, align runtime state declarations with declaration-facing types, and preserve existing `parseInt()` coercion in `fit()` with explicit string conversion.
  - `src/index.ts`, `types/index.d.ts`: export root `Contents` public helper types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Contents` helper type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Contents` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public contents type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/contents-text-width.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Contents` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0311
- Why:
  - P-0310 aligned `EpubCFI` root type exports, leaving `Layout` as the next public pagination/layout surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `LayoutSettings`, `LayoutProps`, `LayoutContent`, and `LayoutCount`, but source kept those helper shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check layout configuration, runtime layout props, formatting content adapters, and page/spread counts from the root package API before any release tag or host gate, without changing flow selection, spread calculation, column sizing, count logic, or layout update events.
- Diff Scope:
  - `src/layout.ts`: export existing `Layout` public helper type shapes and align `format()` / `count()` signatures with declaration-facing types.
  - `src/index.ts`, `types/index.d.ts`: export root `Layout` public helper types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Layout` helper type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Layout` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public layout type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/layout.test.js test/browser/platform-layout.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Layout` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0310
- Why:
  - P-0309 aligned `Annotations` root type exports, leaving `EpubCFI` as the next public parser/constructor surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `EpubCFITerminal`, `EpubCFISegment`, `EpubCFIStep`, `EpubCFIComponent`, `ParsedEpubCFI`, `EpubCFIBase`, `EpubCFIInput`, and `EpubCFIType`, but source used private `Cfi*` aliases and the package root did not expose those helper shapes consistently.
  - Aligning these exports lets consumers type-check CFI parsing, component construction, step/terminal inspection, range/node input, base inputs, and type discrimination from the root package API before any release tag or host gate, without changing CFI parsing, stringification, range conversion, comparison, or fallback boundary handling.
- Diff Scope:
  - `src/epubcfi.ts`: export existing `EpubCFI` public helper type shapes and align internal CFI helper names with declaration-facing types.
  - `src/index.ts`, `types/index.d.ts`: export root `EpubCFI` public helper types.
  - `types/epubjs-tests.ts`: extend public root assertions for `EpubCFI` helper type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `EpubCFI` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public CFI type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/epubcfi.test.js test/browser/compat-range.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `EpubCFI` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0309
- Why:
  - P-0308 aligned `Themes` root type exports, leaving `Annotations` as the next public rendition interaction surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `Annotations`, `Annotation`, `AnnotationType`, `AnnotationCallback`, `AnnotationData`, `AnnotationStyles`, `AnnotationMap`, `SectionAnnotationMap`, `AnnotationView`, `AnnotationsRendition`, and `AnnotationOptions`, but source kept those helper shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check highlights, underlines, marks, annotation callbacks, annotation views, rendition hooks, and annotation storage maps from the root package API before any release tag or host gate, without changing annotation hook registration, attach/detach behavior, event emission, or CFI-based section indexing.
- Diff Scope:
  - `src/annotations.ts`: export existing `Annotations` public helper type shapes and align rendition/view adapter names with declaration-facing types.
  - `src/index.ts`, `types/index.d.ts`: export root `Annotations` public types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Annotations` type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Annotations` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public annotations type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/annotations.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Annotations` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0308
- Why:
  - P-0307 aligned `Locations` root type exports, leaving `Themes` as the next public rendition styling surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `Themes`, `ThemeRules`, `Theme`, `ThemeOverride`, `InjectedThemes`, `ThemeInput`, `ThemesContent`, and `ThemesRendition`, but source kept those helper shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check theme registration, stylesheet injection, overrides, content adapters, and rendition hooks from the root package API before any release tag or host gate, without changing theme selection, CSS injection, override application, or font helpers.
- Diff Scope:
  - `src/themes.ts`: export existing `Themes` public helper type shapes and align content/rendition adapter names with declaration-facing types.
  - `src/index.ts`, `types/index.d.ts`: export root `Themes` public types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Themes` type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Themes` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public themes type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/themes.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Themes` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0307
- Why:
  - P-0306 aligned `Mapping` root type exports, leaving `Locations` as the next public CFI/location surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `Locations`, `LocationRange`, `WordLocation`, `LocationsRequest`, and `LocationInput`, but source kept several helper shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check location generation, word-location parsing, CFI/location conversion, range creation, and request callbacks from the root package API before any release tag or host gate, without changing location generation, CFI comparison, word counting, or current-location behavior.
- Diff Scope:
  - `src/locations.ts`: export existing `Locations` public helper type shapes and align public constructor/method signatures with `Spine` and `Section` source types.
  - `src/index.ts`, `types/index.d.ts`: export root `Locations` public types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Locations` type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Locations` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public locations type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/locations.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Locations` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0306
- Why:
  - P-0305 aligned `Spine` root type exports, leaving the adjacent `Mapping` CFI range mapper surface as the next source/declaration/root parity gap.
  - The declaration surface already exposes `Mapping`, `EpubCFIPair`, `RangePair`, `MappingLayout`, `MappingView`, `MappingContents`, `MappingTextNodeWalker`, `MappingDirection`, and `MappingAxis`, but source kept several helper shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check mapping layouts, page/section CFI pairs, text walker callbacks, and mapping inputs from the root package API before any release tag or host gate, without changing range walking, CFI conversion, pagination mapping, or axis behavior.
- Diff Scope:
  - `src/mapping.ts`: export existing `Mapping` public helper type shapes and align constructor/page/walk parameters with declaration-facing names.
  - `src/index.ts`, `types/index.d.ts`: export root `Mapping` public types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Mapping` type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Mapping` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public mapping type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/mapping.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Mapping` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0305
- Why:
  - P-0304 aligned `Section` root type exports, leaving the adjacent `Spine` collection surface as the next source/declaration/root parity gap.
  - The declaration surface already exposes `Spine`, `SpineLookup`, `SpineManifestItem`, `SpinePackageItem`, `SpinePackage`, and `SpineResolver`, but source kept those helper shapes private or under internal names and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check spine package unpacking, manifest fallback data, href/id lookup maps, and resolver callbacks from the root package API before any release tag or host gate, without changing spine unpacking, fallback resolution, or section navigation behavior.
- Diff Scope:
  - `src/spine.ts`: export existing `Spine` public helper type shapes and align internal manifest item naming with declaration-facing `SpineManifestItem`.
  - `src/index.ts`, `types/index.d.ts`: export root `Spine` public types.
  - `types/epubjs-tests.ts`: extend public root assertions for `Spine` type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Spine` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public spine type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/spine.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Spine` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0304
- Why:
  - P-0303 aligned replacement helper root exports, leaving `Section` as the next public class surface with source/declaration/root parity gaps.
  - The declaration surface already exposes `Section`, `GlobalLayout`, `LayoutSettings`, `SectionHookSet`, `SectionRequest`, `SectionSearchResult`, and `SpineItem`, but source kept several helper shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check section construction, hooks, request callbacks, layout reconciliation, search results, and spine item linkage from the root package API before any release tag or host gate, without changing section loading, rendering, searching, CFI, or layout behavior.
- Diff Scope:
  - `src/section.ts`: export existing `Section` helper type shapes and align `reconcileLayoutSettings()` with declaration-facing layout names.
  - `src/index.ts`, `types/index.d.ts`: export root `Section` public types, using `SectionLayoutSettings` at the package root to avoid colliding with the existing `Layout` class surface.
  - `types/epubjs-tests.ts`: extend public root assertions for `Section` type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Section` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public section type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/section.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Section` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0303
- Why:
  - P-0302 aligned the `Url` root type exports, leaving replacement helper functions and their callback/section shapes as the next source/declaration/root parity gap.
  - The declaration surface already exposes `LinkCallback`, `SectionLike`, and the replacement helper functions, but `src/utils/replacements.ts` kept the helper types private and the package root did not expose the helper runtime surface consistently.
  - Aligning these exports lets consumers type-check and call replacement helpers from the root package API before any release tag or host gate, without changing link, base, canonical, meta, or URL substitution behavior.
- Diff Scope:
  - `src/utils/replacements.ts`: export the existing `LinkCallback` and `SectionLike` helper types.
  - `src/index.ts`, `types/index.d.ts`: export root replacement helper functions plus `LinkCallback` and `SectionLike` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the replacement helper function and type exports.
  - `test/browser/public-api.test.js`: assert replacement helper functions are real browser package-root exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source replacements coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public replacement helper surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/replacements.test.js test/browser/public-api.test.js test/browser/umd-global.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require replacement helpers to remain module-only instead of part of the root public API contract.

### P-0302
- Why:
  - P-0301 aligned the `Path` root type exports, leaving the adjacent `Url` utility parser helper as the next source/declaration/root parity gap.
  - The declaration surface already exposes `UrlBase` and the `Url` class contract, but `src/utils/url.ts` kept `UrlBase` private and the package root did not expose either type consistently.
  - Aligning these exports lets consumers type-check URL parser instances and base inputs from the root package API before any release tag or host gate, without changing URL parsing behavior.
- Diff Scope:
  - `src/utils/url.ts`: export the existing `UrlBase` input type.
  - `src/index.ts`, `types/index.d.ts`: export root `Url` and `UrlBase` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the `Url` public type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Url` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public URL type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Url` helper types to remain module-only instead of part of the root typed public API contract.

### P-0301
- Why:
  - P-0300 aligned the `DisplayOptions` root type export, leaving utility parser helpers such as `Path` as the next source/declaration/root parity gap.
  - The declaration surface already exposes `ParsedPath` and the `Path` class contract, but `src/utils/path.ts` kept `ParsedPath` private and the package root did not expose either type consistently.
  - Aligning these exports lets consumers type-check path parser instances and parse results from the root package API before any release tag or host gate, without changing path parsing behavior.
- Diff Scope:
  - `src/utils/path.ts`: export the existing `ParsedPath` result shape.
  - `src/index.ts`, `types/index.d.ts`: export root `Path` and `ParsedPath` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the `Path` public type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Path` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public path type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Path` helper types to remain module-only instead of part of the root typed public API contract.

### P-0300
- Why:
  - P-0299 aligned the `Container` root type exports, leaving adjacent parser helper surfaces such as `DisplayOptions` as the next package-root parity gap.
  - The declaration and source surfaces already expose the `DisplayOptions` parser class, and type smoke covers its constructor, state, parse, and destroy contract, but the package root did not expose the class type consistently.
  - Aligning the root export lets consumers type-check display options parser instances from the root package API before any release tag or host gate, without changing display-options parsing behavior.
- Diff Scope:
  - `src/index.ts`, `types/index.d.ts`: export root `DisplayOptions` type.
  - `types/epubjs-tests.ts`: extend public root assertions for the `DisplayOptions` public type export.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `DisplayOptions` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public display-options type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `DisplayOptions` to remain module-only instead of part of the root typed public API contract.

### P-0299
- Why:
  - P-0298 aligned the `Packaging` root type exports, leaving adjacent parser helper surfaces such as `Container` as the next source/declaration parity gap.
  - The declaration surface already exposes `ContainerDocument`, but `src/container.ts` kept it private and the package root did not expose `Container` or its document input shape consistently.
  - Aligning these exports lets consumers type-check container XML inputs and parser instances from the root package API before any release tag or host gate, without changing container parsing behavior.
- Diff Scope:
  - `src/container.ts`: export the existing `ContainerDocument` input type.
  - `src/index.ts`, `types/index.d.ts`: export root `Container` and `ContainerDocument` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the `Container` public type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Container` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public container type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `ContainerDocument` to remain module-private instead of part of the root typed public API contract.

### P-0298
- Why:
  - P-0297 aligned the `Archive` root type exports, leaving `Packaging` manifest/metadata/spine/toc shapes as the next source/declaration parity gap.
  - The declaration surface already exposes `PackagingJsonManifest`, manifest/metadata/object shapes, spine items, and toc items, but `src/packaging.ts` used different internal names for several shapes and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check OPF parse results, JSON manifest loading, package metadata, spine entries, manifest maps, and toc items from the root package API before any release tag or host gate, without changing packaging parser behavior.
- Diff Scope:
  - `src/packaging.ts`: export declaration-aligned `Packaging` public shape names, keep existing source aliases for compatibility, and align `load()` with `PackagingJsonManifest`.
  - `src/index.ts`, `types/index.d.ts`: export root `Packaging`, `PackagingJsonManifest`, `PackagingManifestItem`, `PackagingManifestObject`, `PackagingMetadataObject`, `PackagingObject`, `PackagingSpineItem`, and `PackagingTocItem` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the `Packaging` public type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Packaging` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public packaging type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Packaging` helper shapes to remain module-private or source-only aliases instead of part of the root typed public API contract.

### P-0297
- Why:
  - P-0296 aligned the `Store` root type exports, leaving `Archive` input/request/url/zip types as the next source/declaration parity gap.
  - The declaration surface already exposes `ArchiveInput`, request type, URL options, entry, and zip shapes, but `src/archive.ts` kept those shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check archive open/load inputs, zip entries, object URL options, and root package archive helpers before any release tag or host gate, without changing archive loading behavior.
- Diff Scope:
  - `src/archive.ts`: export existing `Archive` public input, request, URL option, entry, and zip type shapes, and align `open()` / `openUrl()` with the declared `ArchiveZip` return type.
  - `src/index.ts`, `types/index.d.ts`: export root `Archive`, `ArchiveEntry`, `ArchiveInput`, `ArchiveRequestType`, `ArchiveUrlOptions`, and `ArchiveZip` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the `Archive` public type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Archive` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public archive type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Archive` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0296
- Why:
  - P-0295 aligned the `Resources` root type exports, leaving `Store` request/storage/url option types as the next source/declaration parity gap.
  - The declaration surface already exposes `StoreData`, request/header/resolver aliases, storage/resource shapes, and URL options, but `src/store.ts` kept those shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check offline store requesters, storage adapters, resource batches, headers, and URL creation options from the root package API before any release tag or host gate, without changing storage or reader behavior.
- Diff Scope:
  - `src/store.ts`: export existing `Store` public request, storage, resource, and URL option type shapes, and add narrow casts where the source now knows stored values can become `BlobPart`/`Blob` at runtime.
  - `src/index.ts`, `types/index.d.ts`: export root `Store`, `StoreData`, `StoreHeaders`, `StoreRequest`, `StoreRequestType`, `StoreResolver`, `StoreResource`, `StoreResources`, `StoreStorage`, and `StoreUrlOptions` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the `Store` public type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Store` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public store type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Store` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0295
- Why:
  - P-0294 aligned the `PageList` root type exports, leaving `Resources` public options/settings/resource manifest types as the next source/declaration parity gap.
  - The declaration surface already exposes `ResourceArchive`, resolver/request aliases, replacement mode, options, and settings shapes, but `src/resources.ts` kept most of those shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check resource manifests, replacement modes, archive/request/resolver integrations, and `Resources` options from the root package API before any release tag or host gate, without changing resource replacement or reader behavior.
- Diff Scope:
  - `src/resources.ts`: export existing `Resources` public option, settings, archive, request, resolver, and replacement mode type shapes, and align constructor/process input with package manifest objects.
  - `src/index.ts`, `types/index.d.ts`: export root `Resources`, `ResourceManifest`, `ResourceManifestItem`, `ResourceArchive`, `ResourceOptions`, `ResourceSettings`, `ResourceRequest`, `ResourceResolver`, and `ReplacementMode` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the `Resources` public type exports.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Resources` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public resources type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Resources` helper aliases to remain module-private instead of part of the root typed public API contract.

### P-0294
- Why:
  - P-0293 aligned the `Navigation` root type exports, leaving the adjacent `PageList` value/item type shapes as the next source/declaration parity gap.
  - The declaration surface already exposed `PageValue`, lookup aliases, `PageListDocument`, and `PageListItem`, but `src/pagelist.ts` kept most of those shapes private and the package root did not expose them consistently.
  - Aligning these exports lets consumers type-check page-list documents, parsed page-list items, page values, and page lookup maps from the root package API before any release tag or host gate, without changing page-list parsing or reader behavior.
- Diff Scope:
  - `src/pagelist.ts`: export existing `PageList` public value, lookup, and document type aliases.
  - `src/index.ts`, `types/index.d.ts`: export root `PageList`, `PageListDocument`, `PageListItem`, `PageLookup`, `PageReverseLookup`, and `PageValue` types.
  - `types/epubjs-tests.ts`: extend public root assertions and align `PageList` constructor/lookup assertions with the public aliases.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `PageList` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public page-list type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `PageList` helper aliases to remain module-private instead of part of the root typed public API contract.

## 2026-06-03

### P-0293
- Why:
  - P-0292 aligned the adjacent `Rendition` root type exports, leaving `Navigation` as the next package-root source/declaration parity gap.
  - The declaration surface exposed `NavItem` from the root but omitted the default `Navigation` type plus landmark, document, input, and legacy JSON item shapes, while `src/navigation.ts` kept the document/input aliases private and used the stricter runtime nav item shape for legacy input.
  - Aligning these type exports lets consumers type-check navigation documents, legacy JSON navigation trees, landmarks, and root package navigation types before any release tag or host gate, without changing EPUB parsing or reader behavior.
- Diff Scope:
  - `src/navigation.ts`: export the existing `Navigation` document/input aliases and add a source `NavigationInputItem` shape for legacy JSON navigation trees.
  - `src/index.ts`, `types/index.d.ts`, `types/navigation.d.ts`: align package-root `Navigation`, `NavItem`, `LandmarkItem`, `NavigationDocument`, `NavigationInput`, and `NavigationInputItem` type exports.
  - `types/epubjs-tests.ts`: extend public root assertions and `Navigation` constructor/parse type coverage.
  - `scripts/verify-gate1-readiness.mjs`: require root/source `Navigation` type export coverage in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for the new root/public navigation type surface.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require `Navigation` helper types to remain module-private instead of part of the root typed public API contract.

### P-0292
- Why:
  - P-0291 aligned the source root for `Book` loading type exports, leaving the adjacent `Rendition` public type shapes as the next source/declaration parity gap.
  - The declaration surface already exposes `RenditionOptions`, `Location`, `LayoutProperties`, and `ManagerLocationItem`, but `src/rendition.ts` kept those shapes internal and the source/package root did not expose them consistently.
  - Aligning the source-side and root exports lets consumers type-check rendition options, layout properties, current location, and manager location items from the root package API before any release tag or host gate, without changing rendering or navigation behavior.
- Diff Scope:
  - `src/rendition.ts`: export the existing `Rendition` public type shapes and align the internal current-location type name with the declaration surface.
  - `src/index.ts`, `types/index.d.ts`: export root `RenditionOptions`, `RenditionLayoutProperties`, `Location`, and `ManagerLocationItem` types.
  - `types/epubjs-tests.ts`: extend public root assertions for the `Rendition` public type exports.
  - `scripts/verify-gate1-readiness.mjs`: require the root/source `Rendition` type exports in Gate 1 readiness.
  - `documentation/md/*`, `dist/*.map`: refresh generated TypeDoc markdown and tracked source maps for the type-only source update.
- Test:
  - `npm run typecheck`
  - `npm run docs:md`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendition.test.js test/browser/public-api.test.js test/browser/umd-global.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require the older internal-only `Rendition` public type shapes instead of the current root typed public API contract.

### P-0291
- Why:
  - P-0290 aligned the root factory and root declaration exports, leaving a small source/declaration parity gap for the newly public `BookLoaded` and `BookLoading` types.
  - The declaration surface exposes precise `BookLoading` / `BookLoaded` shapes, but `src/book.ts` still kept them internal as broad `Record<..., any>` aliases and `src/index.ts` did not re-export them from the source root.
  - Aligning the source-side types keeps the TypeScript source pipeline, root source exports, and published declaration contract consistent before any release tag or host gate, without changing runtime loading behavior.
- Diff Scope:
  - `src/book.ts`: export precise `BookLoading` and `BookLoaded` interfaces using the existing runtime loading members.
  - `src/index.ts`: re-export `BookLoaded` and `BookLoading` from the source package root alongside the existing `Book` type aliases.
  - `scripts/verify-gate1-readiness.mjs`: require the source root to export the `Book` loaded/loading types.
  - `dist/*.map`: refresh tracked source maps after the source type-only update.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/umd-global.test.js test/browser/epub.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream source consumers intentionally require the older internal broad `BookLoading` / `BookLoaded` source aliases instead of the current root typed public API contract.

### P-0290
- Why:
  - P-0289 aligned `Book` runtime state declarations, leaving the root `ePub()` factory and named type exports as the next small package-root typed public API gap.
  - Runtime already supports URL/data construction, `Blob` input through `Book`, and options-only construction, but `src/epub.ts` still typed the factory as `string | ArrayBuffer` plus a broad `object`, while root declarations did not re-export the `Book` type aliases added for the public contract.
  - Aligning this surface keeps the source factory, root declaration, global namespace tests, and generated docs consistent before any release tag or host gate, without changing book loading or rendering behavior.
- Diff Scope:
  - `src/book.ts`, `src/epub.ts`, `src/index.ts`: export source `Book` input/options types and align the root factory overloads with `Blob` and options-only construction.
  - `types/epub.d.ts`, `types/index.d.ts`: reuse `BookInput` for the callable root and export `BookInput`, `BookOptions`, `BookLoading`, and `BookLoaded` from the package root.
  - `types/epubjs-tests.ts`: extend public root assertions plus concrete type smoke coverage for root `Blob` input and options-only factory calls.
  - `scripts/verify-gate1-readiness.mjs`: require the root `Book` type export and root factory overload checks in Gate 1 readiness.
  - `documentation/md/*`: refresh generated TypeDoc markdown for root `Book` type exports and factory parameter links.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/umd-global.test.js test/browser/epub.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower root factory and package-root type export surface instead of the current runtime-compatible typed public API contract.

### P-0289
- Why:
  - P-0288 aligned `Rendition` runtime state declarations, leaving adjacent package-root `Book` runtime state as the next high-value typed public API gap.
  - `Book` is already TypeScript source and Browser Mode-covered, but its declaration still hid `loading`, `isRendered`, deprecated `package`, `displayOptions`, and `cover` state, treated destroy-cleared fields as always present, declared loaded spine/resources/page-list promises against older shapes, and used an invalid `BinaryType` input for `unarchive()`.
  - Aligning this surface lets consumers type-check book loading/opened state, loaded resource promises, optional path resolution, section lookup, and archive opening before any release tag or host gate, without changing loading, rendering, storage, or archive behavior.
- Diff Scope:
  - `types/book.d.ts`: add `BookInput`, `BookLoading`, and `BookLoaded`, align destroy-cleared runtime state optionality, expose `isRendered`, `package`, `displayOptions`, and `cover`, align loaded promise shapes, optional `resolve()` return, optional `section()` return, and `unarchive()` zip return typing.
  - `types/epubjs-tests.ts`: extend `Book` assertions plus concrete type smoke coverage for runtime state, loaded spine/resources/cover promises, optional resolve, section lookup, and archive zip opening.
  - `scripts/verify-gate1-readiness.mjs`: require the `Book` runtime state typed public API checks in Gate 1 readiness.
  - `documentation/md/classes/Book.md`: refresh generated TypeDoc markdown for the updated `Book` declaration surface.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/book.test.js test/browser/epub.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Book` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0288
- Why:
  - P-0287 aligned `Contents` runtime state declarations, leaving adjacent `Rendition` runtime state and helper methods as the next high-value typed public API gap.
  - `Rendition` is already TypeScript source and Browser Mode-covered, but its declaration still hid manager/view/layout/deferred state, treated constructed helper objects as always present, omitted public diagnostics/link-resolution helpers, and returned a broad object from layout property calculation.
  - Aligning this surface lets consumers type-check rendition manager state, layout properties, manager locations, remeasure/debug helpers, and link resolution before any release tag or host gate, without changing rendering or navigation behavior.
- Diff Scope:
  - `types/rendition.d.ts`: add `LayoutProperties` and `ManagerLocationItem`, optional runtime state for manager/view/layout/deferred helpers, optional location parts, and declarations for `debugVerticalRlPage()`, `remeasure()`, and `resolveLinkHref()`.
  - `types/epubjs-tests.ts`: extend `Rendition` assertions plus concrete type smoke coverage for layout property calculation, manager location mapping, debug state, remeasure, and link resolution.
  - `scripts/verify-gate1-readiness.mjs`: require the `Rendition` state/helper typed public API checks in Gate 1 readiness.
  - `documentation/md/classes/Rendition.md`, `documentation/md/interfaces/Location.md`: refresh generated TypeDoc markdown for the updated `Rendition` declaration surface.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendition.test.js test/browser/manager-listeners.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Rendition` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0287
- Why:
  - P-0286 aligned the legacy `ePub.utils` facade declarations, leaving `Contents` runtime state as the next package-root typed public API gap.
  - `Contents` is central to the reader surface and already TypeScript source, but its declaration still accepted a generic `Element` for constructor content, hid `sectionHref`, active/called state, size state, forced writing mode, and vertical-rl cache state that Browser Mode tests exercise.
  - Aligning these state declarations lets consumers type-check `Contents` construction and state inspection without changing rendering, pagination, CFI, or host integration behavior.
- Diff Scope:
  - `types/contents.d.ts`: add `ContentsSize`, vertical-rl cache shapes, `HTMLElement` content constructor/state, window type, `sectionHref`, active/called state, forced writing mode, layout style, and cache fields.
  - `types/epubjs-tests.ts`: extend `Contents` assertions and concrete type smoke coverage for constructor state, size, section href, vertical-rl caches, writing mode, called, and active fields.
  - `scripts/verify-gate1-readiness.mjs`: require the `Contents` state typed public API checks in Gate 1 readiness.
  - `documentation/md/classes/Contents.md`: refresh generated TypeDoc markdown for the updated `Contents` state declaration surface.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/contents-text-width.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Contents` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0286
- Why:
  - P-0285 aligned the high-value `EpubCFI` declarations, leaving the root `ePub.utils` / `utils/core` facade as a small but visible typed public API gap.
  - `utils/core` is already TypeScript source and Browser Mode-covered, but its declarations omitted `requestAnimationFrame`, kept blob helper content as `any`, used boxed `Number` bounds, exposed `qsa()` as a generic `ArrayLike`, and declared the lightweight `RangeObject` as a DOM `Range` subclass instead of the compat range object.
  - Aligning these helper declarations lets consumers type-check the legacy utils facade, browser animation-frame availability, blob URL helpers, layout bounds, query helpers, and compat range construction before any release tag or host gate.
- Diff Scope:
  - `types/utils/core.d.ts`, `types/core.d.ts`: add core helper types, expose `requestAnimationFrame`, tighten blob and bounds helpers, align `qsa()`, and declare `RangeObject` against `types/compat/range.d.ts`.
  - `types/epubjs-tests.ts`: add `CoreUtilsAssertions` plus concrete root `ePub.utils` checks for animation frame, bounds, blob helpers, `RangeObject`, and `qsa()`.
  - `scripts/verify-gate1-readiness.mjs`: require the utils/core typed public API assertions and helper coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core.test.js test/browser/core-facade.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older looser `utils/core` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0285
- Why:
  - P-0284 aligned `Hook` declarations with runtime behavior, leaving `EpubCFI` as the next high-value typed public API gap.
  - `EpubCFI` is central to pagination, mapping, locations, section search, and rendition targeting; its declaration hid exported CFI structure shapes, omitted `str`, returned `EpubCFI` from `parse()` / `fromNode()` / `fromRange()` even though runtime returns parsed CFI objects, and kept parsing helpers private despite browser coverage exercising them.
  - Aligning the core parsing/constructor declarations lets consumers type-check CFI strings, parsed components, constructor inputs, range/node conversion objects, and CFI type detection before any release tag or host gate.
- Diff Scope:
  - `types/epubcfi.d.ts`: export CFI step/terminal/component/parsed/input/type shapes, add `str`, align constructor/base/path state, parse/fromNode/fromRange returns, checkType, isCfiString, parse helpers, getPath/getRange, and chapter component typing with runtime.
  - `types/compat/range.d.ts`: add the declaration entry used by existing `Contents` and new `EpubCFI` CFI range typings.
  - `types/epubjs-tests.ts`: add `EpubCFIAssertions` plus concrete parse, parseComponent, parseStep, parseTerminal, checkType, getPath/getRange, fromNode, and fromRange typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require EpubCFI typed public API assertions and parse/checkType/fromRange coverage in Gate 1 readiness checks.
  - `documentation/md/classes/Contents.md`, `documentation/md/classes/EpubCFI.md`: refresh generated TypeDoc markdown for the updated CFI and range declaration surface.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/epubcfi.test.js test/browser/mapping.test.js test/browser/locations.test.js test/browser/section.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `EpubCFI` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0284
- Why:
  - P-0283 aligned `Queue` declarations with runtime behavior, leaving `Hook` as the next low-risk utility typed public API gap.
  - `Hook` is already TypeScript source and browser-covered, but its declaration still required a context, did not model variadic mixed function/array registration, returned a broad trigger promise, and declared `clear()` as `void` even though runtime returns the cleared hook list.
  - Aligning `Hook` declarations lets consumers type-check content/render/layout hook registries, optional construction, mixed registration, deregistration, async trigger result aggregation, list access, and clearing behavior before any release tag or host gate.
- Diff Scope:
  - `types/utils/hook.d.ts`: add `HookTask`, `HookRegistration`, exported `HooksObject`, optional construction, public state fields, variadic register, trigger/list/clear return types aligned with runtime.
  - `types/epubjs-tests.ts`: add `HookAssertions` plus concrete Hook construction, hook registry object, mixed registration, trigger, list, and clear typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Hook typed public API assertions and construction/register/trigger coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/hook.test.js test/browser/section.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Hook` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0283
- Why:
  - P-0282 aligned `utils/replacements` declarations with runtime behavior, leaving `Queue` as the next utility typed public API gap.
  - `Queue` is already TypeScript source and browser-covered, but its declaration still required a context, returned a queued item from `dequeue()`, narrowed `run()` / `flush()`, hid public queue state, and did not expose the exported `Task` constructor shape.
  - Aligning `Queue` declarations lets consumers type-check sequential task scheduling, promise passthrough tasks, paused/flush control, queue state, and the callback-to-promise `Task` wrapper before any release tag or host gate.
- Diff Scope:
  - `types/utils/queue.d.ts`: align queue item/task/deferred shapes, optional construction, public state fields, variadic enqueue, dequeue/run/flush return types, and exported `Task` constructor with runtime behavior.
  - `types/epubjs-tests.ts`: add `QueueAssertions` plus concrete queue construction, task enqueue, dequeue/run/flush, queue item, length, and Task wrapper typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Queue typed public API assertions and construction/enqueue/Task coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/queue.test.js test/browser/rendition.test.js test/browser/locations.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Queue` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0282
- Why:
  - P-0281 aligned `Url` declarations with runtime behavior, leaving `utils/replacements` as the next low-risk utility typed public API gap.
  - The replacements helpers are already TypeScript source and browser-covered, but the declaration still required full `Section` / `Contents` instances, hid link callback and section-like shapes, omitted the optional `sectionHref`, and declared `substitute()` as returning `void` even though runtime returns the substituted string.
  - Aligning these declarations lets consumers type-check content hook replacement helpers, element-based link rewriting, section-scoped hash links, and resource URL substitution before any release tag or host gate.
- Diff Scope:
  - `types/utils/replacements.d.ts`: add `LinkCallback` and `SectionLike`, align optional document/section inputs, element link rewriting, optional `sectionHref`, and `substitute()` string return.
  - `types/epubjs-tests.ts`: add `ReplacementsAssertions` plus concrete replacement helper, link callback, section-like input, and substitution typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the replacements helper typed public API assertions and link/substitution coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/replacements.test.js test/browser/resources.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower replacements helper declarations instead of the current runtime-compatible typed public API contract.

### P-0281
- Why:
  - P-0280 aligned `Path` declarations with runtime behavior, leaving `Url` as the adjacent low-risk utility typed public API gap.
  - `Url` is already TypeScript source and browser-covered, but its declaration still required a string base, hid runtime URL/path state, and did not expose the `false` base mode used to keep relative EPUB paths from defaulting to `window.location`.
  - Aligning `Url` declarations lets consumers type-check URL parsing, optional and `false` base construction, native URL state, derived path state, path helper access, resolving, relative path calculation, and string conversion before any release tag or host gate.
- Diff Scope:
  - `types/utils/url.d.ts`: add `UrlBase`, optional constructor base, public state fields, native `URL` field, and path/resolve/relative/toString return types aligned with runtime.
  - `types/epubjs-tests.ts`: add `UrlAssertions` plus concrete absolute URL, false-base relative URL, path helper, resolve/relative, native URL, and origin typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Url typed public API assertions and construction/helper coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core.test.js test/browser/core-facade.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Url` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0280
- Why:
  - P-0279 aligned `Container` declarations with runtime behavior, leaving low-risk utility declarations as the next typed public API gap.
  - `Path` is already TypeScript source and browser-covered, but its declaration hid public parser state, returned a generic `object` from `parse()`, required an argument for `isAbsolute()`, and typed `splitPath()` as a string even though runtime returns capture groups.
  - Aligning `Path` declarations lets consumers type-check EPUB path parsing, directory/filename/extension state, optional absolute checks, path resolution, relative-path calculation, and split-path results before any release tag or host gate.
- Diff Scope:
  - `types/utils/path.d.ts`: add `ParsedPath`, public state fields, optional `isAbsolute()` argument, and accurate `splitPath()` array return typing.
  - `types/epubjs-tests.ts`: add `PathAssertions` plus concrete construction, parse, optional `isAbsolute()`, public field, and `splitPath()` typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Path typed public API assertions and construction/helper coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core.test.js test/browser/core-facade.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Path` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0279
- Why:
  - P-0278 added the missing `DisplayOptions` declaration, leaving `Container` as the adjacent package metadata parser typed public API gap.
  - `Container` is already TypeScript source and browser-covered, but its declaration still required a document for construction/parsing and hid runtime parser state fields.
  - Aligning `Container` declarations lets consumers type-check optional parser construction, container XML parsing inputs, package path/directory/encoding state, and cleanup behavior before any release tag or host gate.
- Diff Scope:
  - `types/container.d.ts`: align the constructor, parse input, public parser state fields, and `ContainerDocument` shape with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `ContainerAssertions` plus concrete construction, parse input, and parsed-field typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Container typed public API assertions and construction/parse coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/container.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Container` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0278
- Why:
  - P-0277 aligned `Annotations` declarations with runtime behavior, leaving small package metadata parser declarations as the next low-risk typed public API gap.
  - `Book.loaded.displayOptions` and `Book["displayOptions"]` already reference `./displayoptions`, but the declaration file was missing even though the TypeScript runtime parser is covered by browser tests.
  - Adding the `DisplayOptions` declaration lets consumers type-check iBooks display options parsing, optional construction/parse calls, parsed state fields, and cleanup behavior before any release tag or host gate.
- Diff Scope:
  - `types/displayoptions.d.ts`: add the `DisplayOptions` declaration aligned with the TypeScript source constructor, public fields, `parse()` return, and `destroy()` behavior.
  - `types/epubjs-tests.ts`: add `DisplayOptionsAssertions` plus concrete construction, parse return, and parsed-field typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the DisplayOptions typed public API assertions and construction/parse coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/displayoptions.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require `DisplayOptions` to remain untyped instead of using the current runtime-compatible typed public API contract.

### P-0277
- Why:
  - P-0276 aligned `Themes` declarations with runtime behavior, leaving `Annotations` as the next Rendition-owned typed public API gap.
  - `Annotations` is already TypeScript source, but its declaration still required a full `Rendition`, hid runtime annotation/view/rendition shapes, returned `void` from `highlight()` / `underline()` / `mark()`, omitted exported `Annotation`, and kept hook helpers private despite browser coverage exercising them.
  - Aligning `Annotations` declarations lets consumers type-check annotation storage, section-index lookup, visible-view attach/detach, render/unloaded hook injection, evented annotation objects, data updates, and removal behavior before any release tag or host gate.
- Diff Scope:
  - `types/annotations.d.ts`: align annotation/rendition/view/data/style shapes, public state fields, helper methods, annotation return values, exported `Annotation`, event methods, attach/detach, and hook helpers with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `AnnotationsAssertions` plus concrete hook-compatible rendition, highlight/underline/mark, section lookup, inject/clear, remove, update, and event/attach/detach typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Annotations typed public API assertions and construction/highlight/removal coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/annotations.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Annotations` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0276
- Why:
  - P-0275 aligned `Layout` declarations with runtime behavior, leaving `Themes` as the next low-risk Rendition-owned typed public API gap.
  - `Themes` is already TypeScript source, but its declaration still hid runtime theme/override state, required a full `Rendition` instead of the hook/content shape it actually uses, missed `removeOverride()`, and did not model default string dispatch or empty register calls.
  - Aligning `Themes` declarations lets consumers type-check stylesheet URL/rule/CSS registration, theme selection, injection, overrides, font helpers, hook-compatible rendition stubs, and cleanup behavior before any release tag or host gate.
- Diff Scope:
  - `types/themes.d.ts`: align theme/rule/override/content/rendition shapes, public state fields, register/default overloads, removeOverride, injection/add/override helpers, and destroy behavior with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `ThemesAssertions` plus concrete construction, registration, default theme, injection, override/removeOverride, font helper, and hook-compatible rendition typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Themes typed public API assertions and construction/rule-registration/removeOverride coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/themes.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Themes` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0275
- Why:
  - P-0274 aligned `Mapping` declarations with runtime behavior, leaving `Layout` as the next low-risk root-exported typed public API gap.
  - `Layout` is already TypeScript source, but its declaration still required constructor settings, typed `props.spread` as a string, omitted page/advance/boundary metrics, narrowed `flow()` / `spread()` arguments, hid `update()`, and used boxed `Number` return types for page counts.
  - Aligning `Layout` declarations lets consumers type-check layout settings, metric state, content formatting, flow/spread normalization, page counting, update events, and root `Layout` construction before any release tag or host gate.
- Diff Scope:
  - `types/layout.d.ts`: align settings/props/content/count types, optional construction, public metric fields, flow/spread optional arguments, format arguments, count return, update method, and event-emitter methods with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `LayoutAssertions` plus concrete default construction, settings, flow/spread, calculate, format, count, props, and update typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Layout typed public API assertions and construction/format/count coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/layout.test.js test/browser/public-api.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Layout` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0274
- Why:
  - P-0273 aligned `Locations` declarations with runtime behavior, leaving `Mapping` as the adjacent page/CFI typed public API gap.
  - `Mapping` is already TypeScript source, but its declaration still hid constructor state, section/page range mapping helpers, range-list conversion, and text-node walking helpers despite browser coverage exercising those runtime methods.
  - Aligning `Mapping` declarations lets consumers type-check page-to-CFI mapping, section-wide CFI pair generation, range splitting, range-to-CFI conversion, axis switching, and layout metrics before any release tag or host gate.
- Diff Scope:
  - `types/mapping.d.ts`: align mapping layout/view/content types, public state fields, section/page helpers, text walking, range discovery, text range splitting, range-pair conversion, range-list conversion, and axis behavior with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `MappingAssertions` plus concrete construction, page, section, range splitting, range-to-CFI, range-list, and axis typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Mapping typed public API assertions and construction/page/range-to-CFI coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/mapping.test.js test/browser/locations.test.js test/browser/epubcfi.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Mapping` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0273
- Why:
  - P-0272 aligned `PageList` declarations with runtime behavior, leaving `Locations` as the next CFI/page-map typed public API gap.
  - `Locations` is already TypeScript source, but its declaration still hid public generation state, queue/CFI fields, progressive section refinement, word-location helpers, fallback CFI generation, current-location setter behavior, event-emitter methods, and destroy-cleared state.
  - Aligning `Locations` declarations lets consumers type-check generated CFI arrays, location/percentage lookups, section-level refinement, word-based locations, current-location change events, and cleanup behavior before any release tag or host gate.
- Diff Scope:
  - `types/locations.d.ts`: align locations range/request/word-location types, public state fields, event methods, generation/refinement helpers, parse/fallback helpers, lookup helpers, current-location accessor, and destroy behavior with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `LocationsAssertions` plus concrete construction, load/save, CFI/location/percentage lookup, section refinement, word-location, current-location, and event listener typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Locations typed public API assertions and construction/refinement/word-location coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/locations.test.js test/browser/pagelist.test.js test/browser/epubcfi.test.js test/browser/mapping.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Locations` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0272
- Why:
  - P-0271 aligned `Store` declarations with runtime behavior, leaving `PageList` as the next public typed surface before moving into higher-risk `Locations` / CFI-heavy declaration work.
  - `PageList` is already TypeScript source, but its declaration still required constructor XML, hid public page-map state, omitted NCX/parser helpers, treated missing page/CFI lookups as always present, and did not model destroy-cleared state.
  - Aligning `PageList` declarations lets consumers type-check EPUB 3 / NCX page-list parsing, page/href/CFI lookup maps, percentage helpers, optional document construction, and cleanup behavior before broader release or host gates.
- Diff Scope:
  - `types/pagelist.d.ts`: align page-list item/document/value types, public state fields, optional constructor, parser/helper methods, lookup fallbacks, percentage helpers, and destroy behavior with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `PageListAssertions` plus concrete construction, parse, process, page/href/CFI lookup, and percentage helper typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the PageList typed public API assertions and constructor/process/CFI lookup coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/pagelist.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `PageList` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0271
- Why:
  - P-0270 aligned `Resources` declarations with runtime behavior, leaving `Store` as the next low-risk resource-cache typed public API gap before moving into higher-risk location/CFI surfaces.
  - `Store` is already TypeScript source, but its declaration still hid public cache/storage/network state, required `createUrl()` options, modeled missing stored entries as always present, omitted listener/status methods, and kept `handleResponse()` private despite browser tests exercising the storage parsing path.
  - Aligning `Store` declarations lets consumers type-check cached resource storage, offline retrieval, request overloads, data URL/object URL creation, event status updates, and destroy listener cleanup before broader release or host gates.
- Diff Scope:
  - `types/store.d.ts`: align store data/request/storage/resource/options types, public state fields, request/retrieve overloads, missing-entry blob/text/base64 returns, createUrl options, listener/status helpers, and handleResponse overloads with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `StoreAssertions` plus concrete constructor, add, put, request, retrieve, blob/text/base64, createUrl, and handleResponse typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Store typed public API assertions and constructor/createUrl coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/store.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Store` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0270
- Why:
  - P-0269 aligned `Packaging` declarations with runtime behavior, leaving `Resources` as the next manifest/archive resource-chain typed public API gap.
  - `Resources` is already TypeScript source, but its declaration still required options, hid public runtime state, treated `relativeTo()` as taking a boolean, typed `get()` as a synchronous string return, omitted null replacement results, and kept CSS replacement helpers private despite browser tests exercising them.
  - Aligning `Resources` declarations lets consumers type-check manifest resource splitting, optional archive/request/resolver settings, replacement URL generation, CSS replacement, relative URL resolution, missing resource lookups, and destroy-cleared state before broader release or host gates.
- Diff Scope:
  - `types/resources.d.ts`: align resource manifest/settings/options/request/archive types, optional state fields, process/split helpers, replacement results, CSS helper methods, `relativeTo()`, `get()`, and destroy behavior with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `ResourcesAssertions` plus concrete resource manifest, options, createUrl, replacements, CSS replacement, relative URL, get, and substitute typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Resources typed public API assertions and options/get coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/resources.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Resources` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0269
- Why:
  - P-0268 aligned the archive/request typed public API surface, leaving `Packaging` as the next core Book structure declaration gap.
  - `Packaging` is already TypeScript source, but its declaration still required a package document in the constructor, treated JSON manifest loading as a string input, modeled nav/NCX/cover paths as always strings, omitted `uniqueIdentifier` / `toc`, and kept parse helper methods private despite their public runtime shape.
  - Aligning `Packaging` declarations lets consumers type-check empty construction, OPF parse output, JSON manifest loading, optional path/state fields, destroy-cleared state, and helper method return types before broader release or host gates.
- Diff Scope:
  - `types/packaging.d.ts`: align metadata, manifest, spine, TOC, JSON manifest, object output, optional state fields, constructor, load input, helper methods, and path return types with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `PackagingAssertions` plus concrete empty construction, OPF parse, JSON manifest loading, manifest item, metadata, and TOC typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Packaging typed public API assertions and empty-constructor/JSON-load coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/packaging.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Packaging` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0268
- Why:
  - P-0267 aligned the `Spine` typed public API surface, leaving archive/request declarations as the next core type gap.
  - `Archive` is already TypeScript source, but its declaration still treated missing archive entries as always returning promises, required `createUrl()` options even though runtime allows them to be omitted, hid public `zip` / `urlCache` state, and kept `handleResponse()` private despite browser tests exercising it.
  - Aligning `Archive` declarations lets consumers type-check missing-entry handling, optional base64 URL creation, archive cache state, and response parsing before any release tag or host gate.
- Diff Scope:
  - `types/archive.d.ts`: align archive input, request type, URL options, entry/zip shape, public state, missing-entry returns, `createUrl()` options, `checkRequirements()`, and `handleResponse()` overloads with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `ArchiveAssertions` plus concrete open/openUrl/request/getBlob/getText/getBase64/createUrl/handleResponse typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Archive typed public API assertions and createUrl/handleResponse coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/archive.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Archive` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0267
- Why:
  - P-0266 aligned `Section` declarations with runtime behavior, leaving the adjacent `Spine` structure declaration as the next typed public API gap.
  - `Spine` is already TypeScript source, but its declaration still treated lookups as always returning `Section`, hid runtime state fields, omitted fallback/renderability helpers, and declared `remove()` as private even though the browser regression suite exercises it.
  - Aligning `Spine` declarations lets downstream consumers type-check null lookups, first/last empty-spine results, lifecycle-cleared state, package unpack inputs, and section removal before broader release or host gates.
- Diff Scope:
  - `types/spine.d.ts`: align `Spine` state fields, package types, resolver types, lookup helpers, fallback helpers, append/prepend/remove/each, and nullable/optional return types with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `SpineAssertions` plus concrete unpack, lookup, first/last, and remove typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Spine typed public API assertions and unpack/remove coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/spine.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older narrower `Spine` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0266
- Why:
  - P-0265 extended the typed public API lane from the package root and `Navigation` into EPUB structure declarations.
  - `Section` is already TypeScript source, but its declaration still described `load()` and `render()` as synchronous, omitted `search()`, required explicit hooks in the constructor, missed `SpineItem.idref`, and treated fields cleared by `unload()` / `destroy()` as always present.
  - Aligning the declaration with runtime behavior lets `Book.section()` consumers type-check async section loading, search results, optional hooks, and lifecycle-cleared state before broader host gates.
- Diff Scope:
  - `types/section.d.ts`: align `Section`, `SpineItem`, hook set, search result, and request declarations with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `SectionAssertions` plus concrete construction, load, render, find, search, and layout typing checks.
  - `scripts/verify-gate1-readiness.mjs`: require the Section typed public API assertions and construction/search coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/section.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older synchronous or always-present `Section` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0265
- Why:
  - P-0264 made Gate 1 readiness executable, and P-0262/P-0263 locked the root, request, utils, `Book`, `Rendition`, and `Contents` typed public surfaces.
  - `Navigation` is already TypeScript source, but its public declaration still described only XML construction and single-item lookup, while runtime also supports empty construction, `Document` input, legacy JSON navigation trees, TOC list lookup, landmark list lookup, and missing-item `undefined` results.
  - Tightening the declaration and adding type-level assertions keeps the Browser Mode and typed public API lane moving without changing runtime behavior or requiring a host gate.
- Diff Scope:
  - `types/navigation.d.ts`: align the `Navigation` constructor, `parse()`, `get()`, `landmark()`, `load()`, indexed lookup maps, `length`, `NavItem`, and `LandmarkItem` declarations with the TypeScript source behavior.
  - `types/epubjs-tests.ts`: add `NavigationAssertions` plus concrete construction and overload usage checks for `Document`, empty, and legacy JSON navigation inputs.
  - `scripts/verify-gate1-readiness.mjs`: require the Navigation typed public API assertions and overload coverage in Gate 1 readiness checks.
- Test:
  - `npm run typecheck`
  - `npm run verify:gate1-readiness`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/navigation.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the older, narrower `Navigation` declaration surface instead of the current runtime-compatible typed public API contract.

### P-0264
- Why:
  - P-0262 and P-0263 strengthened the typed public API surface, but Gate 1 readiness still depended on remembering which scripts and tests prove package entry plus public type stability.
  - Adding an executable readiness contract makes the package entry, Vite/Rollup build scripts, typed public surface tests, Browser Mode smoke tests, and release gate wiring auditable before any tag or host gate.
  - Wiring this contract into `verify:contracts` keeps future release checks from drifting away from Gate 1 requirements.
- Diff Scope:
  - `scripts/verify-gate1-readiness.mjs`: add a repo-local verifier for package entry fields, Vite/Rollup scripts, Browser Mode public API smoke files, type test wiring, typed public root/class assertions, global namespace coverage, and release gate wiring.
  - `package.json`: add `verify:gate1-readiness` and include it in `verify:contracts`.
  - `scripts/verify-pack-contents.mjs`: require the new Gate 1 readiness verifier in package tarball contents.
- Test:
  - `npm run verify:gate1-readiness`
  - `npm run typecheck`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if Gate 1 readiness should remain a manual review instead of an executable package entry and typed public API contract.

### P-0263
- Why:
  - P-0262 added type-level assertions for the package root, static facade, request method, and utils facade.
  - Gate 1 also needs the core public class surface to stay stable before a tag and host gate.
  - `types/epubjs-tests.ts` used `Book`, `Rendition`, and `Contents`, but it did not assert common public method/property return types for those classes.
  - Adding type-level assertions for core class methods makes declaration drift fail during `npm run typecheck` while keeping runtime behavior unchanged.
- Diff Scope:
  - `types/epubjs-tests.ts`: add exact type assertions for selected `Book`, `Rendition`, and `Contents` public properties and methods, including request wiring, load/open/render/display/location/content measurement, and viewport/writing-mode helpers.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/book.test.js test/browser/rendition.test.js test/browser/contents-text-width.test.js test/browser/public-api.test.js`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require these `Book`, `Rendition`, or `Contents` public method/property declarations to loosen or diverge from the current package root contract.

### P-0262
- Why:
  - After P-0261, the vertical-rl rendering helper extraction had a stable release gate, so this slice returns to the Gate 1 package entry and typed public API lane.
  - `types/epubjs-tests.ts` covered basic root construction and request overloads, but it did not assert that the default callable root, named constructors, static root facade, `request()` method type, and generic `utils.defer()` facade remain exactly aligned.
  - Adding type-level public API assertions makes declaration drift fail during `npm run typecheck` before a tag or host gate.
  - Because this only changes declaration tests, validation focuses on TypeScript checking, public API browser smoke, package entry contracts, and the full release gate.
- Diff Scope:
  - `types/epubjs-tests.ts`: add exact type assertions for the default root export, static constructor facade, `request()` method type, `utils.uuid()`, and generic `utils.defer()`.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/umd-global.test.js`
  - `npm run verify:package-entry`
  - `npm run verify:packed-package-entry`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if downstream type consumers intentionally require the default root export, static constructor facade, request method typing, or utils facade to diverge from the package root declaration contract.

### P-0261
- Why:
  - P-0260 moved vertical-rl text-boundary snap nearest-delta and final result assembly into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still directly performed the preflight sequence that normalizes right-boundary limits, constrains the logical offset, checks text-measurement readiness, and creates the cache lookup.
  - Moving that pure preflight sequence into `src/rendering/boundary-mask.ts` keeps boundary option shaping, constrained fallback, readiness, and cache identity together while leaving the manager responsible for acquiring DOM handles and mutating the cache field.
  - Because this controls early returns, cache hits, and the offset passed into text measurement, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapPreflight` and `getVerticalRlBoundarySnapPreflight()`.
  - `src/rendering/pagination.ts`: re-export the preflight helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline right-boundary normalization, constrained offset, readiness check, and cache lookup with the preflight helper.
  - `test/browser/rendering-pagination.test.js`: cover preflight cache hits after constrained offsets and skipped cache lookup when text is not ready.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for constrained offset fallback, readiness early returns, cache key identity, cache hits, right-boundary option values, text rect measurement entry, or final snapped offsets.

### P-0260
- Why:
  - P-0259 moved vertical-rl text-boundary snap measurement input assembly into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still directly unpacked those measurement inputs, calculated the nearest delta, and then assembled the final snap result.
  - Moving that pure pipeline result step into `src/rendering/boundary-mask.ts` keeps nearest-delta selection and final snapped/cache result semantics together while leaving the manager responsible for DOM collection, cache lookup, and cache field mutation.
  - Because this controls nearest-delta selection, cache writes, and final snapped offsets, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapPipelineResult()` to compute nearest delta from measurement inputs and return the final snap result.
  - `src/rendering/pagination.ts`: re-export the pipeline result helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline measurement-input unpacking, delta calculation, and result assembly with the pipeline helper.
  - `test/browser/rendering-pagination.test.js`: cover pipeline result assembly from measurement inputs through cache entry output.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for nearest-delta selection, structural mask use, max/preferred right-boundary clamps, cache entry creation, or final snapped offsets.

### P-0259
- Why:
  - P-0258 moved vertical-rl text-boundary snap result assembly into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still directly paired candidate rect normalization with delta-input normalization after collecting DOM text rects.
  - Moving that pure measurement-input assembly into `src/rendering/boundary-mask.ts` keeps viewport rect and snap precondition shaping together while leaving the manager responsible for DOM collection, layout reads, and cache mutation.
  - Because these inputs feed nearest-delta selection, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapMeasurementInputs` and `getVerticalRlBoundarySnapMeasurementInputs()`.
  - `src/rendering/pagination.ts`: re-export the measurement-input helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace separate candidate-rect and delta-input assembly calls with the measurement helper.
  - `test/browser/rendering-pagination.test.js`: cover measurement input assembly for shifted rects and normalized delta inputs.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for shifted candidate rect coordinates, edge guard normalization, structural mask inputs, boundary shift handling, structural bleed, nearest-delta selection, cache writes, or final snapped offsets.

### P-0258
- Why:
  - P-0257 moved vertical-rl boundary snap cache key construction and cache hit lookup into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still directly paired the final snapped offset calculation with cache entry creation after nearest-delta selection.
  - Moving that pure result assembly into `src/rendering/boundary-mask.ts` keeps snapped offset and cache write decision semantics together while leaving the manager responsible for mutating its cache field.
  - Because this result controls final text-boundary offsets and whether cache writes occur, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapResult` and `getVerticalRlBoundarySnapResult()`.
  - `src/rendering/pagination.ts`: re-export the snap result helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline snapped-offset plus cache-entry assembly with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover snap results with cache entries, without cache entries, and with right-boundary clamps.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for final snapped offsets, preferred/max right-boundary clamps, nearest-delta cache write decisions, cache entry values, or uncached snapped offsets.

### P-0257
- Why:
  - P-0256 moved vertical-rl text-boundary snap delta-input assembly into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still directly combined boundary snap cache key construction with cache hit lookup before collecting text rects.
  - Moving that pure cache lookup assembly into `src/rendering/boundary-mask.ts` keeps cache identity and hit semantics with the rendering helpers while leaving the manager responsible for owning the mutable cache field.
  - Because cache hits bypass text rect collection and cache keys include right-boundary constraints, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapCacheLookup` and `getVerticalRlBoundarySnapCacheLookup()`.
  - `src/rendering/pagination.ts`: re-export the cache lookup helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline cache key construction plus cache hit lookup with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover cache lookup hits and misses while preserving rounded key identity.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for cache key identity, cache hit reuse, cache miss behavior, right-boundary constraint identity, text rect collection bypass, or final snapped offsets.

### P-0256
- Why:
  - P-0255 moved vertical-rl text-boundary snap candidate rect composition into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still directly assembled the normalized inputs passed into `getVerticalRlBoundarySnapDelta()`: clamped/raw edge guard, structural masks, boundary shift, and structural bleed.
  - Moving that pure delta-input assembly into `src/rendering/boundary-mask.ts` keeps snap delta preconditions with the rendering helpers while leaving the manager responsible for reading layout and page measurements.
  - Because these inputs feed nearest-delta selection and final text-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapDeltaInputs` and `getVerticalRlBoundarySnapDeltaInputs()`.
  - `src/rendering/pagination.ts`: re-export the delta-input helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline edge guard, structural mask, boundary shift, and structural bleed assembly with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover normalized delta input assembly and missing-input fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for clamped edge guard selection, raw edge guard boundary-shift adjustment, structural masks, boundary shift, structural bleed, nearest-delta selection, or final snapped offsets.

### P-0255
- Why:
  - P-0254 moved the vertical-rl text-boundary snap readiness guard into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still directly composed text rects, iframe offsets, and logical viewport bounds before passing candidate rects into the boundary snap delta helper.
  - Moving that pure candidate-rect composition into `src/rendering/boundary-mask.ts` keeps logical viewport bound selection with the rendering helpers while leaving the manager responsible for collecting DOM text rects and reading the iframe box.
  - Because these candidate rects feed nearest-delta selection for vertical-rl text-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapCandidateRects()` to compose closest viewport rect normalization with logical viewport bounds.
  - `src/rendering/pagination.ts`: re-export the boundary snap candidate-rect helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace direct closest-viewport/bounds composition with the rendering candidate-rect helper.
  - `test/browser/rendering-pagination.test.js`: cover candidate rect normalization through logical viewport bounds.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for direct versus shifted iframe rect coordinates, logical viewport bound selection, closest rect normalization, nearest-delta selection, or final snapped offsets.

### P-0254
- Why:
  - P-0253 moved vertical-rl boundary snap cache read/write shaping into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure readiness guard that decides whether the DOM and width inputs can support text-boundary snapping before measuring text rects.
  - Moving that guard into `src/rendering/boundary-mask.ts` keeps snap preconditions with the rendering helper surface while leaving the manager responsible for acquiring the active view, DOM handles, and layout measurements.
  - Because this guard controls fallback to the constrained logical offset before text rect collection, validation covers focused rendering/manager tests plus TypeScript checking before broader gates.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapReadiness` and `isVerticalRlBoundarySnapTextReady()`.
  - `src/rendering/pagination.ts`: re-export the boundary snap readiness helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace the inline boundary snap readiness guard with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover ready inputs, missing DOM handles, zero measurements, and missing TreeWalker support.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for missing iframe/document/window/body, zero content or visible width, TreeWalker support checks, constrained-offset fallback, text rect collection entry, or final snapped offsets.

### P-0253
- Why:
  - P-0252 moved repeated right-boundary option shaping into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned inline cache hit checks and cache entry construction for vertical-rl boundary snap results.
  - Moving cache hit/read and cache entry shaping into `src/rendering/boundary-mask.ts` keeps cache semantics with cache key generation while leaving the manager responsible for storing the cache field.
  - Because cache hits can bypass text rect collection and cache writes only happen when a nearest delta exists, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapCacheEntry`, `getCachedVerticalRlBoundarySnap()`, and `getVerticalRlBoundarySnapCacheEntry()`.
  - `src/rendering/pagination.ts`: re-export the boundary snap cache helpers and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline boundary snap cache read/write checks with rendering helper calls.
  - `test/browser/rendering-pagination.test.js`: cover cache hit, miss, cache entry creation, and no-entry fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for cache hit reuse, cache miss behavior, nearest-delta cache writes, uncached snapped offsets, or final snapped offsets.

### P-0252
- Why:
  - P-0251 paired clamped/raw vertical-rl boundary snap edge guard normalization inside the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still repeatedly rebuilt the same preferred/max right-boundary option objects for constrained offset, cache key, delta guard, and final snapped-offset helpers.
  - Moving that option shaping into `src/rendering/boundary-mask.ts` keeps right-boundary constraint payloads with their normalized limit model while leaving the manager responsible for view/layout/cache orchestration.
  - Because these option objects feed constrained offsets, cache identity, nearest-delta guard, and final clamps, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundaryMaxRightBoundaryLimitOptions`, `VerticalRlBoundaryRightBoundaryLimitOptions`, and helpers that derive each option payload from normalized right-boundary limits.
  - `src/rendering/pagination.ts`: re-export the right-boundary option helpers and types through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace repeated inline right-boundary option objects with rendering helper calls and keep the adjusted preferred boundary on the normalized limit object.
  - `test/browser/rendering-pagination.test.js`: cover max-only and full right-boundary option shaping.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for right-boundary constrained offsets, cache key identity, nearest-delta max-boundary guard, preferred boundary adjustment, or final snapped offsets.

### P-0251
- Why:
  - P-0250 moved preferred/max right-boundary limit normalization into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still read the same layout `edgeGuardPx` twice to derive the clamped edge guard used by boundary model selection and the raw edge guard used by boundary-shift adjustment.
  - Pairing those two derived values in `src/rendering/boundary-mask.ts` keeps vertical-rl boundary snap edge-guard normalization together while preserving the existing single-value helpers for focused coverage.
  - Because the paired values feed text-boundary snapping and boundary-shift adjustment, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapEdgeGuards` and `getVerticalRlBoundarySnapEdgeGuards()` to derive clamped and raw edge guards from one layout input.
  - `src/rendering/pagination.ts`: re-export the paired edge guard helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace separate clamped/raw edge guard helper calls with the paired rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover paired edge guard rounding and invalid fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-boundary snapping differs for clamped edge guard rounding, raw edge guard fallback, boundary-shift adjustment, nearest delta selection, cache behavior, or final snapped offsets.

### P-0250
- Why:
  - P-0249 moved vertical-rl boundary snap raw edge guard normalization into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure preferred/max right-boundary limit normalization inline before invoking constrained offset, cache key, delta, and snapped-offset helpers.
  - Moving that normalization into `src/rendering/boundary-mask.ts` keeps boundary snap right-boundary numeric inputs with the rendering helpers while leaving the manager responsible for passing through `SnapLimits`.
  - Because these flags feed right-boundary targeting, cache identity, model guards, and final clamps, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundaryRightBoundaryLimits` and `getVerticalRlBoundaryRightBoundaryLimits()` for preferred/max right-boundary numeric normalization.
  - `src/rendering/pagination.ts`: re-export the right-boundary limits helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline preferred/max right-boundary parsing with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover finite limit flags and invalid fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for preferred/max right-boundary numeric parsing, finite flags, cache identity, model guards, final right-boundary clamps, or snapped offsets.

### P-0249
- Why:
  - P-0248 moved vertical-rl boundary snap structural mask normalization into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure raw `edgeGuardPx` normalization inline before passing it into boundary-shift delta adjustment.
  - Moving that raw guard normalization into `src/rendering/boundary-mask.ts` keeps boundary-shift adjustment inputs with the rendering helpers while leaving the manager responsible for reading layout settings.
  - Because this raw guard differs from the clamped boundary model edge guard, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapRawEdgeGuard()` for raw edge guard numeric normalization.
  - `src/rendering/pagination.ts`: re-export the raw edge guard helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline raw edge guard normalization with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover raw guard preservation and zero/invalid fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for raw edge guard preservation, zero/invalid fallback, positive boundary-shift delta adjustment, or final snapped offsets.

### P-0248
- Why:
  - P-0247 moved vertical-rl boundary snap structural bleed calculation into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure structural left/right mask normalization inline before invoking the boundary snap delta pipeline.
  - Moving that normalization into `src/rendering/boundary-mask.ts` keeps boundary snap numeric inputs with the rendering helpers while leaving the manager responsible for obtaining structural mask widths.
  - Because these masks shift boundary model left/right edges, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapStructuralMasks()` for left/right mask numeric normalization.
  - `src/rendering/pagination.ts`: re-export the structural mask helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline structural left/right mask normalization with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover present masks, missing masks, and invalid mask fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for structural left/right mask normalization, missing mask fallback, invalid mask fallback, boundary model edge positions, or final snapped offsets.

### P-0247
- Why:
  - P-0246 moved vertical-rl boundary snap edge guard normalization into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure structural bleed calculation inline before invoking the boundary snap delta pipeline.
  - Moving that calculation into `src/rendering/boundary-mask.ts` keeps the boundary-shift adjustment inputs with the rendering helpers while leaving the manager responsible for reading the current page advance.
  - Because this bleed value controls whether positive boundary-shift delta adjustment is active, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapStructuralBleed()` for visible-width/page-advance bleed calculation.
  - `src/rendering/pagination.ts`: re-export the structural bleed helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline structural bleed calculation with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover positive/negative bleed and no-advance fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for structural bleed calculation, no-advance fallback, positive boundary-shift delta adjustment, or final snapped offsets.

### P-0246
- Why:
  - P-0245 moved vertical-rl boundary snap origin viewport bounds into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure boundary snap edge guard clamp inline.
  - Moving that clamp into `src/rendering/boundary-mask.ts` keeps boundary snap guard normalization with the rendering helpers while leaving the manager responsible for reading layout settings.
  - Because this guard controls boundary model candidate expansion for vertical-rl rendition/page-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapEdgeGuard()` for defaulting, rounding, and 1..8 clamping.
  - `src/rendering/pagination.ts`: re-export the edge guard helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline boundary snap edge guard clamp with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover default/invalid edge guard fallback, rounding, and clamps.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for edge guard defaulting, rounding, min/max clamp behavior, boundary model candidate expansion, or final snapped offsets.

### P-0245
- Why:
  - P-0244 moved vertical-rl boundary snap cache key serialization into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure right-origin/left-origin viewport bound calculation inline before closest-rect selection.
  - Moving those origin bounds into `src/rendering/boundary-mask.ts` keeps boundary snap viewport geometry derivation in the rendering helper layer while leaving the manager responsible for iframe coordinates, DOM rect collection, and cache storage.
  - Because these bounds feed vertical-rl rendition/page-boundary snapping rect selection, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapViewportBounds()` for right-origin and left-origin viewport bounds.
  - `src/rendering/pagination.ts`: re-export the viewport bounds helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline origin viewport bound assembly with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover origin bound order and invalid measurement normalization.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for right-origin viewport bounds, left-origin viewport bounds, origin bound order, closest text rect selection, or invalid measurement normalization.

### P-0244
- Why:
  - P-0243 moved vertical-rl preferred/max right-boundary initial offset targeting into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure boundary snap cache key serialization inline.
  - Moving the key builder into `src/rendering/boundary-mask.ts` keeps boundary-snap cache identity with the normalized rendering inputs while leaving the manager responsible for cache storage and DOM measurement.
  - Because the cache key guards vertical-rl rendition/page-boundary snapping reuse, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapCacheKey()` for rounded boundary snap cache identity serialization.
  - `src/rendering/pagination.ts`: re-export the cache key helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline boundary snap cache key assembly with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover rounded measurement serialization and unconstrained boundary `none` segments.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping cache reuse differs for rounded offset/width values, edge guard identity, max right-boundary keys, preferred right-boundary keys, or unconstrained `none` segments.

### P-0243
- Why:
  - P-0242 moved vertical-rl boundary snap delta orchestration into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure initial logical offset constraint for preferred/max right boundaries inline.
  - Moving that constraint into `src/rendering/boundary-mask.ts` keeps pre-snap right-boundary offset targeting and preferred-boundary normalization in the rendering helper layer while leaving the manager responsible for measuring content and choosing whether the constraints exist.
  - Because this helper feeds vertical-rl rendition/page-boundary snapping and the cache key input, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundaryConstrainedOffset` and `getVerticalRlBoundaryConstrainedOffset()` for preferred/max right-boundary initial offset targeting.
  - `src/rendering/pagination.ts`: re-export the constrained-offset helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline preferred/max right-boundary offset constraint with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover preferred boundary targeting, preferred/max normalization, max-only constraint, and maxScroll clamping.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for preferred right-boundary targeting, max right-boundary protection, preferred/max boundary normalization, maxScroll clamping, or boundary snap cache keys.

### P-0242
- Why:
  - P-0241 moved vertical-rl right-origin/left-origin boundary model assembly into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still orchestrated model selection and boundary-shift delta adjustment inline.
  - Moving that pure delta pipeline into `src/rendering/boundary-mask.ts` keeps model assembly, best-snap selection, and boundary-shift adjustment together while leaving the manager responsible for DOM rect collection, viewport normalization, snapped offset application, and cache flow.
  - Because this helper feeds vertical-rl rendition/page-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnapDelta()` for boundary model assembly, best-snap selection, and boundary-shift delta adjustment.
  - `src/rendering/pagination.ts`: re-export the snap delta helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline model/best/adjust orchestration with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover best-origin delta selection and boundary-shift adjustment through the pipeline helper.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for origin model selection, right-origin tie-breaking, boundary-shift delta adjustment, or cache eligibility.

### P-0241
- Why:
  - P-0240 moved vertical-rl snapped-offset calculation and right-boundary clamps into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure right-origin/left-origin boundary model assembly and model labeling inline.
  - Moving that model assembly into `src/rendering/boundary-mask.ts` keeps boundary raw coordinate calculation, structural mask application, origin labeling, and max-right guard forwarding in the rendering helper layer while leaving the manager responsible for viewport rect normalization and final offset flow.
  - Because this helper feeds vertical-rl rendition/page-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlBoundarySnapModels` and `getVerticalRlBoundarySnapModels()` for right-origin/left-origin model assembly.
  - `src/rendering/pagination.ts`: re-export the boundary snap model helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline right-origin/left-origin model evaluation with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover origin labels, structural mask boundary application, and max-right guard forwarding.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for right-origin model coordinates, left-origin model coordinates, structural mask application, max-right guard forwarding, or origin tie-breaking.

### P-0240
- Why:
  - P-0239 moved vertical-rl boundary-shift positive-delta adjustment into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure snapped-offset calculation and preferred/max right boundary clamp inline.
  - Moving that snapped-offset calculation into `src/rendering/boundary-mask.ts` keeps post-selection delta application and right-boundary constraints in the rendering helper layer while leaving the manager responsible for cache and return flow.
  - Because this helper feeds vertical-rl rendition/page-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundarySnappedOffset()` for delta application, scroll bounds, and preferred/max right boundary constraints.
  - `src/rendering/pagination.ts`: re-export the snapped-offset helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline snapped-offset and right-boundary clamp code with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover delta application, scroll limits, preferred right boundary clamp, max right boundary clamp, and clamp target scroll limits.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for delta application, maxScroll clamping, preferred right boundary protection, max right boundary protection, or cache eligibility.

### P-0239
- Why:
  - P-0238 moved vertical-rl best boundary snap selection into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure boundary-shift/edgeGuard positive-delta clamp inline.
  - Moving that delta adjustment into `src/rendering/boundary-mask.ts` keeps boundary snap scoring and post-selection numeric adjustment in the rendering helper layer while leaving the manager responsible for applying the resulting offset.
  - Because this helper feeds vertical-rl rendition/page-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlBoundaryShiftAdjustedDelta()` for boundary-shift positive-delta adjustment.
  - `src/rendering/pagination.ts`: re-export the delta adjustment helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline boundary-shift delta clamp with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover positive clamp, non-applicable conditions, and one-pixel minimum fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for positive-delta boundary-shift clamping, edgeGuard proximity handling, structural bleed gating, or one-pixel minimum adjustment.

### P-0238
- Why:
  - P-0237 moved vertical-rl boundary crossing counts and boundary model evaluation into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned the pure best-snap selection and model tie-break ordering inline.
  - Moving that selection into `src/rendering/boundary-mask.ts` keeps boundary model scoring, right-origin preference, zero-delta filtering, and distance tie-breaking together while leaving the manager responsible for applying the selected offset.
  - Because this helper feeds vertical-rl rendition/page-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getBestVerticalRlBoundarySnap()` for score/model/distance best-snap selection.
  - `src/rendering/pagination.ts`: re-export the best-snap helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline snap filtering/sorting with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover score priority, right-origin tie-breaking, distance tie-breaking, and zero-delta filtering.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for score priority, right-origin tie-breaking, distance tie-breaking, or zero-delta candidate filtering.

### P-0237
- Why:
  - P-0236 moved vertical-rl closest viewport rect normalization into the rendering boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still owned boundary crossing counting and boundary model candidate evaluation inline.
  - Moving the pure crossing count and model evaluation into `src/rendering/boundary-mask.ts` keeps vertical-rl logical boundary snapping decisions in the rendering helper layer while leaving the manager responsible for platform rect collection, viewport model selection, and applying the selected offset.
  - Because this helper feeds vertical-rl rendition/page-boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `countVerticalRlBoundaryCrossings()` and `evaluateVerticalRlBoundaryModel()` plus the `VerticalRlBoundarySnap` type.
  - `src/rendering/pagination.ts`: re-export the boundary model helpers through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace inline boundary crossing/model evaluation closures with the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover crossing counts, crossing-reducing model selection, and max-right boundary guard behavior.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for crossing reduction, right-origin max boundary constraints, left-origin tie-breaking, or preferred/max right boundary clamping.

### P-0236
- Why:
  - P-0235 moved vertical-rl raw-right snap apply decisions into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlLogicalOffsetToTextBoundary()` still manually mapped platform-collected text rects into closest logical viewport rects before boundary crossing evaluation.
  - Moving the closest-viewport rect collection normalization into `src/rendering/boundary-mask.ts` keeps direct-vs-shifted multi-viewport coordinate selection in one rendering helper while leaving DOM rect collection in the platform layer.
  - Because these normalized rects feed vertical-rl logical offset boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlClosestViewportRects()` for collection-level closest viewport rect normalization.
  - `src/rendering/pagination.ts`: re-export the collection helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace the manual closest-viewport rect normalization loop in `snapVerticalRlLogicalOffsetToTextBoundary()` with the helper.
  - `test/browser/rendering-pagination.test.js`: cover closest viewport collection normalization and measurement field preservation.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl logical offset boundary snapping differs for negative-offset iframes, closest viewport selection, measurement field preservation, or boundary crossing reduction.

### P-0235
- Why:
  - P-0234 moved vertical-rl raw-left shift and left-mask clamping into a rendering decision helper.
  - `DefaultViewManager.snapVerticalRlEdgeMaskWidths()` still assembled the raw-right shift decision and snapped right-mask value inside `snapRight()`.
  - Moving that raw-right apply decision into `src/rendering/raw-right-snap.ts` keeps raw-right snap calculation, required-mask derivation, paint-guard handling, and right-mask clamping together while leaving the manager responsible only for applying the resulting state.
  - Because this helper feeds vertical-rl right edge-mask snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/raw-right-snap.ts`: extend `VerticalRlRawRightSnapDecision` and `getVerticalRlRawRightSnapDecisionForRects()` with snapped `right` mask output.
  - `src/managers/default/index.ts`: replace raw-right snapped-mask assembly with the decision helper output.
  - `test/browser/rendering-pagination.test.js`: cover raw-right decision results for shrink required-mask protection and paint-guard expansion.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl raw-right edge-mask snapping differs for shrink required-mask protection, positive expansion, paint-guard expansion, or iterative left/right snap convergence.

### P-0234
- Why:
  - P-0233 moved vertical-rl text rect collection normalization into the rendering boundary.
  - `DefaultViewManager.snapVerticalRlEdgeMaskWidths()` still assembled the raw-left shift decision and snapped left-mask value inside `snapLeft()`.
  - Moving that raw-left decision into `src/rendering/raw-left-snap.ts` keeps raw-left snap calculation and left-mask clamping together while leaving the manager responsible only for applying the resulting state.
  - Because this helper feeds vertical-rl left edge-mask snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/raw-left-snap.ts`: add `VerticalRlRawLeftSnapDecision` and `getVerticalRlRawLeftSnapDecisionForRects()`.
  - `src/rendering/pagination.ts`: re-export the new raw-left decision helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace raw-left shift and snapped-left assembly with the decision helper.
  - `test/browser/rendering-pagination.test.js`: cover raw-left decision results for positive clamp, shrink clamp, and zero-shift state.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl raw-left edge-mask snapping differs for positive expansion, shrink targets, zero-shift stability, or iterative left/right snap convergence.

### P-0233
- Why:
  - P-0232 moved vertical-rl left/right edge-mask snap loop control into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlEdgeMaskWidths()` still manually mapped platform-collected text rects into vertical-rl logical viewport rects before snapping.
  - Moving the rect collection normalization into `src/rendering/boundary-mask.ts` keeps direct-vs-shifted viewport coordinate selection in one rendering boundary helper while leaving DOM rect collection in the platform layer.
  - Because these normalized rects feed vertical-rl left/right edge-mask snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlViewportRects()` for collection-level viewport rect normalization.
  - `src/rendering/pagination.ts`: re-export the collection helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace the manual rect normalization loop in `snapVerticalRlEdgeMaskWidths()` with the helper.
  - `test/browser/rendering-pagination.test.js`: cover collection normalization and measurement field preservation.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl edge-mask snapping differs for negative-offset iframes, direct-vs-shifted rect selection, measurement field preservation, or iterative left/right snap convergence.

### P-0232
- Why:
  - P-0231 moved vertical-rl raw-right snap decisions into the rendering helper boundary.
  - `DefaultViewManager.snapVerticalRlEdgeMaskWidths()` still owned the iterative left/right snap loop and zero-shift stop condition inline.
  - Moving that loop control into `src/rendering/edge-mask.ts` keeps edge-mask snap orchestration testable without moving DOM state mutation out of the manager.
  - Because this helper controls vertical-rl left/right edge-mask snap convergence, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/edge-mask.ts`: add `VerticalRlEdgeMaskSnapLoopResult` and `runVerticalRlEdgeMaskSnapLoop()`.
  - `src/rendering/pagination.ts`: re-export the loop helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace the inline four-iteration left/right snap loop with the helper.
  - `test/browser/rendering-pagination.test.js`: cover zero-shift stop, iteration cap behavior, and invalid iteration caps.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl edge-mask snapping differs in left/right convergence, zero-shift stopping, or maximum iteration behavior.

### P-0231
- Why:
  - P-0230 moved vertical-rl raw-right rect collection aggregation into a pure rendering helper.
  - `DefaultViewManager.snapVerticalRlEdgeMaskWidths()` still assembled the raw-right required mask, aggregate result, and final shrink-vs-expand shift choice inside `snapRight()`.
  - Moving that decision into `src/rendering/raw-right-snap.ts` keeps raw-right snap calculation and required-mask derivation together while leaving the manager responsible only for applying the resulting mask state.
  - Because this helper feeds vertical-rl right edge-mask snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/raw-right-snap.ts`: add `VerticalRlRawRightSnapDecision` and `getVerticalRlRawRightSnapDecisionForRects()`.
  - `src/rendering/pagination.ts`: re-export the new raw-right decision helper and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace raw-right required-mask and shift-choice assembly with the decision helper.
  - `test/browser/rendering-pagination.test.js`: cover raw-right decision results for required mask calculation, shrink priority, and paint-guard expansion.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl raw-right required-mask derivation, shrink-vs-expand priority, paint-guard expansion, or iterative left/right snap convergence differs.

### P-0230
- Why:
  - P-0229 moved vertical-rl raw-left rect collection aggregation into a pure rendering helper.
  - `DefaultViewManager.snapVerticalRlEdgeMaskWidths()` still owned the matching raw-right per-rect shift selection, expand/shrink aggregation, and paint-guard aggregation directly inside `snapRight()`.
  - Moving raw-right rect collection aggregation into `src/rendering/raw-right-snap.ts` keeps raw-right snapping behavior close to the existing raw-right helper contracts while further shrinking manager orchestration.
  - Because this helper feeds vertical-rl right edge-mask snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/raw-right-snap.ts`: add `getVerticalRlRawRightSnapShiftForRects()` for raw-right per-rect expand/shrink aggregation and paint-guard tracking.
  - `src/rendering/pagination.ts`: re-export the new raw-right collection helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace the inline raw-right rect loop in `snapVerticalRlEdgeMaskWidths()` with the helper.
  - `test/browser/rendering-pagination.test.js`: cover raw-right collection aggregation across expand, shrink, and paint-guard states.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl raw-right edge-mask snapping differs for previous-left clipped text, just-outside raw-right text, raw-right straddlers, boundary-crossing expands, paint-guard expansion, or iterative left/right snap convergence.

### P-0229
- Why:
  - P-0228 moved vertical-rl client rect normalization into rendering boundary helpers.
  - `DefaultViewManager.snapVerticalRlEdgeMaskWidths()` still owned raw-left snap input, per-rect shift selection, and shift aggregation directly inside the manager.
  - Moving raw-left rect collection aggregation into a pure rendering helper continues shrinking manager orchestration while preserving the existing iterative left/right snap loop.
  - Because this helper feeds vertical-rl left edge-mask snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/raw-left-snap.ts`: add `getVerticalRlRawLeftSnapShiftForRects()` for raw-left per-rect snap shift aggregation.
  - `src/rendering/pagination.ts`: re-export the new raw-left collection helper through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace the inline raw-left rect loop in `snapVerticalRlEdgeMaskWidths()` with the helper.
  - `test/browser/rendering-pagination.test.js`: cover positive and negative raw-left snap shift aggregation across rect collections.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl raw-left edge-mask snapping differs for boundary-crossing expands, covered shrink targets, visible expands, or iterative left/right snap convergence.

### P-0228
- Why:
  - P-0227 moved visible text client rect collection into the platform traversal boundary.
  - `DefaultViewManager` still repeated client-rect-to-vertical-rl logical rect normalization in visible-line mask expansion, edge-mask snapping, and logical offset boundary snapping.
  - Moving rect-level normalization into rendering boundary helpers keeps coordinate selection close to the existing single-viewport and closest-viewport distance helpers while leaving snap target decisions in the manager.
  - Because these helpers feed visible-line mask expansion, edge-mask snapping, and logical offset boundary snapping, validation covers focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `VerticalRlClientRect`, `getVerticalRlViewportRect()`, and `getVerticalRlClosestViewportRect()`.
  - `src/rendering/pagination.ts`: re-export the new rect-level helpers and type through the rendering pagination facade.
  - `src/managers/default/index.ts`: replace repeated client rect normalization with the new rendering helpers.
  - `test/browser/rendering-pagination.test.js`: cover rect-level normalization and measurement field preservation.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if rect normalization differs for negative iframe offsets, measurement field preservation, visible-line mask expansion, edge-mask snapping, or logical offset boundary snapping.

### P-0227
- Why:
  - P-0226 moved visible text-node filtering into the platform traversal boundary.
  - `DefaultViewManager` still owned the repeated `Range` creation, `getClientRects()` traversal, rect validation, and limit handling in three vertical-rl rect collection loops.
  - Moving visible text client rect collection into the platform boundary keeps DOM traversal and range measurement together while leaving vertical-rl coordinate normalization and snapping decisions in the manager/rendering helpers.
  - Because this helper feeds visible-line mask expansion, edge-mask snapping, and logical offset boundary snapping, validation covers platform traversal tests, focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/platform/traversal.ts`: add `collectVisibleTextClientRects()` with configurable limit and invalid-rect counting semantics.
  - `src/managers/default/index.ts`: replace the three inline walker/range/client-rect loops with the platform helper.
  - `test/browser/platform-traversal.test.js`: cover client rect collection and limit behavior.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if platform client rect collection differs for invalid rect counting, visible-line mask expansion, edge-mask snapping, or logical offset boundary snapping.

### P-0226
- Why:
  - P-0225 centralized visible text-node `TreeWalker` creation inside `DefaultViewManager`.
  - The helper still belonged to the manager even though it depends only on browser DOM traversal and computed style APIs.
  - Moving it into the platform traversal boundary continues the `core/rendering/platform/compat` architecture split while keeping vertical-rl manager rect collection behavior unchanged.
  - Because this helper feeds visible-line mask expansion, edge-mask snapping, and logical offset boundary snapping, validation covers platform traversal tests, focused rendering/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/platform/traversal.ts`: add `createVisibleTextWalker()` for reusable visible text-node filtering.
  - `src/managers/default/index.ts`: import and use the platform helper instead of a manager-local helper.
  - `test/browser/platform-traversal.test.js`: cover visible text, hidden text, whitespace-only text, and short text filtering.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if platform text-node filtering differs for hidden nodes, short text nodes, visible-line mask expansion, edge-mask snapping, or logical offset boundary snapping.

### P-0225
- Why:
  - P-0223 and P-0224 moved direct-vs-shifted rect coordinate selection out of `DefaultViewManager`.
  - The manager still repeated the same visible text-node `TreeWalker` filter in three vertical-rl rect collection loops.
  - Centralizing that walker creation keeps each loop's counting and snapping semantics intact while preparing the DOM-dependent rect collection path for a future platform boundary split.
  - Because this helper feeds visible-line mask expansion, edge-mask snapping, and logical offset boundary snapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/managers/default/index.ts`: add `createVerticalRlVisibleTextWalker()` for reusable visible text-node filtering.
  - `src/managers/default/index.ts`: use the helper in `expandVerticalRlLeftMaskToVisibleLine()`, `snapVerticalRlEdgeMaskWidths()`, and `snapVerticalRlLogicalOffsetToTextBoundary()`.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if vertical-rl text-node filtering differs for hidden nodes, short text nodes, visible-line mask expansion, edge-mask snapping, or logical offset boundary snapping.

### P-0224
- Why:
  - P-0223 moved the repeated single-viewport direct-vs-shifted rect coordinate selection into a pure rendering helper.
  - `snapVerticalRlLogicalOffsetToTextBoundary()` still had the more complex two-viewport variant inline, comparing each text rect against both right-origin and left-origin logical viewports.
  - Moving that closest-viewport coordinate choice into a pure helper preserves the existing boundary snapping behavior while reducing another manager-owned rendering calculation.
  - Because this helper feeds vertical-rl logical offset boundary snapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlClosestViewportRectCoordinates()` for direct-vs-shifted rect selection across multiple logical viewports.
  - `src/rendering/pagination.ts`: re-export the helper through the existing rendering pagination facade.
  - `src/managers/default/index.ts`: replace the inline two-viewport distance comparison in `snapVerticalRlLogicalOffsetToTextBoundary()`.
  - `test/browser/rendering-pagination.test.js`: cover shifted selection, direct selection, and invalid viewport fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if host vertical-rl logical offset snapping differs near page boundaries, right-origin/left-origin viewport selection, or negative iframe offsets.

### P-0223
- Why:
  - `DefaultViewManager` still duplicated vertical-rl text rect coordinate selection when an iframe is shifted left of the host viewport.
  - Keeping that negative-offset iframe normalization in manager loops makes the next rendering split harder to review and easier to drift.
  - Moving the coordinate choice into a pure rendering boundary helper preserves behavior while making the manager use a tested helper for visible-line expansion and edge-mask snapping.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add `getVerticalRlViewportRectCoordinates()` for direct-vs-shifted rect coordinate selection.
  - `src/rendering/pagination.ts`: re-export the helper through the existing rendering pagination facade.
  - `src/managers/default/index.ts`: replace two duplicated negative-offset iframe rect coordinate blocks with the helper.
  - `test/browser/rendering-pagination.test.js`: cover direct coordinates, shifted coordinates, and tolerance-preserved direct coordinates.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if host vertical-rl text rect snapping differs for negative-offset iframes, visible-line mask expansion, or edge-mask snapping near page boundaries.

### P-0222
- Why:
  - P-0221 made `src/rendering/pagination.ts` a compatibility facade over split rendering modules.
  - Without a contract, future edits could accidentally add helper implementations back into the facade or omit generated split modules from `lib/rendering`.
  - Extending the internal boundary verifier protects the rendering split by requiring source/generated split modules, forbidding local implementation code in the pagination facade, and checking the compiled facade imports every split module.
  - Because this contract guards vertical-rl pagination, edge-mask, raw-left/raw-right snap, boundary-mask, rendition navigation, and location mapping helper organization, validation covers the verifier, focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `scripts/verify-internal-boundaries.mjs`: require rendering split modules in source and generated lib.
  - `scripts/verify-internal-boundaries.mjs`: require `src/rendering/pagination.ts` to remain a re-export facade without local function/class implementations.
  - `scripts/verify-internal-boundaries.mjs`: require compiled `lib/rendering/pagination.js` to import every rendering split module.
- Test:
  - `npm run verify:internal-boundaries`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if the facade contract blocks an intentional rendering pagination surface change, generated lib output, package contents, or TypeScript compatibility.

### P-0221
- Why:
  - P-0220 moved raw-left snap helpers out of `src/rendering/pagination.ts`.
  - `src/rendering/pagination.ts` still contained boundary and edge-mask input helpers after the page metrics, logical page, edge-mask, raw-right, and raw-left splits.
  - Moving current boundary, sequential boundary, clean-page edge-mask input, previous-left-mask input, structural edge-mask input, and logical viewport distance helpers into `src/rendering/boundary-mask.ts` makes `src/rendering/pagination.ts` closer to a compatibility facade while preserving the existing internal import surface for managers and tests.
  - Because these helpers feed vertical-rl page boundary constraints, clean-page masks, structural masks, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/boundary-mask.ts`: add boundary and edge-mask input helpers that depend on edge-mask limits.
  - `src/rendering/pagination.ts`: re-export boundary-mask helpers to preserve the internal pagination helper surface.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving boundary-mask helpers changes vertical-rl page boundary constraints, clean-page masks, structural masks, rendition navigation, location mapping, package contents, or generated build output.

### P-0220
- Why:
  - P-0219 moved raw-right snap helpers out of `src/rendering/pagination.ts`.
  - `src/rendering/pagination.ts` still mixed raw-left snap helper contracts with clean-page edge-mask, structural edge-mask, and boundary helpers.
  - Moving raw-left rect input, boundary crossing, covered shrink, visible expand, rect shift, and aggregate helpers into `src/rendering/raw-left-snap.ts` continues the rendering architecture split while preserving the existing `src/rendering/pagination.ts` import surface for managers and tests.
  - Because these helpers feed vertical-rl raw-left text snapping, left edge mask shrink/expand decisions, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/raw-left-snap.ts`: add raw-left snap type and helper functions for rect input, boundary crossing, covered shrink, visible expand, rect shift, and shift aggregation.
  - `src/rendering/pagination.ts`: re-export raw-left helpers and type to preserve the internal pagination helper surface.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-left snap helpers changes vertical-rl raw-left text snapping, left edge mask shrink/expand decisions, rendition navigation, location mapping, package contents, or generated build output.

### P-0219
- Why:
  - P-0218 moved edge-mask helpers out of `src/rendering/pagination.ts`.
  - `src/rendering/pagination.ts` still mixed raw-right snap helper contracts with raw-left snap, clean-page edge-mask, structural edge-mask, and boundary helpers.
  - Moving raw-right required-mask, rect input, target selection, clear decisions, rect shift, and aggregate helpers into `src/rendering/raw-right-snap.ts` continues the rendering architecture split while preserving the existing `src/rendering/pagination.ts` import surface for managers and tests.
  - Because these helpers feed vertical-rl raw-right text snapping, edge mask shrink/expand decisions, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/raw-right-snap.ts`: add raw-right snap types and helper functions for required masks, rect inputs, mask targets, clear decisions, rect shifts, and shift aggregation.
  - `src/rendering/pagination.ts`: re-export raw-right helpers and types to preserve the internal pagination helper surface.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-right snap helpers changes vertical-rl raw-right text snapping, edge mask shrink/expand decisions, rendition navigation, location mapping, package contents, or generated build output.

### P-0218
- Why:
  - P-0216 and P-0217 started the rendering split by moving page metrics and logical page helpers out of `src/rendering/pagination.ts`.
  - `src/rendering/pagination.ts` still mixed edge-mask input/width helpers with raw-left and raw-right rect-snap helpers.
  - Moving the edge-mask input, rendered-width, and snapped mask-width helpers into `src/rendering/edge-mask.ts` continues the rendering architecture split while preserving the existing `src/rendering/pagination.ts` import surface for managers and tests.
  - Because these helpers feed vertical-rl edge mask sizing, previous-page overlap masks, snapped mask widths, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/edge-mask.ts`: add edge-mask limit, structural gutter detection, previous-page right mask, snap input, rendered width, width aggregation, snap viewport input, and snapped mask-width helpers.
  - `src/rendering/pagination.ts`: import `getVerticalRlEdgeMaskLimit` for remaining clean/structural helpers and re-export edge-mask helpers to preserve the internal pagination helper surface.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving edge-mask helpers changes vertical-rl edge mask sizing, previous-page overlap masks, snapped mask widths, rendition navigation, location mapping, package contents, or generated build output.

### P-0217
- Why:
  - P-0216 started the rendering split by moving page metrics helpers out of `src/rendering/pagination.ts`.
  - `src/rendering/pagination.ts` still mixed logical page offset/cache helpers with edge-mask and rect-snap helpers.
  - Moving logical page helpers into `src/rendering/logical-page.ts` continues the rendering architecture split while preserving the existing `src/rendering/pagination.ts` import surface for managers and tests.
  - Because these helpers feed vertical-rl logical page step calculation, offset caching, current page detection, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/logical-page.ts`: add logical page step, cache key, cache read/write, logical offset, and current page index helpers.
  - `src/rendering/pagination.ts`: re-export logical page helpers and type to preserve the internal pagination helper surface.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving logical page helpers changes vertical-rl page stepping, offset caching, current page detection, rendition navigation, location mapping, package contents, or generated build output.

### P-0216
- Why:
  - P-0215 locked the internal rendering pagination helper boundary.
  - `src/rendering/pagination.ts` still mixed page count/snap tolerance/page boundary helpers with edge-mask and rect-snap helpers.
  - Moving the page metrics helpers into `src/rendering/page-metrics.ts` starts the rendering architecture split while preserving the existing `src/rendering/pagination.ts` import surface for managers and tests.
  - Because these helpers feed vertical-rl page counting, snap tolerance, page boundary shifts, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/page-metrics.ts`: add page metrics helpers for page count, snap tolerance, page boundary shift, and structural page gutter detection.
  - `src/rendering/pagination.ts`: re-export page metrics helpers to preserve the internal pagination helper surface.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving page metrics helpers changes vertical-rl page counting, snap tolerance, page boundary shifts, rendition navigation, location mapping, package contents, or generated build output.

### P-0215
- Why:
  - P-0214 protected public declaration files from internal rendering pagination snap helper leakage.
  - The boundary still needed an explicit internal-only import smoke so default managers can depend on `src/rendering/pagination.ts` while package root entries cannot.
  - This keeps rendering helpers available for internal architecture extraction without widening the package entry or public API surface.
  - Because this contract guards package surface stability around vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping helpers, validation covers the internal boundary verifier, focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `scripts/verify-internal-boundaries.mjs`: require `src/managers/default/index.ts` and `lib/managers/default/index.js` to import internal rendering pagination helpers.
  - `scripts/verify-internal-boundaries.mjs`: forbid package root entries from importing internal rendering pagination helpers.
- Test:
  - `npm run verify:internal-boundaries`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if the internal-only rendering pagination import smoke blocks an intentional package entry change, generated lib output, package contents, or TypeScript compatibility.

### P-0214
- Why:
  - P-0213 named the internal raw-left and raw-right snap input helper shapes.
  - Those helper shapes should remain internal rendering pagination contracts and must not leak into the packaged public declaration surface.
  - Extending the internal boundary verifier protects the typed public API while allowing `src/rendering/pagination.ts` to continue gaining clearer internal TypeScript shapes.
  - Because this contract guards package surface stability around vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping helpers, validation covers the internal boundary verifier, focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `scripts/verify-internal-boundaries.mjs`: scan packaged declaration files for internal rendering pagination snap helper names.
  - `scripts/verify-internal-boundaries.mjs`: fail if `rendering/pagination` or raw-left/raw-right snap helper/type names appear in public declaration files.
- Test:
  - `npm run verify:internal-boundaries`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if the public declaration boundary contract blocks intentional public API additions, package contents, generated build output, or TypeScript compatibility.

### P-0213
- Why:
  - P-0212 named the raw-right snap result and aggregate shapes.
  - The raw-left and raw-right snap input helpers still returned anonymous object shapes even though managers destructure those values as an internal rendering contract.
  - Naming both input shapes keeps the left/right vertical-rl snap helper surface symmetrical and easier to evolve without changing runtime behavior or package entry points.
  - Because these shapes feed vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `VerticalRlRawRightSnapRectInput` and `VerticalRlRawLeftSnapRectInput` interfaces.
  - `src/rendering/pagination.ts`: use the named interfaces in raw-left and raw-right snap input helper signatures.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if naming snap input helper shapes changes TypeScript compatibility, vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0212
- Why:
  - P-0211 completed the left/right per-rect snap aggregation extraction.
  - The raw-right snap helpers still repeated anonymous object shapes for rect shift results and aggregate state.
  - Naming these TypeScript shapes makes the internal rendering pagination surface easier to evolve without changing runtime behavior or package entry points.
  - Because these shapes feed vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `VerticalRlRawRightSnapRectShift` and `VerticalRlRawRightSnapShiftAggregate` interfaces.
  - `src/rendering/pagination.ts`: use the named interfaces in raw-right snap shift helper signatures.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if naming raw-right snap helper shapes changes TypeScript compatibility, vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0211
- Why:
  - P-0210 moved raw-right per-rect shift aggregation into `src/rendering/pagination.ts`.
  - `snapLeft()` still owned the matching pure signed aggregation rule that chooses the largest positive shift, smallest negative shift, and preserves zero-shift state across rects.
  - Moving that aggregation rule into `src/rendering/pagination.ts` keeps left-edge snap policy decisions near rendering helpers while preserving manager ownership of DOM rect collection, final mask application, and iteration control.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawLeftSnapShiftAggregate()`.
  - `src/managers/default/index.ts`: delegate raw-left per-rect signed shift aggregation inside `snapLeft()`.
  - `test/browser/rendering-pagination.test.js`: cover positive aggregation, negative aggregation, and zero-shift no-op behavior.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-left per-rect signed shift aggregation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0210
- Why:
  - P-0209 moved raw-right per-rect input derivation and target selection into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure aggregation rule that chooses the largest expand shift, smallest shrink shift, and paint-guard expansion flag across rects.
  - Moving that aggregation rule into `src/rendering/pagination.ts` keeps right-edge snap policy decisions together while preserving manager ownership of DOM rect collection, final mask application, and iteration control.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawRightSnapShiftAggregate()`.
  - `src/managers/default/index.ts`: delegate raw-right per-rect shift aggregation inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover expand aggregation, shrink aggregation, paint-guard preservation, and zero-shift no-op behavior.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-right per-rect shift aggregation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0209
- Why:
  - P-0208 moved required raw-right mask scanning into `src/rendering/pagination.ts`.
  - `snapRight()` still separately built raw-right per-rect input before selecting per-rect shifts.
  - Moving that input-plus-shift wrapper into `src/rendering/pagination.ts` keeps right-edge geometry pipeline decisions together while preserving manager ownership of DOM rect collection and shift aggregation.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawRightSnapRectShiftForRect()`.
  - `src/managers/default/index.ts`: delegate raw-right per-rect input derivation and target selection inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover wrapper deep expand and clipped shrink paths.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-right input derivation and per-rect target selection changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0208
- Why:
  - P-0207 moved raw-right per-rect target selection into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure required raw-right mask scan across collected rects before selecting per-rect shifts.
  - Moving that required-mask scan into `src/rendering/pagination.ts` keeps right-edge mask geometry decisions near rendering helpers while preserving manager ownership of DOM rect collection and expand/shrink aggregation.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRequiredRawRightMaskForRects()`.
  - `src/managers/default/index.ts`: delegate required raw-right mask scanning inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover multi-rect aggregation, initial required mask preservation, and empty rect collections.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving required raw-right mask scanning changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0207
- Why:
  - P-0206 completed the left-edge per-rect snap target selection extraction.
  - `snapRight()` still coordinated the matching right-edge per-rect target selection order across previous-left clipping, just-outside raw-right masks, shallow straddlers, mask clearing, deep straddler expansion, and boundary crossing.
  - Moving that per-rect target selection into `src/rendering/pagination.ts` keeps right-edge snap decisions near rendering helpers while preserving manager ownership of required-mask scanning, DOM rect collection, and expand/shrink aggregation.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawRightSnapRectShift()`.
  - `src/managers/default/index.ts`: delegate raw-right per-rect target selection inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover previous-left clipped shrink, just-outside expand, shallow straddler expand, mask clearing shrink, deep straddler expand beyond paint guard, and boundary crossing fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-right per-rect target selection changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0206
- Why:
  - P-0205 moved the last raw-left next-page visible expand target into `src/rendering/pagination.ts`.
  - `snapLeft()` still coordinated the per-rect target selection order across boundary-crossing, covered shrink, and visible expand targets.
  - Moving that signed per-rect target selection into `src/rendering/pagination.ts` completes the left-edge snap target extraction while preserving manager ownership of DOM rect collection and shift aggregation.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawLeftSnapRectShift()`.
  - `src/managers/default/index.ts`: delegate raw-left per-rect signed shift selection inside `snapLeft()`.
  - `test/browser/rendering-pagination.test.js`: cover boundary-crossing priority, covered shrink fallback, visible expand fallback, and zero-mask raw-left straddler skip.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-left per-rect signed shift selection changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0205
- Why:
  - P-0204 moved raw-left covered shrink target calculation into `src/rendering/pagination.ts`.
  - `snapLeft()` still owned the pure next-page visible expand target calculation for rects just beyond the current left edge-mask boundary.
  - Moving that expand policy into `src/rendering/pagination.ts` completes the small left-edge per-rect snap target extraction while preserving manager ownership of DOM rect collection, branch ordering, and shift aggregation.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawLeftVisibleExpandShift()`.
  - `src/managers/default/index.ts`: delegate raw-left next-page visible expand target calculation inside `snapLeft()`.
  - `test/browser/rendering-pagination.test.js`: cover visible expand shifts, tolerance guard, next-page visibility guard, and no-op targets.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-left next-page visible expand target calculation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0204
- Why:
  - P-0203 moved raw-left boundary-crossing signed shift calculation into `src/rendering/pagination.ts`.
  - `snapLeft()` still owned the pure covered raw-left shrink target calculation for rects already inside the current left edge mask.
  - Moving that shrink policy into `src/rendering/pagination.ts` keeps left-edge mask geometry decisions near rendering helpers while preserving manager ownership of DOM rect collection, branch ordering, and shift aggregation.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawLeftCoveredShrinkShift()`.
  - `src/managers/default/index.ts`: delegate raw-left covered shrink target calculation inside `snapLeft()`.
  - `test/browser/rendering-pagination.test.js`: cover covered shrink targets, raw-left clamping, no-op targets, forced mask protection, next-page visibility guards, and unclipped raw-left straddlers.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-left covered shrink target calculation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0203
- Why:
  - P-0202 moved raw-left snap per-rect input derivation into `src/rendering/pagination.ts`.
  - `snapLeft()` still owned the pure boundary-crossing expand/shrink signed shift calculation for rects that cross the current left edge-mask boundary.
  - Moving that target calculation into `src/rendering/pagination.ts` keeps left-edge mask geometry decisions near rendering helpers while preserving manager ownership of DOM rect collection, branch ordering, and shift aggregation.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawLeftBoundaryCrossingShift()`.
  - `src/managers/default/index.ts`: delegate raw-left boundary-crossing signed shift calculation inside `snapLeft()`.
  - `test/browser/rendering-pagination.test.js`: cover next-page visible expand shifts, clipped next-page shrink shifts, shrink-underflow fallback expansion, and non-crossing rects.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-left boundary-crossing signed shift calculation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0202
- Why:
  - P-0201 moved raw-right snap per-rect input derivation into `src/rendering/pagination.ts`.
  - `snapLeft()` still recomputed the matching raw-left per-rect geometry inputs inline before deciding whether to skip, expand, or shrink the left edge mask.
  - Moving `rawLeftStraddler`, `hasNextPage`, `clippedAtNextRight`, `visibleAtNextRight`, and `nearlyVisibleAtNextRight` input derivation into `src/rendering/pagination.ts` keeps raw-left snap geometry near rendering helpers while preserving manager ownership of DOM rect collection, branch ordering, and expand/shrink application.
  - Because these inputs feed vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawLeftSnapRectInput()`.
  - `src/managers/default/index.ts`: delegate raw-left snap per-rect input derivation inside `snapLeft()`.
  - `test/browser/rendering-pagination.test.js`: cover raw-left straddlers clipped at next-right, next-page visible rects, no-next-page fallback, and tolerance-near next-page rects.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-left snap per-rect input derivation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0201
- Why:
  - P-0200 moved boundary-crossing expand target calculation into `src/rendering/pagination.ts`.
  - `snapRight()` still recomputed the same per-rect raw-right geometry inputs inline before delegating to the right-edge mask helpers.
  - Moving `clippedAtPreviousLeft`, `rawRightStraddler`, `rawRightOverhang`, and `visibleInsideRawRight` input derivation into `src/rendering/pagination.ts` keeps raw-right snap geometry near rendering helpers while preserving manager ownership of DOM rect collection, branch ordering, and expand/shrink application.
  - Because these inputs feed vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRawRightSnapRectInput()`.
  - `src/managers/default/index.ts`: delegate raw-right snap per-rect input derivation inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover raw-right straddlers, previous-left clipping, raw-left visible text clamping, and non-straddlers.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-right snap per-rect input derivation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0200
- Why:
  - P-0199 moved deep raw-right straddler expand target calculation into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure boundary-crossing expand target calculation for rects that cross the current right edge-mask boundary.
  - Moving that boundary-crossing target into `src/rendering/pagination.ts` keeps right-edge mask geometry decisions near rendering helpers while preserving manager ownership of DOM rect collection, branch ordering, and expand aggregation.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlBoundaryCrossingExpandTarget()`.
  - `src/managers/default/index.ts`: delegate boundary-crossing expand target calculation inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover boundary-crossing targets and non-crossing rects.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving boundary-crossing expand target calculation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0199
- Why:
  - P-0198 moved covered raw-right straddler right-mask clearing policy into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure target calculation for expanding the right edge mask when a deeper raw-right straddler exposes visible text beyond edge tolerance.
  - Moving that deep raw-right straddler expand target into `src/rendering/pagination.ts` keeps right-edge mask decisions near rendering helpers while preserving manager ownership of DOM rect collection, `canExpandClippedRawRight`, branch ordering, and expand application.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlDeepRawRightStraddlerExpandTarget()`.
  - `src/managers/default/index.ts`: delegate deep raw-right straddler expand target calculation inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover deep straddler targets, non-straddlers, and edge-tolerance guard.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving deep raw-right straddler expand target calculation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0198
- Why:
  - P-0197 moved shallow raw-right straddler right-mask clearing policy into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure boolean policy for clearing an existing right mask when a deeper raw-right straddler is already covered by both the current right mask and right-mask limit, and there is no protective required mask/next step.
  - Moving that covered raw-right straddler clearing policy into `src/rendering/pagination.ts` keeps right-edge mask decisions near rendering helpers while preserving manager ownership of DOM rect collection, branch ordering, and shrink application.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `shouldClearVerticalRlCoveredRawRightStraddlerMask()`.
  - `src/managers/default/index.ts`: delegate covered raw-right straddler right-mask clearing policy inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover covered-mask clearing, non-straddlers, edge-tolerance guard, insufficient masks, and required-mask/next-step protection.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving covered raw-right straddler right-mask clearing policy changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0197
- Why:
  - P-0196 moved shallow raw-right straddler target calculation into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure boolean policy for clearing an existing right mask when a raw-right straddler has only shallow overhang or when the current right mask consumes visible edge text without a protective required mask/next step.
  - Moving that right-mask clearing policy into `src/rendering/pagination.ts` keeps right-edge mask decisions near rendering helpers while preserving manager ownership of DOM rect collection, branch ordering, and shrink application.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `shouldClearVerticalRlRawRightStraddlerMask()`.
  - `src/managers/default/index.ts`: delegate raw-right straddler right-mask clearing policy inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover shallow overhangs, visible-edge mask consumption, required-mask/next-step protection, and non-straddlers.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-right straddler right-mask clearing policy changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0196
- Why:
  - P-0195 moved just-outside raw-right target calculation into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure target-mask calculation for shallow raw-right straddlers whose visible inside width is within edge tolerance.
  - Moving that shallow raw-right straddler target policy into `src/rendering/pagination.ts` keeps right-edge mask decisions near rendering helpers and guards the calculation against accidental use for non-straddlers or deeper visible text.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlShallowRawRightStraddlerMaskTarget()`.
  - `src/managers/default/index.ts`: delegate shallow raw-right straddler target right-mask calculation inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover shallow straddler targets, non-straddlers, and beyond-tolerance visible text.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving shallow raw-right straddler target calculation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0195
- Why:
  - P-0194 moved previous-left clipped right-mask target calculation into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure target-mask calculation for rects that start just outside the raw-right boundary.
  - Moving that just-outside raw-right target policy into `src/rendering/pagination.ts` keeps right-edge mask decisions near rendering helpers and guards the calculation against accidental use for rects inside raw-right or beyond tolerance.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlJustOutsideRawRightMaskTarget()`.
  - `src/managers/default/index.ts`: delegate just-outside raw-right target right-mask calculation inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover boundary, tolerance-inside, tolerance-outside, and before-boundary cases.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving just-outside raw-right target calculation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0194
- Why:
  - P-0193 moved raw-right proximity detection into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure target-mask calculation for text rects clipped at the previous page's left boundary.
  - Moving that previous-left clipped target calculation into `src/rendering/pagination.ts` keeps right-edge mask policy near the rendering helpers while preserving manager ownership of DOM rect collection and branch ordering.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlPreviousLeftClippedRightMaskTarget()`.
  - `src/managers/default/index.ts`: delegate previous-left clipped target right-mask calculation inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover clipped width targets, required raw-right mask preservation, and clamping when rects pass raw-right.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving previous-left clipped right-mask target calculation changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0193
- Why:
  - P-0192 moved right-mask visible-edge consumption detection into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure boolean policy for detecting a rect that starts just outside the raw-right boundary within edge tolerance.
  - Moving that raw-right boundary proximity policy into `src/rendering/pagination.ts` keeps right-edge mask decisions near the rendering helpers while preserving manager ownership of DOM rect collection and branch ordering.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `isVerticalRlRectJustOutsideRawRight()`.
  - `src/managers/default/index.ts`: delegate raw-right proximity detection inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover raw-right boundary, tolerance-inside, tolerance-outside, and before-boundary cases.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving raw-right proximity detection changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0192
- Why:
  - P-0191 moved the per-rect required raw-right mask selection into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure boolean policy for detecting when an existing right mask consumes visible raw-right text: raw-right straddler status, current right mask, visible inside width, right mask limit, and edge tolerance.
  - Moving that boolean policy into `src/rendering/pagination.ts` keeps right-edge mask decisions near the rendering helpers while preserving manager ownership of DOM rect collection and branch ordering.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `hasVerticalRlRightEdgeMaskConsumingVisibleEdge()`.
  - `src/managers/default/index.ts`: delegate right-mask visible-edge consumption detection inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover positive detection, non-straddlers, already-covered visible text, and beyond-tolerance visible text.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving right-mask visible-edge consumption detection changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0191
- Why:
  - P-0189 and P-0190 moved vertical-rl left/right edge-mask shift application into `src/rendering/pagination.ts`.
  - `snapRight()` still owned the pure per-rect policy for deciding whether a raw-right straddler requires a raw-right mask before applying the right shift: previous-page clipping, visible exposure, overhang depth, tolerance guard, and max aggregation.
  - Moving that per-rect required raw-right mask policy into `src/rendering/pagination.ts` keeps edge-mask snap policy near the rendering helpers while preserving manager ownership of DOM rect collection and iteration.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRequiredRawRightMask()`.
  - `src/managers/default/index.ts`: delegate per-rect required raw-right mask selection inside `snapRight()`.
  - `test/browser/rendering-pagination.test.js`: cover deep right straddlers, existing max preservation, non-straddlers, previous-page clipping, shallow overhangs, and tolerance-only exposure.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving required raw-right mask selection changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0190
- Why:
  - P-0189 moved vertical-rl right edge-mask shift application into `src/rendering/pagination.ts`, leaving the matching left edge-mask shift clamp in `DefaultViewManager`.
  - `snapLeft()` still owned the pure policy for applying a calculated left-mask shift: expansion clamped to `leftMaxMask`, shrink clamped to zero, and no-shift fallback.
  - Moving that left-mask shift application into `src/rendering/pagination.ts` keeps left/right edge-mask snap policy together while preserving manager ownership of DOM rect collection and text-boundary decisions.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlSnappedLeftEdgeMask()`.
  - `src/managers/default/index.ts`: delegate left edge-mask shift application while preserving `snapLeft()` decision inputs.
  - `test/browser/rendering-pagination.test.js`: cover left-mask expansion, mask-limit clamping, shrink behavior, and no-shift fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving left edge-mask shift application changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0189
- Why:
  - P-0188 moved vertical-rl edge-mask snap viewport input normalization into `src/rendering/pagination.ts`, leaving the DOM/text snap walkers in `DefaultViewManager`.
  - `snapRight()` still owned the pure policy for applying a calculated right-mask shift: paint-guard-limited expansion, expansion beyond the paint guard, mask-limit clamping, shrink clamping, and no-shift fallback.
  - Moving that right-mask shift application into `src/rendering/pagination.ts` keeps edge-mask snap policy near the rendering helpers while preserving manager ownership of DOM rect collection and text-boundary decisions.
  - Because this policy feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlSnappedRightEdgeMask()`.
  - `src/managers/default/index.ts`: delegate right edge-mask shift application while preserving `snapRight()` decision inputs.
  - `test/browser/rendering-pagination.test.js`: cover paint-guard expansion, beyond-paint-guard expansion, mask-limit clamping, shrink behavior, and no-shift fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving right edge-mask shift application changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0188
- Why:
  - P-0165 through P-0187 moved vertical-rl pagination page-grid, structural gutter, edge-mask limits, edge-mask snap inputs, previous-page right-mask calculation, structural/clean-page inputs, rect distance, cache-key, cache read/write helpers, rendered edge-mask merging, current effective left-boundary math, sequential right-boundary constraint selection, edge-mask max aggregation, next-page step selection, and rendered dataset fallback aggregation into the rendering pagination boundary.
  - `snapVerticalRlEdgeMaskWidths()` still owned the pure viewport input normalization before DOM text-rect collection: raw viewport edges, left/right mask clamping, page-step fallback, edge tolerance, structural edge guard, raw-right expansion eligibility, and right paint-guard limits.
  - Moving that normalization into `src/rendering/pagination.ts` keeps edge-mask snap policy near the rendering helpers while preserving manager ownership of DOM rect collection and the snap-left/snap-right text-boundary algorithm.
  - Because this input feeds vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, and location mapping, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlEdgeMaskSnapViewportInput()`.
  - `src/managers/default/index.ts`: delegate raw viewport and mask-limit normalization while preserving DOM traversal and snapping behavior.
  - `test/browser/rendering-pagination.test.js`: cover viewport-derived raw edges, limit overrides, page-step override/default behavior, edge-guard tolerance, and raw-right expansion eligibility.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving edge-mask snap viewport input normalization changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0187
- Why:
  - P-0185 moved vertical-rl left/right edge-mask max aggregation into `src/rendering/pagination.ts`, and P-0186 continued moving page-step policy into the rendering pagination boundary.
  - `syncVerticalRlViewportClip()` still duplicated the same max aggregation when writing the rendered `data-epub-vrl-edge-mask` fallback consumed by rendered mask merging.
  - Reusing `getVerticalRlEdgeMaskWidth()` keeps rendered dataset fallback policy aligned with the shared edge-mask helper while preserving manager ownership of overlay positioning and dataset writes.
  - Because this fallback feeds rendered mask merging on subsequent boundary calculations, validation covers focused helper/manager tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/managers/default/index.ts`: use `getVerticalRlEdgeMaskWidth()` for rendered dataset fallback max aggregation.
  - `test/browser/vertical-rl-manager.test.js`: assert the rendered fallback dataset stores the left/right max value.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if using the shared edge-mask max helper changes vertical-rl viewport clipping, rendered mask fallback values, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0186
- Why:
  - P-0165 through P-0185 moved vertical-rl pagination page-grid, structural gutter, edge-mask limits, edge-mask snap inputs, previous-page right-mask calculation, structural/clean-page inputs, rect distance, cache-key, cache read/write helpers, rendered edge-mask merging, current effective left-boundary math, sequential right-boundary constraint selection, and edge-mask max aggregation into the rendering pagination boundary.
  - DefaultViewManager still owned the pure next-page logical step fallback rule: measured offset step, final-page structural gutter clamp, and page-advance fallback.
  - Moving this step rule into `src/rendering/pagination.ts` keeps vertical-rl page-step policy near the shared pagination helpers while preserving manager ownership of page index and offset reads.
  - Because this value feeds edge-mask text snapping and next-page boundary behavior, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlLogicalPageStepToNextPage()`.
  - `src/managers/default/index.ts`: delegate logical next-page step selection while preserving page index and offset reads.
  - `test/browser/rendering-pagination.test.js`: cover measured steps, final structural-gutter clamping, oversized non-structural steps, and page-advance fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving logical next-page step selection changes vertical-rl text snapping, edge-mask rendering, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0185
- Why:
  - P-0165 through P-0184 moved vertical-rl pagination page-grid, structural gutter, edge-mask limits, edge-mask snap inputs, previous-page right-mask calculation, structural/clean-page inputs, rect distance, cache-key, cache read/write helpers, rendered edge-mask merging, current effective left-boundary math, and sequential right-boundary constraint selection into the rendering pagination boundary.
  - DefaultViewManager still owned the pure aggregation rule that turns left/right edge masks into one effective edge-mask width.
  - Moving this max-width aggregation into `src/rendering/pagination.ts` keeps edge-mask policy near the shared pagination helpers while preserving manager ownership of computed mask collection.
  - Because this value feeds edge-mask rendering and viewport clipping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlEdgeMaskWidth()`.
  - `src/managers/default/index.ts`: delegate left/right edge-mask max aggregation.
  - `test/browser/rendering-pagination.test.js`: cover max aggregation and invalid-width fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving edge-mask max aggregation changes vertical-rl edge-mask rendering, viewport clipping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0184
- Why:
  - P-0165 through P-0183 moved vertical-rl pagination page-grid, structural gutter, edge-mask limits, edge-mask snap inputs, previous-page right-mask calculation, structural/clean-page inputs, rect distance, cache-key, cache read/write helpers, rendered edge-mask merging, and current effective left-boundary math into the rendering pagination boundary.
  - DefaultViewManager still owned the pure sequential right-boundary constraint selection for forced boundaries, drifted offsets, and clean-page left masks inside `scrollToLogicalPage()`.
  - Moving that constraint selection into `src/rendering/pagination.ts` keeps sequential boundary policy near the shared pagination helpers while preserving manager ownership of target/current page guards and DOM/view measurements.
  - Because this constraint feeds vertical-rl text-boundary snapping and sequential navigation, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlSequentialRightBoundaryConstraint()`.
  - `src/managers/default/index.ts`: delegate sequential right-boundary constraint selection while preserving page guards and measurement reads.
  - `test/browser/rendering-pagination.test.js`: cover forced boundary constraints, drifted-offset constraints, clean-page left-mask constraints, and null fallbacks.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving sequential right-boundary constraint selection changes vertical-rl next-page snapping, forced boundary behavior, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0183
- Why:
  - P-0165 through P-0182 moved vertical-rl pagination page-grid, structural gutter, edge-mask limits, edge-mask snap inputs, previous-page right-mask calculation, structural/clean-page inputs, rect distance, cache-key, cache read/write helpers, and rendered edge-mask merging into the rendering pagination boundary.
  - DefaultViewManager still owned the pure current effective left-boundary calculation used when advancing sequential vertical-rl pages.
  - Moving the current effective left-boundary calculation into `src/rendering/pagination.ts` keeps boundary math near the shared pagination helpers while preserving manager ownership of DOM/view measurements and rendered mask lookup.
  - Because this boundary feeds sequential navigation, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlCurrentEffectiveLeftBoundary()`.
  - `src/managers/default/index.ts`: delegate effective left-boundary math while preserving view/content/offset/mask reads.
  - `test/browser/rendering-pagination.test.js`: cover positive boundary calculation, current left-mask contribution, exhausted boundary, and invalid offset fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving current effective left-boundary math changes sequential vertical-rl next-page navigation, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0182
- Why:
  - P-0165 through P-0181 moved vertical-rl pagination page-grid, structural gutter, edge-mask limit, edge-mask snap inputs, previous-page right-mask calculation, structural/clean-page inputs, rect distance, cache-key, and cache read/write helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure merge rule between computed edge-mask widths and rendered dataset mask widths.
  - Moving rendered edge-mask width merging into `src/rendering/pagination.ts` keeps vertical-rl edge-mask policy near the shared pagination helpers while preserving manager ownership of dataset access.
  - Because rendered mask widths feed effective boundaries, scroll snapping, and location stability, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getRenderedVerticalRlEdgeMaskWidths()`.
  - `src/managers/default/index.ts`: delegate computed/rendered mask merging while preserving dataset reads.
  - `test/browser/rendering-pagination.test.js`: cover computed/rendered max merging, fallback rendered mask use, and invalid rendered mask fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving rendered edge-mask width merging changes effective boundaries, edge-mask rendering, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0181
- Why:
  - P-0165 through P-0180 moved vertical-rl pagination page-grid, structural gutter, edge-mask limit, structural-gutter predicate, previous-page right-mask calculation, fallback input, clean-page input, previous-page input, structural input, rect distance, cache-key, and cache read/write helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure structural-gutter snap input shape for the main vertical-rl edge-mask path: left-mask clamp, next-page step passthrough, and right-mask cap.
  - Moving structural-gutter edge-mask snap input preparation into `src/rendering/pagination.ts` keeps vertical-rl edge-mask policy near the shared pagination helpers while preserving manager ownership of structural-gutter detection and final edge-mask snapping.
  - Because this input feeds the structural-gutter snap branch, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlStructuralGutterEdgeMaskSnapInput()`.
  - `src/managers/default/index.ts`: delegate structural-gutter edge-mask snap input preparation while preserving the branch predicate and `snapVerticalRlEdgeMaskWidths()`.
  - `test/browser/rendering-pagination.test.js`: cover structural-gutter input shape, left-mask clamp, and invalid max-mask fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving structural-gutter edge-mask snap input preparation changes structural-gutter snapping, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0180
- Why:
  - P-0165 through P-0179 moved vertical-rl pagination page-grid, structural gutter, edge-mask limit, structural-gutter predicate, previous-page right-mask calculation, clean-page input, previous-page input, structural input, rect distance, cache-key, and cache read/write helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure fallback edge-mask snap input shape for the main vertical-rl edge-mask path: left/right mask clamping, previous-page step passthrough, and right-mask cap.
  - Moving fallback edge-mask snap input preparation into `src/rendering/pagination.ts` keeps vertical-rl edge-mask policy near the shared pagination helpers while preserving manager ownership of previous left-mask lookup and final edge-mask snapping.
  - Because this input feeds vertical-rl edge-mask snapping, current page stability, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlEdgeMaskSnapInput()`.
  - `src/managers/default/index.ts`: delegate fallback edge-mask snap input preparation while preserving previous-page state and `snapVerticalRlEdgeMaskWidths()`.
  - `test/browser/rendering-pagination.test.js`: cover fallback input shape, invalid max-mask fallback, and left/right mask clamping.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving fallback edge-mask snap input preparation changes right-edge overlap correction, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0179
- Why:
  - P-0165 through P-0178 moved vertical-rl pagination page-grid, structural gutter, edge-mask limit, structural-gutter predicate, clean-page input, previous-page input, structural input, rect distance, cache-key, and cache read/write helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure previous-page overlap calculation that turns visible bleed, previous-page step, and previous left mask into the right edge mask.
  - Moving previous-page right-mask calculation into `src/rendering/pagination.ts` keeps vertical-rl edge-mask policy near the shared pagination helpers while preserving manager ownership of previous left-mask snapping and final edge-mask snapping.
  - Because this right mask feeds vertical-rl edge-mask snapping, current page stability, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlPreviousPageRightMask()`.
  - `src/managers/default/index.ts`: delegate previous-page overlap-to-right-mask calculation while preserving previous left-mask lookup and final snap inputs.
  - `test/browser/rendering-pagination.test.js`: cover overlap conversion, max-mask clamping, no-overlap fallback, and invalid measurement fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving previous-page right-mask calculation changes right-edge overlap correction, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0178
- Why:
  - P-0165 through P-0177 moved vertical-rl pagination page-grid, structural gutter, edge-mask limit, clean-page input, previous-page input, structural input, rect distance, cache-key, and cache read/write helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure structural-gutter predicate for the main vertical-rl edge-mask path: visible bleed alignment, boundary-shift guard, and previous-page step grid alignment.
  - Moving the main edge-mask structural-gutter predicate into `src/rendering/pagination.ts` keeps vertical-rl edge-mask policy near the shared pagination helpers while preserving manager ownership of previous-page offset collection and snapping.
  - Because this predicate selects the structural-gutter snap path, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `hasVerticalRlEdgeMaskStructuralGutter()`.
  - `src/managers/default/index.ts`: delegate the main edge-mask structural-gutter predicate while preserving existing snap inputs.
  - `test/browser/rendering-pagination.test.js`: cover structural-gutter detection, boundary-shift disablement, previous-step drift disablement, and invalid measurement fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving the main vertical-rl edge-mask structural-gutter predicate changes structural-gutter snapping, previous-page alignment, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0177
- Why:
  - P-0165 through P-0176 moved vertical-rl pagination page-grid, structural gutter, edge-mask limit, clean-page input, structural input, rect distance, cache-key, and cache read/write helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure previous-page left-mask snap input rules: previous-page raw viewport boundaries, left-mask clamping, next-page step, and right-mask cap.
  - Moving previous-page left-mask snap input preparation into `src/rendering/pagination.ts` keeps vertical-rl edge-mask policy near the shared pagination helpers while preserving manager ownership of DOM measurement and text snapping.
  - Because this input feeds vertical-rl right-edge overlap correction, boundary snapping, current page stability, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getPreviousVerticalRlLeftMaskInput()`.
  - `src/managers/default/index.ts`: delegate previous-page left-mask snap input preparation while keeping container/iframe rect collection and `snapVerticalRlEdgeMaskWidths()` in the manager.
  - `test/browser/rendering-pagination.test.js`: cover previous-page raw viewport boundaries, invalid/null fallback, and left-mask clamping.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving previous-page left-mask snap input preparation changes right-edge overlap correction, previous-page snapping, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0176
- Why:
  - P-0165 through P-0175 moved vertical-rl pagination page-grid, structural gutter, edge-mask limit, edge-mask input, rect distance, cache-key, and cache read/write helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure clean-page edge-mask snap input rules: previous-page step fallback, raw-left forcing for sequential boundary pages or offset drift, and penultimate-page raw-left allowance.
  - Moving clean-page snap input preparation into `src/rendering/pagination.ts` keeps vertical-rl edge-mask policy near the shared pagination helpers while preserving manager ownership of DOM measurement, scroll state, and text snapping.
  - Because this input feeds vertical-rl clean-page edge masks, boundary snapping, current page stability, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlCleanPageEdgeMaskInput()`.
  - `src/managers/default/index.ts`: delegate clean-page edge-mask snap input preparation while keeping existing early returns, offset collection, and `snapVerticalRlEdgeMaskWidths()` call in the manager.
  - `test/browser/rendering-pagination.test.js`: cover clean-page snap input shape, invalid/null fallback, sequential boundary and offset-drift raw-left forcing, and penultimate-page raw-left allowance.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving clean-page edge-mask snap input preparation changes clean-page masks, raw-left forcing, penultimate-page snapping, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0175
- Why:
  - P-0165 through P-0174 moved vertical-rl pagination page-grid, structural gutter, edge-mask input, rect distance, cache-key, and cache read/write helpers into the rendering pagination boundary.
  - DefaultViewManager still repeated the pure quarter-page vertical-rl edge-mask limit calculation in clean-page, structural-gutter, and visible-line expansion paths.
  - Moving the edge-mask limit helper into `src/rendering/pagination.ts` keeps the shared max-mask rule with the rest of the pagination helpers while preserving manager control of DOM measurement and snapping.
  - Because this limit caps vertical-rl edge masks that feed page boundary snapping, current page stability, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlEdgeMaskLimit()` and reuse it in structural edge-mask input preparation.
  - `src/managers/default/index.ts`: delegate repeated quarter-page edge-mask limit calculations to the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover quarter-page flooring and invalid measurement clamp behavior.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving vertical-rl edge-mask limit calculation changes clean-page masks, structural gutter masks, visible-line mask expansion, boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0174
- Why:
  - P-0165 through P-0173 moved pagination page-grid, structural gutter, edge-mask input, rect distance, current-page, and cache-key helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure vertical-rl logical page-offset cache read/write rules: matching key, finite value checks, same-key writes, and key-change cache replacement.
  - Moving cache read/write rules into `src/rendering/pagination.ts` keeps vertical-rl pagination cache behavior with the page-grid helpers while preserving manager ownership of the cache field and method names.
  - Because this cache controls reuse of snapped vertical-rl offsets, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `VerticalRlLogicalPageOffsetCache`, `getCachedVerticalRlLogicalPageOffset()`, and `cacheVerticalRlLogicalPageOffset()`.
  - `src/managers/default/index.ts`: import and delegate the existing cache read/write methods to the rendering helpers while keeping `_verticalRlLogicalPageOffsetCache` on the manager.
  - `test/browser/rendering-pagination.test.js`: cover matching finite reads, key mismatch/null reads, same-key writes, key-change replacement, and invalid write no-ops.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving vertical-rl logical page-offset cache read/write rules changes snapped offset reuse, boundary snap retry, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0173
- Why:
  - P-0165 through P-0172 moved pagination page-grid, structural gutter, edge-mask input, rect distance, and current-page helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure vertical-rl logical page-offset cache-key formatting used by scrollToLogicalPage and boundary snap retry.
  - Moving cache-key formatting into `src/rendering/pagination.ts` keeps vertical-rl pagination cache identity with the page-grid helpers while preserving manager ownership of runtime state collection and cache storage.
  - Because this key controls reuse of vertical-rl snapped offsets, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlLogicalPageOffsetCacheKey()`.
  - `src/managers/default/index.ts`: import and delegate cache-key rounding/formatting after collecting content width, visible width, page advance, and edge guard.
  - `test/browser/rendering-pagination.test.js`: cover rounded key formatting and null fallback when required measurements are missing.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving vertical-rl logical page-offset cache key formatting changes snapped offset reuse, boundary snap retry, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0172
- Why:
  - P-0165 through P-0171 moved pagination page-grid, structural gutter, edge-mask input, and current-page helpers into the rendering pagination boundary.
  - DefaultViewManager still owned the pure vertical-rl rectangle-to-logical-viewport distance helper used by edge-mask snapping and text-boundary snapping.
  - Moving the rectangle distance helper into `src/rendering/pagination.ts` keeps pure vertical-rl geometry helpers together while preserving the existing manager method as a delegate.
  - Because this helper feeds vertical-rl edge-mask snapping, text boundary snapping, current page stability, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlRectDistanceToLogicalViewport()`.
  - `src/managers/default/index.ts`: import and delegate the existing `getVerticalRlRectDistanceToLogicalViewport()` method to the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover rects before the logical viewport, after the logical viewport, and overlapping either edge or the viewport body.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving vertical-rl rectangle distance calculation changes edge-mask snapping, text boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0171
- Why:
  - P-0165 through P-0170 moved pagination page-grid, structural gutter, and current-page predicates into the rendering pagination boundary.
  - DefaultViewManager still owned the pure structural vertical-rl edge-mask input calculation before delegating to the larger snap algorithm.
  - Moving structural edge-mask input calculation into `src/rendering/pagination.ts` keeps gutter geometry and mask preparation together while leaving the actual DOM/text snapping algorithm in the manager.
  - Because this input feeds vertical-rl edge-mask snapping, text boundary snapping, current page stability, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getVerticalRlStructuralEdgeMaskInput()`.
  - `src/managers/default/index.ts`: import and delegate structural edge-mask raw boundary/max-mask/input calculation before calling the existing `snapVerticalRlEdgeMaskWidths()`.
  - `test/browser/rendering-pagination.test.js`: cover structural raw viewport boundaries, left mask cap, and invalid measurement fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving structural edge-mask input calculation changes vertical-rl edge-mask snapping, text boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0170
- Why:
  - P-0165 through P-0169 moved pagination page-count, snap tolerance, boundary shift, logical offset, and current-page math into the rendering pagination boundary.
  - DefaultViewManager still owned the pure structural vertical-rl gutter predicate used before edge-mask snapping.
  - Moving the structural-gutter predicate into `src/rendering/pagination.ts` keeps page-grid and gutter decisions together while preserving the existing manager method as a delegate.
  - Because this predicate affects vertical-rl structural edge masks, boundary snapping, current page stability, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `hasVerticalRlStructuralPageGutter()`.
  - `src/managers/default/index.ts`: import and delegate the existing `hasVerticalRlStructuralPageGutter()` method to the rendering helper after collecting manager state.
  - `test/browser/rendering-pagination.test.js`: cover enabled structural gutters, non-vertical disabling, insufficient bleed, active boundary shift, and invalid measurement fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving structural vertical-rl gutter detection changes edge-mask snapping, text boundary snapping, current page stability, rendition navigation, location mapping, package contents, or generated build output.

### P-0169
- Why:
  - P-0165 through P-0168 moved page-count, snap-tolerance, logical-offset, and current-page formulas into the rendering pagination boundary.
  - DefaultViewManager still owned the pure page-boundary shift clamp used by logical page offsets, current page detection, vertical-rl text boundary snapping, and snap retry behavior.
  - Moving page-boundary shift math into `src/rendering/pagination.ts` keeps vertical-rl page-grid formulas together while preserving the existing manager method as a delegate.
  - Because this helper affects vertical-rl page offsets, boundary-shifted current page detection, text boundary snapping, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getPageBoundaryShift()`.
  - `src/managers/default/index.ts`: import and delegate the existing `getPageBoundaryShift()` method to the rendering helper after collecting manager state.
  - `test/browser/rendering-pagination.test.js`: cover non-vertical disabling, vertical-rl shift usage, one-third-page cap, and invalid measurement fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving page-boundary shift calculation changes vertical-rl page offsets, current page detection, text boundary snapping, boundary snap retry, rendition navigation, location mapping, package contents, or generated build output.

### P-0168
- Why:
  - P-0165 through P-0167 moved page-count, snap-tolerance, and logical page-offset formulas into the rendering pagination boundary.
  - DefaultViewManager still owned the pure current-page index formula used by horizontal pagination, vertical-rl pagination, page-boundary snapping, restore offsets, and rendition location reporting.
  - Moving current-page index math into `src/rendering/pagination.ts` lets the manager collect runtime state while the rendering helper owns page-grid decisions.
  - Because this helper affects current page detection, vertical-rl end snapping, boundary-shifted page offsets, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getCurrentPageIndexForOffset()`.
  - `src/managers/default/index.ts`: import and delegate the existing `getCurrentPageIndex()` calculation to the rendering helper after collecting manager state.
  - `test/browser/rendering-pagination.test.js`: cover horizontal snap rounding, legacy fallback, clamping, invalid advance fallback, vertical-rl max-scroll snapping, and boundary-shifted nearest-page selection.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving current-page index calculation changes horizontal page rounding, vertical-rl page detection, max-scroll end snapping, boundary-shift handling, restore offset interpretation, rendition navigation, location mapping, package contents, or generated build output.

### P-0167
- Why:
  - P-0165 and P-0166 moved page-count and snap-tolerance formulas into the rendering pagination boundary.
  - DefaultViewManager still owned the pure logical page-grid offset formula used by vertical-rl page indexing, current-page detection, scrollToLogicalPage, and boundary snap retry.
  - Moving the logical-offset formula into `src/rendering/pagination.ts` keeps page-grid math in one rendering helper module while preserving the existing manager method as a delegate.
  - Because this helper affects vertical-rl pagination offsets, page-boundary snapping, current-page detection, rendition navigation, and location mapping, validation covers focused helper tests, rendering/manager neighbors, and the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getLogicalOffsetForPageIndex()`.
  - `src/managers/default/index.ts`: import and delegate the existing `getLogicalOffsetForPageIndex()` method to the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover page-grid offsets, range/max-scroll clamping, vertical-rl interior boundary shift, and horizontal non-shift behavior.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving logical page offset calculation changes DefaultViewManager vertical-rl page indexing, current-page detection, scrollToLogicalPage behavior, boundary snap retry, rendition navigation, location mapping, package contents, or generated build output.

### P-0166
- Why:
  - P-0165 created the rendering pagination boundary with page-count math.
  - DefaultViewManager still owned the pure page snap tolerance formula used by moveTo/current-page/snap-retry flows.
  - Moving snap tolerance math into `src/rendering/pagination.ts` keeps pagination formulas together while preserving the existing manager method as a delegate.
  - Because this helper affects pagination snapping and vertical-rl retry tolerance, validation covers manager, vertical-rl, rendition, contents, layout, location, mapping, page-list neighbors and full release.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `getPageSnapTolerance()`.
  - `src/managers/default/index.ts`: import and delegate the existing `getPageSnapTolerance()` method to the rendering helper.
  - `test/browser/rendering-pagination.test.js`: cover ordinary 8% tolerance, edge-guard dominance, quarter-page cap, and invalid advance fallback.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving snap tolerance changes DefaultViewManager moveTo/current-page detection, vertical-rl snap retry behavior, pagination snapping, package contents, or generated build output.

### P-0165
- Why:
  - P-0164 completed the source typed-surface pass, so the next F+ slice resumes the internal architecture split toward `core/rendering/platform/compat`.
  - DefaultViewManager still owned a pure page-count helper inside the large rendering manager even though the helper is generic pagination logic used by both horizontal and vertical-rl page calculations.
  - Extracting the helper into a small `rendering` boundary makes pagination ownership explicit while preserving the existing manager method as a compatibility/internal delegate.
  - This touches pagination math, so validation is raised to manager, vertical-rl, rendition, contents, layout, location, mapping, and page-list neighbors plus the full release gate.
- Diff Scope:
  - `src/rendering/pagination.ts`: add `countPagesWithFractionalTolerance()` as a pure rendering pagination helper.
  - `src/managers/default/index.ts`: import the helper and keep `countPagesWithFractionalTolerance()` as a delegating manager method to preserve the existing internal surface.
  - `test/browser/rendering-pagination.test.js`: add focused Browser Mode coverage for exact multiples, small fractional drift, drift beyond tolerance, and invalid measurements.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendering-pagination.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/layout.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if moving the page-count helper changes DefaultViewManager page counts, vertical-rl page calculation, location mapping, pagination behavior, package contents, or generated build output.

### P-0164
- Why:
  - P-0163 removed `@ts-nocheck` from Contents, leaving `src/managers/default/index.ts` as the final suppressed TypeScript source file.
  - DefaultViewManager is the highest-risk rendering boundary and owns stage/container setup, default view lifecycle, display/append/prepend, pre-paginated spread handling, scroll movement, current location mapping, layout/flow/axis updates, RTL horizontal paging, vertical-rl pagination, edge mask snapping, logical page offset caching, scroll listener cleanup, and teardown.
  - Because this slice touches pagination, scroll math, CFI/location reporting, rendition integration, views, contents measurement, and vertical-rl page-boundary helpers, validation is raised to manager-focused Browser Mode tests plus the full release gate.
  - Removing this final suppress completes the source-tree typed-surface pass: `tsc` now checks every TypeScript source file under `src/`.
- Diff Scope:
  - `src/managers/default/index.ts`: remove `@ts-nocheck`, add local edge-mask/snap/text-rect/boundary-snap shapes, type the event-emitter fields with `declare`, add a legacy `defer` constructor adapter, annotate manager lifecycle/navigation/layout/scroll/vertical-rl helpers, and keep casts limited to dynamic view/section/layout boundaries.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/book.test.js test/browser/epubcfi.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js test/browser/section.test.js test/browser/spine.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if removing the final suppress or adding local manager types changes stage/container setup, view lifecycle, display/append/prepend behavior, pre-paginated spread handling, scroll movement, current location mapping, layout/flow/axis updates, RTL horizontal paging, vertical-rl pagination, edge mask snapping, logical page offset caching, scroll listener cleanup, teardown, or compiled event-emitter behavior.

### P-0163
- Why:
  - P-0162 removed `@ts-nocheck` from Rendition, leaving two suppressed TypeScript files.
  - `src/contents` is the next smallest remaining suppressed core surface and owns DOM event forwarding, selection events, stylesheet/script/class/link helpers, viewport metadata, resize observation, text measurement, single-media page detection, CFI/range helpers, writing-mode handling, column layout, and vertical-rl page metrics.
  - Because Contents feeds rendition, iframe/inline views, CFI lookups, manager pagination, themes, annotations, vertical-rl diagnostics, and Browser Mode rendering behavior, this slice raises validation to focused Contents tests, those neighboring Browser Mode tests, and the full release gate.
  - The public `types/contents.d.ts` declaration had drift around optional construction, optional getters/setters, `viewport()`, stylesheet helper return values, `RangeObject` fallback, `size(null, h)`, optional writing/layout APIs, and vertical-rl diagnostics; this slice aligns the declaration with current runtime behavior.
- Diff Scope:
  - `src/contents.ts`: remove `@ts-nocheck`, add local viewport/stylesheet/vertical-rl/navigator/CSS rule shapes, type public helpers and DOM/CFI/range methods, use `declare` for type-only event-emitter fields so compiled output does not shadow prototype mixins, and keep casts limited to legacy DOM/CSS/navigator/Mapping boundaries.
  - `types/contents.d.ts`: align the public Contents declaration with optional arguments, synchronous helper return values, `RangeObject` fallback, vertical-rl diagnostics, and runtime method nullability.
  - `.babelrc.json`: enable `allowDeclareFields` for Babel's TypeScript preset so type-only class fields remain type-only during `compile`.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/contents-text-width.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/contents-text-width.test.js test/browser/views.test.js test/browser/rendition.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/book.test.js test/browser/epubcfi.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/annotations.test.js test/browser/themes.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if removing `@ts-nocheck`, enabling declare-field compilation, or aligning declarations changes Contents construction, event-emitter behavior, DOM event forwarding, selection events, stylesheet/script/class/link helpers, viewport metadata, resize observation, text measurement, single-media page detection, CFI/range lookup, writing-mode handling, column layout, vertical-rl page metrics, or public `Contents` declaration compatibility.

### P-0162
- Why:
  - P-0161 removed `@ts-nocheck` from EpubCFI, leaving three suppressed TypeScript files.
  - `src/rendition` is the smallest remaining suppressed file and is the public rendering API behind `new Rendition(book, options)`, `book.renderTo()`, manager/view selection, rendering startup, attach/display queueing, layout/flow/spread/direction changes, current location reporting, vertical-rl diagnostics, remeasure, event forwarding, selection/mark events, link resolution, stylesheet/script/identifier hooks, annotation/theme integration, and teardown.
  - Because Rendition touches public API, rendering, location/CFI reporting, manager interaction, views, contents hooks, annotations, themes, and vertical-rl diagnostics, this slice raises validation to focused rendition tests, rendering/core neighbors, and the full release gate.
  - The public `types/rendition.d.ts` declaration had drift around optional options, optional location, `currentLocation()`, `flow()`, `getContents()`, `getRange()`, `located()`, `moveTo()`, and spread values; this slice aligns those declarations with current runtime behavior.
- Diff Scope:
  - `src/rendition.ts`: remove `@ts-nocheck`, add local options/layout/location/manager-location shapes, add a legacy `defer` constructor adapter, type Rendition fields and public/internal methods, and use casts only at still-wider Themes/Annotations/Layout boundaries while keeping manager/view/display/location algorithms unchanged.
  - `types/rendition.d.ts`: align the public Rendition declaration with runtime option nullability, optional location/current-location results, array contents/views helpers, optional range lookup, manager-location based `located()`, object offset movement, and boolean spread values.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendition.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendition.test.js test/browser/public-api.test.js test/browser/book.test.js test/browser/epub.test.js test/browser/views.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/vertical-rl-manager.test.js test/browser/contents-text-width.test.js test/browser/teardown-raf.test.js test/browser/annotations.test.js test/browser/themes.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js test/browser/section.test.js test/browser/spine.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if removing `@ts-nocheck` or aligning declarations changes Rendition constructor defaults, hook registration, manager/view selection, rendering startup, attach/display queue behavior, layout/flow/spread/direction updates, current location reporting, vertical-rl diagnostics, remeasure behavior, event forwarding, selection/mark events, link resolution, stylesheet/script/identifier hooks, annotation/theme integration, teardown, or public `Rendition` declaration compatibility.

### P-0161
- Why:
  - P-0160 removed `@ts-nocheck` from Book, leaving four suppressed TypeScript files.
  - `src/epubcfi` is the smallest remaining suppressed core file and owns CFI parsing, serialization, comparison, DOM path generation, ignored-highlight filtering, range-to-CFI conversion, CFI-to-range lookup, missed-boundary correction, and chapter component generation.
  - Because CFI is used by Book, Rendition, Locations, Mapping, Contents, annotations, section, spine, and manager location reporting, this slice raises validation to focused CFI tests, those neighboring Browser Mode tests, and the full release gate.
  - The public `types/epubcfi.d.ts` declaration had drift around step type strings, nullable terminals, RangeObject fallback, constructor inputs, `parse()`, `filter()`, `toRange()`, `getRange()`, `joinSteps()`, and parse helper return types; this slice aligns the declaration with current runtime behavior.
- Diff Scope:
  - `src/epubcfi.ts`: remove `@ts-nocheck`, add local CFI step/terminal/component/parsed/range/map boundary shapes, type parser/serializer/comparison/path/range/DOM traversal helpers, and keep the existing parser and range algorithms unchanged.
  - `types/epubcfi.d.ts`: align the public EpubCFI declaration with runtime step/component shapes, RangeObject fallback, nullable `toRange()` result, and helper return types.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/epubcfi.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/epubcfi.test.js test/browser/book.test.js test/browser/rendition.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/annotations.test.js test/browser/contents-text-width.test.js test/browser/views.test.js test/browser/manager-listeners.test.js test/browser/vertical-rl-manager.test.js test/browser/public-api.test.js test/browser/section.test.js test/browser/spine.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if removing `@ts-nocheck` or aligning declarations changes CFI parsing, serialization, comparison ordering, DOM path generation, ignored-highlight filtering, range-to-CFI output, CFI-to-range lookup, missed-boundary correction, chapter component generation, or public `EpubCFI` declaration compatibility.

### P-0160
- Why:
  - P-0159 removed `@ts-nocheck` from IframeView, leaving five suppressed TypeScript files.
  - `src/book` is the smallest remaining suppressed file and is the public core entry behind direct `new Book(...)`, options-only construction, package opening, archive setup, resource loading, path/canonical resolution, navigation/page-list loading, rendition creation, storage setup, cover URL resolution, CFI range lookup, key generation, and destroy cleanup.
  - This slice removes the blanket suppress from Book while keeping still-suppressed rendering/CFI neighbors isolated behind local casts and preserving the existing runtime API.
  - The public `types/book.d.ts` declaration had drift around optional construction, loaded display options, `determineType()`, `load()`, request setters, `loadNavigation()`, and `unpack()`; this slice aligns those declarations with the current runtime surface.
- Diff Scope:
  - `src/book.ts`: remove `@ts-nocheck`, add Book options/input/request/loading/local section/store event shapes, add a legacy `defer` constructor adapter, type Book public fields and methods, and use casts only at still-wider legacy boundaries for Locations, Spine unpacking, Archive encoding, Store event binding, and CFI range fallback.
  - `types/book.d.ts`: align the public Book declaration with options-only construction, optional runtime fields, loaded display options, `determineType()` binary input support, optional `load()` type argument, boolean request credentials, `RequestHeaders`, Packaging-based `loadNavigation()`, and synchronous `unpack()`.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/book.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/book.test.js test/browser/public-api.test.js test/browser/epub.test.js test/browser/archive.test.js test/browser/store.test.js test/browser/request.test.js test/browser/rendition.test.js test/browser/locations.test.js test/browser/packaging.test.js test/browser/navigation.test.js test/browser/pagelist.test.js test/browser/section.test.js test/browser/spine.test.js test/browser/resources.test.js test/browser/contents-text-width.test.js test/browser/views.test.js test/browser/annotations.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if removing `@ts-nocheck` or aligning declarations changes Book options-only construction, default settings, open type detection, archive opening, request wiring, package/resource/navigation/page-list loading, path/canonical resolution, renderTo behavior, storage offline/online hooks, cover URL behavior, CFI range lookup, key generation, destroy cleanup, or public `Book` declaration compatibility.

### P-0159
- Why:
  - P-0158 removed `@ts-nocheck` from ContinuousViewManager, leaving six suppressed TypeScript files.
  - `src/managers/views/iframe` is the smallest remaining suppressed rendering surface and owns iframe creation, sandbox flags, srcdoc/blob/write load paths, script stripping, canonical link injection, writing-mode axis detection, vertical-rl paginated width expansion, viewport-filling single media handling, resize event emission, show/hide redraw behavior, highlight/underline/mark placement, blob URL revocation, and destroy cleanup.
  - This slice removes the blanket suppress from IframeView while keeping validation focused on iframe view behavior plus rendition, contents, manager, vertical-rl, teardown, public API, and annotation neighbors.
  - `marks-pane` has no bundled declaration file; this slice adds a minimal local declaration instead of adding a dependency.
- Diff Scope:
  - `src/managers/views/iframe.ts`: remove `@ts-nocheck`, add local section/settings/layout/bounds/mark/page-metrics shapes, add legacy `defer` and `Contents` constructor adapters, type iframe load/render/annotation helpers, and keep casts only at legacy browser extension, sandbox, and two-argument rejection boundaries.
  - `types/marks-pane.d.ts`: add minimal local declarations for `Pane`, `Highlight`, and `Underline`.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js test/browser/rendition.test.js test/browser/vertical-rl-manager.test.js test/browser/contents-text-width.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/annotations.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if removing `@ts-nocheck` changes IframeView constructor defaults, sandbox flags, srcdoc/blob/write load, script stripping, canonical injection, writing-mode/axis detection, vertical-rl expansion, viewport-filling media page sizing, resize event behavior, show/hide redraw, highlight/underline/mark placement, blob URL revocation, or destroy cleanup.

### P-0158
- Why:
  - P-0157 removed `@ts-nocheck` from InlineView, leaving seven suppressed TypeScript files.
  - `src/managers/continuous` is the smallest remaining suppressed manager surface and owns continuous scrolling, fill/check/update recursion, append/prepend view creation, visibility show/hide behavior, delayed trimming, scroll delta tracking, unload/scroll listener cleanup, next/prev movement, flow updates, and snapper teardown.
  - This slice removes the blanket suppress from ContinuousViewManager while keeping the behavior gate focused on continuous manager plus default manager, vertical-rl, rendition, views, contents, teardown, public API, and snap neighbors.
  - `lodash/debounce` had no local declaration while `lodash/throttle` already did; this slice adds a matching local declaration instead of adding a dependency.
- Diff Scope:
  - `src/managers/continuous/index.ts`: remove `@ts-nocheck`, add local options/scroll/view/bounds shapes, add a legacy `defer` construct adapter, type manager method parameters/returns where needed, and use casts only at the still-suppressed DefaultViewManager/Snap boundary.
  - `types/lodash-debounce.d.ts`: add a minimal local debounce declaration matching the project's existing throttle declaration style.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/continuous-manager.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/continuous-manager.test.js test/browser/manager-listeners.test.js test/browser/vertical-rl-manager.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/snap.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if removing `@ts-nocheck` changes ContinuousViewManager constructor defaults, zero-gap handling, viewSettings propagation, fill/check/update recursion, append/prepend creation, visibility show/hide behavior, trim scheduling, scroll delta tracking, unload/scroll cleanup, next/prev movement, flow updates, snapper setup/teardown, or debounce typing compatibility.

### P-0157
- Why:
  - P-0156 completed JavaScript-to-TypeScript source conversion, leaving eight large/high-risk files with temporary `@ts-nocheck`.
  - `src/managers/views/inline` is the smallest remaining suppressed rendering surface and is a good first typed-surface slice after the source tree became all TypeScript.
  - InlineView owns inline container creation, section render/load/display lifecycle, size/lock/resize behavior, Contents construction, location lookup, event emission, and destroy cleanup, so this slice removes the blanket suppress while keeping validation focused on views plus manager/rendition/contents neighbors.
  - The existing `types/contents.d.ts` described `Contents.locationOf()` as asynchronous and omitted optional constructor arguments, while runtime uses synchronous coordinates and optional section metadata; this slice aligns that typed public/internal surface with current behavior.
- Diff Scope:
  - `src/managers/views/inline.ts`: remove `@ts-nocheck`, add local section/settings/layout/bounds shapes, add a legacy `defer` construct adapter, add a local `Contents` constructor adapter for optional metadata arguments, and type InlineView method parameters without changing runtime behavior.
  - `types/contents.d.ts`: align `Contents` constructor optional arguments and `locationOf()` return type with runtime behavior.
- Test:
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js test/browser/rendition.test.js test/browser/teardown-raf.test.js test/browser/contents-text-width.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/vertical-rl-manager.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if removing `@ts-nocheck` or aligning `Contents` declarations changes InlineView constructor defaults, container creation, render/load/display lifecycle, size/lock/resize behavior, Contents construction, location lookup, event emission, destroy cleanup, or typed `Contents.locationOf()` compatibility.

### P-0156
- Why:
  - P-0155 moved Contents to TypeScript, leaving `src/managers/default/index.js` as the final JavaScript source file in the library source tree.
  - DefaultViewManager is the core paginated/scrolled rendering boundary for stage setup, view lifecycle, display/append/prepend, page movement, scroll normalization, RTL and vertical-rl pagination, current location mapping, layout/flow/direction updates, listener cleanup, and teardown.
  - Because this slice touches pagination, scroll math, CFI/location reporting, rendition integration, views, contents measurement, and vertical-rl edge masking, validation is raised to manager, vertical-rl, rendition, view, contents, teardown, page-list/location/mapping, and full release gates.
  - The implementation remains internally `@ts-nocheck` for this slice to keep the final JavaScript-to-TypeScript source conversion bounded to pipeline and behavior preservation; detailed DefaultViewManager typing should be split after the source tree has no remaining `.js` files.
- Diff Scope:
  - `src/managers/default/index.ts`: convert DefaultViewManager from JavaScript to TypeScript while preserving constructor defaults, queue/view settings, render/listener setup, display/add/append/prepend lifecycle, next/prev movement, scroll normalization, layout/flow/direction updates, current location mapping, vertical-rl pagination and edge masking helpers, and destroy cleanup.
  - `test/browser/manager-listeners.test.js`: add focused Browser Mode coverage for constructor defaults, `viewSettings`, queue context, `createView()`, `updateFlow()`, `updateLayout()`, and `direction()` helper behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/manager-listeners.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/manager-listeners.test.js test/browser/vertical-rl-manager.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/continuous-manager.test.js test/browser/contents-text-width.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/book.test.js test/browser/locations.test.js test/browser/mapping.test.js test/browser/pagelist.test.js test/browser/section.test.js test/browser/spine.test.js test/browser/themes.test.js test/browser/annotations.test.js test/browser/snap.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if TypeScript source conversion changes DefaultViewManager constructor defaults, queue/view settings, render/listener setup, display/add/append/prepend lifecycle, pre-paginated spread handling, next/prev movement, scroll normalization, RTL or vertical-rl pagination, current location mapping, layout/flow/direction updates, vertical-rl edge masking, event emission, or destroy cleanup.

### P-0155
- Why:
  - P-0154 moved Rendition to TypeScript, leaving `contents` and the default manager as the final JavaScript source files in the rendering/core path.
  - `src/contents` is the smaller remaining file, but it owns DOM event forwarding, EPUB reading system injection, viewport/style/class/link helpers, resize observers, text measurement, media-page detection, CFI/location helpers, column layout, writing-mode decisions, and vertical-rl metrics used by the managers and Rendition.
  - Because Contents touches CFI, DOM measurement, vertical writing, and rendering helpers, this slice raises validation to contents, vertical-rl manager, views, rendition, teardown RAF, public API, book, section, mapping, locations, themes, and annotations before the full release gate.
  - The implementation remains internally `@ts-nocheck` for this slice to keep the change bounded to source pipeline conversion and observable Contents behavior preservation; detailed Contents typing should be split after the default manager is converted.
- Diff Scope:
  - `src/contents.ts`: convert Contents from JavaScript to TypeScript while preserving constructor defaults, reading system setup, cache invalidation, CSS/viewport/style/class/link helpers, text width/height behavior, media-page detection, CFI/location helpers, writing-mode/column behavior, event listeners, and destroy cleanup.
  - `test/browser/contents-text-width.test.js`: add focused Browser Mode coverage for constructor defaults, reading system feature reporting, vertical-rl cache invalidation, viewport/style/class helpers, and link-click event forwarding.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/contents-text-width.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/contents-text-width.test.js test/browser/vertical-rl-manager.test.js test/browser/views.test.js test/browser/rendition.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js test/browser/book.test.js test/browser/section.test.js test/browser/mapping.test.js test/browser/locations.test.js test/browser/themes.test.js test/browser/annotations.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if TypeScript source conversion changes Contents constructor defaults, EPUB reading system setup, cache invalidation, CSS/viewport/style/class/link helpers, DOM event forwarding, text width/height behavior, viewport-filling media detection, CFI/location helpers, column/writing-mode behavior, vertical-rl metrics, resize/listener behavior, or destroy cleanup.

### P-0154
- Why:
  - P-0153 moved IframeView to TypeScript, leaving three JavaScript source files in the public rendering/core/manager group.
  - `src/rendition` is now the smallest remaining source file and is the public rendering API behind `ePub.Rendition`, direct `new Rendition(book, options)`, queue startup, manager/view selection, attach/display, layout/flow/spread/direction changes, location reporting, vertical-rl diagnostics, link resolution, event forwarding, content hooks, annotation/theme integration, and teardown.
  - Because Rendition is a public API and manager/display boundary, this slice raises validation to rendition, public API, book/ePub factory, views, vertical-rl manager, manager listeners, continuous manager, contents width, teardown RAF, themes, annotations, locations, and page-list tests before the full release gate.
  - The implementation remains internally `@ts-nocheck` for this slice to keep the change bounded to source pipeline conversion and observable Rendition behavior preservation; detailed Rendition typing should be split after `contents` and the default manager are stabilized.
- Diff Scope:
  - `src/rendition.ts`: convert Rendition from JavaScript to TypeScript while preserving constructor defaults, hook registration, manager/view resolution, queue startup, attach/display behavior, layout/flow/spread/direction behavior, location reporting, debug/remeasure helpers, current location mapping, link resolution, event forwarding, injected assets/identifier hooks, getContents/views helpers, and destroy cleanup.
  - `test/browser/rendition.test.js`: add focused Browser Mode coverage for constructor defaults, hook registration, manager/view resolution, layout property derivation, flow normalization, layout application, and link resolution behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendition.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendition.test.js test/browser/public-api.test.js test/browser/book.test.js test/browser/epub.test.js test/browser/views.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/contents-text-width.test.js test/browser/teardown-raf.test.js test/browser/themes.test.js test/browser/annotations.test.js test/browser/locations.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if TypeScript source conversion changes Rendition constructor defaults, hook registration, manager/view selection, queue startup, attach/display behavior, layout/flow/spread/direction behavior, location reporting, vertical-rl diagnostics, remeasure behavior, current location mapping, link resolution, event forwarding, injected stylesheet/script/identifier hooks, annotation/theme integration, getContents/views helpers, or destroy cleanup.

### P-0153
- Why:
  - P-0152 moved Book to TypeScript, leaving four JavaScript source files in the rendering/core/manager group.
  - `src/managers/views/iframe` is now the smallest remaining source file, but it owns iframe creation, sandbox flags, srcdoc/blob/write loading, script stripping, canonical link injection, writing-mode axis detection, vertical-rl paginated width expansion, viewport-filling single media handling, resize emission, show/hide redraw behavior, highlight/underline/mark placement, blob URL revocation, and destroy cleanup.
  - Because IframeView touches rendering and vertical pagination behavior, this slice raises validation to views, vertical-rl manager, rendition, manager listeners, continuous manager, contents width, teardown RAF, and public API tests before the full release gate.
  - The implementation remains internally `@ts-nocheck` for this slice to keep the change bounded to source pipeline conversion and observable view behavior preservation; detailed IframeView typing should be split after the remaining `contents`, `rendition`, and default manager files are stabilized.
- Diff Scope:
  - `src/managers/views/iframe.ts`: convert IframeView from JavaScript to TypeScript while preserving constructor defaults, container style, iframe sandbox creation, method detection, reset behavior, script stripping, srcdoc/blob/write loading, expansion/reframe behavior, event emission, mark lifecycle, blob URL revocation, and destroy cleanup.
  - `test/browser/views.test.js`: add focused Browser Mode coverage for IframeView constructor defaults, horizontal flex behavior, sandbox flags, method detection, annotation attribute, reset state, and reframe flag behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js test/browser/vertical-rl-manager.test.js test/browser/rendition.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/contents-text-width.test.js test/browser/teardown-raf.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if TypeScript source conversion changes IframeView constructor defaults, container/flex behavior, sandbox flags, method detection, reset behavior, script stripping, srcdoc/blob/write loading, canonical link injection, writing-mode axis detection, vertical-rl paginated expansion, viewport-filling single media sizing, resize event behavior, show/hide redraw behavior, highlight/underline/mark placement, blob URL revocation, or destroy cleanup.

### P-0152
- Why:
  - P-0151 moved ContinuousViewManager to TypeScript, leaving five JavaScript source files in the public core/rendering/manager group.
  - `src/book` is now the smallest remaining source file and is the public core entry behind `ePub.Book`, direct `new Book(...)`, package opening, archive setup, package/resource/navigation/page-list loading, section lookup, rendition creation, storage setup, cover URL resolution, CFI range lookup, key generation, and destroy cleanup.
  - Because Book is a public core surface, this slice raises validation to Book, ePub factory, public API, section, spine, resources, archive, store, request, rendition, locations, packaging, navigation, and page-list tests before the full release gate.
  - The implementation remains internally `@ts-nocheck` for this slice to keep the change bounded to source pipeline conversion and public behavior preservation; detailed Book typing should be split after the remaining rendering/core files are stabilized.
- Diff Scope:
  - `src/book.ts`: convert Book from JavaScript to TypeScript while preserving options-only construction, public defaults, open/determineType behavior, path resolution/canonical behavior, package unpacking, navigation/page-list loading, renderTo, request configuration, archive/store setup, cover URL resolution, getRange/key helpers, and destroy cleanup.
  - `test/browser/book.test.js`: add focused Browser Mode coverage for options-only construction, public defaults, type detection, canonical callback use, relative/absolute path resolution, and empty-path handling.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/book.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/book.test.js test/browser/epub.test.js test/browser/public-api.test.js test/browser/section.test.js test/browser/spine.test.js test/browser/resources.test.js test/browser/archive.test.js test/browser/store.test.js test/browser/request.test.js test/browser/rendition.test.js test/browser/locations.test.js test/browser/packaging.test.js test/browser/navigation.test.js test/browser/pagelist.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if TypeScript source conversion changes Book options-only construction, public defaults, open/determineType behavior, path resolution/canonical behavior, package unpacking, navigation/page-list loading, renderTo behavior, request configuration, archive/store setup, cover URL resolution, getRange/key helpers, or destroy cleanup.

### P-0151
- Why:
  - P-0150 moved InlineView to TypeScript, leaving six JavaScript source files in the manager/book/rendering group.
  - `src/managers/continuous` is now the smallest remaining source file, but it owns continuous scrolling, fill/check recursion, append/prepend view creation, visibility update/hide behavior, delayed trimming, scroll delta tracking, unload/scroll listener cleanup, next/prev movement, flow updates, and snapper teardown, so this slice raises validation across manager, rendition, vertical-rl pagination, view, teardown, and public API tests.
  - The implementation remains internally `@ts-nocheck` for this slice to keep the change bounded to source pipeline conversion and observable manager behavior preservation; detailed manager typing should be split after the larger default manager boundary is stabilized.
- Diff Scope:
  - `src/managers/continuous/index.ts`: convert ContinuousViewManager from JavaScript to TypeScript while preserving constructor defaults, zero gap handling, viewSettings propagation, initial scroll state, fill/check/update/trim behavior, scroll listener lifecycle, scroll/scrolled event timing, next/prev behavior, flow updates, and snapper cleanup.
  - `test/browser/continuous-manager.test.js`: add focused Browser Mode coverage for constructor defaults, `gap: 0`, initial scroll state, and viewSettings propagation.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/continuous-manager.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/continuous-manager.test.js test/browser/manager-listeners.test.js test/browser/vertical-rl-manager.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/teardown-raf.test.js test/browser/contents-text-width.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if TypeScript source conversion changes ContinuousViewManager constructor defaults, zero gap handling, viewSettings propagation, initial scroll state, fill/check/update/trim behavior, scroll listener lifecycle, scroll/scrolled event timing, next/prev movement, flow update behavior, or snapper cleanup.

### P-0150
- Why:
  - P-0149 moved EpubCFI to TypeScript, leaving seven JavaScript source files in the high-risk rendering/manager/book group.
  - `src/managers/views/inline` is the smallest remaining view surface and is lower-risk than `iframe`, `default`, `continuous`, `contents`, `book`, or `rendition`, while still exercising the rendering view lifecycle.
  - InlineView owns inline container creation, create/load/display/show/hide lifecycle, sizing/locking/resize event emission, parser-backed content loading, location lookup, and destroy cleanup, so this slice raises validation to view, rendition, teardown, contents width, vertical-rl, and manager neighbor tests.
  - The implementation remains internally `@ts-nocheck` for this slice to keep the change bounded to source pipeline conversion and public lifecycle preservation; detailed internal view typing should be done after the remaining rendering files are split into smaller sub-slices.
- Diff Scope:
  - `src/managers/views/inline.ts`: convert InlineView from JavaScript to TypeScript while preserving constructor defaults, container display mode, create/load/display/show/hide behavior, sizing/locking/resize behavior, content parser integration, and destroy cleanup.
  - `test/browser/views.test.js`: add focused Browser Mode coverage for InlineView constructor defaults, horizontal container display mode, lifecycle flags, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js test/browser/rendition.test.js test/browser/teardown-raf.test.js test/browser/contents-text-width.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if TypeScript source conversion changes InlineView constructor defaults, inline/horizontal container display, create/load/display/show/hide lifecycle behavior, sizing/locking/resize event behavior, parser-backed content loading, location lookup, or destroy cleanup.

### P-0149
- Why:
  - P-0148 moved Locations to TypeScript, leaving `src/epubcfi` as the smallest remaining core CFI surface before larger `book`, `contents`, `rendition`, manager, or view conversions.
  - EpubCFI owns CFI parsing, serialization, comparison, DOM node/range conversion, RangeObject fallback, ignoreClass filtering, toRange resolution, collapse behavior, and chapter component generation, so this slice raises validation to focused CFI plus locations, pagelist, spine, section, mapping, book, public API, rendition, and compat-range neighbor tests.
  - The 1100-line CFI implementation remains internally `@ts-nocheck` for this slice to keep the change bounded to source pipeline conversion and public shape preservation; detailed internal CFI typing should be done in later smaller sub-slices.
- Diff Scope:
  - `src/epubcfi.ts`: convert the source file from JavaScript to TypeScript, preserve public constructor defaults/fields, keep optional constructor/toRange/collapse signatures, and leave internal algorithm behavior unchanged.
  - `test/browser/epubcfi.test.js`: import the extensionless TypeScript source and add a focused public default-field smoke test.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/epubcfi.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/epubcfi.test.js test/browser/locations.test.js test/browser/pagelist.test.js test/browser/spine.test.js test/browser/section.test.js test/browser/mapping.test.js test/browser/book.test.js test/browser/public-api.test.js test/browser/rendition.test.js test/browser/compat-range.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript source conversion changes CFI parsing, serialization, comparison, DOM node/range conversion, RangeObject fallback, ignoreClass filtering, `toRange()`, `collapse()`, chapter component generation, or public EpubCFI constructor/field compatibility.

### P-0148
- Why:
  - P-0147 moved Mapping to TypeScript, leaving `src/locations` as the next bounded location/CFI surface before higher-risk `epubcfi`, `contents`, `book`, `rendition`, managers, or views.
  - Locations owns generated CFI arrays, section-level refinement, word locations, CFI-to-location lookup, percentage helpers, current location state, changed events, and destroy cleanup, so this slice expands focused coverage before converting it to TypeScript.
  - The new current-location coverage exposed that a runtime `emit` class field would shadow the EventEmitter prototype method during TypeScript conversion; this slice uses TypeScript interface merging instead so no runtime field is emitted.
- Diff Scope:
  - `src/locations.ts`: convert Locations from JavaScript to TypeScript while preserving parse fallback, generated location arrays, generateForSection insertion/replacement, word locations, CFI/location/percentage helpers, currentLocation event behavior, and destroy cleanup.
  - `types/locations.d.ts`: align public declarations with runtime behavior for optional constructor args, location/percentage helper return types, load inputs, currentLocation, and private parse/createRange shapes.
  - `test/browser/locations.test.js`: add browser-mode coverage for load/save, cfiFromLocation, cfiFromPercentage, currentLocation changed events, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/locations.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/locations.test.js test/browser/epubcfi.test.js test/browser/mapping.test.js test/browser/section.test.js test/browser/spine.test.js test/browser/book.test.js test/browser/public-api.test.js test/browser/rendition.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes location parsing, fallback CFI generation, section refinement ordering, word location generation, CFI/location/percentage lookup, currentLocation changed events, destroy cleanup, or typed public Locations compatibility.

### P-0147
- Why:
  - P-0146 moved the legacy `utils/core` facade to TypeScript, leaving `src/mapping` as the smallest remaining page/CFI mapping surface before higher-risk `locations`, `epubcfi`, `contents`, `rendition`, managers, or views.
  - Mapping owns axis selection, text-node range splitting, page range discovery, and conversion of DOM ranges into CFI pairs used by manager location reporting, so this slice adds focused Browser Mode coverage before converting it to TypeScript.
  - Because mapping touches page/CFI semantics, this slice raises validation to include locations, rendition, manager, view, vertical-rl, and public API neighbor tests.
- Diff Scope:
  - `src/mapping.ts`: convert Mapping from JavaScript to TypeScript while preserving constructor state, axis behavior, page empty-content behavior, text range splitting, range-to-CFI pair conversion, range-list conversion, and legacy TreeWalker filter compatibility.
  - `types/mapping.d.ts`: align mapping public declarations with runtime layout metrics and `page()` possibly returning `undefined` when no document body exists.
  - `test/browser/mapping.test.js`: add browser-mode coverage for axis switching, empty page mapping, text range splitting, and range-to-CFI pair generation.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/mapping.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/mapping.test.js test/browser/locations.test.js test/browser/rendition.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/views.test.js test/browser/vertical-rl-manager.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes axis selection, empty-content page mapping, text-node range splitting, DOM range to CFI conversion, range-list mapping, manager location mapping, vertical-rl pagination mapping, or typed public Mapping compatibility.

### P-0146
- Why:
  - P-0145 moved the shared request boundary to TypeScript, leaving `src/utils/core` as the next public utility facade still written in JavaScript.
  - `utils/core` is the legacy/public helper surface attached to `ePub.utils` and re-exporting split `src/core/*`, `src/platform/*`, compatibility, MIME, parser, DOM, traversal, blob, layout, UUID, and deferred helpers, so this slice locks the facade export surface and constructor behavior before converting it to TypeScript.
  - The existing `.d.ts` files described `defer` as a callable function even though the runtime public API is used with `new defer()`, so this slice also aligns the typed public surface with current runtime behavior.
- Diff Scope:
  - `src/utils/core.ts`: convert the legacy core utility facade from JavaScript to TypeScript while preserving all existing helper forwarding behavior.
  - `types/utils/core.d.ts`, `types/core.d.ts`: tighten public declarations for `defer`, DOM/query helpers, traversal helpers, sorted collection helpers, parser helpers, and return types to match runtime behavior.
  - `types/epubjs-tests.ts`, `types/global-namespace-tests.ts`: add typed public API smoke coverage for `ePub.utils.defer`, `parse()`, and `qs()`.
  - `test/browser/core-facade.test.js`: add browser-mode coverage for the legacy `utils/core` export list and `new defer()` compatibility.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-facade.test.js test/browser/core-types.test.js test/browser/core-collections.test.js test/browser/core-async.test.js test/browser/platform-dom.test.js test/browser/platform-parser.test.js test/browser/platform-blob.test.js test/browser/platform-layout.test.js test/browser/platform-traversal.test.js test/browser/public-api.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes the `utils/core` export list, `ePub.utils` facade references, deferred constructor behavior, parser/DOM/traversal/blob/layout helper forwarding, or typed public API compatibility.

### P-0145
- Why:
  - P-0144 moved Archive to TypeScript, leaving `src/utils/request` as the shared XHR boundary used by Book, Archive, Store, and resource loading.
  - Request owns XHR setup, credentials and headers, inferred response types, binary/blob handling, XML/XHTML/HTML/JSON parsing, responseXML short-circuiting, empty response rejection, network errors, and failed status rejection, so this slice expands direct coverage before converting it to TypeScript.
- Diff Scope:
  - `src/utils/request.ts`: convert the request helper from JavaScript to TypeScript while preserving XHR setup, header handling, credentials, response type inference, XML/XHTML/HTML/JSON parsing, blob/binary handling, empty response rejection, network error rejection, and existing failed-status behavior.
  - `test/browser/request.test.js`: add browser-mode coverage for binary responses, XHTML/HTML parser paths, responseXML handling, empty response rejection, 403 failed-status behavior, and XHR network errors.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/request.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/request.test.js test/browser/archive.test.js test/browser/store.test.js test/browser/resources.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes XHR setup, credentials or header handling, inferred response type behavior, binary/blob handling, XML/XHTML/HTML/JSON parsing, responseXML handling, empty response rejection, network error rejection, or failed-status rejection behavior.

### P-0144
- Why:
  - P-0143 moved Store to TypeScript, leaving `src/archive` as the paired ZIP-backed request/cache surface before moving into higher-risk `request`, `locations`, `book`, `rendition`, or `epubcfi`.
  - Archive owns JSZip setup, opening binary EPUBs, archived request routing, XML/HTML/JSON response parsing, Blob/text/base64 extraction, object URL caching, URL revocation, and destroy cleanup, so this slice expands direct coverage before converting it to TypeScript.
- Diff Scope:
  - `src/archive.ts`: convert Archive from JavaScript to TypeScript while preserving JSZip setup, `open()` and `openUrl()`, request parsing, Blob/text/base64 helpers, object URL cache reuse, missing-entry rejection, URL revocation, and destroy cleanup.
  - `types/jszip-dist.d.ts`: add a narrow declaration for the existing `jszip/dist/jszip` import used by Archive.
  - `test/browser/archive.test.js`: add browser-mode coverage for text/JSON/XHTML handling, object URL cache reuse, missing request/createUrl rejection, URL revocation, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/archive.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/archive.test.js test/browser/request.test.js test/browser/resources.test.js test/browser/book.test.js test/browser/public-api.test.js test/browser/store.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes JSZip setup, binary archive opening, archived request routing, XML/HTML/JSON response parsing, Blob/text/base64 extraction, object URL cache reuse, missing-entry rejection, URL revocation, or destroy cleanup.

### P-0143
- Why:
  - P-0142 moved Spine to TypeScript, leaving `src/store` as the next bounded offline/cache surface before higher-risk `request`, `archive`, `locations`, `book`, or `rendition` conversions.
  - Store owns localForage storage setup, online/offline events, resource prefetching, network-to-cache request flow, offline retrieval, response parsing, Blob/text/base64 conversion, object URL caching, URL revocation, and destroy cleanup, so this slice expands direct coverage before converting it to TypeScript.
  - The new constructor coverage exposed an existing `checkRequirements()` bug where the imported `localforage` module was not assigned before `createInstance()`, causing real `new Store()` usage to throw.
- Diff Scope:
  - `src/store.ts`: convert Store from JavaScript to TypeScript while preserving storage add/put/request/retrieve behavior, response parsing, Blob/text/base64 helpers, URL cache behavior, online/offline events, URL revocation, and destroy cleanup; fix localForage instance creation in `checkRequirements()`.
  - `test/browser/store.test.js`: add browser-mode coverage for real constructor storage setup, listener teardown, add/force refresh, online network request with offline cache retrieval, URL cache reuse, URL revocation, status events, and missing storage rejection.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/store.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/store.test.js test/browser/archive.test.js test/browser/request.test.js test/browser/resources.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion or the constructor fix changes localForage storage setup, online/offline event behavior, resource add/force refresh semantics, network request behavior, offline retrieval, response parsing, Blob/text/base64 conversion, object URL cache reuse, URL revocation, or destroy cleanup.

### P-0142
- Why:
  - P-0141 moved Section to TypeScript, leaving `src/spine` as the next core owner of Section ordering, lookups, navigation links, and package manifest fallback resolution.
  - Spine owns OPF spine unpacking, href/id/CFI lookup maps, linear-only prev/next traversal, first/last helpers, fallback renderable item selection, and destroy cleanup, so this slice expands direct coverage before converting it to TypeScript.
- Diff Scope:
  - `src/spine.ts`: convert Spine from JavaScript to TypeScript while preserving package unpacking, manifest fallback resolution, Section construction, href/id/encoded href/CFI/numeric lookup behavior, linear navigation, first/last helpers, iteration, removal, and destroy cleanup.
  - `test/browser/spine.test.js`: add browser-mode coverage for href and encoded href lookups, idref and CFI lookups, numeric string lookup, non-linear navigation skips, first/last helpers, each iteration, remove lookup cleanup, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/spine.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/spine.test.js test/browser/section.test.js test/browser/book.test.js test/browser/locations.test.js test/browser/public-api.test.js test/browser/rendition.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes OPF spine unpacking, manifest fallback selection, Section metadata, href/id/encoded href/CFI/numeric lookup behavior, linear prev/next traversal, first/last helpers, remove cleanup, or destroy cleanup.

### P-0141
- Why:
  - P-0140 moved Resources to TypeScript, leaving `src/section` as the next core section surface with existing Browser Mode coverage and lower risk than `book`, `request`, `archive`, `rendition`, or `epubcfi`.
  - Section owns section metadata, load/render hook execution, base URL injection, find/search CFI generation, layout reconciliation, CFI helpers, and unload/destroy cleanup, so this slice expands direct coverage before converting it to TypeScript.
- Diff Scope:
  - `src/section.ts`: convert Section from JavaScript to TypeScript while preserving spine item metadata, content and serialize hooks, request-backed loading, cached loads, rendering serialization, find/search matching, layout reconciliation, CFI helpers, and cleanup behavior.
  - `test/browser/section.test.js`: add browser-mode coverage for cached loading, content hooks with base injection, serialize hook output mutation, layout property reconciliation, unload cleanup, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/section.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/section.test.js test/browser/spine.test.js test/browser/resources.test.js test/browser/locations.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes section metadata initialization, load/render hook ordering, cached load behavior, base URL injection, find/search CFI or excerpt generation, layout reconciliation, CFI helper output, or unload/destroy cleanup.

### P-0140
- Why:
  - P-0139 moved PageList to TypeScript, leaving `src/resources` as the next manifest resource URL and replacement surface with direct Browser Mode coverage.
  - Resources owns HTML/CSS/asset classification, resolver-driven replacement URL creation, failed resource filtering, CSS URL substitution, relative URL mapping, resource lookup, and destroy cleanup, so this slice expands coverage before converting it to TypeScript.
- Diff Scope:
  - `src/resources.ts`: convert Resources from JavaScript to TypeScript while preserving manifest splitting, archive/request URL creation, replacement URL filtering, CSS replacement file generation, relative URL mapping, resource lookup, substitution, and destroy cleanup.
  - `test/browser/resources.test.js`: add browser-mode coverage for failed resource filtering, CSS replacement slot updates, relative URL substitution, missing lookups, absolute CSS href handling, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/resources.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/resources.test.js test/browser/replacements.test.js test/browser/packaging.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes resource splitting, resolver/archive/request URL creation, failed replacement filtering, CSS replacement contents, relative URL mapping, resource lookup, substitution, or destroy cleanup behavior.

### P-0139
- Why:
  - P-0138 moved Packaging to TypeScript, leaving `src/pagelist` as the next page-list parser and lookup surface with direct Browser Mode coverage.
  - PageList owns EPUB 3 page-list nav parsing, NCX page targets, CFI href splitting, page/href/CFI lookup maps, percentage helpers, and destroy cleanup, so this slice expands coverage before converting it to TypeScript.
- Diff Scope:
  - `src/pagelist.ts`: convert PageList from JavaScript to TypeScript while preserving EPUB 3 and NCX parsing, CFI href extraction, page/href/CFI lookup behavior, percentage helpers, and destroy cleanup.
  - `test/browser/pagelist.test.js`: add browser-mode coverage for CFI href targets, missing page-list documents, percentage/page helper methods, missing lookup returns, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/pagelist.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/pagelist.test.js test/browser/epubcfi.test.js test/browser/navigation.test.js test/browser/packaging.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes page-list nav parsing, NCX page target parsing, CFI href splitting, page/href/CFI lookup behavior, percentage calculations, or destroy cleanup.

### P-0138
- Why:
  - P-0137 moved Navigation to TypeScript, leaving `src/packaging` as the next OPF/package parser surface with direct Browser Mode coverage.
  - Packaging owns OPF metadata, manifest fallback chains, spine itemrefs, nav/NCX/cover path discovery, JSON manifest loading, and destroy cleanup, so this slice expands parser coverage before converting it to TypeScript.
- Diff Scope:
  - `src/packaging.ts`: convert Packaging from JavaScript to TypeScript while preserving XML OPF parsing, EPUB 2 cover/NCX fallbacks, metadata properties, manifest fallback chains, spine itemrefs, JSON manifest loading, and destroy cleanup.
  - `test/browser/packaging.test.js`: add browser-mode coverage for EPUB 2 cover metadata and spine-toc NCX fallback, rendition metadata/unique identifier parsing, JSON manifest loading, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/packaging.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/packaging.test.js test/browser/book.test.js test/browser/navigation.test.js test/browser/spine.test.js test/browser/resources.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes OPF metadata parsing, manifest fallback chains, spine itemrefs, nav/NCX/cover path discovery, JSON manifest loading, or destroy cleanup behavior.

### P-0137
- Why:
  - P-0136 moved the public Layout class to TypeScript, leaving `src/navigation` as the next public/parser surface with direct Browser Mode coverage.
  - Navigation owns EPUB 3 nav, landmarks, NCX, legacy JSON TOC loading, lookup maps, and iteration behavior, so this slice expands parser coverage before converting it to TypeScript.
- Diff Scope:
  - `src/navigation.ts`: convert Navigation from JavaScript to TypeScript while preserving EPUB 3 nav parsing, landmarks, NCX parent/child reconstruction, lookup by href/id/hash id, legacy JSON loading, and `forEach()` behavior.
  - `test/browser/navigation.test.js`: add browser-mode coverage for missing lookups, whole TOC return, span-only nav items, landmark list return, legacy JSON navigation trees, and top-level iteration.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/navigation.test.js`
  - `npm run typecheck`
  - `npx vitest run --config vitest.browser.config.mjs test/browser/navigation.test.js test/browser/packaging.test.js test/browser/section.test.js test/browser/book.test.js test/browser/public-api.test.js`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes EPUB 3 nav parsing, landmarks, NCX hierarchy, JSON TOC loading, lookup behavior, or package public Navigation types.

### P-0136
- Why:
  - P-0135 moved the package entries to TypeScript, leaving `src/layout` as the next small public class exported from the package root.
  - `Layout` owns page dimension calculation, flow/spread normalization, contents formatting, page counting, and layout update events used by rendition and managers, so this slice adds direct browser-mode coverage before converting it to TypeScript.
- Diff Scope:
  - `src/layout.ts`: convert Layout from JavaScript to TypeScript while preserving constructor defaults, flow/spread normalization, calculate metrics, format delegation, count behavior, and layout update events.
  - `src/core/collections.ts`: widen the `extend()` TypeScript signature to match the existing variadic JavaScript behavior used by Layout update merging.
  - `test/browser/layout.test.js`: add browser-mode coverage for reflowable metrics, automatic gap calculation, pre-paginated counts, flow/spread events, viewport/page-advance counts, and contents formatting branches.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/layout.test.js test/browser/public-api.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/vertical-rl-manager.test.js test/browser/contents-text-width.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript conversion changes layout metric calculation, flow/spread normalization, contents formatting, page counting, layout update events, or rendition/manager layout integration.

### P-0135
- Why:
  - P-0134 moved the RTL scroll detector to TypeScript, leaving the package root and browser global entry files as the smallest public API surface still written in JavaScript.
  - `src/index` and `src/epub` define the Vite/Rollup package entries, named exports, callable default `ePub`, legacy static facade, and UMD global surface, so this slice converts only those entry files while preserving package export behavior.
- Diff Scope:
  - `src/index.ts`: convert the package root entry from JavaScript to TypeScript while preserving the default `ePub` export and named `Book`, `EpubCFI`, `Rendition`, `Contents`, `Layout`, and `request` exports.
  - `src/epub.ts`: convert the callable `ePub` factory entry from JavaScript to TypeScript with an explicit static facade type for `VERSION`, `Book`, `Rendition`, `Contents`, `CFI`, and `utils`.
  - `vite.config.mjs`, `vite.umd.config.mjs`: point Vite library builds at the TypeScript source entries while preserving existing `dist/` output file names and formats.
  - `scripts/verify-pack-contents.mjs`, `scripts/verify-internal-boundaries.mjs`: update entry-source contracts for the converted TypeScript files.
  - `test/browser/public-api.test.js`: import the TypeScript source entry through extensionless resolution while preserving public API coverage.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/umd-global.test.js test/browser/epub.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if TypeScript entry conversion changes package root exports, callable default `ePub`, legacy static facade fields, global `EPUBJS_VERSION`, or UMD browser global behavior.

### P-0134
- Why:
  - P-0133 moved Stage to TypeScript, leaving `src/utils/scrolltype` as a small browser utility still written in JavaScript.
  - `scrollType()` feeds manager RTL scroll handling, so this slice adds direct browser-mode coverage for the detector DOM structure, known return values, and cleanup before converting it to TypeScript.
- Diff Scope:
  - `src/utils/scrolltype.ts`: convert the RTL scroll type detector from JavaScript to TypeScript while preserving default/reverse/negative detection, `scrollIntoView()` fallback behavior, detector cleanup, and `createDefiner()` DOM structure.
  - `test/browser/scrolltype.test.js`: add browser-mode coverage for the RTL detector structure and `scrollType()` return/cleanup contract.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/scrolltype.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/views.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes RTL scroll type detection, detector DOM structure, cleanup behavior, or manager RTL scroll integration.

### P-0133
- Why:
  - P-0132 moved Snap to TypeScript, leaving Stage as the next rendering-manager helper with focused browser coverage.
  - `src/managers/helpers/stage` owns stage container creation, attachment, sizing, bounds fallback, scoped style rules, axis/direction/overflow updates, resize/orientation listeners, and destroy cleanup, so this slice expands direct coverage before converting it to TypeScript without changing manager display, request, archive, CFI, or pagination model logic.
- Diff Scope:
  - `src/managers/helpers/stage.ts`: convert Stage from JavaScript to TypeScript while preserving container creation, hidden wrapper attachment, size measurement, bounds fallback, scoped style insertion, axis/direction/overflow updates, listener registration, and destroy cleanup.
  - `test/browser/manager-listeners.test.js`: add browser-mode coverage for hidden wrapper attachment, axis/direction/overflow updates, and scoped stage style rules.
  - `types/lodash-throttle.d.ts`: add a narrow declaration for the existing `lodash/throttle` helper used by converted TypeScript sources.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/manager-listeners.test.js test/browser/views.test.js test/browser/continuous-manager.test.js test/browser/vertical-rl-manager.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes stage container creation, hidden wrapper attachment, sizing or bounds behavior, scoped CSS insertion, axis/direction/overflow styling, resize/orientation listener cleanup, or manager stage integration.

### P-0132
- Why:
  - P-0131 moved the Views collection helper to TypeScript, leaving Snap as the next small rendering-manager helper with direct browser coverage.
  - `src/managers/helpers/snap` owns touch support setup, scroll listener wiring, swipe thresholds, snap target calculation, smooth scrolling, and destroy cleanup, so this slice expands setup/destroy coverage before converting it to TypeScript without changing manager display, request, archive, CFI, or pagination model logic.
- Diff Scope:
  - `src/managers/helpers/snap.ts`: convert Snap from JavaScript to TypeScript while preserving default settings, public `supportsTouch` boolean behavior, manager setup, listener add/remove, content touch event forwarding, swipe detection, snap target calculation, smooth scroll cancellation, fullsize/non-fullsize scroll behavior, and destroy cleanup.
  - `test/browser/snap.test.js`: add browser-mode coverage for touch setup, vertical no-listener branch, and fullsize destroy cleanup in addition to existing swipe, snap, and scroll tests.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/snap.test.js test/browser/continuous-manager.test.js test/browser/manager-listeners.test.js test/browser/vertical-rl-manager.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes touch setup, listener cleanup, swipe thresholds, snap target calculation, smooth-scroll cancellation, fullsize scroll locking, or continuous-manager snap integration.

### P-0131
- Why:
  - P-0130 moved Annotations to TypeScript, leaving the Views collection helper as a small rendering-manager leaf with existing browser coverage.
  - `src/managers/helpers/views` owns view collection ordering, container insertion/removal, displayed filtering, and bulk show/hide behavior, so this slice expands direct browser-mode coverage before converting it to TypeScript without changing manager display, scroll, or pagination logic.
- Diff Scope:
  - `src/managers/helpers/views.ts`: convert the Views collection helper from JavaScript to TypeScript while preserving append/prepend/insert ordering, length tracking, container DOM mutations, remove/destroy behavior, iterator delegation, clear, find, displayed, show, and hide behavior.
  - `test/browser/views.test.js`: add browser-mode coverage for append/prepend/insert ordering, section lookup, displayed filtering, show/hide filtering, and remove/destroy behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes view ordering, DOM insertion/removal, length tracking, displayed filtering, find behavior, show/hide behavior, or manager view collection integration.

### P-0130
- Why:
  - P-0129 moved Themes to TypeScript with direct browser coverage, leaving Annotations as the next Rendition-owned leaf that can be converted without touching request, archive, CFI parsing logic, pagination, or manager layout behavior.
  - `src/annotations` owns annotation storage, section-index attachment, render/unloaded hooks, view attach/detach calls, and annotation attach/detach events, so this slice adds direct browser-mode coverage before converting it to TypeScript.
- Diff Scope:
  - `src/annotations.ts`: convert Annotations and its internal Annotation object from JavaScript to TypeScript while preserving hook registration, hash storage, section-index registry, visible-view attach, remove/detach, inject/clear hooks, update, and event-emitter behavior.
  - `test/browser/annotations.test.js`: add browser-mode coverage for constructor hooks, highlight storage/attach, inject/clear hooks, remove registry cleanup, attach/detach events, and data updates.
  - `types/event-emitter.d.ts`: add a narrow declaration for the existing `event-emitter` mixin package used by converted TypeScript sources.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/annotations.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes annotation hash keys, section-index attachment, render/unloaded hook behavior, view highlight/underline/mark calls, detach cleanup, attach/detach events, or data update behavior.

### P-0129
- Why:
  - P-0128 moved replacement helpers to TypeScript, leaving `src/themes` as a small Rendition-owned leaf that can be converted without touching request, archive, CFI, pagination, or manager layout logic.
  - `Themes` wires content hooks, registers stylesheet URLs/rules/serialized CSS, selects active themes, and applies CSS overrides, so this slice adds direct browser-mode coverage before converting the module.
- Diff Scope:
  - `src/themes.ts`: convert Themes from JavaScript to TypeScript while preserving constructor hook registration, register/default dispatch, URL/rule/CSS injection, theme selection class changes, override/removeOverride, font helpers, and destroy cleanup behavior.
  - `test/browser/themes.test.js`: add browser-mode coverage for hook registration, rule theme injection, URL/default theme registration, serialized CSS injection, select class changes, overrides, stored override hook replay, and destroy cleanup.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/themes.test.js test/browser/rendition.test.js test/browser/public-api.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes theme registration dispatch, content hook behavior, stylesheet injection, selected theme classes, override priority handling, or destroy cleanup.

### P-0128
- Why:
  - P-0127 moved Hook to TypeScript and added browser coverage, leaving replacement helpers as the next tested utility leaf.
  - `src/utils/replacements` injects base/canonical/meta tags, rewrites internal links, and substitutes resource URLs for content/resource flows, so the conversion should preserve DOM mutation, same-document hash scoping, absolute-link target behavior, and escaped URL substitution.
- Diff Scope:
  - `src/utils/replacements.ts`: convert replacement helpers from JavaScript to TypeScript while preserving base/canonical/meta injection, link rewrite branching, section-href hash scoping, external target assignment, and CSS/resource URL substitution.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/replacements.test.js test/browser/vertical-rl-manager.test.js test/browser/spine.test.js test/browser/rendition.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes link rewrite behavior, metadata/base injection, same-document hash scoping, external link handling, or resource URL substitution.

### P-0127
- Why:
  - P-0126 moved the URL utility to TypeScript, leaving the small Hook utility as the next shared leaf in the TypeScript migration.
  - `src/utils/hook` coordinates content, serialize, layout, and rendition extension hooks, so the conversion should preserve registration forms, context binding, async task aggregation, synchronous-error logging, deregistration, listing, and clearing behavior.
- Diff Scope:
  - `src/utils/hook.ts`: convert Hook from JavaScript to TypeScript while preserving variadic/array registration, trigger context, Promise aggregation, sync error logging, deregister, list, and clear behavior.
  - `test/browser/hook.test.js`: add browser-mode coverage for Hook registration, async trigger results, deregister/clear, and sync-error logging behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/hook.test.js test/browser/spine.test.js test/browser/rendition.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes hook registration, trigger context, async aggregation, sync-error handling, or spine/rendition hook integration.

### P-0126
- Why:
  - P-0125 moved the queue utility to TypeScript, leaving the URL utility paired with the converted Path helper as the next browser-tested leaf.
  - `src/utils/url` parses absolute, relative, and file URLs for public core helpers, request/resource resolution, and link replacement paths, so the conversion should preserve URL constructor fallback, base handling, file URL behavior, and resolve/relative output while adding TypeScript source coverage.
- Diff Scope:
  - `src/utils/url.ts`: convert the Url helper from JavaScript to TypeScript while preserving field initialization, optional/false base handling, URL parse fallback, Path integration, resolve, relative, and string conversion behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core.test.js test/browser/replacements.test.js test/browser/request.test.js test/browser/resources.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes URL parsing, file URL behavior, base fallback, resolve/relative output, request path resolution, or link replacement behavior.

### P-0125
- Why:
  - P-0124 moved the Path helper to TypeScript, leaving the queue utility as the next browser-tested shared utility migration.
  - `src/utils/queue` sequences async tasks for the default manager and rendition paths, so the conversion should preserve legacy queue scheduling, pause/run/flush behavior, promise passthrough, and `Task` constructor-return-function compatibility while adding TypeScript source coverage.
- Diff Scope:
  - `src/utils/queue.ts`: convert Queue and Task from JavaScript to TypeScript while preserving deferred handling, requestAnimationFrame scheduling, running-state shape, queue item shape, and callback task wrapper behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/queue.test.js test/browser/teardown-raf.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes queue sequencing, pause/run/flush behavior, promise rejection handling, rAF teardown behavior, or manager/rendition queue integration.

### P-0124
- Why:
  - P-0123 moved MIME lookup helpers to TypeScript, leaving the URL/path utility leaf as the next small, browser-tested utility migration.
  - `src/utils/path` provides path parsing, directory detection, resolve, and relative helpers consumed by `Url`, request, resources, and legacy public utilities, so the conversion should preserve path-webpack behavior while adding TypeScript source coverage.
- Diff Scope:
  - `src/utils/path.ts`: convert the Path helper from JavaScript to TypeScript while preserving URL origin stripping, directory detection, filename/extension parsing, resolve, relative, splitPath, and string conversion behavior.
  - `types/path-webpack.d.ts`: extend the existing narrow shim with the `parse`, `isAbsolute`, `resolve`, and `relative` APIs used by Path.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core.test.js test/browser/request.test.js test/browser/resources.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes Path parsing, URL origin stripping, resolve/relative output, request extension detection, or resource CSS relative URL handling.

### P-0123
- Why:
  - P-0122 moved the shared constants utility to TypeScript, leaving small utility leaves with direct browser-mode coverage as the next migration candidates.
  - `src/utils/mime` owns MIME extension lookup and XML-extension detection used by archive, store, resources, request, and the legacy core facade, so the conversion should preserve table values and fallback behavior while adding TypeScript source coverage.
- Diff Scope:
  - `src/utils/mime.ts`: convert MIME lookup and XML-extension helper from JavaScript to TypeScript while preserving the lookup table, default `text/plain` fallback, default export shape, and `isXml()` behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/mime.test.js test/browser/archive.test.js test/browser/store.test.js test/browser/resources.test.js test/browser/request.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes MIME lookup, XML-extension detection, archive/store/resource MIME handling, or request XML detection behavior.

### P-0122
- Why:
  - P-0121 moved the package container parser to TypeScript, leaving small shared utility leaves as the next low-risk TypeScript migration candidates.
  - `src/utils/constants` is a pure constant export used by the public `ePub.VERSION`, content DOM event wiring, and event emitters, so this slice can advance the TypeScript source set without changing runtime event names or reader behavior.
- Diff Scope:
  - `src/utils/constants.ts`: convert EPUB version, DOM event names, and event-name constants from JavaScript to TypeScript while preserving all exported values.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/contents-text-width.test.js test/browser/rendition.test.js test/browser/manager-listeners.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes public version exports, DOM event registration, or emitted event names.

### P-0121
- Why:
  - P-0120 moved the standalone display option parser to TypeScript, leaving the package container XML parser as the next small leaf with isolated browser-mode coverage.
  - `src/container` resolves `META-INF/container.xml` rootfile metadata for `Book.openContainer()`, so the conversion should preserve package path, directory, encoding, and legacy error behavior without touching rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/container.ts`: convert the Container parser from JavaScript to TypeScript while preserving constructor defaults, rootfile lookup, `path.dirname()` directory resolution, parse errors, and destroy cleanup behavior.
  - `types/path-webpack.d.ts`: add the narrow `path-webpack.dirname()` shim required by the TypeScript source pipeline.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/container.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes container XML parsing, rootfile error handling, directory resolution, or destroy cleanup behavior.

### P-0120
- Why:
  - P-0119 locked the converted compatibility boundary in the TypeScript source pipeline, leaving small standalone parser leaves as the next low-risk TypeScript migration candidates.
  - `src/displayoptions` parses iBooks display option metadata and has isolated browser-mode coverage, so it can move to TypeScript without touching rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/displayoptions.ts`: convert the DisplayOptions parser from JavaScript to TypeScript while preserving defaults, XML option parsing, export name, and destroy cleanup behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/displayoptions.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes display option parsing, default values, or destroy cleanup behavior.

### P-0119
- Why:
  - P-0117 and P-0118 converted both compatibility boundary files to TypeScript, but the source pipeline contract only locked core and platform directories.
  - `src/compat/css` and `src/compat/range` provide legacy CSS prefix and RangeObject fallback behavior, so the TypeScript gate should prevent silent regression to JavaScript source files in the compat boundary.
  - This is a repo-only contract slice and does not change EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-typescript-source-pipeline.mjs`: require `src/compat` to contain `css.ts` and `range.ts` with no JavaScript source files.
- Test:
  - `npm run verify:typescript-source-pipeline`
  - `npm run verify:contracts`
  - `npm run typecheck`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if `src/compat` should allow new JavaScript source files during later migration slices.

### P-0118
- Why:
  - P-0117 converted the small CSS compatibility helper to TypeScript, leaving RangeObject as the remaining compatibility boundary in the current batch.
  - `RangeObject` is used by the legacy core export and `EpubCFI.toRange()` fallback when native `createRange()` is unavailable, so the conversion should preserve existing range boundary, collapse, common-ancestor, selectNode, and selectNodeContents behavior while adding TypeScript property signatures.
  - This is a repo-only TypeScript leaf conversion slice; because it touches CFI fallback, validation includes compat-range, CFI, locations, text-width, and traversal coverage.
- Diff Scope:
  - `src/compat/range.ts`: convert RangeObject from JavaScript to TypeScript while preserving export name, property initialization, range boundary methods, and fallback behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/compat-range.test.js test/browser/epubcfi.test.js test/browser/locations.test.js test/browser/contents-text-width.test.js test/browser/platform-traversal.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes RangeObject boundary behavior, legacy core RangeObject compatibility, or CFI fallback range behavior.

### P-0117
- Why:
  - P-0116 locked the converted core boundary as TypeScript-only, leaving compatibility helpers as the next low-risk source area for TypeScript conversion.
  - `src/compat/css` is a small browser compatibility leaf used by the legacy core `prefixed()` export, so converting it to TypeScript advances the compat boundary without touching rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/compat/css.ts`: convert CSS prefix lookup from JavaScript to TypeScript while preserving the vendor prefix list, style lookup, and legacy core compatibility export behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/compat-css.test.js test/browser/public-api.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes CSS property prefix lookup or legacy `utils/core.prefixed()` compatibility.

### P-0116
- Why:
  - P-0115 locked the platform boundary as TypeScript-only, while the core boundary converted in P-0106 through P-0108 still lacked the same regression contract.
  - `src/core/async`, `src/core/collections`, and `src/core/types` are shared by managers, views, queue, request, and the legacy core facade, so the TypeScript source pipeline gate should protect them from silently regressing to JavaScript source files.
  - This is a repo-only contract slice and does not change EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-typescript-source-pipeline.mjs`: add a reusable TypeScript boundary verifier and require `src/core` to contain the converted TypeScript core files with no JavaScript source files.
- Test:
  - `npm run verify:typescript-source-pipeline`
  - `npm run verify:contracts`
  - `npm run typecheck`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if `src/core` should allow new JavaScript source files during later migration slices.

### P-0115
- Why:
  - P-0109 through P-0114 converted the browser/platform boundary files from JavaScript to TypeScript, but the TypeScript source pipeline contract only verified compiler wiring.
  - The platform TypeScript boundary should be protected by the repo contract gate so future slices cannot silently reintroduce `src/platform/*.js` files or drop a converted boundary from the TypeScript source set.
  - This is a repo-only contract slice and does not change EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-typescript-source-pipeline.mjs`: require `src/platform` to contain the converted TypeScript boundary files and no JavaScript source files.
- Test:
  - `npm run verify:typescript-source-pipeline`
  - `npm run verify:contracts`
  - `npm run typecheck`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if `src/platform` should allow new JavaScript source files during later migration slices.

### P-0114
- Why:
  - P-0113 converted parser selection to TypeScript, leaving DOM traversal as the last platform leaf in the current TypeScript conversion batch.
  - `sprint()`, `treeWalker()`, `walk()`, child/parent helpers, and node index helpers feed the legacy core facade, RangeObject fallback, CFI, locations, section serialization, navigation, and packaging paths, so the conversion should preserve existing traversal and indexing behavior while adding typed DOM traversal boundaries.
  - This is a repo-only TypeScript leaf conversion slice; because it touches traversal used by CFI and Range fallback, validation includes compat-range, CFI, locations, section, navigation, and packaging coverage.
- Diff Scope:
  - `src/platform/traversal.ts`: convert DOM traversal, child/parent, and node-index helpers from JavaScript to TypeScript while preserving export names, recursive walk behavior, parent-chain behavior, filterChildren single/multiple behavior, and node index semantics.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/compat-range.test.js test/browser/epubcfi.test.js test/browser/locations.test.js test/browser/section.test.js test/browser/navigation.test.js test/browser/packaging.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes DOM traversal order, RangeObject fallback, CFI traversal, parent-chain behavior, child filtering, or node index semantics.

### P-0113
- Why:
  - P-0112 converted layout geometry helpers to TypeScript, leaving parser selection and BOM stripping as the next platform leaf in the current split.
  - `getParserConstructor()`, `stripByteOrderMark()`, and `parseMarkup()` feed the legacy core facade, request XML/HTML parsing, locations fixtures, package/navigation parsing, and inline view parsing, so the conversion should preserve native DOMParser/XMLDOMParser selection while adding typed parser boundaries.
  - This is a repo-only TypeScript leaf conversion slice; because it touches request parsing, validation includes request and XML/HTML parser consumers.
- Diff Scope:
  - `src/platform/parser.ts`: convert parser constructor resolution, BOM stripping, and parseMarkup from JavaScript to TypeScript while preserving export names and parser fallback behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-parser.test.js test/browser/request.test.js test/browser/locations.test.js test/browser/views.test.js test/browser/packaging.test.js test/browser/navigation.test.js test/browser/container.test.js test/browser/displayoptions.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes native parser selection, forced XMLDOM parsing, BOM stripping, or request XML/HTML parse behavior.

### P-0112
- Why:
  - P-0111 converted DOM query helpers to TypeScript, leaving layout geometry helpers as the next platform leaf in the current split.
  - `documentHeight()`, `bounds()`, `borders()`, `nodeBounds()`, and `windowBounds()` feed the legacy core facade, iframe/inline views, stage bounds, default manager, continuous manager, and vertical writing-mode tests, so the conversion should preserve existing computed-style and DOMRect behavior while adding typed geometry boundaries.
  - This is a repo-only TypeScript leaf conversion slice; because it touches layout-sensitive helpers, validation includes view, manager, rendition, continuous, and vertical writing-mode coverage.
- Diff Scope:
  - `src/platform/layout.ts`: convert browser layout geometry helpers from JavaScript to TypeScript while preserving export names, CSS pixel summing, text-node range bounds, and window/document bounds behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-layout.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/vertical-rl-manager.test.js test/browser/rendition.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes element bounds, border sums, text-node range bounds, window/document geometry, or layout-sensitive manager behavior.

### P-0111
- Why:
  - P-0110 converted the Blob platform boundary to TypeScript, leaving DOM query helpers as the next small browser/XML platform leaf in the current split.
  - `qs()`, `qsa()`, `qsp()`, and `querySelectorByType()` are shared by the legacy core facade, replacements, packaging, navigation, page-list, and inline view paths, so the conversion should preserve existing selector fallback behavior while adding typed root and collection boundaries.
  - This is a repo-only TypeScript leaf conversion slice and does not intentionally change pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/platform/dom.ts`: convert DOM query helpers from JavaScript to TypeScript while preserving export names, missing-root error behavior, fallback collections, and EPUB type lookup semantics.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-dom.test.js test/browser/replacements.test.js test/browser/views.test.js test/browser/packaging.test.js test/browser/navigation.test.js test/browser/pagelist.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes DOM selector fallback, EPUB type lookup, or legacy core query helper compatibility.

### P-0110
- Why:
  - P-0109 converted the browser-global platform boundary to TypeScript, leaving `src/platform/blob` as the next small browser platform leaf in the current split.
  - Blob creation, object URL management, base64 data URL creation, and FileReader conversion are browser platform concerns used by the legacy core facade and iframe view blob rendering path, so the conversion should preserve existing runtime behavior while adding typed DOM boundaries.
  - This is a repo-only TypeScript leaf conversion slice and does not intentionally change pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/platform/blob.ts`: convert Blob/object URL/base64/FileReader helpers from JavaScript to TypeScript while preserving export names and existing content wrapping behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-blob.test.js test/browser/views.test.js test/browser/contents-text-width.test.js test/browser/public-api.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes Blob content wrapping, object URL lifecycle, base64 data URL output, or FileReader conversion behavior.

### P-0109
- Why:
  - P-0108 converted the remaining low-level collection helpers to TypeScript, leaving the platform browser boundary as the next small leaf candidate in the core/rendering/platform split.
  - `src/platform/browser` owns browser global, URL constructor, and requestAnimationFrame lookup for the legacy core facade, queue, and continuous manager paths, so the conversion should preserve the existing runtime fallback behavior while adding typed DOM/vendor-prefixed access.
  - This is a repo-only TypeScript leaf conversion slice and does not intentionally change EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/platform/browser.ts`: convert browser global and requestAnimationFrame lookup helpers from JavaScript to TypeScript while preserving export names and the existing `false` non-browser fallback.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-browser.test.js test/browser/queue.test.js test/browser/continuous-manager.test.js test/browser/manager-listeners.test.js test/browser/teardown-raf.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes browser global lookup, URL fallback, or legacy requestAnimationFrame export compatibility.

## 2026-06-02

### P-0108
- Why:
  - P-0107 converted the async/id core boundary to TypeScript, leaving `src/core/collections` as the remaining low-level core leaf in the current split.
  - The collection helpers are shared by settings merges, CFI construction, location/page-list sorted lookup, rendition setup, and manager/view configuration, so the conversion should keep the same helper exports and sorted-array behavior while adding TypeScript generics.
  - This is a repo-only TypeScript leaf conversion slice and does not intentionally change EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/core/collections.ts`: convert defaults/extend/sorted-array helpers from JavaScript to TypeScript while preserving export names and generated `lib/` compatibility output.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-collections.test.js test/browser/book.test.js test/browser/epubcfi.test.js test/browser/locations.test.js test/browser/pagelist.test.js test/browser/rendition.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/vertical-rl-manager.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes legacy defaults/extend descriptor handling or sorted-array lookup semantics.

### P-0107
- Why:
  - P-0106 proved the first TypeScript leaf conversion path with pure type helpers, leaving `src/core/async` as the next low-level core boundary candidate.
  - `uuid()` and the function-constructor `defer()` are shared primitives used by book, rendition, archive, store, request, queue, views, and managers, so converting them to TypeScript should preserve the existing runtime constructor shape instead of switching to a class.
  - This is a repo-only TypeScript leaf conversion slice and does not intentionally change EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/core/async.ts`: convert the async/id helper boundary from JavaScript to TypeScript while preserving `uuid()` and function-constructor `defer()` exports.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-async.test.js test/browser/book.test.js test/browser/archive.test.js test/browser/request.test.js test/browser/store.test.js test/browser/queue.test.js test/browser/rendition.test.js test/browser/views.test.js test/browser/manager-listeners.test.js test/browser/continuous-manager.test.js test/browser/vertical-rl-manager.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if TypeScript conversion changes the legacy `new defer()` / `coreDefer.call(this)` constructor compatibility path.

### P-0106
- Why:
  - P-0105 made the source pipeline capable of compiling TypeScript, but no source module had moved to `.ts` yet.
  - `src/core/types` is a pure leaf helper boundary used by existing extensionless imports and covered by focused Vitest Browser tests, making it the lowest-risk first source conversion.
  - This is a repo-only TypeScript leaf conversion slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `src/core/types.ts`: convert the pure type helper boundary from JavaScript to TypeScript while preserving the exported helper names.
  - `scripts/verify-internal-boundaries.mjs`: scan `.ts` source files as well as `.js` and generated `lib/` output so the internal boundary contract keeps covering converted modules.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-types.test.js test/browser/public-api.test.js`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if the first TypeScript source conversion exposes downstream bundler or Babel compatibility gaps.

### P-0105
- Why:
  - P-0104 locked the typed browser/global public API, but the source pipeline still only compiled `src/**/*.js` into the transitional `lib/` output.
  - The next modernization step needs a safe path to convert one low-risk leaf module to TypeScript without losing Babel-generated compatibility output or bypassing the repo typecheck gate.
  - This is a repo-only TypeScript source pipeline slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `.babelrc.json` / `package.json`: add Babel TypeScript support and compile/watch `.js,.ts` source extensions.
  - `tsconfig.json`: include `src/**/*.ts` so future TypeScript source files are checked by the repo gate.
  - `scripts/verify-typescript-source-pipeline.mjs`: add a contract verifier for the TypeScript source pipeline and include it in `npm run verify:contracts`.
  - `scripts/verify-pack-contents.mjs`: require the new pipeline verifier script in dry-run package contents.
- Test:
  - `npm run verify:typescript-source-pipeline`
  - `npm run typecheck`
  - `npm run compile`
  - `npm run build`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if the repo should postpone TypeScript source compilation support until the first actual source-file conversion.

### P-0104
- Why:
  - P-0103 locked the runtime browser UMD global, but the transitional TypeScript gate still only covered module imports from the root declaration entry.
  - `types/index.d.ts` intentionally exposes `export as namespace ePub` for classic browser/global consumers, so that global public API should be covered by the repo `typecheck` gate before Gate 1 tag work.
  - This is a repo-only typed-public-API contract slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `types/index.d.ts`: type the browser global `ePub` as the callable default export with static members instead of the module namespace object.
  - `types/global-namespace-tests.ts`: add a script-style TypeScript smoke for the global `ePub` namespace and its static public surface.
  - `tsconfig.json`: include all `types/**/*-tests.ts` declaration smoke files instead of one hard-coded test file.
- Test:
  - `npm run typecheck`
  - `npm run verify:contracts`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if browser global namespace typing should remain outside the repo TypeScript gate.

### P-0103
- Why:
  - Gate 1 package entry contracts verified ESM/CJS package resolution and dry-run tarball consumers, but the browser UMD entry referenced by `package.json#browser` was only checked manually.
  - Aitehub and legacy examples can still consume the browser build through a classic script global, so both `dist/epub.js` and `dist/epub.min.js` should be covered by Vitest Browser Mode before tag work.
  - This is a repo-only Vite/Rollup Browser Mode contract slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `test/browser/umd-global.test.js`: inject the unminified and minified UMD bundles as classic browser scripts and verify the `window.ePub` public surface.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/umd-global.test.js`
  - `npm run test:browser`
  - `npm run typecheck`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if browser global UMD validation should remain a manual example smoke instead of a Vitest Browser contract.

### P-0102
- Why:
  - P-0101 locked the source boundary so internal `src/**/*.js` modules cannot re-import the legacy `utils/core` facade, but the release tarball also includes Babel-generated `lib/` files.
  - Aitehub tarball consumers may still inspect or transitively consume compatibility `lib/` output, so generated files should preserve the same boundary: only the public facade and `utils/core` implementation may reference the legacy core facade.
  - This is a repo-only generated-boundary slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-internal-boundaries.mjs`: scan both `src/` and generated `lib/`, allowing only `src/epub.js`, `src/utils/core.js`, `lib/epub.js`, and `lib/utils/core.js` to reference `utils/core`.
- Test:
  - `npm run verify:internal-boundaries`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if generated `lib/` compatibility output should not be governed by the internal boundary contract.

### P-0101
- Why:
  - The F+ internal split has moved source modules off the legacy `utils/core` facade, leaving `src/epub.js` as the intentional public compatibility surface.
  - Without a contract, future internal slices could accidentally reintroduce `utils/core` imports and blur the `core/platform/compat` boundaries before Gate 1 release work.
  - This is a repo-only internal-boundary slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-internal-boundaries.mjs`: add a source scanner that allows the public facade and `utils/core` implementation while blocking other `src/**/*.js` imports of `utils/core`.
  - `package.json`: add `npm run verify:internal-boundaries` and include it in `npm run verify:contracts`.
  - `scripts/verify-pack-contents.mjs`: require the internal-boundary verifier script in dry-run package contents.
  - `README.md`: document the internal source boundary as part of the contract gate.
- Test:
  - `npm run verify:internal-boundaries`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if internal modules should be allowed to import the legacy `utils/core` facade again.

### P-0100
- Why:
  - The tarball contents verifier checks the final dry-run package file list, but the `.npmignore` packaging policy that keeps fixtures, generated Vitest artifacts, and local books out of release tarballs was not itself locked.
  - Aitehub consumes codeload tarballs, so packaging hygiene should fail as soon as required ignore rules drift, before unrelated file additions make the dry-run output noisy.
  - This is a repo-only packaging-contract slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-pack-contents.mjs`: require `.npmignore` to keep the current package hygiene entries for books, tests, Babel config, and Vitest attachments.
- Test:
  - `npm run verify:pack-contents`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if `.npmignore` policy should remain a manual review instead of a package contract.

### P-0099
- Why:
  - P-0098 locked the order of required `npm run verify:release` steps, but the verifier still allowed extra commands to be inserted into the shared release gate.
  - The pre-tag and CI release gate should remain an exact, reviewable sequence so Aitehub tarball consumers are protected by the same lint, declarations, generated artifacts, docs, contracts, browser tests, audits, and final pack lifecycle checks every time.
  - This is a repo-only release-contract slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-release-gate.mjs`: parse `verify:release` by `&&` and require it to exactly match the canonical release-gate step list.
- Test:
  - `npm run verify:release-gate`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if extra release-gate commands should be allowed without updating the contract.

### P-0098
- Why:
  - P-0097 verified that `npm run verify:release` includes the required release steps, but an accidental reorder could still let package contracts or the final pack lifecycle run before generated artifacts and docs are fresh.
  - The release gate should preserve the intended sequence: lint, declarations, Babel output, Vite/Rollup build, TypeDoc Markdown, contracts, browser tests, audits, and the ordinary pack dry-run.
  - This is a repo-only release-contract slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-release-gate.mjs`: assert required `verify:release` steps appear in the intended order.
- Test:
  - `npm run verify:release-gate`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if release step ordering should remain a manual review instead of a repo contract.

### P-0097
- Why:
  - The shared release gate now drives CI and the pre-tag checklist, but the repo did not yet have a contract that verifies `npm run verify:release` keeps its required steps or that CI calls the shared gate instead of duplicating partial commands.
  - Aitehub consumes this fork through release tarballs, so release-gate drift should fail inside the repo before a tag is cut.
  - This is a repo-only release-contract slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-release-gate.mjs`: add a verifier for `npm run verify:release`, CI wiring, and README release checklist wording.
  - `package.json`: add `npm run verify:release-gate` and include it in `npm run verify:contracts`.
  - `scripts/verify-pack-contents.mjs`: require the release-gate verifier script in dry-run package contents.
  - `README.md`: document release gate wiring as part of `npm run verify:contracts`.
- Test:
  - `npm run verify:release-gate`
  - `npm run verify:contracts`
  - `npm run verify:release`
- Rollback:
  - Revert this patch if release-gate wiring should remain a manual checklist review instead of a repo contract.

### P-0096
- Why:
  - P-0095 added a packed-package consumer verifier to the contract gate, but the tarball contents contract still did not explicitly require that verifier script to remain included.
  - The README release-contract description also still described tarball contents only, without naming the packed-package consumer resolution smoke that now protects Aitehub-style package consumption.
  - This is a repo-only contract convergence slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-pack-contents.mjs`: require `scripts/verify-packed-package-entry.mjs` in dry-run package contents.
  - `README.md`: document packed-package consumer resolution as part of `npm run verify:contracts`.
- Test:
  - `npm run verify:pack-contents`
  - `npm run verify:contracts`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if verifier scripts should no longer be required package contents.

### P-0095
- Why:
  - Gate 1 package contracts verified built entry files and dry-run tarball contents separately, but they did not yet prove that a clean downstream package consumer can resolve the root export from only the files that `npm pack --dry-run` reports.
  - Aitehub consumes GitHub tarballs through package resolution, so the release gate should exercise bare `import "epubjs"`, `require("epubjs")`, and `require("epubjs/package.json")` against a reconstructed packed-package fixture.
  - This is a repo-only packaging-contract slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-packed-package-entry.mjs`: add a dry-run pack consumer smoke that reconstructs a temporary `node_modules/epubjs` package from the packed file list and checks ESM/CJS public surfaces.
  - `package.json`: add `npm run verify:packed-package-entry` and include it in `npm run verify:contracts`.
- Test:
  - `npm run verify:packed-package-entry`
  - `npm run verify:contracts`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if packed-package consumer resolution should remain a manual release checklist check instead of a repo script.

### P-0094
- Why:
  - `npm run verify:release` covered generated artifacts, contracts, browser tests, and audits, but the final ordinary `npm pack --dry-run` remained outside the shared release gate.
  - The package contract verifier intentionally uses `--ignore-scripts` to inspect contents without recursion; the release gate should still exercise the real npm prepare lifecycle that a release dry-run runs before tagging.
  - This is a repo-only release-gate tightening slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `package.json`: append `npm pack --dry-run` to `npm run verify:release`.
  - `README.md`: document that the release gate includes the final pack lifecycle check.
- Test:
  - `npm run verify:release`
  - `npm run verify:contracts`
- Rollback:
  - Revert this patch if the final ordinary pack dry-run should remain a separate manual command outside the release gate.

### P-0093
- Why:
  - `npm run verify:release` is now the canonical upstream pre-tag gate, but CI still duplicated the same steps manually.
  - Keeping CI on the same release gate prevents the release checklist, package contracts, audits, and browser tests from drifting before a tag is consumed by Aitehub.
  - This is a repo-only CI gate convergence slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `.github/workflows/ci.yml`: replace the manual lint/typecheck/compile/build/docs/contracts/test steps with `npm run verify:release`.
- Test:
  - `npm run verify:release`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if CI should keep expanded manual steps instead of the shared release gate command.

### P-0092
- Why:
  - Gate 1 now has strong package/docs/test/tarball contracts, but the fork release checklist still required manually running a sequence of commands.
  - Before cutting a tag consumed by Aitehub, the repo needs one repeatable release gate that includes lint, TypeScript declarations, generated artifacts, TypeDoc, package contracts, browser tests, and dependency audits.
  - This is a repo-only release-gate script slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `package.json`: add `npm run verify:release` as the full pre-tag upstream release gate.
  - `README.md`: replace the manual release command list with `npm run verify:release` and document its coverage.
- Test:
  - `npm run verify:release`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if the release gate should stay as separate manual commands instead of one npm script.

### P-0091
- Why:
  - Gate 1 now has contract verifiers for package entries, docs, and tests, but release tarball contents were still checked by manually reading `npm pack --dry-run` output.
  - Aitehub consumes GitHub tarballs, so the package artifacts referenced by `main`, `module`, `browser`, `types`, and docs/tooling guardrails should be mechanically verified as included while test fixtures and generated Vitest artifacts stay excluded.
  - This is a repo-only packaging-contract slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-pack-contents.mjs`: add a Node verifier around `npm pack --dry-run --json --ignore-scripts`.
  - `package.json`: add `npm run verify:pack-contents` and include it in `npm run verify:contracts`.
  - `README.md`: document that the shared contract gate includes tarball contents.
- Test:
  - `npm run verify:pack-contents`
  - `npm run verify:contracts`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if dry-run tarball contents should remain a manual release checklist check instead of a repo script.

### P-0090
- Why:
  - Gate 1 now has separate package-entry, TypeDoc, and Vitest-only contract verifiers, but CI and the release checklist still need a single stable command for those checks.
  - Aitehub consumes GitHub codeload tarballs, so the same contract gate should run automatically after build/docs generation and before browser tests.
  - This is a repo-only CI/release-checklist slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `package.json`: add `npm run verify:contracts` to run the docs, package-entry, and test-modernization verifiers together.
  - `.github/workflows/ci.yml`: run `npm run verify:contracts` after build/docs and before the browser test gate.
  - `README.md`: add the contract verifier to the fork release checklist and explain what it covers.
- Test:
  - `npm run verify:contracts`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if CI should keep the three contract verifiers as manual release-only checks instead of a shared command.

### P-0089
- Why:
  - The documentation toolchain has moved from documentation.js to TypeDoc, but the repo needs a repeatable guard before Gate 1/host release work.
  - Aitehub consumes the package public surface through declarations and tarballs, so generated docs should stay tied to `types/index.d.ts` rather than legacy JSDoc/source parsing.
  - This is a repo-only documentation/tooling slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-docs-modernization.mjs`: add a Node verifier for TypeDoc scripts, dependencies, configs, generated markdown docs, and removed `documentation.yml`.
  - `package.json`: add `npm run verify:docs-modernization`.
- Test:
  - `npm run verify:docs-modernization`
  - `npm run docs:md`
  - `npm run docs:html`
  - `npm run verify:package-entry`
  - `npm run verify:test-modernization`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if documentation toolchain verification should remain a manual release checklist item instead of a repo script.

### P-0088
- Why:
  - The Karma-to-Vitest migration is complete, but the repo needs a repeatable guard so new work does not accidentally reintroduce root-level Mocha/Karma tests or runner dependencies.
  - Keeping `npm run test:legacy` as a compatibility no-op is intentional; the contract should verify that no script calls the removed Karma/Mocha runners while `npm test` remains the Vitest Browser gate.
  - This is a repo-only modernization slice and does not touch EPUB rendering, pagination, CFI, request, archive, or host integration behavior.
- Diff Scope:
  - `scripts/verify-test-modernization.mjs`: add a Node verifier for Vitest-only browser test layout, package scripts, and dependency guardrails.
  - `package.json`: add `npm run verify:test-modernization`.
- Test:
  - `npm run verify:test-modernization`
  - `npm run verify:package-entry`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
- Rollback:
  - Revert this patch if legacy Karma/Mocha runner checks should remain a manual review step instead of a repo script.

### P-0087
- Why:
  - Gate 1 needs a repeatable package-entry verifier that tests the built artifacts referenced by `package.json`, not only the source-level public API smoke.
  - Aitehub consumes release tarballs through package resolution, so `main`, `module`, `browser`, `types`, and root `exports` must remain aligned with the generated `dist/` files and declaration entry.
  - The verifier also locks the ESM/CJS built surfaces, including the default callable, named exports, named `request`, and legacy `ePub.utils` compatibility facade.
- Diff Scope:
  - `scripts/verify-package-entry.mjs`: add a Node verifier for package fields and built ESM/CJS public surfaces.
  - `package.json`: add `npm run verify:package-entry`.
- Test:
  - `npm run build`
  - `npm run verify:package-entry`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if package-entry verification should remain a manual release checklist item instead of a repo script.

### P-0086
- Why:
  - Gate 1 needs stronger package-entry evidence now that internal modules no longer import helper dependencies through `utils/core`.
  - `src/epub.js` still intentionally exposes the legacy `ePub.utils` facade as public API; this slice locks that compatibility surface instead of removing it during the internal split.
  - The TypeScript smoke already covered most root exports and `ePub.utils.uuid()`, but it did not exercise the named `Layout` export that runtime public API coverage already expects.
- Diff Scope:
  - `test/browser/public-api.test.js`: add explicit browser runtime coverage for the legacy `ePub.utils` facade and its delegated helper functions.
  - `types/epubjs-tests.ts`: add named `Layout` import/instantiation coverage for the declaration entry.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/core-async.test.js test/browser/platform-blob.test.js test/browser/platform-parser.test.js`
  - `npx eslint test/browser/public-api.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream public API testing should stop treating `ePub.utils` as a supported compatibility facade.

### P-0085
- Why:
  - Continue the F+ internal split by moving `DefaultViewManager` dependencies off the legacy `utils/core` facade.
  - `DefaultViewManager` uses `defer()` for display promises, `extend()` for manager/view settings, `isNumber()` for target normalization, and `windowBounds()` for resize/orientation guards; importing from `src/core/*` and `src/platform/layout` makes the default rendering manager boundary explicit while preserving public `utils/core` compatibility exports.
  - Default manager touches display, resizing, pagination, scroll movement, and vertical-rl boundary snapping, so this slice raises focused verification across manager listeners, rendition, vertical-rl manager, default manager helper coverage, and the direct helper modules before the full browser suite.
- Diff Scope:
  - `src/managers/default/index.js`: import async, collection, type, and layout helpers from direct boundaries.
  - `test/browser/manager-listeners.test.js`: add focused DefaultViewManager coverage for numeric target normalization and square-orientation resize deferral.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/vertical-rl-manager.test.js test/browser/continuous-manager.test.js test/browser/views.test.js test/browser/core-async.test.js test/browser/core-collections.test.js test/browser/core-types.test.js test/browser/platform-layout.test.js`
  - `npx eslint src/managers/default/index.js test/browser/manager-listeners.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream default manager display, resize, or pagination behavior requires helpers to be reached through `utils/core`.

### P-0084
- Why:
  - Continue the F+ internal split by moving `IframeView` dependencies off the legacy `utils/core` facade.
  - `IframeView` uses `defer()` / `uuid()` for view identity and async display, `extend()` for settings, `isNumber()` for lock/reframe guards, `borders()` / `bounds()` for layout sizing, and Blob URL helpers for iframe content loading; importing from `src/core/*` and `src/platform/*` makes the iframe rendering boundary explicit while preserving public `utils/core` compatibility exports.
  - Iframe views touch rendering, pagination sizing, scripted-content loading, and object URL lifecycle, so this slice raises focused verification across views, rendition, contents, layout/blob/type helpers, and manager listeners before the full browser suite.
- Diff Scope:
  - `src/managers/views/iframe.js`: import async, collection, type, Blob, and layout helpers from direct boundaries.
  - `test/browser/views.test.js`: add focused IframeView coverage for lock sizing and Blob URL create/revoke behavior.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/contents-text-width.test.js test/browser/core-async.test.js test/browser/core-collections.test.js test/browser/core-types.test.js test/browser/platform-layout.test.js test/browser/platform-blob.test.js`
  - `npx eslint src/managers/views/iframe.js test/browser/views.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream iframe rendering, pagination sizing, or Blob URL loading requires helpers to be reached through `utils/core`.

### P-0083
- Why:
  - Continue the F+ internal split by moving `InlineView` dependencies off the legacy `utils/core` facade.
  - `InlineView` uses `defer()` / `uuid()` for view identity and async display, `extend()` for settings, `isNumber()` for lock/resize guards, `borders()` / `bounds()` for layout sizing, and `qs()` / `parseMarkup()` for inline document loading; importing from `src/core/*` and `src/platform/*` makes the inline rendering boundary explicit while preserving public `utils/core` compatibility exports.
  - Inline views touch rendering, layout locks, and content parsing, so this slice raises focused verification across views, rendition, contents, manager listeners, and the direct helper modules before the full browser suite.
- Diff Scope:
  - `src/managers/views/inline.js`: import async, collection, type, DOM, layout, and parser helpers from direct boundaries.
  - `test/browser/views.test.js`: add focused InlineView coverage for lock/resize helpers and parser-boundary loading.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/views.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/contents-text-width.test.js test/browser/core-async.test.js test/browser/core-collections.test.js test/browser/core-types.test.js test/browser/platform-layout.test.js test/browser/platform-dom.test.js test/browser/platform-parser.test.js`
  - `npx eslint src/managers/views/inline.js test/browser/views.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream inline rendering, layout locks, or parser-boundary loading requires helpers to be reached through `utils/core`.

### P-0082
- Why:
  - Continue the F+ internal split by moving `Contents` dependencies off the legacy `utils/core` facade.
  - `Contents` uses `isNumber()` for dimension setters, `prefixed()` for CSS column and writing-mode properties, `borders()` for text-width measurement, and `defaults()` for viewport metadata merging; importing from `src/core/types`, `src/compat/css`, `src/platform/layout`, and `src/core/collections` makes the content/rendering boundary explicit while preserving public `utils/core` compatibility exports.
  - Contents is a high-risk rendering surface for text measurement, pagination columns, vertical writing mode, and rendition layout, so this slice raises focused verification across contents, layout/css/type/collection helpers, rendition, and vertical-rl manager before the full browser suite.
- Diff Scope:
  - `src/contents.js`: import type, CSS compatibility, layout, and collection helpers from direct boundaries.
  - `test/browser/contents-text-width.test.js`: add focused vertical-rl `columns()` coverage for multicolumn CSS clearing and viewport settings.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/contents-text-width.test.js test/browser/teardown-raf.test.js test/browser/rendition.test.js test/browser/vertical-rl-manager.test.js test/browser/core-types.test.js test/browser/core-collections.test.js test/browser/compat-css.test.js test/browser/platform-layout.test.js`
  - `npx eslint src/contents.js test/browser/contents-text-width.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream contents sizing, vertical writing mode, or pagination columns require helpers to be reached through `utils/core`.

### P-0081
- Why:
  - Continue the F+ internal split by moving `EpubCFI` dependencies off the legacy `utils/core` facade.
  - `EpubCFI` uses `extend()` for CFI object construction, `type()` / `isNumber()` for constructor and offset guards, `findChildren()` for DOM traversal, and `RangeObject` for fallback range construction; importing from `src/core/collections`, `src/core/types`, `src/platform/traversal`, and `src/compat/range` makes the CFI boundary explicit while preserving public `utils/core` compatibility exports.
  - CFI is a high-risk core surface for navigation, page maps, locations, ranges, and highlights, so this slice raises focused verification across CFI, locations, page-list, rendition, vertical-rl manager, and direct helper modules before the full browser suite.
- Diff Scope:
  - `src/epubcfi.js`: import collection, type, traversal, and range helpers from direct boundaries.
  - `test/browser/epubcfi.test.js`: add focused coverage for constructing a CFI from the `RangeObject` fallback.
  - `test/browser/compat-range.test.js`: assert that `EpubCFI.toRange()` now uses the direct `RangeObject` fallback while keeping the legacy core export compatibility check.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/epubcfi.test.js test/browser/locations.test.js test/browser/pagelist.test.js test/browser/rendition.test.js test/browser/vertical-rl-manager.test.js test/browser/core-collections.test.js test/browser/core-types.test.js test/browser/platform-traversal.test.js test/browser/compat-range.test.js`
  - `npx eslint src/epubcfi.js test/browser/epubcfi.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream CFI parsing, range generation, or fallback range behavior requires helpers to be reached through `utils/core`.

### P-0080
- Why:
  - Continue the F+ internal split by moving `PageList` sorted collection dependencies off the legacy `utils/core` facade.
  - `PageList` already uses direct DOM helpers and only needs `indexOfSorted()` / `locationOf()` for page-map CFI lookup; importing from `src/core/collections` makes the page-list boundary explicit while preserving public `utils/core` compatibility exports.
  - PageList touches page map and CFI lookup, so this slice raises focused verification across page-list, CFI, navigation, rendition, vertical-rl manager, and direct collection helpers before the full browser suite.
- Diff Scope:
  - `src/pagelist.js`: import sorted collection helpers from the direct core collection boundary.
  - `test/browser/pagelist.test.js`: add focused exact and inserted CFI lookup coverage for page-list locations.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/pagelist.test.js test/browser/epubcfi.test.js test/browser/navigation.test.js test/browser/rendition.test.js test/browser/vertical-rl-manager.test.js test/browser/core-collections.test.js`
  - `npx eslint src/pagelist.js test/browser/pagelist.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream page-map CFI lookup requires sorted collection helpers to be reached through `utils/core`.

### P-0079
- Why:
  - Continue the F+ internal split by moving `ContinuousViewManager` dependencies off the legacy `utils/core` facade.
  - `ContinuousViewManager` uses `defer()` for fill/update/check task completion, `extend()` for settings, and `requestAnimationFrame()` for scroll observation; importing from `src/core/async`, `src/core/collections`, and `src/platform/browser` makes the continuous rendering boundary explicit while preserving public `utils/core` compatibility exports.
  - Continuous rendering touches scroll/fill behavior, so this slice raises focused verification across continuous manager, rendition, vertical-rl manager, and the direct helper modules before the full browser suite.
- Diff Scope:
  - `src/managers/continuous/index.js`: import async, collection, and browser scheduler helpers from direct boundaries.
  - `test/browser/continuous-manager.test.js`: add focused fill recursion coverage for the direct `defer()` path.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/continuous-manager.test.js test/browser/rendition.test.js test/browser/vertical-rl-manager.test.js test/browser/core-async.test.js test/browser/core-collections.test.js test/browser/platform-browser.test.js`
  - `npx eslint src/managers/continuous/index.js test/browser/continuous-manager.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream continuous scrolling or fill behavior requires helpers to be reached through `utils/core`.

### P-0078
- Why:
  - Continue the F+ internal split by moving `Snap` helper dependencies off the legacy `utils/core` facade.
  - `Snap` uses `defer()` for smooth-scroll completion and `extend()` for settings; importing from `src/core/async` and `src/core/collections` makes the pagination snap boundary explicit while preserving public `utils/core` compatibility exports.
  - Snap touches pagination gestures and scroll targets, so this slice raises verification with focused snap math, rendition, and vertical-rl manager coverage before the full browser suite.
- Diff Scope:
  - `src/managers/helpers/snap.js`: import async and collection helpers from direct boundaries and remove unused legacy helper/constants imports.
  - `test/browser/snap.test.js`: add focused coverage for swipe direction thresholds, ignored swipe ranges, snap-point detection, rounded snap targets, and element scrolling.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/snap.test.js test/browser/manager-listeners.test.js test/browser/rendition.test.js test/browser/vertical-rl-manager.test.js test/browser/core-async.test.js test/browser/core-collections.test.js`
  - `npx eslint src/managers/helpers/snap.js test/browser/snap.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream pagination snap gestures require helpers to be reached through `utils/core`.

### P-0077
- Why:
  - Continue the F+ internal split by moving `Stage` helper dependencies off the legacy `utils/core` facade.
  - `Stage` uses `uuid()` for container ids, `extend()` for settings, `isElement()`/`isNumber()` for DOM and sizing guards, and `windowBounds()` for viewport fallback measurement; importing from `src/core/async`, `src/core/collections`, `src/core/types`, and `src/platform/layout` makes the rendering helper boundary explicit while preserving public `utils/core` compatibility exports.
  - Stage is part of manager/rendering infrastructure, so this slice keeps verification focused on Stage creation, sizing, and listener cleanup before the full browser suite.
- Diff Scope:
  - `src/managers/helpers/stage.js`: import async, collection, type, and layout helpers from direct boundaries.
  - `test/browser/manager-listeners.test.js`: add Stage creation coverage for id, sizing, axis, overflow, and direction setup.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/manager-listeners.test.js test/browser/platform-layout.test.js test/browser/core-types.test.js test/browser/core-collections.test.js test/browser/core-async.test.js`
  - `npx eslint src/managers/helpers/stage.js test/browser/manager-listeners.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream Stage sizing or manager setup requires helpers to be reached through `utils/core`.

### P-0076
- Why:
  - Continue the F+ internal split by moving `Locations` helper dependencies off the legacy `utils/core` facade.
  - `Locations` uses `defer()` for delayed section processing, `locationOf()` for CFI-ordered insertion/lookup, `qs()` for body lookup, and `sprint()` for text-node traversal; importing from `src/core/async`, `src/core/collections`, `src/platform/dom`, and `src/platform/traversal` makes the locations boundary explicit while preserving public `utils/core` compatibility exports.
  - Locations touch CFI/location generation, so this slice raises verification with additional focused coverage for location lookup, generateForSection CFI insertion, and word-based locations.
- Diff Scope:
  - `src/locations.js`: import async, collection, DOM, and traversal helpers from direct boundaries.
  - `test/browser/locations.test.js`: use direct parser boundary and add focused CFI lookup/insertion/word-location coverage.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/locations.test.js test/browser/section.test.js test/browser/book.test.js test/browser/core-async.test.js test/browser/core-collections.test.js test/browser/platform-dom.test.js test/browser/platform-traversal.test.js test/browser/platform-parser.test.js`
  - `npx eslint src/locations.js test/browser/locations.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream location generation or CFI insertion behavior requires helpers to be reached through `utils/core`.

### P-0075
- Why:
  - Continue the F+ internal split by moving `Resources` Blob/data URL dependencies off the legacy `utils/core` facade.
  - `Resources` only needs `createBase64Url()`, `createBlobUrl()`, and `blob2base64()` for asset/CSS replacement URLs; importing from `src/platform/blob` makes the resource replacement boundary explicit while preserving public `utils/core` compatibility exports.
  - Resources touch asset URL rewriting but not rendition, pagination, CFI, request internals, or archive internals in this slice, so focused browser coverage verifies resource grouping, base64/blob URL creation, archive delegation, disabled replacements, and CSS substitution.
- Diff Scope:
  - `src/resources.js`: import Blob/data URL helpers from the direct platform Blob boundary.
  - `test/browser/resources.test.js`: add focused Resources coverage for replacement URL behavior.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/resources.test.js test/browser/platform-blob.test.js test/browser/replacements.test.js`
  - `npx eslint src/resources.js test/browser/resources.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream resource replacement behavior requires Blob/data URL helpers to be reached through `utils/core`.

### P-0074
- Why:
  - Continue the F+ internal split by moving replacement DOM query dependencies off the legacy `utils/core` facade.
  - `replaceBase()`, `replaceCanonical()`, `replaceMeta()`, and `replaceLinks()` only need the DOM query helper `qs()`; importing it from `src/platform/dom` makes the replacement utility boundary explicit while preserving public `utils/core` compatibility exports.
  - Replacements affect link/base metadata rewriting but do not touch rendition, pagination, CFI, request, or archive internals, so this slice adds focused browser coverage for base/canonical/meta/link/substitute behavior. The focused coverage exposed that `replaceMeta()` looked for a `link[property='dc.identifier']` while creating `meta[name='dc.identifier']`; this slice aligns the lookup with the element it creates.
- Diff Scope:
  - `src/utils/replacements.js`: import `qs()` from the direct platform DOM boundary, drop unused imports, and make `replaceMeta()` update the `meta[name='dc.identifier']` element it creates.
  - `test/browser/replacements.test.js`: cover base href insertion/update, canonical/meta update, local/hash/external link handling, and URL substitution escaping.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/replacements.test.js test/browser/platform-dom.test.js`
  - `npx eslint src/utils/replacements.js test/browser/replacements.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream replacement behavior requires `qs()` to be reached through `utils/core` or relies on duplicate `dc.identifier` meta insertion.

### P-0073
- Why:
  - Continue the F+ internal split by moving `Queue` scheduler dependencies off the legacy `utils/core` facade.
  - `Queue` uses `defer()` for task promises and `requestAnimationFrame()` for scheduled queue draining; importing from `src/core/async` and `src/platform/browser` makes the scheduler boundary explicit while preserving public `utils/core` compatibility exports.
  - Queue is shared infrastructure for rendering/request orchestration, so this slice adds focused browser coverage for sequential task execution, promise passthrough, pause/run, flush, rejection, and callback-style `Task` wrapping.
- Diff Scope:
  - `src/utils/queue.js`: import `defer()` and `requestAnimationFrame()` from direct core/platform boundaries.
  - `test/browser/queue.test.js`: add focused Queue/Task behavior coverage.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/queue.test.js test/browser/core-async.test.js test/browser/platform-browser.test.js`
  - `npx eslint src/utils/queue.js test/browser/queue.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream queue scheduling behavior requires `defer()` or `requestAnimationFrame()` to be reached through `utils/core`.

### P-0072
- Why:
  - Continue the F+ internal split by moving `request()` helper dependencies off the legacy `utils/core` facade.
  - `request()` uses `defer()` for XMLHttpRequest promise handling, `isXml()` for EPUB XML extension detection, and `parse()` for XML/XHTML/HTML response parsing; importing from `src/core/async`, `src/utils/mime`, and `src/platform/parser` makes the request boundary explicit while preserving public `utils/core` compatibility exports.
  - Request is a higher-risk loading path, so this slice adds direct browser coverage for XML, JSON, Blob, credential/header, and failure handling through a fake XMLHttpRequest.
- Diff Scope:
  - `src/utils/request.js`: import `defer()`, `isXml()`, and parser behavior from direct core/mime/platform boundaries.
  - `test/browser/request.test.js`: cover request parsing and XMLHttpRequest setup without hitting network fixtures.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/request.test.js test/browser/platform-parser.test.js test/browser/mime.test.js test/browser/core-async.test.js`
  - `npx eslint src/utils/request.js test/browser/request.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream request behavior requires `defer()`, `isXml()`, or parser behavior to be reached through `utils/core`.

### P-0071
- Why:
  - Continue the F+ internal split by moving `Store` helper dependencies off the legacy `utils/core` facade.
  - `Store` uses `defer()` for offline retrieval/FileReader promises, `isXml()` for stored EPUB XML extension detection, and `parse()` for stored markup responses; importing from `src/core/async`, `src/utils/mime`, and `src/platform/parser` makes the offline cache/request boundary explicit while preserving public `utils/core` compatibility exports.
  - Store is a higher-risk offline cache path, so this slice adds focused store browser coverage for stored XML, Blob/object URL, and base64 URL behavior.
- Diff Scope:
  - `src/store.js`: import `defer()`, `isXml()`, and parser behavior from direct core/mime/platform boundaries.
  - `test/browser/store.test.js`: cover stored OPF XML parsing, Blob/object URL creation, and base64 data URL creation through a fake storage adapter.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/store.test.js test/browser/archive.test.js test/browser/platform-parser.test.js test/browser/mime.test.js test/browser/core-async.test.js`
  - `npx eslint src/store.js test/browser/store.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream offline store behavior requires `defer()`, `isXml()`, or parser behavior to be reached through `utils/core`.

### P-0070
- Why:
  - Continue the F+ internal split by moving `Archive` helper dependencies off the legacy `utils/core` facade.
  - `Archive` uses `defer()` for request/createUrl promises, `isXml()` for EPUB XML extension detection, and `parse()` for archived markup responses; importing from `src/core/async`, `src/utils/mime`, and `src/platform/parser` makes the archive/request boundary explicit while preserving public `utils/core` compatibility exports.
  - Archive is a higher-risk request/archive path, so this slice adds direct archive browser coverage instead of relying only on book-level archived EPUB tests.
- Diff Scope:
  - `src/archive.js`: import `defer()`, `isXml()`, and parser behavior from direct core/mime/platform boundaries.
  - `test/browser/archive.test.js`: cover archived OPF XML parsing, Blob/object URL creation, and base64 data URL creation using the existing `alice.epub` fixture.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/archive.test.js test/browser/book.test.js test/browser/platform-parser.test.js test/browser/mime.test.js test/browser/core-async.test.js test/browser/fixtures.test.js`
  - `npx eslint src/archive.js test/browser/archive.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream archived EPUB loading requires `defer()`, `isXml()`, or parser behavior to be reached through `utils/core`.

### P-0069
- Why:
  - Continue the F+ internal split by moving `Rendition` pure helper dependencies off the legacy `utils/core` facade.
  - `Rendition` uses `extend()` for settings, `defer()` for lifecycle/display promises, and `isFloat()` for location-percentage targets; importing those from `src/core/collections`, `src/core/async`, and `src/core/types` makes the dependency boundaries explicit while preserving public `utils/core` compatibility exports.
  - This slice does not change rendition display, location, or manager wiring logic; focused rendition and manager tests cover the touched helper paths before the full browser suite.
- Diff Scope:
  - `src/rendition.js`: import `defer()`, `extend()`, and `isFloat()` from direct core boundaries.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/rendition.test.js test/browser/teardown-raf.test.js test/browser/vertical-rl-manager.test.js test/browser/manager-listeners.test.js test/browser/core-async.test.js test/browser/core-collections.test.js test/browser/core-types.test.js`
  - `npx eslint src/rendition.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream rendition behavior requires `extend()`, `defer()`, or `isFloat()` to be reached through `utils/core`.

### P-0068
- Why:
  - Continue the F+ internal split by moving the main `Book` entry point's pure helper dependencies off the legacy `utils/core` facade.
  - `Book` uses `extend()` for settings merging and `defer()` for loading promises; importing those from `src/core/collections` and `src/core/async` makes the dependency boundary explicit while preserving public `utils/core` compatibility exports.
  - The loading/opening algorithm remains unchanged, so focused book fixture tests cover unpacked and archived EPUB flows after the import migration.
- Diff Scope:
  - `src/book.js`: import `defer()` from `src/core/async` and `extend()` from `src/core/collections`.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/book.test.js test/browser/core-async.test.js test/browser/core-collections.test.js test/browser/fixtures.test.js`
  - `npx eslint src/book.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream book loading requires `extend()` or `defer()` to be reached through `utils/core`.

### P-0067
- Why:
  - Continue the F+ internal split by moving the mapping geometry dependency off the legacy `utils/core` facade.
  - `Mapping` only needs `nodeBounds()` for text-node/page-boundary measurement, so importing from `src/platform/layout` makes its browser layout dependency explicit while keeping the public `utils/core.nodeBounds()` compatibility export intact.
  - The implementation remains algorithmically unchanged; this slice only changes the dependency boundary and relies on existing platform layout and rendition/browser coverage for regression checks.
- Diff Scope:
  - `src/mapping.js`: import `nodeBounds()` from `src/platform/layout`.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-layout.test.js test/browser/rendition.test.js`
  - `npx eslint src/mapping.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream mapping code requires `nodeBounds()` to be reached through `utils/core`.

### P-0066
- Why:
  - Continue the F+ internal split by moving the page-list parser's DOM selection dependencies off the legacy `utils/core` facade.
  - `PageList` still uses sorted CFI lookup helpers through `utils/core`, but its nav/NCX parsing only needs DOM query helpers, so this slice keeps CFI/page lookup behavior unchanged while making parser DOM ownership explicit.
  - Existing page-list coverage already verifies EPUB 3 page-list nav and NCX pageList parsing, which is the behavior affected by the import boundary change.
- Diff Scope:
  - `src/pagelist.js`: import `qs()`, `qsa()`, and `querySelectorByType()` from `src/platform/dom` while leaving `indexOfSorted()` and `locationOf()` on the legacy core facade.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/pagelist.test.js test/browser/platform-dom.test.js`
  - `npx eslint src/pagelist.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream page-list parsing requires DOM helpers to be reached through `utils/core`.

### P-0065
- Why:
  - Continue the F+ internal split by moving the EPUB navigation parser off the legacy `utils/core` facade.
  - `Navigation` only needs DOM query and child traversal helpers, so importing from `src/platform/dom` and `src/platform/traversal` makes the parser's DOM dependencies explicit while preserving public `utils/core` exports.
  - Focused navigation coverage now verifies EPUB 3 landmarks and nested NCX nav points before broader book-loading consumers move.
- Diff Scope:
  - `src/navigation.js`: import `qs()`, `qsa()`, `querySelectorByType()`, and `filterChildren()` from direct platform boundaries.
  - `test/browser/navigation.test.js`: cover EPUB 3 landmark lookup and nested NCX nav point parsing.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/navigation.test.js test/browser/platform-dom.test.js test/browser/platform-traversal.test.js`
  - `npx eslint src/navigation.js test/browser/navigation.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream navigation parsing requires `Navigation` to reach DOM helpers through `utils/core`.

### P-0064
- Why:
  - Continue the F+ internal split by moving the OPF package parser off the legacy `utils/core` facade.
  - `Packaging` only needs DOM query helpers and element-node indexing, so importing from `src/platform/dom` and `src/platform/traversal` makes the XML DOM dependencies explicit while preserving public `utils/core` exports.
  - Focused package parser coverage verifies nav, NCX, cover-image, and spine-node index behavior before moving broader book-loading consumers.
- Diff Scope:
  - `src/packaging.js`: import `qs()`, `qsa()`, `qsp()`, and `indexOfElementNode()` from direct platform boundaries.
  - `test/browser/packaging.test.js`: cover navigation, NCX, cover image, spine node index, and spine item parsing.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/packaging.test.js test/browser/platform-dom.test.js test/browser/platform-traversal.test.js`
  - `npx eslint src/packaging.js test/browser/packaging.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream OPF parsing requires `Packaging` to reach DOM helpers through `utils/core`.

### P-0063
- Why:
  - Continue the F+ internal split by moving the section loader/search consumer off the legacy `utils/core` facade.
  - `Section` only needs the pure pending-promise helper and DOM text traversal, so importing `defer()` from `src/core/async` and `sprint()` from `src/platform/traversal` makes both dependencies explicit while preserving the public `utils/core` exports.
  - Existing section browser coverage verifies the chapter find/search behavior that exercises `sprint()` without touching pagination, CFI fallback internals, request/archive, or host integration.
- Diff Scope:
  - `src/section.js`: import `defer()` and `sprint()` from their direct core/platform boundaries.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/section.test.js test/browser/core-async.test.js test/browser/platform-traversal.test.js`
  - `npx eslint src/section.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream section loading or text search requires `Section` to reach these helpers through `utils/core`.

### P-0062
- Why:
  - Continue the F+ internal split by moving a parser-only consumer off the legacy `utils/core` facade.
  - `Container` only needs the DOM `qs()` helper to find the EPUB rootfile, so importing it from `src/platform/dom` makes the XML DOM boundary explicit while preserving `utils/core.qs()`.
  - Focused container coverage keeps the package path parser verifiable before moving broader package or book-loading consumers.
- Diff Scope:
  - `src/container.js`: import `qs()` from the platform DOM boundary.
  - `test/browser/container.test.js`: cover rootfile parsing, missing document/rootfile errors, and cleanup.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/container.test.js test/browser/book.test.js`
  - `npx eslint src/container.js test/browser/container.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream container parsing requires `Container` to reach DOM query helpers through `utils/core`.

### P-0061
- Why:
  - Continue the F+ internal split by moving another low-risk internal consumer off the legacy `utils/core` facade.
  - `DisplayOptions` only needs DOM query helpers, so importing `qs()` / `qsa()` from `src/platform/dom` makes the platform dependency explicit while preserving the legacy `utils/core` exports.
  - Adding focused parser coverage keeps this consumer migration independently verifiable before moving higher-risk package, navigation, or rendering imports.
- Diff Scope:
  - `src/displayoptions.js`: import DOM query helpers from the platform DOM boundary.
  - `test/browser/displayoptions.test.js`: cover iBooks display option parsing, missing display options, and cleanup.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/displayoptions.test.js test/browser/platform-dom.test.js`
  - `npx eslint src/displayoptions.js test/browser/displayoptions.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream display options parsing requires `DisplayOptions` to reach DOM query helpers through `utils/core`.

### P-0060
- Why:
  - Continue the F+ internal split by moving one low-risk internal consumer off the legacy `utils/core` facade.
  - `Layout` only needs the pure descriptor-copying `extend()` helper, so importing it from `src/core/collections` is a clearer dependency than reaching through the public compatibility helper.
  - Keeping `utils/core.extend()` unchanged preserves the existing public API while beginning consumer-by-consumer facade reduction.
- Diff Scope:
  - `src/layout.js`: import `extend()` from the core collections boundary.
  - `lib/layout.js` / `dist/epub.*`: rebuild generated artifacts after the source import change.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/public-api.test.js test/browser/rendition.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run compile`
  - `npm run test:legacy`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if a downstream bundler depends on `Layout` reaching `extend()` through `utils/core`.

### P-0059
- Why:
  - Continue the F+ internal split by moving the DOM Range fallback out of `utils/core` into a compatibility boundary.
  - `RangeObject` is only used as an `EpubCFI.toRange()` fallback when `document.createRange` is unavailable, so `src/compat/range.js` is a clearer owner than generic core helpers.
  - Keeping the legacy `utils/core.RangeObject` export as a subclass preserves existing imports while reducing direct fallback implementation in `utils/core`.
  - While extracting the fallback, fix the legacy `selectNodeContents()` element path that referenced an undefined `parent` variable.
- Diff Scope:
  - `src/compat/range.js`: add the RangeObject compatibility implementation.
  - `src/utils/core.js`: delegate legacy `RangeObject` export to the compatibility range class.
  - `test/browser/compat-range.test.js`: cover range boundaries, node selection, legacy export compatibility, and `EpubCFI.toRange()` fallback without native `createRange`.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/compat-range.test.js test/browser/epubcfi.test.js test/browser/section.test.js test/browser/locations.test.js`
  - `npx eslint src/compat/range.js test/browser/compat-range.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream CFI fallback behavior requires `RangeObject` to remain implemented directly in `utils/core`.

### P-0058
- Why:
  - Continue shrinking `utils/core` by moving pure async/id primitives into the `src/core` boundary.
  - `uuid()` and `defer()` are shared primitives used by book, rendition, archive, store, queues, views, and managers, but they do not belong to browser platform or DOM compatibility code.
  - Keeping the legacy `utils/core` exports as delegates preserves existing imports while making `utils/core` closer to a compatibility facade.
- Diff Scope:
  - `src/core/async.js`: add UUID generation and pending promise helper implementations.
  - `src/utils/core.js`: delegate legacy `uuid()` and `defer()` exports to the core async helper.
  - `test/browser/core-async.test.js`: cover UUID format, deferred resolve/reject behavior, freezing, and legacy export compatibility.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-async.test.js test/browser/book.test.js test/browser/rendition.test.js test/browser/manager-listeners.test.js test/browser/fixtures.test.js`
  - `npx eslint src/core/async.js test/browser/core-async.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream code requires UUID or pending promise helper implementations to remain directly inside `utils/core`.

### P-0057
- Why:
  - Continue shrinking `utils/core` by moving XML resource extension detection into the existing MIME utility.
  - `isXml()` is used by archive, store, and request code together with MIME lookup behavior, so `src/utils/mime.js` is the clearer owner than generic core helpers.
  - Keeping the legacy `utils/core.isXml()` export as a delegate preserves existing imports while reducing unrelated responsibilities in `utils/core`.
- Diff Scope:
  - `src/utils/mime.js`: add `isXml()` named export alongside the default MIME lookup object.
  - `src/utils/core.js`: delegate legacy `isXml()` export to the MIME utility.
  - `test/browser/mime.test.js`: cover MIME lookup, XML extension detection, and legacy core export compatibility.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/mime.test.js test/browser/fixtures.test.js`
  - `npx eslint src/utils/mime.js test/browser/mime.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream code requires XML extension detection to remain implemented directly in `utils/core`.

### P-0056
- Why:
  - Continue the F+ internal split by moving DOM node index helpers into the traversal platform boundary.
  - `indexOfNode()`, `indexOfTextNode()`, and `indexOfElementNode()` depend on DOM parent/child node traversal and are used by packaging while remaining public through `utils/core`.
  - Keeping the legacy `utils/core` exports as delegates preserves existing imports while further reducing direct DOM ownership in generic core helpers.
- Diff Scope:
  - `src/platform/traversal.js`: add DOM node index helpers alongside existing traversal helpers.
  - `src/utils/core.js`: delegate legacy node index helper exports to the platform traversal module.
  - `test/browser/platform-traversal.test.js`: cover platform/core node index helper alignment.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/packaging.test.js test/browser/navigation.test.js`
  - `npx eslint src/platform/traversal.js test/browser/platform-traversal.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream packaging or DOM index behavior requires these helpers to remain implemented directly in `utils/core`.

### P-0055
- Why:
  - Continue the F+ internal split by moving pure object and sorted-array helpers out of `utils/core`.
  - `defaults()`, `extend()`, `insert()`, `locationOf()`, and `indexOfSorted()` are core primitives used by book, rendition, contents, locations, page-list, and manager code paths but do not require browser platform ownership.
  - Keeping the legacy `utils/core` exports as delegates preserves existing imports while expanding the `src/core` boundary after the type helper split.
- Diff Scope:
  - `src/core/collections.js`: add object defaults/extension helpers and sorted-array helpers with existing behavior.
  - `src/utils/core.js`: delegate legacy object and sorted-array helper exports to the core helper module.
  - `test/browser/core-collections.test.js`: cover direct core helper behavior and legacy export compatibility.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-collections.test.js test/browser/locations.test.js test/browser/pagelist.test.js test/browser/epubcfi.test.js test/browser/rendition.test.js test/browser/manager-listeners.test.js`
  - `npx eslint src/core/collections.js test/browser/core-collections.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream code requires these helper implementations to remain directly inside `utils/core`.

### P-0054
- Why:
  - Continue the F+ internal split by moving pure type helpers out of `utils/core` after the DOM/platform boundaries.
  - `isElement()`, `isNumber()`, `isFloat()`, and `type()` are core primitives used across CFI, view, and manager code paths but do not need to be implemented in the legacy compatibility helper.
  - Keeping the legacy `utils/core` exports as delegates preserves existing imports while creating a clearer `src/core` boundary.
- Diff Scope:
  - `src/core/types.js`: add pure core type helper implementations.
  - `src/utils/core.js`: delegate legacy type helper exports to the core helper module.
  - `test/browser/core-types.test.js`: cover direct core helper behavior and legacy export compatibility.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/core-types.test.js test/browser/epubcfi.test.js test/browser/views.test.js test/browser/manager-listeners.test.js`
  - `npx eslint src/core/types.js test/browser/core-types.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream code requires these helper implementations to remain directly inside `utils/core`.

### P-0053
- Why:
  - Continue the F+ internal split by moving DOM traversal helpers out of `utils/core` after DOM query helpers.
  - `sprint()`, `treeWalker()`, `walk()`, child filtering, and parent traversal are DOM platform concerns used by locations, section serialization, navigation, and CFI code paths.
  - Keeping the legacy core exports as delegates preserves existing imports while reducing direct DOM traversal ownership in generic core helpers.
- Diff Scope:
  - `src/platform/traversal.js`: add platform DOM traversal, child filtering, and parent traversal helpers with existing behavior.
  - `src/utils/core.js`: delegate legacy traversal helper exports to the platform traversal helper.
  - `test/browser/platform-traversal.test.js`: cover platform/core text traversal, TreeWalker, recursive walk, child filtering, and parent helper alignment.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-traversal.test.js test/browser/locations.test.js test/browser/navigation.test.js test/browser/epubcfi.test.js test/browser/section.test.js`
  - `npx eslint src/platform/traversal.js test/browser/platform-traversal.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream traversal, CFI, or locations behavior requires these helpers to remain implemented directly in `utils/core`.

### P-0052
- Why:
  - Continue the F+ internal split by moving DOM query helpers out of `utils/core` after parser, layout, and Blob platform boundaries.
  - `qs()`, `qsa()`, `qsp()`, and `querySelectorByType()` are browser/XML DOM selection concerns used by packaging, navigation, page-list, and replacement code.
  - Keeping the legacy core exports as delegates reduces direct DOM API ownership in generic core helpers without changing downstream imports.
- Diff Scope:
  - `src/platform/dom.js`: add platform DOM query helpers with the existing fallback behavior.
  - `src/utils/core.js`: delegate legacy query helper exports to the platform DOM helper.
  - `test/browser/platform-dom.test.js`: cover platform/core query alignment, EPUB type lookup, and the legacy missing-root error.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-dom.test.js test/browser/packaging.test.js test/browser/navigation.test.js test/browser/pagelist.test.js`
  - `npx eslint src/platform/dom.js test/browser/platform-dom.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream XML/HTML selection behavior requires query helpers to remain implemented directly in `utils/core`.

### P-0051
- Why:
  - Continue the low-risk F+ internal split toward `core/rendering/platform/compat` after the Blob and layout platform boundaries.
  - `utils/core.parse()` still directly selected native `DOMParser` versus `@xmldom/xmldom` and stripped parser input BOMs inside the generic core helper.
  - Moving parser selection and BOM handling into a platform boundary keeps the legacy `core.parse()` export stable while isolating browser/XMLDOM compatibility logic.
- Diff Scope:
  - `src/platform/parser.js`: add parser constructor resolution, byte order mark stripping, and markup parsing helpers.
  - `src/utils/core.js`: delegate legacy `parse()` to the platform parser helper while preserving the public export.
  - `test/browser/platform-parser.test.js`: cover native parser selection, forced XMLDOM parsing, BOM stripping, and legacy core compatibility.
  - `dist/epub.*` / `lib/*`: rebuild generated distribution and Babel artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-parser.test.js test/browser/locations.test.js`
  - `npx eslint src/platform/parser.js test/browser/platform-parser.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream parser behavior requires `DOMParser` / `XMLDOMParser` selection to remain implemented directly in `utils/core`.

### P-0050
- Why:
  - Continue the Blob platform boundary by moving the remaining FileReader-based Blob conversion out of `utils/core`.
  - `blob2base64()` was implemented directly in the legacy core helper even though it depends on browser `FileReader`.
  - The public type definition also incorrectly described `blob2base64()` as synchronous, while the implementation has always returned a Promise.
- Diff Scope:
  - `src/platform/blob.js`: add `blobToBase64()` as the browser FileReader conversion helper.
  - `src/utils/core.js`: delegate legacy `blob2base64()` to the platform helper while preserving the export name.
  - `types/core.d.ts` / `types/utils/core.d.ts`: correct `blob2base64()` to return a Promise.
  - `test/browser/platform-blob.test.js`: cover platform and legacy Blob-to-base64 data URL behavior.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-blob.test.js`
  - `npx eslint src/platform/blob.js test/browser/platform-blob.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream code depends on the incorrect synchronous `blob2base64()` type or if FileReader conversion must remain implemented directly in `utils/core`.

## 2026-06-01

### P-0049
- Why:
  - Continue the low-risk F+ internal split toward `core/rendering/platform/compat` after the Blob platform boundary.
  - Viewport, element, and node geometry helpers were still implemented directly in `utils/core`, even though they depend on browser `window` / `document` layout APIs.
  - Moving them behind a platform boundary keeps the legacy core exports stable while reducing direct browser-global usage in generic core helpers.
  - `npm pack --dry-run` also exposed generated Vitest screenshots as package/worktree candidates, so generated attachment and screenshot directories are now ignored.
- Diff Scope:
  - `src/platform/layout.js`: add browser document height, element bounds, border bounds, node bounds, and window bounds helpers.
  - `src/utils/core.js`: delegate `documentHeight()`, `bounds()`, `borders()`, `nodeBounds()`, and `windowBounds()` to the platform helper while preserving the legacy exports.
  - `test/browser/platform-layout.test.js`: add Vitest Browser Mode coverage for platform layout helpers and the existing core compatibility exports.
  - `.gitignore` / `.npmignore`: exclude generated Vitest attachments and screenshots from source control and package tarballs.
  - `dist/epub.*`: rebuild Vite/Rollup distribution artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-blob.test.js test/browser/platform-layout.test.js`
  - `npx eslint src/platform/blob.js src/platform/layout.js test/browser/platform-blob.test.js test/browser/platform-layout.test.js`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
  - `npm pack --dry-run`
- Rollback:
  - Revert this patch if downstream layout code requires these geometry helpers to remain implemented directly in `utils/core`, or if package consumers depend on unignored Vitest attachment artifacts.

### P-0048
- Why:
  - Gate 2 finished the Vitest/TypeDoc toolchain migration, so the next modernization lane starts the low-risk F+ internal split toward `core/rendering/platform/compat`.
  - Blob construction, object URL creation/revocation, and base64 data URL creation are browser platform concerns that were still implemented directly in `utils/core`.
  - Moving them behind a platform boundary keeps the legacy `utils/core` public exports stable while reducing direct browser-global usage in core helpers.
- Diff Scope:
  - `src/platform/blob.js`: add browser Blob/object URL/base64 URL helpers.
  - `src/utils/core.js`: delegate `createBlob()`, `createBlobUrl()`, `revokeBlobUrl()`, and `createBase64Url()` to the platform helper while preserving the legacy exports.
  - `test/browser/platform-blob.test.js`: add Vitest Browser Mode coverage for the new platform helper and the existing core compatibility exports.
  - `dist/epub.*`: rebuild Vite/Rollup distribution artifacts after the source split.
- Test:
  - `npx vitest run --config vitest.browser.config.mjs test/browser/platform-blob.test.js`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build:modules`
  - `npm run test:browser`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
  - `npm run test:legacy`
  - `npm run compile`
- Rollback:
  - Revert this patch if downstream builds require Blob/object URL behavior to remain implemented directly in `utils/core`, or if a non-browser bundler cannot tree-shake the new platform module.

### P-0047
- Why:
  - After the final Karma suite moved to Vitest Browser, the Node `assert` browser polyfill was no longer imported by source or tests.
  - Removing the stale webpack fallback and dependency reduces obsolete Node polyfill surface while preserving the existing `path-webpack` and `process/browser` compatibility paths still used by source and webpack builds.
- Diff Scope:
  - `webpack.config.js`: remove the unused `assert` fallback alias.
  - `package.json` / `package-lock.json`: remove the unused `assert` dependency.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build`
  - `npm run build:webpack`
  - `npm run legacy`
- Rollback:
  - Revert this patch if webpack-based UMD or legacy builds require an `assert` browser fallback in downstream environments.

### P-0046
- Why:
  - `test/vertical-rl-manager.js` was the final legacy Karma suite and covers the high-risk vertical-rl pagination, boundary snapping, restore, and edge-mask regression matrix.
  - Moving it completes the Karma-to-Vitest migration. Keeping `test:legacy` as a compatibility no-op makes the removed runner explicit while `npm test` now uses Vitest Browser Mode only.
- Diff Scope:
  - `test/vertical-rl-manager.js`: move to `test/browser/vertical-rl-manager.test.js` and run under Vitest Browser Mode.
  - `package.json` / `package-lock.json`: remove Karma/Mocha/raw-loader dev dependencies, make `npm test` run `test:browser`, and turn `test:legacy` into a no-op.
  - `karma.conf.js` / `test/index.html`: remove obsolete Karma/Mocha browser runner files.
  - `README.md`: update testing instructions for the Vitest-only browser suite.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser cannot reproduce the vertical-rl pagination regression matrix or downstream automation still requires the Karma runner.

### P-0045
- Why:
  - `test/contents-text-width.js` covers synthetic `Contents#textWidth()` and single-media detection DOM measurements. It exercises browser range/layout APIs but does not load EPUB content, render reader iframes, navigate pagination, or touch CFI/request/archive paths.
  - Moving it leaves Karma focused on the high-risk `vertical-rl-manager` pagination regression suite while continuing the no-new-Karma test modernization path.
- Diff Scope:
  - `test/contents-text-width.js`: remove the legacy Karma/Mocha Contents text width tests.
  - `test/browser/contents-text-width.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser DOM range/layout measurement diverges from the legacy Karma runner for `Contents#textWidth()` or single-media detection.

### P-0044
- Why:
  - `test/views.js` only covers one synthetic `IframeView#expand()` case for viewport-filling single media pages. It does not load EPUB content, perform iframe rendering, paginate real text, or touch CFI/request/archive paths.
  - Moving it keeps this low-risk view sizing guard on Vitest Browser while leaving text width and vertical-rl pagination coverage on the legacy Karma gate.
- Diff Scope:
  - `test/views.js`: remove the legacy Karma/Mocha IframeView test.
  - `test/browser/views.test.js`: add equivalent Vitest Browser Mode coverage beside the existing Views/IframeView helper tests.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser DOM sizing differs from the legacy Karma runner for `IframeView#expand()` single-media page width behavior.

### P-0043
- Why:
  - `test/continuous-manager.js` only exercises synthetic `ContinuousViewManager` update, scrolled queue, stale callback, and trim scheduling behavior. It does not load EPUB content, render iframes, paginate, or use CFI/request/archive paths.
  - Moving it keeps low-risk manager coverage on Vitest Browser while leaving text measurement, viewport-filling media, and vertical-rl pagination coverage on the legacy Karma gate for later slices.
- Diff Scope:
  - `test/continuous-manager.js`: remove the legacy Karma/Mocha ContinuousViewManager tests.
  - `test/browser/continuous-manager.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser timer scheduling changes `ContinuousViewManager#scrolled()` or `scheduleTrim()` behavior compared with the legacy Karma runner.

### P-0042
- Why:
  - `EpubCFI#toRange()` is the final CFI legacy Karma slice after parser, `fromNode()`, and `fromRange()` moved to Vitest Browser.
  - Moving it completes CFI coverage migration and removes the remaining Karma/raw-loader XHTML fixture dependency from `test/epubcfi.js`.
- Diff Scope:
  - `test/epubcfi.js`: remove the final legacy Karma/Mocha EpubCFI tests.
  - `test/browser/epubcfi.test.js`: add equivalent Vitest Browser Mode coverage for `toRange()`, highlight range resolution, and out-of-range offset clamping.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser `Range` resolution changes `EpubCFI#toRange()` behavior compared with the legacy Karma/raw-loader fixture path.

### P-0041
- Why:
  - `EpubCFI#fromRange()` is the next self-contained CFI slice after `fromNode()`: it creates browser Range objects from XHTML fixtures and asserts generated CFI strings, but does not yet validate reverse `toRange()` mapping.
  - Moving it separately keeps the remaining legacy CFI gate focused on `toRange()` and range offset clamping.
- Diff Scope:
  - `test/epubcfi.js`: remove the legacy Karma/Mocha `EpubCFI#fromRange()` tests.
  - `test/browser/epubcfi.test.js`: add equivalent Vitest Browser Mode coverage for collapsed ranges, multi-node ranges, highlight ranges, and interleaved highlight text counting using Vite `?raw` XHTML fixture imports.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser Range construction changes `EpubCFI#fromRange()` output compared with the legacy Karma/raw-loader fixture path.

### P-0040
- Why:
  - After P-0039, the remaining EpubCFI legacy tests are DOM node and Range conversion coverage. `fromNode()` is the smallest DOM fixture slice and does not create browser Range objects.
  - Moving it first keeps the CFI migration incremental while leaving `fromRange()` and `toRange()` on Karma until their Range behavior is migrated separately.
- Diff Scope:
  - `test/epubcfi.js`: remove the legacy Karma/Mocha `EpubCFI#fromNode()` tests.
  - `test/browser/epubcfi.test.js`: add equivalent Vitest Browser Mode coverage using Vite's `?raw` XHTML fixture import.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser DOM parsing changes `EpubCFI#fromNode()` output compared with the legacy Karma/raw-loader fixture path.

### P-0039
- Why:
  - `test/epubcfi.js` mixes low-risk string/parser comparisons with higher-risk DOM fixture and Range conversion behavior.
  - Moving the constructor, `parse()`, `toString()`, `checkType()`, and `compare()` assertions first keeps the Vitest migration incremental while leaving DOM Range coverage on the legacy Karma gate for the next CFI slice.
- Diff Scope:
  - `test/epubcfi.js`: keep only DOM node, Range, and `toRange()` legacy coverage.
  - `test/browser/epubcfi.test.js`: add equivalent Vitest Browser Mode coverage for string parsing, type detection, string output, and CFI comparison.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser EpubCFI string parsing or comparison diverges from the legacy Karma bundle.

### P-0038
- Why:
  - `test/section.js` is the next fixture-driven Karma test after `Book` and `Locations`; it validates section text search against Alice chapters without rendering, pagination, RTL, request/archive, or host integration behavior.
  - Moving it to Vitest Browser keeps chapter search coverage on the modern runner while further shrinking the legacy Karma gate.
- Diff Scope:
  - `test/section.js`: remove the legacy Karma/Mocha section search tests.
  - `test/browser/section.test.js`: add equivalent Vitest Browser Mode coverage for `Section#find()` and `Section#search()` using the shared Alice package fixture URL helper.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser package fixture loading changes `Section#find()` or `Section#search()` results compared with the legacy Karma runner.

### P-0037
- Why:
  - `test/locations.js` is parser-level coverage for location generation and fallback CFIs, with no rendering, request/archive, pagination, or host integration behavior.
  - Moving it to Vitest Browser removes another Karma `raw-loader` XHTML fixture dependency while keeping the browser `DOMParser` and xmldom parse paths covered.
- Diff Scope:
  - `test/locations.js`: remove the legacy Karma/Mocha Locations parser tests.
  - `test/browser/locations.test.js`: add equivalent Vitest Browser Mode coverage using Vite's `?raw` XHTML fixture import.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vite raw XHTML fixture imports diverge from the legacy Karma/raw-loader parser input.

### P-0036
- Why:
  - `test/book.js` was the next Karma fixture proxy dependency after `ePub()` and covers the same EPUB fixture loading surface plus cover URL behavior.
  - Moving it keeps all new fixture-driven coverage in Vitest Browser while shrinking Karma to rendering/layout/CFI-heavy legacy coverage.
- Diff Scope:
  - `test/book.js`: remove the legacy Karma/Mocha Book fixture tests.
  - `test/browser/book.test.js`: add equivalent Vitest Browser Mode coverage for unpacked EPUBs, archived EPUBs, ArrayBuffer input, cover blob URLs, and no-cover EPUBs.
  - `test/browser/helpers/fixtures.js`: centralize Vite-served fixture URLs and URL assertions for future migrations.
  - `test/browser/epub.test.js`, `test/browser/fixtures.test.js`: reuse the fixture helper.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser blob URL or fixture URL handling diverges from real browser `Book` behavior.

### P-0035
- Why:
  - New test coverage should no longer be added to Karma, and the small `ePub()` fixture-open checks can now rely on the Vitest Browser fixture-serving smoke from P-0034.
  - Moving this first fixture-driven test keeps Karma as a shrinking legacy gate while proving the public `ePub()` constructor path works with Vite-served unpacked and archived EPUB fixtures.
- Diff Scope:
  - `test/epub.js`: remove the legacy Karma/Mocha `ePub()` fixture-open checks.
  - `test/browser/epub.test.js`: add equivalent Vitest Browser Mode coverage using `new URL(..., import.meta.url)` fixture URLs.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser fixture URLs diverge from real browser `ePub()` loading behavior.

### P-0034
- Why:
  - Remaining legacy candidates increasingly depend on Karma's `/fixtures/` proxy. Before migrating `Book` / `ePub` fixture-driven tests, Vitest Browser needs an explicit smoke proving unpacked and archived EPUB fixtures are served reliably.
  - This keeps the next migration step evidence-based instead of assuming Vite's browser runner resolves fixture assets the same way as Karma.
- Diff Scope:
  - `test/browser/fixtures.test.js`: add fixture-serving smoke coverage for the unpacked OPF and archived Alice EPUB via `new URL(..., import.meta.url)`.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vite Browser asset serving is replaced by a dedicated `/fixtures/` middleware or fixture helper.

### P-0033
- Why:
  - `test/rendition.js` only exercises `Rendition#located()` against synthetic manager location entries and stubbed book helpers; it does not display a rendition, scroll, paginate, parse CFI, load EPUB content, or use request/archive paths.
  - Moving this data-shaping coverage to Vitest Browser reduces the legacy Karma surface while keeping rendering/layout tests in Karma for now.
- Diff Scope:
  - `test/rendition.js`: remove the Karma/Mocha `Rendition#located()` tests.
  - `test/browser/rendition.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser module initialization changes `Rendition.prototype.located()` behavior compared with the legacy Karma bundle.

### P-0032
- Why:
  - The low-risk `Views` collection cleanup and script-stripping tests do not depend on pagination, EPUB loading, CFI, request/archive behavior, or iframe layout.
  - The remaining viewport-filling media page test still covers paginated horizontal sizing, so it stays on the legacy Karma gate until rendering/layout coverage is migrated deliberately.
- Diff Scope:
  - `test/views.js`: keep only the viewport-filling single media page legacy Karma test.
  - `test/browser/views.test.js`: add equivalent Vitest Browser Mode coverage for collection cleanup and script stripping.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser DOM collection behavior or script-stripping module resolution differs from the legacy Karma bundle.

### P-0031
- Why:
  - Vitest Browser Mode now owns the migrated low-risk browser tests, so the default `npm test` gate should include it instead of only running the legacy Karma suite.
  - Keeping `test:browser` and `test:legacy` as separate focused commands preserves the ability to debug either runner while making the default test command match the active migration strategy.
- Diff Scope:
  - `package.json`: change `npm test` to run `test:browser` followed by `test:legacy`.
  - `.github/workflows/ci.yml`: use `npm test` as the main test gate instead of duplicating both test commands in CI.
  - `README.md`: document the new full browser regression gate and the focused legacy Karma command.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if downstream automation needs `npm test` to remain a Karma-only alias; `npm run test:legacy` remains the direct Karma command.

### P-0030
- Why:
  - `test/teardown-raf.js` uses synthetic `Contents` and `Rendition` objects to verify teardown guards only; it does not display a rendition, load EPUB content, paginate, navigate CFI, or use request/archive paths.
  - Moving it keeps teardown regression coverage on the Vitest Browser path while leaving real rendering and EPUB integration coverage on the legacy Karma gate.
- Diff Scope:
  - `test/teardown-raf.js`: remove the Karma/Mocha teardown guard tests.
  - `test/browser/teardown-raf.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser async timer behavior diverges from the legacy Karma browser runner.

### P-0029
- Why:
  - `test/manager-listeners.js` validates listener cleanup and Stage measurement with synthetic DOM objects only, without EPUB loading, request/archive behavior, CFI navigation, iframe contents, or pagination.
  - Moving it keeps low-risk DOM coverage on the Vitest Browser path while preserving legacy Karma for rendering-heavy tests.
- Diff Scope:
  - `test/manager-listeners.js`: remove the Karma/Mocha listener cleanup tests.
  - `test/browser/manager-listeners.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser event listener stubbing differs from the legacy Karma browser runner.

### P-0028
- Why:
  - `test/spine.js` validates package/spine unpack metadata and href lookup from inline OPF XML, without loading EPUB archives, requests, iframe contents, pagination, rendition display, or CFI navigation.
  - Moving it continues shrinking the legacy Karma surface while keeping higher-risk rendering and EPUB integration tests on the legacy gate for now.
- Diff Scope:
  - `test/spine.js`: remove the Karma/Mocha spine unpack test.
  - `test/browser/spine.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser module resolution changes Section/Spine construction semantics compared with the legacy Karma bundle.

### P-0027
- Why:
  - `test/pagelist.js` only validates EPUB 3 and NCX page-list XML parsing through `DOMParser`, without Karma fixtures, reader layout, CFI, request, archive, or rendition behavior.
  - Moving it keeps parser-level coverage on the Vitest Browser path while preserving Karma for higher-risk integration tests.
- Diff Scope:
  - `test/pagelist.js`: remove the Karma/Mocha page-list parser tests.
  - `test/browser/pagelist.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if browser XML namespace parsing differs between Vitest Browser and the legacy Karma runner.

### P-0026
- Why:
  - `test/packaging.js` only exercises OPF XML parsing through `DOMParser`, with no Karma fixture server, EPUB archive, request, iframe, or rendition dependency.
  - Moving it continues the Vitest-first migration while preserving legacy Karma for higher-risk rendering and EPUB integration coverage.
- Diff Scope:
  - `test/packaging.js`: remove the Karma/Mocha packaging parser tests.
  - `test/browser/packaging.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if browser XML namespace parsing differs between the Vitest and Karma browser runners.

### P-0025
- Why:
  - `test/navigation.js` is a DOMParser-only navigation lookup test and does not depend on Karma fixtures, iframe rendering, or request/archive behavior.
  - Moving it keeps new and low-risk coverage on the Vitest Browser path while shrinking the legacy Karma gate.
- Diff Scope:
  - `test/navigation.js`: remove the Karma/Mocha navigation lookup test.
  - `test/browser/navigation.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser XML parsing diverges from the legacy Karma browser environment.

### P-0024
- Why:
  - `test/core.js` covers URL and path helpers without Karma-only fixtures, proxies, or rendering behavior, so it is a good next target for the Vitest-first migration.
  - Moving these assertions reduces the legacy Karma surface while preserving the skipped known URL/path edge case.
- Diff Scope:
  - `test/core.js`: remove the Karma/Mocha version of URL and path helper tests.
  - `test/browser/core.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vite dependency resolution for `path-webpack` differs from the legacy Karma/webpack path.

### P-0023
- Why:
  - The Vitest-first rule should apply to the new low-risk platform and compatibility smoke tests added during the F+ split.
  - Karma should stop accumulating new tests and remain focused on the legacy fixture/rendering/layout regression suite.
- Diff Scope:
  - `test/platform-browser.js` / `test/compat-css.js`: remove the new Karma smoke tests.
  - `test/browser/platform-browser.test.js` / `test/browser/compat-css.test.js`: add equivalent Vitest Browser Mode coverage.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if Vitest Browser Mode cannot cover these browser-global smoke tests reliably in CI.

### P-0022
- Why:
  - Future test additions should move to Vitest Browser Mode, while the existing Karma suite remains the legacy regression gate until equivalent coverage is migrated.
  - CI and docs should name the legacy Karma gate explicitly instead of treating it as the long-term default test target.
- Diff Scope:
  - `package.json`: add `npm run test:legacy` as the explicit Karma suite; keep `npm test` unchanged for compatibility.
  - `.github/workflows/ci.yml`: run the legacy Karma suite through `npm run test:legacy`.
  - `README.md`: document the Vitest-first rule for new browser tests and the temporary Karma legacy role.
- Test:
  - `npm run test:browser`
  - `npm run test:legacy`
  - `npm test`
- Rollback:
  - Revert this patch if downstream automation requires CI to call `npm test` directly; the underlying Karma command is unchanged.

### P-0021
- Why:
  - Continue the F+ architecture split by creating a small `compat` boundary for browser CSS compatibility behavior.
  - `utils/core.prefixed()` mixed legacy CSS feature detection into generic utilities; keeping it as a delegating export preserves existing imports while making the compatibility boundary explicit.
- Diff Scope:
  - `src/compat/css.js`: add the CSS vendor prefix resolver.
  - `src/utils/core.js`: delegate the existing `prefixed()` export to `compat/css`.
  - `test/compat-css.js`: verify the new helper and the legacy core export stay aligned.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if CSS property detection behaves differently in downstream readers; no public package entry points are changed.

### P-0020
- Why:
  - Start the F+ internal architecture split with a low-risk `platform` boundary before moving rendering or request/archive code.
  - Browser global feature detection was embedded in `utils/core`, which makes later core/rendering/platform separation harder to reason about.
- Diff Scope:
  - `src/platform/browser.js`: add browser global helpers for `window`, `document`, `navigator`, URL constructor, and prefixed `requestAnimationFrame`.
  - `src/utils/core.js`: keep the existing public utility exports, but source browser URL and RAF detection from the platform boundary.
  - `test/platform-browser.js`: add a Karma smoke proving browser helpers and the legacy `utils/core` RAF export stay aligned.
- Test:
  - `npm test`
  - `npm run test:browser`
  - `npm run typecheck`
  - `npm run lint`
- Rollback:
  - Revert this patch if any browser global detection regression appears; no public package entry points are changed.

### P-0019
- Why:
  - The old `documentation` toolchain kept a dev-only Vue 2 advisory in the tree and generated API docs from legacy JSDoc rather than the package's TypeScript public surface.
  - Documentation should be generated by the same declaration entry point that downstream consumers use for typechecking.
- Diff Scope:
  - `.github/workflows/ci.yml`: run the TypeDoc Markdown generation gate before browser tests.
  - `package.json` / `package-lock.json`: replace `documentation` with TypeDoc and `typedoc-plugin-markdown`; remove the obsolete global `minimatch` override.
  - `typedoc.json` / `typedoc.html.json`: add Markdown and HTML TypeDoc configurations based on `types/index.d.ts`.
  - `documentation.yml`: remove the obsolete documentation.js config.
  - `documentation/md/`: regenerate API docs with TypeDoc.
  - `README.md`: update release checks, audit expectations, and documentation generation notes.
- Test:
  - `npm run docs:md`
  - `npm run docs:html`
  - `npm audit`
  - `npm audit --omit=dev`
- Rollback:
  - Revert this patch if TypeDoc output blocks documentation publishing; the package runtime artifacts are not changed by this slice.

### P-0018
- Why:
  - Karma remains the compatibility regression runner, but the modernization path needs a Vite-native browser test gate before any larger test migration.
  - Start Vitest Browser Mode with a small public API smoke that runs in real Chromium and validates the package root surface without touching EPUB fixture loading yet.
- Diff Scope:
  - `.github/workflows/ci.yml`: run the Vitest browser smoke before the existing Karma test job.
  - `package.json` / `package-lock.json`: add Vitest Browser Mode dependencies and `npm run test:browser`.
  - `vitest.browser.config.mjs`: configure the Playwright browser provider to use system Chrome in headless no-sandbox mode.
  - `test/browser/public-api.test.js`: add the first browser-mode public API smoke.
- Test:
  - `npm run test:browser`
  - `npm test`
- Rollback:
  - Revert this patch if Vitest Browser Mode is unstable in CI; Karma remains the primary browser test gate.

### P-0017
- Why:
  - Core declarations still typed `requestCredentials` as `object`, treated custom request methods as generic functions, and returned the global `JSON` object type for parsed JSON responses.
  - `Book`, `Rendition`, and `request` should expose a stronger public contract before the next release tag is consumed by Aitehub.
- Diff Scope:
  - `types/utils/request.d.ts`: add request type/header/response aliases and overloads for binary, blob, JSON, XML, XHTML, and fallback requests.
  - `types/book.d.ts`: use `RequestMethod`, `RequestHeaders`, and `RequestResponse`; allow Blob input where runtime already supports it.
  - `types/rendition.d.ts`: align `attachTo`, `currentLocation`, and `resize` signatures with runtime behavior.
  - `types/epub.d.ts` / `types/epubjs-tests.ts`: cover Blob input and the stronger core API types.
- Test:
  - `npm run typecheck`
- Rollback:
  - Revert this patch if downstream TypeScript consumers need the previous looser request/book/rendition declarations.

### P-0016
- Why:
  - The public default `ePub` function exposes static members at runtime (`VERSION`, `Book`, `Rendition`, `Contents`, `CFI`, and `utils`) that were not represented in the TypeScript entry declarations.
  - Aitehub and other consumers should be able to typecheck both named imports and the legacy default static surface from the package root.
- Diff Scope:
  - `types/epub.d.ts`: declare the default callable's static public API.
  - `types/index.d.ts`: update the project header to the maintained fork and keep the namespace declaration compact.
  - `types/epubjs-tests.ts`: add type assertions for root named exports and default static members.
- Test:
  - `npm run typecheck`
- Rollback:
  - Revert this patch if downstream TypeScript consumers rely on the previous narrower default callable type.

### P-0015
- Why:
  - The release checklist uses `npm run typecheck`, but GitHub Actions did not run the TypeScript declaration gate.
  - CI should exercise the same package entry/type contract that Aitehub consumes from the fork release tarball.
- Diff Scope:
  - `.github/workflows/ci.yml`: add `npm run typecheck` before compile/build/test.
- Test:
  - `npm run typecheck`
- Rollback:
  - Remove the CI typecheck step if it blocks unrelated emergency releases.

### P-0014
- Why:
  - The fork now uses `tsc -p tsconfig.json --noEmit` for the transitional TypeScript declaration gate.
  - `types/tslint.json` referenced the obsolete `dtslint` stack but was no longer used by package scripts, CI, or documentation.
- Diff Scope:
  - `types/tslint.json`: remove the stale dtslint configuration.
- Test:
  - `npm run typecheck`
- Rollback:
  - Restore `types/tslint.json` if a downstream declaration workflow still depends on dtslint.

### P-0013
- Why:
  - `npm run lint` was wired into CI but forced a successful exit even with hundreds of legacy ESLint errors and warnings.
  - The fork needs a measurable modernization gate that prevents new lint debt without requiring a full source cleanup in the same slice.
- Diff Scope:
  - `eslint-baseline.json`: record the current ESLint debt ceiling.
  - `scripts/check-eslint-baseline.mjs`: run ESLint as JSON, compare total errors and warnings against the ceiling, and fail when the ceiling is exceeded.
  - `package.json`: make `npm run lint` execute the baseline gate.
  - `README.md`: document the transitional lint gate and baseline reduction rule.
- Test:
  - `npm run lint`
- Rollback:
  - Revert this patch and restore the previous reporting-only lint script.

### P-0012
- Why:
  - Start the vNext modernization path with package entry points that match current JavaScript package conventions while preserving Aitehub's existing root imports.
  - Move the primary distribution build from webpack to Vite/Rollup without removing the legacy webpack fallback yet.
  - Add a TypeScript typecheck command as the first step toward core TypeScript migration.
- Diff Scope:
  - `package.json`: point `main`, `module`, `browser`, `types`, and `exports` at explicit public entry points; add Vite/Rollup build scripts and `typecheck`; keep webpack legacy scripts as fallback.
  - `.gitignore` / `dist/`: keep only the Vite/Rollup release artifacts trackable so GitHub codeload tarballs contain the files referenced by package entry points.
  - `vite.config.mjs` / `vite.umd.config.mjs`: add ESM, CJS, browser UMD, and minified browser UMD builds.
  - `tsconfig.json`: add the transitional TypeScript check configuration for current JS sources and existing declaration tests.
  - `types/index.d.ts` / `types/epubjs-tests.ts`: cover the Aitehub root imports, including the named `request` export.
  - `README.md`: document Vite/Rollup outputs and updated release checks.
- Test:
  - `npm install`
  - `npm run typecheck`
  - `npm run build`
  - ESM smoke: dynamic import of `dist/epub.mjs` exposes default, `Rendition`, and `request`
  - CJS smoke: `require("./dist/epub.cjs")` exposes default, `Rendition`, and `request`
  - UMD smoke: `require("./dist/epub.js")` returns the `ePub` function when `JSZip` is global
  - `npm test`
  - `npm audit --omit=dev` reports 0 vulnerabilities
- Rollback:
  - Revert this patch commit and keep using the previous Babel + webpack package entry points.

### P-0011
- Why:
  - The fork README still presented upstream FuturePress links, badges, images, Bower-era metadata, and social/community references that are no longer maintained.
  - Dependency metadata and lockfile state carried obsolete tooling and avoidable production audit findings.
  - Release validation needs to distinguish production dependency safety from the remaining dev-only `documentation -> vue-template-compiler` advisory.
- Diff Scope:
  - `README.md`: rewrite the README around the `lalalili/epub.js` maintenance fork, Aitehub tarball consumption, local examples, tests, build commands, generated API docs, hook usage, and reader integration ownership.
  - `package.json` / `package-lock.json`: update fork repository metadata, remove Travis/Bower/PhantomJS-era tooling, upgrade build/test dependencies, and add npm overrides for vulnerable transitive packages where compatible.
  - `.travis.yml` / `bower.json`: remove obsolete distribution and CI metadata.
  - `documentation/md/API.md` and `lib/`: regenerate documentation and compiled output after dependency updates.
- Test:
  - `npm install`
  - `npm run compile`
  - `npm run build`
  - `npm run docs:md`
  - `npm test`
  - `npm start` smoke test until webpack-dev-server compiled successfully
  - `npm audit --omit=dev` reports 0 vulnerabilities
  - Full `npm audit` still reports the dev-only `documentation -> vue-template-compiler` moderate advisory; the available npm fix downgrades `documentation` to `6.2.0` and is intentionally not applied.
- Rollback:
  - Revert this patch commit and restore the previous package lock if the upgraded toolchain breaks release preparation.

### P-0010
- Why:
  - Annotation and bookmark jumps need to recompute vertical-rl text-boundary snapping instead of reusing stale cached logical page offsets from sequential page turns.
  - Vertical-rl same-document hash navigation could assign a target to the previous visual page when the target sat inside the previous page's snap tolerance but outside its strict visible range.
  - Footnote backlinks in RTL / vertical-rl books then focused the correct DOM anchor while the outer paginated container remained on the wrong visual page, leaving the source marker outside the visible viewport.
- Diff Scope:
  - `src/managers/default/index.js`: add `scrollToLogicalPage(pageIndex, { ignoreCachedLogicalOffset: true })` support for jump paths that need fresh boundary snapping
  - `src/managers/default/index.js`: make `getVerticalRlPageIndexForOffset()` prefer the strict page range before falling back to tolerance / nearest-page matching
  - `test/vertical-rl-manager.js`: add regressions for cached-offset bypass and for a hash anchor that overlaps the previous page tolerance but belongs to the next strict page
- Test:
  - `npx karma start --single-run --browsers ChromeHeadlessNoSandbox --grep "ignore a cached vertical-rl page offset"`
  - `npx karma start --single-run --browsers ChromeHeadlessNoSandbox --grep "prefers the strict vertical-rl page"`
  - Real-book validation: `01KQRTA21S9M41Y3646WEQNHE5`, `Section0012.xhtml`, footnote `#footnote-071` / backlink `#footnote-071-backlink`
- Rollback:
  - Revert this patch commit and release a new fork tag.

## 2026-03-28

### P-0009
- Why:
  - Full `locations.generate()` loads every spine section sequentially, which in chunk mode downloads all encrypted content before reading can start. Consumers need a way to refine locations one section at a time as the reader naturally loads content.
  - `generateForSection(section, chars)` loads a single section, parses precise CFI locations for it, then splices them into `_locations` in the correct sorted position — replacing any coarser (e.g. synthetic) entries that were already there for that section.
  - This enables progressive refinement: call once per `relocated` event for visited sections, keeping per-section accuracy without the full-book scanning cost.
- Diff Scope:
  - `src/locations.js`: add `generateForSection(section, chars)` method
- Test:
  - Build verify: `npm run build`
  - Unit: navigate to a section, call `book.locations.generateForSection(section, 150)`, verify `_locations` contains precise CFIs only for that section and total is updated
- Rollback:
  - Revert this patch commit.

## 2026-03-22

### P-0008
- Why:
  - epub.js uses `requestAnimationFrame` callbacks in two critical paths. When the reader is torn down (navigate away, component unmount), rAF callbacks can still fire after the underlying objects are destroyed, causing uncaught "Cannot read properties of null" errors. Application layer had to catch these errors with a global `window.addEventListener('error', ...)` handler.
  - `Contents.resizeCheck()` calls `this.document.createRange()` — if the iframe is already detached, `this.document` is `null`.
  - `reportedLocationAfterRAF()` calls `this.manager.currentLocation()` — if the rendition is destroyed before the frame fires, `this.manager` may be `null` or already torn down.
- Diff Scope:
  - `src/contents.js`: add `if (!this.document) return;` guard at top of `resizeCheck()`
  - `src/rendition.js`: add `if (!this.manager) return;` guard and try/catch around `this.manager.currentLocation()` in `reportedLocationAfterRAF`
- Test:
  - Build verify: `npm run build`
  - Regression: open a book, rapidly navigate between chapters / unmount the component — no "Cannot read properties of null" errors in console
- Rollback:
  - Revert this patch commit.

### P-0007
- Why:
  - Expose `request` utility from public API so consumers can `import { request } from 'epubjs'` instead of the fragile deep import `epubjs/lib/utils/request`.
- Diff Scope:
  - `src/index.js`: add `import request from "./utils/request"` and include `request` in named exports
- Test:
  - Build verify: `npm run compile && npm run build`
  - Consumer can do `import { request } from 'epubjs'` or `const { request } = require('epubjs')`
- Rollback:
  - Revert this patch commit.

### P-0006
- Why:
  - Replace webpack 4 + `--openssl-legacy-provider` workaround with webpack 5, which uses xxhash64 (no OpenSSL md4 dependency). Enables clean Node 22+ / Node 24+ builds without any environment flags.
- Diff Scope:
  - `package.json`: webpack 4→5, webpack-cli 3→5, webpack-dev-server 3→5, terser-webpack-plugin 3→5, babel-loader 8→9, karma-webpack 4→5; remove `--openssl-legacy-provider` from all build scripts; update `start` to `webpack serve`
  - `webpack.config.js`: update `output.library` to v5 object form (`{ name, type, export }`); remove deprecated `libraryTarget`/`libraryExport`; add `globalObject` for UMD compatibility; update `devServer` (remove `inline`, use `static.publicPath`)
- Test:
  - `npm run compile` (babel)
  - `npm run build` (main UMD)
  - `npm run minify` (minified UMD)
  - `npm run legacy` (legacy UMD)
  - `npm run productionLegacy` (legacy minified UMD)
  - All 5 pass on Node 24 without `--openssl-legacy-provider`
- Rollback:
  - Revert this patch commit (restore webpack 4 deps + `--openssl-legacy-provider` scripts).

## 2026-03-03

### P-0001
- Why:
  - Stabilize CFI restore when stored offsets are out of range (`Range.setStart` / `Range.setEnd` edge cases).
- Diff Scope:
  - `src/epubcfi.js`
- Test:
  - `npm test`
- Rollback:
  - Revert this patch commit.

### P-0002
- Why:
  - Fix vertical RTL paginated `display(cfi)` offset shift (`moveTo` Y-axis grid should use `layout.height`).
- Diff Scope:
  - `src/managers/default/index.js`
- Test:
  - `npm test`
- Rollback:
  - Revert this patch commit.

### P-0003
- Why:
  - Remove leaked `window` listeners after destroy (`unload` and `orientationchange` cleanup).
- Diff Scope:
  - `src/managers/default/index.js`
  - `src/managers/continuous/index.js`
  - `src/managers/helpers/stage.js`
- Test:
  - `npm test`
- Rollback:
  - Revert this patch commit.

### P-0004
- Why:
  - Ensure at least one generated location per section for image-heavy/empty-text sections.
- Diff Scope:
  - `src/locations.js`
- Test:
  - `npm test`
- Rollback:
  - Revert this patch commit.

### P-0005
- Why:
  - Make git-hosted prepare stable on Node 22+ by forcing OpenSSL legacy provider for webpack-based build scripts.
- Diff Scope:
  - `package.json` scripts (`build`, `minify`, `legacy`, `productionLegacy`)
- Test:
  - `NODE_OPTIONS=--openssl-legacy-provider npm test`
  - `npm run build`
- Rollback:
  - Revert this patch commit.

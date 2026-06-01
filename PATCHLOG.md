# Patchlog

This file tracks `lalalili/epub.js` fork patches for internal maintenance.

## Template

### Patch ID
- Why:
- Diff Scope:
- Test:
- Rollback:

## 2026-06-01

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

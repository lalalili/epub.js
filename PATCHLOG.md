# Patchlog

This file tracks `lalalili/epub.js` fork patches for internal maintenance.

## Template

### Patch ID
- Why:
- Diff Scope:
- Test:
- Rollback:

## 2026-06-01

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

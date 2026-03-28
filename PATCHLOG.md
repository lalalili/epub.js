# Patchlog

This file tracks `lalalili/epub.js` fork patches for internal maintenance.

## Template

### Patch ID
- Why:
- Diff Scope:
- Test:
- Rollback:

## 2026-03-28

### P-AITEHUB-0009
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

### P-AITEHUB-0008
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

### P-AITEHUB-0007
- Why:
  - Expose `request` utility from public API so consumers can `import { request } from 'epubjs'` instead of the fragile deep import `epubjs/lib/utils/request`.
- Diff Scope:
  - `src/index.js`: add `import request from "./utils/request"` and include `request` in named exports
- Test:
  - Build verify: `npm run compile && npm run build`
  - Consumer can do `import { request } from 'epubjs'` or `const { request } = require('epubjs')`
- Rollback:
  - Revert this patch commit.

### P-AITEHUB-0006
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

### P-AITEHUB-0001
- Why:
  - Stabilize CFI restore when stored offsets are out of range (`Range.setStart` / `Range.setEnd` edge cases).
- Diff Scope:
  - `src/epubcfi.js`
- Test:
  - `npm test`
- Rollback:
  - Revert this patch commit.

### P-AITEHUB-0002
- Why:
  - Fix vertical RTL paginated `display(cfi)` offset shift (`moveTo` Y-axis grid should use `layout.height`).
- Diff Scope:
  - `src/managers/default/index.js`
- Test:
  - `npm test`
- Rollback:
  - Revert this patch commit.

### P-AITEHUB-0003
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

### P-AITEHUB-0004
- Why:
  - Ensure at least one generated location per section for image-heavy/empty-text sections.
- Diff Scope:
  - `src/locations.js`
- Test:
  - `npm test`
- Rollback:
  - Revert this patch commit.

### P-AITEHUB-0005
- Why:
  - Make git-hosted prepare stable on Node 22+ by forcing OpenSSL legacy provider for webpack-based build scripts.
- Diff Scope:
  - `package.json` scripts (`build`, `minify`, `legacy`, `productionLegacy`)
- Test:
  - `NODE_OPTIONS=--openssl-legacy-provider npm test`
  - `npm run build`
- Rollback:
  - Revert this patch commit.

# Patchlog

This file tracks `lalalili/epub.js` fork patches for internal maintenance.

## Template

### Patch ID
- Why:
- Diff Scope:
- Test:
- Rollback:

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

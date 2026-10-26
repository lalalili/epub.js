# Epub.js v0.3 maintenance fork

This repository is the `lalalili/epub.js` maintenance fork of
`futurepress/epub.js`. It keeps the 0.3.x public API stable while carrying
patches needed by the shared CPTW EPUB reader.

The upstream project, original API shape, and BSD-2-Clause license remain from
FuturePress. Fork-specific behavior and release notes are tracked in
[`PATCHLOG.md`](PATCHLOG.md).

## Fork usage

The shared `cptw-and-yunwu/epub-reader` package consumes this fork as GitHub release tarballs:

```text
https://codeload.github.com/lalalili/epub.js/tar.gz/v0.3.93.<N>
```

The package version remains `0.3.93` for compatibility with existing consumers.
Fork releases are cut as tags such as `v0.3.93.124`.

This repository is not published to npm as the canonical distribution. Update
the shared Reader package's tarball tag and lockfile after an authorized engine
release. CPTW is the primary Web/Android qualification host; Aitehub consumes
released Reader packages through Composer as a compatibility host.

## Getting started

The development toolchain is Node.js 26.12.1, pnpm 12.15.0 and Vite+ 1.4.0.
Use `pnpm install --frozen-lockfile` for a reproducible checkout. Release CI also
checks Node 22.23.4 and 24.22.1; the build runtime does not redefine consumer support.
The `prepare` and nested build runners retain `npm run` so source-package consumers
do not need a separate pnpm binary. Toolchain dependencies use concrete npm-compatible
versions; pnpm remains the canonical installer and lockfile owner.

If using archived `.epub` files in a browser build, include JSZip before
epub.js:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="../dist/epub.min.js"></script>
```

Set up an element to render into:

```html
<div id="area"></div>
```

Create the book and render it:

```html
<script>
  var book = ePub("url/to/book/package.opf");
  var rendition = book.renderTo("area", { width: 600, height: 400 });
  var displayed = rendition.display();
</script>
```

## Render methods

### Default

```js
book.renderTo("area", { method: "default", width: "100%", height: "100%" });
```

The default manager displays a single section at a time.

### Continuous

```js
book.renderTo("area", { method: "continuous", width: "100%", height: "100%" });
```

The continuous manager displays as many sections as needed to fill the screen
and preloads the next section offscreen. This enables seamless swiping or
scrolling between pages, but it is less performant than the default method.

## Flow overrides

### Auto

```js
book.renderTo("area", { flow: "auto", width: "900", height: "600" });
```

Flow is based on OPF settings and defaults to `paginated`.

### Paginated

```js
book.renderTo("area", { flow: "paginated", width: "900", height: "600" });
```

### Scrolled

```js
book.renderTo("area", { flow: "scrolled-doc", width: "900", height: "600" });
```

## Scripted content

[Scripted EPUB content](https://www.w3.org/TR/epub-33/#sec-scripted-content)
is disabled by default because it can execute untrusted code inside rendered
book content.

Scripts can be enabled for trusted EPUB files by passing
`allowScriptedContent: true` to the rendition settings:

```html
<script>
  var rendition = book.renderTo("area", {
    width: 600,
    height: 400,
    allowScriptedContent: true
  });
</script>
```

Even with iframe sandboxing, consumers should sanitize untrusted EPUB content
server-side.

## Local development

Install dependencies with npm:

```sh
pnpm install --frozen-lockfile
```

Run the local example server:

```sh
npm start
```

Local examples are available under `/examples/`, for example:

- `/examples/spreads.html`
- `/examples/scrolled.html`
- `/examples/continuous-scrolled.html`
- `/examples/swipe.html`
- `/examples/highlights.html`

Legacy upstream examples are still available at
<https://futurepress.github.io/epub.js/examples/>, but fork validation should
prefer local examples and Aitehub reader regression cases.

## Testing

Run the full browser regression gate:

```sh
npm test
```

`npm test` runs the Vitest Browser Mode suite. All browser tests now run
through Vitest Browser Mode:

```sh
pnpm run test:browser
```

Add new tests under `test/browser/**/*.test.js`.

The legacy Karma suite has been removed. `pnpm run test:legacy` is kept as a
compatibility no-op for older automation:

```sh
pnpm run test:legacy
```

Before cutting a fork release, run:

```sh
pnpm run verify:release
```

`pnpm run lint` scans the TypeScript source with Vite Plus and compares each
warning's file, rule and message against `eslint-baseline.json`. Tool failures,
invalid or empty scans, errors, and new or changed warnings fail the gate.
Resolved warnings must be removed from the inventory in the same change.
This legacy inventory is not a zero-warning qualification: use
`pnpm run lint:strict` for that check. Promise ownership and pagination warnings
require focused runtime evidence before behavior changes. Run
`pnpm run test:lint-gate` to verify failure handling and inventory comparisons.

Use `pnpm run fmt:check` for authored code and configuration. Generated assets,
documentation and book fixtures are excluded; `pnpm run fmt` applies formatting.

`pnpm run verify:contracts` checks the package entry surface, TypeDoc toolchain,
Vitest-only test layout, dry-run tarball contents, and packed-package consumer
resolution that Aitehub release tarball consumers depend on. It also verifies
the shared release gate wiring used by CI and the internal source boundary that
keeps `utils/core` as a public compatibility facade.

`pnpm run verify:release` runs the full fork release gate: lint, TypeScript
declarations, Babel output, Vite/Rollup builds, TypeDoc Markdown, package
contracts, Vitest Browser Mode, dependency audits, and the final `npm pack
--dry-run` lifecycle check.

The fork should keep both full dependency audit and production dependency audit
clean. `pnpm run docs:md` is powered by TypeDoc from the public declaration
entry point, so API documentation reflects the package surface consumed by
Aitehub.

## Building for distribution

Builds use Vite+ library mode. The package entry points are:

- `dist/epub.mjs` for ESM consumers
- `dist/epub.cjs` for CommonJS consumers
- `dist/epub.js` for browser UMD examples
- `dist/epub.min.js` for minified browser UMD examples

The compatibility `lib/` output is still generated with Babel for transitional
consumers, but package resolution now points at `dist/`.
The `dist/epub*` release files are tracked intentionally because Aitehub
consumes GitHub codeload tarballs.

```sh
pnpm run prepare
```

For development rebuilds:

```sh
pnpm run build
```

Legacy webpack builds have been removed. Vite/Rollup is the supported
distribution build path.

## Documentation

Generated TypeDoc API documentation is included at
[`documentation/md/API.md`](documentation/md/API.md). Regenerate it with:

```sh
pnpm run docs:md
```

For local HTML browsing, run:

```sh
pnpm run docs:html
```

Because this fork is maintained for Aitehub integration, fork-specific changes
and rollback notes belong in [`PATCHLOG.md`](PATCHLOG.md), not only in generated
API output.

## Hooks

Epub.js exposes hooks that allow consumers to inspect and manipulate book
content during rendering.

```js
rendition.hooks.content.register(function(contents, view) {
  var elements = contents.document.querySelectorAll("[video]");
  var items = Array.prototype.slice.call(elements);

  items.forEach(function(item) {
    // do something with the video item
  });
});
```

Common hook points:

```js
book.spine.hooks.serialize; // Section is being converted to text
book.spine.hooks.content; // Section has been loaded and parsed
rendition.hooks.render; // Section is rendered to the screen
rendition.hooks.content; // Section contents have been loaded
rendition.hooks.unloaded; // Section contents are being unloaded
```

## Reader integration

The standalone upstream reader lives at
<https://github.com/futurepress/epubjs-reader/>.

The shared Reader source of truth is the independent checkout at
`/home/cptw/cptw/packages/epub-reader`; this engine checkout lives at
`/home/cptw/cptw/.local/epub.js`. Core layout, pagination, CFI, RTL, vertical writing, and
rendition behavior should be fixed in this fork when the defect is intrinsic to
epub.js. Follow the host's current incident and pagination freeze gates before
changing geometry. Host runtime evidence and real-book qualification remain
separate from engine fixture results. iOS native verification is handled by the
designated iOS colleague, not inferred from Web or Android results.

## License and attribution

Epub.js is BSD-2-Clause licensed. See [`license`](license).

EPUB is a registered trademark of the W3C Publishing Business Group's
predecessor organizations.

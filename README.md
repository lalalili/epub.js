# Epub.js v0.3 maintenance fork

This repository is the `lalalili/epub.js` maintenance fork of
`futurepress/epub.js`. It keeps the 0.3.x public API stable while carrying
patches needed by the Aitehub EPUB reader.

The upstream project, original API shape, and BSD-2-Clause license remain from
FuturePress. Fork-specific behavior and release notes are tracked in
[`PATCHLOG.md`](PATCHLOG.md).

## Fork usage

Aitehub consumes this fork as GitHub release tarballs:

```text
https://codeload.github.com/lalalili/epub.js/tar.gz/v0.3.93.<N>
```

The package version remains `0.3.93` for compatibility with existing consumers.
Fork releases are cut as tags such as `v0.3.93.124`.

This repository is not published to npm as the canonical distribution for
Aitehub. Update the tarball tag in both Aitehub manifests when cutting a new
fork release.

## Getting started

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
npm install
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
npm run test:browser
```

Add new tests under `test/browser/**/*.test.js`.

The legacy Karma suite has been removed. `npm run test:legacy` is kept as a
compatibility no-op for older automation:

```sh
npm run test:legacy
```

Before cutting a fork release, run:

```sh
npm run typecheck
npm run compile
npm run build
npm run docs:md
npm test
npm audit
npm audit --omit=dev
```

`npm run lint` enforces the current ESLint debt ceiling from
`eslint-baseline.json`. The legacy source tree is not lint-clean yet, but CI
must fail if the total error or warning count increases. When lint debt is
fixed, lower the matching baseline counts in the same change.

The fork should keep both full dependency audit and production dependency audit
clean. `npm run docs:md` is powered by TypeDoc from the public declaration
entry point, so API documentation reflects the package surface consumed by
Aitehub.

## Building for distribution

Builds are bundled with Vite/Rollup. The package entry points are:

- `dist/epub.mjs` for ESM consumers
- `dist/epub.cjs` for CommonJS consumers
- `dist/epub.js` for browser UMD examples
- `dist/epub.min.js` for minified browser UMD examples

The compatibility `lib/` output is still generated with Babel for transitional
consumers, but package resolution now points at `dist/`.
The `dist/epub*` release files are tracked intentionally because Aitehub
consumes GitHub codeload tarballs.

```sh
npm run prepare
```

For development rebuilds:

```sh
npm run build
```

Legacy webpack builds remain available through `npm run build:webpack`,
`npm run legacy`, and `npm run productionLegacy` while the Vite/Rollup path is
rolled out.

## Documentation

Generated TypeDoc API documentation is included at
[`documentation/md/API.md`](documentation/md/API.md). Regenerate it with:

```sh
npm run docs:md
```

For local HTML browsing, run:

```sh
npm run docs:html
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

The Aitehub integration source of truth lives in the `epub-reader` package in
the Aitehub repository. Core layout, pagination, CFI, RTL, vertical writing, and
rendition behavior should be fixed in this fork when the defect is intrinsic to
epub.js.

## License and attribution

Epub.js is BSD-2-Clause licensed. See [`license`](license).

EPUB is a registered trademark of the W3C Publishing Business Group's
predecessor organizations.

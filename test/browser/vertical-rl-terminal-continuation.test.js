import { afterEach, expect, it } from "vitest";
import JSZip from "jszip";
import ePub from "../../src/epub";

const fixtures = [];
afterEach(() => {
	for (const { book, host } of fixtures.splice(0)) {
		book.destroy();
		host.remove();
	}
});

async function fixture(columns = 90) {
	const zip = new JSZip();
	zip.file("mimetype", "application/epub+zip");
	zip.file("META-INF/container.xml", '<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>');
	zip.file("OPS/package.opf", '<?xml version="1.0"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="id"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="id">terminal-continuation-fixture</dc:identifier><dc:title>Terminal continuation</dc:title><dc:language>en</dc:language></metadata><manifest><item id="one" href="one.xhtml" media-type="application/xhtml+xml"/><item id="two" href="two.xhtml" media-type="application/xhtml+xml"/><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/></manifest><spine page-progression-direction="rtl"><itemref idref="one"/><itemref idref="two"/></spine></package>');
	const style = "html,body{margin:0;padding:0;writing-mode:vertical-rl;direction:ltr;font:16px/31px monospace;text-orientation:upright}p{margin:0;padding:0}span{white-space:nowrap}";
	const document = (body) => `<?xml version="1.0"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Fixture</title><style>${style}</style></head><body>${body}</body></html>`;
	zip.file("OPS/one.xhtml", document(Array.from({ length: columns }, (_, i) => `<p><span id="unit-${i}">ABCDEFGHI</span></p>`).join("")));
	zip.file("OPS/two.xhtml", document("<p>NEXT</p>"));
	zip.file("OPS/nav.xhtml", '<?xml version="1.0"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><title>Navigation</title></head><body><nav epub:type="toc"><ol><li><a href="one.xhtml">One</a></li><li><a href="two.xhtml">Two</a></li></ol></nav></body></html>');
	const host = window.document.createElement("div");
	host.style.cssText = "width:260px;height:260px";
	window.document.body.appendChild(host);
	const book = ePub(await zip.generateAsync({ type: "arraybuffer" }));
	fixtures.push({ book, host });
	await book.ready;
	const rendition = book.renderTo(host, { width: 260, height: 260, spread: "none", flow: "paginated" });
	await rendition.display(0);
	await rendition.manager.waitForVerticalRlLayoutReady();
	return { manager: rendition.manager, rendition, markerA: `unit-${columns - 9}`, markerB: `unit-${columns - 1}` };
}

function state(manager) {
	const view = manager.views.first();
	const frame = view.iframe.getBoundingClientRect();
	const viewport = manager.container.getBoundingClientRect();
	const mask = manager.getVerticalRlRenderedEdgeMaskWidths();
	const visible = Array.from(view.contents.document.querySelectorAll("span[id]")).filter((span) => {
		const rect = span.getBoundingClientRect();
		return rect.width > 0 && rect.height > 0 && frame.left + rect.left >= viewport.left + mask.left && frame.left + rect.right <= viewport.right - mask.right && frame.top + rect.top >= viewport.top && frame.top + rect.bottom <= viewport.bottom;
	}).map((span) => span.id);
	return { href: view.section.href, index: manager.getCurrentPageIndex(), total: manager.getTotalPagesForCurrentView(), offset: manager.getNormalizedLogicalScrollLeft(), max: manager.getMaxLogicalScrollLeft(), tolerance: manager.getPageSnapTolerance(), visible, cache: JSON.parse(JSON.stringify(manager._verticalRlLogicalPageOffsetCache || null)) };
}

it("preserves the early terminal window, reaches the tail, and returns through both after a spine round trip", async () => {
	const { manager, markerA, markerB } = await fixture();
	const initial = state(manager);
	const base = initial.total;
	const forward = [];
	let early;
	for (let turn = 0; turn < base * 3; turn += 1) {
		const current = state(manager);
		forward.push(current);
		if (current.href !== initial.href) break;
		if (current.index === base - 1) early = current;
		await manager.next();
		await manager.waitForVerticalRlLayoutReady();
	}
	expect(early).toBeDefined();
	expect(early.index).toBeLessThan(early.total - 1);
	expect(early.visible).toContain(markerA);
	const sectionPages = forward.filter((s) => s.href === initial.href);
	const tail = sectionPages.at(-1);
	expect(tail.visible).toContain(markerB);
	expect(tail.max - tail.offset).toBeLessThanOrEqual(tail.tolerance);
	expect(early.max - early.offset).toBeGreaterThan(early.tolerance);
	expect(early.visible).not.toContain(markerB);
	expect(tail.cache.key).toBe(early.cache.key);
	for (const page of sectionPages.slice(1)) {
		expect(tail.cache.offsets[page.index]).toBe(page.cache.offsets[page.index]);
	}
	expect(sectionPages.flatMap((s) => s.visible)).toEqual(expect.arrayContaining([markerA, markerB]));
	expect(forward.at(-1).href).not.toBe(initial.href);
	await manager.prev();
	await manager.waitForVerticalRlLayoutReady();
	const returnedTail = state(manager);
	expect(returnedTail.href).toBe(initial.href);
	expect(returnedTail.index).toBe(tail.index);
	expect(returnedTail.total).toBe(tail.total);
	expect(returnedTail.visible).toContain(markerB);
	await manager.prev();
	await manager.waitForVerticalRlLayoutReady();
	expect(state(manager).index).toBe(tail.index - 1);
	expect(state(manager).visible).toContain(markerA);
	expect(state(manager).offset).toBe(early.offset);
	expect(state(manager).visible).toEqual(early.visible);
}, 60000);

it("can reserve multiple terminal continuations without losing any learned offsets", async () => {
	const { manager, markerB } = await fixture(450);
	const entry = state(manager);
	let last = entry;
	const offsets = new Map();
	for (let turn = 0; turn < entry.total * 3; turn += 1) {
		const current = state(manager);
		if (current.href !== entry.href) break;
		expect(current.offset).toBeGreaterThanOrEqual(last.offset);
		for (const [index, offset] of offsets) expect(current.cache.offsets[index]).toBe(offset);
		if (current.cache) offsets.set(current.index, current.cache.offsets[current.index]);
		last = current;
		await manager.next();
		await manager.waitForVerticalRlLayoutReady();
	}
	expect(last.total - entry.total).toBeGreaterThan(1);
	expect(last.index).toBe(last.total - 1);
	expect(last.max - last.offset).toBeLessThanOrEqual(last.tolerance);
	expect(last.visible).toContain(markerB);
	expect(state(manager).href).not.toBe(entry.href);
}, 60000);

it("keeps a promoted window stable through retry and invalidates continuation on resize", async () => {
	const { manager, rendition } = await fixture();
	const base = state(manager).total;
	for (let index = 1; index < base; index += 1) {
		await manager.next();
		await manager.waitForVerticalRlLayoutReady();
	}
	const promoted = state(manager);
	expect(promoted.total).toBeGreaterThan(base);
	manager.settings.verticalRlBoundarySnapRetryDelays = [0];
	manager.queueVerticalRlBoundarySnapRetry(promoted.index, { useCurrentOffset: true });
	await manager.waitForVerticalRlLayoutReady();
	await manager.waitForVerticalRlLayoutReady();
	expect(state(manager)).toEqual(promoted);

	rendition.resize(320, 260);
	await manager.waitForVerticalRlLayoutReady();
	await expect.poll(() => manager.container.clientWidth).toBe(320);
	manager.scrollToLogicalPage(0);
	await manager.waitForVerticalRlLayoutReady();
	const resized = state(manager);
	expect(resized.cache?.key).not.toBe(promoted.cache.key);
	expect(manager.getVerticalRlTerminalLayout()?.continuationCount ?? 0).toBe(0);
	rendition.resize(260, 260);
	await manager.waitForVerticalRlLayoutReady();
	manager.scrollToLogicalPage(0);
	await manager.waitForVerticalRlLayoutReady();
	expect(manager.getVerticalRlTerminalLayout()?.continuationCount ?? 0).toBe(0);
}, 60000);

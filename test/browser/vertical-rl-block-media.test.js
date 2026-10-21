import { afterEach, expect, it } from "vitest";
import JSZip from "jszip";
import ePub from "../../src/epub";
import Contents from "../../src/contents";
import { layoutVerticalRlBlockMedia, resolveVerticalRlBlockMediaOffset } from "../../src/rendering/block-media";

const fixtures = [];

async function createTypographyMediaFixture(fontSize, lineHeight) {
	const zip = new JSZip();
	zip.file("mimetype", "application/epub+zip");
	zip.file("META-INF/container.xml", '<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0"><rootfiles><rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>');
	zip.file("OPS/package.opf", '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="id"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="id">media-reflow-fixture</dc:identifier><dc:title>Media reflow</dc:title><dc:language>en</dc:language></metadata><manifest><item id="one" href="one.xhtml" media-type="application/xhtml+xml"/><item id="image" href="grid.svg" media-type="image/svg+xml"/></manifest><spine page-progression-direction="rtl"><itemref idref="one"/></spine></package>');
	zip.file("OPS/grid.svg", '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="blue"/></svg>');
	zip.file("OPS/one.xhtml", `<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Fixture</title><style>html,body{margin:0;padding:0;writing-mode:vertical-rl;direction:ltr;font:${fontSize}px/${lineHeight}px monospace;text-orientation:upright}h1{margin:0;font-size:1.4em;line-height:1.4}p{margin:1em}img{display:block;max-height:209.95px;max-width:100%;width:auto;height:auto;margin:auto}</style></head><body><h1>ABCDEFG</h1><div><br/></div><div><br/></div><p>${"甲".repeat(89)}</p><p>${"乙".repeat(54)}</p><div style="width:100%;writing-mode:horizontal-tb"><img id="media" src="grid.svg"/></div></body></html>`);
	const host = document.createElement("div");
	host.style.cssText = "width:802.1818237304688px;height:221.09091186523438px";
	document.body.appendChild(host);
	const book = ePub(await zip.generateAsync({ type: "arraybuffer" }));
	fixtures.push({ book, host });
	await book.ready;
	const rendition = book.renderTo(host, { width: 802.1818237304688, height: 221.09091186523438, spread: "none", flow: "paginated" });
	await rendition.display(0);
	await rendition.manager.waitForVerticalRlLayoutReady();
	return rendition;
}

it("matches a fresh small-font media canvas after changing a retained default-font view", async () => {
	const fresh = await createTypographyMediaFixture(18, 28.8);
	const changed = await createTypographyMediaFixture(24, 48);
	const view = changed.manager.views.first();
	view.contents.css("font-size", "18px");
	view.contents.css("line-height", "28.8px");
	view.expand();
	const freshView = fresh.manager.views.first();
	expect(changed.manager.getTotalPagesForCurrentView()).toBe(fresh.manager.getTotalPagesForCurrentView());
	expect(view.width()).toBeCloseTo(freshView.width(), 1);
	expect(view.contents.content.getBoundingClientRect().width).toBeCloseTo(freshView.contents.content.getBoundingClientRect().width, 1);
	await changed.manager.waitForVerticalRlLayoutReady();
});

it.each([{ excess: 0.09, pages: 2 }, { excess: 3, pages: 3 }])("counts a fitted fractional media canvas with $excess pixels of excess", async ({ excess, pages }) => {
	const pageWidth = 393.0909118652344;
	const frame = document.createElement("iframe");
	frame.style.cssText = `width:${pageWidth}px;height:221px;border:0`;
	document.body.appendChild(frame);
	let contents;
	try {
		const doc = frame.contentDocument;
		doc.body.style.cssText = `margin:0;height:221px;width:${2 * pageWidth + excess}px;writing-mode:vertical-rl;direction:ltr`;
		doc.body.innerHTML = '<p>A</p><div style="width:100%;writing-mode:horizontal-tb"><img style="display:block;margin:auto"/></div>';
		const image = doc.querySelector("img");
		image.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="260" height="80"/>');
		await image.decode();
		contents = new Contents(doc, doc.body);
		layoutVerticalRlBlockMedia(contents, pageWidth);
		const metrics = contents.verticalRlPageMetrics(pageWidth, 221);
		expect(metrics.rawWidth).toBeGreaterThan(2 * pageWidth);
		expect(metrics.totalPages).toBe(pages);
	} finally {
		contents?.destroy();
		frame.remove();
	}
});

afterEach(() => {
	for (const { book, host } of fixtures.splice(0)) {
		book.destroy();
		host.remove();
	}
});

it("admits a whole-image window without dropping current text or clipping a new text boundary", () => {
	const image = [{ left: 0, right: 384, width: 384 }];
	expect(resolveVerticalRlBlockMediaOffset(758, 768, 1152, 384, image, [{ left: 600, right: 624 }])).toBe(768);
	expect(resolveVerticalRlBlockMediaOffset(758, 768, 1152, 384, image, [{ left: 20, right: 44 }])).toBe(758);
	expect(resolveVerticalRlBlockMediaOffset(758, 768, 1152, 384, image, [{ left: -10, right: 5 }])).toBe(758);
	expect(resolveVerticalRlBlockMediaOffset(758, 768, 1152, 384, [{ left: 0, right: 500, width: 500 }], [])).toBe(758);
	expect(resolveVerticalRlBlockMediaOffset(1268, 1296, 2572, 1296, [{ left: 48, right: 1304, width: 1256 }], [], 10)).toBe(1258);
});

it("keeps fitted media inside an asymmetric structural gutter", () => {
	expect(resolveVerticalRlBlockMediaOffset(909.984375, 923, 1243, 320,
		[{ left: 19, right: 314.46875, width: 295.46875 }], [], 6, 13)).toBe(917);
});

it("keeps a percentage-width image-only wrapper stable when the iframe expands to multiple pages", async () => {
	const frame = document.createElement("iframe");
	frame.style.cssText = "width:260px;height:260px;border:0";
	document.body.appendChild(frame);
	try {
		const doc = frame.contentDocument;
		doc.documentElement.style.cssText = "writing-mode:vertical-rl;direction:ltr";
		doc.body.style.cssText = "margin:0;height:260px;writing-mode:vertical-rl;direction:ltr";
		doc.body.innerHTML = '<div style="block-size:248px">A</div><div style="width:100%;writing-mode:horizontal-tb"><img style="display:block;max-height:80px;margin-left:auto;margin-right:auto"/></div>';
		const image = doc.querySelector("img");
		image.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="blue"/></svg>');
		await image.decode();
		const identity = image;
		layoutVerticalRlBlockMedia({ document: doc, window: frame.contentWindow, content: doc.body }, 260);
		frame.style.width = "520px";
		const rect = image.getBoundingClientRect();
		expect(rect.left).toBeGreaterThanOrEqual(0);
		expect(Math.floor(rect.left / 260)).toBe(Math.floor((rect.right - 0.001) / 260));
		expect(doc.querySelector("img")).toBe(identity);
	} finally {
		frame.remove();
	}
});

it("aligns the image-only wrapper rather than displacing its centered image across a guarded page", async () => {
	const frame = document.createElement("iframe");
	frame.style.cssText = "width:870px;height:309px;border:0";
	document.body.appendChild(frame);
	try {
		const doc = frame.contentDocument;
		doc.body.style.cssText = "margin:0;height:309px;writing-mode:vertical-rl;direction:ltr";
		doc.body.innerHTML = '<div style="block-size:431.2px;margin-left:18px">A</div><div style="width:100%;writing-mode:horizontal-tb"><img style="display:block;max-height:293.55px;margin-left:auto;margin-right:auto"/></div>';
		const image = doc.querySelector("img");
		image.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="450"/>');
		await image.decode();
		layoutVerticalRlBlockMedia({ document: doc, window: frame.contentWindow, content: doc.body }, 870, 11);
		frame.style.width = "1740px";
		const rect = image.getBoundingClientRect();
		expect(rect.left).toBeGreaterThanOrEqual(11);
		expect(rect.right).toBeLessThanOrEqual(859);
	} finally {
		frame.remove();
	}
});

it("invalidates pre-fit metrics when media ownership changes without a rounded size change", async () => {
	const frame = document.createElement("iframe");
	frame.style.cssText = "width:260px;height:260px;border:0";
	document.body.appendChild(frame);
	let contents;
	try {
		const doc = frame.contentDocument;
		doc.body.style.cssText = "margin:0;height:260px;writing-mode:vertical-rl;direction:ltr";
		doc.body.innerHTML = '<div style="block-size:260px">A</div><div style="width:260px;writing-mode:horizontal-tb"><img style="display:block"/></div>';
		const image = doc.querySelector("img");
		image.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="260" height="80"/>');
		await image.decode();
		contents = new Contents(doc, doc.body);
		const before = contents.verticalRlPageMetrics(260, 260);
		const width = doc.body.clientWidth;
		layoutVerticalRlBlockMedia(contents, 260);
		expect(doc.body.clientWidth).toBe(width);
		expect(before.totalPages).toBe(3);
		expect(contents.verticalRlPageMetrics(260, 260).totalPages).toBe(2);
	} finally {
		contents?.destroy();
		frame.remove();
	}
});

it("uses the remaining current page when only the leading media guard is missing", async () => {
	const frame = document.createElement("iframe");
	frame.style.cssText = "width:320px;height:470px;border:0";
	document.body.appendChild(frame);
	try {
		const doc = frame.contentDocument;
		doc.body.style.cssText = "margin:0;height:470px;writing-mode:vertical-rl;direction:ltr";
		doc.body.innerHTML = '<div style="block-size:560.640625px;margin-left:24px">A</div><div style="width:100%;writing-mode:horizontal-tb"><img style="display:block;max-height:446.5px;margin-left:auto;margin-right:auto"/></div>';
		const image = doc.querySelector("img");
		image.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="700" height="450"/>');
		await image.decode();
		layoutVerticalRlBlockMedia({ document: doc, window: frame.contentWindow, content: doc.body }, 288, 16);
		frame.style.width = "896px";
		const rect = image.getBoundingClientRect();
		expect(rect.left).toBeGreaterThanOrEqual(0);
		expect(rect.right).toBeLessThanOrEqual(320);
	} finally {
		frame.remove();
	}
});

it("keeps a physical pixel of room when fractional pages meet integer scroll positions", async () => {
	const frame = document.createElement("iframe");
	frame.style.cssText = "width:369.59375px;height:746px;border:0";
	document.body.appendChild(frame);
	try {
		const doc = frame.contentDocument;
		doc.body.style.cssText = "margin:0;height:746px;writing-mode:vertical-rl;direction:ltr";
		doc.body.innerHTML = '<div style="block-size:641px;margin-left:28px">A</div><div style="width:100%;writing-mode:horizontal-tb"><img style="display:block;max-height:746px;margin-left:auto;margin-right:auto"/></div>';
		const image = doc.querySelector("img");
		image.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="450"/>');
		await image.decode();
		layoutVerticalRlBlockMedia({ document: doc, window: frame.contentWindow, content: doc.body }, 369.59375);
		frame.style.width = "1109px";
		expect(image.getBoundingClientRect().left).toBeGreaterThanOrEqual(1);
	} finally {
		frame.remove();
	}
});

it.each([
	{ width: 260, height: 260, fontSize: 16, lineHeight: 31, mediaHeight: 80, structured: false },
	{ width: 862.390625, height: 309, fontSize: 28, lineHeight: 61.6, mediaHeight: 293.55, structured: false },
	{ width: 862.390625, height: 309, fontSize: 28, lineHeight: 61.6, mediaHeight: 293.55, structured: true },
	{ width: 862.390625, height: 309, fontSize: 28, lineHeight: 61.6, mediaHeight: 293.55, structured: true, spread: "always" }
])("shows a block image whole with stable page counts at $width pixels (structured=$structured, spread=$spread)", async ({ width, height, fontSize, lineHeight, mediaHeight, structured, spread = "none" }) => {
	const zip = new JSZip();
	zip.file("mimetype", "application/epub+zip");
	zip.file("META-INF/container.xml", '<?xml version="1.0"?><container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0"><rootfiles><rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>');
	zip.file("OPS/package.opf", '<?xml version="1.0"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="id"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="id">block-media-fixture</dc:identifier><dc:title>Block media</dc:title><dc:language>en</dc:language></metadata><manifest><item id="one" href="one.xhtml" media-type="application/xhtml+xml"/><item id="image" href="grid.svg" media-type="image/svg+xml"/><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/></manifest><spine page-progression-direction="rtl"><itemref idref="one"/></spine></package>');
	zip.file("OPS/grid.svg", '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="#e0f0ff"/><rect x="2" y="2" width="796" height="496" fill="none" stroke="black" stroke-width="4"/></svg>');
	const text = structured
		? '<h1 style="margin:0;block-size:148.9375px;font-size:39.2px;line-height:54.88px">甲乙丙丁戊己庚</h1><div><br/></div><div><br/></div>' + [7, 6].map((count) => '<p style="margin:28px"><span style="display:block">' + Array(count).fill('天地玄黃宇宙洪荒日月星').join('</span><span style="display:block">') + '</span></p>').join('')
		: Array.from({ length: 8 }, (_, i) => `<p><span id="unit-${i}">ABCDEFGHI</span></p>`).join("");
	zip.file("OPS/one.xhtml", '<?xml version="1.0"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Fixture</title><style>html,body{margin:0;padding:0;writing-mode:vertical-rl;direction:ltr;font:'+fontSize+'px/'+lineHeight+'px monospace;text-orientation:upright}p{margin:0;padding:0}img{width:auto;height:auto;margin-left:auto;margin-right:auto}</style></head><body>' + text + '<div style="width:100%;writing-mode:horizontal-tb"><img id="media" src="grid.svg"/></div></body></html>');
	zip.file("OPS/nav.xhtml", '<?xml version="1.0"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><title>Navigation</title></head><body><nav epub:type="toc"><ol><li><a href="one.xhtml">One</a></li></ol></nav></body></html>');
	const host = document.createElement("div");
	host.style.cssText = `width:${width}px;height:${height}px`;
	document.body.appendChild(host);
	const book = ePub(await zip.generateAsync({ type: "arraybuffer" }));
	fixtures.push({ book, host });
	await book.ready;
	const rendition = book.renderTo(host, { width, height, spread, minSpreadWidth: 0, flow: "paginated" });
	rendition.hooks.content.register((contents) => {
		contents.document.getElementById("media").style.setProperty("max-width", "100%", "important");
		contents.document.getElementById("media").style.setProperty("display", "block", "important");
		contents.document.getElementById("media").style.setProperty("max-height", `${mediaHeight}px`, "important");
	});
	await rendition.display(0);
	const manager = rendition.manager;
	await manager.waitForVerticalRlLayoutReady();
	let wholeImageVisible = false;
	const initialTotalPages = manager.getTotalPagesForCurrentView();
	expect(initialTotalPages).toBeLessThanOrEqual(4);
	const states = [];
	for (let turn = 0; turn < 10; turn += 1) {
		expect(manager.getTotalPagesForCurrentView()).toBe(initialTotalPages);
		const view = manager.views.first();
		const measured = view.contents.verticalRlPageMetrics(width, height);
		expect(measured.totalPages, JSON.stringify({measured,body:view.contents.content.getBoundingClientRect().toJSON(), clientWidth:view.contents.content.clientWidth, scrollWidth:view.contents.content.scrollWidth, frameWidth:view.iframe.clientWidth})).toBe(initialTotalPages);
		const image = view.contents.document.getElementById("media");
		await image.decode();
		const imageRect = image.getBoundingClientRect();
		const frame = view.iframe.getBoundingClientRect();
		const viewport = manager.container.getBoundingClientRect();
		const mask = manager.getVerticalRlRenderedEdgeMaskWidths();
		const left = frame.left + imageRect.left;
		const right = frame.left + imageRect.right;
		wholeImageVisible ||= imageRect.width > 0 && left >= viewport.left + mask.left - 1 && right <= viewport.right - mask.right + 1;
		states.push({ index: manager.getCurrentPageIndex(), total: manager.getTotalPagesForCurrentView(), offset: manager.getNormalizedLogicalScrollLeft(), left, right, imageWidth: imageRect.width, clipLeft: viewport.left + mask.left, clipRight: viewport.right - mask.right });
		if (manager.getCurrentPageIndex() === manager.getTotalPagesForCurrentView() - 1) {
			break;
		}
		await manager.next();
		await manager.waitForVerticalRlLayoutReady();
	}
	expect(wholeImageVisible, JSON.stringify(states)).toBe(true);
	const maxScroll = manager.getMaxLogicalScrollLeft();
	const whole = states.find((state) => state.left >= state.clipLeft - 1 && state.right <= state.clipRight + 1);
	const snapped = manager.snapVerticalRlLogicalOffsetToTextBoundary(whole.offset - 10, maxScroll);
	const delta = snapped - whole.offset;
	expect(whole.left + delta).toBeGreaterThanOrEqual(whole.clipLeft - 1);
	expect(whole.right + delta).toBeLessThanOrEqual(whole.clipRight + 1);
});

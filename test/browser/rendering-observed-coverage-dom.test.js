import { afterEach, describe, expect, it } from "vitest";
import { captureObservedCoverageDom } from "../../src/rendering/observed-coverage-dom";
import { assessObservedCoverage } from "../../src/rendering/observed-coverage";
import DefaultViewManager from "../../src/managers/default";
import { refreshCombinedTextPaint } from "../../src/rendering/combined-text-paint";

const hosts = [];
afterEach(() => {
	hosts.splice(0).forEach(host => host.remove());
	delete window.__EPUB_VRL_DEBUG__;
	delete window.__EPUB_VRL_OBSERVED_COVERAGE_ENABLED__;
});
const rect = element => {
	const r = element.getBoundingClientRect();
	return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
};
async function setup() {
	const host = document.createElement("div");
	host.style.cssText = "position:fixed;left:20px;top:20px;width:100px;height:60px;overflow:hidden";
	const frame = document.createElement("iframe");
	frame.style.cssText = "display:block;border:0;width:200px;height:60px";
	frame.srcdoc = "<style>html,body{margin:0;padding:0;width:200px;height:60px}span{position:absolute;top:10px;font:20px monospace}#a{left:10px}#b{left:110px}</style><span id=\"a\">A</span><span id=\"b\">B</span>";
	const loaded = new Promise(resolve => frame.onload = resolve);
	host.appendChild(frame); document.body.appendChild(host); hosts.push(host);
	await loaded; await frame.contentDocument.fonts.ready;
	const options = {
		enabled: true, frame, document: frame.contentDocument, sourceFingerprint: "authorized-fixture",
		sectionHref: "fixture.xhtml", layoutGeneration: "layout-1", sequence: 0, pageIndex: 0,
		settled: true, terminalObserved: false, rawScreenViewport: rect(host), effectiveScreenViewport: rect(host)
	};
	return { host, frame, options };
}
function ledger(first, second) {
	return {
		version: 2, ...first.observation, sources: first.sources,
		inventoryComplete: first.inventoryComplete && second.inventoryComplete,
		truncated: first.truncated || second.truncated, terminalObserved: second.terminalObserved,
		observations: [first.observation, second.observation]
	};
}

describe("live DOM observed coverage collector", () => {
	it("does no traversal or frame access while disabled", async () => {
		expect(await captureObservedCoverageDom({ enabled: false })).toBeNull();
	});
	it("maps actual iframe displacement to one stable source inventory", async () => {
		const { host, frame, options } = await setup();
		const first = await captureObservedCoverageDom(options);
		frame.style.marginLeft = "-100px";
		const second = await captureObservedCoverageDom({ ...options, sequence: 1, pageIndex: 1, terminalObserved: true, rawScreenViewport: rect(host), effectiveScreenViewport: rect(host) });
		expect(first.inventoryComplete).toBe(true);
		expect(first.sources).toHaveLength(2);
		expect(second.observation.inventoryIdentity).toBe(first.observation.inventoryIdentity);
		expect(second.observation.rawViewport.left - first.observation.rawViewport.left).toBe(100);
		expect(assessObservedCoverage(ledger(first, second)).status).toBe("pass");
		expect(frame.style.marginLeft).toBe("-100px");
	});
	it("keeps masked source uncovered even when raw viewport includes it", async () => {
		const { host, frame, options } = await setup();
		const masked = { ...rect(host), left: rect(host).left + 40 };
		const first = await captureObservedCoverageDom({ ...options, effectiveScreenViewport: masked });
		frame.style.marginLeft = "-100px";
		const second = await captureObservedCoverageDom({ ...options, sequence: 1, pageIndex: 1, terminalObserved: true });
		expect(assessObservedCoverage(ledger(first, second)).status).toBe("fail");
	});
	it("handles positive scale and frame border in the coordinate transform", async () => {
		const { host, frame, options } = await setup();
		host.style.transformOrigin = "0 0"; host.style.transform = "scale(1.5)";
		frame.style.border = "2px solid transparent";
		const r = frame.getBoundingClientRect();
		const screen = { left: r.left + 3, right: r.left + 153, top: r.top + 3, bottom: r.top + 93 };
		const capture = await captureObservedCoverageDom({ ...options, rawScreenViewport: screen, effectiveScreenViewport: screen });
		expect(capture.issues).toEqual([]);
		expect(capture.observation.rawViewport).toEqual({ left: 0, right: 100, top: 0, bottom: 60 });
	});
	it("rejects rotated frames rather than inventing a bounding-box transform", async () => {
		const { host, options } = await setup(); host.style.transform = "rotate(5deg)";
		expect((await captureObservedCoverageDom(options)).issues).toContain("unsupported-frame-transform");
	});
	it("invalidates geometry drift even when caller reused its generation", async () => {
		const { frame, options } = await setup(); const first = await captureObservedCoverageDom(options);
		frame.contentDocument.querySelector("#b").style.left = "120px";
		const second = await captureObservedCoverageDom({ ...options, sequence: 1, pageIndex: 1, terminalObserved: true });
		expect(second.observation.inventoryIdentity).not.toBe(first.observation.inventoryIdentity);
		expect(assessObservedCoverage(ledger(first, second)).status).toBe("incomplete");
	});
	it("invalidates equal-size source edits without emitting source text", async () => {
		const { frame, options } = await setup(); const first = await captureObservedCoverageDom(options);
		frame.contentDocument.querySelector("#a").textContent = "Z";
		const second = await captureObservedCoverageDom({ ...options, sequence: 1, pageIndex: 1, terminalObserved: true });
		expect(second.observation.inventoryIdentity).not.toBe(first.observation.inventoryIdentity);
		expect(JSON.stringify(second)).not.toContain(JSON.stringify("Z"));
	});
	it("does not silently drop a source when the inventory limit is reached", async () => {
		const { options } = await setup(); const capture = await captureObservedCoverageDom({ ...options, maxSources: 1 });
		expect(capture.sources).toHaveLength(1); expect(capture.truncated).toBe(true);
		expect(capture.inventoryComplete).toBe(false);
	});
	it("refuses a stale document after iframe navigation", async () => {
		const { frame, options } = await setup();
		const loaded = new Promise(resolve => frame.onload = resolve); frame.srcdoc = "<p>new</p>"; await loaded;
		const capture = await captureObservedCoverageDom(options);
		expect(capture.inventoryComplete).toBe(false);
		expect(capture.observation.ownerDocumentMatches).toBe(false);
	});
	it("refuses detached frame evidence", async () => {
		const { frame, options } = await setup(); frame.remove();
		expect((await captureObservedCoverageDom(options)).inventoryComplete).toBe(false);
	});
	it("rejects a source mutation while asynchronous digest is pending", async () => {
		const { frame, options } = await setup();
		const pending = captureObservedCoverageDom(options);
		frame.contentDocument.querySelector("#a").textContent = "C";
		expect((await pending).issues).toContain("source-changed-during-capture");
	});
	it("rejects a viewport movement while asynchronous digest is pending", async () => {
		const { frame, options } = await setup();
		const pending = captureObservedCoverageDom(options);
		frame.style.marginLeft = "-100px";
		expect((await pending).issues).toContain("viewport-changed-during-capture");
	});
	it("Manager performs no view access unless both explicit debug flags are enabled", async () => {
		const manager = Object.create(DefaultViewManager.prototype);
		Object.defineProperty(manager, "views", { get() { throw new Error("must not observe"); } });
		expect(await manager.captureVerticalRlObservedCoverage({})).toBeNull();
		window.__EPUB_VRL_DEBUG__ = true;
		expect(await manager.captureVerticalRlObservedCoverage({})).toBeNull();
		delete window.__EPUB_VRL_DEBUG__; window.__EPUB_VRL_OBSERVED_COVERAGE_ENABLED__ = true;
		expect(await manager.captureVerticalRlObservedCoverage({})).toBeNull();
	});
	it("Manager samples its current Contents without materializing page metrics", async () => {
		const { frame, options } = await setup();
		const manager = Object.create(DefaultViewManager.prototype);
		const view = { iframe: frame, contents: { document: frame.contentDocument }, section: { href: "actual.xhtml" } };
		manager.views = { first: () => view };
		manager.getTotalPagesForCurrentView = () => { throw new Error("pagination getter called"); };
		manager.getCurrentPageIndex = () => { throw new Error("pagination getter called"); };
		window.__EPUB_VRL_DEBUG__ = true; window.__EPUB_VRL_OBSERVED_COVERAGE_ENABLED__ = true;
		const capture = await manager.captureVerticalRlObservedCoverage(options);
		expect(capture.observation.sectionHref).toBe("actual.xhtml");
		expect(capture.inventoryComplete).toBe(true);
		expect(manager._verticalRlActiveTerminalLayout).toBeUndefined();
	});
	it("Manager cancels a pending lazy sample if debug is disabled", async () => {
		const { frame, options } = await setup();
		const manager = Object.create(DefaultViewManager.prototype);
		const view = { iframe: frame, contents: { document: frame.contentDocument }, section: { href: "actual.xhtml" } };
		manager.views = { first: () => view };
		window.__EPUB_VRL_DEBUG__ = true; window.__EPUB_VRL_OBSERVED_COVERAGE_ENABLED__ = true;
		const pending = manager.captureVerticalRlObservedCoverage(options);
		window.__EPUB_VRL_OBSERVED_COVERAGE_ENABLED__ = false;
		expect(await pending).toBeNull();
	});
	it("separates Engine-owned paint hints from source identity without changing live DOM", async () => {
		const { frame, options } = await setup(), doc = frame.contentDocument;
		doc.body.style.writingMode = "vertical-rl";
		const span = doc.querySelector("#a"); span.style.textCombineUpright = "all";
		const first = await captureObservedCoverageDom(options);
		expect(refreshCombinedTextPaint(doc, { left: 0, right: 200, top: 0, bottom: 60 })).toBe(1);
		const liveMarkup = doc.body.innerHTML;
		const next = await captureObservedCoverageDom(options);
		expect(next.paintHintNormalizationCount).toBe(1);
		expect(next.observation.inventoryIdentity).toBe(first.observation.inventoryIdentity);
		expect(next.rawMarkupIdentity).not.toBe(first.rawMarkupIdentity);
		expect(doc.body.innerHTML).toBe(liveMarkup);
		span.style.setProperty("will-change", "opacity", "important");
		const foreign = await captureObservedCoverageDom(options);
		expect(foreign.paintHintNormalizationCount).toBe(0);
		expect(foreign.observation.inventoryIdentity).not.toBe(first.observation.inventoryIdentity);
	});
	it("does not erase an author-provided will-change from source identity", async () => {
		const { frame, options } = await setup();
		const first = await captureObservedCoverageDom(options);
		frame.contentDocument.querySelector("#a").style.willChange = "contents";
		const next = await captureObservedCoverageDom(options);
		expect(next.paintHintNormalizationCount).toBe(0);
		expect(next.observation.inventoryIdentity).not.toBe(first.observation.inventoryIdentity);
	});
});

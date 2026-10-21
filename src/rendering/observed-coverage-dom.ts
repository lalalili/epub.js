import type { CoverageObservation, CoverageRect, CoverageSource } from "./observed-coverage";
import { readCombinedTextPaintSource } from "./combined-text-paint";

export type CoverageDomInput = {
	enabled: boolean;
	frame: HTMLIFrameElement;
	document: Document;
	sourceFingerprint: string;
	sectionHref: string;
	layoutGeneration: string;
	sequence: number;
	pageIndex: number;
	settled: boolean;
	terminalObserved: boolean;
	rawScreenViewport: CoverageRect;
	effectiveScreenViewport: CoverageRect;
	maxSources?: number;
};
export type CoverageDomCapture = {
	version: 2;
	sources: CoverageSource[];
	inventoryComplete: boolean;
	truncated: boolean;
	terminalObserved: boolean;
	issues: string[];
	paintHintNormalizationCount: number;
	rawMarkupIdentity: string;
	observation: CoverageObservation;
};

const documentIds = new WeakMap<Document, string>();
let nextDocumentId = 0;
const positiveRect = (r: CoverageRect): boolean =>
	[r.left, r.right, r.top, r.bottom].every(Number.isFinite) && r.right > r.left && r.bottom > r.top;

/**
 * Read only the supplied live frame. Source rects and the actual screen clip are
 * mapped to the same iframe-document coordinate system, independent of Manager
 * offsets. The caller owns settled/terminal/source authority and must sample after
 * rendering. Returns no evidence and performs no traversal while disabled.
 */
export async function captureObservedCoverageDom(input: CoverageDomInput): Promise<CoverageDomCapture | null> {
	if (!input.enabled) {
		return null;
	}
	const doc = input.document, frame = input.frame, win = doc.defaultView;
	const issues: string[] = [];
	const addIssue = (issue: string): void => {
		if (!issues.includes(issue)) {
			issues.push(issue);
		}
	};
	if (!documentIds.has(doc)) {
		documentIds.set(doc, `coverage-document-${++nextDocumentId}`);
	}
	const documentIdentity = documentIds.get(doc)!;
	const connected = frame.isConnected && Boolean(doc.body?.isConnected);
	const ownerDocumentMatches = frame.contentDocument === doc && win?.frameElement === frame;
	const sources: CoverageSource[] = [];
	let truncated = false;
	const limit = Number.isInteger(input.maxSources) && input.maxSources! > 0 ? input.maxSources! : 50000;
	const frameRect = frame.getBoundingClientRect();
	const scaleX = frameRect.width / frame.offsetWidth, scaleY = frameRect.height / frame.offsetHeight;
	const originX = frameRect.left + frame.clientLeft * scaleX;
	const originY = frameRect.top + frame.clientTop * scaleY;
	const scrollX = win?.scrollX || 0, scrollY = win?.scrollY || 0;
	const mapClip = (rect: CoverageRect): CoverageRect => ({
		left: (rect.left - originX) / scaleX + scrollX,
		right: (rect.right - originX) / scaleX + scrollX,
		top: (rect.top - originY) / scaleY + scrollY,
		bottom: (rect.bottom - originY) / scaleY + scrollY
	});
	if (!connected || !ownerDocumentMatches || !win || !doc.body) {
		addIssue("disconnected-or-foreign-document");
	}
	if (!(scaleX > 0) || !(scaleY > 0)) {
		addIssue("invalid-frame-scale");
	}
	// Bounding rectangles cannot invert rotations, skew or perspective. Fail closed.
	for (let node: Element | null = frame; node; node = node.parentElement) {
		const style = node.ownerDocument.defaultView?.getComputedStyle(node);
		if (style?.transform && style.transform !== "none") {
			const matrix = new DOMMatrixReadOnly(style.transform);
			if (!matrix.is2D || matrix.b !== 0 || matrix.c !== 0 || matrix.a <= 0 || matrix.d <= 0) {
				addIssue("unsupported-frame-transform");
			}
		}
	}
	const append = (identity: string, rect: DOMRect): void => {
		const mapped = { left: rect.left + scrollX, right: rect.right + scrollX, top: rect.top + scrollY, bottom: rect.bottom + scrollY };
		if (!positiveRect(mapped)) {
			return;
		}
		if (sources.length >= limit) {
			truncated = true;
			return;
		}
		sources.push({ identity, rect: mapped });
	};
	const path = (node: Node): string => {
		const indexes: number[] = [];
		for (let current: Node | null = node; current && current !== doc.body; current = current.parentNode) {
			const parent: ParentNode | null = current.parentNode;
			if (!parent) {
				addIssue("detached-source");
				break;
			}
			indexes.unshift(Array.prototype.indexOf.call(parent.childNodes, current));
		}
		return indexes.join(".");
	};
	if (win && doc.body && connected && ownerDocumentMatches) {
		if (doc.fonts?.status !== "loaded") {
			addIssue("fonts-not-loaded");
		}
		const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
		for (let node = walker.nextNode(); node && !truncated; node = walker.nextNode()) {
			const parent = node.parentElement;
			if (!parent || parent.closest("script,style,noscript,svg")) {
				continue;
			}
			const style = win.getComputedStyle(parent);
			if (style.display === "none" || style.visibility !== "visible") {
				continue;
			}
			const text = node.textContent || "", identity = path(node);
			const range = doc.createRange();
			for (let offset = 0; offset < text.length && !truncated;) {
				const character = String.fromCodePoint(text.codePointAt(offset)!);
				const end = offset + character.length;
				if (character.trim()) {
					range.setStart(node, offset);
					range.setEnd(node, end);
					Array.from(range.getClientRects()).forEach((rect, index) => append(`text:${identity}:${offset}:${index}`, rect));
				}
				offset = end;
			}
		}
		for (const element of doc.body.querySelectorAll("img,svg,video,canvas,object,iframe")) {
			if (truncated) {
				break;
			}
			const style = win.getComputedStyle(element);
			if (style.display === "none" || style.visibility !== "visible") {
				continue;
			}
			if (element instanceof win.HTMLImageElement && (!element.complete || !element.naturalWidth)) {
				addIssue("image-not-loaded");
			}
			if (["OBJECT", "IFRAME"].includes(element.tagName.toUpperCase())) {
				addIssue("nested-document-not-inventoried");
			}
			Array.from(element.getClientRects()).forEach((rect, index) => append(`media:${path(element)}:${index}`, rect));
		}
	}
	const rawViewport = mapClip(input.rawScreenViewport), effectiveViewport = mapClip(input.effectiveScreenViewport);
	if (!positiveRect(rawViewport) || !positiveRect(effectiveViewport)) {
		addIssue("invalid-viewport");
	}
	if (truncated) {
		addIssue("source-limit-reached");
	}
	// No source text is emitted. Include the text digest so equal-sized edits cannot
	// silently reuse an inventory identity. Geometry remains exact, without rounding.
	const sourceMarkup = doc.body?.innerHTML;
	const semanticSource = readCombinedTextPaintSource(doc);
	const bytes = new TextEncoder().encode(JSON.stringify([semanticSource.markup, sources]));
	let changed = false;
	const mutations = new MutationObserver(() => { changed = true; });
	if (doc.documentElement) {
		mutations.observe(doc.documentElement, { subtree: true, childList: true, characterData: true, attributes: true });
	}
	let digest: ArrayBuffer, rawDigest: ArrayBuffer;
	try {
		[digest, rawDigest] = await Promise.all([
			globalThis.crypto.subtle.digest("SHA-256", bytes),
			globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(sourceMarkup || ""))
		]);
		if (changed || mutations.takeRecords().length || doc.body?.innerHTML !== sourceMarkup) {
			addIssue("source-changed-during-capture");
		}
		const after = frame.getBoundingClientRect();
		if (after.left !== frameRect.left || after.top !== frameRect.top || after.width !== frameRect.width ||
			after.height !== frameRect.height || win?.scrollX !== scrollX || win?.scrollY !== scrollY) {
			addIssue("viewport-changed-during-capture");
		}
		if (doc.fonts?.status !== "loaded") {
			addIssue("fonts-not-loaded");
		}
	} finally {
		mutations.disconnect();
	}
	const inventoryIdentity = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
	const rawMarkupIdentity = Array.from(new Uint8Array(rawDigest), byte => byte.toString(16).padStart(2, "0")).join("");
	if (!frame.isConnected || frame.contentDocument !== doc || doc.defaultView !== win) {
		addIssue("document-changed-during-capture");
	}
	return {
		version: 2, sources, inventoryComplete: issues.length === 0, truncated,
		terminalObserved: input.terminalObserved, issues,
		paintHintNormalizationCount: semanticSource.normalizedHints, rawMarkupIdentity,
		observation: {
			sequence: input.sequence, pageIndex: input.pageIndex,
			sourceFingerprint: input.sourceFingerprint, sectionHref: input.sectionHref,
			layoutGeneration: input.layoutGeneration, documentIdentity, inventoryIdentity,
			connected, ownerDocumentMatches, settled: input.settled,
			complete: issues.length === 0, rawViewport, effectiveViewport
		}
	};
}

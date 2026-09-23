import { afterEach, expect, it } from "vitest";
import JSZip from "jszip";
import ePub from "../../src/epub";
import {
	getVerticalRlEffectiveClip,
	resolveVerticalRlTerminalTail,
	VERTICAL_RL_TERMINAL_REPLACED_TAGS
} from "../../src/rendering/terminal-tail";
import {
	resolveVerticalRlTerminalContinuation,
	promoteVerticalRlTerminalContinuation
} from "../../src/rendering/terminal-continuation";

const fixtures = [];

afterEach(() => {
	for (const { book, host } of fixtures.splice(0)) {
		book.destroy();
		host.remove();
	}
});

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

function finiteRect(rect) {
	return rect && [rect.left, rect.right, rect.top, rect.bottom, rect.width, rect.height]
		.every((value) => Number.isFinite(value));
}

function transformedRect(frameRect, rect) {
	return {
		left: frameRect.left + rect.left,
		right: frameRect.left + rect.right,
		top: frameRect.top + rect.top,
		bottom: frameRect.top + rect.bottom,
		width: rect.width,
		height: rect.height,
	};
}

function intersection(rect, clip) {
	const width = Math.min(rect.right, clip.right) - Math.max(rect.left, clip.left);
	const height = Math.min(rect.bottom, clip.bottom) - Math.max(rect.top, clip.top);

	return {
		width,
		height,
		positiveArea: width > 0 && height > 0,
	};
}

function compactRect(rect) {
	if (!rect) {
		return null;
	}

	return {
		left: rect.left,
		right: rect.right,
		top: rect.top,
		bottom: rect.bottom,
		width: rect.width,
		height: rect.height,
	};
}

async function pureSettle(manager, semanticIds, tailId) {
	let previous = null;
	let stableSnapshots = 0;

	for (let attempt = 0; attempt < 40; attempt += 1) {
		const view = manager.views.first();
		const contentsDocument = view?.contents?.document;
		if (!view?.iframe || !contentsDocument) {
			stableSnapshots = 0;
			await nextFrame();
			continue;
		}
		if (contentsDocument?.fonts?.ready) {
			await contentsDocument.fonts.ready;
		}
		await nextFrame();

		const state = pureState(manager, semanticIds, tailId);
		const current = JSON.stringify({
			href: state.href,
			frameRect: state.frameRect,
			effectiveClip: state.effectiveClip,
			visibleSemanticIds: state.visibleSemanticIds,
			tailState: state.tailState.state,
		});
		if (current === previous) {
			stableSnapshots += 1;
			if (stableSnapshots >= 2) {
				return state;
			}
		} else {
			stableSnapshots = 0;
			previous = current;
		}
	}

	throw new Error("pure-settle-timeout");
}

function pureState(manager, semanticIds, tailId) {
	const view = manager.views.first();
	const frameRect = view.iframe.getBoundingClientRect();
	const effectiveClip = getVerticalRlEffectiveClip(manager.container);
	const contentsDocument = view.contents.document;
	const visibleSemanticIds = semanticIds.filter((id) => {
		const element = contentsDocument.querySelector(`[data-semantic-id="${id}"]`);
		if (!element || !element.isConnected || element.ownerDocument !== contentsDocument) {
			return false;
		}

		const style = contentsDocument.defaultView.getComputedStyle(element);
		const localRect = element.getBoundingClientRect();
		if (style.display === "none" || style.visibility === "hidden" || localRect.width <= 0 || localRect.height <= 0) {
			return false;
		}

		return intersection(transformedRect(frameRect, localRect), effectiveClip).positiveArea;
	});
	const tailElement = contentsDocument.querySelector(`[data-semantic-id="${tailId}"]`);
	const tailRect = tailElement ? transformedRect(frameRect, tailElement.getBoundingClientRect()) : null;

	return {
		href: view.section.href,
		frameRect: compactRect(frameRect),
		effectiveClip: compactRect(effectiveClip),
		bodyScrollWidth: contentsDocument.body.scrollWidth,
		bodyClientWidth: contentsDocument.body.clientWidth,
		documentScrollWidth: contentsDocument.documentElement.scrollWidth,
		documentClientWidth: contentsDocument.documentElement.clientWidth,
		visibleSemanticIds,
		visibleSemanticCount: visibleSemanticIds.length,
		tailRect,
		tailState: resolveVerticalRlTerminalTail({ document: contentsDocument, frameRect, effectiveClip }),
	};
}

function installPromotionProbe(manager, targetIndex) {
	const probe = {
		targetIndex,
		basePageCounts: [],
		maxLogicalScrolls: [],
		snapTolerances: [],
		pageOffsets: [],
		logicalPageOffsets: [],
		snapCalls: [],
	};
	const originals = new Map();
	const methods = [
		"getBaseGeometryPageCount",
		"getMaxLogicalScrollLeft",
		"getPageSnapTolerance",
		"getVerticalRlPageOffset",
		"getLogicalOffsetForPageIndex",
		"snapVerticalRlLogicalOffsetToTextBoundary",
	];

	for (const name of methods) {
		const original = manager[name];
		if (typeof original !== "function") {
			continue;
		}
		originals.set(name, original);
		manager[name] = function (...args) {
			const value = original.apply(this, args);
			if (name === "getBaseGeometryPageCount") {
				probe.basePageCounts.push(value);
			} else if (name === "getMaxLogicalScrollLeft") {
				probe.maxLogicalScrolls.push(value);
			} else if (name === "getPageSnapTolerance") {
				probe.snapTolerances.push(value);
			} else if (name === "getVerticalRlPageOffset") {
				probe.pageOffsets.push({ args, value });
			} else if (name === "getLogicalOffsetForPageIndex") {
				probe.logicalPageOffsets.push({ args, value });
			} else if (name === "snapVerticalRlLogicalOffsetToTextBoundary") {
				probe.snapCalls.push({ args, value });
			}
			return value;
		};
	}

	return {
		probe,
		restore() {
			for (const [name, original] of originals) {
				manager[name] = original;
			}
		},
	};
}

function promotionPoint(before, after, probe, trace) {
	const afterFirstSync = trace.find((entry) => entry.stage === "after-first-sync");
	const afterSecondSync = trace.find((entry) => entry.stage === "after-second-sync" && entry.targetIndex === probe.targetIndex);
	const logicalOffset = afterSecondSync?.logicalOffset ?? probe.pageOffsets
		.filter(({ args }) => args[0] === probe.targetIndex)
		.at(-1)?.value ?? null;
	const maxLogicalScroll = afterFirstSync?.maxScroll ?? probe.maxLogicalScrolls.at(-1) ?? null;

	return {
		basePageCountBefore: before.basePageCount,
		continuationCountBefore: before.continuationCount,
		targetIndex: probe.targetIndex,
		logicalOffset,
		maxLogicalScroll,
		remainingLogicalScroll: logicalOffset === null || maxLogicalScroll === null
			? null
			: maxLogicalScroll - logicalOffset,
		pageAdvance: before.pageAdvance,
		snapTolerance: before.snapTolerance,
		logicalViewport: logicalOffset === null ? null : {
			start: logicalOffset,
			end: logicalOffset + before.pageAdvance,
		},
		renderedTextTailBoundsBefore: before.tailState.candidate?.kind === "text"
			? before.tailState.candidate
			: null,
		replacedTailBoundsBefore: before.tailState.candidate?.kind === "replaced"
			? before.tailState.candidate
			: null,
		renderedTextTailBoundsAfter: after.tailState.candidate?.kind === "text"
			? after.tailState.candidate
			: null,
		replacedTailBoundsAfter: after.tailState.candidate?.kind === "replaced"
			? after.tailState.candidate
			: null,
		visibleReplacedElementsBefore: before.tailState.candidate?.kind === "replaced" && before.tailState.state === "reached"
			? [before.tailState.candidate]
			: [],
		visibleReplacedElementsAfter: after.tailState.candidate?.kind === "replaced" && after.tailState.state === "reached"
			? [after.tailState.candidate]
			: [],
		actualContentTailCoordinate: before.tailState.candidate?.rect ?? null,
		unreachedContentDistanceBefore: before.tailState.candidate?.rect
			? Math.max(0, before.effectiveClip.left - before.tailState.candidate.rect.right)
			: null,
		trace,
	};
}

function diagnosticState(manager, semanticIds, tailId) {
	const pure = pureState(manager, semanticIds, tailId);
	return {
		...pure,
		index: manager.getCurrentPageIndex(),
		total: manager.getTotalPagesForCurrentView(),
		basePageCount: manager.getBaseGeometryPageCount(),
		continuationCount: manager.getVerticalRlTerminalLayout()?.continuationCount ?? 0,
		logicalOffset: manager.getNormalizedLogicalScrollLeft(),
		maxLogicalScroll: manager.getMaxLogicalScrollLeft(),
		pageAdvance: manager.getPageAdvance(),
		snapTolerance: manager.getPageSnapTolerance(),
	};
}

async function createFixture({ name, kind, columns, geometryTailWidth, tailShift }) {
	const zip = new JSZip();
	zip.file("mimetype", "application/epub+zip");
	zip.file("META-INF/container.xml", '<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>');
	zip.file("OPS/package.opf", '<?xml version="1.0"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="id"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="terminal-authority-fixture">terminal-authority-fixture</dc:identifier><dc:title>Terminal authority</dc:title><dc:language>en</dc:language></metadata><manifest><item id="one" href="one.xhtml" media-type="application/xhtml+xml"/><item id="two" href="two.xhtml" media-type="application/xhtml+xml"/></manifest><spine page-progression-direction="rtl"><itemref idref="one"/><itemref idref="two"/></spine></package>');
	const style = `html,body{margin:0;padding:0;writing-mode:vertical-rl;direction:ltr;font:16px/31px monospace;text-orientation:upright}p{margin:0;padding:0}span{white-space:nowrap}.geometry-tail{display:block;width:${geometryTailWidth}px;height:1px;visibility:hidden}.semantic-tail{position:relative;left:${tailShift}px}.replaced-tail{display:inline-block;position:relative;left:${tailShift}px;width:23px;height:16px;vertical-align:top}`;
	const textMarkup = Array.from({ length: columns }, (_, index) => `<p><span data-semantic-id="unit-${index}">${index === columns - 1 ? "A" : "ABCDEFGHI"}</span></p>`).join("");
	const replacedMarkup = kind === "replaced"
		? `<p><svg data-semantic-id="tail-owner" class="replaced-tail" width="23" height="144" viewBox="0 0 23 144" role="img" aria-label="terminal owner"><rect width="23" height="144" fill="black"/></svg></p>`
		: "";
	const semanticBody = kind === "text"
		? Array.from({ length: columns }, (_, index) => `<p><span data-semantic-id="unit-${index}"${index === columns - 1 ? ` class="semantic-tail"` : ""}>${index === columns - 1 ? "A" : "ABCDEFGHI"}</span></p>`).join("")
		: `${textMarkup}${replacedMarkup}`;
	const geometryTail = geometryTailWidth > 0 ? '<div class="geometry-tail" aria-hidden="true"></div>' : "";
	const documentMarkup = (body) => `<?xml version="1.0"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${name}</title><style>${style}</style></head><body>${body}</body></html>`;
	zip.file("OPS/one.xhtml", documentMarkup(`${semanticBody}${geometryTail}`));
	zip.file("OPS/two.xhtml", documentMarkup("<p><span data-semantic-id=\"next\">N</span></p>"));

	const host = window.document.createElement("div");
	host.style.cssText = "width:260px;height:260px";
	window.document.body.appendChild(host);
	const book = ePub(await zip.generateAsync({ type: "arraybuffer" }));
	fixtures.push({ book, host });
	await book.ready;
	book.package.metadata.direction = "rtl";
	const rendition = book.renderTo(host, {
		width: 260,
		height: 260,
		spread: "none",
		flow: "paginated",
	});
	await rendition.display(0);
	const semanticIds = kind === "text"
		? Array.from({ length: columns }, (_, index) => `unit-${index}`)
		: [...Array.from({ length: columns }, (_, index) => `unit-${index}`), "tail-owner"];
	const tailId = kind === "text" ? `unit-${columns - 1}` : "tail-owner";
	const initial = await pureSettle(rendition.manager, semanticIds, tailId);

	return {
		book,
		host,
		rendition,
		manager: rendition.manager,
		semanticIds,
		tailId,
		initial,
	};
}

async function runCase(options) {
	const fixture = await createFixture(options);
	const { manager, semanticIds, tailId } = fixture;
	const initial = diagnosticState(manager, semanticIds, tailId);
	const basePageCount = initial.basePageCount;
	const prePromotionSequence = [initial];

	while (manager.getCurrentPageIndex() < Math.max(0, basePageCount - 2)) {
		manager.next();
		await pureSettle(manager, semanticIds, tailId);
		prePromotionSequence.push(diagnosticState(manager, semanticIds, tailId));
	}

	const beforeNext = diagnosticState(manager, semanticIds, tailId);
	const probeHandle = installPromotionProbe(manager, beforeNext.index + 1);
	window.__EPUB_VRL_DEBUG__ = true;
	window.__EPUB_VRL_SCROLL_TRACE__ = [];
	window.__EPUB_VRL_TERMINAL_TRACE__ = [];
	manager.next();
	const afterNext = await pureSettle(manager, semanticIds, tailId);
	const afterNextDiagnostic = diagnosticState(manager, semanticIds, tailId);
	const trace = (window.__EPUB_VRL_SCROLL_TRACE__ || [])
		.filter((entry) => ["before-sync", "after-first-sync", "after-second-sync", "complete"].includes(entry.stage))
		.map((entry) => Object.fromEntries(Object.entries(entry).filter(([key]) => [
			"stage", "pageIndex", "targetIndex", "preSyncTotalPages", "totalPages", "maxScroll",
			"logicalOffset", "left", "containerScrollLeft", "containerScrollWidth", "iframeWidth",
		].includes(key))));
	const terminalTrace = (window.__EPUB_VRL_TERMINAL_TRACE__ || []).map((entry) => ({
		event: entry.event,
		before: entry.before && {
			tailState: entry.before.tailState,
			terminalOwnerKind: entry.before.terminalOwnerKind,
			terminalOwnerTag: entry.before.terminalOwnerTag,
			terminalOwnerIdentity: entry.before.terminalOwnerIdentity,
			ownerConnected: entry.before.ownerConnected,
			ownerDocumentIdentity: entry.before.ownerDocumentIdentity,
			frameIdentity: entry.before.frameIdentity,
			documentIdentity: entry.before.documentIdentity,
			ownerRect: entry.before.ownerRect,
			effectiveClip: entry.before.effectiveClip,
			ownerClipRelation: entry.before.ownerClipRelation,
		},
		after: entry.after && {
			tailState: entry.after.tailState,
			terminalOwnerKind: entry.after.terminalOwnerKind,
			terminalOwnerTag: entry.after.terminalOwnerTag,
			terminalOwnerIdentity: entry.after.terminalOwnerIdentity,
			ownerConnected: entry.after.ownerConnected,
			ownerDocumentIdentity: entry.after.ownerDocumentIdentity,
			frameIdentity: entry.after.frameIdentity,
			documentIdentity: entry.after.documentIdentity,
			ownerRect: entry.after.ownerRect,
			effectiveClip: entry.after.effectiveClip,
			ownerClipRelation: entry.after.ownerClipRelation,
		},
		sameTerminalOwner: entry.sameTerminalOwner,
		sameOwnerDocument: entry.sameOwnerDocument,
		sameFrame: entry.sameFrame,
		ownerStillConnected: entry.ownerStillConnected,
		targetIndex: entry.targetIndex,
		tailStateBeforeScroll: entry.tailStateBeforeScroll,
		tailStateAfterScroll: entry.tailStateAfterScroll,
		tailStateAfterApply: entry.tailStateAfterApply,
		tailStateForPromotion: entry.tailStateForPromotion,
		promotionResult: entry.promotionResult,
		continuationCount: entry.continuationCount,
		continuationCountBefore: entry.continuationCountBefore,
		continuationCountAfter: entry.continuationCountAfter,
		terminalOwnerKind: entry.terminalOwnerKind,
		terminalOwnerTag: entry.terminalOwnerTag,
		afterApplyTerminalOwnerKind: entry.afterApplyTerminalOwnerKind,
		afterApplyTerminalOwnerTag: entry.afterApplyTerminalOwnerTag,
		resolverReason: entry.resolverReason,
	}));
	probeHandle.restore();

	const promotionObserved = afterNextDiagnostic.href === beforeNext.href && afterNextDiagnostic.total > basePageCount;
	const postPromotionSequence = [afterNextDiagnostic];
	for (let turn = 0; turn < 5 && postPromotionSequence.at(-1).href === beforeNext.href; turn += 1) {
		manager.next();
		await pureSettle(manager, semanticIds, tailId);
		postPromotionSequence.push(diagnosticState(manager, semanticIds, tailId));
	}

	const afterSpine = postPromotionSequence.at(-1);
	const prePromotionUnion = [...new Set(prePromotionSequence.flatMap((state) => state.visibleSemanticIds))];
	const postPromotionSameSpineUnion = [...new Set(postPromotionSequence
		.filter((state) => state.href === beforeNext.href)
		.flatMap((state) => state.visibleSemanticIds))];
	const cumulativeUnion = [...new Set([...prePromotionUnion, ...postPromotionSameSpineUnion])];
	const firstPromotionState = afterNextDiagnostic;
	const firstPromotionNewSemantic = firstPromotionState.visibleSemanticIds.filter((id) => !prePromotionUnion.includes(id));

	return {
		fixture: {
			name: options.name,
			kind: options.kind,
			columns: options.columns,
			geometryTailWidth: options.geometryTailWidth,
			tailShift: options.tailShift,
		},
		basePageCount,
		beforeNext,
		tailStateBefore: beforeNext.tailState,
		promotionPoint: promotionPoint(beforeNext, afterNext, probeHandle.probe, trace),
		terminalTrace,
		promotionObserved,
		afterFirstPromotion: afterNextDiagnostic,
		firstPromotionNewSemantic,
		postPromotionSameSpineUnion,
		postPromotionSameSpineUnionCount: postPromotionSameSpineUnion.length,
		cumulativeUnionCount: cumulativeUnion.length,
		terminalTailReachedAfterPromotion: postPromotionSequence.some((state) => (
			state.href === beforeNext.href && state.tailState.state === "reached"
		)),
		afterSpine,
		prePromotionSequence,
		postPromotionSequence,
	};
}

function sanitizeTailState(tailState) {
	if (!tailState) {
		return null;
	}

	return {
		state: tailState.state,
		reason: tailState.reason,
		writingMode: tailState.writingMode,
		direction: tailState.direction,
		candidate: tailState.candidate && {
			kind: tailState.candidate.kind,
			tag: tailState.candidate.tag,
			textLength: tailState.candidate.textLength,
			connected: tailState.candidate.connected,
			ownerDocumentIsCurrent: tailState.candidate.ownerDocumentIsCurrent,
			display: tailState.candidate.display,
			visibility: tailState.candidate.visibility,
			rect: compactRect(tailState.candidate.rect),
			intersection: tailState.candidate.intersection,
			geometryPositive: tailState.candidate.geometryPositive,
		},
	};
}

function sanitizeState(state) {
	return state && {
		href: state.href,
		index: state.index,
		total: state.total,
		frameRect: state.frameRect,
		effectiveClip: state.effectiveClip,
		bodyScrollWidth: state.bodyScrollWidth,
		bodyClientWidth: state.bodyClientWidth,
		documentScrollWidth: state.documentScrollWidth,
		documentClientWidth: state.documentClientWidth,
		visibleSemanticIds: state.visibleSemanticIds,
		visibleSemanticCount: state.visibleSemanticCount,
		tailRect: state.tailRect,
		tailState: sanitizeTailState(state.tailState),
	};
}

function sanitizeReport(report) {
	return {
		fixture: report.fixture,
		basePageCount: report.basePageCount,
		beforeNext: sanitizeState(report.beforeNext),
		tailStateBefore: sanitizeTailState(report.tailStateBefore),
		promotionPoint: {
			basePageCountBefore: report.promotionPoint.basePageCountBefore,
			continuationCountBefore: report.promotionPoint.continuationCountBefore,
			targetIndex: report.promotionPoint.targetIndex,
			logicalOffset: report.promotionPoint.logicalOffset,
			maxLogicalScroll: report.promotionPoint.maxLogicalScroll,
			remainingLogicalScroll: report.promotionPoint.remainingLogicalScroll,
			pageAdvance: report.promotionPoint.pageAdvance,
			snapTolerance: report.promotionPoint.snapTolerance,
			logicalViewport: report.promotionPoint.logicalViewport,
			renderedTextTailBoundsBefore: report.promotionPoint.renderedTextTailBoundsBefore,
			replacedTailBoundsBefore: report.promotionPoint.replacedTailBoundsBefore,
			renderedTextTailBoundsAfter: report.promotionPoint.renderedTextTailBoundsAfter,
			replacedTailBoundsAfter: report.promotionPoint.replacedTailBoundsAfter,
			visibleReplacedElementsBefore: report.promotionPoint.visibleReplacedElementsBefore,
			visibleReplacedElementsAfter: report.promotionPoint.visibleReplacedElementsAfter,
			actualContentTailCoordinate: report.promotionPoint.actualContentTailCoordinate,
			unreachedContentDistanceBefore: report.promotionPoint.unreachedContentDistanceBefore,
			trace: report.promotionPoint.trace,
		},
		terminalTrace: report.terminalTrace,
		promotionObserved: report.promotionObserved,
		afterFirstPromotion: sanitizeState(report.afterFirstPromotion),
		firstPromotionNewSemantic: report.firstPromotionNewSemantic,
		postPromotionSameSpineUnion: report.postPromotionSameSpineUnion,
		postPromotionSameSpineUnionCount: report.postPromotionSameSpineUnionCount,
		cumulativeUnionCount: report.cumulativeUnionCount,
		terminalTailReachedAfterPromotion: report.terminalTailReachedAfterPromotion,
		afterSpine: sanitizeState(report.afterSpine),
		prePromotionSequence: report.prePromotionSequence.map(sanitizeState),
		postPromotionSequence: report.postPromotionSequence.map(sanitizeState),
	};
}

const tailFixtures = [
	{ name: "fixture-a-text-reached", kind: "text", columns: 65, geometryTailWidth: 64, tailShift: 20 },
	{ name: "fixture-b-text-unreached", kind: "text", columns: 90, geometryTailWidth: 0, tailShift: 0 },
	{ name: "fixture-c-replaced-reached", kind: "replaced", columns: 64, geometryTailWidth: 64, tailShift: 20 },
	{ name: "fixture-d-replaced-unreached", kind: "replaced", columns: 89, geometryTailWidth: 64, tailShift: 0 },
];

const fixtureE = {
	name: "fixture-e-terminal-tail-settles-after-target-scroll",
	kind: "text",
	columns: 90,
	geometryTailWidth: 64,
	tailShift: 40,
};

it.each(tailFixtures)("qualifies $name terminal tail contract", async (options) => {
	const report = await runCase(options);
	console.info("vertical-rl-terminal-tail", JSON.stringify(sanitizeReport(report)));
	for (const tag of ["img", "svg", "video", "canvas", "object", "embed", "audio", "iframe", "math"]) {
		expect(VERTICAL_RL_TERMINAL_REPLACED_TAGS).toContain(tag);
	}

	const { tailStateBefore, fixture } = report;
	expect(tailStateBefore.state).toBe(options.name.includes("unreached") ? "unreached" : "reached");
	expect(tailStateBefore.candidate.kind).toBe(options.kind === "text" ? "text" : "replaced");
	expect(report.firstPromotionNewSemantic).toEqual(options.name.includes("unreached") ? expect.any(Array) : []);
	expect(report.cumulativeUnionCount).toBe(options.kind === "text" ? fixture.columns : fixture.columns + 1);
	expect(report.afterSpine.href).toBe("two.xhtml");

	if (options.name.includes("unreached")) {
		expect(report.promotionObserved).toBe(true);
		expect(report.firstPromotionNewSemantic.length).toBeGreaterThan(0);
		expect(report.terminalTailReachedAfterPromotion).toBe(true);
	} else {
		expect(report.promotionObserved).toBe(false);
		expect(report.firstPromotionNewSemantic).toEqual([]);
	}

	if (options.kind === "replaced") {
		expect(tailStateBefore.candidate.tag).toBe("svg");
		if (options.name.includes("unreached")) {
			expect(report.postPromotionSameSpineUnion).toContain("tail-owner");
			expect(report.promotionPoint.visibleReplacedElementsBefore).toEqual([]);
		} else {
			expect(report.promotionPoint.visibleReplacedElementsBefore).toHaveLength(1);
			expect(report.promotionPoint.visibleReplacedElementsAfter).toEqual([]);
		}
	}
}, 120000);

it("defers Fixture E promotion until the target terminal tail settles", async () => {
	const report = await runCase(fixtureE);

	console.info("vertical-rl-terminal-timing", JSON.stringify(sanitizeReport(report)));
	expect(report.tailStateBefore.state).toBe("unreached");
	expect(report.promotionPoint.continuationCountBefore).toBe(0);
	expect(report.promotionObserved).toBe(false);
	expect(report.afterFirstPromotion.tailState.state).toBe("reached");
	expect(report.promotionPoint.trace.length).toBeGreaterThan(0);
	const decision = report.terminalTrace.find((entry) => entry.event === "vertical-rl-terminal-promotion-decision");
	const settled = report.terminalTrace.find((entry) => entry.event === "vertical-rl-terminal-target-settled");
	expect(decision).toEqual(expect.objectContaining({
		tailStateBeforeScroll: "unreached",
		tailStateAfterApply: "reached",
		promotionResult: false,
		continuationCountAfter: 0,
	}));
	expect(settled).toEqual(expect.objectContaining({
		tailStateAfterApply: "reached",
		promotionResult: false,
		continuationCount: 0,
	}));
}, 120000);

it("keeps repeated reached and unreached terminal decisions idempotent", () => {
	const reached = resolveVerticalRlTerminalContinuation(undefined, "idempotent-reached");
	expect(reached).not.toBeNull();
	expect(promoteVerticalRlTerminalContinuation(reached, 4, 3, 240, 480, 12, "reached")).toBe(false);
	expect(promoteVerticalRlTerminalContinuation(reached, 4, 3, 240, 480, 12, "reached")).toBe(false);
	expect(reached.continuationCount).toBe(0);

	const unreached = resolveVerticalRlTerminalContinuation(undefined, "idempotent-unreached");
	expect(unreached).not.toBeNull();
	expect(promoteVerticalRlTerminalContinuation(unreached, 4, 3, 240, 480, 12, "unreached")).toBe(true);
	expect(promoteVerticalRlTerminalContinuation(unreached, 4, 3, 240, 480, 12, "unreached")).toBe(false);
	expect(unreached.continuationCount).toBe(1);
});

it("returns unknown and never authorizes suppression when the tail geometry is unavailable", () => {
	const isolatedDocument = document.implementation.createHTMLDocument("unknown-tail");
	isolatedDocument.body.innerHTML = "<p><span>Z</span></p>";
	const result = resolveVerticalRlTerminalTail({
		document: isolatedDocument,
		frameRect: { left: 0, right: 260, top: 0, bottom: 260, width: 260, height: 260 },
		effectiveClip: { left: 0, right: 260, top: 0, bottom: 260, width: 260, height: 260 },
	});

	expect(result.state).toBe("unknown");
	expect(result.candidate).toBeNull();
});

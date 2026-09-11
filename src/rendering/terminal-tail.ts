import type { VerticalRlTerminalTailState } from "./terminal-continuation";

export const VERTICAL_RL_TERMINAL_REPLACED_TAGS = [
	"img",
	"svg",
	"video",
	"canvas",
	"object",
	"embed",
	"audio",
	"iframe",
	"math"
] as const;

export type VerticalRlRect = {
	left: number;
	right: number;
	top: number;
	bottom: number;
	width: number;
	height: number;
};

export type VerticalRlTerminalTailCandidate = {
	kind: "text" | "replaced";
	tag: string | null;
	ownerIdentity: number | null;
	ownerDocumentIdentity: number | null;
	textLength?: number;
	connected: boolean;
	ownerDocumentIsCurrent: boolean;
	display?: string;
	visibility?: string;
	rect?: VerticalRlRect;
	intersection?: {
		width: number;
		height: number;
		positiveArea: boolean;
	};
	geometryPositive: boolean;
};

export type VerticalRlTerminalTailResolution = {
	state: VerticalRlTerminalTailState;
	reason: string;
	candidate: VerticalRlTerminalTailCandidate | null;
	writingMode: string | null;
	direction: string | null;
};

export type VerticalRlTerminalTailResolverInput = {
	document: Document;
	frameRect: VerticalRlRect;
	effectiveClip: VerticalRlRect;
};

const REPLACED_TAGS = new Set<string>(VERTICAL_RL_TERMINAL_REPLACED_TAGS);
const runtimeIdentityMap = new WeakMap<object, number>();
let nextRuntimeIdentity = 1;

/** Return a diagnostic-only identity without retaining a DOM object in traces. */
export function getVerticalRlRuntimeIdentity(value: object | null | undefined): number | null {
	if (!value) {
		return null;
	}

	let identity = runtimeIdentityMap.get(value);
	if (identity === undefined) {
		identity = nextRuntimeIdentity;
		nextRuntimeIdentity += 1;
		runtimeIdentityMap.set(value, identity);
	}

	return identity;
}

function hasFiniteRect(rect: VerticalRlRect | null | undefined): rect is VerticalRlRect {
	return Boolean(rect) && [
		rect.left,
		rect.right,
		rect.top,
		rect.bottom,
		rect.width,
		rect.height
	].every((value) => Number.isFinite(value));
}

function hasPositiveRect(rect: VerticalRlRect | null | undefined): rect is VerticalRlRect {
	return hasFiniteRect(rect) &&
		rect.width > 0 &&
		rect.height > 0 &&
		rect.right > rect.left &&
		rect.bottom > rect.top;
}

function intersect(rect: VerticalRlRect, clip: VerticalRlRect): {
	width: number;
	height: number;
	positiveArea: boolean;
} {
	const width = Math.min(rect.right, clip.right) - Math.max(rect.left, clip.left);
	const height = Math.min(rect.bottom, clip.bottom) - Math.max(rect.top, clip.top);

	return {
		width,
		height,
		positiveArea: width > 0 && height > 0
	};
}

function mapToFrame(frameRect: VerticalRlRect, rect: DOMRect): VerticalRlRect {
	return {
		left: frameRect.left + rect.left,
		right: frameRect.left + rect.right,
		top: frameRect.top + rect.top,
		bottom: frameRect.top + rect.bottom,
		width: rect.width,
		height: rect.height
	};
}

function visibleStyle(element: Element, document: Document): { display: string; visibility: string } | null {
	if (!element.isConnected || element.ownerDocument !== document) {
		return null;
	}

	const view = document.defaultView;
	if (!view) {
		return null;
	}

	const style = view.getComputedStyle(element);
	if (!style || style.display === "none" || style.visibility === "hidden") {
		return null;
	}

	return {
		display: style.display,
		visibility: style.visibility
	};
}

function textCandidate(
	node: Text,
	document: Document,
	frameRect: VerticalRlRect,
	effectiveClip: VerticalRlRect
): VerticalRlTerminalTailCandidate | null {
	const owner = node.parentElement;
	if (!owner) {
		return null;
	}

	const style = visibleStyle(owner, document);
	if (!style) {
		return null;
	}

	const range = document.createRange();
	let endOffset = node.data.length;
	while (endOffset > 0 && /\s/.test(node.data[endOffset - 1])) {
		endOffset -= 1;
	}
	range.setStart(node, 0);
	range.setEnd(node, endOffset);
	const rects = Array.from(range.getClientRects())
		.map((rect) => mapToFrame(frameRect, rect))
		.filter((rect) => hasPositiveRect(rect));
	if (!rects.length) {
		return {
			kind: "text",
			tag: owner.tagName.toLowerCase(),
			ownerIdentity: getVerticalRlRuntimeIdentity(owner),
			ownerDocumentIdentity: getVerticalRlRuntimeIdentity(document),
			textLength: node.data.trim().length,
			connected: node.isConnected,
			ownerDocumentIsCurrent: node.ownerDocument === document,
			geometryPositive: false
		};
	}

	const rect = rects[rects.length - 1];
	return {
		kind: "text",
		tag: owner.tagName.toLowerCase(),
		ownerIdentity: getVerticalRlRuntimeIdentity(owner),
		ownerDocumentIdentity: getVerticalRlRuntimeIdentity(document),
		textLength: node.data.trim().length,
		connected: node.isConnected,
		ownerDocumentIsCurrent: node.ownerDocument === document,
		display: style.display,
		visibility: style.visibility,
		rect,
		intersection: intersect(rect, effectiveClip),
		geometryPositive: true
	};
}

function replacedCandidate(
	element: Element,
	document: Document,
	frameRect: VerticalRlRect,
	effectiveClip: VerticalRlRect
): VerticalRlTerminalTailCandidate | null {
	const style = visibleStyle(element, document);
	if (!style) {
		return null;
	}

	const rect = element.getBoundingClientRect();
	const mapped = hasPositiveRect(rect) ? mapToFrame(frameRect, rect) : null;
	if (!mapped) {
		return {
			kind: "replaced",
			tag: element.tagName.toLowerCase(),
			ownerIdentity: getVerticalRlRuntimeIdentity(element),
			ownerDocumentIdentity: getVerticalRlRuntimeIdentity(document),
			connected: element.isConnected,
			ownerDocumentIsCurrent: element.ownerDocument === document,
			geometryPositive: false
		};
	}

	return {
		kind: "replaced",
		tag: element.tagName.toLowerCase(),
		ownerIdentity: getVerticalRlRuntimeIdentity(element),
		ownerDocumentIdentity: getVerticalRlRuntimeIdentity(document),
		connected: element.isConnected,
		ownerDocumentIsCurrent: element.ownerDocument === document,
		display: style.display,
		visibility: style.visibility,
		rect: mapped,
		intersection: intersect(mapped, effectiveClip),
		geometryPositive: true
	};
}

function classify(
	candidate: VerticalRlTerminalTailCandidate,
	effectiveClip: VerticalRlRect,
	writingMode: string | null
): VerticalRlTerminalTailState {
	if (!candidate.connected || !candidate.ownerDocumentIsCurrent || !candidate.geometryPositive || !candidate.rect || !candidate.intersection) {
		return "unknown";
	}

	if (candidate.intersection.positiveArea) {
		return "reached";
	}

	if (writingMode === "vertical-rl" && candidate.rect.right <= effectiveClip.left) {
		return "unreached";
	}

	return "unknown";
}

function isTextInsideReplacedOwner(node: Text): boolean {
	let owner = node.parentElement;
	while (owner) {
		if (REPLACED_TAGS.has(owner.tagName.toLowerCase())) {
			return true;
		}
		owner = owner.parentElement;
	}

	return false;
}

/**
 * Read the viewport clip that is already applied to a vertical-rl container.
 * Dataset masks are written by the manager after layout; reading them here
 * does not calculate or materialize pagination state.
 */
export function getVerticalRlEffectiveClip(container: Element | null | undefined): VerticalRlRect | null {
	if (!container) {
		return null;
	}

	const rect = container.getBoundingClientRect();
	if (!hasFiniteRect(rect) || rect.width <= 0 || rect.height <= 0) {
		return null;
	}

	const dataset = (container as HTMLElement).dataset || {};
	const combinedMask = Number(dataset.epubVrlEdgeMask);
	const leftMaskValue = Number(dataset.epubVrlEdgeMaskLeft);
	const rightMaskValue = Number(dataset.epubVrlEdgeMaskRight);
	const leftMask = Math.max(0, Number.isFinite(leftMaskValue) ? leftMaskValue : (Number.isFinite(combinedMask) ? combinedMask : 0));
	const rightMask = Math.max(0, Number.isFinite(rightMaskValue) ? rightMaskValue : 0);
	const effectiveWidth = rect.width - leftMask - rightMask;
	if (effectiveWidth <= 0) {
		return null;
	}

	return {
		left: rect.left + leftMask,
		right: rect.right - rightMask,
		top: rect.top,
		bottom: rect.bottom,
		width: effectiveWidth,
		height: rect.height
	};
}

/**
 * Resolve the last renderable semantic owner without consulting pagination state.
 *
 * The resolver intentionally accepts only the active document, frame mapping,
 * and already-applied effective clip. It never asks a manager to calculate or
 * materialize page metrics.
 */
export function resolveVerticalRlTerminalTail({
	document,
	frameRect,
	effectiveClip
}: VerticalRlTerminalTailResolverInput): VerticalRlTerminalTailResolution {
	if (!document?.body || !hasPositiveRect(frameRect) || !hasPositiveRect(effectiveClip)) {
		return {
			state: "unknown",
			reason: "missing-document-frame-or-clip",
			candidate: null,
			writingMode: null,
			direction: null
		};
	}

	const view = document.defaultView;
	const bodyStyle = view?.getComputedStyle(document.body);
	const writingMode = bodyStyle?.writingMode?.toLowerCase() || bodyStyle?.getPropertyValue("writing-mode")?.toLowerCase() || null;
	const direction = bodyStyle?.direction?.toLowerCase() || null;
	const walker = document.createTreeWalker(document.body, 1 | 4);
	const nodes: Node[] = [];
	let node = walker.nextNode();
	while (node) {
		nodes.push(node);
		node = walker.nextNode();
	}

	for (let index = nodes.length - 1; index >= 0; index -= 1) {
		node = nodes[index];
		let candidate: VerticalRlTerminalTailCandidate | null = null;
		if (node.nodeType === 3) {
			const text = node as Text;
			if (!text.data.trim() || isTextInsideReplacedOwner(text)) {
				continue;
			}
			candidate = textCandidate(text, document, frameRect, effectiveClip);
		} else if (node.nodeType === 1) {
			const element = node as Element;
			if (!REPLACED_TAGS.has(element.tagName.toLowerCase())) {
				continue;
			}
			candidate = replacedCandidate(element, document, frameRect, effectiveClip);
		}

		if (!candidate) {
			continue;
		}

		return {
			state: classify(candidate, effectiveClip, writingMode),
			reason: candidate.geometryPositive ? "terminal-candidate-classified" : "terminal-candidate-geometry-unresolved",
			candidate,
			writingMode,
			direction
		};
	}

	return {
		state: "unknown",
		reason: "no-renderable-terminal-candidate",
		candidate: null,
		writingMode,
		direction
	};
}

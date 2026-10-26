/** Versioned diagnostic evidence only. Never supplies offsets or pagination decisions. */
export type CoverageRect = { left: number; right: number; top: number; bottom: number };
export type CoverageSource = { identity: string; rect: CoverageRect };
export type CoverageObservation = {
    sequence: number;
    pageIndex: number;
    sourceFingerprint: string;
    sectionHref: string;
    layoutGeneration: string;
    documentIdentity: string;
    inventoryIdentity: string;
    connected: boolean;
    ownerDocumentMatches: boolean;
    settled: boolean;
    complete: boolean;
    rawViewport: CoverageRect;
    effectiveViewport: CoverageRect;
};
export type CoverageLedger = {
    version: 2;
    sourceFingerprint: string;
    sectionHref: string;
    layoutGeneration: string;
    documentIdentity: string;
    inventoryIdentity: string;
    inventoryComplete: boolean;
    truncated: boolean;
    terminalObserved: boolean;
    sources: CoverageSource[];
    observations: CoverageObservation[];
};
export type CoverageAssessment = {
    version: 2;
    status: "pass" | "incomplete" | "fail";
    reasons: string[];
    uncoveredSourceIdentities: string[];
    blankSequences: number[];
    duplicateSequences: number[];
};

const validRect = (rect: CoverageRect): boolean =>
    Boolean(rect) &&
    [rect.left, rect.right, rect.top, rect.bottom].every(Number.isFinite) &&
    rect.right > rect.left &&
    rect.bottom > rect.top;

const intersect = (a: CoverageRect, b: CoverageRect): CoverageRect | null => {
    const rect = {
        left: Math.max(a.left, b.left),
        right: Math.min(a.right, b.right),
        top: Math.max(a.top, b.top),
        bottom: Math.min(a.bottom, b.bottom),
    };
    return validRect(rect) ? rect : null;
};

/** Retain every positive-area remainder; internal semantic gaps get no tolerance. */
const subtract = (source: CoverageRect, viewport: CoverageRect): CoverageRect[] => {
    const overlap = intersect(source, viewport);
    if (!overlap) {
        return [source];
    }
    return [
        { ...source, right: overlap.left },
        { ...source, left: overlap.right },
        { left: overlap.left, right: overlap.right, top: source.top, bottom: overlap.top },
        { left: overlap.left, right: overlap.right, top: overlap.bottom, bottom: source.bottom },
    ].filter(validRect);
};

/**
 * Assess only supplied actual, settled forward observations in one source coordinate
 * system. Inventory identity and provenance must come from the collector; this pure
 * assessor cannot prove that a DOM traversal was complete or an observation was live.
 * Caller must independently establish source, marker, reverse and cross-spine gates.
 */
export function assessObservedCoverage(ledger: CoverageLedger): CoverageAssessment {
    const result: CoverageAssessment = {
        version: 2,
        status: "incomplete",
        reasons: [],
        uncoveredSourceIdentities: [],
        blankSequences: [],
        duplicateSequences: [],
    };
    const incomplete = (reason: string): CoverageAssessment => {
        result.reasons.push(reason);
        return result;
    };
    if (ledger.version !== 2) {
        return incomplete("unsupported-version");
    }
    if (
        ![
            ledger.sourceFingerprint,
            ledger.sectionHref,
            ledger.layoutGeneration,
            ledger.documentIdentity,
            ledger.inventoryIdentity,
        ].every((value) => typeof value === "string" && value.length > 0)
    ) {
        return incomplete("missing-provenance");
    }
    if (!ledger.inventoryComplete || ledger.truncated) {
        return incomplete("incomplete-or-truncated-inventory");
    }
    if (!ledger.sources.length || !ledger.observations.length || !ledger.terminalObserved) {
        return incomplete("missing-source-or-terminal-observation");
    }
    const identities = new Set<string>();
    for (const source of ledger.sources) {
        if (!source.identity || identities.has(source.identity) || !validRect(source.rect)) {
            return incomplete("invalid-or-duplicate-source");
        }
        identities.add(source.identity);
    }
    for (const [index, observation] of ledger.observations.entries()) {
        if (
            !observation.complete ||
            !observation.connected ||
            !observation.ownerDocumentMatches ||
            !observation.settled
        ) {
            return incomplete("unqualified-observation");
        }
        if (
            observation.sourceFingerprint !== ledger.sourceFingerprint ||
            observation.sectionHref !== ledger.sectionHref ||
            observation.layoutGeneration !== ledger.layoutGeneration ||
            observation.documentIdentity !== ledger.documentIdentity ||
            observation.inventoryIdentity !== ledger.inventoryIdentity
        ) {
            return incomplete("mixed-provenance-or-generation");
        }
        if (observation.sequence !== index || observation.pageIndex !== index) {
            return incomplete("nonsequential-forward-observations");
        }
        const raw = observation.rawViewport,
            effective = observation.effectiveViewport;
        if (
            !validRect(raw) ||
            !validRect(effective) ||
            effective.left < raw.left ||
            effective.right > raw.right ||
            effective.top < raw.top ||
            effective.bottom > raw.bottom
        ) {
            return incomplete("invalid-effective-viewport");
        }
    }
    const remaining = ledger.sources.map((source) => [source.rect]);
    for (const observation of ledger.observations) {
        let visible = false,
            novel = false;
        ledger.sources.forEach((source, index) => {
            visible ||= intersect(source.rect, observation.effectiveViewport) !== null;
            novel ||= remaining[index].some(
                (rect) => intersect(rect, observation.effectiveViewport) !== null,
            );
            remaining[index] = remaining[index].flatMap((rect) =>
                subtract(rect, observation.effectiveViewport),
            );
        });
        if (!visible) {
            result.blankSequences.push(observation.sequence);
        } else if (!novel) {
            result.duplicateSequences.push(observation.sequence);
        }
    }
    result.uncoveredSourceIdentities = ledger.sources
        .filter((_, index) => remaining[index].length > 0)
        .map((source) => source.identity);
    if (result.uncoveredSourceIdentities.length) {
        result.reasons.push("uncovered-source-or-semantic-gap");
    }
    if (result.blankSequences.length) {
        result.reasons.push("blank-continuation");
    }
    if (result.duplicateSequences.length) {
        result.reasons.push("duplicate-continuation");
    }
    result.status = result.reasons.length ? "fail" : "pass";
    return result;
}

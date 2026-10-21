import { describe, expect, it } from "vitest";
import { assessObservedCoverage } from "../../src/rendering/observed-coverage";

const rect = (left, right, top = 0, bottom = 20) => ({ left, right, top, bottom });
function fixture() {
	const provenance = {
		sourceFingerprint: "authorized-source", sectionHref: "chapter.xhtml", layoutGeneration: "generation-1",
		documentIdentity: "document-1", inventoryIdentity: "inventory-1"
	};
	return {
		version: 2, ...provenance, inventoryComplete: true, truncated: false, terminalObserved: true,
		sources: [{ identity: "source-a", rect: rect(0, 20) }, { identity: "source-b", rect: rect(20, 40) }],
		observations: [rect(0, 20), rect(20, 40)].map((viewport, index) => ({
			...provenance, sequence: index, pageIndex: index, connected: true, ownerDocumentMatches: true,
			settled: true, complete: true, rawViewport: { ...viewport }, effectiveViewport: { ...viewport }
		}))
	};
}

describe("observed coverage v2 (diagnostic only)", () => {
	it("accepts complete actual coverage without modifying input", () => {
		const ledger = fixture(), before = structuredClone(ledger);
		expect(assessObservedCoverage(ledger).status).toBe("pass");
		expect(ledger).toEqual(before);
	});
	it("rejects a source entirely missed by visited pages", () => {
		const ledger = fixture(); ledger.sources.push({ identity: "missing", rect: rect(50, 60) });
		expect(assessObservedCoverage(ledger).uncoveredSourceIdentities).toEqual(["missing"]);
	});
	it("rejects an internal positive-area gap, including a fractional gap", () => {
		const ledger = fixture(); ledger.observations[1].effectiveViewport.left = 20.01;
		expect(assessObservedCoverage(ledger).status).toBe("fail");
	});
	it("does not accept raw viewport coverage hidden by the effective mask", () => {
		const ledger = fixture(); ledger.observations[0].effectiveViewport.top = 1;
		expect(assessObservedCoverage(ledger).uncoveredSourceIdentities).toEqual(["source-a"]);
	});
	it("combines actual partial viewports in both axes", () => {
		const ledger = fixture(); ledger.sources = [{ identity: "source", rect: rect(0, 20) }];
		ledger.observations[0].rawViewport = ledger.observations[0].effectiveViewport = rect(0, 20, 0, 10);
		ledger.observations[1].rawViewport = ledger.observations[1].effectiveViewport = rect(0, 20, 10, 20);
		expect(assessObservedCoverage(ledger).status).toBe("pass");
	});
	it("rejects a blank continuation even after full coverage", () => {
		const ledger = fixture();
		ledger.observations.push({ ...ledger.observations[1], sequence: 2, pageIndex: 2, rawViewport: rect(40, 60), effectiveViewport: rect(40, 60) });
		expect(assessObservedCoverage(ledger).blankSequences).toEqual([2]);
	});
	it("rejects repeated pages without newly covered source", () => {
		const ledger = fixture(); ledger.observations.push({ ...ledger.observations[1], sequence: 2, pageIndex: 2 });
		expect(assessObservedCoverage(ledger).duplicateSequences).toEqual([2]);
	});
	for (const key of ["sourceFingerprint", "sectionHref", "layoutGeneration", "documentIdentity", "inventoryIdentity"]) {
		it(`refuses mixed ${key}`, () => {
			const ledger = fixture(); ledger.observations[1][key] = "stale";
			expect(assessObservedCoverage(ledger).status).toBe("incomplete");
		});
	}
	for (const key of ["connected", "ownerDocumentMatches", "settled", "complete"]) {
		it(`refuses observation without ${key}`, () => {
			const ledger = fixture(); ledger.observations[1][key] = false;
			expect(assessObservedCoverage(ledger).status).toBe("incomplete");
		});
	}
	for (const change of [ledger => { ledger.truncated = true; }, ledger => { ledger.inventoryComplete = false; },
		ledger => { ledger.terminalObserved = false; }, ledger => { ledger.sources = []; },
		ledger => { ledger.observations = []; }, ledger => { ledger.version = 1; },
		ledger => { ledger.sources.push(ledger.sources[0]); }, ledger => { ledger.sources[0].rect.left = NaN; },
		ledger => { ledger.observations[1].sequence = 3; }, ledger => { ledger.observations[1].pageIndex = 3; },
		ledger => { ledger.observations[0].effectiveViewport.left = -1; }]) {
		it("fails closed for incomplete, invalid or out-of-order evidence", () => {
			const ledger = fixture(); change(ledger);
			expect(assessObservedCoverage(ledger).status).toBe("incomplete");
		});
	}
});

import { describe, expect, it } from "vitest";
import { getVerticalRlCleanPageEdgeMaskInput } from "../../src/rendering/boundary-mask";

/**
 * Characterization test for the vertical-rl clean-page edge mask input.
 *
 * These assertions record CURRENT behaviour so that any future change to the
 * clean-page mask is deliberate and visible. They are not a statement of the
 * desired behaviour.
 *
 * Context (2026-08-15 investigation):
 * - Real-book symptom: characters that straddle a page boundary have their
 *   in-page portion covered by the left edge mask, while the next page renders
 *   only the remaining half, producing an unreadable half CJK glyph.
 * - True-book regression gate: 9789570538069 at 24px / line-height 2.0
 *   (30 straddling characters on mobile-390x844).
 * - Ruled out as causes: the layout-ready re-sync guard, treating the
 *   text-boundary snap offset as the grid baseline, and page-width /
 *   glyph-width divisibility.
 */
describe("Vertical RL clean-page edge mask input characterization", function () {
	const advance = 384;
	const totalPages = 10;
	const pageIndex = 1;
	const gridOffset = 384;

	function buildInput({ actualOffset, sequentialBoundaryPageIndex = null }) {
		return getVerticalRlCleanPageEdgeMaskInput(
			advance,
			totalPages,
			pageIndex,
			gridOffset,
			gridOffset - advance,
			actualOffset,
			gridOffset,
			sequentialBoundaryPageIndex
		);
	}

	it("does not force the raw left mask when the offset sits on the grid", function () {
		const input = buildInput({ actualOffset: gridOffset });

		expect(input).not.toBeNull();
		expect(input.forceRawLeftMask).toBe(false);
	});

	it("tolerates sub-pixel drift of up to 1px without forcing the raw left mask", function () {
		const input = buildInput({ actualOffset: gridOffset - 1 });

		expect(input.forceRawLeftMask).toBe(false);
	});

	it("forces the raw left mask once the offset drifts more than 1px off the grid", function () {
		// 359 is the offset observed on 9789570538069 24px/2.0 after the
		// text-boundary snap deliberately moved the page off the grid.
		const input = buildInput({ actualOffset: 359 });

		expect(input.forceRawLeftMask).toBe(true);
	});

	it("forces the raw left mask on a sequential boundary page even when on the grid", function () {
		const input = buildInput({
			actualOffset: gridOffset,
			sequentialBoundaryPageIndex: pageIndex
		});

		expect(input.forceRawLeftMask).toBe(true);
	});

	it("returns null for the first page, where no clean-page mask applies", function () {
		const input = getVerticalRlCleanPageEdgeMaskInput(
			advance,
			totalPages,
			0,
			0,
			0,
			0,
			0,
			null
		);

		expect(input).toBeNull();
	});
});

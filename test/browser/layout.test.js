import { describe, expect, it, vi } from "vitest";
import Layout from "../../src/layout";
import { EVENTS } from "../../src/utils/constants";

describe("browser Layout", () => {
	it("calculates reflowable paginated spreads with explicit gaps", () => {
		const layout = new Layout({
			layout: "reflowable",
			spread: "auto",
			minSpreadWidth: 800,
			evenSpreads: false
		});
		const updated = vi.fn();

		layout.on(EVENTS.LAYOUT.UPDATED, updated);
		layout.calculate(1000, 600, 20);

		expect(layout.width).toBe(1000);
		expect(layout.height).toBe(600);
		expect(layout.divisor).toBe(2);
		expect(layout.columnWidth).toBe(480);
		expect(layout.pageWidth).toBe(500);
		expect(layout.spreadWidth).toBe(980);
		expect(layout.delta).toBe(1000);
		expect(layout.effectivePageAdvance).toBe(1000);
		expect(layout.viewportPageWidth).toBe(1000);
		expect(layout.pageBoundaryShift).toBe(0);
		expect(layout.props.pageWidth).toBe(500);
		expect(updated).toHaveBeenCalledWith(layout.props, expect.objectContaining({
			width: 1000,
			height: 600,
			pageWidth: 500,
			divisor: 2
		}));
	});

	it("uses an even automatic gap for reflowable paginated layouts", () => {
		const layout = new Layout({ layout: "reflowable", spread: "none" });

		layout.calculate(997, 600);

		expect(layout.divisor).toBe(1);
		expect(layout.gap).toBe(82);
		expect(layout.columnWidth).toBe(997);
		expect(layout.pageWidth).toBe(997);
	});

	it("forces pre-paginated layouts to zero gap and one page", () => {
		const layout = new Layout({
			layout: "pre-paginated",
			spread: "always",
			minSpreadWidth: 800
		});

		layout.calculate(1200, 700, 30);

		expect(layout.gap).toBe(0);
		expect(layout.divisor).toBe(2);
		expect(layout.width).toBe(600);
		expect(layout.columnWidth).toBe(600);
		expect(layout.count(5000, 600)).toEqual({ spreads: 1, pages: 1 });
	});

	it("normalizes flow and spread settings and emits only changed props", () => {
		const layout = new Layout({ layout: "reflowable" });
		const updated = vi.fn();

		layout.on(EVENTS.LAYOUT.UPDATED, updated);

		expect(layout.flow("scrolled-continuous")).toBe("scrolled");
		expect(layout.spread("none", 0)).toBe(false);
		expect(layout.spread(undefined, 1024)).toBe(false);

		expect(layout.flow()).toBe("scrolled");
		expect(updated).toHaveBeenNthCalledWith(1, layout.props, { flow: "scrolled" });
		expect(updated).toHaveBeenNthCalledWith(2, layout.props, { spread: false });
	});

	it("counts pages with a viewport wider than the effective page advance", () => {
		const layout = new Layout({ layout: "reflowable" });

		layout.calculate(1320, 900, 0);
		layout.viewportPageWidth = 1320;
		layout.effectivePageAdvance = 1044;
		layout.delta = 1044;

		expect(layout.count(4100)).toEqual({ spreads: 2, pages: 4 });
	});

	it("delegates formatting to the expected contents method", () => {
		const layout = new Layout({
			layout: "reflowable",
			flow: "paginated",
			direction: "rtl"
		});
		const contents = {
			fit: vi.fn(),
			columns: vi.fn(() => "columns-result"),
			size: vi.fn()
		};

		layout.calculate(1000, 600, 20);

		expect(layout.format(contents)).toBe("columns-result");
		expect(contents.columns).toHaveBeenCalledWith(1000, 600, 480, 20, "rtl");

		layout.flow("scrolled");
		expect(layout.format(contents, undefined, "horizontal")).toBeUndefined();
		expect(contents.size).toHaveBeenLastCalledWith(null, 600);

		expect(layout.format(contents, undefined, "vertical")).toBeUndefined();
		expect(contents.size).toHaveBeenLastCalledWith(1000, null);
	});
});

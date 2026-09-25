import { describe, expect, it, vi } from "vitest";
import DefaultViewManager from "../../src/managers/default";
import Layout from "../../src/layout";
import Section from "../../src/section";

function section(index, properties) {
	return new Section({
		idref: `section-${index}`,
		index,
		cfiBase: `/6/${index * 2 + 2}`,
		properties
	});
}

describe("mixed-layout section selection", () => {
	it("uses spine properties when entering fixed pages and restores text layout", () => {
		const manager = Object.create(DefaultViewManager.prototype);
		manager.settings = {
			spread: "auto",
			globalLayoutProperties: {
				layout: "reflowable",
				spread: "auto",
				orientation: "auto"
			}
		};
		manager.layout = new Layout({ layout: "reflowable", spread: "auto" });
		manager.updateLayout = vi.fn(() => manager.layout.calculate(1320, 900));

		manager.syncSectionLayout(section(3, ["rendition:layout-pre-paginated", "page-spread-left"]));
		expect(manager.layout.name).toBe("pre-paginated");
		expect(manager.layout.divisor).toBe(2);
		expect(manager.layout.width).toBe(660);

		manager.syncSectionLayout(section(4, []));
		expect(manager.layout.name).toBe("reflowable");
		expect(manager.layout.width).toBe(1320);
		expect(manager.settings.globalLayoutProperties.layout).toBe("reflowable");
		expect(manager.updateLayout).toHaveBeenCalledTimes(2);
	});

	it("keeps an explicit single-page preference across fixed sections", () => {
		const manager = Object.create(DefaultViewManager.prototype);
		manager.settings = {
			spread: "none",
			globalLayoutProperties: {
				layout: "reflowable",
				spread: "auto",
				orientation: "auto"
			}
		};
		manager.layout = new Layout({ layout: "reflowable", spread: "none" });
		manager.updateLayout = vi.fn(() => manager.layout.calculate(1320, 900));

		manager.syncSectionLayout(section(3, ["rendition:layout-pre-paginated", "rendition:spread-auto"]));
		expect(manager.layout.name).toBe("pre-paginated");
		expect(manager.layout.divisor).toBe(1);
	});
});

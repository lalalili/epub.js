import { describe, expect, it } from "vitest";
import scrollType, { createDefiner } from "../../src/utils/scrolltype";

describe("scrollType", () => {
	it("creates the RTL scroll definer structure", () => {
		const definer = createDefiner();

		expect(definer.dir).toBe("rtl");
		expect(definer.style.position).toBe("fixed");
		expect(definer.style.overflow).toBe("hidden");
		expect(definer.children).toHaveLength(1);
		expect(definer.children[0].children).toHaveLength(2);
		expect(definer.children[0].children[0].style.display).toBe("inline-block");
		expect(definer.children[0].children[1].style.width).toBe("1px");
	});

	it("returns a known RTL scroll type and removes its detector", () => {
		const before = document.body.children.length;
		const type = scrollType();

		expect(["default", "negative", "reverse"]).toContain(type);
		expect(document.body.children.length).toBe(before);
	});
});

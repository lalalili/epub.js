import { describe, expect, it } from "vitest";
import DisplayOptions from "../../src/displayoptions";

describe("browser display options parser", () => {
	function parse(markup) {
		return new DOMParser().parseFromString(markup, "application/xml");
	}

	it("parses iBooks display option values", () => {
		var options = new DisplayOptions(parse(`
			<display_options>
				<option name="interactive">true</option>
				<option name="fixed-layout">true</option>
				<option name="open-to-spread">false</option>
				<option name="orientation-lock">landscape-only</option>
			</display_options>
		`));

		expect(options.interactive).toBe("true");
		expect(options.fixedLayout).toBe("true");
		expect(options.openToSpread).toBe("false");
		expect(options.orientationLock).toBe("landscape-only");
	});

	it("leaves defaults when display options are missing", () => {
		var options = new DisplayOptions(parse("<metadata></metadata>"));

		expect(options.interactive).toBe("");
		expect(options.fixedLayout).toBe("");
		expect(options.openToSpread).toBe("");
		expect(options.orientationLock).toBe("");
	});

	it("clears parsed values on destroy", () => {
		var options = new DisplayOptions(parse(`
			<display_options>
				<option name="fixed-layout">true</option>
			</display_options>
		`));

		options.destroy();

		expect(options.fixedLayout).toBeUndefined();
		expect(options.interactive).toBeUndefined();
	});
});

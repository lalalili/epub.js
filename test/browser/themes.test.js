import { describe, expect, it } from "vitest";
import Themes from "../../src/themes";

describe("Themes", () => {
	function createContent() {
		var calls = [];
		return {
			calls,
			addClass(name) {
				calls.push(["addClass", name]);
			},
			addStylesheet(url) {
				calls.push(["addStylesheet", url]);
			},
			addStylesheetCss(css, name) {
				calls.push(["addStylesheetCss", css, name]);
			},
			addStylesheetRules(rules, name) {
				calls.push(["addStylesheetRules", rules, name]);
			},
			css(name, value, priority) {
				calls.push(["css", name, value, priority]);
			},
			removeClass(name) {
				calls.push(["removeClass", name]);
			}
		};
	}

	function createThemes(contents = [createContent()]) {
		var registered = [];
		var rendition = {
			hooks: {
				content: {
					register(callback) {
						registered.push(callback);
					}
				}
			},
			getContents() {
				return contents;
			}
		};
		return {
			contents,
			registered,
			rendition,
			themes: new Themes(rendition)
		};
	}

	it("registers content hooks when constructed", () => {
		var { registered } = createThemes();

		expect(registered).toHaveLength(2);
	});

	it("registers and injects rule themes", () => {
		var content = createContent();
		var { themes } = createThemes([content]);
		var rules = {
			body: {
				color: "purple"
			}
		};

		themes.register("night", rules);
		themes.select("night");
		themes.inject(content);

		expect(content.calls).toContainEqual(["addStylesheetRules", rules, "night"]);
		expect(content.calls).toContainEqual(["removeClass", "default"]);
		expect(content.calls).toContainEqual(["addClass", "night"]);
	});

	it("registers default URL and serialized CSS themes", () => {
		var content = createContent();
		var { themes } = createThemes([content]);

		themes.register("default.css");
		themes.registerCss("print", "body { color: black; }");
		themes.add("print", content);

		expect(content.calls).toContainEqual(["addStylesheet", new URL("default.css", window.location.href).href]);
		expect(content.calls).toContainEqual(["addStylesheetCss", "body { color: black; }", "print"]);
	});

	it("applies and removes overrides across contents", () => {
		var content = createContent();
		var { themes } = createThemes([content]);

		themes.override("font-size", "120%", true);
		themes.removeOverride("font-size");

		expect(content.calls).toContainEqual(["css", "font-size", "120%", true]);
		expect(content.calls).toContainEqual(["css", "font-size", undefined, undefined]);
	});

	it("applies stored overrides through the content hook", () => {
		var content = createContent();
		var { registered, themes } = createThemes([content]);

		themes.font("serif");
		registered[1](content);

		expect(content.calls).toContainEqual(["css", "font-family", "serif", true]);
	});

	it("clears references on destroy", () => {
		var { themes } = createThemes();

		themes.destroy();

		expect(themes.rendition).toBeUndefined();
		expect(themes._themes).toBeUndefined();
		expect(themes._overrides).toBeUndefined();
		expect(themes._current).toBeUndefined();
		expect(themes._injected).toBeUndefined();
	});
});

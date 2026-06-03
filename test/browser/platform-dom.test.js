import { describe, expect, it } from "vitest";
import {
	qs,
	qsa,
	qsp,
	querySelectorByType
} from "../../src/platform/dom";
import {
	qs as coreQs,
	qsa as coreQsa,
	qsp as coreQsp,
	querySelectorByType as coreQuerySelectorByType
} from "../../src/utils/core";

describe("browser DOM platform boundary", () => {
	function parse(markup) {
		return new DOMParser().parseFromString(markup, "application/xhtml+xml");
	}

	it("keeps legacy query helper exports aligned", () => {
		var doc = parse(`
			<html xmlns="http://www.w3.org/1999/xhtml">
				<body>
					<section id="one" data-kind="chapter nav">One</section>
					<section id="two" data-kind="chapter">Two</section>
				</body>
			</html>
		`);

		expect(qs(doc, "section").getAttribute("id")).toBe("one");
		expect(coreQs(doc, "section")).toBe(qs(doc, "section"));
		expect(qsa(doc, "section").length).toBe(2);
		expect(coreQsa(doc, "section").length).toBe(qsa(doc, "section").length);
		expect(qsp(doc, "section", { "data-kind": "nav" }).getAttribute("id")).toBe("one");
		expect(coreQsp(doc, "section", { "data-kind": "nav" })).toBe(qsp(doc, "section", { "data-kind": "nav" }));
	});

	it("keeps EPUB type lookup aligned with legacy core exports", () => {
		var doc = parse(`
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<nav epub:type="toc"><ol><li>TOC</li></ol></nav>
					<nav epub:type="landmarks"><ol><li>Landmarks</li></ol></nav>
				</body>
			</html>
		`);

		expect(querySelectorByType(doc, "nav", "toc").textContent).toContain("TOC");
		expect(coreQuerySelectorByType(doc, "nav", "toc")).toBe(querySelectorByType(doc, "nav", "toc"));
	});

	it("throws the legacy error when no query root is provided", () => {
		expect(function() {
			qs(null, "section");
		}).toThrow("No Element Provided");
	});
});

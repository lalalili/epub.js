import { describe, expect, it } from "vitest";
import Navigation from "../../src/navigation";

describe("Navigation", () => {
	function parseNavigation(markup) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(markup, "application/xhtml+xml");

		return new Navigation(doc);
	}

	it("gets nav items by href, bare id, and hash id", () => {
		var navigation = parseNavigation(`<?xml version="1.0" encoding="UTF-8"?>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<nav epub:type="toc">
						<ol>
							<li id="chapter-one">
								<a href="Text/chapter1.xhtml">Chapter 1</a>
							</li>
							<li id="chapter-two">
								<a href="Text/chapter2.xhtml">Chapter 2</a>
								<ol>
									<li id="chapter-two-part-one">
										<a href="Text/chapter2.xhtml#part-1">Part 1</a>
									</li>
								</ol>
							</li>
						</ol>
					</nav>
				</body>
			</html>`);

		expect(navigation.get("Text/chapter1.xhtml").id).toBe("chapter-one");
		expect(navigation.get("chapter-one").href).toBe("Text/chapter1.xhtml");
		expect(navigation.get("#chapter-one").href).toBe("Text/chapter1.xhtml");
		expect(navigation.get("#chapter-two-part-one").href).toBe("Text/chapter2.xhtml#part-1");
	});
});

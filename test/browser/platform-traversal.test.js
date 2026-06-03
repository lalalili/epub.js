import { describe, expect, it } from "vitest";
import {
	collectVisibleTextClientRects,
	createVisibleTextWalker,
	filterChildren,
	findChildren,
	getParentByTagName,
	indexOfElementNode,
	indexOfNode,
	indexOfTextNode,
	parents,
	sprint,
	treeWalker,
	walk
} from "../../src/platform/traversal";
import {
	filterChildren as coreFilterChildren,
	findChildren as coreFindChildren,
	getParentByTagName as coreGetParentByTagName,
	indexOfElementNode as coreIndexOfElementNode,
	indexOfNode as coreIndexOfNode,
	indexOfTextNode as coreIndexOfTextNode,
	parents as coreParents,
	sprint as coreSprint,
	treeWalker as coreTreeWalker,
	walk as coreWalk
} from "../../src/utils/core";

describe("browser DOM traversal platform boundary", () => {
	function parse(markup) {
		return new DOMParser().parseFromString(markup, "application/xhtml+xml");
	}

	it("keeps text traversal aligned with legacy core exports", () => {
		var doc = parse(`
			<html xmlns="http://www.w3.org/1999/xhtml">
				<body><p>One <span>Two</span></p><p>Three</p></body>
			</html>
		`);
		var platformText = [];
		var coreText = [];

		sprint(doc.body, function(node) {
			platformText.push(node.nodeValue.trim());
		});
		coreSprint(doc.body, function(node) {
			coreText.push(node.nodeValue.trim());
		});

		expect(platformText.filter(Boolean)).toEqual(["One", "Two", "Three"]);
		expect(coreText).toEqual(platformText);
	});

	it("keeps TreeWalker and recursive walk aligned with legacy exports", () => {
		var doc = parse("<root><item id=\"a\"><child id=\"b\" /></item><item id=\"c\" /></root>");
		var platformIds = [];
		var coreIds = [];
		var recursiveIds = [];

		treeWalker(doc.documentElement, function(node) {
			platformIds.push(node.getAttribute("id"));
		}, NodeFilter.SHOW_ELEMENT);
		coreTreeWalker(doc.documentElement, function(node) {
			coreIds.push(node.getAttribute("id"));
		}, NodeFilter.SHOW_ELEMENT);

		walk(doc.documentElement, function(node) {
			if (node.nodeType === 1 && node.getAttribute("id")) {
				recursiveIds.push(node.getAttribute("id"));
			}
		});

		expect(platformIds).toEqual(["a", "b", "c"]);
		expect(coreIds).toEqual(platformIds);
		expect(recursiveIds).toEqual(["a", "b", "c"]);
		expect(coreWalk(doc.documentElement, function(node) {
			return node.nodeType === 1 && node.getAttribute("id") === "b";
		})).toBe(true);
	});

	it("creates visible text walkers that reject hidden, empty, and short text nodes", () => {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = [
			"<p>Visible text</p>",
			"<p> A </p>",
			"<p> </p>",
			"<p style=\"display: none\">Hidden display</p>",
			"<p style=\"visibility: hidden\">Hidden visibility</p>",
			"<p><span>Nested visible</span></p>"
		].join("");
		document.body.appendChild(wrapper);

		try {
			var walker = createVisibleTextWalker(document, window, wrapper);
			var values = [];
			var node;

			while ((node = walker.nextNode())) {
				values.push(node.nodeValue.trim());
			}

			expect(values).toEqual(["Visible text", "Nested visible"]);
		} finally {
			wrapper.remove();
		}
	});

	it("collects visible text client rects with a configurable limit", () => {
		var wrapper = document.createElement("div");
		wrapper.style.cssText = "position: absolute; left: 0; top: 0; width: 300px; font-size: 16px; line-height: 20px;";
		wrapper.innerHTML = [
			"<p>First visible text</p>",
			"<p style=\"display: none\">Hidden text</p>",
			"<p>Second visible text</p>"
		].join("");
		document.body.appendChild(wrapper);

		try {
			var rects = collectVisibleTextClientRects(document, window, wrapper, {
				limit: 1
			});

			expect(rects).toHaveLength(1);
			expect(rects[0].width).toBeGreaterThan(0);
			expect(rects[0].height).toBeGreaterThan(0);
		} finally {
			wrapper.remove();
		}
	});

	it("keeps element child and parent helpers aligned with legacy exports", () => {
		var doc = parse("<root><group><item id=\"a\" /><item id=\"b\" /><note /></group></root>");
		var group = doc.getElementsByTagName("group")[0];
		var item = doc.getElementById("a");

		expect(findChildren(group).map(function(node) {
			return node.nodeName;
		})).toEqual(["item", "item", "note"]);
		expect(coreFindChildren(group).length).toBe(findChildren(group).length);
		expect(filterChildren(group, "item").length).toBe(2);
		expect(coreFilterChildren(group, "item").length).toBe(2);
		expect(filterChildren(group, "item", true).getAttribute("id")).toBe("a");
		expect(coreFilterChildren(group, "item", true)).toBe(filterChildren(group, "item", true));
		expect(getParentByTagName(item, "group")).toBe(group);
		expect(coreGetParentByTagName(item, "group")).toBe(group);
		expect(parents(item)).toEqual(coreParents(item));
	});

	it("keeps node index helpers aligned with legacy exports", () => {
		var doc = parse("<root><item id=\"a\" />text<item id=\"b\" /><note /></root>");
		var root = doc.documentElement;
		var firstItem = doc.getElementById("a");
		var secondItem = doc.getElementById("b");
		var textNode = root.childNodes[1];

		expect(indexOfElementNode(firstItem)).toBe(0);
		expect(indexOfElementNode(secondItem)).toBe(1);
		expect(indexOfTextNode(textNode)).toBe(0);
		expect(indexOfNode(secondItem, 1)).toBe(1);
		expect(coreIndexOfElementNode(secondItem)).toBe(indexOfElementNode(secondItem));
		expect(coreIndexOfTextNode(textNode)).toBe(indexOfTextNode(textNode));
		expect(coreIndexOfNode(secondItem, 1)).toBe(indexOfNode(secondItem, 1));
	});
});

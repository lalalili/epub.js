import { describe, expect, it } from "vitest";
import {
	borders,
	bounds,
	documentHeight,
	nodeBounds,
	windowBounds
} from "../../src/platform/layout";
import {
	borders as coreBorders,
	bounds as coreBounds,
	documentHeight as coreDocumentHeight,
	nodeBounds as coreNodeBounds,
	windowBounds as coreWindowBounds
} from "../../src/utils/core";

function createMeasuredElement() {
	var element = document.createElement("div");

	element.style.width = "100px";
	element.style.height = "50px";
	element.style.padding = "5px 7px";
	element.style.margin = "11px 13px";
	element.style.borderStyle = "solid";
	element.style.borderWidth = "2px 3px";
	document.body.appendChild(element);

	return element;
}

describe("browser layout platform boundary", function() {
	it("keeps legacy core element geometry helpers aligned", function() {
		var element = createMeasuredElement();

		try {
			expect(bounds(element)).toEqual({ width: 146, height: 86 });
			expect(coreBounds(element)).toEqual(bounds(element));
			expect(borders(element)).toEqual({ width: 46, height: 36 });
			expect(coreBorders(element)).toEqual(borders(element));
			expect(coreNodeBounds(element)).toEqual(nodeBounds(element));
		} finally {
			element.remove();
		}
	});

	it("keeps text node bounds aligned with the legacy core helper", function() {
		var element = document.createElement("span");
		var textNode = document.createTextNode("hello layout");

		element.style.display = "inline-block";
		element.style.fontSize = "20px";
		element.appendChild(textNode);
		document.body.appendChild(element);

		try {
			expect(coreNodeBounds(textNode)).toEqual(nodeBounds(textNode));
			expect(nodeBounds(textNode).width).toBeGreaterThan(0);
		} finally {
			element.remove();
		}
	});

	it("keeps legacy core window and document geometry helpers aligned", function() {
		var platformWindowBounds = windowBounds();

		expect(platformWindowBounds).toEqual({
			top: 0,
			left: 0,
			right: window.innerWidth,
			bottom: window.innerHeight,
			width: window.innerWidth,
			height: window.innerHeight
		});
		expect(coreWindowBounds()).toEqual(platformWindowBounds);
		expect(coreDocumentHeight()).toBe(documentHeight());
		expect(documentHeight()).toBeGreaterThan(0);
	});
});

import { afterEach, describe, expect, it } from "vitest";
import umdBundle from "../../dist/epub.js?raw";
import minifiedUmdBundle from "../../dist/epub.min.js?raw";

function installUmdBundle(source) {
	var script = document.createElement("script");

	window.JSZip = function JSZip() {};
	delete window.ePub;

	script.textContent = source;
	document.head.appendChild(script);
	script.remove();

	return window.ePub;
}

function assertUmdGlobalSurface(entryName, ePub) {
	expect(typeof ePub, `${entryName} global ePub must be callable`).toBe("function");
	expect(typeof ePub.VERSION, `${entryName} global ePub.VERSION must be exposed`).toBe("string");
	expect(typeof ePub.Book, `${entryName} global ePub.Book must be exposed`).toBe("function");
	expect(typeof ePub.Rendition, `${entryName} global ePub.Rendition must be exposed`).toBe("function");
	expect(typeof ePub.Contents, `${entryName} global ePub.Contents must be exposed`).toBe("function");
	expect(typeof ePub.CFI, `${entryName} global ePub.CFI must be exposed`).toBe("function");
	expect(typeof ePub.utils.uuid, `${entryName} global ePub.utils must expose legacy helpers`).toBe("function");
	expect(typeof ePub.utils.uuid(), `${entryName} global ePub.utils.uuid() must return a string`).toBe("string");
}

describe("browser UMD global entry", () => {
	afterEach(() => {
		delete window.ePub;
		delete window.JSZip;
	});

	it("exposes the unminified browser bundle as window.ePub", () => {
		assertUmdGlobalSurface("UMD", installUmdBundle(umdBundle));
	});

	it("exposes the minified browser bundle as window.ePub", () => {
		assertUmdGlobalSurface("minified UMD", installUmdBundle(minifiedUmdBundle));
	});
});

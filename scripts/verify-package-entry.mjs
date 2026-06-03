import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const expectedExports = [
	"Book",
	"Contents",
	"EpubCFI",
	"Layout",
	"Rendition",
	"default",
	"replaceBase",
	"replaceCanonical",
	"replaceLinks",
	"replaceMeta",
	"request",
	"substitute"
];

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function assertPackageFields() {
	assert(packageJson.main === "./dist/epub.cjs", "package main must point at dist/epub.cjs");
	assert(packageJson.module === "./dist/epub.mjs", "package module must point at dist/epub.mjs");
	assert(packageJson.browser === "./dist/epub.js", "package browser must point at dist/epub.js");
	assert(packageJson.types === "./types/index.d.ts", "package types must point at types/index.d.ts");

	assert(packageJson.exports["."].types === packageJson.types, "root export types must match package types");
	assert(packageJson.exports["."].import === packageJson.module, "root export import must match package module");
	assert(packageJson.exports["."].require === packageJson.main, "root export require must match package main");
	assert(packageJson.exports["."].default === packageJson.module, "root export default must match package module");
}

function assertEntrySurface(entryName, moduleExports) {
	assert(
		JSON.stringify(Object.keys(moduleExports).sort()) === JSON.stringify(expectedExports),
		`${entryName} exports must match the public root surface`
	);
	assert(typeof moduleExports.default === "function", `${entryName} default export must be callable`);
	assert(moduleExports.default.Book === moduleExports.Book, `${entryName} default.Book must match named Book`);
	assert(moduleExports.default.Rendition === moduleExports.Rendition, `${entryName} default.Rendition must match named Rendition`);
	assert(moduleExports.default.Contents === moduleExports.Contents, `${entryName} default.Contents must match named Contents`);
	assert(moduleExports.default.CFI === moduleExports.EpubCFI, `${entryName} default.CFI must match named EpubCFI`);
	assert(typeof moduleExports.default.VERSION === "string", `${entryName} default.VERSION must be exposed`);
	assert(typeof moduleExports.default.utils.uuid === "function", `${entryName} default.utils must expose legacy core helpers`);
	assert(typeof moduleExports.replaceBase === "function", `${entryName} named replaceBase must be exposed`);
	assert(typeof moduleExports.replaceCanonical === "function", `${entryName} named replaceCanonical must be exposed`);
	assert(typeof moduleExports.replaceLinks === "function", `${entryName} named replaceLinks must be exposed`);
	assert(typeof moduleExports.replaceMeta === "function", `${entryName} named replaceMeta must be exposed`);
	assert(typeof moduleExports.request === "function", `${entryName} named request must be exposed`);
	assert(typeof moduleExports.substitute === "function", `${entryName} named substitute must be exposed`);
}

assertPackageFields();

const esmExports = await import(path.join(root, "dist/epub.mjs"));
const cjsExports = require(path.join(root, "dist/epub.cjs"));

assertEntrySurface("ESM", esmExports);
assertEntrySurface("CJS", cjsExports);

console.log("Package entry contract verified.");

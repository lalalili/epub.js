import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const tempRoot = mkdtempSync(path.join(os.tmpdir(), "epubjs-packed-entry-"));
const packageRoot = path.join(tempRoot, "node_modules", packageJson.name);

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function copyPackedFile(filePath) {
	const source = path.join(root, filePath);
	const target = path.join(packageRoot, filePath);

	mkdirSync(path.dirname(target), { recursive: true });
	copyFileSync(source, target);
}

function parseNpmPackJson(stdout) {
	const output = stdout.trim();

	try {
		return JSON.parse(output);
	} catch {
		for (const jsonStart of findJsonArrayStarts(output)) {
			const jsonEnd = findJsonArrayEnd(output, jsonStart);

			if (jsonEnd === -1) {
				continue;
			}

			try {
				const candidate = JSON.parse(output.slice(jsonStart, jsonEnd + 1));

				if (Array.isArray(candidate)) {
					return candidate;
				}
			} catch {
				// Keep searching for the first parseable JSON array in noisy npm output.
			}
		}

		throw new Error("npm pack JSON payload was not found.");
	}
}

function findJsonArrayStarts(output) {
	const starts = [];

	for (let index = 0; index < output.length; index += 1) {
		if (output[index] === "[") {
			starts.push(index);
		}
	}

	return starts;
}

function findJsonArrayEnd(output, start) {
	let depth = 0;
	let inString = false;
	let escaped = false;

	for (let index = start; index < output.length; index += 1) {
		const character = output[index];

		if (inString) {
			if (escaped) {
				escaped = false;
			} else if (character === "\\") {
				escaped = true;
			} else if (character === "\"") {
				inString = false;
			}

			continue;
		}

		if (character === "\"") {
			inString = true;
		} else if (character === "[") {
			depth += 1;
		} else if (character === "]") {
			depth -= 1;

			if (depth === 0) {
				return index;
			}
		}
	}

	return -1;
}

const result = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
	cwd: root,
	encoding: "utf8",
	maxBuffer: 30 * 1024 * 1024
});

if (result.error) {
	console.error(result.error.message);
	process.exit(1);
}

if (result.status !== 0) {
	console.error(result.stderr || result.stdout);
	process.exit(result.status);
}

try {
	const packEntries = parseNpmPackJson(result.stdout);
	const packedFiles = packEntries[0]?.files || [];

	assert(packedFiles.length > 0, "npm pack dry-run must report files for package entry smoke");

	for (const file of packedFiles) {
		copyPackedFile(file.path);
	}

	const consumerScript = path.join(tempRoot, "consumer.mjs");

	writeFileSync(consumerScript, `
import { createRequire } from "node:module";
import epubDefault, { Book, Contents, EpubCFI, Layout, Rendition, replaceBase, replaceCanonical, replaceLinks, replaceMeta, request, substitute } from "epubjs";

const require = createRequire(import.meta.url);
const cjsExports = require("epubjs");
const packageJson = require("epubjs/package.json");

function assert(condition, message) {
\tif (!condition) {
\t\tthrow new Error(message);
\t}
}

function assertSurface(entryName, moduleExports) {
\tconst expectedExports = ["Book", "Contents", "EpubCFI", "Layout", "Rendition", "default", "replaceBase", "replaceCanonical", "replaceLinks", "replaceMeta", "request", "substitute"];
\tassert(
\t\tJSON.stringify(Object.keys(moduleExports).sort()) === JSON.stringify(expectedExports),
\t\tentryName + " exports must match the public root surface"
\t);
\tassert(typeof moduleExports.default === "function", entryName + " default export must be callable");
\tassert(moduleExports.default.Book === moduleExports.Book, entryName + " default.Book must match named Book");
\tassert(moduleExports.default.Rendition === moduleExports.Rendition, entryName + " default.Rendition must match named Rendition");
\tassert(moduleExports.default.Contents === moduleExports.Contents, entryName + " default.Contents must match named Contents");
\tassert(moduleExports.default.CFI === moduleExports.EpubCFI, entryName + " default.CFI must match named EpubCFI");
\tassert(typeof moduleExports.default.VERSION === "string", entryName + " default.VERSION must be exposed");
\tassert(typeof moduleExports.default.utils.uuid === "function", entryName + " default.utils must expose legacy core helpers");
\tassert(typeof moduleExports.replaceBase === "function", entryName + " named replaceBase must be exposed");
\tassert(typeof moduleExports.replaceCanonical === "function", entryName + " named replaceCanonical must be exposed");
\tassert(typeof moduleExports.replaceLinks === "function", entryName + " named replaceLinks must be exposed");
\tassert(typeof moduleExports.replaceMeta === "function", entryName + " named replaceMeta must be exposed");
\tassert(typeof moduleExports.request === "function", entryName + " named request must be exposed");
\tassert(typeof moduleExports.substitute === "function", entryName + " named substitute must be exposed");
}

assert(packageJson.name === ${JSON.stringify(packageJson.name)}, "package.json export must resolve from packed package");
assert(packageJson.version === ${JSON.stringify(packageJson.version)}, "package.json export version must match source package");
assert(typeof epubDefault === "function", "bare ESM default import must be callable");
assert(epubDefault.Book === Book, "bare ESM default.Book must match named Book");
assert(epubDefault.Rendition === Rendition, "bare ESM default.Rendition must match named Rendition");
assert(epubDefault.Contents === Contents, "bare ESM default.Contents must match named Contents");
assert(epubDefault.CFI === EpubCFI, "bare ESM default.CFI must match named EpubCFI");
assert(typeof Layout === "function", "bare ESM named Layout must be constructable");
assert(typeof replaceBase === "function", "bare ESM named replaceBase must be exposed");
assert(typeof replaceCanonical === "function", "bare ESM named replaceCanonical must be exposed");
assert(typeof replaceLinks === "function", "bare ESM named replaceLinks must be exposed");
assert(typeof replaceMeta === "function", "bare ESM named replaceMeta must be exposed");
assert(typeof request === "function", "bare ESM named request must be exposed");
assert(typeof substitute === "function", "bare ESM named substitute must be exposed");

assertSurface("bare CJS", cjsExports);
`);

	const consumerResult = spawnSync(process.execPath, [consumerScript], {
		cwd: tempRoot,
		encoding: "utf8",
		maxBuffer: 30 * 1024 * 1024
	});

	if (consumerResult.error) {
		console.error(consumerResult.error.message);
		process.exit(1);
	}

	if (consumerResult.status !== 0) {
		console.error(consumerResult.stderr || consumerResult.stdout);
		process.exit(consumerResult.status);
	}
} finally {
	rmSync(tempRoot, { recursive: true, force: true });
}

console.log("Packed package entry consumer smoke verified.");

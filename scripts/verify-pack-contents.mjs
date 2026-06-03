import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const npmIgnore = readFileSync(path.join(root, ".npmignore"), "utf8")
	.split(/\r?\n/)
	.map((line) => line.trim())
	.filter((line) => line && !line.startsWith("#"));
const requiredPaths = [
	"README.md",
	"PATCHLOG.md",
	"package.json",
	"dist/epub.cjs",
	"dist/epub.cjs.map",
	"dist/epub.js",
	"dist/epub.js.map",
	"dist/epub.min.js",
	"dist/epub.mjs",
	"dist/epub.mjs.map",
	"documentation/md/API.md",
	"lib/epub.js",
	"lib/index.js",
	"scripts/verify-docs-modernization.mjs",
	"scripts/verify-gate1-readiness.mjs",
	"scripts/verify-internal-boundaries.mjs",
	"scripts/verify-pack-contents.mjs",
	"scripts/verify-package-entry.mjs",
	"scripts/verify-packed-package-entry.mjs",
	"scripts/verify-release-gate.mjs",
	"scripts/verify-test-modernization.mjs",
	"scripts/verify-typescript-source-pipeline.mjs",
	"src/epub.ts",
	"src/index.ts",
	"types/index.d.ts",
	"typedoc.json",
	"typedoc.html.json",
	"vite.config.mjs",
	"vite.umd.config.mjs",
	"vitest.browser.config.mjs"
];
const forbiddenPatterns = [
	/^books\//,
	/^node_modules\//,
	/^test\//,
	/^\.vitest-attachments\//,
	/^test\/browser\/__screenshots__\//,
	/\.tgz$/
];
const requiredNpmIgnoreEntries = [
	"books",
	"test",
	".babelrc",
	".vitest-attachments"
];

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function normalizePackagePath(packagePath) {
	return packagePath.replace(/^\.\//, "");
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

let packEntries;

try {
	packEntries = JSON.parse(result.stdout);
} catch (error) {
	console.error("Failed to parse npm pack JSON output.");
	console.error(error.message);
	process.exit(1);
}

const pack = packEntries[0];
const packedPaths = new Set((pack.files || []).map((file) => file.path));
const requiredPackageEntryPaths = [
	packageJson.main,
	packageJson.module,
	packageJson.browser,
	packageJson.types,
	packageJson.exports["."].import,
	packageJson.exports["."].require,
	packageJson.exports["."].default
].map(normalizePackagePath);

for (const requiredEntry of requiredNpmIgnoreEntries) {
	assert(npmIgnore.includes(requiredEntry), `.npmignore must include ${requiredEntry}`);
}

for (const requiredPath of [...requiredPaths, ...requiredPackageEntryPaths]) {
	assert(packedPaths.has(requiredPath), `npm pack contents must include ${requiredPath}`);
}

for (const packedPath of packedPaths) {
	for (const forbiddenPattern of forbiddenPatterns) {
		assert(!forbiddenPattern.test(packedPath), `npm pack contents must not include ${packedPath}`);
	}
}

assert(pack.name === packageJson.name, "npm pack package name must match package.json");
assert(pack.version === packageJson.version, "npm pack package version must match package.json");
assert(pack.entryCount === packedPaths.size, "npm pack entry count must match the reported file list");
assert(packedPaths.size > 0, "npm pack contents must not be empty");

console.log(`Package tarball contents verified (${packedPaths.size} files).`);

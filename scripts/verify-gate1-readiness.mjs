import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const tsconfig = JSON.parse(readFileSync(path.join(root, "tsconfig.json"), "utf8"));
const typeTests = readFileSync(path.join(root, "types/epubjs-tests.ts"), "utf8");
const globalTypeTests = readFileSync(path.join(root, "types/global-namespace-tests.ts"), "utf8");
const publicApiTests = readFileSync(path.join(root, "test/browser/public-api.test.js"), "utf8");
const umdGlobalTests = readFileSync(path.join(root, "test/browser/umd-global.test.js"), "utf8");

const requiredScripts = {
	"build:modules": "vite build --config vite.config.mjs",
	"build:umd": "vite build --config vite.umd.config.mjs",
	"test:browser": "vitest run --config vitest.browser.config.mjs",
	"typecheck": "tsc -p tsconfig.json --noEmit",
	"verify:gate1-readiness": "node scripts/verify-gate1-readiness.mjs",
	"verify:package-entry": "node scripts/verify-package-entry.mjs",
	"verify:packed-package-entry": "node scripts/verify-packed-package-entry.mjs"
};

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function assertScript(name, expectedCommand) {
	assert(packageJson.scripts[name] === expectedCommand, `${name} script must be ${expectedCommand}`);
}

function assertFile(relativePath) {
	assert(existsSync(path.join(root, relativePath)), `${relativePath} must exist`);
}

for (const [scriptName, expectedCommand] of Object.entries(requiredScripts)) {
	assertScript(scriptName, expectedCommand);
}

assert(
	packageJson.scripts["verify:contracts"].includes("npm run verify:gate1-readiness"),
	"verify:contracts must include verify:gate1-readiness"
);
assert(
	packageJson.scripts["verify:release"].includes("npm run typecheck") &&
	packageJson.scripts["verify:release"].includes("npm run build") &&
	packageJson.scripts["verify:release"].includes("npm run verify:contracts") &&
	packageJson.scripts["verify:release"].includes("npm run test:browser"),
	"verify:release must include typecheck, build, contracts, and browser tests"
);

assert(packageJson.main === "./dist/epub.cjs", "package main must point at dist/epub.cjs");
assert(packageJson.module === "./dist/epub.mjs", "package module must point at dist/epub.mjs");
assert(packageJson.browser === "./dist/epub.js", "package browser must point at dist/epub.js");
assert(packageJson.types === "./types/index.d.ts", "package types must point at types/index.d.ts");
assert(packageJson.exports["."].types === packageJson.types, "root export types must match package types");
assert(packageJson.exports["."].import === packageJson.module, "root export import must match package module");
assert(packageJson.exports["."].require === packageJson.main, "root export require must match package main");
assert(packageJson.exports["."].default === packageJson.module, "root export default must match package module");

assertFile("vite.config.mjs");
assertFile("vite.umd.config.mjs");
assertFile("vitest.browser.config.mjs");
assertFile("types/index.d.ts");
assertFile("types/epub.d.ts");
assertFile("types/epubjs-tests.ts");
assertFile("types/global-namespace-tests.ts");
assertFile("test/browser/public-api.test.js");
assertFile("test/browser/umd-global.test.js");

assert(tsconfig.include.includes("src/**/*.ts"), "tsconfig must include TypeScript source files");
assert(tsconfig.include.includes("types/**/*.d.ts"), "tsconfig must include declaration files");
assert(tsconfig.include.includes("types/**/*-tests.ts"), "tsconfig must include type tests");

assert(typeTests.includes("type PublicRootAssertions"), "type tests must assert the public root surface");
assert(typeTests.includes("type CoreClassAssertions"), "type tests must assert the core class surface");
assert(typeTests.includes("type NavigationAssertions"), "type tests must assert the Navigation public surface");
assert(typeTests.includes("new Navigation(legacyNavItems)"), "type tests must cover legacy JSON Navigation construction");
assert(typeTests.includes("legacyNavigation.get()"), "type tests must cover Navigation get() toc overload");
assert(typeTests.includes("legacyNavigation.landmark()"), "type tests must cover Navigation landmark() list overload");
assert(typeTests.includes("type SectionAssertions"), "type tests must assert the Section public surface");
assert(typeTests.includes("new Section(spineItem)"), "type tests must cover Section construction without explicit hooks");
assert(typeTests.includes("section.search(\"Text\")"), "type tests must cover Section search result typing");
assert(typeTests.includes("type SpineAssertions"), "type tests must assert the Spine public surface");
assert(typeTests.includes("spine.unpack(spinePackage"), "type tests must cover Spine unpack package typing");
assert(typeTests.includes("spine.remove(spineSection)"), "type tests must cover Spine remove result typing");
assert(typeTests.includes("type ArchiveAssertions"), "type tests must assert the Archive public surface");
assert(typeTests.includes("archive.createUrl(\"/OPS/images/cover.jpg\")"), "type tests must cover Archive createUrl optional options typing");
assert(typeTests.includes("archive.handleResponse(\"{\\\"ok\\\":true}\", \"json\")"), "type tests must cover Archive handleResponse typing");
assert(typeTests.includes("type PackagingAssertions"), "type tests must assert the Packaging public surface");
assert(typeTests.includes("new Packaging()"), "type tests must cover Packaging construction without a document");
assert(typeTests.includes("packaging.load(packagingJson)"), "type tests must cover Packaging JSON manifest loading");
assert(typeTests.includes("type ResourcesAssertions"), "type tests must assert the Resources public surface");
assert(typeTests.includes("new Resources(resourceManifest, resourceOptions)"), "type tests must cover Resources options typing");
assert(typeTests.includes("resources.get(\"Images/cover.jpg\")"), "type tests must cover Resources get replacement typing");
assert(typeTests.includes("type StoreAssertions"), "type tests must assert the Store public surface");
assert(typeTests.includes("new Store(\"epubjs-type-store\", storeRequest, storeResolver)"), "type tests must cover Store constructor typing");
assert(typeTests.includes("store.createUrl(\"/OPS/images/cover.jpg\", storeUrlOptions)"), "type tests must cover Store createUrl optional options typing");
assert(typeTests.includes("RequestMethod"), "type tests must assert request method typing");
assert(typeTests.includes("InstanceType<typeof ePub.utils.defer"), "type tests must assert generic defer typing");

assert(globalTypeTests.includes("const book = ePub("), "global namespace tests must cover callable ePub");
assert(globalTypeTests.includes("ePub.VERSION"), "global namespace tests must cover ePub.VERSION");
assert(globalTypeTests.includes("new ePub.CFI()"), "global namespace tests must cover static CFI constructor");

assert(publicApiTests.includes("ePub.Book"), "browser public API tests must cover root static Book");
assert(publicApiTests.includes("ePub.utils"), "browser public API tests must cover legacy utils facade");
assert(umdGlobalTests.includes("window.ePub"), "UMD browser tests must cover window.ePub");

console.log("Gate 1 package entry and typed public API readiness verified.");

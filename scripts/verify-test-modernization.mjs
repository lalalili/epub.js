import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const browserConfig = readFileSync(path.join(root, "vitest.browser.config.mjs"), "utf8");
const forbiddenDependencyPattern = /^(karma|karma-|mocha$|raw-loader$)/;
const forbiddenScriptPattern = /\bkarma\b|\bmocha\b/;
const forbiddenWebpackOnlyDevDependencies = [
	"babel-loader",
	"terser-webpack-plugin",
	"webpack",
	"webpack-cli",
	"webpack-dev-server"
];
const forbiddenLegacyScripts = [
	"build:webpack",
	"legacy",
	"productionLegacy"
];

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function assertNoForbiddenPackageEntries(entries, sectionName) {
	const forbiddenEntries = Object.keys(entries || {}).filter((name) => forbiddenDependencyPattern.test(name));

	assert(
		forbiddenEntries.length === 0,
		`${sectionName} must not include legacy Karma/Mocha dependencies: ${forbiddenEntries.join(", ")}`
	);
}

function assertScripts() {
	for (const [name, command] of Object.entries(packageJson.scripts || {})) {
		assert(
			!forbiddenScriptPattern.test(command),
			`script "${name}" must not call the legacy Karma/Mocha runners`
		);
	}

	for (const scriptName of forbiddenLegacyScripts) {
		assert(
			!(scriptName in (packageJson.scripts || {})),
			`script "${scriptName}" must stay removed with the legacy webpack build path`
		);
	}

	assert(packageJson.scripts.test === "npm run test:browser", "npm test must run the Vitest Browser gate");
	assert(packageJson.scripts["test:browser"], "test:browser script must exist");
	assert(packageJson.scripts["test:legacy"], "test:legacy compatibility script must exist");
}

function assertNoLegacyWebpackPath() {
	for (const dependencyName of forbiddenWebpackOnlyDevDependencies) {
		assert(
			!(dependencyName in (packageJson.devDependencies || {})),
			`devDependencies must not include legacy webpack-only dependency ${dependencyName}`
		);
	}

	assert(!existsSync(path.join(root, "webpack.config.js")), "legacy webpack.config.js must stay removed");
	assert(!existsSync(path.join(root, "examples", "legacy.html")), "legacy webpack example must stay removed");
}

function assertTestLayout() {
	const rootTestFiles = readdirSync(path.join(root, "test"), { withFileTypes: true })
		.filter((entry) => entry.isFile() && /\.(js|cjs|mjs)$/.test(entry.name))
		.map((entry) => entry.name);

	assert(
		rootTestFiles.length === 0,
		`legacy root-level test files must stay removed: ${rootTestFiles.join(", ")}`
	);

	assert(
		browserConfig.includes('include: ["test/browser/**/*.test.js"]'),
		"Vitest browser config must keep test/browser/**/*.test.js as the browser test entry"
	);
}

assertNoForbiddenPackageEntries(packageJson.dependencies, "dependencies");
assertNoForbiddenPackageEntries(packageJson.devDependencies, "devDependencies");
assertScripts();
assertNoLegacyWebpackPath();
assertTestLayout();

console.log("Vitest-only test modernization contract verified.");

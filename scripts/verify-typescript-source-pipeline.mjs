import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const babelConfig = readFileSync(path.join(root, ".babelrc.json"), "utf8");
const tsconfig = JSON.parse(readFileSync(path.join(root, "tsconfig.json"), "utf8"));
const compatSourceDirectory = path.join(root, "src/compat");
const coreSourceDirectory = path.join(root, "src/core");
const platformSourceDirectory = path.join(root, "src/platform");

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

assert(
	"@babel/preset-typescript" in (packageJson.devDependencies || {}),
	"package devDependencies must include @babel/preset-typescript"
);
assert(babelConfig.includes('"@babel/preset-typescript"'), ".babelrc.json must include @babel/preset-typescript");
assert(
	packageJson.scripts.compile === 'babel --extensions ".js,.ts" -d lib/ src/',
	"compile script must compile both JavaScript and TypeScript source files"
);
assert(
	packageJson.scripts.watch === 'babel --extensions ".js,.ts" --watch -d lib/ src/',
	"watch script must compile both JavaScript and TypeScript source files"
);
assert(tsconfig.include.includes("src/**/*.ts"), "tsconfig must include TypeScript source files");

function assertTypeScriptBoundary(sourceDirectory, boundaryName, expectedTypeScriptFiles) {
	const files = readdirSync(sourceDirectory).filter((entry) => entry.endsWith(".js") || entry.endsWith(".ts"));
	const javaScriptFiles = files.filter((entry) => entry.endsWith(".js"));

	assert(
		javaScriptFiles.length === 0,
		`${boundaryName} must stay on TypeScript source files only: ${javaScriptFiles.join(", ")}`
	);
	assert(
		expectedTypeScriptFiles.every((entry) => files.includes(entry)),
		`${boundaryName} must include converted TypeScript boundaries: ${expectedTypeScriptFiles.join(", ")}`
	);
}

assertTypeScriptBoundary(coreSourceDirectory, "src/core", [
	"async.ts",
	"collections.ts",
	"types.ts"
]);
assertTypeScriptBoundary(compatSourceDirectory, "src/compat", [
	"css.ts",
	"range.ts"
]);
assertTypeScriptBoundary(platformSourceDirectory, "src/platform", [
	"blob.ts",
	"browser.ts",
	"dom.ts",
	"layout.ts",
	"parser.ts",
	"traversal.ts"
]);

console.log("TypeScript source pipeline contract verified.");

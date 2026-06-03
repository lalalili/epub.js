import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const packageLock = JSON.parse(readFileSync(path.join(root, "package-lock.json"), "utf8"));
const typedocConfig = JSON.parse(readFileSync(path.join(root, "typedoc.json"), "utf8"));
const typedocHtmlConfig = JSON.parse(readFileSync(path.join(root, "typedoc.html.json"), "utf8"));
const generatedMarkdown = readFileSync(path.join(root, "documentation/md/API.md"), "utf8");

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function assertPackageDocsToolchain() {
	assert(packageJson.scripts.docs === "npm run docs:md", "docs script must run the TypeDoc markdown gate");
	assert(packageJson.scripts["docs:md"] === "typedoc --options typedoc.json", "docs:md must use typedoc.json");
	assert(packageJson.scripts["docs:html"] === "typedoc --options typedoc.html.json", "docs:html must use typedoc.html.json");
	assert(!("documentation" in (packageJson.devDependencies || {})), "documentation.js must stay removed from devDependencies");
	assert("typedoc" in (packageJson.devDependencies || {}), "typedoc must stay installed");
	assert("typedoc-plugin-markdown" in (packageJson.devDependencies || {}), "typedoc-plugin-markdown must stay installed");
}

function assertPackageLockDocsToolchain() {
	assert(!packageLock.packages["node_modules/documentation"], "package-lock must not include documentation.js");
	assert(packageLock.packages["node_modules/typedoc"], "package-lock must include typedoc");
	assert(packageLock.packages["node_modules/typedoc-plugin-markdown"], "package-lock must include typedoc-plugin-markdown");
}

function assertTypeDocConfig(config, expectedOut) {
	assert(
		JSON.stringify(config.entryPoints) === JSON.stringify(["types/index.d.ts"]),
		`${expectedOut} docs must use the public declaration entry point`
	);
	assert(config.tsconfig === "tsconfig.json", `${expectedOut} docs must use the repo TypeScript config`);
	assert(config.out === expectedOut, `${expectedOut} docs output path must stay stable`);
	assert(config.readme === "none", `${expectedOut} docs must not depend on README injection`);
	assert(config.disableSources === true, `${expectedOut} docs must not expose source links`);
	assert(config.cleanOutputDir === true, `${expectedOut} docs must clean stale output`);
}

function assertMarkdownDocs() {
	assert(generatedMarkdown.includes("# epubjs"), "documentation/md/API.md must be generated for the epubjs API");
	assert(generatedMarkdown.includes("Book"), "documentation/md/API.md must include the public Book surface");
	assert(generatedMarkdown.includes("request"), "documentation/md/API.md must include the public request export");
}

assertPackageDocsToolchain();
assertPackageLockDocsToolchain();
assertTypeDocConfig(typedocConfig, "documentation/md");
assert(
	JSON.stringify(typedocConfig.plugin) === JSON.stringify(["typedoc-plugin-markdown"]),
	"markdown docs must use typedoc-plugin-markdown"
);
assertTypeDocConfig(typedocHtmlConfig, "documentation/html");
assert(!existsSync(path.join(root, "documentation.yml")), "obsolete documentation.yml must stay removed");
assertMarkdownDocs();

console.log("TypeDoc documentation modernization contract verified.");

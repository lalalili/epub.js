import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoots = [
	path.join(root, "src"),
	path.join(root, "lib")
];
const allowedLegacyCoreImporters = new Set([
	"src/epub.ts",
	"src/utils/core.js",
	"lib/epub.js",
	"lib/utils/core.js"
]);
const legacyCoreImportPattern = /from\s+["'][^"']*utils\/core["']|require\(["'][^"']*utils\/core["']\)/;
const allowedLegacyCoreTypeExporters = new Set([
	"src/index.ts"
]);
const legacyCoreTypeExportPattern = /export\s+type\s+\{[\s\S]*?\}\s+from\s+["'][^"']*utils\/core["']/;
const runtimeLegacyCoreImportPattern = /import\s+(?!type\s)[\s\S]*?from\s+["'][^"']*utils\/core["']|export\s+(?!type\s)[\s\S]*?from\s+["'][^"']*utils\/core["']|require\(["'][^"']*utils\/core["']\)/;
const publicTypeRoots = [
	path.join(root, "types")
];
const forbiddenPublicTypeSurfacePattern = /rendering\/pagination|VerticalRlRaw(?:Left|Right)Snap|Raw(?:Left|Right)Snap(?:Rect|Shift)|getVerticalRlRaw(?:Left|Right)Snap|SnapShiftAggregate/;
const renderingPaginationImportPattern = /from\s+["'][^"']*rendering\/pagination["']|require\(["'][^"']*rendering\/pagination["']\)/;
const renderingSplitModules = [
	"boundary-mask",
	"edge-mask",
	"logical-page",
	"page-metrics",
	"raw-left-snap",
	"raw-right-snap"
];
const paginationFacadeImplementationPattern = /\bfunction\b|=>|\bclass\s+/;
const requiredRenderingPaginationImporters = [
	"src/managers/default/index.ts",
	"lib/managers/default/index.js"
];
const forbiddenRenderingPaginationImporters = [
	"src/index.ts",
	"src/epub.ts",
	"lib/index.js",
	"lib/epub.js"
];

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function collectSourceFiles(directory) {
	const files = [];

	for (const entry of readdirSync(directory)) {
		const fullPath = path.join(directory, entry);
		const stats = statSync(fullPath);

		if (stats.isDirectory()) {
			files.push(...collectSourceFiles(fullPath));
		} else if (entry.endsWith(".js") || entry.endsWith(".ts")) {
			files.push(fullPath);
		}
	}

	return files;
}

const violations = sourceRoots.flatMap((directory) => collectSourceFiles(directory))
	.map((filePath) => path.relative(root, filePath).replace(/\\/g, "/"))
	.filter((relativePath) => !allowedLegacyCoreImporters.has(relativePath))
	.filter((relativePath) => {
		const source = readFileSync(path.join(root, relativePath), "utf8");
		const sourceWithoutAllowedTypeExports = allowedLegacyCoreTypeExporters.has(relativePath)
			? source.replace(legacyCoreTypeExportPattern, "")
			: source;

		return legacyCoreImportPattern.test(sourceWithoutAllowedTypeExports) ||
			runtimeLegacyCoreImportPattern.test(sourceWithoutAllowedTypeExports);
	});

assert(
	violations.length === 0,
	`internal source and generated lib files must not import legacy utils/core facade: ${violations.join(", ")}`
);

const publicTypeViolations = publicTypeRoots.flatMap((directory) => collectSourceFiles(directory))
	.map((filePath) => path.relative(root, filePath).replace(/\\/g, "/"))
	.filter((relativePath) => forbiddenPublicTypeSurfacePattern.test(readFileSync(path.join(root, relativePath), "utf8")));

assert(
	publicTypeViolations.length === 0,
	`internal rendering pagination snap helpers must not leak into public declaration files: ${publicTypeViolations.join(", ")}`
);

const missingRenderingPaginationImporters = requiredRenderingPaginationImporters
	.filter((relativePath) => !renderingPaginationImportPattern.test(readFileSync(path.join(root, relativePath), "utf8")));

assert(
	missingRenderingPaginationImporters.length === 0,
	`default managers must keep rendering pagination helpers as internal imports: ${missingRenderingPaginationImporters.join(", ")}`
);

const rootRenderingPaginationImporters = forbiddenRenderingPaginationImporters
	.filter((relativePath) => renderingPaginationImportPattern.test(readFileSync(path.join(root, relativePath), "utf8")));

assert(
	rootRenderingPaginationImporters.length === 0,
	`package root entries must not import internal rendering pagination helpers: ${rootRenderingPaginationImporters.join(", ")}`
);

const missingRenderingSplitModules = renderingSplitModules.flatMap((moduleName) => [
	`src/rendering/${moduleName}.ts`,
	`lib/rendering/${moduleName}.js`
]).filter((relativePath) => {
	try {
		statSync(path.join(root, relativePath));
		return false;
	} catch {
		return true;
	}
});

assert(
	missingRenderingSplitModules.length === 0,
	`rendering pagination split modules must exist in source and generated lib: ${missingRenderingSplitModules.join(", ")}`
);

const paginationFacadeSource = readFileSync(path.join(root, "src/rendering/pagination.ts"), "utf8");
assert(
	!paginationFacadeImplementationPattern.test(paginationFacadeSource),
	"src/rendering/pagination.ts must remain a re-export facade without local function or class implementations"
);

const paginationFacadeLib = readFileSync(path.join(root, "lib/rendering/pagination.js"), "utf8");
const missingCompiledSplitImports = renderingSplitModules
	.filter((moduleName) => !paginationFacadeLib.includes(`require("./${moduleName}")`));

assert(
	missingCompiledSplitImports.length === 0,
	`lib/rendering/pagination.js must re-export every rendering split module: ${missingCompiledSplitImports.join(", ")}`
);

console.log("Internal source boundary contract verified.");

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baselinePath = path.join(root, "eslint-baseline.json");
const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));

const result = spawnSync(
	"npx",
	["eslint", "-c", ".eslintrc.js", "src", "--format", "json"],
	{
		cwd: root,
		encoding: "utf8",
		maxBuffer: 30 * 1024 * 1024
	}
);

if (result.error) {
	console.error(result.error.message);
	process.exit(1);
}

if (!result.stdout.trim()) {
	console.log("ESLint baseline: 0 errors, 0 warnings.");
	process.exit(0);
}

let report;

try {
	report = JSON.parse(result.stdout);
} catch (error) {
	console.error("Failed to parse ESLint JSON output.");
	console.error(error.message);
	process.exit(1);
}

const totals = report.reduce(
	(counts, fileReport) => {
		counts.errors += fileReport.errorCount;
		counts.warnings += fileReport.warningCount;
		return counts;
	},
	{ errors: 0, warnings: 0 }
);

console.log(
	`ESLint baseline: ${totals.errors}/${baseline.maxErrors} errors, ` +
		`${totals.warnings}/${baseline.maxWarnings} warnings.`
);

if (totals.errors > baseline.maxErrors || totals.warnings > baseline.maxWarnings) {
	console.error("ESLint baseline exceeded. Fix the new lint debt or lower the existing baseline after cleanup.");
	process.exit(1);
}

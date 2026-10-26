import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export function readLintReport(result) {
    if (result.error || result.status !== 0) {
        throw new Error(
            result.error?.message || result.stderr || `Lint exited with status ${result.status}`,
        );
    }
    const report = JSON.parse(result.stdout);
    if (
        !Number.isInteger(report.number_of_files) ||
        report.number_of_files < 1 ||
        !Array.isArray(report.diagnostics)
    ) {
        throw new Error("Lint must scan source files and return diagnostics.");
    }
    if (report.diagnostics.some(({ severity }) => severity !== "warning" && severity !== "error")) {
        throw new Error("Unknown lint diagnostic severity.");
    }
    return report;
}

export function runLint() {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
    const report = readLintReport(
        spawnSync("pnpm", ["exec", "vp", "lint", "src", "--format", "json", "--threads", "2"], {
            cwd: root,
            encoding: "utf8",
            maxBuffer: 30 * 1024 * 1024,
        }),
    );
    const sourceFiles = readdirSync(path.join(root, "src"), {
        recursive: true,
        withFileTypes: true,
    }).filter((entry) => entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name));
    if (report.number_of_files !== sourceFiles.length) {
        throw new Error(
            `Lint scanned ${report.number_of_files} files; expected ${sourceFiles.length} source files.`,
        );
    }
    for (const diagnostic of report.diagnostics) {
        console.error(
            `${diagnostic.filename}: ${diagnostic.severity}: ${diagnostic.code}: ${diagnostic.message}`,
        );
    }
    const errors = report.diagnostics.filter(({ severity }) => severity === "error").length;
    const warnings = report.diagnostics.filter(({ severity }) => severity === "warning").length;
    console.log(`Lint: ${report.number_of_files} files, ${errors} errors, ${warnings} warnings.`);
    const baseline = JSON.parse(readFileSync(path.join(root, "eslint-baseline.json"), "utf8"));
    const unmatched = compareWarnings(report, baseline);
    if (unmatched.length) {
        console.error("Lint findings differ from the recorded legacy warnings:", unmatched);
    }
    console.log(
        `Recorded legacy warnings: ${warnings}. Strict zero-warning qualification: ${warnings === 0 ? "passed" : "not passed"}.`,
    );
    return errors === 0 && unmatched.length === 0 ? 0 : 1;
}

export function compareWarnings(report, baseline) {
    if (baseline.version !== 2 || !Array.isArray(baseline.warnings)) {
        throw new Error("Expected an explicit version 2 warning inventory.");
    }
    const key = ({ filename, code, message }) => JSON.stringify([filename, code, message]);
    const actual = report.diagnostics
        .filter(({ severity }) => severity === "warning")
        .map(key)
        .sort();
    const expected = baseline.warnings.map(key).sort();
    return actual
        .filter((value, index) => value !== expected[index])
        .concat(expected.filter((value, index) => value !== actual[index]));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        process.exitCode = runLint();
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}

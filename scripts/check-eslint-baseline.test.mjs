import assert from "node:assert/strict";
import { test } from "node:test";
import { readLintReport, compareWarnings } from "./check-eslint-baseline.mjs";

const success = { status: 0, stdout: JSON.stringify({ number_of_files: 67, diagnostics: [] }) };

test("accepts a successful source scan", () => {
    assert.equal(readLintReport(success).number_of_files, 67);
});

const warning = { filename: "src/example.ts", code: "typescript(no-floating-promises)", message: "Review promise ownership", severity: "warning" };
test("accepts only the exact warning inventory", () => {
    assert.deepEqual(compareWarnings({ diagnostics: [warning] }, { version: 2, warnings: [warning] }), []);
    assert.notDeepEqual(compareWarnings({ diagnostics: [{ ...warning, filename: "src/new.ts" }] }, { version: 2, warnings: [warning] }), []);
    assert.notDeepEqual(compareWarnings({ diagnostics: [warning, warning] }, { version: 2, warnings: [warning] }), []);
    assert.notDeepEqual(compareWarnings({ diagnostics: [] }, { version: 2, warnings: [warning] }), []);
    assert.throws(() => compareWarnings({ diagnostics: [] }, { maxWarnings: 606 }));
});

for (const [name, result] of Object.entries({
    "tool failure with empty output": { status: 2, stdout: "", stderr: "No files found" },
    "tool failure with valid output": { ...success, status: 2 },
    "missing executable": { error: new Error("ENOENT") },
    "empty output": { status: 0, stdout: "" },
    "malformed output": { status: 0, stdout: "not JSON" },
    "empty scan": { status: 0, stdout: JSON.stringify({ number_of_files: 0, diagnostics: [] }) },
    "missing diagnostics": { status: 0, stdout: JSON.stringify({ number_of_files: 67 }) },
    "unknown severity": { status: 0, stdout: JSON.stringify({ number_of_files: 67, diagnostics: [{ severity: "unknown" }] }) },
})) {
    test(`rejects ${name}`, () => assert.throws(() => readLintReport(result)));
}

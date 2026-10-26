import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";

const root = new URL("../", import.meta.url);
const require = createRequire(new URL("package.json", root));
const manifest = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
assert.equal(process.versions.node, readFileSync(new URL(".node-version", root), "utf8").trim());
assert.equal(
    manifest.packageManager,
    `pnpm@${execFileSync("pnpm", ["--version"], { encoding: "utf8" }).trim()}`,
);
const plusPath = require.resolve("vite-plus/package.json");
const plusRequire = createRequire(plusPath);
const plus = JSON.parse(readFileSync(plusPath, "utf8"));
const corePath = realpathSync(require.resolve("vite/package.json"));
const core = JSON.parse(readFileSync(corePath, "utf8"));
assert.equal(core.name, "@voidzero-dev/vite-plus-core");
assert.equal(core.version, plus.version);
assert.equal(realpathSync(plusRequire.resolve("vite/package.json")), corePath);
const runner = realpathSync(plusRequire.resolve("vitest/package.json"));
assert.equal(realpathSync(require.resolve("vitest/package.json")), runner);
const providerRequire = createRequire(require.resolve("@vitest/browser-playwright/package.json"));
assert.equal(realpathSync(providerRequire.resolve("vitest/package.json")), runner);
assert.equal(JSON.parse(readFileSync(runner, "utf8")).version, "5.0.5");
console.log(
    `Engine toolchain verified: Node ${process.versions.node}, ${manifest.packageManager}, Vite+ ${plus.version}; one Vitest runner`,
);

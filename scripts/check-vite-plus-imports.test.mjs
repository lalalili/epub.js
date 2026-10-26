import assert from "node:assert/strict";
import { test } from "node:test";
import { inspectModuleImports } from "./check-vite-plus-imports.mjs";

test("checks TypeScript imports in Vue scripts", () => {
    assert.equal(
        inspectModuleImports('type Test = import("vitest").Test;', "/fixture/Reader.vue").length,
        1,
    );
});

for (const source of [
    'import { defineConfig } from "vite";',
    'import { test } from "vitest";',
    'export * from "vitest/config";',
    'const browser = await import("@vitest/browser/context");',
    'type Test = import("vitest").Test;',
    'import { playwright } from "@vitest/browser-playwright";',
]) {
    test(`rejects ${source}`, () => {
        assert.equal(inspectModuleImports(source, "/fixture/vite.config.ts").length, 1);
    });
}

for (const source of [
    'import { defineConfig } from "vite-plus";',
    'import { test } from "vite-plus/test";',
    'const browser = await import("vite-plus/test/browser/context");',
    'type Test = import("vite-plus/test").Test;',
    'import pkg from "vitest/package.json";',
    'const example = "import from vitest";',
    '// import { test } from "vitest";',
]) {
    test(`accepts ${source}`, () => {
        assert.deepEqual(inspectModuleImports(source, "/fixture/vite.config.ts"), []);
    });
}

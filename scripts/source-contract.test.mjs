import assert from "node:assert/strict";
import { test } from "node:test";
import { sourceIncludes } from "./source-contract.mjs";

test("typed bridges remain required across formatting changes", () => {
    const expected = "const Defer = defer as unknown as { new<T = unknown>(): DeferredLike<T>; }";
    assert.equal(
        sourceIncludes(
            "const Defer = defer as unknown as {\n new <T = unknown>(): DeferredLike<T>\n };",
            expected,
        ),
        true,
    );
    assert.equal(sourceIncludes("const Defer = defer as any;", expected), false);
    assert.equal(
        sourceIncludes(
            "const Defer = defer as unknown as { new<T = any>(): DeferredLike<T> }",
            expected,
        ),
        false,
    );
});

test("method types and arguments cannot disappear", () => {
    assert.equal(
        sourceIncludes("snap(howMany = 0): Promise<void> {}", "snap(howMany=0): Promise<void>"),
        true,
    );
    assert.equal(
        sourceIncludes("snap(): Promise<void> {}", "snap(howMany=0): Promise<void>"),
        false,
    );
    assert.equal(
        sourceIncludes("snap(howMany=0): any {}", "snap(howMany=0): Promise<void>"),
        false,
    );
});

test("ordinary substring and array checks keep their original behavior", () => {
    assert.equal(sourceIncludes("import from 'vite-plus/test'", "vite-plus/test"), true);
    assert.equal(sourceIncludes(["src/**/*.ts"], "src/**/*.ts"), true);
    assert.equal(sourceIncludes(["src/**/*.js"], "src/**/*.ts"), false);
});

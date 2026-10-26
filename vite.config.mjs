import { defineConfig } from "vite-plus";

export default defineConfig({
    fmt: {
        ignorePatterns: ["dist/**", "lib/**", "documentation/**", "books/**", "test/fixtures/**"],
    },
    lint: {
        jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
        rules: {
            "vite-plus/prefer-vite-plus-imports": "error",
            // The existing non-strict TypeScript contract cannot run this rule.
            "typescript/no-useless-default-assignment": "off",
        },
        options: { typeAware: true, typeCheck: true },
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            entry: "src/index.ts",
            formats: ["es", "cjs"],
            fileName(format) {
                return format === "es" ? "epub.mjs" : "epub.cjs";
            },
        },
        rollupOptions: {
            output: {
                exports: "named",
            },
        },
    },
});

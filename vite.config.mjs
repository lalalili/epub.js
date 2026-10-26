import { defineConfig } from "vite-plus";

export default defineConfig({
    fmt: {
        tabWidth: 4,
        useTabs: false,
        overrides: [{ files: ["*.yaml"], options: { tabWidth: 2 } }],
        ignorePatterns: ["dist/**", "lib/**", "documentation/**", "books/**", "test/fixtures/**"],
    },
    lint: {
        rules: {
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

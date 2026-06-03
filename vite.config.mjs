import { defineConfig } from "vite";

export default defineConfig({
	build: {
		outDir: "dist",
		emptyOutDir: true,
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			formats: ["es", "cjs"],
			fileName(format) {
				return format === "es" ? "epub.mjs" : "epub.cjs";
			}
		},
		rollupOptions: {
			output: {
				exports: "named"
			}
		}
	}
});

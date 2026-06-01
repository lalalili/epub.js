import { defineConfig } from "vite";

const minify = process.env.MINIFY === "true";

export default defineConfig({
	build: {
		outDir: "dist",
		emptyOutDir: false,
		minify,
		sourcemap: !minify,
		lib: {
			entry: "src/epub.js",
			name: "ePub",
			formats: ["umd"],
			fileName() {
				return minify ? "epub.min.js" : "epub.js";
			}
		},
		rollupOptions: {
			external: ["jszip/dist/jszip"],
			output: {
				exports: "default",
				globals: {
					"jszip/dist/jszip": "JSZip"
				}
			}
		}
	}
});

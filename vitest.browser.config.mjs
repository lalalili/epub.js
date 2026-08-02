import { playwright } from "@vitest/browser-playwright";
import { chromium } from "playwright";
import { defineConfig } from "vitest/config";

const chromeExecutablePath = process.env.CHROME_BIN || chromium.executablePath();
const browserName = process.env.EPUBJS_BROWSER || "chromium";

export default defineConfig({
	cacheDir: `node_modules/.vite/${browserName}`,
	test: {
		include: ["test/browser/**/*.test.js"],
		browser: {
			enabled: true,
			headless: true,
			provider: playwright({
				launchOptions: browserName === "chromium"
					? {
						executablePath: chromeExecutablePath,
						args: ["--no-sandbox"]
					}
					: {}
			}),
			instances: [
				{
					browser: browserName
				}
			]
		}
	}
});

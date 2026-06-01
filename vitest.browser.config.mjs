import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const chromeExecutablePath = process.env.CHROME_BIN || "/usr/bin/google-chrome";

export default defineConfig({
	test: {
		include: ["test/browser/**/*.test.js"],
		browser: {
			enabled: true,
			headless: true,
			provider: playwright({
				launchOptions: {
					executablePath: chromeExecutablePath,
					args: ["--no-sandbox"]
				}
			}),
			instances: [
				{
					browser: "chromium"
				}
			]
		}
	}
});

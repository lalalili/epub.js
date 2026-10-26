import { playwright } from "vite-plus/test/browser-playwright";
import { chromium } from "playwright";
import { defineConfig } from "vite-plus";

const chromeExecutablePath = process.env.CHROME_BIN || chromium.executablePath();
const browserName = process.env.EPUBJS_BROWSER || "chromium";
if (
    process.env.EPUBJS_EXPECTED_NODE_VERSION &&
    process.versions.node !== process.env.EPUBJS_EXPECTED_NODE_VERSION
) {
    throw new Error(
        `Browser test runner must use Node ${process.env.EPUBJS_EXPECTED_NODE_VERSION}; got ${process.versions.node}`,
    );
}

export default defineConfig({
    cacheDir: `node_modules/.vite/${browserName}`,
    test: {
        maxWorkers: 2,
        include: ["test/browser/**/*.test.js"],
        browser: {
            enabled: true,
            headless: true,
            provider: playwright({
                launchOptions:
                    browserName === "chromium"
                        ? {
                              executablePath: chromeExecutablePath,
                              args: ["--no-sandbox"],
                          }
                        : {},
            }),
            instances: [
                {
                    browser: browserName,
                },
            ],
        },
    },
});

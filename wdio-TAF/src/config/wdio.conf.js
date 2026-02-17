import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

dotenv.config();

export const config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  runner: "local",

  //
  // ==================
  // Specify Test Files
  // ==================
  specs: ["../tests/**/*.test.js"],

  // Patterns to exclude
  exclude: [
    // 'path/to/excluded/files'
  ],

  // Run spec files once (retries can hide flakiness and look like parallel runs)
  specFileRetries: 0,
  specFileRetriesDelay: 0,
  specFileRetriesDeferred: false,

  //
  // ============
  // Capabilities
  // ============
  // Run tests sequentially to avoid rate limiting issues
  maxInstances: 1,

  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          ...(process.env.HEADLESS === "true" ? ["--headless=new"] : []),
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-background-networking",
          "--disable-sync",
          "--disable-translate",
          "--metrics-recording-only",
          "--no-first-run",
          "--safebrowsing-disable-auto-update",
          "--log-level=3",
          "--start-maximized",
        ],
        excludeSwitches: ["enable-logging"],
      },
    },
  ],

  //
  // ===================
  // Test Configurations
  // ===================
  logLevel: "error",

  bail: 0,

  baseUrl: process.env.BASE_URL || "https://practicesoftwaretesting.com",

  waitforTimeout: 30000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 2,

  framework: "mocha",

  reporters: [
    "spec",
    [
      "@rpii/wdio-html-reporter",
      {
        debug: false,
        outputDir: path.join(projectRoot, "wdio-html-report"),
        filename: "report.html",
        reportTitle: "WDIO Test Report",
        showInBrowser: false,
        collapseTests: false,
        useOnAfterCommandForScreenshot: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 90000,
  },

  //
  // =====
  // Hooks
  // =====
  /**
   * Take screenshot on test failure and save to screenshots/ folder
   */
  afterTest: async function (test, context, { error: _error, passed }) {
    if (!passed) {
      const screenshotDir = path.join(projectRoot, "screenshots");
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const testName = test.title.replace(/\s+/g, "_");
      const filePath = path.join(screenshotDir, `${testName}_${timestamp}.png`);

      await browser.saveScreenshot(filePath);
      console.log(`\n📸 Screenshot saved: ${filePath}`);
    }
  },
};

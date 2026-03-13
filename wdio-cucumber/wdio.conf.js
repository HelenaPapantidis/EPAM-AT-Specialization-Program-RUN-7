import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

export const config = {
  runner: "local",

  specs: ["./features/**/*.feature"],
  exclude: [],

  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--headless",
          "--disable-gpu",
          "--window-size=1920,1080",
          "--disable-notifications",
          "--disable-extensions",
          "--disable-background-networking",
          "--log-level=3",
        ],
      },
    },
  ],

  logLevel: "error",
  bail: 0,
  baseUrl: "https://practicesoftwaretesting.com",
  waitforTimeout: 60000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "cucumber",
  reporters: [
    "spec",
    ["allure", { outputDir: "allure-results" }],
    [
      "@rpii/wdio-html-reporter",
      {
        debug: false,
        outputDir: path.join(__dirname, "wdio-html-report"),
        filename: "report.html",
        reportTitle: "WDIO Cucumber Test Report",
        showInBrowser: false,
        collapseTests: false,
        useOnAfterCommandForScreenshot: false,
      },
    ],
  ],

  cucumberOpts: {
    require: [path.join(__dirname, "step-definitions", "*.js")],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: true,
    tags: process.env.TAGS || "",
    timeout: 120000,
    ignoreUndefinedDefinitions: false,
  },
};

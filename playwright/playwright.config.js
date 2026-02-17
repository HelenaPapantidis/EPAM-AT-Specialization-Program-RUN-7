import dotenv from 'dotenv';
dotenv.config();


import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "src/tests",
  outputDir: "test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,
  reporter: [
    ["list"],  // Spec reporter for console output
    ["html", { outputFolder: "playwright-report" }]  // HTML reporter
  ],

  use: {
    baseURL: "https://practicesoftwaretesting.com/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: process.env.HEADLESS !== 'false',
    timeout: 80000,
    navigationTimeout: 30000,
    actionTimeout: 10000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

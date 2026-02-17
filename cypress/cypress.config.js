const { defineConfig } = require("cypress");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://practicesoftwaretesting.com/",

    env: {
      USER_EMAIL: process.env.TEST_USER_EMAIL,
      USER_PASSWORD: process.env.TEST_USER_PASSWORD,
    },
    // Viewport configuration
    viewportWidth: 1280,
    viewportHeight: 720,

    // Video and screenshot settings
    video: false, // Disable video to save disk space
    screenshotOnRunFailure: true,

    // Timeout settings
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,

    // Retry configuration
    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      // Add event hooks here if needed
      return config;
    },
  },
});

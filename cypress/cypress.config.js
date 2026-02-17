const { defineConfig } = require("cypress");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });

module.exports = defineConfig({
  e2e: {
    allowCypressEnv: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/mochawesome-report',
      overwrite: false,
      html: true,
      json: true
    },
    baseUrl: process.env.BASE_URL || "https://practicesoftwaretesting.com/",

    env: {
      USER_EMAIL: process.env.TEST_USER_EMAIL,
      USER_PASSWORD: process.env.TEST_USER_PASSWORD,
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,

    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
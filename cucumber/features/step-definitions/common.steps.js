import { Given, Then } from '@wdio/cucumber-framework';
import assert from 'node:assert/strict';

import { HomePage, LoginPage } from '../../pageobjects/index.js';

Given('the user is on the homepage', async () => {
  await HomePage.open();
  await HomePage.waitForProductsToLoad();
});

Given('the user is on the login page', async () => {
  await LoginPage.open();
  await LoginPage.emailInput.waitForDisplayed();
});

Given('the user is registered and signed in', async () => {
  await LoginPage.open();
  await LoginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('/account'),
    { timeout: 15000, timeoutMsg: 'Not redirected to account after login' }
  );
});

Then('the page should display {string}', async (expectedText) => {
  const title = await $('[data-test="page-title"], h1');
  await title.waitForDisplayed({ timeout: 15000 });
  const text = await title.getText();
  assert.ok(
    text.toLowerCase().includes(expectedText.toLowerCase()),
    `Expected "${expectedText}" in title, got "${text}"`
  );
});

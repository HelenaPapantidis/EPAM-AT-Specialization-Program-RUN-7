import { Given, When, Then } from '@wdio/cucumber-framework';
import assert from 'node:assert/strict';

import { LoginPage, RegistrationPage } from '../../pageobjects/index.js';
import { buildValidRegistrationData } from '../../utils/registrationData.js';

Given('a test account exists with email {string} and password {string}', async (email, password) => {
  // account already exists in the demo app
});

When('the user clicks on {string} link', async (linkText) => {
  if (linkText === 'Register your account') {
    await LoginPage.goToRegister();
    return;
  }
  const link = await $(`a*=${linkText}`);
  await link.waitForClickable();
  await link.click();
});

When('the user fills in the registration form with valid data', async () => {
  await RegistrationPage.fillRegistrationForm(buildValidRegistrationData());
});

When('the user clicks the Register button', async () => {
  await RegistrationPage.submitRegistration();
});

When('the user enters email {string}', async (email) => {
  await LoginPage.setInputValue(LoginPage.emailInput, email);
});

When('the user enters password {string}', async (password) => {
  await LoginPage.setInputValue(LoginPage.passwordInput, password);
});

When('the user clicks the Login button', async () => {
  await LoginPage.clickElement(LoginPage.loginButton);
});

Then('a success message should be displayed', async () => {
  await browser.waitUntil(
    async () => {
      if ((await browser.getUrl()).includes('/auth/login')) return true;
      const el = await $('.alert-success, .ngx-toastr, .toast, .alert');
      return (await el.isExisting()) && (await el.isDisplayed());
    },
    { timeout: 15000, timeoutMsg: 'Success message (or redirect) did not appear' }
  );
});

Then('the user should be redirected to the login page', async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('/auth/login'),
    { timeout: 15000, timeoutMsg: 'Expected redirect to login page' }
  );
});

Then('the user should be redirected to the account page', async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('/account'),
    { timeout: 15000, timeoutMsg: 'Expected redirect to account page' }
  );
});

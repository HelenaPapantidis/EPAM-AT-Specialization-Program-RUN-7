import { Given, When, Then } from '@wdio/cucumber-framework';
import { LoginPage, RegistrationPage } from '../pageobjects/index.js';
import { buildValidRegistrationData } from '../utils/registrationData.js';

Given('a test account exists with email {string} and password {string}', async (_email, _password) => {
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

Then('the user should be redirected to the login page', async () => {
  await expect(browser).toHaveUrl(expect.stringContaining('/auth/login'));
});

Then('the user should be redirected to the account page', async () => {
  await expect(browser).toHaveUrl(expect.stringContaining('/account'));
});
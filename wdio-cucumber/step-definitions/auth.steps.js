import { When, Then } from "@wdio/cucumber-framework";
import { LoginPage, RegistrationPage } from "../pageobjects/index.js";
import { buildValidRegistrationData } from "../utils/registrationData.js";

When("the user clicks on {string} link", async (_linkText) => {
  await LoginPage.goToRegister();
});

When("the user fills in the registration form with valid data", async () => {
  await RegistrationPage.fillRegistrationForm(buildValidRegistrationData());
});

When("the user clicks the Register button", async () => {
  await RegistrationPage.submitRegistration();
});

When("the user enters email {string}", async (email) => {
  await LoginPage.emailInput.setValue(email);
});

When("the user enters password {string}", async (password) => {
  await LoginPage.passwordInput.setValue(password);
});

When("the user clicks the Login button", async () => {
  await LoginPage.loginButton.click();
});

Then("the user should be redirected to the login page", async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes("/auth/login"), {
    timeout: 30000,
    timeoutMsg: "Not redirected to login page after registration",
  });
});

Then("the user should be redirected to the account page", async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes("/account"), {
    timeout: 30000,
    timeoutMsg: "Not redirected to account page after login",
  });
});

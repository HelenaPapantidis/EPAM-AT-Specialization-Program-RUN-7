import { Given, Then } from "@wdio/cucumber-framework";
import { HomePage, LoginPage } from "../pageobjects/index.js";

Given("the user is on the homepage", async () => {
  await HomePage.open();
  await HomePage.waitForProductsToLoad();
});

Given("the user is on the login page", async () => {
  await LoginPage.open();
  await LoginPage.emailInput.waitForDisplayed({ timeout: 30000 });
});

Then("the page should display {string}", async (expectedText) => {
  const title = await $('[data-test="page-title"], h1');
  await title.waitForDisplayed({ timeout: 30000 });
  const text = await title.getText();
  expect(text.toLowerCase()).toContain(expectedText.toLowerCase());
});

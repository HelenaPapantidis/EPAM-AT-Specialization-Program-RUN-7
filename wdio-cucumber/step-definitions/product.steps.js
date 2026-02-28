import { When, Then } from '@wdio/cucumber-framework';
import { HomePage, ProductDetailsPage } from '../pageobjects/index.js';

When('the user clicks on a product from the list', async () => {
  await HomePage.clickFirstProduct();
});

When('the user clicks on any product from the list', async () => {
  await HomePage.clickFirstProduct();
});

Then('the product details page should be displayed', async () => {
  await ProductDetailsPage.waitForPageLoad();
});

Then('the URL should contain {string}', async (part) => {
  await expect(browser).toHaveUrl(expect.stringContaining(part));
});

Then('the product name should be visible', async () => {
  const name = await ProductDetailsPage.getProductName();
  expect(name.trim().length).toBeGreaterThan(0);
});

Then('the {string} button should be clickable', async (buttonText) => {
  if (buttonText === 'Add to cart') {
    await ProductDetailsPage.addToCartButton.waitForClickable({ timeout: 15000 });
    return;
  }
  const btn = await $(`button*=${buttonText}`);
  await btn.waitForClickable({ timeout: 15000 });
});
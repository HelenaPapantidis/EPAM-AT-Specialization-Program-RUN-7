import { When, Then } from '@wdio/cucumber-framework';
import assert from 'node:assert/strict';

import { ProductDetailsPage, CartPage } from '../../pageobjects/index.js';

When('the user clicks the {string} button', async (buttonText) => {
  if (buttonText === 'Add to cart') {
    await ProductDetailsPage.addToCart();
    return;
  }
  const btn = await $(`button*=${buttonText}`);
  await btn.waitForClickable();
  await btn.click();
});

When('the user opens the cart page', async () => {
  await browser.url('/checkout');
  await CartPage.waitForCartItemsToLoad(15000);
});

Then('the product should be displayed in the cart', async () => {
  const count = await CartPage.getCartItemCount();
  assert.ok(count > 0, 'Expected at least one item in cart');
});

Then('the quantity should be set to 1', async () => {
  assert.equal(await CartPage.getQuantity(), '1');
});

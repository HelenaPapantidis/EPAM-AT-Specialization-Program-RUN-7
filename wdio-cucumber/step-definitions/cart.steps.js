import { When, Then } from '@wdio/cucumber-framework';
import { ProductDetailsPage, CartPage } from '../pageobjects/index.js';

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
  await browser.waitUntil(
    async () => {
      const badge = await $('[data-test="cart-quantity"]');
      return (await badge.isExisting()) && (await badge.getText()) === '1';
    },
    { timeout: 30000, timeoutMsg: 'Cart badge did not update to 1' }
  );
  await browser.url('/checkout');
  await CartPage.waitForCartItemsToLoad(60000);
});

Then('the product should be displayed in the cart', async () => {
  expect(await CartPage.getCartItemCount()).toBeGreaterThan(0);
});

Then('the quantity should be set to 1', async () => {
  await expect(CartPage.quantityInput).toHaveValue('1');
});
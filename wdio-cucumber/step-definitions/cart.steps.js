import { When, Then } from "@wdio/cucumber-framework";
import { ProductDetailsPage, CartPage } from "../pageobjects/index.js";

let selectedProductName = "";

When("the user clicks the {string} button", async (_buttonText) => {
  selectedProductName = await ProductDetailsPage.getProductName();
  await ProductDetailsPage.addToCart();
});

When("the user opens the cart page", async () => {
  await CartPage.openAndWait();
});

Then("the product should be displayed in the cart", async () => {
  expect(await CartPage.getCartItemCount()).toBeGreaterThan(0);

  if (selectedProductName) {
    const cartTableText = await $("tbody").getText();
    expect(cartTableText.toLowerCase()).toContain(selectedProductName.toLowerCase());
  }
});

Then("the quantity should be set to 1", async () => {
  await expect(CartPage.quantityInput).toHaveValue("1");
});

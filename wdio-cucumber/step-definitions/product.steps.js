import { When, Then } from "@wdio/cucumber-framework";
import { HomePage, ProductDetailsPage } from "../pageobjects/index.js";

let selectedProductName;

When("the user clicks on a product from the list", async () => {
  selectedProductName = await HomePage.clickFirstProduct();
});

Then("the product details page should be displayed", async () => {
  await ProductDetailsPage.waitForPageLoad();
});

Then("the product name should match the selected product", async () => {
  const detailName = await ProductDetailsPage.getProductName();
  expect(detailName).toEqual(selectedProductName);
});

Then("the Add to cart button should be clickable", async () => {
  await expect(ProductDetailsPage.addToCartButton).toBeClickable();
});

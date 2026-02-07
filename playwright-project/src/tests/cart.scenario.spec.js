import { test, expect } from "@playwright/test";
import { HomePage } from "@/pages/HomePage";
import { ProductPage } from "@/pages/ProductPage";

test("User can add a product to the basket", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // 1. User navigates to homepage
  await homePage.open();

  // 2. User opens first product
  await homePage.productGrid.openFirstProduct();

  // 3. Verify product page is opened
  await expect(page).toHaveURL(/product/);

  // 3a. Wait for product details to load
  await productPage.waitForProductToLoad("Combination Pliers");

  // 4. Verify Add to Cart button is visible and enabled
  const addToCartButton = page.locator('[data-test="add-to-cart"]');
  await expect(addToCartButton).toBeVisible();
  await expect(addToCartButton).toBeEnabled();

  // 5. User adds product to cart
  await addToCartButton.click();

  // 5a. Verify success message
  await productPage.verifySuccessMessage();

  // 6. Navigate to checkout page
  await page.goto("/checkout", { waitUntil: "domcontentloaded" });

  // 7. Verify checkout page is opened
  await page.waitForURL(/checkout/, { timeout: 10000 });
  await expect(page).toHaveURL(/checkout/);

  // 8. Verify product appears in cart
  await productPage.verifyProductInCart("Combination Pliers");
});

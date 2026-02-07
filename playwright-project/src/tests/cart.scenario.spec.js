import { test, expect } from "@playwright/test";
import { HomePage } from "@/pages/HomePage";
import { ProductPage } from "@/pages/ProductPage";

test.describe("Shopping Cart Scenarios", () => {
  test("User can add a product to the basket", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await test.step("User navigates to homepage", async () => {
      await homePage.open();
    });

    await test.step("User opens first product", async () => {
      await homePage.productGrid.openFirstProduct();
    });

    await test.step("Verify product page is opened", async () => {
      await expect(page).toHaveURL(/product/);
    });

    await test.step("Wait for product details to load", async () => {
      await productPage.waitForProductToLoad("Combination Pliers");
    });

    await test.step("Verify Add to Cart button is visible and enabled", async () => {
      const addToCartButton = page.locator('[data-test="add-to-cart"]');
      await expect(addToCartButton).toBeVisible();
      await expect(addToCartButton).toBeEnabled();
    });

    await test.step("User adds product to cart", async () => {
      const addToCartButton = page.locator('[data-test="add-to-cart"]');
      await addToCartButton.click();
    });

    await test.step("Verify success message", async () => {
      await productPage.verifySuccessMessage();
    });

    await test.step("Navigate to checkout page", async () => {
      await page.goto("/checkout", { waitUntil: "domcontentloaded" });
    });

    await test.step("Verify checkout page is opened", async () => {
      await page.waitForURL(/checkout/, { timeout: 10000 });
      await expect(page).toHaveURL(/checkout/);
    });

    await test.step("Verify product appears in cart", async () => {
      await productPage.verifyProductInCart("Combination Pliers");
    });
  });
});

import { test, expect } from "@src/tests/fixtures";


test.describe("Shopping Cart Scenarios", () => {
  test("User can add a product to the basket", async ({ homePage, productPage, page }) => {
   
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
      await expect(productPage.getProductHeading("Combination Pliers")).toBeVisible();
    });

    await test.step("Verify Add to Cart button is visible and enabled", async () => {
      const addToCartButton = productPage.addToCartButton;
      await expect(addToCartButton).toBeVisible();
      await expect(addToCartButton).toBeEnabled();
    });

    await test.step("User adds product to cart", async () => {
     await productPage.addToCart();

    });

    await test.step("Verify success message", async () => {
      await expect(productPage.successMessage).toBeVisible();
    });

    await test.step("Navigate to checkout page", async () => {
      await page.goto("/checkout", { waitUntil: "domcontentloaded" });
    });

    await test.step("Verify checkout page is opened", async () => {
      await page.waitForURL(/checkout/, { timeout: 10000 });
      await expect(page).toHaveURL(/checkout/);
    });

    await test.step("Verify product appears in cart", async () => {
      await expect(productPage.getProductInCart("Combination Pliers")).toBeVisible();
    });
  });
});

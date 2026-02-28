import { test, expect } from "./fixtures";

test.describe("Shopping Cart Scenarios", () => {

  test("User can add a product to the basket", async ({ homePage, productPage, page }) => {

    await test.step("User navigates to homepage and waits for products API", async () => {
      const responsePromise = page.waitForResponse(
        resp => resp.url().includes("/products") &&
                resp.request().method() === "GET" &&
                resp.status() === 200,
        { timeout: 30000 }
      );
      await homePage.open();
      await responsePromise;
    });


    await test.step("User opens first product and waits for product API", async () => {
      const responsePromise = page.waitForResponse(
        resp => resp.url().includes("/products/") &&
                resp.request().method() === "GET" &&
                resp.status() === 200,
        { timeout: 30000 }
      );
      await homePage.productGrid.openFirstProduct();
      await responsePromise;
      await expect(page).toHaveURL(/product/);
    });

    await test.step("Wait for product details to render", async () => {
      await expect(
        productPage.getProductHeading("Combination Pliers")
      ).toBeVisible({ timeout: 40000 });
    });

    await test.step("Add product to cart", async () => {
      await expect(productPage.addToCartButton).toBeVisible();
      await expect(productPage.addToCartButton).toBeEnabled();

      const responsePromise = page.waitForResponse(
        resp => resp.url().includes("/carts/") &&
                resp.request().method() === "POST" &&
                resp.status() === 200,
        { timeout: 30000 }
      );
      await productPage.addToCart();
      await responsePromise;

      await expect(productPage.successMessage).toBeVisible();
    });

    await test.step("Navigate to checkout and wait for cart API", async () => {
      const responsePromise = page.waitForResponse(
        resp => resp.url().includes("/carts/") &&
                resp.request().method() === "GET" &&
                resp.status() === 200,
        { timeout: 30000 }
      );
      await page.goto("/checkout");
      await responsePromise;
      await expect(page).toHaveURL(/checkout/);
    });

    await test.step("Verify product appears in cart", async () => {
      await expect(productPage.getProductInCart("Combination Pliers")).toBeVisible({
        timeout: 20000,
      });
    });
  });
});
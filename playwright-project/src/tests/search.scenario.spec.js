import { test, expect } from "@playwright/test";
import { HomePage } from "@/pages/HomePage";

test("User can search for a product and see results", async ({ page }) => {
  const homePage = new HomePage(page);
  const searchTerm = "Hammer";

  // 1. User navigates to homepage
  await homePage.open();

  // 2. User searches for product
  await homePage.searchProduct(searchTerm);
  await homePage.productGrid.waitUntilLoaded();

  // 2a. Verify search heading matches search term
  await homePage.verifySearchHeading(searchTerm);

  // 3. Verify at least one product is returned
  const productCount = await homePage.productGrid.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});

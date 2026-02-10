import { test, expect } from "@src/tests/fixtures";


test.describe("Product Search Scenarios", () => {
  test("User can search for a product and see results", async ({ homePage }) => {
   
    const searchTerm = "Hammer";

    await test.step("User navigates to homepage", async () => {
      await homePage.open();
    });

    await test.step("User searches for product", async () => {
      await homePage.searchProduct(searchTerm);
      await homePage.productGrid.waitUntilLoaded();
    });

    await test.step("Verify search heading matches search term", async () => {
      await expect(homePage.getSearchHeading(searchTerm)).toBeVisible();
    });

    await test.step("Verify at least one product is returned", async () => {
      const productCount = await homePage.productGrid.getProductCount();
      expect(productCount).toBeGreaterThan(0);
    });
  });
});

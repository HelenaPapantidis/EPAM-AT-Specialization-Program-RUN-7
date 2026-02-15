import { test, expect } from "./fixtures";


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

 
  });
});

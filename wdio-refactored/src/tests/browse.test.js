import { HomePage } from '../po/index.js';
import { searchData, categories } from '../data/index.js';

describe("Browse Product Scenarios", () => {

  it("should search for an exact product by name", async () => {
    await HomePage.open();
    await HomePage.searchProduct(searchData.validProduct);
    await HomePage.waitForProductsToLoad();

    const productCount = await HomePage.getProductCount();
    await expect(productCount).toBeGreaterThan(0);
  });

  it("should filter products by category", async () => {
    await HomePage.goToCategory(categories.handTools);
    await HomePage.waitForProductsToLoad(15000);

    const productCount = await HomePage.getProductCount();
    await expect(productCount).toBeGreaterThan(0);

    await expect(browser).toHaveUrl(expect.stringContaining("hand-tools"));
  });
});

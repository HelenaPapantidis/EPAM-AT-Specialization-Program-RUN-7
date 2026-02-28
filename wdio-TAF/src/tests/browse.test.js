import { HomePage } from '../po/index.js';
import { searchData, categories } from '../data/index.js';

describe("Browse Product Scenarios", () => {

  it("should search for an exact product by name", async () => {
    await HomePage.open();
    await HomePage.searchProduct(searchData.validProduct);
    await HomePage.waitForProductsToLoad();

    await expect(HomePage.searchResultTitle).toHaveText(/hammer/i);
  });

  it("should filter products by category", async () => {
    await HomePage.goToCategory(categories.handTools);

    await expect(browser).toHaveUrl(/hand-tools/);
    await expect(HomePage.categoryTitle).toHaveText(/Hand Tools/i);
  });
});

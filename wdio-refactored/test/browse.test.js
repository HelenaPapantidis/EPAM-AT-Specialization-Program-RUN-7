import { expect as chaiExpect } from "chai";
import HomePage from '../pages/HomePage.js';
import { searchData, categories } from '../data/products.js';

describe("Browse Product Scenarios", () => {

  it("should search for an exact product by name", async () => {
    // Navigate to home page
    await HomePage.open();

    // Search for product
    await HomePage.searchProduct(searchData.validProduct);

    // Wait for products to load
    await HomePage.waitForProductsToLoad();

    // Verify products are displayed
    const productCount = await HomePage.getProductCount();
    chaiExpect(productCount).to.be.greaterThan(0);
  });

  it("should filter products by category", async () => {
    // Navigate to category page
    await HomePage.goToCategory(categories.handTools);

    // Wait for products to load
    await HomePage.waitForProductsToLoad(15000);

    // Verify products are displayed
    const productCount = await HomePage.getProductCount();
    chaiExpect(productCount).to.be.greaterThan(0);

    // Verify URL contains category
    const url = await HomePage.getCurrentUrl();
    chaiExpect(url.toLowerCase()).to.include("hand-tools");
  });

});

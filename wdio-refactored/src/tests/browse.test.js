import { expect as chaiExpect } from "chai";
import HomePage from '../po/HomePage.js';
import { searchData, categories } from '../data/products.js';

describe("Browse Product Scenarios", () => {

  it("should search for an exact product by name", async () => {
    await HomePage.open();
    await HomePage.searchProduct(searchData.validProduct);
    await HomePage.waitForProductsToLoad();

    const productCount = await HomePage.getProductCount();
    chaiExpect(productCount).to.be.greaterThan(0);
  });

  it("should filter products by category", async () => {
    await HomePage.goToCategory(categories.handTools);
    await HomePage.waitForProductsToLoad(15000);

    const productCount = await HomePage.getProductCount();
    chaiExpect(productCount).to.be.greaterThan(0);

    const url = await HomePage.getCurrentUrl();
    chaiExpect(url.toLowerCase()).to.include("hand-tools");
  });
});

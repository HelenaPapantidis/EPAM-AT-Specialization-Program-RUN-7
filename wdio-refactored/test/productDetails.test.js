import * as chai from "chai";
chai.should();
import HomePage from '../pages/HomePage.js';
import ProductDetailsPage from '../pages/ProductDetailsPage.js';

describe("Product Details Feature", () => {

  it("should display product details page with correct info", async () => {
    // Navigate to home page
    await HomePage.open();

    // Wait for products to load
    await HomePage.waitForProductsToLoad();

    // Get product name from card and click
    const firstProduct = await HomePage.firstProductCard;
    const cardProductName = await HomePage.getProductCardTitle(firstProduct);
    await HomePage.clickFirstProduct();

    // Wait for product detail page to load
    await ProductDetailsPage.waitForPageLoad();

    // Verify URL contains /product/
    await expect(browser).toHaveUrl(expect.stringContaining("/product/"));

    // Verify product name matches
    const productName = await ProductDetailsPage.getProductName();
    await expect(productName).toBe(cardProductName);

    // Verify add to cart button exists and is clickable
    const addToCartBtn = await ProductDetailsPage.addToCartButtonAlt;
    await expect(addToCartBtn).toExist();
    await expect(addToCartBtn).toBeClickable();
  });

});

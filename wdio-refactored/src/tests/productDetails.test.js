import * as chai from "chai";
chai.should();
import HomePage from '../po/HomePage.js';
import ProductDetailsPage from '../po/ProductDetailsPage.js';

describe("Product Details Feature", () => {

  it("should display product details page with correct info", async () => {
    await HomePage.open();
    await HomePage.waitForProductsToLoad();

    const firstProduct = await HomePage.firstProductCard;
    const cardProductName = await HomePage.getProductCardTitle(firstProduct);
    await HomePage.clickFirstProduct();

    await ProductDetailsPage.waitForPageLoad();

    await expect(browser).toHaveUrl(expect.stringContaining("/product/"));

    const productName = await ProductDetailsPage.getProductName();
    await expect(productName).toBe(cardProductName);

    const addToCartBtn = await ProductDetailsPage.addToCartButton;
    await expect(addToCartBtn).toExist();
    await expect(addToCartBtn).toBeClickable();
  });
});

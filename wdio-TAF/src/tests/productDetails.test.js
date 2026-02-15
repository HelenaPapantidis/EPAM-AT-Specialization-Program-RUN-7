import { HomePage, ProductDetailsPage } from '../po/index.js';

describe("Product Details Feature", () => {

  it("should display product details page with correct info", async () => {
    await HomePage.open();
    await HomePage.waitForProductsToLoad();

    const firstProduct = await HomePage.firstProductCard;
    const cardProductName = await HomePage.getProductCardTitle(firstProduct);
    await HomePage.clickFirstProduct();

    await ProductDetailsPage.waitForPageLoad();

    await expect(browser).toHaveUrl(/\/product\//);

    await expect(ProductDetailsPage.productName).toHaveText(cardProductName);
    await expect(ProductDetailsPage.addToCartButton).toBeClickable();
  });
});

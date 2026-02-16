import { HomePage, ProductDetailsPage, CartPage } from '../po/index.js';

describe("Shopping Cart", () => {

  it("should add product to basket", async () => {
    await HomePage.open();
    await HomePage.clickFirstProduct();
    await ProductDetailsPage.waitForPageLoad();
    await ProductDetailsPage.addToCart();
    await expect(ProductDetailsPage.toast).toBeDisplayed({ timeout: 15000 });
    await CartPage.open();
    await expect(browser).toHaveUrl(/checkout/);
    const rows = await CartPage.cartRows;
    await expect(rows.length).toBeGreaterThan(0);
  });
});




import { HomePage, ProductDetailsPage, CartPage } from '../po/index.js';

describe("Shopping Cart", () => {

  it("should add product to basket", async () => {
    await HomePage.open();
    await HomePage.clickFirstProduct();
    await ProductDetailsPage.waitForPageLoad();
    await ProductDetailsPage.addToCart();
    
    // Wait for cart quantity badge to update (indicates item added)
    await ProductDetailsPage.cartQuantityBadge.waitForDisplayed({ timeout: 15000 });
    
    await CartPage.open();
    await expect(browser).toHaveUrl(/checkout/);
    const rows = await CartPage.cartRows;
    await expect(rows.length).toBeGreaterThan(0);
  });
});




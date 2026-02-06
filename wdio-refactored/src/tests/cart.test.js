import HomePage from '../po/HomePage.js';
import ProductDetailsPage from '../po/ProductDetailsPage.js';
import CartPage from '../po/CartPage.js';

describe("Shopping Cart", () => {
  
  it("should add product to basket", async () => {
    await HomePage.open();
    await HomePage.clickFirstProduct();
    await ProductDetailsPage.waitForPageLoad();
    await ProductDetailsPage.addToCart();
    await HomePage.waitForCartUpdate();
    await ProductDetailsPage.waitForToastDisappear();
    await HomePage.goToCart();
    await CartPage.waitForCartItemsToLoad();

    const cartItemCount = await CartPage.getCartItemCount();
    await expect(cartItemCount).toBeGreaterThan(0);

    const quantity = await CartPage.getQuantity();
    await expect(quantity).toBe("1");
  });
});

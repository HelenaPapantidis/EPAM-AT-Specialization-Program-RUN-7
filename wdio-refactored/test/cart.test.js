import HomePage from '../pages/HomePage.js';
import ProductDetailsPage from '../pages/ProductDetailsPage.js';
import CartPage from '../pages/CartPage.js';

describe("Shopping Cart", () => {
  
  it("should add product to basket", async () => {
    // Navigate to home page
    await HomePage.open();

    // Wait for products to load and click first product
    await HomePage.clickFirstProduct();

    // Wait for product detail page to load
    await ProductDetailsPage.waitForPageLoad();

    // Add product to cart
    await ProductDetailsPage.addToCart();

    // Wait for cart to update
    await HomePage.waitForCartUpdate();

    // Wait for toast to disappear
    await ProductDetailsPage.waitForToastDisappear();

    // Navigate to cart
    await HomePage.goToCart();

    // Wait for cart items to load
    await CartPage.waitForCartItemsToLoad();

    // Verify cart has items
    const cartItemCount = await CartPage.getCartItemCount();
    await expect(cartItemCount).toBeGreaterThan(0);

    // Verify quantity is 1
    const quantity = await CartPage.getQuantity();
    await expect(quantity).toBe("1");
  });
  
});

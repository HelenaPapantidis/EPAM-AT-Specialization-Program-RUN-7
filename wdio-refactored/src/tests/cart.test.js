import { HomePage, ProductDetailsPage, CartPage } from '../po/index.js';

describe("Shopping Cart", () => {
  
  it("should add product to basket and remove it", async () => {
    await HomePage.open();
    await HomePage.clickFirstProduct();
    await ProductDetailsPage.waitForPageLoad();
    await ProductDetailsPage.addToCart();
    await ProductDetailsPage.waitForSuccessToast();
    await ProductDetailsPage.waitForToastDisappear();
    await HomePage.goToCart();
    await CartPage.waitForCartItemsToLoad();

    await expect(CartPage.cartItems).toBeElementsArrayOfSize(1);

    await expect(CartPage.quantityInput).toHaveValue("1");

    await CartPage.removeProduct();
  });
});

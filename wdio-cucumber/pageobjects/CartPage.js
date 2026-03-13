import BasePage from "./BasePage.js";

class CartPage extends BasePage {
  get cartItems() {
    return $$("tbody tr");
  }

  get quantityInput() {
    return $("input[type='number']");
  }

  async open() {
    await super.open("/checkout");
  }

  async openAndWait(timeout = 30000) {
    await this.open();
    await this.waitForUrlContains("/checkout", timeout, "Failed to navigate to checkout");
  }

  async waitForCartItemsToLoad() {
    await this.pollWithRetry(
      async () => (await this.cartItems).length > 0,
      "Cart items did not load"
    );
  }

  async getCartItemCount() {
    await this.waitForCartItemsToLoad();
    return (await this.cartItems).length;
  }
}

export default new CartPage();

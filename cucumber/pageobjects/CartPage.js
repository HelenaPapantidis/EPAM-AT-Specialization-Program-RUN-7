import BasePage from './BasePage.js';

class CartPage extends BasePage {

  get cartItems() {
    return $$("tbody tr");
  }

  get quantityInput() {
    return $("input[type='number']");
  }

  async waitForCartItemsToLoad(timeout = 10000) {
    await browser.waitUntil(
      async () => (await this.cartItems).length > 0,
      { timeout, timeoutMsg: 'Cart items did not load' }
    );
  }

  async getCartItemCount() {
    await this.waitForCartItemsToLoad();
    return (await this.cartItems).length;
  }

  async getQuantity() {
    await this.waitForElement(this.quantityInput);
    return await this.quantityInput.getValue();
  }
}

export default new CartPage();

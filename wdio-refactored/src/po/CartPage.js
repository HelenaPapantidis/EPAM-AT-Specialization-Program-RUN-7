import BasePage from './BasePage.js';

class CartPage extends BasePage {

  get cartItems() {
    return $$("tbody tr");
  }

  get quantityInput() {
    return $("input[type='number']");
  }

  get deleteButton() {
    return $(".btn-danger");
  }

  async waitForCartItemsToLoad(timeout = 30000) {
    await browser.waitUntil(
      async () => (await this.cartItems).length > 0,
      { timeout, timeoutMsg: 'Cart items did not load' }
    );
  }

  async removeProduct() {
    await this.deleteButton.click();
  }
}

export default new CartPage();

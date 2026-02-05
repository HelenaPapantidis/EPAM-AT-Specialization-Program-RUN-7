import BasePage from './BasePage.js';

/**
 * Cart Page Object
 */
class CartPage extends BasePage {
  /**
   * Define selectors for cart page elements
   */
  get cartItems() {
    return $$("tbody tr");
  }

  get quantityInput() {
    return $("input[type='number']");
  }

  get checkoutButton() {
    return $("[data-test='proceed-checkout']");
  }

  get emptyCartMessage() {
    return $(".empty-cart");
  }

  /**
   * Wait for cart items to load
   * @param {number} timeout - Maximum wait time in milliseconds (default: 10000)
   */
  async waitForCartItemsToLoad(timeout = 10000) {
    await this.waitForElements("tbody tr", timeout, "Cart items did not load");
  }

  /**
   * Get number of items in cart
   * @returns {Promise<number>} Number of cart items
   */
  async getCartItemCount() {
    await this.waitForCartItemsToLoad();
    return (await this.cartItems).length;
  }

  /**
   * Get quantity value from input
   * @returns {Promise<string>} Quantity value
   */
  async getQuantity() {
    await this.waitForElement(this.quantityInput);
    return await this.quantityInput.getValue();
  }

  /**
   * Update item quantity
   * @param {string} quantity - New quantity value
   */
  async updateQuantity(quantity) {
    await this.setInputValue(this.quantityInput, quantity);
  }

  /**
   * Check if cart is empty
   * @returns {Promise<boolean>} True if cart is empty
   */
  async isCartEmpty() {
    return await this.isElementDisplayed(this.emptyCartMessage);
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
  }
}

export default new CartPage();

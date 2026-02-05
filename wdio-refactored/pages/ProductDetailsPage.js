import BasePage from './BasePage.js';

/**
 * Product Details Page Object
 */
class ProductDetailsPage extends BasePage {
  /**
   * Define selectors for product details page elements
   */
  get productName() {
    return $("h1");
  }

  get addToCartButton() {
    return $("[data-test='add-to-cart']");
  }

  get addToCartButtonAlt() {
    return $("#btn-add-to-cart");
  }

  get addToFavoritesButton() {
    return $("[data-test='add-to-favorites']");
  }

  get toast() {
    return $(".ngx-toastr, .toast");
  }

  get successToast() {
    return $(".toast-success");
  }

  /**
   * Wait for product page to load
   * @param {number} timeout - Maximum wait time in milliseconds (default: 10000)
   */
  async waitForPageLoad(timeout = 10000) {
    await this.waitForUrlContains(
      "/product/",
      timeout,
      "Product detail page did not load"
    );
  }

  /**
   * Get product name text
   * @returns {Promise<string>} Product name
   */
  async getProductName() {
    await this.waitForElement(this.productName, 15000);
    return await this.getElementText(this.productName);
  }

  /**
   * Add product to cart
   */
  async addToCart() {
    await this.waitForClickable(this.addToCartButton, 10000);
    await this.clickElement(this.addToCartButton);
  }

  /**
   * Add product to favorites
   */
  async addToFavorites() {

    await this.addToFavoritesButton.waitForDisplayed({ timeout: 10000 });
    await this.addToFavoritesButton.scrollIntoView();
    await this.addToFavoritesButton.click();
  }

  /**
   * Wait for success toast to appear
   * @param {number} timeout - Maximum wait time in milliseconds (default: 5000)
   */
  async waitForSuccessToast(timeout = 10000) {
    // Wait for any toast notification
    const toast = await $('.ngx-toastr, .toast, div[role="alert"]');
    await toast.waitForDisplayed({ timeout });
  }

  /**
   * Wait for toast notification to disappear
   */
  async waitForToastDisappear() {
    await this.waitForToastToDisappear('.ngx-toastr, .toast', 5000);
  }
}

export default new ProductDetailsPage();

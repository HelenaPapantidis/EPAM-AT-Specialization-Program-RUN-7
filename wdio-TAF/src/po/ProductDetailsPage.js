import BasePage from './BasePage.js';

class ProductDetailsPage extends BasePage {

  get productName() {
    return $("h1");
  }

  get addToCartButton() {
    return $("[data-test='add-to-cart']");
  }

  get addToFavoritesButton() {
    return $("[data-test='add-to-favorites']");
  }

  get toast() {
    return $(".ngx-toastr, .toast");
  }

  async waitForPageLoad(timeout = 30000) {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/product/'),
      { timeout, timeoutMsg: 'Product detail page did not load' }
    );
  }

  async getProductName() {
    await this.productName.waitForDisplayed({ timeout: 15000 });
    return await this.productName.getText();
  }

  async addToCart() {
    await this.addToCartButton.waitForClickable({ timeout: 30000 });
    await this.addToCartButton.click();
  }

  async addToFavorites() {
    await this.addToFavoritesButton.scrollIntoView();
    await this.addToFavoritesButton.click();
  }

  async waitForSuccessToast(timeout = 30000) {
    await this.toast.waitForDisplayed({ timeout });
  }

  async waitForToastDisappear(timeout = 30000) {
    await browser.waitUntil(
      async () => {
        const toast = await $('.ngx-toastr, .toast');
        return !(await toast.isDisplayed());
      },
      { timeout, interval: 500 }
    ).catch(() => {});
  }
}

export default new ProductDetailsPage();

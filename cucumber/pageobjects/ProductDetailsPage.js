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

  async waitForPageLoad(timeout = 10000) {
    await this.waitForUrlContains("/product/", timeout, "Product detail page did not load");
  }

  async getProductName() {
    await this.waitForElement(this.productName, 15000);
    return await this.getElementText(this.productName);
  }

  async addToCart() {
    await this.clickElement(this.addToCartButton);
  }

  async addToFavorites() {
    await this.scrollAndClick(this.addToFavoritesButton);
  }
}

export default new ProductDetailsPage();

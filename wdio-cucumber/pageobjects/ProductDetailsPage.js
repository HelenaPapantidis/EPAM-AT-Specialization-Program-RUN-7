import BasePage from "./BasePage.js";

class ProductDetailsPage extends BasePage {
  get productName() {
    return $("[data-test='product-name']");
  }

  get addToCartButton() {
    return $("[data-test='add-to-cart']");
  }

  get addToFavoritesButton() {
    return $("[data-test='add-to-favorites']");
  }

  async waitForPageLoad(timeout = 60000) {
    await this.waitForUrlContains("/product/", timeout, "Product detail page did not load");
    await this.pollWithRetry(
      async () => await this.productName.isDisplayed(),
      "Product name not displayed"
    );
  }

  async getProductName() {
    await this.waitForPageLoad();
    return await this.productName.getText();
  }

  async addToCart() {
    await this.waitForPageLoad();
    await this.addToCartButton.waitForExist({ timeout: 60000 });
    await this.scrollAndClick(this.addToCartButton);
    await this.addToCartButton.waitForEnabled({ timeout: 30000 });
  }

  async addToFavorites() {
    await this.waitForPageLoad();
    await this.addToFavoritesButton.waitForExist({ timeout: 60000 });
    await this.scrollAndClick(this.addToFavoritesButton);
  }
}

export default new ProductDetailsPage();

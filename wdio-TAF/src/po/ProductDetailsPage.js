import BasePage from "./BasePage.js";

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
    return $("div[role='alert'], .toast, .ngx-toastr");
  }

  get cartQuantityBadge() {
    return $("[data-test='cart-quantity']");
  }

  async waitForPageLoad(timeout = 60000) {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/product/"),
      {
        timeout,
        interval: 500,
        timeoutMsg: "Navigation to product detail page did not complete",
      },
    );

    // Wait for ANY key element (simple check)
    await browser.waitUntil(
      async () => {
        const cartBtn = await this.addToCartButton.isExisting();
        const favBtn = await this.addToFavoritesButton.isExisting();
        const title = await this.productName.isExisting();
        return cartBtn || favBtn || title;
      },
      {
        timeout,
        interval: 500,
        timeoutMsg:
          "Product details did not render (missing expected controls)",
      },
    );
  }

  async addToCart() {
    await this.addToCartButton.waitForExist({ timeout: 20000 });
    await this.addToCartButton.scrollIntoView();
    await this.addToCartButton.waitForClickable({ timeout: 20000 });
    await this.addToCartButton.click();
  }

  async addToFavorites() {
    await this.addToFavoritesButton.waitForDisplayed({ timeout: 20000 });
    await this.addToFavoritesButton.scrollIntoView();
    await this.addToFavoritesButton.click();
  }

}

export default new ProductDetailsPage();

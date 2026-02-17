import BasePage from "./BasePage.js";

class HomePage extends BasePage {
  get productCards() {
    return $$("a.card");
  }

  get firstProductCard() {
    return $("a.card");
  }

  get searchInput() {
    return $("[data-test='search-query']");
  }

  get searchButton() {
    return $("[data-test='search-submit']");
  }

  get cartIcon() {
    return $("[data-test='nav-cart']");
  }

  async open() {
    await super.open("/");
  }

  async waitForProductsToLoad(timeout = 60000) {
    await browser.waitUntil(async () => (await this.productCards).length > 0, {
      timeout,
      timeoutMsg: `Products did not load on the home page within ${timeout / 1000}s`,
    });
    const firstCard = (await this.productCards)[0];
    await firstCard.waitForDisplayed({ timeout: 20000 });
  }

  async clickFirstProduct() {
    await this.waitForProductsToLoad();
    const firstProduct = (await this.productCards)[0];
    await firstProduct.scrollIntoView();
    await firstProduct.waitForClickable({ timeout: 10000 });
    await firstProduct.click();
    await browser.waitUntil(async () => (await browser.getUrl()).includes("/product/"), {
      timeout: 30000,
      timeoutMsg: "Navigation to product detail page did not complete",
    });
  }

  async searchProduct(productName) {
    await this.searchInput.setValue(productName);
    await this.searchButton.click();
  }

  async getProductCardTitle(productCard) {
    const title = await productCard.$("[data-test='product-name']");
    return await title.getText();
  }

  async goToCart() {
    await super.open("/checkout");
    await browser.waitUntil(async () => (await browser.getUrl()).includes("/checkout"), {
      timeout: 30000,
      timeoutMsg: "Navigation to cart page did not complete",
    });
  }

  get searchResultTitle() {
    return $("h3");
  }

  get categoryTitle() {
    return $("h2");
  }

  async goToCategory(category) {
    await super.open(`/category/${category}`);
  }
}

export default new HomePage();

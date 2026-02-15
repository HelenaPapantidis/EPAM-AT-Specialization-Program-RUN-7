import BasePage from './BasePage.js';

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
    await super.open('/');
  }

  async waitForProductsToLoad(timeout = 30000) {
    await browser.waitUntil(
      async () => (await this.productCards).length > 0,
      {
        timeout,
        timeoutMsg: `Products did not load on the home page within ${timeout / 1000}s`
      }
    );
  }

  async clickFirstProduct() {
    await this.waitForProductsToLoad();
    const firstProduct = (await this.productCards)[0];
    await firstProduct.scrollIntoView();
    await firstProduct.click();
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
    await this.cartIcon.click();
  }

  async goToCategory(category) {
    await super.open(`/category/${category}`);
  }
}

export default new HomePage();

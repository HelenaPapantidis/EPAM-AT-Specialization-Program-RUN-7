import BasePage from './BasePage.js';

class HomePage extends BasePage {

  get productCards() {
    return $$("a.card");
  }

  get searchInput() {
    return $("[data-test='search-query']");
  }

  get searchButton() {
    return $("[data-test='search-submit']");
  }

  async open() {
    await super.open('/');
  }

  async waitForProductsToLoad(timeout = 10000) {
    await browser.waitUntil(
      async () => (await this.productCards).length > 0,
      { timeout, timeoutMsg: 'Products did not load within timeout' }
    );
  }

  async clickFirstProduct() {
    await this.waitForProductsToLoad();
    const first = (await this.productCards)[0];
    await first.scrollIntoView();
    await first.click();
  }

  async getProductCardTitle(card) {
    const title = await card.$("[data-test='product-name']");
    return await title.getText();
  }

  async getProductCount() {
    await this.waitForProductsToLoad();
    return (await this.productCards).length;
  }

  async goToCategory(slug) {
    await super.open(`/category/${slug}`);
  }
}

export default new HomePage();

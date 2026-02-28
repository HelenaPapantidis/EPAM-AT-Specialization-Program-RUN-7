import BasePage from "./BasePage.js";

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

  get searchCaption() {
    return $("h3[data-test='search-caption']");
  }

  async open() {
    await super.open("/");
  }

  async waitForProductsToLoad(timeout = 30000) {
    await browser.waitUntil(async () => (await this.productCards).length > 0, {
      timeout,
      timeoutMsg: "Products did not load within timeout",
    });
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

  get categoriesMenu() {
    return $('[data-test="nav-categories"]');
  }
  get categoryPageTitle() {
    return $('[data-test="page-title"], h1');
  }

  async clickCategory(categoryName) {
    await this.categoriesMenu.click();
    const categoryLink = await $(`a=${categoryName}`);
    await categoryLink.waitForDisplayed({ timeout: 10000 });
    await categoryLink.click();
  }
}

export default new HomePage();

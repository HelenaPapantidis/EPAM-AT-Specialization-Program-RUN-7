import BasePage from "./BasePage.js";

class HomePage extends BasePage {
  // Selectors
  get productCards() {
    return $$("a.card");
  }

  get searchInput() {
    return $("[data-test='search-query']");
  }

  get searchButton() {
    return $("[data-test='search-submit']");
  }

  get searchPageTitle() {
    return $("h3[data-test='search-caption']");
  }

  get categoriesMenu() {
    return $('[data-test="nav-categories"]');
  }

  get categoryPageTitle() {
    return $('[data-test="page-title"], h1');
  }

  // Actions
  async open() {
    await super.open("/");
  }

  async waitForProductsToLoad() {
    await this.pollWithRetry(
      async () => (await this.productCards).length > 0,
      "Products did not load"
    );
  }

  async clickFirstProduct() {
    await this.waitForProductsToLoad();
    const first = (await this.productCards)[0];
    const productNameElement = await first.$('[data-test="product-name"]');
    await productNameElement.waitForDisplayed({ timeout: 30000 });
    const name = await productNameElement.getText();
    await this.scrollAndClick(first);
    await this.waitForUrlContains("/product/", 30000, "Product detail page did not open");
    return name;
  }

  async getSearchPageTitleText() {
    await this.searchPageTitle.waitForDisplayed();
    return await this.searchPageTitle.getText();
  }

  async getCategoryPageTitleText() {
    await this.categoryPageTitle.waitForDisplayed();
    return await this.categoryPageTitle.getText();
  }
}

export default new HomePage();

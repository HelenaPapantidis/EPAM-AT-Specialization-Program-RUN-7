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

  async waitForProductsToLoad(timeout = 30000) {
    try {
      await browser.waitUntil(async () => (await this.productCards).length > 0, {
        timeout,
        timeoutMsg: "Products did not load within timeout",
      });
    } catch {
      await browser.refresh();
      await browser.waitUntil(async () => (await this.productCards).length > 0, {
        timeout,
        timeoutMsg: "Products did not load within timeout after refresh",
      });
    }
  }

  async clickFirstProduct() {
    await this.waitForProductsToLoad();
    const first = (await this.productCards)[0];
    const productNameElement = await first.$('[data-test="product-name"]');
    await productNameElement.waitForDisplayed({ timeout: 30000 });
    const name = await productNameElement.getText();
    await first.scrollIntoView();

    // Slow UI occasionally swallows the first click; retry once if URL does not change.
    await first.click();
    const navigatedOnFirstTry = await browser
      .waitUntil(async () => (await browser.getUrl()).includes("/product/"), {
        timeout: 15000,
        interval: 500,
      })
      .then(() => true)
      .catch(() => false);

    if (!navigatedOnFirstTry) {
      await first.click();
      await browser.waitUntil(async () => (await browser.getUrl()).includes("/product/"), {
        timeout: 30000,
        interval: 500,
        timeoutMsg: "Product detail page did not open after retry",
      });
    }

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

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

  get cartQuantityBadge() {
    return $("[data-test='cart-quantity']");
  }

  async open() {
    await super.open('/');
  }

  async waitForProductsToLoad(timeout = 10000) {
    await browser.waitUntil(
      async () => (await this.productCards).length > 0,
      {
        timeout,
        timeoutMsg: 'Products did not load on the home page within 10s'
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
    await this.setInputValue(this.searchInput, productName);
    await this.clickElement(this.searchButton);
  }

  async getProductCardTitle(productCard) {
    const title = await productCard.$("[data-test='product-name']");
    return await title.getText();
  }

  async getProductCount() {
    await this.waitForProductsToLoad();
    return (await this.productCards).length;
  }

  async goToCart() {
    await this.clickElement(this.cartIcon);
  }

  async getCartQuantity() {
    return await this.getElementText(this.cartQuantityBadge);
  }

  async waitForCartUpdate(timeout = 10000) {
    await browser.waitUntil(
      async () => {
        const cartBadge = await this.cartQuantityBadge;
        return (await cartBadge.isExisting()) && (await cartBadge.getText()) !== "0";
      },
      { timeout, timeoutMsg: "Cart did not update" }
    );
  }

  async goToCategory(category) {
    await super.open(`/category/${category}`);
  }
}

export default new HomePage();

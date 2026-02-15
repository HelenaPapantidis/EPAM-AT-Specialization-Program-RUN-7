export class ProductGridComponent extends BasePage {
  
  constructor(page) {
    super(page);
  }

  get products() {
    return this.page.locator("a.card");
  }

  async waitUntilLoaded() {
    await this.products.first().waitFor();
  }

  async openFirstProduct() {
    await this.waitUntilLoaded();
    await this.products.first().click();
  }

  async getProductCount() {
    return await this.products.count();
  }
}

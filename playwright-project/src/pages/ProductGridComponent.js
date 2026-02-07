export class ProductGridComponent {
  constructor(page) {
    this.page = page;
    this.products = page.locator("a.card");
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

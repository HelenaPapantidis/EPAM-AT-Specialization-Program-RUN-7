export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.successMessage = page.getByRole("alert", {
      name: "Product added to shopping cart.",
    });
  }

  async waitForProductToLoad(productName) {
    await this.page
      .getByRole("heading", { name: productName })
      .waitFor({ state: "visible" });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async verifySuccessMessage() {
    await this.successMessage.waitFor({ state: "visible" });
  }

  async verifyProductInCart(productName) {
    await this.page
      .locator(`text=${productName}`)
      .first()
      .waitFor({ state: "visible" });
  }
}

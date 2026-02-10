export class ProductPage extends BasePage {
  
  constructor(page) {
    super(page);
  }

  get addToCartButton() {
    return this.page.locator('[data-test="add-to-cart"]');
  }

  get successMessage() {
    return this.page.getByRole("alert", {
      name: "Product added to shopping cart.",
    });
  }

   getProductHeading(productName) {
    return this.page.getByRole("heading", { name: productName });
  }

  getProductInCart(productName) {
    return this.page.locator(`text=${productName}`).first();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}

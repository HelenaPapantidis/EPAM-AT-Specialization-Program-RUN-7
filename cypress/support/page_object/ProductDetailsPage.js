class ProductDetailsPage {
  get productName() {
    return cy.get('[data-test="product-name"]');
  }

  get addToCartButton() {
    return cy.get("#btn-add-to-cart");
  }

  get descriptionBox() {
    return cy.get('[data-test="product-description"]');
  }
}

export default new ProductDetailsPage();

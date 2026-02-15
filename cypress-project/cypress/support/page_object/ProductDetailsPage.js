class ProductDetailsPage {
  get productName() {
    return cy.get('h1');
  }

  get addToCartButton() {
    return cy.get('#btn-add-to-cart');
  }

  get descriptionBox() {
    return cy.get('[data-test="product-description"]');
  }
}

export default new ProductDetailsPage();
class ProductDetailsPage {
  getProductName() {
    return cy.get('h1');
  }

  getAddToCartButton() {
    return cy.get('#btn-add-to-cart');
  }

  getDescriptionBox() {
    return cy.get('[data-test="product-description"]');
  }
}

export default new ProductDetailsPage();
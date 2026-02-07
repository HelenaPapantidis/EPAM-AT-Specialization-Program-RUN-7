   
class HomePage {
  // Product getters
  getProductItems() {
    return cy.get('a.card');
  }

  getProductTitleElements() {
    return cy.get('a.card .card-title');
  }

  // Search getters
  getSearchInput() {
    return cy.get('[data-test="search-query"]');
  }

  getSearchButton() {
    return cy.get('[data-test="search-submit"]');
  }

  // Category getters
  getCategoriesMenu() {
    return cy.get('[data-cy=categories-menu]');
  }
  
   getSearchCaption() {
    return cy.get('h3[data-test="search-caption"]');
  }
  // Actions
  clickFirstProduct() {
    this.getProductItems().first().click();
  }

  searchProduct(searchTerm) {
    this.getSearchInput().clear().type(searchTerm);
    this.getSearchButton().click();
  }

  openCategoriesMenu() {
    this.getCategoriesMenu().click();
  }

  selectHandToolsCategory() {
    cy.get('[data-cy=category-hand-tools]').click();
  }
}

export default new HomePage();
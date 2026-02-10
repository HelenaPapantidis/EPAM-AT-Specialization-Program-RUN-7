class HomePage {
  
  get productItems() {
    return cy.get('a.card');
  }

  get productTitleElements() {
    return cy.get('a.card .card-title');
  }

  get searchInput() {
    return cy.get('[data-test="search-query"]');
  }

  get searchButton() {
    return cy.get('[data-test="search-submit"]');
  }

  get categoriesMenu() {
    return cy.get('[data-cy=categories-menu]');
  }

  get searchCaption() {
    return cy.get('h3[data-test="search-caption"]');
  }

  clickFirstProduct() {
    this.productItems.first().click();
  }

  searchProduct(searchTerm) {
    this.searchInput.clear().type(searchTerm);
    this.searchButton.click();
  }

  openCategoriesMenu() {
    this.categoriesMenu.click();
  }

  selectHandToolsCategory() {
    cy.get('[data-cy=category-hand-tools]').click();
  }
}

export default new HomePage();
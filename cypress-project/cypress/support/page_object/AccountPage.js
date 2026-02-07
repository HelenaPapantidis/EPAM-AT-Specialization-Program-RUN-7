class AccountPage {
  clickProfileLink() {
    cy.get('[data-test="nav-profile"]').should('be.visible').click();
  }
}

export default new AccountPage();

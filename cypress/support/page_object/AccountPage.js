class AccountPage {
  get profileLink() {
    return cy.get('[data-test="nav-profile"]');
  }

  clickProfileLink() {
    this.profileLink.should('be.visible').click();
  }
}

export default new AccountPage();
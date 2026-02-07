class LoginPage {
    // Login action
    login(email, password) {
      this.getEmailInput().clear().type(email);
      this.getPasswordInput().clear().type(password);
      this.getLoginButton().click();
    }
  // Navigation
  goToLogin() {
    cy.visit('auth/login');
  }

  // Getters - samo zaauth.cy.js test gde testiraš step-by-step
  getEmailInput() {
    return cy.get('[data-test="email"]');
  }

  getPasswordInput() {
    return cy.get('[data-test="password"]');
  }

  getLoginButton() {
    return cy.get('[data-test="login-submit"]');
  }

  getPageHeading() {
    return cy.get('h1');
  }

  // Assertion helper
  verifyLoginSuccess() {
    cy.url().should('include', '/account');
  }
}

export default new LoginPage();
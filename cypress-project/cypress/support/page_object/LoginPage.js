class LoginPage {
  get emailInput() {
    return cy.get('[data-test="email"]');
  }

  get passwordInput() {
    return cy.get('[data-test="password"]');
  }

  get loginButton() {
    return cy.get('[data-test="login-submit"]');
  }

  get pageHeading() {
    return cy.get('h1');
  }

  goToLogin() {
    cy.visit('auth/login');
  }

  login(email, password) {
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
    this.loginButton.click();
  }
}

export default new LoginPage();
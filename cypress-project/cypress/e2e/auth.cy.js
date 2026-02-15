import LoginPage from "../support/page_object/LoginPage";
import RegisterPage from "../support/page_object/RegisterPage";
import { generateRegistrationData } from "../fixtures/testDataGenerator";

describe("Login and registration", () => {
  describe("Registration", () => {
    it("Successful user registration", () => {
      cy.visit("/auth/login");
      RegisterPage.clickRegisterLinkFromLogin();
      const userData = generateRegistrationData();

      RegisterPage.fillRegistrationForm(userData);

      RegisterPage.clickRegisterButton();

      cy.url().should('include', 'auth/login');
    });
  });

  describe("Login", () => {
    it("Successful user login", () => {
      LoginPage.goToLogin();
      LoginPage.emailInput.type(Cypress.env("USER_EMAIL"));
      LoginPage.passwordInput.type(Cypress.env("USER_PASSWORD"));
      LoginPage.loginButton.click();

      cy.url().should("include", "/account");

      LoginPage.pageHeading.should("contain.text", "My account");
    });
  });
});

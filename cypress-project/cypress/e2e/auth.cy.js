import LoginPage from "../support/page_object/LoginPage";
import RegisterPage from "../support/page_object/RegisterPage";
import { generateRegistrationData } from "../fixtures/testDataGenerator";

describe("Login and registration", () => {
  describe("Registration", () => {
    it("Successful user registration", () => {
      cy.visit("/auth/login");
      RegisterPage.clickRegisterLinkFromLogin();
      const userData = generateRegistrationData();

      // RegisterPage.clickRegisterLinkFromLogin();
      // cy.url().should("include", "auth/register");

      RegisterPage.fillRegistrationForm(userData);

      RegisterPage.clickRegisterButton();

      RegisterPage.verifyRedirectedToLogin();
    });
  });

  describe("Login", () => {
    it("Successful user login", () => {
      LoginPage.goToLogin();
      LoginPage.getEmailInput().type(Cypress.env("USER_EMAIL"));
      LoginPage.getPasswordInput().type(Cypress.env("USER_PASSWORD"));
      LoginPage.getLoginButton().click();

      cy.url().should("include", "/account");

      LoginPage.getPageHeading().should("contain.text", "My account");
    });
  });
});

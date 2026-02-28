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

      cy.url().should("include", "auth/login");
    });
  });

  describe("Login", () => {
    it("Successful user login", () => {
      cy.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
    });
  });
});
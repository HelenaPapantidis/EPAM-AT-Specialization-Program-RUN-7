import ProfilePage from "../support/page_object/ProfilePage";

describe("User profile", () => {
  it("Update profile information", () => {
    cy.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));

    cy.visit("/account/profile");

    cy.url().should("include", "/profile");

    // Load profile update data from fixture
    cy.fixture("newProfileData").then((data) => {
      // And the user updates profile fields
      ProfilePage.updateProfile(data.profileUpdateData);

      ProfilePage.successMessageText.should(
        "contain",
        "Your profile is successfully updated!",
      );
    });
  });
});

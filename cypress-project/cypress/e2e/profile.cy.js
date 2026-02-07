import ProfilePage from "../support/page_object/ProfilePage";
import LoginPage from "../support/page_object/LoginPage";

describe("User profile", () => {
  it("Update profile information", () => {
    
    LoginPage.goToLogin();
    LoginPage.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
    LoginPage.verifyLoginSuccess();
    cy.goToProfile();

    // Load profile update data from fixture
    cy.fixture("newProfileData").then((data) => {
      // And the user updates profile fields
      ProfilePage.updateProfile(data.profileUpdateData);

      ProfilePage.getSuccessMessageText().should(
        "contain",
        "Your profile is successfully updated!",
      );
    });
  });
});

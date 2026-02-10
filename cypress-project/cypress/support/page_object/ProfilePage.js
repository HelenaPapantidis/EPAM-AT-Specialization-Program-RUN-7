class ProfilePage {
  get firstNameInput() {
    return cy.get('[data-test="first-name"]');
  }

  get lastNameInput() {
    return cy.get('[data-test="last-name"]');
  }

  get phoneInput() {
    return cy.get('[data-test="phone"]');
  }

  get postalCodeInput() {
    return cy.get('[data-test="postal_code"]');
  }

  get cityInput() {
    return cy.get('[data-test="city"]');
  }

  get stateInput() {
    return cy.get('[data-test="state"]');
  }

  get updateProfileButton() {
    return cy.get('[data-test="update-profile-submit"]');
  }

  get successMessage() {
    return cy.get("div.alert-success", { timeout: 20000 });
  }

  updateProfile({ firstName, lastName, phone, postalCode, city, state }) {
    this.firstNameInput.clear().type(firstName);
    this.lastNameInput.clear().type(lastName);
    this.phoneInput.clear().type(phone);
    this.postalCodeInput.clear().type(postalCode);
    this.cityInput.clear().type(city);
    this.stateInput.clear().type(state);
    this.updateProfileButton.click();
  }

  get successMessageText() {
    return this.successMessage.invoke('text');
  }
}

export default new ProfilePage();
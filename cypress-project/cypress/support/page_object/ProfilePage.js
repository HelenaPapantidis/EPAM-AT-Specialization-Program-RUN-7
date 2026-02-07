class ProfilePage {
  
  getFirstNameInput() {
    return cy.get('[data-test="first-name"]');
  }

  getLastNameInput() {
    return cy.get('[data-test="last-name"]');
  }

  getPhoneInput() {
    return cy.get('[data-test="phone"]');
  }

  getPostalCodeInput() {
    return cy.get('[data-test="postal_code"]');
  }

  getCityInput() {
    return cy.get('[data-test="city"]');
  }

  getStateInput() {
    return cy.get('[data-test="state"]');
  }

  getUpdateProfileButton() {
    return cy.get('[data-test="update-profile-submit"]');
  }

  getSuccessMessage() {
    return cy.get("div.alert-success", { timeout: 20000 });
  }

  
  updateProfile({ firstName, lastName, phone, postalCode, city, state }) {
    this.getFirstNameInput().clear().type(firstName);
    this.getLastNameInput().clear().type(lastName);
    this.getPhoneInput().clear().type(phone);
    this.getPostalCodeInput().clear().type(postalCode);
    this.getCityInput().clear().type(city);
    this.getStateInput().clear().type(state);
    this.getUpdateProfileButton().click();
  }

  
  getSuccessMessageText() {
    return this.getSuccessMessage().invoke('text');
  }
  
}

export default new ProfilePage();
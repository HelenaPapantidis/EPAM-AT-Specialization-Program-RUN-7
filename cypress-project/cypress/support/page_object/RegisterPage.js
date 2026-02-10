class RegisterPage {
  get firstNameInput() {
    return cy.get('[data-test="first-name"]');
  }

  get lastNameInput() {
    return cy.get('[data-test="last-name"]');
  }

  get dateOfBirthInput() {
    return cy.get('[data-test="dob"]');
  }

  get streetInput() {
    return cy.get('[data-test="street"]');
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

  get countrySelect() {
    return cy.get('[data-test="country"]');
  }

  get phoneInput() {
    return cy.get('[data-test="phone"]');
  }

  get emailInput() {
    return cy.get('[data-test="email"]');
  }

  get passwordInput() {
    return cy.get('[data-test="password"]');
  }

  get registerButton() {
    return cy.get('[data-test="register-submit"]');
  }

  clickRegisterLinkFromLogin() {
    cy.contains('a', 'Register your account').click();
  }

  fillRegistrationForm({
    firstName, lastName, dob, street, postcode,
    city, state, country, phone, email, password
  }) {
    this.firstNameInput.clear().type(firstName);
    this.lastNameInput.clear().type(lastName);
    this.dateOfBirthInput.clear().type(dob);
    this.streetInput.clear().type(street);
    this.postalCodeInput.clear().type(postcode);
    this.cityInput.clear().type(city);
    this.stateInput.clear().type(state);
    this.countrySelect.select(country);
    this.phoneInput.clear().type(phone);
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
  }

  clickRegisterButton() {
    this.registerButton.click();
  }
}

export default new RegisterPage();
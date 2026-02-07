class RegisterPage {
  
  // Getters
  
  getFirstNameInput() {
    return cy.get('[data-test="first-name"]');
  }

  getLastNameInput() {
    return cy.get('[data-test="last-name"]');
  }

  getDateOfBirthInput() {
    return cy.get('[data-test="dob"]');
  }

  getStreetInput() {
    return cy.get('[data-test="street"]');
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

  getCountrySelect() {
    return cy.get('[data-test="country"]');
  }

  getPhoneInput() {
    return cy.get('[data-test="phone"]');
  }

  getEmailInput() {
    return cy.get('[data-test="email"]');
  }

  getPasswordInput() {
    return cy.get('[data-test="password"]');
  }
 
  getRegisterButton() {
    return cy.get('[data-test="register-submit"]');
  }

 
  // Actions

  clickRegisterLinkFromLogin() {
    cy.contains('a', 'Register your account').click();
  }

  fillRegistrationForm({
    firstName,
    lastName,
    dob,
    street,
    postcode,
    city,
    state,
    country,
    phone,
    email,
    password
  }) {
    this.getFirstNameInput().clear().type(firstName);
    this.getLastNameInput().clear().type(lastName);
    this.getDateOfBirthInput().clear().type(dob);
    this.getStreetInput().clear().type(street);
    this.getPostalCodeInput().clear().type(postcode);
    this.getCityInput().clear().type(city);
    this.getStateInput().clear().type(state);
    this.getCountrySelect().select(country);
    this.getPhoneInput().clear().type(phone);
    this.getEmailInput().clear().type(email);
    this.getPasswordInput().clear().type(password);
  }

  clickRegisterButton() {
    this.getRegisterButton().click();
  }

  
  verifyRedirectedToLogin() {
    cy.url().should('include', 'auth/login');
  }
}

export default new RegisterPage();
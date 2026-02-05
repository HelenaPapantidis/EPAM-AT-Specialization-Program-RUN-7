import BasePage from './BasePage.js';

class RegistrationPage extends BasePage {
  
  get firstNameInput() {
    return $("[data-test='first-name']");
  }

  get lastNameInput() {
    return $("[data-test='last-name']");
  }

  get dobInput() {
    return $("#dob");
  }

  get streetInput() {
    return $("[data-test='street']");
  }

  get postalCodeInput() {
    return $("#postal_code");
  }

  get cityInput() {
    return $("[data-test='city']");
  }

  get stateInput() {
    return $("[data-test='state']");
  }

  get countrySelect() {
    return $("#country");
  }

  get phoneInput() {
    return $("#phone");
  }

  get emailInput() {
    return $("#email");
  }

  get passwordInput() {
    return $("#password");
  }

  get registerButton() {
    return $("[data-test='register-submit']");
  }

  async fillRegistrationForm(userData) {
    await this.setInputValue(this.firstNameInput, userData.firstName);
    await this.setInputValue(this.lastNameInput, userData.lastName);
    await this.setInputValue(this.dobInput, userData.dob);
    await this.setInputValue(this.streetInput, userData.street);
    await this.setInputValue(this.postalCodeInput, userData.postalCode);
    await this.setInputValue(this.cityInput, userData.city);
    await this.setInputValue(this.stateInput, userData.state);
    await this.selectByVisibleText(this.countrySelect, userData.country);
    await this.setInputValue(this.phoneInput, userData.phone);
    await this.setInputValue(this.emailInput, userData.email);
    await this.setInputValue(this.passwordInput, userData.password);
  }

  
  async submitRegistration() {
    await this.registerButton.scrollIntoView();
    await this.waitForElement(this.registerButton);
    await this.clickElement(this.registerButton);
    // Wait for redirect to login page
    await browser.pause(3000);
  }

  
  async register(userData) {
    await this.fillRegistrationForm(userData);
    await this.submitRegistration();
  }
}

export default new RegistrationPage();

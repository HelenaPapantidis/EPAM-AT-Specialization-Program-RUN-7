import BasePage from "./BasePage.js";

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

  async fillField(element, value) {
    await element.clearValue();
    await element.setValue(value);
  }

  async fillRegistrationForm(userData) {
    await this.fillField(this.firstNameInput, userData.firstName);
    await this.fillField(this.lastNameInput, userData.lastName);
    await this.fillField(this.dobInput, userData.dob);
    await this.fillField(this.streetInput, userData.street);
    await this.fillField(this.postalCodeInput, userData.postalCode);
    await this.fillField(this.cityInput, userData.city);
    await this.fillField(this.stateInput, userData.state);
    await this.countrySelect.waitForDisplayed();
    await this.countrySelect.selectByVisibleText(userData.country);
    await this.fillField(this.phoneInput, userData.phone);
    await this.fillField(this.emailInput, userData.email);
    await this.fillField(this.passwordInput, userData.password);
  }

  async submitRegistration() {
    await this.scrollAndClick(this.registerButton);
  }
}

export default new RegistrationPage();

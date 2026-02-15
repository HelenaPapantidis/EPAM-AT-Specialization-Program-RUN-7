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
    await this.firstNameInput.setValue(userData.firstName);
    await this.lastNameInput.setValue(userData.lastName);
    await this.dobInput.setValue(userData.dob);
    await this.streetInput.setValue(userData.street);
    await this.postalCodeInput.setValue(userData.postalCode);
    await this.cityInput.setValue(userData.city);
    await this.stateInput.setValue(userData.state);
    await this.countrySelect.selectByVisibleText(userData.country);
    await this.phoneInput.setValue(userData.phone);
    await this.emailInput.setValue(userData.email);
    await this.passwordInput.setValue(userData.password);
  }

  async submitRegistration() {
    await this.registerButton.scrollIntoView();
    await this.registerButton.click();
  }

  async register(userData) {
    await this.fillRegistrationForm(userData);
    await this.submitRegistration();
  }
}

export default new RegistrationPage();

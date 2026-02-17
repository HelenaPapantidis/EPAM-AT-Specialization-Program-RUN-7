import BasePage from "./BasePage.js";

class ProfilePage extends BasePage {
  get firstNameInput() {
    return $("[data-test='first-name']");
  }
  get lastNameInput() {
    return $("[data-test='last-name']");
  }
  get phoneInput() {
    return $("[data-test='phone']");
  }
  get postalCodeInput() {
    return $("[data-test='postal_code']");
  }
  get cityInput() {
    return $("[data-test='city']");
  }
  get stateInput() {
    return $("[data-test='state']");
  }
  get updateProfileButton() {
    return $("[data-test='update-profile-submit']");
  }
  get successAlert() {
    return $("div.alert-success");
  }

  async open() {
    await super.open("/account/profile");
  }

  async waitForPageLoad(timeout = 30000) {
    await this.firstNameInput.waitForDisplayed({ timeout });
  }

  async updateProfile({ firstName, lastName, phone, postalCode, city, state }) {
    await this.waitForPageLoad();

    // Clear and set each form field
    await this.firstNameInput.clearValue();
    await this.firstNameInput.setValue(firstName);

    await this.lastNameInput.clearValue();
    await this.lastNameInput.setValue(lastName);

    await this.phoneInput.clearValue();
    await this.phoneInput.setValue(phone);

    await this.postalCodeInput.clearValue();
    await this.postalCodeInput.setValue(postalCode);

    await this.cityInput.clearValue();
    await this.cityInput.setValue(city);

    await this.stateInput.clearValue();
    await this.stateInput.setValue(state);

    await this.updateProfileButton.scrollIntoView();
    await this.updateProfileButton.waitForClickable({ timeout: 20000 });
    await this.updateProfileButton.click();
  }

  async waitForUpdateSuccess(timeout = 30000) {
    await this.successAlert.waitForDisplayed({ timeout });
  }
}

export default new ProfilePage();

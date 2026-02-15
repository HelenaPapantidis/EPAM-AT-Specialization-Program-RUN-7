import BasePage from './BasePage.js';

class ProfilePage extends BasePage {

  get firstNameInput() { return $("[data-test='first-name']"); }
  get lastNameInput() { return $("[data-test='last-name']"); }
  get phoneInput() { return $("[data-test='phone']"); }
  get streetInput() { return $("[data-test='street']"); }
  get postalCodeInput() { return $("[data-test='postal_code']"); }
  get cityInput() { return $("[data-test='city']"); }
  get updateProfileButton() { return $("[data-test='update-profile-submit']"); }
  get successAlert() { return $(".alert.alert-success"); }

  async open() {
    await super.open('/account/profile');
  }

  async waitForPageLoad(timeout = 30000) {
    await this.firstNameInput.waitForDisplayed({ timeout });
  }

  async updateProfile({ firstName, lastName, phone, street, postalCode, city }) {
    await this.waitForPageLoad();

    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.phoneInput.setValue(phone);
    await this.streetInput.setValue(street);
    await this.postalCodeInput.setValue(postalCode);
    await this.cityInput.setValue(city);

    await this.updateProfileButton.scrollIntoView();
    await this.updateProfileButton.waitForClickable({ timeout: 30000 });
    await this.updateProfileButton.click();
  }
}

export default new ProfilePage();

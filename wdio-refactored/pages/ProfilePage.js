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

  async waitForPageLoad(timeout = 10000) {
    await this.waitForElement(this.firstNameInput, timeout);
  }

  async updateProfile(profileData) {
    await this.waitForPageLoad();

    const fieldMap = {
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
      phone: this.phoneInput,
      street: this.streetInput,
      postalCode: this.postalCodeInput,
      city: this.cityInput
    };

    for (const [key, element] of Object.entries(fieldMap)) {
      if (profileData[key] !== undefined) {
        await element.waitForClickable();
        // 2. setValue automatic erases existing value, so we can directly set the new value
        await element.setValue(profileData[key]);
      }
    }

    // Click update profile button
    await this.scrollAndClick(this.updateProfileButton);
  }

  async successAlertText() {
    await this.waitForElement(this.successAlert).getText();
  }


}

export default new ProfilePage();

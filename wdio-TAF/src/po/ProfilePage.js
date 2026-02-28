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
  get streetInput() {
    return $("[data-test='street']");
  }
  get postalCodeInput() {
    return $("[data-test='postal_code']");
  }
  get cityInput() {
    return $("[data-test='city']");
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

    // Helper to clear and set value efficiently
    const clearAndSet = async (element, value) => {
      await element.click();
      await browser.keys(['Control', 'a']);
      await browser.keys(['Backspace']);
      await element.setValue(value);
    };

    if (firstName) await clearAndSet(this.firstNameInput, firstName);
    if (street) await clearAndSet(this.streetInput, street);
    if (postalCode) await clearAndSet(this.postalCodeInput, postalCode);
    if (city) await clearAndSet(this.cityInput, city);
    if (lastName) await clearAndSet(this.lastNameInput, lastName);
    if (phone) await clearAndSet(this.phoneInput, phone);

    await this.updateProfileButton.scrollIntoView();
    await this.updateProfileButton.waitForClickable({ timeout: 20000 });
    await this.updateProfileButton.click();
  }

  async waitForUpdateSuccess(timeout = 30000) {
    await this.successAlert.waitForDisplayed({ timeout });
  }
}

export default new ProfilePage();

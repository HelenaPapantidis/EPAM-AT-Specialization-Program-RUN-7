import BasePage from "./BasePage.js";

class ProfilePage extends BasePage {
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
  get stateInput() {
    return $("[data-test='state']");
  }
  get updateProfileButton() {
    return $("[data-test='update-profile-submit']");
  }

  async open() {
    await super.open("/account/profile");
  }

  async waitForPageLoad(timeout = 30000) {
    try {
      await this.phoneInput.waitForDisplayed({ timeout });
    } catch {
      await this.open();
      await this.phoneInput.waitForDisplayed({ timeout });
    }
  }

  async updateFields(data) {
    await this.waitForPageLoad();
    await this.phoneInput.clearValue();
    await this.phoneInput.setValue(data.phone);
    await this.streetInput.clearValue();
    await this.streetInput.setValue(data.street);
    await this.postalCodeInput.clearValue();
    await this.postalCodeInput.setValue(data.postalCode);
    await this.cityInput.clearValue();
    await this.cityInput.setValue(data.city);
    await this.stateInput.clearValue();
    await this.stateInput.setValue(data.state);
  }

  async submitProfile() {
    await this.updateProfileButton.scrollIntoView();
    await this.updateProfileButton.waitForClickable({ timeout: 30000 });
    await this.updateProfileButton.click();
  }
}

export default new ProfilePage();

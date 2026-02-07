export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.dob = page.locator('[data-test="dob"]');
    this.street = page.locator('[data-test="street"]');
    this.postalcode = page.locator('[data-test="postal_code"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.registerButton = page.locator('[data-test="register-submit"]');
  }

  async open() {
    await this.page.goto("/auth/register");
  }

  async register(user) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dob.fill(user.dob);
    await this.street.fill(user.street);
    await this.state.fill(user.state);
    await this.postalcode.fill(user.postalcode);
    await this.city.fill(user.city);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.registerButton.click();
  }
}

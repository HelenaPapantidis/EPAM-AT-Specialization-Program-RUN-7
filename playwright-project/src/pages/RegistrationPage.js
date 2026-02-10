export class RegistrationPage extends BasePage {
  
  constructor(page) {
    super(page);
  }

  get firstName() {
    return this.page.locator('[data-test="first-name"]');
  }
  get lastName() {
    return this.page.locator('[data-test="last-name"]');
  }
  get dob() {
    return this.page.locator('[data-test="dob"]');
  }
  get street() {
    return this.page.locator('[data-test="street"]');
  }
  get postalcode() {
    return this.page.locator('[data-test="postal_code"]');
  }
  get city() {
    return this.page.locator('[data-test="city"]');
  }
  get state() {
    return this.page.locator('[data-test="state"]');
  }
  get email() {
    return this.page.locator('[data-test="email"]');
  }
  get password() {
    return this.page.locator('[data-test="password"]');
  }
  get registerButton() {
    return this.page.locator('[data-test="register-submit"]');
  }

  async open() {
  await super.open("/auth/register");
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

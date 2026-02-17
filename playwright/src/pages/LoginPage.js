import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage{
  
  constructor(page) {
    super(page);
  }

async open() {
  await super.open("/auth/login");
}

  get emailInput() {
    return this.page.locator('[data-test="email"]');
  }

  get passwordInput() {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton() {
    return this.page.locator('[data-test="login-submit"]');
  }

    async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

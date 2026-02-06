import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  
  get emailInput() {
    return $("[data-test='email']");
  }

  get passwordInput() {
    return $("[data-test='password']");
  }

  get loginButton() {
    return $("[data-test='login-submit']");
  }

  get registerLink() {
    return $("[data-test='register-link']");
  }

  async open() {
    await super.open('/auth/login');
  }

  async login(email, password) {
    await this.setInputValue(this.emailInput, email);
    await this.setInputValue(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async goToRegister() {
    await this.clickElement(this.registerLink);
  }
}

export default new LoginPage();

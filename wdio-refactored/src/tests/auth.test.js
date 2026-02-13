import { LoginPage, RegistrationPage } from '../po/index.js';
import { generateUserData } from '../helpers/index.js';
import { validUser } from '../data/index.js';

describe("Auth Scenarios", () => {

  it("should register a new user", async () => {
    const userData = generateUserData();

    await LoginPage.open();
    await LoginPage.goToRegister();
    await RegistrationPage.register(userData);

    await expect(browser).toHaveUrl(expect.stringContaining('/auth/login'), { timeout: 30000 });
  });

  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login(validUser.email, validUser.password);
    await expect(browser).toHaveUrl(expect.stringContaining('/account'));
  });
});

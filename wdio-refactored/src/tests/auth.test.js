import LoginPage from '../po/LoginPage.js';
import RegistrationPage from '../po/RegistrationPage.js';
import { generateUserData } from '../helpers/testHelpers.js';
import { validUser } from '../data/users.js';

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

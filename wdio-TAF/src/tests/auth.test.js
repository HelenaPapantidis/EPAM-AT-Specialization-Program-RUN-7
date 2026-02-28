import { LoginPage, RegistrationPage } from '../po/index.js';
import { generateUserData, loginToAccount } from '../helpers/index.js';
import { validUser } from '../data/index.js';

describe("Auth Scenarios", () => {

  it("should register a new user", async () => {
    const userData = generateUserData();

    await LoginPage.open();
    await LoginPage.goToRegister();
    await RegistrationPage.register(userData);

    await RegistrationPage.waitForLoginRedirect();

    await expect(browser).toHaveUrl(/\/auth\/login/, { timeout: 30000 });
  });

  it("should login with valid credentials", async () => {
    await loginToAccount(validUser.email, validUser.password);
    await expect(browser).toHaveUrl(/\/account/, { timeout: 5000 });
  });
});

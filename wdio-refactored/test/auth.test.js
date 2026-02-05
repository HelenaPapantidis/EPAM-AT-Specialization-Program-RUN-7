import LoginPage from '../pages/LoginPage.js';
import RegistrationPage from '../pages/RegistrationPage.js';
import { generateUserData } from '../helpers/testHelpers.js';
import { validUser } from '../data/users.js';

describe("Auth Scenarios", () => {

  it.skip("should register a new user", async () => {
    // Generate random user data
    const userData = generateUserData();

    // Navigate to login page and go to registration
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

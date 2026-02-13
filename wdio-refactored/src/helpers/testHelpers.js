import { LoginPage } from '../po/index.js';
import { validUser, testUserTemplate } from '../data/index.js';

export function generateRandomEmail() {
  return `testuser${Date.now()}@mail.com`;
}

export function generateUserData(overrides = {}) {
  return {
    ...testUserTemplate,
    email: generateRandomEmail(),
    ...overrides
  };
}

export async function loginAsValidUser(email = validUser.email, password = validUser.password) {
  await LoginPage.open();
  await LoginPage.login(email, password);
  await LoginPage.waitForUrlContains("/account", 10000, "Login did not complete");
}

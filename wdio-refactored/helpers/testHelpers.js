import LoginPage from '../pages/LoginPage.js';
import { validUser, testUserTemplate } from '../data/users.js';

/**
 * Helper functions for common test operations
 */

/**
 * Generate random email for testing
 * @returns {string} Random email address
 */
export function generateRandomEmail() {
  return `testuser${Date.now()}@mail.com`;
}

/**
 * Generate random user data
 * @param {Object} overrides - Optional overrides for user data
 * @returns {Object} User data object
 */
export function generateUserData(overrides = {}) {
  return {
    ...testUserTemplate,
    email: generateRandomEmail(),
    ...overrides
  };
}

/**
 * Login with valid credentials helper
 * @param {string} email - User email (optional, defaults to valid user)
 * @param {string} password - User password (optional, defaults to valid user)
 */
export async function loginAsValidUser(email = validUser.email, password = validUser.password) {
  await LoginPage.open();
  await LoginPage.login(email, password);
  await LoginPage.waitForUrlContains("/account", 10000, "Login did not complete");
}



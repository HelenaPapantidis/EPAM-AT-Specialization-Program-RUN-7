import LoginPage from '../pages/LoginPage.js';
import { validUser } from '../data/users.js';

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
    firstName: "Test",
    lastName: "User",
    dob: "1990-01-01",
    street: "123 Test St",
    postalCode: "12345",
    city: "New York",
    state: "Minnesota",
    country: "Serbia",
    phone: "1234567890",
    email: generateRandomEmail(),
    password: "TestPassword1234!",
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

/**
 * Generate random string
 * @param {number} length - Length of random string
 * @returns {string} Random string
 */
export function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generate random phone number
 * @returns {string} Random phone number
 */
export function generateRandomPhone() {
  return `${Math.floor(Math.random() * 9000000000) + 1000000000}`;
}

/**
 * Wait for navigation to complete
 * @param {string} expectedUrl - Expected URL or URL fragment
 * @param {number} timeout - Maximum wait time in milliseconds (default: 10000)
 */
export async function waitForNavigation(expectedUrl, timeout = 10000) {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(expectedUrl),
    {
      timeout,
      timeoutMsg: `Navigation to ${expectedUrl} did not complete within ${timeout}ms`
    }
  );
}

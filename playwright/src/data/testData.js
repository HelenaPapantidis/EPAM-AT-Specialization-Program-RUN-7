/**
 * Test data - Centralized test data for all tests
 */

export const generateUniqueEmail = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `test_${timestamp}_${random}@example.com`;
};

export const generateUniqueUser = () => ({
  firstName: "Test",
  lastName: "User",
  dob: "01/01/1990",
  street: `Test Street ${Math.floor(Math.random() * 1000)}`,
  city: "Test City",
  state: "Test State",
  postalcode: "12345",
  email: generateUniqueEmail(),
  password: "Test123!@#",
});

export const validCredentials = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD
};

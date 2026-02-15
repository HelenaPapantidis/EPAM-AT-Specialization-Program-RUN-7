/**
 * Test data generator - Creates unique test data for registration
 */

export const generateUniqueEmail = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `test_${timestamp}_${random}@example.com`;
};


export const generateRegistrationData = () => ({
  firstName: "Test",
  lastName: "User",
  dob: "1990-01-01",
  street: "Test Street 1",
  postcode: "11000",
  city: "Belgrade",
  state: "Serbia",
  country: "Serbia",
  phone: "0601234567",
  email: generateUniqueEmail(),
  password: "passwordTest@1234"
});


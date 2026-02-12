export function buildValidRegistrationData(overrides = {}) {
  const unique = Date.now();
  return {
    firstName: 'Test',
    lastName: 'User',
    dob: '1990-01-01',
    street: 'Test Street 1',
    postalCode: '11000',
    city: 'Belgrade',
    state: 'Serbia',
    country: 'Serbia',
    phone: '0601234567',
    email: `test.user.${unique}@example.com`,
    password: 'CucumberPass@123',
    ...overrides
  };
}

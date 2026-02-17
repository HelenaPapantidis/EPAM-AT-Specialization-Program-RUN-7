export function buildProfileUpdateData(overrides = {}) {
  const unique = Date.now();
  return {
    firstName: `Test${unique}`,
    ...overrides
  };
}

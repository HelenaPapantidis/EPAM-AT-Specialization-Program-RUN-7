import { testUserTemplate } from '../data/index.js';

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

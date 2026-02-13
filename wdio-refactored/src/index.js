/**
 * Main Barrel Export
 * Centralized export of the entire TAF
 */

// Page Objects
export {
  BasePage,
  LoginPage,
  RegistrationPage,
  HomePage,
  ProfilePage,
  CartPage,
  FavoritesPage,
  ProductDetailsPage
} from './po/index.js';

// Test Data
export {
  validUser,
  testUserTemplate,
  searchData,
  categories,
  TIMEOUTS,
  SELECTORS,
  ERROR_MESSAGES
} from './data/index.js';

// Helpers
export {
  generateRandomEmail,
  generateUserData,
  loginAsValidUser
} from './helpers/index.js';

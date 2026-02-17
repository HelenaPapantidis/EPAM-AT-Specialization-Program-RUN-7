# WebdriverIO Test Automation Framework

A refactored WebdriverIO test automation project using **Page Object Model (POM)** architecture and best practices.

## Project Structure

```
wdio-refactored/
├── src/
│   ├── config/                 # Configuration layer
│   │   ├── wdio.conf.js       # WebdriverIO configuration
│   │   └── constants.js       # Centralized constants (timeouts, selectors)
│   ├── data/                   # Test data layer
│   │   ├── users.js           # User credentials and templates
│   │   ├── products.js        # Product and search data
│   │   └── index.js           # Barrel export
│   ├── helpers/                # Utility functions
│   │   ├── testHelpers.js     # Helper functions for tests
│   │   └── index.js           # Barrel export
│   ├── po/                     # Page Object layer (Business layer)
│   │   ├── BasePage.js        # Base class with common methods
│   │   ├── LoginPage.js       # Login page object
│   │   ├── RegistrationPage.js # Registration page object
│   │   ├── HomePage.js        # Home page object
│   │   ├── ProductDetailsPage.js # Product details page object
│   │   ├── CartPage.js        # Cart page object
│   │   ├── ProfilePage.js     # Profile page object
│   │   ├── FavoritesPage.js   # Favorites page object
│   │   └── index.js           # Barrel export
│   ├── tests/                  # Tests layer
│   │   ├── auth.test.js       # Authentication tests
│   │   ├── browse.test.js     # Browse/search tests
│   │   ├── cart.test.js       # Shopping cart tests
│   │   ├── productDetails.test.js # Product details tests
│   │   └── profile.test.js    # Profile and favorites tests
│   └── index.js               # Main barrel export
├── Jenkinsfile                 # CI/CD pipeline configuration
├── package.json               # NPM dependencies and scripts
└── .env                       # Environment variables
```

## Key Features

### Page Object Model (POM)
- Each page has its own class encapsulating selectors and actions
- Easy maintenance and readable tests
- Code reusability

### Layered Architecture
- **Config Layer**: Framework configuration and constants
- **Data Layer**: Test data and user credentials
- **Business Layer (PO)**: Page Objects with application-specific logic
- **Tests Layer**: Test specifications

### Design Principles
- **DRY**: No code duplication, barrel exports for imports
- **KISS**: Simple, readable code
- **YAGNI**: Only necessary functionality implemented

## Installation

```bash
cd wdio-refactored
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:auth
npm run test:browse
npm run test:cart
npm run test:product
npm run test:profile
```

## Environment Variables

Create a `.env` file with:
```
TEST_USER_EMAIL=your-email@example.com
TEST_USER_PASSWORD=your-password
```

## CI/CD

Jenkins pipeline is configured in `Jenkinsfile` with:
- Parallel test execution
- Screenshot archiving on failure
- Environment credentials management

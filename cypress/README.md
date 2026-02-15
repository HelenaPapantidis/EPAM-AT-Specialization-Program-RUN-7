# Cypress E2E Tests

Cypress tests with Page Object Model for Practice Software Testing application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your test credentials

## Run Tests
```bash
# Open Cypress UI
npm run test:open

# Run all tests headless
npm test

# Run in specific browsers
npm run test:chrome
npm run test:firefox
npm run test:edge
```

## Test Coverage

- ✅ User registration
- ✅ User login
- ✅ Product browsing (search & filter)
- ✅ Product details view
- ✅ Profile update

## Project Structure
```
cypress/
├── e2e/              # Test files
├── fixtures/         # Test data
└── support/
    ├── page_object/  # Page Object Model
    └── commands.js   # Custom commands
```
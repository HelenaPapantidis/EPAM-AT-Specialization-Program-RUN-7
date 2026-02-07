# 🎭 Playwright E2E Test Automation

Modern E2E test automation framework using Playwright with clean code practices.

## ⚡ Quick Start

### 1. Installation

```bash
npm install
```

### 2. Run Tests

```bash
# Interactive UI mode (recommended)
npm run test:ui

# Headless mode
npm test

# Specific browser
npm run test:chrome

# Debug mode
npm run test:debug
```

### 3. View Report

```bash
npm run report
```

## 📁 Project Structure

```
src/
├── pages/                    # Page Object Models
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegistrationPage.js
│   ├── ProductPage.js
│   └── ProductGridComponent.js
├── data/
│   └── testData.js          # Test data & credentials
└── tests/
    ├── auth.scenario.spec.js       # Registration & login
    ├── cart.scenario.spec.js       # Cart operations
    └── search.scenario.spec.js     # Product search
```

## 📝 Test Scenarios

| Scenario         | Description                           |
| ---------------- | ------------------------------------- |
| **Registration** | User can register with valid data     |
| **Login**        | User can login with valid credentials |
| **Cart**         | User can add products to basket       |
| **Search**       | User can search for products          |

## 🔧 Configuration

### Path Aliases (jsconfig.json)

```javascript
// ✅ Modern way (2026)
import { HomePage } from "@/pages/HomePage";
import { validCredentials } from "@/data/testData";

// ❌ Old way
import { HomePage } from "../pages/HomePage";
```

### Environment Variables

Create `.env` file:

```

## 📋 Available Commands

```bash
npm test                    # Run all tests
npm run test:headed         # Show browser
npm run test:ui             # Interactive UI
npm run test:debug          # Debug mode
npm run test:chrome         # Chrome only
npm run test:firefox        # Firefox only
npm run test:safari         # Safari/WebKit
npm run report              # Open HTML report
```

## 🎯 Best Practices

✅ **Page Object Model** - Separation of concerns  
✅ **Path Aliases (`@/`)** - Clean imports  
✅ **Modern Wait Strategies** - Using `waitForURL()` not `waitForLoadState()`  
✅ **KISS & YAGNI** - No dead code  
✅ **Clean Code** - Readable & maintainable

## 🔍 Modern Wait Strategies

```javascript
// ✅ Use specific waiters
await page.waitForURL(/cart/);
await locator.waitFor();
await locator.isVisible();

// ❌ Avoid unreliable waiters
await page.waitForLoadState("networkidle"); // Too flaky
```

## 🌐 Browser Support

- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)

## 🐛 Debug & Report

```bash
# Debug tests
npm run test:debug

# Automatic on failures:
# - Screenshots
# - Videos
# - Trace files

# View HTML report
npm run report
```

## 📦 Dependencies

- `@playwright/test` - ^1.57.0
- `dotenv` - ^16.0.0


### Modern Wait Strategies

```javascript
// Wait for URL change instead of "networkidle"
await page.waitForURL(/product/);

// Wait for element to load
await page.locator("[data-test='product']").waitFor();
```

## 🤝 Contributing

Keep it clean:

- No dead code
- Use path aliases (`@/`)
- Modern wait strategies only
- Page Object Model pattern

## 🔗 Resources

- [Playwright Docs](https://playwright.dev/)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)

---



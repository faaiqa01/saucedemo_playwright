# Playwright Saucedemo Automation

> E2E Testing Framework untuk Saucedemo Swag Labs menggunakan Playwright dan TypeScript

## 📋 Overview

Project ini adalah automation testing untuk [Saucedemo Swag Labs](https://www.saucedemo.com/) menggunakan Playwright dengan arsitektur best practice:

- **Playwright** - Browser automation framework
- **TypeScript** - Type-safe development
- **Page Object Model** - Maintainable test code
- **Test Data Management** - Separated fixtures
- **Reusable Utilities** - Common helper functions

## 🏗️ Architecture

```
project-root/
├── src/
│   ├── config/          # Environment configuration
│   ├── fixtures/        # Test data dan fixtures
│   ├── pages/           # Page Object Model classes
│   │   ├── BasePage.ts           # Base class untuk semua pages
│   │   ├── SaucedemoLoginPage.ts  # Login page object
│   │   └── SaucedemoInventoryPage.ts # Inventory page object
│   └── utils/           # Utility functions
├── tests/
│   └── e2e/            # E2E tests untuk Saucedemo
│       └── saucedemo-login.spec.ts
├── playwright.config.ts # Playwright configuration
├── tsconfig.json       # TypeScript configuration
├── .env                # Environment variables
└── package.json        # Project dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 atau lebih tinggi)
- npm / yarn / pnpm

### Installation

```bash
# Install dependencies
npm install

# Install browser binaries
npx playwright install
```

### Run Tests

```bash
# Run all Saucedemo tests
npm run test:saucedemo

# Run with UI mode (recommended for debugging)
npx playwright test --ui --project=saucedemo-chromium

# Run with headed mode
npx playwright test --headed --project=saucedemo-chromium

# Run specific browser
npm run test:saucedemo:chrome
npm run test:saucedemo:firefox
npm run test:saucedemo:webkit
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run test:saucedemo` | Run Saucedemo tests on Chrome |
| `npm run test:saucedemo:chrome` | Run Saucedemo tests on Chromium |
| `npm run test:saucedemo:firefox` | Run Saucedemo tests on Firefox |
| `npm run test:saucedemo:webkit` | Run Saucedemo tests on WebKit |
| `npm run test:ui` | Run tests with UI mode |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:report` | Show HTML test report |
| `npm run install:browsers` | Install all browser binaries |
| `npm run codegen` | Generate test code with Playwright Inspector |

## 🧪 Test Coverage

### Saucedemo Login Tests

Test suite untuk login functionality Saucedemo Swag Labs:

| Test ID | Test Case | Type |
|---------|-----------|------|
| TCL-001 | User can login with standard user credentials | Positive |
| TCL-002 | User cannot login with locked out user | Negative |
| TCL-003 | User can login with problem user | Positive |
| TCL-004 | User can login with performance glitch user | Positive |
| TCL-005 | User can login with error user | Positive |
| TCL-006 | User can login with visual user | Positive |
| TCL-007 | Validation error when username is empty | Negative |
| TCL-008 | Validation error when password is empty | Negative |
| TCL-009 | User cannot login with invalid password | Negative |

### Additional Tests

- Login page elements are displayed correctly
- Login button is enabled when form is valid
- User can clear form fields
- Products are displayed after successful login

## 📚 Page Objects

### SaucedemoLoginPage

Page object untuk halaman login Saucedemo.

```typescript
import { SaucedemoLoginPage } from '../src/pages';

const loginPage = new SaucedemoLoginPage(page);
await loginPage.navigate();
await loginPage.performLogin(username, password);
```

**Available Methods:**
- `navigate()` - Navigate to login page
- `verifyPage()` - Verify login page elements
- `performLogin(username, password)` - Perform login action
- `fillLoginForm(username, password)` - Fill login form
- `fillUsername(username)` - Fill username field
- `fillPassword(password)` - Fill password field
- `clickLoginButton()` - Click login button
- `isLoginButtonEnabled()` - Check if login button is enabled
- `clearForm()` - Clear all form fields
- `getUsernameValue()` - Get username field value
- `getPasswordValue()` - Get password field value
- `assertErrorMessage(message)` - Assert error message

### SaucedemoInventoryPage

Page object untuk halaman inventory (dashboard) Saucedemo.

```typescript
import { SaucedemoInventoryPage } from '../src/pages';

const inventoryPage = new SaucedemoInventoryPage(page);
await inventoryPage.navigate();
await inventoryPage.verifyPage();
```

**Available Methods:**
- `navigate()` - Navigate to inventory page
- `verifyPage()` - Verify inventory page elements
- `isOnInventoryPage()` - Check if on inventory page
- `getProductCount()` - Get number of products
- `getProductTitles()` - Get all product titles
- `isShoppingCartVisible()` - Check if shopping cart is visible
- `clickMenuButton()` - Click menu button
- `clickShoppingCart()` - Click shopping cart
- `assertUserLoggedIn()` - Assert user is logged in
- `assertProductsDisplayed()` - Assert products are displayed
- `assertProductDisplayed(productName)` - Assert specific product is displayed
- `getPageTitle()` - Get page title
- `hasVisualIssues()` - Check for visual issues
- `hasPerformanceIssues()` - Check for performance issues

## 📦 Test Data Fixtures

Test data terpisah dari kode test untuk maintainability:

```typescript
import { getSaucedemoUserFixture, SaucedemoErrorMessages } from '../src/fixtures';

// Get user fixture
const user = getSaucedemoUserFixture('standard');

// Available user types:
// 'standard' - Standard user with valid credentials
// 'locked' - Locked out user
// 'problem' - User with visual/product issues
// 'performance' - User with performance delay
// 'error' - User that triggers errors
// 'visual' - User with different UI layout
// 'invalidPassword' - Valid username with invalid password
// 'emptyUsername' - Empty username with valid password
// 'emptyPassword' - Valid username with empty password

// Error messages
SaucedemoErrorMessages.LOCKED_OUT
SaucedemoErrorMessages.USERNAME_REQUIRED
SaucedemoErrorMessages.PASSWORD_REQUIRED
SaucedemoErrorMessages.INVALID_CREDENTIALS
```

## 🎯 Test Structure

### AAA Pattern

Semua test mengikuti Arrange-Act-Assert pattern:

```typescript
test('TCL-001: user can login with standard user credentials', async ({ page }) => {
    // Arrange
    const user = getSaucedemoUserFixture('standard');

    // Act
    await loginPage.performLogin(user.username, user.password);

    // Assert
    await inventoryPage.verifyPage();
    await expect(page).toHaveURL(/.*inventory.html/);
});
```

## 🔧 Configuration

### Environment Variables

File `.env` berisi konfigurasi environment:

```env
# Playwright Configuration
BASE_URL=https://www.saucedemo.com
CI=false
```

### Playwright Config

[`playwright.config.ts`](./playwright.config.ts) mengkonfigurasi:

- **Base URL**: https://www.saucedemo.com
- **Timeout**: 30 detik untuk test, 5 detik untuk assertion
- **Browsers**: Chromium, Firefox, WebKit
- **Projects**: saucedemo-chromium, saucedemo-firefox, saucedemo-webkit
- **Reporters**: HTML, List, JSON

### Saucedemo Projects

```typescript
{
    name: 'saucedemo-chromium',
    testMatch: /.*saucedemo.*/,
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
    },
}
```

## 🐛 Debugging

### UI Mode

UI Mode memungkinkan Anda untuk:

- Time travel melalui test execution
- Live debugging locator
- Lihat network requests
- Inspect console logs
- Lihat screenshots di setiap step

```bash
npx playwright test --ui --project=saucedemo-chromium
```

### Debug Mode

Debug mode dengan breakpoints:

```bash
npm run test:debug -- --project=saucedemo-chromium
```

### Headed Mode

Jalankan test dengan browser yang terlihat:

```bash
npm run test:headed -- --project=saucedemo-chromium
```

### Codegen

Generate test code dengan Playwright Inspector:

```bash
npm run codegen
```

## 📊 Reports

### HTML Report

```bash
npm run test:report
```

Report HTML akan terbuka di browser dengan detail:
- Test results
- Screenshots (on failure)
- Videos (on failure)
- Traces (on retry)
- Timeline view

### JSON Report

JSON report disimpan di `test-results/results.json`

## 🎨 Best Practices

Project ini mengikuti best practices:

- ✅ Gunakan **Page Object Model**
- ✅ Gunakan selector yang stabil (class, data-test attributes)
- ✅ Buat test yang **independent** dan **focused**
- ✅ Pisahkan **test data** dari kode test
- ✅ Gunakan **timeout** yang wajar dan eksplisit
- ✅ Tulis **assertion** yang spesifik
- ✅ Handle **error** dengan pesan yang jelas
- ✅ Gunakan **TypeScript strict mode**
- ✅ Follow **naming conventions**
- ✅ Gunakan **AAA pattern** (Arrange-Act-Assert)

## 🌐 Saucedemo Selectors

Saucedemo.com menggunakan selector berikut:

| Element | Selector |
|---------|----------|
| Username input | `[data-test="username"]` |
| Password input | `[data-test="password"]` |
| Login button | `[data-test="login-button"]` |
| Error message | `[data-test="error"]` |
| Login container | `.login_container` |
| Login logo | `.login_logo` |
| Header container | `.header_container` |
| Shopping cart | `.shopping_cart_link` |
| Product list | `.inventory_list` |
| Product title | `.inventory_item_name` |

## 📖 References

- [Saucedemo Swag Labs](https://www.saucedemo.com/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Page Object Model](https://playwright.dev/docs/pom)

## 📄 License

ISC

---

**Versi**: 1.0.0
**Last Updated**: 2026-03-22

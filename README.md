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
│   │   ├── BasePage.ts                   # Base class untuk semua pages
│   │   ├── SaucedemoLoginPage.ts          # Login page object
│   │   ├── SaucedemoInventoryPage.ts     # Inventory page object
│   │   ├── SaucedemoDetailProductPage.ts # Detail product page object
│   │   ├── SaucedemoCartPage.ts         # Cart page object
│   │   ├── SaucedemoCheckoutInfoPage.ts  # Checkout info page object
│   │   ├── SaucedemoCheckoutOverviewPage.ts # Checkout overview page object
│   │   └── SaucedemoCheckoutCompletePage.ts # Checkout complete page object
│   └── utils/           # Utility functions
├── tests/
│   ├── helpers/         # Helper functions dan setup
│   │   ├── auth.setup.ts        # Authentication setup untuk storage state
│   │   ├── login.helper.ts      # Login helper function
│   │   └── index.ts
│   └── e2e/            # E2E tests untuk Saucedemo
│       ├── saucedemo-login.spec.ts
│       ├── saucedemo-products.spec.ts
│       ├── saucedemo-detail-product.spec.ts
│       └── saucedemo-checkout.spec.ts
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
| `npm run test:saucedemo:setup` | Run authentication setup (generate storage state) |
| `npm run test:saucedemo:auth` | Run tests with authenticated session |
| `npm run test:ui` | Run tests with UI mode |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:report` | Show HTML test report |
| `npm run install:browsers` | Install all browser binaries |
| `npm run codegen` | Generate test code with Playwright Inspector |

## 🧪 Test Coverage

### Saucedemo Login Tests ([`saucedemo-login.spec.ts`](tests/e2e/saucedemo-login.spec.ts))

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

### Saucedemo Products Tests ([`saucedemo-products.spec.ts`](tests/e2e/saucedemo-products.spec.ts))

Test suite untuk products functionality Saucedemo Swag Labs:

| Test ID | Test Case | Type |
|---------|-----------|------|
| TCP-001 | Display all products with complete information | Smoke |
| TCP-002 | Add product to cart | Functional |
| TCP-003 | Add multiple products to cart | Functional |
| TCP-004 | Open sorting dropdown | UI/UX |
| TCP-005 | Sort products by name A to Z | Functional |
| TCP-006 | Sort products by name Z to A | Functional |
| TCP-007 | Sort products by price low to high | Functional |
| TCP-008 | Sort products by price high to low | Functional |
| TCP-009 | Open sidebar menu | UI/UX |
| TCP-010 | Navigate to All Items from sidebar | Functional |
| TCP-011 | Navigate to About page | Functional |
| TCP-012 | Logout from application | Functional |
| TCP-013 | Reset app state | Regression |
| TCP-014 | Cannot add same product twice | Functional |
| TCP-015 | Validate product price format | UI/UX |
| TCP-016 | Close sidebar | UI/UX |

### Saucedemo Detail Product Tests ([`saucedemo-detail-product.spec.ts`](tests/e2e/saucedemo-detail-product.spec.ts))

Test suite untuk detail product functionality Saucedemo Swag Labs:

| Test ID | Test Case | Type |
|---------|-----------|------|
| TDP-001 | Navigate to product detail page from product list | Functional |
| TDP-002 | Validate all elements on detail product page | Smoke |
| TDP-003 | Add product to cart from detail page | Functional |
| TDP-004 | Click add to cart button repeatedly on detail page | Functional |
| TDP-005 | Navigate back to products page | Functional |
| TDP-006 | Validate data consistency between list and detail | Regression |
| TDP-007 | Validate product image display on detail page | UI/UX |
| TDP-008 | Validate price format on detail page | UI/UX |
| TDP-009 | Navigate using cart icon from detail page | Functional |
| TDP-010 | Navigate using sidebar menu from detail page | Functional |
| TDP-011 | Access detail page without selecting product (edge case) | Integration |
| TDP-012 | Validate product description text is not empty | Functional |

### Saucedemo Checkout Tests ([`saucedemo-checkout.spec.ts`](tests/e2e/saucedemo-checkout.spec.ts))

Test suite untuk checkout functionality Saucedemo Swag Labs.

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

## 🔐 Authentication

### Login Helper

Helper function untuk login yang bisa digunakan di `beforeEach` hook:

```typescript
import { ensureLogin } from '../helpers/login.helper';

test.beforeEach(async ({ page }) => {
    // Login using helper - akan skip login jika sudah authenticated
    await ensureLogin(page, 'standard');
});
```

**Available User Types:**
- `'standard'` - Standard user with valid credentials
- `'locked'` - Locked out user
- `'problem'` - User with visual/product issues
- `'performance'` - User with performance delay
- `'error'` - User that triggers errors
- `'visual'` - User with different UI layout
- `'invalidPassword'` - Valid username with invalid password
- `'emptyUsername'` - Empty username with valid password
- `'emptyPassword'` - Valid username with empty password

**Available Helper Functions:**
- `ensureLogin(page, userType)` - Ensure user is logged in (skip if already authenticated)
- `navigateToInventory(page)` - Navigate to inventory page with auto-login
- `isAuthenticated(page)` - Check if user is authenticated
- `logout(page)` - Perform logout

### Auth Setup

Auth setup untuk generate storage state yang digunakan oleh project `saucedemo-authenticated`:

```typescript
// File: tests/helpers/auth.setup.ts
setup('authenticate as standard user', async ({ page, context }) => {
    // Login ke aplikasi
    const user = getSaucedemoUserFixture('standard');
    const loginPage = new SaucedemoLoginPage(page);
    await loginPage.navigate();
    await loginPage.performLogin(user.username, user.password);
    
    // Simpan storage state (cookies, localStorage, sessionStorage)
    await context.storageState({ path: 'tests/.auth/saucedemo-user.json' });
});
```

**Cara Menggunakan Authenticated Project:**

```bash
# Jalankan setup terlebih dahulu untuk generate storage state
npm run test:saucedemo:setup

# Jalankan test dengan authenticated session
npm run test:saucedemo:auth
```

## 🎯 Test Structure

### AAA Pattern dengan Login Helper

Semua test mengikuti Arrange-Act-Assert pattern dengan menggunakan login helper:

```typescript
test.describe('Saucedemo Products Functionality', () => {
    let inventoryPage: SaucedemoInventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new SaucedemoInventoryPage(page);

        // Arrange - Login using login helper
        await ensureLogin(page, 'standard');
    });

    test('TCP-001: display all products with complete information', async () => {
        // Act - Get all products
        const productCount = await inventoryPage.getProductCount();
        const productTitles = await inventoryPage.getProductTitles();

        // Assert - Verify all products are displayed
        await expect(productCount).toBe(products.length);
        await expect(productTitles).toHaveLength(products.length);
    });
});
```

**Keuntungan Menggunakan Login Helper:**
- ✅ Mengurangi boilerplate code di setiap test file
- ✅ Konsistensi - semua test menggunakan mekanisme login yang sama
- ✅ Maintainability - perubahan logika login hanya di satu tempat
- ✅ Reusability - fungsi `ensureLogin` dapat digunakan di berbagai test file

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

**saucedemo-chromium / saucedemo-firefox / saucedemo-webkit**

Project untuk menjalankan test Saucedemo di berbagai browser:

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

**saucedemo-setup**

Project untuk generate storage state (authentication setup):

```typescript
{
    name: 'saucedemo-setup',
    testMatch: /.*helpers\/.*\.setup\.ts/,
}
```

**saucedemo-authenticated**

Project untuk menjalankan test dengan authenticated session (menggunakan storage state):

```typescript
{
    name: 'saucedemo-authenticated',
    testMatch: /.*saucedemo.*/,
    dependencies: ['saucedemo-setup'],
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        storageState: 'tests/.auth/saucedemo-user.json',
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

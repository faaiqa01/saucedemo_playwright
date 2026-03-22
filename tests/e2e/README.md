# Saucedemo E2E Tests

## 📋 Overview

Test suite untuk Saucedemo Swag Labs login functionality. Semua test mengikuti best practices dari [`SOUL.md`](../../SOUL.md).

## 🧪 Test Cases

| ID | Title | Priority | Type | Scenario |
|-----|--------|----------|-----------|
| TCL-001 | Login Berhasil dengan Standard User | High | Functional (Positive) |
| TCL-002 | Login Gagal dengan Locked Out User | High | Functional (Negative) |
| TCL-003 | Login dengan Problem User | Medium | UI/UX (Positive) |
| TCL-004 | Login dengan Performance Glitch User | Medium | Performance (Positive) |
| TCL-005 | Login dengan Error User | Medium | Functional (Positive) |
| TCL-006 | Login dengan Visual User | Low | UI/UX (Positive) |
| TCL-007 | Validasi Username Kosong | Medium | Functional (Negative) |
| TCL-008 | Validasi Password Kosong | Medium | Functional (Negative) |
| TCL-009 | Login dengan Password Salah | High | Functional (Negative) |

## 🚀 Run Tests

### Run all Saucedemo tests
```bash
npm run test:saucedemo
```

### Run on specific browser
```bash
# Chrome
npm run test:saucedemo:chrome

# Firefox
npm run test:saucedemo:firefox

# Safari (WebKit)
npm run test:saucedemo:webkit
```

### Run with UI mode
```bash
npx playwright test --project=saucedemo-chromium --ui
```

### Run with headed mode
```bash
npx playwright test --project=saucedemo-chromium --headed
```

## 📁 File Structure

```
tests/e2e/
├── README.md                    # File ini
└── saucedemo-login.spec.ts     # Saucedemo login tests
```

## 🏗️ Page Objects

### SaucedemoLoginPage
- **Location**: [`src/pages/SaucedemoLoginPage.ts`](../../src/pages/SaucedemoLoginPage.ts)
- **Purpose**: Mengelola semua interaksi dengan halaman login Saucedemo
- **Key Methods**:
  - `navigate()` - Navigate ke login page
  - `fillLoginForm()` - Fill username dan password
  - `clickLoginButton()` - Click login button
  - `performLogin()` - Complete login flow
  - `assertErrorMessage()` - Assert error message

### SaucedemoInventoryPage
- **Location**: [`src/pages/SaucedemoInventoryPage.ts`](../../src/pages/SaucedemoInventoryPage.ts)
- **Purpose**: Mengelola semua interaksi dengan halaman inventory (dashboard)
- **Key Methods**:
  - `verifyPage()` - Verify user di inventory page
  - `getProductCount()` - Get jumlah produk
  - `assertUserLoggedIn()` - Assert user berhasil login

## 📊 Fixtures

### Saucedemo User Data
- **Location**: [`src/fixtures/saucedemo.fixture.ts`](../../src/fixtures/saucedemo.fixture.ts)
- **Available Users**:
  - `standardUser` - User normal
  - `lockedOutUser` - User terkunci
  - `problemUser` - User dengan masalah visual/produk
  - `performanceGlitchUser` - User dengan delay performa
  - `errorUser` - User yang memicu error
  - `visualUser` - User dengan tampilan UI berbeda

### Error Messages
```typescript
SaucedemoErrorMessages.LOCKED_OUT
SaucedemoErrorMessages.USERNAME_REQUIRED
SaucedemoErrorMessages.PASSWORD_REQUIRED
SaucedemoErrorMessages.INVALID_CREDENTIALS
```

## 🎯 Best Practices

Semua test mengikuti best practices dari [`SOUL.md`](../../SOUL.md):

- ✅ **Page Object Model** - Semua interaksi melalui page objects
- ✅ **data-testid selectors** - Menggunakan stable selectors
- ✅ **AAA Pattern** - Arrange-Act-Assert structure
- ✅ **Independent tests** - Setiap test bisa berjalan sendiri
- ✅ **Test data separation** - Data dari fixtures
- ✅ **Specific assertions** - Assertion yang spesifik dan jelas

## 📝 Example Test

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

## 🔗 References

- [Saucedemo Swag Labs](https://www.saucedemo.com/)
- [SOUL.md - Best Practices](../../SOUL.md)
- [Playwright Documentation](https://playwright.dev/docs/intro)

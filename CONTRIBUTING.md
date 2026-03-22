# Contributing Guidelines

Terima kasih atas ketertarikan Anda untuk berkontribusi pada project ini! Berikut adalah panduan untuk berkontribusi.

## Prerequisites

Sebelum berkontribusi, pastikan Anda telah:

1. Membaca [SOUL.md](./SOUL.md) untuk memahami best practices
2. Menginstall dependencies: `npm install`
3. Menginstall browser: `npx playwright install`

## Development Workflow

### 1. Buat Branch Baru

```bash
git checkout -b feature/your-feature-name
# atau
git checkout -b fix/your-bug-fix
```

### 2. Buat Perubahan

Ikuti best practices dari SOUL.md:

- Gunakan **Page Object Model** untuk semua page interactions
- Gunakan **data-testid** sebagai selector utama
- Pisahkan **test data** ke fixtures
- Tulis **independent tests**
- Gunakan **AAA pattern** (Arrange-Act-Assert)
- Tambahkan **comments** untuk logika kompleks

### 3. Run Tests

```bash
# Run semua tests
npm test

# Run spesifik test suite
npm run test:e2e
npm run test:integration
npm run test:unit

# Run dengan UI mode
npm run test:ui

# Run dengan headed mode
npm run test:headed
```

### 4. Code Style

Project ini menggunakan:

- **TypeScript** dengan strict mode
- **4 spaces** untuk indentation
- **Single quotes** untuk strings
- **Semicolons** di akhir statement
- **Trailing commas** untuk multi-line arrays/objects

### 5. Commit Messages

Gunakan format commit message yang jelas:

```
feat: add new login page test
fix: resolve timeout issue in dashboard test
docs: update README with new examples
refactor: extract common methods to BasePage
test: add unit tests for string utilities
```

### 6. Pull Request

Sebelum membuat PR:

1. Pastikan semua tests pass
2. Pastikan tidak ada TypeScript errors: `npm run lint`
3. Update dokumentasi jika perlu
4. Tambahkan description yang jelas untuk PR

## Project Structure

```
project-root/
├── src/
│   ├── config/          # Environment configuration
│   ├── fixtures/        # Test data
│   ├── pages/           # Page Object Model
│   ├── utils/           # Utility functions
│   └── tests/           # Test files
├── tests/
│   ├── e2e/            # End-to-end tests
│   ├── integration/    # Integration tests
│   └── unit/           # Unit tests
├── playwright.config.ts # Playwright configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Coding Standards

### Page Object Model

```typescript
// ✅ BENAR
const loginPage = new LoginPage(page);
await loginPage.fillLoginForm(username, password);
await loginPage.clickLoginButton();

// ❌ DILARANG
await page.getByTestId('login-username').fill(username);
await page.getByTestId('login-password').fill(password);
await page.getByTestId('login-button').click();
```

### Test Data

```typescript
// ✅ BENAR
import { getUserFixture } from '../src/fixtures';
const user = getUserFixture('valid');

// ❌ DILARANG
const username = 'testuser@example.com';
const password = 'TestPass123!';
```

### Selectors

```typescript
// ✅ BENAR - PRIORITY 1
page.getByTestId('login-button')

// ✅ BENAR - PRIORITY 2
page.getByRole('button', { name: 'Login' })

// ❌ DILARANG - Fragile selector
page.locator('div.container > button')
```

## Testing Guidelines

### Test Structure

Setiap test harus mengikuti AAA pattern:

```typescript
test('user can login', async ({ page }) => {
    // Arrange - Setup data dan initial state
    const loginPage = new LoginPage(page);
    const user = getUserFixture('valid');

    // Act - Eksekusi action yang diuji
    await loginPage.navigate();
    await loginPage.performLogin(user.email, user.password);

    // Assert - Verifikasi hasil
    await dashboardPage.verifyPage();
});
```

### Test Independence

Setiap test harus bisa berjalan sendiri tanpa ketergantungan test lain.

### Assertions

Gunakan assertion yang spesifik:

```typescript
// ✅ BENAR
await expect(page.getByTestId('success-message'))
    .toHaveText('Login successful!');

// ❌ DILARANG
await expect(page.locator('.message')).toBeVisible();
```

## Questions?

Jika Anda memiliki pertanyaan, jangan ragu untuk:
1. Membuka issue di repository
2. Menghubungi maintainer
3. Membaca [SOUL.md](./SOUL.md) untuk detail best practices

Terima kasih atas kontribusi Anda! 🚀

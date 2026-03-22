# Authentication Helper - Login Otomatis

## Overview

Project ini menggunakan **Login Helper** untuk handling login secara otomatis, mirip dengan Cypress session handling. Helper ini memungkinkan test untuk otomatis login jika belum authenticated, dan skip login jika sudah authenticated.

## Cara Kerja

Login helper bekerja dengan logika sederhana:
1. **Cek status login**: Cek apakah user sudah login atau belum
2. **Jika belum login**: Lakukan login otomatis
3. **Jika sudah login**: Skip login (gunakan cache/session yang sudah ada)

## Struktur File

```
tests/
├── helpers/
│   ├── index.ts              # Export semua helpers
│   └── login.helper.ts       # Login helper functions
├── .auth/                   # Storage state (di-ignore dari git)
│   └── saucedemo-user.json
├── README.md                 # Dokumentasi helpers
├── AUTHENTICATION.md          # Dokumentasi ini
└── e2e/
    ├── auth.setup.ts          # Manual setup script
    ├── saucedemo-checkout.spec.ts
    └── ...
```

## Login Helper Functions

### `ensureLogin(page, userType?)`

Memastikan user sudah login. Jika belum login, akan melakukan login otomatis.

**Parameter:**
- `page`: Playwright Page object
- `userType`: Tipe user (opsional, default: 'standard')

**Contoh:**
```typescript
import { ensureLogin } from '../helpers/login.helper';

test.beforeEach(async ({ page }) => {
    await ensureLogin(page); // Otomatis login jika belum
});
```

### `navigateToInventory(page)`

Navigate ke inventory page dengan auto-login jika belum authenticated.

**Contoh:**
```typescript
import { navigateToInventory } from '../helpers/login.helper';

test('contoh test', async ({ page }) => {
    await navigateToInventory(page); // Otomatis login jika belum
});
```

### `isAuthenticated(page)`

Check apakah user sudah login atau belum.

**Contoh:**
```typescript
import { isAuthenticated } from '../helpers/login.helper';

if (isAuthenticated(page)) {
    console.log('User sudah login');
}
```

### `logout(page)`

Lakukan logout.

**Contoh:**
```typescript
import { logout } from '../helpers/login.helper';

await logout(page);
```

## Cara Penggunaan di Test

### Contoh Sederhana

```typescript
import { test } from '@playwright/test';
import { ensureLogin } from '../helpers/login.helper';
import { InventoryPage } from '../../src/pages';

test.describe('Product Tests', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        
        // Otomatis login jika belum, skip jika sudah
        await ensureLogin(page);
        
        // Navigate ke inventory page
        await inventoryPage.navigate();
    });

    test('can add product to cart', async () => {
        // User sudah dalam kondisi login
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
    });
});
```

### Contoh Lengkap dengan Page Objects

```typescript
import { test, expect } from '@playwright/test';
import {
    SaucedemoLoginPage,
    SaucedemoInventoryPage,
    SaucedemoCartPage,
} from '../../src/pages';
import { ensureLogin } from '../helpers/login.helper';

test.describe('Saucedemo Checkout', () => {
    let loginPage: SaucedemoLoginPage;
    let inventoryPage: SaucedemoInventoryPage;
    let cartPage: SaucedemoCartPage;

    test.beforeEach(async ({ page }) => {
        // Inisialisasi page objects
        loginPage = new SaucedemoLoginPage(page);
        inventoryPage = new SaucedemoInventoryPage(page);
        cartPage = new SaucedemoCartPage(page);

        // Otomatis login jika belum, skip jika sudah
        await ensureLogin(page);
    });

    test('can add product to cart', async () => {
        // User sudah dalam kondisi login
        const product = 'Sauce Labs Backpack';
        await inventoryPage.addProductToCart(product);
        await inventoryPage.assertShoppingCartBadgeCount(1);
    });

    test('can navigate to cart', async () => {
        // User sudah dalam kondisi login
        await inventoryPage.clickShoppingCart();
        await cartPage.verifyPage();
    });
});
```

## Cara Menjalankan Test

### Mode 1: Tanpa Authentication (Login Manual)

Test akan login otomatis setiap kali karena tidak ada storage state.

```bash
npm run test -- saucedemo-checkout.spec.ts --project=saucedemo-chromium
```

### Mode 2: Dengan Authentication Cache (Lebih Cepat)

Test akan menggunakan storage state yang sudah disimpan, login akan di-skip.

#### Langkah 1: Generate Storage State

```bash
npm run test:saucedemo:setup
```

Atau dari UI Playwright:
```bash
npx playwright test --ui
```
1. Pilih project: `saucedemo-setup`
2. Jalankan `auth.setup.ts`

#### Langkah 2: Jalankan Test dengan Authentication

```bash
npm run test -- saucedemo-checkout.spec.ts --project=saucedemo-authenticated
```

## Project yang Tersedia

| Project | Deskripsi | Login Behavior |
|---------|-----------|---------------|
| `saucedemo-chromium` | Test saucedemo dengan Chrome | Login otomatis setiap test |
| `saucedemo-authenticated` | Test saucedemo dengan auth | Login di-skip (gunakan cache) |
| `saucedemo-setup` | Generate storage state | Login sekali untuk generate cache |

## Perbandingan dengan Cypress

### Cypress Session Handling

```javascript
// Cypress
beforeEach(() => {
    cy.session('user', () => {
        cy.login('username', 'password');
    });
});
```

### Playwright Login Helper

```typescript
// Playwright
test.beforeEach(async ({ page }) => {
    await ensureLogin(page); // Otomatis login jika belum
});
```

## Keuntungan Menggunakan Login Helper

1. **Otomatis**: Tidak perlu cek manual apakah user sudah login atau belum
2. **Reusable**: Bisa digunakan di seluruh test suite
3. **Clean Code**: Test code lebih bersih dan mudah dibaca
4. **Mirip Cypress**: Cara kerja mirip dengan Cypress session handling
5. **Flexible**: Mendukung multiple user types
6. **Smart Detection**: Otomatis mendeteksi status login

## Troubleshooting

### Login tidak berjalan otomatis

**Masalah**: Test tidak login otomatis

**Solusi**:
1. Pastikan helper sudah di-import:
   ```typescript
   import { ensureLogin } from '../helpers/login.helper';
   ```

2. Pastikan fungsi dipanggil di `beforeEach`:
   ```typescript
   test.beforeEach(async ({ page }) => {
       await ensureLogin(page);
   });
   ```

3. Pastikan page object sudah di-inisialisasi sebelum memanggil helper

### Test selalu login ulang

**Masalah**: Test selalu login ulang meskipun sudah authenticated

**Solusi**:
1. Pastikan project menggunakan `storageState`
2. Jalankan test dengan project `saucedemo-authenticated`
3. Pastikan `auth.setup.ts` sudah dijalankan untuk generate storage state

### Error: "Cannot find module '../helpers/login.helper'"

**Masalah**: Import path salah

**Solusi**: Pastikan path import benar:
- Jika test di `tests/e2e/`: `import { ensureLogin } from '../helpers/login.helper';`
- Jika test di `tests/integration/`: `import { ensureLogin } from '../helpers/login.helper';`
- Jika test di `tests/unit/`: `import { ensureLogin } from '../helpers/login.helper';`

## Advanced Usage

### Multiple User Types

```typescript
test.describe('Admin Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Login sebagai admin user
        await ensureLogin(page, 'admin');
    });

    test('admin can access dashboard', async () => {
        // Test logic untuk admin
    });
});

test.describe('Standard User Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Login sebagai standard user (default)
        await ensureLogin(page);
    });

    test('user can view products', async () => {
        // Test logic untuk standard user
    });
});
```

### Conditional Login

```typescript
test('test dengan conditional login', async ({ page }) => {
    // Cek apakah sudah login
    if (!isAuthenticated(page)) {
        await ensureLogin(page);
    }
    
    // Test logic
});
```

## Referensi

- [Playwright Authentication Documentation](https://playwright.dev/docs/auth)
- [Cypress Session Handling](https://docs.cypress.io/api/commands/session)
- [Login Helper Documentation](./README.md)

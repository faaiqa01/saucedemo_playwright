# Helpers

Folder ini berisi helper functions yang dapat digunakan di seluruh test suite.

## Login Helper

[`login.helper.ts`](login.helper.ts) menyediakan fungsi untuk handling login secara otomatis, mirip dengan Cypress session handling.

### Fungsi yang Tersedia

#### `ensureLogin(page, userType?)`

Memastikan user sudah login. Jika belum login, akan melakukan login otomatis. Jika sudah login, akan skip login.

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

#### `navigateToInventory(page)`

Navigate ke inventory page dengan auto-login jika belum authenticated.

**Parameter:**
- `page`: Playwright Page object

**Contoh:**
```typescript
import { navigateToInventory } from '../helpers/login.helper';

test('contoh test', async ({ page }) => {
    await navigateToInventory(page); // Otomatis login jika belum
});
```

#### `isAuthenticated(page)`

Check apakah user sudah login atau belum.

**Parameter:**
- `page`: Playwright Page object

**Return:**
- `true` jika sudah authenticated, `false` jika belum

**Contoh:**
```typescript
import { isAuthenticated } from '../helpers/login.helper';

if (isAuthenticated(page)) {
    console.log('User sudah login');
} else {
    console.log('User belum login');
}
```

#### `logout(page)`

Lakukan logout.

**Parameter:**
- `page`: Playwright Page object

**Contoh:**
```typescript
import { logout } from '../helpers/login.helper';

await logout(page);
```

## Cara Penggunaan

### Di Test File

```typescript
import { test } from '@playwright/test';
import { ensureLogin } from '../helpers/login.helper';

test.describe('Test Suite', () => {
    test.beforeEach(async ({ page }) => {
        // Otomatis login jika belum, skip jika sudah
        await ensureLogin(page);
    });

    test('contoh test', async ({ page }) => {
        // Test logic di sini
        // User sudah dalam kondisi login
    });
});
```

### Di Page Object

```typescript
import { Page } from '@playwright/test';
import { ensureLogin } from '../../tests/helpers/login.helper';

export class MyPage {
    constructor(private page: Page) {}

    async navigateWithAuth() {
        await ensureLogin(this.page);
        await this.page.goto('/dashboard');
    }
}
```

## Keuntungan Menggunakan Login Helper

1. **Otomatis**: Tidak perlu cek manual apakah user sudah login atau belum
2. **Reusable**: Bisa digunakan di seluruh test suite
3. **Clean Code**: Test code lebih bersih dan mudah dibaca
4. **Mirip Cypress**: Cara kerja mirip dengan Cypress session handling
5. **Flexible**: Mendukung multiple user types

## Contoh Lengkap

### Test dengan Authentication Otomatis

```typescript
import { test, expect } from '@playwright/test';
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
        await expect(await inventoryPage.getCartCount()).toBe(1);
    });
});
```

### Test dengan Multiple User Types

```typescript
import { test } from '@playwright/test';
import { ensureLogin } from '../helpers/login.helper';

test.describe('Admin Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Login sebagai admin user
        await ensureLogin(page, 'admin');
    });

    test('admin can access dashboard', async ({ page }) => {
        // Test logic untuk admin
    });
});
```

## Troubleshooting

### Login tidak berjalan otomatis

Pastikan:
1. Helper sudah di-import: `import { ensureLogin } from '../helpers/login.helper';`
2. Fungsi dipanggil di `beforeEach`: `await ensureLogin(page);`
3. Page object sudah di-inisialisasi sebelum memanggil helper

### Test selalu login ulang

Jika test selalu login ulang meskipun sudah authenticated:
1. Cek apakah project menggunakan `storageState`
2. Pastikan `auth.setup.ts` sudah dijalankan untuk generate storage state
3. Jalankan test dengan project `saucedemo-authenticated`

### Error: "Cannot find module '../helpers/login.helper'"

Pastikan path import benar:
- Jika test di `tests/e2e/`: `import { ensureLogin } from '../helpers/login.helper';`
- Jika test di `tests/integration/`: `import { ensureLogin } from '../helpers/login.helper';`
- Jika test di `tests/unit/`: `import { ensureLogin } from '../helpers/login.helper';`

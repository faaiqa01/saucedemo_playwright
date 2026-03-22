import { test as setup, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../src/pages/SaucedemoLoginPage';
import { getSaucedemoUserFixture } from '../../src/fixtures';

/**
 * Global Setup untuk Saucedemo Authentication
 * 
 * Script ini berjalan sebelum semua test untuk menyimpan storage state
 * (cookies, localStorage, sessionStorage) yang akan digunakan oleh test lain.
 * 
 * Cara kerja:
 * 1. Login ke aplikasi
 * 2. Simpan storage state ke file
 * 3. Test lain akan menggunakan storage state ini untuk skip login
 */

const authFile = 'tests/.auth/saucedemo-user.json';

setup('authenticate as standard user', async ({ page, context }) => {
    // Arrange
    const user = getSaucedemoUserFixture('standard');
    const loginPage = new SaucedemoLoginPage(page);

    // Act - Login
    await loginPage.navigate();
    await loginPage.performLogin(user.username, user.password);

    // Assert - Verify login success
    await expect(page).toHaveURL(/.*inventory.html/);

    // Simpan storage state (cookies, localStorage, sessionStorage)
    await context.storageState({ path: authFile });

    console.log('✅ Storage state saved to:', authFile);
});

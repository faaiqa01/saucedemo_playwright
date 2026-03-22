import { chromium, type FullConfig } from '@playwright/test';
import { getSaucedemoUserFixture } from './src/fixtures';

/**
 * Global Setup untuk Saucedemo Authentication
 * 
 * Script ini berjalan SEKALI sebelum semua test berjalan.
 * Fungsi:
 * 1. Login ke aplikasi
 * 2. Simpan storage state (cookies, localStorage, sessionStorage) ke file
 * 3. Test lain akan menggunakan storage state ini untuk skip login
 * 
 * Cara kerja:
 * - Dijalankan otomatis oleh Playwright sebelum test
 * - Storage state disimpan ke tests/.auth/saucedemo-user.json
 * - Test yang menggunakan storageState akan langsung dalam kondisi login
 */

async function globalSetup(config: FullConfig) {
    console.log('🚀 Starting global setup for authentication...');

    const { baseURL, storageState } = config.projects[0].use;
    const user = getSaucedemoUserFixture('standard');

    console.log(`📍 Base URL: ${baseURL}`);
    console.log(`👤 User: ${user.username}`);
    console.log(`💾 Storage state will be saved to: ${storageState}`);

    // Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to login page
    await page.goto(baseURL!);

    // Login
    console.log('🔐 Logging in...');
    await page.getByTestId('username').fill(user.username);
    await page.getByTestId('password').fill(user.password);
    await page.getByTestId('login-button').click();

    // Wait for navigation to inventory page
    await page.waitForURL(/.*inventory.html/);

    console.log('✅ Login successful!');

    // Save storage state
    await page.context().storageState({ path: storageState as string });
    console.log(`💾 Storage state saved to: ${storageState}`);

    // Close browser
    await browser.close();
    console.log('🎉 Global setup completed!');
}

export default globalSetup;

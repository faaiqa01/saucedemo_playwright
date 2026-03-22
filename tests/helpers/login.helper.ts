import { Page } from '@playwright/test';
import { SaucedemoLoginPage, SaucedemoInventoryPage } from '../../src/pages';
import { getSaucedemoUserFixture } from '../../src/fixtures';

/**
 * Global Login Helper
 *
 * Helper function untuk login yang bisa digunakan di beforeEach hook.
 * Fungsi ini mengecek status autentikasi berdasarkan URL saat ini:
 * - Jika belum login (bukan di inventory page) → lakukan login
 * - Jika sudah login (sudah di inventory page) → skip login
 *
 * Catatan: Storage state caching ditangani oleh tests/e2e/auth.setup.ts
 *
 * Cara penggunaan:
 * ```typescript
 * test.beforeEach(async ({ page }) => {
 *     await ensureLogin(page);
 * });
 * ```
 */

const SAUCEDEMO_INVENTORY_URL = /.*inventory.html/;

/**
 * Ensure user is logged in
 *
 * Fungsi ini mengecek apakah user sudah login atau belum berdasarkan URL saat ini.
 * Jika belum login, akan melakukan login.
 * Jika sudah login, akan skip login.
 *
 * Catatan: Storage state caching ditangani oleh tests/e2e/auth.setup.ts
 *
 * @param page - Playwright Page object
 * @param userType - Tipe user (default: 'standard')
 */
export async function ensureLogin(
    page: Page,
    userType: 'standard' | 'locked' | 'problem' | 'performance' | 'error' | 'visual' | 'invalidPassword' | 'emptyUsername' | 'emptyPassword' = 'standard'
): Promise<void> {
    // Check apakah user sudah login
    const currentURL = page.url();
    const isAuthenticated = currentURL.match(SAUCEDEMO_INVENTORY_URL) !== null;

    if (isAuthenticated) {
        // Sudah login, skip login
        console.log('✅ User already authenticated, skipping login');
        return;
    }

    // Belum login, lakukan login
    console.log('🔐 User not authenticated, performing login...');

    const user = getSaucedemoUserFixture(userType);
    const loginPage = new SaucedemoLoginPage(page);
    const inventoryPage = new SaucedemoInventoryPage(page);

    // Navigate ke login page
    await loginPage.navigate();

    // Lakukan login
    await loginPage.performLogin(user.username, user.password);

    // Verify login success
    await inventoryPage.verifyPage();

    console.log('✅ Login successful!');
}

/**
 * Navigate to inventory page with auto-login
 * 
 * Fungsi ini akan navigate ke inventory page.
 * Jika belum login, akan otomatis login dulu.
 * 
 * @param page - Playwright Page object
 */
export async function navigateToInventory(page: Page): Promise<void> {
    const inventoryPage = new SaucedemoInventoryPage(page);
    await inventoryPage.navigate();
}

/**
 * Check if user is authenticated
 * 
 * @param page - Playwright Page object
 * @returns true jika sudah authenticated, false jika belum
 */
export function isAuthenticated(page: Page): boolean {
    const currentURL = page.url();
    return !!currentURL.match(SAUCEDEMO_INVENTORY_URL);
}

/**
 * Perform logout
 * 
 * @param page - Playwright Page object
 */
export async function logout(page: Page): Promise<void> {
    // Navigate ke logout URL atau click logout button
    await page.goto('https://www.saucedemo.com/');
    console.log('🚪 Logged out');
}

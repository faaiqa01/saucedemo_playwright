import { test, expect } from '@playwright/test';

/**
 * Example Test File
 * 
 * Ini adalah file test contoh yang dibuat oleh Playwright saat instalasi.
 * File ini bisa dihapus atau dimodifikasi sesuai kebutuhan.
 * 
 * Untuk test yang lebih lengkap, lihat folder:
 * - tests/e2e/ - End-to-end tests
 * - tests/integration/ - Integration tests
 * - tests/unit/ - Unit tests
 */

test('example test', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveTitle(/Playwright/);
});

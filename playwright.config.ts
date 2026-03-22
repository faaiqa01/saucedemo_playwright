import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Playwright Configuration
 * 
 * Konfigurasi utama untuk Playwright test framework.
 * Mengikuti best practices dari SOUL.md:
 * - Timeout eksplisit untuk setiap operasi
 * - Parallel execution untuk efisiensi
 * - Multiple browser support
 * - Retry mechanism untuk flaky tests
 */
export default defineConfig({
    // Test directory
    testDir: './tests',

    // Timeout configuration (ms)
    timeout: 30 * 1000, // 30 detik untuk setiap test
    expect: {
        timeout: 5 * 1000, // 5 detik untuk assertion
    },

    // Fully parallel test execution
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    // Retry on CI only
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI
    workers: process.env.CI ? 1 : undefined,

    // Reporter configuration
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }],
    ],

    // Shared settings for all tests
    use: {
        // Base URL for navigation
        baseURL: process.env.BASE_URL || 'http://localhost:3000',

        // Collect trace when retrying the failed test
        trace: 'on-first-retry',

        // Screenshot configuration
        screenshot: 'only-on-failure',

        // Video configuration
        video: 'retain-on-failure',

        // Action timeout
        actionTimeout: 10 * 1000, // 10 detik

        // Navigation timeout
        navigationTimeout: 30 * 1000, // 30 detik

        // Viewport size
        viewport: { width: 1280, height: 720 },

        // Ignore HTTPS errors
        ignoreHTTPSErrors: true,

        // Locale
        locale: 'id-ID',

        // Timezone
        timezoneId: 'Asia/Jakarta',
    },

    // Configure projects for different browsers
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        // Mobile configurations
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
    ],

    // Run your local dev server before starting the tests
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000, // 2 menit
    },

    // Output directory for test artifacts
    outputDir: 'test-results',
});

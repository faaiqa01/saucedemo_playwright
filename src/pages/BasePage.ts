import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/env.config';

/**
 * Base Page Class
 * 
 * Abstract base class untuk semua Page Object classes.
 * Menyediakan common methods dan properties yang digunakan di semua pages.
 * 
 * Mengikuti best practices dari SOUL.md:
 * - Separation of concerns: Pemisahan jelas antara locators, actions, dan assertions
 * - Reusable components: Common methods di sini
 * - Explicit timeouts: Tidak menggunakan default timeout
 */
export abstract class BasePage {
    readonly page: Page;
    readonly baseUrl: string;

    // Common locators
    protected readonly locLoadingSpinner: Locator;
    protected readonly locErrorMessage: Locator;
    protected readonly locSuccessMessage: Locator;

    // Timeout constants (ms)
    protected readonly TIMEOUT_DEFAULT = config.timeout.default;
    protected readonly TIMEOUT_NAVIGATION = config.timeout.navigation;
    protected readonly TIMEOUT_ACTION = config.timeout.action;
    protected readonly TIMEOUT_SHORT = 3000;
    protected readonly TIMEOUT_LONG = 60000;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = config.baseUrl;

        // Initialize common locators
        this.locLoadingSpinner = page.getByTestId('loading-spinner');
        this.locErrorMessage = page.getByTestId('error-message');
        this.locSuccessMessage = page.getByTestId('success-message');
    }

    /**
     * Navigate to the specified path
     * @param path - URL path (default: '/')
     */
    async navigate(path: string = '/'): Promise<void> {
        const url = `${this.baseUrl}${path}`;
        await this.page.goto(url, { timeout: this.TIMEOUT_NAVIGATION });
        await this.waitForPageLoad();
    }

    /**
     * Wait for page to fully load
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle', { timeout: this.TIMEOUT_NAVIGATION });
    }

    /**
     * Wait for loading spinner to disappear
     */
    async waitForLoadingToComplete(): Promise<void> {
        try {
            await this.locLoadingSpinner.waitFor({ state: 'hidden', timeout: this.TIMEOUT_DEFAULT });
        } catch (error) {
            // Loading spinner might not be present, which is acceptable
            console.log('Loading spinner not found or already hidden');
        }
    }

    /**
     * Click an element with explicit timeout
     * @param locator - Element locator
     * @param options - Click options
     */
    async clickElement(locator: Locator, options?: { timeout?: number }): Promise<void> {
        const timeout = options?.timeout || this.TIMEOUT_ACTION;
        await locator.waitFor({ state: 'visible', timeout });
        await locator.click({ timeout });
    }

    /**
     * Fill an input field with explicit timeout
     * @param locator - Input element locator
     * @param value - Value to fill
     * @param options - Fill options
     */
    async fillInput(locator: Locator, value: string, options?: { timeout?: number }): Promise<void> {
        const timeout = options?.timeout || this.TIMEOUT_ACTION;
        await locator.waitFor({ state: 'visible', timeout });
        await locator.fill(value, { timeout });
    }

    /**
     * Get text content of an element
     * @param locator - Element locator
     * @param options - Options
     */
    async getText(locator: Locator, options?: { timeout?: number }): Promise<string> {
        const timeout = options?.timeout || this.TIMEOUT_ACTION;
        await locator.waitFor({ state: 'visible', timeout });
        return await locator.textContent({ timeout }) || '';
    }

    /**
     * Check if an element is visible
     * @param locator - Element locator
     * @param options - Options
     */
    async isElementVisible(locator: Locator, options?: { timeout?: number }): Promise<boolean> {
        const timeout = options?.timeout || this.TIMEOUT_SHORT;
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if an element is enabled
     * @param locator - Element locator
     */
    async isElementEnabled(locator: Locator): Promise<boolean> {
        return await locator.isEnabled();
    }

    /**
     * Wait for element to be visible
     * @param locator - Element locator
     * @param timeout - Timeout in milliseconds
     */
    async waitForElementVisible(locator: Locator, timeout?: number): Promise<void> {
        const actualTimeout = timeout || this.TIMEOUT_ACTION;
        await locator.waitFor({ state: 'visible', timeout: actualTimeout });
    }

    /**
     * Wait for element to be hidden
     * @param locator - Element locator
     * @param timeout - Timeout in milliseconds
     */
    async waitForElementHidden(locator: Locator, timeout?: number): Promise<void> {
        const actualTimeout = timeout || this.TIMEOUT_ACTION;
        await locator.waitFor({ state: 'hidden', timeout: actualTimeout });
    }

    /**
     * Get current page URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Reload the page
     */
    async reload(): Promise<void> {
        await this.page.reload({ timeout: this.TIMEOUT_NAVIGATION });
        await this.waitForPageLoad();
    }

    /**
     * Go back in browser history
     */
    async goBack(): Promise<void> {
        await this.page.goBack({ timeout: this.TIMEOUT_NAVIGATION });
        await this.waitForPageLoad();
    }

    /**
     * Take screenshot
     * @param name - Screenshot name
     */
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    }

    /**
     * Assert that error message is displayed with specific text
     * @param expectedMessage - Expected error message
     */
    async assertErrorMessage(expectedMessage: string): Promise<void> {
        await expect(this.locErrorMessage).toBeVisible({ timeout: this.TIMEOUT_SHORT });
        await expect(this.locErrorMessage).toHaveText(expectedMessage, { timeout: this.TIMEOUT_SHORT });
    }

    /**
     * Assert that success message is displayed with specific text
     * @param expectedMessage - Expected success message
     */
    async assertSuccessMessage(expectedMessage: string): Promise<void> {
        await expect(this.locSuccessMessage).toBeVisible({ timeout: this.TIMEOUT_SHORT });
        await expect(this.locSuccessMessage).toHaveText(expectedMessage, { timeout: this.TIMEOUT_SHORT });
    }

    /**
     * Abstract method to verify that user is on the correct page
     * Must be implemented by each page class
     */
    abstract verifyPage(): Promise<void>;
}

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Login Page Object
 * 
 * Mengelola semua interaksi dengan halaman login Saucedemo Swag Labs.
 * Menggunakan data-testid sebagai selector utama sesuai SOUL.md best practices.
 * 
 * URL: https://www.saucedemo.com/
 */
export class SaucedemoLoginPage extends BasePage {
    // Page locators - Menggunakan data-testid (PRIORITY 1 selector)
    private readonly locUsername: Locator;
    private readonly locPassword: Locator;
    private readonly locLoginButton: Locator;
    private readonly locErrorMessageContainer: Locator;
    private readonly locLoginLogo: Locator;
    private readonly locLoginContainer: Locator;

    // Saucedemo specific URL
    private readonly SAUCEDEMO_URL = 'https://www.saucedemo.com/';

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan data-test (Saucedemo uses data-test attribute)
        this.locUsername = page.locator('[data-test="username"]');
        this.locPassword = page.locator('[data-test="password"]');
        this.locLoginButton = page.locator('[data-test="login-button"]');
        this.locErrorMessageContainer = page.locator('[data-test="error"]');
        this.locLoginLogo = page.locator('.login_logo');
        this.locLoginContainer = page.locator('.login_container');
    }

    /**
     * Navigate to Saucedemo login page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.SAUCEDEMO_URL, { timeout: this.TIMEOUT_NAVIGATION });
        await this.verifyPage();
    }

    /**
     * Verify that user is on Saucedemo login page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locLoginLogo).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locLoginContainer).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locUsername).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPassword).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locLoginButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Fill login form with username and password
     * @param username - Username untuk login
     * @param password - Password untuk login
     */
    async fillLoginForm(username: string, password: string): Promise<void> {
        await this.fillInput(this.locUsername, username);
        await this.fillInput(this.locPassword, password);
    }

    /**
     * Fill username field
     * @param username - Username untuk login
     */
    async fillUsername(username: string): Promise<void> {
        await this.fillInput(this.locUsername, username);
    }

    /**
     * Fill password field
     * @param password - Password untuk login
     */
    async fillPassword(password: string): Promise<void> {
        await this.fillInput(this.locPassword, password);
    }

    /**
     * Click login button
     */
    async clickLoginButton(): Promise<void> {
        await this.clickElement(this.locLoginButton);
    }

    /**
     * Perform complete login flow
     * @param username - Username untuk login
     * @param password - Password untuk login
     */
    async performLogin(username: string, password: string): Promise<void> {
        await this.fillLoginForm(username, password);
        await this.clickLoginButton();
    }

    /**
     * Get error message text
     */
    async getErrorMessage(): Promise<string> {
        if (await this.isErrorMessageVisible()) {
            return await this.getText(this.locErrorMessageContainer);
        }
        return '';
    }

    /**
     * Check if error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locErrorMessageContainer);
    }

    /**
     * Assert that login was successful (redirected to inventory page)
     */
    async assertLoginSuccess(): Promise<void> {
        // Verify URL changed to inventory page
        await expect(this.page).toHaveURL(/.*inventory.html/, { timeout: this.TIMEOUT_NAVIGATION });
    }

    /**
     * Assert that error message is displayed with specific text
     * @param expectedMessage - Expected error message
     */
    async assertErrorMessage(expectedMessage: string): Promise<void> {
        await expect(this.locErrorMessageContainer).toBeVisible({ timeout: this.TIMEOUT_SHORT });
        await expect(this.locErrorMessageContainer).toHaveText(expectedMessage, { timeout: this.TIMEOUT_SHORT });
    }

    /**
     * Assert that error message contains specific text
     * @param expectedText - Expected text to be contained in error message
     */
    async assertErrorContains(expectedText: string): Promise<void> {
        await expect(this.locErrorMessageContainer).toBeVisible({ timeout: this.TIMEOUT_SHORT });
        await expect(this.locErrorMessageContainer).toContainText(expectedText, { timeout: this.TIMEOUT_SHORT });
    }

    /**
     * Get username field value
     */
    getUsernameValue(): Promise<string> {
        return this.locUsername.inputValue();
    }

    /**
     * Get password field value
     */
    getPasswordValue(): Promise<string> {
        return this.locPassword.inputValue();
    }

    /**
     * Check if login button is enabled
     */
    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.isElementEnabled(this.locLoginButton);
    }

    /**
     * Clear username field
     */
    async clearUsername(): Promise<void> {
        await this.locUsername.clear();
    }

    /**
     * Clear password field
     */
    async clearPassword(): Promise<void> {
        await this.locPassword.clear();
    }

    /**
     * Clear all form fields
     */
    async clearForm(): Promise<void> {
        await this.clearUsername();
        await this.clearPassword();
    }
}

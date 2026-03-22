import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object
 * 
 * Mengelola semua interaksi dengan halaman login.
 * Menggunakan data-testid sebagai selector utama sesuai SOUL.md best practices.
 */
export class LoginPage extends BasePage {
    // Page locators - Menggunakan data-testid (PRIORITY 1 selector)
    private readonly locUsername: Locator;
    private readonly locPassword: Locator;
    private readonly locLoginButton: Locator;
    private readonly locForgotPasswordLink: Locator;
    private readonly locRegisterLink: Locator;
    private readonly locRememberMeCheckbox: Locator;
    private readonly locLoginTitle: Locator;
    private readonly locLoginForm: Locator;

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan data-testid
        this.locUsername = page.getByTestId('login-username');
        this.locPassword = page.getByTestId('login-password');
        this.locLoginButton = page.getByTestId('login-button');
        this.locForgotPasswordLink = page.getByTestId('forgot-password-link');
        this.locRegisterLink = page.getByTestId('register-link');
        this.locRememberMeCheckbox = page.getByTestId('remember-me-checkbox');
        this.locLoginTitle = page.getByTestId('login-title');
        this.locLoginForm = page.getByTestId('login-form');
    }

    /**
     * Navigate to login page
     */
    async navigate(): Promise<void> {
        await super.navigate('/login');
        await this.verifyPage();
    }

    /**
     * Verify that user is on login page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locLoginTitle).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locLoginForm).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Fill login form with username and password
     * @param username - Username or email
     * @param password - Password
     */
    async fillLoginForm(username: string, password: string): Promise<void> {
        await this.fillInput(this.locUsername, username);
        await this.fillInput(this.locPassword, password);
    }

    /**
     * Fill username field
     * @param username - Username or email
     */
    async fillUsername(username: string): Promise<void> {
        await this.fillInput(this.locUsername, username);
    }

    /**
     * Fill password field
     * @param password - Password
     */
    async fillPassword(password: string): Promise<void> {
        await this.fillInput(this.locPassword, password);
    }

    /**
     * Click login button
     */
    async clickLoginButton(): Promise<void> {
        await this.clickElement(this.locLoginButton);
        await this.waitForLoadingToComplete();
    }

    /**
     * Toggle remember me checkbox
     * @param checked - Whether checkbox should be checked
     */
    async setRememberMe(checked: boolean): Promise<void> {
        const isChecked = await this.locRememberMeCheckbox.isChecked();
        if (isChecked !== checked) {
            await this.clickElement(this.locRememberMeCheckbox);
        }
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword(): Promise<void> {
        await this.clickElement(this.locForgotPasswordLink);
    }

    /**
     * Click register link
     */
    async clickRegister(): Promise<void> {
        await this.clickElement(this.locRegisterLink);
    }

    /**
     * Perform complete login flow
     * @param username - Username or email
     * @param password - Password
     * @param rememberMe - Whether to remember login
     */
    async performLogin(username: string, password: string, rememberMe: boolean = false): Promise<void> {
        await this.fillLoginForm(username, password);
        if (rememberMe) {
            await this.setRememberMe(true);
        }
        await this.clickLoginButton();
    }

    /**
     * Assert that login was successful
     */
    async assertLoginSuccess(): Promise<void> {
        await this.assertSuccessMessage('Login successful!');
    }

    /**
     * Assert that login failed with specific error message
     * @param errorMessage - Expected error message
     */
    async assertLoginFailed(errorMessage: string): Promise<void> {
        await this.assertErrorMessage(errorMessage);
    }

    /**
     * Assert that username field has error
     */
    async assertUsernameError(): Promise<void> {
        await expect(this.locUsername).toHaveAttribute('aria-invalid', 'true');
    }

    /**
     * Assert that password field has error
     */
    async assertPasswordError(): Promise<void> {
        await expect(this.locPassword).toHaveAttribute('aria-invalid', 'true');
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
     * Check if remember me is checked
     */
    async isRememberMeChecked(): Promise<boolean> {
        return await this.locRememberMeCheckbox.isChecked();
    }
}

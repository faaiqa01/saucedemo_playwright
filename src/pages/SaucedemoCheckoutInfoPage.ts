import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Checkout Information Page Object
 * 
 * Mengelola semua interaksi dengan halaman Checkout Information Saucedemo Swag Labs.
 * Halaman ini meminta user untuk mengisi informasi pengiriman.
 * 
 * URL: https://www.saucedemo.com/checkout-step-one.html
 */
export class SaucedemoCheckoutInfoPage extends BasePage {
    // Page locators - Menggunakan data-testid sebagai selector utama
    private readonly locPageTitle: Locator;
    private readonly locFirstNameInput: Locator;
    private readonly locLastNameInput: Locator;
    private readonly locPostalCodeInput: Locator;
    private readonly locContinueButton: Locator;
    private readonly locCancelButton: Locator;

    // Saucedemo specific URL
    private readonly CHECKOUT_INFO_URL = 'https://www.saucedemo.com/checkout-step-one.html';

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan data-test attribute
        this.locPageTitle = page.locator('.title');
        this.locFirstNameInput = page.locator('[data-test="firstName"]');
        this.locLastNameInput = page.locator('[data-test="lastName"]');
        this.locPostalCodeInput = page.locator('[data-test="postalCode"]');
        this.locContinueButton = page.locator('[data-test="continue"]');
        this.locCancelButton = page.locator('[data-test="cancel"]');
    }

    /**
     * Navigate to Saucedemo checkout information page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.CHECKOUT_INFO_URL, { timeout: this.TIMEOUT_NAVIGATION });
        await this.verifyPage();
    }

    /**
     * Verify that user is on checkout information page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locPageTitle).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPageTitle).toHaveText('Checkout: Your Information', { timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locFirstNameInput).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locLastNameInput).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPostalCodeInput).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locContinueButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Fill first name field
     * @param firstName - First name value
     */
    async fillFirstName(firstName: string): Promise<void> {
        await this.fillInput(this.locFirstNameInput, firstName);
    }

    /**
     * Fill last name field
     * @param lastName - Last name value
     */
    async fillLastName(lastName: string): Promise<void> {
        await this.fillInput(this.locLastNameInput, lastName);
    }

    /**
     * Fill postal code field
     * @param postalCode - Postal code value
     */
    async fillPostalCode(postalCode: string): Promise<void> {
        await this.fillInput(this.locPostalCodeInput, postalCode);
    }

    /**
     * Fill all checkout information fields
     * @param firstName - First name value
     * @param lastName - Last name value
     * @param postalCode - Postal code value
     */
    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }

    /**
     * Click Continue button
     */
    async clickContinue(): Promise<void> {
        await this.clickElement(this.locContinueButton);
    }

    /**
     * Click Cancel button
     */
    async clickCancel(): Promise<void> {
        await this.clickElement(this.locCancelButton);
    }

    /**
     * Get first name value
     */
    getFirstNameValue(): Promise<string> {
        return this.locFirstNameInput.inputValue();
    }

    /**
     * Get last name value
     */
    getLastNameValue(): Promise<string> {
        return this.locLastNameInput.inputValue();
    }

    /**
     * Get postal code value
     */
    getPostalCodeValue(): Promise<string> {
        return this.locPostalCodeInput.inputValue();
    }

    /**
     * Get error message text
     */
    async getErrorMessage(): Promise<string> {
        const errorLocator = this.page.locator('[data-test="error"]');
        if (await this.isElementVisible(errorLocator)) {
            return await this.getText(errorLocator);
        }
        return '';
    }

    /**
     * Check if error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        const errorLocator = this.page.locator('[data-test="error"]');
        return await this.isElementVisible(errorLocator);
    }

    /**
     * Check if first name field is empty
     */
    async isFirstNameEmpty(): Promise<boolean> {
        const value = await this.getFirstNameValue();
        return value === '';
    }

    /**
     * Check if last name field is empty
     */
    async isLastNameEmpty(): Promise<boolean> {
        const value = await this.getLastNameValue();
        return value === '';
    }

    /**
     * Check if postal code field is empty
     */
    async isPostalCodeEmpty(): Promise<boolean> {
        const value = await this.getPostalCodeValue();
        return value === '';
    }

    /**
     * Clear first name field
     */
    async clearFirstName(): Promise<void> {
        await this.locFirstNameInput.clear();
    }

    /**
     * Clear last name field
     */
    async clearLastName(): Promise<void> {
        await this.locLastNameInput.clear();
    }

    /**
     * Clear postal code field
     */
    async clearPostalCode(): Promise<void> {
        await this.locPostalCodeInput.clear();
    }

    /**
     * Clear all form fields
     */
    async clearForm(): Promise<void> {
        await this.clearFirstName();
        await this.clearLastName();
        await this.clearPostalCode();
    }

    /**
     * Assert that error message is displayed with specific text
     * @param expectedMessage - Expected error message
     */
    async assertErrorMessage(expectedMessage: string): Promise<void> {
        const errorLocator = this.page.locator('[data-test="error"]');
        await expect(errorLocator).toBeVisible({ timeout: this.TIMEOUT_SHORT });
        await expect(errorLocator).toContainText(expectedMessage, { timeout: this.TIMEOUT_SHORT });
    }

    /**
     * Assert that error message contains specific text
     * @param expectedText - Expected text to be contained in error message
     */
    async assertErrorContains(expectedText: string): Promise<void> {
        const errorLocator = this.page.locator('[data-test="error"]');
        await expect(errorLocator).toBeVisible({ timeout: this.TIMEOUT_SHORT });
        await expect(errorLocator).toContainText(expectedText, { timeout: this.TIMEOUT_SHORT });
    }

    /**
     * Assert that all required fields are visible
     */
    async assertRequiredFieldsVisible(): Promise<void> {
        await expect(this.locFirstNameInput).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locLastNameInput).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPostalCodeInput).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that continue button is enabled
     */
    async assertContinueButtonEnabled(): Promise<void> {
        await expect(this.locContinueButton).toBeEnabled({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that continue button is disabled
     */
    async assertContinueButtonDisabled(): Promise<void> {
        await expect(this.locContinueButton).toBeDisabled({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Submit checkout information and verify navigation to overview page
     * @param firstName - First name value
     * @param lastName - Last name value
     * @param postalCode - Postal code value
     */
    async submitCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.fillCheckoutInfo(firstName, lastName, postalCode);
        await this.clickContinue();
        await expect(this.page).toHaveURL(/.*checkout-step-two.html/, { timeout: this.TIMEOUT_NAVIGATION });
    }
}

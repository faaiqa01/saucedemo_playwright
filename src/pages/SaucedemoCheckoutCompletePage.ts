import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Checkout Complete Page Object
 * 
 * Mengelola semua interaksi dengan halaman Checkout Complete Saucedemo Swag Labs.
 * Halaman ini menampilkan konfirmasi bahwa order telah selesai.
 * 
 * URL: https://www.saucedemo.com/checkout-complete.html
 */
export class SaucedemoCheckoutCompletePage extends BasePage {
    // Page locators - Menggunakan data-testid sebagai selector utama
    private readonly locPageTitle: Locator;
    private readonly locCompleteHeader: Locator;
    private readonly locCompleteText: Locator;
    private readonly locCompleteDescription: Locator;
    private readonly locPonyExpressImage: Locator;
    private readonly locBackHomeButton: Locator;

    // Saucedemo specific URL
    private readonly CHECKOUT_COMPLETE_URL = 'https://www.saucedemo.com/checkout-complete.html';

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan data-test attribute
        this.locPageTitle = page.locator('.title');
        this.locCompleteHeader = page.locator('.complete-header');
        this.locCompleteText = page.locator('.complete-text');
        this.locCompleteDescription = page.locator('[data-test="complete-text"]');
        this.locPonyExpressImage = page.locator('.pony_express');
        this.locBackHomeButton = page.locator('[data-test="back-to-products"]');
    }

    /**
     * Navigate to Saucedemo checkout complete page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.CHECKOUT_COMPLETE_URL, { timeout: this.TIMEOUT_NAVIGATION });
        await this.verifyPage();
    }

    /**
     * Verify that user is on checkout complete page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locPageTitle).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPageTitle).toHaveText('Checkout: Complete!', { timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locCompleteHeader).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locBackHomeButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Get complete header text
     */
    async getCompleteHeaderText(): Promise<string> {
        return await this.getText(this.locCompleteHeader);
    }

    /**
     * Get complete text
     */
    async getCompleteText(): Promise<string> {
        return await this.getText(this.locCompleteText);
    }

    /**
     * Get complete description text
     */
    async getCompleteDescription(): Promise<string> {
        return await this.getText(this.locCompleteDescription);
    }

    /**
     * Click Back Home button
     */
    async clickBackHome(): Promise<void> {
        await this.clickElement(this.locBackHomeButton);
    }

    /**
     * Check if pony express image is visible
     */
    async isPonyExpressImageVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locPonyExpressImage);
    }

    /**
     * Check if back home button is visible
     */
    async isBackHomeButtonVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locBackHomeButton);
    }

    /**
     * Assert that complete header is displayed with correct text
     * @param expectedText - Expected header text (default: 'Thank you for your order!')
     */
    async assertCompleteHeader(expectedText: string = 'Thank you for your order!'): Promise<void> {
        await expect(this.locCompleteHeader).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locCompleteHeader).toHaveText(expectedText, { timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that complete text is displayed
     * @param expectedText - Expected text (default: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
     */
    async assertCompleteText(expectedText: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'): Promise<void> {
        await expect(this.locCompleteText).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locCompleteText).toHaveText(expectedText, { timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that complete description is displayed
     */
    async assertCompleteDescription(): Promise<void> {
        await expect(this.locCompleteDescription).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that pony express image is visible
     */
    async assertPonyExpressImageVisible(): Promise<void> {
        await expect(this.locPonyExpressImage).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that back home button is visible
     */
    async assertBackHomeButtonVisible(): Promise<void> {
        await expect(this.locBackHomeButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that all checkout complete elements are visible
     */
    async assertAllElementsVisible(): Promise<void> {
        await this.assertCompleteHeader();
        await this.assertCompleteText();
        await this.assertCompleteDescription();
        await this.assertPonyExpressImageVisible();
        await this.assertBackHomeButtonVisible();
    }

    /**
     * Click back home and verify navigation to inventory page
     */
    async goBackHome(): Promise<void> {
        await this.clickBackHome();
        await expect(this.page).toHaveURL(/.*inventory.html/, { timeout: this.TIMEOUT_NAVIGATION });
    }
}

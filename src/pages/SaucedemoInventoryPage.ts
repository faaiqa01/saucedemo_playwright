import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Inventory Page Object
 * 
 * Mengelola semua interaksi dengan halaman inventory (dashboard) Saucedemo Swag Labs.
 * Halaman ini muncul setelah user berhasil login.
 * 
 * URL: https://www.saucedemo.com/inventory.html
 */
export class SaucedemoInventoryPage extends BasePage {
    // Page locators - Menggunakan data-testid (PRIORITY 1 selector)
    private readonly locHeaderContainer: Locator;
    private readonly locPrimaryHeader: Locator;
    private readonly locMenuButton: Locator;
    private readonly locShoppingCart: Locator;
    private readonly locProductList: Locator;
    private readonly locProductTitle: Locator;

    // Saucedemo specific URL
    private readonly INVENTORY_URL = 'https://www.saucedemo.com/inventory.html';

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan data-test (Saucedemo uses data-test attribute)
        this.locHeaderContainer = page.locator('.header_container');
        this.locPrimaryHeader = page.locator('.header_label');
        this.locMenuButton = page.locator('#react-burger-menu-btn');
        this.locShoppingCart = page.locator('.shopping_cart_link');
        this.locProductList = page.locator('.inventory_list');
        this.locProductTitle = page.locator('.inventory_item_name');
    }

    /**
     * Navigate to Saucedemo inventory page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.INVENTORY_URL, { timeout: this.TIMEOUT_NAVIGATION });
        await this.verifyPage();
    }

    /**
     * Verify that user is on inventory page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locHeaderContainer).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPrimaryHeader).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locProductList).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Get current page URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Check if user is on inventory page
     */
    async isOnInventoryPage(): Promise<boolean> {
        return this.getCurrentUrl().includes('inventory.html');
    }

    /**
     * Get number of products displayed
     */
    async getProductCount(): Promise<number> {
        return await this.locProductTitle.count();
    }

    /**
     * Get all product titles
     */
    async getProductTitles(): Promise<string[]> {
        return await this.locProductTitle.allTextContents();
    }

    /**
     * Check if shopping cart is visible
     */
    async isShoppingCartVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locShoppingCart);
    }

    /**
     * Click menu button to open sidebar
     */
    async clickMenuButton(): Promise<void> {
        await this.clickElement(this.locMenuButton);
    }

    /**
     * Click shopping cart
     */
    async clickShoppingCart(): Promise<void> {
        await this.clickElement(this.locShoppingCart);
    }

    /**
     * Assert that user is logged in (inventory page is displayed)
     */
    async assertUserLoggedIn(): Promise<void> {
        await this.verifyPage();
        await expect(this.page).toHaveURL(/.*inventory.html/, { timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that products are displayed
     */
    async assertProductsDisplayed(): Promise<void> {
        const productCount = await this.getProductCount();
        await expect(productCount).toBeGreaterThan(0);
    }

    /**
     * Assert that specific product is displayed
     * @param productName - Name of the product
     */
    async assertProductDisplayed(productName: string): Promise<void> {
        const productLocator = this.locProductTitle.filter({ hasText: productName });
        await expect(productLocator).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Get page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Check if page has visual issues (for visual_user testing)
     */
    async hasVisualIssues(): Promise<boolean> {
        // This method can be extended to check for specific visual issues
        // For now, it returns false as a placeholder
        return false;
    }

    /**
     * Check if page has performance issues (for performance_glitch_user testing)
     */
    async hasPerformanceIssues(): Promise<boolean> {
        // This method can be extended to check for performance issues
        // For now, it returns false as a placeholder
        return false;
    }
}

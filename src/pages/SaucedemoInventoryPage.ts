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
    // Page locators - Menggunakan selector yang stabil
    private readonly locHeaderContainer: Locator;
    private readonly locPrimaryHeader: Locator;
    private readonly locMenuButton: Locator;
    private readonly locShoppingCart: Locator;
    private readonly locShoppingCartBadge: Locator;
    private readonly locProductList: Locator;
    private readonly locProductTitle: Locator;
    private readonly locProductDescription: Locator;
    private readonly locProductPrice: Locator;
    private readonly locSortDropdown: Locator;
    private readonly locSidebar: Locator;
    private readonly locAllItemsLink: Locator;
    private readonly locAboutLink: Locator;
    private readonly locLogoutLink: Locator;
    private readonly locResetAppStateLink: Locator;
    private readonly locCloseMenuButton: Locator;

    // Saucedemo specific URL
    private readonly INVENTORY_URL = 'https://www.saucedemo.com/inventory.html';

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan selector yang stabil
        this.locHeaderContainer = page.locator('.header_container');
        this.locPrimaryHeader = page.locator('.header_label');
        this.locMenuButton = page.locator('#react-burger-menu-btn');
        this.locShoppingCart = page.locator('.shopping_cart_link');
        this.locShoppingCartBadge = page.locator('.shopping_cart_badge');
        this.locProductList = page.locator('.inventory_list');
        this.locProductTitle = page.locator('.inventory_item_name');
        this.locProductDescription = page.locator('.inventory_item_desc');
        this.locProductPrice = page.locator('.inventory_item_price');
        this.locSortDropdown = page.locator('.product_sort_container');
        this.locSidebar = page.locator('.bm-menu');
        this.locAllItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
        this.locAboutLink = page.locator('[data-test="about-sidebar-link"]');
        this.locLogoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.locResetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
        this.locCloseMenuButton = page.locator('#react-burger-cross-btn');
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

    /**
     * Get shopping cart badge count
     */
    async getShoppingCartBadgeCount(): Promise<number> {
        const badgeText = await this.locShoppingCartBadge.allTextContents();
        if (badgeText.length === 0) {
            return 0;
        }
        return parseInt(badgeText[0], 10);
    }

    /**
     * Get Add to cart button for specific product
     * @param productName - Name of the product
     */
    getAddToCartButton(productName: string): Locator {
        return this.page.locator(`[data-test="add-to-cart-${this.formatProductName(productName)}"]`);
    }

    /**
     * Get Remove button for specific product
     * @param productName - Name of the product
     */
    getRemoveButton(productName: string): Locator {
        return this.page.locator(`[data-test="remove-${this.formatProductName(productName)}"]`);
    }

    /**
     * Add product to cart
     * @param productName - Name of the product
     */
    async addProductToCart(productName: string): Promise<void> {
        const addButton = this.getAddToCartButton(productName);
        await this.clickElement(addButton);
    }

    /**
     * Remove product from cart
     * @param productName - Name of the product
     */
    async removeProductFromCart(productName: string): Promise<void> {
        const removeButton = this.getRemoveButton(productName);
        await this.clickElement(removeButton);
    }

    /**
     * Check if product is in cart (Remove button is visible)
     * @param productName - Name of the product
     */
    async isProductInCart(productName: string): Promise<boolean> {
        const removeButton = this.getRemoveButton(productName);
        return await removeButton.isVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Click on product name to navigate to detail page
     * @param productName - Name of product
     */
    async clickProductName(productName: string): Promise<void> {
        const productLocator = this.locProductTitle.filter({ hasText: productName });
        await this.clickElement(productLocator);
    }

    /**
     * Get product price
     * @param productName - Name of the product
     */
    async getProductPrice(productName: string): Promise<string> {
        const productLocator = this.locProductTitle.filter({ hasText: productName });
        const productItem = productLocator.locator('xpath=ancestor::div[@class="inventory_item"]');
        const priceElement = productItem.locator(this.locProductPrice);
        return await priceElement.textContent({ timeout: this.TIMEOUT_DEFAULT }) || '';
    }

    /**
     * Get product description
     * @param productName - Name of the product
     */
    async getProductDescription(productName: string): Promise<string> {
        const productLocator = this.locProductTitle.filter({ hasText: productName });
        const productItem = productLocator.locator('xpath=ancestor::div[@class="inventory_item"]');
        const descElement = productItem.locator(this.locProductDescription);
        return await descElement.textContent({ timeout: this.TIMEOUT_DEFAULT }) || '';
    }

    /**
     * Sort products
     * @param sortOption - Sort option: 'az', 'za', 'lohi', 'hilo'
     */
    async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        const sortOptions = {
            az: 'Name (A to Z)',
            za: 'Name (Z to A)',
            lohi: 'Price (low to high)',
            hilo: 'Price (high to low)',
        };
        await this.locSortDropdown.selectOption(sortOptions[sortOption]);
    }

    /**
     * Get selected sort option
     */
    async getSelectedSortOption(): Promise<string> {
        return await this.locSortDropdown.inputValue({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Check if sidebar is open
     */
    async isSidebarOpen(): Promise<boolean> {
        return await this.locSidebar.isVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Click All Items link in sidebar
     */
    async clickAllItems(): Promise<void> {
        await this.clickElement(this.locAllItemsLink);
    }

    /**
     * Click About link in sidebar
     */
    async clickAbout(): Promise<void> {
        await this.clickElement(this.locAboutLink);
    }

    /**
     * Click Logout link in sidebar
     */
    async clickLogout(): Promise<void> {
        await this.clickElement(this.locLogoutLink);
    }

    /**
     * Click Reset App State link in sidebar
     */
    async clickResetAppState(): Promise<void> {
        await this.clickElement(this.locResetAppStateLink);
    }

    /**
     * Click Close Menu button
     */
    async clickCloseMenu(): Promise<void> {
        await this.clickElement(this.locCloseMenuButton);
    }

    /**
     * Format product name for data-test attribute
     * Convert product name to lowercase and replace spaces with hyphens
     * @param productName - Name of the product
     */
    private formatProductName(productName: string): string {
        return productName.toLowerCase().replace(/\s+/g, '-').replace(/[().]/g, '');
    }

    /**
     * Assert that shopping cart badge shows correct count
     * @param expectedCount - Expected count
     */
    async assertShoppingCartBadgeCount(expectedCount: number): Promise<void> {
        const actualCount = await this.getShoppingCartBadgeCount();
        await expect(actualCount).toBe(expectedCount);
    }

    /**
     * Assert that Add to cart button is visible for product
     * @param productName - Name of the product
     */
    async assertAddToCartButtonVisible(productName: string): Promise<void> {
        const addButton = this.getAddToCartButton(productName);
        await expect(addButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that Remove button is visible for product
     * @param productName - Name of the product
     */
    async assertRemoveButtonVisible(productName: string): Promise<void> {
        const removeButton = this.getRemoveButton(productName);
        await expect(removeButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that product price format is correct
     * @param productName - Name of the product
     */
    async assertProductPriceFormat(productName: string): Promise<void> {
        const price = await this.getProductPrice(productName);
        await expect(price).toMatch(/^\$\d+\.\d{2}$/);
    }

    /**
     * Get all product prices
     */
    async getProductPrices(): Promise<number[]> {
        const priceTexts = await this.locProductPrice.allTextContents();
        return priceTexts.map(text => parseFloat(text.replace('$', '')));
    }
}

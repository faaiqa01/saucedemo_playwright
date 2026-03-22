import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Detail Product Page Object
 *
 * Mengelola semua interaksi dengan halaman detail produk Saucedemo Swag Labs.
 * Halaman ini muncul setelah user mengklik produk dari halaman inventory.
 *
 * URL: https://www.saucedemo.com/inventory-item.html?id=<product_id>
 */
export class SaucedemoDetailProductPage extends BasePage {
    // Page locators - Menggunakan selector yang stabil
    private readonly locHeaderContainer: Locator;
    private readonly locPrimaryHeader: Locator;
    private readonly locMenuButton: Locator;
    private readonly locShoppingCart: Locator;
    private readonly locShoppingCartBadge: Locator;
    private readonly locBackToProductsButton: Locator;
    private readonly locProductImage: Locator;
    private readonly locProductName: Locator;
    private readonly locProductDescription: Locator;
    private readonly locProductPrice: Locator;
    private readonly locAddToCartButton: Locator;
    private readonly locRemoveButton: Locator;
    private readonly locSidebar: Locator;
    private readonly locAllItemsLink: Locator;

    // Saucedemo specific URL
    private readonly SAUCEDEMO_BASE_URL = 'https://www.saucedemo.com';
    private readonly DETAIL_PRODUCT_URL_PATTERN = /inventory-item\.html\?id=\d+/;

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan selector yang stabil
        this.locHeaderContainer = page.locator('.header_container.inventory_details');
        this.locPrimaryHeader = page.locator('.header_label');
        this.locMenuButton = page.locator('#react-burger-menu-btn');
        this.locShoppingCart = page.locator('.shopping_cart_link');
        this.locShoppingCartBadge = page.locator('.shopping_cart_badge');
        this.locBackToProductsButton = page.locator('[data-test="back-to-products"]');
        this.locProductImage = page.locator('.inventory_details_img');
        this.locProductName = page.locator('[data-test="inventory-item-name"]');
        this.locProductDescription = page.locator('[data-test="inventory-item-desc"]');
        this.locProductPrice = page.locator('[data-test="inventory-item-price"]');
        this.locAddToCartButton = page.locator('[data-test="add-to-cart"]');
        this.locRemoveButton = page.locator('[data-test="remove"]');
        this.locSidebar = page.locator('.bm-menu');
        this.locAllItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    }

    /**
     * Verify that user is on detail product page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locHeaderContainer).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPrimaryHeader).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locProductImage).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locProductName).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locProductDescription).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locProductPrice).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locBackToProductsButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Get current page URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Check if user is on detail product page
     */
    async isOnDetailProductPage(): Promise<boolean> {
        return this.DETAIL_PRODUCT_URL_PATTERN.test(this.getCurrentUrl());
    }

    /**
     * Get product name
     */
    async getProductName(): Promise<string> {
        return await this.getText(this.locProductName);
    }

    /**
     * Get product description
     */
    async getProductDescription(): Promise<string> {
        return await this.getText(this.locProductDescription);
    }

    /**
     * Get product price
     */
    async getProductPrice(): Promise<string> {
        return await this.getText(this.locProductPrice);
    }

    /**
     * Get product image source
     */
    async getProductImageSrc(): Promise<string> {
        return await this.locProductImage.getAttribute('src') || '';
    }

    /**
     * Check if product image is loaded
     */
    async isProductImageLoaded(): Promise<boolean> {
        const imageSrc = await this.getProductImageSrc();
        // Wait for image to be loaded
        await this.locProductImage.evaluate((img) => {
            return new Promise<boolean>((resolve) => {
                if ((img as HTMLImageElement).complete) {
                    resolve(true);
                } else {
                    (img as HTMLImageElement).onload = () => resolve(true);
                    (img as HTMLImageElement).onerror = () => resolve(false);
                }
            });
        });
        const naturalWidth = await this.locProductImage.evaluate((img) => {
            return (img as HTMLImageElement).naturalWidth;
        });
        return naturalWidth > 0 && imageSrc.length > 0;
    }

    /**
     * Check if Add to cart button is visible
     */
    async isAddToCartButtonVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locAddToCartButton);
    }

    /**
     * Check if Remove button is visible
     */
    async isRemoveButtonVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locRemoveButton);
    }

    /**
     * Click Add to cart button
     */
    async clickAddToCartButton(): Promise<void> {
        await this.clickElement(this.locAddToCartButton);
    }

    /**
     * Click Remove button
     */
    async clickRemoveButton(): Promise<void> {
        await this.clickElement(this.locRemoveButton);
    }

    /**
     * Click Back to products button
     */
    async clickBackToProductsButton(): Promise<void> {
        await this.clickElement(this.locBackToProductsButton);
    }

    /**
     * Click shopping cart
     */
    async clickShoppingCart(): Promise<void> {
        await this.clickElement(this.locShoppingCart);
    }

    /**
     * Click menu button to open sidebar
     */
    async clickMenuButton(): Promise<void> {
        await this.clickElement(this.locMenuButton);
    }

    /**
     * Check if sidebar is visible
     */
    async isSidebarVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locSidebar);
    }

    /**
     * Get shopping cart badge count
     */
    async getShoppingCartBadgeCount(): Promise<number> {
        if (await this.isElementVisible(this.locShoppingCartBadge)) {
            const text = await this.getText(this.locShoppingCartBadge);
            return parseInt(text, 10);
        }
        return 0;
    }

    /**
     * Assert that user is on detail product page
     */
    async assertOnDetailProductPage(): Promise<void> {
        await expect(this.page).toHaveURL(this.DETAIL_PRODUCT_URL_PATTERN, { timeout: this.TIMEOUT_DEFAULT });
        await this.verifyPage();
    }

    /**
     * Assert that all elements are displayed
     */
    async assertAllElementsDisplayed(): Promise<void> {
        await expect(this.locProductImage).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locProductName).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locProductDescription).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locProductPrice).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locAddToCartButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that product name matches expected value
     * @param expectedName - Expected product name
     */
    async assertProductName(expectedName: string): Promise<void> {
        const actualName = await this.getProductName();
        await expect(actualName).toBe(expectedName);
    }

    /**
     * Assert that product description matches expected value
     * @param expectedDescription - Expected product description
     */
    async assertProductDescription(expectedDescription: string): Promise<void> {
        const actualDescription = await this.getProductDescription();
        await expect(actualDescription).toBe(expectedDescription);
    }

    /**
     * Assert that product price matches expected value
     * @param expectedPrice - Expected product price
     */
    async assertProductPrice(expectedPrice: string): Promise<void> {
        const actualPrice = await this.getProductPrice();
        await expect(actualPrice).toBe(expectedPrice);
    }

    /**
     * Assert that product price follows correct format ($xx.xx)
     */
    async assertPriceFormat(): Promise<void> {
        const price = await this.getProductPrice();
        const priceRegex = /^\$\d+\.\d{2}$/;
        await expect(priceRegex.test(price)).toBeTruthy();
    }

    /**
     * Assert that product description is not empty
     */
    async assertProductDescriptionNotEmpty(): Promise<void> {
        const description = await this.getProductDescription();
        await expect(description.length).toBeGreaterThan(0);
        await expect(description.trim().length).toBeGreaterThan(0);
    }

    /**
     * Assert that product image is loaded correctly
     */
    async assertProductImageLoaded(): Promise<void> {
        const isLoaded = await this.isProductImageLoaded();
        await expect(isLoaded).toBeTruthy();
    }

    /**
     * Assert that Add to cart button changed to Remove button
     */
    async assertRemoveButtonVisible(): Promise<void> {
        await expect(this.locRemoveButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locAddToCartButton).not.toBeVisible({ timeout: this.TIMEOUT_SHORT });
    }

    /**
     * Assert that shopping cart badge shows expected count
     * @param expectedCount - Expected cart count
     */
    async assertShoppingCartBadgeCount(expectedCount: number): Promise<void> {
        const actualCount = await this.getShoppingCartBadgeCount();
        await expect(actualCount).toBe(expectedCount);
    }

    /**
     * Assert that user is redirected to inventory page
     */
    async assertRedirectedToInventoryPage(): Promise<void> {
        await expect(this.page).toHaveURL(/.*inventory\.html/, { timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that sidebar is visible
     */
    async assertSidebarVisible(): Promise<void> {
        await expect(this.locSidebar).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locAllItemsLink).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that user is redirected to cart page
     */
    async assertRedirectedToCartPage(): Promise<void> {
        await expect(this.page).toHaveURL(/.*cart\.html/, { timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Navigate directly to detail product page by URL
     * @param productId - Product ID
     */
    async navigateToDetailProduct(productId: number): Promise<void> {
        const url = `${this.SAUCEDEMO_BASE_URL}/inventory-item.html?id=${productId}`;
        await this.page.goto(url, { timeout: this.TIMEOUT_NAVIGATION });
        await this.waitForPageLoad();
    }

}

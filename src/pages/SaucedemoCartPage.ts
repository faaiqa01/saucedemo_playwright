import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Cart Page Object
 * 
 * Mengelola semua interaksi dengan halaman cart (Your Cart) Saucedemo Swag Labs.
 * Halaman ini menampilkan item yang ditambahkan ke keranjang belanja.
 * 
 * URL: https://www.saucedemo.com/cart.html
 */
export class SaucedemoCartPage extends BasePage {
    // Page locators - Menggunakan data-testid sebagai selector utama
    private readonly locCartTitle: Locator;
    private readonly locCartItem: Locator;
    private readonly locCartItemName: Locator;
    private readonly locCartItemDesc: Locator;
    private readonly locCartItemPrice: Locator;
    private readonly locCartItemQty: Locator;
    private readonly locCartRemoveButton: Locator;
    private readonly locContinueShoppingButton: Locator;
    private readonly locCheckoutButton: Locator;
    private readonly locShoppingCart: Locator;
    private readonly locShoppingCartBadge: Locator;

    // Saucedemo specific URL
    private readonly CART_URL = 'https://www.saucedemo.com/cart.html';

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan data-test attribute
        this.locCartTitle = page.locator('.title');
        this.locCartItem = page.locator('.cart_item');
        this.locCartItemName = page.locator('.inventory_item_name');
        this.locCartItemDesc = page.locator('.inventory_item_desc');
        this.locCartItemPrice = page.locator('.inventory_item_price');
        this.locCartItemQty = page.locator('.cart_quantity');
        this.locCartRemoveButton = page.locator('[data-test^="remove-"]');
        this.locContinueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.locCheckoutButton = page.locator('[data-test="checkout"]');
        this.locShoppingCart = page.locator('.shopping_cart_link');
        this.locShoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    /**
     * Navigate to Saucedemo cart page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.CART_URL, { timeout: this.TIMEOUT_NAVIGATION });
        await this.verifyPage();
    }

    /**
     * Verify that user is on cart page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locCartTitle).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locCartTitle).toHaveText('Your Cart', { timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Get number of items in cart
     */
    async getCartItemCount(): Promise<number> {
        return await this.locCartItem.count();
    }

    /**
     * Get all product names in cart
     */
    async getProductNames(): Promise<string[]> {
        return await this.locCartItemName.allTextContents();
    }

    /**
     * Get product name by index
     * @param index - Index of product (0-based)
     */
    async getProductName(index: number): Promise<string> {
        const names = await this.getProductNames();
        return names[index] || '';
    }

    /**
     * Get product description by name
     * @param productName - Name of the product
     */
    async getProductDescription(productName: string): Promise<string> {
        const productLocator = this.locCartItemName.filter({ hasText: productName });
        const cartItem = productLocator.locator('xpath=ancestor::div[@class="cart_item"]');
        const descElement = cartItem.locator(this.locCartItemDesc);
        return await descElement.textContent({ timeout: this.TIMEOUT_DEFAULT }) || '';
    }

    /**
     * Get product price by name
     * @param productName - Name of the product
     */
    async getProductPrice(productName: string): Promise<string> {
        const productLocator = this.locCartItemName.filter({ hasText: productName });
        const cartItem = productLocator.locator('xpath=ancestor::div[@class="cart_item"]');
        const priceElement = cartItem.locator(this.locCartItemPrice);
        return await priceElement.textContent({ timeout: this.TIMEOUT_DEFAULT }) || '';
    }

    /**
     * Get product quantity by name
     * @param productName - Name of the product
     */
    async getProductQuantity(productName: string): Promise<string> {
        const productLocator = this.locCartItemName.filter({ hasText: productName });
        const cartItem = productLocator.locator('xpath=ancestor::div[@class="cart_item"]');
        const qtyElement = cartItem.locator(this.locCartItemQty);
        return await qtyElement.textContent({ timeout: this.TIMEOUT_DEFAULT }) || '';
    }

    /**
     * Get remove button for specific product
     * @param productName - Name of the product
     */
    getRemoveButton(productName: string): Locator {
        const productLocator = this.locCartItemName.filter({ hasText: productName });
        const cartItem = productLocator.locator('xpath=ancestor::div[@class="cart_item"]');
        return cartItem.locator(this.locCartRemoveButton);
    }

    /**
     * Remove product from cart
     * @param productName - Name of the product
     */
    async removeProduct(productName: string): Promise<void> {
        const removeButton = this.getRemoveButton(productName);
        await this.clickElement(removeButton);
    }

    /**
     * Click Continue Shopping button
     */
    async clickContinueShopping(): Promise<void> {
        await this.clickElement(this.locContinueShoppingButton);
    }

    /**
     * Click Checkout button
     */
    async clickCheckout(): Promise<void> {
        await this.clickElement(this.locCheckoutButton);
    }

    /**
     * Click shopping cart icon
     */
    async clickShoppingCart(): Promise<void> {
        await this.clickElement(this.locShoppingCart);
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
     * Check if product is in cart
     * @param productName - Name of the product
     */
    async isProductInCart(productName: string): Promise<boolean> {
        const productLocator = this.locCartItemName.filter({ hasText: productName });
        return await productLocator.count() > 0;
    }

    /**
     * Check if cart is empty
     */
    async isCartEmpty(): Promise<boolean> {
        const count = await this.getCartItemCount();
        return count === 0;
    }

    /**
     * Assert that cart has specific number of items
     * @param expectedCount - Expected count
     */
    async assertCartItemCount(expectedCount: number): Promise<void> {
        const actualCount = await this.getCartItemCount();
        await expect(actualCount).toBe(expectedCount);
    }

    /**
     * Assert that product is in cart
     * @param productName - Name of the product
     */
    async assertProductInCart(productName: string): Promise<void> {
        await expect(this.locCartItemName.filter({ hasText: productName })).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that product is NOT in cart
     * @param productName - Name of the product
     */
    async assertProductNotInCart(productName: string): Promise<void> {
        await expect(this.locCartItemName.filter({ hasText: productName })).not.toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that cart is empty
     */
    async assertCartEmpty(): Promise<void> {
        await expect(this.locCartItem).toHaveCount(0, { timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that all cart elements are visible
     */
    async assertCartElementsVisible(): Promise<void> {
        await expect(this.locCartTitle).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locContinueShoppingButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locCheckoutButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert product details are correct
     * @param productName - Name of the product
     * @param expectedPrice - Expected price
     * @param expectedQty - Expected quantity
     */
    async assertProductDetails(productName: string, expectedPrice: string, expectedQty: string = '1'): Promise<void> {
        await this.assertProductInCart(productName);
        const actualPrice = await this.getProductPrice(productName);
        const actualQty = await this.getProductQuantity(productName);
        await expect(actualPrice).toBe(expectedPrice);
        await expect(actualQty).toBe(expectedQty);
    }

    /**
     * Get all product prices in cart
     */
    async getProductPrices(): Promise<number[]> {
        const priceTexts = await this.locCartItemPrice.allTextContents();
        return priceTexts.map(text => parseFloat(text.replace('$', '')));
    }

    /**
     * Calculate total price of all items in cart
     */
    async calculateTotalPrice(): Promise<number> {
        const prices = await this.getProductPrices();
        return prices.reduce((sum, price) => sum + price, 0);
    }
}

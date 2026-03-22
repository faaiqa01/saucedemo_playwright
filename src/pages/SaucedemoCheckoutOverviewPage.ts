import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Saucedemo Checkout Overview Page Object
 * 
 * Mengelola semua interaksi dengan halaman Checkout Overview Saucedemo Swag Labs.
 * Halaman ini menampilkan ringkasan order sebelum checkout final.
 * 
 * URL: https://www.saucedemo.com/checkout-step-two.html
 */
export class SaucedemoCheckoutOverviewPage extends BasePage {
    // Page locators - Menggunakan data-testid sebagai selector utama
    private readonly locPageTitle: Locator;
    private readonly locCartItem: Locator;
    private readonly locCartItemName: Locator;
    private readonly locCartItemDesc: Locator;
    private readonly locCartItemPrice: Locator;
    private readonly locCartItemQty: Locator;
    private readonly locPaymentInfoLabel: Locator;
    private readonly locPaymentInfoValue: Locator;
    private readonly locShippingInfoLabel: Locator;
    private readonly locShippingInfoValue: Locator;
    private readonly locItemTotalLabel: Locator;
    private readonly locItemTotalValue: Locator;
    private readonly locTaxLabel: Locator;
    private readonly locTaxValue: Locator;
    private readonly locTotalLabel: Locator;
    private readonly locTotalValue: Locator;
    private readonly locFinishButton: Locator;
    private readonly locCancelButton: Locator;

    // Saucedemo specific URL
    private readonly CHECKOUT_OVERVIEW_URL = 'https://www.saucedemo.com/checkout-step-two.html';

    constructor(page: Page) {
        super(page);

        // Initialize locators dengan data-test attribute
        this.locPageTitle = page.locator('.title');
        this.locCartItem = page.locator('.cart_item');
        this.locCartItemName = page.locator('.inventory_item_name');
        this.locCartItemDesc = page.locator('.inventory_item_desc');
        this.locCartItemPrice = page.locator('.inventory_item_price');
        this.locCartItemQty = page.locator('.cart_quantity');
        this.locPaymentInfoLabel = page.locator('.summary_info_label').filter({ hasText: 'Payment Information' });
        this.locPaymentInfoValue = page.locator('[data-test="payment-info-value"]');
        this.locShippingInfoLabel = page.locator('.summary_info_label').filter({ hasText: 'Shipping Information' });
        this.locShippingInfoValue = page.locator('[data-test="shipping-info-value"]');
        this.locItemTotalLabel = page.locator('.summary_subtotal_label');
        this.locItemTotalValue = page.locator('[data-test="subtotal-label"]');
        this.locTaxLabel = page.locator('.summary_tax_label');
        this.locTaxValue = page.locator('[data-test="tax-label"]');
        this.locTotalLabel = page.locator('.summary_total_label');
        this.locTotalValue = page.locator('[data-test="total-label"]');
        this.locFinishButton = page.locator('[data-test="finish"]');
        this.locCancelButton = page.locator('[data-test="cancel"]');
    }

    /**
     * Navigate to Saucedemo checkout overview page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.CHECKOUT_OVERVIEW_URL, { timeout: this.TIMEOUT_NAVIGATION });
        await this.verifyPage();
    }

    /**
     * Verify that user is on checkout overview page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locPageTitle).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPageTitle).toHaveText('Checkout: Overview', { timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locFinishButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Get number of items in order
     */
    async getItemCount(): Promise<number> {
        return await this.locCartItem.count();
    }

    /**
     * Get all product names in order
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
     * Get payment information value
     */
    async getPaymentInfo(): Promise<string> {
        return await this.getText(this.locPaymentInfoValue);
    }

    /**
     * Get shipping information value
     */
    async getShippingInfo(): Promise<string> {
        return await this.getText(this.locShippingInfoValue);
    }

    /**
     * Get item total value
     */
    async getItemTotal(): Promise<string> {
        return await this.getText(this.locItemTotalValue);
    }

    /**
     * Get tax value
     */
    async getTax(): Promise<string> {
        return await this.getText(this.locTaxValue);
    }

    /**
     * Get total value
     */
    async getTotal(): Promise<string> {
        return await this.getText(this.locTotalValue);
    }

    /**
     * Get item total as number
     */
    async getItemTotalNumber(): Promise<number> {
        const text = await this.getItemTotal();
        return parseFloat(text.replace('Item total: $', ''));
    }

    /**
     * Get tax as number
     */
    async getTaxNumber(): Promise<number> {
        const text = await this.getTax();
        return parseFloat(text.replace('Tax: $', ''));
    }

    /**
     * Get total as number
     */
    async getTotalNumber(): Promise<number> {
        const text = await this.getTotal();
        return parseFloat(text.replace('Total: $', ''));
    }

    /**
     * Click Finish button
     */
    async clickFinish(): Promise<void> {
        await this.clickElement(this.locFinishButton);
    }

    /**
     * Click Cancel button
     */
    async clickCancel(): Promise<void> {
        await this.clickElement(this.locCancelButton);
    }

    /**
     * Check if product is in order
     * @param productName - Name of the product
     */
    async isProductInOrder(productName: string): Promise<boolean> {
        const productLocator = this.locCartItemName.filter({ hasText: productName });
        return await productLocator.count() > 0;
    }

    /**
     * Assert that product is in order
     * @param productName - Name of the product
     */
    async assertProductInOrder(productName: string): Promise<void> {
        await expect(this.locCartItemName.filter({ hasText: productName })).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert product details are correct
     * @param productName - Name of the product
     * @param expectedPrice - Expected price
     * @param expectedQty - Expected quantity
     */
    async assertProductDetails(productName: string, expectedPrice: string, expectedQty: string = '1'): Promise<void> {
        await this.assertProductInOrder(productName);
        const actualPrice = await this.getProductPrice(productName);
        const actualQty = await this.getProductQuantity(productName);
        await expect(actualPrice).toBe(expectedPrice);
        await expect(actualQty).toBe(expectedQty);
    }

    /**
     * Assert that payment information is displayed
     */
    async assertPaymentInfoDisplayed(): Promise<void> {
        await expect(this.locPaymentInfoLabel).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locPaymentInfoValue).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that shipping information is displayed
     */
    async assertShippingInfoDisplayed(): Promise<void> {
        await expect(this.locShippingInfoLabel).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locShippingInfoValue).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that price breakdown is displayed
     */
    async assertPriceBreakdownDisplayed(): Promise<void> {
        await expect(this.locItemTotalLabel).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locItemTotalValue).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locTaxLabel).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locTaxValue).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locTotalLabel).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locTotalValue).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Assert that total price is calculated correctly
     * Total should equal item total + tax
     */
    async assertTotalCalculation(): Promise<void> {
        const itemTotal = await this.getItemTotalNumber();
        const tax = await this.getTaxNumber();
        const total = await this.getTotalNumber();
        const expectedTotal = itemTotal + tax;
        
        // Allow for floating point precision issues
        await expect(Math.abs(total - expectedTotal)).toBeLessThan(0.01);
    }

    /**
     * Assert that all order elements are visible
     */
    async assertOrderElementsVisible(): Promise<void> {
        await this.assertPaymentInfoDisplayed();
        await this.assertShippingInfoDisplayed();
        await this.assertPriceBreakdownDisplayed();
        await expect(this.locFinishButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locCancelButton).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Complete checkout and verify navigation to complete page
     */
    async completeCheckout(): Promise<void> {
        await this.clickFinish();
        await expect(this.page).toHaveURL(/.*checkout-complete.html/, { timeout: this.TIMEOUT_NAVIGATION });
    }

    /**
     * Cancel checkout and verify navigation to cart page
     */
    async cancelCheckout(): Promise<void> {
        await this.clickCancel();
        await expect(this.page).toHaveURL(/.*cart.html/, { timeout: this.TIMEOUT_NAVIGATION });
    }
}

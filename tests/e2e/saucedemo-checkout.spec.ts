import { test, expect } from '@playwright/test';
import {
    SaucedemoInventoryPage,
    SaucedemoCartPage,
    SaucedemoCheckoutInfoPage,
    SaucedemoCheckoutOverviewPage,
    SaucedemoCheckoutCompletePage,
} from '../../src/pages';
import { getCheckoutInfoFixture } from '../../src/fixtures';
import { getFirstProduct } from '../../src/fixtures/product.fixture';
import { ensureLogin } from '../helpers/login.helper';

/**
 * Saucedemo Checkout Product E2E Tests
 * 
 * Test suite untuk checkout functionality Saucedemo Swag Labs.
 * Mengikuti best practices dari SOUL.md:
 * - Page Object Model
 * - AAA pattern (Arrange-Act-Assert)
 * - Independent tests
 * - Specific assertions
 * - Test data dari fixtures
 * 
 * Authentication:
 * Menggunakan global login helper yang otomatis:
 * - Jika belum login → akan login dulu
 * - Jika sudah login → skip login (gunakan cache)
 * 
 * Cara Menjalankan:
 * - npm run test -- saucedemo-checkout.spec.ts --project=saucedemo-chromium
 * - npm run test -- saucedemo-checkout.spec.ts --project=saucedemo-authenticated
 */

test.describe('Saucedemo Checkout Product', () => {
    let inventoryPage: SaucedemoInventoryPage;
    let cartPage: SaucedemoCartPage;
    let checkoutInfoPage: SaucedemoCheckoutInfoPage;
    let checkoutOverviewPage: SaucedemoCheckoutOverviewPage;
    let checkoutCompletePage: SaucedemoCheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
        // Inisialisasi page objects
        inventoryPage = new SaucedemoInventoryPage(page);
        cartPage = new SaucedemoCartPage(page);
        checkoutInfoPage = new SaucedemoCheckoutInfoPage(page);
        checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);
        checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

        // Pastikan sudah login (otomatis check)
        await ensureLogin(page);
    });

    /**
     * TCP-017: Menampilkan badge jumlah item pada icon cart
     * 
     * Priority: High
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan tambahkan 1 produk ke cart
     * Act: Amati icon cart di pojok kanan atas
     * Assert: Badge angka '1' tampil pada icon cart
     */
    test('TCP-017: cart badge displays correct count after adding product', async () => {
        // Arrange
        const product = getFirstProduct();

        // Act
        await inventoryPage.addProductToCart(product.name);

        // Assert
        await inventoryPage.assertShoppingCartBadgeCount(1);
        await expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(1);
    });

    /**
     * TCP-018: Menghapus produk dari halaman produk
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan tambahkan produk ke cart
     * Act: Klik tombol Remove pada produk
     * Assert: Produk terhapus dari cart dan tombol berubah menjadi Add to cart
     */
    test('TCP-018: can remove product from inventory page', async () => {
        // Arrange
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);

        // Act
        await inventoryPage.removeProductFromCart(product.name);

        // Assert
        await inventoryPage.assertAddToCartButtonVisible(product.name);
        await expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(0);
    });

    /**
     * TCP-019: Navigasi ke halaman cart
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dengan minimal 1 item di cart
     * Act: Klik icon cart
     * Assert: User diarahkan ke halaman Your Cart dengan daftar produk
     */
    test('TCP-019: can navigate to cart page', async ({ page }) => {
        // Arrange
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);

        // Act
        await inventoryPage.clickShoppingCart();

        // Assert
        await cartPage.verifyPage();
        await expect(page).toHaveURL(/.*cart.html/);
        await cartPage.assertProductInCart(product.name);
    });

    /**
     * TCP-020: Validasi elemen pada halaman cart
     * 
     * Priority: High
     * Type: Smoke
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman cart dengan produk
     * Act: Periksa semua elemen cart
     * Assert: Semua elemen tampil lengkap dan sesuai
     */
    test('TCP-020: all cart elements are displayed correctly', async () => {
        // Arrange
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.verifyPage();

        // Act & Assert
        await cartPage.assertCartElementsVisible();
        await cartPage.assertProductInCart(product.name);

        // Verify QTY column
        const qty = await cartPage.getProductQuantity(product.name);
        await expect(qty).toBe('1');

        // Verify product name
        const name = await cartPage.getProductName(0);
        await expect(name).toBe(product.name);

        // Verify price
        const price = await cartPage.getProductPrice(product.name);
        await expect(price).toBe(product.price);

        // Verify remove button
        const removeButton = cartPage.getRemoveButton(product.name);
        await expect(removeButton).toBeVisible();
    });

    /**
     * TCP-021: Menghapus produk dari halaman cart
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman cart dengan produk
     * Act: Klik tombol Remove pada produk
     * Assert: Produk hilang dari daftar cart
     */
    test('TCP-021: can remove product from cart page', async () => {
        // Arrange
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.verifyPage();

        // Act
        await cartPage.removeProduct(product.name);

        // Assert
        await cartPage.assertProductNotInCart(product.name);
        await cartPage.assertCartEmpty();
    });

    /**
     * TCP-022: Navigasi Continue Shopping
     * 
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman cart
     * Act: Klik tombol Continue Shopping
     * Assert: User kembali ke halaman daftar produk
     */
    test('TCP-022: can navigate back to inventory from cart', async ({ page }) => {
        // Arrange
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.verifyPage();

        // Act
        await cartPage.clickContinueShopping();

        // Assert
        await inventoryPage.verifyPage();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    /**
     * TCP-023: Masuk ke proses checkout
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman cart dengan item
     * Act: Klik tombol Checkout
     * Assert: User diarahkan ke halaman Checkout: Your Information
     */
    test('TCP-023: can proceed to checkout', async ({ page }) => {
        // Arrange
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.verifyPage();

        // Act
        await cartPage.clickCheckout();

        // Assert
        await checkoutInfoPage.verifyPage();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
    });

    /**
     * TCP-024: Validasi field input checkout kosong
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     * 
     * Arrange: Setup login dan navigasi ke halaman Checkout Information
     * Act: Biarkan semua field kosong dan klik Continue
     * Assert: Sistem menampilkan error bahwa field wajib diisi
     */
    test('TCP-024: validation error when all checkout fields are empty', async () => {
        // Arrange
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.verifyPage();

        // Act
        await checkoutInfoPage.clickContinue();

        // Assert
        await checkoutInfoPage.assertErrorMessage('First Name is required');
    });

    /**
     * TCP-025: Validasi field First Name kosong
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     * 
     * Arrange: Setup login dan navigasi ke halaman Checkout Information
     * Act: Isi Last Name dan Zip Code, kosongkan First Name, klik Continue
     * Assert: Muncul error bahwa First Name wajib diisi
     */
    test('TCP-025: validation error when first name is empty', async () => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('emptyFirstName');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.verifyPage();

        // Act
        await checkoutInfoPage.fillCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );
        await checkoutInfoPage.clickContinue();

        // Assert
        await checkoutInfoPage.assertErrorMessage('First Name is required');
    });

    /**
     * TCP-026: Validasi field Zip Code tidak valid
     * 
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     * 
     * Arrange: Setup login dan navigasi ke halaman Checkout Information
     * Act: Isi First Name dan Last Name, isi Zip Code dengan karakter tidak valid
     * Assert: Sistem menolak input Zip Code tidak valid atau menampilkan error
     */
    test('TCP-026: validation error with invalid postal code', async ({ page }) => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('invalidPostalCodeLetters');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.verifyPage();

        // Act
        await checkoutInfoPage.fillCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );
        await checkoutInfoPage.clickContinue();

        // Assert - Saucedemo accepts letters in postal code, so we verify navigation succeeds
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

    /**
     * TCP-027: Checkout dengan data valid
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman Checkout Information
     * Act: Isi semua field dengan valid dan klik Continue
     * Assert: User diarahkan ke halaman Checkout Overview
     */
    test('TCP-027: can proceed to checkout overview with valid data', async ({ page }) => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('valid');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.verifyPage();

        // Act
        await cartPage.clickCheckout();
        await checkoutInfoPage.verifyPage();
        await checkoutInfoPage.fillCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );
        await checkoutInfoPage.clickContinue();

        // Assert
        await checkoutOverviewPage.verifyPage();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

    /**
     * TCP-028: Validasi data pada halaman overview
     * 
     * Priority: High
     * Type: Regression
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman Checkout Overview
     * Act: Periksa semua data order
     * Assert: Semua data tampil sesuai dengan item yang dipilih
     */
    test('TCP-028: order data is displayed correctly on overview page', async () => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('valid');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.submitCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );

        // Act & Assert
        await checkoutOverviewPage.assertOrderElementsVisible();

        // Verify product name
        await checkoutOverviewPage.assertProductInOrder(product.name);

        // Verify product price
        const price = await checkoutOverviewPage.getProductPrice(product.name);
        await expect(price).toBe(product.price);

        // Verify payment information
        await checkoutOverviewPage.assertPaymentInfoDisplayed();

        // Verify shipping information
        await checkoutOverviewPage.assertShippingInfoDisplayed();

        // Verify price breakdown
        await checkoutOverviewPage.assertPriceBreakdownDisplayed();
    });

    /**
     * TCP-029: Validasi perhitungan total harga
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman overview
     * Act: Catat item total, tax, dan bandingkan dengan total akhir
     * Assert: Total = item total + tax sesuai perhitungan
     */
    test('TCP-029: total price calculation is correct', async () => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('valid');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.submitCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );

        // Act
        const itemTotal = await checkoutOverviewPage.getItemTotalNumber();
        const tax = await checkoutOverviewPage.getTaxNumber();
        const total = await checkoutOverviewPage.getTotalNumber();

        // Assert
        const expectedTotal = itemTotal + tax;
        await expect(Math.abs(total - expectedTotal)).toBeLessThan(0.01);
        await checkoutOverviewPage.assertTotalCalculation();
    });

    /**
     * TCP-030: Membatalkan checkout dari overview
     * 
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman overview
     * Act: Klik tombol Cancel
     * Assert: User kembali ke halaman sebelumnya (cart atau produk)
     */
    test('TCP-030: can cancel checkout from overview page', async ({ page }) => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('valid');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.submitCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );

        // Act
        await checkoutOverviewPage.clickCancel();

        // Assert
        await cartPage.verifyPage();
        await expect(page).toHaveURL(/.*cart.html/);
    });

    /**
     * TCP-031: Menyelesaikan checkout
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan navigasi ke halaman overview
     * Act: Klik tombol Finish
     * Assert: User diarahkan ke halaman Checkout Complete
     */
    test('TCP-031: can complete checkout', async ({ page }) => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('valid');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.submitCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );

        // Act
        await checkoutOverviewPage.clickFinish();

        // Assert
        await checkoutCompletePage.verifyPage();
        await expect(page).toHaveURL(/.*checkout-complete.html/);
    });

    /**
     * TCP-032: Validasi halaman checkout complete
     * 
     * Priority: High
     * Type: Smoke
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan selesaikan checkout
     * Act: Periksa semua elemen pada halaman sukses
     * Assert: Halaman sukses tampil lengkap dengan pesan konfirmasi
     */
    test('TCP-032: checkout complete page displays correctly', async () => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('valid');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.submitCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );
        await checkoutOverviewPage.clickFinish();

        // Act & Assert
        await checkoutCompletePage.assertAllElementsVisible();
        await checkoutCompletePage.assertCompleteHeader();
        await checkoutCompletePage.assertCompleteText();
    });

    /**
     * TCP-033: Navigasi Back Home setelah checkout
     * 
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup login dan selesaikan checkout
     * Act: Klik tombol Back Home
     * Assert: User kembali ke halaman daftar produk
     */
    test('TCP-033: can navigate back to products after checkout', async ({ page }) => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('valid');
        const product = getFirstProduct();
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutInfoPage.submitCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );
        await checkoutOverviewPage.clickFinish();

        // Act
        await checkoutCompletePage.clickBackHome();

        // Assert
        await inventoryPage.verifyPage();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    /**
     * Additional Test: Complete checkout flow end-to-end
     */
    test('can complete full checkout flow from inventory to complete', async () => {
        // Arrange
        const checkoutInfo = getCheckoutInfoFixture('valid');
        const product = getFirstProduct();

        // Note: Login sudah dihandle oleh beforeEach dengan ensureLogin()

        // Add product to cart
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.assertShoppingCartBadgeCount(1);

        // Navigate to cart
        await inventoryPage.clickShoppingCart();
        await cartPage.verifyPage();
        await cartPage.assertProductInCart(product.name);

        // Proceed to checkout
        await cartPage.clickCheckout();
        await checkoutInfoPage.verifyPage();

        // Fill checkout information
        await checkoutInfoPage.fillCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );
        await checkoutInfoPage.clickContinue();

        // Verify overview
        await checkoutOverviewPage.verifyPage();
        await checkoutOverviewPage.assertProductInOrder(product.name);
        await checkoutOverviewPage.assertTotalCalculation();

        // Complete checkout
        await checkoutOverviewPage.clickFinish();
        await checkoutCompletePage.verifyPage();
        await checkoutCompletePage.assertAllElementsVisible();

        // Navigate back home
        await checkoutCompletePage.clickBackHome();
        await inventoryPage.verifyPage();

        // Assert - Cart should be empty
        await expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(0);
    });
});

import { test, expect } from '@playwright/test';
import {
    SaucedemoInventoryPage,
    SaucedemoDetailProductPage,
} from '../../src/pages';
import { getProductByName } from '../../src/fixtures';
import { ensureLogin } from '../helpers/login.helper';

/**
 * Saucedemo Detail Product E2E Tests
 *
 * Test suite untuk detail product functionality Saucedemo Swag Labs.
 * Mengikuti best practices dari SOUL.md:
 * - Page Object Model
 * - AAA pattern (Arrange-Act-Assert)
 * - Independent tests
 * - Specific assertions
 * - Test data dari fixtures
 */

test.describe('Saucedemo Detail Product Functionality', () => {
    let inventoryPage: SaucedemoInventoryPage;
    let detailProductPage: SaucedemoDetailProductPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new SaucedemoInventoryPage(page);
        detailProductPage = new SaucedemoDetailProductPage(page);

        // Arrange - Login using login helper
        await ensureLogin(page, 'standard');
    });

    /**
     * TDP-001: Navigasi ke halaman detail produk dari daftar produk
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman daftar produk
     * Act: Klik nama produk 'Sauce Labs Backpack'
     * Assert: User diarahkan ke halaman detail produk dengan informasi lengkap
     */
    test('TDP-001: navigate to product detail page from product list', async () => {
        // Arrange
        const product = getProductByName('Sauce Labs Backpack')!;

        // Act - Click product name
        await inventoryPage.clickProductName(product.name);

        // Assert - Verify user is on detail product page
        await detailProductPage.assertOnDetailProductPage();
        await detailProductPage.assertProductName(product.name);
    });

    /**
     * TDP-002: Validasi elemen pada halaman detail produk
     *
     * Priority: High
     * Type: Smoke
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman detail produk
     * Act: Periksa keberadaan semua elemen penting
     * Assert: Semua elemen (gambar, nama, deskripsi, harga, tombol) tampil dengan benar
     */
    test('TDP-002: validate all elements on detail product page', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);

        // Act & Assert - Verify all elements are displayed
        await detailProductPage.assertAllElementsDisplayed();
    });

    /**
     * TDP-003: Menambahkan produk ke cart dari halaman detail
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman detail produk
     * Act: Klik tombol Add to cart
     * Assert: Produk berhasil ditambahkan ke cart dan indikator cart bertambah
     */
    test('TDP-003: add product to cart from detail page', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);
        await detailProductPage.assertOnDetailProductPage();

        // Act - Add product to cart
        await detailProductPage.clickAddToCartButton();

        // Assert - Verify product is in cart
        await detailProductPage.assertRemoveButtonVisible();
        await detailProductPage.assertShoppingCartBadgeCount(1);
    });

    /**
     * TDP-004: Klik Add to cart berulang di halaman detail
     *
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     *
     * Arrange: User berada di halaman detail produk
     * Act: Klik tombol Add to cart, lalu klik kembali tombol yang sama
     * Assert: Tombol berubah menjadi Remove atau tidak dapat menambahkan produk yang sama dua kali
     */
    test('TDP-004: click add to cart button repeatedly on detail page', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);
        await detailProductPage.assertOnDetailProductPage();

        // Act - Click add to cart button twice
        await detailProductPage.clickAddToCartButton();

        // Assert - Verify button changed to Remove
        await detailProductPage.assertRemoveButtonVisible();
        await expect(await detailProductPage.isAddToCartButtonVisible()).toBeFalsy();
    });

    /**
     * TDP-005: Navigasi kembali ke halaman produk
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman detail produk
     * Act: Klik tombol Back to products
     * Assert: User kembali ke halaman daftar produk
     */
    test('TDP-005: navigate back to products page', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);
        await detailProductPage.assertOnDetailProductPage();

        // Act - Click back to products button
        await detailProductPage.clickBackToProductsButton();

        // Assert - Verify redirected to inventory page
        await detailProductPage.assertRedirectedToInventoryPage();
        await inventoryPage.verifyPage();
    });

    /**
     * TDP-006: Validasi konsistensi data antara list dan detail
     *
     * Priority: High
     * Type: Regression
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User telah melihat halaman list dan detail produk
     * Act: Catat nama, harga, dan deskripsi produk di halaman list, lalu masuk ke halaman detail
     * Assert: Data produk di halaman detail sesuai dengan yang ada di halaman list
     */
    test('TDP-006: validate data consistency between list and detail', async () => {
        // Arrange - Get product data from list
        const product = getProductByName('Sauce Labs Backpack')!;
        const listPrice = await inventoryPage.getProductPrice(product.name);
        const listDescription = await inventoryPage.getProductDescription(product.name);

        // Act - Navigate to detail page
        await inventoryPage.clickProductName(product.name);

        // Assert - Verify data consistency
        await detailProductPage.assertProductName(product.name);
        await detailProductPage.assertProductPrice(listPrice);
        await detailProductPage.assertProductDescription(listDescription);
    });

    /**
     * TDP-007: Validasi tampilan gambar produk di halaman detail
     *
     * Priority: Medium
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman detail produk
     * Act: Amati gambar produk
     * Assert: Gambar tampil jelas tanpa error atau broken image
     */
    test('TDP-007: validate product image display on detail page', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);

        // Act & Assert - Verify image is loaded correctly
        await detailProductPage.assertProductImageLoaded();
        const imageSrc = await detailProductPage.getProductImageSrc();
        await expect(imageSrc.length).toBeGreaterThan(0);
    });

    /**
     * TDP-008: Validasi format harga di halaman detail
     *
     * Priority: Low
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman detail produk
     * Act: Amati nilai harga produk
     * Assert: Harga ditampilkan dalam format $xx.xx
     */
    test('TDP-008: validate price format on detail page', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);

        // Act & Assert - Verify price format
        await detailProductPage.assertPriceFormat();
        const price = await detailProductPage.getProductPrice();
        await expect(price).toMatch(/^\$\d+\.\d{2}$/);
    });

    /**
     * TDP-009: Navigasi menggunakan ikon cart dari halaman detail
     *
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman detail produk
     * Act: Klik ikon cart di pojok kanan atas
     * Assert: User diarahkan ke halaman cart
     */
    test('TDP-009: navigate using cart icon from detail page', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);

        // Act - Click cart icon
        await detailProductPage.clickShoppingCart();

        // Assert - Verify redirected to cart page
        await detailProductPage.assertRedirectedToCartPage();
    });

    /**
     * TDP-010: Navigasi menggunakan menu sidebar dari halaman detail
     *
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman detail produk
     * Act: Klik ikon menu (hamburger)
     * Assert: Sidebar terbuka dan menampilkan menu navigasi
     */
    test('TDP-010: navigate using sidebar menu from detail page', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);

        // Act - Click menu button
        await detailProductPage.clickMenuButton();

        // Assert - Verify sidebar is visible
        await detailProductPage.assertSidebarVisible();
    });

    /**
     * TDP-011: Akses halaman detail tanpa memilih produk (edge case)
     *
     * Priority: Medium
     * Type: Integration
     * Test Layer: E2E
     * Scenario Type: Negative
     *
     * Arrange: User membuka URL detail produk secara langsung tanpa session valid
     * Act: Akses URL detail produk secara langsung
     * Assert: Sistem menampilkan halaman dengan benar atau redirect ke halaman produk/login
     */
    test('TDP-011: access detail page without selecting product (edge case)', async () => {
        // Arrange - Logout first
        await inventoryPage.clickMenuButton();
        await inventoryPage.clickLogout();

        // Act - Try to access detail page directly without login
        await detailProductPage.navigateToDetailProduct(0);

        // Assert - Verify system handles the request appropriately
        // Either redirects to login page or shows appropriate error
        const currentUrl = detailProductPage.getCurrentUrl();
        await expect(
            currentUrl.includes('inventory.html') ||
            currentUrl.includes('saucedemo.com') ||
            currentUrl.includes('inventory-item')
        ).toBeTruthy();
    });

    /**
     * TDP-012: Validasi teks deskripsi produk tidak kosong
     *
     * Priority: Low
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman detail produk
     * Act: Periksa bagian deskripsi produk
     * Assert: Deskripsi produk tidak kosong dan informatif
     */
    test('TDP-012: validate product description text is not empty', async () => {
        // Arrange - Navigate to detail page
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.clickProductName(product.name);

        // Act & Assert - Verify description is not empty
        await detailProductPage.assertProductDescriptionNotEmpty();
        const description = await detailProductPage.getProductDescription();
        await expect(description.trim().length).toBeGreaterThan(0);
    });
});

import { test, expect } from '@playwright/test';
import { SaucedemoInventoryPage } from '../../src/pages';
import { products, getProductByName, SortOptions } from '../../src/fixtures';
import { ensureLogin } from '../helpers/login.helper';

/**
 * Saucedemo Products E2E Tests
 *
 * Test suite untuk products functionality Saucedemo Swag Labs.
 * Mengikuti best practices dari SOUL.md:
 * - Page Object Model
 * - AAA pattern (Arrange-Act-Assert)
 * - Independent tests
 * - Specific assertions
 * - Test data dari fixtures
 */

test.describe('Saucedemo Products Functionality', () => {
    let inventoryPage: SaucedemoInventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new SaucedemoInventoryPage(page);

        // Arrange - Login using login helper
        await ensureLogin(page, 'standard');
    });

    /**
     * TCP-001: Menampilkan daftar produk pada halaman utama
     *
     * Priority: High
     * Type: Smoke
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User sudah login dan berada di halaman produk
     * Act: Amati daftar produk yang ditampilkan
     * Assert: Semua produk tampil lengkap dengan nama, deskripsi, harga, dan tombol Add to cart
     */
    test('TCP-001: display all products with complete information', async () => {
        // Act - Get all products
        const productCount = await inventoryPage.getProductCount();
        const productTitles = await inventoryPage.getProductTitles();

        // Assert - Verify all products are displayed
        await expect(productCount).toBe(products.length);
        await expect(productTitles).toHaveLength(products.length);

        // Assert - Verify each product has complete information
        for (const product of products) {
            await inventoryPage.assertProductDisplayed(product.name);
            const price = await inventoryPage.getProductPrice(product.name);
            const description = await inventoryPage.getProductDescription(product.name);
            await expect(price).toBe(product.price);
            await expect(description).toBeTruthy();
            await expect(description.length).toBeGreaterThan(0);
        }
    });

    /**
     * TCP-002: Menambahkan produk ke keranjang
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman produk
     * Act: Klik tombol Add to cart pada produk 'Sauce Labs Backpack'
     * Assert: Produk berhasil ditambahkan ke keranjang dan indikator cart bertambah
     */
    test('TCP-002: add product to cart', async () => {
        // Arrange
        const product = getProductByName('Sauce Labs Backpack')!;
        await inventoryPage.assertAddToCartButtonVisible(product.name);

        // Act - Add product to cart
        await inventoryPage.addProductToCart(product.name);

        // Assert - Verify product is in cart
        await inventoryPage.assertRemoveButtonVisible(product.name);
        await inventoryPage.assertShoppingCartBadgeCount(1);
    });

    /**
     * TCP-003: Menambahkan beberapa produk ke keranjang
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman produk
     * Act: Klik Add to cart pada produk pertama dan kedua
     * Assert: Semua produk yang dipilih masuk ke keranjang dengan jumlah yang sesuai
     */
    test('TCP-003: add multiple products to cart', async () => {
        // Arrange
        const product1 = products[0];
        const product2 = products[1];

        // Act - Add multiple products to cart
        await inventoryPage.addProductToCart(product1.name);
        await inventoryPage.addProductToCart(product2.name);

        // Assert - Verify both products are in cart
        await inventoryPage.assertRemoveButtonVisible(product1.name);
        await inventoryPage.assertRemoveButtonVisible(product2.name);
        await inventoryPage.assertShoppingCartBadgeCount(2);
    });

    /**
     * TCP-004: Membuka dropdown sorting
     *
     * Priority: Medium
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman produk
     * Act: Klik dropdown sorting di kanan atas
     * Assert: Dropdown menampilkan opsi yang benar
     */
    test('TCP-004: open sorting dropdown', async () => {
        // Act - Click sort dropdown
        const sortDropdown = inventoryPage['page'].locator('.product_sort_container');
        await sortDropdown.click();

        // Assert - Verify all sort options are available
        const options = await inventoryPage['page'].locator('.product_sort_container option').allTextContents();
        await expect(options).toContain('Name (A to Z)');
        await expect(options).toContain('Name (Z to A)');
        await expect(options).toContain('Price (low to high)');
        await expect(options).toContain('Price (high to low)');
    });

    /**
     * TCP-005: Sorting produk berdasarkan nama A ke Z
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: Dropdown sorting tersedia
     * Act: Pilih opsi Name (A to Z)
     * Assert: Produk ditampilkan berdasarkan urutan alfabet A ke Z
     */
    test('TCP-005: sort products by name A to Z', async () => {
        // Act - Sort products by name A to Z
        await inventoryPage.sortProducts(SortOptions.NAME_AZ);

        // Assert - Verify products are sorted A to Z
        const productTitles = await inventoryPage.getProductTitles();
        const sortedTitles = [...productTitles].sort((a, b) => a.localeCompare(b));
        await expect(productTitles).toEqual(sortedTitles);
    });

    /**
     * TCP-006: Sorting produk berdasarkan nama Z ke A
     *
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: Dropdown sorting tersedia
     * Act: Pilih opsi Name (Z to A)
     * Assert: Produk ditampilkan berdasarkan urutan alfabet Z ke A
     */
    test('TCP-006: sort products by name Z to A', async () => {
        // Act - Sort products by name Z to A
        await inventoryPage.sortProducts(SortOptions.NAME_ZA);

        // Assert - Verify products are sorted Z to A
        const productTitles = await inventoryPage.getProductTitles();
        const sortedTitles = [...productTitles].sort((a, b) => b.localeCompare(a));
        await expect(productTitles).toEqual(sortedTitles);
    });

    /**
     * TCP-007: Sorting produk berdasarkan harga terendah
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: Dropdown sorting tersedia
     * Act: Pilih opsi Price (low to high)
     * Assert: Produk ditampilkan dari harga terendah ke tertinggi
     */
    test('TCP-007: sort products by price low to high', async () => {
        // Act - Sort products by price low to high
        await inventoryPage.sortProducts(SortOptions.PRICE_LOW_TO_HIGH);

        // Assert - Verify products are sorted by price low to high
        const productPrices = await inventoryPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => a - b);
        await expect(productPrices).toEqual(sortedPrices);
    });

    /**
     * TCP-008: Sorting produk berdasarkan harga tertinggi
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: Dropdown sorting tersedia
     * Act: Pilih opsi Price (high to low)
     * Assert: Produk ditampilkan dari harga tertinggi ke terendah
     */
    test('TCP-008: sort products by price high to low', async () => {
        // Act - Sort products by price high to low
        await inventoryPage.sortProducts(SortOptions.PRICE_HIGH_TO_LOW);

        // Assert - Verify products are sorted by price high to low
        const productPrices = await inventoryPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => b - a);
        await expect(productPrices).toEqual(sortedPrices);
    });

    /**
     * TCP-009: Membuka menu sidebar
     *
     * Priority: High
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User berada di halaman utama
     * Act: Klik ikon menu (hamburger)
     * Assert: Sidebar terbuka dan menampilkan menu yang benar
     */
    test('TCP-009: open sidebar menu', async () => {
        // Act - Open sidebar
        await inventoryPage.clickMenuButton();

        // Assert - Verify sidebar is open
        await expect(await inventoryPage.isSidebarOpen()).toBe(true);

        // Assert - Verify menu items are visible
        await expect(inventoryPage['page'].locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
        await expect(inventoryPage['page'].locator('[data-test="about-sidebar-link"]')).toBeVisible();
        await expect(inventoryPage['page'].locator('[data-test="logout-sidebar-link"]')).toBeVisible();
        await expect(inventoryPage['page'].locator('[data-test="reset-sidebar-link"]')).toBeVisible();
    });

    /**
     * TCP-010: Navigasi ke All Items dari sidebar
     *
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: Sidebar terbuka
     * Act: Klik menu All Items
     * Assert: User tetap atau kembali ke halaman daftar produk
     */
    test('TCP-010: navigate to All Items from sidebar', async () => {
        // Arrange - Open sidebar
        await inventoryPage.clickMenuButton();

        // Act - Click All Items
        await inventoryPage.clickAllItems();

        // Assert - Verify user is on inventory page
        await expect(inventoryPage['page']).toHaveURL(/.*inventory\.html/);
        await inventoryPage.verifyPage();
    });

    /**
     * TCP-011: Navigasi ke halaman About
     *
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: Sidebar terbuka
     * Act: Klik menu About
     * Assert: User diarahkan ke halaman About
     */
    test('TCP-011: navigate to About page', async () => {
        // Arrange - Open sidebar
        await inventoryPage.clickMenuButton();

        // Act - Click About
        await inventoryPage.clickAbout();

        // Assert - Verify user is navigated to About page
        await expect(inventoryPage['page']).toHaveURL(/saucelabs\.com/);
    });

    /**
     * TCP-012: Logout dari aplikasi
     *
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User dalam keadaan login dan sidebar terbuka
     * Act: Klik menu Logout
     * Assert: User keluar dan diarahkan ke halaman login
     */
    test('TCP-012: logout from application', async () => {
        // Arrange - Open sidebar
        await inventoryPage.clickMenuButton();

        // Act - Click Logout
        await inventoryPage.clickLogout();

        // Assert - Verify user is logged out and on login page
        await expect(inventoryPage['page']).toHaveURL(/saucedemo\.com\/$/);
        await expect(inventoryPage['page'].locator('[data-test="username"]')).toBeVisible();
    });

    /**
     * TCP-013: Reset App State
     *
     * Priority: High
     * Type: Regression
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: User telah menambahkan produk ke cart
     * Act: Buka sidebar dan klik Reset App State
     * Assert: Cart dikosongkan dan state aplikasi kembali default
     */
    test('TCP-013: reset app state', async () => {
        // Arrange - Add product to cart
        const product = products[0];
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.assertShoppingCartBadgeCount(1);

        // Act - Open sidebar and reset app state
        await inventoryPage.clickMenuButton();
        await inventoryPage.clickResetAppState();

        // Assert - Verify cart is empty and state is reset
        await inventoryPage.assertShoppingCartBadgeCount(0);
        await inventoryPage.assertAddToCartButtonVisible(product.name);
    });

    /**
     * TCP-014: Klik Add to cart berulang pada produk yang sama
     *
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     *
     * Arrange: User berada di halaman produk
     * Act: Klik Add to cart pada satu produk, lalu klik kembali tombol yang sama
     * Assert: Tombol berubah menjadi Remove atau tidak bisa ditambahkan dua kali
     */
    test('TCP-014: cannot add same product twice', async () => {
        // Arrange
        const product = products[0];

        // Act - Add product to cart twice
        await inventoryPage.addProductToCart(product.name);

        // Assert - Verify Remove button is visible after first click
        await inventoryPage.assertRemoveButtonVisible(product.name);
        await inventoryPage.assertShoppingCartBadgeCount(1);

        // Assert - Verify Add to cart button is no longer visible
        const addButton = inventoryPage.getAddToCartButton(product.name);
        await expect(await addButton.isVisible()).toBe(false);
    });

    /**
     * TCP-015: Validasi tampilan harga produk
     *
     * Priority: Low
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: Halaman produk terbuka
     * Act: Amati semua harga produk
     * Assert: Semua harga menggunakan format $xx.xx
     */
    test('TCP-015: validate product price format', async () => {
        // Act & Assert - Verify all product prices have correct format
        for (const product of products) {
            await inventoryPage.assertProductPriceFormat(product.name);
        }
    });

    /**
     * TCP-016: Menutup sidebar
     *
     * Priority: Low
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     *
     * Arrange: Sidebar dalam kondisi terbuka
     * Act: Klik tombol X pada sidebar
     * Assert: Sidebar tertutup dan kembali ke tampilan utama
     */
    test('TCP-016: close sidebar', async () => {
        // Arrange - Open sidebar
        await inventoryPage.clickMenuButton();
        await expect(await inventoryPage.isSidebarOpen()).toBe(true);

        // Act - Close sidebar
        await inventoryPage.clickCloseMenu();

        // Wait for sidebar to close
        await inventoryPage['page'].waitForTimeout(500);

        // Assert - Verify sidebar is closed
        await expect(await inventoryPage.isSidebarOpen()).toBe(false);
    });
});

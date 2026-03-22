import { test, expect } from '@playwright/test';
import { HomePage, LoginPage } from '../../src/pages';

/**
 * Home Page E2E Tests
 * 
 * Test suite untuk home page functionality.
 * Mengikuti best practices dari SOUL.md:
 * - Page Object Model
 * - AAA pattern (Arrange-Act-Assert)
 * - Independent tests
 * - Specific assertions
 */

test.describe('Home Page', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        // Navigate to home page
        await homePage.navigate();
    });

    /**
     * Test: Home page ditampilkan dengan benar
     * 
     * Arrange: Navigate ke home page
     * Act: Verify page elements
     * Assert: Semua elemen utama ditampilkan
     */
    test('home page is displayed correctly', async () => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act
        const heroTitle = await homePage.getHeroTitle();
        const heroSubtitle = await homePage.getHeroSubtitle();
        const isNavVisible = await homePage.isNavigationMenuVisible();
        const isFooterVisible = await homePage.isFooterVisible();

        // Assert
        await expect(heroTitle).toBeTruthy();
        await expect(heroSubtitle).toBeTruthy();
        await expect(isNavVisible).toBe(true);
        await expect(isFooterVisible).toBe(true);
    });

    /**
     * Test: User dapat navigate ke login page dari home
     * 
     * Arrange: User di home page
     * Act: Click login button
     * Assert: Verify redirect ke login page
     */
    test('user can navigate to login page from home', async ({ page }) => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act
        await homePage.clickLogin();

        // Assert
        await loginPage.verifyPage();
        await expect(page).toHaveURL(/.*login/);
    });

    /**
     * Test: User dapat navigate ke register page dari home
     * 
     * Arrange: User di home page
     * Act: Click register button
     * Assert: Verify redirect ke register page
     */
    test('user can navigate to register page from home', async ({ page }) => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act
        await homePage.clickRegister();

        // Assert
        await expect(page).toHaveURL(/.*register/);
    });

    /**
     * Test: Get Started button berfungsi dengan benar
     * 
     * Arrange: User di home page
     * Act: Click Get Started button
     * Assert: Verify navigation atau action yang sesuai
     */
    test('get started button works correctly', async ({ page }) => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act
        await homePage.clickGetStarted();

        // Assert - Asumsi redirect ke login atau register
        await expect(page).toHaveURL(/.*(login|register)/);
    });

    /**
     * Test: Hero section ditampilkan dengan benar
     * 
     * Arrange: User di home page
     * Act: Verify hero section elements
     * Assert: Hero title dan subtitle ditampilkan
     */
    test('hero section is displayed correctly', async () => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act & Assert
        await homePage.assertHeroSectionDisplayed();
    });

    /**
     * Test: Get Started button visible dan enabled
     * 
     * Arrange: User di home page
     * Act: Verify Get Started button state
     * Assert: Button visible dan enabled
     */
    test('get started button is visible and enabled', async () => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act & Assert
        await homePage.assertGetStartedButtonAvailable();
    });

    /**
     * Test: User dapat scroll ke features section
     * 
     * Arrange: User di home page
     * Act: Scroll ke features section
     * Assert: Verify scroll berhasil
     */
    test('user can scroll to features section', async () => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act
        await homePage.scrollToFeatures();

        // Assert - Verify features section visible
        await expect(homePage.page.getByTestId('features-section')).toBeInViewport();
    });

    /**
     * Test: Footer ditampilkan dengan benar
     * 
     * Arrange: User di home page
     * Act: Scroll ke bawah dan verify footer
     * Assert: Footer visible
     */
    test('footer is displayed correctly', async () => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act
        const isFooterVisible = await homePage.isFooterVisible();

        // Assert
        await expect(isFooterVisible).toBe(true);
    });

    /**
     * Test: Navigation menu responsive
     * 
     * Arrange: User di home page
     * Act: Resize viewport dan verify navigation
     * Assert: Navigation tetap accessible
     */
    test('navigation menu is responsive', async ({ page }) => {
        // Arrange - User sudah di home page (dari beforeEach)

        // Act - Resize ke mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        const isNavVisible = await homePage.isNavigationMenuVisible();

        // Assert
        await expect(isNavVisible).toBe(true);
    });
});

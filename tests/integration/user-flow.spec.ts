import { test, expect } from '@playwright/test';
import { HomePage, LoginPage, DashboardPage } from '../../src/pages';
import { getUserFixture, generateRandomUser } from '../../src/fixtures';

/**
 * User Flow Integration Tests
 * 
 * Test suite untuk user flow yang melibatkan multiple pages.
 * Mengikuti best practices dari SOUL.md:
 * - Page Object Model
 * - AAA pattern (Arrange-Act-Assert)
 * - Independent tests
 * - Specific assertions
 */

test.describe('User Flow Integration', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
    });

    /**
     * Test: Complete user journey dari home ke dashboard
     * 
     * Arrange: User di home page
     * Act: Navigate ke login, login, dan verify dashboard
     * Assert: User berhasil sampai ke dashboard
     */
    test('complete user journey from home to dashboard', async ({ page }) => {
        // Arrange
        await homePage.navigate();
        const user = getUserFixture('valid');

        // Act - Navigate ke login
        await homePage.clickLogin();
        await loginPage.verifyPage();

        // Act - Login
        await loginPage.performLogin(user.email, user.password);

        // Assert - Verify dashboard
        await dashboardPage.verifyPage();
        await dashboardPage.assertUserLoggedIn();
    });

    /**
     * Test: User dapat login dan logout
     * 
     * Arrange: User di home page
     * Act: Login dan logout
     * Assert: User kembali ke home page
     */
    test('user can login and logout', async ({ page }) => {
        // Arrange
        await homePage.navigate();
        const user = getUserFixture('valid');

        // Act - Login
        await homePage.clickLogin();
        await loginPage.performLogin(user.email, user.password);
        await dashboardPage.verifyPage();

        // Act - Logout
        await dashboardPage.clickLogout();

        // Assert - Kembali ke home
        await homePage.verifyPage();
        await expect(page).toHaveURL(/.*\/$/);
    });

    /**
     * Test: User dapat navigate ke multiple sections
     * 
     * Arrange: User di dashboard
     * Act: Navigate ke beberapa section
     * Assert: Semua navigation berhasil
     */
    test('user can navigate to multiple sections', async ({ page }) => {
        // Arrange
        await homePage.navigate();
        const user = getUserFixture('valid');
        await homePage.clickLogin();
        await loginPage.performLogin(user.email, user.password);
        await dashboardPage.verifyPage();

        // Act - Navigate ke beberapa section
        await dashboardPage.navigateToSection('analytics');
        await expect(page).toHaveURL(/.*analytics/);

        await dashboardPage.navigateToSection('reports');
        await expect(page).toHaveURL(/.*reports/);

        // Assert - Semua navigation berhasil
        await expect(page).toHaveURL(/.*reports/);
    });

    /**
     * Test: User dapat access profile dari dashboard
     * 
     * Arrange: User di dashboard
     * Act: Navigate ke profile
     * Assert: Profile page ditampilkan
     */
    test('user can access profile from dashboard', async ({ page }) => {
        // Arrange
        await homePage.navigate();
        const user = getUserFixture('valid');
        await homePage.clickLogin();
        await loginPage.performLogin(user.email, user.password);
        await dashboardPage.verifyPage();

        // Act
        await dashboardPage.clickProfile();

        // Assert
        await expect(page).toHaveURL(/.*profile/);
    });

    /**
     * Test: User dapat access settings dari dashboard
     * 
     * Arrange: User di dashboard
     * Act: Navigate ke settings
     * Assert: Settings page ditampilkan
     */
    test('user can access settings from dashboard', async ({ page }) => {
        // Arrange
        await homePage.navigate();
        const user = getUserFixture('valid');
        await homePage.clickLogin();
        await loginPage.performLogin(user.email, user.password);
        await dashboardPage.verifyPage();

        // Act
        await dashboardPage.clickSettings();

        // Assert
        await expect(page).toHaveURL(/.*settings/);
    });

    /**
     * Test: User session persist dengan remember me
     * 
     * Arrange: User login dengan remember me
     * Act: Refresh page
     * Assert: User tetap logged in
     */
    test('user session persists with remember me', async ({ page }) => {
        // Arrange
        await homePage.navigate();
        const user = getUserFixture('valid');
        await homePage.clickLogin();
        await loginPage.fillLoginForm(user.email, user.password);
        await loginPage.setRememberMe(true);
        await loginPage.clickLoginButton();
        await dashboardPage.verifyPage();

        // Act - Refresh page
        await page.reload();

        // Assert - User tetap logged in
        await dashboardPage.verifyPage();
        await dashboardPage.assertUserLoggedIn();
    });

    /**
     * Test: User dapat navigate back dari dashboard
     * 
     * Arrange: User di dashboard
     * Act: Click browser back button
     * Assert: Navigate ke previous page
     */
    test('user can navigate back from dashboard', async ({ page }) => {
        // Arrange
        await homePage.navigate();
        const user = getUserFixture('valid');
        await homePage.clickLogin();
        await loginPage.performLogin(user.email, user.password);
        await dashboardPage.verifyPage();

        // Act
        await page.goBack();

        // Assert - Kembali ke login page
        await loginPage.verifyPage();
    });

    /**
     * Test: User dapat navigate forward setelah back
     * 
     * Arrange: User navigate back dari dashboard
     * Act: Click browser forward button
     * Assert: Navigate ke dashboard
     */
    test('user can navigate forward after going back', async ({ page }) => {
        // Arrange
        await homePage.navigate();
        const user = getUserFixture('valid');
        await homePage.clickLogin();
        await loginPage.performLogin(user.email, user.password);
        await dashboardPage.verifyPage();
        await page.goBack();
        await loginPage.verifyPage();

        // Act
        await page.goForward();

        // Assert - Kembali ke dashboard
        await dashboardPage.verifyPage();
    });
});

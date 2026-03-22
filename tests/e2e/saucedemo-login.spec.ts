import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage, SaucedemoInventoryPage } from '../../src/pages';
import { getSaucedemoUserFixture, SaucedemoErrorMessages } from '../../src/fixtures';

/**
 * Saucedemo Login E2E Tests
 * 
 * Test suite untuk login functionality Saucedemo Swag Labs.
 * Mengikuti best practices dari SOUL.md:
 * - Page Object Model
 * - AAA pattern (Arrange-Act-Assert)
 * - Independent tests
 * - Specific assertions
 * - Test data dari fixtures
 */

test.describe('Saucedemo Login Functionality', () => {
    let loginPage: SaucedemoLoginPage;
    let inventoryPage: SaucedemoInventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new SaucedemoLoginPage(page);
        inventoryPage = new SaucedemoInventoryPage(page);

        // Navigate to login page
        await loginPage.navigate();
    });

    /**
     * TCL-001: Login Berhasil dengan Standard User
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup standard user credentials
     * Act: Fill login form dan submit
     * Assert: Verify login success dan redirect ke inventory page
     */
    test('TCL-001: user can login with standard user credentials', async ({ page }) => {
        // Arrange
        const user = getSaucedemoUserFixture('standard');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await inventoryPage.verifyPage();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    /**
     * TCL-002: Login Gagal dengan Locked Out User
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     * 
     * Arrange: Setup locked out user credentials
     * Act: Fill login form dengan locked out user dan submit
     * Assert: Verify error message ditampilkan
     */
    test('TCL-002: user cannot login with locked out user', async () => {
        // Arrange
        const user = getSaucedemoUserFixture('locked');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await loginPage.assertErrorMessage(SaucedemoErrorMessages.LOCKED_OUT);
    });

    /**
     * TCL-003: Login dengan Problem User
     * 
     * Priority: Medium
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup problem user credentials
     * Act: Fill login form dengan problem user dan submit
     * Assert: Verify login success namun mungkin ada visual/product issues
     */
    test('TCL-003: user can login with problem user', async ({ page }) => {
        // Arrange
        const user = getSaucedemoUserFixture('problem');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await inventoryPage.verifyPage();
        await expect(page).toHaveURL(/.*inventory.html/);
        // Note: Visual/product issues need to be verified manually or with visual testing
    });

    /**
     * TCL-004: Login dengan Performance Glitch User
     * 
     * Priority: Medium
     * Type: Performance
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup performance glitch user credentials
     * Act: Fill login form dengan performance glitch user dan submit
     * Assert: Verify login success setelah delay
     */
    test('TCL-004: user can login with performance glitch user', async ({ page }) => {
        // Arrange
        const user = getSaucedemoUserFixture('performance');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await inventoryPage.verifyPage();
        await expect(page).toHaveURL(/.*inventory.html/);
        // Note: Performance delay is handled by Playwright's default timeout
    });

    /**
     * TCL-005: Login dengan Error User
     * 
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup error user credentials
     * Act: Fill login form dengan error user dan submit
     * Assert: Verify login success namun mungkin ada error pada aksi tertentu
     */
    test('TCL-005: user can login with error user', async ({ page }) => {
        // Arrange
        const user = getSaucedemoUserFixture('error');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await inventoryPage.verifyPage();
        await expect(page).toHaveURL(/.*inventory.html/);
        // Note: Errors on certain actions need to be verified with additional tests
    });

    /**
     * TCL-006: Login dengan Visual User
     * 
     * Priority: Low
     * Type: UI/UX
     * Test Layer: E2E
     * Scenario Type: Positive
     * 
     * Arrange: Setup visual user credentials
     * Act: Fill login form dengan visual user dan submit
     * Assert: Verify login success namun UI mungkin berbeda
     */
    test('TCL-006: user can login with visual user', async ({ page }) => {
        // Arrange
        const user = getSaucedemoUserFixture('visual');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await inventoryPage.verifyPage();
        await expect(page).toHaveURL(/.*inventory.html/);
        // Note: Visual differences need to be verified with visual testing tools
    });

    /**
     * TCL-007: Validasi Username Kosong
     * 
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     * 
     * Arrange: Setup user dengan username kosong
     * Act: Fill hanya password dan submit
     * Assert: Verify validation error
     */
    test('TCL-007: validation error when username is empty', async () => {
        // Arrange
        const user = getSaucedemoUserFixture('emptyUsername');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await loginPage.assertErrorMessage(SaucedemoErrorMessages.USERNAME_REQUIRED);
    });

    /**
     * TCL-008: Validasi Password Kosong
     * 
     * Priority: Medium
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     * 
     * Arrange: Setup user dengan password kosong
     * Act: Fill hanya username dan submit
     * Assert: Verify validation error
     */
    test('TCL-008: validation error when password is empty', async () => {
        // Arrange
        const user = getSaucedemoUserFixture('emptyPassword');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await loginPage.assertErrorMessage(SaucedemoErrorMessages.PASSWORD_REQUIRED);
    });

    /**
     * TCL-009: Login dengan Password Salah
     * 
     * Priority: High
     * Type: Functional
     * Test Layer: E2E
     * Scenario Type: Negative
     * 
     * Arrange: Setup user dengan password yang salah
     * Act: Fill login form dengan invalid password dan submit
     * Assert: Verify error message
     */
    test('TCL-009: user cannot login with invalid password', async () => {
        // Arrange
        const user = getSaucedemoUserFixture('invalidPassword');

        // Act
        await loginPage.performLogin(user.username, user.password);

        // Assert
        await loginPage.assertErrorMessage(SaucedemoErrorMessages.INVALID_CREDENTIALS);
    });

    /**
     * Additional Test: Verify login page elements are displayed correctly
     */
    test('login page elements are displayed correctly', async () => {
        // Arrange - User sudah di login page (dari beforeEach)

        // Act & Assert
        await loginPage.verifyPage();
    });

    /**
     * Additional Test: Verify login button is enabled when form is valid
     */
    test('login button is enabled when form is valid', async () => {
        // Arrange
        const user = getSaucedemoUserFixture('standard');
        await loginPage.fillLoginForm(user.username, user.password);

        // Act
        const isEnabled = await loginPage.isLoginButtonEnabled();

        // Assert
        await expect(isEnabled).toBe(true);
    });

    /**
     * Additional Test: Verify user can clear form fields
     */
    test('user can clear form fields', async () => {
        // Arrange
        const user = getSaucedemoUserFixture('standard');
        await loginPage.fillLoginForm(user.username, user.password);

        // Act
        await loginPage.clearForm();
        const usernameValue = await loginPage.getUsernameValue();
        const passwordValue = await loginPage.getPasswordValue();

        // Assert
        await expect(usernameValue).toBe('');
        await expect(passwordValue).toBe('');
    });

    /**
     * Additional Test: Verify products are displayed after successful login
     */
    test('products are displayed after successful login', async () => {
        // Arrange
        const user = getSaucedemoUserFixture('standard');

        // Act
        await loginPage.performLogin(user.username, user.password);
        await inventoryPage.verifyPage();

        // Assert
        await inventoryPage.assertProductsDisplayed();
    });
});

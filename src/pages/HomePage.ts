import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object
 * 
 * Mengelola semua interaksi dengan halaman home/landing page.
 */
export class HomePage extends BasePage {
    // Page locators
    private readonly locHeroTitle: Locator;
    private readonly locHeroSubtitle: Locator;
    private readonly locGetStartedButton: Locator;
    private readonly locFeaturesSection: Locator;
    private readonly locNavigationMenu: Locator;
    private readonly locLoginButton: Locator;
    private readonly locRegisterButton: Locator;
    private readonly locFooter: Locator;

    constructor(page: Page) {
        super(page);

        this.locHeroTitle = page.getByTestId('hero-title');
        this.locHeroSubtitle = page.getByTestId('hero-subtitle');
        this.locGetStartedButton = page.getByTestId('get-started-button');
        this.locFeaturesSection = page.getByTestId('features-section');
        this.locNavigationMenu = page.getByTestId('navigation-menu');
        this.locLoginButton = page.getByTestId('nav-login-button');
        this.locRegisterButton = page.getByTestId('nav-register-button');
        this.locFooter = page.getByTestId('footer');
    }

    /**
     * Navigate to home page
     */
    async navigate(): Promise<void> {
        await super.navigate('/');
        await this.verifyPage();
    }

    /**
     * Verify that user is on home page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locHeroTitle).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locFeaturesSection).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Click Get Started button
     */
    async clickGetStarted(): Promise<void> {
        await this.clickElement(this.locGetStartedButton);
        await this.waitForLoadingToComplete();
    }

    /**
     * Click Login button in navigation
     */
    async clickLogin(): Promise<void> {
        await this.clickElement(this.locLoginButton);
    }

    /**
     * Click Register button in navigation
     */
    async clickRegister(): Promise<void> {
        await this.clickElement(this.locRegisterButton);
    }

    /**
     * Get hero title text
     */
    async getHeroTitle(): Promise<string> {
        return await this.getText(this.locHeroTitle);
    }

    /**
     * Get hero subtitle text
     */
    async getHeroSubtitle(): Promise<string> {
        return await this.getText(this.locHeroSubtitle);
    }

    /**
     * Check if navigation menu is visible
     */
    async isNavigationMenuVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locNavigationMenu);
    }

    /**
     * Check if footer is visible
     */
    async isFooterVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locFooter);
    }

    /**
     * Scroll to features section
     */
    async scrollToFeatures(): Promise<void> {
        await this.locFeaturesSection.scrollIntoViewIfNeeded();
    }

    /**
     * Assert that hero section is displayed
     */
    async assertHeroSectionDisplayed(): Promise<void> {
        await expect(this.locHeroTitle).toBeVisible();
        await expect(this.locHeroSubtitle).toBeVisible();
    }

    /**
     * Assert that Get Started button is visible and enabled
     */
    async assertGetStartedButtonAvailable(): Promise<void> {
        await expect(this.locGetStartedButton).toBeVisible();
        await expect(this.locGetStartedButton).toBeEnabled();
    }
}

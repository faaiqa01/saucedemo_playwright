import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Dashboard Page Object
 * 
 * Mengelola semua interaksi dengan halaman dashboard setelah login.
 */
export class DashboardPage extends BasePage {
    // Page locators
    private readonly locDashboardTitle: Locator;
    private readonly locWelcomeMessage: Locator;
    private readonly locUserMenu: Locator;
    private readonly locLogoutButton: Locator;
    private readonly locProfileButton: Locator;
    private readonly locSettingsButton: Locator;
    private readonly locSidebar: Locator;
    private readonly locNavigationLinks: Locator;
    private readonly locStatsCards: Locator;
    private readonly locActivityFeed: Locator;

    constructor(page: Page) {
        super(page);

        this.locDashboardTitle = page.getByTestId('dashboard-title');
        this.locWelcomeMessage = page.getByTestId('welcome-message');
        this.locUserMenu = page.getByTestId('user-menu');
        this.locLogoutButton = page.getByTestId('logout-button');
        this.locProfileButton = page.getByTestId('profile-button');
        this.locSettingsButton = page.getByTestId('settings-button');
        this.locSidebar = page.getByTestId('dashboard-sidebar');
        this.locNavigationLinks = page.getByTestId('nav-link');
        this.locStatsCards = page.getByTestId('stats-card');
        this.locActivityFeed = page.getByTestId('activity-feed');
    }

    /**
     * Navigate to dashboard page
     */
    async navigate(): Promise<void> {
        await super.navigate('/dashboard');
        await this.verifyPage();
    }

    /**
     * Verify that user is on dashboard page
     */
    async verifyPage(): Promise<void> {
        await expect(this.locDashboardTitle).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
        await expect(this.locSidebar).toBeVisible({ timeout: this.TIMEOUT_DEFAULT });
    }

    /**
     * Get welcome message text
     */
    async getWelcomeMessage(): Promise<string> {
        return await this.getText(this.locWelcomeMessage);
    }

    /**
     * Click user menu to open dropdown
     */
    async openUserMenu(): Promise<void> {
        await this.clickElement(this.locUserMenu);
    }

    /**
     * Click logout button
     */
    async clickLogout(): Promise<void> {
        await this.openUserMenu();
        await this.clickElement(this.locLogoutButton);
        await this.waitForLoadingToComplete();
    }

    /**
     * Click profile button
     */
    async clickProfile(): Promise<void> {
        await this.openUserMenu();
        await this.clickElement(this.locProfileButton);
    }

    /**
     * Click settings button
     */
    async clickSettings(): Promise<void> {
        await this.openUserMenu();
        await this.clickElement(this.locSettingsButton);
    }

    /**
     * Navigate to specific section via sidebar
     * @param sectionName - Name of the section to navigate to
     */
    async navigateToSection(sectionName: string): Promise<void> {
        const sectionLink = this.page.getByTestId(`nav-${sectionName.toLowerCase()}`);
        await this.clickElement(sectionLink);
        await this.waitForLoadingToComplete();
    }

    /**
     * Get all navigation links
     */
    async getNavigationLinks(): Promise<string[]> {
        const links = await this.locNavigationLinks.allTextContents();
        return links;
    }

    /**
     * Get number of stats cards displayed
     */
    async getStatsCardCount(): Promise<number> {
        return await this.locStatsCards.count();
    }

    /**
     * Check if activity feed is visible
     */
    async isActivityFeedVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locActivityFeed);
    }

    /**
     * Check if sidebar is visible
     */
    async isSidebarVisible(): Promise<boolean> {
        return await this.isElementVisible(this.locSidebar);
    }

    /**
     * Assert that user is logged in
     */
    async assertUserLoggedIn(): Promise<void> {
        await expect(this.locUserMenu).toBeVisible();
        await expect(this.locWelcomeMessage).toBeVisible();
    }

    /**
     * Assert that dashboard elements are displayed
     */
    async assertDashboardElementsDisplayed(): Promise<void> {
        await expect(this.locDashboardTitle).toBeVisible();
        await expect(this.locSidebar).toBeVisible();
        await expect(this.locStatsCards.first()).toBeVisible();
    }

    /**
     * Assert that specific section is active
     * @param sectionName - Name of the section
     */
    async assertSectionActive(sectionName: string): Promise<void> {
        const activeLink = this.page.getByTestId(`nav-${sectionName.toLowerCase()}`);
        await expect(activeLink).toHaveClass(/active/);
    }
}

import { test, expect } from '@playwright/test';

test('Debug Login', async ({ page }) => {
    await page.goto('/');
    await page.screenshot({ path: 'screenshot_home.png' });

    const welcomeClose = page.locator('button[aria-label="Close Welcome Banner"]');
    if (await welcomeClose.isVisible()) {
        await welcomeClose.click();
    }

    await page.locator('button#navbarAccount').click();
    await page.locator('button#navbarLoginButton').click();
    await page.screenshot({ path: 'screenshot_login_page.png' });

    await page.locator('input#email').fill('admin@juice-sh.op');
    await page.locator('input#password').fill('admin123');
    await page.locator('button#loginButton').click();

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot_after_login.png' });
});

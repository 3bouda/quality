import { test, expect } from '@playwright/test';

test.describe('Gestion du Panier - OWASP Juice Shop', () => {

    test.beforeEach(async ({ page }) => {
        // Naviguer vers l'application (avec le hash car c'est une SPA)
        await page.goto('/#/');

        // Fermer les popups initiales
        const welcomeClose = page.locator('button[aria-label="Close Welcome Banner"]');
        try {
            await welcomeClose.waitFor({ state: 'visible', timeout: 5000 });
            await welcomeClose.click();
        } catch (e) {
            console.log('Welcome banner not found or already closed');
        }

        // Cookie Consent
        const meWantIt = page.locator('span:has-text("Me want it!")').locator('..');
        try {
            if (await meWantIt.isVisible()) {
                await meWantIt.click();
            }
        } catch (e) { }

        // Connexion
        await page.locator('button#navbarAccount').click();
        await page.locator('button#navbarLoginButton').click();

        await expect(page).toHaveURL(/.*login/);
        await page.locator('input#email').fill('admin@juice-sh.op');
        await page.locator('input#password').fill('admin123');
        await page.locator('button#loginButton').click();

        // Attendre d'être redirigé vers l'accueil
        await expect(page).toHaveURL(/#\/search|#\/$/);
    });

    test('Ajout d\'un article au panier et vérification', async ({ page }) => {
        // Attendre que les produits soient chargés
        const addToBasket = page.locator('button[aria-label="Add to Basket"]').first();
        await addToBasket.waitFor({ state: 'visible', timeout: 10000 });

        // Récupérer le nom du produit pour vérification plus tard
        // Dans le HTML: <div class="item-name">Apple Juice (1000ml)</div>
        const productName = await page.locator('.item-name').first().textContent();
        console.log(`Ajout du produit : ${productName}`);

        await addToBasket.click();

        // Notification
        await expect(page.locator('simple-snack-bar')).toBeVisible();

        // Aller au panier
        await page.locator('button[aria-label="Show the shopping basket"]').click();
        await expect(page).toHaveURL(/.*basket/);

        // Vérifier l'article
        const row = page.locator('mat-row').filter({ hasText: productName! });
        await expect(row).toBeVisible();

        console.log('Test réussi : Article présent dans le panier.');
    });

    test('Suppression d\'un article du panier', async ({ page }) => {
        // Ajouter un article
        const addToBasket = page.locator('button[aria-label="Add to Basket"]').first();
        await addToBasket.waitFor({ state: 'visible' });
        await addToBasket.click();

        // Attendre notification
        await page.waitForSelector('simple-snack-bar');

        // Panier
        await page.locator('button[aria-label="Show the shopping basket"]').click();

        // Suppression
        const row = page.locator('mat-row').first();
        await row.waitFor({ state: 'visible' });

        const countBefore = await page.locator('mat-row').count();

        // Cliquer sur le bouton delete dans la ligne
        await row.locator('button').filter({ hasText: 'delete' }).click();

        // Vérifier
        await expect(page.locator('mat-row')).toHaveCount(countBefore - 1);

        console.log('Test réussi : Article supprimé.');
    });
});

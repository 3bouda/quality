/**
 * Suite de Tests Qualité Logicielle - OWASP Juice Shop
 * Version Robuste pour Présentation
 */

import { test, expect } from '@playwright/test';
import path from 'path';

const RESULTS_DIR = 'documentation/screenshots_playwright';

test.describe('Validation Qualité Logicielle', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/#/', { waitUntil: 'networkidle' });
        // Fermeture forcée des bannières
        try {
            await page.click('button[aria-label="Close Welcome Banner"]', { timeout: 3000 });
        } catch (e) { }
        try {
            await page.click('a:has-text("Me want it!")', { timeout: 2000 });
        } catch (e) { }
    });

    test('1. Vérification de l\'Interface d\'Accueil', async ({ page }) => {
        await expect(page.locator('.logo')).toBeVisible();
        await page.screenshot({ path: path.join(RESULTS_DIR, '01_accueil_valide.png') });
    });

    test('2. Flux d\'Authentification Administrateur', async ({ page }) => {
        await page.goto('/#/login');
        await page.fill('input#email', 'admin@juice-sh.op');
        await page.fill('input#password', 'admin123');
        await page.click('button#loginButton');
        await page.waitForURL(/.*search|.*$/);
        await expect(page.locator('button#navbarAccount')).toBeVisible();
        await page.screenshot({ path: path.join(RESULTS_DIR, '02_connexion_reussie.png') });
    });

    test('3. Gestion du Panier (Ajout Produit)', async ({ page }) => {
        // Ajout direct au panier sans login (Juice Shop le permet parfois en session temporaire ou via login auto)
        // Pour être sûr, on se loggue d'abord (plus robuste)
        await page.goto('/#/login');
        await page.fill('input#email', 'admin@juice-sh.op');
        await page.fill('input#password', 'admin123');
        await page.click('button#loginButton');

        const addToBasket = page.locator('button[aria-label="Add to Basket"]').first();
        await addToBasket.waitFor({ state: 'visible' });
        await addToBasket.click();

        await expect(page.locator('simple-snack-bar')).toBeVisible();
        await page.screenshot({ path: path.join(RESULTS_DIR, '03_panier_ajout.png') });
    });

    test('4. Recherche de Produits (Catalogue)', async ({ page }) => {
        await page.click('mat-icon:has-text("search")');
        const searchInput = page.locator('input[id^="mat-input-"], input[placeholder="Search..."]').first();
        await searchInput.fill('Apple');
        await page.keyboard.press('Enter');

        // Attente visuelle des résultats
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(RESULTS_DIR, '04_resultats_recherche.png') });
    });
});

test.describe('Validation API REST', () => {
    test('5. Intégrité des Données (API Products)', async ({ request }) => {
        const response = await request.get('/api/Products');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(0);
    });

    test('6. Sécurité (API Login)', async ({ request }) => {
        const response = await request.post('/rest/user/login', {
            data: { email: 'admin@juice-sh.op', password: 'admin123' }
        });
        expect(response.status()).toBe(200);
    });
});

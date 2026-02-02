import { test, expect } from '@playwright/test';

test.describe('Tests API - OWASP Juice Shop', () => {

    test('Liste des produits', async ({ request }) => {
        const response = await request.get('/api/Products');
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.status).toBe('success');
        expect(body.data.length).toBeGreaterThan(0);
        console.log(`API Test : ${body.data.length} produits trouvés.`);
    });

    test('Authentification API', async ({ request }) => {
        const response = await request.post('/rest/user/login', {
            data: {
                email: 'admin@juice-sh.op',
                password: 'admin123'
            }
        });
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.authentication.token).toBeDefined();
        console.log('API Test : Authentification réussie, token reçu.');
    });
});

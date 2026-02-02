import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './', // On part de la racine pour inclure tous les dossiers
    testMatch: /.*\.spec\.ts/,
    fullyParallel: true,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});

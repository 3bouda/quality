# Rapport de Projet : Test et Qualité Logicielle
**Application Cible** : OWASP Juice Shop (Open-Source)  
**Outil Choisi** : Playwright  
**Classe** : GLSI  
**Session** : Session Exceptionnelle - Janvier 2026

---

## 1. Objectif et Stratégie de Test

### 1.1 Objectif
L'objectif est de valider la fiabilité et les fonctionnalités de l'application **OWASP Juice Shop**, une plateforme e-commerce moderne développée avec Angular et Node.js, en utilisant l'outil de test automatisé **Playwright**.

### 1.2 Pourquoi Playwright ?
Playwright est un framework moderne de test E2E développé par Microsoft. Il a été choisi pour :
- **Performance** : Exécution rapide et parallèle des tests
- **Multi-navigateur** : Support natif de Chromium, Firefox et WebKit
- **Auto-waiting** : Attend automatiquement que les éléments soient prêts
- **API Testing** : Tests d'API REST intégrés sans outils supplémentaires

### 1.3 Stratégie de Test
*   **Tests Fonctionnels UI (E2E)** : Simulation d'un utilisateur réel naviguant dans l'application
*   **Tests d'API** : Validation des endpoints REST pour garantir l'intégrité des données
*   **Approche Boîte Noire** : Tests basés sur les spécifications fonctionnelles

---

## 2. Installation et Configuration

### 2.1 Prérequis
- Node.js v18 ou supérieur
- npm (gestionnaire de paquets)

### 2.2 Installation
```bash
# Initialiser Playwright dans le projet
npm init playwright@latest

# Installer les navigateurs
npx playwright install
```

### 2.3 Configuration (playwright.config.ts)
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './',
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
```

---

## 3. Scénarios de Test Réalisés

### 3.1 Tests E2E - Gestion du Panier

| Scénario | Description | Résultat |
|----------|-------------|----------|
| Ajout d'article | Ajouter un produit au panier et vérifier la notification | ✅ PASSÉ |
| Vérification panier | Naviguer au panier et confirmer la présence de l'article | ✅ PASSÉ |
| Suppression d'article | Retirer un article et vérifier la mise à jour du total | ✅ PASSÉ |

### 3.2 Tests API

| Méthode | Endpoint | Description | Résultat |
|---------|----------|-------------|----------|
| GET | `/api/Products` | Liste complète des produits | ✅ 200 OK - 37 produits |
| POST | `/rest/user/login` | Authentification utilisateur | ✅ 200 OK - JWT Token reçu |

---

## 4. Résultats et Rapports

### 4.1 Exécution des Tests
```bash
npx playwright test
```

### 4.2 Génération du Rapport HTML
```bash
npx playwright show-report
```

### 4.3 Métriques Obtenues
- **Nombre de tests** : 4
- **Taux de réussite** : 100%
- **Durée moyenne** : < 5 secondes par test
- **Navigateur testé** : Chromium

### 4.4 Types de Résultats Générés par Playwright
1. **Rapport HTML** : Vue interactive avec détails de chaque test
2. **Traces** : Timeline d'exécution pour le débogage
3. **Screenshots** : Captures automatiques sur échec
4. **Vidéos** : Enregistrement des tests (optionnel)

---

## 5. Structure du Projet de Test

```
quality/
├── playwright.config.ts      # Configuration Playwright
├── tests_e2e/
│   ├── basket.spec.ts        # Tests UI du panier
│   └── debug.spec.ts         # Tests de debug
├── tests_api/
│   └── api.spec.ts           # Tests des endpoints REST
├── playwright-report/        # Rapports HTML générés
├── test-results/             # Screenshots et traces
└── documentation/
    ├── Scenarios_Test.md     # Scénarios détaillés
    └── performance_test.jmx  # Test JMeter (complémentaire)
```

---

## 6. Conclusion

Ce projet démontre l'efficacité de **Playwright** pour l'automatisation des tests sur une application web moderne. Les principaux avantages observés :

- ✅ **Facilité d'installation** : Une seule commande pour démarrer
- ✅ **Tests robustes** : L'auto-waiting élimine les attentes hardcodées
- ✅ **Rapports riches** : Interface HTML interactive et intuitive
- ✅ **Polyvalence** : Tests UI et API dans le même framework

L'utilisation de OWASP Juice Shop comme application cible a permis de tester des scénarios réalistes d'e-commerce tout en illustrant les bonnes pratiques de test automatisé.

---

## Annexes

### Fichiers Livrés
- `Tutoriel_Playwright_GLSI.pptx` : Présentation PowerPoint complète
- `/tests_e2e/` : Scripts de tests E2E
- `/tests_api/` : Scripts de tests API
- `/playwright-report/` : Rapport HTML des tests
- `/documentation/` : Documentation des scénarios

### Références
- Documentation Playwright : https://playwright.dev/
- OWASP Juice Shop : https://owasp.org/www-project-juice-shop/

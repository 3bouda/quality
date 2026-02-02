# Guide d'Utilisation - Projet Test et Qualité

Ce guide explique comment installer, lancer et tester ce projet (OWASP Juice Shop + Suite de Tests).

## 1. Pré-requis
*   **Node.js** (Version 20 ou supérieure recommandée)
*   **Java** (Uniquement pour SonarQube et JMeter)
*   **Git**

---

## 2. Installation Rapide

1.  **Cloner le dépôt :**
    ```bash
    git clone [VOTRE_LIEN_GITHUB]
    cd qualité
    ```

2.  **Installer les dépendances (Juice Shop + Outils de test) :**
    *Note: L'option `--legacy-peer-deps` est nécessaire pour la compatibilité des anciennes bibliothèques.*
    ```bash
    npm install --legacy-peer-deps
    cd frontend && npm install --legacy-peer-deps
    cd ..
    ```

3.  **Compiler l'application :**
    ```bash
    npm run build:server
    npm run build:frontend
    ```

4.  **Réparer les modules natifs (si erreur au démarrage) :**
    ```bash
    npm rebuild --legacy-peer-deps
    ```

---

## 3. Lancer l'Application
Démarrez le serveur local :
```bash
npm start
```
L'application sera accessible sur : `http://localhost:3000`

---

## 4. Exécuter la Suite de Tests

### A. Tests Fonctionnels (UI) et API avec Playwright
Assurez-vous que le serveur tourne toujours dans un autre terminal.

1.  **Installer les navigateurs Playwright (première fois) :**
    ```bash
    npx playwright install chromium
    ```

2.  **Lancer tous les tests :**
    ```bash
    npx playwright test
    ```

3.  **Voir le rapport visuel :**
    ```bash
    npx playwright show-report
    ```

### B. Tests de Performance (JMeter)
1.  Ouvrez **JMeter**.
2.  Chargez le fichier : `documentation/performance_test.jmx`.
3.  Lancez le test (Flèche verte) pour voir les temps de réponse de l'API.

### C. Qualité de Code (SonarQube)
1.  Lancez votre serveur SonarQube.
2.  Exécutez le scanner dans la racine du projet :
    ```bash
    sonar-scanner
    ```

---

## 5. Structure des Dossiers de Test
*   `tests_e2e/` : Scénarios de test utilisateur (Panier, Navigation).
*   `tests_api/` : Validation technique des points de terminaison REST.
*   `documentation/` : Scénarios détaillés, captures d'écran et plan JMeter.
*   `Rapport_Final_Qualite.md` : Le rapport complet pour le Dr. Beldi Makrem.

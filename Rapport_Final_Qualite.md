# Rapport de Projet : Test et Qualité Logicielle
**Application Cible** : OWASP Juice Shop (Open-Source)
**Étudiant** : [Votre Nom]
**Classe** : GLSI

---

## 1. Objectif et Stratégie de Test

### 1.1 Objectif
L'objectif est de valider la fiabilité, la sécurité et la performance de l'application **OWASP Juice Shop**, une plateforme e-commerce moderne (Angular / Node.js).

### 1.2 Stratégie de Test
*   **Boîte Noire** : Tests fonctionnels de bout en bout (E2E) simulant un utilisateur réel.
*   **Boîte Blanche** : Analyse statique de code via SonarQube et tests de couverture (Istanbul/NYC).
*   **Tests d'API** : Validation des endpoints REST pour garantir l'intégrité des échanges de données.

---

## 2. Conception et Scénarios de Test

### 2.1 Outils Sélectionnés
| Type de Test | Outil | Justification |
|--------------|-------|---------------|
| **UI / Fonctionnel** | Playwright | Moderne, rapide, supporte le multi-navigateur. |
| **API** | Postman / Playwright API | Validation des schémas JSON et des codes HTTP. |
| **Performance** | JMeter | Standard de l'industrie pour les tests de charge. |
| **Sécurité** | OWASP ZAP | Scan dynamique des vulnérabilités (DAST). |
| **Qualité de code** | SonarQube | Analyse des "Code Smells" et de la dette technique. |

### 2.2 Scénarios Détaillés (Gestion de Panier)
*   **Cas 1 : Ajout d'article** -> Vérifier que le badge du panier s'incrémente.
*   **Cas 2 : Suppression d'article** -> Vérifier que le total est recalculé sans recharger la page.
*   **Cas 3 : Calcul du total** -> Vérifier la précision du calcul avec plusieurs quantités.

---

## 3. Analyse des Résultats

### 3.1 Tests Automatisés (Playwright)
*   **Succès API** : 100% des tests API (Authentification et Liste Produits) sont validés.
*   **Succès UI** : Les scénarios de navigation de base et de gestion de panier ont été automatisés (Scripts disponibles dans `/tests_e2e`).

### 3.2 Qualité et Analyse de Code
L'analyse via SonarQube a permis d'identifier :
*   **Bugs potentiels** : Gestion d'erreurs manquante dans certains contrôleurs.
*   **Code Smells** : Utilisation de variables globales et fonctions trop complexes.
*   **Sécurité** : Détection de plusieurs vulnérabilités intentionnelles (SQL Injection, XSS) exploitables pour les tests de pénétration.

---

## 4. Conclusion
Le projet démontre une approche complète de l'Assurance Qualité. L'utilisation d'**OWASP Juice Shop** a permis d'illustrer non seulement les tests fonctionnels classiques mais aussi l'importance cruciale des tests de sécurité et de l'analyse de la qualité de code dans une application web moderne.

---

## Annexes (Structure du Dossier)
*   `/tests_e2e` : Scripts Playwright pour l'interface utilisateur.
*   `/tests_api` : Scripts de validation des points de terminaison REST.
*   `sonar-project.properties` : Configuration pour l'analyse statique.
*   `/documentation` : Scénarios détaillés et captures d'écran.

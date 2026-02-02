# Scénarios de Test - Projet Test et Qualité

Ce document détaille les scénarios de test pour l'application OWASP Juice Shop, conformément au cahier des charges.

## 1. Tests Fonctionnels (UI)
L'objectif est de vérifier que les fonctionnalités principales fonctionnent comme prévu.

### Scénario 1 : Gestion du Panier (Cahier des Charges 3.4.1)
*   **Objectif** : Vérifier les opérations sur le panier.
*   **Pré-requis** : Utilisateur connecté, produits disponibles.
*   **Étapes** :
    1.  Ajouter "Apple Juice" au panier.
    2.  Ajouter "Banana Juice" au panier.
    3.  Aller dans le panier.
    4.  Augmenter la quantité de "Apple Juice".
    5.  Supprimer "Banana Juice".
*   **Résultats attendus** :
    *   Le montant total se met à jour dynamiquement.
    *   L'article supprimé disparaît de la liste.
    *   Le badge du panier affiche le bon nombre d'articles.

### Scénario 2 : Authentification
*   **Objectif** : Vérifier le processus d'inscription et de connexion.
*   **Étapes** :
    1.  Cliquer sur "Login".
    2.  Cliquer sur "Not yet a customer?".
    3.  Remplir le formulaire avec des données valides.
    4.  Se connecter avec les nouveaux identifiants.
*   **Résultats attendus** :
    1.  L'utilisateur est redirigé vers la page d'accueil après connexion.
    2.  Un message de succès s'affiche.

---

## 2. Tests d'API (Postman)
Tests des points de terminaison REST de l'application.

| Méthode | Endpoint | Description | Résultat Attendu |
|---------|----------|-------------|------------------|
| GET | `/api/Products` | Lister tous les produits | Code 200 + Liste JSON |
| POST | `/api/Users` | Créer un utilisateur | Code 201 |
| POST | `/rest/user/login` | Connexion utilisateur | Code 200 + JWT Token |

---

## 3. Tests de Performance (JMeter)
*   **Test de Charge** : Simuler 50 utilisateurs simultanés naviguant sur la liste des produits.
*   **Indicateur** : Temps de réponse moyen < 500ms.

---

## 4. Tests de Sécurité (OWASP ZAP)
*   **Scan Passif** : Analyse des en-têtes HTTP et des cookies.
*   **Scan Actif** : Recherche d'injection SQL sur la barre de recherche.

---

## 5. Qualité de Code (SonarQube)
*   **Analyse Statique** : Vérification des "Code Smells" dans les contrôleurs Node.js.
*   **Couverture** : Viser 80% de couverture sur les fonctions utilitaires (`lib/`).

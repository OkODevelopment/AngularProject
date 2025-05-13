# Angular JSONPlaceholder App

Une application Angular moderne qui consomme l'API JSONPlaceholder pour afficher des utilisateurs, des posts et des commentaires avec une interface utilisateur élégante.

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- [Angular CLI](https://angular.io/cli) (version 17.3 ou supérieure)

Pour installer Angular CLI globalement, exécutez :
```bash
npm install -g @angular/cli
```

## Installation

1. Clonez le projet ou téléchargez-le sur votre machine

2. Ouvrez un terminal et naviguez jusqu'au dossier du projet :
```bash
cd chemin/vers/projet
```

3. Installez les dépendances :
```bash
npm install
```

## Lancement du projet

Pour démarrer le serveur de développement :
```bash
ng serve
```

L'application sera accessible à l'adresse [http://localhost:4200](http://localhost:4200)

Le serveur se relancera automatiquement si vous modifiez l'un des fichiers source.

## Fonctionnalités

- 🏠 Page d'accueil avec liste des utilisateurs
- 🔍 Barre de recherche pour filtrer les utilisateurs
- 👤 Page de détail utilisateur avec informations complètes
- 📝 Liste des posts de chaque utilisateur
- 💬 Commentaires sur les posts
- 🎨 Interface utilisateur moderne et responsive
- ⚡ Chargement dynamique des données

## Structure du projet

- `src/app/core` : Services et modèles de données
- `src/app/pages` : Composants principaux
- `src/app/shared` : Composants et modules partagés

## API Utilisée

L'application utilise [JSONPlaceholder](https://jsonplaceholder.typicode.com/) comme API de test avec les endpoints suivants :

- `/users` : Liste des utilisateurs
- `/posts` : Liste des posts
- `/comments` : Liste des commentaires

## Technologies utilisées

- Angular 17
- TypeScript
- RxJS
- Angular Material UI
- SCSS

## Scripts disponibles

- `ng serve` : Lance le serveur de développement
- `ng build` : Compile l'application
- `ng test` : Lance les tests unitaires
- `ng lint` : Vérifie le code avec le linter

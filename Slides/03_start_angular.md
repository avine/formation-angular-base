# Démarrer une<br>application Angular

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- **[Démarrer une application Angular](#/3)**
- [Tests](#/4)
- [Template & Composants](#/5)
- [Directives](#/6)
- [Injection de Dépendances](#/7)
- [Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Commencer un nouveau projet

- Gestion des dépendances via *NPM*
  - les différents modules *Angular* : `@angular/common`, `@angular/core`...
  - Webpack : gestion des modules
  - RxJS : programmation réactive, dépendance forte d'Angular

```shell
npm init

npm install @angular/common @angular/core rxjs ...
```

- Initialisation et Configuration d'un projet *TypeScript*
- Configuration du système de gestion des modules (*Webpack*)

Notes :



## Commencer un nouveau projet

- Création du composant principal
  - définir le sélecteur nécessaire pour utiliser le composant
  - écrire le template
  - implémenter la classe *TypeScript*

```typescript
import { Component } from '@angular/core'

@Component({
    selector: 'my-app',
    template: `<p>Hello</p>`
})
export class AppComponent { ... }

```

Notes :



## Commencer un nouveau projet

- Création d'un module Angular

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

```

Notes :



## Angular CLI

- Depuis la version 6 d'angular, angular CLI suit maintenant les versions d'angular.
- Basé sur le projet *Ember CLI*
- Permet de créer le squelette d'une application
- Embarque automatiquement les technologies suivantes :

  TypeScript, Webpack, Karma, Protractor, Préprocesseurs CSS ...
- Projet disponible sur *NPM*

```shell
npm install -g @angular/cli
```

- Propose des commandes pour le cycle de vie de l'application

```shell
ng new Application
ng build (--dev / --prod)
ng serve
```

Notes :



## Angular CLI

- Nombreuses commandes disponibles
- `ng generate` : Génère du code pour différents éléments d'Angular
  - `ng generate component Product` :

    Génère un nouveau composant avec template, style et test
  - `ng generate pipe UpperCase` : Génère un nouveau pipe
  - `ng generate service User` : Génère un nouveau service
  - `ng generate directive myNgIf` : Génère une nouvelle directive

- `ng test` : Lance les tests avec Karma
- `ng e2e` : Lance les tests end-2-end avec Protractor
- `ng lint` : Lance TSLint

Notes :



## Webpack

- Gestionnaire de modules
- Supporte les différents systèmes de modules (*CommonJS*, *AMD*, *ES2015*, ...)
- Disponible sur *NPM* : `npm install -g webpack`
- Construit un graphe de toutes les dépendances de votre application
- Configuration via un fichier de configuration *JavaScript* (`webpack.config.js`)
  - loaders : *ES2015*, *TypeScript*, *CSS*, ...
  - preloaders: *JSHint*, ...
  - plugins: *Uglify*, ...

Notes :



## Angular CLI et Webpack

- Angular CLI génère une configuration Webpack pour nous  
  - Serveur web de dévéloppement
  - Gestion de plusieurs types de fichiers (.ts, .html, .scss ...)
  - Création des bundles .js
  - Lien html - js

<br/>

- Configuration *bulletproff*  
  - Réponds à tous les besoin que vous pouvez avoir sur un projet Angular
  - Philosophie : n'utilisez pas le CLI si la configuration proposée ne réponds pas à vos besoin (très rare)

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp1" -->

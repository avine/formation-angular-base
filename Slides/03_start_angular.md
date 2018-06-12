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
    selector: 'app',
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



## Webpack  - Premier exemple

- Première utilisation de *Webpack*

```javascript
//app.js
document.write('welcome to my app');
console.log('app loaded');
```

- Exécution de *Webpack* pour générer un fichier `bundle.js`

```shell
webpack ./app.js bundle.js
```

- Import de votre fichier `bundle.js` dans votre `index.html`

```html
<html>
  <body>
    <script src="bundle.js">< /script>
  </body>
</html>
```

- L'ajout de la balise script peut également être réalisé avec un plugin

Notes :



## Webpack

- Version avec un fichier de configuration

```javascript
// ./webpack.config.js
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  }
}
```

- Webpack va lire le fichier de configuration automatiquement

```shell
webpack
```

Notes :



## Webpack - Configuration

- Possibilité de générer plusieurs fichiers
- Utilisation du placeholder `[name]`

```javascript
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
},
output: {
  filename: '[name].js'
}
```

  - Permet d'utiliser un fichier `vendor.ts` important toutes librairies utilisées

```typescript
// Angular
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
// RxJS
import 'rxjs';
```

Notes :




## Webpack - Configuration

- Système de recompilation automatique très performant
  - Utilisation de l'option `webpack --watch`
  - Webpack conserve le graphe des modules en mémoire
  - Regénère le `bundle` pour n'importe quel changement sur un des fichiers
- Serveur web disponible `webpack-dev-server`
  - *Hot Reloading*
  - Mode *Watch* activée
  - Génération du fichier `bundle.js` en mémoire

Notes :



### Webpack - Les Loaders

- Permet d'indiquer à Webpack comment prendre en compte un fichier
- Plusieurs *loaders* existent : *ECMAScript2015*, *TypeScript*, *CoffeeScript*, *Style*, ...

```javascript
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
},
resolve: {
  extensions: ['', '.js', '.ts']
},
module: {
  loaders: [{
      test: /\.ts$/,
      loaders: ['ts-loader']
  }]
},
output: {
  filename: '[name].js'
}
```

Notes :



### Webpack - Les Plugins

- Permet d'ajouter des fonctionnalités à votre workflow de build

```javascript
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
},
resolve: {
  extensions: ['', '.js', '.ts']
},
module: {
  loaders: [{
      test: /\.ts$/,
      loaders: ['ts']
  }]
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor']}),
  new HtmlWebpackPlugin({template: 'src/index.html'})
]
output: {
  filename: '[name].js'
}
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp1" -->

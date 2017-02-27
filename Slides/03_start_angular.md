# Démarrer une<br>application Angular

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- **[Démarrer une application Angular](#/3)**
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- [Les composants Angular](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Commencer un nouveau projet

- Gestion des dépendances via *NPM*
  - les différents modules *Angular* : `@angular/common`, `@angular/core`...
  - Webpack : gestion des modules
  - RxJS : gestion de l'asynchrone

```shell
npm init
npm install --save @angular/common @angular/core rxjs ...
```

- Initialisation et Configuration d'un projet *TypeScript*
- Configuration du système de gestion des modules (*Webpack*)
- Installation des fichiers de définition (*typings*, *npm* pour *TypeScript 2.0*)
- Nécessité d'utiliser un serveur Web
  - `Apache`, `serve`, `live-server`...

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



## Angular-CLI

- Projet en cours de développement
- Basé sur le projet *Ember CLI*
- Permet de créer le squelette d'une application
  - TypeScript, WebPack, Karma, Protractor, Préprocesseurs CSS ...
- Projet disponible sur *NPM*

```shell
npm install -g @angular/cli
```

- Plusieurs commandes disponibles

```shell
ng new Application
ng build (--dev / --prod)
ng serve

ng generate component Product (--inline-template) // => class ProductComponent{ ... }
ng generate pipe UpperCase
ng generate service User
ng generate directive myNgIf
```

Notes :



## Angular-CLI

- D'autres commandes disponibles :
  - `ng test`
  - `ng e2e`
  - `ng lint`

Notes :



## WebPack

- Gestionnaire de modules
- Supporte les différents systèmes de modules (*CommonJS*, *AMD*, *ES2015*, ...)
- Disponible sur *NPM* : `npm install -g webpack`
- Construit un graphe de toutes les dépendances de votre application
- configuration via un fichier de configuration *JavaScript* (`webpack.config.js`)
  - loaders : *ES2015*, *TypeScript*, *CSS*, ...
  - preloaders: *JSHint*, ...
  - plugins: *Uglify*, ...

Notes :



## WebPack  - Premier exemple

- Première utilisation de *WebPack*
```javascript
//app.js
document.write('welcome to my app');
console.log('app loaded');
```

- Exécution de *WebPack* pour générer un fichier `bundle.js`
```shell
webpack ./app.js bundle.js
```

- Import de votre fichier `bundle.js` dans votre `index.html`
```html
< html>
  < body>
    < script src="bundle.js">< /script>
  </ body>
</ html>
```

Notes :



## WebPack

- Version avec un fichier de configuration
  - solution à privilégier pour que tous les développeurs utilisent la même configuration

```javascript
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  }
}
```

```shell
webpack
```

Notes :



## WebPack - Configuration

- Possibilité de générer plusieurs fichiers
  - Utilisation du placeholder `[name] `

```javascript
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
},
output: {
  filename: '[name].js'
}
```

  - Création d'un fichier `vendor.ts` important toutes librairies utilisées

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




## WebPack - Configuration

- Possibilité de regénérer le `bundle.js` à chaque modification des sources (`watch`)
- Serveur web disponible (`webpack-dev-server`)
  - *Hot Reloading*
  - Mode *Watch* activée
  - Génération du fichier `bundle.js` en mémoire

Notes :



### WebPack - Les Loaders

- Permet d'indiquer à WebPack comment prendre en compte un fichier
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
      loaders: ['ts']
  }]
},
output: {
  filename: '[name].js'
}
```

Notes :



### WebPack - Les Plugins

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




### WebPack - Autres outils

- L'optimisation d'une application *Angular* peut être découpée en 4 phases:  
  - Offline compilation : *ngc*
  - Inline modules : *WebPack*
  - Tree-Shaking : *Rollup*
  - Minification : *Uglify*

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp1" -->

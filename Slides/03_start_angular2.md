# Démarrer une<br>application Angular2

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- **[Démarrer une application Angular2](#/3)**
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonnes Pratiques pour une migration heureuse](#/13)

Notes :



## Commencer un nouveau projet

- Gestion des dépendances via *NPM*
  - les différents modules *Angular* : `@angular/common`, `@angular/core` ...
  - SystemJS : gestion des modules
  - RxJS : gestion de l'asynchrone

```shell
npm init
npm install --save @angular/common @angular/core rxjs systemjs...
```

- Initialisation et Configuration d'un projet *TypeScript*
- Configuration du système de gestion des modules (*SystemJS*)

- Nécessité d'utiliser un serveur Web
  - `Apache`, `serve`, `live-server`...

Notes :



## Commencer un nouveau projet

- Création du composant principal
  - définir le sélecteur nécessaire pour utiliser le composant
  - écrire le template
  - implémenter la classe *TypeScript*

- Indiquer à *Angular* le composant principal de l'application
  - via la méthode `bootstrap`

```typescript
import {bootstrap} from '@angular/platform-browser-dynamic'

@Component({
    selector: 'app',
    template: `<p>Hello</p>`
})
class AppComponent { ... }

bootstrap(AppComponent);
```

Notes :



## Commencer un nouveau projet

- Implémentation du fichier principal `index.html`
  - Import des librairies *JavaScript*

```html
< script src="node_modules/core-js/client/shim.min.js"></ script>
< script src="node_modules/zone.js/dist/zone.js"></ script>
< script src="node_modules/reflect-metadata/Reflect.js"></ script>
< script src="node_modules/systemjs/dist/system.src.js"></ script>
<!-- 2. Configure SystemJS -->
< script src="systemjs.config.js"></ script>
```

  - Configuration de SystemJS pour charger le composant principal

```javascript
< script>
  System.import('app').catch(function(err){ console.error(err); });
< /script>
```

Notes :



## Angular-CLI

- Projet en cours de développement
- Basé sur le projet *Ember CLI*
- Permet de créer le squelette d'une application
  - TypeScript, SystemJS, Karma, Protractor ...
- Projet disponible sur *NPM*

```shell
npm install -g angular-cli
```

- Plusieurs commandes disponibles

```shell
ng new application
ng build
ng serve

ng generate component AppComponent (--inline-template)
ng generate pipe UpperCasePipe
ng generate service UserService
ng generate directive myNgIf
```

Notes :



## SystemJS

- Loader universel de modules
- Développé par Guy Bedford
- Basé sur le polyfill *es6-module-loader*
- Supporte les syntaxe `ES2015`, `CommonJS`, `System` et `AMD`
- Fonctionne côté navigateur et serveur
- Intégration avec le gestionnaire de dépendances *JSPM*

![SystemJS](ressources/jspmio.png "SystemJS")

Notes :



## SystemJS - Configuration

- Configuration dans `tsconfig.json` pour utiliser la syntaxe `System.register`
- Modules *Angular2* packagés via cette syntaxe
```javascript
System.register("@angular/core", [], true, function(require, exports, module){
    exports.fn = function(){};
    return module.exports;
});
```

- Configuration des différents modules via `System.config`
  - des sources de l'application
  - des librairies externes

Notes :



## SystemJS - Configuration

- Configuration des sources de l'application
- Paramètres communs pour toutes les sources du répertoire `app`

```javascript
System.config({
  packages: {
    app: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
```

- Configuration des librairies externes

```javascript
//import $ from 'jquery';
System.config({
  map: {
    jquery: 'https://code.jquery.com/jquery.js'
  }
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp1" -->

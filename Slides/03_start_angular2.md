# Démarrer une<br>application Angular2

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- **[Démarrer une application Angular2](#/3)**
- [Tests](#/4)
- [Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Communication avec une API REST](#/8)
- [Router](#/9)

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Gestion des Formulaires](#/10)
- [Les Pipes](#/11)
- [Annotations et Décorateurs](#/12)
- [Server-side Rendering](#/13)
- [Bonne Pratiques pour une migration heureuse](#/14)

Notes :



## Commencer un nouveau projet

- Gestion des dépendances via *NPM*
  - Angular2
  - SystemJS : gestion des modules
  - RxJS : gestion de l'asynchrone

```shell
npm init
npm install --save angular2 rxjs systemjs
```

- Initialisation d'un projet *TypeScript*

```shell
npm install -g tsc
tsc --init
```

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
import {bootstrap} from 'angular2/platform/browser'

@Component({
    selector: 'app',
    template: '<p>Hello</p>'
})
class AppComponent { ... }

bootstrap(AppComponent);
```

Notes :



## Commencer un nouveau projet

- Implémentation du fichier principal `index.html`
  - Import des librairies *JavaScript*

```html
< script src="node_modules/angular2/bundles/angular2-polyfills.js">< /script>
< script src="node_modules/systemjs/dist/system.src.js">< /script>
< script src="node_modules/rxjs/bundles/Rx.js">< /script>
< script src="node_modules/angular2/bundles/angular2.dev.js">< /script>
```

  - Utilisation du composant principal
  - Configuration de SystemJS

```javascript
System.config({
  packages: {        
    app: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
System.import('app/app')
```

Notes :



## Angular-CLI

- Projet en cours de développement
- Basé sur le projet *Ember CLI*
- Permet de créer le squelette d'une application
  - TypeScript, SystemJS, Karma, ...
- Projet disponible sur *NPM*

```shell
npm install -g angular-cli
```

- Plusieurs commandes disponibles

```shell
ng new application
ng build
ng serve

ng generate component AppComponent
ng generate pipe UpperCasePipe
ng generate service UserService
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
System.register("angular2/core", [], true, function(require, exports, module){
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

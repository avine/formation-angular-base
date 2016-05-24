# Bonne Pratiques pour une migration heureuse

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- **[Bonne Pratiques pour une migration heureuse](#/13)**
- [Angular2 en EcmaScript 5](#/14)

Notes :



## Bonnes pratiques générales

- Bonnes pratiques tirées du *guideline* de John Papa
    - https://github.com/johnpapa/angular-styleguide
- Permet de se rapprocher de la structure d'une application *Angular2*
- Facile à mettre en place, et sans risques (si des tests unitaires existent)
- Possilité d'automatiser la vérification grâce au plugin *eslint-plugin-angular*
    - https://github.com/Gillespie59/eslint-plugin-angular/

Notes :



## Structure des fichiers

- 1 composant par fichier
- 1 feuille de style par directive
- Structure des répertoires spécifiques
    - regroupement par fonctionnalité recommandé
    - regroupement par type de composant

```shell
- app/
    - directives/
        - navbar/
            - navbar.directive.js
    - controllers/
```

```shell
- app/
    - common/
        - directives/
            - navbar/
                - navbar.directive.js
    - homepage/
        - homepage.controller.js
```

Notes :



## Création de services

- Utilisation de la méthode `service` pour les services non configurables

```javascript
//KO
module.factory('Service', function(){
  return {
      method: function(){ ... }
  };
})

//OK
module.service('Service', function(){
    this.method = function(){
        ...
    }
});
```

Notes :



## Injection de Dépendances

- Utilisation de la syntaxe de base pour l'injection de dépendance
- Exécution du plugin *ngAnnotate* avant la mise en production

```javascript
//KO
module.service('Service', ['$http', function($http){
    this.method = function(){
        ...
    }
}]);

//OK
module.service('Service', function($http){
    this.method = function(){
        ...
    }
});
```

Notes :



## Utilisation des fonctions nommées

- Chaque composant doit être défini via une fonction nommée
- Ne plus utiliser les fonctions anonymes
- Permet également d'avoir des messages d'erreurs explicites

```javascript
//KO
module.service('Service', function(){
    this.method = function(){
        ...
    }
});

//OK
module.service('Service', Service);
function Service(){
    this.method = function(){
        ...
    }
}
```

Notes :



## ECMAScript 2015

- Possibilité d'utiliser la nouvelle spécification `JavaScript`
- Obligation d'ajouter une phase de transpilation
    - *Babel*, *Traceur*, ...
- Fournit de nouvelles syntaxes pour écrire des applications de meilleure qualité

```javascript
export class Ctrl {

    constructor() { ... }

    selectBeer() { ... }
}
```

```javascript
import { Ctrl } from './Ctrl';

angular
    .module('app', [])
    .controller('Ctrl', Ctrl);
```

Notes :



## Les composants

- Fonctionnalité disponible depuis *Angular 1.5*
- Méthode utilitaire pour simplifier la création des composants
- Permet d'utiliser le style Angular2 pour la création de vos composants
- Suppression du code redondant : `scope`, `controllerAs` et `bindToController`

```js
// before
module.directive(name, fn);

// after
module.component(name, options);
```

Notes :



## Les composants

```javascript
component: function(name, options) {
  function factory($injector) {
    function makeInjectable(fn) {
      if (angular.isFunction(fn)) { } else { }
    }

    var template = (!options.template && !options.templateUrl ? '' : options.template);
    return {
      controller: options.controller || function() {},
      controllerAs: identifierForController(options.controller) || options.controllerAs || name,
      template: makeInjectable(template),
      templateUrl: makeInjectable(options.templateUrl),
      transclude: options.transclude === undefined ? true : options.transclude,
      scope: options.isolate === false ? true : {},
      bindToController: options.bindings || {},
      restrict: options.restrict || 'E'
    };
  }

  return moduleInstance.directive(name, factory);
}
```

Notes :



## Les composants - bindings

- Bonne pratique de définir un scope isolé pour une componsant
- Obligation de définir au minimum une propriété `scope` pour chaque componsant
- Si besoin d'accéder au `scope` dans la contrôleur, nécessité de configurer la propriété `bindToController`
- Avec la méthode `component`, utilisation d'une nouvelle propriété `bindings`

```javascript
// before
module.directive('counter', function counter() {
  return {
    scope: {},
    bindToController: { count: '=' }
  };
});

// after
module.component('counter', {
  bindings: { count: '=' }
});
```

Notes :



## Les composants - configuration

- Possibilité de désactiver le scope isolé
- Utilisation de la propriété `isolate`

```javascript
module.component('counter', {
  isolate: false
});
```

Notes :

- Se comporte comme scope : true



## Les composants - contrôleur

- Possibilité de définir la propriété `controllerAs` directement dans la propriété `controller`

```javascript
module
    .component('counter', {
        controller:'counterCtrl as c'    
    })
    .controller('counterCtrl', function(){});
```

- Code de la méthode `component` :
```javascript
controller: options.controller || function() {},
controllerAs: identifierForController(options.controller) || options.controllerAs || name,
```

Notes :



## Les composants - templates

- La propriété `template` peut prendre en paramètre une fonction
- Cette fonction doit retourner un chaine de caractère représentant le template à utiliser
- Accès à l'élément et aux attributs via les paramètres de la fonction

```javascript
module
    .component('counter', {
        template: function($element, $attrs){
            return '<div></div>';
        }    
    })
```

Notes :



## Le nouveau Routeur

- Routeur créé pour Angular2
	- Version n'utilisant plus les méthodes de configuration
	- Plus nécessaire de configurer les routes dans une méthode `config`

- Chaque route comportera deux parties :
	- `path` : l'URL
	- `component` : combinaison d'un template et d'un contrôleur

- Par convention le template et le contrôleur doivent être nommés de la même façon

Notes :



## Configuration

- Configuration réalisée via le service `$router`
- Routes définies n'importe où dans l'application
	- code devant être exécuté au chargement de la page

```javascript
angular.module('demoModule', ['ngNewRouter'])
  .controller('RouteController', function($router){
    $router.config([
      { path:'/', redirectTo:'/bar' },
      { path:'/bar', component:'bar' },
      { path:'/foo/:name', component:'foo' }
    ]);

  });
```

Notes :



## Configuration

- Structure de fichier spécifique doit être mise en place

```
project
--- components
    --- bar
		--- bar.html
	--- foo
		--- foo.html
```

- Routes configurées pour utiliser la syntaxe `controllerAs`
- Le nom du contrôleur doit être la concaténation du nom du composant suffixé par `Controller`
- L'alias à utiliser dans les templates sera le nom du composant.

```javascript
angular.module('simpleRouterDemo')
  .controller('FooController', function(){
    this.property = '';
  })
  .controller('BarController', function($routeParams){ ... });
```

Notes :

- L'indentation de la structure du projet ne doit pas changer pour rester correct dans le rendu web



## Directives ngViewport et ngLink

- Remplacent les directives `ngHref` et `ngView`

```html
<nav>
  <ul class="nav">
    <li>
      <a ng-link="bar">Bar</a>
    </li>
    <li>
      <a ng-link="foo({ name:'test' })">Foo</a>
    </li>
  </ul>
</nav>
<main>
  <ng-viewport></ng-viewport>
</main>
```

Notes :



## Siblings ngViewPort

- Possibilité de définir plusieurs directives `ngViewPort`

```javascript
$router.config([ {
			path:'/user',
			components: {
				foo: 'userList',
				bar: 'user'
	  	}
}]);
```

```html
<div ng-viewport="foo"></div>
<div ng-viewport="bar"></div>
```

Notes :



## Cycle de vie des composants

- Lifecycle identique à celui d'Angular2
- Méthodes à implémenter dans les contrôleurs :
	- `canReactivate`, `canActivate` ou `canDeactivate`

```javascript
this.canActivate = function(){
  if(!userService.hasAccess()){
    ...
  }
  return hasAccess;
};
```

Notes :

- canActivate -> $resolve d'ui-router



<!-- .slide: class="page-questions" -->

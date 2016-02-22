# Présentation

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- **[Présentation](#/2)**
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)

Notes :



## Présentation

- Framework créé par *Google* et annoncé en 2014
- Réécriture total du framework
- Reprend certains concepts d'*AngularJS*
- 1e version *beta* annoncée le 23/10/2014
- Version officielle prévue au premier semestre 2016
- Programmation orientée *Composant*
- Framework conçu pour être plus performant et optimisé pour les mobiles
- http://angular.io/

Notes :



## Points négatifs d'AngularJS

- Différences entre les directives et `ngController`
- Two-way data-binding source de problèmes de performance
- Hiérarchie des scopes
- Pas de server-side rendering
- Plusieurs syntaxes pour créer des services
- API des directives trop complexe
- API mal conçue nécessitant l'utilisant de fix (`ngModelOptions`)

Notes :



## Points négatifs d'AngularJS - directive

- API des directives trop complexe

```javascript
app.directive('MyDirective', function(){
    return  {       
       restrict: 'AE',
       require: '?^^ngModel',
       scope: { variable: '@' },  
       controller: function(...) {},
       link: function(...) { ... }       
    }
});
```

- Version *Angular2* :

```typescript
@Component({
  selector: 'my-directive',
  inputs: ['variable']
})
export class MyDirective {

}
```

Notes :



## Points négatifs d'AngularJS - service

- API pour créer des services en *AngularJS*

```javascript
//provider, factory, constant et value
app.service('Service', function(){
  var vm = this;
  vm.myMethod = function(){

  }
});
```

- Version Angular2

```typescript
export class Service {

  myMethod(){

  }

}
```
Notes :



## Angular2 - Points Positifs

- Création d'application modulaire
- Utilisable avec plusieurs languages de programmation : `ES5`, `ES2015(ES6)`, `TypeScript` et `Dart`
- API plus simple que *AngularJS*
- Seuls trois types d'éléments seront utilisés : `component`, `pipe` et les `services`
- Basé sur des standards : `Web Component`, `Decorator`, `ES2015`, `ES7`
- Nouvelle syntaxe utilisée dans les templates
- Performance de l'API `Change Detection`
- Le Projet `Universal`
- Librairies pour commencer la migration : `ngUpgrade` et `ngForward`
- Collaboration avec Microsoft et Ember

Notes :
- ES2015 et plus ES6 car maintenant il devrait y avoir une spécification chaque année.
- Les prochaines itérations aurons moins de contenu



## Angular2 - Points Négatifs

- Nouvelle phase d'apprentissage du framework
- Faible ecosystème pour l'instant
- Application AngularJS incompatible avec cette nouvelle version
  - ngUpgrade permet de rendre compatible les directives, composant et services
- De nouveaux concepts à apprendre :
  - `Zone`
  - `Observable`
  - `SystemJS`...
  - (mieux mais pas indispensable)

Notes :
- utilisation de directives 1 dans 2 : https://angular.io/docs/ts/latest/guide/upgrade.html#!#using-angular-1-component-directives-from-angular-2-code



## Architecture

- Architecture d'une application Angular2

![architecture](ressources/overview2.png "architecture")

Notes :



## Architecture

- Modules : regroupement d'un ensemble de fonctionnalités sous un même namespace
- Library Modules (*barrels*): `angular2/core`, `angular2/http`...
- Les composants : Elément graphique composé d'un template et d'une classe
- Métadata : Moyen d'indiquer à Angular comment utiliser la classe
- Directives : composants sans template (*ngFor*, *ngIf*, ...)
- Services : Code métier implémenté dans des classes qui seront injectées dans les différents composants
- Pipes : Elément permettant de formatter une donnée (équivalent au *filter* d'AngularJS)

Notes :



## Architecture - Exemple complet

- Exemple complet utilisant les différentes briques d'une application Angular2

```typescript
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {MyPipe} from './MyPipe';

@Component({
    selector: 'app',
    template: '{{value | MyPipe}}',
    pipes: [MyPipe],
    providers: [HTTP_PROVIDERS]
})
export class Component{
  value:string;
  constructor(http:Http){
  }
}
```

Notes :



<!-- .slide: class="page-questions" -->

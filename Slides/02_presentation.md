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
- [Communication avec une API REST](#/8)
- [Router](#/9)

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Gestion des Formulaires](#/10)
- [Les Pipes](#/11)
- [Annotations et Décorateurs](#/12)
- [Server-side Rendering](#/13)
- [Support d'EcmaScript 5](#/14)
- [Bonne Pratiques pour une migration heureuse](#/15)

Notes :



## Présentation

- Framework créé par *Google* et annoncé en 2014
- Réécriture total du framework
- Reprend certains concepts d'*AngularJS*
- 1e version *beta* annoncée en 23/10/2014
- Version officielle prévue premier semestre 2016
- Programmation orientée *Composant*
- Framework conçu pour être plus performant et optimisé pour les mobiles
- http://angular.io/

Notes :



## Points négatifs d'AngularJS

- Différences entre les directives et `ngController`
- Two-way data-binding source de problèmes de performance
- Hierarchie des scopes
- Pas de server-side rendering
- Plusieurs syntaxes pour créer des services
- API des directives trop complexe
- API mal conçue nécessitant l'utilisant de fix (`ngModelOptions`)

Notes :



## Points négatifs d'AngularJS

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
class MyDirective {

}
```

Notes :



## Points négatifs d'AngularJS

- API pour créer des services en *AngularJS*

```javascript
//provider, factory, constant et value
app.service('Service', function(){
  var vm = this;
  vm.myMethod = function(){

  }
});
```

- Version Angular 2

```typescript
class Service {

  myMethod(){

  }

}
```
Notes :



## Angular2 - Points Posifitifs

- Environnement de developpement plus simple grâce à *TypeScript*
- Utilisable avec plusieurs languages de programmation : `ES5`, `ES2015`, `TypeScript` et `Dart`
- API plus simple que *AngularJS*
- Seuls trois types d'éléments seront utilisés : `component`, `pipe` et les services
- Basé sur des standards : `Web Component`, `Decorator`, `ES6`, `ES7`
- Nouvelle syntaxe utilisée dans les templates
- Performance de l'API `Change Detection`
- Le Projet `Universal`
- Librairies pour commencer la migration : `ngUpgrade` et `ngForward`
- Collaboration avec Microsoft et Ember

Notes :



## Angular2 - Points Négatifs

- Nouvelle phase d'apprentissage du framework
- Application AngularJS incompatible avec cette nouvelle version
- Faible ecosystème pour l'instant
- Impossible d'utiliser les directives *AngularJS* dans une application *Angular2*
- De nouveaux concepts à apprendre :
  - `Zone`
  - `Observable`
  - `SystemJS`...

Notes :



<!-- .slide: class="page-questions" -->

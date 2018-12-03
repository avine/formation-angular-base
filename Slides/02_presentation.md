# Présentation

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- **[Présentation](#/2)**
- [Démarrer une application Angular](#/3)
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



## Présentation

- Framework créé par *Google* et annoncé en 2014
- Réécriture totale du framework
- Reprend certains concepts d'*AngularJS*
- Première version *beta* annoncée en octobre 2014
- Version *finale* `2.0.0` officielle sortie en septembre 2016
- Dernière version majeure `7.0.0` sortie en octobre 2018
- Programmation orientée *Composant*
- Framework conçu pour être plus performant et optimisé pour les mobiles
- http://angular.io/

Notes :



## Présentation - Numérotation

- Numérotation à partir de 2.0.0 pour se démarquer d'AngularJS
- Respect à partir de là de la norme *semver*
- Les versions majeurs ne seront plus des réécritures comme de la 1 à la 2
- Saut de la version 3.0.0 après le merge du projet *Router* déjà en 3.x
- Planification d'une version majeure tous les 6 mois dans le futur



## Versions

| Version | Date     | Description                                                         |
| :------ | :------: | :------------------------------------------------------------------ |
| 2.0.0   | Sep 2016 | Version finale                                                       |
| 4.0.0   | Mar 2017 | Nouveau moteur de compilation des templates, Modularisation du système d'animations, Intégration du projet Universal, Passage à TypeScript 2.1+ |
| 5.0.0   | Nov 2017 | Amélioration du build (AOT), HttpClient, TypeScript 2.3             |
| 6.0.0   | Mai 2018 | Intégration CLI, Angular Element, Nouveau renderer experimental Ivy |
| 7.0.0   | Oct 2018 | CLI Prompts, Virtual Scroll, Drag and Drop, Angular Element         |
| 8.0.0   | Mar 2019 | ? (Intégration d'Ivy)                                               |



## Points négatifs d'AngularJS

- Différences entre les directives et `ngController`
- Two-way data-binding source de problèmes de performances
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

- Version *Angular* :

```typescript
import { Component, Input} from '@angular/core'
@Component({
  selector: 'my-directive'
})
export class MyDirective {
  @Input() variable:string;
}
```

Notes :



## Points négatifs d'AngularJS - service

- API pour créer des services en *AngularJS*

```javascript
// provider, factory, constant et value
app.service('UserService', function (){
  const vm = this;
  vm.getUsers = function (){

  }
});
```

- Version Angular

```typescript
@Injectable()
export class UserService {
  getUsers(): User[] {
    return [];
  }
}
```
Notes :



## Angular - Points Positifs

- Création d'application modulaire
- Utilisable avec plusieurs langages de programmation : `TypeScript` et `Dart` (projet à part : https://webdev.dartlang.org/)
- API plus simple que *AngularJS*
- Seuls trois types d'éléments seront utilisés : `directive`, `pipe` et les `services`
- Basé sur des standards : `Web Components`, `ES2015+`, `Decorator`
- Nouvelle syntaxe utilisée dans les templates
- Performance de l'API `Change Detection`
- Le Projet `Universal` (rendu côté serveur)
- Librairie pour commencer la migration : `ngUpgrade`
- Collaboration avec Microsoft et Ember

Notes :
- ES2015 et plus ES6 car maintenant il devrait y avoir une spécification chaque année.
- Les prochaines itérations auront moins de contenu



## Angular - Points Négatifs

- Nouvelle phase d'apprentissage du framework si habitué à AngularJS
- Applications AngularJS incompatibles avec cette nouvelle version
- ngUpgrade permet de réutiliser du code AngularJS mais pas de migrer
- De nouveaux concepts à apprendre :
  - `Zone`
  - `Observable`
  - ...

Notes :
- utilisation de directives 1 dans 2 : https://angular.io/guide/upgrade#using-angularjs-component-directives-from-angular-code
- Les nouveaux concepts ne sont pas indispensables à connaître. C'est un plus



## Angular = Une Plateforme

- Angular n'est pas qu'un simple framework
- Intégration Mobile
- Outillage pour faciliter la phase de développement

![plateforme](ressources/platform.png "plateforme")

Notes :



## Architecture

![architecture](ressources/overview2.png "architecture")

Notes :



## Architecture

- Metadata : Configuration pour décrire le fonctionnement d'un composant
- Component : Classe TypeScript qui décrit son comportement
- Template : Code HTML réalisant le rendu à l'aide du component
- Modules : regroupement d'un ensemble de fonctionnalités
- Injector : système d'injection de dépendances d'Angular
- Directive : composant sans template (*ngFor*, *ngIf*, ...)
- Service : Code métier implémenté dans des classes qui seront injectées dans les différents composants

Notes :
- Les définitions de ce slides sont liés au graphique du slide précédent



## Architecture - Exemple complet

- Exemple complet utilisant les différentes briques d'une application Angular

```typescript
import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'my-app',
    template: '{{value | uppercase}}'
})
export class MyComponent{
  value:string;
  constructor(http:Http){
  }
}
```

Notes :



<!-- .slide: class="page-questions" -->

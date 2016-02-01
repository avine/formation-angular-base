# Bonne Pratiques pour une migration heureuse

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
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
- **[Bonne Pratiques pour une migration heureuse](#/15)**

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
    - regroupement par fonctionnalité
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

- Possibilité d'utiliser la nouvelle spécification JavaScript
- Obligation d'ajouter une phase de transpilation
    - *Babel*, *Traceur*, ...
- Fournit de nouvelles syntaxes pour écrire des applications de meilleure qualité

```javascript
class Ctrl {

    constructor() { ... }

    selectBeer() { ... }
}
export { Ctrl }
```

```javascript
import { Ctrl} from './Ctrl';

angular
    .module('app', [])
    .controller('Ctrl', Ctrl);
```

Notes :



<!-- .slide: class="page-questions" -->

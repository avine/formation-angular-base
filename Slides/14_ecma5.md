# Support<br>d'EcmaScript 5

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
- [Bonne Pratiques pour une migration heureuse](#/13)

Notes :



## Angular2 en EcmaScript 5

- Possibilité de développer une application *Angular2* en *EcmaScript 5*
- Syntaxe un peu plus verbeuse que celle de *TypeScript*
- Impossibilité d'utiliser les nouveautés de *EcmaScript 2015* et *TypeScript*
- Remplacement des annotations par des appels à l'objet `ng`
- Pas besoin d'une librairie de gestion de modules

```html

< script src="https://code.angularjs.org/2.0.0-beta.0/angular2-all.umd.dev.js"></ script>

```

Notes :



## Angular2 en EcmaScript 5

- Initialisation de l'application via la méthode `bootstrap` du module `@angular/platform-browser-dynamic`
- Écoute de l'événement `DOMContentLoaded`
- Signature de la méthode `bootstrap` identique à celle utilisée en *TypeScript*

```javascript
< script>
  document.addEventListener('DOMContentLoaded', function () {
    ng.platform.browser.bootstrap(AppComponent);
  });
</ script>
```

Notes :



## Angular2 en ES5 - Les composants

- Création d'un composant  via une fonction constructeur
- Définition des annotations via la propriété `annotations`
- Utilisation du constructeur `ng.core.Component` pour utiliser le décorateur `Component` du module `@angular/core`

```javascript
var AppComponent = function() {};

AppComponent.annotations = [
  new ng.core.Component({
    selector: 'app',
    template: '<h1>Hello Angular2!</h1>'
  })
];
```

Notes :



## Angular2 en ES5 - Les composants

- API **fluide** mise à disposition par le framework
- Chaînage des différentes annotations
- Lecture similaire avec une application *TypeScript*

```javascript
var AppComponent = ng.core
.Component({
  selector: 'app',
  template: '<h1>{{getName()}}</h1>'
})
.Class({
  constructor: function() { },
  getName: function(){}
});
```

Notes :



## Angular2 en ES5

- Syntaxe similaire pour les `services` et les `pipes`
- Toutes les composants du framework sont disponibles via le namespace `ng`
  - `@Directive` -> `ng.core.Directive`
  - `Http` -> `ng.http.Http`
  - `FORM_DIRECTIVES` -> `ng.common.FORM_DIRECTIVES`
  - `Injectable` -> `ng.core.Injectable`

- Injection de Dépendances réalisée via un tableau d'objet dans la méthode `constructor`
  - similaire à *AngularJS*

Notes :



## Angular2 en ES5 - Exemple complet

- Exemple complet d'un composant *Angular2* en *EcmaScript 5*

```javascript
var Service = ng.core.
  Injectable().
  Class({
    constructor: [ng.http.Http, function(http) {  this.http = http; }],
    getFoo: function() { }
  });

var AppComponent = ng.core.
  Component({
    selector: 'app',
    template: '<h1>{{getName()}}</h1>',
    directives: [ng.common.FORM_DIRECTIVES]
  }).
  Class({
    constructor: [Service, ng.core.Attribute('name'), function(Service, name) {
       this.Service = Service;
       this.name = name;
    }],
    getName: function(){}
  });
```

Notes :



<!-- .slide: class="page-questions" -->

# Router

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
- [Les Pipes](#/8)
- [Service HTTP](#/9)

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- **[Router](#/10)**
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)

Notes :



## Router

- Module totalement différent du module `ngRoute`
- `ngRoute` était un module trop simpliste
	- Un seul `ngView` dans l'application
	- Pas de vue imbriquée
- Développement d'un nouveau Router
	- Prise en compte des différents cas d'utilisation : authentification, login, permission, ...
	- Etude des autres solutions : `ui-router`, `route-recognizer` et `durandal`
- Compatible avec *AngularJS* et *Angular2*
- Permet de faciliter la migration d'une application *AngularJS* vers *Angular2*

Notes :



## Router

- Router orienté *composant*
- Association d'un composant principal avec une URL de votre application
- Utilisation du décorateur `@RouteConfig` pour définir la configuration
- Utilisation de la directive `RouterOutlet` pour définir le point d'insertion
- Navigation entre les pages via la directive `RouterLink`

```typescript
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
  directives: [ROUTER_DIRECTIVES]
})
class AppComponent { ... }

bootstrap(AppComponent, [ROUTER_PROVIDERS]);
```

Notes :



## Router - RouteConfig

- Décorateur utilisé pour l'association d'une URL et le composant principal
- Plusieurs types de `RouteDefinition` : `Route`, `AuxRoute`, `AsyncRoute` et `redirect`
- Détection de l'implémentation à utiliser faite par le framework

```typescript
import { RouterConfig } from 'angular2/router';
import { Component } from 'angular2/core';

import { Home } from './components/home';
import { Product } from './components/product';

@RouteConfig([
  { path: '/', component: Home, name: 'Home'}
  { path: '/product', component: Product, name: 'Product',  data: { adminOnly: true } }
  { path: '/other', redirectTo: '/' }
])
@Component({})
class AppComponent { ... }
```

Notes :



## Router - RouterOutlet

- Directive à utiliser via l'attribut `router-outlet`
- Permet de définir le point d'insertion  dans le composant principal
- Le composant sera inséré en tant qu'enfant de l'élément sur lequel la directive `RouterOutlet` est utilisée
- Possibilité de définir la vue via un attribut `name`
- Possibilité de créer des vues enfant grâce à l'utilisation de `RouterOutlet` imbriquées

```typescript
@Directive({selector: 'router-outlet'})
export class RouterOutlet {
  constructor(
    private _elementRef: ElementRef,
    private _loader: DynamicComponentLoader,
    private _parentRouter: routerMod.Router,
    @Attribute('name') nameAttr: string) {
    ...
  }
}
```

Notes :



## Router - RouterOutlet

- Exemple simple de la directives `RouterOutlet`

```typescript
import { RouterConfig } from 'angular2/router';
import { Component } from 'angular2/core';

import { Home } from './components/home';
import { Product } from './components/product';

@RouteConfig([
  { path: '/', component: Home, name: 'Home' }
  { path: '/product', component: Product, name: 'Product' }
])
@Component({
  template: '
    <header><h1>Title</h1></header>
    <router-outlet></router-outlet>
  '
})
class AppComponent { }
```

Notes :



## Router - RouterOutlet imbriquées

- Imbrication de plusieurs `RouterOutlet` pour définir une hiérarchie de vues

```typescript
import { Product } from './components/product';

@RouteConfig([
  { path: '/product/...', component: Product, name: 'product' }
])
@Component({
  template: '<router-outlet></router-outlet>'
})
class AppComponent { }
```

```typescript
import { Child } from './components/child';

@RouteConfig([
  { path: '/', component: Child, name: 'Child', useAsDefault: true }
])
@Component({
  template: '<main><router-outlet></router-outlet></main>'
})
class Product { }
```

Notes :



## Router - RouterLink

- Permet de naviguer d'une route à une autre
- Utilisation de la méthode `navigate` du service `Router`
- La directive `RouterLink` s'attend à un tableau de noms de routes, suivi par d'éventuels paramètres

```typescript
@Component({
  template: '
    <div>
      <h1>Hello {{message}}!</h1>
        <a [routerLink]="['./Home]">Link 1</a>
        <a [routerLink]="['./Product', {productId: 1}]">Link 2</a>
        <router-outlet></router-outlet>
    </div>
'})
@RouteConfig([
  {path: '/', component: Home, as: 'Home'}
  {path: '/product/:productId', component: Product, as: 'Product'}
])
class AppComponent {

}
```

Notes :



## Router - RouterLink avec des vues imbriquées

- Lister les différentes vues nécessaires à la génération de la page cible

```typescript
import { Product } from './components/product';

@RouteConfig([
  { path: '/product/:productId', component: Product, name: 'Product' }
])
@Component({
  template: '
    <a [routerLink]="['./product', {productId: 3}, 'Child']"></a
    <router-outlet></router-outlet>
  '
})
class AppComponent { }
```

```typescript
import { Child } from './components/child';

@RouteConfig([
  { path: '/', component: Child, name: 'Child' }
])
@Component({
  template: '<main><router-outlet></router-outlet></main>'
})
class Product { }
```

Notes :



## Router - RouterLink en détails

- Utilisation via un attribut `routerLink`
- Configuration de la route désirée via ce même attribut `routerLink`
- Attribut `href` généré par le service `Location`
- Ajout d'une classe CSS si la route est déjà active via le service `Router`

```typescript
@Directive{(
  selector: '[routerLink]',
  inputs: ['routeParams: routerLink', 'target: target'],
  host: {
    '(click)': 'onClick()',
    '[attr.href]': 'visibleHref',
    '[class.router-link-active]': 'isRouteActive'
  }
})
export class RouterLink { ...}
```

Notes :



### Router - Stratégies pour le génération des URLs

- `PathLocationStrategy` (stratégie par défaut)
	- Nécessite la définition de l'URL de base de votre application (`APP_BASE_HREF` ou `<base>`)

```typescript
location.go('/foo'); //example.com/my/app/foo
```

- `HashLocationStrategy`

```typescript
location.go('/foo'); //example.com#/foo
```

- Possible de configurer l'implémentation à utiliser

```typescript
import {provide} from 'angular2/core';
import {HashLocationStrategy } from 'angular2/router';

@Component({directives: [ROUTER_DIRECTIVES]})
class AppComponent { ... }

bootstrap(AppComponent, [ ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}) ]);
```

Notes :



### Router - Configuration de l'URL de base de l'application

- Définition d'un nouveau *provider* pour la constante `APP_BASE_HREF`
- Sera utilisé lors de la génération des différentes URLS

```typescript
import {Component} from 'angular2/core';
import {APP_BASE_HREF} from 'angular2/router';

@Component({ ... })
@RouteConfig([
  {...},
])
class AppComponent {

}

bootstrap(AppCmp, [
  provide(APP_BASE_HREF, {useValue: '/my/app'})
]);
```

Notes :



### Router - Récupération des paramètres d'URL

- Utilisation du service `RouteParams`

```typescript
import { Product } from './components/product';

@RouteConfig([{ path: '/product/:productId', component: Product, name: 'Product' }])
@Component({
  template: '
    <a [routerLink]="['./product', {productId: 3}]"></a>
    <router-outlet></router-outlet>
  '
})
class AppComponent { }
```

```typescript
import { Child } from './components/child';

@Component({
  template: '<main><router-outlet></router-outlet></main>'
})
class Product {
  id:string;
  constructor(params: RouteParams) { this.id = params.get('productId'); }
}
```

Notes :



### Router - Cycle de Vie

- Possibilité d'intéragir avec le cycle de vie de la navigation (*Lifecycle Hooks*)
	- @CanActivate/@OnActivate
	- @CanDeactivate/@OnDeactivate
	- @CanReuse/@OnReuse

```typescript
import { RouterConfig } from 'angular2/router';
import { Component } from 'angular2/core';
import { Admin } from './components/home';
import { isLoggedIn } from './utils/is-logged-in';

@RouteConfig([
  { path: '/admin', component: Admin, name: 'Admin',  data: { adminOnly: true }}
])
@Component({ template: '<router-outlet></router-outlet>' })
@CanActivate((next, prev) => return isLoggedIn())
class AppComponent {

}
```

Notes :
- @CanActivate pour gérer les droits
- @OnDeactivate ou @CanDeactivate pour vérifier qu'un formulaire a bien été sauvegardé avant une redirection



<!-- .slide: class="page-questions" -->

# Router

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
- **[Router](#/10)**
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)
- [Angular2 en EcmaScript 5](#/14)

Notes :



## Router

- Module totalement différent du module `ngRoute`
- `ngRoute` était un module trop simpliste
	- Un seul `ngView` dans l'application
	- Pas de vue imbriquée
- Développement d'un nouveau Router
	- Prise en compte des différents cas d'utilisation : authentification, login, permission, ...
	- Etude des autres solutions : `ui-router`, `route-recognizer` et `durandal`
	- 3e implémentation depuis le début de *Angular2*
- Compatible avec *AngularJS* et *Angular2*
- Permet de faciliter la migration d'une application *AngularJS* vers *Angular2*

Notes :



## Router

- Router orienté *composant*
- Association d'un composant principal avec une URL de votre application
- Utilisation d'une méthode `provideRouter` pour définir la configuration
- Utilisation de la directive `RouterOutlet` pour définir le point d'insertion
- Navigation entre les pages via la directive `RouterLink`
- Installation via *NPM* : `npm install --save @angular/router@3.0.0-alpha.3`

```typescript
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  directives: [ROUTER_DIRECTIVES]
})
class AppComponent { ... }
bootstrap(AppComponent);
```

Notes :



## Router - provideRouter

- Méthode permettant d'enregistrer de nouvelles routes
- Elle prend en paramètre un tableau de `RouterConfig`, qui correspond à un tableau de `Route`

```typescript
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { provideRouter, RouterConfig } from '@angular/router';
import { HeroListComponent }     from './hero-list.component';
import { HeroDetailComponent }   from './hero-detail.component';
import { AppComponent }         from './app.component';

export const HeroesRoutes = [
  { path: '/heroes',  component: HeroListComponent },
  { path: '/hero/:id', component: HeroDetailComponent }
];

const routes: RouterConfig = HeroesRoutes;

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

bootstrap(AppComponent, [APP_ROUTER_PROVIDERS]);
```

Notes :



## Router - RouterOutlet

- Directive à utiliser via l'attribut `router-outlet`
- Permet de définir le point d'insertion  dans le composant principal
- Le composant sera inséré en tant qu'enfant de l'élément sur lequel la directive `RouterOutlet` est utilisée
- Possibilité de définir la vue via un attribut `name` (utilisé pour définir plusieurs vues au même niveau)
- Possibilité de créer des vues enfant grâce à l'utilisation de `RouterOutlet` imbriquées

```typescript
@Directive({selector: 'router-outlet'})
export class RouterOutlet {
  constructor(
    private _elementRef: ElementRef,
    private _loader: DynamicComponentLoader,
    private _parentRouter: routerMod.Router,
    @Attribute('name') nameAttr: string) {...}
}
```

Notes :



## Router - RouterOutlet

- Exemple simple de la directives `RouterOutlet`

```typescript
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  template: '
    <header><h1>Title</h1></header>
    <router-outlet></router-outlet>
  ',
	directives: [ROUTER_DIRECTIVES]
})
class AppComponent { }
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
        <a [routerLink]="['/heroes]">Link 1</a>
        <a [routerLink]="['/heroes', {id: 1}]">Link 2</a>
        <router-outlet></router-outlet>
    </div>
'})
class AppComponent {

}
```

Notes :



## Router - RouterOutlet imbriquées

- Imbrication de plusieurs `RouterOutlet` pour définir une hiérarchie de vues

```typescript
import { provideRouter, RouterConfig } from '@angular/router';
import { HeroListComponent }     from './hero-list.component';
import { HeroDetailComponent }   from './hero-detail.component';

export const HeroesRoutes = [
  { path: '/heroes',  component: HeroListComponent, children: [
    {path: '/details', component: DetailsCmp},
    {path: '/movies', component: MoviesCmp}
  ]},
  { path: '/hero/:id', component: HeroDetailComponent }
];

const routes: RouterConfig = HeroesRoutes;

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
```

Notes :



## Router - RouterLink avec des vues imbriquées

- Lister les différentes vues nécessaires à la génération de la page cible

```typescript
import { Product } from './components/product';

@Component({
  template: '
    <a [routerLink]="['/heroes', {}, 'details']"></a>
    <a [routerLink]="['../', {}, 'details']"></a>
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
class Product { }
```

Notes :



## Router - RouterLink en détails

- Utilisation via un attribut `routerLink`
- Configuration de la route désirée via ce même attribut `routerLink`
- Attribut `href` généré par le service `Location`
- Ajout de classes CSS si la route est active (directive `routerLinkActive`)

```typescript
@Directive({selector: '[routerLink]'})
export class RouterLink implements OnChanges {
	@Input() routerLink: any[]|string;
	@HostBinding() href: string;

	ngOnChanges(changes: {}): any { this.updateTargetUrlAndHref(); }

	@HostListener('click', [])
	onClick(): boolean {
		...
		this.router.navigateByUrl(this.urlTree);
		return false;
	}
}
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
import {provide} from '@angular/core';
import {HashLocationStrategy } from '@angular/router';

@Component({directives: [ROUTER_DIRECTIVES]})
class AppComponent { ... }

bootstrap(AppComponent, [ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }]);
```

Notes :



### Router - Configuration de l'URL de base de l'application

- Définition d'un nouveau *provider* pour la constante `APP_BASE_HREF`
- Sera utilisé lors de la génération des différentes URLS

```typescript
import {Component} from '@angular/core';
import {APP_BASE_HREF} from '@angular/router';

@Component({ ... })
@RouteConfig([
  {...},
])
class AppComponent {

}

bootstrap(AppCmp, [
  { provide: APP_BASE_HREF, useValue: '/my/app' }
]);
```

Notes :



### Router - Récupération des paramètres d'URL

- Utilisation du service `RouteParams`

```typescript
import { Product } from './components/product';

@Component({
  template: '
    <a [routerLink]="['/Product', {productId: 3}]"></a>
    <router-outlet></router-outlet>'
})
class AppComponent { }
```

```typescript
import { Child } from './components/child';
import { RouteParams } from "@angular/router";

@Component({
  template: '<main><router-outlet></router-outlet></main>'
})
class Product {
  id:string;
  constructor(activeRoute: ActivatedRoute) {
		const snapshot: ActivatedRouteSnapshot = activeRoute.snapshot;
    this.id = s.params.id;
  }
}
```

Notes :



### Router - Cycle de Vie

- Possibilité d'intéragir avec le cycle de vie de la navigation (*Lifecycle Hooks*)


```typescript
import { HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig, CanActivate } from "@angular/router";
import { Component } from '@angular/core';
import { Admin } from './components/home';
import { isLoggedIn } from './utils/is-logged-in';

@RouteConfig([
  { path: '/admin', component: Admin, name: 'Admin',  data: { adminOnly: true }}
])
@Component({ template: '<router-outlet></router-outlet>' })
@CanActivate((next, prev) => { return isLoggedIn()})
class AppComponent {

}
```

Notes :
- @CanActivate pour gérer les droits
- @OnDeactivate ou @CanDeactivate pour vérifier qu'un formulaire a bien été sauvegardé avant une redirection



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp8" -->

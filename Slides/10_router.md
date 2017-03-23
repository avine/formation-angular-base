# Router

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- [Tests](#/4)
- [Template & Composants](#/5)
- [Les directives](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- **[Router](#/10)**
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Router

- Module totalement différent du module `ngRoute`
- `ngRoute` était un module trop simpliste
	- Un seul `ngView` dans l'application
	- Pas de vue imbriquée
- Développement d'un nouveau Router
	- Prise en compte des différents cas d'utilisation : authentification, login, permission, ...
	- Etude des autres solutions : `ui-router`, `route-recognizer` et `durandal`
	- 3e implémentation depuis le début de *Angular*
- Compatible avec *AngularJS* et *Angular*
- Permet de faciliter la migration d'une application *AngularJS* vers *Angular*

Notes :



## Router

- Router orienté *composant*
- Association d'un composant principal avec une URL de votre application
- Utilisation d'une méthode `RouterModule.forRoot` pour définir la configuration
- Utilisation de la directive `RouterOutlet` pour définir le point d'insertion
- Navigation entre les pages via la directive `RouterLink`
- Installation via *NPM* : `npm install --save @angular/router`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
})
export class AppModule { }
```

Notes :



## Router - forRoot

- Méthode permettant d'enregistrer de nouvelles routes
- Elle prend en paramètre un tableau de `RouterConfig`, qui correspond à un tableau de `Route`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, ContactsComponent, ContactComponent } from './pages';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // path: '/'
  { path: 'contacts',  component: ContactsComponent },
  { path: 'contact/:id', component: ContactComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppModule { }
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
    private elementRef: ElementRef,
    private loader: DynamicComponentLoader,
    private parentRouter: routerMod.Router,
    @Attribute('name') nameAttr: string) {...}
}
```

Notes :



## Router - RouterOutlet

- Exemple simple de la directive `RouterOutlet`

```typescript
import { Component } from '@angular/core';

@Component({
  template: '
    <header><h1>Title</h1></header>
    <router-outlet></router-outlet>
  '
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
        <a [routerLink]="'contacts'">Link 1</a>
        <a [routerLink]="['contact', 1]">Link 2</a>
        <a [routerLink]="['contact', id]">Link 3</a>
        <router-outlet></router-outlet>
    </div>'
})
class AppComponent {
  id: number = 2;
}
```

Notes :



## Router - RouterOutlet imbriquées

- Imbrication de plusieurs `RouterOutlet` pour définir une hiérarchie de vues

```typescript
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent, EditComponent, ViewComponent } from './pages';

export const routes: Routes = [
  { 
    path: 'contact/:id',  component: ContactComponent, children: [
      {path: 'edit', component: EditCmp},
      {path: 'view', component: ViewCmp}
    ]
  }
];

const routing = RouterModule.forRoot(routes);

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
router.navigate(['contacts']); //example.com/my/app/contacts
```

- `HashLocationStrategy`

```typescript
router.navigate(['contacts']); //example.com#/contacts
```

- Possible de configurer l'implémentation à utiliser

```typescript
import {HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppModule { }
```

Notes :



### Router - Configuration de l'URL de base de l'application

- Définition d'un nouveau *provider* pour la constante `APP_BASE_HREF`
- Sera utilisé lors de la génération des différentes URLS

```typescript
import {Component} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }],
})
export class AppModule { }
```

Notes :



### Router - Récupération des paramètres d'URL

- Utilisation du service `ActivatedRoute` et **params** (`Observable`)

```typescript
@Component({
  template: '
    <a [routerLink]="['contact', 1]"></a>
    <router-outlet></router-outlet>'
})
class AppComponent { }
```
```typescript
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '<main><router-outlet></router-outlet></main>'
})
export class ProductComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id']; // (+) conversion 'id' string en number
      ...
    });
  }
}
```

Notes :



### Router - Récupération des paramètres d'URL

- Utilisation du service `ActivatedRoute` et `snapshot`

```typescript
@Component({
  template: '
    <a [routerLink]="['contact', 1]"></a>
    <router-outlet></router-outlet>'
})
class AppComponent { }
```

```typescript
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  template: '<main><router-outlet></router-outlet></main>'
})
export class ProductComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const s: ActivatedRouteSnapshot = this.route.snapshot;
    // Valeur initiale des paramètres
    let id = +s.params.id;
    ...
  }
}
```

Notes :



### Router - Cycle de Vie

- Possibilité d'intéragir avec le cycle de vie de la navigation (*Lifecycle Hooks*)
- Interface `CanActivate` : interdire / autoriser l'accès à une route

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot) {
    if(this.authService.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

// fichier app/application.routes.ts
import { AdminComponent, AuthGuard } from './admin/';
export const AppRoutes: RouterConfig = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
];
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp8" -->

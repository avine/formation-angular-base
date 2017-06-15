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
- [Directives](#/6)
- [Injection de Dépendances](#/7)
- [Pipes](#/8)
- [Service HTTP](#/9)
- **[Router](#/10)**
- [Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Router

- *Angular* fournit par défaut un routeur dans un module dédié
- Fonctionnement très différent de `ngRoute` d'*AngularJS*
- Phase de développement mouvementé : 2 refontes majeurs
- `@angular/router` est maintenant fiable et recommandé
- Propose de nombreuses fonctionnalités
  - Gestion des routes imbriquées
  - Possibilité d'avoir plusieurs points d'insertions par routes
  - Système de **Guard** permettant de gérer l'autorisation à une route
  - Gestion de routes avec chargement asynchrone

Notes :



## Router

- `@angular/router` est orienté *composant*
- Le principe est d'associer les composants à charger en fonction de l'URL
- Association d'un composant principal avec une URL de votre application
- Création de la configuration à partir de la fonction `RouterModule.forRoot`
- Prend en argument un objet de configuration de type `RouterConfig`
- Utilisation de la directive `RouterOutlet` pour définir un point d'insertion
- Navigation entre les pages via la directive `RouterLink`

Notes :



## Router

- `RouterModule.forRoot(...)` rend un module à importer
- Elle prend en paramètre un objet de type `Routes`
- Correspond à un tableau de `Route`

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
  ]
})
export class AppModule { }
```

Notes :



## RouterOutlet

- Directive à utiliser via la balise `router-outlet`
- Permet de définir le point d'insertion dans un composant
- Le composant sera inséré en tant qu'enfant de la directive
- Possibilité de nommer le point d'insertion via un attribut `name`
- Nommer les outlets sert lorsqu'on a plusieurs vue pour une même route

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <header><h1>Title</h1></header>
    <router-outlet></router-outlet>
  `
})
class AppComponent { }
```

Notes :



## RouterLink

- Permet de naviguer d'une route à une autre
- Utiliser des **vrais** liens avec l'attribut href fonctionne aussi
- La directive utilise la méthode `navigate` du service `Router`
- `RouterLink` prend un tableau de **segments** du chemin

```typescript
@Component({
  template: `
    <div>
      <h1>Hello {{ message }}!</h1>
        <a [routerLink]="'contacts'">Link 1</a>
        <a [routerLink]="['contact', 1]">Link 2</a>
        <a [routerLink]="['contact', id]">Link 3</a>
        <router-outlet></router-outlet>
    </div>
  `
})
class AppComponent {
  id: number = 2;
}
```

Notes :



## RouterOutlet imbriquées

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

- Le template du composant `ContactComponent` devra contenir un `router-outlet` pour pouvoir insérer les composants `EditCmp` ou `ViewCmp`

Notes :



## Stratégies pour le génération des URLs

- *@angular/router* propose deux stratégies possible pour les URLs
- Les configurations se font par le système d'injection de dépendances

- `PathLocationStrategy` (stratégie par défaut)

```typescript
router.navigate(['contacts']); //example.com/contacts
```

- `HashLocationStrategy`

```typescript
router.navigate(['contacts']); //example.com#/contacts
```

- `PathLocationStrategy` est la solution recommandée aujourd'hui
  - Si votre application n'est pas déployé à la racine de votre domaine
  - Nécessite d'ajouter un paramétrage : `APP_BASE_HREF`

Notes :



## Stratégies pour le génération des URLs

- Configurer l'implémentation à utiliser

```typescript
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule { }
```

- Configurer le contexte de l'application pour `PathLocationStrategy`

```typescript
import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }],
})
export class AppModule { }
```

Notes :



## Récupération des paramètres d'URL

- Utilisation du service `ActivatedRoute` et `params`
- L'API est sous forme d'un flux de la valeur des paramètre au cours du temps

```typescript
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  template: "<main><router-outlet></router-outlet></main>"
})
export class ProductComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      const id = Number(params.id); // Les paramètres sont toujours des string
      /* ... */
    });
  }
}
```

Notes :



## Récupération des paramètres d'URL

- Si vous êtes sur que le paramètre ne pourra pas changer
- La propriété `snapshot` donne les valeurs à un instant T

```typescript
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  template: '<main><router-outlet></router-outlet></main>'
})
export class ProductComponent {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    const id = Number(snapshot.params.id);
    /* ... */
  }
}
```

Notes :



## Cycle de Vie

- Possibilité d'intéragir avec le cycle de vie de la navigation
- Interface `CanActivate` permet d'interdire ou d'autoriser l'accès à une route

```typescript
import { Injectable } from '@angular/core';
import {
  CanActivate, Router, Routes, ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { AdminComponent } from './admin.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(this.authService.isLoggedIn()) return true;
    this.router.navigate([ '/login' ]);
    return false;
  }
}

export const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [ AuthGuard ] }
];
```

Notes :



## Lazy Loading

- Permet de diviser la taille du **bundle** JavaScript à charger pour démarrer
- Chaque section du site est isolé dans un `NgModule` différent
- Le module est chargé lorsque l'utilisateur visitera une de ses pages
- Création automatique de `chunk` via *Webpack* grâce à *@angular/cli*
- Configuration du router avec la propriété `loadChildren`
- Bien séparer les éléments (composants, services) de chaque module
- Plusieurs stratégies de chargement
  - `PreloadAllModules` : Pré-charge les modules dès que possible
  - `NoPreloading` : Chargement lors d'une navigation (stratégie par défaut)

Notes :



### Lazy Loading

- Chargement à la demande du module `AdminModule`

```typescript
const routes: Routes = [{
  path: 'admin', loadChildren: './admin/admin.module#AdminModule'
}];

@NgModule({ imports: [ RouterModule.forRoot(routes) ] })
export class AppModule { }
```

- Configuration des routes d'`AdminModule` via la méthode `forChild`

```typescript
const adminRoutes: Routes = [{
  {path: '', component: HomeComponent},
  {path: 'users', component: AdminUsersComponent}
}];

@NgModule({
  declarations: [ AdminHomeComponent, AdminUsersComponent ],
  imports: [ RouterModule.forChild(adminRoutes) ]  
})
export class AdminModule { }
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp8" -->

# Router

<!-- .slide: class="page-title" -->

Notes:



## Summary

<!-- .slide: class="toc" -->

- [Reminders](#/1)
- [Presentation](#/2)
- [Start an Angular application](#/3)
- [Tests](#/4)
- [Template & Components](#/5)
- [Guidelines](#/6)
- [Dependency Injection](#/7)
- [Pipes](#/8)
- [HTTP Service](#/9)
- ** [Router](#/10) **
- [Forms](#/11)
- [Server-side Rendering](#/12)

Notes:



## Router

- * Angular * by default provides a router in a dedicated module
- Very different operation of `ngRoute` from * AngularJS *
- Phase of turbulent development: 2 major redesigns
- `@angular/router` is now reliable and recommended
- Offers many features
  - Management of nested roads
  - Possibility to have several points of insertions by roads
  - ** Guard ** system to manage the authorization to a road
  - Management of routes with asynchronous loading

Notes:



## Router

- `@angular/router` is oriented * component *
- The principle is to associate the components to be loaded according to the URL
- Association of a main component with a URL of your application
- Creating the configuration from the `RouterModule.forRoot` function
- Take as argument a `RouterConfig` configuration object
- Using the `RouterOutlet` directive to set an insertion point
- Navigate between pages via the `RouterLink` directive

Notes:



## Router

- `RouterModule.forRoot (...)` makes a module to import
- It takes as parameter an object of type `Roads`
- Matches an array of `Road`

```Typescript
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent, ContactsComponent, ContactComponent} from './pages';

const routes: Routes = [
  {path: '', component: HomeComponent}, // path: '/'
  {path: 'contacts', component: ContactsComponent},
  {path: 'contact /: id', component: ContactComponent}
];

@NgModule ({
  imports: [
    RouterModule.forRoot (roads)
  ]
})
export class AppModule {}
```

Notes:



## RouterOutlet

- Directive to use via the `router-outlet` tag
- Set the insertion point in a component
- The component will be inserted as a child of the directive
- Ability to name the insertion point via a `name` attribute
- Naming outlets is useful when you have multiple views for the same road

```Typescript
import {Component} from '@angular/core';

@Component ({
  template: `
    <Header> <h1> Title </ h1> </ header>
    <Route-outlet> </ router-outlet>
  `
})
export class AppComponent {}
```

Notes:



## RouterLink

- Allows you to navigate from one road to another
- Using ** true ** links with the href attribute also works
- The directive uses the `route` method of the` Router` service
- `RouterLink` takes an array of ** segments ** of the path

```Typescript
@Component ({
  template: `
    <Nav>
      <Ul>
        <li> <a routerLink="contacts"> Link 1 </a> </ li>
        <li> <a [routerLink]="['contact', 1]"> Link 2 </a> </ li>
        <li> <a [routerLink]="['contact', id]"> Link 3 </a> </ li>
      </ Ul>
    </ Nav>
    <Route-outlet> </ router-outlet>
  `
})
export class AppComponent {
  id = 2;
}
```

Notes:



## Nested RouterOutlet

- Nesting multiple `RouterOutlet` to define a hierarchy of views

```Typescript
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent, EditComponent, ViewComponent} from './pages';

const routes: Routes = [
  {
    path: 'contact /: id', component: ContactComponent, children: [
      {path: 'edit', component: EditCmp},
      {path: 'view', component: ViewCmp}
    ]
  }
];

const routing = RouterModule.forRoot (routes);
```

- The `ContactComponent` component template must contain a` router-outlet` in order to insert the `EditCmp` or` ViewCmp` components

Notes:



## Strategies for generating URLs

- * @angular/router * offers two possible strategies for URLs
- The configurations are done by the system of injection of dependencies

- `PathLocationStrategy` (default policy)

```Typescript
router.navigate ([ 'contacts']); //example.com/contacts
```

- `HashLocationStrategy`

```Typescript
router.navigate ([ 'contacts']); //example.com#/contacts
```

- `PathLocationStrategy` is the recommended solution today
  - If your application is not deployed to the root of your domain
  - Need to add a parameter: `APP_BASE_HREF` or the` base href = '/'> `tag in your` index.html`

Notes:



## Strategies for generating URLs

- Configure the implementation to use

```Typescript
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule ({
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule {}
```

- Configure the context of the application for `PathLocationStrategy`

```Typescript
import {Component} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

@NgModule ({
  providers: [{provide: APP_BASE_HREF, useValue: '/ my/app'}],
})
export class AppModule {}
```

Notes:



## Retrieving URL parameters

- Using the `ActivatedRoute` and` params` service
- The API is in the form of a flow of the value of the parameters over time

```Typescript
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component ({
  template: "<main> <router-outlet> </ router-outlet> </ main>"
})
export class ProductComponent implements OnInit {
  constructor (private route: ActivatedRoute) {}

  ngOnInit () {
    this.route.params.subscribe ((params: Params): void => {
      const id = Number (params.id); // The parameters are always string
      / * ... * /
    });
  }
}
```

Notes:



## Retrieving URL parameters

- If you are sure that the parameter can not change
- The `snapshot` property gives values ​​at a time T

```Typescript
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component ({
  template: '<main> <router-outlet> </ router-outlet> </ main>'
})
export class ProductComponent {
  constructor (private route: ActivatedRoute) {}

  ngOnInit (): void {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    const id = Number (snapshot.params.id);
    / * ... * /
  }
}
```

Notes:



## Life cycle

- Ability to interact with the life cycle of the navigation
- CanActivate interface allows to prohibit or to authorize the access to a road

```Typescript
import {Injectable} from '@angular/core';
import {
  CanActivate, Router, Routes, ActivatedRouteSnapshot, UrlTree
} from '@angular/router';
import {AuthService} from './auth.service';
import {AdminComponent} from './admin.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router) {}
  canActivate (route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn ()) return true;
    return this.router.parseUrl ('/ login');
  }
}

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
];
```

Notes:



## Lazy Loading

- Allows to divide the size of the ** bundle ** JavaScript to load to start
- Each section of the site is isolated in a different `` NgModule``
- The module will be loaded when the user will visit one of its pages
- Automatic creation of `chunk` via * Webpack * thanks to * @angular/cli *
- Configuring the router with the `loadChildren` property
- Separate the elements (components, services) of each module
- Several loading strategies
  - `PreloadAllModules`: Pre-load the modules as soon as possible
  - `NoPreloading`: Loading during a navigation (default strategy)

Notes:



### Lazy Loading

- Load on demand of the `AdminModule` module

```Typescript
const routes: Routes = [{
  path: 'admin', loadChildren: './admin/admin.module#AdminModule'
}];

@NgModule ({imports: [RouterModule.forRoot (routes)]})
export class AppModule {}
```

- Configuring `AdminModule` routes through the` forChild` method

```Typescript
const adminRoutes: Roads = [{
  {path: '', component: HomeComponent},
  {path: 'users', component: AdminUsersComponent}
}];

@NgModule ({
  declarations: [AdminHomeComponent, AdminUsersComponent],
  imports: [RouterModule.forChild (adminRoutes)]
})
export class AdminModule {}
```

Notes:



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp8" -->

# Router

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Getting started with Angular](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Directives](#/6)
- [Services](#/7)
- [Pipes](#/8)
- [Http](#/9)
- **[Router](#/10)**
- [Forms](#/11)

Notes :



## Router

- In simple terms, the router allows to:
  - Display different views
  - At a defined insertion point
  - Depending on the browser's URL

- The Angular router offers many features:
  - Nested routes management
  - Possibility to have multiple insertion points
  - Guards system to allow/deny route access
  - Asynchronous views loading

- To use the router in your app, import the following module in your `AppModule`:

```ts
import { RouterModule } from `@angular/router`;
```

Notes :



## Router

- The router is *Component* oriented

- The principle is to associate the components to be loaded according to the URL

In a nutshell, you need to:

- Use the `RouterModule.forRoot` function to add routing capabilities to your app

- Use the `RouterOutlet` directive to define the insertion point

- Navigate between pages via the `RouterLink` directive

Notes :



## Router

- Here's an example:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact/:id', component: ContactComponent }
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
})
export class AppModule {}
```

Notes :



## Router - RouterOutlet

- Directive to use via the `<router-outlet />` element
- Defines the insertion point
- Ability to name the insertion point via a `name` attribute
- Naming outlets is useful when you have multiple views to display for the same route

```ts
import { Component } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `
    <header>My Awesome App</header>
    <router-outlet></router-outlet>
    <footer>Copyright Zenika</footer>
  `
})
export class AppComponent {}
```

Notes :



## Router - RouterLink

- Allows you to navigate from one route to another
- `RouterLink` takes an array of path **segments**
  - Segments are then concatenated to form the URL

```ts
@Component ({
  selector: 'app-root',
  template: `
    <nav>
      <ul>
        <li><a routerLink="/contacts/1"> Link 1 </a></li>
        <li><a [routerLink]="['/contact', 2]"> Link 2 </a></li>
        <li><a [routerLink]="['/contact', id]"> Link 3 </a></li>
      </ul>
    </nav>
    <route-outlet />
  `
})
export class AppComponent {
  id = 3;
}
```

Notes :



## Router - Nested RouterOutlet

- Nesting multiple `RouterOutlet` to define a hierarchy of views

```ts
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contact/:id',
    component: ContactComponent,
    children: [
      { path: 'view', component: ViewContactComponent },
      { path: 'edit', component: EditContactComponent },
    ],
  },
];

RouterModule.forRoot(routes);
```

- The `ContactComponent` component template must contain a `<router-outlet />` element
  in order to insert the `ViewContactComponent` or `EditContactComponent` components.

Notes :



## Router - Strategies for generating URLs

- *@angular/router* offers two possible strategies for URLs
- The configurations are done by the system of injection of dependencies

- `PathLocationStrategy` (default policy)

```ts
router.navigate(['contacts']); // -> http://example.com/contacts
```

- `HashLocationStrategy`

```ts
router.navigate(['contacts']); // -> http://example.com/#/contacts
```

- `PathLocationStrategy` is the recommended solution today

- If your application is not deployed to the root of your domain
  - Need to add a parameter: `APP_BASE_HREF` or the `<base href='/'>` tag in your `index.html`

Notes :



## Router - Strategies for generating URLs

- Configure the implementation to use

```ts
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule ({
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {}
```

- Configure the base url of the application (if different from `/`)

```ts
import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@NgModule ({
  providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }],
})
export class AppModule {}
```

Notes :



## Router - Retrieving URL parameters

- Using the `ActivatedRoute` and `params` service
- The API is in the form of a flow of the value of the parameters over time

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component ({
  template: '<main> <router-outlet /> </main>'
})
export class ContactComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = Number(params.id); // The parameters are always string
      //...
    });
  }
}
```

Notes :



## Router - Retrieving URL parameters

- If you are sure that the parameter can not change
- The `snapshot` property gives values ​​at a time T

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component ({
  template: '<main> <router-outlet/> </main>'
})
export class ContactComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    const id = Number(snapshot.params.id);
    //...
  }
}
```

Notes :



## Router - Guards

- Ability to interact with the lifecycle of the navigation
- CanActivate interface allows to prohibit or to authorize the access to a route

```ts
import { Injectable } from '@angular/core';
import {
  CanActivate, Router, Routes, ActivatedRouteSnapshot, UrlTree
} from '@angular/router';
import { AuthService } from './auth.service';
import { AdminComponent } from './admin.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.authService.isLoggedIn()) return true;
    return this.router.parseUrl('/login');
  }
}

const routes: Routes = [{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }];
```

Notes :



## Router - Lazy Loading

- Allows to divide the size of the **bundle** JavaScript to load to start
- Each section of the site is isolated in a different `NgModule`
- The module will be loaded when the user will visit one of its pages
- Automatic creation of `chunk` via *Webpack* thanks to *@angular/cli*
- Configuring the router with the `loadChildren` property
- Separate the elements (components, services) of each module
- Several loading strategies
  - `PreloadAllModules`: Pre-load the modules as soon as possible
  - `NoPreloading`: Loading during a navigation (default strategy)

Notes :



### Router - Lazy Loading

- Load on demand of the `AdminModule` module

```ts
const routes: Routes = [{
  path: 'admin', 
  loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
}];

@NgModule ({ imports: [RouterModule.forRoot(routes)] }) export class AppModule {}
```

- Configuring `AdminModule` routes through the `forChild` method

```ts
const adminRoutes: Routes = [{
  { path: '', component: AdminHomeComponent },
  { path: 'users', component: AdminUsersComponent }
}];

@NgModule ({
  declarations: [AdminHomeComponent, AdminUsersComponent],
  imports: [RouterModule.forChild(adminRoutes)]
})
export class AdminModule {}
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp8" -->

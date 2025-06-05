# Routing

<!-- .slide: class="page-title" -->



## Summary

<div class="col-left-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)

</div>
<div class="col-right-50">

- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- **Routing**
- [Forms](#/13)
- [Appendix](#/14)

</div>

Notes :



## Routing

In a single-page app, you change what the user sees by showing or hiding portions of the display that correspond to particular components, rather than going out to the server to get a new page

- The Angular router allows to
  - display different **views**
  - at a defined **insertion point**
  - depending on the **browser's URL**

- By default, the router is already provided in the `app.config.ts` file

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

Notes :



## Routing - Routes

- Define the routes of you app by associating different **components** to different **paths** in `app.routes.ts` file

- Define path **parameters** using the syntax `:paramName`

- Catch unknown paths using **wildcard** route `**`
  - and then redirect to a known path or display a dedicated "Not found" page

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'contacts', component: ContactListComponent },

  { path: 'contacts/:id', component: ContactComponent },

  { path: '**', redirectTo: '/' },                     // <-- Option 1. Redirect to home page
  // { path: '**', component: PageNotFoundComponent }, // <-- Option 2. Display "Not found" page
];
```

Notes :



## Routing - RouterOutlet

- Define the insertion point using the `<router-outlet />` directive

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component ({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <header>My Awesome App</header>

    <router-outlet />

    <footer>Copyright Zenika</footer>
  `
})
export class AppComponent {}
```

Notes :



## Routing - RouterLink 1/3

- Navigate between views using the `routerLink` directive

```ts
@Component ({
  selector: 'app-nav',
  template: `
    <a routerLink="/"> Home </a>

    <a routerLink="/contacts"> Contact list </a>

    <a routerLink="/contacts/1"> Contact 1 </a>

    <a [routerLink]="['/contacts', id]"> Contact {{ id }} </a>
  `
})
export class NavComponent {
  id = 2;
}
```

Notes :



## Routing - RouterLink 2/3

- Use `routerLinkActive` input to specify one or more CSS classes to be added when the linked route is active

```ts
@Component ({
  selector: 'app-nav',
  template: `
    <a routerLink="/" routerLinkActive="link-active"> Home </a>

    <a routerLink="/contacts" routerLinkActive="link-active"> Contact list </a>

    <a routerLink="/contacts/1" routerLinkActive="link-active"> Contact 1 </a>
  `,
  styles: `.link-active { color: blue }`,
})
export class NavComponent {}
```

Notes :



## Routing - RouterLink 3/3

- Use `routerLinkActiveOptions` input to add the classes only when the URL matches the link exactly

```ts
@Component ({
  selector: 'app-nav',
  template: `
    <a
      routerLink="/"
      [routerLinkActive]="['link-active']"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      Home
    </a>
  `,
  styles: `.link-active { color: blue }`,
})
export class NavComponent {}
```

Notes :



## Routing - Router service

- Use the `Router` service to navigate programmatically on the component class side

```ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-root',
  template: '<button (click)="navigate()">Go to contact list</button>'
})
export class AppComponent {
  private router = inject(Router);

  protected navigate() {
    this.router.navigate(['/contacts']); // Same as <a [routerLink]="['/contacts']">Contacts</a>
  }
}
```

😉 *Whenever possible, prefer using the `routerLink` directive on the component template side*

Notes :



## Routing - ActivatedRoute

- Use the `ActivatedRoute` service to observe route parameters

```ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component ({
  template: 'Contact ID: {{ id }} (dynamic).'
})
export class ContactComponent {
  private activatedRoute = inject(ActivatedRoute);

  id!: number;

  constructor() {
    this.activatedRoute.params.pipe(takeUntilDestroyed()).subscribe((params: Params) => {
      this.id = Number(params['id']); // note: route parameters are always of type `string`
    });
  }
}
```

😉 *Note that `params` is an RxJS Observable*

Notes :



## Routing - ActivatedRoute | Snapshot

- Use the `ActivatedRoute` snapshot to retrieve route parameters once

```ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component ({
  template: 'Contact ID: {{ id }} (static).'
})
export class ContactComponent {
  private activatedRoute = inject(ActivatedRoute);

  id = Number(this.activatedRoute.snapshot.params['id']);
}
```

Notes :



## Routing - With component input binding 1/2

*Using `ActivatedRoute` requires the understanding of observables*

- Use `withComponentInputBinding()` in the router configuration to enable binding information from the router state directly to the component's inputs

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
  ],
};
```

Notes :



## Routing - With component input binding 2/2

- Define a **route parameter** named `id`

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'contacts/:id', component: ContactComponent }
];
```

- In the routed view, define a **component input** with the same name

```ts
import { Component, inject, input, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component ({
  template: 'Contact ID: {{ id }} (dynamic).'
})
export class ContactComponent {
  private activatedRoute = inject(ActivatedRoute);

  id = input.required<number>({ transform: numberAttribute });
}
```

Notes :



## Routing - Nested routes

- Use the `children` property to define nested views

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts/:id',
    component: ContactComponent,
    children: [
      { path: 'view', component: ViewContactComponent },
      { path: 'edit', component: EditContactComponent },
    ],
  },
];
```

*In this example, we assume that the template of the `ContactComponent` component contains the nested `<router-outlet />` directive*

Notes :



## Routing - Route title

- Use the `title` property to define a unique title for each route, so that they can be identified in the browser history

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'contacts',
    component: ContactListComponent,
    title: 'Contacts',
  },
];
```

Notes :



## Routing - Guards

- Use route guards to **prevent users from navigating** to parts of an application **without authorization**

- Available route guards
  - `canActivate`
  - `canActivateChild`
  - `canDeactivate`
  - `canMatch`
  - `resolve`

*In this training, we wil focus on `canActivate` and `canMatch` guards*

Notes :



## Routing - Guards | Can activate

- Define the guard by implementing the `CanActivateFn` interface

```ts
import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { ContactService } from './contact.service';

export const contactGuard: CanActivateFn = (snapshot: ActivatedRouteSnapshot) => {

  const id = snapshot.params['id']; // <-- Remember that the route path was: 'contacts/:id'

  return inject(ContactService).isAllowed(Number(id));
};
```

- Add the guard to the `canActivate` route configuration

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'contacts/:id', component: ContactComponent, canActivate: [contactGuard] }
];
```

Notes :



## Routing - Guards | Can match

- Define the guard by implementing the `CanMatchFn` interface

```ts
import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { ContactService } from './contact.service';

export const contactGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {

  const id = segments.at(1)?.path; // <-- Remember that the route path was: 'contacts/:id'

  return inject(ContactService).isAllowed(Number(id));
};
```

- Add the guard to the `canMatch` route configuration

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'contacts/:id', component: ContactComponent, canMatch: [contactGuard] }
];
```

Notes :



## Routing - Guards | Difference in behaviour

- `canActivate: [...]`
  - If all guards return `true`, navigation continues
  - If any guard returns `false`, navigation is **cancelled**

- `canMatch: [...]`
  - If all guards return `true`, navigation continues
  - If any guard returns `false`, navigation is **skipped** for matching and **next route configurations are processed** instead

Notes :



## Routing - Guards | Redirect command

- The guard can eventually return a `RedirectCommand` to instruct the Router to redirect rather than continue processing the current path

- This is particularly usefull when a navigation is cancelled by a `canActivate` guard

```ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';

export const contactGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!inject(AuthService).isLoggedIn()) {
    const loginPath = router.parseUrl('/login');
    return new RedirectCommand(loginPath, { skipLocationChange: true });
  }

  return true;
};
```

Notes :



## Routing - Lazy Loading 1/3

- Configure your routes to lazy load modules using `loadComponent`

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',

    // Use lazy-loaded JavaScript module...
    loadComponent: () => import('./contact-list/contact-list.component.ts').then(
      (module) => module.ContactListComponent
    ),

    // ...instead of eagerly-loaded component
    /* component: ContactListComponent, */
  },
];
```

Notes :



## Routing - Lazy Loading 2/3

- Use `default` export to get rid of `.then((module) => ...)` part

```ts
@Component({
  selector: 'app-contact-list',
  template: `...`,
})
export class ContactListComponent {}

export default ContactListComponent;
```

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',
    loadComponent: () => import('./contact-list/contact-list.component.ts'),
  },
];
```

Notes :



## Routing - Lazy Loading 3/3

- Lazy load routes using `loadChildren`

```ts
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.routes.ts'),
  },
];
```

```ts
// src/app/contacts/contacts.routes.ts
import { Routes } from '@angular/router';

export default [
  { path: '', component: ContactListComponent },
  { path: ':id', component: ContactComponent },
] satisfies Routes;
```

Notes :



## Routing - Questions
<!-- .slide: data-background-image="/resources/background-questions.svg" data-background-size="45%" -->



## Routing - Lab 11
<!-- .slide: data-background-image="/resources/background-lab.svg" data-background-size="45%" -->

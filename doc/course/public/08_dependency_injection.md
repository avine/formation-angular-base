# Dependency injection

<!-- .slide: class="page-title" -->



## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)

</div>
<div class="column-50">

- [Signals](#/8)
- **Dependency injection**
- [Pipes](#/10)
- [Http client](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>
</div>

Notes :



## Dependency injection - In a nutshell

- A broad category encompassing any value or feature that an application needs

```ts
import { ApplicationConfig, Component, inject } from '@angular/core';

export class ApiService {                         // <-- 1. Defining
  fetchMsg() { return { data: 'Hello World!' }; }
}

export const appConfig: ApplicationConfig = {
  providers: [ApiService],                        // <-- 2. Providing
};

@Component({
  selector: 'app-root',
  template: '<h1>{{ msg.data }}</h1>',
})
export class App {
  private apiService = inject(ApiService);        // <-- 3. Injecting
  msg = this.apiService.fetchMsg();               // <-- 4. Consuming
}
```

Notes :



## Dependency injection - Injectable

- If a service has dependencies, use the `@Injectable` decorator to enable dependency injection for the service itself
- This is only required if you are using "Constructor-based dependency injection"

```ts
import { Injectable, ApplicationConfig } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

@Injectable()
export class ApiService {
  // `HttpClient` is a dependency of `ApiService` and requires `@Injectable` decorator
  constructor(private httpClient: HttpClient) {}

  fetchMsg() {
    return this.httpClient.get('/api/msg');
  }
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), ApiService],
};
```

Notes :



## Dependency injection - Injectable | providedIn

- Use `providedIn` metadata to **provide a service globally** right from its definition
- This is usefull even for "Function-based dependency injection"

```ts
import { Injectable, ApplicationConfig } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  // <-- `ApiService` is automatically provided at `ApplicationConfig` level
})
export class ApiService {
  private httpClient = inject(HttpClient);

  fetchMsg() {
    return this.httpClient.get('/api/msg');
  }
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch())],  // <-- No need to provide `ApiService` manually anymore!
};
```

Notes :



## Dependency injection - Component providers 

- Use `providers` metadata of the component decorator to **provide a service locally**
- The service lifecycle (creation and destruction) follows the component lifecycle
- A service provided in a component can also be injected into its child components

```ts
@Component ({
  selector: 'app-parent',
  providers: [ParentService],
  imports: [Child],
  template: '<app-child />',
})
export class Parent {
  parentService = inject(ParentService);
}

@Component ({ selector: 'app-child', template: '...' })
export class Child {
  parentService = inject(ParentService); // Get the service from the `Parent` component injector
}
```

Notes :



## Dependency injection - Injectors

- Responsible for providing dependencies to components, services, ...
- An application can have more than one injector, but **within an injector every dependency is a singleton**

```ts
import { Component, Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService { data?: string; }

@Component({ selector: 'app-setter', template: '...', })
export class Setter {
  constructor() { inject(DataService).data = 'Hello World!'; }
}

@Component({ selector: 'app-getter', template: '<h1>{{ data }}</h1>' })
export class Getter {
  private dataService = inject(DataService);

  get data() { return this.dataService.data; } // <-- 'Hello World!' 
}
```

Notes :



## Dependency injection - Injectors hierarchy

- During a dependency injection
  - the local injector tries to **find a compatible provider**
  - if it can't find one, it forwards the request to its **parent injector**
  - and so on up to the application's **main injector**
  - if no provider can be found, Angular **throws an error**

- In a typical Angular application, **most services are provided globally** at the application configuration level

- However, it is sometimes useful to **delegate part of a component's logic to a dedicated service**, which is then **provided at the component level itself**

Notes :



## Dependency injection - Providers | ClassProvider

- So far we've provided services by adding them to the `provider` array

```ts
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [ApiService],
};
```

- It is in fact a shorthand of the class provider, whose full syntax is

```ts
import { ApplicationConfig, ClassProvider } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    { 
      provide: ApiService, 
      useClass: ApiService
    }
  ] satisfies ClassProvider,
};
```

Notes :
The full syntax is very useful when, for example, you need to mock your dependencies in your tests, as will be shown at the end of the chapter.



## Dependency injection - Providers | ValueProvider

- Use `InjectionToken` and `ValueProvider` to provide primitive values (such as `string`, `number`, ...)

```ts
import {
  InjectionToken, ValueProvider, ApplicationConfig, Component, inject
} from '@angular/core';

const APP_TITLE = new InjectionToken<string>('app title');

const appTitleProvider: ValueProvider = { provide: APP_TITLE, useValue: 'My Awesome App' };

export const appConfig: ApplicationConfig = {
  providers: [appTitleProvider],
};

@Component({ /* ... */ })
export class App {
  appTitle = inject(APP_TITLE); // <-- 'My Awesome App'
}
```

In the next chapter on `Pipe`s, you'll see how Angular uses `InjectionToken`s

*😉 Note that there's also a `FactoryProvider`, but its study goes beyond the scope of this course*

Notes :



## Dependency injection - App Initializer

- Use an "app initializer" when you need asynchronous data to be available before the application is bootstrapped
- If needed, you can `inject` dependencies into the initializer

```ts
import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { Observable } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer((): Observable<unknown> | Promise<unknown> | void => {
      // In this example, we restore the user's status before bootstrapping the application
      return inject(UserService).fetchUser();
    })
  ],
};
```

Notes :

Without the initializer, the user's status would have 3 possible values: "unknown", "not authenticated", "authenticated".

Thanks to the initializer, the user can no longer be "unknown", once the app is bootstrapped.



## Dependency injection - Testing in isolation

- You can configure the providers in your `TestBed`
- Powerful mechanism that isolates the element you really want to test
- Use `TestBed.inject` to access the service instance in your test

In the following example, we test a component in isolation, replacing the service with a Mock:

```ts
import { TestBed } from '@angular/core/testing';

describe('App', () => {
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: ApiService, useClass: ApiServiceMock }],
    }).compileComponents();

    apiService = TestBed.inject(ApiService); // <-- Get the `ApiServiceMock`
  });
});
```

Notes :



## Dependency injection - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->



## Dependency injection - Lab 8
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

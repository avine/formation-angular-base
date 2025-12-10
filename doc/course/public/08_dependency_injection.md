# Dependency injection

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [TypeScript](#/3)
- [Components](#/4)
- [Testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)
- [Signals](#/8)

</div>
<div class="column-50">

- **Dependency injection**
- [Pipes](#/10)
- [RxJS](#/11)
- [HTTP client](#/12)
- [Routing](#/13)
- [Forms](#/14)
- [More on Components](#/15)

</div>
</div>

<!-- separator-vertical -->

## Dependency injection - In a nutshell

- A broad category encompassing any value or feature that an application needs

```ts
import { ApplicationConfig, Component, inject } from '@angular/core';

export class ApiService {                         // <-- 1. Defining
  getData() { return 'Hello World!'; }
}

export const appConfig: ApplicationConfig = {
  providers: [ApiService],                        // <-- 2. Providing
};

@Component({
  selector: 'app-root',
  template: '<h1>{{ data }}</h1>',
})
export class App {
  private apiService = inject(ApiService);        // <-- 3. Injecting

  data = this.apiService.getData();               // <-- 4. Consuming
}
```

<!-- separator-vertical -->

## Dependency injection - Injectable decorator

- Use `@Injectable` decorator and `providedIn` metadata to **provide a service globally** right from its definition

```ts
import { Injectable, ApplicationConfig } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // <-- Instruct Angular to provide the service automatically (if used by the app)
})
export class ApiService {
  getData() { return 'Hello World!'; }
}

export const appConfig: ApplicationConfig = {
  providers: [],      // <-- Therefore, it is no longer necessary to provide it manually!
};
```

<!-- separator-vertical -->

## Dependency injection - Injectors & Singleton 1/3

- Injectors are responsible for **providing dependencies** to any part of the application (components, services, ...)
- An application can have more than one injector:
  - the `providers` array in the `ApplicationConfig` object is the main injector...
  - ...but dependencies can be **provided at other levels** _(more details below)_
- The important point is that **within an injector every dependency is a singleton**

```ts
import { Component, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',                                 // <-- Providing globally
})
export class DataService {
  data = signal<string | undefined>(undefined);       // <-- Defining property
}

// ...
```

<!-- separator-vertical -->

## Dependency injection - Injectors & Singleton 2/3

```ts
// ...

@Component({
  selector: 'app-data-setter',
  template: '<button (click)="setData()">Set data</button>',
})
export class DataSetter {
  private dataService = inject(DataService);          // <-- Injecting

  protected setData() {
    this.dataService.data.set('Hello World!');        // <-- Setting property in one place
  }
}

// ...
```

<!-- separator-vertical -->

## Dependency injection - Injectors & Singleton 3/3

```ts
// ...

@Component({
  selector: 'app-data-getter',
  template: '<h1>{{ data() }}</h1>',                  // <-- output: Hello World!
})
export class DataGetter {
  private dataService = inject(DataService);          // <-- Injecting

  protected data = this.dataService.data;             // <-- Getting modified property in another place
}
```

😉 *In this example, `DataSetter` and `DataGetter` components share the same `DataService` instance*

- Services allow **data** to be **shared** between any parts of the application (components, services, ...)

<!-- separator-vertical -->

## Dependency injection - Injectors hierarchy

- During a dependency injection
  - the local injector tries to **find a compatible provider**
  - if it can't find one, it forwards the request to its **parent injector**
  - and so on up to the application's **main injector**
  - if no provider can be found, Angular **throws an error**

- In a typical Angular application, **most services are provided globally** at the application configuration level

- However, it is sometimes useful to **delegate part of a component's logic to a dedicated service**, which is then **provided at the component level itself**

<!-- separator-vertical -->

## Dependency injection - Component providers

- Use the `providers` array in the component decorator metadata to manually **provide a service locally**
  - The service lifecycle (creation and destruction) follows the component lifecycle
  - A service provided in a component can also be injected into its child components

```ts
@Component({
  selector: 'app-parent',
  providers: [ParentService],                 // <-- Service provided locally
  imports: [Child],
  template: '<app-child />',
})
export class Parent {
  parentService = inject(ParentService);      // <-- Get the service from the local injector
}

@Component({ selector: 'app-child', template: '...' })
export class Child {
  parentService = inject(ParentService);      // <-- Get the service from the parent injector
}
```

<!-- separator-vertical -->

## Dependency injection - Injection context

- The dependency injection (DI) system relies internally on a **runtime context** where the current **injector is available**
- This means that injectors can only work when code is executed in such a context

```ts
@Component({
  selector: 'app-root',
  template: '...',
})
export class App {
  private dataService = inject(DataService);    // ✅ Field initialization

  constructor() {
    const dataService = inject(DataService);    // ✅ Class constructor
  }

  doSomething() {
    const dataService = inject(DataService);    // ❌ Class method
  }
}
```

<!-- separator-vertical -->

## Dependency injection - Providers | ClassProvider

So far, we have provided services by adding their class names to the `providers` array

- This is actually a shorthand for `ClassProvider`, whose full syntax uses
  - `{ provide: Token, useClass: Implementation }`
- To tell Angular
  - when someone injects `Token`, create and return an instance of `Implementation`

```ts
import { ApplicationConfig, ClassProvider } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ApiService, useClass: ApiService } satisfies ClassProvider
  ],
};
```

😉 *The full syntax can be used in testing, to replace real dependencies with mocks (this is detailed further below)*

<!-- separator-vertical -->

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

@Component({/* ... */})
export class App {
  appTitle = inject(APP_TITLE); // <-- 'My Awesome App'
}
```

In the next chapter on `Pipe`s, you'll see how Angular uses `InjectionToken`s

😉 _Note that there's also a `FactoryProvider`, but it is beyond the scope of this course_

<!-- separator-vertical -->

## Dependency injection - Testing in isolation

- Use `ClassProvider` (or `ValueProvider`) to replace real dependencies with mocks
- This lets you test components in isolation without hitting actual APIs, databases, or complex services, while keeping the same injection tokens
- Use `TestBed.inject` to access the service instances in your tests

```ts
describe('Feature', () => {
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useClass: ApiServiceMock }
      ],
    }).compileComponents();

    apiService = TestBed.inject(ApiService); // <-- Get the `ApiServiceMock`
  });
});
```

<!-- separator-vertical -->

## Dependency injection - Summary

**In this chapter on dependency injection, we have covered the following topics**

<div class="columns">
<div class="column-50">

- @Injectable decorator
- Injectors and Singleton pattern
- Injectors hierarchy
- App providers
- Component providers
- Injection context

</div>
<div class="column-50">

- ClassProvider
- ValueProvider

</div>
</div>

<hr />

😉 *To go further, discover:*
*[App Initializer](https://angular.dev/api/core/provideAppInitializer) and*
*[Environment Initializer](https://angular.dev/api/core/provideEnvironmentInitializer)*

<!-- separator-vertical -->

## Dependency injection - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Dependency injection - Lab 8
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

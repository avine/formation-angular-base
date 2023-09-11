# Services

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Getting started with Angular](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Directives](#/6)
- **[Services](#/7)**
- [Pipes](#/8)
- [Http](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Services - In a nutshell

- A broad category encompassing any value, function, or feature that an application needs

```ts
import { Component, NgModule } from '@angular/core';

export class ApiService {                         // <-- 1. Defining service
  fetchMsg() { return { data: 'Hello World!' }; }
}

@NgModule({
  providers: [ApiService],                        // <-- 2. Providing service
  declarations: [AppComponent],
})
export class AppModule {}

@Component({
  selector: 'app-root',
  template: '<h1>{{ msg.data }}</h1>',
})
export class AppComponent {
  constructor(private apiService: ApiService) {}  // <-- 3. Injecting service
  msg = this.apiService.fetchMsg();               // <-- 4. Consuming service
}
```

Notes :



## Services - Injectable

- If your service has dependencies, add `@Injectable` decorator to benefit from the dependency injection

- `@Component` decorator is implicitly `Injectable`

```ts
import { Component, Injectable, NgModule } from '@angular/core';

@Injectable()
export class ApiService {
  // Service dependencies requires `@Injectable` decorator
  constructor(private httpClient: HttpClient) {}

  fetchMsg() {
    return this.httpClient.get('/api/msg');
  }
}

@NgModule({
  providers: [ApiService],
  declarations: [AppComponent],
})
export class AppModule {}
```

Notes :

- The documentation states that it is (very) good practice to annotate all services with @Injectable, even those with no dependency (see here: https://angular.io/guide/dependency-injection).
- Ability to have optional dependencies (using the @Optional () annotation on the parameter).



## Services - Injectable | providedIn

- Use `providedIn` injectable metadata to provide a service globally right from its definition

```ts
import { Component, Injectable, NgModule } from '@angular/core';

@Injectable({
  providedIn: 'root' // <-- Service is automatically provided at the app root level
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  fetchMsg() {
    return this.httpClient.get('/api/msg');
  }
}

@NgModule({
  providers: [], // <-- It is no longer necessary to provide it manually!
  declarations: [AppComponent],
})
export class AppModule {}
```

Notes :



## Services - Component providers 

- You can use the `providers` property in the `@Component` decorator metadata
- Services defined in a component are also injectable in its child components
- The service lifecycle (created and destroyed) follows the component lifecycle

```ts
@Component ({
  selector: 'app-parent',
  template: '<app-child />',
  providers: [ApiService]
})
export class ParentComponent {
  constructor(public apiService: ApiService) {}
}

@Component ({ selector: 'app-child', template: '...' })
export class ChildComponent {
  // Get the service from the `ParentComponent` injector
  constructor(public apiService: ApiService) {}
}
```

Notes :



## Services - Injectors

- Responsible for providing dependencies to components, services, ...
- An application can have more than one injector...
- ...but within one injector every dependency is a singleton

```ts
import { Component, Injectable, NgModule } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService { data?: string; }

@Component({ selector: 'app-setter', template: '...', })
export class SetterComponent {
  constructor(dataService: DataService) { dataService.data = 'Hello World!'; }
}

@Component({ selector: 'app-getter', template: '<h1>{{ data }}</h1>' })
export class GetterComponent {
  get data() { return this.dataService.data; } // <-- 'Hello World!' 
  constructor(private dataService: DataService) {}
}
```

Notes :



## Services - Injectors hierarchy

During a dependency injection:

- The local injector tries to find a compatible provider
- If it can't find one, it forwards the request to its parent
- And so on up to the application's main injector
- If no provider can be found, Angular throws an error

This mechanism is very powerful, but can be complex:

- Services can be overwritten locally
- But can also inadvertently hide the "expected" service

Notes :



## Services - Injectors hierarchy

![hierarchy-injectors](resources/hierarchical-injectors.png "hierarchy-injectors")

Notes :
  - Http service sets as singleton for the app, it will be used by AppComponent, Component2, Component4, Component5
  - If Component1 or Component3 injects Http, it's a CustomHttp that will be injected (singleton for Component1 and Component3)
  - If Component3 also defines the same provider array as Component3, then each will have a different instance of CustomHttp



## Services - Providers | ClassProvider

A provider describes for the injector how to get an instance of a dependency

- The most common case is the class provider

```ts
import { ClassProvider, Component, NgModule } from '@angular/core';

const apiProvider: ClassProvider = {
  provide: ApiService,
  useClass: ApiStubService
};

@NgModule ({
  providers: [apiProvider]
})
export class AppModule {}

@Component({ /* ... */ })
export class AppComponent {
  constructor(apiService: ApiService) {
    console.log(apiService); // <-- will print `ApiStubService` to the console!
  }
}
```

Notes :



## Services - Providers | ClassProvider

- Shorthand when `provide` and `useClass` properties point to the same value

```ts
import { NgModule } from '@angular/core';

@NgModule ({
  providers: [{ provide: ApiService, useClass: ApiService }]
})
export class AppModule {}
```

is equivalent to:

```ts
import { NgModule } from '@angular/core';

@NgModule ({
  providers: [ApiService]
})
export class AppModule {}
```

Notes :



## Services - Providers | FactoryProvider

- Use factory provider when the provider needs information that is only available at runtime

```ts
import { NgModule, FactoryProvider } from '@angular/core';

function apiFactory(userService: UserService): FactoryProvider {
  // In this example, `isAdmin` is only available at runtime
  // because it depends on the logged-in user!
  return new ApiService(userService.isAdmin);
}

const apiProvider: FactoryProvider = {
  provide: ApiService,
  useFactory: apiFactory,
  deps: [UserService]
};

@NgModule ({
  providers: [apiProvider]
})
export class AppModule {}
```

Notes :



## Services - Providers | ValueProvider

- Primitive values (like `string`, `number`, ...) can't be provided!?

```ts
@Component({ /* ... */ })
export class AppComponent {
  constructor(private appTitle: string) {} // ❌ This type is not supported as injection token
}
```

- `ValueProvider` and `InjectionToken` to the rescue

```ts
import { Component, Inject, InjectionToken, NgModule, ValueProvider } from '@angular/core';

const APP_TITLE = new InjectionToken<string>('APP_TITLE');

const appTitleProvider: ValueProvider = { provide: APP_TITLE, useValue: 'My Awesome App' };

@NgModule ({ providers: [appTitleProvider] }) export class AppModule {}

@Component({ /* ... */ })
export class AppComponent {
  constructor(@Inject(APP_TITLE) private appTitle: string) {}
}
```

Notes :



## Services - Testing

- You can configure the providers in your `TestBed`
- Don't hesitate to "stub" the real services
- Powerful mechanism that isolates the element you really want to test
- Use `TestBed.inject` to access the service instance in your test

In the following example, we test a component in isolation, replacing the service with a stub:

```ts
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: ApiService, useClass: ApiStubService }],
    });
    apiService = TestBed.inject(ApiService); // <-- Get the `ApiStubService`
  });
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp5" -->

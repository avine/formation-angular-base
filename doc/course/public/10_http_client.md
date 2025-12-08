# HTTP client

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [TypeScript](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)
- [Signals](#/8)

</div>
<div class="column-50">

- [Dependency injection](#/9)
- [Pipes](#/10)
- [RxJS](#/11)
- **HTTP client**
- [Routing](#/13)
- [Forms](#/14)
- [Appendix](#/15)

</div>
</div>

<!-- separator-vertical -->

## HTTP client - Getting started 1/4

- Let's use the `jsonplaceholder` API to display todo items

```ts
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
```

- Here's the `Todo` item interface...

```ts
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

- ...and the first two items of the API response

```json
[
  { "id": 1, "title": "delectus aut autem", "completed": false },
  { "id": 2, "title": "quis ut nam facilis et officia qui", "completed": false },
  ...
]

```

<!-- separator-vertical -->

## HTTP client - Getting started 2/4

- Provide the `HttpClient` service using the `provideHttpClient()` helper function

- Optionally, configure the service to use the browser's native `fetch` API, by adding the `withFetch()` feature

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),                 // <-- 1. Add provider
  ],
};
```

😉 *Note: providing the HTTP client is optional, unless you need to add features*

😉 *Note: `withInterceptors(...)` is another common feature, but this is beyond the scope of this course*

<!-- separator-vertical -->

## HTTP client - Getting started 3/4

- Use the `HttpClient` service into components that needs to display the data

```ts
import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  template: `<pre>{{ todos | json }}</pre>`,
  imports: [JsonPipe],
})
export class TodoList {
  private httpClient = inject(HttpClient);          // <-- 2. Inject service

  protected todos?: Todo[];

  constructor() {
    this.httpClient
      .get<Todo[]>(TODOS_URL)                       // <-- 3. Define shape of GET request
      .subscribe((todos) => (this.todos = todos));  // <-- 4. Execute request and store response
  }
}
```

<!-- separator-vertical -->

## HTTP client - Getting started 4/4

- There are many `HttpClient` methods and they are highly configurable

- They describe the shape of requests as **RxJS Observables**

```ts
class HttpClient {
  // --- Generic method (for advanced use cases) ---
  request<R>(method: string, url: string, options?: HttpOptions): Observable<R>;

  // --- Shorthand methods (enough in most cases) ---
  get<R>(url: string, options?: HttpOptions): Observable<R>;
  post<R>(url: string, body: any, options?: HttpOptions): Observable<R>;

  // .put(), .patch(), .delete(), ...
}

interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  responseType?: 'json';
  // ...
}
```

<!-- separator-vertical -->

## HTTP client - Service and Component layers 1/2

- While `HttpClient` can be injected and used directly into **components**

- It is recommended to create reusable, injectable **services** which encapsulate data access logic

- **Data providers** *(service layer)* should only **expose the shape of requests**<br />
  and let **data consumers** *(component layer)* **subscribe** to them

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private httpClient = inject(HttpClient);

  fetch() {
    return this.httpClient.get<Todo[]>(TODOS_URL); // <-- Do NOT "subscribe" in service layer
  }
}
```

<!-- separator-vertical -->

## HTTP client - Service and Component layers 2/2

- Subscribe in components to react to each status of the request as needed (**loading**, **error** and **fetched**)

```ts
import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TodoService } from './todo-service';

@Component({
  selector: 'app-todo-list',
  template: `<pre>{{ todos() | json }}</pre>`,
  imports: [JsonPipe],
})
export class TodoList {
  private todoService = inject(TodoService);

  protected todos = signal<Todo[] | undefined>(undefined);

  constructor() {
    this.todoService.fetch().subscribe((todos) => this.todos.set(todos)); // <-- Do "subscribe" in
  }                                                                       //     component layer
}
```

<!-- separator-vertical -->

## HTTP client - State management 1/3

- To share data between components, **store** the fetched data in the **service layer** by leveraging **RxJS operators**

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {                                  // <-- Data source provider
  private httpClient = inject(HttpClient);

  private _todos = signal<Todo[] | undefined>(undefined);   // <-- Encapsulate data
  todos = this._todos.asReadonly();                         // <-- Expose data

  fetch(): Observable<Todo[]> {
    return this.httpClient
      .get<Todo[]>(TODOS_URL)
      .pipe(tap((todos) => this._todos.set(todos)));        // <-- RxJS operators to handle side effect
  }
}
```

<!-- separator-vertical -->

## HTTP client - State management 2/3

- **Subscribe** in the **component layer**, consuming centralised data and **handling** potential **errors**

```ts
import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TodoService } from './todo-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.html',
  imports: [JsonPipe],
})
export class TodoList {                                     // <-- Data source consumer
  private todoService = inject(TodoService);

  todos = this.todoService.todos; // Data can be consumed here and in other components too...
  hasError = signal(false);

  constructor() {
    // ...while fetching data can be done in one strategic place
    this.todoService.fetch().subscribe({ error: () => this.hasError.set(true) });
  }
}
```

<!-- separator-vertical -->

## HTTP client - State management 3/3

- Finally, in the component template, adapt the display according to the different statuses of the request
  (**loading**, **error** and **fetched**)

```html
<!-- todo-list.html -->

@if (todos() === undefined) {

  <p>Initial loading...</p>

} @else if (hasError()) {

  <p>An error occurred...</p>

} @else {

  <pre>{{ todos() | json }}</pre>
}
```

<!-- separator-vertical -->

## HTTP client - Testing 1/2

- Angular provides `provideHttpClientTesting` and `HttpTestingController` for mocking HTTP requests

```ts
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch()), provideHttpClientTesting()],
    });

    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // ...
```

<!-- separator-vertical -->

## HTTP client - Testing 2/2

- The Controller can be injected into tests and used for mocking and flushing requests

```ts
  // ...

  it('should fetch and store todos', () => {
    const responseMock: Todo[] = [{ id: 1 } as Todo, { id: 2 } as Todo];

    service.fetch().subscribe((todos) => {
      expect(todos).toEqual(responseMock);
      expect(service.todos()).toEqual(responseMock);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toEqual('GET');
    req.flush(responseMock);

    httpTestingController.verify(); // assert that there are no outstanding requests
  });
});
```

<!-- separator-vertical -->

## HTTP client - Summary

**In this chapter on http client, we have covered the following topics**

- Provider
- Provider options
- Service
- Methods (RxJS Observables)
- Error handling
- State management

<hr />

😉 *To go further, discover: [Reactive data fetching with `httpResource`](https://angular.dev/guide/http/http-resource)*

<!-- separator-vertical -->

## HTTP client - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## HTTP client - Lab 10
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

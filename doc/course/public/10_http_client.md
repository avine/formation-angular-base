# Http client

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

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
- [Dependency injection](#/9)
- [Pipes](#/10)
- **Http client**
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>
</div>

<!-- separator-vertical -->

## Http client - Getting started 1/5

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

## Http client - Getting started 2/5

- To enable Http capabilities to an app, add `provideHttpClient()` to the app configuration

- Optionally, add `withFetch()` option to use the browser's native `fetch` API

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),                 // <-- 1. Add provider
  ],
};
```

<!-- separator-vertical -->

## Http client - Getting started 3/5

- Then use the `HttpClient` service in the component that needs to display the data

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

## Http client - Getting started 4/5

- While `HttpClient` can be injected and used directly from **components**

- It is recommended to create reusable, injectable **services** which encapsulate data access logic

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private httpClient = inject(HttpClient);

  fetch() {
    return this.httpClient.get<Todo[]>(TODOS_URL);
  }
}
```

- **Data source providers** (typically Services) should only **expose the shape of requests**
  and let **data source consumers** (typically Components) **subscribe** to them

<!-- separator-vertical -->

## Http client - Getting started 5/5

- Therefore, in most cases, **do NOT subscribe in services** but in components only,
  allowing the consumer to react to every status of the request (**loading**, **error** and **fetched**) in the UI

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
    this.todoService.fetch().subscribe((todos) => this.todos.set(todos));
  }
}
```

<!-- separator-vertical -->

## Http client - State management 1/2

- To share data between components, we need to store fetched data in a service facade

- ❌ However, the following implementation breaks the best pratice we just mentionned!

```ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private httpClient = inject(HttpClient);

  todos = signal<Todo[] | undefined>(undefined);
 
  fetch(): void {
    this.httpClient
      .get<Todo[]>(TODOS_URL)
      .subscribe((todos) => this.todos.set(todos)); // <-- ❌ Do NOT subscribe in services!
  }
}
```

<!-- separator-vertical -->

## Http client - State management 2/2

- ✅ We can still access fetched data before subscribing, using the `.pipe(tap(...))` pattern

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private httpClient = inject(HttpClient);

  private todos = signal<Todo[] | undefined>(undefined);

  fetch(): Observable<Todo[]> {
    return this.httpClient
      .get<Todo[]>(TODOS_URL)
      .pipe(tap((todos) => this.todos.set(todos))); // <-- ✅ Tapping into the data stream
  }
}
```

*But to understand this solution, we need to understand how the `HttpClient` methods work*

<!-- separator-vertical -->

## Http client - Methods

- There are many `HttpClient` methods and they are highly configurable

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

- Each of these methods returns an `Observable`, but what are observables anyway?

<!-- separator-vertical -->

## Http client - Observables

*The `HttpClient` service is built on top of **RxJS Observables**, but its study goes beyond the scope of this course*

- In a nutshell, an **Observable**
  - represent a **stream of data** that can be subscribed to
  - allowing **multiple values** to be emitted over time

- In the specific case of an **Http request**, the observable emits
  - a **single value** if the request succeeds
  - an **error** if the request fails (`HttpErrorResponse`)

<!-- separator-vertical -->

## Http client - Error handling

- When subscribing
  - use a **callback function** to handle Http **response** only
  - use an **object** to handle Http **response** and **error**

```ts
// ----- Using a callback function -----

this.httpClient.get(TODOS_URL).subscribe(
  (response: Todo[]) => { /* Response handler... */ }
);

// ----- Using an object -----

this.httpClient.get(TODOS_URL).subscribe(
  {
    next: (response: Todo[]) => { /* Response handler... */ },
    error: (error: HttpErrorResponse) => { /* Error handler... */ }
  }
);
```

<!-- separator-vertical -->

## Http client - HttpClient | Pipe 1/3

- Remember that a request consists of at least two parts
  - defining its shape, using: `.get()`, `.post()`, ...
  - triggering its execution, using: `.subscribe()`

- But you can also transform the incoming response before calling the subscribe method
  - using the `.pipe()` method to apply chainable operators

```ts
this.httpClient
  .get()                            // <-- 1. Definition
  .pipe(/* List of operators */)    // <-- 2. Transformation
  .subscribe();                     // <-- 3. Execution
```

- Both `.pipe()` and `.subscribe()` methods are parts of the Observable API

<!-- separator-vertical -->

## Http client - HttpClient | Pipe 2/3

- Use the `map(...)` operator to adapt the API response to your needs

```ts
import { map } from 'rxjs';

const TODO_1_URL = 'https://jsonplaceholder.typicode.com/todos/1';

this.httpClient
  .get<Todo>(TODO_1_URL)    // <-- { id: 1, title: "delectus aut autem", completed: false }

  .pipe(
    map((todo) => ({ title: todo.title })),           // <-- { title: "delectus aut autem" }
    map((todo: Pick<Todo, 'title'>) => todo.title)),  // <-- "delectus aut autem"
  )

  .subscribe((title: string) => {
    console.log(title);                               // <-- "delectus aut autem"
  });
```

<!-- separator-vertical -->

## Http client - HttpClient | Pipe 3/3

- Use the `tap(...)` operator to tap into the stream, handling side-effect without affecting the stream

```ts
import { tap } from 'rxjs';

const TODO_1_URL = 'https://jsonplaceholder.typicode.com/todos/1';

this.httpClient
  .get<Todo>(TODO_1_URL)        // <-- { id: 1, title: "delectus aut autem", completed: false }

  .pipe(
    tap((todo) => {
      this.todo = todo;         // <-- Side-effect
      return 'whatever';        // <-- Return value does NOT affect the stream
    }),
  )

  .subscribe((todo: Todo) => {
    console.log(todo);          // <-- { id: 1, title: "delectus aut autem", completed: false }
  });
```

<!-- separator-vertical -->

## Http client - State management 1/3

- Let's revisit the solution shown above that uses the `.pipe(tap(...))` pattern 

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
      .pipe(tap((todos) => this._todos.set(todos)));        // <-- Handle side-effect
  }
}
```

<!-- separator-vertical -->

## Http client - State management 2/3

- We subscribe in the component, which consumes centralised data and handles potential errors

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

## Http client - State management 3/3

- As already mentionned, we subscribe in the component (data source consumer) and not in the service (data source provider)

- Allowing the component to react to every status of the request (**loading**, **error** and **fetched**) in its template

```html
<!-- todo-list.html -->

@if (todos() === undefined) {

  <p>Initial loading...</p>

} @else if (hasError()) {

  <p>An error occured...</p>

} @else {

  <pre>{{ todos() | json }}</pre>
}
```

<!-- separator-vertical -->

## Http client - Testing 1/2

- Angular provides `provideHttpClientTesting` and `HttpTestingController` for mocking Http requests

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

## Http client - Testing 2/2

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

## Http client - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Http client - Lab 10
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

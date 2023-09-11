# Http

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
- **[Http](#/9)**
- [Router](#/10)
- [Forms](#/11)

Notes :



## Http - Getting started

Suppose our application needs to display todo items.

- Let's use the `jsonplaceholder` API

```ts
const buildTodoUrl = (id: number) => `https://jsonplaceholder.typicode.com/todos/${id}`;
```

- Here's the shape of a `Todo` item...

```ts
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

- ...and the API response for `id` 1

```json
{ "id": 1, "title": "delectus aut autem", "completed": false }
```

Notes :



## Http - Getting started

- To add Http capabilities to Angular, we need first to import the `HttpClientModule`...

```ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TodoComponent } from './todo/todo.component.ts';

@NgModule({
  imports: [HttpClientModule], // <-- Import module
  declarations: [TodoComponent],
})
export class AppModule {}
```

Notes :



## Http - Getting started

- ...and then use the `HttpClient` service in our components

```ts
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  template: '<p>{{ todo?.title }}</p>'
})
export class TodoComponent implements OnInit {
  @Input({ required: true }) id!: number;

  protected todo?: Todo;

  constructor(private httpClient: HttpClient) {}  // <-- Inject service

  ngOnInit(): void {
    this.httpClient
      .get<Todo>(buildTodoUrl(this.id))           // <-- Define shape of GET request
      .subscribe((todo) => (this.todo = todo));   // <-- Execute request and store response
  }
}
```

Notes :



## Http - Getting started

So, it's easy, right?

- But what is the point of the `subscribe` method?

```ts
this.httpClient.get(url).subscribe((response) => { /* ... */ }); 
```

- Let's take a look at the interface of the `httpClient.get` method:

```ts
// node_modules/@angular/common/http/index.d.ts

export declare class HttpClient {
  get<T>(url: string, options?: { /* ... */ }): Observable<T>;
}
```

- So, it returns an `Observable` but what are observables anyway?

Notes :



## Http - Getting started

- Observables
  - represent a stream of data that can be subscribed to
  - allowing multiple values to be emitted over time

- Refers to a paradigm called ReactiveX (http://reactivex.io/)
  - an API for asynchronous programming with observable streams
  - implemented in all major programming languages: RxJava, Rx.NET, RxJS, ...

- As you've already guessed, Angular uses the JavaScript implementation

We can't make full use of Angular's `HttpClientModule` without first understanding *RxJS*.

<img src="./resources/reactivex.png" alt="ReactiveX" height="125" />

Notes :



## RxJS

You're about to learn the longest but also the most beautiful part of this training...

It's no longer just about HTTP, but about *state management*.<br />
And RxJS is the cornerstone of this edifice.

To understand RxJS, we need to explain the following concepts:

- `Observable`

- `Observer`

- `Subscriber`

- `Subscription`

- `Operators`

- `Subject`

Notes :



## RxJS - Observable & Observer & Subscriber

<div>

```ts
import { Observable, Observer } from 'rxjs';

const data$ = new Observable<number>((observer: Observer<number>) => {
  let data = 0;

  const interval = setInterval(() => {
    observer.next(++data);    // <-- Emit next value every second

    if (data === 5) {         // <-- Until this value
      clearInterval(interval);
      observer.complete();    // <-- Then mark as complete
    }
  }, 1000);
});

const subscriber: Partial<Observer<number>> = {
  next: (data: number) => console.log(data),  // <-- Listen to "next" event
  complete: () => console.log('complete'),    // <-- Listen to "complete" event
};

data$.subscribe(subscriber); // output: 1, 2, 3, 4, 5, complete
```

</div>

Notes :



## RxJS - Subscription

<div>

```ts
import { Observable, Observer, Subscription } from 'rxjs';

const data$ = new Observable<number>((observer: Observer<number>) => {
  let data = 0;

  const interval = setInterval(() => {
    observer.next(++data);              // <-- Emit next value every second ad infinitum
  }, 1000);

  return () => clearInterval(interval); // <-- Return the unsubscribe handler function
});

const subscription: Subscription = data$.subscribe(
  (data: number) => console.log(data)   // <-- Listen to "next" event
);

setTimeout(() => {
  subscription.unsubscribe();           // <-- Execute the unsubscribe handler function after 5s
}, 5000);

// output: 1, 2, 3, 4, 5
```

</div>

Notes :



## RxJS - Operators | synchronous

<div>

```ts
import {
  Observable, filter, map // <-- "filter" and "map" are synchronous transformations
} from 'rxjs';

const data$ = new Observable<number>((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.complete();
});

data$.pipe(/* no operator */).subscribe(console.log);                 // output: 1, 2, 3, 4

data$.pipe(filter((data) => data % 2 === 0)).subscribe(console.log);  // output: 2, 4

data$.pipe(map((data) => data * 10)).subscribe(console.log);          // output: 10, 20, 30, 40

data$.pipe(
  filter((data) => data % 2 === 0),
  map((data) => data * 10)
).subscribe(console.log);                                             // output: 20, 40
```

</div>

Notes :



## RxJS - Operators | asynchronous

<div>

```ts
import { Observable, concatMap } from 'rxjs'; // <-- "concatMap" is asynchronous transformation

const data$ = new Observable<number>((observer) => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

const fetchTodoFactory$ = (id: number) => new Observable<Todo>((observer) => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((response) => response.json())
    .then((todo: Todo) => {
      observer.next(todo);                  // <-- Emit "next" event
      observer.complete();                  // <-- Emit "complete" event
    })
    .catch((err) => observer.error(err));   // <-- Emit "error" event
});

data$.pipe(concatMap((data) => fetchTodoFactory$(data))).subscribe(console.log);

// output: { id: 1, title: 'delectus aut autem', completed: false }
// output: { id: 2, title: 'quis ut nam facilis et officia qui', completed: false }
```

</div>

Notes :



## RxJS - Summary so far

- By convention, a variable representing an observable ends with the symbol `$`

- The `Observable` implementation is a function that use the `Observer` methods to emit the stream events: `.next()`, `.complete()` (and also `.error()`)

- The `.subscribe()` method activates the observable to emit its data stream
  - It accepts an object or a function as `Subscriber` (`Partial<Observer>`) to listen to the stream events
  - It returns a `Subscription` allowing the consumer to `.unsubscribe()` from the activated observable

- Unsubscription is necessary to avoid memory leaks when the consumer is no longer interested in the data
  - Unless the observable is already in "complete" (or "error" state)

- The `Operators` allow to transform the emitted values and make the observables very powerful

Notes :



## RxJS - Subject

- A `Subject` implements both `Observable` and `Observer` interfaces

```ts
const subject$ = new Subject();

// Act as Observable
subject$.subscribe(/* ... */);
subject$.pipe(/* ... */);

// Act as Observer
subject$.next(/* ... */);
subject$.error(/* ... */);
subject$.complete(/* ... */);

// Can be converted into a simple Observable...
const observable$ = subject$.asObservable(/* ... */);

// ...hiding the Observer interface
observable$.next(/* ... */); // ❌ Property 'next' does not exist on type 'Observable'
```

Notes :



## RxJS - Subject

Unlike the observable:
- a subject implementation lives outside its instantiation (calling `next`, `error`, `complete`)
- a subject can emit stream events even before any subscription (*"Hot"* observable)
- a subject is "multicast" (all subscribers share the stream events)

```ts
const data$ = new Subject<string>();

data$.next('A');                          // <-- value is lost

data$.subscribe((data) => console.log(`#sub1(${data})`));

data$.next('B');                          // <-- value recieved by subscriber 1

data$.subscribe((data) => console.log(`#sub2(${data})`));

data$.next('C');                          // <-- value recieved by subscribers 1 and 2
data$.next('D');                          // <-- value recieved by subscribers 1 and 2
data$.complete();
// output: #sub1(B), #sub1(C), #sub2(C), #sub1(D), #sub2(D)
```

Notes :



## RxJS - Observable compared to Subject

Unlike the subject:
- an observable implementation lives inside its instantiation (calling `next`, `error`, `complete`)
- an observable emits stream events only when subscribing (*"Cold"* observable)
- an observable is "unicast" (each subscriber receive a new data stream)

```ts
const observable$ = new Observable<string>((observer) => {
  // This is where implementation takes place...
  observer.next('A');
  observer.next('B');
  observer.complete();
});

data$.subscribe((data) => console.log(`#sub1(${data})`));
data$.subscribe((data) => console.log(`#sub2(${data})`));

// output: #sub1(A), #sub1(B), #sub2(A), #sub2(B)
```

Notes :



## RxJS - Subject | BehaviorSubject

A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.

```ts
import { BehaviorSubject } from 'rxjs';

const data$ = new BehaviorSubject<string>('A');           // <-- Initial value

data$.subscribe((data) => console.log(`#sub1(${data})`)); // <-- #sub1 receive 'A'

data$.next('B');

data$.subscribe((data) => console.log(`#sub2(${data})`)); // <-- #sub2 receive 'B'

data$.next('C');
data$.next('D');

console.log(`#snapshot(${data$.value})`); // <-- and you have access to the instant value!

data$.complete();

// output: #sub1(A), #sub1(B), #sub2(B), #sub1(C), #sub2(C), #sub1(D), #sub2(D), #snapshot(D)
```

Notes :



## RxJS - Subject | ReplaySubject

A variant of Subject that "replays" old values to new subscribers by emitting them when they first subscribe.

```ts
import { ReplaySubject } from 'rxjs';

const data$ = new ReplaySubject<string>(2);               // <-- Number of events to replay

data$.next('A');

data$.subscribe((data) => console.log(`#sub1=${data}`));  // <-- #sub1 receive 'A'

data$.next('B');

data$.subscribe((data) => console.log(`#sub2=${data}`));  // <-- #sub2 receive 'A' and 'B'

data$.next('C');
data$.next('D');
data$.complete();

// output: #sub1(A), #sub1(B), #sub2(A), #sub2(B), #sub1(C), #sub2(C), #sub1(D), #sub2(D)
```

Notes :



## Http - Why RxJS?

🎉 That's all for RxJS!

⛳ It's time to get back to our main goal:
- Understand and use Angular's `HttpClientModule` to its full potential

But is an HTTP request comparable to an observable?
- Observable can emit multiple values over time
- HTTP request only emit one value (the HTTP response)

Hum... The answer is no!

So why does Angular provide `HttpClient` through `Observable` and not just `Promise`?
- Unified data flow, because observables are used everywhere in the Angular framework
- Leveraging the power of operators

Notes :



## Http - Providing as a service

- Best practice to define the different API endpoints into an Angular service

- Do not subscribe in service

```ts
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../../product/product.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`http://localhost:8080/api/products`);
  }
  // Other methods...
}
```

Notes :



## Http - Consuming service in component

- It's possible to consume the API service directly in components

- Subcribe in component and store response as component properties
  - Note that it is not necessary to unsubscribe from an Http observable<br />
    (once the response has been received, it is in the "complete" or "error" state)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p *ngFor="let product of products">
      {{ product.title }} has {{ product.stock }} unit(s) in stock.
    </p>`
})
export class AppComponent implements OnInit {
  protected products?: Product[];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.fetchProducts().subscribe((products) => (this.products = products));
  }
}
```

Notes :



## Http - Consuming service in facade 1/2

- Best practice to expose the API service through a service facade

```ts
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private _products$ = new BehaviorSubject<Product[] | undefined>(undefined);

  products$ = this._products$.asObservable();

  get productsSnapshot() { return this._products$.value; }

  constructor(private apiService: ApiService) {}

  dispatchProducts(): Observable<void> {
    return this.apiService.fetchProducts().pipe(
      tap((products) => {
        this._products$.next(products);  // Using `tap` operator for "side-effects"
      }),
      map(() => undefined), // Force the consumer to use the `products$` property
    );
  }
}
```

Notes :



## Http - Consuming service in facade 2/2

- Same example but using a `ReplaySubject` instead of a `BehaviorSubject`

```ts
import { ReplaySubject, map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  productsSnapshot?: Product[];
  private _products$ = new ReplaySubject<Product[]>(1); // <-- `undefined` no longer required
  products$ = this._products$.asObservable();

  constructor(private apiService: ApiService) {}

  dispatchProducts(): Observable<void> {
    return this.apiService.fetchProducts().pipe(
      tap((products) => {
        this.productsSnapshot = products;
        this._products$.next(this.productsSnapshot);
      }),
      map(() => undefined),
    );
  }
}
```

Notes :



## HTTP - HttpClient

- There are many `HttpClient` methods and they are highly configurable

```ts
class HttpClient {
  // --- Main method ---
  request<R>(method: string, url: string, options?: HttpOptions): Observable<R>;

  // --- Shorthands ---
  get<R>(url: string, options?: HttpOptions): Observable<R>;

  post<R>(url: string, body: any, options?: HttpOptions): Observable<R>;

  // ...
}

interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
  // ...
}
```

Notes :



## Http - Testing 1/2

- Angular provides `HttpClientTestingModule` and `HttpTestingController` for mocking the Http module

```ts
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
});
```

Notes :



## Http - Testing 2/2

- The Controller can be injected into tests and used for mocking and flushing requests

```ts
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('ApiService', () => {
  // ...

  it('should fetch the products', () => {
    const responseMock: Product[] = [{ id: 'ID_1' } as Product, { id: 'ID_2' } as Product];

    service.fetchProducts().subscribe((products) => expect(products).toEqual(responseMock));

    const req = httpTestingController.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toEqual('GET');
    req.flush(responseMock);

    httpTestingController.verify(); // assert that there are no outstanding requests
  });
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp7" -->

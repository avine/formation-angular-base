## Lab 7: Http

In this lab, you'll communicate with a REST API server that will manage the products and the basket.

- To run the server, open a new shell window in the `Exercises/resources/server` folder and run the following commands:

```shell
npm install
npm start
```

The server is listening on: `http://localhost:8080/api/`

Here are the available endpoints:

- `GET /products` to fetch all products
- `GET /products/:productId` to fetch one product
- `GET /basket` to fetch the basket
- `POST /basket` with a request body of type `{ productId: string; }` to add a new item to the basket

### `AppModule`

- Import the `HttpClientModule`

### `ApiService`

- Create a new service `src/app/shared/services/api.service.ts` using Angular CLI

- Implement the following methods:
  - `fetchProducts(): Observable<Product[]>`
  - `fetchProduct(productId: string): Observable<Product>`
  - `fetchBasket(): Observable<BasketItem[]>`
  - `addToBasket(productId: string): Observable<BasketItem>`

<div class="pb"></div>

### `CatalogService`

Update the service to use the new `ApiService`.

- Here's a starting point using the `BehaviorSubject` technique to expose the products:

```ts
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  // Store the products in a BehaviorSubject
  private _products$ = new BehaviorSubject<Product[] | undefined>(undefined);

  // Expose the products as observable
  products$ = this._products$.asObservable();

  // It's a good practice to make available the products as instant value 
  // (but use it carefully after it's not a reactive value)
  get productsSnapshot() {
    return this._products$.value;
  }

  constructor(private apiService: ApiService) {}

  dispatchProducts(): Observable<void> {
    // Fetch the products from the API
    return this.apiService.fetchProducts().pipe(
      // Use a "side-effect" to store the server response in the service
      tap((products) => this._products$.next(products)),
      // Be sure the consumer of the service gets the
      // products only from the `products$` observable
      map(() => undefined),
    );
  }

  // To be continued...
}
```

<div class="pb"></div>

### `BasketService`

Update the service to use the new `ApiService`.

- Here's a starting point using the `ReplaySubject` technique to expose the basket items:

```ts
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BasketItem } from './basket.types';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  itemsSnapshot: BasketItem[] | undefined = undefined;

  private _items$ = new ReplaySubject<BasketItem[]>(1);

  items$ = this._items$.asObservable();

  constructor(private apiService: ApiService) {}

  dispatchItems(): Observable<void> {
    // To be continued...
  }

  // To be continued...
}
```

- Implement the method `dispatchItems` (like we did with `dispatchProducts` for the `CatalogService`)

- Update the method `addItem`:
  - Using the signature: `addItem(productId: string): Observable<void>`
  - The method should have a "side-effet" (using the `tap` operator from RxJS) to update the `_items$` observable

Remember that you get the new basket item from the API response:

```ts
addToBasket(productId: string): Observable<BasketItem>;
```

<div class="pb"></div>

### `AppComponent`

- Update the component to use the new versions of the `CatalogService` and the `BasketService`

- Use the `OnInit` lifecycle hook to subcribe to both `dispatchProducts` and `dispatchItems`

- Update the `addToBasket` method so that it subscribes correctly to `BasketService.addItem`

### `MenuComponent`

- Update the way to retrieve the number of items

<div class="pb"></div>

### Tests

#### `api.service.spec.ts`

- It should fetch the products

- It should fetch one product

- It should fetch the basket

- It should add item to basket

You need to import `HttpClientTestingModule` in the `TestBed` configuration and use `HttpTestingController` to simulate the requests.

```ts
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

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

  // To be continued...
});
```

#### Disclaimer

At this point, a lot of tests fail!
This is because the structure of the application has changed radically.
Refactoring the tests would take too much time in the context of this training.

With the trainer, take a look at the new test implementation in the following folder:
  - `Exercises/solutions/projects/07_http`

<div class="pb"></div>

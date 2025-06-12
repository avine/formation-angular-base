## Lab 10: Http client 1/3

In this lab, you'll communicate with a REST API server that will manage the products and the basket.

- To run the server, open a new Terminal in the `lab/resources/server` directory and run the following commands:

```bash
npm install
npm start
```

The server is listening on: `http://localhost:8080/api/`

Here are the available endpoints:

- `GET /products` to fetch all products
  - Response: `Product[]`

- `GET /products/:productId` to fetch one product
  - Response: `Product`

- `GET /basket` to fetch the basket
  - Response: `BasketItem[]`

- `POST /basket` to add a new item to the basket
  - Request body: `{ productId: string; }`
  - Response: `BasketItem`

### `ApplicationConfig`

- Add the HTTP provider: `provideHttpClient(withFetch())`



## Lab 10: Http client 2/3
### `CatalogResource`

- Inject the `HttpClient` service

- Remove the hard coded products from the `_products` property

- Add a `fetchProducts(): Observable<Product[]>` method that gets the products from the server and stores them in the `_products` signal.<br />
  To achieve this side-effect, use the RxJS `tap` operator in the `.pipe()` transformation chain:

```ts
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../product/product-types';

@Injectable({
  providedIn: 'root',
})
export class CatalogResource {
  fetchProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:8080/api/products')
      .pipe(tap((products) => this._products.set(products)));
  }
}
```

#### Updating the `App` component

- Subcribe to `CatalogResource.fetchProducts` method in the `App` class constructor, to trigger data fetching



## Lab 10: Http client 3/3
### `BasketResource`

- Inject the `HttpClient` service

- Add a `fetchBasket(): Observable<BasketItem[]>` method (such as we did with `fetchProducts()` for the `CatalogResource`)

- Add a `addItem(productId: string): Observable<BasketItem>` method posts the item to be added and update the `_basket` property accordingly

#### Updating the `App` component

- Subcribe to `basketResource.fetchBasket()` method in the `App` class constructor, to trigger data fetching

- Update the `addToBasket()` method so that it subscribes correctly to `BasketResource.addItem` method

### Tests

At this point, a lot of tests fail!
This is because the structure of the application has changed radically.
Refactoring the tests would take too much time in the context of this course.

With the trainer, take a look at the new test implementation in the following directory:
  - `lab/solutions/projects/10_http_client`

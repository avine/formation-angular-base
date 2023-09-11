## Lab 8: Router

In this lab, you'll create a multi-page website (SPA) using the router provided by Angular.

### `AppRoutingModule`

- Create the file `src/app/app-routing.module.ts` with the following content:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

- Declare the `AppRoutingModule` in your application

- Create the following components and declare a route for each one of them:
  - Component: `CatalogComponent` --> Route: `'catalog'`
  - Component: `BasketComponent` --> Route: `'basket'`
  - Component: `ProductDetailsComponent` --> Route: `'product/:id'`

- Add a route `**` that redirects to the `'catalog'`

### `CatalogComponent`

- Move the main content you have developed in the `AppComponent` to this one, including:
  - the template
  - the class logic
  - the tests

<div class="pb"></div>

### `AppComponent`

- In `src/app/app.component.html`, put a `<router-outlet />` instead of the main content you just moved. The template should now look like this:

```html
<app-menu />

<main class="py-4 container flex-grow-1">
  <router-outlet />
</main>

<app-footer />
```

### `RouterLink`

Add `routerLink` directives in the following templates:

- In `catalog.component.html`:
  - to visit the page *"Voir mon panier"*

- In `menu.component.html`: 
  - to return the home page when clicking on *"Zenika Ecommerce"*
  - to visit the page *"Voir mon panier"*

- In `product.component.html`: 
  - to visit the product details page

<div class="pb"></div>

### `BasketComponent`

- Use the following markup for the component template:

```html
<h2 class="h4">Mon panier</h2>

<div class="card">
  <div class="card-header">2 articles</div>

  <ul class="list-group list-group-flush">
    <!-- Use `*ngFor` directive to loop over the basket items -->
    <li class="list-group-item d-flex justify-content-between">
      Coding the snow <span class="text-primary">19 €</span>
    </li>

    <li class="list-group-item d-flex justify-content-between">
      Coding the world <span class="text-primary">18 €</span>
    </li>
    <!-- End of: Use `*ngFor` directive to loop over the basket items -->

    <li class="list-group-item d-flex justify-content-between fw-bold">
      Total <span class="text-primary">37 €</span>
    </li>
  </ul>
</div>
```

- Use the `BasketService` to implement the component logic

- Use `OnInit` lifecycle hook to dispatch the basket items

- To check that everything is working properly, you should be able to:
  - Visit the `http://localhost:4200/catalog` page, click on *"Voir mon panier"* and view the basket items
  - Reload the `http://localhost:4200/basket` page and view the basket items

<div class="pb"></div>

### `BasketGuard`

When visiting the page `http://localhost:4200/basket`:
  - If there are items in the basket, the `BasketComponent` should be displayed
  - It the basket is empty, an alternate `BasketEmptyComponent` should be displayed

Let's do this!

- Generate a `CanMatch` guard in `src/app/basket/basket.guard.ts` (from Angular 16, this will generate a functional guard)

- Use the `inject` function to inject your dependencies (instead of the `constructor` technique)

```ts
import { inject } from '@angular/core'; // <-- Warning: this is not `Inject`
import { CanMatchFn } from '@angular/router';
import { BasketService } from './basket.service';

export const basketGuard: CanMatchFn = () => {
  const basketService = inject(BasketService);
  return /* to be continued... */;
};
```

- Declare the guard in the appropriate route

- Generate a new component `BasketEmptyComponent`
  - It simply displays *"Votre panier est vide."*

- Add the route `'basket'` to display the component
  - Yes, it's the same route as for the `BasketComponent`

<div class="pb"></div>

### `ProductDetailsComponent`

Remember the route for this component is `'product/:id'`.

- Retrieve the `:id` from the `ActivatedRoute` snapshot

- Fetch the product from the API using the `ApiService`:
  - `http://localhost:8080/api/product/:id`

- Use the following code snippet to display the product details:

```html
<div class="row" *ngIf="product">
  <div class="col-12 col-md-4">
    <img
      [src]="product.photo" 
      class="mb-3 mb-md-0 w-100 rounded-3" alt="Product image"
    />
  </div>

  <div class="col-12 col-md-8">
    <h1>{{ product.title | uppercase }}</h1>

    <div class="table-responsive-sm">
      <table class="table caption-top">
        <caption>Détails du produit</caption>
        <tbody>
          <tr>
            <th scope="row">Description</th>
            <td style="min-width: 280px">{{ product.description }}</td>
          </tr>

          <tr>
            <th scope="row">Stock disponible</th>
            <td>{{ product.stock }}</td>
          </tr>

          <tr>
            <th scope="row">Prix</th>
            <td>{{ product.price | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
``` 

<div class="pb"></div>

### Application performances

At this point, take a look at the number of requests to the API in the Network tab of Chrome's developer tools.

- Each time you visit the `"catalog"` page, 2 requests are sent to fetch the catalog and basket items.
- Each time you visit the `"basket"` page, 1 request is sent to fetch the basket items

You can improve this behavior and ensure that requests are made only once.
To do this, you need to update the `dispatchProducts` and `dispatchItems` methods.

- Here's an example for the `dispatchProducts` method:

```ts
import { of } from 'rxjs';

export class CatalogService {
  private _products$ = new BehaviorSubject<Product[] | undefined>(undefined);

  constructor(private apiService: ApiService) {}

  /**
   *  @param refresh
   *    Fetch the products from the API server even if they
   *    have already been fetched and stored in the service.
   */
  dispatchProducts(refresh = false): Observable<void> {
    if (!refresh && this._products$.value) {
      return of(undefined);
    }
    return this.apiService.fetchProducts().pipe(/* ... */);
  }
}
```

<div class="pb"></div>

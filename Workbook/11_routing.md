## Lab 11: Routing

In this lab, you'll create a multi-page application (SPA) using the Angular router.

### `app.routes.ts`

- Create the following components and declare a route for each one of them:

  - Component: `CatalogComponent` --> Route: `'catalog'`
  - Component: `BasketComponent` --> Route: `'basket'`

- Add a route `**` that redirects to the `'catalog'`

### `CatalogComponent`

- Move the main content you have developed in the `AppComponent` to this one, including:
  - the template
  - the class logic
  - the tests (optional)

### `AppComponent`

- In `src/app/app.component.ts`, add `RouterOutlet` to the component `imports`

- In `src/app/app.component.html`, put a `<router-outlet />` directive, instead of the main content you just moved.
  The template should now look like this:

```html
<app-menu />

<main class="py-4 container">
  <router-outlet />
</main>
```

<div class="pb"></div>

### `RouterLink`

Add `routerLink` directives in the following templates (don't forget to add the `RouterLink` in the related components `imports`):

- In `catalog.component.html`:

  - to visit the page _"Voir mon panier"_

- In `menu.component.html`:

  - to return the home page when clicking on _"Zenika Ecommerce"_
  - to visit the page _"Voir mon panier"_

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
    <!-- Use `@for` to loop over the basket items -->
    <li class="list-group-item d-flex justify-content-between">
      Coding the snow <span class="text-primary">19 €</span>
    </li>

    <li class="list-group-item d-flex justify-content-between">
      Coding the world <span class="text-primary">18 €</span>
    </li>
    <!-- End of: Use `@for` to loop over the basket items -->

    <li class="list-group-item d-flex justify-content-between fw-bold">
      Total <span class="text-primary">37 €</span>
    </li>
  </ul>
</div>
```

- Use the `BasketService` to implement the component logic

- Subcribe to `BasketService.fetchBasket()` method in the class constructor, to trigger data fetching<br />
  Note that you'll remove this part once you've implemented the basket guard (see below *)

- To check that everything is working properly, you should be able to:
  - Visit the `http://localhost:4200/catalog` page, click on _"Voir mon panier"_ and view the basket items
  - Reload the `http://localhost:4200/basket` page and view the basket items

<div class="pb"></div>

### `BasketGuard`

When visiting the page `http://localhost:4200/basket`:

- If there are items in the basket, the `BasketComponent` should be displayed
- It the basket is empty, an alternate `BasketEmptyComponent` should be displayed

Let's do this!

- Generate a `CanMatch` guard in `src/app/basket/basket.guard.ts`

```ts
import { inject } from "@angular/core";
import { CanMatchFn } from "@angular/router";
import { BasketService } from "./basket.service";

export const basketGuard: CanMatchFn = () => {
  const basketService = inject(BasketService);
  return /* to be continued... */;
};
```

- Add the guard to the appropriate route

- Generate a new component `BasketEmptyComponent`
  - It simply displays _"Votre panier est vide."_

- Add the route `'basket'` to display the component
  - Yes, it's the same route as for the `BasketComponent`

- At this point, you can safely remove the `BasketService.fetchBasket()` subscription from the `BasketComponent` constructor, 
  because data fetching is now triggered by the guard itself anyway (see above *)

<div class="pb"></div>

### Bonus: `ProductDetailsComponent`

- Create the component and add a lazy-loaded route `'product/:id'`

- Retrieve the `:id` from the `ActivatedRoute` snapshot

- Fetch the product from the server using the `HttpClient` service:

  - `http://localhost:8080/api/product/:id`

- Use the following code snippet to display the product details:

```html
<div class="row" *ngIf="product">
  <div class="col-12 col-md-4">
    <img
      [src]="product.photo"
      class="mb-3 mb-md-0 w-100 rounded-3"
      alt="Product image"
    />
  </div>

  <div class="col-12 col-md-8">
    <h1>{{ product.title | uppercase }}</h1>

    <div class="table-responsive-sm">
      <table class="table caption-top">
        <caption>
          Détails du produit
        </caption>
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

### Bonus: Application performances

Have you noticed that when loading the catalog, the message _"Désolé, notre stock est vide !"_ appears briefly and is then replaced by the products once fetched?

You can improve this by not displaying anything as long as the `products` are undefined.

- In the `/catalog/catalog.component.ts` component, change the `_product` signature: 

```ts
@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private _products = signal<Product[] | undefined>(undefined);
  // Remember that previously, it was: `signal<Product[]>([])`
}
```

- Fix the errors raised by this change

- Finally, in the `/catalog/catalog.component.html` template, use `@if {}` statement like this:

```html
@if (products()) {
  <!-- The "for" loop that displays the products -->
}
```

### Bonus: Directories organisation

- The following directories can be moved within the `src/app/catalog/` directory:
  - `/product/`
  - `/select-product-key/`
  - `/sort-products/`

<div class="pb"></div>

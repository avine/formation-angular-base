## Lab 11: Routing 1/7

In this lab, you'll create a multi-page application (SPA) using the Angular router.

### `app.routes.ts`

- Create the following components and declare a route for each one of them:

  - Component: `Catalog` --> Route: `'catalog'`
  - Component: `Basket` --> Route: `'basket'`

- Add a route `**` that redirects to `'/catalog'`

### `Catalog` component

- Move the main content you have developed in the `App` component to this one, including:
  - the template
  - the class logic
  - the tests (optional)

### `App` component

- In `src/app/app.ts`, add `RouterOutlet` to the component `imports`

- In `src/app/app.html`, put a `<router-outlet />` directive, instead of the main content you just moved.
  The template should now look like this:

```html
<app-menu />

<main class="py-4 container">
  <router-outlet />
</main>
```



## Lab 11: Routing 2/7
### `RouterLink`

Add `routerLink` directives in the following templates (don't forget to add the `RouterLink` in the related components `imports`):

- In `catalog.html`:

  - to visit the page _"Voir mon panier"_

- In `menu.html`:

  - to return the home page when clicking on _"Zenika Ecommerce"_
  - to visit the page _"Voir mon panier"_

- In `product-card.html`:
  - to visit the product details page at `['/product', product.id]`<br />
    (below, you will create the `ProductDetails` component in the bonus section)



## Lab 11: Routing 3/7
### `Basket` component

- Use the following markup for the component template:

```html
<h2 class="h4">Mon panier</h2>

<div class="card">
  <div class="card-header">2 articles</div>

  <ul class="list-group list-group-flush">
    <!-- Use `@for` block to loop over the basket items -->
    <li class="list-group-item d-flex justify-content-between">
      Coding the snow <span class="text-primary">19 €</span>
    </li>

    <li class="list-group-item d-flex justify-content-between">
      Coding the world <span class="text-primary">18 €</span>
    </li>
    <!-- End of: Use `@for` block to loop over the basket items -->

    <li class="list-group-item d-flex justify-content-between fw-bold">
      Total <span class="text-primary">37 €</span>
    </li>
  </ul>
</div>
```

- Use the `BasketResource` service to implement the component logic

- Subcribe to `BasketResource.fetchBasket` method in the class constructor, to trigger data fetching<br />
  Note that you'll remove this part once you've implemented the basket guard (see below ***)

- To check that everything is working properly, you should be able to:
  - Visit the `http://localhost:4200/catalog` page, click on _"Voir mon panier"_ and view the basket items
  - Reload the `http://localhost:4200/basket` page and view the basket items



## Lab 11: Routing 4/7
### `BasketGuard`

When visiting the page `http://localhost:4200/basket`:

- If there are items in the basket, the `Basket` component should be displayed
- It the basket is empty, an alternate `BasketEmpty` component should be displayed

Let's do this!

- Generate a `CanMatch` guard in `src/app/basket/basket-guard.ts`

```ts
import { inject } from "@angular/core";
import { CanMatchFn } from "@angular/router";
import { BasketResource } from "./basket-resource";

export const basketGuard: CanMatchFn = () => {
  const basketResource = inject(BasketResource);
  return /* to be continued... */;
};
```

- Add the guard to the appropriate route

- Generate a new component `BasketEmpty` component
  - It simply displays _"Votre panier est vide."_

- Add the route `'basket'` to display the component
  - Yes, it's the same route as for the `Basket` component

- At this point, you can safely remove the `BasketResource.fetchBasket` subscription from the `Basket` component constructor, 
  because data fetching is now triggered by the guard itself anyway (see above ***)



## Lab 11: Routing 5/7
### Bonus: `ProductDetails` component

- Create the component and add a lazy-loaded route `'product/:id'`

- Retrieve the `:id` from the `ActivatedRoute` snapshot

- Fetch the product from the server using the `HttpClient` service:
  - `http://localhost:8080/api/product/:id`

- Store the fetched product in a class property:
  - `product = signal<Product | undefined>(undefined);`

- For the component template, copy/paste the following:
  - `lab/resources/product-details/product-details.html`



## Lab 11: Routing 6/7
### Bonus: application performances

Have you noticed that when loading the catalog, the message _"Désolé, notre stock est vide !"_ appears briefly and is then replaced by the products once fetched?

You can improve this by not displaying anything as long as the `products` are undefined.

- In the `/catalog/catalog-resource.ts` service, change the `_product` signature: 

```ts
@Injectable({
  providedIn: 'root',
})
export class CatalogResource {
  private _products = signal<Product[] | undefined>(undefined);
  // Remember that previously, it was: `signal<Product[]>([])`
}
```

- Fix the errors raised by this change

- Finally, in the `/catalog/catalog.html` component template, use `@if {}` statement like this:

```html
@if (products()) {
  <!-- The "@for" loop that displays the products -->
}
```



## Lab 11: Routing 7/7
### Bonus: directories organisation

- The following directories can be moved within the `src/app/catalog/` directory:
  - `/highlight-price/`
  - `/product/`
  - `/select-product-key/`
  - `/sort-products/`

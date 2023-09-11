## Lab 4: Directives

In this lab, you'll use the `ngClass`, `ngFor` and `ngIf` directives to improve the application's logic.

### `ProductComponent`

- Use `ngClass` directive the add the CSS class `.text-bg-warning` on the element `<div class="card h-100 text-center">` but only when the product `stock` is equal to 1 (last chance to buy it!).

### `AppComponent`

- Update `addToBasket` method to decrease the product stock when user clicks *"Ajouter au panier"*

- Add a getter `get hasProductsInStock(): boolean` that returns `true` when at least one product has a stock greater than 0

- Use `ngFor` directive to iterate over the `products` arrays to display each `<app-product />` component

- Use `ngIf` directive to display only the products with a `stock` greater than 0
  - Remember you can't have 2 strutural directives on the same element
  - Use `<ng-container>` to get around the problem

- Use `*ngIf="hasProductsInStock"; else...` statement to display the message *"Désolé, notre stock est vide !"* when there's no product left in the catalog

### Tests

#### `product.component.spec.ts`

- It should not add the "text-bg-warning" className when stock is greater than 1

- It should add the "text-bg-warning" className when stock is equal to 1


#### `app.component.spec.ts`

- It should decrease the stock of the product added to the basket

- It should not display products whose stock is empty

- It should display a message when stock is completely empty

<div class="pb"></div>

## Lab 6: Directives

In this lab, you'll use the `ngClass` directive to improve the application's logic.

### `ProductComponent`

- Use `ngClass` directive the add the CSS class `.text-bg-warning` on the element `<div class="card h-100 text-center">` but only when the product `stock` is equal to 1 (last chance to buy it!).

### Tests

#### `product.component.spec.ts`

- It should not add the "text-bg-warning" className when stock is greater than 1

- It should add the "text-bg-warning" className when stock is equal to 1

<div class="pb"></div>

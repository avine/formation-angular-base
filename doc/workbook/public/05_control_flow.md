## Lab 5: Control flow

In this lab, you'll use the `@for`, `@if` and `@else` blocks to improve the application's logic.

### `App` component

- Update `addToBasket` method to decrease the product stock when user clicks on _"Ajouter au panier"_

- Add a getter `get hasProductsInStock(): boolean` that returns `true` when at least one product has a stock greater than 0

- Use a `@for` block to iterate over the `products` arrays to display each `<app-product-card />` component

- Use a `@if` block to display only the products with a `stock` greater than 0

- Use `@if (hasProductsInStock) {} @else {}` to display the message _"Désolé, notre stock est vide !"_ when there's no product left in the catalog

### Tests

#### `app.spec.ts`

- It should decrease the stock of the product added to the basket

- It should not display products whose stock is empty

- It should display a message when stock is completely empty

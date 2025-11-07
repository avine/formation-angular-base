## Lab 5: Control flow

In this lab, you'll use the `@for`, `@if` and `@else` blocks to improve the application's logic.

### `App` component

- Update `addToBasket` method to decrease the product stock when user clicks on _"Ajouter au panier"_

- Add a getter `get productsInStock(): Product[]` which returns the list of products whose stock is greater than 0

- Use a `@for` block to iterate over the `products` (in stock) array to display each `<app-product-card />` component

- Use `@if (productsInStock.length) {} @else {}` to display the message _"Désolé, notre stock est vide !"_ when all products have an sotck equal to 0

### Tests

#### `app.spec.ts`

- It should decrease the stock of the product added to the basket

- It should not display products whose stock is empty

- It should display a message when stock is completely empty

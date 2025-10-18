## Lab 7: Signals

In this Lab, you'll convert the `App` component properties into signals.

### `HighlightPrice` directive

- Use a `computed<string>` signal for the `highlightClass` property

### `App` component

- Use a `signal<Product[]>` signal for the `products` property

- Use a `computed<Product[]>` signal for the `productsInStock` property

- Use a `signal<number>` signal for the `total` property

- Fix the `addToBasket()` method to properly update the `products` and `total` signals

- Update the component template to properly consume the different signals

### Tests

#### `app.spec.ts`

- Fix the tests to properly consume the different signals

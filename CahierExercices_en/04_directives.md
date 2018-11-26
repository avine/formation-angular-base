## Lab 4: Angular directives

In this lab, we will use `ngFor`, `ngIf` and `ngClass` to have a more dynamic application.  

- Use `ngFor` directive to iterate over the `products` arrays in the `ProductComponent` component.

- In the `Product` class, add a `stock` property with `number` type.

- Initialize that property for all products in the `AppComponent` component. Use a different value for each product.

- Use the `ngIf` directive to display only the products with a `stock` value greater than 0. You might have to revise your use of `*ngFor`.

- Use the `ngClass` directive to add the `last` CSS class, on the element with the `thumbnail` class, if the `stock` value is equal to 1. We will use that class to change the background color to (`background-color: rgba(255, 0, 0, 0.4)`)

### Tests

- Fix tests that fail because of the modifications done in the `Product` class (add the `stock` field). Notice that the binding tests of products still work whereas the implementation changed (by using `ngFor`).

- Add a test on the `updatePrice` method to check that the `stock` has been decreased.

- In the `app` component, test that a product without `stock` is not displayed. Update the `products` array with a new array containing two products, one with `stock` and one without. After running `fixture.detectChanges()`, check that there is only one `app-product` component and that its `data` property is equal to the product with `stock`.

- In the `app-product` component, add two tests:
  - Check that the `last` class is not added if the `stock` is greater than 1
  - Check that the `last` class is added if the stock is `equal` to 1.

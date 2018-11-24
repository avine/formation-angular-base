## TP4: The Angular Guidelines

In this lab we will use the `ngFor`,`ngIf` and `ngClass` directives to make our page more dynamic. Angular's other guidelines will be presented in the forms chapter.

- With the `ngFor` directive, go to the `products` list to display as many `ProductComponent` components as there are items in this array.

- In the `Product` class, add a `stock` property of type `number`.

- Initiate this property for all products defined in the `AppComponent` component. We advise you to put a different value for each product, in order to be able to test the different cases defined below.

- Modify the `updatePrice` method of the `AppComponent` component to reduce the stock of the product as soon as you click on `Add to cart`.

- With the `ngIf` directive, display a product, only if its `stock` property is greater than 0. You may need to review the use of `*ngFor` 'from the previous point.

- Using the `ngClass` directive, add a CSS `last` class, on the element using the `thumbnail` class, if the `stock` property of a product reaches 1. This class will only be used to modify the background color (`background-color: rgba (255, 0, 0, 0.4)`)

### Tests

- Correct the existing tests taking into account the change of signature of the `Product` class (adding the stock field). It will be noted that the product binding test still works while the implementation has changed (use of `ngFor`).

- Complete the test of the `updatePrice` method to verify that the stock of the product has been decreased.

- Add a test in `app` verifying that a product without stock is not displayed. To do this, modify the `products` table with a new table containing two products, one empty stock, the other not. After starting `fixture.detectChanges ()`, check that there is only one `app-product` tag and that its `data` property is equal to the product with the stock.

- Add two tests in `app-product`, one checking that the class `last` is not added if the stock is greater than 1, the other checking that it is if the stock is equal to 1.

## TP5: Dependency Injection

We will now discuss services and dependency injection in an Angular application.

We will create two services:

- ProductService : who will be in charge of product management,
- CustomerService : who will be in charge of the user's cart.

- Please create a `ProductService` service using the `ng generate service services/Product` command where you define:
- a `products` array with the values defined in the`AppComponent.ts` component
- a `getProducts()` method: will return the array `products`
- an `isTheLast(product)` method: will return `true` if the stock of a product is equal to 1
- an `isAvailable(product)` method: will return `true` if the stock of a product is not equal to 0
- a `decreaseStock(product)` method: will update the `stock` property of the product specified as a parameter

- Please create a `CustomerService` service, using the `ng generate service services/Customer` command where you define:
- a `addProduct(product)` method: will add the new product in a table, this table represents your basket.
- a `getTotal()` method: will calculate the total amount of the basket.

- Import these two services in your `Application` component, and modify the implementation of this component in order to use the different methods implemented previously.

- To finish this lab, we will externalize the title "Welcome to Zenika Ecommerce" in a variable variable of type `String` using a provider of type `Value`

### Tests

With the addition of dependencies to your components, the tests you've done so far will almost all fail. Indeed, to use your components, it will now be necessary for Angular to know how to solve the dependencies of each component.

Remember that the purpose of each unit test is to test the code of the element being tested (component or service) without ever using code from another element. So do not satisfy dependencies with real implementations but with mocks.

In addition, the addition of service has shifted some responsibilities. Some tests performed so far in the components should not be corrected but deleted.

- In the `app` tests, create a minimalist `ProductServiceMock` class that will replace `ProductService` and a `CustomerService` class. Add a `providers` property in the test module with `ProductService` and `CustomerService` defined with their mock and a value for `welcomeMsg`.

- In the `app` tests, remove the tests for calculating and updating the cart total. The component is no longer responsible for this calculation.

- In the `app` tests, use the Angular `inject` function to get instances of the services and the `spyOn` function to make Jasmine spies in order to run the existing tests again.

- In the `app` tests, add a test checking the value of `welcomeMsg` from the dependency injection is present in the header.

- In the `app` tests, add a test that checks the `updatePrice` function to run successfully using spies for `addProduct` and `decreaseStock` methods.

- In the `app-product` tests, run the existing tests in the same way as the `app` tests (with mock and spy).

- Add tests to `CustomerService`. A test to verify that the basket is initialized without product, another to validate that `addProduct` adds the product to the cart and one to validate the calculation of the total price of the cart.

- Add tests to `ProductService`. One to check that there are 4 products at the beginning, one validating the operation of the `isTheLast` function and one last for the function `decreaseStock`.

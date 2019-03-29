## Lab 5: Dependency injection

We will now create services and understand the dependency injection mechanism in an Angular application.

We will create two services:

- ProductService: to manage products.
- CustomerService: to manage the basket.

- Create a service `services\ProductService.ts` (use angular-cli) with:
	- The `products` array defined in the `AppComponent.ts` component
	- A `getProducts()` method that returns the `products`.
	- A `isTheLast(product)` method that returns `true` if the product stock value is equal to 1.
	- A `isAvailable(product)` method that returns `true` if the product stock value is greater than 0.
	- A `decreaseStock(product)` method to decrement the `stock` product value

- Create a service `services\CustomerService.ts` with:
	- A `addProduct(product)` method that adds a new product in the basket
	- A `getTotal()` method that computes the basket price.

- Import those two services in the `Application` component, and change the component to use the services.

- To conclude this lab, inject the title "Welcome to Zenika Ecommerce" as `String` by using a `Value` provider

- Bonus: write tests

### Tests

Because of dependencies added to your components, tests fail. To use the components, Angular need to know how to resolve those dependencies for all components.

Remember that the goal of a unit test is to test a unit in isolation: the unit doesn't depend on any external services/components. We need to use mocks instead of dependencies real implementations.

Moreover, by using services, we introduced a 'separation of concerns'. Some tests previously done in the components must not be fixed but removed.

- In the `app` component tests, create a minimalist class called `ProductServiceMock` that will replace `ProductService`. Repeat for `CustomerService`. Add the `providers` property in the test module with `ProductService` and `CustomerService` using their mock. Provide a value for `welcomeMsg`.

- In the `app` component tests, remove tests about the computation of the basket price. This component doesn't hold the responsibility of that computation.

- In the `app` component tests, use Angular `inject` function to get services instances and `spyOn` function to create Jasmine spies in order to pass tests.

- In the `app` component tests, add a test checking that `welcomeMsg` value is set in the header.

- In the `app` component tests, add a test checking that the `updatePrice` function is working well by using spies on the `addProduct` and `decreaseStock` functions.

- In the `app-product` component tests, make existing tests pass like with the `app` component (by using mocks and spies).

- Add tests in the `CustomerService` service. One to check that the basket is initialized without products, another to check that the `addProduct` function add a product in the basket and a last one to check the computation of the basket price.

- Add tests in the `ProductService` service. One to check there are 4 products after initialization, another to check the `isTheLast` function and a last one to check the `decreaseStock` function.

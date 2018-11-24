## TP7: Communication with a REST API

After receiving from the trainer a REST server developed in NodeJS, we will manipulate this API to retrieve the list of products, and persist the user's basket.

To launch the REST server, you must run the following command:

```shell
cd server
npm install
npm start
```

The server will be available through the URL `http://localhost:8080/rest/`.

This API offers several entry points:

- `GET` on `/products` will return the list of products
- `GET` on `/basket` will return the user's cart
- `POST` on `/basket` to add a new product to the user cart

- It is necessary to import the `HttpClientModule` module into the `AppModule` module

- We will first modify the `ProductService` service. In the `getProducts` method, we will send a `HTTP` request to the corresponding API.

- When receiving the request, use the `map` operator to build object products.

- Change the `AppComponent` component accordingly.

- We will now modify the `CustomerService` service in the same way.
  - Create a `getBasket` method with the same operation as the previous point
  - Implement an `addProduct` method in which we will send a `POST` method to add a product to the user's cart.


- Change the `AppComponent` component to use the new version of `CustomerService` and `ProductService` services.

### Tests

- In the `app` tests, update the tests to fit the new signing services. In mock, use `of ()` to create observables from a return value (it will also need `import {of} from 'rxjs';`).

- In the `ProductService` and `CustomerService` tests, add to the test module the import of `HttpClientTestingModule`. Once done, update the tests by simulating the server responses and taking into account the new signatures of the methods.

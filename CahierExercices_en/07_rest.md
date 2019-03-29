## Lab 7: Communication with REST API

The goal is to communicate with a REST server developed with NodeJS (given by the trainer), to get products and save the basket.

To run the server, do:

```shell
cd server
npm install
npm start
```

The server will be available on `http://localhost:8080/rest/` URL.

Here are the available entry points:

- `GET` `/products` to get all products
- `GET` `/basket` to get the basket
- `POST` `/basket` to add a new product in the basket

- It is required to import the `HttpClientModule` module into the `AppModule` module

- First update the `ProductService` service. In the `getProducts` method, send a `http` request to the server. When the server responds:
  - use the `map` operator to build object products

- Update the `AppComponent` component consequently.

- Update the `CustomerService` service like the `ProductService` service.
  - Create a `getBasket` method working like the `getProducts` method
  - Implement a `addProduct` method to add a product in the basket using the `POST` method.


- Change the `AppComponent` component to use the new version of `CustomerService` and `ProductService` services.

### Tests

- Update `app` component tests to use the new services signatures. In mocks, use `of ()` to create an observable from a value (don't forget to import the `of` method with: `import {of} from 'rxjs';`).

- In the `ProductService` and `CustomerService` services tests, import `HttpClientTestingModule` in test modules. Then update the tests by simulating the server responses and taking into account the new signatures of the methods.

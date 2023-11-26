## Lab 7: Http

### PART 1

To begin with, you will learn how to send http requests from your Angular app to a web server.

#### Communicate with an http server

In this lab, you'll communicate with a REST API server that will manage the products and the basket.

- To run the server, open a new shell window in the `Exercises/resources/server` folder and run the following commands:

```shell
npm install
npm start
```

The server is listening on: `http://localhost:8080/api/`

Here are the available endpoints:

- `GET /products` to fetch all products
- `GET /products/:productId` to fetch one product
- `GET /basket` to fetch the basket
- `POST /basket` with a request body of type `{ productId: string; }` to add a new item to the basket

### `AppModule`

- Import the `HttpClientModule`

### `CatalogService`

- Remove the default products in the `_products` property - it should now default to `[]`.
- Inject the `HttpClient` service
- Add a method `fetchProducts(): void` that queries our server for our products and stock the products response in `_products`

### `AppComponent`

- Call the `catalogService.fetchProducts` method to fetch products in `ngOnInit`

Everything should be compiling at this point, verify 
- your app still display ours products
- you see a http request to `/products` in your devtools

### `BasketService`

- Inject the `HttpClient` service
- Update the `addItem` method to save the added item on our server, it should have the following signature `addItem(productId: string): void`. Once saved, push the added product to `_items`.

### `AppComponent`

- Update the method `addToBasket` to use the new signature of your `basketService.addItem` method

At this point your app should
- display your products again by fetching them from our server
- add a product to our basket kept in our server when clicking the 'add to basket' button (use the devtools again to verify the http call is working)

<div class="pb"></div>

### PART 2

You now have succeeded in requesting data from your server. But there is still room for improvements. The main problem in your current app is that your components have no idea when your http calls are finished, even though they trigger them.

But why is it a problem ? My app is working correctly you might think.  
In some cases (like when you fetch your product list) even if you don't know when the fetch is finished, it still works correctly as Angular detects it and updates your view. But what about when you have to explicitly trigger some code after a http call ?

For example, when you want to decrease the stock of your product after adding it to your basket ? Currently it is not working properly in your application: you decrease the stock before even knowing if your product was correctly added to your basket on your server

This is one of the reason why it is considered a good practice to **always expose the Observable you create** (unless you have a very good reason not to do so). You never know if your caller (the part of your app that called your method) might need to wait for the http call (of whatever process represented through your Observable) to finish before doing something.

So let's improve your app.

#### Expose observables and use operators

### `BasketService`

- Change the signature of the `addItem` method to: `addItem(productId: string): Observable<BasketItem>`
- In the `addItem` method, returns your Observable and use the `tap` operator to add the basket item to the property `_items` once the http called to our server is finished.

### `CatalogService`

- Change the signature of the `fetchProducts` method to: `fetchProducts(): Observable<Product[]>`
- In the `fetchProducts` method, returns your Observable and use the `tap` operator to add the received products in the `_products` property.

### `AppComponent`

- In the `addToBasket` method, subscribe to the Observable returned from `basketService.addItem` and decrease the stock of your product after it has been added to your basket.
- In the `ngOnInit` method, subscribe to the Observable returned from `fetchProducts`, do you understand why ?

Everything in your app should be working correctly at this point.

<div class="pb"></div>

### PART 3

For this last part, you will fix the last problem on your app with a bit less guidance to train on more realistic conditions 🙂  

Before reading any further, you can try to found the remaining problem and fix it by yourself: it is a functional problem.  

When you refresh your application, there is still two problems : 
- you don't display the correct basket total 
- you don't display the correct number of items in your basket

Hint : take a look at the `BasketService` and the `CatalogService`. You manage two data on your app: a catalog of products and a basket. When do you fetch the basket ?

<div class="pb"></div>



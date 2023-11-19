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
- Add a method `fetchProducts(): Observable<Product[]>` that queries our server for our products

### `AppComponent`

- Comment the getter `get products`
- Create a `products` property which is an array of `Product`, default to `[]`
- Call the `catalogService.fetchProducts` method to fetch products in `ngOnInit`
- Set the `products` property with the data received from `fetchProducts`

Everything should be compiling at this point, verify 
- your app still display ours products
- you see a http request to `/products` in your devtools

### `BasketService`

- Inject the `HttpClient` service
- Update the `addItem` method to save the added item on our server, it should have the following signature `addItem(productId: string): Observable<BasketItem>`

### `AppComponent`

- Update the method `addToBasket`: make sure you decrease the stock of a product only after it has been successfully added to the basket on our server.

At this point your app should
- display your products again by fetching them from our server
- add a product to our basket kept in our server when clicking the 'add to basket' button (use the devtools again to verify the http call is working)

<div class="pb"></div>

### PART 2

You now have succeeded in requesting data from your server. But there is still many places where your app does not use the requested data to avoid multiple http calls.  
Let's improve that by using operators to keep track of our data and share it easily.

#### Use operators to intercept data

### `BasketService`

- In the `addItem` method, use the `tap` operator to add the basket item to the property `_items` once the http called to our server suceeded.

### `CatalogService`

- In the `fetchProducts` method, use the `tap` operator to add the received products in the `_products` property.

### `AppComponent`

- Remove the `products` property
- Uncomment the getter `get products`
- Remove the function you wrote inside the subscribe of your call to `fetchProducts`, do you understand why ?

At this point, your app should:
- be able to change the color of the product card again when there is only 1 stock
- display the message `Désolé, notre stock est vide !` again when there is no more products available

<div class="pb"></div>

### PART 3

For this last part, you will be on your own. Fix the following problem : 

When you refresh your application, there is still two problems : 
- you don't display the correct basket total 
- you don't display the correct number of items in your basket

Use what you learn in the two previous parts to fix it.

<div class="pb"></div>



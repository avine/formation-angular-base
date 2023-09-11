## Lab 5: Services

In this lab, you'll move the data ownership from the `AppComponent` to **services**.

You need to create 2 services using Angular CLI:

- `src/app/catalog/catalog.service.ts`: to manage the products

- `src/app/basket/basket.service.ts`: to manage the basket items

### `CatalogService`

The service should have:

- A `_products: Products[]` private property (move here the 4 products defined in `app.component.ts`)

- A `get products(): Products[]` getter that returns the `_products` property

- A `get hasProductsInStock(): boolean` getter that returns `true` if at least one product stock is greater than 0

- A `decreaseStock(productId: string): boolean` method to decrease the corresponding product stock if it is greater than 0

### `BasketService`

- Define a new interface:

```ts
// src/app/basket/basket.types.ts
export interface BasketItem {
  id: string;
  title: string;
  price: number;
}
```

The service should have:

- A `_items: BasketItem[]` private property

- A `get items(): BasketItem[]` getter that returns the `_items` property

- A `get total(): number` getter that returns the basket total (derived from `_items`)

- A `addItem(item: BasketItem): void` method that add an item to the basket

<div class="pb"></div>

### Use of services

- `MenuComponent`: use the `BasketService` to display the number of items in the basket

- `AppComponent`: refactor the component to use both the `CatalogService` and `BasketService` services

### Use of injection token

- Create an injection token `APP_TITLE` in `src/app/app.token.ts`

- Provide the token using a `ValueProvider` with the value *"Bienvenue sur Zenika Ecommerce"*

- Inject the token in the `AppComponent` to display the app title

### Tests

Since we've modified the application extensively, several tests fail!
Some components now depend on newly created services.

As these services are "provided in root", they are automatically provided in `TestBed` and used in our tests.

```ts
@Injectable({ providedIn: 'root' }) export class CatalogService {}
```

But remember that the goal of unit testing is to test each unit in isolation.
So, we need to use *Stubs* instead of real implementations.

In addition, by using services, we have introduced a good *"separation of concerns"*.
Some tests currently performed in components do not need to be fixed, but simply removed.

#### `app.component.spec.ts`

- Create a minimalist class called `CatalogStubService` that will replace `CatalogService`

```ts
// Note: do not use `{ providedIn: "root" }` metadata
// because the stub will be provided manually in our tests.
@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items: BasketItem[] = [];
  total = 0;
  addItem(item: BasketItem): void {
    this.items.push(item);
  }
}
```

<div class="pb"></div>

- Do the same with `BasketStubService` for the `BasketService`

- Provide the stubs in `app.component.spec.ts`

- Provide a value for `APP_TITLE` injection token

- Remove the tests related to the computation of the **basket total** and **catalog stock update** (The `AppComponent` is no longer responsible for these computations):
  - <del>It should update the total when a product emits the "addToBasket" event</del>
  - <del>It should update the total when "addToBasket" class method is called</del>
  - <del>It should decrease the stock of the product added to the basket</del>

Instead, add new, more relevant tests:

- It should call "CatalogService.decreaseStock" and "BasketService.addItem" methods when a product is added to the basket
  - For that use `TestBed.inject` function (to get the services instances) and `spyOn` Jasmine function (to spy on these methods)

- It should display the app title

#### `catalog.service.spec.ts`

- It should decrease the product stock

- It should not decrease the product stock when stock is empty

#### `basket.service.spec.ts`

- It should update the items when product added

- It should update the total when product added

#### `menu.component.spec.ts`

- It should display the number of items

<div class="pb"></div>

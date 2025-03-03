## Lab 8: Services

In this lab, you'll move the data ownership from the `AppComponent` to **services**.

You need to create 2 services using Angular CLI:

- `src/app/catalog/catalog.service.ts`: to manage the products

- `src/app/basket/basket.service.ts`: to manage the basket items

### `CatalogService`

The service should have:

- A `_products = signal<Product[]>(...)` private property (move here the 4 products defined in `app.component.ts`)

- A `products = _products.asReadonly()` public property

- A `hasProductsInStock = computed<boolean>(...)` computed signal that returns `true` if at least one product stock is greater than 0

- A `decreaseStock(productId: string)` method to decrease the corresponding product stock if it is greater than 0

#### Usage

- `Appcomponent`: refactor the component to use the `CatalogService` service

<div class="pb"></div>

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

- A `_items = signal<BasketItem[]>(...)` private property

- A `items = _items.asReadonly()` public property

- A `total = computed<number>(...)` computed signal that returns the basket total

- A `addItem(item: BasketItem): void` method that add an item to the basket

### Usage

- `AppComponent`: refactor the component to use the  `BasketService` service

- `MenuComponent`: use the `BasketService` to display the number of items in the basket.<br />
  To achieve this, add a `numberOfItems = computed<number>(...)` property to the menu component.

### Use of injection token

- Create an injection token `APP_TITLE` in `src/app/app.token.ts`

- Provide the token using a `ValueProvider` with the value _"Bienvenue sur Zenika Ecommerce"_

- Inject the token in the `AppComponent` to display the app title

<div class="pb"></div>

### Tests

Since we've modified the application extensively, tests fail!

- For now, let's disable the tests in `app.component.spec.ts` by adding an `x` before the main `describe()`:

```ts
xdescribe("AppComponent", () => { /* ... */ });
```

#### `catalog.service.spec.ts`

- It should decrease the product stock

- It should not decrease the product stock when stock is empty

#### `basket.service.spec.ts`

- It should update the items when a product is added

- It should update the total when a product is added

#### `menu.component.spec.ts`

The component now depends on the newly created `BasketService`.
Note that, as this service is "provided in root", it is automatically provided in `TestBed` and used in our tests.

```ts
@Injectable({ providedIn: "root" })
export class BasketService {}
```

But remember that the goal of unit testing is to test each unit in isolation.
So, we need to use _Stubs_ instead of real implementations.

- Create a minimalist class called `BasketStubService` that will replace the `BasketService`

```ts
// Note: do not use `{ providedIn: "root" }` metadata
// because the stub will be provided manually in our tests.
@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items = signal<BasketItem[]>([]);
  total = signal(0);
  addItem(item: BasketItem): void {
    this.items.update((items) => [...items, item]);
  }
}
```

- Provide the stub in `menu.component.spec.ts`

<div class="pb"></div>

Add test:

- It should display the number of items

#### `app.component.spec.ts`

Some tests currently performed in this component do not need to be fixed, but simply removed, as they are no longer relevant.

- Remove the tests related to the computation of the **basket total** and **catalog stock update** (the `AppComponent` is no longer responsible for these computations):

  - <del>It should update the total when a product emits the "addToBasket" event</del>
  - <del>It should update the total when "addToBasket" class method is called</del>
  - <del>It should decrease the stock of the product added to the basket</del>

- Remove the `x` from `xdescribe()` that you added previously to re-enable the tests

- Create a minimalist class `CatalogStubService` that will replace the `CatalogService` (such as you did above for the `BasketService`)

- Provide the 2 stubs in `app.component.spec.ts`

- Provide a value for `APP_TITLE` injection token

- Fix the remaining tests

Add new, more relevant tests:

- It should call "CatalogService.decreaseStock" and "BasketService.addItem" methods when a product is added to the basket

  - For that use `TestBed.inject` function (to get the services instances) and `spyOn` Jasmine function (to spy on these methods)

- It should display the app title

<div class="pb"></div>

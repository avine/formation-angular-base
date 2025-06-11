## Lab 8: Dependency injection 1/5

In this lab, you'll move the data ownership from the `App` component to **services**.

You need to create 2 services using Angular CLI:

- `src/app/catalog/catalog-resource.ts`: to manage the products

- `src/app/basket/basket-resource.ts`: to manage the basket items

### `CatalogResource`

The service should have:

- A `_products = signal<Product[]>(...)` private property *(move here the 4 products defined in `app.ts`)*

- A `products = this._products.asReadonly()` public property

- A `productsInStock = computed<Product[]>(...)` computed signal which returns the list of products whose stock is greater than 0 *(move some code from `app.ts`)*

- A `decreaseStock(productId: string)` method to decrease the corresponding product stock if it is greater than 0 *(move some code from `app.ts`)*

#### Usage

- Refactor the `App` component to use the `CatalogResource` service



## Lab 8: Dependency injection 2/5
### `BasketResource`

- Define a new interface:

```ts
// src/app/basket/basket-types.ts
export interface BasketItem {
  id: string;
  title: string;
  price: number;
}
```

The service should have:

- A `_items = signal<BasketItem[]>(...)` private property

- A `items = this._items.asReadonly()` public property

- A `total = computed<number>(...)` computed signal that returns the basket total

- A `addItem(item: BasketItem): void` method that add an item to the basket

#### Usage

- Refactor the `App` component to use the  `BasketResource` service

- In the `Menu` component, use the `BasketResource` to display the number of items in the basket.
  To achieve this, add a `numberOfItems = computed<number>(...)` property to the menu component.



## Lab 8: Dependency injection 3/5
### Bonus: use of injection token

- Create an injection token `APP_TITLE` in `src/app/app.token.ts`

- Provide the token using a `ValueProvider` with the value _"Bienvenue sur Zenika Ecommerce"_

- Inject the token in the `App` component to display the app title

### Tests

Since we've modified the application extensively, tests fail!

- For now, let's disable the tests in `app.spec.ts` by adding an `x` before the main `describe()`:

```ts
xdescribe("App", () => { /* ... */ });
```

#### `catalog-resource.spec.ts`

- It should decrease the product stock

- It should not decrease the product stock when stock is empty

#### `basket-resource.spec.ts`

- It should update the items when a product is added

- It should update the total when a product is added



## Lab 8: Dependency injection 4/5
#### `menu.spec.ts`

The component now depends on the newly created `BasketResource`.
Note that, as this service is "provided in root", it is automatically provided in `TestBed` and used in our tests.

```ts
@Injectable({ providedIn: "root" })
export class BasketResource {}
```

But remember that the goal of unit testing is to test each unit in isolation.
So, we need to use _Stubs_ instead of real implementations.

- Create a minimalist class called `BasketResourceStub` that will replace the `BasketResource`

```ts
// Note: do not use `{ providedIn: "root" }` metadata
// because the stub will be provided manually in our tests.
@Injectable()
export class BasketResourceStub implements Partial<BasketResource> {
  items = signal<BasketItem[]>([]);
  total = signal(0);
  addItem(item: BasketItem): void {
    this.items.update((items) => [...items, item]);
  }
}
```

- Provide the stub in `menu.spec.ts`

Add test:

- It should display the number of items



## Lab 8: Dependency injection 5/5
#### `app.spec.ts`

Some tests currently performed in this component do not need to be fixed, but simply removed, as they are no longer relevant.

- Remove the tests related to the computation of the **basket total** and **catalog stock update** (the `App` component is no longer responsible for these computations):

  - <del>It should update the total when a product emits the "addToBasket" event</del>
  - <del>It should update the total when "addToBasket" class method is called</del>
  - <del>It should decrease the stock of the product added to the basket</del>

- Remove the `x` from `xdescribe()` that you added previously to re-enable the tests

- Create a minimalist class `CatalogResourceStub` that will replace the `CatalogResource` (such as you did above for the `BasketResource`)

- Provide the 2 stubs in `app.spec.ts`

- Provide a value for `APP_TITLE` injection token

- Fix the remaining tests

Add new, more relevant tests:

- It should call "CatalogResource.decreaseStock" and "BasketResource.addItem" methods when a product is added to the basket

  - For that use `TestBed.inject` function (to get the services instances) and `spyOn` Jasmine function (to spy on these methods)

- It should display the app title

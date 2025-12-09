## Lab 4: Testing 1/3

In this lab, you will implement the tests for the app you developed in the "**Lab 3: Components**".

The `Menu` component doesn't need to be tested, since it has no logic.

You're going to focus on the `ProductCard` and `App` components.

- Before running the tests, replace the content of `app.spec.ts` with the following:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

- Run the tests using Angular CLI:

```bash
ng test
```

Some tests fail. Let's fix them!

<!-- separator-vertical -->

## Lab 4: Testing 2/3
### `product-card.spec.ts`

- First, let's focus on this test, disabling all the others:

```ts
// Add temporarily the prefix "f" ("focus") to the `describe` function
fdescribe('ProductCard', () => {
  /* ... */
});
```

- In the `beforeEach` section, define the required `product` property:

```ts
fixture.componentRef.setInput('product', {
  title: 'TITLE',
  description: 'DESC',
  // ...
});
```

Now, the test setup should pass (but we're not testing anything useful at the moment).

#### Tests

- It should display the product photo as image url

- It should display the product description

- It should display the product title

- It should display the product price

- It should emit addToBasket event with the given product when the button is clicked
  - Spy on the `emit` method of the `addToBasket` output to check that it is called

- It should not add the "text-bg-warning" className when stock is greater than 1

- It should add the "text-bg-warning" className when stock is equal to 1

<!-- separator-vertical -->

## Lab 4: Testing 3/3
### `app.spec.ts`

- Now remove the "f" ("focus") prefix you previously added to the `describe` function of the `ProductCard` test.

The `App` component depends on 2 other components:

- `Menu`

- `ProductCard`

Choose one of the two approaches you learned about in the slides:

- First approach - **with implicit dependency import**

- Second approach - **allowing unknown HTML elements**

#### Tests

- It should display the products

- It should update the total when "addToBasket" class method is called (Class testing)

- It should update the total when a product emits the "addToBasket" event (DOM testing)

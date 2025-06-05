## Lab 4: Unit testing

In this lab, you will implement the tests for the app you developed in the "**Lab 3: Components**".

The `Menu` component don't need to be tested, since it have no logic.

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

```shell
ng test
```

Some tests fail. Let's fix them!



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

### `app.spec.ts`

- Now remove the "f" ("focus") prefix you previously added to the `describe` function.

This component depends on 2 other components:

- `Menu`

- `ProductCard`

Choose one of the two approaches you learned about in the slides:

- First approach - **with implicit dependency import**

- Second approach - **allowing unknown HTML elements**

#### Tests

- It should display the products

- It should update the total when "addToBasket" class method is called (Class testing)

- It should update the total when a product emits the "addToBasket" event (DOM testing)

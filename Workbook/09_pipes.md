## Lab 9: Pipes

In this lab, you'll use pipes to format the application content.

### `ProductComponent`

Let's start by using pipes provided by the Angular framework:

- Use the `uppercase` pipe to display the product title in uppercase

- Use the `currency` pipe to display the product price with the currency

At the moment, notice that the price is in `$` and formatted for the `en-US` locale (example: **"$21"**).
But we need to display it in `€` for the `fr` locale (example: **"21 €"**).

Let's fix this!

- First, register the `"fr"` locale in your application

```ts
// src/app/app.config.ts
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";

registerLocaleData(localeFr);
```

- Next, provide `LOCALE_ID` and `DEFAULT_CURRENCY_CODE` in the app config

```ts
// src/app/app.config.ts
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: "fr" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR" },
  ],
};
```

The product price should now be displayed correctly.

### `AppComponent`

- Use the `currency` pipe to display the basket total

<div class="pb"></div>

### `SortProductsPipe`

Now, let's create a custom pipe of our own!

We want to be able to sort the displayed products by `price` or `stock`.

- Generate the pipe `src/app/sort-products/sort-products.pipe.ts` using Angular CLI

  - Implement the `transform` method that returns the sorted array of products
  - Add an optional parameter to the pipe to specify on which property (`price` or `stock`) to sort the products

- Once your finished, use your pipe to sort the products in the `AppComponent` template

Finally, let's add a selector to choose between `price` and `stock` sorting.
You'll find a component ready for use here: `Exercises/resources/select-product-key`.

- Copy/paste the component `Exercises/resources/select-product-key` into your app at `src/app/select-product-key`

Use the component:

- Add `productKey` in `app.component.ts`

```ts
import { Component } from "@angular/core";
import { SelectProductKey } from "./select-product-key/select-product-key.types";

@Component({
  /* ... */
})
export class AppComponent {
  productKey = signal<SelectProductKey>(undefined);
}
```

- Use `<app-select-product-key>` in `app.component.html`

```html
<app-select-product-key [(productKey)]="productKey" />
```

<div class="pb"></div>

### Tests

#### `app.component.spec.ts`

- It should display the products sorted by price

- It should display the products sorted by stock

- It should display the basket total with currency

#### `sort-products.pipe.spec.ts`

- It should not sort products when key is undefined

- It should sort products by price

- It should sort products by title

#### `product.component.spec.ts`

- It should display product title in uppercase

- It should display product price with currency

<div class="pb"></div>

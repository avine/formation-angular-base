## TP6: The Pipes

We will now use the `pipes`, in order to format the content of our application.

At first, we will use the `pipes` available in the framework: `uppercase` and `currency`.

- In the templace of the `product` component, use `pipe` `uppercase` to display the title in uppercase

- In the `product` component template, use `pipe` `currency` in order to display the price of a product with the currency * euro * and with two digits after the decimal point.

- Also add the `pipe` to the `currency` for displaying the total on the main page `app.component.html`

- To specify the project locale, add the following lines to `app.module.ts`:
```typescript
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
```
and in the `providers` section of `@NgModule`:
```typescript
{provide: LOCALE_ID, useValue: navigator.language}
```

We will now create our own `pipe`, which will allow us to sort a product collection by its `title` property.

- Create a new `pipe` thanks to `@angular/cli`

- Implement the transformation method, in which we will sort an array via the `sort` of the `Array` prototype

- Use your `pipe` in the `ngFor` template

- We will now add a parameter to our `pipe`. This parameter will define the property on which sorting is to take place.

### Tests

- Resolve the new dependency injections so that the existing tests work.

- Add a `SortPipe` test, pass a product array to the pipe and check that the return value is the sorted array.

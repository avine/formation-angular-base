## Lab 6: Pipes

We will now use `pipes`, to format the application content.

We will start by using `pipes` provided by the framework: `uppercase` and `currency`.

- In the `ProductComponent` template, use the `uppercase` pipe to display the title in uppercase.

- In the `ProductComponent` template, use the `currency` pipe to display the price using the *euro* currency and two decimals.

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

We will now create a custom `pipe`, to sort the products by `title`.

- Create a new `pipe` using `@angular/cli`

- Implement the `transform` method, to sort the array using the `sort` method of `Array`.

- Use the `pipe` in the `ngFor` template part

- Add a parameter to the `pipe` to specify on which field to sort the products.

### Bonus

- Add three extra buttons in order to change the sort: by the title, price or stock

### Tests

- Resolve dependencies injection issues to pass existing tests. Declare a mock for the pipe created previously.

- Add a test in the `SortPipe` pipe, by giving an array of products as input and by checking that the outputted array is sorted.

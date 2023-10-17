# Pipes

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Getting started with Angular](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Directives](#/6)
- [Services](#/7)
- **[Pipes](#/8)**
- [Http](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Pipes

- Transform strings, currency amounts, dates, and other data for display
- Simple functions to use in template expressions
- Accept an input value and return a transformed value
- You can write your own custom pipe
- Angular provides a good number of pipes for common use-cases (`@angular/common`)
  - `LowerCasePipe`, `UpperCasePipe`, `TitleCasePipe`
  - `CurrencyPipe`, `DecimalPipe`, `PercentPipe`
  - `DatePipe`, `JsonPipe`, `SlicePipe`, `KeyValuePipe`
  - `AsyncPipe`

Notes :



## Pipes - Usage in template

- Are applied using the "`|`" symbol
- Can be chained
- Additional parameters can be passed using the "`:`" symbol

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>{{ date | date }}</p> <!-- 29 août 2023 -->

    <p>{{ date | date | uppercase }}</p> <!-- 29 AOÛT 2023 -->

    <p>{{ price | currency : 'EUR' : 'symbol' }}</p> <!-- 123,46 € -->
  `,
})
export class AppComponent {
  date = new Date();
  price = 123.456789;
}
```

Notes :



## Pipes - Custom

- Can be generated using Angular CLI: `ng generate pipe <pipeName>`
- Use the `@Pipe` decorator on a class
- Class must implement the `PipeTransform` interface (i.e. the `transform` method)

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinArray' })
export class JoinArrayPipe implements PipeTransform {
  transform(value: Array<string | number>, separator = ' '): unknown {
    return value.join(separator);
  }
}
```

- Usage example:

```html
<p>List: {{ ['apple', 'orange', 'banana'] | joinArray : ', ' }}.</p>

<!-- List: apple, orange, banana. -->
```

Notes :



## Pipes - Custom | Declaration

- Declared like Components and Directives in the Module's `declarations` array
- Can be used in all components of the module in which they are declared

```ts
import { Component, NgModule } from '@angular/core';
import { JoinArrayPipe } from './pipes/join-array.pipe';

@NgModule ({
  declarations: [AppComponent, JoinArrayPipe]
})
export class AppModule {}

@Component({
  selector: 'app-root',
  template: `{{ appList | joinArray }}`,
})
export class AppComponent {
  appList = ['apple', 'orange', 'banana'];
}
```

Notes :



## Pipes - Configuration

Some Angular pipes can be configured to suit your needs.

Here's an example with the `CurrencyPipe`

Depending on the locale:
  - should display `$3.50` for United States
  - should display `3,50 $` for France

You may also need to configure the default symbol to be `€` instead of `$`:
  - should display `€3.50` for United States
  - should display `3,50 €` for France

Notes :



## Pipes - Configuration | CurrencyPipe

- Here's the configuration to display the currency in EUR for France (`3,50 €`)

```ts
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr); // <-- Defines how to format currency, date, ... in french

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
})
export class AppModule {}
```

Notes :



## Pipes - Usage in class

- Can be instantiated directly in TypeScript code (using `new` operator)
- Can also be injected like any provider...
  - ...but must be provided in the `providers` array (Component or NgModule)
  - The injected pipe will respect the configuration, if any

```ts
import { Component } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component ({ selector: 'app-root', providers: [CurrencyPipe] })
class AppComponent {
  constructor(currencyPipe: CurrencyPipe) {

    const upperCasePipe = new UpperCasePipe();
    console.log(upperCasePipe.transform('Hello World!')); // <-- HELLO WORLD!

    console.log(currencyPipe.transform(123.456789)); // <-- 123.46 €
  }
}
```

Notes :



## Pipes - Pure

- Refers to the concept of pure function
- Angular will only re-evaluate the pipe if the input value **reference** has changed
- Optimizes the performance of the change detection mechanism
- Pipes are pure by default

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fancy', pure: true })
export class FancyPipe implements PipeTransform {
  transform(value: string): string {
    return `Fancy ${value}`;
  }
}
```

Notes :



## Pipes - Impure

- Angular always re-evaluate the pipe even if the input value **reference** has not changed
- Suitable when the input value is an `Array` or `Object` that may be mutated over time

Example: because Angular's `JsonPipe` is defined as `impure`, after clicking on the button, the mutated object will be properly displayed in the UI.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <pre>{{ data | json }}</pre>
    
    <button (click)=" data.msg = 'Bye' ">Mutate</button>
  `,
})
export class AppComponent {
  data = { msg: 'Hello' };
}
```

Notes :



## Pipes - Impure

- Let's take another look at the custom pipe shown above
- It should be defined as `impure` because its input is an `Array` that may be mutated

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinArray', pure: false }) // <-- Should be impure!
export class JoinArrayPipe implements PipeTransform {
  transform(value: Array<string | number>, separator = ' '): unknown {
    return value.join(separator);
  }
}

@Component({
  selector: 'app-root',
  template: `{{ appList | joinArray }}
    <button (click)=" appList.push('kiwi') ">Mutate</button>`, // <-- Mutation
})
export class AppComponent {
  appList = ['apple', 'orange', 'banana'];
}
```

Notes :



## Pipes - Testing

- A Pipe is nothing but a function!
- Instantiate the pipe in a `beforeEach` hook
- Call the `transform` method to test all possible cases

```ts
import { JoinArrayPipe } from './pipes/join-array.pipe';

describe('JoinArrayPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new JoinArrayPipe ();
  });

  it('should works', () => {
    var output = pipe.transform(['apple', 'orange', 'banana'], ', ');

    expect(output).toEqual('apple, orange, banana');
  });
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp6" -->

# Pipes

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)

</div>
<div class="column-50">

- [Signals](#/8)
- [Dependency injection](#/9)
- **Pipes**
- [Http client](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>
</div>

<!-- separator-vertical -->

## Pipes - Definition

- Special operator in Angular template expressions
- Transform data declaratively in your template
- Transformation function are declared once and then used across multiple templates
- Angular provides a lots of pipes for common use cases...

```ts
import {
  LowerCasePipe, UpperCasePipe, TitleCasePipe,
  CurrencyPipe, DecimalPipe, PercentPipe,
  DatePipe, JsonPipe, SlicePipe, KeyValuePipe,
} from '@angular/common';
```

- ... but you can also create custom pipes based on your business logic

<!-- separator-vertical -->

## Pipes - Usage in template

- Are applied using the "`|`" symbol
- Can be chained
- Additional parameters can be passed using the "`:`" symbol

```ts
import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [DatePipe, UpperCasePipe, CurrencyPipe],
  template: `
    <p>{{ myDate | date }}</p>                          <!-- 29 août 2023 -->
    <p>{{ myDate | date | uppercase }}</p>              <!-- 29 AOÛT 2023 -->
    <p>{{ myPrice | currency : 'EUR' : 'symbol' }}</p>  <!-- 123,46 €     -->
  `,
})
export class App {
  myDate = new Date();
  myPrice = 123.456789;
}
```

<!-- separator-vertical -->

## Pipes - Custom

- Can be generated using Angular CLI: `ng generate pipe <pipeName>`
- Use the `@Pipe` decorator on a class
- Class must implement the `PipeTransform` interface (i.e. the `transform` method)

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinArray' })
export class JoinArrayPipe implements PipeTransform {
  transform(value: (string | number)[], separator = ' '): string {
    return value.join(separator);
  }
}
```

- Usage example:

```html
<p>List: {{ ['apple', 'orange', 'banana'] | joinArray : ' / ' }}</p>

<!-- List: apple / orange / banana -->
```

NOTES:
In fact this pipe does not really works because it needs to be "impure" (this is explained later...).

<!-- separator-vertical -->

## Pipes - Configuration

Some Angular pipes can be configured globally

Here's an example with the `CurrencyPipe`

- Depending on the locale:
  - should display `$3.50` for United States (this is the default behavior)
  - should display `3,50 $` for France

- You may also need to configure the default symbol to be `€` instead of `$`:
  - should display `€3.50` for United States
  - should display `3,50 €` for France

<!-- separator-vertical -->

## Pipes - Configuration | CurrencyPipe

- Here's the configuration to display the currency in EUR for France (`3,50 €`)

```ts
// src/app/app.config.ts

import { ApplicationConfig, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';

// Defines how to format currency, date, ... in french
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
};
```

<!-- separator-vertical -->

## Pipes - Usage in class

- Can be instantiated directly in TypeScript code (using `new` operator)
- Can also be injected like any provider...
  - ...but must be provided in the `providers` array (Component or ApplicationConfig)
  - the injected pipe will respect the global configuration, if any

```ts
import { Component, inject } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component ({ selector: 'app-root', providers: [CurrencyPipe] })
class App {
  constructor() {
    console.log(new UpperCasePipe().transform('Hello World!'));   // <-- HELLO WORLD!

    console.log(inject(CurrencyPipe).transform(123.456789));      // <-- 123,46 €
  }
}
```

<!-- separator-vertical -->

## Pipes - Pure

- Transformation function can be marked as "pure" if it has the following properties:
  - the function return values are identical for identical arguments
  - the function has no side effects
- When Angular re-evaluate a template, it will only re-evaluate the pipe if its input value **reference** has changed
- Pipes are pure by default

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fancy' /*, pure: true */ })
export class FancyPipe implements PipeTransform {
  transform(value: string): string {
    return `Fancy ${value}`;
  }
}
```

<!-- separator-vertical -->

## Pipes - Impure 1/2

- Angular always re-evaluate "impure" pipe, even if its input value **reference** has not changed
  - Should be used for input value such as `Array` or `Object` that may be mutated over time

Example: because Angular's `JsonPipe` is defined as `impure`, after clicking on the button, the mutated object will be properly displayed in the UI.

```ts
import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  template:
    `<pre>{{ data | json }}</pre>
    
    <button (click)=" data.msg = 'Bye' ">Mutate</button>`,
})
export class App {
  data = { msg: 'Hello' };
}
```

<!-- separator-vertical -->

## Pipes - Impure 2/2

- Let's look again at the custom pipe used as an example earlier
  - It should be defined as `impure` because its input is an `Array` that may be mutated

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinArray', pure: false }) // <-- Should be impure!
export class JoinArrayPipe implements PipeTransform {
  transform(value: (string | number)[], separator = ' '): string {
    return value.join(separator);
  }
}

@Component({
  selector: 'app-root',
  template: `{{ appList | joinArray }}
    <button (click)=" appList.push('kiwi') ">Mutate</button>`, // <-- Mutation
})
export class App {
  appList = ['apple', 'orange', 'banana'];
}
```

<!-- separator-vertical -->

## Pipes - Testing

- A Pipe is nothing but a function!
- Instantiate the pipe in a `beforeEach` hook
- Call the `transform` method to test all possible cases

```ts
import { JoinArrayPipe } from './pipes/join-array-pipe';

describe('JoinArrayPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new JoinArrayPipe();
  });

  it('should works', () => {
    const output = pipe.transform(['apple', 'orange', 'banana'], ', ');

    expect(output).toEqual('apple, orange, banana');
  });
});
```

<!-- separator-vertical -->

## Pipes - Summary

**In this chapter on pipes, we have covered the following topics**

- Built-in pipes
- Custom pipe
- Configuration
- Usage in template
- Usage in class
- Pure VS Impure

<!-- separator-vertical -->

## Pipes - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Pipes - Lab 9
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

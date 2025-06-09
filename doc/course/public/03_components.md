# Components

<!-- .slide: class="page-title" -->



## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- **Components**
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)

</div>
<div class="column-50">

- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>
</div>

Notes :



## Components - Definition 1/3

- Components are the **main building blocks** of Angular applications
- Each component represents a **part of a larger web page**
- Organizing an application into components helps **provide structure to your project**, clearly separating code into specific parts that are easy to maintain and grow over time

Notes :



## Components - Definition 2/3

- Defined with the `@Component` class decorator, which provides the component's metadata
  - must have a `selector` so that it can be inserted into any other component template
  - must have a `template` (or `templateUrl`) that defines what is to be displayed

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: '<p>Hello world!</p>',
})
export class Hello {}
```

Notes :



## Components - Definition 3/3

- You build an application by composing multiple components together

- A component that depends on other components must import them in order to use them in its template

```ts
import { Component } from '@angular/core';
import { Hello } from './hello/hello.ts';

@Component({
  selector: 'app-root',
  imports: [Hello],
  template: `
    <h1>My Awesome App</h1>
    <app-hello />
  `,
})
export class App {}
```

*😉 The `App` component is the only one to be **bootstrapped**. Its selector (`app-root`) is searched for in the web page.<br /> All other components are necessarily **imported** by the main component or its children.*

Notes :



## Component - Template

- The template can be configured in two ways:
  - using a `template` property: string literal (as shown above)
  - using a `templateUrl` property: path to an HTML file (relative to the component)

```ts
// app.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
```

```html
<!-- app.html -->

<h1>My Awesome App</h1>
```

Notes :



## Component - Styles

The styles can be configured in two ways:

- using a `styles` property that contains the expected CSS rules

```ts
@Component ({
  styles: `h1 { font-weight: normal; }`
})
export class App {}
``` 

- using a `styleUrl` property that indicates a path to `.css` (or `.scss`) file

```ts
@Component ({
  styleUrl: './app.css'
})
export class App {}
```

```css
/* app.css */

h1 { font-weight: normal; }
```

Notes :



## Template syntax - Text interpolation

- Uses the syntax `{{ expression }}`
- The `expression` is converted into a `string` and displayed as such
- Angular defines a precise syntax for these expressions
  - accepts basic JavaScript expressions
  - more: https://angular.dev/guide/templates
- All `public` or `protected` component properties can be used in the template
- An expression used in template must not change the component state

```ts
@Component ({
  selector: 'app-product-card',
  template: `<p>{{ product?.title }}</p>`
})
export class ProductCard {
  protected product?: Product;
}
```

Notes :



## Template syntax - Property binding

- Generic syntax for setting the value of a **DOM property**
- Using the syntax `[propertyName]="expression"`

```html
<button [disabled]="isUnchanged">Save</button>  <!-- HTML property -->

<app-checkout-form [formData]="data" />         <!-- Component input -->

```

- Angular provides a special syntax for applying dynamic `class` and `style` properties

```html
<p [class.highlight]="isHighlight">Hello</p>

<button [style.color]="isHighlight ? 'orange': 'black'">Save</button>
```

Notes :



## Template syntax - Attribute binding

- Generic syntax for setting the value of an **HTML attribute** 
- Using the syntax `[attr.attributeName]="expression"`
- Pay attention to the difference between "DOM properties" and "HTML attributes"!

Example: `role` is a valid HTML attribute of the `<div>` tag, but there's no such DOM property!

```html
<div role="status">OK</div>
```

```html
<div [attr.role]="expression">OK</div>
```

```html
<div [role]="expression">NOT OK</div>

<!-- ❌ Can't bind to 'role' since it isn't a known property of 'div'. -->
```

Notes :




## Template syntax - Event binding

- Generic syntax for listening to an event of an HTML element
- Using the syntax `(eventName)="expression"`

```html
<button (click)="handler()">Save</button>                   <!-- HTML event -->

<app-checkout-form (formSubmitted)="onFormSubmitted()" />   <!-- Component output -->
```

- Angular provides a special syntax for handling "pseudo" events

```html
<input (keyup.enter)="onEnter()" />
```

Notes :



## Template syntax - Event binding | $event

- In this example, we listen to the `input` event of the `<input />` element

```ts
@Component ({
  selector: 'app-demo',
  template: `<input [value]="name" (input)="updateName($event.target)" />`,
})
export class Demo {
  name = 'Carl';

  updateName(eventTarget: EventTarget | null) {
    this.name = (eventTarget as HTMLInputElement).value;
  }
}
```

- `$event` refers to the native browser DOM `InputEvent`
- We achieve a *two-way data binding* using both property and event bindings
  - the **class** property `name` and the **template** input `value` will always be in sync

Notes :



## Component - Input 1/3

- Use the `input()` function to declare a component class property as input

- To read the value contained in the input, you need to call it as a function

```ts
import { Component, input } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<p>{{ count() }}</p>`
})
export class Counter {
  count = input<number>(0);
}
```

- Inputs without a default value have an implicit `undefined` value

```ts
count = input<number>(); // is equivalent to `input<number | undefined>();`
```

Notes :



## Component - Input 2/3

- Use the `input.required()` function to declare a component class property as required input


```ts
import { Component, input } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<p>{{ count() }}</p>`
})
export class Counter {
  count = input.required<number>();
}
```

- When using the component, Angular will throw an error if the required input is missing

```html
<app-counter />

<!-- ❌ Required input 'count' from component Counter must be specified. -->
```

Notes :



## Component - Input 3/3

- The consumer of this component must bind to the required input in its template

```ts
import { Component } from '@angular/core';
import { Counter } from './counter/counter.ts';

@Component ({
  selector: 'app-root',
  imports [Counter],
  template: `<app-counter [count]="parentCount" />`
})
export class App {
  protected parentCount = 5;
}
```

Notes :



## Component - Output 1/2

- Use the `output()` function to declare a component class property as output

```ts
import { Component, output } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<button (click)="onClick()">{{ count }}</button>`
})
export class Counter {
  protected count = 0;

  countChange = output<number>();

  protected onClick() {
    this.count += 1;
    this.countChange.emit(this.count);
  }
}
```

Notes :



## Component - Output 2/2

- The consumer of this component can bind to the event in its template

```ts
import { Component } from '@angular/core';
import { Counter } from './counter/counter.ts';

@Component ({
  selector: 'app-root',
  imports [Counter],
  template:
    `<app-counter (countChange)="updateCount($event)" />
     <p>Count: {{ parentCount }}</p>`
})
export class App {
  protected parentCount: number | undefined = undefined;

  protected updateCount(count: number) {
    this.parentCount = count;
  }
}
```

- **Output events** are never propagated to the consumer's parent component, whereas **native DOM events** are (event bubbling)

Notes :
The `parentCount` is deliberately set to `undefined` to show that it is the `Counter` which has ownership of the data.
This problem will be solved with `model`.



## Component - Model input 1/4

- Use the `model()` function to declare a component class property as model input

- Unlike regular inputs, model inputs allow the component author to write values into the property

```ts
import { Component, model } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<button (click)="onClick()">{{ count }}</button>`
})
export class Counter {
  count = model<number>(0);

  protected onClick() {
    this.count.update((count) => count + 1);
  }
}
```

Notes :



## Component - Model input 2/4

- The consumer of this component can bind to both "property" and "event" in its template

```ts
import { Component } from '@angular/core';
import { Counter } from './counter/counter.ts';

@Component ({
  selector: 'app-root',
  imports [Counter],
  template: `
    <app-counter [count]="parentCount" (countChange)="updateCount($event)" />
  `
})
export class App {
  protected parentCount = 5;

  protected updateCount(count: number) {
    this.parentCount = count;
  }
}
```

- The `output` name is based on the `input` name but with the suffix: `"Change"`

Notes :



## Component - Model input 3/4

- Use the "Banana in a box" [🍌] syntax to easily achieve two-way data binding

```ts
import { Component } from '@angular/core';
import { Counter } from './counter/counter.ts';

@Component ({
  selector: 'app-root',
  imports [Counter],
  template: `
    <app-counter [(count)]="parentCount" />
  `
})
export class App {
  protected parentCount = 5;

  protected updateCount(count: number) {
    this.parentCount = count;
  }
}
```

Notes :



## Component - Model input 4/4

- Unlike `input`s which are "realony", `model`s are "writable"

```ts
@Component({ ... })
export class Counter {
  count = model(0);
  constructor() {
    console.log(this.count());          // <-- output: 0

    this.count.set(1);
    console.log(this.count());          // <-- output: 1

    this.count.update((c) => c + 1);
    console.log(this.count());          // <-- output: 2
  }
}
```

- `input` and `model` are in fact "**signals**"
- `.set()` and `.update()` methods are part of the signals API
- Signals play a crucial role in the Angular reactivity model and whole chapter is devoted to them later in the course

Notes :



## Components - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->



## Components - Lab 3
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

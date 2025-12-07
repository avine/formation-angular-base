# Appendix

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
- [Pipes](#/10)
- [Http client](#/11)
- [Routing](#/12)
- [Forms](#/13)
- **Appendix**

</div>
</div>

<!-- separator-vertical -->

## Appendix - Component view encapsulation 1/3

- By default, **component's styles are encapsulated** within the component's host element so that they **don't affect the rest of the application**

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `<h1>Hello world</h1>`,
  styles: `h1 { color: red }`,
  encapsulation: ViewEncapsulation.Emulated, // <-- Default value
})
export class App {}
```

- At runtime, Angular adds **unique attributes** to achieve encapsulation

```css
h1[_ngcontent-ng-529479] { color: blue }
```

```html
<app-root _nghost-ng-529479>
  <h1 _ngcontent-ng-529479>Hello world</h1>
</app-root>
```

<!-- separator-vertical -->

## Appendix - Component view encapsulation 2/3

- Use `:host {}` pseudo class to style the component's host element

```ts
import { Component } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `<h1>My Awesome App</h1>`,
  styles: `:host { display: block }`,
})
export class App {}
```

- At runtime, Angular transforms the pseudo class into **unique attributes**

```css
[_nghost-ng-529479] { display: block }
```

```html
<app-root _nghost-ng-529479>
  <h1 _ngcontent-ng-529479>Hello world</h1>
</app-root>
```

<!-- separator-vertical -->

## Appendix - Component view encapsulation 3/3

- If needed, use `ViewEncapsulation.None` to disable component's encapsulation
- Then, all styles defined in the component are global and can therefore affect the entire page
  - use with caution
  - use fairly unique CSS selectors

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `<h1 class="app-root__title">Hello world</h1>`,
  styles: `
    h1 { color: red }                 /* ❌ Looks dangerous, affects all <h1> tags in the page */

    .app-root__title { color: red }   /* ✅ Looks fine, uses a fairly unique CSS selector */
  `,
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

<!-- separator-vertical -->

## Appendix - Component projection 1/3

- Allows to put HTML content inside the tag of an Angular component
- The `<ng-content />` element acts as a placeholder to mark where projected content should go

```ts
@Component({ selector: 'app-card', template:
  `<article>
    <ng-content />
  </article>`
})
export class Card {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <header>Title</header>
    <section>Content</section>
  </app-card>`
})
export class App {}
```

<!-- separator-vertical -->

## Appendix - Component projection 2/3

- Ability to have multiple insertion points using the `select` property
- The select value must be a valid **CSS selector** targeting the HTML fragment to be used

```ts
@Component({ selector: 'app-card', template:
  `<article>
    <header> <ng-content select="[card-title]" /> </header>
    <section> <ng-content select="[card-content]"/> </section>
  </article>`
})
export class Card {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <span card-title>Title</span>
    <span card-content>Content</span>
  </app-card>`
})
export class App {}
```

<!-- separator-vertical -->

## Appendix - Component projection 3/3

- Use `<ng-container>` to avoid adding unnecessary tags

```ts
@Component({ selector: 'app-card', template:
  `<article>
    <header> <ng-content select="[card-title]" /> </header>
    <section> <ng-content select="[card-content]"/> </section>
  </article>`
})
export class Card {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <ng-container card-title>Title</ng-container>
    <ng-container card-content>Content</ng-container>
  </app-card>`
})
export class App {}
```

<!-- separator-vertical -->

## Appendix - Component lifecycle

- It is possible to execute code using component lifecycle hooks

- More info: https://angular.dev/guide/components/lifecycle

```ts
import {
  Component, OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy, SimpleChanges
} from '@angular/core';

@Component ({/* ... */})
export class App implements
  OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy {

    constructor() {/* Perform tasks that do NOT depend on the component's inputs */}

    ngOnInit(): void {/* Perform tasks that depend on the component's inputs */}

    ngAfterContentInit(): void {/* ... */}

    ngAfterViewInit(): void {/* ... */}

    ngOnDestroy(): void {/* ... */}
  }
```

<!-- separator-vertical -->

## Appendix - Component lifecycle | OnInit

- `OnInit` lifecycle hook is frequently used for initialization
- because you can safely read component `input`s when this hook is triggered

```ts
import { Component, OnInit, input } from '@angular/core';

@Component ({/* ... */})
export class Posts implements OnInit {
  userId = input.required<string>();

  protected posts?: Post[];

  ngOnInit() {
    // Doing this in the `constructor` will fail!
    // Because the property `userId` is `undefined` at the time the constructor is executed.
    this.fetchUserPosts(this.userId()).then((posts) => (this.posts = posts));
  }

  private fetchUserPosts(): Promise<Post[]> {/* ... */}
}
```

<!-- separator-vertical -->

## Appendix - Component lifecycle | OnDestroy

- `OnDestroy` lifecycle hook is frequently used for cleaning up the component

```ts
import { Component, OnDestroy } from '@angular/core';

@Component ({ 
  selector: 'app-interval',
  template: '<p>{{ data }}</p>'
})
export class Interval implements OnDestroy {
  protected data = 0;

  private interval = setInterval(() => this.data++, 1000);

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
```

<!-- separator-vertical -->

## Appendix - Comp. lifecycle hooks | DestroyRef

- `DestroyRef` allows you to achieve the same result as `ngOnDestroy`

```ts
import { Component, DestroyRef } from '@angular/core';

@Component ({ 
  selector: 'app-interval',
  template: '<p>{{ data }}</p>'
})
export class Interval {
  protected data = 0;

  private interval = setInterval(() => this.data++, 1000);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.interval));
  }
}
```

😉 *It is considered a more modern approach*

<!-- separator-vertical -->

## Appendix - Component queries 1/2

- It is possible to access template details from the class using `viewChild`

- Retrieved information is available as soon as `AfterViewInit` has been triggered

```ts
import { Component, viewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hello', template: `<h1>Hello world!</h1>`
})
export class Hello {}

@Component({
  selector: 'app-root', template: `<app-hello />`
})
export class App implements OnInit, AfterViewInit {

  hello = viewChild(Hello);

  ngOnInit() { console.log(this.hello()); }            // <-- output: undefined
  ngAfterViewInit() { console.log(this.hello()); }     // <-- output: Hello
}
```

<!-- separator-vertical -->

## Appendix - Component queries 2/2

- `afterNextRender` allows you to achieve (almost) the same result as `AfterViewInit`

- Invoked the next time the application finishes rendering

```ts
import { Component, viewChild, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-hello', template: `<h1>Hello world!</h1>`
})
export class Hello {}

@Component({
  selector: 'app-root', template: `<app-hello />`
})
export class App {

  hello = viewChild(Hello);

  constructor() {
    afterNextRender(() => console.log(this.hello()));  // <-- output: Hello
  }
}
```

<!-- separator-vertical -->

## Appendix - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

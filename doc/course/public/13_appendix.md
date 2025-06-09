# Appendix

<!-- .slide: class="page-title" -->



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
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- **Appendix**

</div>
</div>

Notes :



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
export class AppComponent {}
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

Notes :
Host bindings are covered in the Directives chapter (`@Directive({ host: ... })` which also applies to `@Component({ host: ... })`).



## Appendix - Component view encapsulation 2/3

- Use `:host {}` pseudo class to style the component's host element

```ts
import { Component } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `<h1>My Awesome App</h1>`,
  styles: `:host { display: block }`,
})
export class AppComponent {}
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

Notes :



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
export class AppComponent {}
```

Notes :



## Appendix - Component projection 1/3

- Allows to put HTML content inside the tag of an Angular component
- The `<ng-content />` directive allows reinserting the content in the component template

```ts
@Component({ selector: 'app-card', template:
  `<article>
    <ng-content />
  </article>`
})
export class CardComponent {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <header>Title</header>
    <section>Content</section>
  </app-card>`
})
export class AppComponent {}
```

Notes :



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
export class CardComponent {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <span card-title>Title</span>
    <span card-content>Content</span>
  </app-card>`
})
export class AppComponent {}
```

Notes :



## Appendix - Component projection 3/3

- Use `<ng-container>` to avoid adding unnecessary tags

```ts
@Component({ selector: 'app-card', template:
  `<article>
    <header> <ng-content select="[card-title]" /> </header>
    <section> <ng-content select="[card-content]"/> </section>
  </article>`
})
export class CardComponent {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <ng-container card-title>Title</ng-container>
    <ng-container card-content>Content</ng-container>
  </app-card>`
})
export class AppComponent {}
```

Notes :



## Appendix - Component lifecycle

- It is possible to execute code using component lifecycle hooks

- More infos: https://angular.dev/guide/components/lifecycle

```ts
import {
  Component, OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy, SimpleChanges
} from '@angular/core';

@Component ({/* ... */})
export class AppComponent implements
  OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy {

    constructor() {/* Perform tasks that does NOT depend on the component's inputs */}

    ngOnInit(): void {/* Perform tasks that depend on the component's inputs */}

    ngAfterContentInit(): void {/* ... */}

    ngAfterViewInit(): void {/* ... */}

    ngOnDestroy(): void {/* ... */}
  }
```

Notes :



## Appendix - Component lifecycle | OnInit

- `OnInit` lifecycle hook is frequently used for initialization
- because you can safely read component `input`s when this hook is triggered

```ts
import { Component, OnInit, input } from '@angular/core';

@Component ({/* ... */})
export class PostsComponent implements OnInit {
  userId = input.required<string>();

  protected posts?: Post[];

  ngOnInit() {
    // Doing this is the `constructor` will fail!
    // Because the property `userId` is `undefined` at the time the constructor is executed.
    this.fetchUserPosts(this.userId()).then((posts) => (this.posts = posts));
  }

  private fetchUserPosts(): Promise<Post[]> {/* ... */}
}
```

Notes :



## Appendix - Component lifecycle | OnDestroy

- `OnDestroy` lifecycle hook is frequently used for cleaning component

```ts
import { Component, OnDestroy } from '@angular/core';

@Component ({ 
  selector: 'app-interval',
  template: '<p>{{ data }}</p>'
})
export class IntervalComponent implements OnDestroy {
  protected data = 0;

  private interval = setInterval(() => this.data++, 1000);

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
```

Notes :



## Appendix - Comp. lifecycle hooks | DestroyRef

- `DestroyRef` allows you to achieve the same result as `ngOnDestroy`

```ts
import { Component, DestroyRef } from '@angular/core';

@Component ({ 
  selector: 'app-interval',
  template: '<p>{{ data }}</p>'
})
export class IntervalComponent {
  protected data = 0;

  private interval = setInterval(() => this.data++, 1000);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.interval));
  }
}
```

😉 *It is considered a more modern approach*

Notes :



## Appendix - Component queries 1/2

- It is possible to access template details from the class using `viewChild`

- Retrieved informations are available as soon as `AfterViewInit` has been triggered

```ts
import { Component, viewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hello', template: `<h1>Hello world!</h1>`
})
export class HelloComponent {}

@Component({
  selector: 'app-root', template: `<app-hello />`
})
export class AppComponent implements OnInit, AfterViewInit {

  helloComponent = viewChild(HelloComponent);

  ngOnInit() { console.log(this.helloComponent()); }            // <-- output: undefined
  ngAfterViewInit() { console.log(this.helloComponent()); }     // <-- output: HelloComponent
}
```

Notes :



## Appendix - Component queries 2/2

- `afterNextRender` allows you to achieve (almost) the same result as `AfterViewInit`

- Invoked the next time the application finishes rendering

```ts
import { Component, viewChild, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-hello', template: `<h1>Hello world!</h1>`
})
export class HelloComponent {}

@Component({
  selector: 'app-root', template: `<app-hello />`
})
export class AppComponent {

  helloComponent = viewChild(HelloComponent);

  constructor() {
    afterNextRender(() => console.log(this.helloComponent()));  // <-- output: HelloComponent
  }
}
```

Notes :



## Appendix - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

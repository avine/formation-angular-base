# Components

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Getting started with Angular](#/3)
- **[Components](#/4)**
- [Unit testing](#/5)
- [Directives](#/6)
- [Services](#/7)
- [Pipes](#/8)
- [Http](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Components

- Defined with the `@Component` decorator on a class
  - must have a `selector` so that it can be inserted into any other component template
  - must have a `template` (or `templateUrl`) that defines what is to be displayed

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: '<p>Hello world!</p>',
})
export class HelloComponent {}

@Component({
  selector: 'app-root',
  template: `
    <h1>My Awesome App</h1>
    <app-hello></app-hello> <!-- '<app-hello />' also works from Angular v15.1.0 -->
  `,
})
export class AppComponent {}
```

Notes :



## Component - Template

- The template can be configured in two ways:
  - using a `template` property: string literal (as we saw in the previous slide)
  - using a `templateUrl` property: path to an HTML file (relative to the component)

```ts
// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

```html
<!-- app.component.html -->

<h1>My Awesome App</h1>
```

Notes :



## Component - Styles

The styles can be configured in two ways:

- using a `styles` property: array of string literal

```ts
@Component ({
  styles: [`
    h1 { font-weight: normal; }
  `]
})
export class AppComponent {}
``` 

- using a `styleUrls` property: array of path to CSS files

```ts
@Component ({
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
```

```css
/* app.component.css */
h1 { font-weight: normal; }
```

Notes :



## Component - Styles

- You can style the component host element using the syntax `:host {}`

```ts
@Component ({
  selector: 'app-hello',
  template: 'Hello world!',
  styles: [`
    :host {
      display: block;
      background-color: yellow;
    }
  `]
})
export class HelloComponent {}
```

- Styles will be correctly applied in HTML rendering:

```html
<app-hello styles="display: block; background-color: yellow;" />
```

Notes :



## Template syntax - String interpolation

- Uses the syntax `{{ expression }}`
- The `expression` is converted into a `string` and displayed as such
- Angular defines a precise syntax for these expressions
  - https://angular.io/guide/template-syntax#template-expressions:
  - can be almost any JavaScript expression - with some exceptions
- All `public` or `protected` component properties can be used in the template
- An expression used in template must not change the component state

```ts
@Component ({
  selector: 'app-product',
  template: `<p><img src="{{ product?.photo }}" /> {{ product?.title }}</p>`
})
export class ProductComponent {
  protected product?: Product;
}
```

Notes :

- The 'Elvis operator' (optional chaining) is now part of ES2020 & Typescript 3.8
- `src="{{ product?.photo }}"` is OK but property binding is better `[src]="product?.photo"` (next slide)



## Template syntax - Property binding

- Generic syntax for setting the value of a *DOM property*
- Using the syntax `[propertyName]="expression"`

```html
<button [disabled]="isUnchanged">Save</button> <!-- HTML property -->

<app-hero-form [hero]="currentHero" /> <!-- property of a component -->

<p [class.highlight]="isHighlight">Hello</p> <!-- special case -->

<button [style.color]="isHighlight? 'orange': 'black'">Save</button> <!-- special case -->
```

Notes :

Indicate that there are no differences between the use of properties and interpolation
Angular will transform interpolation syntax into property binding



## Template syntax - Attribute binding

- Generic syntax for setting the value of an *HTML attribute* 
- Using the syntax `[attr.attributeName]="expression"`
- Pay attention to the difference between "DOM properties" and "HTML attributes"!
- The most common cases: `colspan`, `rowspan`, `aria-*`, ... for example

Example: `colspan` is a valid HTML attribute of the `<td>` tag, but there's no such DOM property!

```html
<td colspan="3">OK</td>
```

```html
<td [attr.colspan]="expression">OK</td>
```

```html
<td [colspan]="expression">NOT OK</td>

<!-- ❌ Can't bind to 'colspan' since it isn't a known property of 'td'. -->
```

Notes :




## Template syntax - Event binding

- Generic syntax for listening to an event of an HTML element
- Using the syntax `(eventName)="expression"`

```html
<button (click)="handler()">Save</button> <!-- HTML event -->

<app-hero-form (deleted)="onHeroDeleted()" /> <!-- event of a component -->

<input (keyup.enter)="onEnter()" /> <!-- special case: pseudo events -->
```

Notes :



## Template syntax - Event binding

- Angular provides access to the event via the variable `$event` (can be used in expression)

- *Native events* are propagated to parent elements (event bubbling)
  - To stop the propagation, return `false` in the expression that processes the event

- *Angular component events* never propagate to parent elements!

<br />Example of using `$event`:

```html
<input [value]="firstName"
       (input)="firstName = $event.target.value" />
```

- `$event` refers to the native browser DOM `InputEvent`
- We achieve a *two-way data binding* using both property and event bindings
  - The class property `firstName` and the input `value` in the template will always be in sync

Notes :



## Component - Input

- `@Input()` decorator on a property of the component class

- The property name will be what you will use in the template

```ts
import { Component, Input } from '@angular/core';

@Component ({
  selector: 'app-hello',
  template: `Hi {{ name }}!`
})
export class HelloComponent {
  @Input({ required: true }) name!: string;
}

@Component ({
  selector: 'app-root',
  template: `<app-hello [name]="userName" />` // <-- Hello John!
})
export class AppComponent {
  protected userName = 'John';
}
```

Notes :



## Component - Output

- `@Output()` decorator on a property (of type `EventEmitter`) of the component class

- The property name will be what you will use in the template

```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<button (click)="onClick()">Increment {{ count }}</button>`
})
export class CounterComponent {
  protected count = 0;

  @Output() increment = new EventEmitter<number>();

  onClick() { this.count += 1; this.increment.emit(this.count); }
}

@Component ({ selector: 'app-root', template: `<app-counter (increment)="log($event)" />` })
export class AppComponent {
  protected log(count: number) { console.log('Count:', count); }
}
```

Notes :



## Component - Two-Way Data Binding

- Convention: when `@Output` is named like `@Input` but with the suffix: `"Change"`
- Use the "Banana in a box" [🍌] syntax 
- Synchronize properties between parent and child components

```ts
@Component ({ selector: 'app-counter', template:
  `<button (click)="countChange.emit(count = count + 1)">{{ count }}</button>`
})
export class CounterComponent {
  @Input()  count!: number;

  @Output() countChange = new EventEmitter<number>(); // <-- "[Output]" == "[Input]Change"
}

@Component ({ selector: 'app-root', template:
  `<app-counter [(count)]="appCount" />
   <button (click)="appCount = appCount + 1">{{ appCount }}</button>`
})
export class AppComponent {
  appCount = 0; // <-- `appCount` and `count` are always in sync!
}
```

Notes :



## Component - Projection

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



## Component - Projection

- Ability to have multiple insertion points using the `select` property
- The select value must be a valid *CSS selector* targeting the HTML fragment to be used

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



## Component - Projection

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



## Component - Lifecycle

- It is possible to execute code using component lifecycle hooks

- More infos: https://angular.io/guide/lifecycle-hooks

```ts
import {
  Component, OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy, SimpleChanges
} from '@angular/core';

@Component ({/* ... */})
export class AppComponent implements
  OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy {

    ngOnChanges(changes: SimpleChanges): void {/* ... */}

    ngOnInit(): void {/* ... */}

    ngAfterContentInit(): void {/* ... */}

    ngAfterViewInit(): void {/* ... */}

    ngOnDestroy(): void {/* ... */}
  }
```

Notes :



## Component - Lifecycle | OnInit

- `OnInit` lifecycle hook is frequently used for initialization
- Because you can safely read component `@Input`s when this hook is triggered

```ts
import { Component, OnInit } from '@angular/core';

@Component ({/* ... */})
export class PostsComponent implements OnInit {
  @Intput({ required: true }) public userId!: string;

  protected posts?: Post[];

  ngOnInit(): void {
    // Doing this is the `constructor` will fail!
    // Because the property `userId` is `undefined` at the time the constructor is executed.
    this.fetchUserPosts(this.userId).then((posts) => (this.posts = posts));
  }

  private fetchUserPosts(): Promise<Post[]> {/* ... */}
}
```

Notes :



## Component - Lifecycle | OnDestroy

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

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
```

Notes :



## Component - ViewChild

- It is possible to access template details from the class using `@ViewChild` decorator

- Retrieved informations are available as soon as `AfterViewInit` has been triggered

```ts
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hello', template: `<h1>Hello world!</h1>`
})
export class HelloComponent {}

@Component({
  selector: 'app-root', template: `<app-hello />`
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(HelloComponent) helloComponent?: HelloComponent;

  ngOnInit(): void { console.log(this.helloComponent); }        // <-- output: undefined

  ngAfterViewInit(): void { console.log(this.helloComponent); } // <-- output: HelloComponent
}
```

Notes :



## Component - Declarations

- Components must be declared in a *NgModule* (defined in detail later in the training)
- All components declared in a *NgModule* can see each other

```ts
import { NgModule } from '@angular/core';

@NgModule ({
  declarations: [AppComponent, CatalogComponent, ProductComponent]
})
export class AppModule {}
```

For example:
- `CatalogComponent` can be used in `AppComponent` template
- `ProductComponent` can be used in `CatalogComponent` template
- ...

Notes :



## Component - Declarations

- Components can be exported by a *NgModule*

```ts
import { NgModule } from '@angular/core';

@NgModule ({
  declarations: [CatalogComponent, ProductComponent],
  exports: [CatalogComponent, ProductComponent]
})
export class SharedModule {}

@NgModule ({
  imports: [SharedModule],
  declarations: [AppComponent]
})
export class AppModule {}
```

For example:
- `CatalogComponent` can be used in `AppComponent` template
- ...

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp2" -->

# Template & Components

<!-- .slide: class="page-title" -->

Notes :



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Start an Angular application](#/3)
- [Tests](#/4)
- **[Template & Components](#/5)**
- [Directives](#/6)
- [Dependency Injection](#/7)
- [Pipes](#/8)
- [HTTP Service](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Components

- The components are the basic elements of Angular
- Defined from a TypeScript class with the `@Component` annotation
- Will be enabled by the *CSS* selector of the `selector` property
- A template is configured in two ways:
  - `template`: String literal (think of the multiline string)
  - `templateUrl`: Url of an HTML file (relative to the component)

Notes :



## Components

- Styles can be configured via two properties:
  - `styles`
```typescript
@Component ({
  selector: 'app-root',
  template: `
    <h1>Works App</h1> `,
  styles: [`
    h1 {font-weight: normal; }
  `]
})
export class AppComponent {}
``` 
  - `styleUrls`
```typescript
@Component ({
  selector: 'app-root',
  template: `
    <h1>Works App</h1> `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
```

Notes :



## Components

- To define a component that will be called this way:

```html
<div>
  <h1>My Product</h1>
  <app-product> </app-product>
</div>
<!-- attention, <app-product /> does not work -->
```

- The *Angular* component is implemented as well

```typescript
import {Component} from '@angular/core'

@Component ({
  selector: 'app-product',
  template: `
    <article>
      <span>Product name</span>
    </article>
  `
})
export class ProductComponent {}
```

Notes :



## Templates

- Angular templates are compiled before being executed
  - Hot: *JIT* (Just In Time) `--no-aot` in Angular CLI
  - Either to build: *AOT* (Ahead Of Time) by default since Angular 9
- The compilation makes it possible to detect errors in the template
- Also implies that templates must be syntactically correct



## Interpolation

- Interpolation system thanks to the syntax `{{expression}}`
- The expression must return a value that will be converted to `string`
- Angular defines a precise syntax for these expressions
- https://angular.io/guide/template-syntax#template-expressions
- The syntax is the same that in JavaScript with some exceptions
- All properties of the component are accessible directly
- An expression in template must not change the state of the application

```typescript
@Component ({
  selector: 'product',
  template: `<p> {{user?.firstName}} </p>`
})
export class ProductComponent {
  user: User;
}
```

Notes :
The 'Elvis operator' (optional chaining) is now part of ES2020 & Typescript 3.8



## Properties

- Generic syntax for setting the value of a property of an element *HTML*
- Using the syntax `[property-name]="expression"`
- Same syntax for the properties of *standard HTML elements*, *components* and *Angular directives* and even *Web Components*

```html
<button [disabled]="isUnchanged">Save</button> <!-- HTML property -->
<button bind-disabled="isUnchanged">Save</button> <!-- alternative without [] -->
<button data-bind-disabled="isUnchanged">Save</button> <!-- html5 strict -->
<hero-detail [hero]="currentHero"></hero-detail> <!-- property of a component -->

<div [class.special]="isSpecial">Special</ div> <!-- special cases -->
<button [style.color]="isSpecial? 'red': 'green'">
```

- The properties are **binded**, the value will be updated automatically if the value of the expression changes

Notes :
Indicate that there are no differences between the use of properties and interpolation
Angular will transform interpolation syntax into property binding



## Properties

- **Attention to the difference between property and attribute**
- There are gaps between *DOM propertie* and *HTML attributes*
- Angular then proposes a system called `Attribute Binding`
- The most common cases: `aria- *`, `colspan`, `rowspan`, `svg` for example
- Using the syntax `[attr.attribute-name]="expression"`

```html
<td [colspan]="dynamicColspan">help</td>

<!-- Template parse errors:
Can not bind to 'colspan' since it is not a known native -->

<td [attr.colspan]="dynamicColspan">help</td>
```


Notes :



## Input: receive parameters

- `Input()` annotation on a property of the component class
- The name of the property will be what you will use in the template

```typescript
import {Input, Component} from '@angular/core'
import {Product} from './model/Product'

@Component ({
  selector: 'product-detail',
  template: `
    <article>
      <h1>{{product.title}}</h1>
    </article>
  `
})
export class ProductComponent {
    @Input() product: Product;
}
```

Notes :



## Input

- Ability to overload the name of the property with

  `@Input('discount')`
- Property names are case-sensitive

```typescript
@Component ({selector: 'product-detail',/*... */})
export class ProductComponent {
  @Input() product: Product;
  @Input('percentDiscount') discount: number;
}
```

- To use this component

```html
<product-detail [product]="myProduct" [percentDiscount]="10"></product-detail>
```

- *Angular* checks properties passed to a component
- It will refuse a property that does not exist or not annotated `@Input()`

Notes :



## Events

- Generic syntax for listening to an event of an element *HTML*
- Using the syntax `(event-name)="expression"`
- Identical syntax for events of *standard HTML elements*, *components* and *Angular directives* and even *Web Components*
- The methods and properties used must be defined in the class

```html
<button (click)="handler()"></button> <!-- HTML event -->
<button on-click="handler()"></button> <!-- alternative without () -->
<button data-on-click="handler()"></button> <!-- html5 strict -->

<!-- pseudo events -->
<input (keyup.enter)="onEnter()">

<!-- event of a component -->
<hero-detail (deleted)="onHeroDeleted()"></hero-detail>
```

Notes :



## Events

- *Angular* provides access to the event via the variable `$event`
- This object can be used in the expression
- All native events are propagated to parent elements

  Ability to stop the propagation by returning `false` in the expression that processes the event
- Events from *Angular* components never propagate
- Example of using `$event` with the reproduction of a **double binding**

```html
<input [value]="currentHero.firstName"
       (input)="currentHero.firstName = $event.target.value" />
```

Notes :



## Output: Emit events

- `@Output` annotation on an `EventEmitter` type property
- The name of the property will be the name of the event to use in the template

```typescript
import {Input, Output, Component, EventEmitter} from '@angular/core'
import {Product} from './model/Product'

@Component ({
  selector: 'product-detail',
  template: `
    <article>
      <button (click)="clickHandler()">Add</button>
    </article>
  `
})
export class ProductComponent {
    @Input() product: Product;
    @Output() addToBasket = new EventEmitter<Product>();

    clickHandler () { this.addToBasket.emit(this.product); }
}
```

Notes :



## Output

- Ability to overload the name of the event

  `@Output('myOtherName')`
- Event names are case-sensitive

```typescript
@Component ({selector: 'product-detail',/*... */})
export class ProductComponent {
  @Output('add') addToBasket = new EventEmitter<Product>();
}
```

- To use this component

```html
<product-detail (add)="myHandler()"></product-detail>
```

- *Angular* checks the events of a component
- It will refuse an event that does not exist or not annotated `@Output()`

Notes :



## Output

- The transmitted event object can be of any type
- It is specified in the `EventEmitter` class parameter
- To emit an event, you must pass an object of this class

```typescript
@Component ({selector: 'hello-component',/*... */})
export class HelloComponent {
  @Output() hello = new EventEmitter<string> ();
  constructor() {this.hello.emit('hello!'); }
}
```

- On the receipt side of the event, the `$event` variable corresponds to this object

```typescript
@Component ({
  selector: 'main',
  template: '<hello-component (hello)="myHandler($event)"></hello-component>'
})
export class MainComponent {
  myHandler(value: string) {
    console.log(value); // --> 'hello!'
  }
}
```

Notes :



## Declarations

- Use of *NgModule* defined in detail later in the training
- For a component to be accessible, it should either:
  - be declared in another *NgModule* listed in the `imports` list of your `NgModule`
  - be in the list of `declarations` of your module

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';

@NgModule ({
  declarations: [
    AppComponent,
  ]
  imports: [
    BrowserModule
  ]
})
export class AppModule {}
```

Notes :



## Projection

- Allows to put HTML content in the tag of an Angular component
- The `ng-content` component allows reinserting the content in the template

```html
<app-post>
  <h2>Title</h2>
  <p>Content</p>
</app-post>
```

```typescript
@Component ({
  selector: 'app-post',
  template: `
    <article>
      <ng-content></ng-content>
    </article>
  `
})
export class PostComponent {}
```
Notes :



## Projection

- Ability to have multiple insertion points with the `select` property
- The value must be the *CSS* selector of the section to use

```html
<app-post>
  <h2>Title</h2>
  <p>Content</p>
</app-post>
```

```typescript
@Component ({
  selector: 'app-post',
  template: `
    <article>
      <header><ng-content select="h2"> </ng-content> </header>
      <section><ng-content select="p"> </ng-content> </section>
    </article>
  `
})
export class PostComponent {}
```

Notes :



## Life cycle

- Each component have his own life cycle
- https://angular.io/guide/lifecycle-hooks
- It is possible to execute code at each of these stages
- Most used is initialization with the `OnInit` interface
- *Use of OnInit is recommended* rather than the `constructor`

```typescript
import {Component, OnInit} from '@angular/core';

@Component ({selector: 'user',/*... */})
export class UserComponent implements OnInit {

  @Input() data: User;
  products: Product [];

  ngOnInit (): void {
    this.products = this.getProducts(this.data.id);
  }

  getProducts (id) {...}
}
```



## Tests

- `TestBed` is the central tool for *Angular* testing
- We import it from the module `@angular/core/testing`
- Allows you to create a specific *Angular* module for a test

  Using `TestBed.configureTestingModule ({...})`
- The goal is to include as few things as possible to isolate the test

```typescript
import {TestBed} from '@angular/core/testing';

TestBed.configureTestingModule ({
    declarations: [TitleComponent],
    imports: [
      // HttpModule, FormsModule, etc.
    ]
    providers: [
      // TitleService,
      // {provide: TitleService, useClass: TitleServiceMock},
    ]
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
});
```

Notes :



## Tests

- The module created makes it possible to create a component
- This component is in the form of a `ComponentFixture`
  - Contains a reference to the instance of the TypeScript class
  - Contains a reference to the DOM element where it is attached

```typescript
class TestBed implements Injector {
  static configureTestingModule (moduleDef: TestModuleMetadata): typeof TestBed
  createComponent (component: Type<T>): ComponentFixture<T>

  / *... */
}

class ComponentFixture {
  componentInstance: T
  nativeElement: any
  debugElement: DebugElement
  elementRef: ElementRef
  detectChanges (checkNoChanges ?: boolean): void

  / *... */
}
```

Notes :



## Tests

- The `detectChanges` method allows to control the detection of changes
- Warning, no detection of automatic changes

```typescript
import {TestBed} from '@angular/core/testing';
import {TitleComponent} from './title.component';

describe('TitleComponent', () => {
  let fixture
  beforeEach (() => {
    TestBed.configureTestingModule ({
      declarations: [TitleComponent]
    });
    fixture = TestBed.createComponent (TitleComponent);
  });

  it ('should have a title', () => {
    fixture.componentInstance.title = 'Hello World';
    fixture.detectChanges ();
    const h1 = fixture.nativeElement.querySelector ('h1');
    expect(h1.textContent).toBe('Hello World');
  });
});
```

Notes :



<!-- .slide: class="page-tp3" -->

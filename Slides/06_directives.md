# Directives

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Getting started with Angular](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- **[Directives](#/6)**
- [Services](#/7)
- [Pipes](#/8)
- [Http](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Directives

- Live in the component template
- Adds additional behavior to elements in your template
- Angular offers several built-in directives to manage forms, lists, styles, and what users see

There are 3 types of directives:

- `Attribute directive`: change the appearance or behavior of DOM elements
- `Structural directive`: change the DOM layout by adding and removing DOM elements
- `Components`: yes! components are directives enhanced with a template 

✅ We've already covered components, so this section covers attribute and structural directives.

Notes :



## Attribute directive

- To create a custom directive, add the `@Directive` decorator on a class
- `ElementRef` gives you access to the host element
- `Renderer2` let you change the appearance or behavior of the host element

```ts
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(elementRef: ElementRef, renderer: Renderer2) {

    renderer.listen(elementRef.nativeElement, 'mouseenter', () => {
      renderer.setStyle(elementRef.nativeElement, 'backgroundColor', 'yellow');
    });
    renderer.listen(elementRef.nativeElement, 'mouseleave', () => {
      renderer.setStyle(elementRef.nativeElement, 'backgroundColor', 'white');
    });
  }
}
```

Notes :

- Specify that we use the native API mainly to allow server-side rendering



## Attribute directive

- Use the directive `selector` to attach it to DOM elements in the component template

```html
<p appHighlight>Highlight me!</p>
```

- At runtime, if we open the Chrome inspector, we can verify that the style has been correctly applied to the paragraph

```html
<p style="background-color: yellow">Highlight me!</p>
```

Notes :



## Directives - Host element

- When possible, instead of the `Renderer2`:
  - use `@HostBinding` decorator to change the appearance of the host element
  - use `@HostListener` decorator to change the behavior of the host element

```ts
import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive ({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor') bgColor?: string;

  @HostListener('mouseenter') onMouseEnter() { this.bgColor = 'yellow'; }

  @HostListener('mouseleave') onMouseLeave() { this.bgColor = 'white'; }
}
```

Notes :



## Directives - Host element

- You can achieve the same result using the `host` property of the `@Directive` decorator...

```ts
import { Directive } from '@angular/core';

@Directive ({
  selector: '[appHighlight]',
  host: {
    '[style.backgroundColor]': 'bgColor',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  }
})
export class HighlightDirective {
  bgColor?: string;

  onMouseEnter() { this.bgColor = 'yellow'; }

  onMouseLeave() { this.bgColor = 'white'; }
}
```

- ...but prefer the `HostBinding` and `HostListener` techniques

Notes :



## Directives - Input and Output 1/2

- Use `@Input` and `@Output` decorators to make the directive configurable

```ts
import { Directive, Input, HostListener, HostBinding, Output } from '@angular/core';

@Directive ({ selector: '[appHighlight]' })
export class HighlightDirective {
  @Input() defaultBgColor = 'white';
  @Input() appHighlight = 'yellow';

  @Output() highlighted = new EventEmitter<boolean>();

  @HostBinding('style.backgroundColor') bgColor = this.defaultBgColor;

  @HostListener('mouseenter') onMouseEnter() {
    this.bgColor = this.appHighlight;
    this.highlighted.emit(true);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.bgColor = this.defaultBgColor;
    this.highlighted.emit(false);
  }
}
```

Notes :



## Directives - Input and Output 2/2

- Use regular property binding and event binding on the host element

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p
              [appHighlight]="highlightBgColor"
              defaultBgColor="grey"
              (highlighted)="highlightedHandler($event)"
             >
               Highlight me!
             </p>`,
})
export class AppComponent {
  highlightBgColor = 'green';

  highlightedHandler(highlighted: boolean) {
    console.log('Is highlighted?', highlighted);
  }
}
```

Notes :



## Structural directive

Change the DOM layout by adding or removing DOM elements.

Let's take an example with the Angular built-in `NgIf` directive, which conditionally adds or removes an element.

- Shorthand using the `*` symbol (also called micro-syntax)
- The `<h1>` tag is only displayed when the condition `product.stock > 0` is `true`

```html
<h1 *ngIf="product.stock > 0">{{ product.title }}</h1>
```

- Under the hood Angular creates an `<ng-template>` wrapper element.<br />
  At runtime, Angular does not render `<ng-template>` but only the `<h1>`

```html
<ng-template [ngIf]="product.stock">
  <h1>{{ product.title }}</h1>
</ng-template>
```

- A structural directive is therefore an attribute directive whose host element is a template

Notes :



## Structural directive

- Let's create a custom structural directive which does the opposite of `NgIf`

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]' })
export class UnlessDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @Input() set appUnless(condition: boolean) {
    const hasView = this.viewContainerRef.get(0) !== null;

    if (!condition && !hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else if (condition && hasView) {
      this.viewContainerRef.clear();
    }
  }
}
```

Notes :



## Structural directive - Combination

- Multiple structural directives can NOT be combined on the same host element
- For this use-case, use `<ng-container>`

```html
<ng-container *ngFor="let product of products">
  <h1 *ngIf="product.stock > 0">{{ product.title }}</h1>
</ng-container>
```

- In fact, the example above is equivalent to

```html
<h1 *ngFor="let product of products">
  <ng-container *ngIf="product.stock > 0">{{ product.title }}</ng-container>
</h1>
```

- At runtime `<ng-container>` does not get rendered (like `<ng-template>`)

```html
<h1>Product 1</h1>
<h1>Product 2</h1>
```

Notes :



## Directives - Declaration

- Like components, directives must be declared in `NgModule`

```ts
// --- app.module.ts ---

import { NgModule } from '@angular/core';
import { HighlightDirective } from './highlight/highlight.directive';

@NgModule ({
  declarations: [AppComponent, HighlightDirective]
})
export class AppModule {}

// --- app.component.ts ---

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<p appHighlight>Highlight me!</p>',
})
export class AppComponent {}
```

Notes :



## Built-in attr. directives - NgStyle

- Adds CSS properties
- Takes an object with CSS properties as keys
- Use only for cases where pure CSS is not enough

```ts
import { Component } from '@angular/core';

@Component ({
  selector: 'app-font-size-selector',
  template: `
   <h1 [ngStyle]="{ 'font-size': currentSize + 'px' }">Example<h1>

   Change size: <input type="number" [value]="currentSize" (input)="changeSize($event)">
  `
})
export class FontSizeSelectorComponent {
  currentSize = 20;

  changeSize(event: Event) {
    this.currentSize = Number((event.target as HTMLInputElement).value);
  }
}
```

Notes :



## Built-in attr. directives - NgClass

- The `ngClass` directive adds or removes CSS classes
- Can be used in addition to the standard class attribute
- Three syntaxes coexist:
  - `[ngClass]=" 'class2 class2' "`
  - `[ngClass]=" ['class1', 'class2'] "`
  - `[ngClass]=" { 'class1': hasClass1, 'class2': hasClass2 } "`

- The last syntax is the most commonly used

Notes :



## Built-in attr. directives - NgClass

- Example of using the `ngClass` directive

```ts
import { Component } from '@angular/core';

@Component ({
  selector: 'app-toggle-highlight',
  template: `
    <div [ngClass]="{ 'highlight': isHighlighted }">
      {{ isHighlighted ? 'On' : 'Off' }}
    </div>

    <button (click)="isHighlighted = !isHighlighted">Toggle</button>
  `,
  styles: [`
    .highlight { background-color: yellow }
  `]
})
export class ToggleHighlightComponent {
  isHighlighted = false;
}
```

Notes :



## Built-in struct. directives - NgIf

- Adds or removes an HTML element based on a condition

```html
<div *ngIf="condition">Lorem Ipsum</div>
```

- Ability to define an `else` clause
- Create a "template reference" using the `#` symbol

```html
<div *ngIf="condition; else noContent">Lorem Ipsum</div>

<ng-template #noContent>No content available...</ng-template>
```

- Note that when you hide an element using CSS, the element remains part of the DOM

```html
<div style="display: none">Lorem Ipsum</ div>
```

Notes :



## Built-in struct. directives - NgFor (hard way)

- Can duplicate a template for each item in a collection
- Use `<ng-template>` to define the content to duplicate
- Use `ngForOf` attribute (which is an `@Input` of the `NgFor` directive) to define the collection
- Use `let-myVar="value"` syntax to define variables inside the template for each iteration
  - use one of the values provided by Angular: `index`, `first`, `last`, `even` and `odd`

```html
<ul>
  <ng-template ngFor [ngForOf]="products" let-product let-idx="index">
    <li>{{ idx + 1 }}: {{ product.title }}</li>
  </ng-template>
</ul>
```

- In fact, there's another value: `$implicit` which is optional

```html
<ng-template ngFor [ngForOf]="products" let-product="$implicit">
  <p>{{ product.title }}</p> </ng-template>
```

Notes :



## Built-in struct. directives - NgFor

- Use the micro-syntax `*ngFor` (like we did for `*ngIf`)
- Note that the `*ngFor` is directly placed on the element to duplicate
- Use the `trackBy` function to improve directive performance on large datasets

```ts
import { Component } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let product of products; let idx = index; trackBy: trackByProductId">
        {{ idx + 1 }}: {{ product.title }}
      </li>
    </ul>`
})
export class AppComponent {
  products: Product[] = [/* ... */];

  trackByProductId(index: number, product: Product) { return product.id; }
}
```

Notes :



## Built-in struct. directives - ngSwitch

- Adds or removes HTML elements based on a condition
- Is made of both "attribute" and "structural" directives
- Three directives available:
  - `[ngSwitch]`: container element for the different cases
  - `*ngSwitchCase`: element to display depending on a condition
  - `*ngSwitchDefault`: element to display as default value

```html
The value is:
<ng-container [ngSwitch]="value">
  <strong *ngSwitchCase="0"> zero </strong>
  <strong *ngSwitchCase="1"> one </strong>
  <strong *ngSwitchCase="2"> two </strong>
  <strong *ngSwitchDefault> greater that two </strong>
</ng-container>
```

Notes :



## Directives - Testing

- Create a wrapper component for DOM testing purposes

```ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-wrapper',
  template: '<div appHighlight>Highlight</div>',
})
class WrapperComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<WrapperComponent>;
  let hostElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [WrapperComponent, HighlightDirective] });
    fixture = TestBed.createComponent(WrapperComponent);
    hostElement = fixture.nativeElement.querySelector('[appHighlight]') as HTMLElement;
  });
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp4" -->

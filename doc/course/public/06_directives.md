# Directives

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
- **Directives**

</div>
<div class="column-50">

- [Signals](#/8)
- [Dependency injection](#/9)
- [Pipes](#/10)
- [Http client](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>
</div>

Notes :



## Directives

- Live in the **component template**
- Needs a **host element** to be attached to
- Adds **additional behavior** to host elements in your template
- Defined in a single place, it can be used in several components
- Angular offers several **built-in directives** to manage routing, forms, and what users see

Notes :



## Directives

There are 3 types of directives:

- **Attribute directive**: change the appearance or behavior of DOM elements
- **Structural directive**: change the DOM layout by adding and removing DOM elements
- **Component**: yes! components are in fact directives that embed their own template 

Note:
  - Components have already been covered
  - Structural directives are complex and beyond the scope of this course 

✅ Therefore, this course focuses only on **attribute directives**

- In this chapter, we'll cover the definition and usage of **custom** attribute directives
- Later in the course, you'll discover some Angular **built-in** attribute directives such as `RouterLink` (Routing) and `NgModel` (Forms)

Notes :



## Attribute directive - Definition

- To create a directive, add the `@Directive` decorator on a class
- `ElementRef` gives you access to the host element
- `Renderer2` let you change the appearance or behavior of the host element

```ts
import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class Highlight {
  constructor() {
    const elementRef = inject(ElementRef);
    const renderer = inject(Renderer2);

    renderer.listen(elementRef.nativeElement, 'mouseenter', () => {
      renderer.setStyle(elementRef.nativeElement, 'backgroundColor', 'yellow');
    });
    renderer.listen(elementRef.nativeElement, 'mouseleave', () => {
      renderer.setStyle(elementRef.nativeElement, 'backgroundColor', null);
    });
  }
}
```

Notes :

- Specify that we use the native API mainly to allow server-side rendering



## Attribute directive - Usage

- Import the directive `class` in your component
- Use the directive `selector` to attach it to DOM elements in the component template

```ts
import { Component } from '@angular/core';
import { Highlight } from './highlight.ts';

@Component({
  selector: 'app-root',
  imports: [Highlight],
  template: `<p appHighlight> Highlight me! </p>`,
})
export class App {}
```

- At runtime, if we open the Chrome inspector, we can verify that the style has been correctly applied to the paragraph

```html
<p style="background-color: yellow"> Highlight me! </p>
```

Notes :



## Attribute directive - Host metadata

- When possible, instead of the `Renderer2`, use the `host` metadata to configure *host binding* and *host listener*

```ts
import { Directive } from '@angular/core';

@Directive ({
  selector: '[appHighlight]',
  host: {
    '[style.backgroundColor]': 'currentColor',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  }
})
export class Highlight {
  currentColor?: string;

  onMouseEnter() { this.currentColor = 'yellow'; }

  onMouseLeave() { this.currentColor = undefined; }
}
```

_😉 Note that `host` property also applies to component metadata_

Notes :



## Attribute directive - Input and Output 1/2

- Use `input` and `output` functions to make the directive configurable

```ts
import { Directive, input, output } from '@angular/core';

@Directive ({
  selector: '[appHighlight]',
  host: { /* ...same bindings as previous slide... */ }
})
export class Highlight {
  currentColor?: string;
  highlightColor = input('yellow', { alias: 'appHighlight' });
  highlighted = output<boolean>();

  onMouseEnter() {
    this.currentColor = this.highlightColor();
    this.highlighted.emit(true);
  }
  onMouseLeave() {
    this.currentColor = undefined;
    this.highlighted.emit(false);
  }
}
```

Notes :



## Attribute directive - Input and Output 2/2

- Use regular property binding and Event listeners on the host element

```ts
import { Component } from '@angular/core';
import { Highlight } from './highlight.ts';

@Component({
  selector: 'app-root',
  imports: [Highlight],
  template: `
    <p [appHighlight]="highlightColor" (highlighted)="highlightedHandler($event)">
      Highlight me!
    </p>
  `,
})
export class App {
  highlightColor = 'green';

  highlightedHandler(highlighted: boolean) {
    console.log('Is highlighted?', highlighted);
  }
}
```

Notes :



## Directives - Testing

- Create a wrapper component for DOM testing purposes

```ts
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Highlight } from './highlight';

@Component({
  selector: 'app-wrapper',
  imports: [Highlight],
  template: '<div appHighlight="green">Highlight me!</div>',
}) class Wrapper {}

describe('Highlight', () => {
  let fixture: ComponentFixture<Wrapper>;
  let hostElement: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Wrapper] }).compileComponents();
    fixture = TestBed.createComponent(Wrapper);
    fixture.detectChanges();
    hostElement = fixture.debugElement.query(By.directive(Highlight)).nativeElement;
  });
});
```

Notes :



## Directives - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->



## Directives - Lab 6
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

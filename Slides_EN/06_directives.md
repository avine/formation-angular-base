# Directives
<!-- .slide: class="page-title" -->

Notes:



## Summary

<!-- .slide: class="toc" -->

- [Reminders](#/1)
- [Presentation](#/2)
- [Start an Angular application](#/3)
- [Tests](#/4)
- [Template & Components](#/5)
- ** [Guidelines](#/6) **
- [Dependency Injection](#/7)
- [Pipes](#/8)
- [HTTP Service](#/9)
- [Router](#/10)
- [Forms](#/11)
- [Server-side Rendering](#/12)

Notes:



## Directives

- Schematically the directives are components without template
- Technically components inherit guidelines
- Interferes with the appearance or operation of an HTML element
- * Angular * offers several directives in its different modules
- Creating a custom directive with the `@Directive` annotation
- Can accept parameters (`Input`) and output events (` Output`)
- Guidelines are where to do DOM manipulation
  - Components can do it too, but it's bad practice
  - Always use the `Renderer2` service, not with native code

Notes:
- Specify that we use the native API mainly to allow server-side rendering



## Directives

- First example of a directive
- We traditionally use a selector on a property `[myProp]`

```Typescript
import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive ({
  selector: '[myHighlight]'
})
export class HighlightDirective {
  constructor (element: ElementRef, renderer: Renderer2) {
    //element.nativeElement.style.backgroundColor = 'yellow';
    renderer.setElementStyle (element.nativeElement, 'backgroundColor', 'yellow');
  }
}
```

- Use in a template as follows

```HTML
<p myHighlight>
  Highlight me!
</ P>
```

Notes:



## User Action

- The ** Host ** is the DOM element that carries the directive
- Ability to listen to the events of the Host element
- Avoid listening to events via the DOM to avoid memory leaks
- Using the `HostListener` and` HostBinding` annotations:

```Typescript
import {Directive, HostListener, HostBinding} from '@angular/core';

@Directive ({selector: '[myHighlight]'})
export class HighlightDirective {
  @HostBinding ('style.backgroundColor') color = 'red';

  constructor () {...}

  @HostListener ('mouseenter') onMouseEnter () {this.color = 'blue'; }

  @HostListener ('mouseleave') onMouseLeave () {this.color = 'red'; }
}
```

Notes:



## User Action

- Using the `host` property of the` @Directive` annotation

```Typescript
import {Directive} from '@angular/core';

@Directive ({
  selector: '[myHighlight]',
  host: {
    '[style.backgroundColor]': 'color',
    '(mouseenter)': 'highlight ()',
    '(mouseleave)': 'restoreColor ()',
  }
})
export class HighlightDirective {
  color = ''

  highlight () {this.color = 'yellow'; }
  restoreColor () {this.color = ''; }
}
```

Notes:



## Statement

- Works like components
  - in another * NgModule * listed in the `imports` list
  - in the list of `declarations` of your module

```Typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HighlightDirective} from './highlight.directive';

@NgModule ({
  statements: [
    HighlightDirective
  ]
  imports: [
    BrowserModule
  ]
})
export class AppModule {}
```

Notes:



## Angular Guidelines

- * Angular * provides about thirty directives:
  - Manipulation of DOM
  - Forms Management
  - Router

- Import the corresponding module to use them:
  - `CommonModule`
  - `FormsModule`
  - `RouterModule`

Notes:



## ngStyle

- Directive to add CSS properties
- Takes an object with CSS properties as keys
- Use only for cases where pure CSS is not enough

```Typescript
import {Component} from '@angular/core';

@Component ({
  selector: 'ngStyle-example',
  template: `
    <h1 [ngStyle] = "{'font-size': size}">
      title
    </ H1>

    <Label> Size:
      <input type = "text" [value] = "size" (input) = "size = $ event.target.value">
    </ Label>
  `
})
export class NgStyleExample {
  size = '20px';
}
```

Notes:



## ngClass

- The `ngClass` directive adds or removes CSS classes.
- Can be used in addition to the standard class attribute
- Three syntaxes coexist
  - `[ngClass] =" 'class class1' "`
  - `[ngClass] =" ['class', 'class1'] "`
  - `[ngClass] =" {'class': isClass, 'class1': isClass1} "`

- The 3rd syntax is the most common
- It allows to express everything from the template

Notes:



## ngClass

- Example of using the `ngClass` directive

```Typescript
import {Component} from '@angular/core';

@Component ({
  selector: 'toggle-button',
  template: `
    <div [ngClass] = "{'highlight': isHighlighted}"> </ div>
    <button (click) = "toggle (! isHighlighted)"> Click me! </ button>
  `,
  styles: [
    `.highlight {...}`
  ]
})
class ToggleButton {
  isHighlighted = false;

  toggle (newState) {
    this.isHighlighted = newState;
  }
}
```
Notes:



## ngFor

- Can duplicate a template for each element of a collection
- Corresponds to the `ngRepeat` directive in * AngularJS *
- Definition of the content to duplicate in a `<ng-template>` element
- Using the `ngForOf` property to set the collection
- We create a variable from the template for the iterator

  New syntax to create a `let-myVarName` variable
- Angular provides five additional data

  `index`,` first`, `last`,` even` and `odd`
- Final syntax for an iterration on the array `items`

```HTML
<ng-template ngFor [ngForOf] = "items" let-item let-i = "index">
  <li> {{item.label}} </ li>
</ Ng-template>
```

Notes:



## ngFor microsyntax

- The complete syntax for a ngFor is quite tedious
- * Angular * offers an easier alternative to read
- This syntax is almost always preferred to the complete syntax
- * Angular * calls the system ** Microsyntax **
- This is purely syntactic sugar, the behavior is identical
- Add ```before` ngFor` to indicate microsyntax

```HTML
<li * ngFor = "let item of items; let i = index">
  {{item.label}}
</ Li>
```

- Note that the `* ngFor` is directly on the element to duplicate

Notes:



## ngIf

- Add/Remove HTML elements based on a condition
- If the expression returns `true` the template will be inserted

```HTML
<div * ngIf = "condition"> ... </ div>
<ng-template [ngIf] = "condition">
  <Div> ... </ div>
</ Ng-template>
```

- Ability to define an 'else` clause

```HTML
<div * ngIf = "condition; else elseBlock"> ... </ div>
<ng-template #elseBlock> No data </ ​​ng-template>
```
- No `ngShow` and` ngHide` directives like in * AngularJS *
- Using the `hidden` property (requires polyfills)

```HTML
<div [hidden] = "condition"> ... </ div>
```

Notes:



## ngSwitch

- Add/Remove HTML elements based on a condition
- Three directives available:
- `ngSwitch`: container element
- `ngSwitchCase`: element to use for each possible value
- `ngSwitchDefault`: to define a template for a default value

```HTML
<div [ngSwitch] = "value">
<p * ngSwitchCase = "'init'"> increment to start </ p>
<p * ngSwitchCase = "0"> 0, increment again </ p>
<p * ngSwitchCase = "1"> 1, stop incrementing </ p>
<p * ngSwitchDefault> & gt; 1, STOP! </ P>
</ Div>
 ```

Notes:



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp4" -->

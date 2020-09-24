# Pipes

<!-- .slide: class="page-title" -->

Notes :



## Summary

<!-- .slide: class="toc" -->

- [Reminders](#/1)
- [Introduction](#/2)
- [Start an Angular application](#/3)
- [Tests](#/4)
- [Template & Components](#/5)
- [Directives](#/6)
- [Dependency Injection](#/7)
- **[Pipes](#/8)**
- [HTTP Service](#/9)
- [Router](#/10)
- [Forms](#/11)
- [Server-side Rendering](#/12)

Notes :



## The Pipes

- Mechanism allowing the transformation of a datum before its use
- Similar to filters in *AngularJS*
- Use with the `|` character in template expressions
- Ability to write his own *Pipe*
- Added the notion of *Pipe* pure and impure
- Pipes available by default in the `@angular/common` framework
  - `LowerCasePipe`, `UpperCasePipe`
  - `CurrencyPipe`, `DecimalPipe`, `PercentPipe`
  - `DatePipe`, `JSONPipe`, `SlicePipe`
  - `I18nPluralPipe`, `I18nSelectPipe`
  - `AsyncPipe`

Notes :



## Use in Templates

- The *Pipes* available by default are directly usable
- Possibility to chain the pipes one after the other
- Ability to pass parameters with the `:` character
- The parameters are **binded** and the result is recalculated on every change
- The syntax is the following

  `{{ myData | pipeName:pipeArg1:pipeArg2 | anotherPipe }}`

```HTML
{{myVar | date | uppercase}}
<!-- FRIDAY, APRIL 15, 1988 -->

{{price | currency: 'EUR': 'symbol'}}
<!-- 53.12€ -->
```

Notes :



## Creation

- Define a class implementing the `PipeTransform` interface
- Implement the `transform` method
- Annotate the class with the `@Pipe` decorator

```typescript
import {isString, isBlank} from '@angular/core/src/facade/lang';
import {PipeTransform, Pipe} from '@angular/core';

@Pipe ({name: 'mylowercase'})
export class MyLowerCasePipe implements PipeTransform {
  transform (value: any, param1: string, param2: string): string {
    if (isBlank (value)) {
      return value;
    }
    if (! isString (value)) {
      throw new Error ('MyLowerCasePipe value should be a string');
    }
    return value.toLowerCase();
  }
}
```

Notes :



## Declarations

- Declares itself as components and directives
- The pipe must be added to the table `declarations`

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MyLowerCasePipe} from './mylowercase.pipe';

@NgModule ({
  declarations: [
    MyLowerCasePipe
  ]
  imports: [
    BrowserModule
  ]
})
export class AppModule {}
```

Notes :



## Use

- Just as components and directives
- A pipe is usable if it has been declared in the module or an imported module

```typescript
import {Component} from '@angular/core';

@Component ({
  selector: 'app',
  template: `
    <h2>
      {{'Hello World' | mylowercase}}
    </h2>
  `
})
export class App {}
```

Notes :



## Injection

- It is possible to use a pipe from TypeScript code
- Using dependency injection to use a *Pipe*
- You have to add the pipe in `providers` (component or module)

```typescript
import {Component} from '@angular/core`;
import {MyLowerCasePipe} from './mylowercase';

@Component ({
  selector: 'app',
  providers: [MyLowerCasePipe]
})
class App {
  name: string;

  constructor(lower: MyLowerCasePipe) {
    this.name = lower.transform('Hello Angular');
  }
}
```

Notes :



## Pure pipes

- Refers to the concept of pure function
- *Pipes* are pure by default
- Execute only for a reference change of the value
- Will not be reevaluated for a mutation without reference change
- Optimizes the performance of the change detection mechanism
- Is not always the desired behavior:
 - Add/Remove an object in a table
 - Modifying a property of an object

Notes :



## Impure pipes

- Executed at each cycle of the change detection system
- Less efficient than a pure pipe, use only when necessary
- To set an impure *Pipe*, set the `pure` property to `false`

```typescript
@Pipe({
  name: 'myImpurePipe',
  pure: false
})
export class MyImpurePipe implements PipeTransform {
  transform(value: any): any {...}
}
```

Notes :




## AsyncPipe

- Supplied by *Angular* by default, example of impure pipe
- *Pipe* receiving a `Promise` or an `Observable` as input
- The value must be able to change while the reference of `Promise` or `Observable` has not changed

```typescript
@Component ({
  selector: 'pipes',
  template: '{{promise | async}} '
})
class PipesAppComponent {
  promise: Promise;

  constructor() {
    this.promise = new Promise ((resolve, reject) => {
      setTimeout (() => {
        resolve ("Hey, this is the result of the promise");
      }, 2000);
    });
  }
}
```

Notes :



## Tests

- A *Pipe* is nothing but a function!
- Instantiation of *Pipe* in a `beforeEach` method
- Call the `transform` method to test all possible cases

```typescript
import {MyLowerCasePipe} from './app/mylowercase';

describe('MyLowerCasePipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new MyLowerCasePipe ();
  });

  it('should return lowercase', () => {
    var val = pipe.transform('SOMETHING');
    expect(val).toEqual('something');
  });
});
```

Notes :



<!-- .slide: class="page-tp6" -->

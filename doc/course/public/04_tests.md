# Unit testing

<!-- .slide: class="page-title" -->



## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- **Unit testing**
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
- [Appendix](#/14)

</div>
</div>

Notes :



## Unit testing - Introduction 

Testing your Angular application helps you check that your application is working as you expect.

To test an application, you need two functional building blocks:

- A **test runner** that identifies and runs the files containing the tests
- An **assertion library** that verifies the expected behavior

Out of the box, Angular uses **Karma** as test runner and **Jasmine** as assertion library.

By default, test files are identified by the pattern: `*.spec.ts`.

Notes :
The course focuses on `TestBed` which is the envrionment provided by Angular for testing Angular apps.
We therefore only learn the basics of Jasmine and Karma...



## Unit testing - Jasmine 

- Organize your tests using `describe`  and `it` functions
- Follow the 3 steps pattern in each test: *"Given"*, *"When"*, *"Then"*
- Identify the thing being tested using `expect`
- Use matchers to verify the expected behavior: `toBe`, `toBeTrue`, `toBeTruthy`, `toContain`, ...

```ts
describe('boolean variable', () => {
  let value?: boolean;

  it('should be inverted when using "!" operator', () => {
    // Given
    value = true;

    // When
    value = !value;

    // Then
    expect(value).toBe(false); // equivalent to `expect(value).toBeFalse();`
  });
});
```

Notes :



## Unit testing - Jasmine | Hooks

- Use hooks to setup and teardown your tests using:
  - `beforeEach`, `afterEach`, `beforeAll`, `afterAll`

```ts
describe('boolean variable', () => {
  let value?: boolean;

  beforeEach(() => {
    // Given
    value = true;
  });

  it('should be inverted when using "!" operator', () => {
    // When
    value = !value;

    // Then
    expect(value).not.toBeTrue(); // <-- notice the usage of `.not`
  });
});
```

Notes :



## Unit testing - Jasmine | Spies

- Use spy to watch how a method is been used during the test
- Create a spy: `jasmine.createSpy` or `spyOn`
- Spy matchers: `toHaveBeenCalled`, `toHaveBeenCalledWith`, `and.returnValue`, ...

```ts
// Given
class Counter {
  count = 0;

  increment() { this.count += 1; this.log('increment'); }

  log(message: string) { console.log('Counter:', message); }
}
const count = new Counter();
const logSpy = spyOn(count, 'log'); // <-- Spying on the `log` method

// When
count.increment();

// Then
expect(logSpy).toHaveBeenCalledWith('increment');
```

Notes :



## Unit testing - Angular environment

- Angular provides a powerful testing environment called `TestBed` 
- Angular testing configuration is reset for every test (executed in `beforeEach`)

```ts
import { TestBed } from '@angular/core/testing';

describe('my feature', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ /* Test setup */ }).compileComponents();
  });

  it('should work', () =>  /* ... */ });

  it('should work too', () =>  /* ... */ });
});
```

Notes :



## Unit testing - Components

- Components combine an HTML template and a TypeScript class
- You should test that they work together as intended
- `TestBed` helps you create the component's host element as if it were rendered in the DOM
- The `fixture` gives you access to the component instance and its host element 
- In the tests you must `detectChanges` manually verifying that the DOM state is correct

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

await TestBed.configureTestingModule({ imports: [App] }).compileComponents();

let fixture = TestBed.createComponent(App);

let component = fixture.componentInstance;
let hostElement = fixture.nativeElement;

fixture.detectChanges();
```

Notes :



## Unit testing - Components | Strategies

- Class testing

  - **pros:** easy to setup, easy to write, most usual way to write unit tests

  - **cons:** does not make sure your component behave the way it should

- DOM testing

  - **pros:** make sure your component behave exactly the way it should

  - **cons:** harder to setup, Harder to write

✅ Overall, **DOM testing is more robust**, but require more work to setup

Notes :



## Unit testing - Example 1

- Let's test a simple counter component with no dependencies

```ts
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">{{ count() }}</button>'
})
export class Counter {
  count = model(0);

  protected increment() {
    this.count.update((count) => count + 1);
  }
}
```

Notes :



## Unit testing - Example 1

- Test setup

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter', () => {
  let fixture: ComponentFixture<Counter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
    }).compileComponents();

    fixture = TestBed.createComponent(Counter);

    fixture.detectChanges(); // <-- The template state needs to be initialized manually
  });
});
```

Notes :



## Unit testing - Example 1

- (1/2) Actual Tests

```ts
import { By } from '@angular/platform-browser';

it('should display 0', () => {
  // Getting element using `debugElement`
  const button = fixture.debugElement.query(By.css('button')).nativeElement;

  expect((button as HTMLButtonElement).textContent).toContain(0);
});

it('should increment the count when clicking', () => {
  // Getting element using `nativeElement`
  const button = (fixture.nativeElement as HTMLElement).querySelector('button');

  button?.click(); // <-- The class state get automatically updated
  expect(fixture.componentInstance.count()).toBe(1); // <-- Class testing

  fixture.detectChanges(); // <-- The template state update needs to be triggered manually 
  expect(button?.textContent).toContain(1); // <-- DOM testing
});
```

Notes :



## Unit testing - Example 1

- (2/2) Actual Tests

```ts
it('should call count "update" method when clicking', () => {
  const countUpdateSpy =
    spyOn(fixture.componentInstance.count, 'update').and.callThrough();

  const button = (fixture.nativeElement as HTMLElement).querySelector('button');
  button?.click();

  expect(countUpdateSpy).toHaveBeenCalledWith(1);
});
```

Notes :



## Unit testing - Example 2

- Let's test a more complex component with dependencies
- We're going to explore *two different approaches* to test this use case

```ts
import { Component } from '@angular/core';
import { Counter } from './counter';

@Component({
  selector: 'app-number-parity',
  import: [Counter],
  template: `
    <app-counter [(count)]="count" />

    <span>{{ count % 2 ? 'is odd' : 'is even' }}</span>
  `,
})
export class NumberParity {
  count = 0;
}
```
Notes :



## Unit testing - Example 2 | First approach

- (1/2) Test setup *with implicit dependency import*

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NumberParity } from './number-parity';

describe('NumberParity', () => {
  let component: NumberParity;
  let fixture: ComponentFixture<NumberParity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberParity] // <-- `Counter` also imported
    }).compileComponents();

    fixture = TestBed.createComponent(NumberParity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
```

Notes :



## Unit testing - Example 2 | First approach

- (2/2) Actual Tests *accessing the dependency* (the child component instance)

```ts
it('should bind parent "count" to child component', () => {
  const counter: Counter =
    fixture.debugElement.query(By.directive(Counter)).componentInstance;

  // Accessing the child component properties
  expect(counter.count()).toBe(component.count);
});

it('should be "odd" when child component emits', () => {
  const counter: Counter =
    fixture.debugElement.query(By.directive(Counter)).componentInstance;

  // Accessing the child component methods
  counter.count.set(1);
  fixture.detectChanges();

  const span = (fixture.nativeElement as HTMLElement).querySelector('span');
  expect(span?.textContent).toContain('odd');
});
```

Notes :



## Unit testing - Example 2 | Second approach

- (1/2) Test setup *allowing unknown HTML elements*

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Counter } from '../counter/counter';
// The rest of the imports...

describe('NumberParity', () => {
  let component: NumberParity;
  let fixture: ComponentFixture<NumberParity>;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({ imports: [NumberParity] })
      .overrideComponent(NumberParity, {
        remove: { imports: [Counter] },
        add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    // The rest of the setup...
  });
});
```

Notes :



## Unit testing - Example 2 | Second approach

- (2/2) Actual Tests using
  - `debugElement.properties` and `debugElement.triggerEventHandler`

```ts
it('should bind parent "count" to child component', () => {
  const debugElement = fixture.debugElement.query(By.css('app-counter'));

  // Accessing bindings on the child element
  expect(debugElement.properties['count']).toBe(component.count);
});

it('should be "odd" when child component emits', () => {
  const debugElement = fixture.debugElement.query(By.css('app-counter'));

  // Triggering events on the child element
  debugElement.triggerEventHandler('countChange', 1);
  fixture.detectChanges();

  const span = (fixture.nativeElement as HTMLElement).querySelector('span');
  expect(span?.textContent).toContain('odd');
});
```

Notes :
Talk about "ng-mocks" library (https://www.npmjs.com/package/ng-mocks).



## Unit testing - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->



## Unit testing - Lab 4
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

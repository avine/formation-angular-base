# Testing

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [TypeScript](#/3)
- [Components](#/4)
- **Testing**
- [Control flow](#/6)
- [Directives](#/7)
- [Signals](#/8)

</div>
<div class="column-50">

- [Dependency injection](#/9)
- [Pipes](#/10)
- [RxJS](#/11)
- [HTTP client](#/12)
- [Routing](#/13)
- [Forms](#/14)
- [More on Components](#/15)

</div>
</div>

<!-- separator-vertical -->

## Testing - Introduction 

- Testing your Angular application helps you check that your application is working as you expect<br />
  - Unit tests are crucial for **catching bugs** early, ensuring **code quality**, and facilitating **safe refactoring**

- Testing requires two functional building blocks
  - A **test runner** that identifies and runs the test files in a testing environment
  - An **assertion library** that verifies the expected behavior

- Angular uses [Vitest](https://vitest.dev/) as test runner (which uses [Chai](https://www.chaijs.com/) for assertions with [Jest expect](https://jestjs.io/docs/expect)-compatible APIs)
  - Vitest runs your unit tests in a Node.js environment
  - Using [jsdom](https://github.com/jsdom/jsdom) to emulate the DOM

- Test files are identified by the pattern: `*.spec.ts`

- Run your test suite with the shell command: `ng test`

NOTES:
The course focuses on `TestBed` which is the environment provided by Angular for testing Angular apps.
We therefore only learn the basics of Vitest...

<!-- separator-vertical -->

## Testing - Vitest | Assertion library

- Organize your tests using `describe`  and `it` functions
- Identify the "thing" being tested using `expect`
- Use assertions to verify the expected behavior: `toBe`, `toBeTruthy`, `toContain`, ...

```ts
describe('boolean variable', () => {
  let value: boolean;

  it('should be inverted when using "!" operator', () => {
    // Given
    value = true;

    // When
    value = !value;

    // Then
    expect(value).toBe(false);
  });
});
```

😉 *Follow the 3-step pattern in each test: *"Given"*, *"When"*, *"Then"**

<!-- separator-vertical -->

## Testing - Vitest | Assertion library - Hooks

- Use hooks to setup and teardown your tests
  - `beforeEach`, `afterEach`, `beforeAll`, `afterAll`

```ts
describe('boolean variable', () => {
  let value: boolean;

  beforeEach(() => {
    // Given
    value = true;
  });

  it('should be inverted when using "!" operator', () => {
    // When
    value = !value;

    // Then
    expect(value).not.toBe(true); // <-- notice the usage of `.not` to negate the assertion
  });
});
```

<!-- separator-vertical -->

## Testing - Vitest | Assertion library - Mocks 1/2

- Create **mocks** using: `vi.fn()`

```ts
function dataHandler(callback: CallableFunction) {
  const data = Math.random();
  callback(data);
}

describe('dataHandler', () => {
  it('shoud call the callback function', () => {
    // Given
    const mock = vi.fn();

    // When
    dataHandler(mock);

    // Then
    expect(mock).toHaveBeenCalled();
  });
});
```

😉 *Use mocks to create a "fake" version of an internal or external dependency of your test*

<!-- separator-vertical -->

## Testing - Vitest | Assertion library - Mocks 2/2

- Create **spies** using: `vi.spyOn()`

```ts
function dataHandler(callback: CallableFunction) {
  const data = Math.random();
  callback(data);
}

describe('dataHandler', () => {
  it('shoud call the callback function with a random value', () => {
    // Given
    const mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(5);
    const mock = vi.fn();

    // When
    dataHandler(mock);

    // Then
    expect(mathRandomSpy).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(5);
  });
});
```

<!-- separator-vertical -->

## Testing - Angular | TestBed

- Angular provides a powerful testing environment called `TestBed` 
  - Testing configuration is reset for every test (executed in `beforeEach`)

```ts
import { TestBed } from '@angular/core/testing';

describe('MyFeature', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ /* Test setup */ }).compileComponents();
  });

  it('should work', () =>  { /* ... */ } });

  it('should work too', () =>  { /* ... */ } });
});
```

<!-- separator-vertical -->

## Testing - Angular | TestBed - createComponent

- Components combine a **TypeScript class** and an **HTML template**
  - You should test that they work together as intended

- `TestBed.createComponent` helps you create the component being tested
  - The `fixture` gives you access to the **component instance** and its **template in the DOM** 
  - You must wait until the fixture is stable before verifying DOM related assertions

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

await TestBed.configureTestingModule({ imports: [App] }).compileComponents();

let fixture = TestBed.createComponent(App);

let component = fixture.componentInstance;
let hostElement = fixture.nativeElement;

await fixture.whenStable();
```

<!-- separator-vertical -->

## Testing - Component testing strategies

- Class testing

  - **pros:** easy to setup, easy to write

  - **cons:** does not make sure your component behaves the way it should

- DOM testing

  - **pros:** make sure your component behaves exactly the way it should

  - **cons:** harder to setup, harder to write

✅ Overall, **DOM testing** is **preferable** as it is **more robust**, but it requires more work

<!-- separator-vertical -->

## Testing - Comp. with no dep. 1/4

- Let's test a simple counter **component with no dependencies**

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

<!-- separator-vertical -->

## Testing - Comp. with no dep. 2/4

- Test setup

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter', () => {
  let fixture: ComponentFixture<Counter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Counter] }).compileComponents();

    fixture = TestBed.createComponent(Counter);

    await fixture.whenStable(); // <-- The template state needs to be initialized manually
  });
});
```

<!-- separator-vertical -->

## Testing - Comp. with no dep. 3/4

- Actual tests

```ts
import { By } from '@angular/platform-browser';

it('should display 0', () => {
  // 👇 Getting element using `nativeElement`
  const button = (fixture.nativeElement as HTMLElement).querySelector('button');

  expect(button?.textContent).toContain(0);
});

it('should increment the count when clicking', async () => {
  // 👇 Getting element using `debugElement`
  const button = fixture.debugElement.query(By.css('button')).nativeElement;

  button?.click();
  expect(fixture.componentInstance.count()).toBe(1); // <-- Class testing (no need to wait)

  await fixture.whenStable();               // <-- Wait for the click event to be reflected in the DOM
  expect(button?.textContent).toContain(1); // <-- DOM testing
});
```

<!-- separator-vertical -->

## Testing - Comp. with no dep. 4/4

- Actual tests (suite)

```ts
it('should call count "update" method when clicking', () => {
  const countUpdateSpy = vi.spyOn(fixture.componentInstance.count, 'update');

  const button = (fixture.nativeElement as HTMLElement).querySelector('button');
  button?.click();

  expect(countUpdateSpy).toHaveBeenCalled();
});
```

<br />

💪 *The rest of the chapter deals with **advanced techniques** for **testing components with dependencies***

<!-- separator-vertical -->

## Testing - Comp. with dep.

- Let's test a more complex **component with dependencies**
- We're going to explore *two different approaches* to test this use case

```ts
import { Component } from '@angular/core';
import { Counter } from '../counter/counter';

@Component({
  selector: 'app-number-parity',
  imports: [Counter],
  template: `
    <app-counter [(count)]="count" />

    <span>{{ count % 2 ? 'is odd' : 'is even' }}</span>
  `,
})
export class NumberParity {
  count = 0;
}
```
<!-- separator-vertical -->

## Testing - Comp. with dep. | First approach 1/2

- Test setup **with implicit dependency import**

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NumberParity } from './number-parity';

describe('NumberParity', () => {
  let component: NumberParity;
  let fixture: ComponentFixture<NumberParity>;

  beforeEach(async () => {
    // 👇 Note: the `Counter` is implicitly imported, as it appears in the `NumberParity` imports!
    await TestBed.configureTestingModule({ imports: [NumberParity] }).compileComponents();

    fixture = TestBed.createComponent(NumberParity);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });
});

```

<!-- separator-vertical -->

## Testing - Comp. with dep. | First approach 2/2

- Actual tests **accessing the dependency instance** (the child component instance)

```ts
it('should bind parent "count" to child component', () => {
  const counter: Counter = fixture.debugElement.query(By.directive(Counter)).componentInstance;

  // 👇 Accessing the child component instance properties
  const counterCount = counter.count();
  expect(counterCount).toBe(component.count);
});

it('should be "odd" when child component emits', async () => {
  const counter: Counter = fixture.debugElement.query(By.directive(Counter)).componentInstance;

  // 👇 Accessing the child component instance methods
  counter.count.set(1);
  await fixture.whenStable();

  const span = (fixture.nativeElement as HTMLElement).querySelector('span');
  expect(span?.textContent).toContain('odd');
});
```

❌ *Overall, this **test** is **quite fragile**, as it relies on the implementation details of the child component*

<!-- separator-vertical -->

## Testing - Comp. with dep. | Second approach 1/2

- Test setup **allowing unknown HTML elements**

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Counter } from '../counter/counter';
// The rest of the imports...

describe('NumberParity', () => {
  let component: NumberParity;
  let fixture: ComponentFixture<NumberParity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NumberParity] })
      .overrideComponent(NumberParity, {
        remove: { imports: [Counter] },
        add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    // The rest of the setup...
  });
});
```

<!-- separator-vertical -->

## Testing - Comp. with dep. | Second approach 2/2

- Actual tests using `debugElement.properties` and `debugElement.triggerEventHandler`

```ts
it('should bind parent "count" to child component', () => {
  const debugElement = fixture.debugElement.query(By.css('app-counter'));

  // 👇 Accessing Angular bindings on the child DOM element
  expect(debugElement.properties['count']).toBe(component.count);
});

it('should be "odd" when child component emits', async () => {
  const debugElement = fixture.debugElement.query(By.css('app-counter'));

  // 👇 Triggering Angular events on the child DOM element
  debugElement.triggerEventHandler('countChange', 1);
  await fixture.whenStable();

  const span = (fixture.nativeElement as HTMLElement).querySelector('span');
  expect(span?.textContent).toContain('odd');
});
```

✅ *Overall, this **test** is **more robust**, because it relies solely on the template of the component being tested*

<!-- separator-vertical -->

## Testing - Summary

**In this chapter on testing, we have covered the following topics**

- Test runner
- Assertion library
- Mocks
- TestBed
- Component testing
- Testing strategies for component with dependencies

<!-- separator-vertical -->

## Testing - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Testing - Lab 4
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

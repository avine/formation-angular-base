# Unit testing

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Getting started with Angular](#/3)
- [Components](#/4)
- **[Unit testing](#/5)**
- [Directives](#/6)
- [Services](#/7)
- [Pipes](#/8)
- [Http](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Testing - Introduction 

For testing an application in general, you need 2 functionalities:

- A *test runner* that identifies and runs the files containing the tests
- An *assertion library* that verifies the expected behavior

Out of the box, Angular uses `Karma` as test runner and `Jasmine` as assertion library.

By default, test files are identified by the pattern: `*.spec.ts`.

<img src="./resources/karma-jasmine.png" height=250>

Notes :
The training focuses on `TestBed` which is the envrionment provided by Angular for testing Angular apps.
We therefore only learn the basics of Jasmine and Karma...



## Testing - Karma

- *Karma* is a tool that automates the execution of tests

<img src="resources/SchemaKarma.png" width="60%" />

Notes :



## Testing - Jasmine 

- Organize your tests using `describe`  and `it` functions
- Follow the 3 steps pattern in each test: `Given`, `When`, `Then`
- Identify the thing being tested using `expect`
- Use matchers to verify the expected behavior: `toBe`, `toBeTruthy`, `toContain`, ...

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



## Testing - Jasmine | Hooks

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



## Testing - Jasmine | Spies

- Use a spy to watch how a method is been used during the test
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



## Testing - Angular environment

- Angular provides a powerful testing environment called `TestBed` 
- Angular testing configuration is reset for every test (executed in `beforeEach`)

```ts
import { TestBed } from '@angular/core/testing';

describe('my feature', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ /* Test setup */ });
  });

  it('should work', () =>  /* ... */ });

  it('should work too', () =>  /* ... */ });
});
```

Notes :



## Testing - Components

- Components combine an HTML template and a TypeScript class
- You should test that they work together as intended
- `TestBed` helps you create the component's host element in the browser DOM
- The `fixture` gives you access to the component instance and its host element 
- In the tests you must `detectChanges` manually verifying that the DOM state is correct

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

TestBed.configureTestingModule({ declarations: [AppComponent] });

let fixture = TestBed.createComponent(AppComponent);

let component = fixture.componentInstance;
let hostElement = fixture.nativeElement;

fixture.detectChanges();
```

Notes :



## Testing - Components | Strategies

Class testing:

- *Pros:* Easy to setup, Easy to write, Most usual way to write unit tests

- *Cons:* Does not make sure your component behave the way it should

DOM testing:

- *Pros:* Make sure your component behave exactly the way it should

- *Cons:* Harder to setup, Harder to write

✅ Overall, DOM testing is more robust, but require more work to setup.

Notes :



## Testing - Example 1

- A simple counter component

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">{{ count }}</button>'
})
export class CounterComponent {
  @Input() count = 0;
  @Output() countChange = new EventEmitter<number>();

  protected increment() {
    this.count += 1;
    this.countChange.emit(this.count);
  }
}
```

Notes :



## Testing - Example 1

- Test setup

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [CounterComponent] });

    fixture = TestBed.createComponent(CounterComponent);

    fixture.detectChanges(); // <-- The template state needs to be initialized manually
  });
});
```

Notes :



## Testing - Example 1

- Actual Tests (1/2)

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
  expect(fixture.componentInstance.count).toBe(1); // <-- Class testing

  fixture.detectChanges(); // <-- The template state update needs to be triggered manually 
  expect(button?.textContent).toContain(1); // <-- DOM testing
});
```

Notes :



## Testing - Example 1

- Actual Tests (2/2)

```ts
it('should emit output with the current count when clicking', () => {
  const emitSpy = spyOn(fixture.componentInstance.countChange, 'emit');

  const button = (fixture.nativeElement as HTMLElement).querySelector('button');
  button?.click();

  expect(emitSpy).toHaveBeenCalledWith(1);
});
```

Notes :



## Testing - Example 2

- Component with dependency
- We're going to explore *two different approaches* to test this use case

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-number-parity',
  template: `
    <app-counter [(count)]="count" />

    <span>{{ count % 2 ? 'is odd' : 'is even' }}</span>
  `,
})
export class NumberParityComponent {
  count = 0;
}
```
Notes :



## Testing - Example 2 | First approach

- (1/2) Test setup *with explicit dependency declaration*

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from '../counter/counter.component';
import { NumberParityComponent } from './number-parity.component';

describe('NumberParityComponent', () => {
  let component: NumberParityComponent;
  let fixture: ComponentFixture<NumberParityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberParityComponent, CounterComponent] // <-- Dependency declared!
    });
    fixture = TestBed.createComponent(NumberParityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
```

Notes :



## Testing - Example 2 | First approach

- (2/2) Actual Tests *accessing the dependency* (the child component instance)

```ts
it('should bind count to the child component', () => {
  const counterComponent: CounterComponent =
    fixture.debugElement.query(By.directive(CounterComponent)).componentInstance;

  // Accessing the child component properties
  expect(counterComponent.count).toBe(component.count);
});

it('should be "odd" when child component emits', () => {
  const counterComponent: CounterComponent =
    fixture.debugElement.query(By.directive(CounterComponent)).componentInstance;

  // Accessing the child component methods
  counterComponent.countChange.emit(1);
  fixture.detectChanges();

  const span = (fixture.nativeElement as HTMLElement).querySelector('span');
  expect(span?.textContent).toContain('odd');
});
```

Notes :



## Testing - Example 2 | Second approach

- (1/2) Test setup *allowing unknown HTML elements*

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from '../counter/counter.component';
import { NumberParityComponent } from './number-parity.component';

describe('NumberParityComponent', () => {
  let component: NumberParityComponent;
  let fixture: ComponentFixture<NumberParityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberParityComponent], // <-- `CounterComponent` not declared...
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // <-- ...but unknown HTML elements are allowed
    });
    fixture = TestBed.createComponent(NumberParityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
```

Notes :



## Testing - Example 2 | Second approach

- (2/2) Actual Tests using:
  - `debugElement.properties` and `debugElement.triggerEventHandler`

```ts
it('should bind count to CounterComponent', () => {
  const debugElement = fixture.debugElement.query(By.css('app-counter'));

  // Accessing bindings on the child element
  expect(debugElement.properties['count']).toBe(component.count);
});

it('should be "odd" when counter emits', () => {
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



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp3" -->

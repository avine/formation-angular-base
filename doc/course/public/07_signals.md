# Signals

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [TypeScript](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)
- **Signals**

</div>
<div class="column-50">

- [Dependency injection](#/9)
- [Pipes](#/10)
- [RxJS](#/11)
- [HTTP client](#/12)
- [Routing](#/13)
- [Forms](#/14)
- [Appendix](#/15)

</div>
</div>

NOTES:
ECMA proposal for signal
https://github.com/tc39/proposal-signals

<!-- separator-vertical -->

## Signals - Definition

- A signal is a **wrapper around a value** that **notifies interested consumers** when that value changes

- Signals **can contain any value**, from primitives to complex data structures

- You **read a signal**'s value by calling its **getter function**, which allows Angular to **track where the signal is used**

- Signals may be either **writable** or **read-only**

😉 *Later, we'll talk about a process called **synchronization** to understand when and why you should **use signals rather than raw values** to manage the state of your application...*

<!-- separator-vertical -->

## Signals - signal

- Use `signal` function to create a writable signal

```ts
import { signal } from '@angular/core';

const count = signal<number>(0);

console.log(count());                 // <-- output: 0

count.set(1);

console.log(count());                 // <-- output: 1

count.update((c) => c + 1);

console.log(count());                 // <-- output: 2
```

<!-- separator-vertical -->

## Signals - computed

- Use the `computed` function to derive a signal from other signals

- Re-evaluated only when the signals on which they depend change

- Computed signals are read-only

```ts
import { signal, computed } from '@angular/core';

const count = signal<number>(0);

const isEven = computed(() => count() % 2 === 0);

console.log(isEven());                // <-- output: true

count.set(1);

console.log(isEven());                // <-- output: false

count.update((c) => c + 1);

console.log(isEven());                // <-- output: true
```

<!-- separator-vertical -->

## Signals - effect

- Use the `effect` function to run "side effect", whenever one or more signal values change

- Re-evaluated only when the signals on which they depend change

- Effect signals run at least once

```ts
import { signal, effect } from '@angular/core';

const count = signal<number>(0);

effect(() => {
  console.log('The current count is: ', count()); // <-- Will output: 0, 1, 2
});

count.set(1);

count.update((c) => c + 1);
```

😉 *Another signal is the `linkedSignal`, but it is beyond the scope of this course*

<!-- separator-vertical -->

## Signals - Usage in components

- When a signal changes, Angular will automatically re-render the templates that depend on it

- This process is highly efficient, whether the signal is modified in the component itself or in another part of the application

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter-delay',
  template: `<button (click)="increment()">{{ count() }}</button>`,
})
export class CounterDelay {
  count = signal(0);

  increment() {
    // Angular will correctly synchronize the UI with the updated signal value,
    // even if the signal mutation occurs asynchronously!
    setTimeout(() => this.count.update((count) => count + 1), 1000);
  }
}
```

<!-- separator-vertical -->

## Signals - Component input and model 1/2

- Note that `input` and `model` functions (mentioned in the chapter on components) **are in fact signals**

- Using signals for parent/child communication, makes this communication highly reactive and efficient

```ts
import { Component, model, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `<button (click)="increment()">{{ count() }}</button>`,
})
export class Counter {
  count = model(0);

  protected increment() {
    this.count.update((count) => count + 1);
  }
}

// ...
```

<!-- separator-vertical -->

## Signals - Component input and model 2/2

```ts
// ...

@Component({
  selector: 'app-root',
  imports: [Counter],
  template: `
    <app-counter [(count)]="appCount" />

    <p>{{ appCount() }}</p>
  `,
})
export class App {
  protected appCount = signal(0);
}
```

<!-- separator-vertical -->

## Signals - Testing 1/3

- Angular provides powerful tooling for testing signal-based components

Let's revisit the `Counter` component...

```ts
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `<button (click)="increment()">{{ count() }}</button>`,
})
export class Counter {
  count = model(0);

  protected increment() {
    this.count.update((count) => count + 1);
  }
}
```

<!-- separator-vertical -->

## Signals - Testing 2/3

- Use `inputBinding`, `outputBinding` and `twoWayBinding` functions in the test component `bindings` options

```ts
import { inputBinding, outputBinding, signal, twoWayBinding } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter', () => {
  beforeEach(async () => await TestBed.configureTestingModule({ imports: [Counter] }).compileComponents());

  it('should works', () => {
    const count = signal(1);                        // <-- Define "input"
    const countChange = jasmine.createSpy();        // <-- Define "output"

    const fixture = TestBed.createComponent(Counter, {
      bindings: [
        inputBinding('count', count),               // <-- Bind "input"
        outputBinding('countChange', countChange),  // <-- Bind "output"
        // twoWayBinding('count', count)            // <-- Alternative (to handle both input and output)
      ],
    });

    // ...
```

<!-- separator-vertical -->

## Signals - Testing 3/3

```ts
    // ...

    const component = fixture.componentInstance;

    fixture.detectChanges();
    expect(component.count()).toBe(1);

    count.set(2);                                   // <-- Interact with "input" bindings
    fixture.detectChanges();
    expect(component.count()).toBe(2);

    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    fixture.detectChanges();
    expect(component.count()).toBe(3);
    expect(countChange).toHaveBeenCalledWith(3);    // <-- Interact with "output" bindings
  });
});
```

<!-- separator-vertical -->

## Signals - Synchronization process

- The goal of synchronization is to keep the **UI** in sync with the **state** of the application

- **signals** play a crucial role in enabling Angular to know exactly when and which parts of the UI need to be synchronized

- As a rule of thumb, if the part of the **state to be rendered in your templates** only **changes through signals** then your UI should always be in sync with the state of your application

_⚠️​ Note that with signals Angular has entered a new era._
_Previously, the synchronization process was achieved using a third-party library called **Zone.js**._

- _This was a very complex process, formerly called **Change detection**_

- _In a nutshell, Zone.js was responsible for telling Angular when to trigger its change detection process and update the UI to reflect the state of the application_

- _So today, Angular no longer relies on Zone.js, and that's why we've entered the era of **Zoneless applications**_

<!-- separator-vertical -->

## Signals - Summary

**In this chapter on signals, we have covered the following topics**

<div class="columns">
<div class="column-50">

- Signal
- Computed signal
- Effect
- Usage in components

</div>
<div class="column-50">

- Component input and model
- Synchronization process

</div>
</div>

<!-- separator-vertical -->

## Signals - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Signals - Lab 7
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

# RxJS <br /><i style="font-size: 0.65em; font-weight:normal">(prerequisites)</i>

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
- [Signals](#/8)

</div>
<div class="column-50">

- [Dependency injection](#/9)
- [Pipes](#/10)
- **RxJS**
- [HTTP client](#/12)
- [Routing](#/13)
- [Forms](#/14)
- [More on Components](#/15)

</div>
</div>

<!-- separator-vertical -->

## RxJS

💡 *This chapter covers the **RxJS** prerequisites needed to confidently follow the next chapter on **HTTP client***

- RxJS refers to a __paradigm__ called ReactiveX (http://reactivex.io/)
  - an API for asynchronous programming with observable streams
  - implemented in all major programming languages: *RxJava, Rx.NET, ...*

- Let's focus on the JavaScript implementation: *RxJS*


<!-- separator-vertical -->

## RxJS - In a nutshell

- **Observables**
  - represent a **stream** of data that can be **subscribed to**
  - allowing multiple **values** to be **emitted** over time

<!-- separator-vertical -->

## RxJS - Building blocks

- To understand RxJS, you need to learn the following concepts
  - `Observable` and `Observer`
  - `Subscription`
  - `Operators`

<!-- separator-vertical -->

## RxJS - Observable & Observer 1/2

```ts
import { Observable, Observer } from 'rxjs';

const data$ = new Observable<number>((subscriber) => {
  subscriber.next(1);                             // <-- Emit next value
  subscriber.next(2);                             // <-- Emit next value
  subscriber.complete();                          // <-- Mark as complete...
  // subscriber.error('Oops!');                   // <-- ...or mark as in error
});

const observer: Partial<Observer<number>> = {
  next: (data: number) => console.log(data),      // <-- Listen to "next" events
  complete: () => console.log('Done'),            // <-- Listen to "complete" event
  error: (err: unknown) => console.error(err),    // <-- Listen to "error" event
};

data$.subscribe(observer);                        // output: 1, 2, Done
```

- The `subscriber` shapes the behavior of the observable

- The `observer` specifies which events you want to listen to

- Subscriber and observer method names match: `next`, `complete` (and also `error`)

NOTES:
- By convention, a variable representing an observable ends with the symbol `$`
- The `.subscribe()` method activates the observable to emit its data stream

<!-- separator-vertical -->

## RxJS - Observable & Observer 2/2

- Use a function as observer to simply listen to `next` events

```ts
data$.subscribe({
  next: (data: number) => console.log(data),            // <-- Object property as "next" observer
});

data$.subscribe((data: number) => console.log(data));   // <-- Function as "next" observer
```

<!-- separator-vertical -->

## RxJS - Subscription

- A Subscription is what starts an Observable, keeps it running, and gives you a way to stop it

```ts
import { Observable, Subscription } from 'rxjs';
 
const data$ = new Observable<number>((subscriber) => {
  let data = 0;
 
  const interval = setInterval(() => {
    subscriber.next(++data);            // <-- Emit next value every second ad infinitum
    console.log('tick');
  }, 1000);
 
  return () => clearInterval(interval); // <-- Return the resource cleanup function
});
 
const subscription: Subscription = data$.subscribe((data: number) => {
  console.log(data);
  if (data === 3) {
    subscription.unsubscribe();         // <-- Unsubscribe from data$ and execute
                                        //     the resource cleanup function
  }
}); // output: 1, tick, 2, tick, 3, tick
```

<!-- separator-vertical -->

## RxJS - Operators 1/2

- Operators such as `filter` and `map` are functions that let you filter, transform, and control the Observable

```ts
import { Observable, filter, map } from 'rxjs';
 
const data$ = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
});
 
data$.pipe(/* no operator */).subscribe(console.log);                 // output: 1, 2
 
data$.pipe(filter((data) => data % 2 === 0)).subscribe(console.log);  // output: 2
 
data$.pipe(map((data) => data * 10)).subscribe(console.log);          // output: 10, 20
 
data$.pipe(
  filter((data) => data % 2 === 0),
  map((data) => data * 10)
).subscribe(console.log);                                             // output: 20

```

<!-- separator-vertical -->

## RxJS - Operators 2/2

- The `tap` operator lets you "peek" into an Observable without changing the data (used for side effects only)

```ts
import { Observable, tap, map } from 'rxjs';
 
const data$ = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
});
 
let evenValuesCount = 0;                                              // <-- Defined out of the stream
 
data$.pipe(
  tap((data) => {
    if (data % 2 === 0) evenValuesCount += 1;                         // <-- Handle side effect
    return 'ignored value';                                           // <-- Return value is ignored
  }),
  map((data) => data * 10)
).subscribe(console.log);                                             // output: 10, 20
```

😉 *Note: `filter`, `map`, and `tap` are **synchronous** operators.*<br />
*There are also **asynchronous** operators, but this is beyond the scope of this course.*

<!-- separator-vertical -->

## RxJS - Summary

- By convention, a variable representing an observable ends with the symbol `$`

- The **Observable** implementation is a function that uses the **Subscriber** methods to emit the stream events
  - `.next()`, `.complete()` and `.error()`

- The `.subscribe()` method activates the observable to emit its data stream
  - It accepts an **object** (`Partial<Observer>`) or a **function** as observer to listen to the stream events
  - It returns a `Subscription` allowing the consumer to `.unsubscribe()` from the activated observable

- **Unsubscription** is necessary to **avoid memory leaks** when the consumer is no longer interested in the data
  - Unless the observable is already in `"complete"` or `"error"` state

- The `Operators` allow to transform the emitted values and make the observables very powerful 🚀

<!-- separator-vertical -->

## RxJS - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

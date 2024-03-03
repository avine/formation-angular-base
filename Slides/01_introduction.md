# Introduction

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- **[Introduction](#/1)**
- [Reminders](#/2)
- [Getting started with Angular](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Directives](#/6)
- [Services](#/7)
- [Pipes](#/8)
- [Http](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Angular - History

- Framework created by *Google* and announced in 2014
- Total rewrite of *AngularJS*, although some concepts remain
- First release of *Angular 2* in September 2016
- Last major version `17` released in November 2023
- Component oriented framework
- Documentation: http://angular.io/ and http://angular.dev/

<img src="resources/angular-logo.png" height="200">

Notes :



## Angular - Versions 1/2

- Major release every 6 months

| Version | Date    | Description                                                                                                 |
| ------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| 2.0.0   | 2016/09 | Final version                                                                                               |
| 4.0.0   | 2017/03 | New template compilation engine, Modularization of the animation system, Universal project, TypeScript 2.1+ |
| 5.0.0   | 2017/11 | Improvement of the build (AOT), HttpClient, TypeScript 2.3                                                  |
| 6.0.0   | 2018/05 | CLI Integration, Angular Element, New experimental Ivy renderer                                             |
| 7.0.0   | 2018/10 | CLI Prompts, Virtual Scroll, Drag and Drop, Angular Element                                                 |
| 8.0.0   | 2019/05 | Differential Loading, Dynamic Import, Builders API, Ivy, Bazel                                              |
| 9.0.0   | 2020/02 | Ivy by default, ProvidedIn scope                                                                            |

Notes :



## Angular - Versions 2/2

| Version | Date    | Description                                                                                                        |
| ------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| 10.0.0  | 2020/06 | Optional Stricter Settings, New Default Browser Configuration, TypeScript 3.9                                      |
| 11.0.0  | 2020/11 | TypeScript 4.0, Remove deprecated support for IE 9, 10, and IE mobile                                              |
| 12.0.0  | 2021/05 | Stylish improvements, nullish coalescing, Webpack 5 support, TypeScript 4.2                                        |
| 13.0.0  | 2021/11 | Ivy only remove Old View Engine, Cli Cache, RxJS v7, TypeScript 4.4                                                |
| 14.0.0  | 2022/06 | Strictly Typed Reactive Forms, Standalone Components with Optional NgModule                                        |
| 15.0.0  | 2022/12 | Standalone API stable, Directive Composition API, Image Directive, Functional Router Guards                        |
| 16.0.0  | 2023/05 | Angular Signals, Bind router Information to Component Inputs, Required Component Inputs, Non-Destructive Hydration |
| 17.0.0  | 2023/11 | New website, Built-in control flow, Deferrable views, New lifecycle hooks, Vite and esbuild                        |

Notes :



## Angular - Pros

👍 Maintained by Google

👍 Component-based architecture

👍 Use plain HTML templates

👍 Two-way data binding

👍 Efficient testing

👍 Easy upgrade to new versions

👍 Powerful CLI

Notes :



## Angular - Cons

👎 Steep learning curve

👎 Requires new concepts to learn (`Observable`, ...)

Notes :
- New concepts are essential to know (especially Observables).



## Angular - Framework

- Angular, unlike Vue or React, is a complete Framework

![Angular as a platform](resources/platform.png)

Notes :



## Angular - Architecture 1/2

![Angular architecture](resources/angular-architecture.png)

Notes :



## Angular - Architecture 2/2

- Main part
  - `Component`: TypeScript class that describes the component behavior
  - `Template`: HTML code that describes the end-user view
  - `Metadata`: Links the template and the component

- Other parts
  - `Directive`: Additional behavior that can be used in the component's template (`ngFor`, `ngIf`, ...)
  - `Pipe`: Transform strings, currency amounts, dates, and other data for display
  - `Service`: Business code implemented in classes that can be injected into the components, directives, other services, ...
  - `Injector`: Angular dependency injection system
  - `Module`: Grouping a set of features

Notes :
- The definitions of this slides are related to the previous slide chart



## Angular - Component example

<div>

```ts
import { Component, Input, Output } from '@angular/core';

// Usage: <app-likes [numberOfLikes]="3" [like]="false" (likeChange)="likeChanged($event)" />
@Component({
  selector: 'app-likes',
  template: `
    <button (click)="toggleLike()">
      {{ numberOfLikes + (like ? 1 : 0) }}
      <i class="icon" [class.liked]="like"> ❤ </i>
    </button>
  `,
})
export class LikesComponent {
  @Input() public numberOfLikes = 0;
  @Input() public like = false;
  @Output() public likeChange = new EventEmitter<boolean>();

  protected toggleLike() {
    this.like = !this.like;
    this.likeChange.emit(this.like);
  }
}
```

<div>

Notes :
Describe this slide in a few words (everything will be detailed during the training).



## Vanilla JS - Component example

- Open the file `Exercises/resources/likes-component-vanilla-js/index.html` in Chrome
- Understand the basics of:
  - *DOM creation*
  - *DOM manipulation*
  - *Event handling*
- Don't be afraid, it's not that hard! 😱
- Appreciate the abstraction layer provided by the Angular framework 😍

Notes :



<!-- .slide: class="page-questions" -->

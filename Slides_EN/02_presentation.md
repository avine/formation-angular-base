# Presentation

<!-- .slide: class="page-title" -->

Notes:



## Summary

<!-- .slide: class="toc" -->

- [Reminders](#/1)
- ** [Presentation](#/2) **
- [Start an Angular application](#/3)
- [Tests](#/4)
- [Template & Components](#/5)
- [Guidelines](#/6)
- [Dependency Injection](#/7)
- [Pipes](#/8)
- [HTTP Service](#/9)
- [Router](#/10)
- [Forms](#/11)
- [Server-side Rendering](#/12)

Notes:



## Presentation

- Framework created by * Google * and announced in 2014
- Total rewriting of the framework
- Resume certain concepts of * AngularJS *
- First version * beta * announced in October 2014
- Version * final * `2.0.0` official release in September 2016
- Latest major release `6.0.0` released in May 2018
- Component Oriented programming
- Framework designed to be more efficient and optimized for mobile
- http://angular.io/

Notes:



## Presentation - Numbering

- Numbering from 2.0.0 to stand out from AngularJS
- Respect from there of the * semver * standard
- Major versions will no longer be rewrites like 1 to 2
- Skipping version 3.0.0 after the project merge * Router * already in 3.x
- Planning a major release every 6 months in the future



## Versions

| Version | Date | Description |
| : ------ | : ------: | : ------------------------------------------------- ----------------- |
| 2.0.0 | Sep 2016 | Final version |
| 4.0.0 | Mar 2017 | New template compilation engine, Modularization of the animation system, Integration of the Universal project, Switch to TypeScript 2.1+ |
| 5.0.0 | Nov 2017 | Improvement of the build (AOT), HttpClient, TypeScript 2.3 |
| 6.0.0 | May 2018 | CLI Integration, Angular Element, New experimental Ivy renderer |
| 7.0.0 | Oct 2018 | CLI Prompts, Virtual Scroll, Drag and Drop, Angular Element |
| 8.0.0 | Mar 2019 | ? (Integration of Ivy) |



## AngularJS negative points

- Differences between directives and `ngController`
- Two-way data-binding causes performance problems
- Hierarchy of scopes
- No server-side rendering
- Several syntaxes to create services
- API directives too complex
- poorly designed API requiring the use of fix (`ngModelOptions`)

Notes:



## AngularJS negative points - directive

- API directives too complex

```Javascript
app.directive ('MyDirective', function () {
    return {
       restrict: 'AE',
       require: '? ^^ ngModel',
       scope: {variable: '@'},
       controller: function (...) {},
       link: function (...) {...}
    }
});
```

- * Angular * version:

```Typescript
import {Component, Input} from '@angular/core'
@Component ({
  selector: 'my-directive'
})
export class MyDirective {
  @Input () variable: string;
}
```

Notes:



## AngularJS Negative Points - Service

- API to create * AngularJS * services

```Javascript
// provider, factory, constant and value
app.service ('UserService', function () {
  const vm = this;
  vm.getUsers = function () {

  }
});
```

- Angular version

```Typescript
@Injectable()
export class UserService {
  getUsers (): User [] {
    return [];
  }
}
```
Notes:



## Angular - Positive Points

- Modular application creation
- Usable with several programming languages: `TypeScript` and` Dart` (separate project: https://webdev.dartlang.org/)
- API simpler than * AngularJS *
- Only three types of elements will be used: `directive`,` pipe` and `services`
- Based on standards: `Web Components`,` ES2015 + `,` Decorator`
- New syntax used in templates
- Change Detection` API Performance
- The `Universal` Project (server-side rendering)
- Library to start the migration: `ngUpgrade`
- Collaboration with Microsoft and Ember

Notes:
- ES2015 and more ES6 because now there should be a specification every year.
- The next iterations will have less content



## Angular - Negative Points

- New learning phase of the framework if used to AngularJS
- AngularJS applications incompatible with this new version
- ngUpgrade allows to reuse AngularJS code but not to migrate
- New concepts to learn:
  - `Zone`
  - `Observable`
  - ...

Notes:
- use of directives 1 in 2: https://angular.io/guide/upgrade#using-angularjs-component-directives-from-angular-code
- New concepts are not essential to know. It's a plus



## Angular = A Platform

- Angular is not just a simple framework
- Mobile Integration
- Tools to facilitate the development phase

![platform](resources/platform.png "platform")

Notes:



## Architecture

![architecture](resources/overview2.png "architecture")

Notes:



## Architecture

- Metadata: Configuration to describe the functioning of a component
- Component: TypeScript class that describes its behavior
- Template: HTML code rendering using the component
- Modules: grouping a set of features
- Injector: Angular dependency injection system
- Directive: component without template (* ngFor *, * ngIf *, ...)
- Service: Business code implemented in classes that will be injected into the different components

Notes:
- The definitions of this slides are related to the previous slide chart



## Architecture - Complete example

- Complete example using the different bricks of an Angular application

```Typescript
import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component ({
    selector: 'my-app',
    template: '{{value | uppercase}} '
})
export class MyComponent {
  value: string;
  constructor (http: http) {
  }
}
```

Notes:



<!-- .slide: class="page-questions" -->

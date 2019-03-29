# Support for EcmaScript 5

<!-- .slide: class="page-title" -->

Notes:



## Summary

<!-- .slide: class="toc" -->

- [Reminders](#/1)
- [Presentation](#/2)
- [Start an Angular application](#/3)
- [Tests](#/4)
- [Template & Components](#/5)
- [The guidelines](#/6)
- [Dependency Injection](#/7)
- [The Pipes](#/8)
- [HTTP Service](#/9)
- [Router](#/10)
- [Forms Management](#/11)
- [Server-side Rendering](#/12)

Notes:



## Angular in EcmaScript 5

- Ability to develop an application * Angular * in * EcmaScript 5 *
- Syntax a bit more verbose than * TypeScript *
- Unable to use what's new in * EcmaScript 2015 * and * TypeScript *
- Replacing annotations with calls to the `ng` object
- No need for a module management library

```HTML

<script src = "https://code.angularjs.org/2.0.0-beta.0/angular2-all.umd.dev.js"> </ script>

```

Notes:



## Angular in EcmaScript 5

- Initialization of the application via the `bootstrap` method of the` @ angular/platform-browser-dynamic` module
- Listening to the `DOMContentLoaded` event
- Signature of the `bootstrap` method identical to that used in * TypeScript *

```Javascript
<script>
  document.addEventListener ('DOMContentLoaded', function () {
    ng.platform.browser.bootstrap (AppComponent);
  });
</ script>
```

Notes:



## Angular to ES5 - Components

- Creating a component via a constructor function
- Defining annotations via the `annotations` property
- Using the `ng.core.Component` constructor to use the` Component` decorator of the `@ angular/core` module

```Javascript
var AppComponent = function () {};

AppComponent.annotations = [
  new ng.core.Component ({
    selector: 'app',
    template: '<h1> Hello Angular! </ h1>'
  })
];
```

Notes:



## Angular to ES5 - Components

- API ** fluid ** provided by the framework
- Chaining the different annotations
- Similar reading with * TypeScript * application

```Javascript
var AppComponent = ng.core
.Component ({
  selector: 'app',
  template: '<h1> {{getName ()}} </ h1>'
})
.Class ({
  constructor: function () {},
  getName: function () {}
});
```

Notes:



## Angular to ES5

- Similar syntax for `services` and` pipes`
- All framework components are available via the `` ng`space
  - `@ Directive` -->` ng.core.Directive`
  - `Http` -->` ng.http.Http`
  - `FORM_DIRECTIVES` -->` ng.common.FORM_DIRECTIVES`
  - `Injectable` -->` ng.core.Injectable`

- Dependency Injection performed via an array of objects in the `constructor` method
  - similar to * AngularJS *

Notes:



## Angular in ES5 - Complete example

- Complete example of a component * Angular * in * EcmaScript 5 *

```Javascript
var Service = ng.core.
  Injectable().
  Class ({
    constructor: [ng.http.Http, function (http) {this.http = http; }],
    getFoo: function () {}
  });

var AppComponent = ng.core.
  Component ({
    selector: 'app',
    template: '<h1> {{getName ()}} </ h1>',
    directives: [ng.common.FORM_DIRECTIVES]
  }).
  Class ({
    constructor: [Service, ng.core.Attribute ('name'), function (Service, name) {
       this.Service = Service;
       this.name = name;
    }],
    getName: function () {}
  });
```

Notes:



<!-- .slide: class="page-questions" -->

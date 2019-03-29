# Good Practices for a Happy Migration

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



## General Good Practices

- Good Practices from John Papa's * guideline *
    - https://github.com/johnpapa/angular-styleguide
- Allows to get closer to the structure of an application * Angular *
- Easy to set up, and without risk (if unit tests exist)
- Possibility of automating the verification thanks to the plugin * eslint-plugin-angular *
    - https://github.com/Gillespie59/eslint-plugin-angular/

Notes:



## File structure

- 1 component per file
- 1 style sheet per directive
- Structure of specific directories
    - grouping by recommended functionality
    - grouping by component type

```Shell
- app /
    - directives /
        - navbar /
            - navbar.directive.js
    - controllers /
```

```Shell
- app /
    - common /
        - directives /
            - navbar /
                - navbar.directive.js
    - home page/
        - homepage.controller.js
```

Notes:



## Creation of services

- Using the `service` method for non-configurable services

```Javascript
// KO
module.factory ('Service', function () {
  return {
      method: function () {...}
  };
})

//OKAY
module.service ('Service', function () {
    this.method = function () {
        ...
    }
});
```

Notes:



## Injection of Dependencies

- Using the basic syntax for dependency injection
- Running the plugin * ngAnnotate * before going into production

```Javascript
// KO
module.service ('Service', ['$ http', function ($ http) {
    this.method = function () {
        ...
    }
}]);

//OKAY
module.service ('Service', function ($ http) {
    this.method = function () {
        ...
    }
});
```

Notes:



## Using named functions

- Each component must be defined via a named function
- No longer use anonymous functions
- Also allows to have explicit error messages

```Javascript
// KO
module.service ('Service', function () {
    this.method = function () {
        ...
    }
});

//OKAY
module.service ('Service', Service);
function Service () {
    this.method = function () {
        ...
    }
}
```

Notes:



## ECMAScript 2015

- Ability to use the new specification `JavaScript`
- Obligation to add a phase of transpiration
    - * Babel *, * Tracer *, ...
- Provides new syntax for writing better applications

```Javascript
export class Ctrl {

    constructor () {...}

    selectBeer () {...}
}
```

```Javascript
import {Ctrl} from './Ctrl';

angular
    .module ('app', [])
    .controller ('Ctrl', Ctrl);
```

Notes:



## The components

- Functionality available since * Angular 1.5 *
- Utility method to simplify component creation
- Allows you to use the Angular style for creating your components
- Remove the redundant code: `scope`,` controllerAs` and `bindToController`

```Js
// before
module.directive (name, fn);

// after
module.component (name, options);
```

Notes:



## The components

```Javascript
component: function (name, options) {
  function factory ($ injector) {
    function makeInjectable (fn) {
      if (angular.isFunction (fn)) {} else {}
    }

    var template = (! options.template &&! options.templateUrl? '': options.template);
    return {
      controller: options.controller || function () {},
      controllerAs: identifierForController (options.controller) || options.controllerAs || name,
      template: makeInjectable (template),
      templateUrl: makeInjectable (options.templateUrl),
      transclude: options.transclude === undefined? true: options.transclude,
      scope: options.isolate === false? true: {},
      bindToController: options.bindings || {}
      restrict: options.restrict || 'E'
    };
  }

  return moduleInstance.directive (name, factory);
}
```

Notes:



## Components - bindings

- Good practice of defining an isolated scope for a component
- Obligation to define at least one `scope` property for each component
- If need to access the `scope` in the controller, need to configure the` bindToController` property
- With the `component` method, use a new` bindings` property

```Javascript
// before
module.directive ('counter', function counter () {
  return {
    scope: {},
    bindToController: {count: '='}
  };
});

// after
module.component ('counter', {
  bindings: {count: '='}
});
```

Notes:



## Components - configuration

- Ability to disable the isolated scope
- Using the `isolate` property

```Javascript
module.component ('counter', {
  isolate: false
});
```

Notes:

- Behaves like scope: true



## The components - controller

- Ability to set the `controllerAs` property directly in the` controller` property

```Javascript
module
    .component ('counter', {
        controller: 'counterCtrl as c'
    })
    .controller ('counterCtrl', function () {});
```

- Code of the `component` method:
```Javascript
controller: options.controller || function () {},
controllerAs: identifierForController (options.controller) || options.controllerAs || name,
```

Notes:



## Components - templates

- The `template` property can take as parameter a function
- This function must return a string representing the template to use
- Access to the element and attributes via the function parameters

```Javascript
module
    .component ('counter', {
        template: function ($ element, $ attrs) {
            return '<div> </ div>';
        }
    })
```

Notes:



## The new Router

- Router created for Angular
- Version no longer using configuration methods
- No need to configure routes in `config` method

- Each road will have two parts:
- `path`: the URL
- `component`: combination of a template and a controller

- By convention the template and the controller must be named in the same way

Notes:



## Configuration

- Configuration made via the `$ router` service
- Routes defined anywhere in the application
- code to be executed when the page is loaded

```Javascript
angular.module ('demoModule', ['ngNewRouter'])
  .controller ('RouteController', function ($ router) {
    $ Router.config ([
      {path: '/', redirectTo: '/ bar'},
      {path: '/ bar', component: 'bar'},
      {path: '/ foo /: name', component: 'foo'}
    ]);

  });
```

Notes:



## Configuration

- Specific file structure needs to be put in place

```
project
--- components
    --- bar
--- bar.html
--- foo
--- foo.html
```

- Routes configured to use the `controllerAs` syntax
- The name of the controller must be the concatenation of the component name suffixed by `Controller`
- The alias to use in the templates will be the name of the component.

```Javascript
angular.module ( 'simpleRouterDemo')
  .controller ('FooController', function () {
    this.property = '';
  })
  .controller ('BarController', function ($ routeParams) {...});
```

Notes:

- The indentation of the project structure must not change to remain correct in the web rendering



## ngViewport and ngLink directives

- Replace the `ngHref` and` ngView` directives

```HTML
<Nav>
  <ul class="nav">
    <Li>
      <a ng-link="bar"> Bar </a>
    </ Li>
    <Li>
      <a ng-link="foo({ name:'test' })"> Foo </a>
    </ Li>
  </ Ul>
</ Nav>
<Main>
  <Ng-viewport> </ ng-viewport>
</ Main>
```

Notes:



## Siblings ngViewPort

- Ability to define multiple directives to ngViewPort`

```Javascript
$ router.config ([{
path: '/ user'
components: {
foo: 'userList',
bar: 'user'
}
}]);
```

```HTML
<div ng-viewport = "foo"> </ div>
<div ng-viewport = "bar"> </ div>
```

Notes:



## Component life cycle

- Lifecycle identical to that of Angular
- Methods to implement in controllers:
- `canReactivate`,` canActivate` or `canDeactivate`

```Javascript
this.canActivate = function () {
  if (! userService.hasAccess ()) {
    ...
  }
  return hasAccess;
};
```

Notes:

- canActivate --> $ resolve of ui-router



<!-- .slide: class="page-questions" -->

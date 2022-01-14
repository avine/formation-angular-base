# Start an Angular application

<!-- .slide: class="page-title" -->

Notes :



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- **[Start an Angular application](#/3)**
- [Tests](#/4)
- [Template & Components](#/5)
- [Directives](#/6)
- [Dependency Injection](#/7)
- [Pipes](#/8)
- [HTTP Service](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Start a new project

- Dependency management via *npm*
  - the different modules *Angular*: `@angular/common`, `@angular/core` ...
  - Webpack: module management
  - RxJS: reactive programming, strong dependence of Angular

```Shell
npm init

npm install @angular/common @angular/core rxjs ...
```

- Initializing and Configuring a Project *TypeScript*
- Configuration of the module management system (*Webpack*)

Notes :



## Start a new project

- Creating the main component
  - define the selector needed to use the component
  - write the template
  - implement the class *TypeScript*

```typescript
import {Component} from '@angular/core'

@Component ({
    selector: 'my-app',
    template: `<p> Hello </p>`
})
export class AppComponent {...}

```

Notes :



## Start a new project

- Creating an Angular module

```typescript
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

@NgModule ({
  declarations: [
    AppComponent,
  ]
  imports: [
    FormsModule
  ]
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule).

```

Notes :



## Angular CLI

- Since version 6 of angular, angular CLI now follows the angular versions.
- Based on the project *Ember CLI*
- Allows you to create the skeleton of an application
- Automatically embeds the following technologies:
  - TypeScript, Webpack, Karma, Protractor, CSS preprocessors ...
- Project available on *npm*

```Shell
npm install -g @angular/cli
```

- Offers commands for the application lifecycle

```Shell
ng new Application
ng build (--dev/--prod)
ng serve
```

Notes :



## Angular CLI

- Many orders available
  - `ng generate`: Generates code for different elements of Angular
  - `ng generate component Product`:

- Generate a new component with template, style and test
  - `ng generate pipe UpperCase`: Generates a new pipe
  - `ng generate service User`: Generates a new service
  - `ng generate directive myNgIf`: Generates a new directive

  - `ng test`: Run tests with Karma
  - `ng e2e`: Run end-2-end tests with Protractor
  - `ng lint`: Run TSLint

Notes :



## Webpack

- Module Manager
- Supports the different module systems (*CommonJS*, *AMD*, *ES2015*, ...)
- Available on *npm*: `npm install -g webpack`
- Build a graph of all the dependencies of your application
- Configuration via a configuration file *JavaScript* (`webpack.config.js`)
  - loaders: *ES2015*, *TypeScript*, *CSS*, ...
  - preloaders: *JSHint*, ...
  - plugins: *Uglify*, ...

Notes :



## Webpack - First example

- First use of *Webpack*

```typescript
//app.js
document.write('welcome to my app');
console.log('app loaded');
```

- Running *Webpack* to generate a `bundle.js` file

```Shell
webpack ./app.js bundle.js
```

- Import your `bundle.js` file into your `index.html`

```html
<html>
  <body>
    <script src = "bundle.js"> </ script>
  </body>
</html>
```

- The addition of the script tag can also be realized with a plugin

Notes :



## Webpack

- Version with a configuration file

```typescript
// ./webpack.config.js
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  }
}
```

- Webpack will read the configuration file automatically

```Shell
webpack
```

Notes :



## Webpack - Configuration

- Ability to generate multiple files
- Using the placeholder `[name]`

```typescript
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
}
output: {
  filename: '[name].js'
}
```

- Allows to use a `vendor.ts` file importing all used libraries

```typescript
// Angular
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
// RxJS
import 'rxjs';
```

Notes :




## Webpack - Configuration

- High performance automatic recompilation system
  - Using the `webpack --watch` option
  - Webpack keeps the graph of the modules in memory
  - Regenerates the `bundle` for any change on any of the files
- Web server available `webpack-dev-server`
  - *Hot Reloading*
  - *Watch* mode enabled
  - Generation of the `bundle.js` file in memory

Notes :



### Webpack - Loaders

- Allows Webpack to indicate how to take into account a file
- Several *loaders* exist: *ECMAScript2015*, *TypeScript*, *CoffeeScript*, *Style*, ...

```typescript
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
}
resolve: {
  extensions: ['', '.js', '.ts']
}
module: {
  loaders: [{
      test: /\.ts$/,
      loaders: ['ts']
  }]
}
output: {
  filename: '[name].js'
}
```

Notes :



### Webpack - Plugins

- Add features to your build workflow

```typescript
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
}
resolve: {
  extensions: ['', '.js', '.ts']
}
module: {
  loaders: [{
      test: /\.ts$/,
      loaders: ['ts']
  }]
}
plugins: [
  new webpack.optimize.MinChunkSizePlugin ({
    minChunkSize: 10000
  }),
  new HtmlWebpackPlugin ({template: 'src/index.html'})
]
output: {
  filename: '[name].js'
}
```

Notes :



<!-- .slide: class="page-tp1" -->

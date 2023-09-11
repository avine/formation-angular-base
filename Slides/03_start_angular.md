# Getting started with Angular

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- **[Getting started with Angular](#/3)**
- [Components](#/4)
- [Unit testing](#/5)
- [Directives](#/6)
- [Services](#/7)
- [Pipes](#/8)
- [Http](#/9)
- [Router](#/10)
- [Forms](#/11)

Notes :



## Hands on!

For this section, let's start with *Lab 1*, then return to the slides.

You are about to:
- Setting up your environment
- Creating and running your Angular application
- Taking control of your application

Notes :



<!-- .slide: class="page-tp1" -->



## File structure

Back to slides, let's see how the application folder is structured:

- package.json
- tsconfig.json
- angular.json
- src/app/*

This section will give you the big picture of how Angular works!

Notes :



## File structure - package.json

The presence of the `package.json` file makes this folder an NPM package powered by the Node.js runtime.

- Scripts can be run using the shell command `npm run <scriptName>`

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  }
}
```

Notes :



## File structure - package.json

- Dependencies of the Angular framework are scoped under `@angular/*`

```json
{
  "dependencies": {
    "@angular/animations": "...",
    "@angular/common": "...",
    "@angular/compiler": "...",
    "@angular/core": "...",
    "@angular/forms": "...",
    "@angular/platform-browser": "...",
    "@angular/platform-browser-dynamic": "...",
    "@angular/router": "..."
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "...",
    "@angular/cli": "...",
    "@angular/compiler-cli": "..."
  }
}
```

Notes :



## File structure - package.json

- Angular also depends on some third-party libraries

```json
{
  "dependencies": {
    "rxjs": "...",
    "tslib": "...",
    "zone.js": "..."
  },
  "devDependencies": {
    "@types/jasmine": "...",
    "jasmine-core": "...",

    "karma": "...",
    "karma-chrome-launcher": "...",
    "karma-coverage": "...",
    "karma-jasmine": "...",
    "karma-jasmine-html-reporter": "...",

    "typescript": "..."
  }
}
```

Notes :



## File structure - tsconfig.json

- TypeScript is a primary language for Angular application development

- Browsers can't execute TypeScript directly

- Typescript must be "transpiled" into JavaScript using the `tsc` compiler

- The compiler requires some configuration described in the `tsconfig.json` file

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    ...
  },
  "angularCompilerOptions": {
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    ...
  }
}
```

Notes :



## File structure - angular.json

- Provides workspace-wide and project-specific configuration defaults
- These are used for build and development tools provided by the *Angular CLI*

```json
{
  "projects": {
    "zenika-ng-website": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {
        "build": {},
        "serve": {},
        "test": {},
        ...
      }
    }
    ...
  }
}
```

Notes :



## File structure - angular.json

- The build `"options"` in the architect section are frequently used

```json
{
  "projects": {
    "zenika-ng-website": {
      "architect": {
        "build": {
          "options": {
             "outputPath": "dist/zenika-ng-website",
              "index": "src/index.html",
              "main": "src/main.ts",
              "polyfills": ["zone.js"],
              "tsConfig": "tsconfig.app.json",
              "assets": ["src/favicon.ico", "src/assets"],
              "styles": ["src/styles.css"],
              "scripts": []
          }
        }
      }
    }
  }
}
```

Notes :



## File structure - src/app/*

- `index.html`: final document of the Single Page Application (SPA)
- `main.ts`: entry point of the app
- `app/app.module.ts`: main module of the app
- `app/app.component.*`: main component of the app (the one used to bootstrap the app)
- `styles.css`: global styles of the app
- `assets/*`: resources of the app (images, pdf, ...)

When running the `ng build` shell command all these files are compiled and combined to produce the final application bundle ready for production
(mainly `HTML`, `CSS` and `JavaScript` files).

```shell
ng build
```

Under the hood, the command uses a bundler called `Webpack`.

Notes :



## Webpack

- Static module bundler
- Supports the different module systems (*CommonJS*, *AMD*, *ES2015*, ...)
- Available on NPM: `npm install -g webpack`
- Build a graph of all the dependencies of your application
- Uses a configuration file: `webpack.config.js`
  - `Entry`: indicates which module webpack should use to begin building out its internal dependency graph
  - `Output`: tells webpack where to emit the bundles it creates
  - `Loaders`: allow webpack to process any type of file like '.css', '.ts' (out of the box, only '.js' and '.json' are supported)
  - `Plugins`: perform tasks on multiple files at once like bundle optimization (whereas loaders operate at file level)

Notes :



## Webpack - Configuration example

<div>

```js
// webpack.config.js
module.exports = {
  entry: './src/index.ts',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
  },

  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

</div>

Notes :



## Angular CLI

The Angular CLI is a command-line interface tool that you use to:
- Initialize
- Develop
- Scaffold
- Maintain applications

It is usually installed globally on your system:

```shell
npm install -g @angular/cli
```

Here are some of the commands available:

```shell
ng new my-app-name
ng serve
ng test
ng build
```

Notes :



## Angular CLI - Generate

The `generate` (or simply `g`) command is often used to quickly scaffold the different parts of an Angular application.

```shell
# Generate components
ng generate component menu
ng g c product

# Generate services
ng generate service catalog
ng g s basket

# Generate pipes
ng generate pipe sort-array

# And many more...
```

You can easily get help for each type of CLI command.

```shell
ng --help
ng generate --help
ng generate component --help
```

Notes :



<!-- .slide: class="page-questions" -->

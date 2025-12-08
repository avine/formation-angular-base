# Workspace

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- **Workspace**
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
- [RxJS](#/11)
- [HTTP client](#/12)
- [Routing](#/13)
- [Forms](#/14)
- [More on Components](#/15)

</div>
</div>

<!-- separator-vertical -->

## Workspace

An Angular workspace is **structured** by the following elements

- `package.json`
- `tsconfig.json`
- `angular.json`
- `src/*`

<!-- separator-vertical -->

## Workspace - package.json 1/5

The presence of a `package.json` file indicates that the directory is the root of a **Node.js** project

- **Dependencies** of the Angular framework are scoped under `@angular/*`

- Angular also depends on some **third-party libraries**

<div class="columns">
<div class="column-50">

```json
// --> @angular/* dependencies
{
  "dependencies": {
    "@angular/common": "...",
    "@angular/compiler": "...",
    "@angular/core": "...",
    "@angular/forms": "...",
    "@angular/platform-browser": "...",
    "@angular/router": "..."
  },
  "devDependencies": {
    "@angular/build": "...",
    "@angular/cli": "...",
    "@angular/compiler-cli": "...",
  }
}
```

</div>
<div class="column-50">

```json
// --> third-party libraries
{
  "dependencies": {
    "rxjs": "...",
    "tslib": "...",
  },
  "devDependencies": {
    "typescript": "...",
    "vitest": "..."
  }
}
```

</div>
</div>

<!-- separator-vertical -->

## Workspace - package.json 2/5

Package versions generally follow the [semver](https://github.com/npm/node-semver) (semantic versioning) standard...

```json
// Contents of the `package.json` file of the <packageName> package
{
  "name": "<packageName>",
  "version": "<major>.<minor>.<patch>"
}
```

- `major`: might introduce breaking changes
- `minor`: can add new features but in a retro-compatible way
- `patch`: bug fixes

<!-- separator-vertical -->

## Workspace - package.json 3/5

...allowing a range of versions when **installing** or **updating** a package

- **`1.2.3`** will install the **exact** version
- **`~1.2.3`** will install any **patch** update such as 
  - `1.2.4`
  - `1.2.5`
  - `1.2.99`
- **`^1.2.3`** will install any **minor** update such as 
  - `1.2.3`
  - `1.3.0`
  - `1.99.0`

For a given dependency, the exact version installed is locked in the `package-lock.json` configuration file

<!-- separator-vertical -->

## Workspace - package.json 4/5

- Dependencies are typically downloaded from the [NPM registry](https://npmjs.com/)
  and installed locally in `./node_modules` directory

- You can manage any dependency of your project using NPM commands

```bash
npm install <packageName>

npm update <packageName>

npm remove <packageName>
```

- However, to update the Angular framework dependencies, use the dedicated command

```bash
ng update
```

**In-depth resources:**

- [Angular update guide](https://angular.dev/update-guide)
- [Angular version compatibility (with Node.js, TypeScript, ...)](https://angular.dev/reference/versions)

<!-- separator-vertical -->

## Workspace - package.json 5/5

- The `package.json` file also contains scripts...

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

- ...that can be run using the shell command

```bash
npm run <scriptName>

# Build your Angular app
npm run build
```

<!-- separator-vertical -->

## Workspace - tsconfig.json

The presence of a `tsconfig.json` file indicates that the directory is the root of a **TypeScript** project

- Specifies the root files and the **compiler options** required to compile the project
- Supplies **Angular specific options** to the compiler

```json
{
  "compilerOptions": {
    "strict": true,
    "experimentalDecorators": true,
    ...
  },
  "angularCompilerOptions": {
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    ...
  }
}
```

<!-- separator-vertical -->

## Workspace - angular.json 1/2

The presence of an `angular.json` file indicates that the directory is the root of an **Angular** project

- Provides workspace-wide and project-specific **configuration** defaults
- These are used for build and development tools provided by the **Angular CLI**

```json
{
  "projects": {
    "zenika-ng-website": {
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "architect": {
        "build": {},
        "serve": {},
        "test": {},
      }
    }
  }
}
```

<!-- separator-vertical -->

## Workspace - angular.json 2/2

- The build `"options"` in the architect section are frequently used

```json
{
  "projects": {
    "zenika-ng-website": {
      "architect": {
        "build": {
          "options": {
              "index": "src/index.html", // This is optional as it is the default value.
              "browser": "src/main.ts",
              "tsConfig": "tsconfig.app.json",
              "assets": [{ "glob": "**/*", "input": "public" }],
              "styles": ["src/styles.css"]
          }
        }
      }
    }
  }
}
```

<!-- separator-vertical -->

## Workspace - src/*

- `index.html`: final **document** of the Single Page Application (SPA)
- `main.ts`: **entry point** of the app (from which Vite builds the JavaScript bundle)
- `app/app.*`: **main component** of the app (the one used to bootstrap the app)
- `styles.css`: **global styles** of the app
- `public/*`: **resources** of the app (images, pdf, ...)

When running the `ng build` shell command all these files are compiled and combined
to produce the final application bundle ready for production (mainly HTML, CSS and JavaScript files)

```bash
ng build
```

When the build is complete, the application bundle is in the `dist/` directory

<!-- separator-vertical -->

## Angular CLI

- The Angular CLI is a command-line interface tool that you use to
  - **initialize**
  - **develop**
  - **scaffold**
  - **maintain** applications

- It is usually installed globally on your system

```bash
npm install -g @angular/cli
```

- Here are some of the commands available

```bash
ng new my-app-name
ng serve
ng test
ng build
```

<!-- separator-vertical -->

## Angular CLI - Generate 1/3

The `generate` (or simply `g`) command is often used to quickly scaffold the different parts of an Angular application

```bash
# Generate components
ng generate component menu
ng g c product

# Generate services
ng generate service catalog-resource
ng g s basket-resource

# Generate pipes
ng generate pipe sort-array

# And many more...
```

You can easily get help for each type of CLI command

```bash
ng --help
ng generate --help
ng generate component --help
```

<!-- separator-vertical -->

## Angular CLI - Generate 2/3

- From Angular v2 to v19, all files generated by the CLI were suffixed with their type<br />
  (`*.component.ts`, `*.directive.ts`, `*.service.ts`, ...)

- Starting with **Angular v20**, this is no longer the case, as the [Angular guide style](https://angular.dev/style-guide) has been simplified

Here's the code generated by the command `ng generate component menu` in the two different implementations

<div class="columns">
<div class="column-50">

```ts
/* Angular 2, ..., 18, 19 */

// menu.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {}
```

</div>
<div class="column-50">

```ts
/* Angular 20, ... */

// menu.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {}
```

</div>
</div>

😉 *This course is based on the latest style guide recommendations*

<!-- separator-vertical -->

## Angular CLI - Generate 3/3

- When updating from Angular 19 to 20, the following configuration is added to the `angular.json` file to preserve the previous behavior

```json
{
  "schematics": {
    "@schematics/angular:component":   { "type": "component"  },
    "@schematics/angular:directive":   { "type": "directive"  },
    "@schematics/angular:service":     { "type": "service"    },
    "@schematics/angular:guard":       { "typeSeparator": "." },
    "@schematics/angular:interceptor": { "typeSeparator": "." },
    "@schematics/angular:module":      { "typeSeparator": "." },
    "@schematics/angular:pipe":        { "typeSeparator": "." },
    "@schematics/angular:resolver":    { "typeSeparator": "." }
  }
}
```

<!-- separator-vertical -->

## Workspace - Summary

**In this chapter on workspace, we have covered the following topics**

<div class="columns">
<div class="column-50">

- package.json
- tsconfig.json
- angular.json

</div>
<div class="column-50">

- src/*
- Angular CLI

</div>
</div>

<!-- separator-vertical -->

## Workspace - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Workspace - Lab 2
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

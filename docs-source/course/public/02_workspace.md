# Workspace

<!-- .slide: class="page-title" -->



## Summary

<div class="col-left-50">

- [Getting started](#/1)
- **Workspace**
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)

</div>
<div class="col-right-50">

- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>

Notes :



## Workspace

An Angular workspace is **structured** by the following parts

- `package.json`
- `tsconfig.json`
- `angular.json`
- `src/app/*`

Notes :



## Workspace - package.json

The presence of a `package.json` file indicates that the directory is the root of a **Node.js** project

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



## Workspace - package.json

- **Dependencies** of the Angular framework are scoped under `@angular/*`

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



## Workspace - package.json

- Angular also depends on some **third-party libraries**

```json
{
  "dependencies": {
    "rxjs": "...",
    "tslib": "...",
    "zone.js": "..."
  },
  "devDependencies": {
    "typescript": "..."
  }
}
```

Notes :



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

Notes :



## Workspace - angular.json

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

Notes :



## Workspace - angular.json

- The build `"options"` in the architect section are frequently used

```json
{
  "projects": {
    "zenika-ng-website": {
      "architect": {
        "build": {
          "options": {
              "index": "src/index.html",
              "browser": "src/main.ts",
              "polyfills": ["zone.js"],
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

Notes :



## Workspace - src/app/*

- `index.html`: final **document** of the Single Page Application (SPA)
- `main.ts`: **entry point** of the app (from which Vite builds the JavaScript bundle)
- `app/app.*`: **main component** of the app (the one used to bootstrap the app)
- `styles.css`: **global styles** of the app
- `public/*`: **resources** of the app (images, pdf, ...)

When running the `ng build` shell command all these files are compiled and combined
to produce the final application bundle ready for production (mainly HTML, CSS and JavaScript files)

```shell
ng build
```

When the build is complete, the application bundle is in the `dist/` directory

Notes :



## Angular CLI

- The Angular CLI is a command-line interface tool that you use to
  - **initialize**
  - **develop**
  - **scaffold**
  - **maintain** applications

- It is usually installed globally on your system

```shell
npm install -g @angular/cli
```

- Here are some of the commands available

```shell
ng new my-app-name
ng serve
ng test
ng build
ng update
```

Notes :



## Angular CLI - Generate

The `generate` (or simply `g`) command is often used to quickly scaffold the different parts of an Angular application

```shell
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

```shell
ng --help
ng generate --help
ng generate component --help
```

Notes :



## Workspace - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->



## Workspace - Lab 2
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

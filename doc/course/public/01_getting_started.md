# Getting started

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table of Contents

<div class="columns">
<div class="column-50">

- **Getting started**
- [Workspace](#/2)
- [TypeScript](#/3)
- [Components](#/4)
- [Testing](#/5)
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

## Client-server architecture

- Refers to a mode of **communication** between two computers
  - the client sends a **request** to the server
  - the server sends the **response** back to the client 

- This communication generally uses the HTTP **protocol** (but other protocols exist...)

- Each HTTP **message** between the client and the server generally consists of two parts
  - the **headers**, which contain contextual metadata
  - the **body**, which contains the transmitted data

<!-- separator-vertical -->

## Client-server architecture - Example

- **headers** of a document request, sent by the client (a web browser)

```txt
GET /home HTTP/1.1
Accept: text/html
Accept-Encoding: gzip
```

- **body** of the response, returned by the server (a web page)

```html 
<!doctype html>
<html lang="en">
  <head>
    <title>Home</title>
    <link href="styles.css" rel="stylesheet" />
  </head>
  <body>
    <app-root></app-root>
    <script src="main.js"></script>
  </body>
</html>
```

😉 *This is not a random example; it's actually the typical server return for an Angular application*

<!-- separator-vertical -->

## Web browser technologies 

- A web browser is software capable of displaying **web pages**

- Web pages are built around 3 main technologies
  - **HTML**
  - **CSS**
  - **JavaScript**

<!-- separator-vertical -->

## HTML - HyperText Markup Language <img src="./resources/01-html.png" />

- HTML is a **HyperText Markup Language** used to **structure the content** of web pages

```html
<h1>Google Chrome is a web browser</h1>

<p> <a href="https://www.google.com/chrome/">More info</a> </p>

<img src="https://www.google.com/chrome/static/images/chrome-logo-m100.svg" />
```

- Tag syntax
  - **opening** `<tag>` and **closing** `</tag>` tags (such as `h1`, `p`, `a`, ...) with content in between
  - **self-closing** `<tag />` tags (such as `img`, ...) with no content
  - **attributes** `attribute-name="value"` (such as `href`, `src`, ...) applicable to opening and self-closing tags
  - the **content** (between the opening and closing tags) may contain other *nested tags*

<!-- separator-vertical -->

## CSS - Cascading Style Sheets <img src="./resources/01-css.png" />

- CSS is a **rules-based language** used to control the visual **formatting** of web pages

```html
<button>Valider</button>

<style>
  button {
    padding: 15px;
    background-color: yellow;
  }
</style>
```

- Syntax of **rules**
  - **selector** targeting one or more elements of the web page: `selector { ...  }`
  - **declarations** applying to this selector: `property: value;` 

- A style sheet can be defined in a `<style>` tag, or in an external file
  - `<link href="styles.css" rel="stylesheet" />`

<!-- separator-vertical -->

## JavaScript <img src="./resources/01-javascript.png" />

- JavaScript is a **scripting language** used to add **interactivity** to web pages

```html
<button onclick="showAlert()">Valider</button>

<script>
  function showAlert() {
    window.alert('Button clicked!');
  }
</script>
```

- A script can be defined in a `<script>` tag, or in an external file
  - `<script src="main.js"></script>`

<!-- separator-vertical -->

## HTML - CSS - JavaScript

- All 3 technologies are indeed present in the web page given above as an example
  - **HTML:** all the tags in the document
  - **CSS:** loaded by the `styles.css` file
  - **JavaScript:** loaded by the `main.js` file

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Home</title>
    <link href="styles.css" rel="stylesheet" />
  </head>
  <body>
    <app-root></app-root>
    <script src="main.js"></script>
  </body>
</html>
```

😉 *Later, we'll explain the role of the `<app-root>` tag in relation to **Angular**...*

<!-- separator-vertical -->

## Technologies outside the web browser

- Ultimately, an Angular application **runs** in a web browser

- The artefacts of such an application are therefore HTML, CSS and JavaScript files, which the browser knows how to interpret

- However, an Angular application is **built** using additional technologies (not understood by the browser), which improve the developer experience and the quality of the artefacts

- These technologies, used only during the development phase, are mainly
  - **TypeScript**
  - **Node.js**
  - **NPM**
  - **Vite**

<!-- separator-vertical -->

## TypeScript <img src="./resources/01-typescript.svg" />

- TypeScript is a **superset** of JavaScript, which improves and secures the production of JavaScript code

- Unlike JavaScript, TypeScript is a **typed programming language**

```js
// JavaScript
let data;         // There is no constraint on the possible values
data = 1;         // ✅ Here it's a `number`
data = true;      // ✅ And here it's a `boolean`
```

```ts
// TypeScript
let data: number; // Only values of type `number` are allowed
data = 1;         // ✅ Here the assignment is valid
data = true;      // ❌ And here the assignment is invalid
```

<!-- separator-vertical -->

## TypeScript <img src="./resources/01-typescript.svg" />

- A TypeScript program must be **transpiled into JavaScript** before it can be executed in the web browser
- Transpilation simply involves **removing the typing** to make it a valid JavaScript program
- TypeScript is used in the **development phase** whereas JavaScript is used in the **execution phase**

<!-- separator-vertical -->

## Node.js <img src="./resources/01-nodejs.svg" />

- Node.js is a technology that allows JavaScript code to be executed **outside the browser**
- With Node.js, the **execution context** for JavaScript is your **operating system**

- Node.js can, for example, access your file system, find out the characteristics of your processor, etc...

```bash
# Running the following commands in your computer's Terminal...
node
process.arch # ...returns for example: `x64` (Intel 64-bit processor)
```

*In a web browser, on the other hand, JavaScript's execution context is the web page with which it interacts.
JavaScript can, for example, know the user's preferred language, the size of the browser window, etc...*

```bash
# Running the following command in your browser's console...
window.innerWidth # ...returns for example: `1135` (window width in px)
```

<!-- separator-vertical -->

## NPM (Node package Manager) <img src="./resources/01-npm.svg" />

- NPM is the **package manager** for the Node.js JavaScript runtime environment
- Provides programs and libraries for the JavaScript ecosystem in the form of downloadable packages from a **registry**

- Example of installing a package and then using it

```bash
# Running the following command in a Terminal,
# will install the `@angular/cli` package globally on your computer
npm install --global @angular/cli

# Once the package has been installed, it globally provides the `ng` command,
# which for example, lets you generate an Angular application skeleton
ng new
```

😉 *Note: within a Node.js project folder, installing a package without the `--global` option, will install it locally for the project.*

<!-- separator-vertical -->

## Vite <img src="./resources/01-vite.svg" />

- Vite is a **build tool** for modern web applications

- Main features
  - **development server** (dev server)
  - **build artefacts command** (bundler)

<img src="./resources/01-bundler.drawio.svg" width="60%" style="display: block; margin: 4rem auto 0 auto" />

<!-- separator-vertical -->

## Angular <img src="./resources/01-angular.png" />

- A web framework that enables developers to **create fast, reliable applications**

- Announced in 2014, it's a total rewrite of **AngularJS** (although some concepts remain)

- First release of **Angular 2** in September 2016

- Major release every 6 months

- Last major version `21` released in November 2025

- Maintained by a dedicated team at **Google**

<!-- separator-vertical -->

## Angular - The big picture 1/2 <img src="./resources/01-angular.png" />

- In the **development phase**, you write components in TypeScript
  - Angular has a component-based architecture
  - and use plain HTML templates

```ts
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',             // --> CSS selector
  template: '<p>Hello world!</p>',  // --> HTML template
})
class App {}                        // --> JavaScript class (supercharged by its decorator's metadata)

bootstrapApplication(App);
```

*(for the moment, let's leave aside the code implementation details and focus on the big picture...)*

<!-- separator-vertical -->

## Angular - The big picture 2/2 <img src="./resources/01-angular.png" />

- In the **execution phase** (once the app has been built and is running in a web browser), Angular tries to **bootstrap** the application
  - it searches the web page for the tag corresponding to the component's **CSS selector**
  - it then renders the component's **HTML template** inside this tag

```html
<app-root>
  <p>Hello world!</p>
</app-root>
```

😉 *You now know the role of the `<app-root>` tag in relation to **Angular**, which was present in the web page given above as an example*

<!-- separator-vertical -->

## In-depth resources

- **HTML - CSS - JavaScript:** https://developer.mozilla.org
- **TypeScript:** https://www.typescriptlang.org
- **Node.js:** https://nodejs.org
- **NPM:** https://npmjs.com
- **Vite:** https://vitejs.dev
- **Angular:** https://angular.dev

<!-- separator-vertical -->

## Getting started - Summary

**In this chapter on getting started, we have covered the following topics**

<div class="columns">
<div class="column-50">

- Client-server architecture
- HTML
- CSS
- JavaScript
- TypeScript

</div>
<div class="column-50">

- Node.js
- NPM
- Vite
- Angular

</div>
</div>

<!-- separator-vertical -->

## Getting started - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Getting started - Lab 1
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

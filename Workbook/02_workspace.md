## Lab 2: Workspace

During the rest of the training, you will develop an e-commerce application.

The design team have been working hard, and the result is available in the `Exercises/resources/design` directory.
You're going to integrate this design into your Angular application.

First, let's start a local server to see what to app looks like.

- Open a new shell window in the directory `design` and run the command:

```shell
npx serve .
```

- Open Chrome and visit: `http://127.0.0.1:3000/`. You should see the 4 products available in the catalog.

- Next, copy/paste the content of `design/assets` into `public/assets`

- Finally, open the file `design/index.html` in your code editor
  - It contains brief informations about the layout of design
  - Follow the detailed instructions provided in this lab to integrate the design into your Angular application

<div class="pb"></div>

### Adding Bootstrap CSS

- Install Bootstrap with NPM:

```shell
npm i bootstrap
```

- In the `angular.json` file, add `bootstrap.min.css` to the `"styles"` array in both `"build"` and `"test"` sections:

```json
{
  "projects": {
    "zenika-ng-website": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ]
          }
        },
        "test": {
          "options": {
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

### Adding the HTML code

- Copy/paste the inner content of the tag `<body> <!-- ONLY WHAT'S INSIDE --> </body>` to `src/app/app.component.html`

- Serve your app using `ng serve` to see if the result is equivalent to that of the designers

<div class="pb"></div>

## Lab 2: Workspace 1/3

During the rest of the course, you will develop an e-commerce application.

The design team has been working hard, and the result is available in the following directory:

```txt
lab/resources/design
```

You're going to integrate this design into your Angular application.

First, let's start a local server to see what the app looks like.

- Open a new Terminal in the `design` directory and run the command:

```bash
npx serve .
```

- Open the browser at the URL specified in the console. You should see the 4 products available in the catalog.

- Next, copy/paste the contents of `design/assets` into `public/assets`

- Finally, open the file `design/index.html` in your code editor
  - It contains **brief information** about the layout of the design
  - Follow the **detailed instructions** provided below in this workbook to integrate the design into your Angular application

<!-- separator-vertical -->

## Lab 2: Workspace 2/3
### Adding Bootstrap CSS

- Install Bootstrap with NPM:

```bash
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

<!-- separator-vertical -->

## Lab 2: Workspace 3/3
### Adding the HTML code

- Copy/paste the inner content of the `body` tag to `src/app/app.html`

```html
<body>
  <!-- ONLY WHAT'S INSIDE THE BODY TAG -->
</body>
```

- Serve your app using `ng serve` to see if the result is equivalent to the design

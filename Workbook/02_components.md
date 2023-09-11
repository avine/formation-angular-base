## Lab 2: Components

During the rest of the training, you will develop an e-commerce application.

The design team have been working hard, and the result is available in the `Exercises/resources/design` folder.
You're going to integrate this design into your Angular application.

First, let's start a local server to see what to app looks like.

- Open a new shell window in the folder `design` and run the command:

```shell
npx serve .
```

- Open Chrome and visit: `http://127.0.0.1:8080/`. You should see the 4 products available in the catalog.

- Next, copy/paste the content of `design/assets` into `src/assets`

- Finally, open the file `design/index.html` in your editor and follow the detailed instructions below

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

<div class="pb"></div>

### Adding the styles globally or locally

Choose one of the following techniques:

- Copy the styles in `src/styles.css`

```css
app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

- Or copy them in `src/app/app.component.css` (but using the `:host{}` syntax)

```css
:host {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

### Adding the HTML code

- Copy/paste the inner content of the tag `<app-root><!-- THIS --></app-root>` to `src/app/app.component.html`

- Before continuing, serve your app using `ng serve` to see if the result is equivalent to that of the designers

### Creating the "menu" and "footer" components

- Create a menu component with the shell command `ng generate component menu` and move the corresponding code into it

- Once done, add the component `<app-menu />` to `src/app/app.component.html`

- Do the same for the footer

<div class="pb"></div>

### Creating the "product" component

- Create a product component with the shell command `ng g c product`

- Add a file `product.types.ts` in the same folder (`src/app/product/`) and define the product interface

```ts
export interface Product {
  id: string;
  title: string;
  description: string;
  photo: string;
  price: number;
  stock: number;
}
```

- The component should accept:
  - an input: `@Input() product!: Product;`
  - an output: `@Output() addToBasket = new EventEmitter<Product>();`

- Use the properties of the `product` object in the template to display the `title`, `description`, ...

```html
<a class="card-link">{{ product.title }}</a>
```

- The event emitter should emit the product when the user clicks on the button "Ajoutez au panier"


### Storing all products in the `AppComponent`

Currently, the products are hard-coded in the template `src/app/app.component.html`.
Let's give the `AppComponent` class, data ownership.

- In `src/app/app.component.ts`, define a `products: Products[] = [];` property

- Fill the array with the content of the file `Exercises/design/products.json`

- In `src/app/app.component.html`, use the component `<app-product />` instead of each hard-coded product (later in the training, we'll use a "for" loop to achieve this)

```html
<app-product [product]="products[0]" />
```

- Define a `total = 0;` property that should be updated each time the user clicks on the button "Ajoutez au panier"

<div class="pb"></div>

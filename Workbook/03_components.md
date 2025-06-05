## Lab 3: Components

In this lab, you'll start creating Angular components to break down the giant `App` component template into smaller parts

### Creating the "menu" component

- Create a menu component with the following shell command and move the corresponding code into it

```shell
ng generate component menu
```

- Once done, add the component `<app-menu />` to `src/app/app.html`

<div class="pb"></div>

### Creating the "product-card" component

- Create a product-card component with the following shell command and move the corresponding code into it

```shell
ng g c --flat true product/product-card
```

- Add a file `product-types.ts` in the same directory (`src/app/product/`) and define the product interface

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
  - an input: `product = input.required<Product>();`
  - an output: `addToBasket = output<Product>();`

- Use the properties of the `product` object in the template to display the `title`, `description`, ...

```html
... <a class="card-link">{{ product.title }}</a> ...
```

- The output should emit the product when the user clicks on the button "Ajoutez au panier"


### Storing all products in the `App` component

Currently, the products are hard-coded in the template `src/app/app.html`.
Let's give the `App` component class, data ownership.

- In `src/app/app.ts`, define a `products: Product[] = [];` property

- Fill the array with the content of the file `Exercises/design/products.json`

- In `src/app/app.html`, use the component `<app-product-card />` instead of each hard-coded product (later in the training, we'll use a "for" loop to achieve this)

```html
<app-product-card [product]="products[0]" />
```

- Define a `total = 0;` property that should be updated each time the user clicks on the button "Ajoutez au panier"

<div class="pb"></div>

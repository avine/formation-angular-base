## Lab 3: Components 1/3

In this lab, you'll start creating Angular components to break down the giant `App` component template into smaller parts

### Creating the "menu" component

- Create a menu component with the following shell command and move the corresponding code into it

```bash
ng generate component menu
```

- Once done, use the component `<app-menu />` in `src/app/app.html`



## Lab 3: Components 2/3
### Creating the "product-card" component

- Create a product-card component with the following shell command and move the corresponding code into it

```bash
ng g c --flat true product/product-card
```

- Add a file `product-types.ts` in the same directory and define the product interface

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

- The `ProductCard` component should accept:
  - an input: `product = input.required<Product>();`
  - an output: `addToBasket = output<Product>();`

- Use the properties of the `product` object in the template to display the `title`, `description`, ...

```html
... <a class="card-link">{{ product().title }}</a> ...
```

- Use `[class.*]` syntax the add the CSS class `.text-bg-warning` on the element `<div class="card h-100 text-center">` but only when the product `stock` is equal to 1 (last chance to buy it!).

- The output should emit the product when the user clicks on the button "Ajoutez au panier"



## Lab 3: Components 3/3
### Storing all products in the `App` component

Currently, the products are hard-coded in the template `src/app/app.html`.
Let's give the `App` component class, data ownership.

- In `src/app/app.ts`, define a `products: Product[] = [];` property

- Fill the array with the content of the file `lab/resources/design/products.json`

- In `src/app/app.html`, use the component `<app-product-card />` instead of each hard-coded product (later in the course, we'll use a "for" loop to achieve this)

```html
<app-product-card [product]="products[0]" class="col" />
...
```

_😉 Note that the tag added by the component selector `<app-product-card class="col" />` replace the tag `<div class="col">` in the original HTML markup._

- In `src/app/app.ts`, define a `total = 0;` property for the total basket price, that should be updated each time the user clicks on the button "Ajoutez au panier"
  - To achieve this add a method `addToBasket` in the `App` component class and use it in its template
  - Display the `total` in the component template
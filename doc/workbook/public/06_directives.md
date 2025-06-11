## Lab 6: Directives 1/2

In this lab, you'll use the built-in `ngClass` directive and create a custom directive to improve the application's behavior.

### `ProductCard` component

- Use `ngClass` directive the add the CSS class `.text-bg-warning` on the element `<div class="card h-100 text-center">` but only when the product `stock` is equal to 1 (last chance to buy it!).

### Tests

#### `app.spec.ts`

- It should not add the "text-bg-warning" className when stock is greater than 1

- It should add the "text-bg-warning" className when stock is equal to 1



## Lab 6: Directives 2/2
### `HighlightPrice` directive

- Generate the directive with the following command:

```shell
ng generate directive highlight-price --flat false
```

- Define a `price` property as directive input
  - with a default value equal to `0`
  - with an `alias` equal to the `'appHighlightPrice'`
  
- Add `highlightClass` property as computed signal
  - should returns `'text-body-tertiary fst-italic'` when price == 0
  - should returns `'text-body-secondary'` when price < 50
  - should returns `'text-body-emphasis'` when price >= 50

- Use `host` directive metadata to bind `highlightClass()` value to the `class` attribute 

- Apply the directive to the following element in `src/app/app.html`

```html
<p>Votre panier s'élève à {{ total }} €</p>
```

### Tests

#### `highlight-price.spec.ts`

- should have class "text-body-tertiary fst-italic" when price == 0
- should have class "text-body-secondary" when price < 50
- should have class "text-body-emphasis" when the price >= 50

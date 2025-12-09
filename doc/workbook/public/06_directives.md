## Lab 6: Directives
### `HighlightPrice` directive

- Generate the directive with the following command:

```shell
ng generate directive highlight-price --flat false
```

- Define a `price` property as directive input
  - with a default value equal to `0`
  - with an `alias` equal to the `'appHighlightPrice'`
  
- Add a getter `highlightClass` that
  - should return `'text-body-tertiary fst-italic'` when price == 0
  - should return `'text-body-secondary'` when price < 50
  - should return `'text-body-emphasis'` when price >= 50

- Use `host` directive metadata to bind `highlightClass` value to the `class` attribute 

- Apply the directive to the following element in `src/app/app.html`

```html
<p>Votre panier s'élève à {{ total }} €</p>
```

### Tests

#### `highlight-price.spec.ts`

- should have class "text-body-tertiary fst-italic" when price == 0
- should have class "text-body-secondary" when price < 50
- should have class "text-body-emphasis" when the price >= 50

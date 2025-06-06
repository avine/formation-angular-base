## Lab 12: Forms 1/5

In this lab, you'll create an Angular form to checkout the basket.

- Generate a new component using Angular CLI:
  - `src/app/basket/checkout-form/checkout-form.ts`

- Add the `FormsModule` to the component `imports` metadata

- For the component template, copy/paste the design made with love by the UI/UX team:
  - `Exercises/resources/checkout-form/checkout-form.html`

- Insert the component selector at the end of the basket component template:
  - `<app-checkout-form />`



## Lab 12: Forms 2/5
### Handle form fields

- For each field, add the `ngModel` directive and create a template variable to access it

  - For example `<input name="name" ngModel #nameModel="ngModel" />`

- Fields validation:

  - All fields are required
  - Credit card field must match the pattern `^[0-9]{3}-[0-9]{3}$`

- Fields appearence:

  - Add CSS class `.is-invalid` when the field's state is "touched" and "invalid"
  - Add CSS class `.is-valid` when the field's state is "valid"

- Credit card field has 2 "invalid-feedback":
  - Use `@if` directive to display only the relevant error



## Lab 12: Forms 3/5
### Handle form submission

- In the component class, add a new method:
  - `checkout(checkoutDetails: CheckoutDetails): void`<br />
  (leave the implementation empty for now...)

- In the component template, on the `<form>` element:
  - Create a template variable `#checkoutForm` to access the `ngForm` directive
  - Handle the `ngSubmit` event to call the `checkout` method you just created
  - And use the `checkoutForm.value` property as `checkout` method argument

- Still in the component template:
  - The submit button should be disabled as long as the form is invalid
  - Form fields and the submit button should be disabled when the form is being submitted
    (to achieve this 2 points, add a new property `checkoutInProgress: signal<boolean>` in the component class)



## Lab 12: Forms 4/5
### Basket related changes

- In `src/app/basket/basket-types.ts`, add new interfaces:

```ts
export interface CheckoutDetails {
  name: string;
  address: string;
  creditCard: string;
}

export interface CheckoutOrder {
  orderNumber: number;
}
```

- In the `src/app/basket/basket-resource.ts` service, add a new method to checkout the basket:

```ts
export class BasketResource {
  checkout(checkoutDetails: CheckoutDetails): Observable<CheckoutOrder> {
    return this.httpClient
      .post<CheckoutOrder>(
        'http://localhost:8080/api/basket/checkout',
        checkoutDetails
      )
      // Empty the basket items after checkout completes
      .pipe(tap(() => this._items.set([])));
  }
}
```



## Lab 12: Forms 5/5
### Back to `CheckoutForm` component

You now have everything you need to implement the `checkout()` method you created earlier

Subscribe to the `BasketResource.checkout()` method and handle "next" and "error" events:

  - On **"next"**:
    - Display a "success" message with the `orderNumber`
    - Add a link to navigate to the home page using the `routerLink` directive
    - In this case, the form fields must remain disabled

  - On **"error"**:
    - Display a "danger" message
    - The user should be able to hide the "danger" message when clicking on the "close" button
    - In this case, the form fields should be enabled again to allow the user to retry submitting the form

### Bonus

Check the following directory to see the `ReactiveFormsModule` implementation:

- `Exercises/solutions/projects/12_forms/src/app/basket/checkout-reactive-form/`

## Lab 9: Forms

In this lab, you'll create an Angular form to checkout the basket.

- You need first to import the forms module in your application

```ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}
```

- Next, generate a new component using Angular CLI:
  - `src/app/checkout-form/checkout-form.component.ts`

- For the component template, copy/paste the design made with love by the UI/UX team:
  - `Exercises/resources/checkout-form/checkout-form.component.html`

- Insert the component at the end of the basket component template:
  - `<app-checkout-form />`

- Create a new interface that describes the shape of the checkout form:

```ts
export interface CheckoutDetails {
  name: string;
  address: string;
  creditCard: string;
}
```

### Form fields

- For each field, add the `ngModel` directive and create a template variable to access it
  - For example `<input name="name" ngModel #nameModel="ngModel" />`

- Fields validation:
  - All fields are required
  - Credit card field must match the pattern `^[0-9]{3}-[0-9]{3}$`

- Fields appearence:
  - Add CSS class `.is-invalid` when the field's state is "touched" and "invalid"
  - Add CSS class `.is-valid` when the field's state is "valid"

- Credit card field has 2 "invalid-feedback":
  - Use `*ngIf` directive to display only the relevant error

<div class="pb"></div>

### Form submission

- In the component class, create a new method:
  - `checkout(checkoutDetails: CheckoutDetails): void` (leave the implementation empty for now...)

- In the component template, on the `<form>` element:
  - Create a template variable `#checkoutForm` to access the `ngForm` directive
  - Handle the `ngSubmit` event to call the `checkout` method you just created
  - Use the `checkoutForm.value` property as `checkout` method argument

- In the component template:
  - The submit button should be disabled as long as the form is invalid
  - Form fields and the submit button should be disabled when the form is being submitted
    (to achieve this, add a new property `checkoutInProgress: boolean` in the component class)

- In the `ApiService`, add a new method:
  - `checkoutBasket(checkoutDetails: CheckoutDetails): Observable<{ orderNumber: number }>`
  - that should call the endpoint `POST /basket/checkout` with a request body of type `CheckoutDetails`

- In the `BasketService`, add a new method:
  - `clearBasket(): void` that should empty the basket items

We now have everything we need to implement the `checkout` method in the checkout form component class.
Let's do it!

- Subscribe to the observable returned by the `ApiService.checkoutBasket` method and handle "next" and "error" events.

- On **"next"**:
  - Once the checkout is successful, call the method `BasketService.clearBasket`
  - Display the "success" message with the `orderNumber`
  - Add a `routerLink` directive to navigate when clicking on the link *"Retourner à l'accueil"*
  - In this case, the form fields must remain disabled

- On **"error"**:
  - Display the "danger" message
  - The user should be able to hide the "danger" message when clicking on the "close" button
  - In this case, the form fields should be enabled again to allow the user to retry submitting the form

<div class="pb"></div>

### Bonus

Check the following folder to see the `ReactiveFormsModule` implementation:

- `Exercises/solutions/projects/09_forms/src/app/checkout-reactive-form/`

<div class="pb"></div>

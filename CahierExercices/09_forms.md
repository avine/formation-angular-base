## Lab 9: Forms

We will create a new view to checkout the basket.

- Create a file `model/customer.ts`, containing a `Customer` class with:
	- name with `string` type
	- address with `string` type
	- creditCard with `string` type

- In the `service/customer.service.ts` service, add a method `checkout(customer)`:
  - It must call `/basket/confirm` using the `POST` HTTP method to save the command server-side.

To interact with this new feature, use the `basket` component created in the previous lab. It will display:
  - the basket (simple display with the name and the price of each products)
  - a form to fill client information.

Add a link in the `Home` component to navigate to the `/basket` page.

The form must:
  - Execute the `checkout` method when the `ngSubmit` event is emitted. After receiving the server response, redirect the user to the `home` page (see `navigate` method from `Router`).
  - Have an `input[text]` field to fill the client name that:
    - is bound to the `name` property of the `Customer` object
    - is required (by using the *required* attribute)
    - has the `has-error` CSS class if invalid (see in following template where to place it)
  - Have a `textarea` field to fill the client address that:
    - is bound to the `address` property of the `Customer` object
    - is required (by using the *required* attribute)
    - has the `has-error` CSS class if invalid
  - Have an `input[text]` field to fill the credit card information that:
    - is bound to the `creditCard` property of the `Customer` object
    - is required (by using the *required* attribute)
    - has the pattern attribute to `^[0-9]{3}-[0-9]{3}$` that validates for instance `123-456`
    - has the `has-error` CSS class if invalid
    - displays `Invalid pattern. Example: 123-456` message if the pattern is not met
  - Have a `button[submit]` button to validate the form that:
    - must be disabled if the form is invalid

Use the following template to add a field in the form:

```html
<div class="form-group has-error">
    <label class="control-label" for="name">Name</label>
    <input type="text" id="name" name="inputName" class="form-control">
</div>
```

### Tests

- In the `basket` component tests, import the `FormsModule` module to use forms directives.

- Add a test to check that the basket display the title and the price of all the products.

- Add a test to check that the `has-error` class is added on invalid fields. To make sure that form validation happen, use the following function and wait for it to complete:

```typescript
const waitValidation = async fixture => {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
};
```

- Add a last (!) test when submitting the form with the button. Update fields value to change form status and check that the button is disabled when the form is invalid, and enabled when valid.

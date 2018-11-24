## TP9: Forms Management

We will create a new view that will validate the order.

To do this, we will start by creating a class and a service to manage the validation.

- In a new `model\customer.ts` file, create a new `Customer` class with the following properties:
- name of type `string`
- address of type `string`
- creditCard of type `string`

- In the `service\CustomerService.ts` service, add a `checkout(customer)` method which must:
  - do a `POST` on `/basket/confirm` to persist the command of a client on the server side

To interact with these new features, we will use the `basket` component created previously. It will show:
  - the basket in a simplified way (a list with the name and price of each product)
  - a form to enter the customer information.
  
  Add a link in the `Home` component that points to the `/basket` page.

This form must respect the following constraints:
  - Execution of the `checkout` method when the `ngSubmit` event is issued. After receiving the response from the server, redirect the user to the `home` page
  - a `input[text]` field to enter the name of the customer who will have to
    - be linked to the `name` property of the `Customer` object
    - be required (thanks to the *required* attribute)
    - have the class CSS `has-error` if it is not valid
  - a `textarea` field to enter the address of the customer who will have to
    - be linked to the `address` property of the `Customer` object
    - be required (thanks to the *required* attribute)
    - have the class CSS `has-error` if it is not valid
  - an `input[text]` field to enter a dummy blue card code that will have to
    - be linked to the `creditCard` property of the `Customer` object
    - be required (thanks to the *required* attribute)
    - respect the pattern `^[0-9]{3}-[0-9]{3}$` which corresponds for example to `123-456`
    - have the class CSS `has-error` if it is not valid
    - display the message `Invalid pattern. Example: 123-456` if the pattern is incorrect
  - a `button[submit]` button to validate the entry which will have to:
    - be disabled if the entire form is not valid

For information, here is the template to use to add a form field in your page:

```html
<div class="form-group has-error">
    <label class="control-label" for="name">Name</label>
    <input type="text" id="name" name="name" class="form-control">
</div>
```

### Tests

- In the tests of the `basket` component, add the import of the `FormsModule` module to be able to manage all the new directives used.

- Add a test at the level of the description of the basket verifying that each line of the list contains the title and the price of the products of the basket.

- Add a test of the activation of the `has-error` class of the form fields when the entered value is not valid. Please note that for form validation to take place entirely as part of the tests, you will need all these steps:

```typescript
const waitValidation = async fixture => {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
};
```

- Add a last (!) Test on the activation of the submit button of the form. Change the values entered to change the validation status of the form and verify that the button is active when the form is valid and disabled when it is invalid.


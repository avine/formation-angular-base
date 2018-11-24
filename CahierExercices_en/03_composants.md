## TP3: Components

The application we will develop throughout this training, is an e-commerce application.

After having received from the trainer the main template of the application, please follow the following steps:

- Modify the file index.html created in the previous TPs, in order to integrate the template sent by the trainer.

- All the HTML code between the `body` tags must be defined in the `AppComponent` component template

- The total of your basket will be defined in a `total` attribute to be added in `AppComponent` that we will initialize to 0

- Create a new `menu \ menu.component.ts` component where you will implement the main menu of the application. To create a new Angular component, we will use the `ng generate component menu` command

- In the `AppComponent` component, replace the initial menu with the component you just created.

- Create a `product.ts` class in a `model` directory. To create this new class, you can use the `ng generate class model / product` command.

- In this class, set the following properties:
- title of type `string`
- description of type `string`
- picture of type `string`
- price of type `number`

- In the `AppComponent` component, instantiate a new `Product` array and add the products used in the template.

- Modify the template to use this table for displaying different products. Since we have not yet seen the `ngFor` directive, you are forced to copy / paste the template for each element of the array.

- We will now outsource the template used to display a product in a new `ProductComponent` component. This component will have a `data` parameter corresponding to an object of type `Product`. Add this component to the template.

- We will now issue an `addToBasket` event, via the `ProductComponent` component, when the user clicks the `Add to cart` button. This event will be used by the `Application` component to update the `total` variable created previously.

### Tests

- Add `schemas: [CUSTOM_ELEMENTS_SCHEMA]` in the `configureTestingModule` of the `App` component so that it does not fail on the use of the `app-menu` and `app-product` components.

- Replace the test of the value of `title` by a test of the value of `total`

- Replace the `title` binding test with a `total` binding test in `header`

- Add a test of the `updatePrice` method. Call him with a product created for the occasion and check that the total has been updated.

- Add a test of the binding of the products in the associated components. Select the `app-product` components and check their `data` property.

- Add a test to the `app-product` component for the binding of the `title` and `price` fields.

- Add a test to the `app-product` component for binding the `src` property of the image.

- Add a test to the `app-product` component for using the button. Use a `spy` on the `emit` method of `addToBasket` to intercept and validate that it has been called.

- Add a test to the `app-menu` component to validate that the template works. Test that a template text is present, for example `Zenika` in `.navbar-brand`.

## Lab 3: Components

We will develop an e-commerce application.

Once receiving the main application template by the trainer (just an `index.html` file), follow the steps:

- All code in `head` tag must be added in the `head` of your app's `index.html`

- All HTML code below `body` tag must be used in the `Application` component template

- Create a new component `menu\menu.component.ts` which will contain the application main menu. To create a new Angular component, run the `ng generate component menu` command.

- Replace in the `Application` component the menu by the new component.

- Initialize a `total` variable to 0 in the constructor to hold the total basket price

- Create a `product.ts` class in the `model` folder. To create a new class, run the `ng generate class model/product` command.

- In this class, define the following properties:
	- title of type `string`
	- description of type `string`
	- photo of type `string`
	- price of type `number`

- In the `Application` component constructor, instantiate a new array of `Product` and add the products defined in the template.

- Update the template to display the array of products. As we don't know how to repeat template elements, duplicate the template for all elements.

- Create a new component called `ProductComponent` to display a product. It will have one input called `data` with `Product` type. Use this new component in the `Application` component with the selector `app-product`.

- We will now emit an event called `addToBasket`, from the `ProductComponent` component, when a user clicks on the `Add to basket` button. This event will be used by the `Application` component to update the basket price using the `total` variable.

### Tests

- Add `schemas: [CUSTOM_ELEMENTS_SCHEMA]` in `configureTestingModule` of `App` component to avoid the component to fail when using `app-menu` and `app-product` components.

- set the `data` prop with a Product in `Product` test component to avoid error.

- Replace the value test of `title` by a value test of `total`.

- Replace the binding test of `title` by a binding test of `total` in the `header`

- Test the `updatePrice` method. Call it with a product created for that test and check that the `total` has been updated.

- Test the binding of `products` in the `App` component. Select the `app-product` components and check their corresponding `data` property.

- In the `app-product` component, test the binding of `title` and `price` properties.

- In the `app-product` component, test the binding of the image `src` property.

- In the `app-product` component, test the click on the button. Use a `spy` on the `emit` method of `addToBasket` event to check that it has been called.

- In the `app-menu` component, test that the template work. For instance, check that `Zenika` value is in `.navbar-brand`.

## Lab 8: Router

We will now integrate the default router provided by Angular.

- Create two new components:
  - The `home` component must display the page we developed during the previous labs (aside from the menu and footer).
  - The `basket` component must display, for now, the basket by using the `json` pipe.

- Configure the router by using the `forRoot` method from the `@angular/router` module.

- In the `Application` component template, use the `router-outlet` directive to define the insertion point of the pages.

- Use the `routerLink` directive in the `menu` component to navigate through the application and the two new created components.

### Bonus

- Display the list of products in the basket in the `basket` component.

- Create a guard in order to avoid the access to the basket page if the `basket` is empty

- Create a page in order see the detail of a product (/product/:id), the server has an endpoint to the information of an article via its id (http://localhost:8080/rest/products/:id) (You have to add an `id` property to your `Product` class)

### Tests

Routing is a feature provided by Angular. It's not part of our tests to check the router is working well. We will only update the tests to pass them again.

- Most of the code of the `app` component has been moved to the `home` component, tests must be moved too.

- For all components using directives provided by the router, import the router module in the tests modules. To create a minimalist routing, use: `RouterModule.forRoot([], {useHash: true})`.

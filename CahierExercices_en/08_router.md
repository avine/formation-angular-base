## TP8: Router

We will integrate in our application the router proposed by default in the framework.

- Create two components: `home` and `basket`
  - the `home` component will be responsible for displaying the content of the page we have implemented in the previous TPs
  - the `basket` component will display, for now, the contents of the user's basket (via the pipe `json`)

- Add to your application the configuration necessary for the operation of the router. For that, we will use the `forRoot` method provided by the `@angular/router` module

- In the `Application` component template, we will use the `router-outlet` directive to indicate the insertion point of the different pages of the application.

- Add the `routerLink` directive in the `menu` component to redirect the user to the two components we have just created.

### Tests

The routing itself is a feature of the Angular framework. It is not the role of the tests in our application to verify that the Angular router is working properly. So we will simply adapt our tests to work again.

- The vast majority of the intelligence of the `app` component having been migrated into the `home` component, the set of tests must also be migrated.

- For each component using router module directives, it is necessary to import the module for these directives to pass. To set minimalist routing, use the import `RouterModule.forRoot([], {useHash: true})`.

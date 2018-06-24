## TP7 : Communication avec une API REST

Après avoir reçu de la part du formateur un serveur REST développé en NodeJS, nous allons manipuler cette API pour récupérer la liste des produits, et persister le panier de l'utilisateur.

Pour lancer le serveur REST, vous devez exécuter la commande suivante :

```shell
cd server
npm install
npm start
```

Le serveur sera disponible via l'URL `http://localhost:8080/rest/`.

Cette API propose plusieurs points d'entrée :

- `GET` sur `/products` retournera la liste des produits
- `GET` sur `/basket`  retournera le panier de l'utilisateur
- `POST` sur `/basket` pour ajouter un nouveau produit au panier de l'utilisateur

- Il est nécessaire d'importer le module `HttpClientModule` dans le module `AppModule`

- Nous allons tout d'abord modifier le service `ProductService`. Dans la méthode `getProducts`, nous allons envoyer une requête `HTTP` vers l'API correspondante.

- A la reception de la requête, utiliser l'opérateur `map` pour construire des object Products.

- Modifier le composant `AppComponent` en conséquence.

- Nous allons à présent modifier, de la même façon, le service `CustomerService`.
  - Créez une méthode `getBasket` avec le même fonctionnement que le point précédent
  - Implémentez une méthode `addProduct` dans laquelle nous allons envoyer une méthode `POST` pour ajouter un produit au panier de l'utilisateur.


- Modifiez le composant `AppComponent` afin d'utiliser la nouvelle version des services `CustomerService` et `ProductService`.

### Tests

- Dans les tests de `app`, mettre à jour les tests pour s'adapter aux nouvelles signature des services. Dans les mock, utiliser `of()` pour créer des observables à partir d'une valeur de retour (il faudra également `import { of } from 'rxjs';`).

- Dans les tests de `ProductService` et `CustomerService`, ajouter au module de test l'import de `HttpClientTestingModule`. Une fois cela fait, mettre à jour les tests en simulant les réponses du serveur et en prenant en compte les nouvelles signatures des méthodes.

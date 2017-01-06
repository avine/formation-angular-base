## TP7 : Communication avec une API REST

Après avoir reçu de la part du formateur un serveur REST développé en NodeJS, nous allons manipuler cette API pour récupérer la liste des produits, et persister le panier de l'utilisateur.

Pour lancer le serveur REST, vous devez exécuter la commande suivante :

```shell
cd server
npm install
node server.js
```

Le serveur sera disponible via l'URL `http://localhost:8080/rest/`.

Cette API propose plusieurs points d'entrée :

- `GET` sur `/products` retournera la liste des produits
- `GET` sur `/basket`  retournera le panier de l'utilisateur
- `POST` sur `/basket` pour ajouter un nouveau produit au panier de l'utilisateur

- Nous allons tout d'abord modifier le service `ProductService`. Dans la méthode `getProducts`, nous allons envoyer une requête `HTTP` vers l'API correspondante. Lors de la reception de la réponse, vous devez :
  - convertir en `json`,
  - mettre en majuscule les propriétés `title` de chaque produit
  - stocker le résultat dans la propriété `products` de la classe

- Modifier le composant `AppComponent` en conséquence.

- Il se peut que vous ayez des des erreurs dans votre navigateur à cause de la méthode `map`. *RxJS* n'inclut pas tous les opérateurs afin de réduire au maximum la taille de la librairie. Pour résoudre ce problème, vous devez importer les opérateurs que vous souhaitez utiliser.
  - Créez un fichier `rxjs-operators.ts` à côté du fichier `app.module.ts`
  - Importez-y l'opérateur 
	```typescript
	import 'rxjs/add/operator/map';
	```
  - Importez ce fichier dans `app.module.ts`
	```typescript
	import './rxjs-operators';
	```

- Vous devrez faire de même pour tous les opérateurs *RxJs* que vous utiliserez ensuite.

- Nous allons à présent modifier, de la même façon, le service `CustomerService`.
  - Créez une méthode `getBasket` avec le même fonctionnement que le point précédent
  - Implémentez une méthode `addProduct` dans laquelle nous allons envoyer une méthode `POST` pour ajouter un produit au panier de l'utilisateur.


- Modifiez le composant `AppComponent` afin d'utiliser la nouvelle version des services `CustomerService` et `ProductService`.


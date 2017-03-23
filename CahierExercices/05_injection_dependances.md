## TP5 : Injection de Dépendances

Nous allons à présent aborder les services et l'injection de dépendances dans une application Angular.

Nous allons créer deux services :

- ProductService : qui sera en charge de la gestion des produits,
- CustomerService : qui sera en charge du panier de l'utilisateur.

- Veuillez créer un service `service\ProductService.ts` dans lequel vous allez définir :
	- un tableau `products` avec les valeurs définies dans le composant `AppComponent.ts`
	- une méthode `getProducts()`: retournera le tableau `products`
	- une méthode `isTheLast(product)` : retournera `true` si le stock d'un produit est égal à 1
	- une méthode `isAvailable(product)` : retournera `true` si le stock d'un produit n'est pas égal à 0
	- une méthode `decreaseStock(product)` : mettra à jour la propriété `stock` du produit spécifié en paramètre

- Veuillez créer un service `service\CustomerService.ts` dans lequel vous allez définir :
	- une méthode `addProduct(product)` : ajoutera le nouveau produit dans un tableau
	- une méthode `getTotal()` : calculera le montant total du panier.

- Importez ces deux services dans votre composant `Application`, et modifiez l'implémentation de ce composant afin d'utiliser les différentes méthodes implémentées précédemment.

- Pour terminer ce TP, nous allons externaliser le titre "Bienvenue sur Zenika Ecommerce" dans une variable injectable de type `String` en utilisant un provider de type `Value`

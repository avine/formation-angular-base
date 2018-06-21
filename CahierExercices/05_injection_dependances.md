## TP5 : Injection de Dépendances

Nous allons à présent aborder les services et l'injection de dépendances dans une application Angular.

Nous allons créer deux services :

- ProductService : qui sera en charge de la gestion des produits,
- CustomerService : qui sera en charge du panier de l'utilisateur.

- Veuillez créer un service `ProductService` en utilisant la commande `ng generate service services/Product` dans lequel vous allez définir :
	- un tableau `products` avec les valeurs définies dans le composant `AppComponent.ts`
	- une méthode `getProducts()`: retournera le tableau `products`
	- une méthode `isTheLast(product)` : retournera `true` si le stock d'un produit est égal à 1
	- une méthode `isAvailable(product)` : retournera `true` si le stock d'un produit n'est pas égal à 0
	- une méthode `decreaseStock(product)` : mettra à jour la propriété `stock` du produit spécifié en paramètre

- Veuillez créer un service `CustomerService`, en utilisant la commande `ng generate service services/Customer` dans lequel vous allez définir :
	- une méthode `addProduct(product)` : ajoutera le nouveau produit dans un tableau, ce tableau représente votre panier.
	- une méthode `getTotal()` : calculera le montant total du panier.

- Importez ces deux services dans votre composant `Application`, et modifiez l'implémentation de ce composant afin d'utiliser les différentes méthodes implémentées précédemment.

- Pour terminer ce TP, nous allons externaliser le titre "Bienvenue sur Zenika Ecommerce" dans une variable injectable de type `String` en utilisant un provider de type `Value`

### Tests

Avec l'ajout de dépendances à vos composant, les tests réalisés jusque là vont presque tous échouer. En effet, pour utiliser vos composant, il faudra maintenant qu'Angular sache comment résoudre les dépendances de chaque composant.

Souvenez vous que le but de chaque test unitaire est de tester le code de l'élément qu'on est entrain de tester (composant ou service) sans jamais utiliser du code d'un autre élément. Il ne faut donc pas satisfaire les dépendances avec les vrais implémentations mais avec des mocks.

De plus, l'ajout de service a déplacé certaines responsabilités. Certains tests réalisé jusque là dans les composant ne doivent pas être corrigé mais supprimés.

- Dans les tests de `app`, créer une classe `ProductServiceMock` minimaliste qui remplacera `ProductService` ainsi qu'une classe `CustomerService`. Ajouter une propriété `providers` dans le module de test avec `ProductService` et `CustomerService` définie avec leur mock ainsi qu'une valeur pour `welcomeMsg`.

- Dans les tests de `app`, supprimer les tests portant sur le calcul et la mise à jour du total du panier. Le composant n'a plus la responsabilité de ce calcul.

- Dans les tests de `app`, utiliser la fonction `inject` d'Angular pour obtenir des instances des services et la fonction `spyOn` pour faire des espions Jasmine afin de refaire fonctionner les tests existants.

- Dans les tests de `app`, ajouter un test vérifiant la valeur de `welcomeMsg` provenant de l'injection de dépendance soit bien présent dans le header.

- Dans les tests de `app`, ajouter un test vérifiant la bonne exécution de la fonction `updatePrice` en utilisant des espions pour les méthodes `addProduct` et `decreaseStock`.

- Dans les tests de `app-product`, faire fonctionner les tests existants de la même façon que les tests de `app` (avec des mock et des spy).

- Ajouter des tests au `CustomerService`. Un test pour vérifier que le panier est initialisé sans produit, un autre pour valider que `addProduct` ajoute bien le produit au panier et un dernier pour valider le calcul du prix total du panier.

- Ajouter des tests au `ProductService`. Un pour vérifier qu'il y a bien 4 produits au départ, un validant le fonctionnement de la fonction `isTheLast` et un dernier pour la fonction `decreaseStock`.

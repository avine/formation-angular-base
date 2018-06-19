## TP4 : Les directives Angular

Dans ce TP, nous allons utiliser les directives `ngFor`, `ngIf` et `ngClass` pour dynamiser notre page. Les autres directives d'Angular seront présentées lors du chapitre sur les formulaires.

- Grâce à la directive `ngFor`, itérez sur la liste des `products` afin d'afficher autant de composants `ProductComponent` qu'il y a d'éléments dans ce tableau.

- Dans la classe `Product`, ajoutez une propriété `stock` de type `number`.

- Initiez cette propriété pour tous les produits définis dans le composant `AppComponent`. Nous vous conseillons de mettre une valeur différente pour chaque produit, afin de pouvoir tester les différents cas définis ci-dessous.

- Modifier la méthode `updatePrice` du composant `AppComponent` pour réduire le stock du produit dès que l'on clique sur `Ajouter au panier`.

- Grâce à la directive `ngIf`, affichez un produit, seulement si sa propriété `stock` est supérieure à 0. Vous serez peut-être obligé de revoir l'utilisation du `*ngFor` du point précédent.

- Grâce à la directive `ngClass`, ajoutez une classe CSS `last`, sur l'élément utilisant la classe `thumbnail`, si la propriété `stock` d'un produit atteint 1. Cette classe ne sera utilisée que pour modifier la couleur de fond (`background-color: rgba(255, 0, 0, 0.4)`)

### Tests

- Corriger les tests existant en prenant en compte le changement de signature de la classe `Product` (ajout du champ stock). On constatera que le test du binding des produits fonctionne toujours alors que l'implémentation a changé (utilisation du `ngFor`).

- Compléter le test de la méthode `updatePrice` pour vérifier que le stock du produit a bien été diminué.

- Ajouter un test dans `app` vérifiant qu'un produit sans stock n'est pas affiché. Pour ce faire, modifier le tableau `products` avec un nouveau tableau contenant deux produits, un au stock vide, l'autre non. Après avoir lancé `fixture.detectChanges()`, vérifier qu'il n'y a qu'une balise `app-product` et que sa propriété `data` est bien égale au produit ayant du stock.

- Ajouter deux tests dans `app-product`, un vérifiant que la class `last` n'est pas ajoutée si le stock est supérieur à 1, l'autre vérifiant qu'elle l'est si le stock est égal à 1.

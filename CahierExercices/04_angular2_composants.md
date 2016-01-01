## TP4 : Les composants Angular2

Dans ce TP, nous allons utiliser les directives `ngFor`, `ngIf` et `ngClass` pour dynamiser notre page. Les autres directives d'Angular2 seront présentée lors du chapitre sur les formulaires.  

- Grâce à la directive `ngFor`, itérez sur la liste des `products` afin d'afficher autant de composant `ProductComponent` qu'il y a d'éléments dans ce tableau.

- Dans la classe `Product`, ajoutez une propriété `stock` de type `number`

- Initiez cette propriété pour tous les produits définis dans le composant `AppComponent`

- Grâce à la directive `ngIf`, affichez un produit, seulement si sa propriété `stock` est supérieure à 0. Vous serez peut-être obligé de revoir l'utilisation du `*ng-for` du point précédent.

- Grâce à la directive `ngClass`, ajoutez une classe CSS `last` si la propriété `stock` d'un produit atteint 1. Cette classe ne sera utilisée que pour modifier la couleur de fond (`background-color`)

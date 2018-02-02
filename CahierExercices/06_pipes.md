## TP6 : Les Pipes

Nous allons à présent utiliser les `pipes`, afin de formatter le contenu de notre application.

Dans un premier temps, nous allons utiliser les `pipes` disponibles dans le framework : `uppercase` et `currency`.

- Dans le template du composant `product`, utiliser le `pipe` `currency` afin d'afficher le prix d'un produit avec la devise *euro* et avec deux chiffres après la virgule.

- Pour spécifier la locale du projet, il faut relancer `ng serve` avec une nouvelle option : `ng serve --aot --locale fr`

- Dans le constructeur du service `ProductService`, injecter le pipe `uppercase` afin de transformer les propriétés `title` de chaque produit.

Nous allons à présent créer notre propre `pipe`, qui va nous permettre de trier une collection de produit par sa propriété `title`.

- Créer un nouveau `pipe` grâce à `@angular/cli`

- Implémenter la méthode de transformation, dans laquelle nous allons trier un tableau via la méthode `sort` du prototype `Array`

- Utiliser votre `pipe` dans le template du `ngFor`

- Nous allons à présent ajouter un paramètre à notre `pipe`. Ce paramètre permettra de définir la propriété sur laquelle le tri doit s'effectuer.

### Tests

- Résoudre les nouvelles injections de dépendances afin que les tests existants fonctionnent.

- Dans le test de `ProductService`, vérifier que les 4 produits initiaux ont bien des titres en majuscules.

- Ajouter un test de `SortPipe`, passer un tableau de produit au pipe et vérifier que la valeur de retour est bien le tableau trié.

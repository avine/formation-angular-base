## TP9 : Les Pipes

Nous allons à présent utiliser les `pipes` dans notre application, afin de formatter le contenu de notre application.

Premièrement, nous allons tout d'abord utiliser les `pipes` prédéfinis dans le framework : `uppercase` et `currency`.

- Dans le template du composant `product`, utiliser le `pipe` `currency` afin d'afficher le prix d'un produit avec la devise *euro* et avec deux chiffres après la virgule.

- Dans le constructeur du service `ProductService`, injecter le pipe `uppercase` afin de transformer les propriétés `title` de chaque produit.

Nous allons à présent créer notre propre `pipe`, qui va nous permettre de trier une collection de produit par sa propriété `title`.

- Créer un nouveau `pipe` grâce à *angular-cli*
- Ajouter l'annotation nécessaire et implémenter l'interface utilisée par les `pipes`
- Implémenter la méthode de transformation, dans laquelle nous allons trier un tableau via la méthode `sort` du prototype `Array`

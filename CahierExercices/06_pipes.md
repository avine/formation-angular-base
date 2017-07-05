## TP6 : Les Pipes

Nous allons à présent utiliser les `pipes`, afin de formatter le contenu de notre application.

Dans un premier temps, nous allons utiliser les `pipes` disponibles dans le framework : `uppercase` et `currency`.

- Dans le template du composant `product`, utiliser le `pipe` `currency` afin d'afficher le prix d'un produit avec la devise *euro* et avec deux chiffres après la virgule.

Pour insérer le sigle de la devise après le prix d'un produit, vous allez devoir indiquer que votre application doit utilise la locale française. Pour cela, veuillez surcharger le
provider `LOCALE_ID` de `@angular/core` dans la configuration des providers de votre module.

```typescript
{ provide: LOCALE_ID, useValue: 'fr-FR' }
```

- Dans le constructeur du service `ProductService`, injecter le pipe `uppercase` afin de transformer les propriétés `title` de chaque produit.

Nous allons à présent créer notre propre `pipe`, qui va nous permettre de trier une collection de produit par sa propriété `title`.

- Créer un nouveau `pipe` grâce à *angular-cli*

- Implémenter la méthode de transformation, dans laquelle nous allons trier un tableau via la méthode `sort` du prototype `Array`

- Utiliser votre `pipe` dans le template du `ngFor`

- Nous allons à présent ajouter un paramètre à notre `pipe`. Ce paramètre permettra de définir la propriété sur laquelle le tri doit s'effectuer.

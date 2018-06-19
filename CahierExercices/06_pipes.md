## TP6 : Les Pipes

Nous allons à présent utiliser les `pipes`, afin de formatter le contenu de notre application.

Dans un premier temps, nous allons utiliser les `pipes` disponibles dans le framework : `uppercase` et `currency`.

- Dans le templace du composant `produit`, utiliser le `pipe` `uppercase` afin d'afficher le titre en majuscule

- Dans le template du composant `product`, utiliser le `pipe` `currency` afin d'afficher le prix d'un produit avec la devise *euro* et avec deux chiffres après la virgule.

- Ajoutez également le `pipe` `currency` pour l'affichage du total sur la page principale `app.component.html`

- Pour spécifier la locale du projet, il faut ajouter dans `app.module.ts` les lignes suivantes :
```typescript
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
```
et dans la section `providers` du `@NgModule`:
```typescript
{provide: LOCALE_ID, useValue: 'fr-FR'}
```

Nous allons à présent créer notre propre `pipe`, qui va nous permettre de trier une collection de produit par sa propriété `title`.

- Créer un nouveau `pipe` grâce à `@angular/cli`

- Implémenter la méthode de transformation, dans laquelle nous allons trier un tableau via la méthode `sort` du prototype `Array`

- Utiliser votre `pipe` dans le template du `ngFor`

- Nous allons à présent ajouter un paramètre à notre `pipe`. Ce paramètre permettra de définir la propriété sur laquelle le tri doit s'effectuer.

### Tests

- Résoudre les nouvelles injections de dépendances afin que les tests existants fonctionnent.

- Ajouter un test de `SortPipe`, passer un tableau de produit au pipe et vérifier que la valeur de retour est bien le tableau trié.

## TP 2 : Les Tests

Dans ce second TP, nous allons écrire nos premiers tests unitaires. Ce TP vient au tout début de la formation, afin de vous laisser la possibilité d'écrire de nouveaux tests pour les fonctionnalités que nous allons implémenter dans les TPs suivants.

Lors de la mise en place initiale de l'application dans le TP précédent, toute la configuration nécessaire à la bonne exécution des tests unitaires a été automatiquement réalisée.

Nous allons vérifier que tout fonctionne correctement.

- Lancez les tests via `@angular/cli` et `karma`

```shell
ng test
```

Après les modifications réalisées au TP1, les premiers tests générés par `@angular/cli` vont échouer.

Vous pouvez jeter un coup d'oeil aux tests générés par `@angular/cli`. Ils seront expliqués plus en détails dans les parties suivantes.

- Corriger les tests générés en remplaçant la valeur du `title` dans les assertions par la valeur que vous avez utilisé.

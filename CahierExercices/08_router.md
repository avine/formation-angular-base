## TP8 : Router

Nous allons intégrer dans notre application le routeur proposé par défaut dans le framework.

- Créez deux composants : `home` et `basket`
  - le composant `home` aura la charge d'afficher le contenu de la page que nous avons implémenté dans les TPs précédents
  - le composant `basket` permettra d'afficher, pour l'instant, le contenu du panier de l'utilisateur (via le pipe `json`)

- Ajoutez à votre application la configuration nécessaire pour le fonctionnement du router. Pour cela, nous allons utiliser la méthode `forRoot` mis à disposition par le module `@angular/router`

- Dans le template du composant `Application`, nous allons utiliser la directive `router-outlet` afin d'indiquer le point d'insertion des différentes pages de l'application.

- Ajoutez la directive `routerLink` dans le composant `menu` afin de rediriger l'utilisateur vers les deux composants que nous venons de créer.

### Tests

Le routing en lui même est une fonctionnalité du framework Angular. Ce n'est pas le rôle des tests de notre application que de vérifier que le router d'Angular fonctionne correctement. Nous allons donc simplement adapter nos tests pour qu'ils fonctionnent à nouveau.

- La grande majorité de l'intelligence du composant `app` ayant été migré dans le composant `home`, l'ensemble des tests doivent également être migrés.

- Pour chaque composant utilisant des directives du module router, il est nécessaire d'importer le module pour que ces directives passent. Pour définir un routage minimaliste, utiliser l'import `RouterModule.forRoot([], {useHash: true})`.

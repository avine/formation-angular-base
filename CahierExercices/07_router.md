## TP7 : Router

Nous allons intégrer dans notre application le routeur proposé par défaut dans le framework.

- Créez deux composants : `home` et `basket`
  - le composant `home` aura la charge d'afficher le contenu de la page que nous avons implémenté dans les TPs précédent
  - le composant `basket` permettra d'afficher, pour l'instant, le contenu du panier de l'utilisateur (via le pipe `json`)

- Ajoutez sur le composant `Application` la configuration nécessaire pour le fonctionnement du router. Pour cela, nous allons utiliser le décorateur `@RouteConfig` mis à disposition par le module `angular2/router`

- Dans le template du composant `Application`, nous allons utiliser la directive `router-outlet` afin d'indiquer le point d'insertion des différentes pages de l'application.

- Ajoutez la directive la directive `routerLink` dans le composant `menu` afin de rediriger l'utilisateur vers les deux composants que nous venons de créer.

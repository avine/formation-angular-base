# Application de démo pour du SSR (server side rendering)

Utilisation de @ng-toolkit : [https://github.com/maciejtreder/ng-toolkit](https://github.com/maciejtreder/ng-toolkit)

Réalisé à partir de : [https://www.youtube.com/watch?v=hxG9nuvnh-A](https://www.youtube.com/watch?v=hxG9nuvnh-A)
- `ng add @ng-toolkit/universal`

L'application est basique et affiche la liste des produits en provenance du serveur 
utilisé dans les TPs.

## Lancement de l'application

Commencer par installer les dépendances avec :

`yarn install` 

ou 

`npm install`

### Déploiement avec et sans SSR 

Possibilité de faire un double déploiement :  l'un avec SSR, l'autre sans SSR :

`yarn all` (ou `npm run all`)

> *La phase de build et de déploiement est un peu longue.*

Les 2 applications sont alors disponibles, sur les ports 4200 et 4201 :
- Sans SSR : [http://localhost:4200/products](http://localhost:4200/products)
- Avec SSR : [http://localhost:4201/products](http://localhost:4201/products)


##### Déploiement uniquement avec SSR 

Exécuter les commandes suivantes :

`yarn build:prod` (ou `npm run build:prod`) 

`yarn server` (ou `npm run server`)
 
 Application ensuite disponible à l'URL : [http://localhost:4201/products](http://localhost:4201/products)

##### Déploiement uniquement sans SSR

Exécuter la commande Angular CLI classique (en mode prod pour être ISO avec la version avec SSR) :

`yarn start --prod` (ou `npm start -- --prod`) 

Application disponible à l'URL : [http://localhost:4200/products](http://localhost:4200/products)


## Application avec SSR

- Dans Chrome, ouvrir un nouvel onglet.
- Dans la console de Chrome (F12), réduire le débit en "Slow 3G" dans l'onglet "réseaux".
- Se rendre sur : `http://localhost:4201/products`
- Observer que la liste des produits est affichée alors même que les différents 
fichiers JS n'on pas fini d'être téléchargé (normal => SSR).
- Lorsque que l'application a fini de se télécharger et de se bootstraper, 
on a un clignotement sur la liste des produits car celle-ci est rafraîchie.

En observant les sources de la page (Ctrl+U), montrer aux stagiaires que l'on retrouve bien
dans les sources ce qui est affiché dans la page.

## Application sans SSR

Comparer avec un fonctionnement sans SSR :
- Dans Chrome, rester en mode "Slow 3G".
- Se rendre sur : `http://localhost:4200/products`
- Observer le message `Application en cours de bootstraping` (voir le fichier `index.html`)
- Observer le délai avant qu'il se passe quelque chose pour l'utilisateur.
- Observer que l'on ne retrouve rien de ce qui est affiché dans les sources.

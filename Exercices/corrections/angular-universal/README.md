# Application de démo pour du SSR.

Utilisation de @ng-toolkit : https://github.com/maciejtreder/ng-toolkit

Réalisé à partir de : https://www.youtube.com/watch?v=hxG9nuvnh-A
- `ng add @ng-toolkit/universal`

L'application est basique et affiche la liste des produits en provenance du serveur 
utilisé dans les TPs.

## Application avec SSR

Pour lancer l'application :
- `npm run build:prod`
- `npm run server`

Ensuite :
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
- Lancer l'application **sans** SSR avec `ng serve --prod`.
- Dans Chrome, rester en mode "Slow 3G".
- Se rendre sur : `http://localhost:4200/products`
- Observer le message `Formation Angular : application en cours de bootstraping`.
- Observer le délai avant qu'il se passe quelque chose pour l'utilisateur.
- Obersver que l'on ne retrouve rien de ce qui est affiché dans les sources.

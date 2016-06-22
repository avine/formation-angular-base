## TP3 : Composants

L'application que nous allons développer tout au long de cette formation, est une application d'e-commerce.

Après avoir reçu du formateur le template principal de l'application, veuillez suivre les étapes suivantes :

- Modifiez le fichier index.html créé dans les TPs précédent, afin d'intégrer le template envoyé par le formateur.

- Tous le code HTML situé entre les balises `body` doit être défini dans le template du composant `Application`

- Créez un nouveau composant `menu\menu.ts` dans lequel vous allez implémenter le menu principal de l'application. Pour créer un nouveau composant Angular2, nous allons utiliser a commande `ng generate component menu`

- Remplacez dans le composant `Application` le menu initial par le composant que vous venez de créer.

- Le total de votre panier sera défini dans une variable `total` que nous allons initialiser dans le constructeur du composant.

- Utilisez cette variable dans le template.

- Dans un nouveau fichier `model\product.ts`, créez une nouvelle classe `Product` ayant les propriétés suivantes:
	- title de type `string`
	- description de type `string`
	- photo de type `string`
	- price de type `number`

- Dans le constructeur du composant `Application`, instancier un nouveau tableau de `Product`. Et ajoutez les produits utilisés dans le template.

- Modifier le template pour utiliser ce tableau pour l'affichage des différents produits. Comme nous n'avons pas encore vu la directive `ngFor`, vous êtes obligé de copier/coller le template pour chaque élément du tableau.

- Nous allons à présent externaliser le template utilisé pour afficher un produit dans un nouveau composant `ProductComponent`. Ce composant aura un paramètre `data` correspondant à un objet de type `Product`.

- Nous allons à présent émettre un évènement `addToBasket`, via le composant `ProductComponent`, lorsque l'utilisateur cliquera sur le bouton `Ajoutez au panier`. Cet évènement sera utilisé par le composant `Application` pour mettre à jour la variable `total` créée précédemment.

- Pour terminer ce TP, nous allons créer un dernier composant, `footer` qui sera utilisé à la place de l'élément HTML `<footer>`. Ce composant devra avoir un point d'insertion (via le composant `ng-content`), grâce auquel nous spécifirons le texte à afficher.

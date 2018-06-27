## TP3 : Composants

L'application que nous allons développer tout au long de cette formation, est une application d'e-commerce.

Après avoir reçu du formateur le template principal de l'application, veuillez suivre les étapes suivantes :

- Modifiez le fichier index.html créé dans les TPs précédent, afin d'intégrer le template envoyé par le formateur.

- Tout le code HTML situé entre les balises `body` doit être défini dans le template du composant `AppComponent`

- Le total de votre panier sera défini dans un attribut `total` à rajouter dans `AppComponent` que nous allons initialiser à 0

- Créez un nouveau composant `menu\menu.component.ts` dans lequel vous allez implémenter le menu principal de l'application. Pour créer un nouveau composant Angular, nous allons utiliser la commande `ng generate component menu`

- Remplacez dans le composant `AppComponent` le menu initial par le composant que vous venez de créer.

- Créez une classe `product.ts` dans un répertoire `model`. Pour créer cette nouvelle classe, vous pouvez utiliser la commande `ng generate class model/product`.

- Dans cette classe, définissez les propriétés suivantes:
	- title de type `string`
	- description de type `string`
	- photo de type `string`
	- price de type `number`

- Dans le composant `AppComponent`, instancier un nouveau tableau de `Product` et ajoutez les produits utilisés dans le template.

- Modifier le template pour utiliser ce tableau pour l'affichage des différents produits. Comme nous n'avons pas encore vu la directive `ngFor`, vous êtes obligé de copier/coller le template pour chaque élément du tableau.

- Nous allons à présent externaliser le template utilisé pour afficher un produit dans un nouveau composant `ProductComponent`. Ce composant aura un paramètre `data` correspondant à un objet de type `Product`. Ajoutez ce composant dans le template.

- Nous allons à présent émettre un évènement `addToBasket`, via le composant `ProductComponent`, lorsque l'utilisateur cliquera sur le bouton `Ajoutez au panier`. Cet évènement sera utilisé par le composant `Application` pour mettre à jour la variable `total` créée précédemment.

### Tests

- Ajouter `schemas: [CUSTOM_ELEMENTS_SCHEMA]` dans le `configureTestingModule` du composant `App` pour qu'il n'échoue pas sur l'utilisation des composants `app-menu` et `app-product`.

- Remplacer le test de la valeur de `title` par un test de la valeur de `total`

- Remplacer le test du binding de `title` par un test du binding de `total` dans le `header`

- Ajouter un test de la méthode `updatePrice`. L'appeler avec un produit créé pour l'occasion et vérifier que le total a été mis à jour.

- Ajouter un test du binding des produits dans les composants associés. Sélectionner les composants `app-product` et vérifier leur propriété `data`.

- Ajouter un test au composant `app-product` pour le binding des champs `title` et `price`.

- Ajouter un test au composant `app-product` pour le binding de la propriété `src` de l'image.

- Ajouter un test au composant `app-product` pour l'utilisation du bouton. Utiliser un `spy` sur la méthode `emit` de `addToBasket` pour intercepter et valider qu'elle a été appelé.

- Ajouter un test au composant `app-menu` pour valider que le template fonctionne. Tester qu'un texte du template est bien présent, par exemple `Zenika` dans `.navbar-brand`.

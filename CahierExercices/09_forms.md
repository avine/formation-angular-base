## TP9 : Gestion des Formulaires

Nous allons créer une nouvelle vue qui permettra de valider la commande.

Pour ce faire, nous allons commencer par créer une classe et un service pour gérer la validation.

- Dans un nouveau fichier `model\customer.ts`, créez une nouvelle classe `Customer` ayant les propriétés suivantes :
	- name de type `string`
	- address de type `string`
	- creditCard de type `string`

- Dans le service `service\CustomerService.ts` rajouter une méthode `validate(customer)` qui doit :
  - faire un `POST` sur `/basket/confirm` pour valider la commande d'un client
  - retourner sur la page `home`

Pour interargir avec ces nouvelles fonctionnalités, nous allons mettre à jour le composant `basket` créé précédemment. Il affichera :
  - le panier de manière simplifiée (une liste avec le nom et le prix de chaque produit)
  - un formulaire permettant de saisir les informations du client.

Ajoutez un lien dans le composant `Home` qui pointe vers la page `/basket`.

Ce formulaire devra respecter les contraintes suivantes :
  - utiliser la directive `ngSubmit`
  - un champ `input[text]` pour saisir le nom du client qui devra
    - être lié sur la propriété `name` de l'objet `Customer`
    - être requis (grâce à l'attribut *required*)
    - avoir la class CSS `has-error` s'il n'est pas valide
  - un champ `textarea` pour saisir l'adresse du client qui devra
    - être lié sur la propriété `address` de l'objet `Customer`
    - être requis (grâce à l'attribut *required*)
    - avoir la class CSS `has-error` s'il n'est pas valide
  - un champ `input[text]` pour saisir un code de carte bleue factice qui devra
    - être lié sur la propriété `creditCard` de l'objet `Customer`
    - être requis (grâce à l'attribut *required*)
    - respecter le pattern `^[0-9]{3}-[0-9]{3}$` qui correspond par exemple à `123-456`
    - avoir la class CSS `has-error` s'il n'est pas valide
    - afficher le message `Invalid pattern. Example : 123-456` si le pattern est incorrect
  - un bouton `button[submit]` pour valider la saisie qui devra :
    - être désactivé si tout le formulaire n'est pas valide

Pour information, voici le template à utiliser pour ajouter un champ de formulaire dans votre page :

```html
<div class="form-group has-error">
    <label class="control-label" for="name">Name</label>
    <input type="text" id="name" class="form-control">
</div>
```

Pour pouvoir bénéficier du module `@angular/forms`, il est nécessaire de l'installer via *NPM*. En effet, ce module n'est pas disponible par défaut dans un projet généré par *angular-cli*.

```shell
npm install @angular/forms
```

La dernière chose à faire pour pouvoir utiliser ce module est de modifier la configuration de *SystemJS*, via le fichier *system-config.js*. Ajoutez la chaîne de caractères `@angular/forms'` dans le tableau `barrels`.

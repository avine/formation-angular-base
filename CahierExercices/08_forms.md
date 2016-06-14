## TP8 : Gestion des Formulaires

Nous allons créer une nouvelle vue qui permettra de valider la commande.

Pour se faire, nous allons commencer par créer une classe et un service pour gérer la validation.

- Dans un nouveau fichier `model\customer.ts`, créez une nouvelle classe `Customer` ayant les propriétés suivantes :
	- name de type `string`
	- address de type `string`
	- creditCard de type `string`

- Dans le service `service\CustomerService.ts` rajouter une méthode `validate(customer)` qui doit :
  - faire un `POST` sur `/basket/confirm` pour valider la commande d'un client
  - retourner sur la page `home`

Pour interargir avec ces nouvelles fonctionnalités, nous allons créer un nouveau composant `Confirmation` qui affichera :
  - le panier de manière simplifiée (une liste avec le nom et le prix de chaque produit)
  - un formulaire permettant de saisir les informations du client.

Ajouter un lien dans le composant `Home` qui pointe vers la page `/confirmation`.

Ce formulaire devra respecter les contraintes suivantes :
  - utiliser la directive `ngSubmit`
  - un champ `input[text]` pour saisir le nom du client qui devra
    - être lié sur la propriété `name` de l'objet `Customer`
    - être requis (grâce à l'attribut *required*)
    - avoir la class CSS `has-error` s'il n'est pas valid
  - un champ `textarea` pour saisir l'adresse du client qui devra
    - être lié sur la propriété `address` de l'objet `Customer`
    - être requis (grâce à l'attribut *required*)
    - avoir la class CSS `has-error` s'il n'est pas valid
  - un champ `input[text]` pour saisir un code de carte bleue factice qui devra
    - être lié sur la propriété `creditCard` de l'objet `Customer`
    - être requis (grâce à l'attribut *required*)
    - respecter le pattern `^[0-9]{3}-[0-9]{3}$` qui correspond par exemple à `123-456`
    - avoir la class CSS `has-error` s'il n'est pas valide
    - afficher le message `Invalid pattern. Example : 123-456` si le pattern est incorrect
  - un bouton `button[submit]` pour valider la saisie qui devra :
    - être désactivé si tout le formulaire n'est pas valide

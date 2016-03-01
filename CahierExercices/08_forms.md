## TP8 : Gestion des Formulaires

Nous allons créé une nouvelle vue qui permettra de valider la commande.

Pour se faire, nous allons commencer par créer une classe et un service pour gérer la validation.

- Dans un nouveau fichier `model\customer.ts`, créez une nouvelle classe `Customer` ayant les propriétés suivantes:
	- name de type `string`
	- address de type `string`
	- creditCard de type `string`

- Dans le service `service\CustomerService.ts` rajouter une méthode `validate(customer)` qui doit :
  - faire un `POST` sur `/basket/confirm` pour valider la commande d'un client
  - Retourner sur la page `home`
  
Pour interargir avec ses nouvelles fonctionnalités, nous allons créer un nouveau composant `Confirmation` qui :
  - affichera le panier de manière simplifier (une liste avec le nom et le prix de chaque produit)
  - un formulaire permettant de rentrer les informations du client.
  
Ajouter un lien dans le composant `Home` qui pointe vers la page `/confirmation`.
 
Ce formulaire devra respecter les contraintes suivantes : 
  - utliser la directive `ngSubmit`
  - un champ `input[text]` pour enter le nom du client qui devra
    - être binder sur la propriété `name` de l'objet `Customer`
    - être required
    - avoir la class CSS `has-error` si il n'est pas valid
  - un champ `textarea` pour enter l'adresse du client qui devra
    - être binder sur la propriété `addess` de l'objet `Customer`
    - être required
    - avoir la class CSS `has-error` si il n'est pas valid
  - un champ `input[text]` pour entrer un code de carte bleue factice qui devra
    - être binder sur la propriété `creditCard` de l'objet `Customer`
    - être required
    - respecter le pattern `^[0-9]{3}-[0-9]{3}$` qui correspond par exemple à `123-456`
    - avoir la class CSS `has-error` si il n'est pas valid
    - afficher le message `Invalid pattern. Example : 123-456` si le pattern est incorrect
  - un bouton `button[submit]` pour valider la saisie qui devra :
    - être disabled si tout le formulaire n'est pas valide

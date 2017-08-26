## TP9 : Gestion des Formulaires

Nous allons créer une nouvelle vue qui permettra de valider la commande.

Pour ce faire, nous allons commencer par créer une classe et un service pour gérer la validation.

- Dans un nouveau fichier `model\customer.ts`, créez une nouvelle classe `Customer` ayant les propriétés suivantes :
	- name de type `string`
	- address de type `string`
	- creditCard de type `string`

- Dans le service `service\CustomerService.ts` rajouter une méthode `checkout(customer)` qui doit :
  - faire un `POST` sur `/basket/confirm` pour persister la commande d'un client côté serveur

Pour interagir avec ces nouvelles fonctionnalités, nous allons utiliser le composant `basket` créé précédemment. Il affichera :
  - le panier de manière simplifiée (une liste avec le nom et le prix de chaque produit)
  - un formulaire permettant de saisir les informations du client.

Ajoutez un lien dans le composant `Home` qui pointe vers la page `/basket`.

Ce formulaire devra respecter les contraintes suivantes :
  - Exécution de la méthode `checkout` lorsque l'évènement `ngSubmit` est émis. Après avoir reçu la réponse du serveur, redirigez l'utilisateur sur la page `home`
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

### Tests

- Dans les tests du composant `basket`, ajouter l'import du module `FormsModule` pour pouvoir gérer toutes les nouvelles directives utilisées.

- Ajouter un test au niveau de la description du panier vérifiant que chaque ligne de la liste contient bien le titre et le prix des produits du panier.

- Ajouter un test de l'activation de la classe `has-error` des champs de formulaire quand la valeur saisie n'est pas valide. Attention, pour que la validation de formulaire se déroule entièrement dans le cadre des tests, vous aurez besoin de toutes ces étapes :

```typescript
const waitValidation = async fixture => {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
};
```

- Ajouter un dernier (!) test sur l'activation du bouton submit du formulaire. Changer les valeurs saisies pour changer l'état de validation du formulaire et vérifier que le bouton est actif quand le formulaire est valide et désactivé quand il est invalide.

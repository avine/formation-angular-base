# Gestion des Formulaires

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- [Tests](#/4)
- [Template & Composants](#/5)
- [Les directives](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- **[Gestion des Formulaires](#/11)**
- [Server-side Rendering](#/12)

Notes :



## Formulaires et Angular

- Se base sur les mécanismes standards des formulaires HTML
- Supporte les types de champs de saisie habituels et les validations natives
  - `input[text]`, `input[radio]`, `input[checkbox]`, `input[email]`, `input[number]`, `input[url]`
  - `select`
  - `textarea`

- Il est possible de créer ses propres composants

Notes :



## Formulaires : Principe général

- Associer des champs de saisie à des propriétés du composant grâce à `ngModel`
- Nommer les champs grâce à l'attribut `name`
- Ajouter des validateurs
- Appeler une méthode du composant pour traiter le formulaire en JavaScript

Notes :



## NgForm

La directive `NgForm` est automatiquement associée à chaque balise `<form>`

- Autorise l'utilisation du `(ngSubmit)`
- Créée un `FormGroup` pour gérer les inputs contenus dans le formulaire
- Utilisable par l'écriture : `#myForm="ngForm"`

```html
<form #myForm="ngForm">
  <!-- disabled button if form is invalid -->
  <button type="submit" [disabled]="myForm.invalid">Save</button>
</form>
```

Notes :



## Directives

- `ngModel` : Gère le binding entre la variable du contrôleur et le champ HTML

```html
<input type="text" [(ngModel)]="contact.name" name="name">
```

- `submit` : Associe une méthode à la soumission du formulaire

```html
<form (submit)="saveForm()">
  <button type="submit">Save</button>
</form>
```

Notes :



## Validation : Désactiver la gestion native

- Par défaut, les navigateurs effectuent les validations nativement
 - Manque de cohérence visuelle avec l'application et entre navigateurs
 - Interfère avec le mécanisme d'AngularJs
- Solution : Désactiver la validation native et l'effectuer par Angular
- Attribut `novalidate` sur le formulaire
  - Attribut standard HTML5
  - Attribut ajouté automatiquement par *Angular*
  
```html
<form novalidate>
</form>
```

Notes :



## FormControl
- Un `FormControl` est une classe représentant un `input` qui contient :
 - La valeur
 - L'état (dirty, valid, ...)
 - Les erreurs de validation

- Angular crée un `FormControl` dès l'utilisation de la directive `ngModel`
- Il utilise la valeur de la propriété `name` comme libellé
- On peut l'associer à une variable pour l'utiliser dans le template avec la syntaxe `#inputName="ngModel"`

Notes :



## Exemple
Exemple complet:
```html
<form #myForm="ngForm" novalidate (submit)="onSubmit()">
  <input type="text" name="myName" [(ngModel)]="contact.name" #nameInput="ngModel" required>
  <span [hidden]="nameInput.valid">Error</span>
  <span [hidden]="nameInput.pristine">You changed the value</span>

  <button type="submit" [disabled]="myForm.invalid">
    Validate
  </button>
</form>
```

Notes :



## Validation : Concept

- Un champ peut posséder un ou plusieurs validateurs
  - Standards ou personnalisés
  - Support des validateurs HTML5 : `required`, `min`, `max`, ...
- L'état de la validation est stocké par l'objet `FormControl` dans la propriété `errors`
```html
<input type="text" [(ngModel)]="contact.name" #name="ngModel" name="name" required>
<span [hidden]="!name.errors?.required">Name is not valid</span>
```

Notes :



## Validation : État du formulaire et des champs

- Angular expose 5 propriétés au niveau du formulaire et de chacun des champs de saisie
  - `valid` / `invalid` : Indique si l'élément passe le contrôle des validateurs
  - `pristine` / `dirty` : Indiquent si l'utilisateur a altéré l'élément
    - Un élément est considéré `dirty` dès qu'il subit une modification, même si la valeur initiale est restaurée ensuite
  - `untouched` / `touched` : Indiquent si l'élément a été touché (focus)
- Les classes CSS correspondantes sont appliquées aux éléments (via la directive `NgControlStatus`)
  - `ng-valid`, `ng-invalid`, `ng-pristine`, `ng-dirty`, `ng-untouched`, `ng-touched`

Notes :



## Validation : Création d'un validateur

Il est possible de créer ses propres validateurs avec une classe implémentant l'interface `Validator`

```javascript
@Directive({
    selector: '[pattern][ngModel]',
    providers: [
      { provide: NG_VALIDATORS, useExisting: PatternValidator, multi: true }
    ]
})
export class PatternValidator implements Validator {
    @Input('pattern') pattern: string;

    validate(c: AbstractControl): { [key: string]: any } {
        if (c.value && c.value.match(new RegExp(this.pattern))) {
            return null;
        }
        return { pattern: true };
    }
}
```

```html
<input type="text" name="name" [(ngModel)]="contact.name" pattern="[a-z]{10}">
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp9" -->

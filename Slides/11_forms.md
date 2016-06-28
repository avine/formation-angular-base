# Gestion des Formulaires

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- **[Gestion des Formulaires](#/11)**
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)

Notes :



## Formulaires et Angular2

- Se base sur les mécanismes standards des formulaires HTML
- Supporte les types de champs de saisie habituels et les validations natives
  - `input[text]`, `input[radio]`, `input[checkbox]`, `input[email]`, `input[number]`, `input[url]`
  - `select`
  - `textarea`

- Il est possible de créer ses propres composants

Notes :



## Formulaires : Principe général

- Associer des champs de saisie à des propriétés du scope grâce à `ngModel`
- Nommer les champs grâce à l'attribut `name`
- Ajouter des validateurs
- Appeler une méthode du scope pour traiter le formulaire en JavaScript

Notes :



## NgForm

La directive `NgForm` est automatiquement associée à chaque balise `<form>`

- Autorise l'utilisation du `(ngSubmit)`
- Créée un `ControlGroup` pour gérer les inputs contenus dans le formulaire
- Utilisable par l'écriture : `#myForm="ngForm"`

```html
<form #myForm="ngForm" novalidate>
  <!-- disabled button if form is invalid -->
  <button type="submit" [disabled]="!myForm.valid">Save</button>
</form>
```

Notes :



## Directives

- `ngModel` : Gère le binding entre la variable du contrôlleur et le champ HTML

```html
<input type="text" [(ngModel)]="contact.name" name="name">
```

- `ngSubmit` : Associe une méthode à la soumission du formulaire

```html
<form (ngSubmit)="saveForm()" novalidate>
  <button type="submit">Save</button>
</form>
```

Notes :



## NgControl
- Un `Control` est une classe réprésentant un `input` qui contient :
 - La valeur
 - l'état (dirty, valid, ...)
 - les erreurs de validations

- Angular2 crée un `Control` dès l'utilisation de la directive `ngModel`
- Il utilise la valeur de la propriété `name` comme libellé
- On peut l'associer à une variable pour l'utiliser dans le template avec la même syntaxe que le `ngForm`

Notes :



## NgControl : Exemple
Utilisation du ngControl
```html
<form #myForm="ngForm" novalidate (ngSubmit)="onSubmit(myForm.controls)">
  <input type="text" name="name" #name="ngModel" required>
  <span [hidden]="name.valid">Error</span>
  <span [hidden]="name.pristine">You changed the value</span>

  <button type="submit" [disabled]="!myForm.controls.name?.valid">
    Validate
  </button>
</form>

// myForm.value -> { "nameControl": <Control Object> }
```

Notes :



## Validation : Concept

- Un champ peut posséder un ou plusieurs validateurs
  - Standards ou personnalisés
  - Support des validateurs HTML5 : `required`, `min`, `max`, ...
- L'état de la validation est stocké par l'objet `Control` dans la propriété `errors`
```html
<input type="text" [(ngModel)]="contact.name" #name="ngModel" name="name" required>
<span [hidden]="name.errors?.required">Name is not valid</span>
```

Notes :



## Validation : Désactiver la gestion native

- Par défaut, les navigateurs effectuent les validations nativements
 - Manque de cohérence visuelle avec l'application et entre navigateurs
 - Interfère avec le mécanisme d'AngularJs
- Solution : Désactiver la validation native et l'effectuée par Angular2
- Attribut `novalidate` sur le formulaire
  - Attribut standard HTML5

```html
<form novalidate>
  …
</form>
```

Notes :



## Validation : État du formulaire et des champs

- Angular2 expose 5 propriétés au niveau du formulaire et de chacun des champs de saisie
  - `valid` : Indique si l'élément passe le contrôle des validateurs
  - `pristine` / `dirty` : Indiquent si l'utilisateur a altéré l'élément
    - Un élément est considéré `dirty` dès qu'il subit une modification, même si la valeur initiale est restaurée ensuite
  - `untouched` / `touched` : Indiquent si l'élément a été touché (focus)
- Les classes CSS correspondantes sont appliquées aux éléments
  - `ng-valid`, `ng-invalid`, `ng-pristine`, `ng-dirty`, `ng-untouched`, `ng-touched`

Notes :



## Validation : Création d'un validateur

Il est possible de créer ses propres validateurs avec une classe implémentant l'interface `Validator`

```javascript
@Directive({
    selector: '[pattern]',
    providers: [
      { provide: NG_VALIDATORS, useExisting: PatternValidator, multi: true }
    ]
})
export class PatternValidator implements Validator {
    @Input('pattern') pattern: string;

    validate(c: Control): { [key: string]: any } {
        if (c.value && c.value.match(new RegExp(this.pattern))) {
            return null;
        }
        return { pattern: true };
    }
}
```

```html
<input type="text" [(ngModel)]="contact.name" pattern="[a-z]{10}">
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp9" -->

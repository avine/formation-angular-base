# Gestion des Formulaires

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Communication avec une API REST](#/8)
- [Router](#/9)

Notes : 



## Sommaire

<!-- .slide: class="toc" -->

- **[Gestion des Formulaires](#/10)**
- [Les Pipes](#/11)
- [Annotations et Décorateurs](#/12)
- [Server-side Rendering](#/13)
- [Support d'EcmaScript 5](#/14)
- [Bonne Pratiques pour une migration heureuse](#/15)

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
- Nommer les champs de saisie grâce à `ngControl`
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
<input type="text" [(ngModel)]="contact.name" >
```

- `ngControl` : Donne un nom à l'input pour qu'il soit utilisable dans le ngForm
```html
<input type="text" [(ngModel)]="contact.name" ngControl="name">
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
 
- La directive `ngControl` créé un `Control`, l'associe au champ input et l'ajoute au `ngForm`
- On peut l'associer à une variable pour l'utiliser dans le template avec la même syntaxe que le `ngForm`

Notes :



## NgControl : Exemple
Utilisation du ngControl
```html
<form #myForm="ngForm" novalidate (ngSubmit)="onSubmit(myForm.controls)">
  <input type="text" ngControl="nameControl" #name="ngForm" required>
  <span [hidden]="name.valid">Error</span>
  <span [hidden]="name.pristine">You changed the value</span>

  <button type="submit" [disabled]="!myForm.controls.nameControl?.valid">
    Validate
  </button>
</form>

// myForm.value -> { "nameControl": <Control Object> }
```

Notes :



## Validation : Concept

- Un champ peut posséder un ou plusieurs validateurs
  - Standards ou personnalisés
  
- L'état de la validation est stocké par l'objet `Control` dans la propriété `errors`
```html
<input type="text" [(ngModel)]="contact.name" ngControl="name" required>
<span [hidden]="!name.errors?.required">Name is required</span>
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



## Validation : Utilisation de required

- Un champ peut être rendu obligatoire
  - De manière permanente (standard HTML5) : `required`
```html
<input type="text" ngControl="name" required>
```

Notes :
A vérifier...
  - De manière conditionnelle par binding : 
```html
<input type="checkbox" [(ngModel)]="nameRequired">
<input [required]="nameRequired" [(ngModel)]="name">
```



## Validation : Validation des champs

- Il est possible de récupérer l'état de validation des champs depuis le formulaire
```html
<form #myForm="ngForm" novalidate>
  <input type="text" [(ngModel)]="contact.name" ngControl="name">
  <span [hidden]="!myForm.controls.name.valid">Field required</span>
</form>
```

- Ou en le nommant explicitement (la syntaxe est la même que le formulaire)
```html
<form #myForm="ngForm" novalidate>
  <input type="text" [(ngModel)]="contact.name" ngControl="name" #name="ngForm">
  <span [hidden]="!name.valid">Field required</span>
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



## Personnaliser un Control

Il est possible de créer un `Control` en code pour l'adapter à son besoin (valeur par défaut, validateur personnalisé, ...)

Le binding sur le template s'effectue par la directive `ngFormControl`

```javascript
public nameControl = new Control('', Validators.Required);
```

```html
<form #myForm="ngForm" novalidate>
  <input type="text" [(ngModel)]="contact.name" [ngFormControl]="nameControl" #name="ngForm">
  <span [hidden]="!name.valid">Field required</span>
</form>
```

Notes :



<!-- .slide: class="page-questions" -->

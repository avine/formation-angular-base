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



## Formulaires : Principe général (1/2)

- Principe général de gestion des formulaires
  - Baser sur la gestion HTML classique des formulaires
  - Désactiver le mécanisme de validation natif du navigateur
  - Associer des champs de saisie à des propriétés du scope grâce à `ngModel`
  - Appeler une méthode du scope pour traiter le formulaire en Javascript

Notes :



## Formulaires : Principe général (2/2)

- Désactivation du mécanisme de validation natif du navigateur
  - La validation sera effectuée par AngularJS
- Attribut `novalidate` sur le formulaire
  - Attribut standard HTML5

```html
<form novalidate>
	…
</form>
```

Notes :



## Formulaires : Types de champs

- Angular2 gère les types de champs de saisie habituels
  - `input[text]`, `input[radio]`, `input[checkbox]`, `input[email]`, `input[number]`, `input[url]`
  - `select`
  - `textarea`
- Il est possible de créer ses propres composants

Notes :



## Directives

- `ngModel` : Associe un champ de saisie à une propriété du composant

```html
<input type="text" [(ngModel])="contact.name" />
```

- `ngSubmit` : Associe une méthode à la validation du formulaire

```html
<form (ngSubmit)="saveForm()" novalidate>
     <button type="submit">Validate</button>
</form>
```

Notes :



## Validation : Concept

- Un champ peut posséder un ou plusieurs validateurs
  - Standards ou personnalisés
  
- Il est possible d'associer à un champ un objet `Control` pour gérer la validation et les états du champ
  - Cet objet contient une map de propriété pour chaque état :
    - valid, dirty, pristine...
    - required, pattern, ...
  
```html
<input type="text" [(ngModel])="contact.name" ngControl="name" />
```

Notes :



## Validation : Utilisation de required

- Un champ peut être rendu obligatoire
  - De manière permanente (standard HTML5) : `required`
```html
<input type="text" [(ngModel)]="name" required />
```

Notes :
A vérifier...
  - De manière conditionnelle par binding : 
```html
<input type="checkbox" [(ngModel)]="nameRequired"/>
<input [required]="nameRequired" [(ngModel)]="name">
```



## Validation : Utiliser ngForm

- Il est possible d'accéder à l'état de validation du formulaire directement depuis le template en le nommant:
```html
<form #myForm="ngForm" novalidate>
     ...
</form>
```

- La syntaxe est la suivante : #name="ngForm". On affecte l'objet gérant le formulaire dans une variable.
```html
<form #myForm="ngForm" novalidate>
    <!-- disabled button if form is invalid -->
    <button type="submit" [disabled]="!myForm.form.valid">Validate</button>
</form>
```

Notes :



## Validation : Validation des champs

- Il est possible de récupérer l'état de validation des champs depuis le formulaire
```html
<form #myForm="ngForm" novalidate>
    <input type="text" [(ngModel])="contact.name" ngControl="name" />
    <span [hidden]="!myForm.controls.name.valid">Field required</span>
</form>
```

- Ou en le nommant explicitement (la syntaxe est la même que le formulaire)
```html
<form #myForm="ngForm" novalidate>
    <input type="text" [(ngModel])="contact.name" ngControl="name" #name="ngForm" />
    <span [hidden]="!name.valid">Field required</span>
</form>
```

Notes :



## Validation : État du formulaire et des champs

- Angular2 expose 5 propriétés au niveau du formulaire et de chacun des champs de saisie
  - `valid` : Indiquent si l'élément passe le contrôle des validateurs.
  - `pristine` / `dirty` : Indiquent si l'utilisateur a altéré l'élément.
    - Un élément est considéré dirty dès qu'il subit une modification, même si la valeur initiale est restaurée ensuite.
  - `untouched` / `touched` : Indiquent si l'élément a été touché (focus).
- Les classes CSS correspondantes sont appliquées aux éléments
  - `ng-valid`, `ng-invalid`, `ng-pristine`, `ng-dirty`, `ng-untouched`, `ng-touched`

Notes :



<!-- .slide: class="page-questions" -->

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
- [Directives](#/6)
- [Injection de Dépendances](#/7)
- [Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- **[Formulaires](#/11)**
- [Server-side Rendering](#/12)

Notes :



## Stratégies de gestion des formulaires

- *Angular* fournit par défaut un module dédié à la gestion de formulaire
- Disponible via le module `FormsModule` dans `@angular/forms`
- Le module propose deux stratégies différentes
- *Template-driven forms*
  - Contrôle du formulaire depuis les templates
  - Binding automatique de variables contenant l'état du formulaire
  - *Solution recommandée et par défaut*
- *Reactive forms* (ou Model-driven forms)
  - Méthode programmatique depuis le contrôleur
  - Recommandé pour certains cas complexe
- La suite de la formation traite uniquement des *Template-driven forms*

Notes :



## Principe général

- S'appuie ou reproduit les mécanismes standards des formulaires HTML
- Supporte les types de champs de saisie habituels et les validations natives
  - `input[text]`, `input[radio]`, `input[checkbox]`, `input[email]`, `input[number]`, `input[url]`
  - `select`
  - `textarea`
  - Il est possible de créer ses propres composants
- Utiliser les fonctionnalité d'`@angular/forms` apporte
  - Le **binding** de vos données aux champs de formulaire
  - La gestion de l'état et de la validation des champs

Notes :



## "Banana in the Box"

- Le *2-way data-binding* (par défaut dans AngularJS) est désactivé par défaut
- On peut le reproduire avec les syntaxes qu'on a vu jusque là

```html
<input [value]="currentHero.firstName"
       (input)="currentHero.firstName = $event.target.value"/>
```

- *Angular* fournit du sucre syntaxique pour ce besoin récurrent

  (Utilise la directive `ngModel` qu'on verra en détail au chapitre *Formulaires*)
- Première solution

```html
<input
  [ngModel]="currentHero.firstName"
  (ngModelChange)="currentHero.firstName=$event"/>
```

- Deuxième solution *Banana in the Box*

```html
<input [(ngModel)]="currentHero.firstName"/>
```

Notes :



## Persistance des données

- Écouter l'évènement `submit` du formulaire pour traiter le formulaire

```typescript
@Component({
  selector: 'contact-form',
  template: `
    <form (submit)="saveForm()">
      <input type="text" [(ngModel)]="contact.name" name="name">
      <button type="submit">Save</button>
    </form>
  `
})
export class ContactFormComponent implements OnInit {
  contact: Contact;
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.load().subscribe(contact => this.contact = contact);
  }

  saveForm(): void {
    this.contactService.save(this.contact);
  }
}

```

Notes :



## Validation

- Par défaut, les navigateurs effectuent les validations nativement
- *Angular* reprend certaines syntaxe mais va bien plus loin
- Les mécanismes natifs vont donc rentrer en conflit avec *Angular*
- **Solution** : Désactiver la validation native et l'effectuer par Angular
- Attribut `novalidate` sur le formulaire
  - Attribut standard HTML5
  - Attribut ajouté automatiquement par *Angular*

```html
<form novalidate>
</form>
```

Notes :



## Validation

- Pour gérer la validation *Angular* va gérer un objet `AbstractControl`
  - Sur le formulaire : `FormGroup`
  - Sur chaque champ : `FormControl`
- Le `FormGroup` est une aggrégation de l'état des chacun des `FormControl`
- Un `AbstractControl` contient :
  - L'état : `dirty` / `pristine`, `valid` / `invalid`, `touched` / `untouched`
  - Les erreurs de validation dans la propriété `errors`
- Ces données sont mis à jour automatiquement
- On peut s'en servir dans les templates ou dans le contrôleur

Notes :



## État du formulaire et des champs

- Angular expose 6 propriétés dans un `AbstractControl`
  - `valid` / `invalid` : Indique si l'élément passe le contrôle des validateurs
  - `pristine` / `dirty` : Indiquent si l'utilisateur a altéré l'élément

    Un élément est considéré `dirty` dès qu'il subit une modification, même si la valeur initiale est restaurée ensuite
  - `untouched` / `touched` : Indiquent si l'élément a été touché

    Un élément est considéré `touched` dès que le focus a été pris
- La directive `NgControlStatus` (activée par défaut) gère des classes CSS

  `ng-valid`, `ng-invalid`, `ng-pristine`, `ng-dirty`, `ng-untouched`, `ng-touched`

Notes :



## FormControl

- Angular crée un `FormControl` dès l'utilisation de la directive `ngModel`
- `FormControl` permet également d'accéder à la valeur du champ via la propriété `value`
- On peut l'associer à une propriété du composant
- Nouvelle syntaxe dans le template : **Template reference variables**
- Associe une référence d'une directive à une variable du composant
- Syntaxe générique : `#myPropertyName="role"`
- Pour ngModel : `#myFormControl="ngModel"`

Notes :



## FormControl

- Exemple avec un `FormControl`

```typescript
@Component({
  selector: 'contact-form',
  template: `
    <form novalidate (submit)="saveForm()">
      <input name="name" type="text" [(ngModel)]="contact.name"
            #nameInput="ngModel" required>
      <span [hidden]="nameInput.valid">Error</span>
      <button type="submit">Save</button>
    </form>
  `
})
export class ContactFormComponent implements OnInit {
  contact: Contact;
  nameInput: FormControl;

  constructor(private contactService: ContactService) { }
  /* ... */
}
```

Notes :



## Validateurs

- Un champ peut posséder un ou plusieurs validateurs
  - Support des validateurs standards HTML5 : `required`, `min`, `max`, `minlength`, `maxlength` et `pattern`
  - Possibilité d'ajouter des validateurs personnalisés

- La propriété `valid` correspond à l'aggregation de l'état des validateurs
- Possibilité d'avoir le détail avec la propriété `errors`

```html
<input name="name" type="text" [(ngModel)]="contact.name"
      #nameInput="ngModel" required>
<span [hidden]="!nameInput.errors?.required">Name is not valid</span>
```

Notes :



## Création d'un validateur

- Pour créer validateur personnalisé, implémenter la classe `Validator`

```javascript
@Directive({
  selector: '[pattern][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PatternValidator, multi: true }
  ]
})
export class PatternValidator implements Validator {
  @Input('pattern') pattern: string;

  validate(control: AbstractControl): { [key: string]: any } {
    if (control.value && control.value.match(new RegExp(this.pattern))) {
      return null;
    }
    return { pattern: true };
  }
}
```

- Pour utiliser le validateur

```html
<input type="text" name="name" [(ngModel)]="contact.name" pattern="[a-z]{10}">
```

Notes :



## NgForm

- La directive `NgForm` est automatiquement associée à chaque balise `<form>`
- Autorise l'utilisation de l'évènement `ngSubmit`
- Créée un `FormGroup` pour gérer les inputs contenus dans le formulaire
- Instance de la directive utilisable dans le template : `#myForm="ngForm"`

```html
<form #myForm="ngForm" novalidate (submit)="onSubmit()">
  <input name="myName" type="text" [(ngModel)]="contact.name"
        #nameInput="ngModel" required>

  <span [hidden]="nameInput.valid">Error</span>

  <button type="submit" [disabled]="myForm.invalid">
    Save
  </button>
</form>
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp9" -->

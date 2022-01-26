# Forms

<!-- .slide: class="page-title" -->

Notes :



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Start an Angular application](#/3)
- [Tests](#/4)
- [Template & Components](#/5)
- [Directives](#/6)
- [Dependency Injection](#/7)
- [Pipes](#/8)
- [HTTP Service](#/9)
- [Router](#/10)
- **[Forms](#/11)**

Notes :



## Forms Management Strategies

- *Angular* provides by default a module dedicated to form management
- Available via the `FormsModule` module in `@angular/forms`
- The module proposes two different strategies
- *Template-driven forms*
  - Form control from the templates
  - Automatic Binding of Variables Containing the State of the Form
  - *Recommended and default solution*
- *Reactive forms* (or Model-driven forms)
  - Programmatic method from the controller
  - Recommended for some complex cases
- The rest of the training only deals with *Template-driven forms*

Notes :



## General principle

- Supports or replicates the standard mechanisms of HTML forms
- Supports the usual types of input fields and native validations
  - `input [text]`, `input [radio]`, `input [checkbox]`, `input [email]`, `input [number]`, `input [url]`
  - `select`
  - `textarea`
  - It is possible to create its own components
- Using the `@angular/forms` feature brings
  - The **binding** of your data to the form fields
  - The management of the state and the validation of the fields

Notes :



## "Banana in the Box"

- *2-way data-binding* is disabled by default
- We can reproduce it with the syntaxes we've seen so far

```html
<input [value]="currentHero.firstName"
       (input)="currentHero.firstName = $event.target.value" />
```

- *Angular* provides syntactic sugar for this recurring need

  (Use the `ngModel` directive which will be discussed in detail in *Forms*)

- First solution
```html
<input
  [ngModel]="currentHero.firstName"
  (ngModelChange)="currentHero.firstName = $event" />
```

- Second solution *Banana in the Box*
```html
<input [(ngModel)]="currentHero.firstName" />
```

Notes :



## Persistence of data

- Listen to the `submit` event of the form to process the form

```typescript
@Component ({
  selector: 'contact-form',
  template: `
    <form (submit)="saveForm()">
      <label> Name: <input type="text" [(ngModel)]="contact.name" name="name" /></label>
      <button type="submit"> Save </button>
    </form>
  `
})
export class ContactFormComponent implements OnInit {
  contact: Contact;

  constructor(private contactService: ContactService) {}

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

- By default, browsers perform natively validations
- *Angular* takes some syntax but goes much further
- Native mechanisms will therefore conflict with *Angular*
- **Solution**: Disable native validation and perform it by Angular
- `novalidate` attribute on the form
  - HTML5 standard attribute
  - Attribute added automatically by *Angular*

```html
<form novalidate>
</form>
```

Notes :



## Validation

- To manage the validation *Angular* will manage an object `AbstractControl`
  - On the form: `FormGroup`
  - On each field: `FormControl`
- The `FormGroup` is an aggregation of the state of each of `FormControl`
- An `AbstractControl` contains:
  - The state: `dirty`/`pristine`, `valid`/`invalid`, `touched`/`untouched`
  - Validation errors in the `errors` property
- These data are updated automatically
- It can be used in templates or in the controller

Notes :



## State of the form and fields

- Angular exposes 6 properties in an `AbstractControl`
  - `valid`/`invalid`: Indicates whether the element passes validator control
  - `pristine`/`dirty`: Indicate if the user tampered with the item

- An element is considered `dirty` as soon as it undergoes a modification, even if the initial value is restored afterwards
  - `untouched`/`touched`: Indicates if the item has been hit
  
- An element is considered `touched` as soon as the focus has been taken
  - The `NgControlStatus` directive (enabled by default) handles CSS classes

 `ng-valid`, `ng-invalid`, `ng-pristine`, `ng-dirty`, `ng-untouched`, `ng-touched`

Notes :



## FormControl

- Angular creates a `FormControl` when using the `ngModel` directive
- `FormControl` also provides access to the field value via the `value` property
- It can be associated with a property of the component
- New syntax in the template: **Template reference variables**
- Associates a reference of a directive with a component variable
- Generic syntax: `#myPropertyName="role"`
- For ngModel: `#myFormControl="ngModel"`

Notes :



## FormControl

- Example with a `FormControl`

```typescript
@Component ({
  selector: 'contact-form',
  template: `
    <form (submit)="saveForm()">
      <label> Name :
      <input name="name" type="text" required 
             [(ngModel)]="contact.name" #nameInput="ngModel"/>
      </label>
      <span [hidden]="nameInput.valid"> Error </ span>
      <button type="submit"> Save </button>
    </form>
  `
})
export class ContactFormComponent implements OnInit {
  contact: Contact = {};
  @ViewChild("nameInput") nameInput: FormControl;

  constructor(private contactService: ContactService) {}
  / *... */
}
```

Notes :



## Validators

- A field may have one or more validators
  - Support for HTML5 standard validators: `required`, `min`, `max`, `minlength`, `maxlength` and `pattern`
  - Ability to add custom validators

- The `valid` property is the aggregation of the status of the validators
- Possibility to have the detail with the `errors` property

```html
<label>
  Name:
  <input name="name" 
         type="text" [(ngModel)]="contact.name"
         required
         #nameInput="ngModel" 
         [attr.aria-invalid]="!nameInput.valid"
        />
</label>
<span [hidden]="!nameInput.errors?.['required']"> Name is not valid </span>
```

Notes :



## Creating a validator

- To create a custom validator, implement the `Validator` class

```ts
@Directive ({
  selector: '[mypattern] [ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: PatternValidator, multi: true}
  ]
})
export class PatternValidator implements Validator {
  @Input('mypattern') pattern: string;

  validate(control: AbstractControl): {[key: string]: any} {
    if (control.value && control.value.match(new RegExp (this.pattern))) {
      return null;
    }
    return {pattern: true};
  }
}
```

- To use the validator
```html
<input type="text" name="name" [(ngModel)]="contact.name" mypattern="[a-z] {10}" />
```

Notes :



## NgForm

- The `NgForm` directive is automatically associated with each `<form>` tag
- Allow use of the `ngSubmit` event
- Created a `FormGroup` to handle the inputs contained in the form
- Instance of the directive usable in the template: `#myForm="ngForm"`

```html
<form #myForm="ngForm" (submit)="onSubmit()">
  <label>
    Name:
    <input name="myName" type="text" [(ngModel)]="contact.name"
           #nameInput="ngModel" required
           [attr.aria-invalid]="!nameInput.valid"
          />
  </label>

  <span [hidden]="nameInput.valid"> Error </span>

  <button type="submit" [disabled]="myForm.invalid">
    Save
  </button>
</form>
```

Notes :



<!-- .slide: class="page-tp9" -->

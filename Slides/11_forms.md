# Forms

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Introduction](#/1)
- [Reminders](#/2)
- [Getting started with Angular](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Directives](#/6)
- [Services](#/7)
- [Pipes](#/8)
- [Http](#/9)
- [Router](#/10)
- **[Forms](#/11)**

Notes :



## Forms - Modules

Angular provides 2 different ways to handle forms

- *Template-driven forms*
  - The form is fully defined in the component *template*
  - A TypeScript representation of the form is generated and managed by Angular

- *Reactive forms*
  - The form is defined in the component *class*
  - The form fields are then linked in the component template using property bindings
  - You're responsible for ensuring the consistency of the form between the component and the template

Notes :



## Forms - Modules

Any form can be created using either of the following technique, but...

- *Template-driven forms*
  - are recommended when form structure is not fixed over time
  - example: fields are added/removed depending on a user's actions

- *Reactive forms*
  - are recommended when you need to modify the form configuration programmatically over time
  - example: changing a field validation requirement (from optional to required) depending on a user's actions

<br />

✅ The rest of this training focuses solely on *Template-driven forms*.

Notes :



## Forms - Modules

- Import the `FormsModule` in your app
- Use the provided directives like `ngModel`

```ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@NgModule({
  imports: [FormsModule],
  declarations: [AppComponent],
})
export class AppModule {}

@Component({
  selector: 'app-root',
  template: `<input ngModel />`,
})
export class AppComponent {}
```

Notes :



## Forms - Getting started

- Angular reproduces the standard mechanisms of HTML forms...

- ...and supports common input types and their native validation attributes

- So, your template looks like something familiar!

- Here's a basic HTML form example with 3 fields:
  - `name`, `email` (both required) and `message` (optional)

```html
<form>
  <input name="name" placeholder="Your name" type="text" required />

  <input name="email" placeholder="Your email" type="email" required />

  <textarea name="message" placeholder="Leave us a message (optional)"></textarea>

  <button type="submit">Submit</button>
</form>
```

Notes :



## Forms - Getting started

- In a component template, a `<form>` element defines an Angular form
  - Angular automatically adds the `ngForm` directive to it
  - So, don't add it manually!

- To register form fields like `<input />`, you need to manually add the `ngModel` directive
  - The `name` attribute is mandatory to register the field in the form

```html
<form> <!-- Under the hood, it looks like: `<form ngForm>` -->

  <input ngModel name="name" placeholder="Your name" type="text" required />

  <input ngModel name="email" placeholder="Your email" type="email" required />

  <textarea ngModel name="message" placeholder="Leave us a message (optional)"></textarea>

  <button type="submit">Submit</button>
</form>
```

Notes :



## Forms - Accessing ngForm & ngModel

- You can create template variables using the `#` symbol to access the underlying directives

```html
<form #userForm="ngForm">

  <input
    ngModel #emailModel="ngModel" name="email" placeholder="Your email" type="email" required
  />
  <!-- ... -->
</form>
```

- Here, the template variable `userForm` holds the  `NgForm` directive instance

- And the template variable `emailModel` holds the `NgModel` directive instance

**Later, you'll discover why these variables are important and how they'll be used...**

**But for now let's take a look at how the assignment of these variables works.**

Notes :



## Forms - Accessing ngForm & ngModel

- When creating a custom directive, you can define the `exportAs` metadata...

- ...and use the defined value to access the directive instance in your template

```ts
import { Directive, Component } from '@angular/core';

@Directive({ selector: 'appDoSomething' exportAs: 'doSomethingExportedName' })
export class DoSomethingDirective {}

@Component({
  selector: 'app-root',
  template: '<div appDoSomething #myDirective="doSomethingExportedName" #myDiv></div>',
})
export class AppComponent {}
```

- Here, the template variable `myDirective` holds the `DoSomethingDirective` instance

- While the template variable `myDiv` simply holds the `HTMLDivElement` instance (default)

So you've guessed that the `NgModel` directive metadata contains: `{exportAs: 'ngModel'}`

Notes :



## Forms - NgForm

Now let's take a closer look at the `NgForm` directive.

*Problem*

- By default, browsers perform natively form fields validation
- But Angular needs to take full control over this process
- Native mechanism will therefore conflict with Angular mechanism

*Solution*

- Angular disables native validation by adding `novalidate` attribute automatically
  - So, don't add it manually!

```html
<form></form> <!-- will become `<form novalidate></form>` in the DOM -->
```

Notes :



## Forms - NgForm

- Use the `ngSubmit` event to handle form submission
- Use the NgForm `.value` property to retrieve the entire form value as an object
- Use the NgForm `.invalid` (or `.valid`) property to determine the global form state

```ts
@Component({
  selector: 'app-root',
  template: `
    <form #userForm="ngForm" (ngSubmit)="submitForm(userForm.value)">

      <input ngModel name="name" required />
      <input ngModel name="email" type="email" required />
      <textarea ngModel name="message"></textarea>

      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>`,
})
export class AppComponent {
  submitForm(userFormValue: { name: string; email: string; message: string }) { /* ... */ }
}
```

Notes :



## Forms - NgForm

- By the way, you can use `@ViewChild` decorator to retrieve a template variable on the component class side!

- Here's an example where we log the `NgForm` status (`'INVALID'` or `'VALID'`) in the console:

```ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<form #userForm="ngForm"> <!-- ... --> </form>`,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('userForm') userForm!: NgForm;

  ngAfterViewInit(): void {
    this.userForm.statusChanges?.pipe(takeUntilDestroyed()).subscribe(console.log);
    // output: INVALID, ..., VALID, ... (depending on the current form state)
  }
}
```

Notes :



## Forms - NgModel

Now let's take a closer look at the `NgModel` directive.

- First use-case: `ngModel` directive lets you achieve two-way data binding easily

- Works even outside a `<form>` element (`name` attribute is not mandatory in this case)

```ts
@Component({
  selector: 'app-root',
  template: `
    <div>{{ data }}</div>

    <input [(ngModel)]="data" />

    <input [ngModel]="data" (ngModelChange)="data = $event" />

    <input #inputRef [value]="data" (input)="data = inputRef.value" />
  `,
})
export class AppComponent {
  data = '';
}
```

Notes :



## Forms - NgModel

- Second use-case: `ngModel` keeps track of the input state

- The directive adds special CSS classes to reflect that state:
  - `ng-untouched`/`ng-touched`, `ng-pristine`/`ng-dirty`, `ng-invalid`/`ng-valid`

```ts
@Component({
  selector: 'app-root',
  template: `
    <!-- 1. Initial state -->
    <input required ngModel class="ng-untouched ng-pristine ng-invalid" />
  
    <!-- 2. After the user has entered and leaved the input (without modification) -->
    <input required ngModel class="ng-touched ng-pristine ng-invalid" />
  
    <!-- 3. After the user has modified the input value -->
    <input required ngModel class="ng-touched ng-dirty ng-valid" />
  `,
  styles: [`.ng-valid{ color: green; }   .ng-touched.ng-invalid{ color: red; }`],
})
export class AppComponent {}
```

Notes :



## Forms - NgModel

- You can also define your own CSS classes and bind them using the `NgModel` properties:
  - `untouched`/`touched`, `pristine`/`dirty`, `invalid`/`valid`

```ts
@Component({
  selector: 'app-root',
  template: `
    <input
      required

      ngModel
      #model="ngModel"

      [class.is-valid]="model.valid"
      [class.is-invalid]="model.touched && model.invalid"
    />
  `,
  styles: [`.is-valid { color: green; }   .is-invalid { color: red; }`],
})
export class AppComponent {}
```

Notes :
Typically, the field is marked invalid only if both "touched" and "invalid".



## Forms - Validators

- A form field may have one or more validators

- As we said, Angular supports all HTML5 standard validators:
  - `required`, `minlength`, `maxlength`, `min`, `max`, `type` and `pattern`

- But you can create custom validators too
  - We'll come back to this later...

Notes :



## Forms - Validators

- Use the `.errors` property on the `NgModel` directive the track the validation errors

- Here's an example with a form field that is *required* and must be a *valid email*

```html
<input name="email" ngModel #emailModel="ngModel" required type="email" />

"{{ emailModel.errors | json }}"

<!--
  Depending on the field value, output might be:
    - "null"
    - "{ required: true }"
    - "{ email: true }"
-->
```

Notes :



## Forms - Validators

- Use the `.hasError` method on the `NgModel` directive to check the presence of a particular error:

```html
<input name="email" ngModel #emailModel="ngModel" required type="email" />

<span *ngIf="emailModel.hasError('required')" style="color:red">
  The email is required
</span>

<span *ngIf="emailModel.hasError('email')" style="color:red">
  The given email is not valid
</span>
```

Notes :



## Forms - Validators | Custom 1/2

- To create a custom validator, you need a directive that implements the `Validator` interface:

```ts
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appStartWith][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: StartWithValidator, multi: true }],
})
export class StartWithValidator implements Validator {
  @Input({ required: true }) appStartWith!: string;

  validate(control: AbstractControl) {
    if (typeof control.value !== 'string' || !control.value.startsWith(this.appStartWith)) {
      return { startWith: this.appStartWith };
    }
    return null;
  }
}
```

Notes :



## Forms - Validators | Custom 2/2

- Here's an example of how to use this custom validator:

```html
<input ngModel #model="ngModel" appStartWith="hello" />

<span *ngIf="model.errors?.['startWith'] as expectedValue" style="color:red">
  The value should start with: {{ expectedValue }}.
</span>
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp9" -->

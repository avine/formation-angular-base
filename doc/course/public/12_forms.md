# Forms

<!-- .slide: class="page-title" -->



## Summary

<div class="col-left-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)

</div>
<div class="col-right-50">

- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- **Forms**
- [Appendix](#/14)

</div>

Notes :



## Forms - Modules 1/3

Angular provides 2 different ways to handle forms

- **Template-driven forms**
  - the form is fully defined in the component *template*
  - a TypeScript representation of the form is generated and managed by Angular

- **Reactive forms**
  - the form is defined in the component *class*
  - the form fields are then linked in the component template using property bindings
  - you're responsible for ensuring the consistency of the form between the component and the template

Notes :



## Forms - Modules 2/3

Any form can be created using either of the following technique, but...

- **Template-driven forms**
  - are recommended when form structure is not fixed over time
  - example: fields are added/removed depending on a user's actions

- **Reactive forms**
  - are recommended when you need to modify the form configuration programmatically over time
  - example: changing a field validation requirement (from optional to required) depending on a user's actions

<br />

✅ The rest of this training focuses solely on Template-driven forms

Notes :



## Forms - Modules 3/3

- Import the `FormsModule` in your components
- Use the available directives such as `ngModel`

```ts
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <input ngModel />
  `,
})
export class AppComponent {}
```

- Under the hood, the `ngModel` directive tracks the **value**, user **interaction**, and **validation status** of the control element (such as an `<input />`) to which it is attached

Notes :



## Forms - Getting started 1/2

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



## Forms - Getting started 2/2

- In a component template, a `<form>` element defines an Angular form
  - Angular automatically adds the `ngForm` directive to it
  - so, don't add it manually!

- To register form fields such as `<input />`, you need to manually add the `ngModel` directive
  - the `name` attribute is mandatory to register the field in the form

```html
<form> <!-- Under the hood, it looks like: `<form ngForm>` -->

  <input ngModel name="name" placeholder="Your name" type="text" required />

  <input ngModel name="email" placeholder="Your email" type="email" required />

  <textarea ngModel name="message" placeholder="Leave us a message (optional)"></textarea>

  <button type="submit">Submit</button>
</form>
```

Notes :



## Forms - Accessing ngForm & ngModel 1/2

- You can create template reference variables using the `#` symbol to access the underlying directives

```html
<form #userForm="ngForm">

  <input #emailModel="ngModel" ngModel name="email" />

</form>
```

- Here, the template variable `userForm` holds the  `NgForm` directive instance

- And the template variable `emailModel` holds the `NgModel` directive instance

These variables are very important and we will be using them throughout this chapter

😉 *But for now, let's look at where the names of the values `xyz="ngForm"` and `xyz="ngModel"` come from...*

Notes :



## Forms - Accessing ngForm & ngModel 2/2

When creating a custom directive, you can define the `exportAs` metadata and use the defined value to access the directive instance in your template

```ts
import { Directive, Component } from '@angular/core';

@Directive({ selector: 'appHello' exportAs: 'helloExportedName' })
export class HelloDirective {}

@Component({
  selector: 'app-root',
  imports: [HelloDirective],
  template: '<div appHello #myDirective="helloExportedName" #myDiv></div>',
})
export class AppComponent {}
```

- Here, the template variable `myDirective` holds the `HelloDirective` instance

- While the template variable `myDiv` simply holds the `HTMLDivElement` instance (default)

😉 *...so you've guessed that the `NgModel` directive metadata contains: `{exportAs: 'ngModel'}`*

Notes :



## Forms - NgModel 1/4

Let's take a closer look at the `NgModel` directive

- Works even outside a `<form>` element (`name` attribute is not mandatory in this case)

- Provides access to several **properties** reflecting the **state of the form field**
  - `untouched`/`touched`, `pristine`/`dirty`, `valid`/`invalid`

```ts
@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <input required ngModel #model="ngModel" />

    <p>The field is {{ model.valid ? 'valid' : 'invalid' }}.</p>
  `,
})
export class AppComponent {}
```

Notes :



## Forms - NgModel 2/4

- Adds special **CSS classes** that reflect the state of the form field
  - `ng-untouched`/`ng-touched`, `ng-pristine`/`ng-dirty`, `ng-valid`/`ng-invalid`

```ts
@Component({
  selector: 'app-root',
  imports: [FormsModule],
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



## Forms - NgModel 3/4

- You can also define **your own CSS classes** and bind them using the `NgModel` properties

```ts
@Component({
  selector: 'app-root',
  imports: [FormsModule],
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



## Forms - NgModel 4/4

- Lets you achieve **two-way data binding** easily

```ts
@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <div>{{ data }}</div>

    <input [(ngModel)]="data" />

    <input [ngModel]="data" (ngModelChange)="data = $event" />

    <input #inputRef [value]="data" (input)="data = inputRef.value" />
  `,
})
export class AppComponent { data = ''; }
```

Notes :



## Forms - NgForm 1/2

Now let's take a closer look at the `NgForm` directive

**Problem**

- By default, browsers perform natively form fields validation
- But Angular needs to take full control over this process
- Native mechanism will therefore conflict with Angular mechanism

**Solution**

- Angular disables native validation by adding `novalidate` attribute automatically
  - so, don't add it manually!

```html
<form></form> <!-- will become `<form novalidate></form>` in the DOM -->
```

Notes :



## Forms - NgForm 2/2

- Use the `ngSubmit` event to handle form submission
- Use the NgForm `.value` property to retrieve the entire form value as an object
- Use the NgForm `.invalid` (or `.valid`) property to determine the global form state

```ts
@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template:
    `<form #userForm="ngForm" (ngSubmit)="submitForm(userForm.value)">

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



## Forms - Validators 1/3

- A form field may have one or more validators

- As we said, Angular supports all HTML5 standard validators:
  - `required`, `minlength`, `maxlength`, `min`, `max`, `type` and `pattern`

- But you can create custom validators too
  - we'll come back to this later...

Notes :



## Forms - Validators 2/3

- Use the `.errors` property on the `NgModel` directive the track the validation errors

- Here's an example with a form field that is *required* and must be a *valid email*

```html
<input ngModel #emailModel="ngModel" required type="email" />

"{{ emailModel.errors | json }}"

<!--
  Depending on the field value, output might be:
    - "null"
    - "{ required: true }"
    - "{ email: true }"
-->
```

Notes :



## Forms - Validators 3/3

- Use the `.hasError` method on the `NgModel` directive to check the presence of a particular error

```html
<input ngModel #emailModel="ngModel" required type="email" />

@if (emailModel.hasError('required')) {

  <span style="color:red">
    The email is required.
  </span>

} @else if (emailModel.hasError('email')) {

  <span style="color:red">
    The given email is not valid.
  </span>

}
```

Notes :



## Forms - Validators | Custom 1/2

- To create a custom validator, you need a `Directive` that implements the `Validator` interface

```ts
import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appStartWith][ngModel]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: StartWithDirective, multi: true 
  }],
})
export class StartWithDirective implements Validator {
  startWith = input.required<string>({ alias: 'appStartWith' });

  validate(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value !== 'string' || !control.value.startsWith(this.startWith())) {
      return { startWith: this.startWith() };   // <-- raise a validation error
    }
    return null;                                // <-- no error
  }
}
```

Notes :



## Forms - Validators | Custom 2/2

- Here's an example of how to use this custom validator

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StartWithDirective } from './starts-with.directive';

@Component({
  selector: 'app-root',
  imports: [FormsModule, StartWithDirective],
  template: `
    <form>
      <input name="example" ngModel #model="ngModel" appStartWith="xyz" />

      @if (model.getError('startWith'); as expectedValue) {
        <span style="color: red">
          The value should start with: {{ expectedValue }}.
        </span>
      }
    </form>`,
})
export class AppComponent {}
```

Notes :



## Forms - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->



## Forms - Lab 12
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->

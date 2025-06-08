# Technical prerequisites

<!-- .slide: class="page-title" -->



## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- **Technical prerequisites**
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)

</div>
<div class="column-50">

- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>
</div>

Notes :



## Typescript - Types 1/2

- Two ways to define variables: `const` and `let`

- Type examples: `boolean`, `number`

```ts
const alwaysTrue: boolean = true;

let age: number = 32;
age = 33;
age = 'Carl';           // ❌ Type 'string' is not assignable to type 'number'
```

- Type inference: used to provide type information when there is no explicit type annotation

```ts
const alwaysTrue = true; // is still of type `boolean`

let age = 32;            // is still of type `number`
age = 33;
age = 'Carl';           // ❌ is still throwing the same Type error
```

Notes :



## Typescript - Types 2/2

- More type examples: `string`, `array`, `object`

```ts
const name: string = 'Carl';

const nameList: string[] = ['Carl', 'Laurent'];

const products: { title: string; price: number } = { title: 'Tee-shirt', price: 8.5 };
```

- Type `any` may be necessary in some cases, but should be avoided wherever possible

```ts
let notSure: any = 4;
notSure = true;
```

Notes :



## Typescript - Functions 1/2

- 3 types of functions: ***named***, ***anonymous*** and ***arrow***

```ts
function sayHello(message: string): void { /* ... */ }

const sayHello = function(message: string): void { /* ... */ };

const sayHello = (message: string): void => { /* ... */ };
```

*⚠️ Note that the arrow functions treat the resolution of the `this` keyword differently, but this is beyond the scope of this training*

Notes :



## Typescript - Functions 2/2

- TypeScript allows typing for arguments and return value
  - Set **default** argument value with `=`
  - Define **optional** argument with `?`
  - Use `return` keyword to return a value

```ts
function getFullName(lastName = 'Doe', firstName?: string): string {

  return firstName ? `${firstName} ${lastName}` : lastName;
}
```

Notes :
Default value parameter have their value replaced only when equals to undefined (null is a valid value)



## Typescript - Classes 1/4

*Classes and interfaces are similar to those in Object Oriented Programming (OOP)*

- Classes are composed of one **constructor**, **properties** and **methods**
- Explicitly defining a constructor is optional
- Properties and methods are accessible with `this` keyword

```ts
class Person {
  name = '';

  constructor() {} // this is optional

  sayHello() {
    console.log(`Hello, I'm ${this.name}!`);
  }
}

const person = new Person();
person.name = 'Carl';
person.sayHello(); // --> Hello, I'm Carl!
```

Notes :



## Typescript - Classes 2/4

- 3 scopes for encapsulation: `public`, `protected` and `private`
  - `public` is the default scope
  - private scope alternative: using standard JavaScript private field (using hash `#` prefix)

```ts
class Demo {
  prop1 = 1;
  protected prop2 = true;
  private prop3 = 'Secret';

  #prop4 = 'Big secret'; // <-- standard JavaScript private field

  method1() {}
  protected method1() {}
  private method3() {}

  #method4() {} // <-- standard JavaScript private field
}
```

Notes :



## Typescript - Classes 3/4

- TypeScript provides a shortcut to **link constructor arguments to class properties**

The following shortcut...

```ts
class Person {
  constructor(public firstName: string) {}
}
```

...is equivalent to

```ts
class Person {
  public firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}
```

Notes :



## Typescript - Classes 4/4

- Possibility to have "**getter**" and "**setter**"

```ts
class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value: string): void {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person = new Person('John', 'Doe');
console.log(person.fullName); // --> John Doe

person.fullName = 'Jean Dupont';
console.log(person.firstName); // --> Jean
console.log(person.lastName); // --> Dupont
```

Notes :



## Typescript - Interfaces

- Can be used to define object shape

```ts
interface Person {
  name: string;
  age: number;
}

const person: Person = { name: 'John Doe', age: 33 };
```

- Can be used on classes with the `implements` keyword

```ts
interface Musician {
  play(): void;
}

class TrumpetPlayer implements Musician {
  play(): void {
    console.log('I play trumpet!');
  }
}
```

Notes :



## Typescript - Generics

- Similar to generics in *Java* or *C#*
- Generics need typing at instantiation

```ts
class Log<T> {
  log(value: T) {
    console.log(value);
  }
}

const logOfNumber = new Log<number>();
logOfNumber.log(5);
logOfNumber.log(6);


const logOfString = new Log<string>();
logOfString.log('Hello');
logOfString.log('world!');
```

Notes :



## TypeScript - Decorators

- A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter 

- Decorators can be used to **observe**, **modify** or **replace** the value to which they are applied

- Decorators use the form `@expression`, where `expression` must evaluate to a **function** that will be **called at runtime** with information about the decorated declaration

```ts
function MyClassDecorator(/* ... */) { /* ... */ }

function MyMethodDecorator(/* ... */) { /* ... */ }

@MyClassDecorator
class Foo {

  @MyMethodDecorator
  bar() {}
}
```

Notes :



## NPM - Commands 1/2

- Set up a directory as an npm package by creating a `package.json` file<br />
  *(created automatically when you generates your application with the Angular CLI)*

```bash
npm init
```

- Download a package and install it in `./node_modules` directory

```bash
npm install <packageName>
```

- Install a package globally on your system<br />
  *(mostly used to install CLI tools such as the Angular CLI)*

```bash
npm install -g <packageName>
```

Notes :



## NPM - Commands 2/2

- Update a package

```bash
npm update <packageName>
```

- Remove a package

```bash
npm remove <packageName>
```

Notes :



## NPM - Package versioning 1/2

Package versions generally follow the [semver](https://github.com/isaacs/node-semver) (semantic versioning) standard

```json
{
  "name": "<packageName>",
  "version": "<major>.<minor>.<patch>"
}
```

- `major`: might introduce breaking changes
- `minor`: can add new features but in a retro-compatible way
- `patch`: bug fixes

Example: 

```json
{
  "name": "my-awesome-package",
  "version": "1.2.3"
}
```

Notes :



## NPM - Package versioning 2/2

Allowing a range of versions when **installing** or **updating** a package

- **`1.2.3`** will install the **exact** version
- **`~1.2.3`** will install any **patch** update such as 
  - `1.2.4`
  - `1.2.5`
  - `1.2.99`
- **`^1.2.3`** will install any **minor** update such as 
  - `1.2.3`
  - `1.3.0`
  - `1.99.0`

For a given dependency, the exact version installed is locked in the `package-lock.json` configuration file

Notes :



## NPM - Angular package versioning

Angular package versions strongly follow the semver standard

- Most of the framework dependencies accepts **minor** updates such as
  - `"@angular/core": "^XX.0.0"`
  - `"@angular/common": "^XX.0.0"`

- Some of them only accepts **patch** updates such as
  - `"@angular/cli": "~XX.0.0"`

To update the Angular package versions of your project use the command `ng update`

**In-depth resources:**

- [Angular update guide](https://angular.dev/update-guide)
- [Angular version compatibility (with Node.js, TypeScript, ...)](https://angular.dev/reference/versions)

Notes :



## Technical prerequisites - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

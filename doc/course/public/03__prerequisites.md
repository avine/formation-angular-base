# Technical prerequisites

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

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
- [Dependency injection](#/9)
- [Pipes](#/10)
- [Http client](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>
</div>

<!-- separator-vertical -->

## TypeScript - Types 1/3

- Type examples: `boolean`, `number`

```ts
const alwaysTrue: boolean = true;

let age: number = 32;
age = 33;
age = 'Carl';           // ❌ Type 'string' is not assignable to type 'number'
```

- **Type inference:** used to provide type information when there is no explicit type annotation

```ts
const alwaysTrue = true; // is still of type `boolean`

let age = 32;            // is still of type `number`
age = 33;
age = 'Carl';           // ❌ is still throwing the same Type error
```

_😉 Note that `const` and `let` are two different ways of defining variables_

<!-- separator-vertical -->

## TypeScript - Types 2/3

- More type examples: `string`, `template string`, `array`, `object`

```ts
const name: string = 'Carl';

const hello: string = `Hello ${name}!`;

const nameList: string[] = ['Carl', 'Laurent'];

const products: { title: string; price: number } = { title: 'Tee-shirt', price: 8.5 };
```

<!-- separator-vertical -->

## TypeScript - Types 3/3

- Type `any` may be necessary in some cases, but **should be avoided** wherever possible...

```ts
let notSure: any = 4;
notSure = true;
```

- ...instead, use type `unknown` whenever possible

```ts
let x: unknown = 1;

if (typeof x === 'number') {
  x = x * 2;                  // <-- In this scope, TypeScript infers that `x` is of type `number`
}

if (typeof x === 'string') {
  x = x + '...';              // <-- In this scope, TypeScript infers that `x` is of type `string`
}
```

<!-- separator-vertical -->

## TypeScript - Functions 1/3

- **Function declaration** (or statement)

```ts
function clickHandler() {
  console.log('Clicked!');
}

document.addEventListener('click', clickHandler);

clickHandler(); // ✅ The function has been declared and can therefore be referenced
```

- **Function expression**

```ts
document.addEventListener('click', function clickHandler() {  // <-- can be a "named" function...
  console.log('Clicked!');
});

clickHandler(); // ❌ Uncaught ReferenceError: `clickHandler` is not defined

document.addEventListener('click', function() {               // <-- ...or even an "anonymous" function
  console.log('Clicked!');
});
```

<!-- separator-vertical -->

## TypeScript - Functions 2/3

- **Arrow function expression**

```ts
document.addEventListener('click', () => {                    // <-- is always "anonymous" function
  console.log('Clicked!');
});
```

*⚠️ Note that arrow functions do not treat the keyword `this` in the same way as functions defined with the keyword `function`, but this is beyond the scope of this course*

- **In-depth resource:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

<!-- separator-vertical -->

## TypeScript - Functions 3/3

- TypeScript allows typing for function arguments and return value
  - Set **default** argument value with "`=`"
  - Define **optional** argument with "`?`"
  - Use "`return`" keyword to return a value

```ts
function getFullName(lastName = 'Doe', firstName?: string): string {
  return firstName ? `${firstName} ${lastName}` : lastName;
}
```

- Arrow functions can be used without "`return`" keyword and still return a value

```ts
const sayHello = (name: string) => {
  return `Hello ${name}!`;
} 

const sayHello = (name: string) => `Hello ${name}!`;    // <-- Same as above, but shorter!
```

<!-- separator-vertical -->

## TypeScript - Destructuring syntax

Makes it possible to unpack values from **arrays**, or properties from **objects**, into distinct variables

- Destructuring array

```ts
const [a, b, ...rest] = [10, 20, 30, 40];

// a == 10
// b == 20
// rest == [30, 40]
```

- Destructuring object

```ts
const { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };

// a == 10
// b == 20
// rest == { c: 30, d: 40 }
```

<!-- separator-vertical -->

## TypeScript - Spread syntax

- "Expands" an **array** or **object** into its elements

- In a way, spread syntax is the **opposite of rest syntax** (that we saw just above)

```ts
const sum = (a: number, b: number) => a + b;
sum(1, 2);                                      // <-- 3

const args = [1, 2];
sum(...args);                                   // <-- 3
```

```ts
const arr = [1, 2, 3];
const arrCopy = [...arr];

console.log(arr !== arrCopy);                   // <-- true
```

```ts
const obj = { a: 1, b: 2 };
const objCopy = { ...obj };

console.log(obj !== objCopy);                   // <-- true
```

<!-- separator-vertical -->

## TypeScript - Array instance methods

Arrays can be manipulated using methods such as the following

- Some methods are **destructive**...

```ts
[2, 0, 3, 1].sort();                                    // --> [0, 1, 2, 3]

[2, 0, 3, 1].sort((a, b) => b - a);                     // --> [3, 2, 1, 0]
```

- ...while others are **non-destructive**

```ts
[0, 1, 2, 3].map((value) => value * 10);                // --> [0, 10, 20, 30]

[0, 1, 2, 3].filter((value) => value % 2);              // --> [1, 3]

[0, 1, 2, 3].reduce((sum, value) => sum + value, 0);    // --> 6
```

<!-- separator-vertical -->

## TypeScript - Adding item to an Array

There are 2 ways of adding an element to an array

- In a **mutable** way...

```ts
const items = [0, 1, 2, 3];

items.push(4);

console.log(items);                                     // --> [0, 1, 2, 3, 4]
```

- ...in an **immutable** way

```ts
const items = [0, 1, 2, 3];

const newItems = [...items, 4];

console.log(newItems);                                  // --> [0, 1, 2, 3, 4]
```

_😉 Treating a value as immutable means prohibiting any modification to it after its creation._<br />
_Immutability is an important concept in functional programming and state management._

<!-- separator-vertical -->

## TypeScript - Classes 1/4

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

<!-- separator-vertical -->

## TypeScript - Classes 2/4

- 3 scopes for encapsulation: `public`, `protected` and `private`
  - `public` is the default scope
  - private scope alternative: using standard JavaScript private field (with the hash prefix `#`)

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

<!-- separator-vertical -->

## TypeScript - Classes 3/4

- Possibility to have "**getter**" and "**setter**"

```ts
class Person {
  public firstName: string;
  public lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value: string) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

// ...
```

<!-- separator-vertical -->

## TypeScript - Classes 4/4


```ts
// ...

const person = new Person('John', 'Doe');

// Calling the "getter" function
console.log(person.fullName);       // --> John Doe

// Calling the "setter" function
person.fullName = 'Jean Dupont';

console.log(person.firstName);      // --> Jean
console.log(person.lastName);       // --> Dupont
```

<!-- separator-vertical -->

## TypeScript - Interfaces

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

<!-- separator-vertical -->

## TypeScript - Generics

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

<!-- separator-vertical -->

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

<!-- separator-vertical -->

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

<!-- separator-vertical -->

## NPM - Commands 2/2

- Update a package

```bash
npm update <packageName>
```

- Remove a package

```bash
npm remove <packageName>
```

<!-- separator-vertical -->

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

<!-- separator-vertical -->

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

<!-- separator-vertical -->

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

<!-- separator-vertical -->

## Technical prerequisites - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

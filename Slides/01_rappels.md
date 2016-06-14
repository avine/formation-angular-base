# Rappels

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- **[Rappels](#/1)**
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)
- [Angular2 en EcmaScript 5](#/14)

Notes :



## Introduction

<img src="ressources/typescript-logo.png" height="300">

- Langage créé par *Anders Hejlsberg* en 2012
- Projet open-source maintenu par *Microsoft* (Version actuelle *1.8*)
- Influencé par *JavaScript*, *Java* et *C#*
- Alternatives : CoffeeScript, Dart, Haxe ou Flow

Notes :



## Introduction

- Phase de compilation nécessaire pour générer du *JavaScript*
- Ajout de nouvelles fonctionnalités au langage *JavaScript*
- Support d'ES3 / ES5 / ES2015
- Certaines fonctionnalités n'ont aucun impact sur le JavaScript généré
- Tout programme *JavaScript* est un programme *TypeScript*

<img src="ressources/typescript-javascript.png" height="300">

Notes :



## TypeScript - Fonctionnalités

- Typage
- Génériques
- Classes / Interfaces  / Héritage
- Développement modulaire
- Les fichiers de définitions
- Mixins
- Décorateurs
- Fonctionnalités *ES2015*

Notes :



## Types primitifs

- Pour déclarer une variable :

```typescript
var variableName: variableType = value;
let variableName2: variableType = value;
const variableName3: variableType = value;
```

- boolean : `var isDone: boolean = false;`
- number : `var height: number = 6;`
- string : `var name: string = 'Carl';`
- array : `var names: string[] = ['Carl', 'Laurent'];`
- any : `var notSure: any = 4;`

Notes :



## Fonctions

- Comme en JavaScript, possibilité de créer des fonctions nommées ou anonymes

```typescript
//Fonction nommée
function  namedFunction():void { }

//Fonction anonyme
var variableAnonymousFunction = function(): void { }
```

- Peut retourner une valeur grâce au mot clé `return`
- Accès aux variables définies en dehors du scope de la fonction

```typescript
var externalScope:number = 10;

function add(localArg: number): number { return localArg + externalScope; }
```

Notes :



## Fonctions - Paramètres (Optionels)

- Une fonction peut prendre des paramètres

```typescript
function fn(name: string, forename: string) { }
```

- Un paramètre peut être optionel
  - utilisation du caractère `?`
  - ordre de définition très important
  - aucune implication dans le code JavaScript généré
  - si pas défini, le paramètre aura la valeur `undefined`

```typescript
function fn(name: string, forename?: string) { }
```

Notes :



## Fonctions - Surcharge

- Une fonction peut retourner un type différent en fonction des paramètres
- Permet d'indiquer au compilateur TypeScript quel est le type retourné en fonction des paramètres passés

```typescript
function fn(param: string): number;
function fn(param: number): string;
function fn(param: any): any {
  if (typeof x === "number") {

  } else {

  }
}
```

Notes :



## Arrays

- Permet de manipuler un tableau d'objet

- 2 syntaxes pour créer des tableaux
  - Syntaxe Litérale

```typescript
var list: number[] = [1, 2, 3];
```

  - Syntaxe utilisant le constructeur `Array`

```typescript
var list: Array<number> = [1, 2, 3];
```

- Ces 2 syntaxes aboutiront au même code JavaScript

Notes :



## Type Enum

- Possibilité de définir un type pour expliciter un ensemble de données numériques

```typescript
enum Music { Rock, Jazz, Blues };

var c: Music = Music.Jazz;
```

- La valeur numérique commence par défaut à `0`
- Possibilité de surcharger les valeurs numériques

```typescript
enum Music { Rock = 2, Jazz = 4, Blues = 8 };

var c: Music = Music.Jazz;
```

- Récupération de la chaîne de caractère associés à la valeur numérique

```typescript
var style: string = Music[4]; //Jazz
```

Notes :



## Classes

- Système de *classes* et *interfaces* similaire à la programmation orientée objet
- Le code javascript généré utilisera le système de `prototype`
- Possibilité de définir un constructeur, des méthodes et des propriétés
- Propriétés/méthodes acccessibles via l'objet `this`

```typescript
class Person {
   constructor() {}
}

var person = new Person();
```

Notes :



## Classes - Méthodes

- Méthodes ajoutées au `prototype` de l'objet

- Version TypeScript

```typescript
class Person {
   constructor() {}

   sayHello(message: string) { }
}
```

- Version JavaScript

```javascript
var Person = (function () {
    function Person() { }
    Person.prototype.sayHello = function (message) { };
    return Person;
})();
```

Notes :



## Classes - Propriétés

- Trois scopes disponibles : `public`, `private` et `protected`
- Utilise le scope `public` par défaut
- Scope `protected` apparu en TypeScript 1.3
- Propriétés ajoutées sur l'objet en cours d'instanciation (`this`)
- Possibilité de définir des propriétés statiques (`static`)
  - Tous les types supportés : types primitifs, fonctions, ...
  - Propriété ajoutée au constructeur de l'objet

Notes :




## Classes - Propriétés

- Version TypeScript

```typescript
class Person {
   firstName: string;
   constructor(firstName: string){
	   this.firstName = firstName;
   }
}
```

- Version JavaScript

```javascript
var Person = (function () {
    function Person(firstName) {
        this.firstName = firstName;
    }
    return Person;
})();
```

Notes :



## Classes - Propriétés

- Seconde version pour initialiser des propriétés
- Version TypeScript

```typescript
class Person {
   constructor(public firstName: string) { }
}
```

- Version JavaScript

```javascript
var Person = (function () {
    function Person(firstName) {
        this.firstName = firstName;
    }
    return Person;
})();
```

Notes :



## Classes - Accesseurs

- Possibilité de définir des accesseurs pour accéder à une propriété
- Utiliser les mots clé *get* et *set*
- Attention à l'espacement apres les mots clé
- Nécessité de générer du code JavaScript compatible ES5
- Le code JavaScript généré utilisera `Object.defineProperty`

```typescript
class Person {
   private _secret: string;
   get secret(): string{
      return this._secret;
   }
   set secret(value: string) {
      this._secret = value;
   }
}
```

Notes :



## Classes - Héritage

- Système d'héritage entre classes via le mot clé `extends`
- Si constructeur non défini, exécute celui de la classe parente
- Possibilité d'appeler l'implémentation de la classe parente via `super`
- Accès aux propriétés de la classe parente si `public` ou `protected`

```typescript
class Person {
   constructor() {}
   speak() {}
 }

class Child extends Person {
 constructor() { super() }
 speak() { super.speak(); }
}
```

Notes :



## Interfaces

- Utilisée par le compilateur pour vérifier la cohérence des différents objets
- Aucun impact sur le JavaScript généré
- Système d'héritage entre interfaces
- Plusieurs cas d'utilisation possible
  - Vérification des paramètres d'une fonction
  - Vérification de la signature d'une fonction
  - Vérification de l'implémentation d'une classe

Notes :



## Interfaces - Implémentation d'une classe

- Cas d'utilisation le plus connu des interfaces
- Vérification de l'implémentation d'une classe
- Erreur de compilation tant que la classe ne respecte pas le contrat défini par l'interface

```typescript
interface Musician {
	play(): void;
}

class TrumpetPlay implements Musician {
	play() {}
}
```

Notes :



## Génériques

- Fonctionnalité permettant de créer des composants réutilisables
- Inspiration des génériques disponibles en Java ou C#
- Nécessité de définir un (ou plusieurs) paramètre de type sur la fonction/variable/classe/interface générique

```typescript
function identity<T>(arg: T): T {
    return arg;
}

identity(5).toFixed(2); // Correct

identity('hello').toFixed(2); // Incorrect

identity(true);
```

Notes :



## Génériques

- Possibilité de définir une classe générique
- Définition d'une liste de paramètres de type de manière globale

```typescript
class Log<T> {
    log(value: T) {
        console.log(value);
    }
}

var numericLog = new Log<number>();

numericLog.log(5); // Correct
numericLog.log('hello'); // Incorrect
```

Notes :



## NPM

- Node inclut un système de gestion des paquets : *npm*
- Il existe pratiquement depuis la création de Node.js
- C'est un canal important pour la diffusion des modules

![npm](ressources/npm-logo.png "npm")

Notes :



## npm install

- `npm` est un outil en ligne de commande (écrit avec Node.js)
- Il permet de télécharger les modules disponibles sur [npmjs.org](npmjs.org)
- Les commandes les plus courantes :
  - `install` : télécharge le module et le place dans le répertoire courant dans `./node_modules`
  - `install -g` : installation globale, le module est placé dans le répertoire d'installation de Node.js

    Permet de rendre accessible des commandes
  - `update` : met à jour un module déjà installé
  - `remove` : supprime le module du projet

Notes :



## npm init

- `npm` gère également la description du projet
- Un module Node.js est un (ou plusieurs) script(s)
- Le fichier de configuration se nomme `package.json`
- `npm` permet également de manipuler le module courant
  - `init` : initialise un fichier `package.json`
  - `docs` : génère la documentation du module en cours
  - `install --save` ou `--save-dev` :

    Comme install mais référence automatiquement la dépendance dans le `package.json`

Notes :



## package.json

- `npm` se base sur un fichier descripteur du projet
- `package.json` décrit précisément le module
- On y trouve différents types d'information
  - Identification
    - `name` : l'identifiant du module (unique, url safe)
    - `version` : doit respecter [node-semver](https://github.com/isaacs/node-semver)
  - Description : `description`, `authors`, ...
  - Dépendances : `dependencies`, `devDependencies`, ...
  - Cycle de vie : scripts `main`, `test`, ...

Notes :
- le nom sera généralement utilisé par require, rester court, tout en étant descriptif
- vérifier si un nom est déjà utilisé par un autre package dans http://registry.npmjs.org/
- le nom est utilisé en fin d'url du module, ne pas utiliser les caractères suivants :
  - ne pas démarrer par un point `.` ou un underscore `_`
  - des caractères non-url-safe
- la version doit être `semver` (Semantic Versioning)
  - Majeure, mineure et patch doivent être numérique
  - il est possible d'y adjoindre un complément informatif (date, numéro de build, ...) qui `ne servira pas` pour le filtrage
  - il existe un outils `semver` permettant de vérifier les contraintes de version



## package.json : dépendances

- `dependencies`

  La liste des dépendances nécessaires à l’exécution

- `devDependencies`

  Les dépendances pour les développements (build, test...)

- `peerDependencies`

  Les dépendances nécessaires au bon fonctionnement du module, mais pas installées lors d'un `npm install`

- `optionalDependencies` **(rare)**

  Des dépendances qui ne sont pas indispensables à l'utilisation du module, prend en compte que la récupération peut échouer

- `bundledDependencies` **(rare)**

  Des dépendances qui sont publiées et livrées avec le module

Notes :
- files : liste de fichiers sauf .npmignore
- bundledDependencies ou bundleDependencies



## package.json : versions

- Les modules doivent suivre la norme [semver](https://www.npmjs.org/doc/misc/semver.html)
  - Structure : `MAJOR.MINOR.PATCH`
  - `MAJOR` : Changements d'API incompatibles
  - `MINOR` : Ajout de fonctionnalité rétro-compatible
  - `PATCH` : Correction de bugs
- Pour spécifier la version d'une dépendance
  - `version` : doit être exactement cette version
  - `~`, `^` : approximativement, compatible
  - `major.minor.x` : `x` fait office de joker
  - [Et bien d'autres](https://www.npmjs.org/doc/misc/semver.html#ranges) : `>`, `<`, `>=`, `min-max`...

Notes :
- \* : n'importe quelle version (dangereux)
- Il est possible de donner une URL, un chemin ou un repository git en version
- vous pouvez conjuguer les `et` et `ou` pour définir des plages de versions complexes



## Publier un module npm

- Il est bien sûr conseillé de suivre toutes les bonnes pratiques
  - Utiliser la numérotation recommandée
  - Avoir des tests unitaires
  - Avoir un minimum d'informations dans le `package.json`
- Il n'y a pas d'autorité de validation
- Il faut par contre trouver un nom disponible
- La suite nécessite seulement la commande `npm`
  - `npm adduser` : enregistrer son compte
  - `npm publish` : uploader un module sur [npmjs.org](https://www.npmjs.org/)

Notes :



<!-- .slide: class="page-questions" -->

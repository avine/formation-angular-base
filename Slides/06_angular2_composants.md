# Les composants<br>Angular2

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->
n
- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- **[Les composants Angular2](#/6)**
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonnes Pratiques pour une migration heureuse](#/13)
- [Angular2 en EcmaScript 5](#/14)

Notes :



## Les composants Angular2

- *Angular2* fournit une trentaine de directives :
	- Manipulation de DOM
	- Gestion des formulaires
	- Routeur

- Directives importées automatiquement

```typescript
import {CORE_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'my-component',
  templateUrl: 'myComponent.html',
  directives: [CORE_DIRECTIVES]
})
export class MyComponent { ... }
```

- Ici `CORE_DIRECTIVES` contient NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault

Notes :



## Les composants Angular2 - ngStyle

- Directive permettant d'ajouter des définitions CSS
- Nécessité de spécifier un objet JSON en tant que paramètre

```typescript
import {Component} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
	selector: 'ngStyle-example',
	template: `
		<h1 [ngStyle]="{'font-size': size}">
		Title
		</h1>

		<label>Size:
			<input type="text" [value]="size" (change)="size = $event.target.value">
		</label>
	`,
	directives: [NgStyle]
})
export class NgStyleExample {
	size = '20px';
}
```

Notes :



## Les composants Angular2 - ngClass

- La directive `ngClass` ajoute ou enlève des classes CSS.
- Trois syntaxes coexistent
	- `[ngClass]="'class class1'"`
	- `[ngClass]="['class', 'class1']"`
	- `[ngClass]="{'class': isClass, 'class1': isClass1}"`

- La 3e syntaxe est la plus courante :
	- permet de garder la déclaration CSS dans les templates

Notes :



## Les composants Angular2 - ngClass

- Exemple d'utilisation de la directive `ngClass`

```typescript
import {Component} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
	selector: 'toggle-button',
    template: `
       <div class="button" [ngClass]="{disabled: isDisabled}"
           (click)="toggle(!isDisabled)">Click me!
       </div>`,
    styles: [`
      .disabled {
        ...
      }
    `]
    directives: [NgClass]
  })
class ToggleButton {
	isDisabled = false;

    toggle(newState) { this.isDisabled = newState; }
}
```
Notes :



## Les composants Angular2 - ngFor

- Permet de dupliquer un template pour chaque élément d'une collection
- Correspond à la directive `ngRepeat` en *AngularJS*
- Définition des éléments HTML à dupliquer dans un élément `<template>`
- Utilisation de la propriété `ngForOf` pour définir l'expression permettant l'itération
- Sauvegarde de la valeur en cours dans des variables de rendu (préfixée par `#`)
- Angular2 met à disposition trois données supplémentaires : `index`, `last`, `even` et `odd`

```typescript
<template ngFor let-item [ngForOf]="items" let-i="index"><li>...</li></template>
```

- Seconde syntaxe disponible (également pour `ngIf` et `ngSwitch`

```typescript
<li *ngFor="let item of items; let i = index">...</li>
```

Notes :



## Les composants Angular2 - ngIf

- Ajout / Suppression d'elements HTML en fonction d'une condition
- Si l'expression retourne `true` le template sera inséré

```typescript
<div *ngIf="condition">...</div>
<template [ngIf]="condition"><div>...</div></template>
```

- Pas de directives `ngShow` et `ngHide`
- Utilisation de la propriété `hidden` (nécessite des polyfills)

```typescript
<div [hidden]="condition">...</div>
```

Notes :



## Les composants Angular2 - ngSwitch

- Ajout / Suppression d'elements HTML en fonction d'une condition
- Trois directives disponibles :
	- `ngSwitch` : élément container
	- `NgSwitchCase` : élément à utiliser pour chaque valeur possible
	- `ngSwitchDefault` : pour définir un template pour une valeur par défaut

```typescript
<div [ngSwitch]="value">
	<p *ngSwitchCase="'init'">increment to start</p>
	<p *ngSwitchCase="0">0, increment again</p>
	<p *ngSwitchCase="1">1, stop incrementing</p>
	<p *ngSwitchDefault>&gt; 1, STOP!</p>
</div>
 ```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp4" -->

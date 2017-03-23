# Les Directives
<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- [Tests](#/4)
- [Template & Composants](#/5)
- **[Les directives](#/6)**
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Les Directives

- Portion de code permettant de définir l'apparence ou le fonctionnement d'un élément HTML
- Création de directive personnalisée avec l'annotation `@Directive`
- Pour faire de la manipulation de DOM, toujours utiliser le service `Renderer`
- Peuvent accepter des paramètres (`Input`) et émettre des évènements (`Output`)

```typescript
//<p myHighlight>Highlight me!</p>
import { Directive, ElementRef, Renderer } from '@angular/core';
@Directive({
    selector: '[myHighlight]'
})
export class HighlightDirective {
    constructor(el: ElementRef, renderer: Renderer) {
        //el.nativeElement.style.backgroundColor = 'yellow';
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
}
```

Notes :



## Les Directives - Action utilisateur

- Possibilité d'écouter les évènements de l'élément sur lequel est placé la directive
- Utilisation de la propriété `host` de l'annotation `@Directive`
- L'ajout d'handler programmatiquement est à éviter pour des problèmes de mémoire
- Possibilité d'utiliser les décorateurs `HostListener` et `HostBinding`

```typescript
import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
	@HostBinding('style.backgroundColor') color = 'red'; 

    constructor() { ... }
	
	@HostListener('mouseenter') onMouseEnter() { this.color = 'blue'; }

	@HostListener('mouseleave') onMouseLeave() { this.color = 'red'; }
}
```

Notes :



## Les directives Angular

- *Angular* fournit une trentaine de directives :
	- Manipulation de DOM
	- Gestion des formulaires
	- Routeur

- Importer le module correspondant pour les utiliser : 
    - `CommonModule`
    - `FormModule`
    - `RouterModule`


Notes :



## Les directives Angular - ngStyle

- Directive permettant d'ajouter des définitions CSS
- Nécessité de spécifier un objet JSON en tant que paramètre

```typescript
import {Component} from '@angular/core';

@Component({
	selector: 'ngStyle-example',
	template: `
		<h1 [ngStyle]="{'font-size': size}">
		Title
		</h1>

		<label>Size:
			<input type="text" [value]="size" (change)="size = $event.target.value">
		</label>
	`
})
export class NgStyleExample {
	size = '20px';
}
```

Notes :



## Les directives Angular - ngClass

- La directive `ngClass` ajoute ou enlève des classes CSS.
- Trois syntaxes coexistent
	- `[ngClass]="'class class1'"`
	- `[ngClass]="['class', 'class1']"`
	- `[ngClass]="{'class': isClass, 'class1': isClass1}"`

- La 3e syntaxe est la plus courante :
	- permet de garder la déclaration CSS dans les templates

Notes :



## Les directives Angular - ngClass

- Exemple d'utilisation de la directive `ngClass`

```typescript
import {Component} from '@angular/core';

@Component({
	selector: 'toggle-button',
    template: `
       <div class="button" [ngClass]="{'disabled': isDisabled}"></div>
       <button (click)="toggle(!isDisabled)">Click me!</button>`,
    styles: [`
      .disabled {
        ...
      }
    `]
  })
class ToggleButton {
	isDisabled = false;

    toggle(newState) { this.isDisabled = newState; }
}
```
Notes :



## Les directives Angular - ngFor

- Permet de dupliquer un template pour chaque élément d'une collection
- Correspond à la directive `ngRepeat` en *AngularJS*
- Définition des éléments HTML à dupliquer dans un élément `<template>`
- Utilisation de la propriété `ngForOf` pour définir l'expression permettant l'itération
- Sauvegarde de la valeur en cours dans des variables de rendu (préfixées par `let-`)
- Angular met à disposition cinq données supplémentaires : `index`, `first`, `last`, `even` et `odd`

```typescript
<template ngFor let-item [ngForOf]="items" let-i="index"><li>...</li></template>
```

- Seconde syntaxe disponible (également pour `ngIf` et `ngSwitch`)

```typescript
<li *ngFor="let item of items; let i = index"> {{ item.label }} </li>
```

Notes :



## Les directives Angular - ngIf

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



## Les directives Angular - ngSwitch

- Ajout / Suppression d'elements HTML en fonction d'une condition
- Trois directives disponibles :
	- `ngSwitch` : élément container
	- `ngSwitchCase` : élément à utiliser pour chaque valeur possible
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

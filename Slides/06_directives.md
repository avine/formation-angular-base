# Directives
<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- [Tests](#/4)
- [Template & Composants](#/5)
- **[Directives](#/6)**
- [Injection de Dépendances](#/7)
- [Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Directives

- Schématiquement les directives sont des composants sans template
- Techniquement les composants héritent des directives
- Permet d'intervenir sur l'apparence ou le fonctionnement d'un élément HTML
- *Angular* propose plusieurs directives dans ses différents modules
- Création de directive personnalisée avec l'annotation `@Directive`
- Peuvent accepter des paramètres (`Input`) et émettre des évènements (`Output`)
- Les directives sont l'endroit où faire des manipulation du DOM
  - Les composants peuvent aussi le faire, mais c'est une mauvaise pratique
  - Toujours utiliser le service `Renderer2`, pas avec du code natif

Notes :
- Préciser qu'on utilise par l'API native principalement pour permetre le rendu côté serveur



## Directives

- Premier exemple de directive
- On utilise traditionnellement un selector sur une propriété `[myProp]`

```typescript
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {
  constructor(element: ElementRef, renderer: Renderer2) {
    //element.nativeElement.style.backgroundColor = 'yellow';
    renderer.setElementStyle(element.nativeElement, 'backgroundColor', 'yellow');
  }
}
```

- S'utilise dans un template de la façon suivante

```html
<p myHighlight>
  Highlight me!
</p>
```

Notes :



## Action utilisateur

- Le **Host** est l'élément du DOM qui porte la directive
- Possibilité d'écouter les évènements de l'élément du Host
  - Par l'utilisation de la propriété `host` de l'annotation `@Directive`
  - Par l'utilisation les annotations `HostListener` et `HostBinding`
- Éviter d'écouter des évènement via le DOM pour éviter les fuites mémoires

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



## Déclaration

- Fonctionne comme les composants
  - dans un autre *NgModule* listé dans la liste des `imports`
  - dans la liste des `declarations` de votre module

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [
    HighlightDirective
  ],
  imports: [
    BrowserModule
  ]
})
export class AppModule {}
```

Notes :



## Directives Angular

- *Angular* fournit une trentaine de directives :
  - Manipulation de DOM
  - Gestion des formulaires
  - Routeur

- Importer le module correspondant pour les utiliser :
  - `CommonModule`
  - `FormsModule`
  - `RouterModule`


Notes :



## ngStyle

- Directive permettant d'ajouter des propriétés CSS
- Prend un objet avec les propriétés CSS comme clés
- N'utiliser que pour dans des cas ou le pure CSS ne suffit pas

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'ngStyle-example',
  template: `
    <h1 [ngStyle]="{'font-size': size}">
      Title
    </h1>

    <label>Size:
      <input type="text" [value]="size" (input)="size = $event.target.value">
    </label>
  `
})
export class NgStyleExample {
  size = '20px';
}
```

Notes :



## ngClass

- La directive `ngClass` ajoute ou enlève des classes CSS.
- Peut s'utiliser en addition à l'attribut class standard
- Trois syntaxes coexistent
  - `[ngClass]="'class class1'"`
  - `[ngClass]="['class', 'class1']"`
  - `[ngClass]="{'class': isClass, 'class1': isClass1}"`

- La 3e syntaxe est la plus courante
- Elle permet de tout exprimer depuis le template

Notes :



## ngClass

- Exemple d'utilisation de la directive `ngClass`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'toggle-button',
  template: `
    <div [ngClass]="{'highlight': isHighlighted}"></div>
    <button (click)="toggle(!isHighlighted)">Click me!</button>
  `,
  styles: [
    `.disabled { ... }`
  ]
})
class ToggleButton {
  isHighlighted = false;

  toggle(newState) {
    this.isHighlighted = newState;
  }
}
```
Notes :



## ngFor

- Permet de dupliquer un template pour chaque élément d'une collection
- Correspond à la directive `ngRepeat` en *AngularJS*
- Définition du contenu à dupliquer dans un élément `<ng-template>`
- Utilisation de la propriété `ngForOf` pour définir la collection
- On crée une variable depuis le template pour l'itérateur

  Nouvelle syntaxe pour créer une variable `let-myVarName`
- Angular met à disposition cinq données supplémentaires

  `index`, `first`, `last`, `even` et `odd`
- Syntaxe finale pour une iterration sur le tableau `items`

```html
<ng-template ngFor [ngForOf]="items" let-item let-i="index">
  <li> {{ item.label }} </li>
</ng-template>
```

Notes :



## ngFor microsyntax

- La syntaxe complète pour un ngFor est assez fastidieuse
- *Angular* propose une alternative plus facile à lire
- Cette syntaxe est presque toujours préférée à la syntaxe complète
- *Angular* appelle le système **Microsyntax**
- Il s'agit purement de sucre syntaxique, le comportement est identique
- Ajout du caractères `*` devant `ngFor` pour indiquer la microsyntax

```html
<li *ngFor="let item of items; let i = index">
  {{ item.label }}
</li>
```

- Noter que le `*ngFor` se trouve directement sur l'élément à dupliquer

Notes :



## ngIf

- Ajout / Suppression d'elements HTML en fonction d'une condition
- Si l'expression retourne `true` le template sera inséré

```html
<div *ngIf="condition">...</div>
<ng-template [ngIf]="condition">
  <div>...</div>
</ng-template>
```

- Possibilité de définir un clause `else`

```html
<div *ngIf="condition; else elseBlock">...</div>
<ng-template #elseBlock>No data</ng-template>
```
- Pas de directives `ngShow` et `ngHide` comme dans *AngularJS*
- Utilisation de la propriété `hidden` (nécessite des polyfills)

```html
<div [hidden]="condition">...</div>
```

Notes :



## ngSwitch

- Ajout / Suppression d'elements HTML en fonction d'une condition
- Trois directives disponibles :
	- `ngSwitch` : élément container
	- `ngSwitchCase` : élément à utiliser pour chaque valeur possible
	- `ngSwitchDefault` : pour définir un template pour une valeur par défaut

```html
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

# Template, Directives & Composants

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- **[Template, Directives & Composants](#/5)**
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonnes Pratiques pour une migration heureuse](#/13)
- [Angular2 en EcmaScript 5](#/14)

Notes :



## Syntaxe des templates

- Système d'interpolation grâce à la syntaxe `{{ expression }}`
- L'expression peut être :
    - une chaîne de caractère
    - la valeur d'une variable
    - la valeur retournée d'une fonction
- Cette expression sera convertie en `string` avant son affichage
- Une expression ne doit pas modifier l'état de l'application

Notes :



## Les propriétés

- Possibilité de définir une valeur pour une propriété
- Différent d'AngularJS, où nous utilisons les attributs *HTML*
- Attention à la différence entre attribut et propriété
- Un attribut est statique contrairement à une propriété
- Syntaxe identique pour les propriétés des éléments `HTML`, des composants et des directives
- Utilisation de la syntaxe `[ property-name ] = "expression"`

```html
<button [disabled]="isUnchanged">Save</button>
<button bind-disabled="isUnchanged">Save</button>

<hero-detail [hero]="currentHero"></hero-detail>

<div [class.special]="isSpecial">Special</div>
<button [style.color] = "isSpecial ? 'red' : 'green'">
```

Notes :
Indiquer qu'il n'y a pas de différences entre l'utilisation des propriétés et l'interpolation
Angular transformera la syntaxe d'interpolation en binding de propriétés



## Les propriétés

- Pour les attributs n'ayant pas d'équivalence dans l'API DOM
    - utilisation du `Attribute Binding`
- A utiliser pour `aria`, `colspan`, `svg` par exemple
- Utilisation de la syntaxe `[ attr.attribute-name ] = "expression"`

```html
<td [colspan]="3">help</td>

<!-- Template parse errors:
Can't bind to 'colspan' since it isn't a known native property-->

<button [attr.aria-label]="help">help</button>
```

Notes :



## Les évènements

- Permet d'associer une expression *Angular2* à un évènement
    - défini dans la spécification HTML : `click`, `blur`, ...
    - créé spécialement pour l'application (avec une sémantique précise)

- Les méthodes et propriétés utilisées doivent être définies dans la classe associée

- Impossible d'appeler `console.log`, `Math.max`, `window` et `document`

- Utilisation de la syntaxe `( event-name ) = "expression"`

```html
<button (click)="myMethod()"></button>
<hero-detail (deleted)="onHeroDeleted()"></hero-detail>

<button on-click="myMethod()"></button>
```

Notes :



## Les évènements

- *Angular2* va créer un handler pour chaque évènement
- Possibilité de récupérer le contexte de l'évènement, et de potentielles données via l'objet `$event`
- Cet objet peut être utilisé dans l'expression *Angular2*
- Tous les évènements natifs sont propagés vers les éléments parents
    - nous devons retourner une valeur `false` pour stopper cette propagation
- Les évènements `EventEmitter` ne se propagent pas.

```html
<input [value]="currentHero.firstName"
       (input)="currentHero.firstName=$event.target.value"/>
```

Notes :



## Syntaxe "Banana in the Box"

- Le *2-way data-binding* est désactivé par défaut
- Pour synchroniser un champ de formulaire avec une variable, nécessité d'utiliser cette syntaxe

```html
<input [value]="currentHero.firstName"
       (input)="currentHero.firstName=$event.target.value"/>
```

- *Angular2* fournit du sucre syntaxique afin d'éviter cette redondance de code
- Première solution :

```html
<input
  [ngModel]="currentHero.firstName"
  (ngModelChange)="currentHero.firstName=$event"/>
```

- Deuxième solution :

```html
<input [(ngModel)]="currentHero.firstName"/>
```

Notes :



## Les Directives

- Portion de code permettant de définir l'apparence ou le fonctionnement d'un élément HTML
- L'élément HTML est sélectionné par une expression `CSS`
- Création de directive personnalisée avec l'annotation `@Directive`
- Utiliser un préfixe pour les noms de vos directives pour éviter les conflits
- Pour faire de la manipulation de DOM, toujours utiliser le service `Renderer`

```typescript
//<span myHighlight>Highlight me!</span>
import {Directive, ElementRef, Renderer, Input} from '@angular/core';
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

```typescript
import {Directive, ElementRef, Renderer, Input} from '@angular/core';
@Directive({
    selector: '[myHighlight]',
    host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
    }
})
export class HighlightDirective {
    constructor(private el: ElementRef, private renderer: Renderer) { ... }
    onMouseEnter() { this._highlight("yellow"); }
    onMouseLeave() { this._highlight(null); }
    private _highlight(color: string) {
        this.renderer
            .setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }
}
```

Notes :



## Les Directives - Les paramètres

- Une directive pourra être paramétrable
- Déclaration d'une variable de classe annotée `@Input`
- Le nom de la variable de classe qui sera utilisée dans le template

```typescript
//<p [myHighlight]="color">Highlight me!</p>
export class HighlightDirective {
    @Input('myHighlight') highlightColor: string;
    private _defaultColor = 'red';

    constructor(private el: ElementRef, private renderer: Renderer) { }

    onMouseEnter() { this._highlight(this.highlightColor || this._defaultColor); }
    onMouseLeave() { this._highlight(null); }

    private _highlight(color:string) {
        this.renderer
            .setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }
}
```

Notes :



## Les Directives - Les évènements

- De la même façon, une directive pourra émettre un évènement
- Déclaration d'une variable de classe annotée `@Output` de type `EventEmitter`
- Le nom de la variable correspond au nom de l'évènement qui sera utilisé dans l'HTML
- L'évènement est émis lors de l'appel de la méthode `emit`
- Possibilité de passer des paramètres, accessibles depuis l'objet `$event`

```typescript
//<p [myHighlight]="color" (hightLightEvent)="callExpression($event)">Highlight me!</p>
export class HighlightDirective {
    @Output() hightLightEvent:EventEmitter<any> = new EventEmitter<string>();

    constructor(private el: ElementRef, private renderer: Renderer) { }
    onMouseEnter() {
        this.hightLightEvent.emit(this.highlightColor);
        this._highlight(this.highlightColor || this._defaultColor);
    }
    ...
}
```

Notes :



## Les Composants

- Les composants sont des directives avec un template
- Utilisation de l'annotation `@Component`, héritant de `@Directive`
- Toute la configuration de `@Directive` est disponible dans `@Component`
- Possibilité de définir des paramètres et des évènements de la même façon
- `@Component` fournit notamment les paramètres `template`, `templateUrl`, `styles`, `styleUrl` et `encapsulation`

```typescript
import {Component} from '@angular/core'
import {Product} from ./model/Product'

@Component({
    selector: 'product-detail',
    template: `<article>{{product.name}} <button (click)="addToBasket.emit(product)"></button></article>`
})
export class ProductComponent {
    @Input() product:Product;
    @Output() addToBasket:EventEmitter<any> = new EventEmitter<Product>();
}
```

Notes :



## Les Composants - Aggrégation

- Pour agréger des composants entre eux, nécessité de
    - les lister explicitement dans chaque composant
    - définir une stack globale de composant pouvant être utilisée dans l'application
- Cette liste de composants doit être définie via la propriété `directives` des annotations `@Directive` et `@Component`

```typescript
import {Component} from '@angular/core';
import {HighlightDirective} from './highlight.directive';
@Component({
    selector: 'my-app',
    template: '<span myHighlight>Highlight me!</span>',
    directives: [HighlightDirective]
})
export class AppComponent { }
```

Notes :



## Les Composants - Aggrégation

- Permet d'insérer le contenu enfant défini lors de l'utilisation du composant
- Correspond à la directive `ngTransclude` en *AngularJS*
- Possibilité d'avoir plusieurs points d'insertion (utilisation de la propriété `select`)
- La propriété `select` accepte comme valeur un sélecteur *CSS*

```typescript
//<post><h2>Title</h2><p>Content</p></post>
import {Component} from '@angular/core';
@Component({
    selector: 'post',
    template: `<article>
          <header><ng-content select="h2"></ng-content></header>
          <section><ng-content select="p"></ng-content></section>
    </article>`
})
export class PostComponent { }
```
Notes :



## Les Composants - Stack Globale

- Possibilité de définir une stack globale de composants
- Les directives seront utilisables dans l'ensemble de l'application
- Surcharge du `provider` `PLATFORM_DIRECTIVES`

```typescript
import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app/app';
import {MyComponent} from './MyComponent'
import {PLATFORM_DIRECTIVES} from '@angular/core'

bootstrap(App, [
    { provide: PLATFORM_DIRECTIVES, useValue: [MyComponent], multi:true }
]);
```

Notes :



## Les Composants - Tests

- Nécessité d'instancier un composant via l'objet `TestComponentBuilder` et sa méthode `createAsync`
- La méthode `createAsync` retourne un objet de type `ComponentFixture` qui est un représentation du composant
- Un objet de type `ComponentFixture` propose deux propriétés intéressantes :
  - `componentInstance` : l'instance *JavaScript* du composant
  - `nativeElement` : l'élément *HTML*
- Pour exécuter l'API *Change Detection*, utilisation de la méthode `detectChanges`

```typescript
@Component({
  selector: 'title', template: '<h1>{{title}}</h1>'
})
export class TitleCmp {
  @Input() title: string;
}
```

Notes :



## Les Composants - Tests

- Test Unitaire :

```typescript
import {
  describe, it, expect, inject, async, beforeEach
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';

import {TitleCmp} from './titlecmp';
describe('TitleCmp', () => {
  it('should have a title', async(inject([TestComponentBuilder], tcb => {
    tcb.createAsync(TitleCmp)
      .then(fixture => {
        let TitleCmp = fixture.componentInstance;
        TitleCmp.title = 'Hello World';

        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelector('h1').textContent).toBe('Hello World');
      });
  })));
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp3" -->

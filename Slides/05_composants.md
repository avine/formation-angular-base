# Template & Composants

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- [Tests](#/4)
- **[Template & Composants](#/5)**
- [Directives](#/6)
- [Injection de Dépendances](#/7)
- [Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Formulaires](#/11)
- [Server-side Rendering](#/12)

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
<button data-bind-disabled="isUnchanged">Save</button>
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
<td [colspan]="dynamicColspan">help</td>

<!-- Template parse errors:
Can't bind to 'colspan' since it isn't a known native property-->

<td [attr.colspan]="dynamicColspan">help</td>
```

Notes :



## Les évènements

- Permet d'associer une expression *Angular* à un évènement
    - défini dans la spécification HTML : `click`, `blur`, ...
    - créé spécialement pour l'application (avec une sémantique précise)

- Les méthodes et propriétés utilisées doivent être définies dans la classe associée

- Utilisation de la syntaxe `( event-name ) = "expression"`

```html
<button (click)="myMethod()"></button>
<hero-detail (deleted)="onHeroDeleted()"></hero-detail>

<button on-click="myMethod()"></button>
<button data-on-click="myMethod()"></button>
```

Notes :



## Les évènements

- *Angular* va créer un handler pour chaque évènement
- Possibilité de récupérer le contexte de l'évènement, et de potentielles données via l'objet `$event`
- Cet objet peut être utilisé dans l'expression *Angular*
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

- *Angular* fournit du sucre syntaxique afin d'éviter cette redondance de code
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



## Les Composants

- Les composants sont des éléments graphiques
- Utilisation de l'annotation `@Component`
- L'élément HTML est sélectionné par une sélecteur `CSS`
- Utiliser un préfixe pour les noms de vos directives pour éviter les conflits
- `@Component` fournit notamment les paramètres `template`, `templateUrl`, `styles`, `styleUrls` et `encapsulation`

```typescript
import { Input, Component } from '@angular/core'
import { Product } from './model/Product'

@Component({
    selector: 'product-detail',
    template: '
        <article>
            <h1>Product 1</h1>
            <button>Add</button>
        </article>'
})
export class ProductComponent { }
```

Notes :



## Les Composants - Les paramètres

- Un composant pourra être paramétrable
- Déclaration d'une variable de classe annotée `@Input`
- Le nom de la variable de classe qui sera utilisée dans le template

```typescript
import { Input, Component } from '@angular/core'
import { Product } from './model/Product'

@Component({
    selector: 'product-detail',
    template: '
        <article>
            <h1>{{ product.title }}</h1>
            <button>Add</button>
        </article>'
})
export class ProductComponent {
    @Input() product:Product;
}
```

Notes :



## Les Composants - Les évènements

- De la même façon, une directive pourra émettre un évènement
- Déclaration d'une variable de classe annotée `@Output` de type `EventEmitter`
- Le nom de la variable correspond au nom de l'évènement qui sera utilisé dans l'HTML

```typescript
@Component({
    selector: 'product-detail',
    template: '
        <article>
            <h1>{{ product.title }}</h1>
            <button (click)="clickHandler()">Add</button>
        </article>'
})
export class ProductComponent {
    @Input() product:Product;
    @Output() addToBasket = new EventEmitter<Product>();

    clickHandler(){ this.addToBasket.emit(this.product); }
}
```

Notes :



## Les Composants - Enregistrement

- Les composants externes nécessaires à votre applications doivent :
  - être définis dans un module importé par votre application (`ngModule`)
  - être définis dans la propriété `declarations` du décorateur `ngModule` de votre application

```typescript
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AppModule {}
```

Notes :



## Les Composants - Projection

- Permet d'insérer le contenu enfant défini lors de l'utilisation du composant
- Correspond à la directive `ngTransclude` en *AngularJS*
- Possibilité d'avoir plusieurs points d'insertion (utilisation de la propriété `select`)
- La propriété `select` accepte comme valeur un sélecteur *CSS* : classe, élément et attribut

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



## Les Composants - Tests

- Nécessité de configurer l'objet `TestBed` via sa méthode `configureTestingModule` :
```typescript
TestBed.configureTestingModule({
    declarations: [
      TitleComponent
    ],
    imports: [
      // HttpModule, FormsModule, etc.
    ],
    providers: [
      // TitleService,
      // { provide: TitleService, useClass: TitleServiceMock })
    ]
});
```
- La méthode `createComponent` de l'objet `TestBed` retourne un objet de type `ComponentFixture` qui est une représentation du composant

Notes :



## Les Composants - Tests

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
import {TestBed, async} from '@angular/core/testing';

import {TitleComponent} from './title.component';
describe('TitleComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent]
    });
  });

  it('should have a title', async(() => {
    let fixture = TestBed.createComponent(TitleComponent);
    let instance = fixture.componentInstance;
    instance.title = 'Hello World';
    fixture.detectChanges();

    let element = fixture.nativeElement;
    expect(element.querySelector('h1').textContent).toBe('Hello World');
  }));
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp3" -->

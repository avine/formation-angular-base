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



## Composants

- Les composants sont les éléments de base d'Angular
- Définis à partir d'une classe TypeScript avec l'annotation `@Component`
- Seront activés par le sélecteur *CSS* de la propriété `selector`
- Un template est configuré de deux façons :
  - `template` : String literal (penser à la string multiline `` ` ``)
  - `templateUrl` : Url d'un fichier HTML (relatif au composant)

Notes :



## Composants

- Les styles peuvent être configurés via deux propriétés : 
  - `styles`

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>App Works</h1>`,
  styles: [`
    h1 { font-weight: normal; }
  `]
})
export class AppComponent { }
```
  - `styleUrls`

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>App Works</h1>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
```

Notes : 



## Composants

- Pour définir un composant qui sera appelé de cette façon :

```html
<div>
  <h1>My Product</h1>
  <product></product>
</div>

<!-- attention, <product/> ne fonctionne pas -->
```

- Le composant *Angular* est implémenté ainsi

```typescript
import { Component } from '@angular/core'

@Component({
  selector: 'product',
  template: `
    <article>
      <h1>My Product</h1>
    </article>
  `
})
export class ProductComponent { }
```

Notes :



## Templates

- Les templates d'Angular sont compilés avant d'être exécutés
  - Soit à chaud  : *JIT* (Just In Time) par défaut
  - Soit au build : *AOT* (Ahead Of Time) `--aot` dans Angular CLI
- La compilation permet de détecter des erreurs dans le template
- Implique également que les templates doivent être syntaxiquement exacts
- Fonctionnement très différent d'AngularJS
  - AngularJS ne compilait pas les templates
  - Les templates d'AngularJS étaient du pur Web transmis au navigateur



## Interpolation

- Système d'interpolation grâce à la syntaxe `{{ expression }}`
- L'expression doit retourner une valeur qui sera convertie en `string`
- Angular définit une syntaxe précise pour ces expressions
- https://angular.io/docs/ts/latest/guide/template-syntax.html#!#template-expressions
- La syntaxe est celle du JavaScript avec quelques exceptions
- Toutes les propriétés du composant sont accessibles directement
- Une expression ne doit pas modifier l'état de l'application

```typescript
@Component({
  selector: 'product',
  template: `<p>{{ add(myProp, 2) }}</p>`
})
export class ProductComponent {
  myProp = 1;
  add(value1, value2) { return value1 + value2; }
}
```

Notes :



## Propriétés

- Syntaxe générique pour définir la valeur d'une propriété d'un élément *HTML*
- Différent d'AngularJS, où nous utilisons les attributs *HTML*
- Utilisation de la syntaxe `[property-name]="expression"`
- Syntaxe identique pour les propriétés des *éléments HTML standards*, les *composants* et les *directives* Angular et même les *Web Components*

```html
<button [disabled]="isUnchanged">Save</button> <!-- propriété HTML -->
<button bind-disabled="isUnchanged">Save</button> <!-- alternative sans [] -->
<button data-bind-disabled="isUnchanged">Save</button> <!-- html5 strict -->
<hero-detail [hero]="currentHero"></hero-detail> <!-- propriété d'un composant -->

<div [class.special]="isSpecial">Special</div> <!-- cas particuliers -->
<button [style.color]="isSpecial ? 'red' : 'green'">
```

- Les propriétés sont **bindées**, la valeur sera mise à jour automatiquement si la valeur de l'expression change

Notes :
Indiquer qu'il n'y a pas de différences entre l'utilisation des propriétés et l'interpolation
Angular transformera la syntaxe d'interpolation en binding de propriétés



## Propriétés

- **Attention à la différence entre attribut et propriété**
- Il existe des écarts entre les *propriétés du DOM* et les *attributs HTML*
- Angular propose alors un système appelé `Attribute Binding`
- Cas les plus courants : `aria-*`, `colspan`, `rowspan`, `svg` par exemple
- Utilisation de la syntaxe `[attr.attribute-name]="expression"`

```html
<td [colspan]="dynamicColspan">help</td>

<!-- Template parse errors:
Can't bind to 'colspan' since it isn't a known native property-->

<td [attr.colspan]="dynamicColspan">help</td>
```

Notes :



## Input

- Un composant peut recevoir des paramètres
- Annotation `@Input()` sur une propriété de la classe du composant
- Le nom de la propriété sera celle à utiliser dans le template

```typescript
import { Input, Component } from '@angular/core'
import { Product } from './model/Product'

@Component({
  selector: 'product-detail',
  template: `
    <article>
      <h1>{{ product.title }}</h1>
    </article>
  `
})
export class ProductComponent {
    @Input() product: Product;
}
```

Notes :



## Input

- Possibilité de surcharger le nom de la propriété avec

  `@Input('discount')`
- Les noms de propriétés sont sensible à la casse

```typescript
@Component({ selector: 'product-detail', /* ... */ })
export class ProductComponent {
  @Input() product: Product;
  @Input('discount') percentDiscount: number;
}
```

- Pour utiliser ce composant

```html
<product-detail [product]="myProduct" [discount]="10">
</product-detail>
```

- *Angular* vérifie les propriétés passées à un composant
- Il refusera une propriété qui n'existe pas ou non annotée `@Input()`

Notes :



## Évènements

- Syntaxe générique pour écouter un évènement d'un élément *HTML*
- Différent d'AngularJS, où nous utilisons les attributs *HTML*
- Utilisation de la syntaxe `(event-name)="expression"`
- Syntaxe identique pour les évènements des *éléments HTML standards*, des *composants* et des *directives* Angular et même des *Web Components*
- Les méthodes et propriétés utilisées doivent être définies dans la classe

```html
<button (click)="handler()"></button> <!-- évènement HTML -->
<button on-click="handler()"></button> <!-- alternative sans () -->
<button data-on-click="handler()"></button> <!-- html5 strict -->

<!-- évènement d'un composant -->
<hero-detail (deleted)="onHeroDeleted()"></hero-detail>
```

Notes :



## Évènements

- *Angular* permet d'accéder à l'évènement via la variable `$event`
- Cet objet peut être utilisé dans l'expression
- Tous les évènements natifs sont propagés vers les éléments parents

  Possibilité de stopper la propagation en retournant `false` dans l'expression qui traite l'évènement
- Les évènements provenant des composants *Angular* ne se propagent jamais
- Exemple d'utilisation de `$event` avec la reproduction d'un **double binding**

```html
<input [value]="currentHero.firstName"
       (input)="currentHero.firstName = $event.target.value"/>
```

Notes :



## Output

- Un composant peut envoyer des évènements
- Annotation `@Output` sur une propriété de type `EventEmitter`
- Le nom de la propriété sera celui de l'évènement à utiliser dans le template

```typescript
import { Input, Output, Component } from '@angular/core'
import { Product } from './model/Product'

@Component({
  selector: 'product-detail',
  template: `
    <article>
      <button (click)="clickHandler()">Add</button>
    </article>
  `
})
export class ProductComponent {
    @Input() product: Product;
    @Output() addToBasket = new EventEmitter<Product>();

    clickHandler(){ this.addToBasket.emit(this.product); }
}
```

Notes :



## Output

- Possibilité de surcharger le nom de l'évènement

  `@Output('myOtherName')`
- Les noms des évènements sont sensibles à la casse

```typescript
@Component({ selector: 'product-detail', /* ... */ })
export class ProductComponent {
  @Output('add') addToBasket = new EventEmitter<Product>();
}
```

- Pour utiliser ce composant

```html
<product-detail (add)="myHandler()">
</product-detail>
```

- *Angular* vérifie les évènements d'un composant
- Il refusera un évènement qui n'existe pas ou non annoté `@Output()`

Notes :



## Output

- L'objet évènement transmis peut être de n'importe quel type
- Il est spécifié dans le paramètre de la classe `EventEmitter`
- Pour émettre un évènement, il faut passer un objet de cette classe

```typescript
@Component({ selector: 'hello-component', /* ... */ })
export class HelloComponent {
  @Output() hello = new EventEmitter<string>();
  constructor() { this.hello.emit('hello!'); }
}
```

- Côté réception de l'évènement, la variable `$event` correspond à cet objet

```typescript
@Component({
  selector: 'main',
  template: '<hello-component (hello)="myHandler($event)"></hello-component>'
})
export class HelloComponent {
  myHandler(value) {
    console.log(value); //-> 'hello!'
  }
}
```

Notes :



## Déclaration

- Utilisation des *NgModule* définis en détail plus loin dans la formation
- Pour qu'un composant soit accessible, il faut :
  - qu'il soit dans un autre *NgModule* listé dans la liste des `imports`
  - qu'il soit dans la liste des `declarations` de votre module

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
  ]
})
export class AppModule {}
```

Notes :



## Projection

- Permet de mettre du contenu HTML dans la balise d'un composant Angular
- Le composant `ng-content` permet de réinserer le contenu dans le template
- Correspond à la directive `ngTransclude` en *AngularJS*

```html
<post>
  <h2>Title</h2>
  <p>Content</p>
</post>
```

```typescript
@Component({
  selector: 'post',
  template: `
    <article>
      <ng-content></ng-content>
    </article>
  `
})
export class PostComponent { }
```
Notes :



## Projection

- Possibilité d'avoir plusieurs points d'insertion avec la propriété `select`
- La valeur doit être le sélecteur *CSS* de la section à utiliser

```html
<post>
  <h2>Title</h2>
  <p>Content</p>
</post>
```

```typescript
@Component({
  selector: 'post',
  template: `
    <article>
      <header><ng-content select="h2"></ng-content></header>
      <section><ng-content select="p"></ng-content></section>
    </article>
  `
})
export class PostComponent { }
```

Notes :



## Cycle de vie

- Chaque composant a un cycle de vie bien définit
- https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
- Il est possible d'exécuter du code à chacune de ces étapes
- La plus utilisée est l'initialisation avec l'interface `OnInit`
- L'utilisation d'`OnInit` est recommandé plutôt que celle du constructeur

```typescript
import { Component, OnInit } from '@angular/core';

@Component({ selector: 'user', /* ... */ })
export class UserComponent implements OnInit {

  @Input() data: User;
  products: Product[];

  ngOnInit(): void {
    this.products = this.getProducts(this.data.id);
  }

  getProducts(id){ ... }
}
```



## Tests

- `TestBed` est l'outil central pour les tests *Angular*
- On l'importe depuis le module `@angular/core/testing`
- Permet de créer un module *Angular* spécifique pour un test

  Utilisation de `TestBed.configureTestingModule({ ... })`
- L'objectif est d'inclure le moins de choses possibles pour isoler le test

```typescript
import { TestBed } from '@angular/core/testing';

TestBed.configureTestingModule({
    declarations: [ TitleComponent ],
    imports: [
      // HttpModule, FormsModule, etc.
    ],
    providers: [
      // TitleService,
      // { provide: TitleService, useClass: TitleServiceMock })
    ]
});
```

Notes :



## Tests

- Le module créé permet de créer un composant
- Ce composant se présente sous la forme d'un `ComponentFixture`
  - Contient une référence vers l'instance de la classe TypeScript
  - Contient une référence vers l'élément du DOM où il est rattaché

```typescript
class TestBed implements Injector {
  static configureTestingModule(moduleDef: TestModuleMetadata): typeof TestBed
  createComponent(component: Type<T>) : ComponentFixture<T>

  /* ... */
}

class ComponentFixture {
  componentInstance : T
  nativeElement : any
  elementRef : ElementRef
  detectChanges(checkNoChanges?: boolean) : void

  /* ... */
}
```

Notes :



## Tests

- La méthode `detectChanges` permet de piloter la détection de changements
- Attention, pas de détection de changements automatiques

```typescript
import { TestBed } from '@angular/core/testing';
import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleComponent ]
    });
  });

  it('should have a title', () => {
    const fixture = TestBed.createComponent(TitleComponent);
    const {componentInstance, debugElement} = fixture;

    componentInstance.title = 'Hello World';
    fixture.detectChanges();
    expect(debugElement.querySelector('h1').textContent).toBe('Hello World');
  });
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp3" -->

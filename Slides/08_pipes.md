# Pipes

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- [Tests](#/4)
- [Template & Composants](#/5)
- [Directives](#/6)
- [Injection de Dépendances](#/7)
- **[Pipes](#/8)**
- [Service HTTP](#/9)
- [Router](#/10)
- [Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Les Pipes

- Mécanisme permettant la transformation d'une donnée avant son utilisation
- Similaire aux filtres dans *AngularJS*
- Utilisation avec le caractères `|` dans les expressions des templates
- Possibilité d'écrire ses propres *Pipe*
- Ajout de la notion de *Pipe* pure et impure
- Pipes disponibles par défaut dans le framework `@angular/common`
  - `LowerCasePipe` , `UpperCasePipe`
  - `CurrencyPipe`, `DecimalPipe`, `PercentPipe`
  - `DatePipe`, `JSONPipe`, `SlicePipe`
  - `I18nPluralPipe`, `I18nSelectPipe`
  - `AsyncPipe`

Notes :



## Utilisation dans les Templates

- Les *Pipes* disponibles par défaut sont directement utilisables
- Possibilité de chaîner les pipes les uns à la suite des autres
- Possibilité de passer des paramètres avec le caractère `:`
- Les paramètres sont **bindés** et le résultat est recalculé à chaque changement
- La syntaxe est la suivante

  `{{ myData | pipeName:pipeArg1:pipeArg2 | anotherPipe }}`

```html
{{ myVar | date | uppercase}}
<!-- FRIDAY, APRIL 15, 1988 -->

{{ price | currency:'EUR':'symbol' }}
<!-- 53.12€ -->
```

Notes :



## Création

- Définir une classe implémentant l'interface `PipeTransform`
- Implémenter la méthode `transform`
- Annoter la classe avec le décorateur `@Pipe`

```typescript
import { isString, isBlank } from '@angular/core/src/facade/lang';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'mylowercase' })
export class MyLowerCasePipe implements PipeTransform {
  transform(value: any, param1:string, param2:string): string {
    if (isBlank(value)) {
      return value;
    }
    if (!isString(value)) {
      throw new Error('MyLowerCasePipe value should be a string');
    }
    return value.toLowerCase();
  }
}
```

Notes :



## Déclarations

- Se déclare comme les composants et les directives
- Le pipe doit être ajouté au tableau `declarations`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyLowerCasePipe } from './mylowercase.pipe';

@NgModule({
  declarations: [
    MyLowerCasePipe
  ],
  imports: [
    BrowserModule
  ]
})
export class AppModule {}
```

Notes :



## Utilisation

- Toujours comme les composants et les directives
- Un pipe est utilisable s'il a été déclaré dans le module ou un module importé

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <h2>
      {{'Hello World' | mylowercase}}
    </h2>
  `
})
export class App { }
```

Notes :



## Injection

- Il est possible d'utiliser un pipe depuis le code TypeScript
- Utilisation de l'injection de dépendances pour utiliser un *Pipe*
- Pas de service `$filter` comme dans *AngularJS*
- Il faut ajouter le pipe dans les `providers` (composant ou module)

```typescript
import { Component } from '@angular/core`;
import { MyLowerCasePipe } from './mylowercase';

@Component({
  selector: 'app',
  providers: [ MyLowerCasePipe ]
})
class App {
  name: string;

  constructor(lower: MyLowerCasePipe) {
    this.name = lower.transform('Hello Angular');
  }
}
```

Notes :



## Pipes pures

- Fait référence à la notion de fonction pure
- Les *Pipes* sont pure par défaut
- Exécuter uniquement pour un changement de référence de la valeur
- Ne sera pas réévalué pour une mutation sans changement de référence
- Optimise les performances du mécanisme de détection de changement
- N'est pas toujours le comportement souhaité :
 - Ajout / Suppression d'un objet dans un tableau
 - Modification d'une propriété d'un objet

Notes :



## Pipes impures

- Exécuté à chaque cycle du système de détection de changement
- Plus consommateur qu'un pipe pure, n'utiliser que lorsque c'est nécessaire
- Pour définir un *Pipe* impure, mettre la propriété `pure` à `false`

```typescript
@Pipe({
  name: 'myImpurePipe',
  pure: false
})
export class MyImpurePipe implements PipeTransform {
  transform(value: any): any { ... }
}
```

Notes :




## AsyncPipe

- Fourni par *Angular* par défaut, exemple de pipe impure
- *Pipe* recevant une `Promise` ou un `Observable` en entrée
- La valeur doit pouvoir changer alors que la référence de la `Promise` ou de l'`Observable` n'a pas changée

```typescript
@Component({
  selector: 'pipes',
  template: '{{ promise | async }}'
})
class PipesAppComponent {
  promise: Promise;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hey, this is the result of the promise");
      }, 2000);
    });
  }
}
```

Notes :



## Tests

- Un *Pipe* n'est rien d'autre qu'une fonction !
- Instanciation du *Pipe* dans une méthode `beforeEach`
- Appel de la méthode `transform` pour tester tous les cas possibles

```typescript
import { MyLowerCasePipe } from './app/mylowercase';

describe('MyLowerCasePipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new MyLowerCasePipe();
  });

  it('should return lowercase', () => {
    var val = pipe.transform('SOMETHING');
    expect(val).toEqual('something');
  });
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp6" -->

# Les Pipes

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- **[Les Pipes](#/8)**
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonnes Pratiques pour une migration heureuse](#/13)

Notes :



## Les Pipes

- Mécanisme permettant la manipulation d'une donnée avant son utilisation
- Similaire aux filtres dans *AngularJS*
- Utilisation dans les templates HTML similaires à l'ancienne version
- Possibilité de définir des *Pipes* pure ou impure
- Pipes disponibles par défaut dans le framework (`@angular/common`):
  - `LowerCasePipe` , `UpperCasePipe`
  - `CurrencyPipe`, `DecimalPipe`, `PercentPipe`
  - `DatePipe`, `JSONPipe`, `SlicePipe`
  - `I18nPluralPipe`, `I18nSelectPipe`
  - `AsyncPipe`

Notes :



## Les Pipes - Utilisation dans les Templates

- Les *Pipes* disponibles par défaut sont directement utilisables dans les templates
- Les Templates Angular supportent le caractère `|` pour appliquer un *Pipe*
- Possibilité de chaîner les pipes les uns à la suite des autres

```html
{{ myVar | date | uppercase}}
//FRIDAY, APRIL 15, 1988
```

- Certains pipes sont configurables
  - Séparation des paramètres par le caractère `:`

```html
{{ price | currency:'EUR':true }}
```

Notes :



## Les Pipes - Création

- Définir une classe implémentant l'interface `PipeTransform`
- Implémenter la méthode `transform`
- Annoter la classe avec le décorateur `@Pipe`
- Exporter cette classe via `export`

```typescript
import {isString, isBlank} from '@angular/core/src/facade/lang';
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'mylowercase'})
export class MyLowerCasePipe implements PipeTransform {
  transform(value: string, param1:string, param2:string): string {
    if (isBlank(value)) return value;
    if (!isString(value)) {
      throw new InvalidPipeArgumentException(MyLowerCasePipe, value);
    }  
    return value.toLowerCase();
  }
}
```

Notes :



## Les Pipes - Utilisation

- Les pipes externes nécessaires à votre applications doivent :
  - être définis dans un module importé par votre application (`ngModule`)
  - être définis dans la propriété `declarations` du décorateur `ngModule` de votre application

```typescript
import {Component} from '@angular/core';
import {MyLowerCasePipe} from './mylowercase';
@Component({
	selector: 'app',
	template: '<h2>{{'Hello World' | mylowercase}}</h2>'
})
export class App { }
```

Notes :



## Les Pipes - Utilisation

- Utilisation de l'injection de dépendances pour utiliser un *Pipe*
- Pas nécessaire d'utiliser un service `$filter` ou une règle de nommage (`dateFilter`) comme en *AngularJS*

```typescript
import {Component} from '@angular/core`;
import {MyLowerCasePipe} from './mylowercase';

@Component({
  selector: 'app',
  providers: [MyLowerCasePipe]
})
class App {
  name:string;

  constructor(public lower:MyLowerCasePipe){
    this.string = lower.transform('Hello Angular2');
  }

}
```

Notes :



## Les Pipes impure

- Deux catégories de *Pipes* : pure et impure
- *Pipes* sont pure par défaut
- Un *Pipe* impure doit implémenter l'interface `PipeOnDestroy`
- Exemple de *Pipes* impure : *AsyncPipe*
- Pour définir un *Pipe* impure, nécessité de mettre la propriété `pure` à `false`
- Permet d'indiquer au système de *Change Detection* de vérifier le résultat de ce *Pipe* après chaque cycle.

```typescript
@Pipe({
  name: 'fetch',
  pure: false
})
class FetchPipe implements PipeOnDestroy {
  transform(value){ ... }

  onDestroy(){ ... }
}
```

Notes :



## Les Pipes - AsyncPipe

- *Pipe* recevant une `Promise` ou un `Observable` en entrée
- Retournera la donnée émise

```typescript
@Component({
  selector: 'pipes',
  template: '{{ promise | async }}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class PipesAppComponent {
  promise: Promise;

  constructor() {
    this.promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve("Hey, this is the result of the promise");
      }, 2000);
    });
  }
}
```

Notes :



## Les Pipes - Tests

- Instanciation du *Pipe* dans une méthode `BeforeEach`
- Appel de la méthode `transform` pour tester tous les cas possibles

```typescript
import {MyLowerCasePipe} from './app/mylowercase';

describe('MyLowerCasePipe', () => {
  let pipe;

  beforeEach(() => { pipe = new MyLowerCasePipe(); });

  describe('transform', () => {
    it('should return uppercase', () => {
      var val = pipe.transform('SOMETHING');
      expect(val).toEqual('something');
    });
  });

});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp6" -->

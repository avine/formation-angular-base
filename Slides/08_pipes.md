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

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)

Notes :



## Les Pipes

- Mécanisme permettant la manipulation d'une donnée avant son utilisation
- Similaire à *AngularJS*
- Utilisation dans les templates HTML similaires à l'ancienne version
- Possibilité de définir des *Pipes* statefull ou stateless
- Pipes disponibles par défaut dans le framework :
  - `LowerCasePipe` , `UpperCasePipe`
  - `CurrencyPipe`, `DatePipe`, `DecimalPipe`, `JSONPipe`, `NumberPipe`, `PercentPipe`, `ReplacePipe`, `SlicePipe`
  - `AsyncPipe`

Notes :



## Les Pipes - Utilisation dans les Templates

- Les *Pipes* disponibles par défaut sont directement utilisables dans les templates
- Les Templates Angular supporte le caractère `|` pour appliquer un *Pipe*
- Possibilité de chaîner les pipes les uns à la suite des autres

```html
{{ myVar | date | uppercase}}
//FRIDAY, APRIL 15, 1988
```

- Certains pipes sont configurables
  - Séparation des paramètres par le caractère `:`

```html
{{ myVar | pipe1:param1:'string' }}
```

Notes :



## Les Pipes - Création

- Définir une classe implémentant l'interface `PipeTransform`
- Implémenter la méthode `transform`
- Annoter la classe avec le décorateur `@Pipe`
- Exporter cette classe via `export`

```typescript
import {isString} from '@angular/src/facade/lang';
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'mylowercase'})
export class MyLowerCasePipe implements PipeTransform {
  transform(value: string, args: any[] = null): string {

    return value.toLowerCase();

  }
}
```

Notes :



## Les Pipes - Utilisation

- Charger explicitement les *pipes* externes avant utilisation dans vos templates
- Utiliser de la propriété `Pipes` du décorateur `@Component`

```typescript
import {Component} from '@angular/core'
import {MyLowerCasePipe} from './mylowercase'
@Component({
	selector: 'app',
	template: '<h2>{{'Hello World' | mylowercase}}</h2>',
	pipes: [MyLowerCasePipe]
})
export class App { }
```

Notes :



## Les Pipes - Utilisation

- Utilisation de l'injection de dépendances pour utiliser un *Pipe*
- Pas nécessaire d'utiliser un service `$filter` ou une règle de nommage (`dateFilter`) comme en *AngularJS*

```typescript
import {Component, UpperCasePipe} from '@angular/core`
@Component({
  selector: 'app',
  providers: [UpperCasePipe]
})
class App {

  name:string;

  constructor(public upper:UpperCasePipe){
    this.string = upper.transform('Hello Angular2');
  }

}
```

Notes :



## Les Pipes stateful

- Deux catégories de *Pipes* : stateless et stateful
- *Pipes* sont stateless par défaut
- Un *Pipe* stateful doit implémenter l'interface `PipeOnDestroy`
- Exemple de *Pipes* stateful : *AsyncPipe*
- Pour définir un *Pipe* stateful, nécessité de mettre la propriété `pure` à `false`
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
  changeDetection: 'ON_PUSH'
})
@View({
  template: '{{ promise | async}}',
})

class PipesAppComponent {
  promise: Promise;

  constructor() {
    this.promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve("Hey, this is the result of the promise");
      }, 2000)
    });
  }
}
```

Notes :



## Les Pipes - Stack Globale

- Possibilité de définir une stack globale de `pipes`
- Les `pipes` seront utilisables dans l'ensemble de l'application
- Surcharge du `provider` `PLATFORM_PIPES`

```typescript
import {bootstrap} from '@angular/platform/browser';
import {App} from './app/migr';
import {MyPipe} from './appp/mypipe';
import {provide, PLATFORM_PIPES} from '@angular/core';

bootstrap(App, [
    provide(PLATFORM_PIPES, {useValue: [MyPipe], multi:true})
]);
```

Notes :



## Les Pipes - Tests

- Instanciation du *Pipe* dans une méthode `BeforeEach`
- Appel de la méthode `transform` pour tester tous les cas possibles

```typescript
import {describe,it,expect,beforeEach} from '@angular/testing_internal';
import {UpperCasePipe} from '@angular/common';

export function main() {
  describe('UpperCasePipe', () => {
    var pipe;

    beforeEach(() => { pipe = new UpperCasePipe(); });

    describe('transform', () => {
      it('should return uppercase', () => {
        var val = pipe.transform('something');
        expect(val).toEqual(upper);
      });
    });

  });
}
```

Notes :



<!-- .slide: class="page-questions" -->

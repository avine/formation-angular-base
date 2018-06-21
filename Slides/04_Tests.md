# Les Tests

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- **[Tests](#/4)**
- [Template & Composants](#/5)
- [Directives](#/6)
- [Injection de Dépendances](#/7)
- [Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Concepts

- Dans la documentation `Jasmine` est utilisé comme framework de tests
  - `Angular` peut être également testé avec d'autres frameworks
- Pour exécuter facilement les tests, on propose d'utiliser `Karma`
  - Il a été développé par l'équipe d'`AngularJS`
  - Il n'est pour autant ni indispensable ni lié à `Angular`
- `Jasmine` et `Karma` sont les outils utilisés dans une application générée avec Angular CLI

Notes :



## Jasmine

![Jasmine](ressources/jasmine.svg)

- Framework de tests : http://jasmine.github.io/
- Aucune dépendance vers d'autres frameworks
- Ne nécessite pas d'éléments du *DOM*

Notes :



## Jasmine - Structure

- Fonctions `describe` et `it` pour décrire la suite de tests
- Système de *matchers* : `toBe`, `toBeUndefined`, `toBeTruthy`, `toThrow`, ...
- Possibilité d'utiliser une bibliothèque externe comme `Chai`

```javascript
describe('True value', () => {

  it('should be equal to true', () => {

     expect(true).toBe(true);

  });

});
```

Notes :



## Jasmine - Hooks

- Fonctions `beforeEach`, `afterEach`, `beforeAll`, `afterAll`
- Exécution d'une fonction avant ou après chaque ou tous les tests

```javascript
describe('True value', function () {
  let value;

  beforeEach(function (){
    value = true;
  });

  it('should be equal to true', function () {
    expect(value).toBe(true);
  });
});
```

Notes :



## Jasmine - Spies

- Jasmine propose un système de *Spies* inclus
- Il est également possible d'utiliser une librairie externe comme *Sinon*
- Création d'un spy : `jasmine.createSpy()` ou `spyOn(someObj)`
- Matchers sur un spy :  `toHaveBeenCalled`, `toHaveBeenCalledWith`, `and.callThrough`, `and.returnValue`, `and.callFake`, `mySpy.calls`...

```javascript
describe('Service objet:', function() {

  it('checkout method should be called', function() {
     spyOn(service, 'foo');
     service.foo();
     expect(service.foo).toHaveBeenCalled();
  });

});
```

Notes :



## Jasmine - TypeScript

- Possibilité d'écrire des tests *Jasmine* en *TypeScript*

```typescript
class True {
  returnTrue() {
    return true;
  }
}

describe('True object:', () => {
  describe('returnTrue method:', () => {
    it('should return true', () => {
      let trueObject: True = new True();
      expect(trueObject.returnTrue()).toBe(true);
    });
  });
});
```

Notes :



## Karma

- *Karma* est un outil qui permet d'automatiser l’exécution des tests

<figure>
    <img src="ressources/SchemaKarma.png" alt="Schema Karma" width="75%" />
</figure>

Notes :



## Avec Angular CLI

- Configuration automatique réalisée par *Angular CLI*
- Les outils suivants sont prèts à fonctionner ensemble :

  *Webpack*, *TypeScript*, *Angular*, *Jasmine*, *Karma*
- Les fichiers de tests sont automatiquement créés avec `ng generate (...)`

  `Composant` / `Service` / `Pipe`
- Ils se trouvent dans le même répertoire que l'élément à tester

  *mon-service.spec.ts*
- Exécution des tests :

```shell
ng test
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp2" -->

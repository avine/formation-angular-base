# Les Tests

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- **[Tests](#/4)**
- [Template, Directives & Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)
- [Angular2 en EcmaScript 5](#/14)

Notes :



## Concepts

- Dans la documentation `Jasmine` est utilisé comme framework de tests
- `Angular2` peut être également testé avec d'autres frameworks
- Karma propose d’exécuter facilement les tests
  - Il a été développé par l'équipe d'`AngularJS`, il est donc mis en avant
  - Il n'est pour autant ni indispensable ni lié à `Angular2`
- `Jasmine` et `Karma` sont intégrés dans une application générée par *angular-cli*.

Notes :



## Tests - Utilisation de Jasmine

![Jasmine](ressources/jasmine.svg)

- Framework de Tests : http://jasmine.github.io/
- Aucune dépendance vers d'autres frameworks
- Ne nécessite pas d'élément du *DOM*
- Essayer `Jasmine` en ligne : http://tryjasmine.com/

Notes :



## Tests - Structure d'un test Jasmine

- Méthodes `describe` et `it` pour décrire la suite de tests
- Système de *matchers* : `toBe`, `toBeUndefined`, `toBeTruthy`, `toThrow`, ...
- Possibilité d'utiliser les librairies `Chai` ou `SinonJS`

```javascript
describe('True value:', function() {
  it('true should be equal to true', function() {

     expect(true).toBe(true);

  });
});
```

Notes :



## Tests - Structure d'un test Jasmine

- Méthodes `beforeEach`, `afterEach`, `beforeAll`, `afterAll`
- Exécution d'une fonction avant ou après chaque test

```javascript
describe('True value:', function() {
  var value;

  beforeEach(function(){
    value = true;
  });

  it('true should be equal to true', function() {
     expect(value).toBe(true);
  });
});
```

Notes :



## Tests - Structure d'un test Jasmine

- Possibilité de définir des *Spies* grâce à la méthode `spyOn`
- Vérifier l'exécution de la méthode **espionnée**
  - `toHaveBeenCalled`, `toHaveBeenCalledWith`
  - `and.callThrough`, `and.returnValue`, `and.callFake`...
  - `Spy.calls`

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



## Tests - Tests TypeScript

- Possibilité d'écrire des tests en *TypeScript*

```typescript
class True {
  returnTrue(){ return true; }
}

describe('True object:', () => {
  describe('returnTrue method:', () => {
      it('should return true', () => {
          var trueObject:True = new True();
          expect(trueObject.returnTrue()).toBe(true);
      });
  });
});
```

Notes :



## Karma

- Karma est un outil qui permet d'automatiser l’exécution des tests

<figure>
    <img src="ressources/SchemaKarma.png" alt="Schema Karma" width="75%" />
</figure>

Notes :



## Tests - Automatisation de l'exécution des tests

- Configuration automatiquement réalisée par `angular-cli`
- Les fichiers de test sont automatiquement créés lors de la création d'un `Composant`/`Service`/`Pipe` via `angular-cli`
- Ils se trouvent dans le même répertoire que l'élément à tester : *mon-service.spec.ts*
- Exécution des tests :

```shell
ng test
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp2" -->

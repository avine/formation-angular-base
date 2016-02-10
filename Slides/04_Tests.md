# Les Tests

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- **[Tests](#/4)**
- [Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Communication avec une API REST](#/8)
- [Router](#/9)

Notes : 



## Sommaire

<!-- .slide: class="toc" -->

- [Gestion des Formulaires](#/10)
- [Les Pipes](#/11)
- [Annotations et Décorateurs](#/12)
- [Server-side Rendering](#/13)
- [Support d'EcmaScript 5](#/14)
- [Bonne Pratiques pour une migration heureuse](#/15)

Notes :



## Concepts

- Dans la documentation `Jasmine` est utilisé comme framework de tests
- `Angular2` peut être également testé avec d'autres frameworks
- Karma propose d’exécuter facilement les tests
  - Il a été développé par l'équipe d'`AngularJS`, il est donc mis en avant
  - Il n'est pour autant ni indispensable ni lié à `Angular2`

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
- Exécution d'une fonction avant ou après chaque tests

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
describe('Basket objet:', function() {
 
  it('checkout method should be called', function() { 
     spyOn(basket, 'checkout');
     basket.checkout();
     expect(basket.checkout).toHaveBeenCalled();
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

- Nécessité de compiler les fichiers  `TypeScript` avant l'exécution des tests
- Possilité d'automatiser cette tâche : 
  - Via un runner : *Karma* et le [Karma TypeScript preprocessor](https://www.npmjs.com/package/karma-typescript-preprocessor)

```javascript
// karma.conf.js 
module.exports = function(config) {
  config.set({
    preprocessors: { '**/*.ts': ['typescript'] },
    
    files: [
      '**/*.spec.ts'
    ],
  });
};
```

Notes :



## Tests - Automatisation de l'exécution des tests

- Installer les différents modules :

```shell
npm install --save-dev karma typescript 
                       karma-typescript-preprocessor

npm install -g karma
# ou pour Windows
npm install -g karma-cli
```

- Initialisation des tests `Karma`

```shell
karma init
```

- Configuration du préprocesseur `TypeScript` dans le fichier *karma.conf.js*

Notes :



## Tests - Configuration du préprocesseur

- Exemple de configuration du préprocesseur : 

```javascript
typescriptPreprocessor: {
  options: {
    target: 'ES5', 
    module: 'amd', 
  },
  typings: [
    'typings/tsd.d.ts'
  ],
  transformPath: function(path) {
    return path.replace(/\.ts$/, '.js');
  }
}
```

Notes : 



<!-- .slide: class="page-questions" -->

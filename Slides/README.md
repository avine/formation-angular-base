# Rédiger ou éditer des slides

## Principes

Le framework utilisé est [Reveal.js](https://github.com/hakimel/reveal.js).

Le framework Reveal, customisé pour les formations Zenika, est utilisé au travers de l'outil [sensei](https://github.com/Zenika/sensei).

Seul le contenu des slides se trouvent donc dans ce répertoire.

Il y a 2 types de fichiers. D'une part, `slides.json` permet d'indiquer les chapitre à inclure. D'autre part, les chapitres sont écrits dans des fichiers markdown.

## Inclusion du Markdown

Pour modifier la liste de fichiers chargés, éditer `slides.json`. Ce fichier contient une liste des chemins des fichiers markdown à inclure. Le chemin doit être relatif au fichier `slides.json`, lui même devant être situé à la racine du répertoire `Slides`.

Exemple :

```json
[
  "premier_fichier.md",
  "chapitre2/second_fichier.md"
]
```

## Contenu

### Règles de rédaction

- Le contenu est éclaté dans les fichiers markdown, un par chapitre de la formation.
- La formation commence par un chapitre zéro, qui contient au minimum une page de titre avec le titre de la formation, une page qui présente le plan de la formation, et une page d'invitation aux questions. On peut éventuellement ajouter des rappels concernant les horaires et autres informations pratiques.
- Tous les chapitres débutent par une page de titre avec le titre du chapitre et une page qui reprend le plan de la formation. La partie en cours en mise en évidence.
- Tous les chapitres se terminent par une page invitant aux questions, puis éventuellement par une page qui annonce un TP.

### Markdown

- Le [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) est supporté
- Chaque slides doit être séparées par 3 lignes blanches.

#### Pages spéciales

Certaines pages récurrentes des formations sont réalisée grâce à des classes css.

##### Pages de titre

Les pages de titre sont composées d'un titre de premier niveau d'un fond Zenika.

```markdown
# Titre du chapitre

<!-- .slide: class="page-title" -->
```

##### Pages de questions

Les pages de questions n'ont pas de titre.

```markdown
<!-- .slide: class="page-questions" -->
```

##### Pages de TP

Les pages de TP n'ont pas de titre, il suffit d'utiliser la classe correspondante au numéro de TP (de 1 à 15).

```markdown
<!-- .slide: class="page-tp1" -->
```

Il est aussi possible d'utiliser un label de TP personnalisé.

```markdown
<!-- .slide: class="page-tp" data-label="TP 2 : celui qui vient après le TP1" -->
```

#### Pages de plan

- L'emphase sur la partie en cours dans les slides de plan est une emphase double : `**Partie en cours**`.
- Les liens entre slides étant possibles, il est intéressant d'un mettre sur les slides de plan. Un lien inter-slides est au format `#/<chapitre>/<slide>` sachant que les chapitres et les slides sont numérotés à partir de zéro, et que le numéro de slide est facultatif (zéro par défaut).

```markdown
## Plan

- [Partie 1](#/1)
- **[Partie 2](#/2)**
- [Partie 3](#/3)
```

#### Pages standards

- Les slides standards commencent par un titre de second niveau.
- Les mots importants sont à emphaser avec emphase simple : `*mot important*`.

#### Code

- Pour le code inline, utiliser la syntaxe Markdown classique, et pour les blocs de code, utiliser les blocs GFM avec spécification du langage.

````
```javascript
function(arg) { return 'du javascript en couleur !'; }
```
````

- Si une ligne de code commence par une suite continue d'espaces trop longue, la ligne est mise à la ligne. Il est donc nécessaire d'indenter avec 2 espaces seulement.

#### Images

- Pour les images, écrire du HTML classique. La taille peut être modifié via l'attribut `width`, et la position en modifiant les marges. La classe `.with-border` active une fine bordure noire autour de l'image.

```html
<img
  src="resources/image.png"
  alt="Une image"
  width="90%"
  style="margin-top: 10%"
  class="with-border"/>
```

- Pour ajouter une légende à une image, on peut utiliser les éléments HTML5 `figure` et `figcaption`.

```html
<figure>
    <img
      src="resources/image.png"
      alt="Une image"/>
    <figcaption>Une superbe représentation de quelque chose</figcaption>
</figure>
```

- Le chemin de l'image doit être relatif à la racine du répertoire Slides.

#### Fragments

On peut indiquer que des éléments de slides ne doivent être révélés qu'au fur et à mesure que le formateur appuie sur le bouton. Il faut utiliser la classe `fragment`.

```markdown
<!-- .element: class="fragment" -->
- item qui n'apparaît pas tout de suite
```

#### Fonctionnalités avancées

Si besoin, on peut ajouter des attributs HTML à la slide en cours ou à un élément grâce aux syntaxes `<!-- .slide: ... -->` et `<!-- .element: ... -->`.
Cela peut être utile pour donner un style particulier à un élément, par exemple pour le positionner.

#### Divers

D'autres exemples peuvent être trouvés directement dans les slides modèle.

# Consulter les slides

## Lancement

Voir le fichier [`README.md`](../README.md) à la racine du dépôt.

## Navigation

- Espace permet d'aller au slide suivant
- Flèches haut et bas pour naviguer au sein du chapitre
- Flèches gauche et droite pour naviguer entre les chapitres
- Les slides Plan sont faites de liens pour sauter directement aux différents chapitres
- Les fonctions précédent et suivant du navigateur fonctionne normalement

## Raccourcis clavier

- `espace` passe au slide suivant
- `haut/bas/gauche/droite` navigue dans les slides
- `o` donne accès à une vue avec du recul sur les slides
- `s` active le mode présentateur : une nouvelle fenêtre s'ouvre avec slide en cours, slide suivante, temps écoulé, notes
- `b` "éteint" la présentation, afin que les participants se concentre sur le présentateur
- `alt` + `clic` (`ctrl` + `clic` sous Linux) permet de zoomer / dézoomer sur une partie de la slide

## Exporter en PDF

Voir le fichier [`README.md`](../README.md) à la racine du dépôt.

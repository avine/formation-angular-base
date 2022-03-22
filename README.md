Documentation de [sensei](https://github.com/Zenika/sensei)

En cas de problème, ouvrir une issue sur [sensei](https://github.com/Zenika/sensei/issues/new).

## Supports PDF et Live

Les supports peuvent être obtenus à ces adresses :

Version release : https://formation-angular-dot-zen-formations.appspot.com/ [![Circle CI](https://circleci.com/gh/Zenika-Training/formation-angular/tree/release.svg?style=svg&circle-token=661b10b7e1d1ad37dd99942e7e0479766667f9b7)](https://circleci.com/gh/Zenika-Training/formation-angular/tree/release)

Version courante : https://master-dot-formation-angular-dot-zen-formations.appspot.com/ [![Circle CI](https://circleci.com/gh/Zenika-Training/formation-angular/tree/master.svg?style=svg&circle-token=661b10b7e1d1ad37dd99942e7e0479766667f9b7)](https://circleci.com/gh/Zenika-Training/formation-angular/tree/master)


## Organisation

``` shell
├── CahierExercices       # Contient les enoncés des TP
│   ├── Cahier.md         # Le fichier peut être découpé en autant de fichier que de TP
│   ├── parts.json        # Contient la liste des fichiers des énoncés
│   ├── README.md         # Explication détaillé de cette section
│   └── ressources        # Contient les images utilisées dans les énoncés des TP
├── Exercices             # Contient des starters dans TP ainsi que les corrections des TP
├── Installation          # Contient les éléments logiciels à fournir aux stagaires
│   └── README.md         # Explication détaillé de cette section
├── PLAN_en.md            # Plan commercial en anglais (affiché sur le site public des formations)
├── PLAN.md               # Plan commercial (affiché sur le site public des formations)
├── README.md             # ce fichier (ne pas effacer son contenu)
├── REFERENCES.md         # Références utiles pour donner ou préparer la formation (destiné aux formateurs)
├── run.sh                # Permet lancer la formation avec Docker sous Linux ou Windows (Git Bash)
├── SessionsNotes         # Contient l'ensemble des notes faites par les formateurs après chaque cession (organisation des TP, timing, ...)
│   └── README.md         # Explication détaillé de cette section
└── Slides                # Contient l'ensemble des slides
    ├── <num>_<slide>.md  # Contenu des slides
    ├── ...
    ├── README.md         # Explication détaillé de cette section
    ├── ressources        # Contient les images et autres éléments utilisés dans les slides
    └── slides.json       # Contient la liste des fichiers des slides
```

*Note : Chaque répertoire contient un fichier `README.md` précisant son usage*


## Utilisation

Une fois installé [sensei](https://github.com/Zenika/sensei) :

- `sensei pdf` pour générer les fichiers PDF
- `sensei serve` pour lancer les slides
- 
## Commandes RevealJS

- `Haut`, `Bas`, `Gauche`, `Droite`: Navigation
- `f`: Mode plein écran
- `s`: Afficher les notes du formateur
- `o`: Activer/désactiver le mode aperçu
- `b`: Activer/désactiver le mode écran noir
- `r`: Activer/désactiver le [mode télécommande](#mode-télécommande)
- `Esc`: Escape from full-screen, or toggle overview

https://github.com/hakimel/reveal.js/wiki/Keyboard-Short


### Mode télécommande

Certaines télécommandes de présentation utilisent les raccourcis `Gauche` et `Droite` pour naviguer entre les diapositives et ne permettent pas de changer ce comportement. \
Par défaut cela navigue entre les têtes de chapitre uniquement. Ce n'est pas très pratique... Le mode télécommande permet de remédier à cela. \
Une fois le mode télécommande activé les raccourcis de clavier sont changés : `Gauche` et `Haut` affichent la diapositive précédente, `Bas` et `Droite` la dispositive suivante.


## Intégration Continue

Chaque formation dispose d'une version web (disponible uniquement via un compte @zenika.com).
Le mini-site de la formation contient les slides live, les slides PDF, le cahier d'exercice live et le cahier d'exercice PDF.


### Modèle de branches

`master` est automatiquement déployé sur `https://formation-angular-dot-zen-formations.appspot.com/` à chaque push.

Vous pouvez créer des branches sur ce dépôt.
Ouvrez une PR depuis votre branche pour intégrer vos modifications.
Nettoyez les branches une fois mergées.

### Serveur d'IC

Le build et le déploiement sont réalisés par [CircleCI](https://circleci.com).
À ce titre, un fichier [`.circleci/config.yml`](.circleci/config.yml) est présent dans le projet.
Il n'y a, à priori, aucune raison d'éditer ce fichier à l'initialisation, mais une
mise à jour de sensei peut requérir une mise à jour de ce fichier.
Elle est alors décrite dans le changelog de sensei.

## Remote

See /Installation/strigo/README.md
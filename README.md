Documentation de [sensei](https://github.com/Zenika/sensei)

En cas de problème, ouvrir une issue sur [sensei](https://github.com/Zenika/sensei/issues/new).

Documentation sur le développement d'une formation: [HOW TO - Develop training](https://docs.google.com/document/d/1oaQL5JjKk4G2aRLfQa3L8Be9tcvIC6VCotghIzm0T78/view)


Documentation nécessaire et obligatoire pour l'écriture et la mise à jour des formations (Qualiopi compliant)
: [HOW TO - Formations & Qualiopi
](https://docs.google.com/document/d/1E10G6X6SdJ53cyQ4x-vBEKXDhUm5mdU6i1NNZx3_I_o/view)



## Supports PDF et Live

### Version release

Les supports peuvent être obtenus à cette adresse :  https://formation-angular-dot-zen-formations.appspot.com/

CircleCI : https://circleci.com/gh/Zenika-Training/formation-angular/tree/release

### Version courante

Les supports peuvent être obtenus à cette adresse :  https://master-dot-formation-angular-dot-zen-formations.appspot.com/

CircleCI : https://circleci.com/gh/Zenika-Training/formation-angular/tree/master

### Ressources de formation

Les PDFs, workspaces et solutions sont aussi publiés automatiquement dans Google Drive dans le dossier [formation-angular](https://drive.google.com/drive/folders/1FNq0-J9ncvOVGNcVyr170oymz2D4V8zV) du Drive partagé [Training Resources](https://drive.google.com/drive/folders/0ALlJ6REhgOxNUk9PVA).

Ils sont ensuite automatiquement téléchargés sur les machines Strigo des stagiaires et publiés sous le bouton Strigo "Materials".

## Organisation

``` shell
├── Workbook              # Contient les énoncés des TP
│   ├── README.md         # Explication détaillée de cette section
│   ├── workbook.json     # Contient la liste des fichiers des énoncés
│   ├── *.md              # Le contenu peut être découpé en autant de fichiers que de TP
│   └── resources         # Contient les images utilisées dans les énoncés des TP
├── Exercises             # Contient des starters dans TP ainsi que les solutions des TP
├── Installation          # Contient les éléments logiciels à fournir aux stagiaires
│   └── README.md         # Explication détaillée de cette section
├── FINAL_EVALUATION.md   # Questionnaire de fin de formation à faire remplir par les stagaires (généré dans surveymonkey et envoi géré par platon - WIP)
├── PLAN_en.md            # Plan commercial en anglais (affiché sur le site public des formations)
├── PLAN.md               # Plan commercial (affiché sur le site public des formations)
├── PREREQUIS.md          # Questionnaire de pré-requis à faire remplir par les stagaires si applicable (généré dans surveymonkey et envoi géré par platon - WIP)
├── README.md             # ce fichier (ne pas effacer son contenu)
├── REFERENCES.md         # Références utiles pour donner ou préparer la formation (destiné aux formateurs)
├── SessionsNotes         # Contient l'ensemble des notes faites par les formateurs après chaque session (organisation des TP, timing, ...)
│   └── README.md         # Explication détaillée de cette section
└── Slides                # Contient l'ensemble des slides
    ├── README.md         # Explication détaillée de cette section
    ├── slides.json       # Contient la liste des fichiers des slides
    ├── <num>_<slide>.md  # Contenu des slides
    ├── ...
    └── resources         # Contient les images et autres éléments utilisés dans les slides
```

*Note : Chaque répertoire contient un fichier `README.md` précisant son usage*


## Utilisation

Une fois installé [sensei](https://github.com/Zenika/sensei) :

- `sensei pdf` pour générer les fichiers PDF
- `sensei serve` pour lancer les slides

## Raccourcis clavier

- `Haut`, `Bas`, `Gauche`, `Droite`: Navigation
- `f`: Mode plein écran
- `s`: Afficher les notes du formateur
- `o`: Activer/désactiver le mode aperçu
- `b`: Activer/désactiver le mode écran noir
- `r`: Activer/désactiver le [mode télécommande](#mode-télécommande)
- `Echap`: Quitter le mode plein écran, ou activer/désactiver le mode aperçu

https://github.com/hakimel/reveal.js/wiki/Keyboard-Shortcuts

### Mode télécommande

Certaines télécommandes de présentation utilisent les raccourcis `Gauche` et `Droite` pour naviguer entre les diapositives et ne permettent pas de changer ce comportement. \
Par défaut cela navigue entre les têtes de chapitre uniquement. Ce n'est pas très pratique... Le mode télécommande permet de remédier à cela. \
Une fois le mode télécommande activé les raccourcis de clavier sont changés : `Gauche` et `Haut` affichent la diapositive précédente, `Bas` et `Droite` la dispositive suivante.

## Aide à la relecture

Pour que votre support soit orthographiquement irréprochable, demandez un coup de main à l'équipe [Orthographe](https://github.com/orgs/Zenika-Training/teams/orthographe-checkers) !

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

# Ressenti global

Les stagiares ont globalement bien aimé la formation. 
Quelques difficultés pour le stagiaire d'Orange car il lui manquait quelques bases et surtout il faisait autre chose en même temps. 
En revanche, il y a eu certains réticence à utiliser la vm fourni par strigo parce que certains stagiaires préféraient utiliser leur propre environnement. 
Ce que je comprends pas contre j'avais pas moyen de pouvoir les décoincer.
Quelques soucis d'audio avec strigo (comme d'hab) 
Vraiment dommage toujours de ne pas pouvoir voir les stagiaires en vidéo. 
J'espère qu'un jour Strigo va implémenter cette fonctionnalité qui me semble essentielle pour de la formation. 
Aussi les scripts d'init sur strigo ne fonctionnaient plus. 
Comme souvent je suis très mitigé sur l'utilisation de strigo. 
A la fois c'est super parce que j'ai pas eu trop de problèmes de vpn, proxy, etc et en même temps quelques désagréments qui donnent une mauvaise image de la plateforme.

# Problèmes

En utilisant Strigo, plusieurs soucis :
- Ports bloqués pour un stagiaire mais ok depuis les onglets à l'intérieur de strigo
- Ne pas oublier `ng serve --host 0.0.0.0 --disable-host-check` sinon bah ça marche pas
- Le TP demande d'appeler le serveur sur localhost:8080, il faut bien penser à dire aux stagiaires d'utiliser ld dns de leur machine
- Un problème avec Angular Language Service sur vs-code. Il a fallu redémarrer le service plusieurs fois


# Planning

### Jour 1

Intro: 9h30 - 10h
Rappel: 10h-11h
Started: 11h-12h15
Tests: 13h45 - 15h
Components: 15h - 17h30

### Jour 2

Directive: 9h30 - 12h15
Injection: 13h45 - 16h
Pipe: 16h00 - 17h30

### Jour 3

Http: 9h30 - 11h
Router: 12h - 15h
Form: 15h - 17h30

# LE GROUPE:

- Bruno Andrieu (dev Front React/Expo)
- Alec Pallot (dev Front React/Expo)
- Samir Founou (dev Back Symphony)
- Etienne Pradillon (dev Back Symphony)
- Elie Gazel (dev Front React/Expo, Cahier des charges, Modélisation DB)


# CHOIX TECHNO:
Ressources : https://mopinion.com/mobile-development-tools-an-overview/
- React Native car utilisable avec Expo Client pour des tests en Live sur iOs et Androïd
- IONIC pour du multiplateform : https://ionicframework.com/docs/enterprise
- pas FLUTTER car en C++
- Ionic en Angular
- ATTENTION, il est demandé au point 3, entre autre:
```3.2 - Développement de l’application mobile
L’apprenant devra en premier lieu faire un benchmark technique des langages 
et techniques de programmation front-end pour la réalisation de l’application mobile.
- Langages natifs IOS/Android (Kotlin, Java, Objective C, Swift)
- React Native
- Xamarin
- Flutter
- Adobe AIR
- …
```


# COTE BACK:
Symphony pour une grande possibilité d'évolution
et MySql


Paramètre en compte : Green IT (cible = skateur sensibles à l'état de la planète)

# OUTILS  UX:
https://balsamiq.com/

# ASPECT METIER:
- modélisation BDD
- diag de Classes
- vues :
	- accueil
	- flashage QRCode
	- Affichage de la promo


# CHOIX TECHNOS:

## APP:
- IONIC

## WS:
- API REST
- PHP côté serveur avec Symphony (car un membre de l'équipe le maîtrise)

## BDD:
- MySql
- Géré par Symfony

### Dictionnaire des données:
- Table Promo:
	- hash qrcode
	- lien
	- date debut
	- date fin
	- nbre de flash
	- nbre max de flash 
	- tags (blob de mots)
- Table Client:
	- num de tel 
	- mail
	- tags choisis lors du choix des promos
	- géolocalisation lors des flashes de QRCode
	
	
## PROPOSITIONS
Enregistrer la géolocalisation du client lorsqu'il flashe un QR Code, ainsi, les données récoltées permettront :
	- de cibler uun client lorsqu'il est dans un lieu dans lequel il a déjà flashé un code et ainsi de lui envoyer des offres
	- de savoir dans quels lieux sont le plus flashés les QR codes
	
Il faudrait mettre en place un suivi des codes promo afin de savoir si le code obtenu a été utilisé par le client. A développer avec le partenaire.

Les tags permettent aussi de cibler les offres à envoyer au client

Obtention du compte Premium en répondant tous les mois à une enquête marketing.
Proposer une version Premium qui permettrait de recevoir les codes promo sans avoir à scanner des QR code dans la rue.

# Tricks React-Native/Expo
En cas de bug, si "npm install xxxxx" ne se lance pas, de connexion internet bizarre, sous Windows 10,
dans le gestionnaire des tâches, arrêter tout ou partie de :
- adb32.exe
- adb.exe
- init.exe

Éventuellement, faire un :
```npm start --reset-cache```

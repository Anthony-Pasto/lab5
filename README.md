# Gestionnaire d'items

Application web en **Node.js**, **Express** et **EJS** pour gérer une liste d'items. Les opérations peuvent être faites depuis les formulaires du site ou par MQTT. Socket.IO actualise les pages ouvertes lorsqu'un item change.

## Fonctionnalités

- Consulter les items avec leur ID, leur date de création, leur nom et leur prix.
- Ajouter un item, le supprimer par ID ou par nom, et modifier son nom et son prix.
- Recevoir les commandes MQTT et publier les changements effectués depuis le site.
- Recharger automatiquement les pages ouvertes après une modification.
- Envoyer un formulaire de contact; les données sont affichées dans la console du serveur.

## Prérequis

- Node.js 18 ou une version plus récente.
- Un broker MQTT accessible à `mqtt://127.0.0.1:1883`.
- Le paquet `mqtt`. Il est utilisé par le code, mais n'est pas inscrit dans `package.json` actuellement.

## Installation et démarrage

Dans un terminal ouvert à la racine du projet :

```bash
npm install
npm install mqtt
npm start
```

Le serveur démarre à <http://localhost:3000>. La page d'accueil se trouve à `/` et le formulaire de contact à `/contacts`.

## Routes

| Méthode | Adresse | Fonction |
| --- | --- | --- |
| `GET` | `/` | Afficher la liste et les formulaires de gestion |
| `GET` | `/contacts` | Afficher le formulaire de contact |
| `POST` | `/contacts` | Afficher une confirmation et journaliser le formulaire |
| `POST` | `/items/add` | Ajouter un item |
| `POST` | `/items/delete/id` | Supprimer un item par ID |
| `POST` | `/items/delete/name` | Supprimer un item par nom |
| `POST` | `/items/modify/id` | Modifier le nom et le prix par ID |

## Commandes MQTT

Le serveur s'abonne à `ITEM/MODULE/#`. Les prix doivent être positifs ou nuls et contenir au plus deux décimales, avec un point comme séparateur.

| Topic | Message | Action |
| --- | --- | --- |
| `ITEM/MODULE/NEW` | `Clavier;49.99` | Ajouter un item nommé `Clavier` au prix de `49.99` |
| `ITEM/MODULE/MODIFY/ID` | `2;Clavier;39.99` | Modifier l'item `2` |
| `ITEM/MODULE/DELETE/ID` | `2` | Supprimer l'item `2` |
| `ITEM/MODULE/DELETE/NAME` | `Clavier` | Supprimer l'item nommé `Clavier` |

Les suppressions acceptent aussi un message avec une commande avant la valeur, par exemple `DELETE;2` ou `DELETE;Clavier`.

Après une opération réussie depuis le site ou MQTT, le serveur envoie l'événement Socket.IO `items:updated` aux pages connectées.

## Structure du projet

```text
app.js                 Démarrage Express, Socket.IO et MQTT
routes/                Modèle des items et routes HTTP
views/                 Pages EJS et éléments partagés
public/css/             Feuille de style
public/js/              Client Socket.IO
```

## À savoir

- Les items sont conservés uniquement en mémoire. La liste revient à ses valeurs initiales au redémarrage du serveur.
- Le formulaire de contact n'enregistre ni n'envoie les messages; il les affiche dans le terminal du serveur.
- Le port HTTP (`3000`) et l'adresse du broker MQTT (`127.0.0.1:1883`) sont configurés dans `app.js`.

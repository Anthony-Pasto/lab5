/*
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Ajoute un item a la liste et publie sa creation via MQTT.
 */
const express = require('express');
const router = express.Router();
var client = require('../mqttClient'); // C1 : évite d'ouvrir une autre connexion MQTT

const { Item, liste } = require('./index');

router.post('/', (req, res) => {

    let nom = req.body.nom;
    let prix = parseFloat(req.body.prix);

    let id = 1;

    if (liste.getLength() > 0) {
        id = liste.getLastItem().id + 1;
    }

    let nouvelItem = new Item(id, nom, prix);
    client.publish('ITEM/WEB/NEW', JSON.stringify(nouvelItem)); // A11 : envoie seulement les données de l'item
    liste.add(nouvelItem);
    req.app.get('io').emit('items:updated');

    res.redirect('/');
});

module.exports = router;
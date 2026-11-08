/* D3 : nom du fichier corriger
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Supprime un item par son ID et publie l'evenement MQTT associe.
 */
const express = require('express');
const router = express.Router();
var client = require('../mqttClient'); // C1 : évite d'ouvrir une autre connexion MQTT
const { Item, liste } = require('./index');

router.post('/', (req, res) => {

    let id = parseInt(req.body.id);

    let supprime = liste.removeItemById(id);
    if (supprime) {

        client.publish('ITEM/WEB/DELETE/ID', String(id)); // A12 : envoie seulement l'ID sur MQTT
        req.app.get('io').emit('items:updated');
    } else {
        console.log('Suppression impossible : ID ' + id + ' introuvable'); // A9 : signale qu'un ID est introuvable dans la console
    }



    res.redirect("/?success=" + supprime);
});

module.exports = router;
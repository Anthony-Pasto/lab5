/*
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Supprime un item par son nom et publie l'evenement MQTT associe.
 */
const express = require('express');
const router = express.Router();
var client = require('../mqttClient'); // C1 : évite d'ouvrir une autre connexion MQTT

const { Item, liste } = require('./index');

router.post('/', (req, res) => {

    let nom = req.body.nom;



    let supprime = liste.removeItemByName(nom);
    if (supprime) {
        client.publish('ITEM/WEB/DELETE/NAME', nom); // A13 : envoie seulement le nom sur MQTT
        req.app.get('io').emit('items:updated');
    } else {
        console.log('Suppression impossible : nom ' + nom + ' introuvable'); // A9 : signale le nom introuvable dans la console
    }


    res.redirect("/?success=" + supprime);
});

module.exports = router;
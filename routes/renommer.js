/*
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Modifie un item par ID et publie la modification via MQTT.
 */
const express = require('express');
const router = express.Router();
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883');

const { Item, liste } = require('./index');

router.post('/', (req, res) => {

    let id = parseInt(req.body.id, 10);
    let newNom = req.body.newNom;
    let newPrix = parseFloat(req.body.newPrix);

    let modifie = liste.modifyItemById(id, newNom, newPrix);
    if (modifie) {
        client.publish('ITEM/WEB/MODIFY/ID', `${id};${newNom};${newPrix}`);
        req.app.get('io').emit('items:updated');
    }


    res.redirect('/?success=' + modifie + '&action=modify');
});

module.exports = router;
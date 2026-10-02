const express = require('express');
const router = express.Router();
var mqtt = require('mqtt'); 
var client  = mqtt.connect('mqtt://127.0.0.1:1883');

const { Item, liste } = require('./index');

router.post('/', (req, res) => {

    let nom = req.body.nom;

    
    
    let supprime = liste.removeItemByName(nom);
    if (supprime) {
        client.publish('ITEM/WEB/DELETE/NAME', 'Item supprimé : ' + JSON.stringify(nom));
    }
        

    res.redirect("/?success=" + supprime);
});

module.exports = router;
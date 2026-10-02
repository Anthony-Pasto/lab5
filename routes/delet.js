const express = require('express');
const router = express.Router();
var mqtt = require('mqtt'); 
var client  = mqtt.connect('mqtt://127.0.0.1:1883');
const { Item, liste } = require('./index');

router.post('/', (req, res) => {

    let id = parseInt(req.body.id);

    let supprime = liste.removeItemById(id);
    if (supprime) {

        client.publish('ITEM/WEB/DELETE/ID', 'Item supprimé : ' + JSON.stringify(id));
    }

        
    
    res.redirect("/?success=" + supprime);
});

module.exports = router;
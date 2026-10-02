const express = require('express');
const router = express.Router();

const { Item, liste } = require('./index');

router.post('/', (req, res) => {

    let nom = req.body.nom;
    let prix = parseFloat(req.body.prix);

    let id = 1;

    if (liste.getLength() > 0) {
        id = liste.getLastItem().id + 1;
    }

    let nouvelItem = new Item(id, nom, prix);

    liste.add(nouvelItem);

    res.redirect('/');
});

module.exports = router;
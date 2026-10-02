const express = require('express');
const router = express.Router();

const { Item, liste } = require('./index');

router.post('/', (req, res) => {

    let nom = req.body.nom;

    let supprime = liste.removeItemByName(nom);

    res.redirect("/?success=" + supprime);
});

module.exports = router;
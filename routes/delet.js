const express = require('express');
const router = express.Router();

const { Item, liste } = require('./index');

router.post('/', (req, res) => {

   let id = parseInt(req.body.id);

    let supprime = liste.removeItemById(id);

    res.redirect("/?success=" + supprime);
});

module.exports = router;
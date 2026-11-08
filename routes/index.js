/*
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Definit le modele Item, la liste en memoire et la page d'accueil.
 */
const express = require('express');
const router = express.Router();
const { Item, ItemList, liste } = require('../models/items'); // C4 : classes déplacées dans models pour mieux séparer le code

router.get('/', (req, res) => {

    let success = req.query.success;

    liste.refactor();

    res.render('pages/index', {
        title: 'Accueil',
        items: liste.tab,
        success: success,
        action: req.query.action
    });
});
module.exports = {
    router,
    Item,
    ItemList,
    liste
};

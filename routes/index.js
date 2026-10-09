/*
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Definit le modele Item, la liste en memoire et la page d'accueil.
 */
const express = require('express');
const router = express.Router();
class Item {

    id = 0;
    dateCreation = "";
    nom = "";
    prix = 0.0;

    constructor(id, nom, prix) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.dateCreation = new Date().toLocaleDateString("en-US");
    }

    print() {
        console.log(
            "id: " + this.id +
            " nom: " + this.nom +
            " prix: " + this.prix +
            " dateCreation: " + this.dateCreation
        );
    }
}


class ItemList {

    constructor() {
        this.tab = [];
    }

    add(item) {
        this.tab.push(item);
    }

    getLength() {
        return this.tab.length;
    }

    removeItemById(id) {

        let index = this.tab.findIndex(item => item.id === id);

        if (index !== -1) {
            this.tab.splice(index, 1);
            return true;
        }
        return false;
    }

    removeItemByName(name) {

        let index = this.tab.findIndex(item => item.nom === name);

        if (index !== -1) {
            this.tab.splice(index, 1);
            return true;
        }
        return false;
    }

    getLastItem() {

        if (this.tab.length > 0) {
            return this.tab[this.tab.length - 1];
        }
    }

    printAllItems() {
        console.log(this.tab);
    }
    refactor() {
        this.tab.forEach((item, index) => {
            item.id = index + 1;
        });
    }
    modifyItemById(id, newNom, newPrix) {
        let index = this.tab.findIndex(item => item.id === id);
        if (index !== -1) {
            let item = this.tab[index];
            item.nom = newNom;
            item.prix = newPrix;
            return true;
        }
        return false;
    }
}

// Création de la liste
const liste = new ItemList();

liste.add(new Item(1, "test1", 12.34));
liste.add(new Item(2, "test2", 12.45));
liste.add(new Item(3, "test3", 77.45));


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

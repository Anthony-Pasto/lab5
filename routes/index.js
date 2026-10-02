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
        }
    }

    removeItemByName(name) {

        let index = this.tab.findIndex(item => item.nom === name);

        if (index !== -1) {
            this.tab.splice(index, 1);
        }
    }

    getLastItem() {

        if (this.tab.length > 0) {
            return this.tab[this.tab.length - 1];
        }
    }

    printAllItems() {
        console.log(this.tab);
    }
}
router.get('/', (req, res) => {

    const items = [
        { id: 1, dateCreation: '9/26/2019', nom: 'test1', prix: 12.34 },
        { id: 2, dateCreation: '9/26/2019', nom: 'test2', prix: 12.45 },
        { id: 3, dateCreation: '9/26/2019', nom: 'test3', prix: 77.45 }
    ];

    res.render('pages/index', {
        title: 'Accueil',
        items: items
    });
});
module.exports = router;
